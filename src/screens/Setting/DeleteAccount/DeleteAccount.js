import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {DeleteAccountStyle} from './DeleteAccountStyle';
import TopHeader from '../../../components/Molecules/Header/Header';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import {_COLORS, IMAGES, LABEL_STYLES, FONTFAMILY} from '../../../Themes';
import {_goBack} from '../../../services/CommonServices';
import {Config} from '../../../Config';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import PhoneInput from 'react-native-phone-number-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const DeleteAccount = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginResponse.....', loginData);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [valid, setValid] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');
  const [accountDetails, setAccountDetails] = useState(null);

  const phoneInput = useRef(null);
  const validateAccountEmail = email => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(email);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleAccountEmail = text => {
    setEmail(text);
    if (text.trim() === '') {
      setEmailError('Email is required !');
    } else if (!validateAccountEmail(text)) {
      setEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      setEmailError('');
    }
  };
  const validateMobileNumber = text => {
    // const mobileReg = /^[6-9]\d{9}$/;
    const mobileReg = /^([6-9]\d{9}$|04[0-9]{8})$/;
    if (text === '') {
      setPhoneNumberError('Phone number is required');
    } else if (!mobileReg.test(text)) {
      setPhoneNumberError('Invalid phone number format');
    } else {
      setPhoneNumberError('');
    }
    setPhoneNumber(text);
  };
  const handleSubmit = async () => {
    if (phoneNumber.trim() === '' && email.trim() === '') {
      setPhoneNumberError('Phone number is required');
      setEmailError('Email is required!');
    } else if (phoneNumber.trim() !== '' && email.trim() !== '') {
      DeleteAccount();
    } else if (phoneNumber.trim() !== '') {
      DeleteAccount();
    } else if (email.trim() !== '') {
      if (!validateAccountEmail(email)) {
        setEmailError(
          'Hold on, this email appears to be invalid. Please enter a valid email address.',
        );
      } else {
        DeleteAccount();
      }
    }
  };

  // Api intrigation..
  const DeleteAccount = () => {
    const dataToSend = {
      // uad_key: 644,
      uad_key: loginData?.Login_details?.user_account_id,
      // email: "Rupesh1@gmail.com",
      email: email,
      // phone_number: "8965656565",
      phone_number: phoneNumber,
    };

    const url = Config.BASE_URL;
    const deleteAccount_url = `${url}profile/deleteuseraccount`;
    console.log('url...', deleteAccount_url);

    setIsLoading(true);

    axios
      .delete(deleteAccount_url, {data: dataToSend})
      .then(res => {
        console.log('res delete Account......', res);
        if (res?.data?.success === true) {
          alert(res?.data?.message);
          props.navigation.navigate('LoginScreen');
        }
      })
      .catch(error => {
        if (error.response) {
          console.error('Response data:', error.response.data);
          alert(error.response.data.message);
        }
        console.error('Error deleting:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchData = async () => {
    if (loginData?.Login_details?.user_id) {
      await getPersonalDetails();
    }
  };
  const getPersonalDetails = async () => {
    setIsLoading(true);
    const url = Config.BASE_URL;
    const apiUrl =
      url + `getAccount_details/${loginData?.Login_details?.user_id}`;
    console.log('PersonalDetails_url..', apiUrl);
    await axios
      .get(apiUrl)
      .then(response => {
        console.log('API Response:', response?.data?.data[0]);
        if (
          response?.data?.data &&
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          setAccountDetails(response?.data?.data[0]);
          setPhoneNumber(response?.data?.data[0].UAD_PHONE_NO);
        } else {
          console.error('Invalid response data format:', response?.data);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('API Error PersonalDetails contact:', error);
        setIsLoading(false);
      });
  };
  return (
    <SafeAreaView style={DeleteAccountStyle.container}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Delete this account'}
      />
      <ScrollView>
        <View style={DeleteAccountStyle.headingview}>
          {/* <Image
            style={DeleteAccountStyle.helpimg}
            source={IMAGES.helpCenter}
          /> */}
          <Ionicons
            name={'information-circle-outline'}
            color={_COLORS.Kodie_GreenColor}
            size={30}
          />
          <Text style={DeleteAccountStyle.accounttext}>
            If you delete this account
          </Text>
        </View>

        <View style={DeleteAccountStyle.Pointsview}>
          <Text style={DeleteAccountStyle.textpoint}>
            • The account will be deleted from Kodie and all your devices
          </Text>
          <Text style={DeleteAccountStyle.textpoint}>
            • Your message history will be erased
          </Text>
          <Text style={DeleteAccountStyle.textpoint}>
            • Delete your payments info
          </Text>
          <Text style={DeleteAccountStyle.textpoint}>
            • Property data will also be deleted
          </Text>
        </View>

        <View style={DeleteAccountStyle.logoutview}>
          {/* <Image style={DeleteAccountStyle.Logoutimg} source={IMAGES.Log_Out} />
           */}
          <MaterialCommunityIcons
            name={'logout'}
            color={_COLORS.Kodie_GreenColor}
            size={30}
          />
          <Text style={DeleteAccountStyle.insteadtext}>
            Change number instead?
          </Text>
        </View>

        <View style={DeleteAccountStyle.buttonview}>
          <CustomSingleButton
            disabled={isLoading ? true : false}
            _ButtonText={'Change number instead'}
            backgroundColor={_COLORS.Kodie_lightGreenColor}
            Text_Color={_COLORS.Kodie_BlackColor}
            onPress={() => {
              props.navigation.navigate('ChangeContactInput');
            }}
          />
        </View>

        <View style={DeleteAccountStyle.toconfirmview}>
          <Text style={DeleteAccountStyle.toconfirmtext}>
            To delete your account, confirm your country code and enter your
            phone or email address
          </Text>
        </View>
        <View style={DeleteAccountStyle.card}>
          <Text style={LABEL_STYLES.commontext}>{'Phone number'}</Text>
          {/* <View style={DeleteAccountStyle.phoneinputbindview}> */}
          {/* <View style={DeleteAccountStyle.phoneinput}>
              <View style={DeleteAccountStyle.bindnumberview}>
                <Text style={DeleteAccountStyle.numbercode}>+61</Text>
                <Ionicons
                  name="chevron-down-outline"
                  size={20}
                  color={_COLORS.Kodie_LightGrayColor}
                  resizeMode={"contain"}
                />
                <Image
                  style={DeleteAccountStyle.lineimg}
                  source={IMAGES.verticalLine}
                />
                <TextInput
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="numeric"
                  placeholder="Phone number"
                  onBlur={() => validateMobileNumber(phoneNumber)}
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  maxLength={10}
                />
              </View>
            </View> */}
          <View
            style={{
              height: 50,
              // flexDirection: 'row',
              alignItems: 'center',
              // justifyContent: 'space-between',
              marginTop: 8,
              marginHorizontal: 16,
            }}>
            {/* <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="AU"
              layout="second"
              Country={false}
              onChangeText={text => {
                // validateMobileNumber(text);
                const checkValid = phoneInput.current?.isValidNumber(text);
                if (text === '') {
                  setPhoneNumberError('Phone number is required');
                  setPhoneNumber(text);
                } else if (checkValid == false) {
                  setPhoneNumberError('Invalid phone number format');
                  setPhoneNumber(text);
                } else {
                  setPhoneNumberError('');
                  const numberOnly = text.substring(3);
                  setPhoneNumber(numberOnly);
                }
              }}
              textInputProps={{
                maxLength: 9,
              }}
              placeholder={'Enter your phone number'}
              onChangeFormattedText={text => {
                // setFormattedValue(text);
                const numberOnly = text.substring(3);
                setPhoneNumber(numberOnly);
              }}
              // autoFocus
              textContainerStyle={{
                flex: 1,
                backgroundColor: _COLORS.Kodie_WhiteColor,
                paddingVertical: 2,
                height: 50,
                borderRadius: Platform.OS == 'ios' ? 10 : 10,
                fontFamily: FONTFAMILY.K_Medium,
              }}
              containerStyle={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: _COLORS.Kodie_GrayColor,
                borderRadius: Platform.OS == 'ios' ? 10 : 10,
                fontFamily: FONTFAMILY.K_Medium,
              }}
            /> */}
            <View
              style={[
                DeleteAccountStyle.simpleinputview,
                {backgroundColor: _COLORS.Kodie_GrayColor, borderRadius: 8},
              ]}>
              <Text
                style={[
                  DeleteAccountStyle.oldnumbertext,
                  {marginLeft: 15, width: '15%'},
                ]}>
                {accountDetails?.UAD_COUNTRY_CODE}
              </Text>
              <Text
                style={[
                  DeleteAccountStyle.oldnumbertext,
                  {width: '85%', textAlign: 'left'},
                ]}>
                {phoneNumber}
              </Text>
            </View>
          </View>
          {phoneNumberError ? (
            <Text style={DeleteAccountStyle.error_text}>
              {phoneNumberError}
            </Text>
          ) : null}
          {/* </View> */}
          <View style={DeleteAccountStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {'Enter your email address'}
            </Text>
            <TextInput
              style={DeleteAccountStyle.input}
              value={email}
              onChangeText={setEmail}
              onBlur={() => handleAccountEmail(email)}
              placeholder="Email"
              placeholderTextColor="#999"
            />
          </View>
          {emailError ? (
            <Text style={DeleteAccountStyle.error_text}>{emailError}</Text>
          ) : null}
        </View>
        <View style={DeleteAccountStyle.buttonblackview}>
          <CustomSingleButton
            _ButtonText={'Delete account'}
            backgroundColor={_COLORS.Kodie_BlackColor}
            Text_Color={_COLORS.Kodie_WhiteColor}
            disabled={isLoading ? true : false}
            onPress={() => {
              handleSubmit();
              // DeleteAccount()
            }}
          />
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default DeleteAccount;
