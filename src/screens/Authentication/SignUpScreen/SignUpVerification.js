//ScreenNo:8
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {SignUpVerificationStyle} from './SignUpVerificationStyle';
import TopHeader from '../../../components/Molecules/Header/Header';
import {_goBack} from '../../../services/CommonServices';
import {LABEL_STYLES, _COLORS} from '../../../Themes';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import DeviceInfo from 'react-native-device-info';

import {
  SignupVerification,
  signupSendCode,
} from '../../../services/Authentication/Authentication';
const CELL_COUNT = 6;
export default SignUpVerification = props => {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // const deviceId = DeviceInfo.getDeviceId();
  // const deviceType = DeviceInfo.getDeviceType();
  const device = DeviceInfo.getUniqueId();
  console.log(device);
  const deviceId = device?._z
  const deviceType = Platform.OS === 'ios' ? 'iOS' : 'Android';
  console.log(deviceId,deviceType,'Signup_verification');
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  let email = props?.route?.params?.email;
  let user_key = props?.route?.params?.user_key;
  let password = props?.route?.params?.password;
  const send_verification_code = async () => {
    setIsLoading(true);
    try {
      const SignUpData = {
        email: email,
        device_id:deviceId,
      device_os_type:deviceType
      };
      console.log("SignUpData in verfication ..",SignUpData)
      const response = await signupSendCode(SignUpData);
      // alert(response?.message); // as per manish discussion he said use static alert.
      alert('OTP resent successfully.');
      setIsTimerActive(true);
      setValue('');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handle_Signup_verification = () => {
    setIsLoading(true);
    const data = {
      email: email,
      otp: value,
      device_id:deviceId,
      device_os_type:deviceType
    };
    SignupVerification(data)
      .then(responseData => {
        console.log('sign_verification_Api response', responseData);
        if (responseData?.success === true) {
          Alert.alert('Success', responseData?.message);
          setValue('');
          props.navigation.navigate('SignUpSteps', {
            email: email,
            user_key: user_key,
            password: password,
          });
        } else {
          setValueError(responseData?.message);
          setValue('');
        }
      })
      .catch(error => {
        if (error?.response && error?.response?.status === 404) {
          setValueError('Incorrect OTP. Please try again!');
          setValue('');
        } else if (error?.response && error?.response?.status === 422) {
          Alert.alert('Warning!', 'Time up. Please try again!');
          setValue('');
        } else {
          console.log('error in verify...', error);
          setValueError('Incorrect OTP. Please try again!');
        }
        setValue('');
        console.error('signup Verification error:', error);
      })
      .finally(() => {
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
  };

  const handleSubmit = () => {
    const regex = /^[0-9]+$/;
    if (value.trim() === '') {
      setValueError('OTP is required!');
    } else if (value.trim().length < 6) {
      setValueError('Incomplete OTP. Please enter a valid OTP!');
    } else if (!regex.test(value.trim())) {
      setValueError('Invalid OTP. Please enter only digits!');
    } else {
      handle_Signup_verification();
    }
  };
  const handlePaste = clipboard => {
    setValue(clipboard);
  };

  return (
    <SafeAreaView style={SignUpVerificationStyle.mainContainer}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TopHeader
          MiddleText={'Verify your email'}
          Text_Color={_COLORS.Kodie_BlackColor}
          onPressLeftButton={() => _goBack(props)}
        />
        <ScrollView
          style={SignUpVerificationStyle.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
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
                    {
                      borderColor:valueError ? _COLORS?.Kodie_redColor: _COLORS.Kodie_GrayColor,
                    }
                  ]
                }
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
              LABEL_STYLES._texinputLabel,
              SignUpVerificationStyle.textcode,
            ]}>
            {'It may take a few minutes to receive your code. '}
          </Text>

          <View style={SignUpVerificationStyle.getBindButtonView}>
            <TouchableOpacity
              style={SignUpVerificationStyle.getButtonView}
              onPress={() => {
                if (!isTimerActive) {
                  send_verification_code();
                }
              }}
              disabled={isTimerActive} // Disable the button when the timer is active
            >
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
                      {remainingTime}s
                    </Text>
                  )}
                </CountdownCircleTimer>
              ) : (
                <Text style={SignUpVerificationStyle.getButton}>
                  {'Resend'}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={SignUpVerificationStyle.customBtn}>
            <CustomSingleButton
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
      </KeyboardAvoidingView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
