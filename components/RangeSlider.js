import React from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import colors from "../styles/colors";

const RangeSlider = (props) => {
  const { onValueChanged, min, max, step, value, width } = props;
  return (
    <MultiSlider
      values={[value]}
      sliderLength={width}
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
  );
};

export default RangeSlider;
