import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { TMessage, TMessages } from "../constants/JarvisTypes";
import Features from "../components/Jarvis/Features";
import { dummyMessages } from "../constants/dummyData";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const JarvisHomeScreen = () => {
  const [messages, setMessages] = React.useState<TMessage[] | []>(
    dummyMessages
  );
  const [recording, setRecording] = React.useState(false);
  const [speaking, setSpeaking] = React.useState(false);

  const ClearMessages = () => {
    setMessages([]);
  };

  const StopSpeaking = () => {
    setSpeaking(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 mx-5">
        {/* bot icon */}
        <View className="flex-row justify-center">
          <Image
            testID="bot-image"
            source={require("../assets/jarvis/bot.png")}
            className="w-40 h-40"
          />
        </View>

        {/* features || messages */}
        {messages.length > 0 ? (
          <View className="flex-1 space-y-2">
            <Text className="text-gray-700 text-lg font-semibold ml-1">
              Assistant
            </Text>
            <View className="h-[80%] bg-neutral-200 rounded-3xl p-4">
              <ScrollView
                className="space-y-4"
                bounces={false}
                showsVerticalScrollIndicator={false}
              >
                {messages.map((message, index) => {
                  if (message.role === "assistant") {
                    if (message.content.includes("https")) {
                      //its an AI image
                      return (
                        <View
                          testID="response-image"
                          key={index}
                          className="flex-row justify-start"
                        >
                          <View className=" bg-emerald-100 rounded-2xl p-2 rounded-tl-none">
                            <Image
                              source={{ uri: message.content }}
                              className="w-48 h-48 rounded-2xl"
                            />
                          </View>
                        </View>
                      );
                    } else {
                      //text response
                      return (
                        <View
                          key={index}
                          testID="response-text"
                          className="flex-row justify-start"
                        >
                          <View className="w-[70%] bg-emerald-100 rounded-xl p-2 rounded-tl-none italic">
                            <Text className="">{message.content}</Text>
                          </View>
                        </View>
                      );
                    }
                  } else {
                    //user
                    return (
                      <View
                        key={index}
                        testID="user-request-text"
                        className="flex-row justify-end"
                      >
                        <View className="w-[70%] bg-white rounded-xl p-2 rounded-tr-none">
                          <Text className="">{message.content}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}
      </View>

      {/* recording, clear and stop speech */}
      <View className="flex-row items-center justify-center mb-4">
        {recording ? (
          <TouchableOpacity>
            <Image
              source={require("../assets/jarvis/voiceLoading.gif")}
              className="w-20 h-20 rounded-full"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Image
              source={require("../assets/jarvis/recordingIcon.png")}
              className="w-20 h-20 rounded-full"
            />
          </TouchableOpacity>
        )}

        {messages.length > 0 ? (
          <TouchableOpacity
            onPress={() => ClearMessages()}
            className="bg-neutral-400 p-3 rounded-full absolute right-10 "
          >
            <MaterialIcons
              testID="clear-btn"
              name={"clear"}
              size={30}
              color={"black"}
            />
          </TouchableOpacity>
        ) : null}

        {speaking ? (
          <TouchableOpacity
            onPress={() => StopSpeaking()}
            className="bg-neutral-400 p-3 rounded-full absolute left-10 "
          >
            <Entypo
              testID="stop-btn"
              name={"controller-stop"}
              size={30}
              color={"#ed544a"}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default JarvisHomeScreen;
