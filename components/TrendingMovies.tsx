import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";

const { width, height } = Dimensions.get("window");

const MovieCard = ({ item }: any) => {
  return (
    <TouchableWithoutFeedback className="p-2">
      <Image
        source={require("../assets/images/moviePoster1.png")}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

const TrendingMovies = ({ trending }: any) => {
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={trending}
        renderItem={({ item }) => <MovieCard item={item} />}
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
