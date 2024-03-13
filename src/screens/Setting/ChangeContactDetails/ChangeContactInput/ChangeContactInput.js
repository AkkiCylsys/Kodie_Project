import {View, Text, TextInput, Image} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {ChangeContactInputStyle} from './ChangeContactInputStyle';
import TopHeader from '../../../../components/Molecules/Header/Header';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import {_COLORS, IMAGES} from '../../../../Themes';
import {_goBack} from '../../../../services/CommonServices';

import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import PhoneInput from 'react-native-phone-number-input';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { colors } from '../../../../Themes/CommonColors/CommonColor';
//screen number 206
const ChangeContactInput = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [oldPhoneNumber, setOldPhoneNumber] = useState('');
  const [oldPhoneNumberError, setOldPhoneNumberError] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newPhoneNumberError, setNewPhoneNumberError] = useState('');
  const [oldNumberformattedValue, setOldNumberFormattedValue] = useState('');
  const [newNumberformattedValue, setNewNumberFormattedValue] = useState('');
  const phoneInput = useRef(null);
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginResponseContact.....', loginData);
  const phoneDataNumber = loginData?.Account_details[0]?.UAD_PHONE_NO;
  console.log('phoneDataNumber..', phoneDataNumber);
  const navigation = useNavigation();
  useEffect(() => {
    if (phoneDataNumber) {
      setOldPhoneNumber(phoneDataNumber);
    }
  }, [phoneDataNumber]);

  const validateOldPhoneNumber = text => {
    setOldPhoneNumber(text);
    const mobileReg = /^[6-9]\d{9}$/;
    if (text === '') {
      setOldPhoneNumberError('Old phone number is required.');
    } else if (!mobileReg.test(text)) {
      setOldPhoneNumberError('Invalid phone number format.');
    } else {
      setOldPhoneNumberError('');
    }
  };
  const validateNewPhoneNumber = text => {
    setNewPhoneNumber(text);
    const mobileReg = /^[6-9]\d{9}$/;
    if (text === '') {
      setNewPhoneNumberError('New phone number is required.');
    } else if (!mobileReg.test(text)) {
      setNewPhoneNumberError('Invalid phone number format.');
    } else {
      setNewPhoneNumberError('');
    }
  };

  const handleSubmit = async () => {
    if (oldPhoneNumber.trim() === '') {
      setOldPhoneNumberError('Old phone number is required.');
    } else if (newPhoneNumber.trim() === '') {
      setNewPhoneNumberError('New phone number is required.');
    } else if (phoneDataNumber.trim() === newPhoneNumber.trim()) {
      setNewPhoneNumberError(
        'New phone number must be different from the old one.',
      );
      setOldPhoneNumberError('');
    } else {
      navigation.navigate('ChangeContactNotify', {
        oldPhoneNumber: oldNumberformattedValue,
        newPhoneNumber: newNumberformattedValue,
      });
      setIsLoading(false);
      // setOldPhoneNumber("");
      // setNewPhoneNumber("")
    }
  };
  return (
    <View style={ChangeContactInputStyle.maincontainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Change contact details'}
      />
      <View>
        <View style={ChangeContactInputStyle.firstview}>
          <Text style={ChangeContactInputStyle.oldnumbertext}>
            Enter your old phone number with country code
          </Text>

          <View style={[ChangeContactInputStyle.simpleinputview,{backgroundColor:colors.Kodie_GrayColor,borderRadius:8}]}>
          <Text style={[ChangeContactInputStyle.oldnumbertext,{marginLeft:15,width:'15%'}]}>
           +61
          </Text>

          <Text style={[ChangeContactInputStyle.oldnumbertext,{width:'85%',textAlign:'left'}]}>
          {phoneDataNumber}
          </Text>
            {/* <PhoneInput
              ref={phoneInput}
              defaultValue={phoneDataNumber}
              defaultCode="IN"
             // disabled="false"
              layout="second"
              onChangeText={text => {
                validateOldPhoneNumber(text);
              }}
              placeholder={'Enter your phone number'}
              onChangeFormattedText={text => {
                setOldNumberFormattedValue(text);
              }}
              autoFocus
              textContainerStyle={{
                flex: 1,
                backgroundColor: _COLORS.Kodie_WhiteColor,
                paddingVertical: 2,
                backgroundColor: _COLORS.Kodie_GrayColor,
                borderRadius: 10,
              }}
              containerStyle={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: _COLORS.Kodie_GrayColor,
                borderRadius: 12,
                borderWidth: 1,
                backgroundColor: _COLORS.Kodie_GrayColor,
              }}
            /> */}
          </View>

          {oldPhoneNumberError ? (
            <Text style={ChangeContactInputStyle.error_text}>
              {oldPhoneNumberError}
            </Text>
          ) : null}
        </View>

        <View style={ChangeContactInputStyle.secondview}>
          <Text style={ChangeContactInputStyle.oldnumbertext}>
            Enter your new phone number with country code
          </Text>

          <View style={[ChangeContactInputStyle.simpleinputNewPhoneview]}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={newPhoneNumber}
              defaultCode="IN"
              layout="second"
              onChangeText={text => {
                validateNewPhoneNumber(text);
              }}
              placeholder={'Enter your phone number'}
              onChangeFormattedText={text => {
                setNewNumberFormattedValue(text);
              }}
              // withDarkTheme
              // withShadow
              autoFocus
              textContainerStyle={{
                flex: 1,
                backgroundColor: _COLORS.Kodie_WhiteColor,
                paddingVertical: 2,
                borderRadius: 10,
              }}
              containerStyle={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </View>
          {newPhoneNumberError ? (
            <Text style={ChangeContactInputStyle.error_text}>
              {newPhoneNumberError}
            </Text>
          ) : null}
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
    </View>
  );
};

export default ChangeContactInput;
