import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const ICON_SIZE = 60;
const ITEM_WIDTH = width * 0.8;
const SPACING = 20;

const DATA = [
  {
    id: "1",
    title: "Ukelele",
    imageUri: require("../assets/flatIcons/3dglasses.png"),
  },
  {
    id: "2",
    title: "Sea",
    imageUri: require("../assets/flatIcons/campervan.png"),
  },
  {
    id: "3",
    title: "Tiki",
    imageUri: require("../assets/flatIcons/lavalamp.png"),
  },
  {
    id: "4",
    title: "Banana",
    imageUri: require("../assets/flatIcons/turntable.png"),
  },
  {
    id: "5",
    title: "Bahama",
    imageUri: require("../assets/flatIcons/lavalamp.png"),
  },
  {
    id: "6",
    title: "Banana",
    imageUri: require("../assets/flatIcons/turntable.png"),
  },
  {
    id: "7",
    title: "Ukelele",
    imageUri: require("../assets/flatIcons/3dglasses.png"),
  },
  {
    id: "8",
    title: "Sea",
    imageUri: require("../assets/flatIcons/campervan.png"),
  },
  {
    id: "9",
    title: "Tiki",
    imageUri: require("../assets/flatIcons/lavalamp.png"),
  },
];

const SLIDER_DATA = [
  {
    title: "Sunny days",
    color: "turquoise",
  },
  {
    title: "Sand & beach",
    color: "aquamarine",
  },
  {
    title: "Coktails & Party",
    color: "tomato",
  },
  {
    title: "All-inclusive",
    color: "#A531F9",
  },
];

const MarketingSlider = () => {
  return (
    <FlatList
      data={SLIDER_DATA}
      keyExtractor={(item) => item.color}
      horizontal
      snapToInterval={ITEM_WIDTH + SPACING}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: width - ITEM_WIDTH - SPACING * 2,
        gap: SPACING,
      }}
      decelerationRate={"fast"}
      renderItem={({ item }: any) => {
        return (
          <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
            <Text style={[styles.itemText]}>{item.title}</Text>
          </View>
        );
      }}
    />
  );
};

const Icon = ({ uri }: any) => {
  return (
    <View style={[styles.ImageContainer]}>
      <Image source={{ uri: uri }} style={[styles.image]} />
    </View>
  );
};

const BackIcon = ({ onPress }: any) => {
  return (
    <AntDesign
      name="arrowleft"
      size={24}
      color="#333"
      onPress={onPress}
      style={{ padding: 12 }}
    />
  );
};

const List = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MarketingSlider />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
          flexWrap: "wrap",
        }}
      >
        {DATA.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={{ padding: SPACING }}
              onPress={() => {}}
            >
              <View style={[styles.ImageContainer]}>
                <Image source={item.imageUri} style={[styles.image]} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const Details = () => {
  const navigation = useNavigation();
  const item = DATA[0];
  const ref = React.useRef<any>();
  const selectedItemIndex = DATA.findIndex((i) => i.id === item.id);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackIcon
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "nowrap",
          marginVertical: 20,
        }}
      >
        {DATA.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={{ padding: SPACING }}
              onPress={() => {}}
            >
              <View style={[styles.ImageContainer]}>
                <Image source={item.imageUri} style={[styles.image]} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <FlatList
        ref={ref}
        data={DATA}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        initialScrollIndex={selectedItemIndex}
        nestedScrollEnabled
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: any) => {
          return (
            <ScrollView
              style={{
                width: width,
                margin: SPACING,
                backgroundColor: "rgba(0,0,0,0.05)",
                borderRadius: 16,
              }}
            >
              <View style={{ padding: SPACING }}>
                <Text style={{ fontSize: 12 }}>
                  {Array(50).fill(`${item.title} innet text \n`)}
                </Text>
              </View>
            </ScrollView>
          );
        }}
      />
    </SafeAreaView>
  );
};

const TransitionScreenOne = () => {
  return (
    <View style={styles.container}>
      <Details />
    </View>
  );
};

export default TransitionScreenOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  ImageContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
  },
  image: {
    width: ICON_SIZE * 0.6,
    height: ICON_SIZE * 0.6,
    resizeMode: "contain",
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 0.6,
    borderRadius: 16,
    padding: SPACING,
  },
  itemText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
});
