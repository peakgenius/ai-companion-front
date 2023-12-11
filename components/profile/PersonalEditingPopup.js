import React from "react";
import { Text, View, TextInput } from "react-native";

import Popup from "../../components/Popup";
import CustomButton from "../../components/CustomButton";
import colors from "../../styles/colors";
import RangeSlider from "../RangeSlider";
import Card from "../auth/Card";

const PersonalEditingPopup = (props) => {
  const {
    personalEditingPopup,
    closePersonalEditingPopup,
    isSaving,
    updatePersonal,
    personalEditingData,
    setPersonalEditingData,
  } = props;

  return (
    <Popup
      visible={personalEditingPopup.visible}
      dismiss={closePersonalEditingPopup}
      viewContainerClassName={
        "bg-white border-gray-950 w-[300px] h-[300] pt-5 pl-5 pr-5 rounded-3xl"
      }
    >
      <View>
        <Text className="text-center mb-5 text-lg">
          Edit your {personalEditingPopup.item}
        </Text>
        {personalEditingPopup.item === "name" && (
          <TextInput
            className="border border-gray-200 rounded-xl pl-6 font-bold text-[14px] shadow-inner h-[55px] bg-neutral-100 mb-5"
            placeholderTextColor={"#828d9c"}
            placeholder={"Name"}
            onChangeText={(val) =>
              setPersonalEditingData((prev) => ({
                ...prev,
                name: val,
              }))
            }
            defaultValue={personalEditingData.name}
          />
        )}
        {(personalEditingPopup.item === "age" ||
          personalEditingPopup.item === "height" ||
          personalEditingPopup.item === "weight") && (
          <View>
            <Text className="text-center mb-3 text-lg">
              {personalEditingData[personalEditingPopup.item]}
            </Text>
            <RangeSlider
              onValueChanged={(value) =>
                setPersonalEditingData((prev) => ({
                  ...prev,
                  [personalEditingPopup.item]: value[0],
                }))
              }
              min={1}
              max={personalEditingPopup.item === "age" ? 110 : 250}
              step={1}
              value={personalEditingData[personalEditingPopup.item]}
              width={220}
            />
          </View>
        )}
        {personalEditingPopup.item === "gender" && (
          <View className="flex-row justify-around mb-2">
            <Card
              text={"Male"}
              onPress={() =>
                setPersonalEditingData((prev) => ({ ...prev, gender: 1 }))
              }
              selectedCard={personalEditingData.gender === 1}
              containerPadding={"p-2 pl-3 pr-3"}
              src={require("../../assets/male.png")}
            />
            <Card
              text={"Fe-male"}
              onPress={() =>
                setPersonalEditingData((prev) => ({ ...prev, gender: 0 }))
              }
              selectedCard={personalEditingData.gender === 0}
              containerPadding={"p-2 pl-3 pr-3"}
              src={require("../../assets/female.png")}
            />
          </View>
        )}
        {personalEditingPopup.item === "marial_status" && (
          <View className="flex-row justify-around mb-2">
            <Card
              text={"single"}
              onPress={() =>
                setPersonalEditingData((prev) => ({
                  ...prev,
                  marial_status: 0,
                }))
              }
              selectedCard={personalEditingData.marial_status === 0}
              containerPadding={"p-2 pl-4 pr-4"}
              src={require("../../assets/single-35.png")}
            />
            <Card
              text={"married"}
              onPress={() =>
                setPersonalEditingData((prev) => ({
                  ...prev,
                  marial_status: 1,
                }))
              }
              selectedCard={personalEditingData.marial_status === 1}
              containerPadding={"p-2 pl-3 pr-3"}
              src={require("../../assets/married-35.png")}
            />
            <Card
              text={"divorced"}
              onPress={() =>
                setPersonalEditingData((prev) => ({
                  ...prev,
                  marial_status: 2,
                }))
              }
              selectedCard={personalEditingData.marial_status === 2}
              containerPadding={"p-2 pl-3 pr-3"}
              src={require("../../assets/divorced-35.png")}
            />
          </View>
        )}
        <View className="flex-row justify-center gap-3">
          <View>
            <CustomButton
              color={colors.buttonColor}
              title={isSaving ? "Saving..." : "Save"}
              disabled={isSaving}
              onPress={updatePersonal}
            />
          </View>
          <View>
            <CustomButton
              color={"grey"}
              title={"Cancel"}
              onPress={closePersonalEditingPopup}
            />
          </View>
        </View>
      </View>
    </Popup>
  );
};

export default PersonalEditingPopup;
