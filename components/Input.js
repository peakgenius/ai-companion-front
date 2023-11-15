import React from "react";
import { TextInput } from "react-native";
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
    style
  } = props;

  return (
    <>
      {!multiline && (
        <TextInput
          style={{ height: 40, ...style }}
          className="bg-slate-300 rounded-md pl-4 mb-3"
          placeholder={placeholder}
          placeholderTextColor={"#828d9c"}
          onChangeText={(newText) => setText(newText)}
          defaultValue={defaultValue}
          secureTextEntry={secureTextEntry}
        />
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
