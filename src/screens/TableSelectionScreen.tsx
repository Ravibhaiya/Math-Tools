import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NumberChip } from '@/components/ui/Chip';
import { FilledButton, IconButton } from '@/components/ui/Button';
import { AppCard } from '@/components/ui/Card';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TableSelection'>;

export const TableSelectionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selected, setSelected] = useState<number[]>([]);

  const toggleNumber = (num: number) => {
    setSelected(prev => 
      prev.includes(num) 
        ? prev.filter(n => n !== num)
        : [...prev, num]
    );
  };

  const handleStart = () => {
    if (selected.length > 0) {
      navigation.navigate('Execution', {
        mode: 'tables',
        config: { selected }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 bg-white/80 border-b-[3px] border-black rounded-b-3xl mb-4">
        <IconButton icon="arrow-back" onPress={() => navigation.goBack()} />
        <Text className="font-fredoka text-xl font-bold text-gray-800">Tables</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <AppCard className="mb-6">
          <Text className="font-fredoka text-lg mb-4 text-center">
            Select tables to practice
          </Text>
          <View className="flex-row flex-wrap justify-center gap-3">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
              <View key={num} style={{ width: '22%' }}>
                <NumberChip 
                  value={num}
                  selected={selected.includes(num)}
                  onToggle={toggleNumber}
                />
              </View>
            ))}
          </View>
        </AppCard>
      </ScrollView>

      <View className="absolute bottom-8 left-0 right-0 px-6">
        <FilledButton 
            onPress={handleStart} 
            disabled={selected.length === 0}
            className={selected.length === 0 ? "opacity-50" : ""}
        >
            Start Practice
        </FilledButton>
      </View>
    </SafeAreaView>
  );
};
