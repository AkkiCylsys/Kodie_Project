import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ChangeNotifyStyle} from './ChangeNotifyStyle';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {Divider} from 'react-native-paper';
import ToggleSwitch from 'toggle-switch-react-native';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import {_COLORS} from '../../../../Themes';
import {_goBack} from '../../../../services/CommonServices';
import {Config} from '../../../../Config';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useDispatch, useSelector} from 'react-redux';
import SwitchToggle from 'react-native-switch-toggle';
import axios from 'axios';
//ScreenNo:207
const ChangeContactNotify = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const [notify, setNotify] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);

  console.log('loginResponse.....', loginData);
  let oldPhoneNumber = props?.route?.params?.oldnewPhoneNumber;
  let PhoneNumber = props?.route?.params?.newnewPhoneNumber;
  const newPhoneNumber = PhoneNumber.substring(3);
  console.log('oldPhoneNumber....', oldPhoneNumber);
  console.log('newPhoneNumber....', newPhoneNumber);
  console.log('PhoneNumber...', PhoneNumber);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    if (loginData?.Login_details?.user_id) {
      await getPersonalDetails();
    }
  };
  // Api intrigation...
  const getPersonalDetails = async () => {
    setIsLoading(true);
    const url = Config.BASE_URL;
    const apiUrl =
      url + `getAccount_details/${loginData?.Login_details?.user_account_id}`;
    console.log('PersonalDetails_url..', apiUrl);
    await axios
      .get(apiUrl)
      .then(response => {
        console.log('API Response in notify:', response?.data?.data[0]);
        if (
          response?.data?.data &&
          Array.isArray(response?.data?.data) &&
          response?.data?.data?.length > 0
        ) {
          setAccountDetails(response?.data?.data[0]);
          console.log('AccountDetails....', accountDetails);
          // console.log("countryCode..",accountDetails?.UAD_COUNTRY_CODE)
        } else {
          console.error('Invalid response data format:', response?.data);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('API Error PersonalDetails notify...', error);
        setIsLoading(false);
      });
  };
  const UpdateContactDetails = () => {
    const url = Config.BASE_URL;
    const updateContactDetailUrl = `${url}profile/updateContactdetails`;
    console.log('url...', updateContactDetailUrl);
    const dataToSend = {
      uad_key: loginData?.Login_details?.user_account_id,
      country_code: accountDetails?.UAD_COUNTRY_CODE,
      old_phone_number: oldPhoneNumber,
      new_phone_number: newPhoneNumber,
    };
    setIsLoading(true);
    axios
      .put(updateContactDetailUrl, dataToSend)
      .then(res => {
        console.log('res UpdateContactDetails......', res?.data);
        if (res?.data?.success === true) {
          alert(res?.data?.message);
          props.navigation.navigate('AccountSetting');
        }
      })
      .catch(error => {
        if (error?.response) {
          console.error(
            'Response data UpdateContactDetails error',
            error.response.data,
          );
          alert(error?.response?.data?.message);
        }
        console.error('Error Update ContactDetails:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <SafeAreaView style={ChangeNotifyStyle.maincontainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Change contact details'}
      />
      <View>
        <View style={ChangeNotifyStyle.headingview}>
          <Text style={ChangeNotifyStyle.alltext}>
            You are about to change your number from
          </Text>
          <View style={ChangeNotifyStyle.numberview}>
            <Text style={ChangeNotifyStyle.firstnumbertext}>
              {`${accountDetails?.UAD_COUNTRY_CODE || ''}${oldPhoneNumber}`}
            </Text>
            <Text style={ChangeNotifyStyle.totext}> to </Text>
            <Text style={ChangeNotifyStyle.secondnumbertext}>
              {/* {`${accountDetails?.UAD_COUNTRY_CODE || ""}${newPhoneNumber}`} */}
              {PhoneNumber}
            </Text>
          </View>
        </View>

        <Divider style={ChangeNotifyStyle.Dividerline} />
        <View>
          <View style={ChangeNotifyStyle.notifyview}>
            <Text style={ChangeNotifyStyle.notifytext}>Notify others</Text>
            <SwitchToggle
              switchOn={notify}
              onPress={() => {
                setNotify(!notify);
              }}
              circleColorOff={_COLORS.Kodie_BlackColor}
              circleColorOn={_COLORS.Kodie_GreenColor}
              backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
              backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
              containerStyle={ChangeNotifyStyle.toggle_con}
              circleStyle={ChangeNotifyStyle.toggle_circle}
            />
          </View>
        </View>

        <Divider style={ChangeNotifyStyle.Dividerlinesecond} />

        <View style={ChangeNotifyStyle.buttonview}>
          <CustomSingleButton
            _ButtonText={'Done'}
            Text_Color={_COLORS.Kodie_WhiteColor}
            disabled={isLoading ? true : false}
            onPress={() => {
              UpdateContactDetails();
            }}
          />
        </View>
      </View>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default ChangeContactNotify;
