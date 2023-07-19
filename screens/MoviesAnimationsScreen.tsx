import * as React from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";
import Loading from "../components/Loading";
import {
  fallbackMoviePoster,
  fetchUpcomingMovies,
  getBackdropPath,
  image500,
} from "../api/movieDB";
import {
  MoviePropList,
  MovieProp,
  TrendingMoviePropList,
} from "../constants/MovieTypes";
import AntDesign from "@expo/vector-icons/AntDesign";

const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const genres = ["Action", "Romance"];

const Rating = () => {
  const rating = 10;
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill("staro");
  const r = [...Array(filledStars).fill("star"), ...maxStars];

  return (
    <View style={styles.rating}>
      <Text style={styles.ratingNumber}>{rating}</Text>
      {r.map((type, index) => {
        return <AntDesign key={index} name={type} size={12} color="tomato" />;
      })}
    </View>
  );
};

const Genres = () => {
  return (
    <View style={styles.genres}>
      {genres.map((genre: any, i: any) => {
        return (
          <View key={i} style={styles.genre}>
            <Text style={styles.genreText}>{genre}</Text>
          </View>
        );
      })}
    </View>
  );
};

const Backdrop = ({ movies, scrollX }: any) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
      <FlatList
        data={movies.reverse()}
        keyExtractor={(item) => item.id + "-backdrop_path"}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdrop_path) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate:'clamp'
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: "absolute",
                width: translateX,
                height,
                overflow: "hidden",
              }}
            >
              <Image
                source={{
                  uri:
                    getBackdropPath(item.backdrop_path) || fallbackMoviePoster,
                }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: "absolute",
                  resizeMode: "cover",
                }}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "white"]}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
};

const MoviesAnimationsScreen = () => {
  const [upcoming, setUpcoming] = React.useState<MoviePropList | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [movies, setMovies] = React.useState<any>([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const getUpcomingMovies = async () => {
    setLoading(true);
    const data = await fetchUpcomingMovies();
    if (data && data.results) {
      // setUpcoming({ data: data.results });
      setMovies([
        { id: "empty-left" },
        ...data?.results,
        { id: "empty-right" },
      ]);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getUpcomingMovies();
  }, []);

  if (movies?.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.id}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === "ios" ? 0 : 0}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: "center" }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.backdrop_path) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            // extrapolate: "clamp",
          });

          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: "center",
                  transform: [{ translateY }],
                  backgroundColor: "white",
                  borderRadius: 34,
                }}
              >
                <Image
                  source={{
                    uri: image500(item.poster_path) || fallbackMoviePoster,
                  }}
                  style={styles.posterImage}
                />
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Rating />
                <Genres />
                <Text style={{ fontSize: 12 }} numberOfLines={3}>
                  {item.overview}
                </Text>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MoviesAnimationsScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },

  genres: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 4,
  },
  genre: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#ccc",
    marginRight: 4,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 9,
    opacity: 0.4,
  },

  ratingNumber: { marginRight: 4, fontSize: 14 },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
});
