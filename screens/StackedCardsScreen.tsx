import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
const { width } = Dimensions.get("window");
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  Directions,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { locationImage, dummyStackedCardsData } from "../constants/dummyData";
import { useSharedValue } from "react-native-reanimated";

const duration = 300;
const _size = width * 0.9;
const layout = {
  borderRadius: 16,
  width: _size,
  height: _size * 1.27,
  spacing: 12,
  cardsGap: 22,
};
const maxVisibleItems = 6;

const colors = {
  primary: "#6667AB",
  light: "#fff",
  dark: "#111",
};

const Card = ({
  info,
  index,
  totalLength,
}: {
  totalLength: number;
  index: number;
  info: (typeof dummyStackedCardsData)[0];
}) => {
  return (
    <View style={[styles.card]}>
      <Text
        style={[
          styles.title,
          {
            position: "absolute",
            top: -layout.spacing,
            right: layout.spacing,
            fontSize: 102,
            color: colors.primary,
            opacity: 0.05,
          },
        ]}
      >
        {index}
      </Text>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{info.type}</Text>
        <View style={styles.row}>
          <Entypo name="clock" size={16} style={styles.icon} />
          <Text style={styles.subtitle}>
            {info.from} - {info.to}
          </Text>
        </View>
        <View style={styles.row}>
          <Entypo name="location" size={16} style={styles.icon} />
          <Text style={styles.subtitle}>{info.distance} km</Text>
        </View>
        <View style={styles.row}>
          <Entypo name="suitcase" size={16} style={styles.icon} />
          <Text style={styles.subtitle}>{info.role}</Text>
        </View>
      </View>
      <Image source={{ uri: locationImage }} style={styles.locationImage} />
    </View>
  );
};

const StackedCardsScreen = () => {
  const activeIndex = useSharedValue(0);

  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      console.log("fling up");
    });
  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      console.log("fling down");
    });
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar hidden />
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: layout.cardsGap * 2,
        }}
        pointerEvents="box-none"
      >
        {dummyStackedCardsData.slice(0, 1).map((c, index) => {
          return (
            <Card
              info={c}
              key={c.id}
              index={index}
              totalLength={dummyStackedCardsData.length - 1}
            />
          );
        })}
      </View>
    </GestureHandlerRootView>
  );
};

export default StackedCardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.primary,
    padding: layout.spacing,
  },
  card: {
    borderRadius: layout.borderRadius,
    width: layout.width,
    height: layout.height,
    padding: layout.spacing,
    backgroundColor: colors.light,
  },
  title: { fontSize: 32, fontWeight: "600" },
  subtitle: {},
  cardContent: {
    gap: layout.spacing,
    marginBottom: layout.spacing,
  },
  locationImage: {
    flex: 1,
    borderRadius: layout.borderRadius - layout.spacing / 2,
  },
  row: {
    flexDirection: "row",
    columnGap: layout.spacing / 2,
    alignItems: "center",
  },
  icon: {},
});
