import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";

import CustomButton from "../../components/CustomButton";
import CustomRangeSlider from "../../components/auth/CustomRangeSlider";
import { getUrl } from "../../util";
import { AuthContext } from "../../contexts/user";
import colors from "../../styles/colors";
import Card from "../../components/auth/Card";

const Aboutme = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { signupUser, setSignupUser } = useContext(AuthContext);

  const signUp = async () => {
    if (
      !signupUser.age ||
      !signupUser.height ||
      !signupUser.weight ||
      (signupUser.gender !== 0 && !signupUser.gender) ||
      (!signupUser.marial_status && signupUser.marial_status !== 0) ||
      !signupUser.health ||
      !signupUser.income ||
      !signupUser.family ||
      !signupUser.romantic ||
      !signupUser.happiness
    )
      return;
    setIsSaving(true);
    try {
      await axios.post(getUrl() + "/auth/signup", signupUser, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setIsSaving(false);
      setSignupUser({});
      router.push("/signin");
    } catch (err) {
      setIsSaving(false);
      console.log(err.message, "->");
    }
  };

  const changeSignupUser = (val, name) => {
    setSignupUser((prev) => ({ ...prev, [name]: val }));
  };

  return (
    <SafeAreaView className="flex bg-white p-6 pt-10">
      <View className="flex-row mb-2">
        <Pressable onPress={() => router.push("/signup")}>
          <Image
            resizeMode="contain"
            className="w-[40px] h-[40px]"
            source={require("../../assets/back-43.png")}
          />
        </Pressable>
        <Text className="text-xl flex-1 font-bold text-center leading-10">
          About me
        </Text>
      </View>
      <ScrollView>
        <Text className="text-[16px] mb-2">Select one option</Text>
        <View className="flex-row justify-around mb-2">
          <Card
            text={"Male"}
            onPress={() => changeSignupUser(1, "gender")}
            selectedCard={signupUser.gender === 1}
            containerPadding={"p-8 pl-10 pr-10"}
            src={require("../../assets/male.png")}
          />
          <Card
            text={"Fe-male"}
            onPress={() => changeSignupUser(0, "gender")}
            selectedCard={signupUser.gender === 0}
            containerPadding={"p-8 pl-10 pr-10"}
            src={require("../../assets/female.png")}
          />
        </View>
        <Text className="text-lg text-center font-bold mb-2">
          Prefer Not Say
        </Text>
        <Text className="text-[16px] mb-2">Select one option</Text>
        <View className="flex-row justify-around mb-2">
          <Card
            text={"single"}
            onPress={() => changeSignupUser(0, "marial_status")}
            selectedCard={signupUser.marial_status === 0}
            containerPadding={"p-3 pl-6 pr-6"}
            src={require("../../assets/single-35.png")}
          />
          <Card
            text={"married"}
            onPress={() => changeSignupUser(1, "marial_status")}
            selectedCard={signupUser.marial_status === 1}
            containerPadding={"p-3 pl-6 pr-6"}
            src={require("../../assets/married-35.png")}
          />
          <Card
            text={"divorced"}
            onPress={() => changeSignupUser(2, "marial_status")}
            selectedCard={signupUser.marial_status === 2}
            containerPadding={"p-3 pl-6 pr-6"}
            src={require("../../assets/divorced-35.png")}
          />
        </View>
        <CustomRangeSlider
          key={"age"}
          min={1}
          max={150}
          value={signupUser.age ? signupUser.age : 5}
          step={1}
          label={"Age"}
          text={`${signupUser.age ? signupUser.age : 0} years`}
          onValueChanged={(val) => changeSignupUser(val[0], "age")}
        />
        <CustomRangeSlider
          key={"height"}
          min={1}
          max={250}
          value={signupUser.height ? signupUser.height : 10}
          step={1}
          label={"Height"}
          text={`${signupUser.height ? signupUser.height : 0} cm`}
          onValueChanged={(val) => changeSignupUser(val[0], "height")}
        />
        <CustomRangeSlider
          key={"weight"}
          min={1}
          max={250}
          value={signupUser.weight ? signupUser.weight : 10}
          step={1}
          label={"Weight"}
          text={`${signupUser.weight ? signupUser.weight : 0} kg`}
          onValueChanged={(val) => changeSignupUser(val[0], "weight")}
        />
        <Text className="text-sm">
          Rank the following areas of your life from 1-10 with 1 being the
          extremely unsatisfied and 10 being extremely satisfied
        </Text>
        <CustomRangeSlider
          key={"health"}
          min={1}
          max={10}
          value={signupUser.health ? signupUser.health : 1}
          step={1}
          label={"Health"}
          text={`${signupUser.health ? signupUser.health : 1}`}
          onValueChanged={(val) => changeSignupUser(val[0], "health")}
        />
        <CustomRangeSlider
          key={"income"}
          min={1}
          max={10}
          value={signupUser.income ? signupUser.income : 1}
          step={1}
          label={"Income"}
          text={`${signupUser.income ? signupUser.income : 1}`}
          onValueChanged={(val) => changeSignupUser(val[0], "income")}
        />
        <CustomRangeSlider
          key={"romantic"}
          min={1}
          max={10}
          value={signupUser.romantic ? signupUser.romantic : 1}
          step={1}
          label={"Romantic"}
          text={`${signupUser.romantic ? signupUser.romantic : 1}`}
          onValueChanged={(val) => changeSignupUser(val[0], "romantic")}
        />
        <CustomRangeSlider
          key={"family"}
          min={1}
          max={10}
          value={signupUser.family ? signupUser.family : 1}
          step={1}
          label={"Family"}
          text={`${signupUser.family ? signupUser.family : 1}`}
          onValueChanged={(val) => changeSignupUser(val[0], "family")}
        />
        <CustomRangeSlider
          key={"happiness"}
          min={1}
          max={10}
          value={signupUser.happiness ? signupUser.happiness : 1}
          step={1}
          label={"Happiness"}
          text={`${signupUser.happiness ? signupUser.happiness : 1}`}
          onValueChanged={(val) => changeSignupUser(val[0], "happiness")}
        />
        <View className="mb-12">
          <CustomButton
            title={isSaving ? "saving" : "submit"}
            color={colors.buttonColor}
            onPress={signUp}
            disabled={isSaving}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    borderRadius: 16,
    backgroundColor: "transparent",
    shadowColor: "#8d898978",
    padding: 8,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  shadowContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
});

export default Aboutme;
