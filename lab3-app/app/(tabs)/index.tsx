import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Гра-клікер</Text>
      <Button title="Грати" onPress={() => router.push('/game')} />
      <Button title="Завдання" onPress={() => router.push('/tasks')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});