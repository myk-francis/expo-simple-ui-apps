import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  FlatList,
  Image,
  findNodeHandle,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");

const images: any = {
  man: "https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  women:
    "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  kids: "https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  skullcandy:
    "https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  help: "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
};

const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef<any>(),
}));

const Tab = React.forwardRef(
  ({ item, scrollX, onItempress }: any, ref: any) => {
    return (
      <TouchableOpacity onPress={onItempress}>
        <View ref={ref}>
          <Text
            style={{
              color: "white",
              fontSize: 84 / data.length,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);

const Indicator = ({ measures, scrollX }: any) => {
  const inputRange = data.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure: any) => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure: any) => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: "absolute",
        height: 4,
        width: indicatorWidth,
        backgroundColor: "white",
        bottom: -10,
        transform: [{ translateX }],
      }}
    ></Animated.View>
  );
};

const Tabs = ({ scrollX, onItempress }: any) => {
  const [measures, setMeasures] = React.useState([]);
  const containerRef = React.useRef<any>();

  React.useEffect(() => {
    let m: any = [];
    data.forEach((item) => {
      item?.ref?.current?.measureLayout(
        containerRef.current,
        (x: any, y: any, width: any, height: any) => {
          // console.log(x, y, width, height);
          m.push({
            x,
            y,
            width,
            height,
          });

          if (m.length === data.length) {
            setMeasures(m);
          }
        }
      );
    });
  }, [data]);

  return (
    <View style={{ position: "absolute", top: 100, width }}>
      <View
        ref={containerRef}
        style={{
          justifyContent: "space-evenly",
          flex: 1,
          flexDirection: "row",
        }}
      >
        {data.map((item, index) => {
          return (
            <Tab
              item={item}
              scrollX={scrollX}
              key={item.key}
              ref={item.ref}
              onItempress={() => onItempress(index)}
            />
          );
        })}
      </View>
      {measures?.length > 0 ? (
        <Indicator measures={measures} scrollX={scrollX} />
      ) : null}
    </View>
  );
};

const AnimatedTabs = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef<any>();
  const onItempress = React.useCallback((itemIndex: any) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
      animated: true,
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={ref}
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        bounces={false}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.image }}
                style={{ flex: 1, resizeMode: "cover" }}
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: "rgba(0, 0, 0, 0.3)" },
                ]}
              ></View>
            </View>
          );
        }}
      />

      <Tabs scrollX={scrollX} onItempress={onItempress} />
    </View>
  );
};

export default AnimatedTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
