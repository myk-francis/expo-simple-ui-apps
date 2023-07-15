import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppStack";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  MovieProp,
  MovieCardProps,
  TrendingMoviePropList,
} from "../constants/Types";
import { image500 } from "../api/movieDB";

type MovieDetailsScreenProp = StackNavigationProp<
  RootStackParamList,
  "MovieDetailsScreen"
>;

const { width, height } = Dimensions.get("window");

const MovieCard = ({ item, handleClick }: MovieCardProps) => {
  // console.log("✅ File:TrendingMovies | Function: MovieCard | item:", item);
  return (
    <TouchableWithoutFeedback
      testID="movie-card"
      className="p-2"
      onPress={() => handleClick(item)}
    >
      <Image
        testID="movie-card-image"
        // source={require("../assets/images/moviePoster1.png")}
        source={{ uri: image500(item.poster_path) }}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

const TrendingMovies = ({ trending }: TrendingMoviePropList) => {
  // console.debug(
  //   "✅ --> ☀️ File:TrendingMovies | Function: TrendingMovies | trending:☀️ --> ",
  //   trending
  // );
  const navigation = useNavigation<MovieDetailsScreenProp>();

  const handleClick = (item: MovieProp) => {
    navigation.navigate("MovieDetailsScreen", item);
  };

  return (
    <View className="mb-8" testID="trending-component">
      <Text
        className="text-white text-xl mx-4 mb-5"
        testID="trending-component-title"
      >
        Trending
      </Text>
      <Carousel
        data={trending}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

export default TrendingMovies;
