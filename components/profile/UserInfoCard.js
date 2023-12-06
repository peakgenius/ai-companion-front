import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
//Tailwind CSS
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const UserInfoCard = (prop) => {
  const { src, text } = prop;

  return (
    <View style={styles.shadowProp}>
      <View
        style={styles.shadowContainer}
        className="p-6 w-[150px] flex items-center"
      >
        <Image resizeMode="contain" source={src} />
        <Text className="text-center mt-2">{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    borderRadius: 16,
    backgroundColor: "transparent",
    shadowColor: "#8d898978",
    padding: 8,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  shadowContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
});

export default UserInfoCard;
