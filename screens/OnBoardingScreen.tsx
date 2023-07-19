import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Onboarding from "react-native-onboarding-swiper";

const OnBoardingScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Onboarding
        containerStyles={{
          paddingHorizontal: 15,
        }}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <View>
                <Text>Onboarding 1</Text>
              </View>
            ),
            title: "Boost Productivity",
            subtitle: "We are glad you are here.",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View>
                <Text>Onboarding 2</Text>
              </View>
            ),
            title: "Work Seamlessly",
            subtitle: "Get your work done seamlessly without intruptions.",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View>
                <Text>Onboarding 3</Text>
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
