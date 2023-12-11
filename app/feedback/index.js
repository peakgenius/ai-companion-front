import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";

import CustomButton from "../../components/CustomButton";
import { AuthContext } from "../../contexts/user";
import { getUrl } from "../../util";
import Popup from "../../components/Popup";
import colors from "../../styles/colors";

const Feedback = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    if (!authToken) return;
  }, [authToken]);

  const create = async () => {
    if (!feedback) return;
    setIsSaving(true);
    try {
      await axios.post(
        getUrl() + "/question/feedback",
        { content: feedback },
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setFeedback("");
    openPopup();
    setIsSaving(false);
  };

  const openPopup = () => {
    setVisiblePopup(true);
  };

  const closePopup = () => {
    setVisiblePopup(false);
  };

  const back = () => {
    if (isSaving) return;
    router.push("/home");
  };

  return (
    <SafeAreaView className="bg-white h-screen">
      <ScrollView className="p-6">
        <View className="w-full flex-row pt-6 mb-10">
          <Pressable onPress={back}>
            <Image
              resizeMode="contain"
              className="w-[40px] h-[40px]"
              source={require("../../assets/back-43.png")}
            />
          </Pressable>
          <Text className="text-black text-xl font-semibold flex-1 text-center">
            We value your input
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
          onChangeText={(value) => {
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
      </ScrollView>
      <Popup
        visible={visiblePopup}
        dismiss={closePopup}
        viewContainerClassName={
          "border-gray-950 h-[220] pt-5 pl-5 pr-5 rounded-3xl"
        }
      >
        <Text className="text-black text-xl text-center">
          You feedback was submitted successfully!
        </Text>
      </Popup>
    </SafeAreaView>
  );
};

export default Feedback;
