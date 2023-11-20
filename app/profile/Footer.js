import React from "react";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Popup from "../../components/Popup";
import colors from "../../styles/colors";

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
    isLoading,
  } = props;

  const goToSetgoal = () => {
    if (isLoading) return;
    router.replace("/profile/setgoal");
  };
  return (
    <>
      <View className="flex-row justify-around p-2 bottom-0 left-0 right-0 fixed" style={colors.navBarBackground}>
        <Pressable onPress={goToSetgoal}>
          <View className="flex-col">
            <FontAwesome
              name="user"
              size={32}
              color="white"
              style={styles.textCenter}
            />
            <Text className="text-white text-xs">create goal</Text>
          </View>
        </Pressable>
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
        dismiss={closePopupSettingQuestion}
        viewContainerClassName={
          "bg-white border-gray-950 h-[330] pt-5 pl-5 pr-5 rounded-md"
        }
      >
        <View>
          <View className=" mb-5">
            <Text className="p-1 inline-block text-2xl text-white">
              Would you like to display a question once every few days?
            </Text>
          </View>
          <RadioButtonGroup
            containerStyle={styles.radioMarginB}
            selected={questionDisplayInterval}
            onSelected={setQuestionInterval}
            radioBackground={colors.buttonColor}
          >
            <RadioButtonItem
              value={0}
              label={
                <Text
                  className="text-lg pb-4 text-white"
                  style={styles.radioButtonItemText}
                >
                  A day
                </Text>
              }
              style={styles.radioMarginB}
            />
            <RadioButtonItem
              value={1}
              label={
                <Text
                  className="text-lg pb-4 text-white"
                  style={styles.radioButtonItemText}
                >
                  A week
                </Text>
              }
              style={styles.radioMarginB}
            />
            <RadioButtonItem
              value={2}
              label={
                <Text
                  className="text-lg pb-4 text-white"
                  style={styles.radioButtonItemText}
                >
                  A month
                </Text>
              }
              style={styles.radioMarginB}
            />
          </RadioButtonGroup>
        </View>
      </Popup>
      <Popup
        visible={visibleSettingTip}
        dismiss={closePopupSettingTip}
        viewContainerClassName={
          "bg-white border-gray-950 h-[330] pt-5 pl-5 pr-5 rounded-md"
        }
      >
        <View>
          <View className=" mb-5">
            <Text className="p-1 inline-block text-2xl text-white">
              Would you like to display a tip once every few days?
            </Text>
          </View>
          <RadioButtonGroup
            containerStyle={styles.radioMarginB}
            selected={tipDisplayInterval}
            onSelected={setTipInterval}
            radioBackground={colors.buttonColor}
          >
            <RadioButtonItem
              value={0}
              label={
                <Text
                  className="text-lg pb-4 text-white"
                  style={styles.radioButtonItemText}
                >
                  A day
                </Text>
              }
              style={styles.radioMarginB}
            />
            <RadioButtonItem
              value={1}
              label={
                <Text
                  className="text-lg pb-4 text-white"
                  style={styles.radioButtonItemText}
                >
                  A week
                </Text>
              }
              style={styles.radioMarginB}
            />
            <RadioButtonItem
              value={2}
              label={
                <Text
                  className="text-lg pb-4 text-white"
                  style={styles.radioButtonItemText}
                >
                  A month
                </Text>
              }
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
    marginBottom: 10,
  },
  radioButtonItemText: {
    marginLeft: 12,
  },
});

export default Footer;
