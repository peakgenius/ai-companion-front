import React, { useState, useContext, useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { router } from "expo-router";

import { AuthContext } from "../contexts/user";
import { getUrl } from "../util/asyncStorage";

const Loading = () => {
  const [isLoadingApp, setIsLoadingApp] = useState(false);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    load();
  }, []);

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
    router.replace("/");
  };

  return (
    <View className="flex items-center h-full">
      <Text className="text-center text-2xl ">Loading...</Text>
    </View>
  );
};

export default Loading;
