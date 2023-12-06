import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, Pressable, SafeAreaView } from "react-native";
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
    <SafeAreaView className="bg-white h-screen">
      <View className="p-6">
        <View className="w-full flex justify-center pt-6">
          <Pressable onPress={back}>
            <Image
              resizeMode="contain"
              className="w-[40px] h-[40px]"
              source={require("../../assets/back-43.png")}
            />
          </Pressable>
          <View className="flex justify-center items-center relative -top-10">
            <Image
              resizeMode="contain"
              source={require("../../assets/goal-amico.png")}
            />
          </View>
        </View>
        <Text
          className="text-white text-xl relative -top-6"
          style={{ color: colors.buttonColor }}
        >
          Goal
        </Text>
        <Input
          tailwindClass={"pl-4 mb-3 rounded-3xl w-full"}
          multiline={true}
          numberOfLines={5}
          defaultValue={goal}
          setText={(value) => {
            setGoal(value);
          }}
        />
        <View className="flex items-center justify-center flex-row mt-4">
          <CustomButton
            title={isSaving ? "Setting..." : "Setting"}
            color={colors.buttonColor}
            onPress={create}
            disabled={isSaving}
            textStyle={{
              paddingLeft: 40,
              paddingRight: 40,
              fontSize: 20,
              fontWeight: 500,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SetGoal;
