import React, { useContext, useRef, useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import axios from "axios";
import { router } from "expo-router";
import Toggle from "react-native-toggle-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Input from "../../components/Input";
import colors from "../../styles/colors";
import { getUrl } from "../../util";
import { AuthContext } from "../../contexts/user";
import AiMessage from "../../components/chat/AiMessage";
import UserMessage from "../../components/chat/UserMessage";

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
        userMessage: messageRow[0].user_message.trim(),
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
    <KeyboardAwareScrollView>
      <SafeAreaView className={Platform.OS === "ios" ? "h-screen" : "h-full"}>
        <View className="flex-1 pt-7 pl-4 pr-4" style={colors.mainBackground}>
          <Pressable className="mb-1" onPress={goToHome}>
            <Image
              resizeMode="contain"
              className="w-[40px] h-[40px]"
              source={require("../../assets/back-43.png")}
            />
          </Pressable>
          <View className="flex-row items-end mb-4 ml-4">
            <Toggle
              size={12}
              color={"#efeeee"}
              circleColor={"black"}
              filled
              toggle={isChecked}
              setToggle={() => setIsChecked(!isChecked)}
            />
            <Text className="text-[16px] text-black mt-1 ml-2">
              Remember Information
            </Text>
          </View>
          {!isLoading && (
            <ScrollView
              className="pr-4 flex-1 h-[320]"
              style={{ height: 350 }}
              ref={chatScrollViewRef}
            >
              <AiMessage message={"Hello. How can I assist you?"} />
              {messages.map((item, index) => (
                <View key={index}>
                  <UserMessage message={item.user_message} />
                  {item.ai_message && <AiMessage message={item.ai_message} />}
                </View>
              ))}
            </ScrollView>
          )}
          <View className="pt-2 flex-row items-center mb-3">
            <Input
              tailwindClass={`pl-4 rounded-[20px] w-10/12 ${
                Platform.OS === "ios" ? "h-[60px]" : ""
              }`}
              multiline={true}
              numberOfLines={4}
              defaultValue={userMessage}
              placeholder={"Type here..."}
              value={userMessage}
              setText={(value) => {
                setUserMessage(value.trim());
              }}
            />
            <Pressable onPress={saveChat} disabled={isSaving}>
              <View
                className="flex items-center justify-center w-14 rounded-full h-14 ml-2"
                style={{ backgroundColor: colors.buttonColor }}
              >
                <Image
                  resizeMode="cover"
                  source={require("../../assets/send-28.png")}
                />
              </View>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default ChatPopup;
