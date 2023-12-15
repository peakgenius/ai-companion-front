import React from "react";
import { Text, View } from "react-native";

import Popup from "../../components/Popup";
import CustomButton from "../../components/CustomButton";
import RangeSlider from "../RangeSlider";
import colors from "../../styles/colors";

const ProgressEditingPopup = (props) => {
  const {
    visibleProgressPopup,
    closeProgressPopup,
    goalId,
    progress,
    setProgress,
    isSaving,
    saveGoalProgress,
  } = props;

  return (
    <Popup
      visible={visibleProgressPopup}
      dismiss={closeProgressPopup}
      viewContainerClassName={
        "bg-white border-gray-950 h-[320] pt-5 pl-5 pr-5 rounded-3xl"
      }
    >
      <View>
        {!goalId.isDomain && (
          <Text className="text-xl mb-4 text-center text-black">
            How would you rank your progress of this goal between 1-10?
          </Text>
        )}
        {goalId.isDomain && (
          <Text className="text-xl mb-2 text-center text-black">
            {goalId.id === "health" &&
              "How healthy are you at this current time?"}
            {goalId.id === "income" &&
              "How satisfied are you with your current income?"}
            {goalId.id === "romantic" &&
              "How satisfied are you with your current romantic life?"}
            {goalId.id === "family" &&
              "How would you rank your overall immediate family life?"}
            {goalId.id === "happiness" &&
              "How would you rank your overall happiness right now?"}
          </Text>
        )}
        <View>
          <Text className="text-center mb-3 text-lg">{progress}</Text>
          <RangeSlider
            onValueChanged={(value) => setProgress(value[0])}
            min={1}
            max={10}
            step={1}
            value={progress}
            width={220}
          />
        </View>
        <View className="flex-row justify-center gap-3">
          <View>
            <CustomButton
              color={colors.buttonColor}
              title={isSaving ? "Saving..." : "Save"}
              disabled={isSaving}
              onPress={saveGoalProgress}
            />
          </View>
          <View>
            <CustomButton
              color={"grey"}
              title={"Cancel"}
              onPress={closeProgressPopup}
            />
          </View>
        </View>
      </View>
    </Popup>
  );
};

export default ProgressEditingPopup;
