import {
  View,
  Text,
  Dimensions,
  Easing,
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  Directions,
  FlingGestureHandler,
  State,
} from "react-native-gesture-handler";
import { Transition, Transitioning } from "react-native-reanimated";
import posed, { Transition as PoseTransition } from "react-native-pose";

const { width, height } = Dimensions.get("screen");

const DURATION = 700;
const TITLE_SIZE = 36;
const SPACING = 80;
const IMAGE_SIZE = width * 0.8;

const colors = {
  lightBg: "#F2F2F2",
  darkBg: "#2C2D51",
  lightText: "#A5A6AA",
  darkText: "#093985",
};

const detailsList = ["prepTime", "exp", "skill", "cousine", "type"];

const iconsByType = {
  prepTime: "smartphone",
  exp: "smile",
  skill: "speaker",
  cousine: "square",
  type: "star",
};

const data = [
  {
    image:
      "https://images.unsplash.com/photo-1621188988909-fbef0a88dc04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    title: "Sushi",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam corrupti quod dignissimos provident ut, obcaecati ratione eaque odio id quia deleniti, ipsa quasi facilis quis dicta dolorum et, error minus.",
    prepTime: "30 min",
    exp: 10,
    cousine: "Japanese",
    skill: "easy",
    type: "star",
  },
  {
    image:
      "https://images.unsplash.com/photo-1520347788611-1654e613e422?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    title: "Lemon Dizzle Cake",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam corrupti quod dignissimos provident ut, obcaecati ratione eaque odio id quia deleniti, ipsa quasi facilis quis dicta dolorum et, error minus.",
    prepTime: "40 min",
    exp: 20,
    cousine: "Tanzanian",
    skill: "easy",
    type: "star",
  },
  {
    image:
      "https://images.unsplash.com/photo-1619337744931-97f65a4f14d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    title: "Makande with Rice",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam corrupti quod dignissimos provident ut, obcaecati ratione eaque odio id quia deleniti, ipsa quasi facilis quis dicta dolorum et, error minus.",
    prepTime: "50 min",
    exp: 30,
    cousine: "Italian",
    skill: "easy",
    type: "star",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559528896-c5310744cce8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    title: "Sausage and chips",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam corrupti quod dignissimos provident ut, obcaecati ratione eaque odio id quia deleniti, ipsa quasi facilis quis dicta dolorum et, error minus.",
    prepTime: "37 min",
    exp: 40,
    cousine: "Kenyan",
    skill: "easy",
    type: "star",
  },
  {
    image:
      "https://images.unsplash.com/photo-1485921325833-c519f76c4927?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
    title: "Something nice",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam corrupti quod dignissimos provident ut, obcaecati ratione eaque odio id quia deleniti, ipsa quasi facilis quis dicta dolorum et, error minus.",
    prepTime: "60 min",
    exp: 50,
    cousine: "Japanese",
    skill: "easy",
    type: "star",
  },
];

const Item = ({ children, style }: any) => {
  return (
    <View
      style={[
        style,
        {
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "transparent",
        },
      ]}
    >
      {children}
    </View>
  );
};

const Icon = ({ type }: any) => {
  return (
    <Feather
      name={type}
      size={26}
      color="#A5A6AA"
      style={{ marginRight: 15, height: 26 }}
    />
  );
};

const Description = ({ index, text, color }: any) => {
  return (
    <Item>
      <Text key={`description-${index}`} style={{ fontSize: 16, color }}>
        {text}
      </Text>
    </Item>
  );
};

const Title = ({ index, text, color }: any) => {
  return (
    <Item style={{ height: TITLE_SIZE * 3, justifyContent: "flex-end" }}>
      <Text
        key={`title-${index}`}
        style={{ fontSize: TITLE_SIZE, fontWeight: "900", color }}
      >
        {text}
      </Text>
    </Item>
  );
};

