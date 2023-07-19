import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppStack";
import { StackNavigationProp } from "@react-navigation/stack";

const { width, height } = Dimensions.get("window");

type TOnBoardingHomeScreenProp = StackNavigationProp<
  RootStackParamList,
  "OnBoardingHomeScreen"
>;

const DoneButton = ({ ...props }) => {
  return (
    <TouchableOpacity {...props} className="p-4 bg-white rounded-l-full">
      <Text>Done</Text>
    </TouchableOpacity>
  );
};

const OnBoardingScreen = () => {
  const navigation = useNavigation<TOnBoardingHomeScreenProp>();

  const handleDone = () => {
    navigation.navigate("OnBoardingHomeScreen");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Onboarding
        bottomBarHighlight={false}
        onDone={() => handleDone()}
        onSkip={() => handleDone()}
        // DoneButtonComponent={() => <DoneButton />}
        containerStyles={{
          paddingHorizontal: 15,
        }}
        pages={[
          {
            backgroundColor: "#a7f3d0",
            image: (
              <View>
                <LottieView
                  autoPlay
                  loop
                  style={{
                    width: 200,
                    height: 300,
                    // backgroundColor: "#fff",
                  }}
                  source={require("../assets/onboarding/boost.json")}
                />
              </View>
            ),
            title: "Boost Productivity",
            subtitle: "We are glad you are here.",
          },
          {
            backgroundColor: "#fef3c7",
            image: (
              <View>
                <LottieView
                  autoPlay
                  loop
                  style={{
                    width: 200,
                    height: 300,
                    // backgroundColor: "#fff",
                  }}
                  source={require("../assets/onboarding/work.json")}
                />
              </View>
            ),
            title: "Work Seamlessly",
            subtitle: "Get your work done seamlessly without intruptions.",
          },
          {
            backgroundColor: "#a78bfa",
            image: (
              <View>
                <LottieView
                  autoPlay
                  loop
                  style={{
                    width: 200,
                    height: 300,
                    // backgroundColor: "#fff",
                  }}
                  source={require("../assets/onboarding/achieve.json")}
                />
              </View>
            ),
            title: "Achive Higher Goals",
            subtitle:
              "By boosting your productivity we help you achieve higher goals.",
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
