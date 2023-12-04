import React from "react";
import { TextInput, View, Text, Image, Pressable } from "react-native";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Input = (props) => {
  const {
    placeholder,
    setText,
    defaultValue,
    secureTextEntry,
    multiline,
    numberOfLines,
    maxLength,
    style,
    iconSrc,
    onPressEye,
  } = props;

  return (
    <>
      {!multiline && (
        <View className="relative">
          <Text className="absolute top-2 left-16 color-slate-500">
            {placeholder}
          </Text>
          <Image
            resizeMode="contain"
            className="absolute top-4 left-4"
            source={iconSrc}
          />
          <TextInput
            style={{ height: 64, ...style }}
            className="border border-gray-300 rounded-xl pl-16 pt-6 mb-3 font-bold"
            placeholderTextColor={"#828d9c"}
            onChangeText={(newText) => setText(newText)}
            defaultValue={defaultValue}
            secureTextEntry={secureTextEntry}
          />
          {placeholder === "Password" && secureTextEntry && (
            <Pressable
              className="absolute top-[17px] right-[17px]"
              onPress={onPressEye}
            >
              <Image
                resizeMode="contain"
                source={require("../assets/eye-24.png")}
              />
            </Pressable>
          )}
          {placeholder === "Password" && !secureTextEntry && (
            <Pressable className="absolute top-4 right-4" onPress={onPressEye}>
              <Image
                resizeMode="contain"
                source={require("../assets/disabled-eye-28.png")}
              />
            </Pressable>
          )}
        </View>
      )}
      {multiline && (
        <TextInput
          defaultValue={defaultValue}
          onChangeText={(newText) => setText(newText)}
          multiline={true}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          className="bg-slate-300 rounded-md pl-4 mb-3"
          style={style}
        />
      )}
    </>
  );
};

export default Input;
