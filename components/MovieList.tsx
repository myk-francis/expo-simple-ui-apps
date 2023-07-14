import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { MovieListProps } from "../constants/Types";
import { fallbackMoviePoster, image185 } from "../api/movieDB";

type MovieDetailsScreenProp = StackNavigationProp<
  RootStackParamList,
  "MovieDetailsScreen"
>;

const { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll }: MovieListProps) => {
  const movieName = "Ant-man and the wasp: Quantamania";
  const navigation = useNavigation<MovieDetailsScreenProp>();

  return (
    <View className="mb-8 space-y-4">
      <View className="flex-row items-center justify-between mx-4">
        <Text className="text-white text-xl">{title}</Text>
        {hideSeeAll ? null : (
          <TouchableOpacity>
            <Text className="text-lg text-corn-500">See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            className=""
            onPress={() => navigation.navigate("MovieDetailsScreen", item)}
          >
            <View className="space-y-1 mr-4">
              <Image
                // source={require("../assets/images/moviePoster2.png")}
                source={{
                  uri: image185(item.poster_path) || fallbackMoviePoster,
                }}
                style={{ width: width * 0.33, height: height * 0.22 }}
                className="rounded-3xl"
              />
              <Text className="text-neutral-300 ml-1">
                {item.title.length > 14
                  ? item.title.slice(0, 14) + "..."
                  : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
