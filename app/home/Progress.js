import { Text, View, Dimensions, Pressable } from "react-native";
import { useEffect, useState, useContext } from "react";
import { CircularProgress } from "react-native-circular-progress";
import axios from "axios";

import colors from "../../styles/colors";
import Popup from "../../components/Popup";
import InputNumber from "../../components/InputNumber";
import CustomButton from "../../components/CustomButton";
import { getUrl } from "../../util";
import { AuthContext } from "../../contexts/user";

const ProgressRings = (props) => {
  const { user, goalProgresses, isLoading, getGoalProgress } = props;
  const goalColors = ["#bf873d", "#d05253", "#ff1b1d"];
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
    return <Text className="text-black font-bold text-2xl">{total * 10}</Text>;
  };

  const healthText = () => {
    return <Text className="text-black font-bold">{Math.ceil(health * 10)}</Text>;
  };

  const incomeText = () => {
    return <Text className="text-black font-bold">{Math.ceil(income * 10)}</Text>;
  };
  const happinessText = () => {
    return <Text className="text-black font-bold">{Math.ceil(happiness * 10)}</Text>;
  };
  const familyText = () => {
    return <Text className="text-black font-bold">{Math.ceil(family * 10)}</Text>;
  };
  const romanticText = () => {
    return <Text className="text-black font-bold">{Math.ceil(romantic * 10)}</Text>;
  };

  return (
    <View className="flex-1">
      <View className="relative flex items-center" style={{ padding: "35%" }}>
        {/* top progressring */}
        <View className="absolute top-4">
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
              linecap="round"
              rotation={0}
              size={screenWidth * 0.2}
              width={19}
              lineCap="round"
              backgroundWidth={20}
              fill={health * 10}
              tintColor="#bf873d"
              backgroundColor={colors.progressCircleBackgroundColor}
            />
            <Text className="text-white mt-2">Health</Text>
          </Pressable>
        </View>
        {/* top-left prgress ring */}
        <View className="absolute bottom-full left-4">
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
              linecap="round"
              rotation={0}
              size={screenWidth * 0.2}
              width={19}
              lineCap="round"
              backgroundWidth={20}
              fill={income * 10}
              tintColor="#d9ab3c"
              backgroundColor={colors.progressCircleBackgroundColor}
            />
            <Text className="text-white text-center mt-3">Income</Text>
          </Pressable>
        </View>
        {/* center progressring */}
        <View className="relative -bottom-6">
          <CircularProgress
            children={totalText}
            childrenContainerStyle={{}}
            linecap="round"
            rotation={0}
            size={screenWidth * 0.4}
            width={29}
            lineCap="round"
            backgroundWidth={30}
            fill={total * 10}
            tintColor="#00e0ff"
            backgroundColor={colors.progressCircleBackgroundColor}
          />
        </View>
        <Text className="text-white text-center mt-7 text-lg">Life</Text>
        {/* bottom-left progress ring */}
        <View className="absolute bottom-3 left-12">
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
              linecap="round"
              rotation={0}
              size={screenWidth * 0.2}
              width={19}
              lineCap="round"
              backgroundWidth={20}
              fill={happiness * 10}
              tintColor="#d9ab3c"
              backgroundColor={colors.progressCircleBackgroundColor}
            />
            <Text className="text-white text-center mt-3">Happiness</Text>
          </Pressable>
        </View>
        {/* bottom-right progress ring */}
        <View className="absolute bottom-3 right-12">
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
              linecap="round"
              rotation={0}
              size={screenWidth * 0.2}
              width={19}
              lineCap="round"
              backgroundWidth={20}
              fill={family * 10}
              tintColor="#d05253"
              backgroundColor={colors.progressCircleBackgroundColor}
            />
            <Text className="text-white text-center mt-3">Family</Text>
          </Pressable>
        </View>
        {/* top-right progress ring */}
        <View className="absolute bottom-full right-4">
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
              linecap="round"
              rotation={0}
              size={screenWidth * 0.2}
              width={19}
              lineCap="round"
              backgroundWidth={20}
              fill={romantic * 10}
              tintColor="#ff1b1d"
              backgroundColor={colors.progressCircleBackgroundColor}
            />
            <Text className="text-white text-center mt-3">Romantic</Text>
          </Pressable>
        </View>
      </View>
      <Text className="text-white text-2xl text-center"> Goals</Text>
      <View className="flex-row p-4 justify-around">
        {goalProgresses.length === 0 && !isLoading && (
          <Text className="text-white text-lg">No goals to be shown</Text>
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
                    <Text className="text-black font-bold">{item.progress * 10}</Text>
                  );
                }}
                childrenContainerStyle={{}}
                linecap="round"
                rotation={0}
                size={screenWidth * 0.2}
                width={14}
                lineCap="round"
                backgroundWidth={16}
                fill={item.progress * 10}
                tintColor={goalColors[index]}
                backgroundColor={colors.progressCircleBackgroundColor}
              />
              <Text className="text-white mt-3 w-20">
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
          "bg-white border-gray-950 h-[320] pt-5 pl-5 pr-5 rounded-md relative"
        }
      >
        <Text
          className="text-center text-3xl mb-3"
          style={{ color: colors.buttonColor }}
        >
          {progress.title}
        </Text>
        <Text className="text-center text-white text-xl mb-3">
          {progress.content}
        </Text>
        <View className="flex-row justify-center">
          <InputNumber
            separatorWidth={0}
            minValue={0}
            maxValue={10}
            totalWidth={250}
            value={progress.number}
            textColor="white"
            containerStyle={{ border: "none" }}
            onChange={(value) => {
              setProgress((prev) => ({ ...prev, number: value }));
            }}
          />
        </View>
        <View className="flex-row justify-center gap-3 mt-3">
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

export default ProgressRings;
