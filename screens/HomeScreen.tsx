import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
type TPinCodeScreenProp = StackNavigationProp<
  RootStackParamList,
  "PinCodeScreen"
>;
type TStackedCardsScreenProp = StackNavigationProp<
  RootStackParamList,
  "StackedCardsScreen"
>;
type THeadphonesScreenProp = StackNavigationProp<
  RootStackParamList,
  "HeadphonesScreen"
>;
type TAdvancedCoroselScreenProp = StackNavigationProp<
  RootStackParamList,
  "AdvancedCoroselScreen"
>;
type TParallaxEffectScreenProp = StackNavigationProp<
  RootStackParamList,
  "ParallaxEffectScreen"
>;
type TAnimatedTabsScreenProp = StackNavigationProp<
  RootStackParamList,
  "AnimatedTabsScreen"
>;
type TStackedCardsScreenTwoProp = StackNavigationProp<
  RootStackParamList,
  "StackedCardsScreenTwo"
>;
type TDonutChartScreenProp = StackNavigationProp<
  RootStackParamList,
  "DonutChartScreen"
>;
type TAnotherCorouselScreenProp = StackNavigationProp<
  RootStackParamList,
  "AnotherCorouselScreen"
>;

const HomeScreen = () => {
  const navigation = useNavigation<
    | TMoviescreenProp
    | TJarvisWelcomeScreenProp
    | TOnBoardingScreenProp
    | TOnBoardingHomeScreenProp
    | TPinCodeScreenProp
    | TStackedCardsScreenProp
    | THeadphonesScreenProp
    | TAdvancedCoroselScreenProp
    | TParallaxEffectScreenProp
    | TAnimatedTabsScreenProp
    | TStackedCardsScreenTwoProp
    | TDonutChartScreenProp
    | TAnotherCorouselScreenProp
  >();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "flex-start",
          marginVertical: 20,
          paddingBottom: 4,
        }}
      >
        <Text style={styles.title}>Designs</Text>
        {/* <View style={styles.separator} /> */}
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
          <Text testID="onboarding-btn" className=" font-semibold text-white ">
            OnBoarding App
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MoviesAnimationsScreen")}
          className="h-10 w-1/2 bg-orange-400 flex items-center justify-center rounded-lg mb-4"
        >
          <Text
            testID="movies-animated-btn"
            className=" font-semibold text-white "
          >
            Movies Animated
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("StackedCardsScreen")}
          className="h-10 w-1/2 bg-purple-400 flex items-center justify-center rounded-lg mb-4"
        >
          <Text
            testID="stacked-cards-btn"
            className=" font-semibold text-white "
          >
            Stacked Cards
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("HeadphonesScreen")}
          className="h-10 w-1/2 bg-yellow-400 flex items-center justify-center rounded-lg mb-4"
        >
          <Text testID="headphones-btn" className=" font-semibold text-white ">
            Headphones
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("AdvancedCoroselScreen")}
          className="h-10 w-1/2 bg-emerald-400 flex items-center justify-center rounded-lg mb-4"
        >
          <Text testID="3d-btn" className=" font-semibold text-white ">
            3D Carousel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SlickCarouselScreen")}
          className="h-10 w-1/2 bg-lime-400 flex items-center justify-center rounded-lg mb-4"
        >
          <Text testID="slick-btn" className=" font-semibold text-white ">
            Slick Carousel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ParallaxEffectScreen")}
          className="h-10 w-1/2 bg-sky-500 flex items-center justify-center rounded-lg mb-4"
        >
          <Text testID="parallax-btn" className=" font-semibold text-white ">
            Parallax Effect
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("AnimatedTabsScreen")}
          className="h-10 w-1/2 bg-teal-400 flex items-center justify-center rounded-lg mb-4"
        >
          <Text testID="tabls-btn" className=" font-semibold text-white ">
            Animated Tabs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("StackedCardsScreenTwo")}
          className="h-10 w-1/2 bg-indigo-400 flex items-center justify-center rounded-lg mb-4"
        >
          <Text testID="tabls-btn" className=" font-semibold text-white ">
            Stacked Cards 2
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("DonutChartScreen")}
          className="h-10 w-1/2 bg-violet-400 flex items-center justify-center rounded-lg mb-4"
        >
          <Text testID="tabls-btn" className=" font-semibold text-white ">
            Donut Chart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("AnotherCorouselScreen")}
          className="h-10 w-1/2 bg-fuchsia-400 flex items-center justify-center rounded-lg mb-4"
        >
          <Text
            testID="another-corousel-btn"
            className=" font-semibold text-white "
          >
            Another Corousel
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    color: "black",
  },
});
