import React, {useState, useEffect} from 'react';
//ScreenNo:8
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {SignUpVerificationStyle} from './SignUpVerificationStyle';
import TopHeader from '../../../components/Molecules/Header/Header';
import {_goBack} from '../../../services/CommonServices';
import {LABEL_STYLES, _COLORS} from '../../../Themes';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import axios from 'axios';
import {Config} from '../../../Config';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 6;
//ScreenNo:8
export default SignUpVerification = props => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  // const [isTimeron, setIsTimeron] = useState(true);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  let email = props?.route?.params?.email;
  let password = props?.route?.params?.password;
  let is_term_condition = props?.route?.params?.is_term_condition;
  let is_privacy_policy = props?.route?.params?.is_privacy_policy;
  let user_key = props?.route?.params?.user_key;
  console.log('email..........', password);
  // send_verification_code OTP  Api code here....
  const send_verification_code = () => {
    const url = Config.API_URL;
    // const sennd_verification_code_url = url + "user_signup";
    // const sennd_verification_code_url = "https://e3.cylsys.com/api/v1/register";
    // const sennd_verification_code_url =
    //   'https://kodieapis.cylsys.com/api/v1/register';
    const sennd_verification_code_url =
      'https://kodietestapi.cylsys.com/api/v1/register';
    console.log('Request URL:', sennd_verification_code_url);
    setIsLoading(true);
    axios
      .post(sennd_verification_code_url, {
        email: email,
        password: password,
        is_term_condition: is_term_condition,
        is_privacy_policy: is_privacy_policy,
        // otp: value,
      })
      .then(response => {
        console.log('API Response send otp:', response?.data);
        if (response?.data?.success === true) {
          alert(response?.data?.message);
          setVerificationCode('');
          setIsTimerActive(true);
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed verification_code', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handle_Signup_verification = () => {
    // const url = 'https://kodieapis.cylsys.com/api/v1/verifyotp';
    const url = 'https://kodietestapi.cylsys.com/api/v1/verifyotp';
    const sign_verification_Api = url;
    console.log('Request URL:', sign_verification_Api);
    const Signup_verification_Data = {
      email: email,
      otp: value,
    };
    setIsLoading(true);
    axios
      .post(sign_verification_Api, Signup_verification_Data)
      .then(response => {
        console.log('sign_verification_Api responce', response?.data);
        if (response?.data?.success === true) {
          alert(response?.data?.message);
          setValue('');
          props.navigation.navigate('SignUpSteps', {
            email: email,
            user_key: user_key,
            password:password
          });
          setIsLoading(false);
        } else {
          setValueError(response?.data?.message);
          setValue('');
          setIsLoading(false);
        }
      })
      .catch(error => {
        if (error?.response && error?.response?.status === 404) {
          Alert.alert("Warning!",'Incorrect OTP. Please try again.');
          setValue('');
        } else if (error?.response && error?.response?.status === 422) {
          Alert.alert("Warning!",'Time up. Please try again.');
          setValue('');
        } else {
          // alert('An error occurred. Please try again later.');
        }
        console.error('signup Verification error:', error);
        setIsLoading(false);
      });
  };

  const handleverification_code = text => {
    setValue(text);
    if (text.trim() === '') {
      setValueError('OTP is required!');
    } else {
      setValueError('');
    }
    // Reset the timer when the value changes
    // setIsTimerActive(true);
  };
  //.......... Handle button define here
  const handleSubmit = () => {
    const regex = /^[0-9]+$/;
    if (value.trim() === '') {
      setValueError('OTP is required!');
    } else if (value.trim().length < 6) {
      setValueError('incomplete OTP. Please enter a valid OTP.');
    } else if (!regex.test(value.trim())) {
      setValueError('Invalid OTP. Please enter only digits.');
    } else {
      handle_Signup_verification();
    }
  };
  const handlePaste = clipboard => {
    // Process the pasted value (clipboard) as needed
    setValue(clipboard);
  };

  return (
    <SafeAreaView style={SignUpVerificationStyle.mainContainer}>
      <TopHeader
        MiddleText={'Verify your email'}
        Text_Color={_COLORS.Kodie_BlackColor}
        onPressLeftButton={() => _goBack(props)}
      />
      <ScrollView
        style={SignUpVerificationStyle.container}
        showsVerticalScrollIndicator={false}>
        <Text style={SignUpVerificationStyle.checkEmail_Text}>
          {'Check your email'}
        </Text>
        <Text style={SignUpVerificationStyle.verify_Text}>
          {
            'Please confirm your account by entering the 6-digit verification  code sent to your email.'
          }
        </Text>

        <View style={SignUpVerificationStyle.otp_view}>
          <CodeField
            ref={ref}
            {...prop}
            value={value}
            onChangeText={setValue}
            onBlur={() => handleverification_code(value)}
            onPaste={clipboard => handlePaste(clipboard)}
            cellCount={CELL_COUNT}
            rootStyle={SignUpVerificationStyle.CodeField}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[
                  SignUpVerificationStyle.cell,
                  isFocused && SignUpVerificationStyle.focusCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        {valueError ? (
          <Text style={SignUpVerificationStyle.error_text}>{valueError}</Text>
        ) : null}
        <Text
          style={[
            LABEL_STYLES.commonMidtext,
            SignUpVerificationStyle.textcode,
          ]}>
          {'It may take a few minutes to receive your code. '}
        </Text>

        {/* resend otp or timer buton code here................ */}
        <View style={SignUpVerificationStyle.getBindButtonView}>
          <View style={SignUpVerificationStyle.getButtonView}>
            {/* {isLoading ? ( */}
            {/* <Text style={{color: _COLORS.Kodie_WhiteColor}}>Resend</Text> */}
            {/* ) : */}
            {isTimerActive ? (
              <CountdownCircleTimer
                isPlaying
                trailColor={_COLORS.Kodie_lightGreenColor}
                duration={50}
                size={45}
                colors={_COLORS.Kodie_lightGreenColor}
                onComplete={() => {
                  setIsTimerActive(false);
                }}>
                {({remainingTime}) => (
                  <Text style={{color: _COLORS.Kodie_WhiteColor}}>
                    {remainingTime} S
                  </Text>
                )}
              </CountdownCircleTimer>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  send_verification_code();
                  // setIsTimerActive(true); // Start the timer
                }}>
                <Text style={SignUpVerificationStyle.getButton}>
                  {'Resend'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={SignUpVerificationStyle.customBtn}>
          <CustomSingleButton
            // disabled={isLoading ? true : false}
            _ButtonText={'Verify email'}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={handleSubmit}
          />
        </View>
        <TouchableOpacity
          style={SignUpVerificationStyle.goBack_View}
          onPress={() => {
            props.navigation.navigate('SignUp');
          }}>
          <View style={SignUpVerificationStyle.backIcon}>
            <Ionicons
              name="chevron-back"
              size={22}
              color={_COLORS.Kodie_MediumGrayColor}
            />
          </View>
          <Text style={SignUpVerificationStyle.goBack_Text}>{'Go back'}</Text>
        </TouchableOpacity>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
