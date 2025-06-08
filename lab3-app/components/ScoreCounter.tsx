import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  score: number;
};

export default function ScoreCounter({ score }: Props) {
  return (
    <View style={styles.counter}>
      <Text style={styles.text}>Очки: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  counter: {
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});