import React, { memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../styles/colors";
const THUMB_RADIUS = 15;

const Thumb = ({ text }) => {
  return (
    <>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.root} />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    width: THUMB_RADIUS * 1.5,
    height: THUMB_RADIUS * 1.5,
    borderRadius: THUMB_RADIUS,
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: colors.buttonColor,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
  },
});

export default memo(Thumb);
