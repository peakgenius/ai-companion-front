import { Text, View } from "react-native";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const OrderedList = (props) => {
  const { number, item, ...rest } = props;

  return (
    <View className="flex-row mb-3">
      <Text className="w-5 text-black text-[16px] leading-5">{number}. </Text>
      <Text className="flex-1 text-black text-[16px] leading-5">{item}</Text>
    </View>
  );
};

export default OrderedList;
