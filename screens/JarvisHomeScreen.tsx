import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { TMessage, TMessages } from "../constants/JarvisTypes";
import Features from "../components/Jarvis/Features";

const JarvisHomeScreen = () => {
  const [messages, setMessages] = React.useState<TMessage[] | []>([]);
  return (
    <SafeAreaView className="flex flex-1 mx-5 bg-white">
      {/* bot icon */}
      <View className="flex-row justify-center">
        <Image
          testID="bot-image"
          source={require("../assets/jarvis/bot.png")}
          className="w-[15%] h-[15%]"
        />
      </View>

      {/* features || messages */}
      {messages.length > 0 ? <View></View> : <Features />}
    </SafeAreaView>
  );
};

export default JarvisHomeScreen;
