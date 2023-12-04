import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

const Label = ({ text, ...restProps }) => (
  <View style={styles.root}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 0,
    backgroundColor: "red",
    borderRadius: 4
  },
  text: {
    fontSize: 16,
    color: "#fff"
  }
});

export default memo(Label);