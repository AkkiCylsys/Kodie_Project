import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';
import { BANNERS } from '../../../Themes/CommonVectors/Images';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import BottomTextsButton from '../../../components/Molecules/BottomTextsButton/BottomTextsButton';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import { IMAGES, _COLORS } from '../../../Themes/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LABEL_STYLES } from '../../../Themes/CommonStyles/CommonStyles';
import { CommonLoader } from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import messaging from '@react-native-firebase/messaging';
import { encryptPassword, signup } from '../../../services/Authentication/Authentication';
import {SignUpStyles} from "./Facebookloginwithmailstyle"
import DeviceInfo from 'react-native-device-info';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import TopHeader from '../../../components/Molecules/Header/Header';
import { googleLoginApi, googlesocial_loginApi } from '../../../redux/Actions/Authentication/AuthenticationApiCreator';

const FacebookEmailVerification = (props) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [term, setTerm] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [Fcm_token, setFcm_token] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleSignIn, setGoogleSignIn] = useState([]);
  const deviceId = DeviceInfo.getDeviceId();
  const deviceType = DeviceInfo.getDeviceType();
  console.log(deviceId,deviceType);
  let facebookProfile = props?.route?.params?.user_facebookProfile;
  let facebookToken = props?.route?.params?.user_facebookToken;
  let device_id = props?.route?.params?.device_id;
  let device_os_type = props?.route?.params?.device_os_type;
  let fcm_token = props?.route?.params?.fcm_token;
  let user_key = props?.route?.params?.user_key;
  
  //alert(facebookToken)
