import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';
import { FiltersProvider } from './src/context/FiltersContext';
import { FavoritesProvider } from './src/context/FavoritesContext';

const ThemedNavigation = () => {
  const { navigationTheme } = useTheme();

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="light" />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <FiltersProvider>
          <FavoritesProvider>
            <ThemedNavigation />
          </FavoritesProvider>
        </FiltersProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
