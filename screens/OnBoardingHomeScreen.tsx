import { View, SafeAreaView, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const OnBoardingHomeScreen = () => {
  const ref = React.useRef<LottieView | null>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current?.play();
    }
  }, [ref.current]);

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <LottieView
        ref={ref}
        autoPlay={false}
        loop={false}
        style={{
          width: 200,
          height: 300,
          // backgroundColor: "#fff",
        }}
        source={require("../assets/onboarding/confetti1.json")}
      />
      <Text className="text-3xl mb-4">Home Page</Text>
    </SafeAreaView>
  );
};

export default OnBoardingHomeScreen;
