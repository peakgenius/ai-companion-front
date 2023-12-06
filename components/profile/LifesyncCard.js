import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
//Tailwind CSS
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const LifesyncCard = (prop) => {
  const { domain, openProgressPopup } = prop;
  return (
    <Pressable onPress={openProgressPopup}>
      <View style={styles.shadowProp}>
        <View
          style={styles.shadowContainer}
          className="p-6 pt-8 pb-8 w-[150px] flex items-center"
        >
          <Text className="text-black text-lg mb-2">{domain}</Text>
          <Image
            resizeMode="cover"
            source={require("../../assets/pencil.png")}
          />
        </View>
      </View>
    </Pressable>
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
