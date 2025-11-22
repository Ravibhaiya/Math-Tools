import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AppCard } from '@/components/ui/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { cn } from '@/lib/utils';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <View className="mb-8 mt-4">
            <Text className="text-primary text-center font-fredoka text-3xl font-bold tracking-widest uppercase">
              Math Tools
            </Text>
        </View>

        <View className="gap-6">
          <AppCard onPress={() => navigation.navigate('TableSelection')}>
            <View className="flex-row items-center gap-6">
              <View className="w-16 h-16 rounded-2xl bg-purple-100 border-[3px] border-black items-center justify-center shadow-hard-sm">
                <MaterialIcons name="close" size={32} color="#9333EA" />
              </View>
              <View className="flex-1">
                <Text className="font-fredoka text-xl mb-1">Multiplication Tables</Text>
                <Text className="font-inter text-gray-600">Practice your times tables</Text>
              </View>
            </View>
          </AppCard>

          <AppCard onPress={() => navigation.navigate('PracticeConfig')}>
            <View className="flex-row items-center gap-6">
              <View className="w-16 h-16 rounded-2xl bg-cyan-100 border-[3px] border-black items-center justify-center shadow-hard-sm">
                <MaterialIcons name="calculate" size={32} color="#0E7490" />
              </View>
              <View className="flex-1">
                <Text className="font-fredoka text-xl mb-1">Multiplication Practice</Text>
                <Text className="font-inter text-gray-600">Solve multi-digit problems</Text>
              </View>
            </View>
          </AppCard>

          <AppCard onPress={() => navigation.navigate('PowersConfig')}>
            <View className="flex-row items-center gap-6">
              <View className="w-16 h-16 rounded-2xl bg-green-100 border-[3px] border-black items-center justify-center shadow-hard-sm">
                <MaterialIcons name="superscript" size={32} color="#15803D" />
              </View>
              <View className="flex-1">
                <Text className="font-fredoka text-xl mb-1">Powers & Roots</Text>
                <Text className="font-inter text-gray-600">Practice squares, cubes, and roots</Text>
              </View>
            </View>
          </AppCard>

          <AppCard onPress={() => navigation.navigate('FractionsConfig')}>
            <View className="flex-row items-center gap-6">
              <View className="w-16 h-16 rounded-2xl bg-red-100 border-[3px] border-black items-center justify-center shadow-hard-sm">
                <MaterialIcons name="percent" size={32} color="#DC2626" />
              </View>
              <View className="flex-1">
                <Text className="font-fredoka text-xl mb-1">Fractions & Decimals</Text>
                <Text className="font-inter text-gray-600">Convert between fractions and percentages</Text>
              </View>
            </View>
          </AppCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
