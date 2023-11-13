import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAuthToken = () => {
  return AsyncStorage.getItem("auth-token");
};

export const getUrl = () => {
  return "http://10.0.2.2:5000/api";
}
