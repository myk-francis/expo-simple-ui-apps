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
import { theme } from "../constants/Constants";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");

const verticalMargin = Platform.OS === "ios" ? "" : "my-3";

const ActorScreen = () => {
  const { params: person } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = React.useState(false);
  const [actorMovies, setActorMovies] = React.useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = React.useState(false);

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
            color={isFavorite ? "white" : "red"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details  */}
      {loading ? (
        <Loading />
      ) : (
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
                source={require("../assets/images/castImage2.png")}
                style={{ width: width * 0.74, height: height * 0.43 }}
                className=""
              />
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              Keanu Reeves
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              London, United Kingdom
            </Text>
          </View>

          <View className="mt-6 mx-3 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">Male</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">2023-05-05</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">Acting</Text>
            </View>
            <View className=" px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">64.23</Text>
            </View>
          </View>

          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              fugiat itaque nisi ipsum quo nulla magni id, dignissimos voluptas
              vitae blanditiis ipsam tenetur? Ab ad rerum fugiat dolor numquam
              quos obcaecati, delectus neque consequatur ipsam, facilis,
              suscipit blanditiis voluptatibus voluptas nam! Molestias
              consectetur accusantium mollitia iste, harum quod, at tempora odio
              obcaecati itaque tenetur natus qui ducimus esse repudiandae,
              consequatur tempore ut officiis eaque dolorum. Ducimus aut tenetur
              nam quas ea laudantium quo mollitia, minus suscipit, vitae neque
              cupiditate libero delectus ullam non aspernatur? Ab illum iste
              nemo eligendi? Omnis eveniet quas doloremque ducimus odio sit
              fuga. Praesentium labore vero, dicta recusandae officiis
              voluptatum accusamus, excepturi quisquam minima quasi delectus
              aperiam sit iste fugit, nulla aut unde numquam odio? Nihil
              repudiandae fugit sed dolor, odit adipisci, harum fuga
              consequuntur pariatur dolores assumenda inventore voluptatibus
              earum obcaecati eligendi? Beatae, exercitationem laborum
              reprehenderit veniam veritatis illum est, ipsam voluptatibus
              atque, commodi eligendi iure? Voluptates harum voluptatem cumque
              maxime voluptatibus velit nobis illum pariatur quaerat quibusdam.
              Commodi optio quod, repellendus, consequuntur ut cumque
              voluptatibus atque vero sed minima porro quia voluptate expedita.
              Rem numquam excepturi eum, consequuntur explicabo sint? Commodi
              nemo sunt repudiandae, omnis aspernatur aperiam voluptatum
              excepturi repellendus voluptatibus, adipisci inventore laborum!
            </Text>
          </View>

          {/* movie list  */}
          <MovieList title="Movies" hideSeeAll={true} data={actorMovies} />
        </View>
      )}
    </ScrollView>
  );
};

export default ActorScreen;
