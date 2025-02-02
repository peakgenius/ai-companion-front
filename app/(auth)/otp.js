import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
  Platform
} from "react-native";
import { router } from "expo-router";
import axios from "axios";
import OTPTextInput from "react-native-otp-textinput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomButton from "../../components/CustomButton";
import { AuthContext } from "../../contexts/user";
import { getUrl } from "../../util";
import colors from "../../styles/colors";
import WarningPopup from "../../components/WarningPopup";

const Otp = () => {
  const { forgotPasswordInfo, setForgotPasswordInfo } = useContext(AuthContext);
  const [countDown, setCountDown] = useState(120);
  const [confirm, setConfirm] = useState({ isMatch: false, isDirty: false });
  const [isSaving, setIsSaving] = useState(false);
  const [warning, setWarning] = useState({ visiblePopup: false, text: "" });

  useEffect(() => {
    if (countDown <= 0) {
      formatCode();
      return;
    }
    const timer = setTimeout(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countDown]);

  const formatCode = async () => {
    setIsSaving(true);
    try {
      await axios.post(
        getUrl() + "/auth/format-code",
        { email: forgotPasswordInfo.email },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (err) {
      console.log(err.message, "->");
    }
    setIsSaving(false);
  };

  const handleOtp = (value) => {
    if (value.length < 4) {
      setConfirm({ isDirty: false, isMatch: false });
    }
    console.log("vlue", value)
    setForgotPasswordInfo((prev) => ({ ...prev, code: value }));
  };

  const sendAgain = async () => {
    setIsSaving(true);
    try {
      await axios.post(
        getUrl() + "/auth/send-code",
        { email: forgotPasswordInfo.email },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (err) {
      console.log(err.message, "->");
    }
    setIsSaving(false);
    setCountDown(120);
  };

  const goToPassword = async () => {
    if (forgotPasswordInfo.code.length < 4 || countDown <= 0) return;
    setIsSaving(true);
    try {
      const res = await axios.post(
        getUrl() + "/auth/confirm-code",
        { email: forgotPasswordInfo.email, code: forgotPasswordInfo.code },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log("confirm", res.data.confirm);
      if (res.data.confirm) {
        setConfirm({ isDirty: true, isMatch: true });
        router.push("/resetpassword");
      } else {
        setConfirm({ isDirty: true, isMatch: false });
      }
    } catch (err) {
      if (err.response) {
        setWarning({ visiblePopup: true, text: err.response.data.message });
      }
    }
    setIsSaving(false);
  };

  const closeWarningPopup = () => {
    setWarning({ visiblePopup: false, text: "" });
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView className="bg-white pt-10">
        <ScrollView  className={Platform.OS === "ios" ? "mt-8" : ""}>
          <View className="w-full pl-4 pr-4 flex-row h-[350px] overflow-hidden mb-6">
            <Pressable onPress={() => router.push("/forgotpassword")}>
              <Image
                resizeMode="contain"
                className="w-[40px] h-[40px]"
                source={require("../../assets/back-43.png")}
              />
            </Pressable>
            <View className="w-[90%]">
              <Image
                resizeMode="contain"
                className="w-full h-full"
                source={require("../../assets/otp.png")}
              />
            </View>
          </View>
          <View className="pl-8 pr-8">
            <Text className="text-[24px] text-black font-bold mb-4">
              OTP VERIFICATION
            </Text>
            <View className="mr-1 break-all mb-6 ">
              <Text className="text-[14px] text-[#5A5A5A] mb-1 mr-2">
                Enter the OTP sent to-
              </Text>
              <Text className="text-[14px] text-black font-bold">
                {forgotPasswordInfo.email}
              </Text>
            </View>
            <View className="m-4">
              <OTPTextInput
                handleTextChange={handleOtp}
                className={
                  confirm.isDirty && !confirm.isMatch
                    ? "border-red-800  border rounded-xl pl-6 font-bold text-[14px] shadow-inner h-[55px] w-[55px] bg-neutral-100"
                    : "border-gray-200 border rounded-xl pl-6 font-bold text-[14px] shadow-inner h-[55px] w-[55px] bg-neutral-100"
                }
              />
            </View>
            <View className="m-4">
              <Text className="text-[14px] text-center text-[#464646]">
                {countDown} Sec
              </Text>
            </View>
            <View className="flex-row justify-center mb-6">
              <Text className="text-[#5A5A5A] mr-1">Can't get a code?</Text>
              <Pressable onPress={sendAgain} disabled={isSaving}>
                <Text className="font-bold text-[#5A5A5A]">send again</Text>
              </Pressable>
            </View>
            <View className="justify-center mb-6">
              <CustomButton
                title={"Continue"}
                color={colors.buttonColor}
                onPress={goToPassword}
                textStyle={{ fontSize: 18 }}
                disabled={isSaving}
              />
            </View>
          </View>
        </ScrollView>
        <WarningPopup
        visibleWarningPopup={warning.visiblePopup}
        closeWarningPopup={closeWarningPopup}
        text={warning.text}
      />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Otp;
