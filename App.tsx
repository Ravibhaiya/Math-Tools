// App.tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Fredoka_600SemiBold } from '@expo-google-fonts/fredoka';
import { Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { SourceCodePro_400Regular } from '@expo-google-fonts/source-code-pro';
import { View, ActivityIndicator } from 'react-native';

import { AppNavigator } from './src/navigation/AppNavigator';
import './global.css';

export default function App() {
  const [fontsLoaded] = useFonts({
    Fredoka_600SemiBold,
    Nunito_600SemiBold,
    Inter_400Regular,
    SpaceGrotesk_700Bold,
    SourceCodePro_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
