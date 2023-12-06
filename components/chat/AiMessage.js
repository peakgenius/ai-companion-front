import React from "react";
import { View, Image, Text, Pressable } from "react-native";

const AiMessage = (props) => {
  const { message } = props;
  return (
    <View className="flex-row mb-3">
      <View className="bg-slate-100 rounded-t-3xl rounded-br-3xl p-3 max-w-[91%]">
        <Text className="text-black p-2 inline-block rounded-r-md rounded-bl-lg text-[16px]">
          {message}
        </Text>
      </View>
      {/* <View className="flex justify-end ml-2 mb-2">
        <Pressable className="mb-1">
          <Image
            source={require("../../assets/copy.png")}
            className="w-5 h-5 mr-3"
          />
        </Pressable>
        <Pressable>
          <Image
            source={require("../../assets/vector.png")}
            className="w-5 h-5 mr-3"
          />
        </Pressable>
      </View> */}
    </View>
  );
};

export default AiMessage;
