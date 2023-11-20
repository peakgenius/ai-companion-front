import NumericInput from "react-native-numeric-input";
import { NativeWindStyleSheet } from "nativewind";

import colors from "../styles/colors";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const InputNumber = (props) => {
  const { value, onChange, inputWidth, totalWidth, ...rest } = props;

  return (
    <NumericInput
      value={value}
      onChange={onChange}
      inputStyle={{ width: inputWidth + "px" }}
      totalWidth={totalWidth}
      totalHeight={40}
      iconSize={25}
      step={1.5}
      valueType="real"
      rounded
      textColor="white"
      iconStyle={{ color: "white" }}
      rightButtonBackgroundColor={colors.buttonColor}
      leftButtonBackgroundColor={colors.buttonColor}
      {...rest}
    />
  );
};

export default InputNumber;
