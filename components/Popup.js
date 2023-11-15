import Modal from "react-native-modal";
import { View, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function Popup({
  children,
  visible,
  viewContainerClassName,
  dismiss,
  ...rest
}) {
  return (
    <Modal isVisible={visible}>
      <View className={viewContainerClassName}>
        <View className="ml-auto mb-3">
          <Pressable onPress={dismiss}>
            <FontAwesome name="close" size={22} color="black" />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}
