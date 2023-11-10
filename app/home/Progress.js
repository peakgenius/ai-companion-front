import { Text, View, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import {
  AnimatedCircularProgress,
  CircularProgress,
} from "react-native-circular-progress";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// console.error = () => {}
const ProgressRings = () => {
  const [fill, setFill] = useState(60);
  const [screenWidth] = useState(Dimensions.get("window").width);

  const text = () => {
    return <Text className="text-white">{fill}</Text>;
  };
  return (
    <View className="flex-1 bg-neutral-900">
      <View className="relative flex items-center" style={{ padding: "35%" }}>
        {/* top progressring */}
        <View className="absolute top-4 items-center"> 
          <CircularProgress
            children={text}
            childrenContainerStyle={{}}
            linecap="round"
            rotation={0}
            size={screenWidth * 0.2}
            width={4}
            lineCap="round"
            backgroundWidth={8}
            fill={fill}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
          />
          <Text className="text-white mt-2">health</Text>
        </View>
        {/* top-left prgress ring */}
        <View className="absolute bottom-full left-4">
          <CircularProgress
            children={text}
            childrenContainerStyle={{}}
            linecap="round"
            rotation={0}
            size={screenWidth * 0.2}
            width={4}
            lineCap="round"
            backgroundWidth={8}
            fill={fill}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
          />
          <Text className="text-white text-center mt-3">health</Text>
        </View>
        {/* center progressring */}
        <CircularProgress
          children={text}
          childrenContainerStyle={{}}
          linecap="round"
          rotation={0}
          size={screenWidth * 0.4}
          width={4}
          lineCap="round"
          backgroundWidth={8}
          fill={fill}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
        />
        <Text className="text-white text-center mt-3">health</Text>
        {/* bottom-left progress ring */}
        <View className="absolute bottom-0 left-12">
          <CircularProgress
            children={text}
            childrenContainerStyle={{}}
            linecap="round"
            rotation={0}
            size={screenWidth * 0.2}
            width={4}
            lineCap="round"
            backgroundWidth={8}
            fill={fill}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
          />
          <Text className="text-white text-center mt-3">health</Text>
        </View>
        {/* bottom-right progress ring */}
        <View className="absolute bottom-0 right-12">
          <CircularProgress
            children={text}
            childrenContainerStyle={{}}
            linecap="round"
            rotation={0}
            size={screenWidth * 0.2}
            width={4}
            lineCap="round"
            backgroundWidth={8}
            fill={fill}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
          />
          <Text className="text-white text-center mt-3">health</Text>
        </View>
        {/* top-right progress ring */}
        <View className="absolute bottom-full right-4">
          <CircularProgress
            children={text}
            childrenContainerStyle={{}}
            linecap="round"
            rotation={0}
            size={screenWidth * 0.2}
            width={4}
            lineCap="round"
            backgroundWidth={8}
            fill={fill}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
          />
          <Text className="text-white text-center mt-3">health</Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressRings;
