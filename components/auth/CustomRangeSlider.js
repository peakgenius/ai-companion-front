import React from "react";
import { View, Text, Dimensions } from "react-native";
import RangeSlider from "../RangeSlider";

const CustomRangeSlider = (props) => {
  const { label, text, onValueChanged, min, max, step, value } = props;
  const windowWidth = Dimensions.get("window").width;
  return (
    <View className="mb-1">
      <View className="flex-row justify-between mb-2">
        <Text className="text-black text-lg font-bold">{label}</Text>
        <Text className="text-black mr-6">{text}</Text>
      </View>
      <RangeSlider
        onValueChanged={onValueChanged}
        min={min}
        max={max}
        step={step}
        value={value}
        width={Math.floor(windowWidth) - 50}
      />
    </View>
  );
};

export default CustomRangeSlider;
