import React from "react";
import { Text, View, Image } from "react-native";

import Popup from "../Popup";

const DeletingWarningPopup = (props) => {
  const { visibleWarningPopup, closeWarningPopup } = props;

  return (
    <Popup
      visible={visibleWarningPopup}
      dismiss={closeWarningPopup}
      viewContainerClassName={
        "border-gray-950 h-[220] pt-5 pl-5 pr-5 rounded-3xl"
      }
    >
      <View className=" flex-row justify-center mb-3">
        <Image
          resizeMode="cover"
          source={require("../../assets/warning-64.png")}
        />
      </View>
      <Text className="text-black text-xl text-center">
        You cannot pin more than 3!
      </Text>
    </Popup>
  );
};

export default DeletingWarningPopup;
