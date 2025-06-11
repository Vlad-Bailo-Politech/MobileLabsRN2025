import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  name: string;
  onPress: () => void;
  onLongPress: () => void;
}

export default function ItemRow({ name, onPress, onLongPress }: Props) {
  const isFile = name.includes('.');
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.row}>
      <MaterialIcons
        name={isFile ? 'insert-drive-file' : 'folder'}
        size={20}
        color={isFile ? 'gray' : 'goldenrod'}
        style={{ marginRight: 10 }}
      />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ccc' },
  text: { fontSize: 16 },
});
