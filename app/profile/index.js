import React, { useState, useContext, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import axios from "axios";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { AuthContext } from "../contexts/auth";
import Footer from "./Footer";
import UserInfo from "./UserInfo";
import Popup from "../components/Popup";
import CustomButton from "../components/CustomButton";
import { getUrl } from "../util/asyncStorage";
import InputNumber from "../components/InputNumber";

const Profile = () => {
  const { user, isAuthenticated, getUser, authToken } = useContext(AuthContext);
  const [visibleConfirmPopup, setVisibleConfirmPopup] = useState(false);
  const [visibleProgressPopup, setVisibleProgressPopup] = useState(false);
  const [visibleSettingQuestion, setVisibleSettingQuestion] = useState(false);
  const [visibleSettingTip, setVisibleSettingTip] = useState(false);
  const [goalId, setGoalId] = useState("1");
  const [progress, setProgress] = useState(0);
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
      .get(getUrl() + "/profile/goal", {
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
    setGoalId(id);
    setVisibleConfirmPopup(true);
  };

  const closeConfimrPopup = () => {
    setVisibleConfirmPopup(false);
  };

  const openProgressPopup = (id) => {
    setGoalId(id);
    setVisibleProgressPopup(true);
  };

  const closeProgressPopup = () => {
    setVisibleProgressPopup(false);
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

  const saveGoalProgress = () => {
    axios
      .post(
        `${getUrl()}/profile/goal-progress`,
        { goalId, progress },
        {
          headers: {
            Authorization: `${authToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {console.log(res.data)})
      .catch((err) => {console.log(err)});
  };

  const deleteGoal = () => {
    axios
      .delete(`${getUrl()}/profile/goal?id=${goalId}`, {
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
              onPress={(e) => openProgressPopup(item._id)}
            >
              <FontAwesome name="pencil" size={15} color={"#fff"} />
            </Pressable>
            <Pressable
              title="Delete"
              className="absolute bottom-3 right-0"
              onPress={(e) => openConfimrPopup(item._id)}
            >
              <FontAwesome name="trash" size={15} color={"#fff"} />
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
              <CustomButton
                color={"red"}
                title={"delete"}
                onPress={deleteGoal}
              />
            </View>
            <View>
              <CustomButton
                color={"grey"}
                title={"cancel"}
                onPress={closeConfimrPopup}
              />
            </View>
          </View>
        </View>
      </Popup>
      <Popup
        visible={visibleProgressPopup}
        transparent={true}
        dismiss={closeProgressPopup}
        margin={"10%"}
        marginTop={"25%"}
      >
        <View className="bg-white border-gray-950 h-[280] pt-10 pl-5 pr-5 rounded-lg">
          <Text className="text-2xl mb-8 text-center">
            Which level of this goal are you in 1-10?
          </Text>
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
          <View className="flex-row justify-center gap-3 mt-3">
            <View>
              <CustomButton
                color={"#d9ab3c"}
                title={"save"}
                onPress={saveGoalProgress}
              />
            </View>
            <View>
              <CustomButton
                color={"grey"}
                title={"cancel"}
                onPress={closeProgressPopup}
              />
            </View>
          </View>
        </View>
      </Popup>
    </View>
  );
};

export default Profile;
