import React from "react";
import { Text, View, Image } from "react-native";

import Popup from "./Popup";

const WarningPopup = (props) => {
  const { visibleWarningPopup, closeWarningPopup, text } = props;

  return (
    <Popup
      visible={visibleWarningPopup}
      dismiss={closeWarningPopup}
      viewContainerClassName={
        "border-gray-950 h-[220] w-[300px] pt-5 pl-5 pr-5 rounded-3xl"
      }
    >
      <View className=" flex-row justify-center mb-3">
        <Image
          resizeMode="cover"
          source={require("../assets/warning-64.png")}
        />
      </View>
      <Text className="text-black text-xl text-center">
        {text}
      </Text>
    </Popup>
  );
};

export default WarningPopup;
