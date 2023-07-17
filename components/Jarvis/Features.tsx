import { View, Text, Image } from "react-native";
import React from "react";

const Features = () => {
  return (
    <View className="w-full h-[60%] space-y-4">
      <Text className="text-gray-700 font-semibold text-3xl">Features</Text>
      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            testID="chatgpt-icon"
            source={require("../../assets/jarvis/chatgptIcon.png")}
            className="w-10 h-10"
          />
          <Text className="font-semibold text-gray-700 text-lg">ChatGPT</Text>
        </View>
        <Text>
          ChatGPT can provide you with knowledgeable responses, assists you with
          creative ideas on a wide range of topics.
        </Text>
      </View>

      <View className="bg-purple-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            testID="chatgpt-icon"
            source={require("../../assets/jarvis/dalleIcon.png")}
            className="w-10 h-10"
          />
          <Text className="font-semibold text-gray-700 text-lg">DALL-E</Text>
        </View>
        <Text>
          DALL-E can generate imaginative and diverse images from textual
          descriptions, expanding the boundaries of virtual creativity.
        </Text>
      </View>

      <View className="bg-cyan-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            testID="chatgpt-icon"
            source={require("../../assets/jarvis/smartaiIcon.png")}
            className="w-10 h-10"
          />
          <Text className="font-semibold text-gray-700 text-lg">Smart AI</Text>
        </View>
        <Text>
          A powerful voice assistant with abilities of ChatGPT and Dall-E,
          providing you the best of both worlds.
        </Text>
      </View>
    </View>
  );
};

export default Features;
