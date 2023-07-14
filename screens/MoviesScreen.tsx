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
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppStack";
import { StackNavigationProp } from "@react-navigation/stack";
import Loading from "../components/Loading";
import { fetchTreadingMovies, fetchUpcomingMovies } from "../api/movieDB";
import {
  MoviePropList,
  MovieProp,
  TrendingMoviePropList,
} from "../constants/Types";

type MoviescreenProp = StackNavigationProp<
  RootStackParamList,
  "SearchMovieScreen"
>;

const MoviesScreen = () => {
  const navigation = useNavigation<MoviescreenProp>();
  const [trending, setTrending] = React.useState<TrendingMoviePropList | null>(
    null
  );
  const [upcoming, setUpcoming] = React.useState<MoviePropList | null>(null);
  const [topRated, setTopRated] = React.useState<MoviePropList | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getTreadingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTreadingMovies = async () => {
    setLoading(true);
    const data = await fetchTreadingMovies();
    if (data && data.results) {
      setTrending({ trending: data.results });
      // console.debug(
      //   "✅ --> ☀️ File:MoviesScreen | Function: getTreadingMovies | trending: ☀️ --> ",
      //   trending
      // );
    }
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    setLoading(true);
    const data = await fetchUpcomingMovies();
    if (data && data.results) {
      setUpcoming({ data: data.results });
    }
    setLoading(false);
  };

  const getTopRatedMovies = async () => {
    setLoading(true);
    const data = await fetchTreadingMovies();
    if (data && data.results) {
      setTopRated({ data: data.results });
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-neutral-800">
      <StatusBar barStyle="light-content" />
      <SafeAreaView className={`${Platform.OS === "ios" ? "-mb-2" : "mb-3"}`}>
        <View className="flex-row items-center justify-between mx-4">
          <FontAwesome name="bars" size={30} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text className="text-corn-500">M</Text>ovies
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchMovieScreen")}
          >
            <FontAwesome name="search" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending movies corousel */}
          {trending !== null ? <TrendingMovies {...trending} /> : null}

          {/* Upcoming movies row */}
          {upcoming !== null ? (
            <MovieList title="Upcoming Movies" data={upcoming.data} />
          ) : null}

          {/* Top rated movies row */}
          {topRated !== null ? (
            <MovieList title="Upcoming Movies" data={topRated.data} />
          ) : null}
        </ScrollView>
      )}
    </View>
  );
};

export default MoviesScreen;
