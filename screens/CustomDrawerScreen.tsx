import * as React from "react";
import {
  StatusBar,
  Animated,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
// import Navigation from './Navigation';

const routes = [
  "Get started",
  "Features",
  "Tools",
  "Services",
  "Portfolio",
  "Careers",
  "Contact",
];
const links = ["Follow us", "Quota", "Awesome link"];
const colors = [
  "#69d2e7",
  "#a7dbd8",
  "#e0e4cc",
  "#f38630",
  "#fa6900",
  "#fe4365",
  "#fc9d9a",
  "#f9cdad",
  "#c8c8a9",
  "#83af9b",
  "#ecd078",
  "#d95b43",
  "#c02942",
  "#53777a",
];

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);
const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

const { width, height } = Dimensions.get("window");
const fromCoords = { x: 0, y: height };
const toCoords = { x: width, y: 0 };

const Button = ({ title, onPress, style }: any) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
};

const Drawer = ({ animation, onPress }: any) => {
  const polygonRef = React.useRef<any>();

  React.useEffect(() => {
    animation.addListener((v: any) => {
      if (polygonRef?.current) {
        polygonRef.current.setNativeProps({
          points: `0,0 ${v.x}, ${v.y} ${width}, ${height} 0, ${height}`,
        });
      }
    });

    return () => {
      animation.removeListener();
    };
  });

  const opacity = animation.x.interpolate({
    inputRange: [0, width],
    outputRange: [0, 1],
  });

  const translateX = animation.x.interpolate({
    inputRange: [0, width],
    outputRange: [-50, 0],
  });

  const [selectedRoute, setSelectedRoute] = React.useState("Get started");
  const onRoutePress = React.useCallback((route: any) => {
    setSelectedRoute(route);
    onPress();
  }, []);

  return (
    // @ts-ignore. @ts-expect-error
    <MaskedView
      style={[styles.maskedContainer]}
      maskElement={
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ backgroundColor: "transparent" }}
        >
          <AnimatedPolygon
            ref={polygonRef}
            points={`0,0 ${fromCoords.x}, ${fromCoords.y} ${width}, ${height} 0, ${height}`}
            fill="blue"
          />
        </Svg>
      }
    >
      <View style={styles.menuContainer}>
        <AntDesign
          onPress={onPress}
          name="close"
          size={32}
          color="white"
          style={{ position: "absolute", top: 10, right: 20 }}
        />
        <Animated.View
          style={[styles.menu, { opacity, transform: [{ translateX }] }]}
        >
          <View>
            {routes.map((route, index) => {
              return (
                <Button
                  key={route}
                  title={route}
                  style={[
                    styles.button,
                    {
                      textDecorationLine:
                        route === selectedRoute ? "line-through" : "none",
                      color: colors[index],
                    },
                  ]}
                  onPress={() => onRoutePress(route)}
                />
              );
            })}
          </View>

          <View>
            {links.map((link, index) => {
              return (
                <Button
                  key={link}
                  title={link}
                  style={[
                    styles.buttonSmall,
                    { color: colors[index + routes.length + 1] },
                  ]}
                  onPress={onPress}
                />
              );
            })}
          </View>
        </Animated.View>
      </View>
    </MaskedView>
  );
};

const CustomDrawerScreen = () => {
  const animation = React.useRef(new Animated.ValueXY(fromCoords)).current;
  const animate = (toValue: any) => {
    return Animated.timing(animation, {
      toValue: toValue === 1 ? toCoords : fromCoords,
      duration: 2000,
      useNativeDriver: true,

      //   bounciness: 2,
      //   speed: 10,
    });
  };
  const opacity = animation.x.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });

  const onCloseDrawer = React.useCallback(() => {
    StatusBar.setBarStyle("dark-content", true);
    animate(0).start();
  }, []);
  const onOpenDrawer = React.useCallback(() => {
    StatusBar.setBarStyle("light-content", true);
    animate(1).start();
  }, []);

  const translateX = animation.y.interpolate({
    inputRange: [0, height * 0.3],
    outputRange: [100, 0],
    extrapolate: "clamp",
  });

  // return <Navigation />;
  return (
    <View style={{ flex: 1 }}>
      <Drawer animation={animation} onPress={onCloseDrawer} />
      <StatusBar hidden />
      <AnimatedAntDesign
        onPress={onOpenDrawer}
        name="menufold"
        size={32}
        color="#222"
        style={{
          //   opacity: 1,
          position: "absolute",
          top: 40,
          right: 30,
          transform: [{ translateX }],
        }}
      />
    </View>
  );
};

export default CustomDrawerScreen;

const styles = StyleSheet.create({
  maskedContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: "#222",
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menu: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  button: {
    fontSize: 32,
    color: "#fdfdfd",
    lineHeight: 32 * 1.5,
  },
  buttonSmall: {
    fontSize: 16,
    marginBottom: 5,
    color: "#fdfdfd",
  },
});
