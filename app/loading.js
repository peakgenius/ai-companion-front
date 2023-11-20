import React, { useState, useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import axios from "axios";
import { router } from "expo-router";
import ProgressBar from "react-native-progress/Bar";

import { AuthContext } from "../contexts/user";
import { getUrl } from "../util";
import colors from "../styles/colors";

const Loading = () => {
  const [isLoadingApp, setIsLoadingApp] = useState(false);
  const { authToken } = useContext(AuthContext);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    load();
    const timer = setInterval(() => {
      handlePress();
    }, 300);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isLoadingApp && progress > 1) {
      router.replace("/");
    }
  }, [progress, isLoadingApp]);

  const handlePress = () => {
    setProgress((prevProgress) => prevProgress + 0.05);
  };

  const load = async () => {
    setIsLoadingApp(true);
    try {
      await axios.get(getUrl() + "/auth/loading", {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (err) {
      console.log(err);
    }
    setIsLoadingApp(false);
  };

  return (
    <View className="flex items-center justify-center flex-1" style={colors.mainBackground}>
      <Text className="text-center text-2xl mb-5 text-white">Loading...</Text>
      <ProgressBar
        progress={progress}
        width={300}
        height={20}
        unfilledColor="white"
        borderColor="none"
        borderRadius={10}
        color={colors.buttonColor}
      />
      {progress < 1 && (
        <Text className="mt-5 text-white">
          {(progress * 100).toFixed(0)}%
        </Text>
      )}
      {progress > 1 && <Text className="mt-5 text-white">100%</Text>}
    </View>
  );
};

export default Loading;
