import React from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import TypingText from "react-native-typing-text";

import Popup from "../Popup";
import Input from "../Input";
import colors from "../../styles/colors";
//Tailwind CSS
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const GoalQuestionPopup = (props) => {
  const {
    visibleQuestionPopup,
    closeQuestionPopup,
    goal,
    question,
    answer,
    setAnswer,
    saveAnswer,
    skipAnswer,
    isSaving,
  } = props;

  return (
    <Popup
      visible={visibleQuestionPopup}
      dismiss={closeQuestionPopup}
      viewContainerClassName={
        "border-gray-950 h-[320] pt-5 pl-5 pr-5 rounded-3xl relative"
      }
    >
      <View className="flex-row justify-center text-center">
        <View className="h-auto W-5/6  w-5/6 pt-2">
          <Text
            className="mb-3 text-center pl-2 text-xl font-bold"
            style={{ color: colors.buttonColor }}
          >
            {goal.charAt(0).toUpperCase() + goal.slice(1)}
          </Text>
        </View>
      </View>
      <TypingText text={question} textSize={16} color="#000" />
      <View className="ml-auto w-3/5 mt-3 mb-5">
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
      <View className="flex-row justify-center">
        <Input
          tailwindClass={"pl-4 mb-3 rounded-[14px] w-3/4"}
          multiline={true}
          className="flex-1"
          numberOfLines={3}
          defaultValue={answer}
          style={{ backgroundColor: "#f1f1f1" }}
          setText={(value) => {
            setAnswer(value);
          }}
        />
        <Pressable onPress={saveAnswer}>
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

export default GoalQuestionPopup;
