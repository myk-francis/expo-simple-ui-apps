import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import React from "react";
import { TMessage } from "../constants/JarvisTypes";
import Features from "../components/Jarvis/Features";
import { dummyMessages } from "../constants/dummyData";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import Voice, {
//   SpeechResultsEvent,
//   SpeechErrorEvent,
// } from "@react-native-voice/voice";
import * as Speech from "expo-speech";
import { apiCall } from "../api/openAI";

const JarvisHomeScreen = () => {
  const [messages, setMessages] = React.useState<TMessage[] | []>([]);
  const [recording, setRecording] = React.useState(false);
  const [speaking, setSpeaking] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [keyBoardVisible, setKeyBoardVisible] = React.useState(false);
  const inputRef = React.useRef<TextInput | null>(null);
  const scrollViewRef = React.useRef<ScrollView | null>(null);
  const [showChat, setShowChat] = React.useState(false);

  const OnChangeText = (text: string) => {
    setResult(text);
  };

  const OnkeyboardSubmit = React.useCallback(() => {
    if (result !== "") {
      if (inputRef?.current) {
        inputRef.current.clear();
      }

      fetchResponse();
    }
  }, [result]);

  const JarvisSpeak = (text: string, rate: number) => {
    Speech.speak(text, {
      language: "en",
      pitch: 1,
      rate: rate,
      onStart: SpeakingStarted,
      onDone: SpeakingCompleted,
      onStopped: StopSpeaking,
      onError: SpeakingError,
    });
  };

  const SpeakingStarted = () => {
    setSpeaking(true);
    console.log("speaking");
  };

  const SpeakingCompleted = () => {
    console.log("speaking completed");
    setSpeaking(false);
  };

  const StopSpeaking = () => {
    setSpeaking(false);
    console.log("speaking stopped");
  };

  const SpeakingError = () => {
    console.log("❌--> speaking error:");
  };

  const ClearMessages = () => {
    setMessages([]);
  };

  // const startRecording = async () => {
  //   setRecording(true);
  //   Speech.stop();
  //   if (Voice) {
  //     try {
  //       await Voice.start("en-US"); // en-US
  //     } catch (error) {
  //       console.log("❌--> error:", error);
  //     }
  //   } else {
  //     console.log("❌--> Voice not loaded:");
  //   }
  // };
  // const stopRecording = async () => {
  //   if (Voice) {
  //     try {
  //       await Voice.stop();
  //       setRecording(false);
  //       // fetchResponse();
  //     } catch (error) {
  //       console.log("❌--> error:", error);
  //     }
  //   } else {
  //     console.log("❌--> Voice not loaded:");
  //   }
  // };

  const clear = () => {
    Speech.stop();
    setSpeaking(false);
    setLoading(false);
    setMessages([]);
  };

  const fetchResponse = async () => {
    if (result.trim().length > 0) {
      setLoading(true);
      let newMessages = [...messages];
      newMessages.push({ role: "user", content: result.trim() });
      setMessages([...newMessages]);

      // scroll to the bottom of the view
      updateScrollView();

      // fetching response from chatGPT with our prompt and old messages
      apiCall(result.trim(), newMessages).then((res) => {
        // console.log("got api data");
        setLoading(false);
        if (res.success) {
          setMessages([...res.data]);
          setResult("");
          updateScrollView();

          // now play the response to user
          startTextToSpeach(res.data[res.data.length - 1]);
        } else {
          Alert.alert("Error", res.data);
          setLoading(false);
        }
      });
    }
  };

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 200);
  };

  const startTextToSpeach = (message: TMessage) => {
    if (!message.content.includes("https")) {
      // playing response with the voice id and voice speed
      JarvisSpeak(message.content, 0.75);
    }
  };

  const speechStartHandler = (e: any) => {
    // Voice.start("en-US");
    console.log("speech start event", e);
  };

  const speechEndHandler = (e: any) => {
    setRecording(false);
    console.log("speech stop event", e);
  };
  const speechResultsHandler = (e: any) => {
    console.log("speech event: ", e);
    const text = e?.value?.[0] || "";
    setResult(text);
  };

  // const speechErrorHandler = (e: SpeechErrorEvent) => {
  //   console.log("❌--> speech error: ", e);
  // };

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyBoardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyBoardVisible(false);
    });

    // voice handler events
    // Voice.onSpeechStart = speechStartHandler;
    // Voice.onSpeechEnd = speechEndHandler;
    // Voice.onSpeechResults = speechResultsHandler;
    // Voice.onSpeechError = speechErrorHandler;

    return () => {
      // destroy the voice instance after component unmounts
      // Voice.destroy().then(Voice.removeAllListeners);
      showSubscription.remove();
      hideSubscription.remove();
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 mx-5">
        {/* bot icon */}

        {!keyBoardVisible ? (
          speaking ? (
            <View className="flex-row justify-center">
              <Image
                testID="bot-image"
                source={require("../assets/jarvis/talkingRobot.gif")}
                className="w-40 h-40"
              />
            </View>
          ) : (
            <View className="flex-row justify-center">
              <Image
                testID="bot-image"
                source={require("../assets/jarvis/bot.png")}
                className="w-40 h-40"
              />
            </View>
          )
        ) : null}

        {/* features || messages */}
        {showChat ? (
          <View className="flex-1 space-y-2">
            <Text className="text-gray-700 text-lg font-semibold ml-1">
              Assistant
            </Text>
            <View className="h-[80%] bg-neutral-200 rounded-3xl p-4">
              <ScrollView
                ref={scrollViewRef}
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
      <View className="flex-row items-center justify-start mx-4 mb-4">
        {/* {recording ? (
          // record stop button
          <TouchableOpacity onPress={() => stopRecording()}>
            <Image
              source={require("../assets/jarvis/voiceLoading.gif")}
              className="w-20 h-20 rounded-full"
            />
          </TouchableOpacity>
        ) : (
          // record start button
          <TouchableOpacity onPress={() => startRecording()}>
            <Image
              source={require("../assets/jarvis/recordingIcon.png")}
              className="w-20 h-20 rounded-full"
            />
          </TouchableOpacity>
        )} */}

        {loading ? (
          <View className="w-full items-center justify-center">
            <Image
              source={require("../assets/jarvis/loading.gif")}
              className="w-20 h-20 rounded-full"
            />
          </View>
        ) : (
          <>
            {showChat ? (
              <View className={`${messages.length > 0 ? "w-3/4" : "w-full"}`}>
                <TextInput
                  className="w-full h-10 bg-gray-200 rounded-full p-2"
                  onChangeText={(text) => OnChangeText(text)}
                  value={result}
                  placeholder="Say something..."
                  returnKeyType="done"
                  onSubmitEditing={() => OnkeyboardSubmit()}
                  ref={inputRef}
                />
              </View>
            ) : (
              <TouchableOpacity
                className="flex-row w-full items-center justify-center"
                onPress={() => setShowChat(true)}
              >
                <Image
                  source={require("../assets/jarvis/recordingIcon.png")}
                  className="w-20 h-20 rounded-full"
                />
              </TouchableOpacity>
            )}
            {messages.length > 0 ? (
              <TouchableOpacity
                onPress={() => ClearMessages()}
                className="bg-neutral-400 p-3 rounded-full absolute right-5 "
              >
                <MaterialIcons
                  testID="clear-btn"
                  name={"clear"}
                  size={30}
                  color={"black"}
                />
              </TouchableOpacity>
            ) : null}
          </>
        )}

        {/* {speaking ? (
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
        ) : null} */}
      </View>
    </SafeAreaView>
  );
};

export default JarvisHomeScreen;
