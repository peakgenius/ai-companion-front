import React, { useContext, useRef, useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";

import Input from "../../components/Input";
import colors from "../../styles/colors";
import { getUrl } from "../../util";
import { AuthContext } from "../../contexts/user";

const ChatPopup = (props) => {
  const { authToken } = useContext(AuthContext);

  const chatScrollViewRef = useRef();
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    getMessages();
    setTimeout(() => {
      if (chatScrollViewRef.current) {
        chatScrollViewRef.current.scrollToEnd();
      }
    }, 200);
  };

  const getMessages = async () => {
    setIsLoading(true);
    try {
      const resMessages = await axios.get(getUrl() + "/chat/messages", {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      setMessages(resMessages.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const saveChat = async () => {
    setIsSaving(true);
    const messageRow = [{ user_message: userMessage }];
    setMessages((prev) => {
      return [...prev, ...messageRow];
    });
    setUserMessage("");
    const res = await axios.post(
      `${getUrl()}/chat/message`,
      {
        userMessage: messageRow[0].user_message,
        isTrain: isChecked,
      },
      {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    setIsChecked(false);
    setMessages((prev) => {
      prev[prev.length - 1].ai_message = res.data;
      return prev;
    });
    setIsSaving(false);
    if (chatScrollViewRef.current) {
      chatScrollViewRef.current.scrollToEnd();
    }
  };

  const goToHome = () => {
    router.push("/");
  };

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 pt-7 pl-4 pr-4" style={colors.mainBackground}>
        <Pressable className="mb-12" onPress={goToHome}>
          <Image
            resizeMode="cover"
            source={require("../../assets/left-arrow-24.png")}
          />
        </Pressable>
        <View className="absolute top-14 left-3 flex-row">
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setIsChecked}
          />
          <Text className="text-lg text-white mt-1 ml-2">check to train</Text>
        </View>
        {!isLoading && (
          <ScrollView
            className="pr-4 flex-1 h-[320]"
            style={{ height: 350 }}
            ref={chatScrollViewRef}
          >
            <View className="flex-row mb-3">
              <Image
                source={require("../../assets/chatbot.png")}
                className="w-10 h-10 mr-3"
              ></Image>
              <Text className="text-white p-2 inline-block rounded-r-md rounded-bl-lg">
                Hello. How can I assist you?
              </Text>
            </View>
            {messages.map((item, index) => (
              <View key={index}>
                <View className="flex-row mb-3">
                  <Text className="ml-auto flex-1 inline-block rounded-l-md text-white rounded-br-lg whitespace-nowrap mr-3 p-2">
                    {item.user_message}
                  </Text>
                  <Image
                    source={require("../../assets/female_avatar.png")}
                    className="w-10 h-10"
                  ></Image>
                </View>
                {item.ai_message && (
                  <View className="flex-row mb-3 justify-start">
                    <Image
                      source={require("../../assets/chatbot.png")}
                      className="w-10 h-10 mr-3"
                    ></Image>
                    <Text className="text-white flex-1 p-2 rounded-r-md rounded-bl-lg mr-auto inline-block whitespace-nowrap">
                      {item.ai_message}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        )}
        <View className="pt-2 w-11/12 ml-6 flex-row items-center">
          <Input
            className="flex-1"
            style={{ backgroundColor: "#f1f1f1" }}
            multiline={true}
            numberOfLines={4}
            defaultValue={userMessage}
            value={userMessage}
            setText={(value) => {
              setUserMessage(value);
            }}
          />
          <Pressable onPress={saveChat} disabled={isSaving}>
            <View
              className="flex items-center justify-center w-11 rounded-full h-12 ml-3"
              style={{ backgroundColor: colors.buttonColor }}
            >
              <Image
                resizeMode="cover"
                source={require("../../assets/send-18.png")}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textAlignCenter: {
    textAlign: "center",
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});

export default ChatPopup;
