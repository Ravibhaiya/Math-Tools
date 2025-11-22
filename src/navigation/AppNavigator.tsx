// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { TableSelectionScreen } from '../screens/TableSelectionScreen';
import { PracticeConfigScreen } from '../screens/PracticeConfigScreen';
import { PowersConfigScreen } from '../screens/PowersConfigScreen';
import { FractionsConfigScreen } from '../screens/FractionsConfigScreen';
import { ExecutionScreen } from '../screens/ExecutionScreen';
import { Mode, ExecutionConfig } from '@/lib/types';

export type RootStackParamList = {
  Home: undefined;
  TableSelection: undefined;
  PracticeConfig: undefined;
  PowersConfig: undefined;
  FractionsConfig: undefined;
  Execution: {
    mode: Mode;
    config: ExecutionConfig;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'hsl(260, 100%, 99%)' }, // App background
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TableSelection" component={TableSelectionScreen} />
        <Stack.Screen name="PracticeConfig" component={PracticeConfigScreen} />
        <Stack.Screen name="PowersConfig" component={PowersConfigScreen} />
        <Stack.Screen name="FractionsConfig" component={FractionsConfigScreen} />
        <Stack.Screen name="Execution" component={ExecutionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
