import React, {useState, useEffect} from 'react';
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
  Linking,
  Keyboard,
} from 'react-native';
import {BANNERS} from '../../../Themes/CommonVectors/Images';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import BottomTextsButton from '../../../components/Molecules/BottomTextsButton/BottomTextsButton';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import {IMAGES, _COLORS} from '../../../Themes/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {LABEL_STYLES} from '../../../Themes/CommonStyles/CommonStyles';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import messaging from '@react-native-firebase/messaging';
import {
  encryptPassword,
  signup,
} from '../../../services/Authentication/Authentication';
import {SignUpStyles} from './SignUpStyle';
import DeviceInfo from 'react-native-device-info';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const SignUp = props => {
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

  const device = DeviceInfo.getUniqueId();
  const deviceId = device?._z;
  // const deviceType = DeviceInfo.getDeviceType();
  const deviceType = Platform.OS === 'ios' ? 'iOS' : 'Android';
  console.log(deviceId, deviceType, 'signup');
  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  useEffect(() => {
    requestUserPermission();
    handlemessage();
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
      console.log('userInfo....', userInfo);
      setGoogleSignIn(userInfo);
    } catch (error) {
      console.log('Error during signIn:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.log('Error occurred:', error.message);
        console.log('Error stack trace:', error.stack);
        console.log('Full error object:', error);
      }
    }
  };
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getTocken();
    }
  }
  const handlemessage = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
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
            'Notification caused app to open from quit state.',
            remoteMessage.notification,
          );
        }
      });
  };

  const getTocken = async () => {
    const token = await messaging().getToken();
    setFcm_token(token);
  };

  const validateSignUpEmail = email => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(email.trim());
  };

  const handleSignUpEmail = text => {
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

  const handleSignUpPassword = text => {
    setPassword(text);
    if (text.trim() === '') {
      setPasswordError('Password is required!');
    } else if (text.length < 8) {
      setPasswordError(
        'Oh no. The password must be at least 8 characters long!',
      );
    } else {
      setPasswordError('');
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
    } else if (password.trim() === '') {
      setPasswordError('Password is required!');
    } else if (password.length < 8) {
      setPasswordError(
        'Oh no. The password must be at least 8 characters long!',
      );
    } else if (!term && !privacy) {
      Alert.alert(
        'Warning',
        'Please read and accept both Terms & Conditions and Privacy Policy!',
      );
    } else if (!term) {
      Alert.alert('Warning', 'Please read and accept Terms & Conditions!');
    } else if (!privacy) {
      Alert.alert('Warning', 'Please read and accept our Privacy Policy!');
    } else {
      handleSignup();
    }
  };
  const handleSignup = async () => {
    setIsLoading(true);
    const trimmedEmail = email.trim();
    try {
      const encStr = await encryptPassword(password);
      const SignUpData = {
        email: trimmedEmail,
        password: encStr,
        is_term_condition: term,
        is_privacy_policy: privacy,
        fcm_token: Fcm_token,
        device_id: deviceId,
        device_os_type: deviceType,
      };
      console.log(SignUpData);
      const response = await signup(SignUpData);
      if (response?.code === 3) {
        Alert.alert('Success', response?.message);
        props.navigation.navigate('SignUpVerification', {
          email: trimmedEmail,
          password: encStr,
          is_term_condition: term,
          is_privacy_policy: privacy,
          user_key: response?.User_Key,
        });
      } else if (response?.code === 1) {
        Alert.alert('Success', response?.message);
        // setEmail('');
        // setPassword('');
        // setTerm(false);
        // setPrivacy(false);
        props.navigation.navigate('SignUpVerification', {
          email: trimmedEmail,
          password: encStr,
          is_term_condition: term,
          is_privacy_policy: privacy,
          user_key: response?.User_Key,
        });
      } else if (response?.code === 2) {
        Alert.alert('Success', response?.message);
        props.navigation.navigate('LoginScreen');
      } else if (response?.code === 0) {
        Alert.alert('Success', response?.message);
        props.navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Error!', response?.message);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        Alert.alert(
          'Warning!',
          'Failed to send OTP via email. Please try again later.',
        );
      } else if (error.response?.status === 401) {
        Alert.alert('Warning!', 'Your Password is Wrong.');
      } else {
        Alert.alert('An error occurred. Please try again later.');
      }
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: _COLORS?.Kodie_WhiteColor}}>
      <KeyboardAvoidingView
        style={SignUpStyles.container}
        behavior={Platform.OS === 'ios' ? 'undefined' : 'undefined'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View style={SignUpStyles.logoContainer}>
            <Image
              source={BANNERS.BannerFirst}
              style={SignUpStyles.logo}
              resizeMode="contain"
            />
          </View>
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
              <Text style={LABEL_STYLES._texinputLabel}>
                Email address
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
                textContentType="oneTimeCode"
              />
              {emailError ? (
                <Text style={SignUpStyles.error_text}>{emailError}</Text>
              ) : null}
            </View>

            <View style={SignUpStyles.inputContainer}>
              <Text
                style={[LABEL_STYLES._texinputLabel, SignUpStyles.cardHeight]}>
                Password<Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
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
                  onChangeText={handleSignUpPassword}
                  onBlur={() => handleSignUpPassword(password)}
                  placeholder="Enter your password"
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
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://kodie.com.au/privacy-policy/');
                  }}>
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
              _ButtonText={'Sign up now'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              onPress={handleSubmit}
            />
            {/* <DividerIcon
              DeviderText={'or'}
              style={{
                marginTop: 32,
                //  marginBottom: 30
              }}
            /> */}

            {/*.............. signup option field here ..................*/}
            {/* <CustomSingleButton
              leftImage={IMAGES.GoogleIcon}
              isLeftImage={true}
              _ButtonText={'Sign up with Google'}
              backgroundColor={_COLORS.Kodie_WhiteColor}
              disabled={isLoading ? true : false}
              onPress={() => {
                // Alert.alert('Sign with Google', 'Coming soon');
                signIn();
              }}
            />
            <View style={{marginTop: 30}}>
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
            </View> */}
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
      </KeyboardAvoidingView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
export default SignUp;