const Details = ({ color, index }: any) => {
  return (
    <View style={{ marginVertical: SPACING }}>
      {detailsList.map((key) => {
        return (
          <View
            key={key}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 25,
            }}
          >
            {/* @ts-ignore. @ts-expect-error */}
            <Icon type={iconsByType[key]} />
            <Item style={{ flex: 1, height: 26, justifyContent: "center" }}>
              <Text
                key={`${key}-${index}`}
                style={{ fontSize: 16, color, fontWeight: "700" }}
              >
                {/* @ts-ignore. @ts-expect-error */}
                {data[index][key]}
              </Text>
            </Item>
          </View>
        );
      })}
    </View>
  );
};

const transition = (
  <Transition.Together>
    <Transition.Out
      type="slide-bottom"
      durationMs={DURATION}
      interpolation="easeIn"
    />
    <Transition.Change />
    <Transition.In
      type="slide-bottom"
      durationMs={DURATION}
      interpolation="easeInOut"
    />
  </Transition.Together>
);

const config = {
  transition: {
    type: "tween",
    duration: DURATION,
    easing: Easing.elastic(0.9),
  },
};

const PosedView = posed.View({
  enter: { opacity: 1, rotate: "0deg", ...config },
  exit: { opacity: 0, rotate: "180deg", ...config },
});

const AnotherCorouselScreen = () => {
  const [index, setIndex] = React.useState(0);
  const color = index % 2 === 1 ? colors.lightText : colors.darkText;
  const headingColor = index % 2 === 1 ? colors.lightText : colors.darkText;

  const activeIndex = React.useRef(new Animated.Value(0)).current;
  const animation = React.useRef(new Animated.Value(0)).current;

  const ref = React.useRef<any>();

  const setActiveIndex = (newIndex: any) => {
    activeIndex.setValue(newIndex);
    ref.current.animateNextTransition();
    setIndex(newIndex);
  };

  React.useEffect(() => {
    Animated.timing(animation, {
      delay: 1000,
      toValue: activeIndex,
      duration: DURATION,
      useNativeDriver: true,
      // easing: Easing.out(Easing.ease),
    }).start();

    // animated.addListener((v) => {

    // });

    return () => {
      //   animated.removeAllListeners();
    };
  }, []);

  const translateY = animation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [height, 0, -height],
  });

  return (
    <FlingGestureHandler
      key="up"
      direction={Directions.UP}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key="down"
        direction={Directions.DOWN}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              { height: height * data.length, transform: [{ translateY }] },
            ]}
          >
            {data.map((_, index) => {
              return (
                <View
                  key={index}
                  style={{
                    height,
                    backgroundColor:
                      index % 2 === 0 ? colors.lightBg : colors.darkBg,
                  }}
                ></View>
              );
            })}
          </Animated.View>
          <PoseTransition>
            {index % 2 === 0 ? (
              <PosedView
                key={"image0"}
                style={[
                  styles.imageContainer,
                  {
                    borderColor:
                      index % 2 === 0 ? colors.lightBg : colors.darkBg,
                  },
                ]}
              >
                <Image
                  source={{ uri: data[index].image }}
                  style={styles.image}
                />
              </PosedView>
            ) : (
              <PosedView
                key={"image1"}
                style={[
                  styles.imageContainer,
                  {
                    borderColor:
                      index % 2 === 0 ? colors.lightBg : colors.darkBg,
                  },
                ]}
              >
                <Image
                  source={{ uri: data[index].image }}
                  style={styles.image}
                />
              </PosedView>
            )}
          </PoseTransition>

          <Transitioning.View
            ref={ref}
            transition={transition}
            style={{ padding: 20, flex: 1, justifyContent: "space-evenly" }}
          >
            <Title
              color={headingColor}
              index={index}
              text={data[index].title}
            />
            <Details color={color} index={index} />
            <Description
              index={index}
              text={data[index].description}
              color={headingColor}
            />
          </Transitioning.View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default AnotherCorouselScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: "absolute",
    width: width * 0.75,
    height: width * 0.75,
    alignItems: "center",
    justifyContent: "center",
    top: 250,
    right: -130,
  },
  image: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: width * 0.75,
    resizeMode: "contain",
  },
});
