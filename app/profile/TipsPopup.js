import React from "react";
import { View, ScrollView, Text, Pressable, StyleSheet } from "react-native";
import TypingText from "react-native-typing-text";

import Popup from "../../components/Popup";
import CustomButton from "../../components/CustomButton";

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
          <Text className="text-xl mb-4">{tips.goal}</Text>
          {tips.tips?.map((item, index) => (
            <Text className="text-lg" key={index}>
              {`${index + 1}. ${item}`}
            </Text>
          ))}
        </View>
      </ScrollView>
      <View className="position bottom-2 ml-auto w-3/5 pt-6">
        <CustomButton
          title="Continue next tips"
          color={"#d9ab3c"}
          disabled={isSaving}
          onPress={nodisplayAnymore}
        />
      </View>
    </Popup>
  );
};

export default TipsPopup;
