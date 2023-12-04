import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../styles/colors";
const RailSelected = () => <View style={styles.root} />;

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 6,
    backgroundColor: colors.buttonColor,
    borderRadius: 2,
  },
});
