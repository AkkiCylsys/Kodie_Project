import {View, Text, TextInput, Image} from 'react-native';
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
import {colors} from '../../../../Themes/CommonColors/CommonColor';
//screen number 206
const ChangeContactInput = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [oldnewPhoneNumber, setOldnewPhoneNumber] = useState('');
  const [oldnewPhoneNumberError, setOldnewPhoneNumberError] = useState('');
  const [newnewPhoneNumber, setnewPhoneNumber] = useState('');
  const [newnewPhoneNumberError, setnewPhoneNumberError] = useState('');
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
      setOldnewPhoneNumber(phoneDataNumber);
    }
  }, [phoneDataNumber]);

  const validatenewPhoneNumber = () => {
    if (newnewPhoneNumber.trim() === '') {
      setnewPhoneNumberError('Phone number is required');
      return false;
    } else {
      setnewPhoneNumberError('');
      return true;
    }
  };

  const handleSubmit = () => {
    const isValid = validatenewPhoneNumber();
    if (newnewPhoneNumber.trim() === '') {
      setnewPhoneNumberError('Phone number is required');
      // Yahan par aapka actual submit logic hoga
      console.log('Phone number is valid:', newnewPhoneNumber);
      // Agar aap form submit karna chahte hain to yahan par kar sakte hain
    } else {
      navigation.navigate('ChangeContactNotify', {
        oldnewPhoneNumber: oldNumberformattedValue,
        newnewPhoneNumber: newNumberformattedValue,
      });
    }
  };

  const handlenewPhoneNumberChange = text => {
    validatenewPhoneNumber(text);
    setnewPhoneNumber(text);
  };
  // const handleSubmit = async () => {
  //   if (newnewPhoneNumber.trim() === '') {
  //     setnewPhoneNumberErrorError('New phone number is required.');
  //   } else if (phoneDataNumber.trim() === newnewPhoneNumber.trim()) {
  //     setnewPhoneNumberErrorError(
  //       'New phone number must be different from the old one.',
  //     );
  //     setOldnewPhoneNumberError('');
  //   } else {
  //     navigation.navigate('ChangeContactNotify', {
  //       oldnewPhoneNumber: oldNumberformattedValue,
  //       newnewPhoneNumber: newNumberformattedValue,
  //     });
  //     setIsLoading(false);
  //     // setOldnewPhoneNumber("");
  //     // setnewPhoneNumberError("")
  //   }
  // };
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

          <View
            style={[
              ChangeContactInputStyle.simpleinputview,
              {backgroundColor: colors.Kodie_GrayColor, borderRadius: 8},
            ]}>
            <Text
              style={[
                ChangeContactInputStyle.oldnumbertext,
                {marginLeft: 15, width: '15%'},
              ]}>
              +61
            </Text>

            <Text
              style={[
                ChangeContactInputStyle.oldnumbertext,
                {width: '85%', textAlign: 'left'},
              ]}>
              {phoneDataNumber}
            </Text>
            {/* <PhoneInput
              ref={phoneInput}
              defaultValue={phoneDataNumber}
              defaultCode="IN"
             // disabled="false"
              layout="second"
              onChangeText={text => {
                validateOldnewPhoneNumber(text);
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

          {oldnewPhoneNumberError ? (
            <Text style={ChangeContactInputStyle.error_text}>
              {oldnewPhoneNumberError}
            </Text>
          ) : null}
        </View>

        <View style={ChangeContactInputStyle.secondview}>
          <Text style={ChangeContactInputStyle.oldnumbertext}>
            Enter your new phone number with country code
          </Text>

          <View
            style={{
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 8,
            }}>
            <PhoneInput
              // ref={phoneInput}
              defaultValue={newnewPhoneNumber}
              defaultCode="AU"
              layout="second"
              // onChangeText={text => {
              //   validateNewnewPhoneNumber(text);
              // }}
              placeholder={'Enter your phone number'}
              onChangeFormattedText={text => handlenewPhoneNumberChange(text)}
              textInputProps={{
                maxLength: 9,
              }}
              // withDarkTheme
              // withShadow
              // autoFocus
              textContainerStyle={{
                flex: 1,
                backgroundColor: _COLORS.Kodie_WhiteColor,
                paddingVertical: 2,
                borderRadius: 10,
                fontFamily: FONTFAMILY.K_Medium,
              }}
              containerStyle={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: _COLORS.Kodie_GrayColor,
                borderRadius: 10,
                fontFamily: FONTFAMILY.K_Medium,
              }}
            />
          </View>
          {newnewPhoneNumberError ? (
            <Text style={ChangeContactInputStyle.error_text}>
              {newnewPhoneNumberError}
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
