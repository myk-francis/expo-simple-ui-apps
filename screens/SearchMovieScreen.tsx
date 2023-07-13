import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { RootStackParamList } from "../navigation/AppStack";
import { StackNavigationProp } from "@react-navigation/stack";
import Loading from "../components/Loading";

type MovieDetailsScreenProp = StackNavigationProp<
  RootStackParamList,
  "MovieDetailsScreen"
>;

const { width, height } = Dimensions.get("window");

const SearchMovieScreen = () => {
  const navigation = useNavigation<MovieDetailsScreenProp>();
  const [results, setResults] = React.useState([1, 2, 3, 4, 5]);
  const movieName = "Ant-man and the wasp: Quantamania";
  const [loading, setLoading] = React.useState(false);

  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <View className="flex-row justify-between items-center mx-4 mb-3 border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider "
        />
        <TouchableOpacity
          className="rounded-full p-3 m-1 bg-neutral-500"
          onPress={() => navigation.goBack()}
        >
          <Feather name="x" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <>
            <Text className="text-white font-semibold ml-1">
              Results: ({results.length})
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {results?.length > 0 ? (
                results.map((item, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    className="p-2 bg-neutral-900 rounded-lg"
                    onPress={() =>
                      // navigation.navigate("MovieDetailsScreen", item)
                      {}
                    }
                  >
                    <View className="space-y-2 mb-4">
                      <Image
                        source={require("../assets/images/moviePoster2.png")}
                        style={{ width: width * 0.44, height: height * 0.3 }}
                        className="rounded-3xl"
                      />
                      <Text className="text-neutral-300 ml-1">
                        {movieName.length > 22
                          ? movieName.slice(0, 22) + "..."
                          : movieName}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))
              ) : (
                <View className="flex-1 justify-center items-center">
                  <Image
                    source={require("../assets/images/movieTime.png")}
                    className="h-96 w-96"
                  />
                </View>
              )}
            </View>
          </>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SearchMovieScreen;
