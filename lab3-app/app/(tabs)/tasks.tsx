import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TaskItem from '../../components/TaskItem';
import { useTaskStore } from '../../hooks/useGameStore';

export default function TaskScreen() {
  const { tasks } = useTaskStore();

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});
