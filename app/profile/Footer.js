import React from "react";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Popup from "../components/Popup";

const Footer = (props) => {
  const {
    openPopupSettingTip,
    openPopupSettingQuestion,
    visibleSettingQuestion,
    closePopupSettingQuestion,
    questionDisplayInterval,
    setQuestionInterval,
    visibleSettingTip,
    closePopupSettingTip,
    tipDisplayInterval,
    setTipInterval,
  } = props;
  return (
    <>
      <View className="flex-row justify-around p-2 bg-slate-700 border-t-slate-300 bottom-0 left-0 right-0" style={{position: "fixed"}}>
        <Link href="/profile/setgoal">
          <View className="flex-col">
            <FontAwesome
              name="user"
              size={32}
              color="white"
              style={styles.textCenter}
            />
            <Text className="text-white text-xs">create goal</Text>
          </View>
        </Link>
        <Pressable onPress={openPopupSettingTip}>
          <View className="flex-col">
            <FontAwesome
              name="life-ring"
              size={32}
              color="white"
              style={styles.textCenter}
            />
            <Text className="text-white text-xs text-center">tips</Text>
          </View>
        </Pressable>
        <Pressable onPress={openPopupSettingQuestion}>
          <View className="flex-col">
            <FontAwesome
              name="inbox"
              size={32}
              color="white"
              style={styles.textCenter}
            />
            <Text className="text-white text-xs">questions</Text>
          </View>
        </Pressable>
      </View>
      <Popup
        visible={visibleSettingQuestion}
        transparent={true}
        dismiss={closePopupSettingQuestion}
        margin={"10%"}
        marginTop={"25%"}
      >
        <View className="bg-white border-gray-950 h-[300] pt-5 pl-5 pr-5">
          <View className=" mb-5">
            <Image
              source={require("../../assets/chatbot.png")}
              className="w-20 h-20 rounded-full"
            ></Image>
            <Text className="p-1 inline-block">
              Would you like to display a question once every few days?
            </Text>
          </View>
          <RadioButtonGroup
            containerStyle={styles.radioMarginB}
            selected={questionDisplayInterval}
            onSelected={setQuestionInterval}
            radioBackground="green"
          >
            <RadioButtonItem
              value={0}
              label={<Text className="pb-3">A day</Text>}
              style={styles.radioMarginB}
            />
            <RadioButtonItem
              value={1}
              label={<Text className="pb-3">A week</Text>}
              style={styles.radioMarginB}
            />
            <RadioButtonItem
              value={2}
              label={<Text className="pb-3">A month</Text>}
              style={styles.radioMarginB}
            />
          </RadioButtonGroup>
        </View>
      </Popup>
      <Popup
        visible={visibleSettingTip}
        transparent={true}
        dismiss={closePopupSettingTip}
        margin={"10%"}
        marginTop={"25%"}
      >
        <View className="bg-white border-gray-950 h-[300] pt-5 pl-5 pr-5">
          <View className=" mb-5">
            <Image
              source={require("../../assets/chatbot.png")}
              className="w-20 h-20 rounded-full"
            ></Image>
            <Text className="p-1 inline-block">
              Would you like to display a tip once every few days?
            </Text>
          </View>
          <RadioButtonGroup
            containerStyle={styles.radioMarginB}
            selected={tipDisplayInterval}
            onSelected={setTipInterval}
            radioBackground="green"
          >
            <RadioButtonItem
              value={0}
              label={<Text className="pb-3">A day</Text>}
              style={styles.radioMarginB}
            />
            <RadioButtonItem
              value={1}
              label={<Text className="pb-3">A week</Text>}
              style={styles.radioMarginB}
            />
            <RadioButtonItem
              value={2}
              label={<Text className="pb-3">A month</Text>}
              style={styles.radioMarginB}
            />
          </RadioButtonGroup>
        </View>
      </Popup>
    </>
  );
};

const styles = StyleSheet.create({
  textCenter: {
    textAlign: "center",
  },
  radioMarginB: {
    marginBottom: "10px",
  },
});

export default Footer;
