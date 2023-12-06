import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";

const Loading = () => {
  const rotateValueHolder = useRef(new Animated.Value(0));

  const startImageRotateFunction = () => {
    rotateValueHolder.current.setValue(0);
    Animated.loop(
      Animated.timing(rotateValueHolder.current, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start(() => startImageRotateFunction());
  };

  const rotateData = rotateValueHolder.current.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    startImageRotateFunction();
  }, []);

  return (
    <View>
      <Animated.Image
        style={{
          width: 46,
          height: 46,
          transform: [{ rotate: rotateData }],
        }}
        source={require("../assets/wait-46.png")}
      />
    </View>
  );
};

export default Loading;
