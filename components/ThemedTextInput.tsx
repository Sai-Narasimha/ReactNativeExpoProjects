import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedTextInput({ style, lightColor, darkColor, ...otherProps }: ThemedTextInputProps) {
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    return <TextInput style={[{ borderColor, color }, styles.input, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        fontSize: 18,
    },
});
