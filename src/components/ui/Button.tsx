import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { cn } from '@/lib/utils';
import { HardShadowWrapper } from './HardShadowView';
import { MaterialIcons } from '@expo/vector-icons';

interface ButtonProps {
  onClick?: () => void;
  onPress?: () => void; // RN standard
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export const FilledButton = ({ onPress, onClick, children, className, style, disabled, loading }: ButtonProps) => {
  const handlePress = onPress || onClick;
  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={handlePress} 
      disabled={disabled || loading}
      style={style}
    >
      <HardShadowWrapper 
        className={cn("bg-primary h-14 px-8 flex-row items-center justify-center", className)} 
        offset={4}
        radius={16}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <View className="flex-row items-center justify-center">
            {typeof children === 'string' ? (
               <Text className="text-white font-fredoka text-lg uppercase font-bold tracking-wide">{children}</Text>
            ) : children}
          </View>
        )}
      </HardShadowWrapper>
    </TouchableOpacity>
  );
};

export const TonalButton = ({ onPress, onClick, children, className, style }: ButtonProps) => {
  const handlePress = onPress || onClick;
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress} style={style}>
      <HardShadowWrapper 
        className={cn("bg-secondary h-12 px-6 flex-row items-center justify-center", className)} 
        offset={3}
        radius={12}
      >
        <View className="flex-row items-center justify-center">
            {typeof children === 'string' ? (
               <Text className="text-black font-fredoka text-base font-bold">{children}</Text>
            ) : children}
        </View>
      </HardShadowWrapper>
    </TouchableOpacity>
  );
};

export const IconButton = ({ onPress, onClick, icon, className, size = 24, color = 'black' }: ButtonProps & { icon: keyof typeof MaterialIcons.glyphMap, size?: number, color?: string }) => {
  const handlePress = onPress || onClick;
  return (
    <TouchableOpacity onPress={handlePress} className={cn("p-2 rounded-full", className)}>
       <MaterialIcons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};
