import React, { useState, useContext } from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomButton from "../../components/CustomButton";
import { AuthContext } from "../../contexts/user";
import ResetPasswordInput from "../../components/auth/ResetPasswordInput";
import { getUrl } from "../../util";
import colors from "../../styles/colors";

const SetPassword = () => {
  const { forgotPasswordInfo, setForgotPasswordInfo } = useContext(AuthContext);
  const [invisiblePassword, setInvisiblePassword] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const submitPassword = async () => {
    if (forgotPasswordInfo.newPassword !== forgotPasswordInfo.confirmPassword)
      return;
    setIsSaving(true);
    try {
      await axios.post(
        getUrl() + "/auth/reset-password",
        {
          email: forgotPasswordInfo.email,
          password: forgotPasswordInfo.newPassword,
        },
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
    router.push("/signin");
  };

  const back = () => {
    if (isSaving) return;
    router.push("/otp");
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView className={Platform.OS === "ios" ? "mt-8" : ""}>
        <SafeAreaView className="bg-white pt-10">
          <Pressable onPress={back} className="pl-4">
            <Image
              resizeMode="contain"
              className="w-[40px] h-[40px]"
              source={require("../../assets/back-43.png")}
            />
          </Pressable>
          <View className="w-full h-[300px] mb-5">
            <Image
              resizeMode="contain"
              className="w-full h-full"
              source={require("../../assets/reset-password.png")}
            />
          </View>
          <View className="pl-8 pr-8">
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
                setText={(val) =>
                  setForgotPasswordInfo((prev) => ({
                    ...prev,
                    newPassword: val,
                  }))
                }
                defaultValue={forgotPasswordInfo.newPassword}
                secureTextEntry={invisiblePassword}
                onPressEye={() => setInvisiblePassword(!invisiblePassword)}
              />
            </View>
            <View className="ml-4 mr-4 mb-4">
              <ResetPasswordInput
                placeholderTextColor={"#828d9c"}
                placeholder={"Reset Password"}
                setText={(val) =>
                  setForgotPasswordInfo((prev) => ({
                    ...prev,
                    confirmPassword: val,
                  }))
                }
                defaultValue={forgotPasswordInfo.confirmPassword}
                secureTextEntry={invisiblePassword}
                onPressEye={() => setInvisiblePassword(!invisiblePassword)}
              />
            </View>
            <View className="flex-1 justify-center ml-8 mr-8 mb-5">
              <CustomButton
                title={"Submit"}
                color={colors.buttonColor}
                onPress={submitPassword}
                textStyle={{ fontSize: 18 }}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default SetPassword;
