import React, {useState, useEffect} from 'react';
import {Text, Image, TouchableOpacity, View, StatusBar} from 'react-native';
import {HeaderStyle} from './HeaderStyle';
import {FONTFAMILY, SMALLICON, IMAGES, _COLORS} from './../../../Themes/index';
import {_goBack} from '../../../services/CommonServices';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import DividerIcon from '../../Atoms/Devider/DividerIcon';
import {useSelector} from 'react-redux';
import {Config} from '../../../Config';
import axios from 'axios';
import {useIsFocused, CommonActions} from '@react-navigation/native';

const TopHeader = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  // console.log('loginData', loginData.Login_details?.profile_photo_path);
  const signUp_account_response = useSelector(
    state => state?.authenticationReducer?.data,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [accountDetails, setAccountDetails] = useState(null);
  const isvisible = useIsFocused();
  // const getPersonalDetails = async () => {
  // if (
  //   !loginData ||
  //   !loginData?.Login_details ||
  //   !loginData?.Login_details?.user_id
  // ) {
  //   console.log('login data not available');
  //   return;
  // }
  //   const url = Config.BASE_URL;

  //   const apiUrl =
  //     url + `getAccount_details/${loginData?.Login_details?.user_id}`;

  //   // Make a GET request using Axios
  //   await axios
  //     .get(apiUrl)
  //     .then(response => {
  //       // Handle successful response
  //       console.log('API Response:', response?.data?.data[0]);
  //       setAccountDetails(response?.data?.data[0]);
  //     })
  //     .catch(error => {
  //       // Handle error
  //       console.error('API Error PersonalDetails h:', error);
  //     });
  // };
  const fetchData = async () => {
    if (
      loginData?.Login_details?.user_id ||
      loginData?.Login_details?.user_account_id
    ) {
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
        console.log('API Response:', response?.data?.data[0]?.image_path[0]);
        if (
          response?.data?.data &&
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          setAccountDetails(response?.data?.data[0]);
        } else {
          console.error('Invalid response data format:', response?.data);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('API Error PersonalDetails Dash:', error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    // if (isvisible) {
    //   getPersonalDetails();
    // }
    if (isvisible) {
      fetchData();
    }
  }, [isvisible, loginData]);

  const userProfileImageUri = accountDetails?.image_path[0];

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
                userProfileImageUri ? (
                  <Image
                    source={{
                      uri: userProfileImageUri,
                    }}
                    style={HeaderStyle.usericon}
                  />
                ) : (
                  <FontAwesome
                    name="user-circle"
                    size={38}
                    color={_COLORS.Kodie_GrayColor}
                    style={{marginLeft: 10}}
                  />
                )
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props?.onPressManurightIcon}
              style={{alignSelf: 'center'}}>
            {props.ManurightIcon ? 
        
        <Entypo
              name={'dots-three-vertical'}
              size={20}
              color={_COLORS.Kodie_BlackColor}
              style={[HeaderStyle.MenuIcon,{marginLeft:'70%'}]}
            />
      
      :  null
    }
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
