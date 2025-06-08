import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import { useGameStore } from '../hooks/useGameStore';

interface Props {
  onScore: (points: number) => void;
}

export default function ClickableObject({ onScore }: Props) {
  const translate = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const baseScale = useRef(1);
  const { incrementTask } = useGameStore();

  // посилання на gesture handlers, щоб використовувати в waitFor
  const doubleTapRef = useRef(null);

  const handleSingleTap = () => {
    onScore(1);
    incrementTask('click');
  };

  const handleDoubleTap = () => {
    onScore(2);
    incrementTask('double');
  };

  const handleLongPress = () => {
    onScore(5);
    incrementTask('long');
  };

  const handleSwipe = () => {
    onScore(Math.floor(Math.random() * 10));
    incrementTask('swipe');
  };

  const handlePinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    { useNativeDriver: false }
  );

  const handlePinchStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END || nativeEvent.oldState === State.ACTIVE) {
      baseScale.current *= nativeEvent.scale;
      scale.setValue(baseScale.current);
      incrementTask('pinch');
    }
  };

  const handlePanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translate.x, translationY: translate.y } }],
    { useNativeDriver: false }
  );

  const handlePanStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      incrementTask('pan');
    }
  };

  return (
    <FlingGestureHandler direction={Directions.LEFT | Directions.RIGHT} onHandlerStateChange={handleSwipe}>
      <PanGestureHandler onGestureEvent={handlePanGestureEvent} onHandlerStateChange={handlePanStateChange}>
        <PinchGestureHandler
          onGestureEvent={handlePinchGestureEvent}
          onHandlerStateChange={handlePinchStateChange}
        >
          <LongPressGestureHandler onHandlerStateChange={({ nativeEvent }) => nativeEvent.state === State.ACTIVE && handleLongPress()} minDurationMs={800}>
            <TapGestureHandler
              ref={doubleTapRef}
              numberOfTaps={2}
              onActivated={handleDoubleTap}
            >
              <TapGestureHandler
                waitFor={doubleTapRef}
                numberOfTaps={1}
                onActivated={handleSingleTap}
              >
                <Animated.View style={[styles.object, {
                  transform: [
                    { translateX: translate.x },
                    { translateY: translate.y },
                    { scale }
                  ]
                }]}>
                  <Text style={styles.text}>🎯</Text>
                </Animated.View>
              </TapGestureHandler>
            </TapGestureHandler>
          </LongPressGestureHandler>
        </PinchGestureHandler>
      </PanGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  object: {
    width: 100,
    height: 100,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  text: {
    fontSize: 32,
  },
});
