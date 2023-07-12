import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";

const Cast = ({ cast, navigation }: any) => {
  let personName = "Keanu Reeves";
  let characterName = "John Wick";
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className=""
      >
        {cast !== null
          ? cast.map((person: any, index: any) => (
              <TouchableOpacity
                key={index}
                className="mr-4 text-center"
                onPress={() => navigation.navigate("PersonScreen", person)}
              >
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-300">
                  <Image
                    source={require("../assets/images/castImage1.png")}
                    className="rounded-2xl h-24 w-24"
                  />
                </View>
                <Text className="text-white text-xs mt-1">
                  {characterName.length > 10
                    ? characterName.slice(0, 10) + "..."
                    : characterName}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1">
                  {personName.length > 10
                    ? personName.slice(0, 10) + "..."
                    : personName}
                </Text>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </View>
  );
};

export default Cast;
