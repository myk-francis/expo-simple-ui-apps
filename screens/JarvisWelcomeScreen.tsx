import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppStack";
import { StackNavigationProp } from "@react-navigation/stack";

import axios from "axios";
import { jarvisAPIKeyBilling } from "../constants/Api";
import { TMessage } from "../constants/JarvisTypes";

type TJarvisHomeScreenProp = StackNavigationProp<
  RootStackParamList,
  "JarvisHomeScreen"
>;

const JarvisWelcomeScreen = () => {
  const navigation = useNavigation<TJarvisHomeScreenProp>();
  return (
    <SafeAreaView className="flex flex-1 bg-white justify-around">
      <View className="space-y-2">
        <Text className="text-center text-gray-700 font-bold text-4xl">
          Jarvis
        </Text>
        <Text className="text-center tracking-wider font-semibold text-gray-600">
          The Future is here, powered by AI.
        </Text>
      </View>

      <View className="flex-row justify-center">
        <Image
          testID="jarvis-image"
          source={require("../assets/jarvis/welcome.png")}
          className="w-72 h-72"
        />
      </View>

      <TouchableOpacity
        className="bg-emerald-600 mx-5 p-4 rounded-2xl"
        onPress={() => navigation.navigate("JarvisHomeScreen")}
      >
        <Text className="text-center text-white font-bold text-2xl">
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default JarvisWelcomeScreen;
