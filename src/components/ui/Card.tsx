import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { cn } from '@/lib/utils';
import { HardShadowWrapper } from './HardShadowView';

interface AppCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  onPress?: () => void;
  className?: string;
}

export const AppCard = ({ children, onPress, onClick, className }: AppCardProps) => {
  const handlePress = onPress || onClick;
  
  const Content = (
    <HardShadowWrapper className={cn("p-6 bg-white mb-4", className)} offset={6} radius={20}>
      {children}
    </HardShadowWrapper>
  );

  if (handlePress) {
    return (
      <TouchableOpacity activeOpacity={0.95} onPress={handlePress}>
        {Content}
      </TouchableOpacity>
    );
  }

  return <View>{Content}</View>;
};
