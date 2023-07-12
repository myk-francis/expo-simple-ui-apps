import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";

const MoviesScreen = () => {
  const [trending, setTrending] = React.useState([1, 2, 3, 4, 5]);
  const [upcoming, setUpcoming] = React.useState([1, 2, 3, 4, 5]);
  const [topRated, setTopRated] = React.useState([1, 2, 3, 4, 5]);

  return (
    <View className="flex-1 bg-neutral-800">
      <StatusBar barStyle="light-content" />
      <SafeAreaView className={`${Platform.OS === "ios" ? "-mb-2" : "mb-3"}`}>
        <View className="flex-row items-center justify-between mx-4">
          <FontAwesome name="bars" size={30} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text className="text-corn-500">M</Text>ovies
          </Text>
          <TouchableOpacity>
            <FontAwesome name="search" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Trending movies corousel */}
        <TrendingMovies trending={trending} />

        {/* Upcoming movies row */}
        <MovieList title="Upcoming Movies" data={upcoming} />

        {/* Top rated movies row */}
        <MovieList title="Top-rated Movies" data={topRated} />
      </ScrollView>
    </View>
  );
};

export default MoviesScreen;
