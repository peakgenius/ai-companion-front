import React, { useState, useContext } from "react";
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

import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import { getUrl } from "../../util";
import colors from "../../styles/colors";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const sendCode = () => {
    router.push("/otp");
  };

  return (
    <SafeAreaView className="flex bg-white pt-10">
      <Pressable onPress={() => router.push("/signin")} className="pl-4">
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
          onChangeText={(val) => setEmail(val)}
          defaultValue={email}
        />
        <View className="flex-1 justify-center">
          <CustomButton
            title={"Continue"}
            color={colors.buttonColor}
            onPress={sendCode}
            textStyle={{ fontSize: 18 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
