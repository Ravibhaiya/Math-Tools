import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ChoiceChip } from '@/components/ui/Chip';
import { FilledButton, IconButton } from '@/components/ui/Button';
import { AppCard } from '@/components/ui/Card';
import Slider from '@react-native-community/slider';
import { PowerType } from '@/lib/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PowersConfig'>;

export const PowersConfigScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selected, setSelected] = useState<PowerType[]>(['squares']);
  const [rangeMax, setRangeMax] = useState<number>(20);

  const toggleOption = (option: PowerType) => {
    setSelected(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const handleStart = () => {
    if (selected.length > 0) {
      navigation.navigate('Execution', {
        mode: 'powers',
        config: { selected, rangeMax }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 bg-white/80 border-b-[3px] border-black rounded-b-3xl mb-4">
        <IconButton icon="arrow-back" onPress={() => navigation.goBack()} />
        <Text className="font-fredoka text-xl font-bold text-gray-800">Powers & Roots</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <AppCard className="mb-6">
          <Text className="font-fredoka text-lg mb-4">Select Operations</Text>
          <View className="flex-row flex-wrap gap-3">
            <ChoiceChip 
                label="Squares (x²)" 
                selected={selected.includes('squares')} 
                onSelect={() => toggleOption('squares')} 
            />
            <ChoiceChip 
                label="Cubes (x³)" 
                selected={selected.includes('cubes')} 
                onSelect={() => toggleOption('cubes')} 
            />
            <ChoiceChip 
                label="Square Roots (√x)" 
                selected={selected.includes('square_roots')} 
                onSelect={() => toggleOption('square_roots')} 
            />
            <ChoiceChip 
                label="Cube Roots (∛x)" 
                selected={selected.includes('cube_roots')} 
                onSelect={() => toggleOption('cube_roots')} 
            />
          </View>
        </AppCard>

        <AppCard className="mb-6">
          <Text className="font-fredoka text-lg mb-8">Maximum Number: {rangeMax}</Text>
          <View className="px-2 relative pt-6">
              {/* Tooltip-like label */}
              <View 
                style={{ 
                    position: 'absolute', 
                    left: `${((rangeMax - 10) / 90) * 100}%`, 
                    top: -10, 
                    transform: [{translateX: -20}], // Approximate centering
                    zIndex: 10 
                }}
              >
                <View className="bg-primary px-3 py-1 rounded-xl border-2 border-black shadow-sm">
                    <Text className="text-white font-bold font-fredoka">{rangeMax}</Text>
                </View>
              </View>

              <Slider
                style={{width: '100%', height: 40}}
                minimumValue={10}
                maximumValue={100}
                step={1}
                value={rangeMax}
                onValueChange={setRangeMax}
                minimumTrackTintColor="#7C3AED" // Primary color
                maximumTrackTintColor="#000000"
                thumbTintColor="#7C3AED"
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
