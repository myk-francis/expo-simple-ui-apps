import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MotiView } from "moti";
import randomColor from "randomcolor";

const { width, height } = Dimensions.get("window");

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];

const dialPadSize = width * 0.2;

const dialPadTextSize = dialPadSize * 0.4;

const _spacing = 20;

const pinLength = 4;
const pinContainerSize = width / 2;
const pinMaxSize = pinContainerSize / pinLength;
const pinSpacing = 10;
const pinSize = pinMaxSize - pinSpacing * 2;

type TItem = (typeof dialPad)[number];

type TDialPadProp = {
  onPress: (item: TItem) => void;
};

const baseColor = randomColor();
const _colors = {
  primary: baseColor,
  secondary: randomColor({
    hue: baseColor,
    luminosity: "dark",
  }),
};

const DialPad = ({ onPress }: TDialPadProp) => {
  return (
    <FlatList
      numColumns={3}
      data={dialPad}
      style={{ flexGrow: 0 }}
      //   scrollEnabled={false}
      columnWrapperStyle={{ gap: _spacing }}
      contentContainerStyle={{ gap: _spacing }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            disabled={item === ""}
            onPress={() => {
              onPress(item);
            }}
          >
            <View
              style={{
                width: dialPadSize,
                height: dialPadSize,
                borderRadius: dialPadSize,
                borderWidth: typeof item !== "number" ? 0 : 1,
                borderColor: _colors.secondary,
                justifyContent: "center",
                alignItems: "center",
                // margin: 2,
              }}
            >
              {item === "del" ? (
                <Ionicons
                  name={"backspace-outline"}
                  size={dialPadTextSize}
                  color={_colors.secondary}
                />
              ) : (
                <Text
                  style={{
                    fontSize: dialPadTextSize,
                    color: _colors.secondary,
                  }}
                >
                  {item}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const PinCodeScreen = () => {
  const [code, setCode] = React.useState<number[]>([]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: _colors.primary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar barStyle={"default"} />
      <View
        style={{
          flexDirection: "row",
          gap: pinSpacing * 2,
          marginBottom: _spacing * 2,
          //   backgroundColor: "green",
          height: pinSize * 2,
          alignItems: "flex-end",
        }}
      >
        {[...Array(pinLength).keys()].map((item, index) => {
          const isSelected = !!code[index];
          return (
            <MotiView
              key={index}
              style={{
                width: pinSize,
                borderRadius: pinSize,
              }}
              transition={{
                type: "timing",
                duration: 300,
              }}
              animate={{
                height: isSelected ? pinSize : 2,
                marginBottom: isSelected ? pinSize / 2 : 0,
                backgroundColor: isSelected
                  ? _colors.secondary
                  : `${_colors.secondary}66`,
              }}
            ></MotiView>
          );
        })}
      </View>
      <DialPad
        onPress={(item) => {
          if (item === "del") {
            setCode((prevCode) => prevCode.slice(0, prevCode.length - 1));
          } else if (typeof item === "number") {
            if (code.length === pinLength) return;
            setCode((prevCode) => [...prevCode, item]);
          }
        }}
      />
    </View>
  );
};

export default PinCodeScreen;
