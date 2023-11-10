import React, { useState, useContext } from "react";
import { Text, View, Image } from "react-native";
import { Link, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { AuthContext } from "../contexts/auth";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import { getUrl } from "../util/asyncStorage";

const SignIn = () => {
  const buttonColor = "#d9ab3c";
  const [profile, setProfile] = useState({ email: "", password: "" });
  const { setIsAuthenticated, setUser, setAuthToken } = useContext(AuthContext);

  const signIn = async () => {
    console.log(getUrl());
    axios
      .post(getUrl() + "/auth/signin", profile)
      .then(async (res) => {
        const { user, token } = res.data;
        if (token) {
          setIsAuthenticated(true);
          setUser(user);
          try {
            setAuthToken(token);
            const storageExpirationTimeInMinutes = 60;
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
          }
          router.replace("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View className="flex-1 bg-neutral-900">
      <View className="w-full flex justify-center p-4 pt-6">
        <Link href="/">
          <Ionicons name="arrow-back" size={32} color="white" />
        </Link>
        <Image
          resizeMode="contain"
          className="w-full h-40"
          source={require("../../assets/signin.png")}
        />
      </View>
      <View className="p-4">
        <Text className="text-2xl text-white text-center mb-4">Sign In</Text>
        <Input
          placeholder="Email"
          setText={(text) => {
            setProfile((prev) => ({ ...prev, email: text }));
          }}
          defaultValue={profile.email}
        />
        <Input
          placeholder="Password"
          setText={(text) => {
            setProfile((prev) => ({ ...prev, password: text }));
          }}
          defaultValue={profile.password}
          secureTextEntry={true}
        />
        <CustomButton title="Sign In" color={buttonColor} onPress={signIn} />
      </View>
    </View>
  );
};

export default SignIn;
