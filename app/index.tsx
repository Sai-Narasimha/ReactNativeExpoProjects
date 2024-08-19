import { View, Text, StyleSheet, Image, ImageBackground, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import type { PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';
import { router } from 'expo-router';
// Correctly import the image

const splashImage = require('../assets/images/th.jpg');

const Index = () => {

  useEffect(() => {
    setTimeout(() => {
      router.push("/todo")
    }, 2000)
  }, [])
  return (
    <ImageBackground
      source={splashImage}
      style={styles.backgroundStyle}
    >
      <ThemedView style={styles.containerStyle}>
        <ThemedText type='title'>TODO APP</ThemedText>
      </ThemedView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  containerStyle: {
    backgroundColor: 'transparent'
  },
  splashImageStyle: {

  },
});

export default Index;
