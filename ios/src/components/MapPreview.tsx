import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';

interface MapPreviewProps {
  children?: React.ReactNode;
}

export const MapPreview = ({ children }: MapPreviewProps) => {
  const { gradients } = useTheme();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/12/1206/1538@2x.png'
        }}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={[...gradients.background, 'rgba(4,7,15,0.2)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    overflow: 'hidden',
    minHeight: 260,
    marginBottom: 24
  }
});
