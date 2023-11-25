import React from "react";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { router } from "expo-router";

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
    router.push("/profile/setgoal");
  };
  return (
    <>
      <View
        className="flex-row justify-around p-2 bottom-0 left-0 right-0 fixed"
        style={colors.navBarBackground}
      >
        <Pressable onPress={goToSetgoal}>
          <View className="flex-col items-center">
            <Image
              resizeMode="cover"
              source={require("../../assets/user-32.png")}
            />
            <Text className="text-white text-xs">create goal</Text>
          </View>
        </Pressable>
        <Pressable onPress={openPopupSettingTip}>
          <View className="flex-col items-center">
            <Image
              resizeMode="contain"
              source={require("../../assets/tip-32.png")}
            />
            <Text className="text-white text-xs text-center">tips</Text>
          </View>
        </Pressable>
        <Pressable onPress={openPopupSettingQuestion}>
          <View className="flex-col items-center">
            <Image
              resizeMode="cover"
              source={require("../../assets/question-32.png")}
            />
            <Text className="text-white text-xs">questions</Text>
          </View>
        </Pressable>
      </View>
      <Popup
        visible={visibleSettingQuestion}
        dismiss={closePopupSettingQuestion}
        viewContainerClassName={
          "bg-white border-gray-950 h-[400] pt-5 pl-5 pr-5 rounded-md"
        }
      >
        <View>
          <View className=" mb-5">
            <Text className="p-1 inline-block text-2xl text-white">
              In order to get to know you better, I can occasionally ask you
              questions about yourself - how often would you like this?
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
          "bg-white border-gray-950 h-[380] pt-5 pl-5 pr-5 rounded-md"
        }
      >
        <View>
          <View className=" mb-5">
            <Text className="p-1 inline-block text-2xl text-white">
              How frequently would you like to receive tips or advice to assist
              you in achieving your goals?
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
