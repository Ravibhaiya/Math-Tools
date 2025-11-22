import React, { useState } from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';

interface TextFieldProps extends TextInputProps {
  label: string;
  containerClassName?: string;
}

export const TextField = ({ label, className, containerClassName, value, ...props }: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <View className={cn("mt-5 relative", containerClassName)}>
       <View
        className="absolute top-[3px] left-[3px] w-full h-14 bg-gray-200 rounded-2xl"
        style={{ zIndex: -1 }}
      /> 
      <TextInput
        className={cn(
          "h-14 w-full px-5 rounded-2xl border-[3px] bg-white font-nunito font-bold text-lg",
          isFocused ? "border-black shadow-md" : "border-black",
          className
        )}
        style={{ 
            elevation: isFocused ? 4 : 0,
        }}
        placeholderTextColor="transparent"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        {...props}
      />
      <View 
        className={cn(
          "absolute left-5 pointer-events-none bg-white px-2 transition-all duration-200",
          (isFocused || hasValue) ? "-top-3" : "top-4"
        )}
      >
        <Text 
          className={cn(
            "font-fredoka transition-all",
            (isFocused || hasValue) ? "text-sm text-primary font-bold" : "text-base text-gray-500"
          )}
        >
          {label}
        </Text>
      </View>
    </View>
  );
};
