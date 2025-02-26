import {
  View,
  Text,
  Platform,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {ChangeContactInputStyle} from './ChangeContactInputStyle';
import TopHeader from '../../../../components/Molecules/Header/Header';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import {_COLORS, IMAGES, FONTFAMILY} from '../../../../Themes';
import {_goBack} from '../../../../services/CommonServices';

import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import PhoneInput from 'react-native-phone-number-input';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Config} from '../../../../Config';
import axiosInstance from '../../../../services/axiosInstance';
//screen number 206
const ChangeContactInput = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [oldnewPhoneNumber, setOldnewPhoneNumber] = useState('');
  const [newnewPhoneNumber, setnewPhoneNumber] = useState('');
  const [newnewPhoneNumberError, setnewPhoneNumberError] = useState('');
  const [accountDetails, setAccountDetails] = useState(null);

  const phoneInput = useRef(null);
  const loginData = useSelector(state => state.authenticationReducer.data);
  // console.log('loginResponseContact.....', loginData);
  // const phoneDataNumber = loginData?.Account_details[0]?.UAD_PHONE_NO;
  // console.log('phoneDataNumber..', phoneDataNumber);
  const navigation = useNavigation();
  useEffect(() => {
    // if (phoneDataNumber) {
    //   setOldnewPhoneNumber(phoneDataNumber);
    // }
    fetchData();
  }, []);

  const fetchData = async () => {
    if (loginData?.Login_details?.user_id) {
      await getPersonalDetails();
    }
  };
  const getPersonalDetails = async () => {
    setIsLoading(true);
    const url = Config.BASE_URL;
    const apiUrl =
    `getAccount_details/${loginData?.Login_details?.user_account_id}`;
    console.log('PersonalDetails_url..', apiUrl);
    await axiosInstance
      .get(apiUrl)
      .then(response => {
        // console.log('API Response:', response?.data?.data[0]);
        if (
          response?.data?.data &&
          Array.isArray(response?.data?.data) &&
          response?.data?.data?.length > 0
        ) {
          console.log("contact response...",response?.data?.data[0]);
          setAccountDetails(response?.data?.data[0]);
          setOldnewPhoneNumber(response?.data?.data[0].UAD_PHONE_NO);
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
  const validatenewPhoneNumber = () => {
    if (newnewPhoneNumber.trim() === '') {
      setnewPhoneNumberError('Phone number is required!');
      return false;
    } else {
      setnewPhoneNumberError('');
      return true;
    }
  };

  const isValidPhoneNumber = text => {
    if (text.trim() === '') {
      setnewPhoneNumberError('Phone number is required!');
      return false;
    } else if (!/^[24][0-9]{8}$/.test(text)) {
      setnewPhoneNumberError('Invalid phone number!');
      return false;
    } else {
      setnewPhoneNumberError('');
      return true;
    }
  };
  const handleSubmit = () => {
    const isPhoneNumberValid = isValidPhoneNumber(newnewPhoneNumber);
    if (!isPhoneNumberValid) {
      return;
    }
    if (isPhoneNumberValid) {
      navigation.navigate('ChangeContactNotify', {
        countryCode:'+61',
        oldnewPhoneNumber: oldnewPhoneNumber,
        newnewPhoneNumber: newnewPhoneNumber,
      });
    }
  };
  return (
    <SafeAreaView style={ChangeContactInputStyle.maincontainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Change contact details'}
      />
      <View>
        <View style={ChangeContactInputStyle.firstview}>
          <Text style={ChangeContactInputStyle.oldnumbertext}>
            Enter your old phone number with country code
          </Text>
          <View
            style={[
              ChangeContactInputStyle.old_inputview,
              {backgroundColor: _COLORS.Kodie_GrayColor},
            ]}>
            <TextInput
              style={ChangeContactInputStyle.inputStyle}
              value={`${accountDetails?.UAD_COUNTRY_CODE || ''} ${
                accountDetails?.UAD_PHONE_NO || ''
              }`}
              editable={false}
            />
          </View>
        </View>

        <View style={ChangeContactInputStyle.secondview}>
          <Text style={ChangeContactInputStyle.oldnumbertext}>
            Enter your new phone number with country code
            <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
          </Text>
          <View
              style={[
                {flexDirection: 'row', alignItems: 'center', height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',},
              ]}>
              <View style={{position: 'relative', flex: 1}}>
                <Text
                  style={{
                    position: 'absolute',
                    left: 15,
                    top: 14,
                    color: _COLORS.Kodie_BlackColor,
                    fontSize: 16,
                    zIndex: 1,
                  }}>
                  +61
                </Text>
                <TextInput
                  value={newnewPhoneNumber}
                  keyboardType="number-pad"
                  maxLength={9}
                  placeholder="Enter your phone number"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  style={{
                    height: 50,
                    backgroundColor: _COLORS.Kodie_WhiteColor,
                    paddingVertical: 2,
                    paddingLeft: 70,
                    paddingRight: 10,
                    borderRadius: Platform.OS === 'ios' ? 6 : 10,
                    borderWidth: 1,
                    borderColor: newnewPhoneNumberError
                      ? _COLORS.Kodie_lightRedColor
                      : _COLORS.Kodie_GrayColor,
                    fontSize: 16,
                  }}
                  onChangeText={text => {
                    isValidPhoneNumber(text);
                    setnewPhoneNumber(text);
                  }}
                />
              </View>
            </View>
            {newnewPhoneNumberError ? (
              <Text style={{color: 'red', marginLeft: 10,}}>{newnewPhoneNumberError}</Text>
            ) : null}
          {/* <View
            style={{
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 8,
            }}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={newnewPhoneNumber}
              defaultCode="AU"
              layout="second"
              onChangeText={text => {
                const checkValid = phoneInput.current?.isValidNumber(text);
                if (text === '') {
                  setnewPhoneNumberError('Phone number is required!');
                } else if (checkValid == false) {
                  setnewPhoneNumberError('Invalid phone number format.');
                } else {
                  setnewPhoneNumberError('');
                }
              }}
              placeholder={'Enter your phone number'}
              onChangeFormattedText={text => setnewPhoneNumber(text)}
              textInputProps={{
                maxLength: 9,
              }}
              // withDarkTheme
              // withShadow
              // autoFocus
              textContainerStyle={{
                flex: 1,
                height: 50,
                backgroundColor: _COLORS.Kodie_WhiteColor,
                paddingVertical: 2,
                borderRadius: Platform.OS == 'ios' ? 6 : 10,
                fontFamily: FONTFAMILY.K_Medium,
              }}
              containerStyle={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: _COLORS.Kodie_GrayColor,
                borderRadius: Platform.OS == 'ios' ? 6 : 10,
                fontFamily: FONTFAMILY.K_Medium,
              }}
            />
          </View>
          {newnewPhoneNumberError ? (
            <Text style={ChangeContactInputStyle.error_text}>
              {newnewPhoneNumberError}
            </Text>
          ) : null} */}
        </View>

        <View style={{marginTop: 45, marginLeft: 15, marginRight: 15}}>
          <CustomSingleButton
            _ButtonText={'Next'}
            disabled={isLoading ? true : false}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={() => {
              // UpdateContactDetails();
              handleSubmit();
            }}
          />
        </View>
      </View>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default ChangeContactInput;
