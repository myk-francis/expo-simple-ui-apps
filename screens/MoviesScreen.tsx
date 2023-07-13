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
import { fetchTreadingMovies } from "../api/movieDB";
import { TrendingMovieProp, TrendingMoviePropList } from "../constants/Types";

type MoviescreenProp = StackNavigationProp<
  RootStackParamList,
  "SearchMovieScreen"
>;

const MoviesScreen = () => {
  const navigation = useNavigation<MoviescreenProp>();
  const [trending, setTrending] = React.useState<TrendingMovieProp[]>([]);
  const [upcoming, setUpcoming] = React.useState([1, 2, 3, 4, 5]);
  const [topRated, setTopRated] = React.useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getTreadingMovies();
  }, []);

  const getTreadingMovies = async () => {
    setLoading(true);
    const data = await fetchTreadingMovies();
    if (data && data.results) {
      setTrending(data);
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
          {trending.length > 0 ? <TrendingMovies {...trending} /> : null}

          {/* Upcoming movies row */}
          <MovieList title="Upcoming Movies" data={upcoming} />

          {/* Top rated movies row */}
          <MovieList title="Top-rated Movies" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default MoviesScreen;
