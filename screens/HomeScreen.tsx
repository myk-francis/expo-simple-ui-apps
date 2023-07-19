import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppStack";
import { StackNavigationProp } from "@react-navigation/stack";

type TMoviescreenProp = StackNavigationProp<RootStackParamList, "MoviesScreen">;
type TOnBoardingScreenProp = StackNavigationProp<
  RootStackParamList,
  "OnBoardingScreen"
>;
type TOnBoardingHomeScreenProp = StackNavigationProp<
  RootStackParamList,
  "OnBoardingHomeScreen"
>;
type TJarvisWelcomeScreenProp = StackNavigationProp<
  RootStackParamList,
  "JarvisWelcomeScreen"
>;

const HomeScreen = () => {
  const navigation = useNavigation<
    | TMoviescreenProp
    | TJarvisWelcomeScreenProp
    | TOnBoardingScreenProp
    | TOnBoardingHomeScreenProp
  >();

  return (
    <View className="flex-1 items-center justify-start my-8">
      <Text style={styles.title}>Designs</Text>
      <View style={styles.separator} />
      <TouchableOpacity
        onPress={() => navigation.navigate("MoviesScreen")}
        className="h-10 w-1/2 bg-blue-400 flex items-center justify-center rounded-lg mb-4"
      >
        <Text testID="movie-btn" className=" font-semibold text-white">
          Movie App
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("JarvisWelcomeScreen")}
        className="h-10 w-1/2 bg-green-400 flex items-center justify-center rounded-lg mb-4"
      >
        <Text testID="jarvis-btn" className=" font-semibold text-white ">
          Jarvis App
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("OnBoardingScreen")}
        className="h-10 w-1/2 bg-cyan-400 flex items-center justify-center rounded-lg mb-4"
      >
        <Text testID="jarvis-btn" className=" font-semibold text-white ">
          OnBoarding App
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("OnBoardingScreen")}
        className="h-10 w-1/2 bg-emerald-400 flex items-center justify-center rounded-lg mb-4"
      >
        <Text testID="jarvis-btn" className=" font-semibold text-white ">
          Movies Animated
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    color: "black",
  },
});
