import {
  Text,
  View,
  Dimensions,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { CircularProgress } from "react-native-circular-progress";
import axios from "axios";

import colors from "../../styles/colors";
import Popup from "../Popup";
import InputNumber from "../InputNumber";
import CustomButton from "../CustomButton";
import RangeSlider from "../RangeSlider";
import { getUrl } from "../../util";
import { AuthContext } from "../../contexts/user";
//Tailwind CSS
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});

const ProgressRings = (props) => {
  const { user, goalProgresses, isLoading, getGoalProgress } = props;
  const goalColors = ["#BF8639", "#9BD420", "#D05253"];
  const { health, income, happiness, family, romantic } = user;
  const [total, setTotal] = useState(0);
  const [visibleProgressPopup, setVisibleProgressPopup] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState({
    goalId: "",
    title: "",
    content: "",
    isDomain: false,
    number: 0,
  });
  const { authToken, getUser } = useContext(AuthContext);

  useEffect(() => {
    setTotal(
      (health * 1 + income * 1 + happiness * 1 + family * 1 + romantic * 1) / 5
    );
  }, [health, income, happiness, family, romantic]);

  const openProgressPopup = (goalId, title, content, number, isDomain) => {
    setProgress({ goalId, title, content, number, isDomain });
    setVisibleProgressPopup(true);
  };

  const closeProgressPopup = () => {
    setVisibleProgressPopup(false);
  };

  const saveProgress = async () => {
    setIsSaving(true);
    if (progress.isDomain) {
      try {
        await axios.post(
          `${getUrl()}/profile/domain-progress`,
          { domain: progress.title.toLowerCase(), progress: progress.number },
          {
            headers: {
              Authorization: `${authToken}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        closeProgressPopup();
        getUser();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.post(
          `${getUrl()}/profile/goal-progress`,
          { goalId: progress.goalId, progress: progress.number },
          {
            headers: {
              Authorization: `${authToken}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        getGoalProgress();
        closeProgressPopup();
      } catch (err) {
        console.log(err);
      }
    }
    setIsSaving(false);
  };

  const [screenWidth] = useState(Dimensions.get("window").width);

  const totalText = () => {
    return (
      <Text className="text-black font-bold  text-[23px]">{total * 10}</Text>
    );
  };

  const healthText = () => {
    return (
      <Text className="text-black font-bold  text-[19px]">
        {Math.ceil(health * 10)}
      </Text>
    );
  };

  const incomeText = () => {
    return (
      <Text className="text-black font-bold text-[19px]">
        {Math.ceil(income * 10)}
      </Text>
    );
  };
  const happinessText = () => {
    return (
      <Text className="text-black font-bold text-[19px]">
        {Math.ceil(happiness * 10)}
      </Text>
    );
  };
  const familyText = () => {
    return (
      <Text className="text-black font-bold text-[19px]">
        {Math.ceil(family * 10)}
      </Text>
    );
  };
  const romanticText = () => {
    return (
      <Text className="text-black font-bold text-[19px]">
        {Math.ceil(romantic * 10)}
      </Text>
    );
  };

  return (
    <View>
      <View>
        <View className="flex items-center">
          <View
            style={{
              ...styles.shadowProp,
              width: Math.ceil(screenWidth * 0.6 + 40),
              height: Math.ceil(screenWidth * 0.6 + 40),
            }}
          >
            <View
              style={{
                ...styles.shadowContainer,
                width: Math.ceil(screenWidth * 0.6),
                height: Math.ceil(screenWidth * 0.6),
              }}
              className="flex justify-center items-center"
            >
              <CircularProgress
                children={totalText}
                childrenContainerStyle={{}}
                rotation={0}
                size={screenWidth * 0.4}
                width={36}
                backgroundWidth={36}
                fill={total * 10}
                tintColor={colors.buttonColor}
                backgroundColor={colors.progressCircleBackgroundColor}
              />
            </View>
          </View>
          <Text className="text-black font-bold text-lg">Life</Text>
        </View>

        <View className="flex-row justify-around mb-5">
          <Pressable
            className="items-center"
            onPress={() =>
              openProgressPopup(
                "nogoal",
                "Health",
                "How healthy are you at this current time?",
                health,
                true
              )
            }
          >
            <CircularProgress
              children={healthText}
              childrenContainerStyle={{}}
              rotation={0}
              size={screenWidth * 0.3}
              width={27}
              backgroundWidth={27}
              fill={health * 10}
              tintColor="#BF8639"
              backgroundColor={colors.progressCircleBackgroundColor}
            />
            <Text className="text-black mt-2 text-[19px]">Health</Text>
          </Pressable>
          <Pressable
            className="items-center"
            onPress={() =>
              openProgressPopup(
                "nogoal",
                "Income",
                "How satisfied are you with your current income?",
                income,
                true
              )
            }
          >
            <CircularProgress
              children={incomeText}
              childrenContainerStyle={{}}
              rotation={0}
              size={screenWidth * 0.3}
              width={27}
              backgroundWidth={27}
              fill={income * 10}
              tintColor="#D9AB3C"
              backgroundColor={colors.progressCircleBackgroundColor}
            />
            <Text className="text-black text-center text-[19px] mt-3">
              Income
            </Text>
          </Pressable>
        </View>
        {/* bottom-left progress ring */}
        <View className="flex-row justify-around mb-5">
          <Pressable
            className="items-center"
            onPress={() =>
              openProgressPopup(
                "nogoal",
                "Happiness",
                "How would you rank your overall happiness right now?",
                happiness,
                true
              )
            }
          >
            <CircularProgress
              children={happinessText}
              childrenContainerStyle={{}}
              rotation={0}
              size={screenWidth * 0.3}
              width={27}
              backgroundWidth={27}
              fill={happiness * 10}
              tintColor="#FD1B1D"
              backgroundColor={colors.progressCircleBackgroundColor}
            />
            <Text className="text-black text-center text-[19px] mt-3">
              Happiness
            </Text>
          </Pressable>
          <Pressable
            className="items-center"
            onPress={() =>
              openProgressPopup(
                "nogoal",
                "Romantic/Partner",
                "How satisfied are you with your current romantic life?",
                romantic,
                true
              )
            }
          >
            <CircularProgress
              children={romanticText}
              childrenContainerStyle={{}}
              rotation={0}
              size={screenWidth * 0.3}
              width={27}
              backgroundWidth={27}
              fill={romantic * 10}
              tintColor="#9BD420"
              backgroundColor={colors.progressCircleBackgroundColor}
            />
            <Text className="text-black text-center text-[19px] mt-3">
              Romantic
            </Text>
          </Pressable>
        </View>
        <View className="flex justify-center mb-5">
          <Pressable
            className="items-center"
            onPress={() =>
              openProgressPopup(
                "nogoal",
                "Family",
                "How would you rank your overall immediate family life?",
                family,
                true
              )
            }
          >
            <CircularProgress
              children={familyText}
              childrenContainerStyle={{}}
              rotation={0}
              size={screenWidth * 0.3}
              width={27}
              backgroundWidth={27}
              fill={family * 10}
              tintColor="#D05253"
              backgroundColor={colors.progressCircleBackgroundColor}
            />
            <Text className="text-black text-center text-[19px] mt-3">
              Family
            </Text>
          </Pressable>
        </View>
        {/* top-right progress ring */}
      </View>
      {goalProgresses.length !== 0 && (
        <Text className="text-black text-2xl font-bold text-center">Goals</Text>
      )}
      <View className="flex-row p-4 justify-around">
        {goalProgresses.length === 0 && !isLoading && (
          <View className="rounded-lg bg-slate-100 w-full p-3 flex-row">
            <View className="bg-black p-4 rounded-full">
              <Image source={require("../../assets/target.png")} />
            </View>
            <View className="ml-3">
              <Text className="text-black text-xl font-bold mb-3">Goals</Text>
              <Text className="text-black text-sm">No goals to be shown</Text>
            </View>
          </View>
        )}
        {goalProgresses.map((item, index) => (
          <Pressable
            key={index}
            onPress={() =>
              openProgressPopup(
                item._id,
                "Goal",
                item.content,
                item.progress,
                false
              )
            }
          >
            <View className="flex-col items-center">
              <CircularProgress
                children={() => {
                  return (
                    <Text className="text-black font-bold">
                      {item.progress * 10}
                    </Text>
                  );
                }}
                childrenContainerStyle={{}}
                rotation={0}
                size={screenWidth * 0.2}
                width={18}
                backgroundWidth={18}
                fill={item.progress * 10}
                tintColor={goalColors[index]}
                backgroundColor={colors.progressCircleBackgroundColor}
              />
              <Text className="text-black mt-3 w-27 text-[16px]">
                {item.content.slice(0, 9)}...
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <Popup
        visible={visibleProgressPopup}
        dismiss={closeProgressPopup}
        viewContainerClassName={
          "bg-white border-gray-950 h-[300] pt-5 pl-5 pr-5 rounded-3xl relative"
        }
      >
        <Text
          className="text-center text-xl mb-3"
          style={{ color: colors.buttonColor }}
        >
          {progress.title}
        </Text>
        <Text className="text-center text-black text-[14] mb-3">
          {progress.content}
        </Text>
        <View>
          <Text className="text-center">{progress.number}</Text>
          <RangeSlider
            onValueChanged={(value) => {
              setProgress((prev) => ({ ...prev, number: value[0] }));
            }}
            min={1}
            max={10}
            step={1}
            value={progress.number}
            width={220}
          />
        </View>
        <View className="flex-row justify-center gap-3">
          <View>
            <CustomButton
              color={colors.buttonColor}
              title={isSaving ? "Saving..." : "Save"}
              disabled={isSaving}
              onPress={saveProgress}
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
      </Popup>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    borderRadius: 9999,
    backgroundColor: "transparent",
    shadowColor: "#9d898978",
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 17,
  },
  shadowContainer: {
    backgroundColor: "#fff",
    borderRadius: 9999,
    overflow: "hidden",
    padding: 30,
  },
});

export default ProgressRings;
