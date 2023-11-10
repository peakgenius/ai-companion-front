import NumericInput from "react-native-numeric-input";

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
      rightButtonBackgroundColor="#d9ab3c"
      leftButtonBackgroundColor="#d9ab3c"
      {...rest}
    />
  );
};

export default InputNumber;
