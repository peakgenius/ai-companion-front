import React from "react";
import { View, ScrollView, Text } from "react-native";

import Popup from "../Popup";
import CustomButton from "../CustomButton";
import OrderedList from "../OrderedList";
import colors from "../../styles/colors";
//Tailwind CSS
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const TipsPopup = (props) => {
  const { visibleTipsPopup, closeTipsPopup, tips, nodisplayAnymore, isSaving } =
    props;

  return (
    <Popup
      visible={visibleTipsPopup}
      dismiss={closeTipsPopup}
      viewContainerClassName={
        "bg-white border-gray-950 w-[330px] h-[480] pt-5 pl-5 pr-5 rounded-3xl"
      }
    >
      <ScrollView>
        <View className="pt-2 mb-2">
          <Text
            className="text-[20px] mb-8 text-center font-bold"
            style={{ color: colors.buttonColor }}
          >
            {tips.goal?.charAt(0).toUpperCase() + tips.goal?.slice(1)}
          </Text>
          {tips.tips?.map((item, index) => (
            <OrderedList key={index} number={index + 1} item={item} />
          ))}
        </View>
      </ScrollView>
      <View className="pl-6 pr-6 mb-10 justify-center">
        <CustomButton
          title="Continue next tips"
          color={colors.buttonColor}
          disabled={isSaving}
          onPress={nodisplayAnymore}
          textStyle={{
            fontSize: 20,
            fontWeight: 500,
          }}
        />
      </View>
    </Popup>
  );
};

export default TipsPopup;
