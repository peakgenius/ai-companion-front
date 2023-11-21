import React from "react";
import { View, ScrollView, Text } from "react-native";

import Popup from "../../components/Popup";
import CustomButton from "../../components/CustomButton";
import OrderedList from "../../components/OrderedList";
import colors from "../../styles/colors";

const TipsPopup = (props) => {
  const { visibleTipsPopup, closeTipsPopup, tips, nodisplayAnymore, isSaving } =
    props;

  return (
    <Popup
      visible={visibleTipsPopup}
      dismiss={closeTipsPopup}
      viewContainerClassName={
        "bg-white border-gray-950 h-[500] pt-5 pl-5 pr-5 rounded-md"
      }
    >
      <ScrollView>
        <View className="pt-2 mb-2">
          <Text className="text-2xl mb-4 text-center font-bold" style={{color: colors.buttonColor}}>
            {tips.goal?.charAt(0).toUpperCase() + tips.goal?.slice(1)}
          </Text>
          {tips.tips?.map((item, index) => (
            <OrderedList key={index} number={index + 1} item={item} />
          ))}
        </View>
      </ScrollView>
      <View className="position bottom-2 ml-auto w-3/5 pt-6">
        <CustomButton
          title="Continue next tips"
          color={colors.buttonColor}
          disabled={isSaving}
          onPress={nodisplayAnymore}
        />
      </View>
    </Popup>
  );
};

export default TipsPopup;
