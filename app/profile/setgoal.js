import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { router } from "expo-router";
import axios from "axios";

import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { AuthContext } from "../../contexts/user";
import { getUrl } from "../../util";
import colors from "../../styles/colors";

const SetGoal = () => {
  const [goal, setGoal] = useState({ domain: "", content: "" });
  const [domains, setDomains] = useState([]);
  const [domainIds, setDomainIds] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
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

  const create = async () => {
    setIsSaving(true);
    try {
      await axios.post(getUrl() + "/profile/set-goal", goal, {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
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
    <View className="flex-1 bg-neutral-900">
      <View className="p-6">
        <View className="w-full flex justify-center pb-6 pt-6">
          <Pressable onPress={back}>
            <Image
              resizeMode="cover"
              source={require("../../assets/left-arrow-24.png")}
            />
          </Pressable>
        </View>
        <View className="mb-5 mt-12">
          <Text
            className="text-white text-xl mb-3"
            style={{ color: colors.buttonColor }}
          >
            Domain of Goal
          </Text>
          <Select
            dropdownHeight={"225px"}
            data={domains}
            defaultValue={domains[0]}
            onSelect={(value, index) => {
              setGoal((prev) => ({ ...prev, domain: domainIds[index] }));
            }}
          />
        </View>
        <Text
          className="text-white text-xl mb-3"
          style={{ color: colors.buttonColor }}
        >
          Goal
        </Text>
        <Input
          multiline={true}
          numberOfLines={5}
          defaultValue={goal.content}
          setText={(value) => {
            setGoal((prev) => ({ ...prev, content: value }));
          }}
        />
        <View className="flex items-center justify-center flex-row">
          <CustomButton
            title={isSaving ? "Setting..." : "Set goal"}
            color={colors.buttonColor}
            onPress={create}
            disabled={isSaving}
          />
        </View>
      </View>
    </View>
  );
};

export default SetGoal;
