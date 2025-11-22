import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { cn } from '@/lib/utils';
import { HardShadowWrapper } from './HardShadowView';
import { MaterialIcons } from '@expo/vector-icons';

interface NumberChipProps {
  value: number;
  selected: boolean;
  onToggle: (value: number) => void;
}

export const NumberChip = ({ value, selected, onToggle }: NumberChipProps) => {
  return (
    <TouchableOpacity onPress={() => onToggle(value)} activeOpacity={0.8}>
      <HardShadowWrapper 
        className={cn(
          "w-full aspect-square flex items-center justify-center bg-white",
          selected && "bg-primary"
        )}
        offset={selected ? 0 : 3}
        radius={16}
      >
        <Text className={cn(
          "font-fredoka text-xl font-bold",
          selected ? "text-white" : "text-black"
        )}>
          {value}
        </Text>
      </HardShadowWrapper>
    </TouchableOpacity>
  );
};

interface ChoiceChipProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
}

export const ChoiceChip = ({ label, selected, onSelect, className }: ChoiceChipProps) => {
  return (
    <TouchableOpacity onPress={onSelect} activeOpacity={0.8} className={className}>
      <HardShadowWrapper 
        className={cn(
          "h-10 px-4 flex-row items-center justify-center gap-2 bg-white",
          selected && "bg-secondary"
        )}
        offset={selected ? 1 : 2}
        radius={20}
      >
        {selected && <MaterialIcons name="check" size={20} color="black" />}
        <Text className="font-fredoka font-bold text-black">{label}</Text>
      </HardShadowWrapper>
    </TouchableOpacity>
  );
};
