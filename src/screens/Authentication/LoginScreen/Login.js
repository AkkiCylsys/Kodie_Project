// Screen 2,3,4,5,6
import React, {useState, useRef, useEffect} from 'react';
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
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Alert,
  StatusBar,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {userSubscribedCreator} from '../../../redux/Actions/Subscription/SubscriptionApiCreator';
import {logos} from '../../../Themes/CommonVectors/Images';
import {LoginStyles} from './LoginCss';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import BottomTextsButton from './../../../components/Molecules/BottomTextsButton/BottomTextsButton';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  FONTFAMILY,
  LABEL_STYLES,
  IMAGES,
  _COLORS,
} from './../../../Themes/index';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLoginSuccess} from '../../../redux/Actions/Authentication/AuthenticationApiAction';
import axios from 'axios';
import {Config} from '../../../Config';
import DeviceInfo from 'react-native-device-info';
// import CryptoJS from "crypto-js";
import CryptoJS from 'react-native-crypto-js';
import messaging from '@react-native-firebase/messaging';
// import {NavigationActions, StackActions} from 'react-navigation';
import {loginApiActionCreator} from '../../../redux/Actions/Authentication/AuthenticationApiCreator';
import Geolocation from '@react-native-community/geolocation';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import RNSettings from 'react-native-settings';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
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
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const refRBSheet = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isTimeron, setIsTimeron] = useState(true);
  const [loginResponse, setLoginResponse] = useState(true);
  const deviceId = DeviceInfo.getDeviceId();
  const deviceType = DeviceInfo.getDeviceType();
  const [Fcm_token, setFcm_token] = useState('');
  const [googleSignIn, setGoogleSignIn] = useState([]);

  // Login with google here ......

  useEffect(() => {
    handlemessage();
    requestUserPermission();
    const configureGoogleSignIn = () => {
      GoogleSignin.configure({
        webClientId:
          '1095041111738-v9tqbtu67e7lmgnb76tasn23hki8u2b3.apps.googleusercontent.com',
      });
    };
    configureGoogleSignIn();
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo....', userInfo);
      setGoogleSignIn(userInfo);
    } catch (error) {
      console.log('Error during signIn:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('SIGN_IN_CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        // some other error happened
        console.log('Error occurred:', error.message);
        console.log('Error stack trace:', error.stack);
        console.log('Full error object:', error);
      }
    }
  };
 const onFacebookButtonPress=async() =>{
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  const fetchCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('you are here.');
        const {latitude, longitude} = position.coords;
        console.log('position.coords in map components....', position.coords);
        // setlatitude(latitude);
        // setLat(latitude);
        // setLong(longitude);
        setIsLoading(false);
        // setlongitude(longitude);
        // animateToCoordinate(latitude, longitude)
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  const checkpermissionlocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).then(
          result => {
            if (result === RNSettings.ENABLED) {
              console.log('location is enabled');
            }
          },
        );
        fetchCurrentLocation();
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const CheckIOSMapPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            fetchCurrentLocation();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  console.log('Device ID:', deviceId);
  console.log('Device type:', deviceType);
  // const Login_response = useSelector(
  //   (state) => state?.authenticationReducer?.data
  // );
  // console.log("Login_response.....", Login_response);
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

  // Activate account Api  ...
  const handleActivateAccount = async () => {
    const url = Config.BASE_URL;
    const activateAccount = url + 'sendMail';
    console.log('Request URL:', activateAccount);
    setIsLoading(true);
    const activateAccount_Data = {
      email: email,
    };
    await axios
      .post(activateAccount, activateAccount_Data)
      .then(response => {
        console.log('API Response activateAccount..', response?.data);
        if (response?.data?.success === true) {
          alert(response?.data?.message);
        } else {
          setIsLoading(false);
          alert(response?.data?.message);
        }
      })
      .catch(error => {
        console.error('API failed activateAccount', error);
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

  // Reset validation email..
  const handleforgetValidation = () => {
    if (resetEmail.trim() === '') {
      setResetEmailError('Email is required!');
    } else if (!validateResetEmail(resetEmail)) {
      setResetEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      send_verification_code();
    }
  };

  //... Regex login email validation
  const validateResetEmail = resetEmail => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(resetEmail);
  };

  //... inner reset password email variable define here
  const handleResetEmailChange = text => {
    setResetEmail(text);
    if (text.trim() === '') {
      setResetEmailError('Email is required!');
    } else if (!validateResetEmail(text)) {
      setResetEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      setResetEmailError('');
    }
  };

  //... inner reset password varification_Code variable define here
  const handleverificationcodes = () => {
    if (verificationcode.trim() === '') {
      setVerificationcodeError('Verification code is required!');
    } else {
      verify_Otp();
    }
  };

  //... inner reset password Password_Check variable define here
  const handleResetpasswordCheck = () => {
    if (newpassword.trim() === '') {
      setNewPasswordError('Please enter a new password');
    } else if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Please enter a confirmation password');
    } else if (newpassword !== confirmPassword) {
      setConfirmPasswordError('Password do not match');
    } else {
      setConfirmPasswordError('');
      create_password();
    }
  };

  //... inner reset password Next Button code define here
  const handleButtonPress = () => {
    if (isClick === 3) {
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
  //... inner reset password rejex variable define here
  const validateEmail = email => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(email);
  };

  //... inner  email variable define here
  const handleEmailChange = text => {
    setEmail(text);
    if (text.trim() === '') {
      setEmailError('Email is required!');
    } else if (!validateEmail(text)) {
      setEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      setEmailError('');
    }
  };

  //... inner reset password password variable define here
  const handlePasswordChange = text => {
    setPassword(text);
    if (text.trim() === '') {
      setPasswordError('Password is required!.');
    } else {
      setPasswordError('');
    }
  };

  //... inner reset password new password variable define here
  const handleNewPassword = text => {
    setNewPassword(text);
    if (text.trim() === '') {
      setNewPasswordError('New password is required.');
    } else {
      setNewPasswordError('');
    }
  };

  //... inner reset password confirm password variable define here
  const handleConfirmpassword = text => {
    setConfirmPassword(text);
    if (text.trim() === '') {
      setConfirmPasswordError('Please enter a confirmation password.');
    } else if (newpassword !== text) {
      setConfirmPasswordError('Password do not match.');
    } else {
      setConfirmPasswordError(''); // Clear the error message
    }
  };

  //... inner reset password submit button variable define here
  const handleSubmit = async () => {
    if (email.trim() === '') {
      setEmailError('Email is required!');
    } else if (!validateEmail(email)) {
      setEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else if (password.trim() === '') {
      setPasswordError('Password is required!.');
    } else {
      Keyboard.dismiss();
      setIsLoading(true);
      let data = {
        email: email,
        password: password,
        device_id: deviceId,
        device_os_type: deviceType,
        fcm_token: Fcm_token,
      };
      setIsLoading(true);
      let res = await dispatch(loginApiActionCreator(data));
      /// alert(JSON.stringify(res));
      setIsLoading(false);
      if (res === 401) {
        setIsLoading(false);
        setPasswordError(
          'Hmm, it seems like the credentials you entered are invalid. Please try again.',
        );
      } else if (res?.LoginStatuscode == 6) {
        props.navigation.navigate('SignUpSteps', {
          email: email,
          user_key: res?.User_key,
        });
      } else if (res?.data?.code === 2) {
        // Alert.alert('Account suspension', res?.data?.message);
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
        //  alert("Login successful");
        setIsLoading(false);
        if (res.data.code == 6) {
          alert(res.data.message);
          props.navigation.navigate('SignUpSteps', {
            email: email,
            user_key: res?.User_key,
          });
        } else if(res.data.code == 9){
          alert(res.data.message);

        } else {
           props.navigation.navigate('DrawerNavigatorLeftMenu');

        }

        // alert(JSON.stringify(res))
        setEmail('');
        setPassword('');
      } else {
        setIsLoading(false);
        setPasswordError(
          'Hmm, it seems like the credentials you entered are invalid. Please try again.',
        );
      }
      // }
    }
    // Keyboard.dismiss();
  };

  //...  verification variable define here
  const handleverificationCode = text => {
    const regex = /^[0-9]+$/;
    setVerificationcode(text);
    if (text.trim() === '') {
      setVerificationcodeError('Verification code is required!.');
    } else if (!regex.test(text)) {
      setVerificationcodeError('Verification code must contain only numbers.');
    } else {
      setVerificationcodeError('');
    }
  };

  //send_verification_code Api code here....
  const send_verification_code = () => {
    const url = Config.BASE_URL;
    // const verification_code_url = url + "user_reset_password_email_verify";

    // const url = "https://e3.cylsys.com/api/v1/SendOTP";
    const verification_code_url = url + 'SendOTP';
    console.log('Request URL:', verification_code_url);
    setIsLoading(true);
    axios
      .post(verification_code_url, {
        email: resetEmail,
      })
      .then(response => {
        console.log('API Response send otp:', response?.data);
        // if (response?.data?.status === true)
        if (response?.data?.message === 'OTP sent successfully') {
          alert(
            response?.data?.message || 'The otp has been sent to your email.',
          );
          if (isClick === 1) {
            setIsTimeron(true);
            setIsClick(1);
            setVerificationcode('');
            setIsTimeron(true);
          } else {
            setIsClick(isClick + 1);
          }
        } else {
          alert(response?.data?.message);
        }
      })
      .catch(error => {
        if (error?.response || error?.response?.status === 400) {
          alert('Failed to send OTP via email. Please try again later.');
        } else {
          // alert('An error occurred. Please try again later.');
        }
        console.error('sendotp error:', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //verify_otp Api code here.....
  const verify_Otp = () => {
    const url = Config.BASE_URL;
    // const verify_Otp_url = url + "user_signup_verifyotp";
    // const url = "https://e3.cylsys.com/api/v1/verifyotp";
    const verify_Otp_url = url + 'verifyotp';
    console.log('Request URL:', verify_Otp_url);
    setIsLoading(true);
    axios
      .post(verify_Otp_url, {
        email: resetEmail,
        otp: verificationcode,
      })
      .then(response => {
        console.log('API Response verify otp:', response?.data);
        if (response?.data?.success === true) {
          alert(response?.data?.message);
          setIsClick(isClick + 1);
        } else if (verificationcode.length < 6) {
          setVerificationcodeError(
            'Verification code must be at least 6 digits.',
          );
        } else {
          setVerificationcodeError(
            'The Verification Code You’ve Entered is Incorrect. Please Try Again.',
          );
        }
      })
      .catch(error => {
        if (error?.response && error?.response?.status === 404) {
          alert('Incorrect OTP. Please try again.');
        } else if (error?.response && error?.response?.status === 401) {
          alert(error?.response?.message || 'User Unauthorized');
        } else {
          alert('An error occurred. Please try again later.');
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
        const enc = CryptoJS.AES.encrypt(password, keyutf, {iv: iv});
        const encStr = enc.toString();
        console.log('Encrypted Password:', encStr);
        resolve(encStr);
      } catch (error) {
        reject(error);
      }
    });
  };
  //...... password validation define here
  const handleLoginPassword = text => {
    setPassword(text);
    if (text.trim() === '') {
      setPasswordError('Password is required!');
    } else {
      setPasswordError('');
    }
  };
  //------ create_password Api code here
  const create_password = async () => {
    try {
      const encryptedPassword = await encryptPassword(newpassword, secretKey);
      console.log('encryptedPassword', encryptedPassword);
      const url = Config.BASE_URL;
      // const url = "https://e3.cylsys.com/api/v1/forgetpassword";
      const create_password_url = url + 'forgetpassword';
      console.log('Request URL:', create_password_url);

      setIsLoading(true);

      const response = await axios.post(create_password_url, {
        email: resetEmail,
        password: encryptedPassword,
      });

      console.log('API Response create_password:', response?.data);

      if (response?.data?.success === true) {
        if (
          response?.data?.message ==
          'Try again with a password you haven’t used before'
        ) {
          alert(response?.data?.message);
        } else {
          alert(response?.data?.message);
          setIsClick(isClick + 1);
        }
      } else {
        alert('Password not created.');
      }
    } catch (error) {
      // if (error.response && error.response.status == 500) {
      //   alert("Your password is old. Please enter new password.");
      // }
      console.error('API failed create_password', error);
      // Handle errors appropriately
      alert(error?.message || 'An error occurred during the API call');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={LoginStyles.container}>
      <StatusBar
        backgroundColor={_COLORS.Kodie_WhiteColor}
        barStyle={'dark-content'}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={LoginStyles.logoContainer}>
          <Image source={logos.mainLogo} style={LoginStyles.logo} />
        </View>
        {/* ------ login code start  here ........... */}
        <View style={LoginStyles.formContainer}>
          <Text style={LoginStyles.title}>Login</Text>
          <View style={LoginStyles.card}>
            <View style={LoginStyles.inputContainer}>
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
                maxLength={30}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
              />
            </View>
            {emailError ? (
              <Text style={LoginStyles.error_text}>{emailError}</Text>
            ) : null}
            <View style={LoginStyles.inputContainer}>
              <Text style={LABEL_STYLES._texinputLabel}>Password</Text>
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
                    style={LoginStyles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {passwordError ? (
              <Text style={LoginStyles.error_text}>{passwordError}</Text>
            ) : null}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
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
                style={{flex: 0.5}}>
                <Text style={LoginStyles.forgot}>Forgot password?</Text>
              </TouchableOpacity>
              <View style={{flex: 0.9}} />
            </View>
            <CustomSingleButton
              disabled={isLoading ? true : false}
              onPress={handleSubmit}
              _ButtonText={'Login'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              marginTop={20}
            />
            {/* <View style={LoginStyles.loderview}></View> */}
            <DividerIcon
              DeviderText={'or'}
              style={{marginTop: 32, marginBottom: 30}}
            />
            <CustomSingleButton
              disabled={isLoading ? true : false}
              onPress={() => {
                // props.navigation.navigate("ContractorSignUpFirstScreen");
                // props.navigation.navigate("SignUpSteps");
                // props.navigation.navigate("Account");
                // Alert.alert('Login with Google', 'Coming soon');
                signIn();
              }}
              leftImage={IMAGES.GoogleIcon}
              isLeftImage={true}
              _ButtonText={'Login with Google'}
              backgroundColor={_COLORS.Kodie_WhiteColor}
            />
            <CustomSingleButton
              disabled={isLoading ? true : false}
              onPress={() =>
                // props.navigation.navigate("ManageSubscription")
                // props.navigation.navigate("DrawerNavigatorLeftMenu")
                Alert.alert('Login with Facebook', 'Coming soon')
                // onFacebookButtonPress()
              }
              leftImage={IMAGES.FacebookIcon}
              isLeftImage={true}
              _ButtonText={'Login with Facebook'}
              backgroundColor={_COLORS.Kodie_WhiteColor}
            />
            <BottomTextsButton
              _LeftButtonText={"Don't have an account yet? "}
              _RightButtonText={'Sign up'}
              onPress={() => {
                // props.navigation.navigate("SearchJobResult");
                props.navigation.navigate('SignUp');
              }}
            />
          </View>
        </View>
      </ScrollView>

      {/* ------ Rest password code start  here ........... */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={Platform.OS === 'android' ? 550 : 480}
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
          {/* ------ Reset passowrd 0 section start code  here ........... */}
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
                  maxLength={30}
                  autoCapitalize={'none'}
                />
              </View>
              {resetEmailError ? (
                <Text style={LoginStyles.error_text}>{resetEmailError}</Text>
              ) : null}
            </>
          )}

          {/* ------ Reset passowrd 1 section start code  here ........... */}
          {isClick === 1 && (
            <>
              <View style={LoginStyles.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>Email</Text>
                <TextInput
                  style={[
                    LoginStyles.input,
                    {backgroundColor: _COLORS?.Kodie_LightGrayLineColor},
                  ]}
                  value={resetEmail}
                  placeholder="Your Email Address"
                  placeholderTextColor="#999"
                  editable={false}
                  keyboardType={'email-address'}
                />
              </View>
              <View style={LoginStyles.varifycode}>
                <View style={[LoginStyles.inputContainer, {flex: 1}]}>
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

                <View style={LoginStyles.getButtonView}>
                  {isTimeron ? (
                    <CountdownCircleTimer
                      isPlaying
                      trailColor={_COLORS.Kodie_lightGreenColor}
                      duration={50}
                      size={45}
                      colors={_COLORS.Kodie_lightGreenColor}
                      onComplete={() => {
                        setIsTimeron(false);
                      }}>
                      {({remainingTime}) => (
                        <Text style={{color: _COLORS.Kodie_WhiteColor}}>
                          {remainingTime} S
                        </Text>
                      )}
                    </CountdownCircleTimer>
                  ) : (
                    <TouchableOpacity onPress={send_verification_code}>
                      <Text style={LoginStyles.getButton}>{'Resend'}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {verificationcodeError ? (
                <Text style={LoginStyles.error_text}>
                  {verificationcodeError}
                </Text>
              ) : null}
            </>
          )}

          {/* ------ Reset passowrd 2 section start code  here ........... */}
          {isClick === 2 && (
            <ScrollView
              contentContainerStyle={{marginBottom: 90}}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View style={LoginStyles.inputContainer}>
                <Text
                  style={[LABEL_STYLES._texinputLabel, LoginStyles.cardHeight]}>
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
                    placeholder=" Enter New Password"
                    placeholderTextColor="#999"
                    secureTextEntry={!showNewPassword}
                  />
                  <TouchableOpacity onPress={handleToggleNewPassword}>
                    <MaterialCommunityIcons
                      name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                      style={LoginStyles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
                {newpasswordError ? (
                  <Text style={LoginStyles.error_text}>{newpasswordError}</Text>
                ) : null}
              </View>
              <View style={LoginStyles.inputContainer}>
                <Text
                  style={[LABEL_STYLES._texinputLabel, LoginStyles.cardHeight]}>
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
                    placeholder=" Enter Confirm Password"
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

          {/* ------ Reset passowrd 3 section start code  here ........... */}
          {isClick === 3 && (
            <>
              <View style={LoginStyles.inputContainer}>
                <Text
                  style={[LABEL_STYLES._texinputLabel, LoginStyles.passchange]}>
                  Password successfully updated
                </Text>
                <Image
                  source={IMAGES.CheckIcon}
                  style={LoginStyles.checkicon}
                  resizeMode={'contain'}
                />
              </View>
              <CustomSingleButton
                _ButtonText={'Back to login'}
                Text_Color={_COLORS.Kodie_WhiteColor}
                onPress={() => refRBSheet.current.close()}
              />
            </>
          )}

          {/* ------ Loder section start code  here ........... */}
          {isLoading && (
            <View style={LoginStyles.secondloder}>
              <ActivityIndicator size={30} color={_COLORS.Kodie_BlackColor} />
            </View>
          )}

          {/* ------ Next button section start code  here ........... */}
          <View
            style={[
              {
                marginBottom: -150,
                marginTop:
                  isClick === 1 || isClick === 2 || isClick === 90 ? 10 : 180,
              },
            ]}>
            <CustomSingleButton
              disabled={isLoading ? true : false}
              onPress={handleButtonPress}
              _ButtonText={buttonLabels[isClick]}
              Text_Color={_COLORS.Kodie_WhiteColor}
            />
          </View>
        </View>
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </KeyboardAvoidingView>
  );
};
