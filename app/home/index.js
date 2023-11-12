import React, { useState, useContext, useEffect } from "react";
import { View, Image, Text, SafeAreaView, Pressable } from "react-native";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import CustomButton from "../components/CustomButton";
import Popup from "../components/Popup";
import { AuthContext } from "../contexts/auth";
import UserQeustionPopup from "./UserQuestionPopup";
import GoalQeustionPopup from "./GoalQuestionPopup";
import Input from "../components/Input";
import { getUrl } from "../util/asyncStorage";
import Progress from "./Progress.js";

const Home = () => {
  const buttonColor = "#d9ab3c";
  const {
    authToken,
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    dayToGetQuestions,
    setDayToGetQuestions,
  } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [visibleUserQuestionPopup, setVisibleUserQuestionPopup] =
    useState(false);
  const [visibleGoalQuestionPopup, setVisibleGoalQuestionPopup] =
    useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [userQuestion, setUserQuestion] = useState({
    id: "",
    content: "",
    displayInterval: -1,
  });
  const [goal, setGoal] = useState({
    id: "",
    content: "",
    QuestionId: "",
    Question: "",
  });
  const [goalAnswer, setGoalAnswer] = useState("");
  const [isSkipUserAnswer, setIsSkipUserAnswer] = useState(false);
  const [isSkipGoalAnswer, setIsSkipGoalAnswer] = useState(false);
  const [progresses, setProgresses] = useState({
    health: 0,
    income: 0,
    happiness: 0,
    romantic: 0,
    family: 0,
  });

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

  const openPopup = async () => {
    setVisible(true);
  };

  const closePopup = () => {
    setVisible(false);
  };

  const openUserQuestionPopup = () => {
    setVisibleUserQuestionPopup(true);
  };

  const closeUserQuestionPopup = () => {
    setVisibleUserQuestionPopup(false);
  };

  const openGoalQuestionPopup = () => {
    setVisibleGoalQuestionPopup(true);
  };

  const closeGoalQuestionPopup = () => {
    setVisibleGoalQuestionPopup(false);
  };

  const getProgress = async () => {
    try {
      const progress = await axios.get(getUrl() + "/profile/progress", {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      const domains = progress.data.domains;
      setProgresses({
        health: (domains[0].avg_progress || 0) * 10,
        income: (domains[1].avg_progress || 0) * 10,
        happiness: (domains[2].avg_progress || 0) * 10,
        family: (domains[3].avg_progress || 0) * 10,
        romantic: (domains[4].avg_progress || 0) * 10,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getQuestions = async () => {
    try {
      const res = await axios.get(getUrl() + "/question/questions", {
        headers: {
          Authorization: `${authToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log("res", res.data);
      const data = res.data;
      const now = new Date();
      setDayToGetQuestions(now.getDate());
      if (data.message) return;
      setUserQuestion({
        id: data.user_question_id._id,
        content: data.user_question_id.content,
        displayInterval: data.question_display_interval,
      });

      openUserQuestionPopup();
      if (data.goal_id) {
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
  };

  const skipUserAnswer = () => {
    setIsSkipUserAnswer(true);
  };

  const skipGoalAnswer = () => {
    setIsSkipGoalAnswer(true);
  };

  const saveUserAnswer = () => {
    axios
      .post(
        `${getUrl()}/question/user-question-answer`,
        { userQuestionId: userQuestion.id, isSkipUserAnswer, userAnswer },
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        closeUserQuestionPopup();
        if (goal.questionId !== "") {
          openGoalQuestionPopup();
          return;
        }
        if (userQuestion.displayInterval * 1 === 0) {
          updateQuestionDate();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveGoalAnswer = () => {
    axios
      .post(
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
      )
      .then((res) => {
        closeGoalQuestionPopup();
        if (userQuestion.displayInterval * 1 === 0) {
          updateQuestionDate();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = async () => {
    setIsAuthenticated(false);
    const user = {
      name: "",
      age: 0,
      height: 0,
      weight: 0,
      gender: "",
    };
    setUser(user);
    try {
      await AsyncStorage.removeItem("auth-token");
    } catch (e) {
      console.log(e);
    }
  };

  const updateQuestionDate = () => {
    console.log(authToken);
    axios
      .patch(
        `${getUrl()}/question/question-date`,
        {},
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        console.log("date updating success!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 bg-neutral-900 pt-5">
        <Text className="text-2xl text-center text-white">AI companion</Text>
        {!isAuthenticated && (
          <Image
            resizeMode="contain"
            className="w-full flex-1"
            source={require("../../assets/home.png")}
          />
        )}
        {isAuthenticated && <Progress progresses={progresses} />}
        <View className="p-4 pt-0 items-stretch">
          {!isAuthenticated && (
            <>
              <Link href="/signup" asChild>
                <CustomButton title="Sign Up" color={buttonColor} />
              </Link>
              <Link href="/signin" asChild>
                <CustomButton title="Sign In" color={buttonColor} />
              </Link>
            </>
          )}
          {isAuthenticated && (
            <CustomButton
              title="Log out"
              color={buttonColor}
              onPress={logout}
            />
          )}
        </View>
        {isAuthenticated && (
          <View className="flex-row justify-around p-2 bg-slate-700 border-t-slate-300 ">
            <Link href="/profile">
              <View className="flex-col">
                <FontAwesome
                  name="user"
                  size={32}
                  color="white"
                  style={{ textAlign: "center" }}
                />
                <Text className="text-white text-xs">Profile</Text>
              </View>
            </Link>
            <Pressable onPress={openPopup}>
              <View className="flex-col">
                <FontAwesome
                  name="inbox"
                  size={32}
                  color="white"
                  style={{ textAlign: "center" }}
                />
                <Text className="text-white text-xs">Chat</Text>
              </View>
            </Pressable>
          </View>
        )}
        <Popup
          visible={visible}
          transparent={true}
          dismiss={closePopup}
          margin={"2%"}
          marginTop={"5%"}
        >
          <View className="bg-white border-gray-950 h-[500] pt-5 pl-5 pr-5">
            <View className="flex-row">
              <Image
                source={require("../../assets/chatbot.png")}
                className="w-10 h-10"
              ></Image>
              <Text className="bg-slate-300 p-1 inline-block">hello</Text>
            </View>
            <View className="absolute bottom-2 w-full ml-2">
              <Input
                multiline={true}
                numberOfLines={5}
                style={{ backgroundColor: "#f1f1f1" }}
              />
            </View>
          </View>
        </Popup>
        <UserQeustionPopup
          visibleQuestionPopup={visibleUserQuestionPopup}
          question={userQuestion.content}
          answer={userAnswer}
          setAnswer={setUserAnswer}
          saveAnswer={saveUserAnswer}
          skipAnswer={skipUserAnswer}
          closeQuestionPopup={closeUserQuestionPopup}
        ></UserQeustionPopup>
        <GoalQeustionPopup
          visibleQuestionPopup={visibleGoalQuestionPopup}
          goal={goal.content}
          question={goal.question}
          answer={goalAnswer}
          setAnswer={setGoalAnswer}
          saveAnswer={saveGoalAnswer}
          skipAnswer={skipGoalAnswer}
          closeQuestionPopup={closeGoalQuestionPopup}
        ></GoalQeustionPopup>
      </View>
    </SafeAreaView>
  );
};

export default Home;
