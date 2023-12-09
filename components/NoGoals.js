import { Text, View, Image, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
//Tailwind CSS
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});

const NoGoals = () => {
  const goToSetGoal = () => {
    router.push("/profile/setgoal");
  };
  return (
    <Pressable onPress={goToSetGoal} className="w-full">
      <View className="rounded-lg bg-slate-100 w-full p-3 flex-row">
        <View className="bg-black p-4 rounded-full">
          <Image source={require("../assets/target.png")} />
        </View>
        <View className="ml-3">
          <Text className="text-black text-xl font-bold mb-3">Goals</Text>
          <Text className="text-black text-sm">No goals to be shown</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default NoGoals;
