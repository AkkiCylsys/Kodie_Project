import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  BackHandler,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { logos } from '../../../Themes/CommonVectors/Images';
import { LoginStyles } from './LoginCss';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import BottomTextsButton from './../../../components/Molecules/BottomTextsButton/BottomTextsButton';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  LABEL_STYLES,
  IMAGES,
  _COLORS,
  FONTFAMILY,
} from './../../../Themes/index';
import { useFocusEffect } from '@react-navigation/native';
import { CommonLoader } from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Config } from '../../../Config';
import DeviceInfo from 'react-native-device-info';
import CryptoJS from 'react-native-crypto-js';
import messaging from '@react-native-firebase/messaging';
import {
  loginApiActionCreator,
  googleLoginApi,
} from '../../../redux/Actions/Authentication/AuthenticationApiCreator';
import useNetworkStatus from '../../../services/useNetworkConnection/UseNetworkConnection';
import {
  confirmPasswordServices,
  sendVerificationService,
  verifyOtpServices,
} from '../../../services/Authentication/ForgotPasswordServices';
import { fetchLoginSuccess } from '../../../redux/Actions/Authentication/AuthenticationApiAction';

export default Login = props => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailError, setResetEmailError] = useState('');
  const [verificationcode, setVerificationcode] = useState('');
  const [verificationcodeError, setVerificationcodeError] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [newpasswordError, setNewPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isClick, setIsClick] = useState(0);
  const [IsSusscessPasswordScreen, setIsSusscessPasswordScreen] = useState(550);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const refRBSheet = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isTimeron, setIsTimeron] = useState(false);
  const device = DeviceInfo.getUniqueId();
  const deviceId = device?._z;
  const [Fcm_token, setFcm_token] = useState('');
  const [isScreenFocused, setIsScreenFocused] = useState(false);
  const { isConnected, isInternetReachable } = useNetworkStatus(isScreenFocused);

  useFocusEffect(
    useCallback(() => {
      setIsScreenFocused(true);
      return () => setIsScreenFocused(false);
    }, []),
  );
  useEffect(() => {
    requestUserPermission();
    const configureGoogleSignIn = () => {
      GoogleSignin.configure({
        webClientId:
          '1095041111738-v9tqbtu67e7lmgnb76tasn23hki8u2b3.apps.googleusercontent.com',
        iosClientId:
          '1095041111738-qk57a303oc8jp5rg3ep8useuc97tl739.apps.googleusercontent.com',
        offlineAccess: false,
      });
    };
    configureGoogleSignIn();
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (
        userInfo?.user?.email != null ||
        userInfo?.user?.email != '' ||
        userInfo?.user?.email != undefined
      ) {
        _googleLoginApi(userInfo);
      }
    } catch (error) {
      console.log('Error during signIn:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
      }
    }
  };
  const _googleLoginApi = async _userInfo => {
    try {
      setIsLoading(true);
      let googleSignUPPayload = {
        email: _userInfo?.user?.email,
        unique_social_id: _userInfo?.user?.id,
        social_type: 'Google',
        is_social_login: 1,
        token: _userInfo?.idToken,
        device_id: deviceId,
        device_os_type: deviceType,
        fcm_token: Fcm_token,
      };

      let _res = await googleLoginApi(googleSignUPPayload);
      if (_res?.data?.success == true) {
        if (_res?.data?.code == 3) {
          const encStr = await encryptPassword(_userInfo?.user?.id, secretKey);
          setIsLoading(false);
          props.navigation.navigate('SignUpSteps', {
            email: _userInfo?.user?.email,
            user_key: _res?.data?.User_Key,
            _socialuserInfo: _userInfo,
            password: encStr, //?
          });
        } else if (_res?.data?.code == 6) {
          const encStr = await encryptPassword(_userInfo?.user?.id, secretKey);
          console.log('encryptedpass', encStr);
          setIsLoading(false);
          props.navigation.navigate('SignUpSteps', {
            email: _userInfo?.user?.email,
            user_key: _res?.data?.User_Key,
            _socialuserInfo: _userInfo,
            password: encStr, //?
          });
        } else if (_res?.data?.code == 10) {
          setIsLoading(true);
          dispatch(fetchLoginSuccess(_res?.data));
          props.navigation.navigate('DrawerNavigatorLeftMenu');
        }
      } else {
        Alert.alert('Account suspension', _res?.data?.message, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Activate',
            onPress: async () => {
              const url = Config.BASE_URL;
              const activateAccount = url + 'sendMail';
              setIsLoading(true);
              const activateAccount_Data = {
                email: _userInfo?.user?.email,
              };
              await axios
                .post(activateAccount, activateAccount_Data)
                .then(response => {
                  if (response?.data?.success === true) {
                    alert(response?.data?.message);
                  } else {
                    setIsLoading(false);
                    alert(response?.data?.message);
                  }
                })
                .catch(error => {
                  setIsLoading(false);
                })
                .finally(() => {
                  setIsLoading(false);
                });
            },
          },
        ]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  const buttonLabels = [
    'Send verification code',
    'Next',
    'Save',
    'Back to login',
  ];
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
  const getTocken = async () => {
    const token = await messaging().getToken();
    setFcm_token(token);
  };
  const handleActivateAccount = async () => {
    const url = Config.BASE_URL;
    const activateAccount = url + 'sendMail';
    setIsLoading(true);
    const trimmedEmail = email.trim();
    const activateAccount_Data = {
      email: trimmedEmail,
    };
    await axios
      .post(activateAccount, activateAccount_Data)
      .then(response => {
        if (response?.data?.success === true) {
          alert(response?.data?.message);
        } else {
          setIsLoading(false);
          alert(response?.data?.message);
        }
      })
      .catch(error => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        refRBSheet.current.close();
        setIsSusscessPasswordScreen(550);
        setIsClick(0);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );
  const handleToggleNewPassword = () => {
    setShowNewPassword(prevShowPassword => !prevShowPassword);
  };

  const handleToggleResetPassword = () => {
    setShowResetPassword(prevShowPassword => !prevShowPassword);
  };

  const handleforgetValidation = () => {
    if (resetEmail.trim() === '') {
      setResetEmailError('Email is required!');
    } else if (!validateResetEmail(resetEmail)) {
      setResetEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address!',
      );
    } else {
      send_verification_code();
    }
  };

  const validateResetEmail = resetEmail => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(resetEmail.trim());
  };

  const handleResetEmailChange = text => {
    setResetEmail(text);
    if (text.trim() === '') {
      setResetEmailError('Email is required!');
    } else if (!validateResetEmail(text)) {
      setResetEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address!',
      );
    } else {
      setResetEmailError('');
    }
  };

  const handleverificationcodes = () => {
    if (verificationcode.trim() === '') {
      setVerificationcodeError('Verification code is required!');
    } else {
      verify_Otp();
    }
  };

  const handleResetpasswordCheck = () => {
    if (newpassword.trim() === '') {
      setNewPasswordError('Please enter a new password!');
    } else if (newpassword.length < 8) {
      setNewPasswordError(
        'Oh no. The password must be at least 8 characters long!',
      );
    } else if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Please enter the confirmation password!');
    } else if (newpassword !== confirmPassword) {
      setConfirmPasswordError('Password do not match!');
    } else if (confirmPassword.length < 8) {
      setConfirmPasswordError(
        'Oh no. The password must be at least 8 characters long!',
      );
    } else {
      setConfirmPasswordError('');
      create_password();
    }
  };

  const handleButtonPress = () => {
    if (isClick === 3) {
      openSheetWithHeight(550);
      refRBSheet.current.close();
    } else if (isClick === 0) {
      handleforgetValidation();
    } else if (isClick === 1) {
      handleverificationcodes();
    } else if (isClick === 2) {
      handleResetpasswordCheck();
    } else {
      setIsClick(isClick + 1);
    }
  };
  const validateEmail = email => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(email.trim());
  };

  const handleEmailChange = text => {
    setEmail(text);
    if (text.trim() === '') {
      setEmailError('Email is required!');
    } else if (!validateEmail(text)) {
      setEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address!',
      );
    } else {
      setEmailError('');
    }
  };
  const handleNewPassword = text => {
    setNewPassword(text);
    if (text.trim() === '') {
      setNewPasswordError('New password is required!');
    } else if (text.length < 8) {
      setNewPasswordError(
        'Oh no. The password must be at least 8 characters long!',
      );
    } else {
      setNewPasswordError('');
    }
  };
  const handleConfirmpassword = text => {
    setConfirmPassword(text);
    if (text.trim() === '') {
      setConfirmPasswordError('Please enter a confirmation password!');
    } else if (newpassword !== text) {
      setConfirmPasswordError('Password do not match!');
    } else if (text.length < 8) {
      setConfirmPasswordError(
        'Oh no. The password must be at least 8 characters long!',
      );
    } else {
      setConfirmPasswordError(''); // Clear the error message
    }
  };
  const deviceType = Platform.OS === 'ios' ? 'iOS' : 'Android';
  const handleSubmit = async () => {
    const encryptedPassword = await encryptPassword(newpassword, secretKey);
    const trimmedEmail = email.trim();
    if (!isConnected || !isInternetReachable) {
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
      );
      return;
    }
    if (email.trim() === '') {
      setEmailError('Email is required!');
    } else if (!validateEmail(email)) {
      setEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address!',
      );
    } else if (password.trim() === '') {
      setPasswordError('Password is required!');
    } else {
      Keyboard.dismiss();
      setIsLoading(true);
      let data = {
        email: trimmedEmail,
        password: password,
        device_id: deviceId,
        device_os_type: deviceType,
        fcm_token: Fcm_token,
      };
      setIsLoading(true);
      let res = await dispatch(loginApiActionCreator(data));
      setIsLoading(false);
      if (res === 401) {
        setIsLoading(false);
        setPasswordError(
          'Hmm, it seems like the credentials you entered are invalid. Please try again!',
        );
      } else if (res?.LoginStatuscode == 6) {
        props.navigation.navigate('SignUpSteps', {
          email: trimmedEmail,
          user_key: res?.User_key,
          password: encryptedPassword,
        });
      } else if (res?.data?.code === 2) {
        Alert.alert('Account suspension', res?.data?.message, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Activate account',
            onPress: () => {
              console.log('activate account');
              handleActivateAccount();
            },
          },
        ]);
      } else if (res?.data?.success == 'true') {
        setIsLoading(false);
        if (res.data.code == 6) {
          alert(res.data.message);
          props.navigation.navigate('SignUpSteps', {
            email: trimmedEmail,
            user_key: res?.User_key,
            password: encryptedPassword,
          });
        } else if (res.data.code == 9) {
          alert(res.data.message);
        } else {
          props.navigation.navigate('DrawerNavigatorLeftMenu');
        }
        setEmail('');
        setPassword('');
      } else {
        setIsLoading(false);
        setPasswordError(
          'Hmm, it seems like the credentials you entered are invalid. Please try again!',
        );
      }
    }
  };
  const handleverificationCode = text => {
    const regex = /^[0-9]+$/;
    setVerificationcode(text);
    if (text.trim() === '') {
      setVerificationcodeError('Verification code is required!');
    } else if (!regex.test(text)) {
      setVerificationcodeError('Verification code must contain only numbers!');
    } else {
      setVerificationcodeError('');
    }
  };
  const send_verification_code = async () => {
    const trimmedEmail = resetEmail.trim();
    setIsLoading(true);
    const sendVerificationPayload = {
      email: trimmedEmail,
      device_id: deviceId,
      device_os_type: deviceType,
    };
    sendVerificationService(sendVerificationPayload)
      .then(response => {
        if (response?.code === 22) {
          if (isClick === 1) {
            Alert.alert('Success', 'OTP resent successfully.');
          } else {
            Alert.alert('Success', 'OTP sent successfully.');
          }
          if (isClick === 1) {
            setIsTimeron(true);
            setIsClick(1);
            setVerificationcode('');
          } else {
            setIsClick(isClick + 1);
          }
        } else {
          alert(response?.message);
        }
      })
      .catch(error => {
        Alert.alert('Warning', error.message);
        if (error?.response?.status === 500) {
          Alert.alert(
            'Warning',
            'Failed to send OTP via email. Please try again later.',
          );
        } else {
        }
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const verify_Otp = () => {
    const trimmedEmail = resetEmail.trim();
    const verifyOtpPayload = {
      email: trimmedEmail,
      otp: verificationcode,
      device_id: deviceId,
      device_os_type: deviceType,
    };
    setIsLoading(true);
    verifyOtpServices(verifyOtpPayload)
      .then(response => {
        if (response?.data?.success === true) {
          Alert.alert('Success', response?.data?.message);
          setIsClick(isClick + 1);
        } else if (verificationcode.length < 6) {
          setVerificationcodeError(
            'Verification code must be at least 6 digits!',
          );
        } else {
          setVerificationcodeError(
            'The Verification Code You’ve Entered is Incorrect. Please Try Again!',
          );
        }
      })
      .catch(error => {
        if (error?.response && error?.response?.status === 404) {
          setVerificationcodeError('The verification code is incorrect!');
        } else if (error?.response && error?.response?.status === 401) {
          alert(error?.response?.message || 'User Unauthorized');
        } else {
          alert('An error occurred. Please try again later!');
        }
        console.error('signup Verification error:', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const secretKey = 'XkhZG4fW2t2W';
  const encryptPassword = (password, secretKey) => {
    return new Promise((resolve, reject) => {
      try {
        const key = secretKey;
        const keyutf = CryptoJS.enc.Utf8.parse(key);
        const iv = CryptoJS.enc.Utf8.parse('XkhZG4fW2t2W');
        const enc = CryptoJS.AES.encrypt(password, keyutf, { iv: iv });
        const encStr = enc.toString();
        console.log('Encrypted Password:', encStr);
        resolve(encStr);
      } catch (error) {
        reject(error);
      }
    });
  };
  const handleLoginPassword = text => {
    setPassword(text);
    if (text.trim() === '') {
      setPasswordError('Password is required!');
    } else {
      setPasswordError('');
    }
  };
  const create_password = async () => {
    try {
      const encryptedPassword = await encryptPassword(newpassword, secretKey);
      const trimmedEmail = resetEmail.trim();
      const confirmPassWordPayload = {
        email: trimmedEmail,
        password: encryptedPassword,
      };
      setIsLoading(true);
      const response = await confirmPasswordServices(confirmPassWordPayload);
      if (response?.data?.success === true) {
        if (response?.data?.code == 21) {
          Alert.alert('Warning', response?.data?.message);
        } else {
          openSheetWithHeight(450);
          Alert.alert('Success', response?.data?.message);
          setIsClick(isClick + 1);
        }
      } else {
        Alert.alert('Warning', 'Password not created.');
      }
    } catch (error) {
      alert(error?.message || 'An error occurred during the API call');
    } finally {
      setIsLoading(false);
    }
  };
  const openSheetWithHeight = height => {
    setIsSusscessPasswordScreen(height);
    refRBSheet.current.open();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: _COLORS?.Kodie_WhiteColor }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'undefined' : 'undefined'}
        style={LoginStyles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <StatusBar
          backgroundColor={_COLORS.Kodie_WhiteColor}
          barStyle={'dark-content'}
        />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={LoginStyles.logoContainer}>
            <Image source={logos.mainLogo} style={LoginStyles.logo} />
          </View>
          <View style={LoginStyles.formContainer}>
            <Text style={LoginStyles.title}>Login</Text>
            <View style={LoginStyles.card}>
              <View style={[LoginStyles.inputContainer]}>
                <Text style={LABEL_STYLES._texinputLabel}>Email</Text>
                <TextInput
                  style={[
                    LoginStyles.input,
                    {
                      borderColor: emailError
                        ? _COLORS.Kodie_lightRedColor
                        : _COLORS.Kodie_GrayColor,
                    },
                  ]}
                  value={email}
                  onChangeText={setEmail}
                  onBlur={() => handleEmailChange(email)}
                  placeholder="Your email address"
                  placeholderTextColor="#999"
                  autoCapitalize={'none'}
                  textContentType="oneTimeCode"
                />
                {emailError ? (
                  <Text style={LoginStyles.error_text}>{emailError}</Text>
                ) : null}
              </View>
              <View style={[LoginStyles.inputContainer]}>
                <Text style={LABEL_STYLES._texinputLabel}> Password</Text>
                <View
                  style={[
                    LoginStyles.passwordContainer,
                    {
                      borderColor: passwordError
                        ? _COLORS.Kodie_lightRedColor
                        : _COLORS.Kodie_GrayColor,
                    },
                  ]}>
                  <TextInput
                    style={[
                      LoginStyles.passwordInput,
                      {
                        borderColor: passwordError
                          ? _COLORS.Kodie_lightRedColor
                          : _COLORS.Kodie_GrayColor,
                      },
                    ]}
                    value={password}
                    onChangeText={setPassword}
                    onBlur={() => handleLoginPassword(password)}
                    placeholder="Enter password"
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
                      style={LoginStyles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text style={LoginStyles.error_text}>{passwordError}</Text>
                ) : null}
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    openSheetWithHeight(550);
                    refRBSheet.current.open();
                    setIsClick(0);
                    setResetEmail('');
                    setVerificationcode('');
                    setVerificationcodeError('');
                    setNewPassword('');
                    setPasswordError('');
                    setConfirmPassword('');
                    setConfirmPasswordError('');
                    setResetEmailError('');
                  }}
                  style={{ flex: 0.5 }}>
                  <Text style={LoginStyles.forgot}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={{ flex: 0.9 }} />
              </View>

              <CustomSingleButton
                disabled={isLoading ? true : false}
                onPress={isConnected ? handleSubmit : null}
                _ButtonText={'Login'}
                Text_Color={_COLORS.Kodie_WhiteColor}
                marginTop={20}
                testID={'xyz123'}
              />
              <DividerIcon
                DeviderText={'or'}
                style={{ marginTop: 32, marginBottom: 30 }}
              />
              <CustomSingleButton
                disabled={isLoading ? true : false}
                onPress={() => {
                  signIn();
                }}
                leftImage={IMAGES.GoogleIcon}
                isLeftImage={true}
                _ButtonText={'Login with Google'}
                backgroundColor={_COLORS.Kodie_WhiteColor}
                marginBottom={25}
              />
              <BottomTextsButton
                _LeftButtonText={"Don't have an account yet? "}
                _RightButtonText={'Sign up'}
                onPress={() => {
                  props.navigation.navigate('SignUp');
                }}
              />
            </View>
          </View>
        </ScrollView>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={IsSusscessPasswordScreen}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: LoginStyles.bottomModal_container,
          }}>
          <View style={LoginStyles.ModalMainView}>
            <Text style={LoginStyles.Modaltitle}>Reset password</Text>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close();
                setIsSusscessPasswordScreen(550);
                setIsClick(0);
                setResetEmail('');
                setVerificationcode('');
                setVerificationcodeError('');
                setNewPassword('');
                setPasswordError('');
                setConfirmPassword('');
                setConfirmPasswordError('');
                setResetEmailError('');
              }}>
              <Entypo
                name="cross"
                size={20}
                color={_COLORS.Kodie_BlackColor}
                style={LoginStyles.crossIconStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={LoginStyles.card}>
            {isClick === 0 && (
              <>
                <View style={LoginStyles.inputContainer}>
                  <Text style={LABEL_STYLES._texinputLabel}>
                    Enter your email address
                  </Text>
                  <TextInput
                    style={[
                      LoginStyles.input,
                      {
                        borderColor: resetEmailError
                          ? _COLORS.Kodie_lightRedColor
                          : _COLORS.Kodie_GrayColor,
                      },
                    ]}
                    value={resetEmail}
                    onChangeText={setResetEmail}
                    onBlur={() => handleResetEmailChange(resetEmail)}
                    placeholder="Your email address"
                    placeholderTextColor="#999"
                    textContentType="oneTimeCode"
                    autoCapitalize={'none'}
                    editable={isLoading ? false : true}
                  />
                  {resetEmailError ? (
                    <Text style={LoginStyles.error_text}>
                      {resetEmailError}
                    </Text>
                  ) : null}
                </View>
              </>
            )}
            {isClick === 1 && (
              <>
                <View style={[LoginStyles.inputContainer, { marginBottom: 25 }]}>
                  <Text style={LABEL_STYLES._texinputLabel}>Email</Text>
                  <TextInput
                    style={[
                      LoginStyles.input,
                      { backgroundColor: _COLORS?.Kodie_LightGrayLineColor },
                    ]}
                    value={resetEmail}
                    placeholder="Your Email Address"
                    placeholderTextColor="#999"
                    editable={false}
                    keyboardType={'email-address'}
                    textContentType="oneTimeCode"
                  />
                </View>
                <View style={LoginStyles.varifycode}>
                  <View style={{ flex: 1 }}>
                    <Text style={LABEL_STYLES._texinputLabel}>
                      Verification code
                    </Text>
                    <TextInput
                      style={[
                        LoginStyles.input,
                        {
                          borderColor: verificationcodeError
                            ? _COLORS.Kodie_lightRedColor
                            : _COLORS.Kodie_GrayColor,
                        },
                      ]}
                      value={verificationcode}
                      onChangeText={handleverificationCode}
                      onBlur={() => handleverificationCode(verificationcode)}
                      placeholder="Code"
                      returnKeyType="done"
                      placeholderTextColor="#999"
                      keyboardType="number-pad"
                      maxLength={6}
                    />
                  </View>
                  <View style={LoginStyles.codeMargin} />

                  <TouchableOpacity
                    onPress={() => {
                      if (!isTimeron) {
                        setIsTimeron(true);
                        send_verification_code();
                      }
                    }}
                    style={LoginStyles.getButtonView}
                    disabled={isTimeron} // Disable the button when the timer is active
                  >
                    {isTimeron ? (
                      <CountdownCircleTimer
                        isPlaying
                        trailColor={_COLORS.Kodie_lightGreenColor}
                        duration={50}
                        size={45}
                        colors={_COLORS.Kodie_lightGreenColor}
                        onComplete={() => {
                          setIsTimeron(false); // Reset timer state
                          return [false]; // Stop the timer
                        }}>
                        {({ remainingTime }) => (
                          <Text
                            style={{
                              color: _COLORS.Kodie_WhiteColor,
                              fontSize: 14,
                              fontFamily: FONTFAMILY.K_Bold,
                            }}>
                            {remainingTime}s
                          </Text>
                        )}
                      </CountdownCircleTimer>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          if (!isTimeron) {
                            setIsTimeron(true);
                            send_verification_code();
                          }
                        }}
                        disabled={isTimeron}>
                        <Text style={LoginStyles.getButton}>{'Resend'}</Text>
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                </View>
                {verificationcodeError ? (
                  <Text style={LoginStyles.error_text}>
                    {verificationcodeError}
                  </Text>
                ) : null}
              </>
            )}
            {isClick === 2 && (
              <ScrollView
                contentContainerStyle={{ marginBottom: 90 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <View style={[LoginStyles.inputContainer, { marginBottom: 25 }]}>
                  <Text
                    style={[
                      LABEL_STYLES._texinputLabel,
                      LoginStyles.cardHeight,
                    ]}>
                    New password
                  </Text>
                  <View
                    style={[
                      LoginStyles.passwordContainer,
                      {
                        borderColor: newpasswordError
                          ? _COLORS.Kodie_lightRedColor
                          : _COLORS.Kodie_GrayColor,
                      },
                    ]}>
                    <TextInput
                      style={LoginStyles.passwordInput}
                      value={newpassword}
                      onChangeText={handleNewPassword}
                      onBlur={() => handleNewPassword(newpassword)}
                      placeholder=" Enter new password"
                      placeholderTextColor="#999"
                      secureTextEntry={!showNewPassword}
                    />
                    <TouchableOpacity onPress={handleToggleNewPassword}>
                      <MaterialCommunityIcons
                        name={
                          showNewPassword ? 'eye-outline' : 'eye-off-outline'
                        }
                        size={20}
                        color={_COLORS.Kodie_BlackColor}
                        style={LoginStyles.eyeIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  {newpasswordError ? (
                    <Text style={LoginStyles.error_text}>
                      {newpasswordError}
                    </Text>
                  ) : null}
                </View>
                <View style={LoginStyles.inputContainer}>
                  <Text
                    style={[
                      LABEL_STYLES._texinputLabel,
                      LoginStyles.cardHeight,
                    ]}>
                    Confirm password
                  </Text>
                  <View
                    style={[
                      LoginStyles.passwordContainer,
                      {
                        borderColor: confirmPasswordError
                          ? _COLORS.Kodie_lightRedColor
                          : _COLORS.Kodie_GrayColor,
                      },
                    ]}>
                    <TextInput
                      style={LoginStyles.passwordInput}
                      value={confirmPassword}
                      onChangeText={handleConfirmpassword}
                      onBlur={() => handleConfirmpassword(confirmPassword)}
                      placeholder=" Enter confirm password"
                      placeholderTextColor="#999"
                      secureTextEntry={!showResetPassword}
                    />
                    <TouchableOpacity onPress={handleToggleResetPassword}>
                      <MaterialCommunityIcons
                        name={
                          showResetPassword ? 'eye-outline' : 'eye-off-outline'
                        }
                        size={20}
                        color={_COLORS.Kodie_BlackColor}
                        style={LoginStyles.eyeIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  {confirmPasswordError ? (
                    <Text style={LoginStyles.error_text}>
                      {confirmPasswordError}
                    </Text>
                  ) : null}
                </View>
              </ScrollView>
            )}
            {isClick === 3 && (
              <>
                <View style={LoginStyles.inputContainer}>
                  <Text
                    style={[
                      LABEL_STYLES._texinputLabel,
                      LoginStyles.passchange,
                    ]}>
                    {'Password successfully updated'}
                  </Text>
                  <Image
                    source={IMAGES.CheckIcon}
                    style={LoginStyles.checkicon}
                    resizeMode={'contain'}
                  />
                </View>
              </>
            )}
            {isLoading && (
              <View style={LoginStyles.secondloder}>
                <ActivityIndicator size={30} color={_COLORS.Kodie_BlackColor} />
              </View>
            )}
          </View>
          <View
            style={[
              {
                width: '100%',
                position: 'absolute',
                bottom: 0,
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <CustomSingleButton
              disabled={isLoading ? true : false}
              onPress={handleButtonPress}
              _ButtonText={buttonLabels[isClick]}
              Text_Color={_COLORS.Kodie_WhiteColor}
              marginBottom={30}
            />
          </View>
        </RBSheet>
        {isLoading ? <CommonLoader /> : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
