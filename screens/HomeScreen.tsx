import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppStack";
import { StackNavigationProp } from "@react-navigation/stack";

type MoviescreenProp = StackNavigationProp<RootStackParamList, "MoviesScreen">;

const HomeScreen = () => {
  const navigation = useNavigation<MoviescreenProp>();
  return (
    <View className="flex-1 items-center justify-start my-8">
      <Text style={styles.title}>Designs</Text>
      <View style={styles.separator} />
      <TouchableOpacity
        onPress={() => navigation.navigate("MoviesScreen")}
        className="h-10 w-1/2 bg-blue-400 flex items-center justify-center rounded-lg"
      >
        <Text testID="weather-btn" className=" font-semibold text-white">
          Movie App
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    color: "black",
  },
});
