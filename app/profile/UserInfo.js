import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";
import colors from "../../styles/colors";
const UserInfo = (props) => {
  const { user, isLoading, openProgressPopup } = props;
  const gender = ["female", "male"];
  const marial_status = ["single", "married", "divorced"];

  const goToHome = () => {
    if (isLoading) return;
    router.push("/");
  };

  return (
    <View className="w-full flex justify-center p-4 pt-6 mt-5">
      <Pressable className="mb-4" onPress={goToHome}>
        <Image
          resizeMode="cover"
          source={require("../../assets/left-arrow-24.png")}
        />
      </Pressable>
      <Text
        className="text-3xl font-bold mb-3"
        style={{ color: colors.buttonColor }}
      >
        User info
      </Text>
      <View className="flex flex-row">
        <Text className="basis-1/2 text-white text-lg">Name: {user.name}</Text>
        <Text className="basis-1/2 text-white text-lg">Age: {user.age}</Text>
      </View>
      <View className="flex flex-row">
        <Text className="basis-1/2 text-white text-lg">
          Height: {user.height}
        </Text>
        <Text className="basis-1/2 text-white text-lg">
          Weight: {user.weight}
        </Text>
      </View>
      <View className="flex flex-row mb-3">
        <Text className="basis-1/2 text-white text-lg">
          Gender: {gender[user.gender]}
        </Text>
        <Text className="basis-1/2 text-white text-lg">
          Marial: {marial_status[user.marial_status]}
        </Text>
      </View>
      <Text
        className="text-3xl font-bold mb-3"
        style={{ color: colors.buttonColor }}
      >
        Life Balance Wheel
      </Text>
      <View className="flex-row justify-between ml-3 mr-3 mb-3">
        <Pressable onPress={() => openProgressPopup("health", true)}>
          <View className="flex-col items-center">
            <Text className="text-white text-lg mb-2">Health</Text>
            <Image
              resizeMode="cover"
              source={require("../../assets/pencil-15.png")}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => openProgressPopup("income", true)}>
          <View className="flex-col items-center">
            <Text className="text-white text-lg mb-2">Income</Text>
            <Image
              resizeMode="cover"
              source={require("../../assets/pencil-15.png")}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => openProgressPopup("family", true)}>
          <View className="flex-col items-center">
            <Text className="text-white text-lg mb-2">Family</Text>
            <Image
              resizeMode="cover"
              source={require("../../assets/pencil-15.png")}
            />
          </View>
        </Pressable>
      </View>
      <View className="flex-row justify-around ml-3 mr-3">
        <Pressable onPress={() => openProgressPopup("romantic", true)}>
          <View className="flex-col items-center">
            <Text className="text-white text-lg mb-2">Partner/Romaintic</Text>
            <Image
              resizeMode="cover"
              source={require("../../assets/pencil-15.png")}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => openProgressPopup("happiness", true)}>
          <View className="flex-col items-center">
            <Text className="text-white text-lg mb-2">Happiness</Text>
            <Image
              resizeMode="cover"
              source={require("../../assets/pencil-15.png")}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default UserInfo;
