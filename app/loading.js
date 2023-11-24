import React, { useState, useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import axios from "axios";
import { router } from "expo-router";
import Loader from "../components/ThreeDotsLoader";

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
    <View
      className="flex-row items-center justify-center flex-1"
      style={colors.mainBackground}
    >
      <Text
        className="text-center text-2xl mb-5 mr-1"
        style={{ color: colors.buttonColor }}
      >
        Loading
      </Text>
      <Loader background={colors.buttonColor} />
    </View>
  );
};

export default Loading;
