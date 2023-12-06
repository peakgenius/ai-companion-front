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
import ResetPasswordInput from "../../components/auth/ResetPasswordInput";
import { getUrl } from "../../util";
import colors from "../../styles/colors";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invisiblePassword, setInvisiblePassword] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const submitPassword = () => {
    router.push("/otp");
  };

  return (
    <SafeAreaView className="flex bg-white pt-10">
      <Pressable onPress={() => router.push("/otp")} className="pl-4">
        <Image
          resizeMode="contain"
          className="w-[40px] h-[40px]"
          source={require("../../assets/back-43.png")}
        />
      </Pressable>
      <View className="w-full h-[35%] mb-7">
        <View className="w-full h-full">
          <Image
            resizeMode="contain"
            className="w-full h-full"
            source={require("../../assets/reset-password.png")}
          />
        </View>
      </View>
      <View className="pl-8 pr-8 h-[55%]">
        <Text className="text-[24px] text-black font-bold mb-4 text-center">
          Reset Password
        </Text>
        <View className="flex-row justify-center">
          <Text className="text-[12px] text-[#727E96] mb-10 w-[185px] text-center">
            Set a name for your profile, here's the password
          </Text>
        </View>
        <View className="ml-4 mr-4 mb-4">
          <ResetPasswordInput
            placeholderTextColor={"#828d9c"}
            placeholder={"New Password"}
            setText={(val) => setPassword(val)}
            defaultValue={password}
            secureTextEntry={invisiblePassword}
            onPressEye={() => setInvisiblePassword(!invisiblePassword)}
          />
        </View>
        <View className="ml-4 mr-4 mb-4">
          <ResetPasswordInput
            placeholderTextColor={"#828d9c"}
            placeholder={"Reset Password"}
            setText={(val) => setConfirmPassword(val)}
            defaultValue={confirmPassword}
            secureTextEntry={invisiblePassword}
            onPressEye={() => setInvisiblePassword(!invisiblePassword)}
          />
        </View>
        <View className="flex-1 justify-center ml-8 mr-8">
          <CustomButton
            title={"Submit"}
            color={colors.buttonColor}
            onPress={submitPassword}
            textStyle={{ fontSize: 18 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SetPassword;
