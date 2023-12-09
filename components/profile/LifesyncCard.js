import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
//Tailwind CSS
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const LifesyncCard = (prop) => {
  const { domain, openProgressPopup, progress } = prop;
  return (
    <View style={styles.shadowProp}>
      <View
        style={styles.shadowContainer}
        className="p-6 pt-5 pb-5 w-[150px] flex items-center"
      >
        <Text className="text-black text-lg mb-1">{domain}</Text>
        <Text className="text-black text-sm mb-1">{progress}</Text>
        <Pressable onPress={openProgressPopup}>
          <Image
            resizeMode="cover"
            source={require("../../assets/pencil.png")}
          />
        </Pressable>
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

export default LifesyncCard;
