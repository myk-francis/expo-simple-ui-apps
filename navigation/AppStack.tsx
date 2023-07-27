import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import MoviesScreen from "../screens/MoviesScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import ActorScreen from "../screens/ActorScreen";
import SearchMovieScreen from "../screens/SearchMovieScreen";
import { MovieProp, ActorProp, CastProp } from "../constants/MovieTypes";
import JarvisHomeScreen from "../screens/JarvisHomeScreen";
import JarvisWelcomeScreen from "../screens/JarvisWelcomeScreen";
import OnBoardingHomeScreen from "../screens/OnBoardingHomeScreen";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import MoviesAnimationsScreen from "../screens/MoviesAnimationsScreen";
import PinCodeScreen from "../screens/PinCodeScreen";
import StackedCardsScreen from "../screens/StackedCardsScreen";
import HeadphonesScreen from "../screens/HeadphonesScreen";
import AdvancedCoroselScreen from "../screens/AdvancedCoroselScreen";
import SlickCarouselScreen from "../screens/SlickCarouselScreen";
import ParallaxEffectScreen from "../screens/ParallaxEffectScreen";
import AnimatedTabsScreen from "../screens/AnimatedTabsScreen";
import StackedCardsScreenTwo from "../screens/StackedCardsScreenTwo";
import DonutChartScreen from "../screens/DonutChartScreen";
import AnotherCorouselScreen from "../screens/AnotherCorouselScreen";
import SyncronisedFlatlistsScreen from "../screens/SyncronisedFlatlistsScreen";
import CustomDrawerScreen from "../screens/CustomDrawerScreen";

export type RootStackParamList = {
  HomeScreen: undefined;
  MoviesScreen: undefined;
  MovieDetailsScreen: MovieProp;
  ActorScreen: CastProp;
  SearchMovieScreen: undefined;
  JarvisHomeScreen: undefined;
  JarvisWelcomeScreen: undefined;
  OnBoardingScreen: undefined;
  OnBoardingHomeScreen: undefined;
  MoviesAnimationsScreen: undefined;
  PinCodeScreen: undefined;
  StackedCardsScreen: undefined;
  HeadphonesScreen: undefined;
  AdvancedCoroselScreen: undefined;
  SlickCarouselScreen: undefined;
  ParallaxEffectScreen: undefined;
  AnimatedTabsScreen: undefined;
  StackedCardsScreenTwo: undefined;
  DonutChartScreen: undefined;
  AnotherCorouselScreen: undefined;
  SyncronisedFlatlistsScreen: undefined;
  CustomDrawerScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="MoviesScreen"
        options={{ headerShown: false }}
        component={MoviesScreen}
      />
      <Stack.Screen
        name="MovieDetailsScreen"
        options={{ headerShown: false }}
        component={MovieDetailsScreen}
      />
      <Stack.Screen
        name="ActorScreen"
        options={{ headerShown: false }}
        component={ActorScreen}
      />
      <Stack.Screen
        name="SearchMovieScreen"
        options={{ headerShown: false }}
        component={SearchMovieScreen}
      />
      <Stack.Screen
        name="JarvisHomeScreen"
        options={{ headerShown: false }}
        component={JarvisHomeScreen}
      />
      <Stack.Screen
        name="JarvisWelcomeScreen"
        options={{ headerShown: false }}
        component={JarvisWelcomeScreen}
      />
      <Stack.Screen
        name="OnBoardingHomeScreen"
        options={{ headerShown: false }}
        component={OnBoardingHomeScreen}
      />
      <Stack.Screen
        name="OnBoardingScreen"
        options={{ headerShown: false }}
        component={OnBoardingScreen}
      />
      <Stack.Screen
        name="MoviesAnimationsScreen"
        options={{ headerShown: false }}
        component={MoviesAnimationsScreen}
      />
      <Stack.Screen
        name="PinCodeScreen"
        options={{ headerShown: false }}
        component={PinCodeScreen}
      />
      <Stack.Screen
        name="StackedCardsScreen"
        options={{ headerShown: false }}
        component={StackedCardsScreen}
      />
      <Stack.Screen
        name="HeadphonesScreen"
        options={{ headerShown: false }}
        component={HeadphonesScreen}
      />
      <Stack.Screen
        name="AdvancedCoroselScreen"
        options={{ headerShown: false }}
        component={AdvancedCoroselScreen}
      />
      <Stack.Screen
        name="SlickCarouselScreen"
        options={{ headerShown: false }}
        component={SlickCarouselScreen}
      />
      <Stack.Screen
        name="ParallaxEffectScreen"
        options={{ headerShown: false }}
        component={ParallaxEffectScreen}
      />
      <Stack.Screen
        name="AnimatedTabsScreen"
        options={{ headerShown: false }}
        component={AnimatedTabsScreen}
      />
      <Stack.Screen
        name="StackedCardsScreenTwo"
        options={{ headerShown: false }}
        component={StackedCardsScreenTwo}
      />
      <Stack.Screen
        name="DonutChartScreen"
        options={{ headerShown: false }}
        component={DonutChartScreen}
      />
      <Stack.Screen
        name="AnotherCorouselScreen"
        options={{ headerShown: false }}
        component={AnotherCorouselScreen}
      />
      <Stack.Screen
        name="SyncronisedFlatlistsScreen"
        options={{ headerShown: false }}
        component={SyncronisedFlatlistsScreen}
      />
      <Stack.Screen
        name="CustomDrawerScreen"
        options={{ headerShown: false }}
        component={CustomDrawerScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
