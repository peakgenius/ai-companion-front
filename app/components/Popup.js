import {
  StyleSheet,
  View,
  Modal,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

export default function Popup({
  children,
  visible,
  transparent,
  dismiss,
  margin,
  marginTop,
  ...rest
}) {
  return (
    <Modal visible={visible} transparent={transparent} onRequestClose={dismiss} style={{borderRadius: 20}} >
      <TouchableWithoutFeedback onPress={dismiss}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <View
        style={{
          ...styles.modalContent,
          margin: margin,
          marginTop: marginTop,
          borderRadius: 20
        }}
        {...rest}
      >
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: "center",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
