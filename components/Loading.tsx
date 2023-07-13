import { View, Text, Dimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { theme } from "../constants/Constants";

const { width, height } = Dimensions.get("window");

const Loading = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color={theme.background}
      />
    </View>
  );
};

export default Loading;
