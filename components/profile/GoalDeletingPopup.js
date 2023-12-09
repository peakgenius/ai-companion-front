import React from "react";
import { Text, View } from "react-native";

import Popup from "../../components/Popup";
import CustomButton from "../../components/CustomButton";

const GoalDeletingPopup = (props) => {
  const { visibleConfirmPopup, closeConfimrPopup, isSaving, deleteGoal } =
    props;
    
  return (
    <Popup
      visible={visibleConfirmPopup}
      dismiss={closeConfimrPopup}
      viewContainerClassName={
        "bg-white border-gray-950 h-[200] pt-5 pl-5 pr-5 rounded-3xl"
      }
    >
      <View>
        <Text className="text-xl mb-8 text-center text-black">
          Are you sure to delete?
        </Text>
        <View className="flex-row justify-center gap-3">
          <View>
            <CustomButton
              title={isSaving ? "Deleting..." : "Delete"}
              disabled={isSaving}
              color={"red"}
              onPress={deleteGoal}
            />
          </View>
          <View>
            <CustomButton
              color={"grey"}
              title={"Cancel"}
              onPress={closeConfimrPopup}
            />
          </View>
        </View>
      </View>
    </Popup>
  );
};

export default GoalDeletingPopup;
