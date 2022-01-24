import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import React, { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  });
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
