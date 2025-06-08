import React from 'react';
import { StyleSheet, TextInput, View, Button, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.title}>Реєстрація</ThemedText>

      <TextInput placeholder="Електронна пошта" style={styles.input} />
      <TextInput placeholder="Пароль" secureTextEntry style={styles.input} />
      <TextInput placeholder="Пароль (ще раз)" secureTextEntry style={styles.input} />
      <TextInput placeholder="Прізвище" style={styles.input} />
      <TextInput placeholder="Ім’я" style={styles.input} />

      <Button title="Зареєструватися" onPress={() => {}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
  },
  footer: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
});
