import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
// import ProgressBar from 'react-native-progress/Bar';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import {_COLORS} from '../../../Themes';
import {DeshBoardNoticeCss} from './DeshboardNoticeCss';
import Entypo from 'react-native-vector-icons/Entypo';
import {Config} from '../../../Config';
import axios from 'axios';
import {CommonLoader} from '../ActiveLoader/ActiveLoader';
import {useSelector} from 'react-redux';
const DeshboardNotice = props => {
  const loginData = useSelector(state => state?.authenticationReducer?.data);
  const SignData = useSelector(state => state?.authenticationReducer?.data);
  console.log('loginResponse.....', loginData);
  console.log('signResponse.....', SignData);

  console.log(' loginData user id..', loginData?.Login_details?.user_id);
  console.log('SignData user id..', SignData?.Login_details?.user_id);
  const [progress, setProgress] = useState(0.4);
  const [isLoading, setIsLoading] = useState(false);
  const [profileDay, setProfileDay] = useState('');
  const [profileCompletion, setProfileCompletion] = useState('');
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [show, setShow] = useState(false);
  const [Progresswidth, setProgresswidth] = useState('100%');
  const userID = loginData?.Login_details?.user_id;
  useEffect(() => {
    handleprofileDays();
    // handleprofileCompletion();
  }, []);

  const handlePress = () => {
    setProgress(prevProgress => prevProgress + 0.1);
  };

  const handleprofileDays = () => {
    const url = Config.BASE_URL;
    const profileDay_url = url + 'Profile_Day';
    console.log('requested url..', profileDay_url);
    setIsLoading(true);
    const profileDayBody = {
      user_id: userID,
    };
    axios
      .post(profileDay_url, profileDayBody)
      .then(response => {
        console.log('profileDays response....', response?.data);
        setProfileDay(response?.data?.data[0].datediff_res);
        console.log('profileDay..', response?.data?.data[0].datediff_res);
      })
      .catch(error => {
        console.log('profileDays error...', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleprofileCompletion = () => {
    const url = Config.BASE_URL;
    const profileCompletion_url = url + 'Profile_Completion';
    console.log('requested url..', profileCompletion_url);
    setIsLoading(true);
    const profileCompletion_urlBody = {
      // account_id: "531",
      user_id: userID,
    };
    axios
      .post(profileCompletion_url, profileCompletion_urlBody)
      .then(response => {
        console.log('profileCompletion response....', response?.data);
        setProfileCompletion(response?.data?.data[0]?.result);
        console.log('profileCompletion..', response?.data?.data[0]?.result);
        const profileValueWithoutPercent = profileCompletion.replace('%', '');
        const progressValue = profileValueWithoutPercent / 100;
        console.log('progressValue...', progressValue);
        setProgressPercentage(progressValue);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('profileCompletion error...', error);
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
                  {props.PerprofileCompletion} Complete, Nice Work !
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleClosePopup}
                style={[DeshBoardNoticeCss.crossview]}>
                <Entypo
                  name="cross"
                  size={15}
                  color={_COLORS.Kodie_WhiteColor}
                />
              </TouchableOpacity>
            </View>
            {/* <View style={{}}>

            </View> */}
            <ProgressBar
              progress={props.progressPercentage}
              color={_COLORS.Kodie_lightGreenColor}
              style={DeshBoardNoticeCss.progresBar}
            />
            {/* <ProgressBar
              progress={progressPercentage}
              // progress={0.5}
              width={370}
              height={8}
              color={_COLORS.Kodie_lightGreenColor}
              style={DeshBoardNoticeCss.progresBar}
              borderColor="black"
            /> */}
            <View>
              <Text style={DeshBoardNoticeCss.profileText}>
                {
                  'We are happy to have you on board. You have almost completed your profile set up.  '
                }

                <TouchableWithoutFeedback onPress={()=>{
                  props?.continue()
                }}>
                  <Text style={[DeshBoardNoticeCss.continueText]}>
                    {'Tap to continue.'}
                  </Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
          <View style={DeshBoardNoticeCss.spaceLine} />
          <View style={DeshBoardNoticeCss.trialView}>
            <Text style={DeshBoardNoticeCss.trialText}>
              Your free trial ends in {profileDay || "0"} days.
            </Text>
            {props.ShowUpgradeButton ? (
              <TouchableOpacity
                onPress={props.onPress}
                style={DeshBoardNoticeCss.upgradeView}>
                <Text style={DeshBoardNoticeCss.upgradeText}>Upgrade now</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      )}
    </>
  );
};
export default DeshboardNotice;
