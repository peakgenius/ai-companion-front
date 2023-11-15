import React, { useState, useContext, useEffect } from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import axios from "axios";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { AuthContext } from "../../contexts/user";
import Popup from "../../components/Popup";
import CustomButton from "../../components/CustomButton";
import { getUrl } from "../../util/asyncStorage";
import InputNumber from "../../components/InputNumber";
import Footer from "./Footer";
import UserInfo from "./UserInfo";
import TipsPopup from "./TipsPopup";

const Profile = () => {
  const { user, getUser, authToken, dayToGetTips, setDayToGetTips } =
    useContext(AuthContext);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleConfirmPopup, setVisibleConfirmPopup] = useState(false);
  const [visibleProgressPopup, setVisibleProgressPopup] = useState(false);
  const [visibleSettingQuestion, setVisibleSettingQuestion] = useState(false);
  const [visibleTipsPopup, setVisibleTipsPopup] = useState(false);
  const [visibleSettingTip, setVisibleSettingTip] = useState(false);
  const [goalId, setGoalId] = useState("1");
  const [progress, setProgress] = useState(0);
  const [questionDisplayInterval, setQuestionDisplayInterval] = useState(0);
  const [tipDisplayInterval, setTipDisplayInterval] = useState(0);
  const [goals, setGoals] = useState([]);
  const [tips, setTips] = useState({});

  useEffect(() => {
    if (!authToken) return;
    setQuestionDisplayInterval(user.question_display_interval);
    setTipDisplayInterval(user.tip_display_interval);
    getGoals();
    const now = new Date();
    if (dayToGetTips === now.getDate()) return; //to call getTips funtion once per day
    getTips();
  }, [authToken, user.question_display_interval, user.tip_display_interval]);

  const getGoals = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(getUrl() + "/profile/goal", {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      setGoals(res.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
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
    setGoalId(id);
    setVisibleConfirmPopup(true);
  };

  const closeConfimrPopup = () => {
    setVisibleConfirmPopup(false);
  };

  const openTipsPopup = () => {
    setVisibleTipsPopup(true);
  };

  const closeTipsPopup = () => {
    setVisibleTipsPopup(false);
  };

  const openProgressPopup = (id) => {
    setGoalId(id);
    const goalsLength = goals.length;
    for (let i = 0; i < goalsLength; i++) {
      if (goals[i]._id === id) {
        setProgress(goals[i].progress);
        break;
      }
    }
    setVisibleProgressPopup(true);
  };
  const closeProgressPopup = () => {
    setVisibleProgressPopup(false);
  };

  const nodisplayAnymore = async () => {
    setIsSaving(true);
    const now = new Date();
    setDayToGetTips(now.getDate());
    closeTipsPopup();
    try {
      await axios.patch(
        `${getUrl()}/profile/tips-date`,
        {},
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      closeTipsPopup();
    } catch (err) {
      console.log(err);
    }
    setIsSaving(false);
  };

  const getTips = async () => {
    setIsLoading(true);
    try {
      const resTips = await axios.get(`${getUrl()}/profile/tips`, {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      const resTipsData = resTips.data;
      setTips(resTipsData);
      if (!resTipsData.message) {
        openTipsPopup();
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const setQuestionInterval = async (value) => {
    setQuestionDisplayInterval(value);
    axios
      .post(
        getUrl() + "/profile/set-question-interval",
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
        getUrl() + "/profile/set-tip-interval",
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

  const saveGoalProgress = async () => {
    setIsSaving(true);
    if (progress > 10 || progress < 0) return;
    try {
      await axios.post(
        `${getUrl()}/profile/goal-progress`,
        { goalId, progress },
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      closeProgressPopup();
    } catch (err) {
      console.log(err);
    }
    setIsSaving(false);
  };

  const deleteGoal = async () => {
    setIsSaving(true);
    try {
      await axios.delete(`${getUrl()}/profile/goal?id=${goalId}`, {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });

      getGoals();
      closeConfimrPopup();
    } catch (err) {
      console.log(err);
    }
    setIsSaving(false);
  };

  return (
    <View className="flex-1">
      <ScrollView className="bg-neutral-900 ">
        <UserInfo user={user} isLoading={isLoading} />
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
                className="absolute top-3 right-0"
                onPress={(e) => openProgressPopup(item._id)}
              >
                <FontAwesome name="pencil" size={15} color={"#fff"} />
              </Pressable>
              <Pressable
                className="absolute bottom-3 right-0"
                onPress={(e) => openConfimrPopup(item._id)}
              >
                <FontAwesome name="trash" size={15} color={"#fff"} />
              </Pressable>
            </View>
          ))}
        </View>

        <Popup
          visible={visibleConfirmPopup}
          dismiss={closeConfimrPopup}
          viewContainerClassName={
            "bg-white border-gray-950 h-[200] pt-5 pl-5 pr-5 rounded-lg"
          }
        >
          <View>
            <Text className="text-2xl mb-8">Are you sure to delete?</Text>
            <View className="flex-row justify-center gap-3">
              <View>
                <CustomButton
                  title={isSaving ? "Deleting..." : "Delete"}
                  disabled={isSaving}
                  color={"red"}
                  onPress={deleteGoal}
                />
              </View>
              <View>
                <CustomButton
                  color={"grey"}
                  title={"Cancel"}
                  onPress={closeConfimrPopup}
                />
              </View>
            </View>
          </View>
        </Popup>
        <Popup
          visible={visibleProgressPopup}
          dismiss={closeProgressPopup}
          viewContainerClassName={
            "bg-white border-gray-950 h-[310] pt-5 pl-5 pr-5 rounded-lg"
          }
        >
          <View>
            <Text className="text-2xl mb-8 text-center">
              Which level of this goal are you in 1-10?
            </Text>
            <View className="flex-row justify-center">
              <InputNumber
                separatorWidth={0}
                minValue={0}
                maxValue={10}
                totalWidth={250}
                value={progress}
                textColor="#000"
                containerStyle={{ border: "none" }}
                onChange={(value) => {
                  setProgress(value);
                }}
              />
            </View>
            <View className="flex-row justify-center gap-3 mt-3">
              <View>
                <CustomButton
                  color={"#d9ab3c"}
                  title={isSaving ? "Saving..." : "Save"}
                  disabled={isSaving}
                  onPress={saveGoalProgress}
                />
              </View>
              <View>
                <CustomButton
                  color={"grey"}
                  title={"Cancel"}
                  onPress={closeProgressPopup}
                />
              </View>
            </View>
          </View>
        </Popup>
        <TipsPopup
          visibleTipsPopup={visibleTipsPopup}
          tips={tips}
          isSaving={isSaving}
          nodisplayAnymore={nodisplayAnymore}
          closeTipsPopup={closeTipsPopup}
        />
      </ScrollView>
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
        isLoading={isLoading}
      />
    </View>
  );
};

export default Profile;
