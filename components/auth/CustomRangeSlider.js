import React from "react";
import { View, Text, Dimensions } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import colors from "../../styles/colors";

const CustomRangeSlider = (props) => {
  const { label, text, onValueChanged, min, max, step, value } = props;
  const windowWidth = Dimensions.get("window").width;
  return (
    <View className="mb-1">
      <View className="flex-row justify-between mb-2">
        <Text className="text-black text-lg font-bold">{label}</Text>
        <Text className="text-black mr-6">{text}</Text>
      </View>
      <MultiSlider
        values={[value]}
        sliderLength={Math.floor(windowWidth) - 50}
        selectedStyle={{
          height: 6,
          backgroundColor: colors.buttonColor,
          borderRadius: 10,
        }}
        unselectedStyle={{ height: 6, borderRadius: 10 }}
        containerStyle={{
          alignSelf: "center",
          marginTop: -10,
        }}
        onValuesChange={onValueChanged}
        markerStyle={{
          ...Platform.select({
            android: {
              height: 30,
              width: 30,
              borderRadius: 50,
              backgroundColor: colors.buttonColor,
            },
          }),
        }}
        min={min}
        max={max}
        step={step}
      />
    </View>
  );
};

export default CustomRangeSlider;
