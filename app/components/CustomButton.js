import React from "react";
import { Text, View, StyleSheet, Pressable, Image, width } from "react-native";

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
    borderRadius: 10,
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
  btnText: {
    fontSize: 18,
    color: "#FAFAFA",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 2,
  },
});

const CustomButton = React.forwardRef(({ title, color, img, ...rest }, ref) => (
  <Pressable
    style={{ ...styles.btnClickContain, backgroundColor: color, width: width }}
    {...rest}
    ref={ref}
  >
    <>
      {/* <Image resizeMode="contain" source={img}></Image> */}
      {/* <View style={styles.btnContainer}> */}
        <Text style={styles.btnText} title={title}>
          {title}
        </Text>
      {/* </View> */}
    </>
  </Pressable>
));

export default CustomButton;
