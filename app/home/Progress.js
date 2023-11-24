import { Text, View, Dimensions, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { CircularProgress } from "react-native-circular-progress";

import colors from "../../styles/colors";
import Popup from "../../components/Popup";

const ProgressRings = (props) => {
  const goalColors = ["#bf873d", "#d05253", "#ff1b1d"];
  const { user, progresses, isLoading } = props;
  const { health, income, happiness, family, romantic } = user;
  const [total, setTotal] = useState(0);
  const [visibleGoalPopup, setVisibleGoalPopup] = useState(false);
  const [goal, setGoal] = useState("");

  useEffect(() => {
    setTotal(
      (health * 1 + income * 1 + happiness * 1 + family * 1 + romantic * 1) / 5
    );
  }, [health, income, happiness, family, romantic]);

  const openGoalPopup = (content) => {
    setGoal(content);
    setVisibleGoalPopup(true);
  };

  const closeGoalPopup = () => {
    setVisibleGoalPopup(false);
  };

  const [screenWidth] = useState(Dimensions.get("window").width);

  const totalText = () => {
    return <Text className="text-white">{total * 10}</Text>;
  };

  const healthText = () => {
    return <Text className="text-white">{Math.ceil(health * 10)}</Text>;
  };

  const incomeText = () => {
    return <Text className="text-white">{Math.ceil(income * 10)}</Text>;
  };
  const happinessText = () => {
    return <Text className="text-white">{Math.ceil(happiness * 10)}</Text>;
  };
  const familyText = () => {
    return <Text className="text-white">{Math.ceil(family * 10)}</Text>;
  };
  const romanticText = () => {
    return <Text className="text-white">{Math.ceil(romantic * 10)}</Text>;
  };

  return (
    <View className="flex-1" style={colors.mainBackground}>
      <View className="relative flex items-center" style={{ padding: "35%" }}>
        {/* top progressring */}
        <View className="absolute top-4 items-center">
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
        </View>
        {/* top-left prgress ring */}
        <View className="absolute bottom-full left-4">
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
        <Text className="text-white text-center mt-7 text-lg">Total</Text>
        {/* bottom-left progress ring */}
        <View className="absolute bottom-3 left-12">
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
        </View>
        {/* bottom-right progress ring */}
        <View className="absolute bottom-3 right-12">
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
        </View>
        {/* top-right progress ring */}
        <View className="absolute bottom-full right-4">
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
        </View>
      </View>
      <Text className="text-white text-2xl text-center"> Goals</Text>
      <View className="flex-row p-4 justify-around">
        {progresses.length === 0 && !isLoading && (
          <Text className="text-white text-lg">No goals to be shown</Text>
        )}
        {progresses.map((item, index) => (
          <Pressable key={index} onPress={() => openGoalPopup(item.content)}>
            <View className="flex-col items-center">
              <CircularProgress
                children={() => {
                  return (
                    <Text className="text-white">{item.progress * 10}</Text>
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
        visible={visibleGoalPopup}
        dismiss={closeGoalPopup}
        viewContainerClassName={
          "bg-white border-gray-950 h-[200] pt-5 pl-5 pr-5 rounded-md relative"
        }
      >
        <Text
          className="text-center text-3xl mb-3"
          style={{ color: colors.buttonColor }}
        >
          Goal
        </Text>
        <Text className="text-center text-white text-xl">{goal}</Text>
      </Popup>
    </View>
  );
};

// const styles = StyleSheet.create({
//   ellipsis: {
//     textOverflow: "ellipsis",
//     overflow: "hidden",
//     whiteSpace: "nowrap",
//   }
// })

export default ProgressRings;
