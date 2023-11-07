import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import CustomButton from "../components/CustomButton";
import Popup from "../components/Popup";
import { AuthContext } from "../contexts/auth";
import { getAuthToken } from "../util/asyncStorage";
import QeustionPopup from "./QuestionPopup";
import Input from "../components/Input";

const Home = () => {
  const buttonColor = "#d9ab3c";
  const { authToken, isAuthenticated, setIsAuthenticated, setUser } =
    useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [visibleQuestionPopup, setVisibleQuestionPopup] = useState(false);

  useEffect(() => {
    if (!authToken) return;
    getQuestions();
    openQuestionPopup();
  }, [authToken]);

  const openPopup = async () => {
    const data = await getAuthToken();
    console.log("data", data);
    setVisible(true);
  };

  const closePopup = () => {
    setVisible(false);
  };

  const openQuestionPopup = () => {
    setVisibleQuestionPopup(true);
  };

  const closeQuestionPopup = () => {
    setVisibleQuestionPopup(false);
  };

  const getQuestions = () => {
    axios
      .get(process.env.EXPO_PUBLIC_BASE_URL + "/question/questions", {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {})
      .catch((err) => {});
  };

  const logout = async () => {
    setIsAuthenticated(false);
    const user = {
      name: "",
      age: 0,
      height: 0,
      weight: 0,
      gender: "",
    };
    setUser(user);
    try {
      await AsyncStorage.removeItem("auth-token");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 bg-neutral-900 pt-5">
        <Text className="text-2xl text-center text-white">AI companion</Text>
        <Image
          resizeMode="contain"
          className="w-full flex-1"
          source={require("../../assets/home.png")}
        />
        <View className="p-4 pt-0 items-stretch">
          {!isAuthenticated && (
            <>
              <Link href="/signup" asChild>
                <CustomButton title="Sign Up" color={buttonColor} />
              </Link>
              <Link href="/signin" asChild>
                <CustomButton title="Sign In" color={buttonColor} />
              </Link>
            </>
          )}
          {isAuthenticated && (
            <CustomButton
              title="Log out"
              color={buttonColor}
              onPress={logout}
            />
          )}
        </View>
        {isAuthenticated && (
          <View className="flex-row justify-around p-2 bg-slate-700 border-t-slate-300">
            <Link href="/profile">
              <View className="flex-col">
                <FontAwesome
                  name="user"
                  size={32}
                  color="white"
                  style={{ textAlign: "center" }}
                />
                <Text className="text-white text-xs">Profile</Text>
              </View>
            </Link>
            <Link href="/progress">
              <View className="flex-col">
                <FontAwesome
                  name="life-ring"
                  size={32}
                  color="white"
                  style={{ textAlign: "center" }}
                />
                <Text className="text-white text-xs">Progress</Text>
              </View>
            </Link>
            <Pressable onPress={openPopup}>
              <View className="flex-col">
                <FontAwesome
                  name="inbox"
                  size={32}
                  color="white"
                  style={{ textAlign: "center" }}
                />
                <Text className="text-white text-xs">Chat</Text>
              </View>
            </Pressable>
          </View>
        )}
        <Popup
          visible={visible}
          transparent={true}
          dismiss={closePopup}
          margin={"2%"}
          marginTop={"5%"}
        >
          <View className="bg-white border-gray-950 h-[500] pt-5 pl-5 pr-5">
            <View className="flex-row">
              <Image
                source={require("../../assets/chatbot.png")}
                className="w-10 h-10"
              ></Image>
              <Text className="bg-slate-300 p-1 inline-block">hello</Text>
            </View>
            <View className="absolute bottom-2 w-full ml-2">
              <Input
                multiline={true}
                numberOfLines={5}
                style={{ backgroundColor: "#f1f1f1" }}
              />
            </View>
          </View>
        </Popup>
        <QeustionPopup
          visibleQuestionPopup={visibleQuestionPopup}
          closeQuestionPopup={closeQuestionPopup}
        ></QeustionPopup>
      </View>
    </SafeAreaView>
  );
};

export default Home;
