import React from "react";
import {View, Text, Image} from "react-native";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const UserInfo = (props) => {
  const { user } = props;
  return (
    <View className="w-full flex justify-center p-4 pt-6">
      <Link href="/">
        <Ionicons name="arrow-back" size={32} color="white" />
      </Link>
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
        <Text className="basis-1/2 text-white">Gender: {user.gender}</Text>
        <Text className="basis-1/2 text-white">
          Marial_status: {user.marial_status}
        </Text>
      </View>
    </View>
  );
};

export default UserInfo;
