import React, { useContext } from "react";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Popup from "../Popup";
import colors from "../../styles/colors";
import { AuthContext } from "../../contexts/user";
import { getUrl } from "../../util";
//Tailwind CSS
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

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

  const {
    authToken,
    setAuthToken,
    setIsAuthenticated,
    setUser,
    setDayToGetQuestions,
  } = useContext(AuthContext);

  const goToSetgoal = () => {
    if (isLoading) return;
    router.push("/profile/setgoal");
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUser({});
    try {
      await AsyncStorage.removeItem("auth-token");
      setDayToGetQuestions(0);
      setIsAuthenticated(false);
      setAuthToken("");
      await axios.post(
        getUrl() + "/auth/logout",
        {},
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
    router.push("/")
  };

  return (
    <>
      <View
        className="flex-row justify-around fixed pt-3 pb-2"
        style={styles.grayBorder}
      >
        <Pressable onPress={goToSetgoal}>
          <View className="flex-col items-center">
            <Image
              className="mb-1"
              resizeMode="cover"
              source={require("../../assets/create-goal.png")}
            />
            <Text className="text-xs" style={{ color: colors.buttonColor }}>
              create goal
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={openPopupSettingTip}>
          <View className="flex-col items-center">
            <Image
              resizeMode="contain"
              className="mb-1"
              source={require("../../assets/tips.png")}
            />
            <Text className="text-black text-xs mr-2">tips</Text>
          </View>
        </Pressable>
        <Pressable onPress={openPopupSettingQuestion}>
          <View className="flex-col items-center">
            <Image
              resizeMode="cover"
              className="mb-1"
              source={require("../../assets/questions.png")}
            />
            <Text className="text-black text-xs">questions</Text>
          </View>
        </Pressable>
        <Pressable onPress={logout}>
          <View className="flex-col items-center">
            <Image
              resizeMode="cover"
              className="mb-1"
              source={require("../../assets/logout.png")}
            />
            <Text className="text-black text-xs">Logout</Text>
          </View>
        </Pressable>
      </View>
      <Popup
        visible={visibleSettingQuestion}
        dismiss={closePopupSettingQuestion}
        viewContainerClassName={
          "bg-white border-gray-950 w-[330px] h-[370] pt-5 pl-5 pr-5 rounded-3xl"
        }
      >
        <View>
          <View className=" mb-5">
            <Text className="p-3 pl-5 pr-5 inline-block text-[18px] text-black leading-6">
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
                  className="text-[20px] pb-4 text-black"
                  style={styles.radioButtonItemText}
                >
                  Daily
                </Text>
              }
              style={styles.radioMarginB}
            />
            <RadioButtonItem
              value={1}
              label={
                <Text
                  className="text-[20px] pb-4 text-black"
                  style={styles.radioButtonItemText}
                >
                  Weekly
                </Text>
              }
              style={styles.radioMarginB}
            />
            <RadioButtonItem
              value={2}
              label={
                <Text
                  className="text-[20px] pb-4 text-black"
                  style={styles.radioButtonItemText}
                >
                  Monthly
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
          "bg-white border-gray-950 w-[330px] h-[370] pt-5 pl-5 pr-5 rounded-3xl"
        }
      >
        <View>
          <View className="mb-5">
            <Text className="p-3 pl-6 pr-6 inline-block text-[18px] text-black leading-6 text-center">
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
                  className="text-[20px] pb-4 text-black"
                  style={styles.radioButtonItemText}
                >
                  Daily
                </Text>
              }
              style={styles.radioMarginB}
            />
            <RadioButtonItem
              value={1}
              label={
                <Text
                  className="text-[20px] pb-4 text-black"
                  style={styles.radioButtonItemText}
                >
                  Weekly
                </Text>
              }
              style={styles.radioMarginB}
            />
            <RadioButtonItem
              value={2}
              label={
                <Text
                  className="text-[20px] pb-4 text-black"
                  style={styles.radioButtonItemText}
                >
                  Monthly
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
  grayBorder: {
    borderTopWidth: 1,
    borderTopColor: "#efeeee",
  },
});

export default Footer;
