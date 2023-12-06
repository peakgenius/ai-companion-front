import React from "react";
import { View, Image, Pressable, Text } from "react-native";
import { router } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const ChatIcon = ({ isLoading }) => {
  const back = () => {
    if (isLoading) return;
    router.push("/chat");
  };

  return (
    <Pressable onPress={back}>
      <View className="flex-col items-center">
        <Image resizeMode="contain" source={require("../assets/chat.png")} />
        <Text className="text-black text-xs">chat</Text>
      </View>
    </Pressable>
  );
};

export default ChatIcon;
