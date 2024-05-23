//ScreenNo:7
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import {BANNERS} from '../../../Themes/CommonVectors/Images';
import {SignUpStyles} from './SignUpStyle';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import BottomTextsButton from './../../../components/Molecules/BottomTextsButton/BottomTextsButton';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import {IMAGES, _COLORS} from './../../../Themes/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {LABEL_STYLES} from '../../../Themes/CommonStyles/CommonStyles';
import axios from 'axios';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {Config} from '../../../Config';
import {fetchRegistrationSuccess} from '../../../redux/Actions/Authentication/AuthenticationApiAction';
import {useDispatch, useSelector} from 'react-redux';
// import CryptoJS from "crypto-js";
import CryptoJS from 'react-native-crypto-js';
import messaging from '@react-native-firebase/messaging';

import {signupApiActionCreator} from '../../../redux/Actions/Authentication/AuthenticationApiCreator';
export default SignUp = props => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [term, setTerm] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [Fcm_token, setFcm_token] = useState('');

  const [signupResponse, setSignupResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getTocken();
    }
  }
  const handlemessage = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification casued app to open from background state :',
        remoteMessage.notification,
      );
    });
    messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the foreground!', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification casued app to open from quit state.',
            remoteMessage.notification,
          );
        }
      });
  };

  const getTocken = async () => {
    const token = await messaging().getToken();
    console.log(token, 'token');
    setFcm_token(token);
  };
  useEffect(() => {
    handlemessage();
    requestUserPermission();
  }, []);
  //... Regex signup email validation
  const validateSignUpEmail = email => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(email);
  };

  //...... email validation define here
  const handleSignUpEmail = text => {
    setEmail(text);
    if (text.trim() === '') {
      setEmailError('Email is required !');
    } else if (!validateSignUpEmail(text)) {
      setEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      setEmailError('');
    }
  };

  //...... password validation define here
  const handleSignUpPassword = text => {
    setPassword(text);
    if (text.trim() === '') {
      setPasswordError('Password is required!');
    } else {
      setPasswordError('');
    }
  };
  // .........encrypt password.at........
  const secretKey = 'XkhZG4fW2t2W';
  const encryptPassword = (password, secretKey) => {
    return new Promise((resolve, reject) => {
      try {
        const key = secretKey;
        const keyutf = CryptoJS.enc.Utf8.parse(key);
        const iv = CryptoJS.enc.Utf8.parse('XkhZG4fW2t2W');
        const enc = CryptoJS.AES.encrypt(password, keyutf, {iv: iv});
        const encStr = enc.toString();
        console.log('Encrypted Password:', encStr);
        resolve(encStr);
      } catch (error) {
        reject(error);
      }
    });
  };

  const Signuphandle = async () => {
    // const url = "https://e3.cylsys.com/api/v1/register";
    // const url = 'https://kodieapis.cylsys.com/api/v1/register';
    const url = 'https://kodietestapi.cylsys.com/api/v1/register';
    const signupUrl = url;
    console.log('Request URL:', signupUrl);
    setIsLoading(true);

    try {
      // Encrypt the password
      const encStr = await encryptPassword(password, secretKey);
      console.log('encryptedpass', encStr);

      const SignUpData = {
        email: email,
        password: encStr,
        is_term_condition: term,
        is_privacy_policy: privacy,
        fcm_token: Fcm_token,
      };

      const response = await axios.post(signupUrl, SignUpData);

      setSignupResponse(response?.data);
      console.log('SignUp response', response?.data);
      // alert(JSON.stringify(response?.data));
      if (response?.data?.code === 3) {
        Alert.alert('Success!', response?.data?.message);
        props.navigation.navigate('SignUpVerification', {
          email: email,
          password: encStr,
          is_term_condition: term,
          is_privacy_policy: privacy,
          user_key: response?.data?.User_Key,
        });
      } else if (response?.data?.code === 1) {
        Alert.alert('Success!', response?.data?.message);
        setEmail('');
        setPassword('');
        setTerm(false);
        setPrivacy(false);
        setIsLoading(false);
        props.navigation.navigate('SignUpVerification', {
          email: email,
          password: encStr,
          is_term_condition: term,
          is_privacy_policy: privacy,
          user_key: response?.data?.User_Key,
        });
      } else if (response?.data?.code === 2) {
        Alert.alert('Success!', response?.data?.message);
        props.navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Success!', response?.data?.message);
      }
    } catch (error) {
      if (error?.response || error?.response?.status === 400) {
        Alert.alert(
          'Warning !',
          'Failed to send OTP via email. Please try again later.',
        );
      } else if (error?.response || error?.response?.status === 401) {
        Alert.alert('Warning !', 'Your Password is Wrong.');
      } else {
        // alert('An error occurred. Please try again later.');
      }
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  //....... handle signup button validation here
  const handleSubmit = async () => {
    if (email.trim() === '') {
      setEmailError('Email is required!');
    } else if (!validateSignUpEmail(email)) {
      setEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else if (password.trim() === '') {
      setPasswordError('Password is required!');
    } else if (!term && !privacy) {
      alert(
        'Please read and accept both Terms & Conditions and Privacy Policy.',
      );
    } else if (!term) {
      alert('Please read and accept Terms & Conditions.');
    } else if (!privacy) {
      alert('Please read and accept our Privacy Policy.');
    } else {
      Signuphandle();
    }
  };

  return (
    <KeyboardAvoidingView
      style={SignUpStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={SignUpStyles.logoContainer}>
          <Image source={BANNERS.BannerFirst} style={SignUpStyles.logo} />
        </View>
        <View style={SignUpStyles.maintextView}>
          <Text style={SignUpStyles.title}>Welcome to Kodie</Text>
          <Text style={SignUpStyles.discription}>
            Your personal solution to managing your rental properties. No fuss,
            no hassle.
          </Text>
        </View>

        {/*.............. signup input field start here ..................*/}
        <View style={SignUpStyles.card}>
          <View style={SignUpStyles.inputContainer}>
            <Text style={LABEL_STYLES._texinputLabel}>Email address*</Text>
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
              onChangeText={setEmail}
              onBlur={() => handleSignUpEmail(email)}
              placeholder="Enter your email address"
              placeholderTextColor="#999"
              maxLength={30}
              autoCapitalize={'none'}
            />
            {emailError ? (
              <Text style={SignUpStyles.error_text}>{emailError}</Text>
            ) : null}
          </View>

          <View style={SignUpStyles.inputContainer}>
            <Text
              style={[LABEL_STYLES._texinputLabel, SignUpStyles.cardHeight]}>
              Password*
            </Text>
            <View
              style={[
                SignUpStyles.passwordContainer,
                {
                  borderColor: passwordError
                    ? _COLORS.Kodie_lightRedColor
                    : _COLORS.Kodie_GrayColor,
                },
              ]}>
              <TextInput
                style={SignUpStyles.passwordInput}
                value={password}
                onChangeText={setPassword}
                onBlur={() => handleSignUpPassword(password)}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={handleTogglePassword}>
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={
                    passwordError
                      ? _COLORS.Kodie_lightRedColor
                      : _COLORS.Kodie_BlackColor
                  }
                  style={SignUpStyles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={SignUpStyles.error_text}>{passwordError}</Text>
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
              <Text style={SignUpStyles.termsText}>{' and agree'}</Text>
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
              <Text style={SignUpStyles.termsText}>{'and agree'}</Text>
            </View>
          </View>
        </View>

        {/*.............. signup button  here ..................*/}
        <View style={SignUpStyles.signBtnView}>
          <CustomSingleButton
            disabled={isLoading ? true : false}
            _ButtonText={'Sign up now'}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={handleSubmit}
          />
          <DividerIcon
            DeviderText={'or'}
            style={{marginTop: 32, marginBottom: 30}}
          />

          {/*.............. signup option field here ..................*/}
          <CustomSingleButton
            leftImage={IMAGES.GoogleIcon}
            isLeftImage={true}
            _ButtonText={'Sign up with Google'}
            backgroundColor={_COLORS.Kodie_WhiteColor}
            disabled={isLoading ? true : false}
            onPress={() => {
              Alert.alert('Sign with Google', 'Coming soon');
            }}
          />
          <CustomSingleButton
            disabled={isLoading ? true : false}
            leftImage={IMAGES.FacebookIcon}
            isLeftImage={true}
            _ButtonText={'Sign up with Facebook'}
            backgroundColor={_COLORS.Kodie_WhiteColor}
            onPress={() => {
              Alert.alert('Sign with Facebook', 'Coming soon');
            }}
          />
          <View style={SignUpStyles.already_account_login}>
            <BottomTextsButton
              _LeftButtonText={'Already have an account?'}
              _RightButtonText={'  Login'}
              onPress={() => {
                props.navigation.navigate('LoginScreen');
              }}
            />
          </View>
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </KeyboardAvoidingView>
  );
};
