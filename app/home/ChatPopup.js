import React from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Feather } from "@expo/vector-icons";

import Popup from "../../components/Popup";
import Input from "../../components/Input";

const ChatPopup = (props) => {
  const {
    messages,
    visible,
    closePopup,
    userMessage,
    setUserMessage,
    saveChat,
    isSaving,
    isLoading,
    chatScrollViewRef,
  } = props;
  return (
    <Popup
      visible={visible}
      dismiss={closePopup}
      viewContainerClassName={
        "bg-white border-gray-950 h-[570] pt-5 pl-5 pr-5 rounded-md relative"
      }
    >
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
            <Text className="bg-slate-300 p-2 inline-block rounded-r-md rounded-bl-lg">
              Hello. How can I assist you?
            </Text>
          </View>
          {messages.map((item, index) => (
            <View key={index}>
              <View className="flex-row mb-3">
                <Text className="ml-auto flex-1 bg-slate-300 inline-block rounded-l-md rounded-br-lg whitespace-nowrap mr-3 p-2">
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
                  <Text className="bg-slate-300 flex-1 p-2 rounded-r-md rounded-bl-lg mr-auto inline-block whitespace-nowrap">
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
          setText={(value) => {
            setUserMessage(value);
          }}
        />
        <Pressable onPress={saveChat} disabled={isSaving}>
          <View
            className="flex items-center justify-center w-11 rounded-full h-12 ml-3"
            style={styles.buttonColor}
          >
            {isSaving ? (
              <Feather
                name="loader"
                size={18}
                color="white"
                style={styles.textAlignCenter}
              />
            ) : (
              <FontAwesome
                name="send-o"
                size={18}
                color="white"
                style={styles.textAlignCenter}
              />
            )}
          </View>
        </Pressable>
      </View>
    </Popup>
  );
};

const styles = StyleSheet.create({
  buttonColor: {
    backgroundColor: "#d9ab3c",
  },
  textAlignCenter: {
    textAlign: "center",
  },
});

export default ChatPopup;
