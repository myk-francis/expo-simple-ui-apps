import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import MoviesScreen from "../screens/MoviesScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";

export type RootStackParamList = {
  HomeScreen: undefined;
  MoviesScreen: undefined;
  MovieDetailsScreen: undefined;
  // Feed: { sort: 'latest' | 'top' } | undefined;
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
    </Stack.Navigator>
  );
};

export default AppStack;
