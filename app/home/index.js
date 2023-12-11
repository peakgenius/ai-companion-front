import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";

import CustomButton from "../../components/CustomButton";
import { AuthContext } from "../../contexts/user";
import { getUrl } from "../../util";
import Navbar from "../../components/Navbar.js";
import Progress from "../../components/home/Progress.js";
import colors from "../../styles/colors";
import ChatIcon from "../../components/ChatIcon.js";

const Home = () => {
  const { authToken, isAuthenticated, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [progresses, setProgresses] = useState([]);

  useEffect(() => {
    if (!authToken) return;
    getProgress();
  }, [authToken]);

  const getProgress = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(getUrl() + "/profile/goal-progress", {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      setProgresses(res.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const goToProfile = () => {
    if (isLoading) return;
    router.push("/profile");
  };

  const goToFeedback = () => {
    if (isLoading) return;
    router.push("/feedback");
  };

  return (
    <SafeAreaView className="h-full bg-white pt-5">
      {isAuthenticated && (
        <View className="pl-6 pr-6">

        <Navbar setIsLoading={setIsLoading} isLoading={isLoading} />
        </View>
      )}
      <ScrollView>
        {isAuthenticated && (
          <>
            <View className="flex">
              <Progress
                user={user}
                goalProgresses={progresses}
                isLoading={isLoading}
                getGoalProgress={getProgress}
              />
            </View>
          </>
        )}
        {!isAuthenticated && (
          <>
            <View className="flex-1 items-center justify-center">
              <Image
                resizeMode="contain"
                className="w-3/4"
                source={require("../../assets/home.png")}
              />
            </View>
            <View className="p-8 pt-0 items-stretch">
              <Link href="/signup" asChild>
                <CustomButton title="Sign Up" color={colors.buttonColor} />
              </Link>
              <Link href="/signin" asChild>
                <CustomButton title="Sign In" color={colors.buttonColor} />
              </Link>
            </View>
          </>
        )}
      </ScrollView>
      {isAuthenticated && (
        <View className="flex-row justify-around fixed pt-3 pb-2 border-t border-gray-200">
          <ChatIcon isLoading={isLoading} />
          <Pressable
            onPress={goToProfile}
            className="flex-col items-center absolute  left-1/2 w-[100px] bottom-2"
            style={{ transform: [{ translateX: -50 }] }}
          >
            <View
              className="flex-col items-center justify-center p-2 rounded-full w-[55px] h-[55px] mb-5"
              style={{ backgroundColor: colors.buttonColor }}
            >
              <Image
                resizeMode="contain"
                source={require("../../assets/white-user.png")}
              />
            </View>
            <Text className="text-black text-xs font-bold">Profile</Text>
          </Pressable>
          <Pressable onPress={goToFeedback}>
            <View className="flex-col items-center">
              <Image
                resizeMode="contain"
                source={require("../../assets/feedback.png")}
              />
              <Text className="text-black text-xs">feedback</Text>
            </View>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
