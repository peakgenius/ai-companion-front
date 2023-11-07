import React, { useState, useContext, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import axios from "axios";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { AuthContext } from "../contexts/auth";
import Footer from "./Footer";
import UserInfo from "./UserInfo";
import Popup from "../components/Popup";
import CustomButton from "../components/CustomButton";

const Profile = () => {
  const { user, isAuthenticated, getUser, authToken } = useContext(AuthContext);
  const [visibleConfirmPopup, setVisibleConfirmPopup] = useState(false);
  const [visibleSettingQuestion, setVisibleSettingQuestion] = useState(false);
  const [visibleSettingTip, setVisibleSettingTip] = useState(false);
  const [deletingGoalId, setDeletingGoalId] = useState("1");
  const [questionDisplayInterval, setQuestionDisplayInterval] = useState(
    user.question_display_interval
  );
  const [tipDisplayInterval, setTipDisplayInterval] = useState(
    user.tip_display_interval
  );
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (!authToken) return;
    setQuestionDisplayInterval(user.question_display_interval);
    setTipDisplayInterval(user.tip_display_interval);
    getGoals();
  }, [authToken]);

  const getGoals = () => {
    axios
      .get(process.env.EXPO_PUBLIC_BASE_URL + "/profile/goal", {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setGoals(res.data);
      })
      .catch((err) => {});
  };

  const openPopupSettingQuestion = () => {
    setVisibleSettingQuestion(true);
  };

  const closePopupSettingQuestion = () => {
    setVisibleSettingQuestion(false);
  };

  const openPopupSettingTip = () => {
    setVisibleSettingTip(true);
  };

  const closePopupSettingTip = () => {
    setVisibleSettingTip(false);
  };

  const openConfimrPopup = (id) => {
    setDeletingGoalId(id)
    setVisibleConfirmPopup(true);
  };

  const closeConfimrPopup = () => {
    setVisibleConfirmPopup(false);
  };

  const setQuestionInterval = async (value) => {
    setQuestionDisplayInterval(value);
    axios
      .post(
        process.env.EXPO_PUBLIC_BASE_URL + "/profile/set-question-interval",
        {
          email: user.userEmail,
          questionDisplayInterval: value,
        },
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        getUser();
        closePopupSettingQuestion();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setTipInterval = async (value) => {
    setTipDisplayInterval(value);
    axios
      .post(
        process.env.EXPO_PUBLIC_BASE_URL + "/profile/set-tip-interval",
        {
          email: user.userEmail,
          tipDisplayInterval: value,
        },
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        getUser();
        closePopupSettingTip();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteGoal = () => {
    axios
      .delete(`${process.env.EXPO_PUBLIC_BASE_URL}/profile/goal?id=${deletingGoalId}`, {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        getGoals();
        closeConfimrPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <View className="flex-1 bg-neutral-900 relative">
      <UserInfo user={user} />
      <View className="p-4 pb-20 relative">
        {goals.map((item, index) => (
          <View key={index}>
            <Text className="text-white text-center text-2xl">
              {item.domain_id.content}
            </Text>
            <Text className="text-white text-center text-lg mb-3">
              {item.content}
            </Text>
            <Pressable
              title="Delete"
              className="absolute top-3 right-0"
              onPress={(e) => openConfimrPopup(item._id)}
            >
              <FontAwesome
                name="trash"
                size={15}
                color={"#fff"}
              />
            </Pressable>
          </View>
        ))}
      </View>
      <Footer
        openPopupSettingTip={openPopupSettingTip}
        openPopupSettingQuestion={openPopupSettingQuestion}
        visibleSettingQuestion={visibleSettingQuestion}
        closePopupSettingQuestion={closePopupSettingQuestion}
        questionDisplayInterval={questionDisplayInterval}
        setQuestionInterval={setQuestionInterval}
        visibleSettingTip={visibleSettingTip}
        closePopupSettingTip={closePopupSettingTip}
        tipDisplayInterval={tipDisplayInterval}
        setTipInterval={setTipInterval}
      />
      <Popup
        visible={visibleConfirmPopup}
        transparent={true}
        dismiss={closeConfimrPopup}
        margin={"10%"}
        marginTop={"25%"}
      >
        <View className="bg-white border-gray-950 h-[150] pt-5 pl-5 pr-5 rounded-lg">
          <Text className="text-2xl mb-8">Are you sure to delete?</Text>
          <View className="flex-row justify-center gap-3">
            <View>
              <CustomButton color={"red"} title={"delete"} onPress={deleteGoal}/>
            </View>
            <View>
              <CustomButton color={"grey"} title={"cancel"} onPress={closeConfimrPopup}/>
            </View>
          </View>
        </View>
      </Popup>
    </View>
  );
};

export default Profile;
