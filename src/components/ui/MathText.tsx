import React from 'react';
import { View, Text } from 'react-native';

interface MathTextProps {
  html: string;
  fontSize?: number;
  color?: string;
}

export const MathText = ({ html, fontSize = 32, color = 'black' }: MathTextProps) => {
  if (!html.includes('<math>')) {
    return <Text style={{ fontSize, color, fontFamily: 'Fredoka_600SemiBold' }}>{html}</Text>;
  }

  // Clean up the container tags
  const content = html.replace(/<\/?math>/g, '').replace(/<\/?mrow>/g, '');
  
  // Regex to split by tags, keeping the tags
  const regex = /(<mfrac>.*?<\/mfrac>|<mn>.*?<\/mn>|<mo>.*?<\/mo>)/g;
  
  // Split and filter empty strings
  const tokens = content.split(regex).filter(t => t.trim() !== '');
  
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
      {tokens.map((token, index) => {
        if (token.startsWith('<mfrac>')) {
          const inner = token.replace(/<\/?mfrac>/g, '');
          const nums = [...inner.matchAll(/<mn>(.*?)<\/mn>/g)].map(m => m[1]);
          const n = nums[0];
          const d = nums[1];
          
          return (
             <View key={index} style={{ alignItems: 'center', marginHorizontal: 4 }}>
               <Text style={{ fontSize: fontSize * 0.7, color, fontFamily: 'Fredoka_600SemiBold', textAlign: 'center' }}>{n}</Text>
               <View style={{ height: 2, backgroundColor: color, width: '100%', minWidth: 20, marginVertical: 2 }} />
               <Text style={{ fontSize: fontSize * 0.7, color, fontFamily: 'Fredoka_600SemiBold', textAlign: 'center' }}>{d}</Text>
             </View>
          );
        } else if (token.startsWith('<mn>')) {
          const val = token.replace(/<\/?mn>/g, '');
          return <Text key={index} style={{ fontSize, color, fontFamily: 'Fredoka_600SemiBold' }}>{val}</Text>;
        } else if (token.startsWith('<mo>')) {
          const val = token.replace(/<\/?mo>/g, '');
          return <Text key={index} style={{ fontSize, color, fontFamily: 'Fredoka_600SemiBold' }}>{val}</Text>;
        } else {
          return <Text key={index} style={{ fontSize, color, fontFamily: 'Fredoka_600SemiBold' }}>{token}</Text>;
        }
      })}
    </View>
  );
};
