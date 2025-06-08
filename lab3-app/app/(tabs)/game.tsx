import React from 'react';
import { View, StyleSheet } from 'react-native';
import ClickableObject from '../../components/ClickableObject';
import ScoreCounter from '../../components/ScoreCounter';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useGameStore } from '../../hooks/useGameStore';

export default function GameScreen() {
  const { score, increaseScore } = useGameStore();

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScoreCounter score={score} />
      <ClickableObject onScore={increaseScore} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
});