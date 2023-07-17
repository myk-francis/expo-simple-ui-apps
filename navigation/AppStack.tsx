import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import MoviesScreen from "../screens/MoviesScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import ActorScreen from "../screens/ActorScreen";
import SearchMovieScreen from "../screens/SearchMovieScreen";
import { MovieProp, ActorProp, CastProp } from "../constants/Types";
import JarvisHomeScreen from "../screens/JarvisHomeScreen";
import JarvisWelcomeScreen from "../screens/JarvisWelcomeScreen";

export type RootStackParamList = {
  HomeScreen: undefined;
  MoviesScreen: undefined;
  MovieDetailsScreen: MovieProp;
  ActorScreen: CastProp;
  SearchMovieScreen: undefined;
  JarvisHomeScreen: undefined;
  JarvisWelcomeScreen: undefined;
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
    </Stack.Navigator>
  );
};

export default AppStack;
