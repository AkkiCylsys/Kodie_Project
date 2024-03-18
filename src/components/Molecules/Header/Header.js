import React, {useState, useEffect} from 'react';
import {Text, Image, TouchableOpacity, View, StatusBar} from 'react-native';
import {HeaderStyle} from './HeaderStyle';
import {FONTFAMILY, SMALLICON, IMAGES, _COLORS} from './../../../Themes/index';
import {_goBack} from '../../../services/CommonServices';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DividerIcon from '../../Atoms/Devider/DividerIcon';
import {useSelector} from 'react-redux';
import {Config} from '../../../Config';
import axios from 'axios';
import {useIsFocused, CommonActions} from '@react-navigation/native';

const TopHeader = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginData', loginData.Login_details?.profile_photo_path);
  const signUp_account_response = useSelector(
    state => state?.authenticationReducer?.data,
  );

  const [accountDetails, setAccountDetails] = useState(null);
  const isvisible = useIsFocused();
  const getPersonalDetails = () => {
    const url = Config.BASE_URL;

    const apiUrl =
      url + `getAccount_details/${loginData?.Login_details?.user_id}`;

    // Make a GET request using Axios
    axios
      .get(apiUrl)
      .then(response => {
        // Handle successful response
        console.log('API Response:', response.data.data[0][0]);
        setAccountDetails(response.data.data[0][0]);
      })
      .catch(error => {
        // Handle error
        console.error('API Error PersonalDetails h:', error);
      });
  };
  useEffect(() => {
    if (isvisible) {
      getPersonalDetails();
    }
  }, [isvisible]);
  const userProfileImageUri = accountDetails?.image_path[0];
  // loginData.Login_details?.profile_photo_path ||
  // signUp_account_response?.Login_details?.profile_photo_path;
  const HandleProfileNavigation = () => {
    props.navigation.navigate('EditProfile');
  };
  return (
    <>
      <StatusBar
        backgroundColor={props.statusBarColor || _COLORS.Kodie_WhiteColor}
        barStyle={props.statusBarStyle || 'dark-content'}
      />
      <View
        style={[
          HeaderStyle.mainView,
          // { backgroundColor: _COLORS.Kodie_BlackColor },
        ]}>
        <View style={HeaderStyle.leftButtonView}>
          <TouchableOpacity
            onPress={props?.onPressLeftButton}
            style={[HeaderStyle.button]}>
            <Icon
              name={props.leftImage}
              size={30}
              color={_COLORS.Kodie_BlackColor}
              style={HeaderStyle.MenuIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={HeaderStyle.middleTextView}>
          {props.isMiddleImage ? (
            <Image source={props.MiddleImage} style={HeaderStyle.MiddleIcon} />
          ) : (
            <Text
              style={[HeaderStyle.LabelText, {color: props.Text_Color}]}
              numberOfLines={1}>
              {props.MiddleText}
            </Text>
          )}
        </View>
        {props.isrightImage ? (
          <TouchableOpacity
            onPress={props?.onPressRightButton}
            style={[HeaderStyle.button]}>
            <Image source={props.RightImage} style={HeaderStyle.leftIcon} />
          </TouchableOpacity>
        ) : (
          <View style={HeaderStyle.nullView}>
            <TouchableOpacity style={HeaderStyle.notificationButton}>
              {props.IsNotification ? (
                <Icon
                  name={'bell-outline'}
                  size={30}
                  color={_COLORS.Kodie_BlackColor}
                  style={HeaderStyle.MenuIcon}
                />
              ) : // <Image
              //   source={IMAGES.NotificationIcon}
              //   style={HeaderStyle.leftIcon}
              // />
              null}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props?.onPressRightImgProfile}
              style={{alignSelf: 'center'}}>
              {props.isprofileImage ? (
                <Image
                  source={{
                    uri: userProfileImageUri,
                  }}
                  style={HeaderStyle.usericon}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        )}
      </View>
      <DividerIcon marginTop={2} marginBottom={-0.1} />
    </>
  );
};

TopHeader.defaultProps = {
  isrightImage: false,
  IsNotification: false,
  isMiddleImage: false,
  leftImage: 'chevron-left',
  MiddleText: 'Set up your profile',
  statusBarColor: _COLORS.Kodie_WhiteColor,
  backgroundColor: _COLORS.Kodie_WhiteColor,
  Text_Color: _COLORS.Kodie_BlackColor,
};

export default TopHeader;
