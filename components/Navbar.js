import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { router } from "expo-router";

import { AuthContext } from "../contexts/user";
import { getUrl } from "../util";
import UserQeustionPopup from "./home/UserQuestionPopup";
import GoalQeustionPopup from "./home/GoalQuestionPopup";
import colors from "../styles/colors";
//Tailwind CSS
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Navbar = ({ isLoading, setIsLoading }) => {
  const {
    authToken,
    dayToGetQuestions,
    setDayToGetQuestions,
    questionCount,
    setQuestionCount,
    goal,
    setGoal,
    userQuestion,
    setUserQuestion,
  } = useContext(AuthContext);

  const [isSaving, setIsSaving] = useState(false);
  const [visibleUserQuestionPopup, setVisibleUserQuestionPopup] =
    useState(false);
  const [visibleGoalQuestionPopup, setVisibleGoalQuestionPopup] =
    useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isSkipUserAnswer, setIsSkipUserAnswer] = useState(false);
  const [goalAnswer, setGoalAnswer] = useState("");
  const [isSkipGoalAnswer, setIsSkipGoalAnswer] = useState(false);

  useEffect(() => {
    if (!authToken) return;
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
      console.log(res.data);
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

  const goToFirstPage = () => {
    if (isLoading) return;
    router.push("/home");
  };

  return (
    <View className="pt-4 pb-0">
      <View className="flex-row">
        <Pressable onPress={goToFirstPage}>
          <Text className="text-2xl font-bold text-black">LifeSync</Text>
        </Pressable>
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
                source={require("../assets/bell-24.png")}
              />
            </View>
          </Pressable>
        </View>
        <Image
          resizeMode="contain"
          style={{ width: 36, height: 36 }}
          className="rounded-full"
          source={require("../assets/female_avatar.png")}
        />
      </View>
      <View className=" w-full bg-white opacity-25" style={{ height: 1 }} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  bellBadge: {
    borderTopColor: colors.backgroundStartColor,
    borderLeftColor: colors.backgroundStartColor,
    borderRightColor: colors.backgroundStartColor,
    borderBottomColor: colors.backgroundStartColor,
    borderWidth: 1,
  },
});

export default Navbar;
