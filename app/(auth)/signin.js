import React, { useState, useContext } from "react";
import { Text, View, Image, SafeAreaView } from "react-native";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthContext } from "../../contexts/user";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import { getUrl, getTokenExpiryTime } from "../../util";
import colors from "../../styles/colors";

const SignIn = () => {
  const { setIsAuthenticated, setUser, setAuthToken } = useContext(AuthContext);
  const [invisiblePassword, setInvisiblePassword] = useState(true);
  const [profile, setProfile] = useState({ email: "", password: "" });
  const [isSaving, setIsSaving] = useState(false);

  const signIn = async () => {
    try {
      setIsSaving(true);
      const res = await axios.post(getUrl() + "/auth/signin", profile);
      const { user, token } = res.data;
      if (token) {
        setIsAuthenticated(true);
        setUser(user);
        try {
          setAuthToken(token);
          const storageExpirationTimeInMinutes = getTokenExpiryTime();
          const now = new Date();
          now.setMinutes(now.getMinutes() + storageExpirationTimeInMinutes); // add the expiration time to the current Date time
          const expiryTimeInTimestamp = Math.floor(now.getTime() / 1000);
          const authTokenData = {
            token: token,
            expiryTime: expiryTimeInTimestamp,
          };
          const authTokenJson = JSON.stringify(authTokenData);
          await AsyncStorage.setItem("auth-token", authTokenJson);
        } catch (e) {
          console.log(e);
          setIsSaving(false);
        }
        setIsSaving(false);
        router.push("/loading");
      }
    } catch (err) {
      console.log(err);
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView className="h-screen">
        <View className="w-full h-[45%] pt-5">
          <View className="w-full h-full">
            <Image
              resizeMode="contain"
              className="w-full h-full"
              source={require("../../assets/signin.png")}
            />
          </View>
        </View>
        <View className="pl-8 pr-8 h-[55%]">
          <Text className="text-[18px] text-black font-bold mb-4">LOG IN</Text>
          <Text className="text-[14px] text-black mb-10">
            Enter your credentials to continue
          </Text>
          <Input
            placeholder="Email"
            iconSrc={require("../../assets/email-32.png")}
            setText={(text) => {
              setProfile((prev) => ({ ...prev, email: text }));
            }}
            defaultValue={profile.email}
          />
          <Input
            placeholder="Password"
            iconSrc={require("../../assets/password-32.png")}
            setText={(text) => {
              setProfile((prev) => ({ ...prev, password: text }));
            }}
            defaultValue={profile.password}
            secureTextEntry={invisiblePassword}
            onPressEye={() => setInvisiblePassword(!invisiblePassword)}
          />
          <Link href="/forgotpassword" className="text-right mb-6">
            <Text style={{ color: colors.buttonColor }}>Forgot Password?</Text>
          </Link>
          <CustomButton
            title={isSaving ? "Signing In..." : "Sign In"}
            color={colors.buttonColor}
            onPress={signIn}
            disabled={isSaving}
          />
          <View className="flex-row justify-center mt-4">
            <Text className="text-sm mr-1">Don't have an account?</Text>
            <Link
              href="signup"
              style={{ color: colors.buttonColor }}
              className="font-bold"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;
