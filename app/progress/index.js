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
      <Link href="/" className="m-4">
        <Ionicons name="arrow-back" size={32} color="white" />
      </Link>
      <View className="relative flex items-center" style={{ padding: "35%" }}>
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
      <View className="absolute bottom-0 w-full">
        <Text className="text-2xl text-white text-center mb-2">Goals</Text>
        <View className="flex flex-row p-3 justify-around w-full bg-gray-900">
          <CircularProgress
            key={1}
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
          <CircularProgress
            key={2}
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
          <CircularProgress
            key={3}
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
        </View>
      </View>
    </View>
  );
};

export default ProgressRings;
