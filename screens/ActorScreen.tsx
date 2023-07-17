import {
  View,
  Text,
  Platform,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRoute, useNavigation } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  MovieProp,
  ActorMoviesProps,
  ActorProp,
} from "../constants/MovieTypes";
import type { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppStack";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/movieDB";

type ActorScreenProp = RouteProp<RootStackParamList, "ActorScreen">;

const { width, height } = Dimensions.get("window");

const verticalMargin = Platform.OS === "ios" ? "" : "my-3";

const ActorScreen = () => {
  const { params: person } = useRoute<ActorScreenProp>();
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = React.useState(false);
  const [actorMovies, setActorMovies] = React.useState<ActorMoviesProps | null>(
    null
  );
  const [actor, setActor] = React.useState<ActorProp | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getPersonDetails(person.id);
    getPersonMovies(person.id);
  }, [person]);

  const getPersonDetails = async (id: number) => {
    setLoading(true);
    const data = await fetchPersonDetails(id);
    if (data) setActor(data);
    setLoading(false);
  };

  const getPersonMovies = async (id: number) => {
    setLoading(true);
    const data = await fetchPersonMovies(id);
    if (data) setActorMovies({ data: data.cast });
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}
      <SafeAreaView
        className={` flex-row items-center justify-between w-full px-4 ${verticalMargin}`}
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
            testID="fav-btn"
            name={isFavorite ? "hearto" : "heart"}
            size={35}
            color={isFavorite ? "white" : "red"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details  */}

      <View>
        <View
          className="flex-row justify-center "
          style={
            {
              // shadowColor: "gray",
              // shadowOffset: {
              //   width: 0,
              //   height: 5,
              // },
              // shadowOpacity: 1,
              // shadowRadius: 11.14,
              // elevation: 17,
            }
          }
        >
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
            <Image
              testID="actor-image"
              source={
                // require("../assets/images/castImage2.png")
                { uri: image342(person?.profile_path) || fallbackPersonImage }
              }
              style={{ width: width * 0.74, height: height * 0.43 }}
              className=""
            />
          </View>
        </View>

        <View className="mt-6">
          <Text
            testID="actor-name"
            className="text-3xl text-white font-bold text-center"
          >
            {actor?.name}
          </Text>
          <Text
            testID="actor-location"
            className="text-base text-neutral-500 text-center"
          >
            {actor?.place_of_birth}
          </Text>
        </View>

        <View
          testID="actor-details"
          className="mt-6 mx-3 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full"
        >
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className="text-neutral-300 text-sm">
              {actor?.gender === 1 ? "Male" : "Female"}
            </Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300 text-sm">{actor?.birthday}</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Known for</Text>
            <Text className="text-neutral-300 text-sm">
              {actor?.known_for_department}
            </Text>
          </View>
          <View className=" px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 text-sm">
              {actor?.popularity}
            </Text>
          </View>
        </View>

        <View testID="actor-biography" className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            {actor?.biography || "N/A"}
          </Text>
        </View>

        {/* movie list  */}
        {actorMovies !== null ? (
          <MovieList title="Movies" data={actorMovies.data} hideSeeAll={true} />
        ) : null}
      </View>
    </ScrollView>
  );
};

export default ActorScreen;
