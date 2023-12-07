import React from "react";
import { Text, View, Pressable, Image, StyleSheet } from "react-native";

const GoalItem = (props) => {
  const { item, pin, openProgressPopup, openConfirmPopup, isSaving } = props;

  return (
    <View>
      <Text className="text-black text-[16px] mb-3 pl-3">{item.content}</Text>
      <View className="flex-row justify-around mb-3 ml-3">
        <View className="border border-slate-300 rounded-md p-[5px] pl-5 pr-5">
          {!item.is_pin ? (
            <Pressable disabled={isSaving} onPress={(e) => pin(item._id, true)}>
              <Image
                resizeMode="cover"
                source={require("../../assets/pin-unfill.png")}
              />
            </Pressable>
          ) : (
            <Pressable
              disabled={isSaving}
              onPress={(e) => pin(item._id, false)}
            >
              <Image
                resizeMode="cover"
                source={require("../../assets/pin-fill.png")}
              />
            </Pressable>
          )}
        </View>
        <View className="border border-slate-300 rounded-md p-[5px] pl-5 pr-5">
          <Pressable onPress={(e) => openProgressPopup(item._id, false)}>
            <Image
              resizeMode="cover"
              source={require("../../assets/pencil-unfill.png")}
            />
          </Pressable>
        </View>
        <View className="border border-slate-300 rounded-md p-[5px] pl-5 pr-5">
          <Pressable onPress={(e) => openConfirmPopup(item._id)}>
            <Image
              resizeMode="cover"
              source={require("../../assets/trash-unfill.png")}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default GoalItem;
