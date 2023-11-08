import React from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import TypingText from "react-native-typing-text";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Popup from "../components/Popup";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";

const GoalQuestionPopup = (props) => {
  const {
    visibleQuestionPopup,
    closeQuestionPopup,
    question,
    answer,
    setAnswer,
    saveAnswer,
    skipAnswer,
  } = props;

  return (
    <Popup
      visible={visibleQuestionPopup}
      transparent={true}
      dismiss={closeQuestionPopup}
      margin={"5%"}
      marginTop={"15%"}
      borderRadius={20}
    >
      <View className="bg-white border-gray-950 h-[250] pt-5 pl-5 pr-5">
        <View className="flex-row">
          <Image
            source={require("../../assets/chatbot.png")}
            className="w-10 h-10"
          ></Image>
          <View className="h-auto W-5/6  w-5/6 pt-2">
            <TypingText text={question} textSize={16} />
          </View>
        </View>
        <View>
          <CustomButton
            title="Skip a question"
            color={"#d9ab3c"}
            onPress={skipAnswer}
          />
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
          <Pressable onPress={saveAnswer}>
            <View className="flex items-center justify-center bg-sky-600 w-11 rounded-full h-12 ml-3">
              <FontAwesome
                name="send-o"
                size={18}
                color="white"
                style={{ textAlign: "center" }}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </Popup>
  );
};

const styles = StyleSheet.create({
  buttonColor: {
    backgroundColor: "#d9ab3c"
  }
})

export default GoalQuestionPopup;
