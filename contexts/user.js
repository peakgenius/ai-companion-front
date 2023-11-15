import React, { useState, useEffect } from "react";
import { router, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export const AuthContext = React.createContext({});
import { getUrl } from "../util/asyncStorage";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [dayToGetTips, setDayToGetTips] = useState(0);
  const [dayToGetQuestions, setDayToGetQuestions] = useState(0);
  const pathname = usePathname();
  const [user, setUser] = useState({
    name: "",
    avatar: "",
    age: 0,
    userEmail: "",
    height: 0,
    weight: 0,
    gender: 0,
    marial_status: 0,
    question_display_interval: 0,
    tip_display_interval: 0,
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    AsyncStorage.getItem("auth-token")
      .then((res) => {
        const ParsedToken = JSON.parse(res);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (currentTimestamp >= ParsedToken?.expiryTime) {
          AsyncStorage.removeItem("auth-token");
          setDayToGetQuestions(0);
          setDayToGetTips(0);
          router.replace("/");
          return; 
        }
        if (ParsedToken.token === null) {
          if (
            pathname !== "/" &&
            pathname !== "/signup" &&
            pathname !== "/signin"
          )
            router.replace("/");
          return;
        }
        setIsAuthenticated(true);
        setAuthToken(ParsedToken.token);
        axios
          .get(`${getUrl()}/auth/user?token=${ParsedToken.token}`)
          .then((response) => {
            setUser(response.data.user);
            console.log(response.data.user)
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        getUser,
        authToken,
        setAuthToken,
        dayToGetQuestions,
        setDayToGetQuestions,
        dayToGetTips,
        setDayToGetTips,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
