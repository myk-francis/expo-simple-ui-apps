import { View, Text, StyleSheet } from "react-native";
import React from "react";

const TransitionScreenOne = () => {
  return (
    <View style={styles.container}>
      <Text>TransitionScreenOne</Text>
    </View>
  );
};

export default TransitionScreenOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
});
