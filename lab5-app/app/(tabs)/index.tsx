import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, AlertButton, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';

import ItemRow from '../../components/ItemRow';
import StatsPanel from '../../components/StatsPanel';
import Breadcrumbs from '../../components/Breadcrumbs';
import CreateItemModal from '../../components/CreateItemModal';
import EditModal from '../../components/EditModal';

const ROOT_DIR = FileSystem.documentDirectory + 'AppData/';

export default function FileScreen() {
  const [currentPath, setCurrentPath] = useState(ROOT_DIR);
  const [items, setItems] = useState<string[]>([]);
  const [stats, setStats] = useState<{ total: number; free: number } | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isFile, setIsFile] = useState(false);

  const [editVisible, setEditVisible] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editPath, setEditPath] = useState('');
  const [editName, setEditName] = useState('');

  useEffect(() => {
    const init = async () => {
      const info = await FileSystem.getInfoAsync(ROOT_DIR);
      if (!info.exists) {
        await FileSystem.makeDirectoryAsync(ROOT_DIR, { intermediates: true });
      }
      loadDirectory(ROOT_DIR);
      loadStats();
    };
    init();
  }, []);

  const loadStats = async () => {
    try {
      const total = await FileSystem.getTotalDiskCapacityAsync();
      const free = await FileSystem.getFreeDiskStorageAsync();
      if (total !== null && free !== null) {
        setStats({ total, free });
      }
    } catch (error) {
      console.error("Помилка отримання статистики диска:", error);
    }
  };

  const loadDirectory = async (path: string) => {
    try {
      const content = await FileSystem.readDirectoryAsync(path);
      const detailedItems = await Promise.all(
        content.map(async (name) => {
          const info = await FileSystem.getInfoAsync(path + name);
          return { name, isDir: info.isDirectory };
        })
      );

      const sorted = detailedItems
        .sort((a, b) => {
          if (a.isDir && !b.isDir) return -1;
          if (!a.isDir && b.isDir) return 1;
          return a.name.localeCompare(b.name);
        })
        .map((item) => item.name);

      setItems(sorted);
    } catch (error) {
      console.error(error);
    }
  };

  const openItem = async (name: string) => {
    const fullPath = currentPath + name;
    const info = await FileSystem.getInfoAsync(fullPath);
    if (info.isDirectory) {
      setCurrentPath(fullPath + '/');
      loadDirectory(fullPath + '/');
    } else {
      const content = await FileSystem.readAsStringAsync(fullPath);
      Alert.alert(`Файл: ${name}`, content);
    }
  };

  const editAndRenameFile = async (name: string) => {
    const fullPath = currentPath + name;
    const content = await FileSystem.readAsStringAsync(fullPath);
    setEditContent(content);
    setEditPath(fullPath);
    setEditName(name);
    setEditVisible(true);
  };

  const deleteItem = (name: string) => {
    Alert.alert('Підтвердження', `Ви дійсно бажаєте видалити '${name}'?`, [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: async () => {
          try {
            const fullPath = currentPath + name;
            await FileSystem.deleteAsync(fullPath, { idempotent: true });
            loadDirectory(currentPath);
          } catch {
            Alert.alert('Помилка', 'Не вдалося видалити елемент.');
          }
        },
      },
    ]);
  };

  const showItemOptions = async (name: string) => {
    const fullPath = currentPath + name;
    const info = await FileSystem.getInfoAsync(fullPath);

    if (!info.exists) {
      Alert.alert('Помилка', 'Файл або папка не існує.');
      return;
    }

    const size = info.size ? `${(info.size / 1024).toFixed(2)} KB` : 'Невідомо';
    const date = info.modificationTime
      ? new Date(info.modificationTime * 1000).toLocaleString()
      : 'Невідомо';
    const extension = info.isDirectory
      ? 'папка'
      : name.includes('.')
      ? name.split('.').pop()
      : 'файл';

    const actions: AlertButton[] = [];

    if (info.isDirectory) {
      actions.push({
        text: 'Перейменувати',
        onPress: () => {
          setEditPath(currentPath + name);
          setEditName(name);
          setEditContent('');
          setEditVisible(true);
        },
        style: 'default',
      });
    } else {
      actions.push({
        text: 'Редагувати / Перейменувати',
        onPress: () => editAndRenameFile(name),
        style: 'default',
      });
    }

    actions.push(
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: () => deleteItem(name),
      },
      {
        text: 'Скасувати',
        style: 'cancel',
      }
    );

    Alert.alert(
      'Інформація про файл',
      `Назва: ${name}\nТип: ${extension}\nРозмір: ${size}\nОстання модифікація: ${date}`,
      actions
    );
  };

  const goBack = () => {
    if (currentPath === ROOT_DIR) return;
    const parent = currentPath.slice(0, currentPath.slice(0, -1).lastIndexOf('/') + 1);
    setCurrentPath(parent);
    loadDirectory(parent);
  };

  const isRoot = currentPath === ROOT_DIR;

  const createItem = async () => {
    if (!newName.trim()) return;
    const fullPath = currentPath + newName;
    try {
      if (isFile) {
        await FileSystem.writeAsStringAsync(fullPath + '.txt', newContent);
      } else {
        await FileSystem.makeDirectoryAsync(fullPath);
      }
      loadDirectory(currentPath);
    } catch {
      Alert.alert('Помилка', 'Не вдалося створити обʼєкт.');
    }
    setModalVisible(false);
    setNewName('');
    setNewContent('');
  };

  const confirmEditAndRename = async () => {
    const newPath = currentPath + editName;
    try {
      if (editContent !== '') {
        await FileSystem.writeAsStringAsync(editPath, editContent);
      }
      if (editPath !== newPath) {
        await FileSystem.moveAsync({ from: editPath, to: newPath });
      }
      setEditVisible(false);
      loadDirectory(currentPath);
    } catch {
      Alert.alert('Помилка', 'Не вдалося зберегти зміни.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.title}>Файловий Менеджер</Text>
      </View>

      {isRoot && stats && <StatsPanel total={stats.total} free={stats.free} />}

      <Breadcrumbs currentPath={currentPath} isRoot={isRoot} goBack={goBack} />

      <FlatList
        data={items}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <ItemRow
            name={item}
            onPress={() => openItem(item)}
            onLongPress={() => showItemOptions(item)}
          />
        )}
      />

      <View style={styles.actions}>
        <Button title="Створити папку" onPress={() => { setIsFile(false); setModalVisible(true); }} />
        <Button title="Створити файл" onPress={() => { setIsFile(true); setModalVisible(true); }} />
      </View>

      <CreateItemModal
        visible={modalVisible}
        isFile={isFile}
        newName={newName}
        newContent={newContent}
        setNewName={setNewName}
        setNewContent={setNewContent}
        onCreate={createItem}
        onCancel={() => setModalVisible(false)}
      />

      <EditModal
        visible={editVisible}
        name={editName}
        content={editContent}
        setName={setEditName}
        setContent={setEditContent}
        onSave={confirmEditAndRename}
        onCancel={() => setEditVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  navBar: { padding: 10, backgroundColor: '#eee', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});
