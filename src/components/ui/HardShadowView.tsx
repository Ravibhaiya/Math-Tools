import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

interface HardShadowViewProps extends ViewProps {
  shadowOffset?: number;
  borderColor?: string;
  shadowColor?: string;
  containerStyle?: any;
}

export const HardShadowView: React.FC<HardShadowViewProps> = ({
  children,
  style,
  shadowOffset = 4,
  borderColor = 'black',
  shadowColor = 'black',
  className,
  ...props
}) => {
  // We need to extract borderRadius from style or className if possible to match shadow
  // For now, we assume standard borderRadius from our classes or default to 0.
  // This implementation relies on the parent passing a specific size or flex.
  // If flex, the absolute shadow might behave well.
  
  return (
    <View style={[{ position: 'relative' }, style]} {...props}>
       {/* Shadow Layer */}
      <View
        style={{
          position: 'absolute',
          top: shadowOffset,
          left: shadowOffset,
          right: -shadowOffset,
          bottom: -shadowOffset,
          backgroundColor: shadowColor,
          borderRadius: (style as any)?.borderRadius || 16, // Default for filled-button/card
          zIndex: -1,
        }}
      />
      {/* Content Layer - The border and bg color should be here or on children, but usually here */}
      <View
        className={cn("border-[3px] border-black bg-white", className)}
        style={[{ width: '100%', height: '100%' }, style]} 
        // Note: passing style twice might override width/height logic, 
        // but we need to ensure border logic is applied to the top element.
        // Actually, better structure:
        // Wrapper (relative) -> Shadow (absolute) -> Content (border, bg)
      >
        {children}
      </View>
    </View>
  );
};

// Simplified version that wraps children
export const HardShadowWrapper = ({ 
  children, 
  offset = 4, 
  radius = 16,
  className,
  style 
}: { 
  children: React.ReactNode, 
  offset?: number, 
  radius?: number,
  className?: string,
  style?: any 
}) => {
  return (
    <View style={[{ position: 'relative' }, style]}>
       <View
        style={{
          position: 'absolute',
          top: offset,
          left: offset,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          borderRadius: radius,
        }}
      />
      <View className={cn("bg-white border-[3px] border-black", className)} style={{ borderRadius: radius }}>
        {children}
      </View>
    </View>
  );
};
