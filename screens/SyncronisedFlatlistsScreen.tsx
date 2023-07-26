import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
  Animated,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { forwardRef } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;
const colors = {
  yellow: "#FFE8A3",
  dark: "#2D2D2D",
};

const { width, height } = Dimensions.get("screen");

const data = [
  {
    icon: "social-tumblr",
    name: "tumblr",
  },
  {
    icon: "social-twitter",
    name: "twitter",
  },
  {
    icon: "social-facebook",
    name: "facebook",
  },
  {
    icon: "social-instagram",
    name: "instagram",
  },
  {
    icon: "social-linkedin",
    name: "linkedin",
  },
  {
    icon: "social-pinterest",
    name: "pinterest",
  },
  {
    icon: "social-youtube",
    name: "youtube",
  },
  {
    icon: "social-stumbleupon",
    name: "stumbleupon",
  },
  {
    icon: "social-spotify",
    name: "spotify",
  },
  {
    icon: "social-dropbox",
    name: "dropbox",
  },
  {
    icon: "social-vkontakte",
    name: "vkontakte",
  },
  {
    icon: "social-google",
    name: "google",
  },
  {
    icon: "social-reddit",
    name: "reddit",
  },
];

const Icon = React.memo(({ icon, color }: any) => {
  return <SimpleLineIcons name={icon} size={ICON_SIZE} color={color} />;
});

const Item = React.memo(({ icon, color, name, showText }: any) => {
  return (
    <View style={styles.itemWrapper}>
      {showText ? (
        <Text style={[styles.itemText, { color: color }]}>{name}</Text>
      ) : (
        <View /> //for spacing
      )}
      <Icon icon={icon} color={color} />
    </View>
  );
});

const ConnectWithText = React.memo(() => {
  return (
    <View
      style={{
        position: "absolute",
        top: height / 2 - ITEM_HEIGHT * 2 - 25,
        width: width * 0.7,
        paddingHorizontal: 14,
      }}
    >
      <Text
        style={{
          color: colors.yellow,
          fontSize: 52,
          fontWeight: "700",
          lineHeight: 60,
        }}
      >
        Connect with...
      </Text>
    </View>
  );
});

const ConnectButton = React.memo(({ onPress }: any) => {
  return (
    <View
      style={{
        position: "absolute",
        top: height / 2 + ITEM_HEIGHT / 2 - 25,
        paddingHorizontal: 14,
      }}
    >
      <View
        style={{
          height: ITEM_HEIGHT * 2,
          width: 2,
          backgroundColor: colors.yellow,
        }}
      ></View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          paddingHorizontal: 12,
          paddingVertical: 10,
          backgroundColor: colors.yellow,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "800",
            color: colors.dark,
          }}
        >
          Done!
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const List = forwardRef(
  ({ color, showText, style, onScroll, onItemIndexChange }: any, ref: any) => {
    return (
      <Animated.FlatList
        ref={ref}
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={ITEM_HEIGHT}
        // decelerationRate={"fast"}
        style={style}
        contentContainerStyle={{
          paddingTop: showText ? 0 : height / 2 - ITEM_HEIGHT / 2 - 25,
          paddingBottom: showText ? 0 : height / 2 - ITEM_HEIGHT / 2 - 25,
          // paddingHorizontal: 10,
        }}
        scrollEnabled={!showText}
        bounces={false}
        data={data}
        keyExtractor={(item) => `${item.name}-${item.icon}`}
        renderItem={({ item }) => (
          <Item
            icon={item.icon}
            color={color}
            name={item.name}
            showText={showText}
          />
        )}
        onMomentumScrollEnd={(ev) => {
          let newIndex = Math.round(
            ev.nativeEvent.contentOffset.y / ITEM_HEIGHT
          );
          if (onItemIndexChange) {
            onItemIndexChange(newIndex);
          }
        }}
      />
    );
  }
);

const SyncronisedFlatlistsScreen = () => {
  const [index, setIndex] = React.useState(0);
  const onConnectPress = React.useCallback(() => {
    Alert.alert("Connect with: ", data[index].name.toUpperCase());
  }, [index]);
  const yellowRef = React.useRef<any>();
  const darkRef = React.useRef<any>();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const onItemIndexChange = React.useCallback((index: number) => {
    setIndex(index);
  }, []);

  React.useEffect(() => {
    scrollY.addListener(({ value }) => {
      if (darkRef?.current) {
        darkRef.current.scrollToOffset({ offset: value, animated: false });
      }
    });
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ConnectWithText />
      <List
        ref={yellowRef}
        color={colors.yellow}
        onScroll={onScroll}
        // showText
        style={StyleSheet.absoluteFillObject}
        onItemIndexChange={onItemIndexChange}
      />
      <List
        ref={darkRef}
        color={colors.dark}
        showText
        style={{
          position: "absolute",
          backgroundColor: colors.yellow,
          width: width,
          height: ITEM_HEIGHT,
        }}
      />
      <ConnectButton onPress={onConnectPress} />
      <Item />
    </View>
  );
};

export default SyncronisedFlatlistsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.dark,
  },
  itemWrapper: {
    width: width,
    height: ITEM_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  itemText: {
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 40,
    textTransform: "capitalize",
  },
});
