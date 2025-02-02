import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
  TextInput,
  ScrollView,
  Platform
} from "react-native";
import { router } from "expo-router";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomButton from "../../components/CustomButton";
import { getUrl } from "../../util";
import { AuthContext } from "../../contexts/user";
import colors from "../../styles/colors";
import WarningPopup from "../../components/WarningPopup";

const ForgotPassword = () => {
  const { forgotPasswordInfo, setForgotPasswordInfo } = useContext(AuthContext);
  const [warning, setWarning] = useState({ visiblePopup: false, text: "" });
  const [isSaving, setIsSaving] = useState(false);
  const sendCode = async () => {
    if (!forgotPasswordInfo.email) return;
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
      router.push("/otp");
    } catch (err) {
      if (err.response) {
        setWarning({ visiblePopup: true, text: err.response.data.message });
      }
    }
    setIsSaving(false);
  };

  const back = () => {
    if (isSaving) return;
    router.push("/signin");
  };

  const closeWarningPopup = () => {
    setWarning({ visiblePopup: false, text: "" });
  };

  return (
    <KeyboardAwareScrollView className="h-screen">
      <SafeAreaView className="pt-10">
        <ScrollView className={Platform.OS === "ios" ? "mt-8" : ""}>
          <Pressable onPress={back} className="pl-4">
            <Image
              resizeMode="contain"
              className="w-[40px] h-[40px]"
              source={require("../../assets/back-43.png")}
            />
          </Pressable>
          <View className="w-full h-[350px]">
            <Image
              resizeMode="contain"
              className="w-full h-full"
              source={require("../../assets/forgot-password.png")}
            />
          </View>
          <View className="pl-8 pr-8 mb-5">
            <Text className="text-[24px] text-black font-bold mb-4">
              Forgot Password
            </Text>
            <Text className="text-[14px] text-[#727E96] mb-10">
              Do not worry! It happens. Please enter the email to which we will
              send the OTP in this email.
            </Text>
            <TextInput
              className="border border-gray-200 mb-10 rounded-xl pl-6 font-bold text-[14px] shadow-inner h-[55px] bg-neutral-100"
              placeholderTextColor={"#828d9c"}
              placeholder={"Email"}
              onChangeText={(val) =>
                setForgotPasswordInfo((prev) => ({
                  ...prev,
                  email: val,
                }))
              }
              defaultValue={forgotPasswordInfo.email}
            />
            <View className="justify-center">
              <CustomButton
                title={"Continue"}
                color={colors.buttonColor}
                onPress={sendCode}
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

export default ForgotPassword;
