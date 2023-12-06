import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import colors from "../../styles/colors";

const userMessage = (props) => {
  const { message } = props;
  return (
    <View className="flex-row mb-3 justify-end">
      {/* <View className="flex justify-end mr-2 mb-5">
        <Pressable>
          <Image
            source={require("../../assets/save.png")}
            className="w-5 h-5"
          ></Image>
        </Pressable>
      </View> */}
      <View
        className="rounded-t-3xl rounded-bl-3xl p-3 max-w-[91%]"
        style={{ backgroundColor: colors.buttonColor }}
      >
        <Text className="rounded-l-md text-white rounded-br-lg mr-2 p-2 text-[16px]">
          {message}
        </Text>
      </View>
    </View>
  );
};

export default userMessage;
