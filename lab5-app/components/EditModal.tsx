// import React from 'react';
// import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

// export default function EditFileModal({ visible, name, content, setContent, onSave, onCancel }: any) {
//   return (
//     <Modal visible={visible} animationType="slide">
//       <View style={styles.modalContent}>
//         <Text>Редагувати: {name}</Text>
//         <TextInput value={content} onChangeText={setContent} multiline style={[styles.input, { height: 150 }]} />
//         <Button title="Зберегти" onPress={onSave} />
//         <Button title="Скасувати" onPress={onCancel} />
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   modalContent: { flex: 1, justifyContent: 'center', padding: 20 },
//   input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10 },
// });

import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  name: string;
  content: string;
  setName: (v: string) => void;
  setContent: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function EditModal({
  visible, name, content, setName, setContent, onSave, onCancel,
}: Props) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <Text>Редагувати / Перейменувати</Text>
        <TextInput placeholder="Нова назва" value={name} onChangeText={setName} style={styles.input} />
        {content !== '' && (
          <TextInput
            value={content}
            onChangeText={setContent}
            multiline
            style={[styles.input, { height: 150 }]}
          />
        )}
        <Button title="Зберегти" onPress={onSave} />
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
