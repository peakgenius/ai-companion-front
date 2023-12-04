import React, { useState, useContext, useCallback } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";

import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import InputNumber from "../../components/InputNumber";
import Select from "../../components/Select";
import CustomRangeSlider from "../../components/CustomRangeSlider";
import { getUrl } from "../../util";
import { AuthContext } from "../../contexts/user";

const Aboutme = () => {
  const [invisiblePassword, setInvisiblePassword] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    gender: 0,
    age: 0,
    height: 0,
    weight: 0,
    marial_status: 0,
    health: 0,
    income: 0,
    family: 0,
    romantic: 0,
    happiness: 0,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [health, setHealth] = useState(0);
  const [income, setIncome] = useState(0);
  const [family, setFamily] = useState(0);
  const [romantic, setRomantic] = useState(0);
  const [happiness, setHappiness] = useState(0);
  const [gender, setGender] = useState(0);
  const [marialStatus, setMarialStatus] = useState(0);
  const { signupUser, setSignupUser } = useContext(AuthContext);

  const signUp = async () => {
    setIsSaving(true);
    try {
      await axios.post(getUrl() + "/auth/signup", profile, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setIsSaving(false);
      router.push("/signin");
    } catch (err) {
      setIsSaving(false);
      console.log(err.message, "->");
    }
  };

  return (
    <SafeAreaView className="flex bg-white p-6 pt-10">
      <ScrollView>
        <View className="flex-row mb-2">
          <Pressable
            onPress={() => router.push("/signup")}
            className="bg-black"
          >
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
        <Text className="text-[16px] mb-2">Select one option</Text>
        <View className="flex-row justify-around mb-2">
          <View>
            <View style={styles.shadowProp}>
              <View style={styles.shadowContainer} className="p-8 pl-10 pr-10">
                <Image
                  resizeMode="contain"
                  source={require("../../assets/male.png")}
                />
                <Text className="text-center mt-2">Male</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.shadowProp}>
              <View style={styles.shadowContainer} className="p-8 pl-10 pr-10">
                <Image
                  resizeMode="contain"
                  source={require("../../assets/female.png")}
                />
                <Text className="mt-2 text-center">Fe-male</Text>
              </View>
            </View>
          </View>
        </View>
        <Text className="text-lg text-center font-bold mb-2">
          Prefer Not Say
        </Text>
        <Text className="text-[16px] mb-2">Select one option</Text>
        <View className="flex-row justify-around mb-2">
          <View>
            <View style={styles.shadowProp}>
              <View
                style={styles.shadowContainer}
                className="p-3 pl-6 pr-6 text-center"
              >
                <Image
                  resizeMode="contain"
                  source={require("../../assets/single-35.png")}
                />
                <Text className="text-center mt-2">single</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.shadowProp}>
              <View
                style={styles.shadowContainer}
                className="p-3 pl-6 pr-6 flex items-center"
              >
                <Image
                  resizeMode="contain"
                  source={require("../../assets/married-35.png")}
                />
                <Text className="mt-2 text-center">married</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.shadowProp}>
              <View
                style={styles.shadowContainer}
                className="p-3 pl-6 pr-6 flex items-center"
              >
                <Image
                  resizeMode="contain"
                  source={require("../../assets/divorced-35.png")}
                />
                <Text className="mt-2 text-center">married</Text>
              </View>
            </View>
          </View>
        </View>
        <CustomRangeSlider
          key={"age"}
          min={1}
          max={150}
          label={"Age"}
          value={signupUser.age ? signupUser.age : 0}
          text={`${signupUser.age ? signupUser.age : 0} years`}
          onValueChanged={(val) => {
            setSignupUser((prev) => ({ ...prev, age: val }));
          }}
        />
        <CustomRangeSlider
          key={"height"}
          min={1}
          max={250}
          label={"Height"}
          value={signupUser.height ? signupUser.height : 0}
          text={`${signupUser.height ? signupUser.height : 0} cm`}
          onValueChanged={(val) => {
            setSignupUser((prev) => ({ ...prev, height: val }));
          }}
        />
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
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    elevation: 3,
  },
  shadowContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
});

export default Aboutme;
