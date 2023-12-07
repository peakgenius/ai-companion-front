import {
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
//Tailwind CSS
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});

const NoGoals = () => {
  return (
    <View className="rounded-lg bg-slate-100 w-full p-3 flex-row">
      <View className="bg-black p-4 rounded-full">
        <Image source={require("../assets/target.png")} />
      </View>
      <View className="ml-3">
        <Text className="text-black text-xl font-bold mb-3">Goals</Text>
        <Text className="text-black text-sm">No goals to be shown</Text>
      </View>
    </View>
  );
};

export default NoGoals;
