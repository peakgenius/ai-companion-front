import React from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import TypingText from "react-native-typing-text";

import Popup from "../Popup";
import Input from "../Input";
import colors from "../../styles/colors";
//Tailwind CSS
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const QuestionPopup = (props) => {
  const {
    visibleQuestionPopup,
    closeQuestionPopup,
    question,
    answer,
    setAnswer,
    saveAnswer,
    skipAnswer,
    isSkipUserAnswer,
    isSaving,
  } = props;

  return (
    <Popup
      visible={visibleQuestionPopup}
      dismiss={closeQuestionPopup}
      viewContainerClassName={
        "bg-white border-gray-950 h-[250] pt-5 pl-5 pr-5 rounded-md relative"
      }
    >
      <View className="flex-row mb-3">
        <View className="h-auto W-5/6  w-5/6 pt-2">
          <TypingText text={question} textSize={16} color="white" />
        </View>
      </View>
      <View className="ml-auto w-3/5">
        <Pressable
          color={colors.buttonColor}
          onPress={skipAnswer}
          disabled={isSaving}
        >
          <Text
            style={{
              color: colors.buttonColor,
              textDecorationLine: "underline",
            }}
            className="text-right mr-3"
          >
            Skip
          </Text>
        </Pressable>
      </View>
      <View className="absolute bottom-2 w-11/12 ml-6 flex-row">
        <Input
          multiline={true}
          className="flex-1"
          numberOfLines={3}
          defaultValue={answer}
          style={{ backgroundColor: "#f1f1f1" }}
          setText={(value) => {
            setAnswer(value);
          }}
        />
        <Pressable onPress={saveAnswer} disabled={isSaving}>
          <View
            className="flex items-center justify-center w-11 rounded-full h-12 ml-3"
            style={{ backgroundColor: colors.buttonColor }}
          >
            <Image
              resizeMode="cover"
              source={require("../../assets/send-28.png")}
            />
          </View>
        </Pressable>
      </View>
    </Popup>
  );
};

const styles = StyleSheet.create({
  textAlignCenter: {
    textAlign: "center",
  },
});

export default QuestionPopup;
