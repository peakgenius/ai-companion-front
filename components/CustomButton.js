import React from "react";
import { Text, StyleSheet, Pressable, width } from "react-native";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#009D6E",
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    alignSelf: "stretch",
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
  btnText: {
    fontSize: 14,
    color: "#FAFAFA",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 2,
  },
});

const CustomButton = React.forwardRef(({ title, color, img, ...rest }, ref) => (
  <Pressable
    className="flex items-center rounded-lg"
    style={{
      ...styles.btnClickContain,
      backgroundColor: color,
      width: width,
      height: 50,
    }}
    {...rest}
    ref={ref}
  >
    <Text style={styles.btnText} title={title} className="font-bold">
      {title}
    </Text>
  </Pressable>
));

export default CustomButton;
