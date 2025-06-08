import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';

const items = Array(10).fill(null);

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Фотогалерея</ThemedText>

      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={() => (
          <View style={styles.iconContainer}>
            <Ionicons name="images" size={48} color="#636363" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 12,
  },
  grid: {
    gap: 8,
  },
  iconContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
