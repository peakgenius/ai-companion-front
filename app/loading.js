import React, { useState, useContext, useEffect, useRef } from "react";
import { View, Text, Button, Image } from "react-native";
import axios from "axios";
import { router } from "expo-router";
import Loader from "../components/AnimatedLoader";

import { AuthContext } from "../contexts/user";
import { getUrl } from "../util";
import colors from "../styles/colors";

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
    router.push("/");
  };

  return (
    <View className="flex-1 items-center" style={colors.mainBackground}>
      <Image
        resizeMode="contain"
        className="w-3/4"
        source={require("../assets/home.png")}
      />
      <Loader />
    </View>
  );
};

export default Loading;
