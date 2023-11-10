import React, { useState, useEffect, useContext } from "react";
import { TextInput, Text, View, Image } from "react-native";
import { Link, router, Redirect } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import TypingText from "react-native-typing-text";
import axios from "axios";

import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import Select from "../components/Select";
import { AuthContext } from "../contexts/auth";
import { getUrl } from "../util/asyncStorage";

const SetGoal = () => {
  const buttonColor = "#d9ab3c";
  const [goal, setGoal] = useState({ domain: "", content: "" });
  const [domains, setDomains] = useState([]);
  const [domainIds, setDomainIds] = useState([]);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    if (!authToken) return;
    getDomain();
  }, [authToken]);

  const getDomain = async () => {
    axios
      .get(getUrl() + "/profile/domain", {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        const domainArray = [];
        const domainIdArray = [];
        res.data.forEach((element) => {
          domainArray.push(element.content);
          domainIdArray.push(element._id);
        });
        setDomains(domainArray);
        setDomainIds(domainIdArray);
        setGoal({ domain: domainIdArray[0], content: "" });
      })
      .catch((err) => {});
  };

  const create = () => {
    axios
      .post(getUrl() + "/profile/set-goal", goal, {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        router.replace("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View className="flex-1 bg-neutral-900">
      <View className="p-4">
        <View className="w-full flex justify-center pb-6 pt-6">
          <Link href="/profile">
            <Ionicons name="arrow-back" size={32} color="white" />
          </Link>
        </View>
        {/* <View className="h-20">
          <TypingText
            text="Hi, I’m your friendly AI companion. Please set the goal of the dommains"
            textSize={16}
          />
        </View> */}
        <Select
          dropdownHeight={"225px"}
          data={domains}
          defaultValue={domains[0]}
          onSelect={(value, index) => {
            setGoal((prev) => ({ ...prev, domain: domainIds[index] }));
          }}
        />

        <Input
          multiline={true}
          numberOfLines={5}
          defaultValue={goal.content}
          setText={(value) => {
            setGoal((prev) => ({ ...prev, content: value }));
          }}
        />
        <View
          className="flex items-center justify-center flex-row"
        >
          <CustomButton title="Set goal" color={buttonColor} onPress={create} />
        </View>
      </View>
    </View>
  );
};

export default SetGoal;
