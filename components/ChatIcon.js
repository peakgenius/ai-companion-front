import React from "react";
import { View, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import colors from "../styles/colors";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const ChatIcon = ({ isLoading }) => {
  const back = () => {
    if (isLoading) return;
    router.push("/chat");
  };

  return (
    <View
      className="absolute bottom-4 right-3 p-2 rounded-full z-10"
      style={{ backgroundColor: colors.buttonColor }}
    >
      <Pressable onPress={back}>
        <View className="flex-col items-center">
          <Image
            resizeMode="cover"
            source={require("../assets/message-24.png")}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default ChatIcon;
