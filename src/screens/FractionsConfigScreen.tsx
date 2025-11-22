import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ChoiceChip } from '@/components/ui/Chip';
import { FilledButton, IconButton } from '@/components/ui/Button';
import { AppCard } from '@/components/ui/Card';
import { FractionAnswerType } from '@/lib/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'FractionsConfig'>;

export const FractionsConfigScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selected, setSelected] = useState<FractionAnswerType[]>(['fraction']);

  const toggleOption = (option: FractionAnswerType) => {
    setSelected(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const handleStart = () => {
    if (selected.length > 0) {
      navigation.navigate('Execution', {
        mode: 'fractions',
        config: { selected }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 bg-white/80 border-b-[3px] border-black rounded-b-3xl mb-4">
        <IconButton icon="arrow-back" onPress={() => navigation.goBack()} />
        <Text className="font-fredoka text-xl font-bold text-gray-800">Fractions</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <AppCard className="mb-6">
          <Text className="font-fredoka text-lg mb-4">Select Question Types</Text>
          <View className="flex-row flex-wrap gap-3">
            <ChoiceChip 
                label="Percentage to Fraction" 
                selected={selected.includes('fraction')} 
                onSelect={() => toggleOption('fraction')} 
            />
            <ChoiceChip 
                label="Fraction to Percentage" 
                selected={selected.includes('decimal')} 
                onSelect={() => toggleOption('decimal')} 
            />
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
