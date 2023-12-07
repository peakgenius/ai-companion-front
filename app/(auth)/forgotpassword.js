import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";

import CustomButton from "../../components/CustomButton";
import { getUrl } from "../../util";
import { AuthContext } from "../../contexts/user";
import colors from "../../styles/colors";

const ForgotPassword = () => {
  const { forgotPasswordInfo, setForgotPasswordInfo } = useContext(AuthContext);
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
    } catch (err) {
      console.log(err.message, "->");
    }
    setIsSaving(false);
    router.push("/otp");
  };

  const back = () => {
    if (isSaving) return;
    router.push("/signin");
  };

  return (
    <SafeAreaView className="flex bg-white pt-10">
      <Pressable onPress={back} className="pl-4">
        <Image
          resizeMode="contain"
          className="w-[40px] h-[40px]"
          source={require("../../assets/back-43.png")}
        />
      </Pressable>
      <View className="w-full h-[45%]">
        <View className="w-full h-full">
          <Image
            resizeMode="contain"
            className="w-full h-full"
            source={require("../../assets/forgot-password.png")}
          />
        </View>
      </View>
      <View className="pl-8 pr-8 h-[50%]">
        <Text className="text-[24px] text-black font-bold mb-4">
          Forgot Password
        </Text>
        <Text className="text-[14px] text-[#727E96] mb-10">
          Do not worry! It happens. Please enter the email to which we will send
          the OTP in this email.
        </Text>
        <TextInput
          className="border border-gray-200 rounded-xl pl-6 font-bold text-[14px] shadow-inner h-[55px] bg-neutral-100"
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
        <View className="flex-1 justify-center">
          <CustomButton
            title={"Continue"}
            color={colors.buttonColor}
            onPress={sendCode}
            textStyle={{ fontSize: 18 }}
            disabled={isSaving}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
