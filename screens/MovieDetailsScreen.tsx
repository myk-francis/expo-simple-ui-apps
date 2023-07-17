import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../constants/Constants";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/movieDB";
import { RootStackParamList } from "../navigation/AppStack";
import type { RouteProp } from "@react-navigation/native";
import {
  MovieDetailsProp,
  CastProp,
  SimilarMoviesProps,
} from "../constants/MovieTypes";

type MovieDetailsScreenProp = RouteProp<
  RootStackParamList,
  "MovieDetailsScreen"
>;

const { width, height } = Dimensions.get("window");

const MovieDetailsScreen = () => {
  const { params: item } = useRoute<MovieDetailsScreenProp>();
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = React.useState(false);
  const [cast, setCast] = React.useState<CastProp[] | null>(null);
  const [similarMovies, setSimilarMovies] =
    React.useState<SimilarMoviesProps | null>(null);
  const [movieDetails, setMovieDetails] =
    React.useState<MovieDetailsProp | null>(null);
  const [loading, setLoading] = React.useState(false);

  const movieName = "Ant-man and the wasp: Quantamania";

  const topMargin = Platform.OS === "ios" ? "" : "mt-3";

  React.useEffect(() => {
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id: number) => {
    setLoading(true);
    const data = await fetchMovieDetails(id);
    if (data) setMovieDetails(data);
    setLoading(false);
  };

  const getMovieCredits = async (id: number) => {
    setLoading(true);
    const data = await fetchMovieCredits(id);
    if (data) setCast(data.cast);
    setLoading(false);
  };

  const getSimilarMovies = async (id: number) => {
    setLoading(true);
    const data = await fetchSimilarMovies(id);
    if (data) setSimilarMovies({ data: data.results });
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={`absolute z-20 flex-row items-center justify-between w-full px-4 ${topMargin}`}
        >
          <TouchableOpacity
            testID="back-btn"
            className="rounded-xl p-1 bg-corn-500"
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl p-1 "
            onPress={() => toggleFavorite(!isFavorite)}
          >
            <AntDesign
              name={isFavorite ? "hearto" : "heart"}
              size={35}
              color={isFavorite ? "white" : theme.background}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            {movieDetails ? (
              <Image
                // source={require("../assets/images/moviePoster2.png")}
                source={{
                  uri:
                    image500(movieDetails?.poster_path) || fallbackMoviePoster,
                }}
                style={{ width: width, height: height * 0.55 }}
                className=""
              />
            ) : null}
            <LinearGradient
              colors={[
                "transparent",
                "rgba(23, 23, 23, 0.8)",
                "rgba(23, 23, 23, 1)",
              ]}
              style={{ width: width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            ></LinearGradient>
          </View>
        )}
      </View>
      {/* movie details */}
      <View className="w-full space-y-3 -mt-10">
        <Text className="text-white text-3xl text-center font-bold tracking-wider">
          {movieDetails?.title}
        </Text>

        {/* status, releast date and runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          {movieDetails?.status} • {movieDetails?.release_date.split("-")[0]} •
          {movieDetails?.runtime} mins
        </Text>

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-4">
          {movieDetails?.genres.map((genre, index) => {
            let showDot = index + 1 !== movieDetails?.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre.name}
                {showDot ? "  •" : ""}
              </Text>
            );
          })}
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movieDetails?.overview}
        </Text>
      </View>
      {/* cast */}
      <Cast navigation={navigation} cast={cast} />

      {/* similar movies  */}
      {similarMovies !== null ? (
        <MovieList
          title="Upcoming Movies"
          data={similarMovies?.data}
          hideSeeAll={true}
        />
      ) : null}
    </ScrollView>
  );
};

export default MovieDetailsScreen;
