import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAuthToken = () => {
  return AsyncStorage.getItem("auth-token");
};
