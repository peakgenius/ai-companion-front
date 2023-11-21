import Modal from "react-native-modal";
import { View, Pressable, Image } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import colors from "../styles/colors";
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
      <View className={viewContainerClassName} style={colors.mainBackground}>
        <View className="ml-auto mb-3">
          <Pressable onPress={dismiss}>
            <Image
              resizeMode="cover"
              source={require("../assets/close-24.png")}
            />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}
