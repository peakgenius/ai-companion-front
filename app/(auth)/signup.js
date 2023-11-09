import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import { Link, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";

import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import InputNumber from "../components/InputNumber";
import Select from "../components/Select";
import { getUrl } from "../util/asyncStorage";

const SignUp = () => {
  const buttonColor = "#d9ab3c";
  const marial_status = ["single", "married", "divorced"];
  const gender = ["female", "male"];
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    gender: 0,
    age: 0,
    height: 0,
    weight: 0,
    marial_status: 0,
  });

  const signUp = () => {
    console.log("signup", getUrl(), profile);
    axios
      .post(getUrl() + "/auth/signup", profile, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        router.replace("/signin");
      })
      .catch((err) => {
        // console.log(err.message, '->', err.response.data.message);
        console.log(err.message, "->");
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
          source={require("../../assets/signup.png")}
        />
      </View>
      <View className="p-4">
        <Text className="text-2xl text-white text-center mb-4">Sign Up</Text>
        <Input
          placeholder="Name"
          setText={(value) => {
            setProfile((prev) => ({ ...prev, name: value }));
          }}
          defaultValue={profile.name}
        />
        <Input
          placeholder="Email"
          setText={(value) => {
            setProfile((prev) => ({ ...prev, email: value }));
          }}
          defaultValue={profile.emal}
        />
        <Input
          placeholder="Password"
          setText={(value) => {
            setProfile((prev) => ({ ...prev, password: value }));
          }}
          defaultValue={profile.password}
          secureTextEntry={true}
        />
        <Select
          dropdownHeight={"90px"}
          data={gender}
          onSelect={(value, index) => {
            setProfile((prev) => ({ ...prev, gender: index }));
          }}
        />
        <Select
          dropdownHeight={"135px"}
          data={marial_status}
          onSelect={(value, index) => {
            setProfile((prev) => ({ ...prev, marial_status: index }));
          }}
        />
        <View className="flex-row mb-3">
          <Text className="text-white text-xl flex-1">Age:</Text>
          <InputNumber
            separatorWidth={0}
            totalWidth={250}
            maxValue={150}
            value={profile.age}
            onChange={(value) => {
              setProfile((prev) => ({
                ...prev,
                age: value,
              }));
            }}
          />
        </View>
        <View className="flex-row mb-3">
          <Text className="text-white flex-1 text-xl">Height:</Text>
          <InputNumber
            separatorWidth={0}
            maxValue={300}
            totalWidth={250}
            value={profile.height}
            onChange={(value) => {
              setProfile((prev) => ({
                ...prev,
                height: value,
              }));
            }}
          />
        </View>
        <View className="flex-row mb-3">
          <Text className="text-white flex-1 text-xl">Weight:</Text>
          <InputNumber
            separatorWidth={0}
            maxValue={300}
            totalWidth={250}
            value={profile.weight}
            onChange={(value) => {
              setProfile((prev) => ({
                ...prev,
                weight: value,
              }));
            }}
          />
        </View>

        <CustomButton title="Sign Up" color={buttonColor} onPress={signUp} />
      </View>
    </View>
  );
};

export default SignUp;
