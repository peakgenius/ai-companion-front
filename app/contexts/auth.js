import React, { useState, useEffect } from "react";
import { router, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState("");
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
        if (res === null) {
          if (
            pathname !== "/" &&
            pathname !== "/signup" &&
            pathname !== "/signin"
          )
            router.replace("/");
          return;
        }
        setIsAuthenticated(true);
        setAuthToken(res);
        axios
          .get(`${process.env.EXPO_PUBLIC_BASE_URL}/auth/user?id=${res}`)
          .then((response) => {
            setUser(response.data.user);
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
        setAuthToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
