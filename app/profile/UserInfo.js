import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Link, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../styles/colors";
const UserInfo = (props) => {
  const { user, isLoading } = props;
  const gender = ["female", "male"];
  const marial_status = ["single", "married", "divorced"];

  const goToHome = () => {
    if (isLoading) return;
    router.replace("/");
  };

  return (
    <View className="w-full flex justify-center p-4 pt-6">
      <Pressable className="mb-4" onPress={goToHome}>
        <Ionicons name="arrow-back" size={32} color="white" />
      </Pressable>
      {/* <Image
        resizeMode="contain"
        borderRadius={6}
        className="w-full h-40 mb-3"
        source={require("../../assets/female_avatar.png")}
      /> */}
      <Text className="text-3xl font-bold mb-3" style={{color: colors.buttonColor}}>User info</Text>
      <View className="flex flex-row">
        <Text className="basis-1/2 text-white text-lg">Name: {user.name}</Text>
        <Text className="basis-1/2 text-white text-lg">Age: {user.age}</Text>
      </View>
      <View className="flex flex-row">
        <Text className="basis-1/2 text-white text-lg">Height: {user.height}</Text>
        <Text className="basis-1/2 text-white text-lg">Weight: {user.weight}</Text>
      </View>
      <View className="flex flex-row">
        <Text className="basis-1/2 text-white text-lg">
          Gender: {gender[user.gender]}
        </Text>
        <Text className="basis-1/2 text-white text-lg">
          Marial: {marial_status[user.marial_status]}
        </Text>
      </View>
    </View>
  );
};

export default UserInfo;
