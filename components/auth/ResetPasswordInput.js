import React from "react";
import { TextInput, View, Text, Image, Pressable } from "react-native";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const ResetPasswordInput = (props) => {
  const {
    placeholder,
    setText,
    defaultValue,
    secureTextEntry,
    style,
    onPressEye,
  } = props;

  return (
    <View className="relative">
      <Text className="absolute -top-[14px] p-1 left-6 z-10 bg-white color-slate-500">
        {placeholder}
      </Text>
      <TextInput
        style={{ height: 64, ...style }}
        className="border border-gray-300 rounded-xl pl-6 mb-3 font-bold"
        placeholderTextColor={"#828d9c"}
        onChangeText={(newText) => setText(newText)}
        defaultValue={defaultValue}
        secureTextEntry={secureTextEntry}
      />
      {secureTextEntry && (
        <Pressable
          className="absolute top-[17px] right-[17px]"
          onPress={onPressEye}
        >
          <Image
            resizeMode="contain"
            source={require("../../assets/eye-24.png")}
          />
        </Pressable>
      )}
      {!secureTextEntry && (
        <Pressable className="absolute top-4 right-4" onPress={onPressEye}>
          <Image
            resizeMode="contain"
            source={require("../../assets/disabled-eye-28.png")}
          />
        </Pressable>
      )}
    </View>
  );
};

export default ResetPasswordInput;
