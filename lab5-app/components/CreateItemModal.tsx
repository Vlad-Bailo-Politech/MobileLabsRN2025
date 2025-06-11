import React from 'react';
import { Modal, View, TextInput, Button, Text, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  isFile: boolean;
  newName: string;
  newContent: string;
  setNewName: (v: string) => void;
  setNewContent: (v: string) => void;
  onCreate: () => void;
  onCancel: () => void;
}

export default function CreateItemModal({
  visible, isFile, newName, newContent, setNewName, setNewContent, onCreate, onCancel,
}: Props) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <Text>{isFile ? 'Новий файл' : 'Нова папка'}</Text>
        <TextInput placeholder="Назва" value={newName} onChangeText={setNewName} style={styles.input} />
        {isFile && (
          <TextInput
            placeholder="Вміст файлу"
            value={newContent}
            onChangeText={setNewContent}
            multiline
            style={[styles.input, { height: 100 }]}
          />
        )}
        <Button title="Створити" onPress={onCreate} />
        <Button title="Скасувати" onPress={onCancel} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
  },
});
