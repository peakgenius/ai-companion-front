import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";

import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import { AuthContext } from "../../contexts/user";
import { getUrl } from "../../util";
import colors from "../../styles/colors";

const Feedback = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    if (!authToken) return;
  }, [authToken]);

  const create = async () => {
    setIsSaving(true);
    try {
      await axios.post(getUrl() + "/profile/feedback", feedback, {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (err) {
      console.log(err);
    }
    setIsSaving(false);
  };

  const back = () => {
    if (isSaving) return;
    router.push("/home");
  };

  return (
    <SafeAreaView className="bg-white h-screen">
      <View className="p-6">
        <View className="w-full flex-row pt-6 mb-10">
          <Pressable onPress={back}>
            <Image
              resizeMode="contain"
              className="w-[40px] h-[40px]"
              source={require("../../assets/back-43.png")}
            />
          </Pressable>
          <Text className="text-black text-xl font-semibold flex-1 text-center">
            {" "}
            We value your Iinput
          </Text>
        </View>
        <TextInput
          className="h-[62px] border-gray-200 rounded-[10px] border pl-4 mb-2"
          placeholderTextColor={"#212121"}
          placeholder={"Enter Your Email"}
          onChangeText={(val) => setEmail(val)}
          defaultValue={email}
        />
        <Text
          className="text-right h-3.5  text-xs font-normal mr-2 mb-6"
          style={{ color: colors.buttonColor }}
        >
          optional
        </Text>
        <TextInput
          className="pl-4 pt-8 pr-8 text-sm rounded-[10px] bg-white w-full border-gray-200 border"
          placeholderTextColor={"#212121"}
          placeholder={
            "Please help us to continually improve LifeSync by providing your thoughts, feedback or ideas."
          }
          textAlignVertical={"top"}
          multiline
          numberOfLines={15}
          defaultValue={feedback}
          setText={(value) => {
            setFeedback(value);
          }}
        />
        <View className="flex items-center justify-center flex-row mt-4">
          <CustomButton
            title={"Submit"}
            color={colors.buttonColor}
            onPress={create}
            disabled={isSaving}
            textStyle={{
              paddingLeft: 40,
              paddingRight: 40,
              fontSize: 20,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Feedback;
