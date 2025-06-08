import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Сторінки
import HomeScreen from './index';
import GalleryScreen from './gallery';
import ProfileScreen from './profile';

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Header />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowIcon: true,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIndicatorStyle: { backgroundColor: '#007AFF' },
          tabBarStyle: { backgroundColor: '#f8f8f8' },
          tabBarIcon: ({ color }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'help';

            if (route.name === 'Головна') {
              iconName = 'home';
            } else if (route.name === 'Фотогалерея') {
              iconName = 'images-outline';
            } else if (route.name === 'Профіль') {
              iconName = 'person-outline';
            }

            return <Ionicons name={iconName} size={20} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Головна" component={HomeScreen} />
        <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
        <Tab.Screen name="Профіль" component={ProfileScreen} />
      </Tab.Navigator>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});
