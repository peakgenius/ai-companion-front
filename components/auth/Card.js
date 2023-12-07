import React, { useMemo } from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
//Tailwind CSS
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Card = (prop) => {
  const { src, text, containerPadding, selectedCard, onPress } = prop;

  const _containerPadding = useMemo(() => {
    return containerPadding;
  }, [containerPadding]);

  return (
    <Pressable onPress={onPress}>
      <View
        style={
          selectedCard
            ? { ...styles.shadowProp, shadowColor: "black" }
            : styles.shadowProp
        }
      >
        <View
          style={styles.shadowContainer}
          className={`${_containerPadding} flex items-center`}
        >
          <Image resizeMode="contain" source={src} />
          <Text className="text-center mt-2">{text}</Text>
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

export default Card;
