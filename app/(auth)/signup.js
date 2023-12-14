import React, { useState, useContext } from "react";
import { Text, View, Image, SafeAreaView, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import colors from "../../styles/colors";
import { AuthContext } from "../../contexts/user";
import { getUrl } from "../../util";
import WarningPopup from "../../components/WarningPopup";

const SignUp = () => {
  const [invisiblePassword, setInvisiblePassword] = useState(true);
  const [isSaving, setIsSaving] = useState(true);
  const [warning, setWarning] = useState({ visiblePopup: false, text: "" });
  const { signupUserInfo, setSignupUserInfo } = useContext(AuthContext);

  const goToAboutme = async () => {
    if (
      !signupUserInfo.email ||
      !signupUserInfo.name ||
      !signupUserInfo.password
    )
      return;
    console.log("singtup");
    setIsSaving(true);
    try {
      const res = await axios.post(getUrl() + "/auth/signup", signupUserInfo, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      router.push("/aboutme");
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
      <SafeAreaView>
        <ScrollView>
          <View className="w-full h-[320px] pt-5">
            <Image
              resizeMode="contain"
              className="w-full h-full"
              source={require("../../assets/signup.png")}
            />
          </View>
          <View className="pl-8 pr-8">
            <Text className="text-[18px] text-black font-bold mb-4">
              Sign Up
            </Text>
            <Text className="text-[14px] text-black mb-10">
              Enter your credentials to continue
            </Text>
            <Input
              placeholder="Name"
              setText={(value) => {
                setSignupUserInfo((prev) => ({ ...prev, name: value }));
              }}
              iconSrc={require("../../assets/user-32.png")}
              defaultValue={signupUserInfo.name}
            />
            <Input
              placeholder="Email"
              iconSrc={require("../../assets/email-32.png")}
              setText={(value) => {
                setSignupUserInfo((prev) => ({ ...prev, email: value }));
              }}
              defaultValue={signupUserInfo.email}
            />
            <Input
              placeholder="Password"
              iconSrc={require("../../assets/password-32.png")}
              setText={(value) => {
                setSignupUserInfo((prev) => ({ ...prev, password: value }));
              }}
              defaultValue={signupUserInfo.password}
              secureTextEntry={invisiblePassword}
              onPressEye={() => setInvisiblePassword(!invisiblePassword)}
            />
            <CustomButton
              title={"Sign Up"}
              color={colors.buttonColor}
              onPress={goToAboutme}
            />
            <View className="flex-row justify-center mt-4 mb-6">
              <Text className="text-sm mr-1">Already have an account?</Text>
              <Link
                href="signin"
                style={{ color: colors.buttonColor }}
                className="font-bold"
              >
                LogIn
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <WarningPopup
        visibleWarningPopup={warning.visiblePopup}
        closeWarningPopup={closeWarningPopup}
        text={warning.text}
      />
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
