import React, { useState, useContext, useEffect, useRef } from "react";
import { View, Image, Text, SafeAreaView, Pressable } from "react-native";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import CustomButton from "../../components/CustomButton";
import { AuthContext } from "../../contexts/user";
import { getUrl } from "../../util";
import UserQeustionPopup from "./UserQuestionPopup";
import GoalQeustionPopup from "./GoalQuestionPopup";
import Progress from "./Progress.js";
import colors from "../../styles/colors";
import ChatIcon from "../../components/ChatIcon.js";

const Home = () => {
  const {
    authToken,
    setAuthToken,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    dayToGetQuestions,
    setDayToGetQuestions,
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [visibleUserQuestionPopup, setVisibleUserQuestionPopup] =
    useState(false);
  const [visibleGoalQuestionPopup, setVisibleGoalQuestionPopup] =
    useState(false);
  const [userQuestion, setUserQuestion] = useState({
    id: "",
    content: "",
    displayInterval: -1,
  });
  const [userAnswer, setUserAnswer] = useState("");
  const [isSkipUserAnswer, setIsSkipUserAnswer] = useState(false);
  const [goal, setGoal] = useState({
    id: "",
    content: "",
    questionId: "",
    question: "",
  });
  const [questionCount, setQuestionCount] = useState(0);
  const [goalAnswer, setGoalAnswer] = useState("");
  const [isSkipGoalAnswer, setIsSkipGoalAnswer] = useState(false);
  const [progresses, setProgresses] = useState([]);

  useEffect(() => {
    if (!authToken) return;
    getProgress();
    const now = new Date();
    if (dayToGetQuestions === now.getDate()) return; //to call getquestions funtion once per day
    getQuestions();
  }, [authToken]);

  useEffect(() => {
    if (!isSkipUserAnswer) return;
    saveUserAnswer();
  }, [isSkipUserAnswer]);

  useEffect(() => {
    if (!isSkipGoalAnswer) return;
    saveGoalAnswer();
  }, [isSkipGoalAnswer]);

  const openUserQuestionPopup = () => {
    setVisibleUserQuestionPopup(true);
    setQuestionCount(questionCount - 1);
  };

  const closeUserQuestionPopup = () => {
    setVisibleUserQuestionPopup(false);
  };

  const openGoalQuestionPopup = () => {
    setVisibleGoalQuestionPopup(true);
    setQuestionCount(questionCount - 1);
  };

  const closeGoalQuestionPopup = () => {
    setVisibleGoalQuestionPopup(false);
  };

  const displayQuestion = () => {
    if (questionCount === 0) return;
    //when both user & goal question are exist and user question is exist
    if (questionCount === 2 || (questionCount === 1 && goal.questionId === ""))
      openUserQuestionPopup();
    //when goal question is exist
    if (questionCount === 1 && goal.questionId !== "") openGoalQuestionPopup();
  };

  const getProgress = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(getUrl() + "/profile/goal-progress", {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      setProgresses(res.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const getQuestions = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(getUrl() + "/question/questions", {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = res.data;
      const now = new Date();
      setDayToGetQuestions(now.getDate());
      if (data.message) return;
      setUserQuestion({
        id: data.user_question_id._id,
        content: data.user_question_id.content,
        displayInterval: data.question_display_interval,
      });

      setQuestionCount(1);
      if (data.goal_id) {
        setQuestionCount(2);
        setGoal({
          id: data.goal_id._id,
          content: data.goal_id.content,
          questionId: data.goal_question_id._id,
          question: data.goal_question_id.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const skipUserAnswer = () => {
    setIsSkipUserAnswer(true);
  };

  const skipGoalAnswer = () => {
    setIsSkipGoalAnswer(true);
  };

  const saveUserAnswer = async () => {
    setIsSaving(true);
    try {
      await axios.post(
        `${getUrl()}/question/user-question-answer`,
        { userQuestionId: userQuestion.id, isSkipUserAnswer, userAnswer },
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      closeUserQuestionPopup();
      setIsSaving(false);
      if (goal.questionId !== "") {
        return;
      }
      if (userQuestion.displayInterval * 1 === 0) {
        updateQuestionDate();
      }
    } catch (err) {
      console.log(err);
      setIsSaving(false);
    }
  };

  const saveGoalAnswer = async () => {
    setIsSaving(true);
    try {
      await axios.post(
        `${getUrl()}/question/goal-question-answer`,
        {
          goalQuestionId: goal.questionId,
          goalId: goal.id,
          isSkipGoalAnswer,
          goalAnswer,
        },
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      closeGoalQuestionPopup();
      updateTips();
      if (userQuestion.displayInterval * 1 === 0) {
        updateQuestionDate();
      }
    } catch (err) {
      console.log(err);
    }
    setIsSaving(false);
  };

  const logout = async () => {
    setIsAuthenticated(false);
    const userData = {
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
      health: 0,
      income: 0,
      family: 0,
      romantic: 0,
      happiness: 0,
      pin_count: 0,
    };
    setUser(userData);
    try {
      await AsyncStorage.removeItem("auth-token");
      setDayToGetQuestions(0);
      setIsAuthenticated(false);
      setAuthToken("");
      await axios.post(
        getUrl() + "/auth/logout",
        {},
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const updateQuestionDate = async () => {
    try {
      await axios.patch(
        `${getUrl()}/question/question-date`,
        {},
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log("date updating success!");
    } catch (err) {
      console.log(err);
    }
  };

  const updateTips = async () => {
    try {
      if (isSkipGoalAnswer) return;
      await axios.patch(
        `${getUrl()}/question/tips`,
        { goalId: goal.id },
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const goToProfile = () => {
    if (isLoading) return;
    router.push("/profile");
  };

  return (
    <SafeAreaView className="h-full bg-white">
      {isAuthenticated && (
        <>
          <View className="flex-1 p-5">
            <View className="p-3">
              <View className="flex-row mb-3">
                <Text className="text-2xl font-bold text-black">LifeSync</Text>
                <View className="ml-auto mr-3 flex-row items-end">
                  <Pressable onPress={displayQuestion}>
                    <View className="relative pb-1">
                      {questionCount !== 0 && (
                        <View
                          className="absolute w-4 h-4 bg-white rounded-full -top-1 right-[-3px] z-10"
                          style={styles.bellBadge}
                        >
                          <Text
                            style={{
                              color: colors.backgroundStartColor,
                            }}
                            className="text-[10px] text-center"
                          >
                            {questionCount}
                          </Text>
                        </View>
                      )}
                      <Image
                        resizeMode="contain"
                        source={require("../../assets/bell-24.png")}
                      />
                    </View>
                  </Pressable>
                </View>
                <Image
                  resizeMode="contain"
                  style={{ width: 36, height: 36 }}
                  className="rounded-full"
                  source={require("../../assets/female_avatar.png")}
                />
              </View>
              <View
                className=" w-full bg-white opacity-25"
                style={{ height: 1 }}
              />
            </View>
            <Progress
              user={user}
              goalProgresses={progresses}
              isLoading={isLoading}
              getGoalProgress={getProgress}
            />
          </View>
          <View
            className="flex-row justify-around p-2"
            style={colors.navBarBackground}
          >
            <Pressable onPress={goToProfile}>
              <View className="flex-col items-center">
                <Image
                  resizeMode="contain"
                  source={require("../../assets/user-32.png")}
                />
                <Text className="text-white text-xs">Profile</Text>
              </View>
            </Pressable>
            <Pressable onPress={logout}>
              <View className="flex-col items-center">
                <Image
                  resizeMode="contain"
                  source={require("../../assets/logout-32.png")}
                />
                <Text className="text-white text-xs">log out</Text>
              </View>
            </Pressable>
          </View>
          <ChatIcon isLoading={isLoading} />
        </>
      )}
      {!isAuthenticated && (
        <>
          <View className="flex-1 items-center justify-center">
            <Image
              resizeMode="contain"
              className="w-3/4"
              source={require("../../assets/home.png")}
            />
          </View>
          <View className="p-8 pt-0 items-stretch">
            <Link href="/signup" asChild>
              <CustomButton title="Sign Up" color={colors.buttonColor} />
            </Link>
            <Link href="/signin" asChild>
              <CustomButton title="Sign In" color={colors.buttonColor} />
            </Link>
          </View>
        </>
      )}
      <UserQeustionPopup
        visibleQuestionPopup={visibleUserQuestionPopup}
        question={userQuestion.content}
        answer={userAnswer}
        setAnswer={setUserAnswer}
        saveAnswer={saveUserAnswer}
        skipAnswer={skipUserAnswer}
        isSkipUserAnswer={isSkipUserAnswer}
        closeQuestionPopup={closeUserQuestionPopup}
        isSaving={isSaving}
      />
      <GoalQeustionPopup
        visibleQuestionPopup={visibleGoalQuestionPopup}
        goal={goal.content}
        question={goal.question}
        answer={goalAnswer}
        setAnswer={setGoalAnswer}
        saveAnswer={saveGoalAnswer}
        skipAnswer={skipGoalAnswer}
        closeQuestionPopup={closeGoalQuestionPopup}
        isSkipGoalAnswer={isSkipGoalAnswer}
        isSaving={isSaving}
      />
    </SafeAreaView>
  );
};

const styles = {
  bellBadge: {
    borderTopColor: colors.backgroundStartColor,
    borderLeftColor: colors.backgroundStartColor,
    borderRightColor: colors.backgroundStartColor,
    borderBottomColor: colors.backgroundStartColor,
    borderWidth: 1,
  },
};

export default Home;
