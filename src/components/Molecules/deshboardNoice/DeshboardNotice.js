import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { _COLORS } from "../../../Themes";
import { DeshBoardNoticeCss } from "./DeshboardNoticeCss";
import Entypo from "react-native-vector-icons/Entypo";
import { Config } from "../../../Config";
import axios from "axios";
import { CommonLoader } from "../ActiveLoader/ActiveLoader";
import { useSelector } from "react-redux";
const DeshboardNotice = (props) => {
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse.....", loginData);
  console.log("user id..", loginData?.Login_details?.user_id);
  const [progress, setProgress] = useState(0.4);
  const [isLoading, setIsLoading] = useState(false);
  const [profileDay, setProfileDay] = useState("");
  const [profileCompletion, setProfileCompletion] = useState("");
  const [progressPercentage, setProgressPercentage] = useState("");
  const [show, setShow] = useState(false);
  const userID = loginData?.Login_details?.user_id;
  useEffect(() => {
    handleprofileDays();
    handleprofileCompletion();
  }, []);

  const handlePress = () => {
    setProgress((prevProgress) => prevProgress + 0.1);
  };

  const handleprofileDays = () => {
    const url = Config.BASE_URL;
    const profileDay_url = url + "Profile_Day";
    console.log("requested url..", profileDay_url);
    setIsLoading(true);
    const profileDayBody = {
      account_id: userID,
    };
    axios
      .post(profileDay_url, profileDayBody)
      .then((response) => {
        console.log("profileDays response....", response.data);
        setProfileDay(response.data.data[0].datediff_res);
        console.log("profileDay..", response.data.data[0].datediff_res);
      })
      .catch((error) => {
        console.log("profileDays error...", error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleprofileCompletion = () => {
    const url = Config.BASE_URL;
    const profileCompletion_url = url + "Profile_Completion";
    console.log("requested url..", profileCompletion_url);
    setIsLoading(true);
    const profileCompletion_urlBody = {
      // account_id: "531",
      account_id: userID,
    };
    axios
      .post(profileCompletion_url, profileCompletion_urlBody)
      .then((response) => {
        console.log("profileCompletion response....", response.data);
        setProfileCompletion(response.data.data[0].result);
        console.log("profileCompletion..", response.data.data[0].result);
        const profileValueWithoutPercent = profileCompletion.replace("%", "");
        const progressValue = profileValueWithoutPercent / 100;
        console.log("progressValue...", progressValue);
        setProgressPercentage(progressValue)
      })
      .catch((error) => {
        console.log("profileCompletion error...", error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClosePopup = () => {
    // props.onClose();
    setShow(!show);
  };
  return (
    <>
      {show ? null : (
        <View style={DeshBoardNoticeCss.MainView}>
          <View style={DeshBoardNoticeCss.progressView}>
            <View style={DeshBoardNoticeCss?.PercenView}>
              <View style={DeshBoardNoticeCss?.percentageText}>
                <Text style={DeshBoardNoticeCss.progressText}>
                  {profileCompletion} complete, nice work!
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleClosePopup}
                style={[DeshBoardNoticeCss.crossview]}
              >
                <Entypo
                  name="cross"
                  size={15}
                  color={_COLORS.Kodie_WhiteColor}
                />
              </TouchableOpacity>
            </View>
            <ProgressBar
              progress={progressPercentage}
              // progress={0.5}
              width={300}
              height={8}
              color={_COLORS.Kodie_lightGreenColor}
              style={DeshBoardNoticeCss.progresBar}
              borderColor="black"
            />


            <Text style={DeshBoardNoticeCss.profileText}>
              We are happy to have you on board. You have almost completed your
              profile set up.
              <TouchableOpacity >
                <Text style={DeshBoardNoticeCss.continueText}>
                  Tap to continue
                </Text>
              </TouchableOpacity>
            </Text>

          </View>
          <View style={DeshBoardNoticeCss.spaceLine} />
          <View style={DeshBoardNoticeCss.trialView}>
            <Text style={DeshBoardNoticeCss.trialText}>
              Your free trial ends in {profileDay} days.
            </Text>
            <TouchableOpacity style={DeshBoardNoticeCss.upgradeView}>
              <Text style={DeshBoardNoticeCss.upgradeText}>Upgrade now</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};
export default DeshboardNotice;
