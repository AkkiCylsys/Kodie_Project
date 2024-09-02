//ScreenNo:8
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { SignUpVerificationStyle } from './SignUpVerificationStyle';
import TopHeader from '../../../components/Molecules/Header/Header';
import { _goBack } from '../../../services/CommonServices';
import { LABEL_STYLES, _COLORS } from '../../../Themes';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonLoader } from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { SignupVerification, signupSendCode } from '../../../services/Authentication/Authentication';
const CELL_COUNT = 6;
export default SignUpVerification = props => {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  let email = props?.route?.params?.email;
  let user_key = props?.route?.params?.user_key;
  const send_verification_code = async () => {
    setIsLoading(true);
    try {
      const SignUpData = {
        email: email,
      };
      const response = await signupSendCode(SignUpData);
      alert(response?.message);
      setIsTimerActive(true);
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
    };
    SignupVerification(data)
      .then(responseData => {
        console.log('sign_verification_Api response', responseData);
        if (responseData?.success === true) {
          alert(responseData?.message);
          setValue('');
          props.navigation.navigate('SignUpSteps', {
            email: email,
            user_key: user_key,
            password:password
          });
        } else {
          setValueError(responseData?.message);
          setValue('');
        }
      })
      .catch(error => {
        if (error?.response && error?.response?.status === 404) {
          Alert.alert("Warning!",'Incorrect OTP. Please try again!');
          setValue('');
        } else if (error?.response && error?.response?.status === 422) {
          Alert.alert("Warning!",'Time up. Please try again!');
          setValue('');
        } else {
          Alert.alert("Error!", error.message);
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
            renderCell={({ index, symbol, isFocused }) => (
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

        <View style={SignUpVerificationStyle.getBindButtonView}>
          <View style={SignUpVerificationStyle.getButtonView}>
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
                {({ remainingTime }) => (
                  <Text style={{ color: _COLORS.Kodie_WhiteColor }}>
                    {remainingTime} S
                  </Text>
                )}
              </CountdownCircleTimer>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  send_verification_code();
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
