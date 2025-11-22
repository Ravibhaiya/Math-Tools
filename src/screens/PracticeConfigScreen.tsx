import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NumberChip } from '@/components/ui/Chip';
import { FilledButton, IconButton } from '@/components/ui/Button';
import { AppCard } from '@/components/ui/Card';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PracticeConfig'>;

export const PracticeConfigScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [digits1, setDigits1] = useState<number[]>([1]);
  const [digits2, setDigits2] = useState<number[]>([1]);

  const toggleDigit = (setter: React.Dispatch<React.SetStateAction<number[]>>, current: number[], val: number) => {
    setter(current.includes(val) ? current.filter(d => d !== val) : [...current, val]);
  };

  const handleStart = () => {
    if (digits1.length > 0 && digits2.length > 0) {
      navigation.navigate('Execution', {
        mode: 'practice',
        config: { digits1, digits2 }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-4 bg-white/80 border-b-[3px] border-black rounded-b-3xl mb-4">
        <IconButton icon="arrow-back" onPress={() => navigation.goBack()} />
        <Text className="font-fredoka text-xl font-bold text-gray-800">Practice</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <AppCard className="mb-6">
          <Text className="font-fredoka text-lg mb-4">First Number Digits</Text>
          <View className="flex-row gap-4">
            {[1, 2, 3].map((d) => (
              <View key={d} style={{ width: 60 }}>
                <NumberChip 
                    value={d} 
                    selected={digits1.includes(d)} 
                    onToggle={() => toggleDigit(setDigits1, digits1, d)} 
                />
              </View>
            ))}
          </View>
        </AppCard>

        <AppCard className="mb-6">
          <Text className="font-fredoka text-lg mb-4">Second Number Digits</Text>
          <View className="flex-row gap-4">
            {[1, 2, 3].map((d) => (
               <View key={d} style={{ width: 60 }}>
                <NumberChip 
                    value={d} 
                    selected={digits2.includes(d)} 
                    onToggle={() => toggleDigit(setDigits2, digits2, d)} 
                />
              </View>
            ))}
          </View>
        </AppCard>
      </ScrollView>

      <View className="absolute bottom-8 left-0 right-0 px-6">
        <FilledButton 
            onPress={handleStart} 
            disabled={digits1.length === 0 || digits2.length === 0}
            className={(digits1.length === 0 || digits2.length === 0) ? "opacity-50" : ""}
        >
            Start Practice
        </FilledButton>
      </View>
    </SafeAreaView>
  );
};
