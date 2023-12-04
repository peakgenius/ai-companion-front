import React, { useCallback, useRef } from "react";
import RangeSlider from "rn-range-slider";
import { View, Text } from "react-native";

import Thumb from "./range-slider/Thumb";
import Rail from "./range-slider/Rail";
import RailSelected from "./range-slider/RailSelected";

const CustomRangeSlider = (props) => {
  const { label, text, onValueChanged, min, max, value } = props;
  const rangeSlider = useRef();
  console.log("value", rangeSlider.current);
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);

  return (
    <View className="pb-2 mb-2">
      <View className="flex-row justify-between mb-2">
        <Text className="text-black text-lg font-bold">{label}</Text>
        <Text className="text-black mr-6">{text}</Text>
      </View>
      <RangeSlider
        ref={rangeSlider}
        min={min}
        max={max}
        step={1}
        // floatingLabel={false}
        disableRange={true}
        low={50}
        high={90}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        // allowLabelOverflow={false}
        onValueChanged={onValueChanged}
      />
    </View>
  );
};

export default CustomRangeSlider;
