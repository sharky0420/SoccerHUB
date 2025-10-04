import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { HomeScreen } from '../screens/HomeScreen';
import { VenueDetailScreen } from '../screens/VenueDetailScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { MapScreen } from '../screens/MapScreen';
import { FiltersScreen } from '../screens/FiltersScreen';
import { RootStackParamList, TabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TAB_ICONS: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home-outline',
  Favorites: 'heart-outline',
  Map: 'map-outline',
  Profile: 'person-outline'
};

const GlassTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: Math.max(insets.bottom + 4, 12) }]}>
      <BlurView intensity={60} tint="dark" style={styles.blurLayer}>
        <LinearGradient
          colors={[colors.surface, 'rgba(5,8,15,0.5)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const iconName = TAB_ICONS[route.name as keyof TabParamList];

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={route.name}
                onPress={onPress}
                style={[styles.tabButton, isFocused && styles.tabButtonActive]}
              >
                <Ionicons
                  name={iconName}
                  size={isFocused ? 26 : 22}
                  color={isFocused ? colors.white : 'rgba(255,255,255,0.7)'}
                />
              </TouchableOpacity>
            );
          })}
        </LinearGradient>
      </BlurView>
    </View>
  );
};

const Tabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.7)'
      }}
      tabBar={(props) => <GlassTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  const { navigationTheme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: navigationTheme.colors.background }
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Filters" component={FiltersScreen} />
      <Stack.Screen name="VenueDetail" component={VenueDetailScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0
  },
  blurLayer: {
    borderRadius: 28,
    overflow: 'hidden'
  },
  gradient: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20
  },
  tabButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.08)'
  }
});
