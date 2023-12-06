import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";
import OTPTextInput from "react-native-otp-textinput";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import { getUrl } from "../../util";
import colors from "../../styles/colors";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [countDown, setCountDown] = useState(120);
  const sendCode = () => {};

  useEffect(() => {
    if (countDown <= 0) return;
    const timer = setTimeout(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countDown]);

  const handleOtp = (value) => {
    setOtp(value);
  };

  const sendAgain = () => {};

  const goToPassword = () => {
    router.push("/resetpassword");
  };

  return (
    <SafeAreaView className="flex bg-white pt-10">
      <View className="w-full pl-4 pr-4 flex-row h-[45%] overflow-hidden mb-6">
        <Pressable onPress={() => router.push("/forgotpassword")}>
          <Image
            resizeMode="contain"
            className="w-[40px] h-[40px]"
            source={require("../../assets/back-43.png")}
          />
        </Pressable>
        <View className="w-[90%] h-full">
          <Image
            resizeMode="contain"
            className="w-full h-full"
            source={require("../../assets/otp.png")}
          />
        </View>
      </View>
      <View className="pl-8 pr-8 h-[50%]">
        <Text className="text-[24px] text-black font-bold mb-4">
          OTP VERIFICATION
        </Text>
        <View className="flex-row mr-1 mb-6">
          <Text className="text-[14px] text-[#5A5A5A] mr-2">
            Enter the OTP sent to-
          </Text>
          <Text className="text-[14px] text-black font-bold">
            Abc@gmail.com
          </Text>
        </View>
        <View className="m-4">
          <OTPTextInput
            handleTextChange={handleOtp}
            className="border border-gray-200 rounded-xl pl-6 font-bold text-[14px] shadow-inner h-[55px] w-[55px] bg-neutral-100"
          />
        </View>
        <View className="m-4">
          <Text className="text-[14px] text-center text-[#464646]">
            {countDown} Sec
          </Text>
        </View>
        <View className="flex-row justify-center">
          <Text className="text-[#5A5A5A] mr-1">Can't get a code?</Text>
          <Pressable onPress={sendAgain}>
            <Text className="font-bold text-[#5A5A5A]">send again</Text>
          </Pressable>
        </View>
        <View className="flex-1 justify-center">
          <CustomButton
            title={"Continue"}
            color={colors.buttonColor}
            onPress={goToPassword}
            textStyle={{ fontSize: 18 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Otp;
