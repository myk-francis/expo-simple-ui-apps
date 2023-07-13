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

const { width, height } = Dimensions.get("window");

const MovieDetailsScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = React.useState(false);
  const [cast, setCast] = React.useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = React.useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = React.useState(false);

  const movieName = "Ant-man and the wasp: Quantamania";

  const topMargin = Platform.OS === "ios" ? "" : "mt-3";

  React.useEffect(() => {
    return () => {};
  }, [item]);

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
            <Image
              source={require("../assets/images/moviePoster2.png")}
              style={{ width: width, height: height * 0.55 }}
              className=""
            />
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
          {movieName}
        </Text>

        {/* status, releast date and runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released • 2020 • 170 mins
        </Text>

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-4">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Adventure
          </Text>
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore,
          quam porro doloribus illum dolore deserunt iste illo a in numquam quod
          eveniet vel omnis aspernatur sed nostrum iure corrupti eius, totam
          mollitia ad. Consequuntur a obcaecati iste, dolorem ipsa quod
          accusamus doloribus aliquid tempore ducimus doloremque, sapiente
          deleniti quas at sit ab adipisci perferendis vel animi, est amet?
          Ducimus omnis vero ea distinctio quo eligendi quia, sint, iusto
          veritatis temporibus placeat beatae non porro dolores doloremque,
          consequuntur est! Atque unde dolores impedit corporis, libero neque
          esse vel adipisci aliquam commodi non repudiandae aperiam inventore
          maiores voluptatem. Unde iste ratione fugiat.
        </Text>
      </View>
      {/* cast */}
      <Cast navigation={navigation} cast={cast} />

      {/* similar movies  */}
      <MovieList
        title="Similar Movies"
        data={similarMovies}
        hideSeeAll={true}
      />
    </ScrollView>
  );
};

export default MovieDetailsScreen;
