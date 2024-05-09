import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
    if (email.trim() === '') {
      setEmailError('Email is required.');
    }
    //  else if (email.trim() !== '') {
    //   if (!validateAccountEmail(email)) {
    //     setEmailError(
    //       'Hold on, this email appears to be invalid. Please enter a valid email address.',
    //     );
    //   } else {
    //     DeleteAccount();
    //   }
    // }
    else if (!validateAccountEmail(email)) {
      setEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      DeleteAccount();
    }
  };

  // Api intrigation..
  const DeleteAccount = async () => {
    const dataToSend = {
      uad_key: loginData?.Login_details?.user_account_id,
      email: email,
      phone_number: phoneNumber,
    };
    const url = Config.BASE_URL;
    const deleteAccount_url = `${url}profile/deleteuseraccount`;
    console.log('url...', deleteAccount_url);
    setIsLoading(true);
    await axios
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
          console.error('Response data:', error?.response?.data);
          alert(error?.response?.data?.message);
        }
        console.error('Error deleting:', error);
        setEmailError(
          'Hold on, this email appears to be invalid. Please enter a valid email address.',
        );
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
      url + `getAccount_details/${loginData?.Login_details?.user_account_id}`;
    console.log('PersonalDetails_url..', apiUrl);
    await axios
      .get(apiUrl)
      .then(response => {
        console.log('API Response:', response?.data?.data[0]);
        if (
          response?.data?.data &&
          Array.isArray(response?.data?.data) &&
          response?.data?.data?.length > 0
        ) {
          setAccountDetails(response?.data?.data[0]);
          setPhoneNumber(response?.data?.data[0]?.UAD_PHONE_NO);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={DeleteAccountStyle.container}>
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
            <EvilIcons
              name={'question'}
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
            <View style={DeleteAccountStyle.IconView}>
              <MaterialIcons
                name={'logout'}
                color={_COLORS.Kodie_GreenColor}
                size={22}
              />
            </View>
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
            <View style={DeleteAccountStyle.inputContainer}>
              <Text style={LABEL_STYLES.commontext}>{'Phone number'}</Text>
              <TextInput
                style={[
                  DeleteAccountStyle.input,
                  {backgroundColor: _COLORS.Kodie_GrayColor},
                ]}
                value={`${accountDetails?.UAD_COUNTRY_CODE || ''} ${
                  phoneNumber || ''
                }`}
                editable={false}
              />
            </View>
            <View style={DeleteAccountStyle.inputContainer}>
              <Text style={LABEL_STYLES.commontext}>
                {'Enter your email address'}
              </Text>
              <TextInput
                style={DeleteAccountStyle.input}
                value={email}
                // onChangeText={setEmail}
                onChangeText={handleAccountEmail}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DeleteAccount;
