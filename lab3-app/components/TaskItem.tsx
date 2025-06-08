import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TaskItem({ task }: any) {
  return (
    <View style={[styles.item, task.completed && styles.completed]}>
      <Text>{task.title}</Text>
      <Text>
        {task.count} / {task.goal}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 8,
  },
  completed: {
    backgroundColor: '#d4edda',
  },
});