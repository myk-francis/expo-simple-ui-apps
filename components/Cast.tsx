import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { CastScreenProps } from "../constants/Types";
import { fallbackPersonImage, image185 } from "../api/movieDB";

const Cast = ({ cast, navigation }: CastScreenProps) => {
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
          ? cast.map((person, index) => (
              <TouchableOpacity
                key={index}
                className="mr-4 text-center"
                onPress={() => navigation.navigate("ActorScreen", person)}
              >
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-300">
                  <Image
                    // source={require("../assets/images/castImage1.png")}
                    source={{
                      uri: image185(person.profile_path) || fallbackPersonImage,
                    }}
                    className="rounded-2xl h-24 w-24"
                  />
                </View>
                <Text className="text-white text-xs mt-1">
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + "..."
                    : person?.character}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1">
                  {person?.original_name.length > 10
                    ? person?.original_name.slice(0, 10) + "..."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </View>
  );
};

export default Cast;
