import React, { useState, useContext } from "react";
import { Text, View, Image, SafeAreaView, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import colors from "../../styles/colors";
import { AuthContext } from "../../contexts/user";

const SignUp = () => {
  const [invisiblePassword, setInvisiblePassword] = useState(true);
  const { signupUser, setSignupUser } = useContext(AuthContext);

  const goToAboutme = () => {
    if (!signupUser.name || !signupUser.email || !signupUser.password) return;
    router.push("/aboutme");
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
                setSignupUser((prev) => ({ ...prev, name: value }));
              }}
              iconSrc={require("../../assets/user-32.png")}
              defaultValue={signupUser.name}
            />
            <Input
              placeholder="Email"
              iconSrc={require("../../assets/email-32.png")}
              setText={(value) => {
                setSignupUser((prev) => ({ ...prev, email: value }));
              }}
              defaultValue={signupUser.email}
            />
            <Input
              placeholder="Password"
              iconSrc={require("../../assets/password-32.png")}
              setText={(value) => {
                setSignupUser((prev) => ({ ...prev, password: value }));
              }}
              defaultValue={signupUser.password}
              secureTextEntry={invisiblePassword}
              onPressEye={() => setInvisiblePassword(!invisiblePassword)}
            />
            <CustomButton
              title={"Sign Up"}
              color={colors.buttonColor}
              onPress={goToAboutme}
            />
            <View className="flex-row justify-center mt-4 mb-6">
              <Text className="text-sm mr-1">Don't have an account?</Text>
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
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
