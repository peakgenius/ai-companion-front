import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";

import { AuthContext } from "../../contexts/user";
import Popup from "../../components/Popup";
import CustomButton from "../../components/CustomButton";
import { getUrl } from "../../util";
import Footer from "../../components/profile/Footer";
import UserInfo from "../../components/profile/UserInfo";
import TipsPopup from "../../components/profile/TipsPopup";
import colors from "../../styles/colors";
import Navbar from "../../components/Navbar";
import GoalItem from "../../components/profile/GoalItem";
import RangeSlider from "../../components/RangeSlider";
import NoGoals from "../../components/NoGoals";

const Profile = () => {
  const { user, setUser, getUser, authToken, dayToGetTips, setDayToGetTips } =
    useContext(AuthContext);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleConfirmPopup, setVisibleConfirmPopup] = useState(false);
  const [visibleProgressPopup, setVisibleProgressPopup] = useState(false);
  const [visibleSettingQuestion, setVisibleSettingQuestion] = useState(false);
  const [visibleTipsPopup, setVisibleTipsPopup] = useState(false);
  const [visibleSettingTip, setVisibleSettingTip] = useState(false);
  const [visibleWarningPopup, setVisibleWarningPopup] = useState(false);
  const [goalId, setGoalId] = useState({
    id: "1",
    isDomain: false,
  });
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

  const openConfirmPopup = (id) => {
    setGoalId((prev) => ({ ...prev, id }));
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

  const openWarningPopup = () => {
    setVisibleWarningPopup(true);
  };

  const closeWarningPopup = () => {
    setVisibleWarningPopup(false);
  };

  const openProgressPopup = (id, isDomain) => {
    if (!isDomain) {
      setGoalId({ id, isDomain });
      const goalsLength = goals.length;
      for (let i = 0; i < goalsLength; i++) {
        if (goals[i]._id === id) {
          setProgress(goals[i].progress);
          break;
        }
      }
    } else {
      setGoalId({ id, isDomain });
      setProgress(user[id]);
    }
    setVisibleProgressPopup(true);
  };
  const closeProgressPopup = () => {
    setIsSaving(false);
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

  const pin = async (id, isPin) => {
    let pinCount = user.pin_count;
    if (isPin && pinCount * 1 > 2) {
      openWarningPopup();
      return;
    }
    setIsSaving(true);
    try {
      await axios.post(
        getUrl() + "/profile/pin-goal",
        {
          goalId: id,
          isPin,
        },
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (isPin) {
        setUser((prev) => ({ ...prev, pin_count: pinCount + 1 }));
      } else {
        setUser((prev) => ({ ...prev, pin_count: pinCount - 1 }));
      }
      getGoals();
    } catch (err) {
      console.log(err);
    }
    setIsSaving(false);
  };

  const saveGoalProgress = async () => {
    setIsSaving(true);
    if (progress > 10 || progress < 0) return;
    if (!goalId.isDomain) {
      try {
        await axios.post(
          `${getUrl()}/profile/goal-progress`,
          { goalId: goalId.id, isDomain: goalId.isDomain, progress },
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
    } else {
      try {
        await axios.post(
          `${getUrl()}/profile/domain-progress`,
          { domain: goalId.id, progress },
          {
            headers: {
              Authorization: `${authToken}`,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        closeProgressPopup();
        getUser();
      } catch (err) {
        console.log(err);
      }
    }
    setIsSaving(false);
  };

  const deleteGoal = async () => {
    setIsSaving(true);
    try {
      await axios.delete(`${getUrl()}/profile/goal?id=${goalId.id}`, {
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
    <SafeAreaView className="flex-1 pt-5">
      <View className="pl-6 pr-6">
        <Navbar setIsLoading={setIsLoading} isLoading={isLoading} />
      </View>
      <ScrollView className="bg-white pl-6 pr-6">
        <UserInfo
          user={user}
          isLoading={isLoading}
          openProgressPopup={openProgressPopup}
        />
        <View className="mb-10 relative">
          <Text
            className="text-xl font-bold mb-3"
            style={{ color: colors.buttonColor }}
          >
            Goals
          </Text>
          {goals.length === 0 && <NoGoals />}
          {goals.length !== 0 && (
            <View style={styles.shadowProp}>
              <View style={styles.shadowContainer} className="p-4">
                {goals.map((item, index) => (
                  <GoalItem
                    key={index}
                    pin={pin}
                    item={item}
                    isSaving={isSaving}
                    openProgressPopup={openProgressPopup}
                    openConfirmPopup={openConfirmPopup}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <Popup
        visible={visibleConfirmPopup}
        dismiss={closeConfimrPopup}
        viewContainerClassName={
          "bg-white border-gray-950 h-[200] pt-5 pl-5 pr-5 rounded-3xl"
        }
      >
        <View>
          <Text className="text-xl mb-8 text-center text-black">
            Are you sure to delete?
          </Text>
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
          "bg-white border-gray-950 h-[320] pt-5 pl-5 pr-5 rounded-3xl"
        }
      >
        <View>
          {!goalId.isDomain && (
            <Text className="text-xl mb-8 text-center text-black">
              How would you rank your progress of this goal between 1-10?
            </Text>
          )}
          {goalId.isDomain && (
            <Text className="text-xl mb-2 text-center text-black">
              {goalId.id === "health" &&
                "How healthy are you at this current time?"}
              {goalId.id === "income" &&
                "How satisfied are you with your current income?"}
              {goalId.id === "romantic" &&
                "How satisfied are you with your current romantic life?"}
              {goalId.id === "family" &&
                "How would you rank your overall immediate family life?"}
              {goalId.id === "happiness" &&
                "How would you rank your overall happiness right now?"}
            </Text>
          )}
          <View>
            <Text className="text-center mb-3 text-lg">{progress}</Text>
            <RangeSlider
              onValueChanged={(value) => setProgress(value[0])}
              min={1}
              max={10}
              step={1}
              value={progress}
              width={220}
            />
          </View>
          <View className="flex-row justify-center gap-3">
            <View>
              <CustomButton
                color={colors.buttonColor}
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
      <Popup
        visible={visibleWarningPopup}
        dismiss={closeWarningPopup}
        viewContainerClassName={
          "border-gray-950 h-[220] pt-5 pl-5 pr-5 rounded-3xl"
        }
      >
        <View className=" flex-row justify-center mb-3">
          <Image
            resizeMode="cover"
            source={require("../../assets/warning-64.png")}
          />
        </View>
        <Text className="text-black text-xl text-center">
          You cannot pin more than 3!
        </Text>
      </Popup>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    borderRadius: 16,
    backgroundColor: "transparent",
    shadowColor: "#8d898978",
    padding: 8,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  shadowContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
});

export default Profile;
