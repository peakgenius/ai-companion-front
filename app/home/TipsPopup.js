import React from "react";
import { View, ScrollView, Text, Pressable, StyleSheet } from "react-native";
import TypingText from "react-native-typing-text";

import Popup from "../components/Popup";
import CustomButton from "../components/CustomButton";

const TipsPopup = (props) => {
  const { visibleTipsPopup, closeTipsPopup, tips } = props;

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
          <Text className="text-xl mb-4">
            asdfasd fsdfas dfasd asdf asdfasdf asdfasd fsdfas dfasd asdf asdfasd
            fsdfas dfasd asdfasd fsdfas dfasd asdfasd fsdfas dfasd
          </Text>
          <Text className="text-lg">
            asdfasd fsdfas dfasd asdf asdfasdf asdfasd fsdfas dfasd asdf asdfasd
            fsdfas dfasd asdfasd fsdfas dfasd asdfasd fsdfas dfasd asdf asdfasdf
            asdfas dfasdfasd asdfasdf sdasdf asdf asdf asdf asdf
            asdfwerqwetrasdffasdfasdfasdfasdfsadfsadfasdfasdfasdfasdfasdfa
            sdfasdfa asdf asdfasdf asdfas dfasdfasd asdfasdf sdasdf asdf asdf
            asdfasd fsdfas dfasd asdf asdfasdf asdfasd fsdfas dfasd asdf asdfasd
            fsdfas dfasd asdfasd fsdfas dfasd asdfasd fsdfas dfasd asdf asdfasdf
            asdfas dfasdfasd asdfasdf sdasdf asdf asdf asdf asdf
            asdfwerqwetrasdffasdfasdfasdfasdfsadfsadfasdfasdfasdfasdfasdfa
            sdfasdfa asdf asdfasdf asdfas dfasdfasd asdfasdf sdasdf asdf asdf
          </Text>
        </View>
      </ScrollView>
      <View className="position bottom-2 ml-auto w-2/5 pt-6">
        <CustomButton
          title="close"
          color={"#d9ab3c"}
          onPress={closeTipsPopup}
        />
      </View>
    </Popup>
  );
};

export default TipsPopup;
