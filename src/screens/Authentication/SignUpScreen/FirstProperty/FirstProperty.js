//ScreenNo:13
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import { FirstPropertyStyle } from './FirstPropertyStyle';
import TopHeader from '../../../../components/Molecules/Header/Header';
import { _goBack } from '../../../../services/CommonServices';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { _COLORS, FONTFAMILY } from '../../../../Themes';
import { LABEL_STYLES, IMAGES } from '../../../../Themes';
import { Dropdown } from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import { Config } from '../../../../Config';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapScreen from '../../../../components/Molecules/GoogleMap/googleMap';
import Geolocation from 'react-native-geolocation-service';
//import Geolocation from '@react-native-community/geolocation';
import SearchPlaces from '../../../../components/Molecules/SearchPlaces/SearchPlaces';
import { CommonLoader } from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { signupAccountApiActionCreator } from '../../../../redux/Actions/Authentication/AuthenticationApiCreator';
import mime from 'mime';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
const labels = ['Step 1', 'Step 2', 'Step 3'];
const firstIndicatorSignUpStepStyle = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: _COLORS.Kodie_GrayColor,
  separatorUnFinishedColor: _COLORS.Kodie_GrayColor,
  stepIndicatorFinishedColor: _COLORS.Kodie_GreenColor,
  stepIndicatorUnFinishedColor: _COLORS.Kodie_GrayColor,
  stepIndicatorCurrentColor: _COLORS.Kodie_WhiteColor,
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: _COLORS.Kodie_BlackColor,
  stepIndicatorLabelFinishedColor: _COLORS.Kodie_BlackColor,
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: _COLORS.Kodie_BlackColor,
  labelSize: 14,
  labelAlign: 'center',
};

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: 'feed',
    // name: stepStatus === "finished" ? "check" : (position + 1).toString(),
    color: stepStatus === 'finished' ? '#ffffff' : '#ffffff',
    size: 20,
  };
  iconConfig.name = stepStatus === 'finished' ? 'check' : null;
  return iconConfig;
};
const renderDataItem = item => {
  return (
    <View style={FirstPropertyStyle.item}>
      <Text style={FirstPropertyStyle.selectedTextStyle}>
        {item.features_name}
      </Text>
    </View>
  );
};
export default FirstProperty = props => {
  const signUp_account_response = useSelector(
    state => state?.authenticationReducer?.data,
  );
  const deviceId = DeviceInfo.getDeviceId();
  const deviceType = DeviceInfo.getDeviceType();
  console.log('Device ID:', deviceId);
  console.log('Device type:', deviceType);

  console.log('signUp_account_response.....', signUp_account_response);

  let firstName = props?.route?.params?.firstName;
  let lastName = props?.route?.params?.lastName;
  let mobileNumber = props?.route?.params?.mobileNumber;
  let physicalAddress = props?.route?.params?.physicalAddress;
  let referral = props?.route?.params?.referral;
  let selectManageProperty = props?.route?.params?.selectManageProperty;
  let selectedServiceKeysString =
    props?.route?.params?.selectedServiceKeysString;
  let kodieHelpValue = props?.route?.params?.kodieHelpValue;
  let ImageName = props?.route?.params?.ImageName;
  let email = props?.route?.params?.email;
  let country = props?.route?.params?.country;
  let state = props?.route?.params?.state;
  let city = props?.route?.params?.city;
  let p_latitude = props?.route?.params?.p_latitude;
  let p_longitude = props?.route?.params?.p_longitude;
  let user_key = props?.route?.params?.user_key;
  let run_your_business = props?.route?.params?.run_your_business;
  let BusinessNumber = props?.route?.params?.BusinessNumber;
  let companyName = props?.route?.params?.companyName;
  let CompanyselectJobType = props?.route?.params?.CompanyselectJobType;
  let IndividualservicesValue = props?.route?.params?.IndividualservicesValue;
  let IndividualWebSide = props?.route?.params?.IndividualWebSide;
  let IndividualselectJobType = props?.route?.params?.IndividualselectJobType;
  let Individualp_longitude = props?.route?.params?.Individualp_longitude;
  let Individualp_latitude = props?.route?.params?.Individualp_latitude;
  let CompanyWebSide = props?.route?.params?.CompanyWebSide;
  let CompanyservicesValue = props?.route?.params?.CompanyservicesValue;
  let Bio = props?.route?.params?.Bio;
  let Companyp_latitude = props?.route?.params?.Companyp_latitude;
  let Companyp_longitude = props?.route?.params?.Companyp_longitude;
  let individualAddress = props?.route?.params?.individualAddress;
  let country_code = props?.route?.params?.country_code;
  let company_address = props?.route?.params?.company_address;

  console.log('firstname..', firstName);
  console.log('lastName..', lastName);
  console.log('mobileNumber..first', mobileNumber);
  console.log('physicalAddress..', physicalAddress);
  console.log('referral..', referral);
  console.log('selectManageProperty..', selectManageProperty);
  console.log('selectedServiceKeysString..', selectedServiceKeysString);
  console.log('kodieHelpValue..', kodieHelpValue);
  console.log('ImageName_data..', ImageName);
  console.log('email..', email);
  console.log('country..', country);
  console.log('state..', state);
  console.log('city..', city);
  console.log('p_latitude..', p_latitude);
  console.log('p_longitude..', p_longitude);
  console.log('user_key..', user_key);
  console.log('country_code.....first', country_code);
  console.log('company_address', company_address);
  console.log(
    'run_your_business..',
    run_your_business,
    BusinessNumber,
    IndividualWebSide,
    companyName,
    CompanyselectJobType,
    IndividualservicesValue,
    IndividualselectJobType,
    Individualp_longitude,
    Individualp_latitude,
    CompanyWebSide,
    CompanyservicesValue,
  );
  const [currentPage, setCurrentPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [propertyLocation, setPropertyLocation] = useState('');
  const [propertyDesc, setPropertyDesc] = useState('');
  const [property_Data, setProperty_Data] = useState([]);
  const [property_value, setProperty_value] = useState([]);
  const [selectedButton, setSelectedButton] = useState(true);
  const [selectedButtonId, setSelectedButtonId] = useState(0);
  const [additionalfeatureskey, setAdditionalfeatureskey] = useState([]);
  const [additionalfeatureskeyvalue, setAdditionalFeaturesKeyValue] = useState(
    [],
  );
  const [UserCurrentCity, setUserCurrentCity] = useState('');
  const [UserZip_Code, setUserZip_Code] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [CountBedroom, setCountBedroom] = useState(0);
  const [CountBathroom, setCountBathroom] = useState(0);
  const [CountParking, setCountParking] = useState(0);
  const [CountParkingStreet, setCountParkingStreet] = useState(0);
  const [buildingFlorSize, setBuildingFlorSize] = useState('');
  const [landArea, setLandArea] = useState('');
  const [Fcm_token, setFcm_token] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const dispatch = useDispatch();
  const [selectedButtonDeposit, setSelectedButtonDeposit] = useState(false);
  const [selectedButtonDepositId, setSelectedButtonDepositId] = useState(70);
  const [selectedButtonFurnished, setSelectedButtonFurnished] = useState(false);
  const [selectedButtonFurnishedId, setSelectedButtonFurnishedId] =
    useState(67);
  const P_addressParts = propertyLocation.split(', ');
  console.log('P_addressParts', P_addressParts);
  const p_city = P_addressParts[P_addressParts.length - 2]?.trim() ?? '';
  const P_state = P_addressParts[2]?.trim() ?? '';
  const p_country = P_addressParts[P_addressParts.length - 1]?.trim() ?? '';

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getTocken();
    }
  }
  const handlemessage = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification casued app to open from background state :',
        remoteMessage.notification,
      );
    });
    messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the foreground!', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification casued app to open from quit state.',
            remoteMessage.notification,
          );
        }
      });
  };

  const getTocken = async () => {
    const token = await messaging().getToken();
    console.log(token, 'token');
    setFcm_token(token);
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (IsMap || IsSearch) {
          setIsMap(false);
          setIsSearch(false);
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [IsMap, IsSearch]),
  );

  console.log('p_country:', p_country);
  console.log('P_state:', P_state);
  console.log('p_city:', p_city);

  const AllCountsData = [
    { Bedrooms: CountBedroom },
    { Bathrooms: CountBathroom },
    { 'Parking Space': CountParking },
    { 'On-StreetParking': CountParkingStreet },
  ];
  const increaseBedroomCount = () => {
    setCountBedroom(prevCount => prevCount + 1);
  };
  const decreaseBedroomCount = () => {
    if (CountBedroom > 0) {
      setCountBedroom(prevCount => prevCount - 1);
    }
  };
  const increaseBathroomCount = () => {
    setCountBathroom(prevCount => prevCount + 1);
  };
  const decreaseBathroomCount = () => {
    if (CountBathroom > 0) {
      setCountBathroom(prevCount => prevCount - 1);
    }
  };
  const increaseParkingStreetCount = () => {
    setCountParkingStreet(prevCount => prevCount + 1);
  };
  const decreaseParkingStreetCount = () => {
    if (CountParkingStreet > 0) {
      setCountParkingStreet(prevCount => prevCount - 1);
    }
  };
  const increaseParkingCount = () => {
    setCountParking(prevCount => prevCount + 1);
  };
  const decreaseParkingCount = () => {
    if (CountParking > 0) {
      setCountParking(prevCount => prevCount - 1);
    }
  };
  const renderStepIndicator = params => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  //dropDown render Item....
  const propertyType_render = item => {
    return (
      <View
        style={[
          FirstPropertyStyle.itemView,
          {
            backgroundColor:
              item.lookup_key === property_value
                ? _COLORS.Kodie_MidLightGreenColor
                : null,
          },
        ]}>
        {item.lookup_key === property_value ? (
          <AntDesign
            color={_COLORS.Kodie_GreenColor}
            name={'checkcircle'}
            size={20}
          />
        ) : (
          <Fontisto
            color={_COLORS.Kodie_GrayColor}
            name={'radio-btn-passive'}
            size={20}
          />
        )}
        <Text style={FirstPropertyStyle.textItem}>
          {item.lookup_description}
        </Text>
      </View>
    );
  };
  const renderLabel = ({ position, stepStatus }) => {
    const iconColor =
      position === currentPage
        ? _COLORS.Kodie_BlackColor
        : stepStatus === 'finished'
          ? '#000000'
          : '#808080';
    const iconName =
      position === 0
        ? 'Account'
        : position === 1
          ? 'About you'
          : position === 2
            ? 'First property'
            : 'circle';

    return (
      <View style={{}}>
        <Text
          style={{
            fontSize: 14,
            marginTop: 1,
            marginHorizontal: 10,
            color: iconColor,
            alignSelf: 'center',
          }}>{`Step ${position + 1}`}</Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 5,
            marginHorizontal: 10,
            color: iconColor,
          }}>
          {iconName}
        </Text>
      </View>
    );
  };
  useEffect(() => {
    handlemessage();
    requestUserPermission();
    handleProperty_Type();
    setTimeout(() => {
      additional_features();
    }, 3000);

    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
  }, []);
  const handleProperty_Type = () => {
    const propertyData = {
      P_PARENT_CODE: 'PROP_TYPE',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const propertyType = url + 'lookup_details';
    console.log('Request URL:', propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then(response => {
        console.log('property_type', response?.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          console.log('propertyData....', response?.data?.lookup_details);
          setProperty_Data(response?.data?.lookup_details);
        } else {
          console.error('property_type_error:', response?.data?.error);
          alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('property_type error:', error);
        alert(error);
        setIsLoading(false);
      });
  };
  const additional_features = () => {
    const url = Config.BASE_URL;
    const additionalApi = url + 'get_key_features';
    console.log('Request URL:', additionalApi);
    setIsLoading(true);
    axios
      .get(additionalApi)
      .then(response => {
        console.log('additional_Data', response?.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          console.log('additional_features....', response?.data);
          setAdditionalfeatureskey(response?.data?.key_features_details);
          console.log(
            'AdditionalFeaturesKey....',
            response?.data?.key_features_details,
          );
        } else {
          console.error('additional_features_error:', response?.data?.error);
          alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('additional_features error:', error);
        alert(error);
        setIsLoading(false);
      });
  };
  const handleSaveSignup = async () => {
    setIsLoading(true);
    let newData = {
      user_key: user_key,
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber,
      email: email,
      physicalAddress: physicalAddress,
      p_longitude: p_longitude,
      p_latitude: p_latitude,
      state: state,
      country: country,
      city: city,
      organisation: companyName,
      referral: referral,
      selectedServiceKeysString: selectedServiceKeysString,
      kodieHelpValue: kodieHelpValue,
      location: propertyLocation,
      longitude: longitude,
      latitude: latitude,
      P_state: P_state,
      p_country: p_country,
      p_city: p_city,
      islocation: 1,
      propertyDesc: propertyDesc,
      property_value: property_value,
      key_features: JSON.stringify(AllCountsData),
      landArea: landArea,
      buildingFlorSize: buildingFlorSize,
      deviceId: deviceId,
      deviceType: deviceType,
      additional_features: PreFriedly,
      key_additional_features: additionalfeatureskeyvalue,
      auto_list: selectedButtonId,
      fcm_token: Fcm_token,
      run_your_business: run_your_business,
      bio: Bio,
      website: run_your_business === 0 ? IndividualWebSide : CompanyWebSide,
      company_latitude:
        run_your_business === 0 ? Individualp_latitude : Companyp_latitude,
      company_longitude:
        run_your_business === 0 ? Individualp_longitude : Companyp_longitude,
      company_address:
        run_your_business === 0 ? individualAddress : company_address,
      category_service_perform:
        run_your_business === 0
          ? IndividualservicesValue
          : CompanyservicesValue,
      category_service_offer:
        run_your_business === 0
          ? IndividualselectJobType
          : CompanyselectJobType,
      austrilian_busi_no: BusinessNumber,
      country_code: country_code,
    };
    if (ImageName?.path) {
      newData = {
        ...newData,
        image: {
          uri: ImageName?.path || '',
          type: ImageName?.mime || 'image/jpeg',
          name: String(ImageName?.path.split('/').pop()),
        },
      };
    }
    console.log('newData...', JSON.stringify(newData));
    console.log('ImageName?.path...', JSON.stringify(ImageName?.path));
    console.log('ImageName?.mime...', JSON.stringify(ImageName?.mime));
    console.log('image...', JSON.stringify(newData?.image));

    const formData = new FormData();
    formData.append('user', newData?.user_key);
    formData.append('first_name', newData?.firstName);
    formData.append('last_name', newData?.lastName);
    formData.append('phone_number', newData?.mobileNumber);
    formData.append('email', newData?.email);
    formData.append('physical_address', newData?.physicalAddress);
    formData.append('p_longitude', newData?.p_longitude);
    formData.append('p_latitude', newData?.p_latitude);
    formData.append('State', newData?.state);
    formData.append('Country', newData?.country);
    formData.append('City', newData?.city);
    formData.append('organisation_name', newData?.organisation);
    formData.append('referral_code', newData?.referral);
    formData.append('describe_yourself', newData?.selectedServiceKeysString);
    formData.append('kodie_help', newData?.kodieHelpValue);
    formData.append('property_manage', newData?.selectManageProperty);
    formData.append('location', newData?.location);
    formData.append('location_longitude', newData?.longitude);
    formData.append('location_latitude', newData?.latitude);
    formData.append('p_state', newData?.P_state);
    formData.append('p_country', newData?.p_country);
    formData.append('p_city', newData?.p_city);
    formData.append('islocation', newData?.islocation);
    formData.append('property_description', newData?.propertyDesc);
    formData.append('property_type', newData?.property_value);
    formData.append('key_features', newData?.key_features);
    formData.append('land_area', newData?.landArea);
    formData.append('floor_size', newData?.buildingFlorSize);
    formData.append('device_id', newData?.deviceId);
    formData.append('device_type', newData?.deviceType);
    formData.append('additional_features', newData?.additional_features);
    formData.append('auto_list', newData?.auto_list);
    formData.append('profile_photo', newData?.image);
    formData.append('fcm_token', newData?.fcm_token);
    formData.append('run_your_business', newData?.run_your_business);
    formData.append('bio', newData?.bio);
    formData.append('website', newData?.website);
    formData.append('company_latitude', newData?.company_latitude);
    formData.append('company_longitude', newData?.company_longitude);
    formData.append('company_address', newData?.company_address);
    formData.append(
      'category_service_perform',
      newData?.category_service_perform,
    );
    formData.append('category_service_offer', newData?.category_service_offer);
    formData.append('austrilian_busi_no', newData?.austrilian_busi_no);
    formData.append(
      'key_additional_features',
      newData?.key_additional_features,
    );
    formData.append('country_code', newData?.country_code);

    console.log('formData.....', JSON.stringify(formData));

    const res = await dispatch(signupAccountApiActionCreator(formData));
    console.log('signupAccountApiActionCreator..', res.data);
    if (res.data.status === true) {
      setIsLoading(false);

      registerUser();
      props.navigation.navigate('DrawerNavigatorLeftMenu');
      setCurrentPage(0);
      setAdditionalFeaturesKeyValue('');
    } else {
      setIsLoading(false);
      console.error('Save Account Details error:', res.data.error);
      alert(res.data.error);
    }
  };
  const registerUser = async () => {
    setIsLoading(true);
    const userId = uuid.v4();
    const storageRef = storage().ref(`user_images/${userId}`);
    await storageRef.putFile(ImageName.path);

    const downloadURL = await storageRef.getDownloadURL();
    try {
      await firestore()
        .collection('Users')
        .doc(userId)
        .set({
          name: `${firstName} ${lastName}`,
          email: email,
          mobile: mobileNumber,
          userId: userId,
          user_key: String(user_key),
          image: downloadURL,
        });
      console.log('User created');

      // Save data to AsyncStorage
      await AsyncStorage.setItem('USERID', userId);
      await AsyncStorage.setItem('NAME', firstName);
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('MOBILE', mobileNumber);
      await AsyncStorage.setItem('USERKEY', String(user_key));

      console.log('User data saved to AsyncStorage');
      props.navigation.navigate('DrawerNavigatorLeftMenu');

      // Call handleSaveSignup function
      // handleSaveSignup();
    } catch (error) {
      console.error('Error creating user:', error);
      setIsLoading(false);
    }
  };

  const handleSaveSignupfill = async () => {
    setIsLoading(true);
    let newData = {
      user_key: user_key,
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber,
      email: email,
      physicalAddress: physicalAddress,
      p_longitude: p_longitude,
      p_latitude: p_latitude,
      state: state,
      country: country,
      city: city,
      organisation: companyName,
      referral: referral,
      selectedServiceKeysString: selectedServiceKeysString,
      kodieHelpValue: kodieHelpValue,
      location: null,
      longitude: longitude,
      latitude: latitude,
      P_state: P_state,
      p_country: p_country,
      p_city: p_city,
      islocation: 1,
      propertyDesc: propertyDesc,
      property_value: property_value,
      key_features: '[]',
      landArea: landArea,
      buildingFlorSize: buildingFlorSize,
      deviceId: deviceId,
      deviceType: deviceType,
      additional_features: '[]',
      key_additional_features: '[]',
      auto_list: selectedButtonId,
      fcm_token: Fcm_token,
      run_your_business: run_your_business,
      bio: Bio,
      website: run_your_business === 0 ? IndividualWebSide : CompanyWebSide,
      company_latitude:
        run_your_business === 0 ? Individualp_latitude : Companyp_latitude,
      company_longitude:
        run_your_business === 0 ? Individualp_longitude : Companyp_longitude,
      company_address:
        run_your_business === 0 ? individualAddress : company_address,
      category_service_perform:
        run_your_business === 0
          ? IndividualservicesValue
          : CompanyservicesValue,
      category_service_offer:
        run_your_business === 0
          ? IndividualselectJobType
          : CompanyselectJobType,
      austrilian_busi_no: BusinessNumber,
      country_code: country_code,
    };
    if (ImageName?.path) {
      newData = {
        ...newData,
        image: {
          uri: ImageName?.path || '',
          type: ImageName?.mime || 'image/jpeg',
          name: String(ImageName?.path.split('/').pop()),
        },
      };
    }
    console.log('newData...', JSON.stringify(newData));
    console.log('ImageName?.path...', JSON.stringify(ImageName?.path));
    console.log('ImageName?.mime...', JSON.stringify(ImageName?.mime));
    console.log('image...', JSON.stringify(newData?.image));

    const formData = new FormData();
    formData.append('user', newData?.user_key);
    formData.append('first_name', newData?.firstName);
    formData.append('last_name', newData?.lastName);
    formData.append('phone_number', newData?.mobileNumber);
    formData.append('email', newData?.email);
    formData.append('physical_address', newData?.physicalAddress);
    formData.append('p_longitude', newData?.p_longitude);
    formData.append('p_latitude', newData?.p_latitude);
    formData.append('State', newData?.state);
    formData.append('Country', newData?.country);
    formData.append('City', newData?.city);
    formData.append('organisation_name', newData?.organisation);
    formData.append('referral_code', newData?.referral);
    formData.append('describe_yourself', newData?.selectedServiceKeysString);
    formData.append('kodie_help', newData?.kodieHelpValue);
    formData.append('property_manage', newData?.selectManageProperty);
    formData.append('location', newData?.location);
    formData.append('location_longitude', newData?.longitude);
    formData.append('location_latitude', newData?.latitude);
    formData.append('p_state', newData?.P_state);
    formData.append('p_country', newData?.p_country);
    formData.append('p_city', newData?.p_city);
    formData.append('islocation', newData?.islocation);
    formData.append('property_description', newData?.propertyDesc);
    formData.append('property_type', newData?.property_value);
    formData.append('key_features', newData?.key_features);
    formData.append('land_area', newData?.landArea);
    formData.append('floor_size', newData?.buildingFlorSize);
    formData.append('device_id', newData?.deviceId);
    formData.append('device_type', newData?.deviceType);
    formData.append('additional_features', newData?.additional_features);
    formData.append('auto_list', newData?.auto_list);
    formData.append('profile_photo', newData?.image);
    formData.append('fcm_token', newData?.fcm_token);
    formData.append('run_your_business', newData?.run_your_business);
    formData.append('bio', newData?.bio);
    formData.append('website', newData?.website);
    formData.append('company_latitude', newData?.company_latitude);
    formData.append('company_longitude', newData?.company_longitude);
    formData.append('company_address', newData?.company_address);
    formData.append(
      'category_service_perform',
      newData?.category_service_perform,
    );
    formData.append('category_service_offer', newData?.category_service_offer);
    formData.append('austrilian_busi_no', newData?.austrilian_busi_no);
    formData.append(
      'key_additional_features',
      newData?.key_additional_features,
    );
    formData.append('country_code', newData?.country_code);

    console.log('formData.....', JSON.stringify(formData));

    const res = await dispatch(signupAccountApiActionCreator(formData));
    console.log('signupAccountApiActionCreator..', res.data);
    if (res.data.status === true) {
      setIsLoading(false);
      // props.navigation.navigate('DrawerNavigatorLeftMenu');
      registerUserfill();
      setCurrentPage(0);
      setAdditionalFeaturesKeyValue('');
    } else {
      setIsLoading(false);
      console.error('Save Account Details error:', res.data.error);
      alert(res.data.error);
    }
  };
  const registerUserfill = async () => {
    setIsLoading(true);
    const userId = uuid.v4();
    const storageRef = storage().ref(`user_images/${userId}`);
    await storageRef.putFile(ImageName.path);

    const downloadURL = await storageRef.getDownloadURL();
    try {
      await firestore()
        .collection('Users')
        .doc(userId)
        .set({
          name: `${firstName} ${lastName}`,
          email: email,
          mobile: mobileNumber,
          userId: userId,
          user_key: String(user_key),
          image: downloadURL,
          // image: {
          //   uri: ImageName?.path || '',
          //   type: ImageName?.mime || 'image/jpeg',
          //   name: String(ImageName?.path.split('/').pop()),
          // },
        });
      console.log('User created');

      // Save data to AsyncStorage
      await AsyncStorage.setItem('USERID', userId);
      await AsyncStorage.setItem('NAME', firstName);
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('MOBILE', mobileNumber);
      await AsyncStorage.setItem('USERKEY', String(user_key));

      console.log('User data saved to AsyncStorage');
      props.navigation.navigate('DrawerNavigatorLeftMenu');
      // Call handleSaveSignup function
      // handleSaveSignupfill();
    } catch (error) {
      console.error('Error creating user:', error);
      setIsLoading(false);
    }
  };
  const goBack = () => {
    props.navigation.pop();
  };
  const ConfirmAddress = () => {
    setIsMap(false);
    setPropertyLocation(currentLocation);
  };
  const openMapandClose = text => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = Region => {
    setlatitude(Region.latitude);
    setlongitude(Region.longitude);
    getAddress(Region.latitude, Region.longitude);
    // getAddress();
  };
  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        console.log('json location.......', json);
        console.log('current address...', json.results[0].formatted_address);
        // setPropertyLocation(json.results[0].formatted_address);
        const formatedAddress = json.results[0].formatted_address;
        setCurrentLocation(formatedAddress);
        let MainFullAddress =
          json.results[0].address_components[1].long_name +
          ', ' +
          json.results[0].address_components[2].long_name +
          ', ' +
          json.results[0].address_components[3].long_name +
          ', ' +
          json.results[0].address_components[4].long_name +
          ', ' +
          json.results[0].address_components[5].long_name +
          ', ' +
          json.results[0].address_components[6].long_name +
          ', ' +
          json.results[0].address_components[7].long_name +
          ', ' +
          json.results[0].address_components[8].long_name;

        var addressComponent2 = json.results[0].address_components[1];
        setUserCurrentCity(addressComponent2.long_name);
        setUserZip_Code(json.results[1]?.address_components[6]?.long_name);
        setPropertyLocation(MainFullAddress);
      })
      .catch(error => console.warn(error));
  };
  const PreFriedly = `${selectedButtonDepositId}, ${selectedButtonFurnishedId}`;
  console.log(PreFriedly, 'pre friedly............');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor }}>
      <TopHeader
        MiddleText={IsMap || IsSearch ? 'Location' : 'Account set up'}
        onPressLeftButton={() => {
          IsMap ? setIsMap(false) : IsSearch ? setIsSearch(false) : goBack();
        }}
      />
      <View style={FirstPropertyStyle.container}>
        {IsMap ? (
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
            }}>
            <MapScreen
              style={{
                height: '100%',
                width: '100%',
                alignSelf: 'center',
                marginBottom: 10,
              }}
              onRegionChange={onRegionChange}
              Maplat={latitude}
              Maplng={longitude}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
                width: '96%',
                borderWidth: 1,
                borderRadius: 8,
                backgroundColor: 'white',
                borderColor: '#E5E4E2',
                marginTop: 10,
                position: 'absolute',
              }}>
              <TextInput
                style={{
                  backgroundColor: 'transparent',

                  width: '90%',
                  height: 45,
                  alignSelf: 'center',
                }}
                onFocus={() => openMapandClose()}
                placeholder={'Search Place'}
                placeholderTextColor={_COLORS.Kodie_BlackColor}
              />
            </View>
            {/* <TouchableOpacity
              style={FirstPropertyStyle.c_locationBtn}
              onPress={() => {}}
            >
              <Entypo
                name="location-pin"
                size={30}
                color={_COLORS.Kodie_lightGreenColor}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={FirstPropertyStyle.BtnContainer}
              onPress={ConfirmAddress}>
              <Image source={IMAGES?.Shape} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
          </View>
        ) : IsSearch ? (
          <SearchPlaces
            onPress={(data, details = null) => {
              console.log('LocationData....', details);
              setlatitude(details.geometry.location.lat);
              setlongitude(details.geometry.location.lng);
              setIsSearch(false);
              setIsMap(true);
              // setPropertyLocation(details.formatted_address);
              setCurrentLocation(details.formatted_address);
            }}
          />
        ) : (
          <View>
            <View style={FirstPropertyStyle.stepIndicator}>
              <StepIndicator
                customSignUpStepStyle={firstIndicatorSignUpStepStyle}
                currentPosition={currentPage}
                renderStepIndicator={renderStepIndicator}
                labels={labels}
                stepCount={3}
                renderLabel={renderLabel}
              />
            </View>
            <ScrollView>
              <View style={FirstPropertyStyle.headingView}>
                <Text style={FirstPropertyStyle.heading}>
                  {'Add your first property'}
                </Text>
              </View>
              <View style={FirstPropertyStyle.card}>
                <View style={FirstPropertyStyle.inputContainer}>
                  <Text style={LABEL_STYLES._texinputLabel}>Location</Text>
                  <View style={FirstPropertyStyle.locationConView}>
                    <View style={FirstPropertyStyle.locationContainer}>
                      <TextInput
                        style={FirstPropertyStyle.locationInput}
                        value={propertyLocation}
                        onChangeText={setPropertyLocation}
                        onFocus={() => {
                          setIsSearch(true);
                        }}
                        placeholder="Search location"
                        placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                      />
                    </View>
                    <TouchableOpacity
                      style={FirstPropertyStyle.locationIconView}
                      onPress={() => {
                        setIsMap(true);
                      }}>
                      <Octicons
                        name={'location'}
                        size={25}
                        color={_COLORS.Kodie_GreenColor}
                        style={FirstPropertyStyle.locationIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={FirstPropertyStyle.inputContainer}>
                  <Text style={LABEL_STYLES._texinputLabel}>
                    Property description
                  </Text>
                  <TextInput
                    style={FirstPropertyStyle.input}
                    value={propertyDesc}
                    onChangeText={setPropertyDesc}
                    placeholder="Describe your property here..."
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                    multiline
                    numberOfLines={5}
                    textAlignVertical={'top'}
                  />
                  <Text style={FirstPropertyStyle.characterLimit}>
                    {propertyDesc.length}/1000
                  </Text>
                </View>
                <View style={FirstPropertyStyle.inputContainer}>
                  <Text style={LABEL_STYLES._texinputLabel}>Property type</Text>
                  {/* <Dropdown
                    style={FirstPropertyStyle.dropdown}
                    placeholderStyle={[
                      FirstPropertyStyle.placeholderStyle,
                      {color: _COLORS.Kodie_LightGrayColor},
                    ]}
                    selectedTextStyle={FirstPropertyStyle.selectedTextStyle}
                    inputSearchStyle={FirstPropertyStyle.inputSearchStyle}
                    iconStyle={FirstPropertyStyle.iconStyle}
                    data={property_Data}
                    maxHeight={300}
                    labelField="lookup_description"
                    valueField="lookup_key"
                    placeholder="Please select property type"
                    value={property_value}
                    onChange={item => {
                      setProperty_value(item.lookup_key);
                    }}
                  /> */}
                  <Dropdown
                    style={FirstPropertyStyle.dropdown}
                    placeholderStyle={[
                      FirstPropertyStyle.placeholderStyle,
                      { color: _COLORS.Kodie_LightGrayColor },
                    ]}
                    selectedTextStyle={FirstPropertyStyle.selectedTextStyle}
                    inputSearchStyle={FirstPropertyStyle.inputSearchStyle}
                    iconStyle={FirstPropertyStyle.iconStyle}
                    data={property_Data}
                    maxHeight={300}
                    labelField="lookup_description"
                    valueField="lookup_key"
                    placeholder="Select property type"
                    value={
                      property_value
                    }
                    onChange={item => {
                      setProperty_value(item.lookup_key);

                    }}
                    renderItem={propertyType_render}
                  />
                </View>
                <Text
                  style={[
                    LABEL_STYLES._texinputLabel,
                    FirstPropertyStyle.addition_featureText,
                  ]}>
                  Key features
                </Text>
                <View style={FirstPropertyStyle.inputContainer}>
                  <View>
                    <View style={FirstPropertyStyle.mainfeaturesview}>
                      <View style={FirstPropertyStyle.key_feature_Text_view}>
                        <Text style={FirstPropertyStyle.key_feature_Text}>
                          {'Bedrooms'}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={FirstPropertyStyle.plus_minusview}>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                          onPress={decreaseBedroomCount}>
                          <AntDesign
                            name="minus"
                            size={20}
                            color={_COLORS.Kodie_BlackColor}
                          />
                        </TouchableOpacity>
                        <Text style={FirstPropertyStyle.countdata}>
                          {CountBedroom}
                        </Text>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                          onPress={() => {
                            increaseBedroomCount();
                          }}>
                          <AntDesign
                            name="plus"
                            size={20}
                            color={_COLORS.Kodie_BlackColor}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </View>

                    <View style={FirstPropertyStyle.mainfeaturesview}>
                      <View style={FirstPropertyStyle.key_feature_Text_view}>
                        <Text style={FirstPropertyStyle.key_feature_Text}>
                          {'Bathrooms'}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={FirstPropertyStyle.plus_minusview}>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                          onPress={decreaseBathroomCount}>
                          <AntDesign
                            name="minus"
                            size={20}
                            color={_COLORS.Kodie_BlackColor}
                          />
                        </TouchableOpacity>
                        <Text style={FirstPropertyStyle.countdata}>
                          {CountBathroom}
                        </Text>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                          onPress={increaseBathroomCount}>
                          <AntDesign
                            name="plus"
                            size={20}
                            color={_COLORS.Kodie_BlackColor}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </View>

                    <View style={FirstPropertyStyle.mainfeaturesview}>
                      <View style={FirstPropertyStyle.key_feature_Text_view}>
                        <Text style={FirstPropertyStyle.key_feature_Text}>
                          {'Parking spaces'}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={FirstPropertyStyle.plus_minusview}>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                          onPress={decreaseParkingCount}>
                          <AntDesign
                            name="minus"
                            size={20}
                            color={_COLORS.Kodie_BlackColor}
                          />
                        </TouchableOpacity>
                        <Text style={FirstPropertyStyle.countdata}>
                          {CountParking}
                        </Text>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                          onPress={increaseParkingCount}>
                          <AntDesign
                            name="plus"
                            size={20}
                            color={_COLORS.Kodie_BlackColor}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </View>

                    <View style={FirstPropertyStyle.mainfeaturesview}>
                      <View style={FirstPropertyStyle.key_feature_Text_view}>
                        <Text style={FirstPropertyStyle.key_feature_Text}>
                          {'On-street parking'}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={FirstPropertyStyle.plus_minusview}>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                          onPress={decreaseParkingStreetCount}>
                          <AntDesign
                            name="minus"
                            size={20}
                            color={_COLORS.Kodie_BlackColor}
                          />
                        </TouchableOpacity>
                        <Text style={FirstPropertyStyle.countdata}>
                          {CountParkingStreet}
                        </Text>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                          onPress={increaseParkingStreetCount}>
                          <AntDesign
                            name="plus"
                            size={20}
                            color={_COLORS.Kodie_BlackColor}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View>
                    <View style={FirstPropertyStyle.key_feature_mainView}>
                      <View style={FirstPropertyStyle.key_feature_subView}>
                        <Text style={FirstPropertyStyle.key_feature_Text}>
                          {'Building floor size  (optional)'}
                        </Text>
                      </View>

                      <View style={FirstPropertyStyle.floorsizeview}>
                        <TextInput
                          style={FirstPropertyStyle.flor_input_field}
                          value={buildingFlorSize}
                          onChangeText={setBuildingFlorSize}
                          placeholder="102m2"
                          placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                          keyboardType="number-pad"
                        />
                      </View>
                    </View>

                    <View style={FirstPropertyStyle.key_feature_mainView}>
                      <View style={FirstPropertyStyle.key_feature_subView}>
                        <Text style={FirstPropertyStyle.key_feature_Text}>
                          {'Land area (optional)'}
                        </Text>
                      </View>

                      <View style={FirstPropertyStyle.floorsizeview}>
                        <TextInput
                          style={FirstPropertyStyle.flor_input_field}
                          value={landArea}
                          onChangeText={setLandArea}
                          placeholder="102m2"
                          placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                          keyboardType="number-pad"
                        />
                      </View>
                    </View>
                  </View>

                  <View style={FirstPropertyStyle.addition_featureView}>
                    <Text
                      style={[
                        LABEL_STYLES._texinputLabel,
                        FirstPropertyStyle.addition_featureText,
                      ]}>
                      {'Additional features'}
                    </Text>
                    <View style={FirstPropertyStyle.addition_featureView}>
                      <Text style={FirstPropertyStyle.Furnished_Text}>
                        {'Furnished or unfurnished ?'}
                      </Text>
                      <RowButtons
                        LeftButtonText={'Furnished'}
                        leftButtonbackgroundColor={
                          !selectedButtonFurnished
                            ? _COLORS.Kodie_lightGreenColor
                            : _COLORS.Kodie_WhiteColor
                        }
                        LeftButtonTextColor={
                          !selectedButtonFurnished
                            ? _COLORS.Kodie_BlackColor
                            : _COLORS.Kodie_MediumGrayColor
                        }
                        LeftButtonborderColor={
                          !selectedButtonFurnished
                            ? _COLORS.Kodie_GrayColor
                            : _COLORS.Kodie_LightWhiteColor
                        }
                        onPressLeftButton={() => {
                          setSelectedButtonFurnished(false);
                          setSelectedButtonFurnishedId(67);
                          // alert(selectedButtonId)
                        }}
                        RightButtonText={'Unfurnished'}
                        RightButtonbackgroundColor={
                          selectedButtonFurnished
                            ? _COLORS.Kodie_lightGreenColor
                            : _COLORS.Kodie_WhiteColor
                        }
                        RightButtonTextColor={
                          selectedButtonFurnished
                            ? _COLORS.Kodie_BlackColor
                            : _COLORS.Kodie_MediumGrayColor
                        }
                        RightButtonborderColor={
                          selectedButtonFurnished
                            ? _COLORS.Kodie_GrayColor
                            : _COLORS.Kodie_LightWhiteColor
                        }
                        onPressRightButton={() => {
                          setSelectedButtonFurnished(true);
                          setSelectedButtonFurnishedId(68);
                          // alert(selectedButtonId)
                        }}
                      />
                    </View>
                    <View style={FirstPropertyStyle.addition_featureView}>
                      <Text style={FirstPropertyStyle.Furnished_Text}>
                        {'Pet friendly ?'}
                      </Text>
                      <RowButtons
                        LeftButtonText={'Yes'}
                        leftButtonbackgroundColor={
                          !selectedButtonDeposit
                            ? _COLORS.Kodie_lightGreenColor
                            : _COLORS.Kodie_WhiteColor
                        }
                        LeftButtonTextColor={
                          !selectedButtonDeposit
                            ? _COLORS.Kodie_BlackColor
                            : _COLORS.Kodie_MediumGrayColor
                        }
                        LeftButtonborderColor={
                          !selectedButtonDeposit
                            ? _COLORS.Kodie_GrayColor
                            : _COLORS.Kodie_LightWhiteColor
                        }
                        onPressLeftButton={() => {
                          setSelectedButtonDeposit(false);
                          setSelectedButtonDepositId(70);
                          // alert(selectedButtonId)
                        }}
                        RightButtonText={'No'}
                        RightButtonbackgroundColor={
                          selectedButtonDeposit
                            ? _COLORS.Kodie_lightGreenColor
                            : _COLORS.Kodie_WhiteColor
                        }
                        RightButtonTextColor={
                          selectedButtonDeposit
                            ? _COLORS.Kodie_BlackColor
                            : _COLORS.Kodie_MediumGrayColor
                        }
                        RightButtonborderColor={
                          selectedButtonDeposit
                            ? _COLORS.Kodie_GrayColor
                            : _COLORS.Kodie_LightWhiteColor
                        }
                        onPressRightButton={() => {
                          setSelectedButtonDeposit(true);
                          setSelectedButtonDepositId(71);
                          // alert(selectedButtonId)
                        }}
                      />
                    </View>
                  </View>

                  <View style={FirstPropertyStyle.inputContainer}>
                    <Text
                      style={[
                        LABEL_STYLES._texinputLabel,
                        FirstPropertyStyle.addition_featureText,
                      ]}>
                      Additional key features
                    </Text>
                    <MultiSelect
                      style={FirstPropertyStyle.dropdown}
                      placeholderStyle={[
                        FirstPropertyStyle.placeholderStyle,
                        { color: _COLORS.Kodie_LightGrayColor },
                      ]}
                      activeColor={"#a1fe68"}
                      selectedTextStyle={FirstPropertyStyle.selectedTextStyle}
                      inputSearchStyle={FirstPropertyStyle.inputSearchStyle}
                      iconStyle={FirstPropertyStyle.iconStyle}
                      data={additionalfeatureskey}
                      labelField="features_name"
                      valueField="paf_key"
                      placeholder="Select additional features"
                      value={additionalfeatureskeyvalue}
                      search
                      searchPlaceholder="Search..."
                      onChange={item => {
                        setAdditionalFeaturesKeyValue(item);
                        // alert(item);
                      }}
                      renderItem={renderDataItem}
                      renderSelectedItem={(item, unSelect) => (
                        <TouchableOpacity
                          onPress={() => unSelect && unSelect(item)}>
                          <View style={FirstPropertyStyle.selectedStyle}>
                            <Text style={FirstPropertyStyle.textSelectedStyle}>
                              {item.features_name}
                            </Text>
                            <AntDesign color="white" name="close" size={17} />
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>
              </View>
              <View style={{ marginHorizontal: 16 }}>
                <CustomSingleButton
                  disabled={isLoading ? true : false}
                  _ButtonText={'Save'}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    handleSaveSignup();
                    // registerUser();
                  }}
                />
              </View>
              <View style={{ marginHorizontal: 16 }}>
                <CustomSingleButton
                  disabled={isLoading ? true : false}
                  _ButtonText={'Fill these details out later'}
                  Text_Color={_COLORS.Kodie_BlackColor}
                  backgroundColor={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    handleSaveSignupfill();
                    // registerUserfill();
                  }}
                />
              </View>
              <TouchableOpacity
                style={FirstPropertyStyle.goBack_View}
                onPress={goBack}>
                <View style={FirstPropertyStyle.backIcon}>
                  <Ionicons
                    name="chevron-back"
                    size={22}
                    color={_COLORS.Kodie_MediumGrayColor}
                  />
                </View>
                <Text style={FirstPropertyStyle.goBack_Text}>{'Go back'}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </View>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
