import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Link, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

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
      <Image
        resizeMode="contain"
        borderRadius={6}
        className="w-full h-40 mb-3"
        source={require("../../assets/female_avatar.png")}
      />
      <View className="flex flex-row pl-12">
        <Text className="basis-1/2 text-white">Name: {user.name}</Text>
        <Text className="basis-1/2 text-white">Age: {user.age}</Text>
      </View>
      <View className="flex flex-row pl-12">
        <Text className="basis-1/2 text-white">Height: {user.height}</Text>
        <Text className="basis-1/2 text-white">Weight: {user.weight}</Text>
      </View>
      <View className="flex flex-row pl-12">
        <Text className="basis-1/2 text-white">
          Gender: {gender[user.gender]}
        </Text>
        <Text className="basis-1/2 text-white">
          Marial_status: {marial_status[user.marial_status]}
        </Text>
      </View>
    </View>
  );
};

export default UserInfo;
