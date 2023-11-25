import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { router } from "expo-router";
import axios from "axios";

import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import { AuthContext } from "../../contexts/user";
import { getUrl } from "../../util";
import colors from "../../styles/colors";

const SetGoal = () => {
  const [goal, setGoal] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { authToken, user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (!authToken) return;
  }, [authToken]);

  const create = async () => {
    setIsSaving(true);
    try {
      await axios.post(
        getUrl() + "/profile/set-goal",
        { goalContent: goal },
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      router.push("/profile");
    } catch (err) {
      console.log(err);
    }
    setIsSaving(false);
  };

  const back = () => {
    if (isSaving) return;
    router.push("/profile");
  };

  return (
    <View className="bg-neutral-900 h-screen">
      <View className="p-6">
        <View className="w-full flex justify-center pb-6 pt-6">
          <Pressable onPress={back}>
            <Image
              resizeMode="cover"
              source={require("../../assets/left-arrow-24.png")}
            />
          </Pressable>
        </View>
        <Text
          className="text-white text-xl mb-3"
          style={{ color: colors.buttonColor }}
        >
          Goal
        </Text>
        <Input
          multiline={true}
          numberOfLines={5}
          defaultValue={goal}
          setText={(value) => {
            setGoal(value);
          }}
        />
        <View className="flex items-center justify-center flex-row">
          <CustomButton
            title={isSaving ? "Setting..." : "Set goal"}
            color={colors.buttonColor}
            onPress={create}
            disabled={isSaving}
          />
        </View>
      </View>
    </View>
  );
};

export default SetGoal;
