import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Animated, Easing } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { TextField } from '@/components/ui/Input';
import { FilledButton, IconButton } from '@/components/ui/Button';
import { AppCard } from '@/components/ui/Card';
import { MathText } from '@/components/ui/MathText';
import { 
  generateTablesQuestion, 
  generatePracticeQuestion, 
  generatePowersQuestion, 
  generateFractionsQuestion,
  Question
} from '@/lib/question-helpers';
import { STAR_PATH } from '@/lib/constants';
import Svg, { Path } from 'react-native-svg';

type ExecutionScreenRouteProp = RouteProp<RootStackParamList, 'Execution'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Execution'>;

export const ExecutionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ExecutionScreenRouteProp>();
  const { mode, config } = route.params;

  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [showHint, setShowHint] = useState(false);
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const starScaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    nextQuestion();
  }, []);

  const nextQuestion = () => {
    let q: Question | null = null;
    // We assume the config matches the mode based on types, but we need to cast or check
    try {
        if (mode === 'tables') {
          q = generateTablesQuestion(config as any);
        } else if (mode === 'practice') {
          q = generatePracticeQuestion(config as any);
        } else if (mode === 'powers') {
          q = generatePowersQuestion(config as any);
        } else if (mode === 'fractions') {
          q = generateFractionsQuestion(config as any);
        }
    } catch (e) {
        console.error(e);
    }
    
    if (q) {
      setQuestion(q);
      setUserAnswer('');
      setFeedback(null);
      setShowHint(false);
      
      // Reset animations
      scaleAnim.setValue(0.9);
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
  };

  const checkAnswer = () => {
    if (!question) return;

    // Normalize answer (trim, lowercase)
    const normalizedUser = userAnswer.trim().toLowerCase();
    const normalizedCorrect = question.answer.toString().toLowerCase();

    let isCorrect = normalizedUser === normalizedCorrect;

    // Special handling for fractions/decimals if needed (e.g. 0.5 vs .5)
    if (!isCorrect && !isNaN(Number(normalizedUser)) && !isNaN(Number(normalizedCorrect))) {
         isCorrect = Math.abs(Number(normalizedUser) - Number(normalizedCorrect)) < 0.001;
    }

    if (isCorrect) {
      setFeedback('correct');
      setStats(s => ({ ...s, correct: s.correct + 1, total: s.total + 1 }));
      
      // Star animation
      starScaleAnim.setValue(0);
      Animated.sequence([
        Animated.spring(starScaleAnim, { toValue: 1.2, friction: 3, useNativeDriver: true }),
        Animated.timing(starScaleAnim, { toValue: 0, duration: 500, delay: 500, useNativeDriver: true })
      ]).start(() => nextQuestion());

    } else {
      setFeedback('incorrect');
      setStats(s => ({ ...s, total: s.total + 1 }));
      
      // Shake animation
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start(() => {
        setUserAnswer(''); // Optional: clear answer on wrong
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-row items-center justify-between px-4 py-4 bg-white/80 border-b-[3px] border-black rounded-b-3xl mb-4 z-10">
          <IconButton icon="close" onPress={() => navigation.goBack()} />
          <View className="flex-row items-center gap-2 bg-white px-3 py-1 rounded-full border-2 border-black">
            <Text className="font-bold text-green-600">{stats.correct}</Text>
            <Text className="font-bold text-gray-400">/</Text>
            <Text className="font-bold text-black">{stats.total}</Text>
          </View>
          <IconButton 
            icon="lightbulb" 
            color={showHint ? "#EAB308" : "black"} 
            onPress={() => setShowHint(!showHint)} 
          />
        </View>

        <View className="flex-1 px-4 justify-center pb-20">
          <Animated.View 
            style={{ 
                transform: [{ scale: scaleAnim }, { translateX: shakeAnim }] 
            }}
          >
            <AppCard className="items-center py-10 relative overflow-hidden">
               {/* Star Animation Overlay */}
               <Animated.View 
                 pointerEvents="none"
                 style={{
                     position: 'absolute',
                     top: 0, left: 0, right: 0, bottom: 0,
                     alignItems: 'center',
                     justifyContent: 'center',
                     zIndex: 20,
                     transform: [{ scale: starScaleAnim }],
                     opacity: starScaleAnim.interpolate({
                         inputRange: [0, 0.1, 1],
                         outputRange: [0, 1, 1]
                     })
                 }}
               >
                   <Svg width="200" height="200" viewBox="0 0 275 275">
                       <Path d={STAR_PATH} fill="#FFD700" stroke="black" strokeWidth="5" />
                   </Svg>
               </Animated.View>

              {question && (
                <View className="items-center w-full">
                    <View className="mb-8">
                        <MathText html={question.question} fontSize={48} />
                    </View>
                    
                    {showHint && question.hint && (
                        <View className="bg-yellow-100 px-4 py-2 rounded-xl border-2 border-yellow-500 mb-4">
                            <Text className="font-fredoka text-yellow-800">{question.hint}</Text>
                        </View>
                    )}

                    <View className="w-full max-w-xs">
                        <TextField 
                            label={question.answerType === 'fraction' ? "Enter fraction (e.g. 1/2)" : "Answer"}
                            value={userAnswer}
                            onChangeText={setUserAnswer}
                            keyboardType={question.answerType === 'fraction' ? 'default' : 'numeric'}
                            autoFocus
                            onSubmitEditing={checkAnswer}
                            returnKeyType="done"
                        />
                    </View>

                    <View className="w-full max-w-xs mt-8">
                        <FilledButton onPress={checkAnswer} className="w-full">
                            CHECK ANSWER
                        </FilledButton>
                    </View>
                </View>
              )}
            </AppCard>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
