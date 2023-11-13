import { Text, View, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import {
  AnimatedCircularProgress,
  CircularProgress,
} from "react-native-circular-progress";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// console.error = () => {}
const ProgressRings = (props) => {
  const { progresses } = props;
  const [fill, setFill] = useState(60);
  const [screenWidth] = useState(Dimensions.get("window").width);

  const totalText = () => {
    return (
      <Text className="text-white">
        {(progresses.health +
          progresses.income +
          progresses.happiness +
          progresses.family +
          progresses.romantic) /
          5}
      </Text>
    );
  };

  const healthText = () => {
    return <Text className="text-white">{progresses.health}</Text>;
  };

  const incomeText = () => {
    return <Text className="text-white">{progresses.income}</Text>;
  };
  const happinessText = () => {
    return <Text className="text-white">{progresses.happiness}</Text>;
  };
  const familyText = () => {
    return <Text className="text-white">{progresses.family}</Text>;
  };
  const romanticText = () => {
    return <Text className="text-white">{progresses.romantic}</Text>;
  };

  return (
    <View className="flex-1 bg-neutral-900">
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
            fill={progresses.health}
            tintColor="#bf873d"
            backgroundColor="#3d5875"
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
            fill={progresses.income}
            tintColor="#d9ab3c"
            backgroundColor="#3d5875"
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
            fill={fill}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
          />
        </View>
        <Text className="text-white text-center mt-7 text-lg">Total</Text>
        {/* bottom-left progress ring */}
        <View className="absolute bottom-0 left-12">
          <CircularProgress
            children={happinessText}
            childrenContainerStyle={{}}
            linecap="round"
            rotation={0}
            size={screenWidth * 0.2}
            width={19}
            lineCap="round"
            backgroundWidth={20}
            fill={progresses.happiness}
            tintColor="#d9ab3c"
            backgroundColor="#3d5875"
          />
          <Text className="text-white text-center mt-3">Happiness</Text>
        </View>
        {/* bottom-right progress ring */}
        <View className="absolute bottom-0 right-12">
          <CircularProgress
            children={familyText}
            childrenContainerStyle={{}}
            linecap="round"
            rotation={0}
            size={screenWidth * 0.2}
            width={19}
            lineCap="round"
            backgroundWidth={20}
            fill={progresses.family}
            tintColor="#d05253"
            backgroundColor="#3d5875"
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
            fill={progresses.romantic}
            tintColor="#ff1b1d"
            backgroundColor="#3d5875"
          />
          <Text className="text-white text-center mt-3">Romantic</Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressRings;
