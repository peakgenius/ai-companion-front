import React from "react";
import { View, Text, StyleSheet } from "react-native";
import UserInfoCard from "./UserInfoCard";
import colors from "../../styles/colors";
//Tailwind CSS
import { NativeWindStyleSheet } from "nativewind";
import LifesyncCard from "./LifesyncCard";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const UserInfo = (props) => {
  const {
    user,
    openProgressPopup,
    openPersonalEditingPopup,
    gender,
    marial_status,
  } = props;

  return (
    <View className="w-full flex justify-center">
      <Text
        className="text-[20px] font-bold mb-3"
        style={{ color: colors.buttonColor }}
      >
        User info
      </Text>
      <View className="flex-row justify-center gap-1 mb-1">
        <UserInfoCard
          openPersonalEditingPopup={() => openPersonalEditingPopup("name")}
          src={require("../../assets/name.png")}
          text={`Name: ${user.name}`}
        />
        <UserInfoCard
          openPersonalEditingPopup={() => openPersonalEditingPopup("age")}
          src={require("../../assets/age.png")}
          text={`Age: ${user.age}`}
        />
      </View>
      <View className="flex-row justify-center gap-1 mb-1">
        <UserInfoCard
          openPersonalEditingPopup={() => openPersonalEditingPopup("height")}
          src={require("../../assets/height.png")}
          text={`Height: ${user.height} cm`}
        />
        <UserInfoCard
          openPersonalEditingPopup={() => openPersonalEditingPopup("weight")}
          src={require("../../assets/weight.png")}
          text={`Weight: ${user.weight} kg`}
        />
      </View>
      <View className="flex-row justify-center gap-1 mb-1">
        <UserInfoCard
          openPersonalEditingPopup={() => openPersonalEditingPopup("gender")}
          src={require("../../assets/gender.png")}
          text={`Gender: ${gender[user.gender]}`}
        />
        <UserInfoCard
          openPersonalEditingPopup={() =>
            openPersonalEditingPopup("marial_status")
          }
          src={require("../../assets/marial.png")}
          text={`Marial: ${marial_status[user.marial_status]}`}
        />
      </View>
      <Text
        className="text-[20px] font-bold mb-3"
        style={{ color: colors.buttonColor }}
      >
        Life Balance Wheel
      </Text>
      <View className="flex-row justify-center">
        <LifesyncCard
          openProgressPopup={() => openProgressPopup("health", true)}
          domain={"Health"}
          progress={user.health}
        />
        <LifesyncCard
          openProgressPopup={() => openProgressPopup("income", true)}
          progress={user.income}
          domain={"Income"}
        />
      </View>
      <View className="flex-row justify-center">
        <LifesyncCard
          openProgressPopup={() => openProgressPopup("family", true)}
          progress={user.family}
          domain={"Family"}
        />
        <LifesyncCard
          openProgressPopup={() => openProgressPopup("romantic", true)}
          progress={user.romantic}
          domain={"Romantic"}
        />
      </View>
      <View className="flex-row justify-center">
        <LifesyncCard
          openProgressPopup={() => openProgressPopup("happiness", true)}
          progress={user.happiness}
          domain={"Happiness"}
        />
      </View>
    </View>
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

export default UserInfo;