console.log("facebookProfile",facebookProfile)
console.log("facebookToken",facebookToken)
console.log(device_id)
  useEffect(() => {
  }, []);


  const validateSignUpEmail = (email) => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(email.trim());
  };

  const handleSignUpEmail = (text) => {
    setEmail(text);
    if (text.trim() === '') {
      setEmailError('Email is required!');
    } else if (!validateSignUpEmail(text)) {
      setEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address!',
      );
    } else {
      setEmailError('');
    }
  };

  
  //....... handle signup button validation here
  const handleSubmit = async () => {
    if (email.trim() === '') {
      setEmailError('Email is required!');
    } else if (!validateSignUpEmail(email)) {
      setEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address!',
      );
    } else if (!term && !privacy) {
      alert(
        'Please read and accept both Terms & Conditions and Privacy Policy!',
      );
    } else if (!term) {
      alert('Please read and accept Terms & Conditions!');
    } else if (!privacy) {
      alert('Please read and accept our Privacy Policy!');
    } else {
      _facebookLoginApi()
      //handleSignup();
    }
  };


  const _facebookLoginApi = async () => {
    try {
      setIsLoading(true)
      let FacebookSignUPPayload = {
        email: email,
        unique_social_id: facebookProfile?.userID,
        social_type: "facebook",
        is_social_login: 0,
        token: facebookToken,
        device_id: device_id,
        device_os_type: device_os_type,
        fcm_token: fcm_token,
      }
      console.log(JSON.stringify(FacebookSignUPPayload))
     // Api is common that why we are calling this methode here
      let _res = await googleLoginApi(FacebookSignUPPayload)
      console.log("____Facebook Enter Email___")
      console.log(JSON.stringify(_res))

      if (_res?.data?.success === true) {
          //alert(_res?.data?.code)
          const secretKey = 'XkhZG4fW2t2W';
          const encStr = await encryptPassword(facebookProfile?.userID, secretKey);
          console.log('encryptedpass', encStr);
          setIsLoading(false)
          props.navigation.navigate("FacebookEmailVerify",{
            email: email,
            user_key: _res?.data?.User_Key,
            _socialuserInfo: facebookProfile,
            password: encStr, //?
          });
        


      }
      else {
        
        setIsLoading(false)
        alert(_res?.data?.message)
      }
    } catch (error) {
     
      setIsLoading(false)
      console.log(error)
    }

  }
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: _COLORS?.Kodie_WhiteColor}}>
      <KeyboardAvoidingView
        style={SignUpStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TopHeader onPressLeftButton={() => props.navigation.navigate("LoginScreen")} MiddleText="Email Verification" />

        <ScrollView
        showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">

          <View style={SignUpStyles.maintextView}>
            <Text style={SignUpStyles.title}>Welcome to Kodie</Text>
            <Text style={SignUpStyles.discription}>
              Your personal solution to managing your rental properties. No
              fuss, no hassle.
            </Text>
          </View>

          {/*.............. signup input field start here ..................*/}
          <View style={SignUpStyles.card}>
            <View style={SignUpStyles.inputContainer}>
              <Text style={LABEL_STYLES._texinputLabel}>Email address
              <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
              </Text>
              <TextInput
                style={[
                  SignUpStyles.input,
                  {
                    borderColor: emailError
                      ? _COLORS.Kodie_lightRedColor
                      : _COLORS.Kodie_GrayColor,
                  },
                ]}
                value={email}
                onChangeText={handleSignUpEmail}
                onBlur={() => handleSignUpEmail(email)}
                placeholder="Enter your email address"
                placeholderTextColor="#999"
                // maxLength={30}
                autoCapitalize={'none'}
                keyboardType="email-address"
              />
              {emailError ? (
                <Text style={SignUpStyles.error_text}>{emailError}</Text>
              ) : null}
            </View>



            <Text style={SignUpStyles.accept_Text}>
              {'Accept the terms of use'}
            </Text>
            {/*.............. checkbox field start here ..................*/}
            <View style={SignUpStyles.termView}>
              <TouchableOpacity
                onPress={() => {
                  setTerm(!term);
                }}>
                <View style={SignUpStyles.CheckBox_View}>
                  {term && (
                    <FontAwesome
                      name="check"
                      size={15}
                      value={term}
                      onChangeText={setTerm}
                      color={_COLORS.Kodie_GreenColor}
                      style={SignUpStyles.checkbox_BG}
                    />
                  )}
                </View>
              </TouchableOpacity>

              <View style={SignUpStyles.termsConView}>
                <Text style={SignUpStyles.termsText}>{'I have read the'}</Text>
                <TouchableOpacity>
                  <Text
                    style={[
                      SignUpStyles.termsText,
                      SignUpStyles.terms_Condition,
                    ]}>
                    {' Terms & Conditions '}
                  </Text>
                </TouchableOpacity>
                <Text style={SignUpStyles.termsText}>{' and agree.'}</Text>
              </View>
            </View>
            <View style={SignUpStyles.termView}>
              <TouchableOpacity
                onPress={() => {
                  setPrivacy(!privacy);
                }}>
                <View style={SignUpStyles.CheckBox_View}>
                  {privacy && (
                    <FontAwesome
                      name="check"
                      size={15}
                      value={privacy}
                      onChangeText={setPrivacy}
                      color={_COLORS.Kodie_GreenColor}
                      style={SignUpStyles.checkbox_BG}
                    />
                  )}
                </View>
              </TouchableOpacity>

              <View style={SignUpStyles.termsConView}>
                <Text style={SignUpStyles.termsText}>{'I have read the'}</Text>
                <TouchableOpacity>
                  <Text
                    style={[
                      SignUpStyles.termsText,
                      SignUpStyles.terms_Condition,
                    ]}>
                    {' Privacy Policy '}
                  </Text>
                </TouchableOpacity>
                <Text style={SignUpStyles.termsText}>{'and agree.'}</Text>
              </View>
            </View>
          </View>

          {/*.............. signup button  here ..................*/}
          <View style={SignUpStyles.signBtnView}>
            <CustomSingleButton
              disabled={isLoading ? true : false}
              _ButtonText={'Verify now'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              onPress={handleSubmit}
            />

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
export default FacebookEmailVerification;
