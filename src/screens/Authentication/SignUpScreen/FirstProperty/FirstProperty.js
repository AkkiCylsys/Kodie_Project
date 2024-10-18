//ScreenNo:13
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {FirstPropertyStyle} from './FirstPropertyStyle';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../services/CommonServices';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {_COLORS, FONTFAMILY} from '../../../../Themes';
import {LABEL_STYLES, IMAGES} from '../../../../Themes';
import {Dropdown} from 'react-native-element-dropdown';
import MultiSelect from 'react-native-multiple-select';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import {Config} from '../../../../Config';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapScreen from '../../../../components/Molecules/GoogleMap/googleMap';
import SearchPlaces from '../../../../components/Molecules/SearchPlaces/SearchPlaces';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {signupAccountApiActionCreator} from '../../../../redux/Actions/Authentication/AuthenticationApiCreator';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import Counter from '../../../../components/Molecules/CounterComponent/Counter';
import ToggleButton from '../../../../components/Molecules/ToggleButton/ToggleButton';
import { isMap } from 'lodash';
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

const getStepIndicatorIconConfig = ({position, stepStatus}) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? '#ffffff' : '#ffffff',
    size: 20,
  };
  iconConfig.name = stepStatus === 'finished' ? 'check' : null;
  return iconConfig;
};
export default FirstProperty = props => {
  const device = DeviceInfo.getUniqueId();
  const deviceId = device?._z
  // const deviceType = DeviceInfo.getDeviceType();
  const deviceType = Platform.OS === 'ios' ? 'iOS' : 'Android';

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
  let password = props?.route?.params?.password;
  console.log(
    'individual',
    IndividualservicesValue,
    IndividualWebSide,
    IndividualselectJobType,
    Individualp_longitude,
  );
  console.log(
    'Company',
    CompanyservicesValue,
    CompanyWebSide,
    Companyp_latitude,
    CompanyservicesValue,
  );
  console.log('selectedServiceKeysString', user_key);
  console.log('user_key', password);
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
  const [CountReception, setCountReception] = useState(0);
  const [CountParkingStreet, setCountParkingStreet] = useState(0);
  const [buildingFlorSize, setBuildingFlorSize] = useState('');
  const [landArea, setLandArea] = useState('');
  const [Fcm_token, setFcm_token] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const dispatch = useDispatch();
  const [selectedButtonDepositId, setSelectedButtonDepositId] = useState(0);
  const [selectedButtonFurnishedId, setSelectedButtonFurnishedId] = useState(0);
  const [selectedButtonStorageId, setSelectedButtonStorageId] = useState(0);
  const [selectedButtonGardenId, setSelectedButtonGardenId] = useState(0);
  const P_addressParts = propertyLocation.split(', ');
  const p_city = P_addressParts[P_addressParts.length - 2]?.trim() ?? '';
  const P_state = P_addressParts[2]?.trim() ?? '';
  const p_country = P_addressParts[P_addressParts.length - 1]?.trim() ?? '';

  const [error, setError] = useState('');
  const [notesError, setNotesError] = useState('');
  const [propertyError, setPropertyError] = useState('');
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
  const AllCountsData = [
    {Bedrooms: CountBedroom},
    {Bathrooms: CountBathroom},
    {'Reception rooms': CountReception},
    {'Parking / garage spaces': CountParking},
    {'On-street parking': CountParkingStreet},
  ];
  const PreFriedly = `${selectedButtonFurnishedId}, ${selectedButtonStorageId}, ${selectedButtonGardenId}, ${selectedButtonDepositId}`;
  console.log(PreFriedly);
  // Update count function
  const updateCount = (type, operation) => {
    if (operation === 'increase') {
      switch (type) {
        case 'Bedroom':
          setCountBedroom(prev => prev + 1);
          break;
        case 'Bathroom':
          setCountBathroom(prev => prev + 1);
          break;
        case 'Reception':
          setCountReception(prev => prev + 1);
          break;
        case 'Parking':
          setCountParking(prev => prev + 1);
          break;
        case 'ParkingStreet':
          setCountParkingStreet(prev => prev + 1);
          break;
        default:
          break;
      }
    } else if (operation === 'decrease') {
      switch (type) {
        case 'Bedroom':
          if (CountBedroom > 0) setCountBedroom(prev => prev - 1);
          break;
        case 'Bathroom':
          if (CountBathroom > 0) setCountBathroom(prev => prev - 1);
          break;
        case 'Reception':
          if (CountReception > 0) setCountReception(prev => prev - 1);
          break;
        case 'Parking':
          if (CountParking > 0) setCountParking(prev => prev - 1);
          break;
        case 'ParkingStreet':
          if (CountParkingStreet > 0) setCountParkingStreet(prev => prev - 1);
          break;
        default:
          break;
      }
    }
  };
  const renderStepIndicator = params => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  const propertyType_render = item => {
    return (
      <View
        style={[
          FirstPropertyStyle.itemView,
          {
            backgroundColor:
              item?.lookup_key === property_value
                ? _COLORS.Kodie_MidLightGreenColor
                : null,
          },
        ]}>
        {item?.lookup_key === property_value ? (
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
          {item?.lookup_description}
        </Text>
      </View>
    );
  };
  const renderLabel = ({position, stepStatus}) => {
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
    console.log(propertyData, 'propertyDatapropertyData');
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
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('property_type error:', error);
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
        if (response?.data?.success === true) {
          setIsLoading(false);
          console.log('additional_features....', response?.data);
          setAdditionalfeatureskey(response?.data?.key_features_details);
          console.log(
            'AdditionalFeaturesKey....',
            response?.data?.key_features_details,
          );
        } else {
          console.error('additional_features_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('additional_features error:', error);
        setIsLoading(false);
      });
  };
  const handleTextInputFocus = () => {
    if (error) {
      setError('');
      setNotesError('');
      setPropertyError('');
    }
  };
  const handleNote = text => {
    setPropertyDesc(text);
    if (text.trim() === '') {
      setNotesError('Please enter note!');
    } else {
      setNotesError('');
    }
  };
  console.log(additionalfeatureskeyvalue,"[additionalfeatureskeyvalue]");
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
      key_additional_features: JSON.stringify(additionalfeatureskeyvalue),
      selectManageProperty: selectManageProperty,
      auto_list: 0,
      fcm_token: Fcm_token,
      run_your_business: run_your_business,
      bio: Bio,
      website: CompanyWebSide,
      p_website_individual: IndividualWebSide,
      company_latitude: Companyp_latitude,
      company_latitude_individual: Individualp_latitude,
      company_longitude: Companyp_longitude,
      company_longitude_individual: Individualp_longitude,
      company_address: company_address,
      company_address_individual: individualAddress,
      category_service_perform: CompanyservicesValue,
      category_service_perform_individual: IndividualservicesValue,
      category_service_offer: CompanyselectJobType,
      category_service_offer_individual: IndividualselectJobType,
      austrilian_busi_no: BusinessNumber,
      country_code: country_code,
    };
    console.log('newData....', newData);
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
    const formData = new FormData();
  
    // Fields to append in formData
    const fields = {
      user: newData?.user_key,
      email: newData?.email,
      first_name: newData?.firstName,
      last_name: newData?.lastName,
      country_code: newData?.country_code,
      phone_number: newData?.mobileNumber,
      physical_address: newData?.physicalAddress,
      p_longitude: newData?.p_longitude,
      p_latitude: newData?.p_latitude,
      State: newData?.state,
      Country: newData?.country,
      City: newData?.city,
      organisation_name: newData?.organisation,
      referral_code: newData?.referral,
      describe_yourself: newData?.selectedServiceKeysString,
      kodie_help: newData?.kodieHelpValue,
      property_manage: newData?.selectManageProperty,
      location: newData?.location,
      location_longitude: newData?.longitude,
      location_latitude: newData?.latitude,
      islocation: newData?.islocation,
      property_description: newData?.propertyDesc,
      property_type: newData?.property_value,
      key_features: newData?.key_features,
      additional_features: newData?.additional_features,
      key_additional_features: newData?.key_additional_features,
      auto_list: newData?.auto_list,
      land_area: newData?.landArea,
      floor_size: newData?.buildingFlorSize,
      p_state: newData?.P_state,
      p_country: newData?.p_country,
      p_city: newData?.p_city,
      device_id: newData?.deviceId,
      device_type: newData?.deviceType,
      fcm_token: newData?.fcm_token,
      run_your_business: newData?.run_your_business,
      austrilian_busi_no: newData?.austrilian_busi_no,
      category_service_offer: newData?.category_service_offer,
      category_service_offer_individual: newData?.category_service_offer_individual,
      category_service_perform: newData?.category_service_perform,
      category_service_perform_individual: newData?.category_service_perform_individual,
      company_address: newData?.company_address,
      company_address_individual: newData?.company_address_individual,
      company_longitude: newData?.company_longitude,
      company_longitude_individual: newData?.company_longitude_individual,
      company_latitude: newData?.company_latitude,
      company_latitude_individual: newData?.company_latitude_individual,
      website: newData?.website,
      p_website_individual: newData?.p_website_individual,
      bio: newData?.bio,
      profile_photo: newData?.image,
    };
  
    // Append fields to formData
    for (const key in fields) {
      if (fields[key] !== undefined) {
        formData.append(key, fields[key]);
      }
    }
    console.log('formData.....', JSON.stringify(formData));

    const res = await dispatch(signupAccountApiActionCreator(formData));
    console.log('signupAccountApiActionCreator..', res?.data);
    if (res?.data?.status === true) {
      setIsLoading(false);
      registerUser();
      // props.navigation.navigate('DrawerNavigatorLeftMenu');
      // setCurrentPage(0);
      // setAdditionalFeaturesKeyValue([]);
    } else {
      setIsLoading(false);
      console.error('Save Account Details error:', res?.data?.error);
    }
  };
  const registerUser = async () => {
    setIsLoading(true);
    const userId = uuid.v4();

    try {
      let downloadURL = ''; // Initialize as empty

      if (ImageName && ImageName.path) {
        const storageRef = storage().ref(`user_images/${userId}`);
        await storageRef.putFile(ImageName.path);
        downloadURL = await storageRef.getDownloadURL();
      } else {
        // If no image is provided, set a default image URL
        downloadURL = ''; // Replace with your default image URL
      }

      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await firestore()
        .collection('Users')
        .doc(userCredential.user.uid)
        .set({
          name: `${firstName} ${lastName}`,
          email: email,
          mobile: mobileNumber,
          userId: userId,
          user_key: String(user_key),
          image: downloadURL,
        });

      await AsyncStorage.setItem('USERID', userId);
      await AsyncStorage.setItem('NAME', firstName);
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('MOBILE', mobileNumber);
      await AsyncStorage.setItem('USERKEY', String(user_key));

      console.log('User data saved to AsyncStorage');
      props.navigation.navigate('DrawerNavigatorLeftMenu');
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
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
      selectManageProperty: selectManageProperty,
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
      auto_list: 0,
      fcm_token: Fcm_token,
      run_your_business: run_your_business,
      bio: Bio,
      website: CompanyWebSide,
      p_website_individual: IndividualWebSide,
      company_latitude: Companyp_latitude,
      company_latitude_individual: Individualp_latitude,
      company_longitude: Companyp_longitude,
      company_longitude_individual: Individualp_longitude,
      company_address: company_address,
      company_address_individual: individualAddress,
      category_service_perform: CompanyservicesValue,
      category_service_perform_individual: IndividualservicesValue,
      category_service_offer: CompanyselectJobType,
      category_service_offer_individual: IndividualselectJobType,
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
    const formData = new FormData();
    formData.append('user', newData?.user_key);
    formData.append('email', newData?.email);
    formData.append('first_name', newData?.firstName);
    formData.append('last_name', newData?.lastName);
    formData.append('country_code', newData?.country_code);
    formData.append('phone_number', newData?.mobileNumber);
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
    formData.append('islocation', newData?.islocation);
    formData.append('property_description', newData?.propertyDesc);
    formData.append('property_type', newData?.property_value);
    formData.append('key_features', newData?.key_features);
    formData.append('additional_features', newData?.additional_features);
    formData.append(
      'key_additional_features',
      newData?.key_additional_features,
    );
    formData.append('auto_list', newData?.auto_list);
    formData.append('land_area', newData?.landArea);
    formData.append('floor_size', newData?.buildingFlorSize);
    formData.append('p_state', newData?.P_state);
    formData.append('p_country', newData?.p_country);
    formData.append('p_city', newData?.p_city);
    formData.append('device_id', newData?.deviceId);
    formData.append('device_type', newData?.deviceType);
    formData.append('fcm_token', newData?.fcm_token);
    formData.append('run_your_business', newData?.run_your_business);
    formData.append('austrilian_busi_no', newData?.austrilian_busi_no);
    formData.append('category_service_offer', newData?.category_service_offer);
    formData.append(
      'category_service_offer_individual',
      newData?.category_service_offer_individual,
    );
    formData.append(
      'category_service_perform',
      newData?.category_service_perform,
    );
    formData.append(
      'category_service_perform_individual',
      newData?.category_service_perform_individual,
    );
    formData.append('company_address', newData?.company_address);
    formData.append(
      'company_address_individual',
      newData?.company_address_individual,
    );
    formData.append('company_longitude', newData?.company_longitude);
    formData.append(
      'company_longitude_individual',
      newData?.company_longitude_individual,
    );
    formData.append('company_latitude', newData?.company_latitude);
    formData.append(
      'company_latitude_individual',
      newData?.company_latitude_individual,
    );
    formData.append('website', newData?.website);
    formData.append('p_website_individual', newData?.p_website_individual);
    formData.append('bio', newData?.bio);
    formData.append('profile_photo', newData?.image);
    console.log('formData.....', JSON.stringify(formData));

    const res = await dispatch(signupAccountApiActionCreator(formData));
    console.log('signupAccountApiActionCreator..', res.data);
    if (res.data.status === true) {
      setIsLoading(false);
      registerUserfill();

      // props.navigation.navigate('DrawerNavigatorLeftMenu');
      // setCurrentPage(0);
      // setAdditionalFeaturesKeyValue([]);
    } else {
      setIsLoading(false);
      console.error('Save Account Details error:', res?.data?.error);
    }
  };
  const registerUserfill = async () => {
    setIsLoading(true);
    const userId = uuid.v4();

    try {
      let downloadURL = ''; // Initialize as empty

      if (ImageName && ImageName.path) {
        const storageRef = storage().ref(`user_images/${userId}`);
        await storageRef.putFile(ImageName.path);
        downloadURL = await storageRef.getDownloadURL();
      } else {
        // If no image is provided, set a default image URL
        downloadURL = ''; // Replace with your default image URL
      }

      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await firestore()
        .collection('Users')
        .doc(userCredential.user.uid)
        .set({
          name: `${firstName} ${lastName}`,
          email: email,
          mobile: mobileNumber,
          userId: userId,
          user_key: String(user_key),
          image: downloadURL,
        });

      await AsyncStorage.setItem('USERID', userId);
      await AsyncStorage.setItem('NAME', firstName);
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('MOBILE', mobileNumber);
      await AsyncStorage.setItem('USERKEY', String(user_key));

      console.log('User data saved to AsyncStorage');
      props.navigation.navigate('DrawerNavigatorLeftMenu');
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    props.navigation.pop();
  };
  const ConfirmAddress = () => {
    setIsMap(false);
    setPropertyLocation(currentLocation);
    setError('');
  };
  const openMapandClose = text => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = Region => {
    setlatitude(Region.latitude);
    setlongitude(Region.longitude);
    getAddress(Region.latitude, Region.longitude);
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
  const onSelectedItemsChange = selectedItems => {
    setAdditionalFeaturesKeyValue(selectedItems);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
        <TopHeader
          MiddleText={IsMap || IsSearch ? 'Location' : 'Account set up'}
          onPressLeftButton={() => {
            IsMap ? setIsMap(false) : IsSearch ? setIsSearch(false) : goBack();
          }}
        />
        <View style={[Platform.OS ==  'android'? FirstPropertyStyle.Androidcontainer: FirstPropertyStyle.Ioscontainer]}>
          {IsMap ? (
            <View
              style={{
                flex:1,
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
                iscancel={() => setIsMap(false)}
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
              <TouchableOpacity
                style={FirstPropertyStyle.BtnContainer}
                onPress={ConfirmAddress}>
                <Image source={IMAGES?.Shape} style={{height: 25, width: 25}} />
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
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={FirstPropertyStyle.headingView}>
                  <Text style={FirstPropertyStyle.heading}>
                    {'Add your first property'}
                  </Text>
                </View>
                <View style={FirstPropertyStyle.card}>
                  <View style={FirstPropertyStyle.inputContainer}>
                    <Text style={LABEL_STYLES._texinputLabel}>
                      Location
                      <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
                    </Text>
                    <View style={FirstPropertyStyle.locationConView}>
                      <View
                        style={[
                          FirstPropertyStyle.locationContainer,
                          {
                            borderColor: error
                              ? _COLORS?.Kodie_redColor
                              : _COLORS?.Kodie_LightGrayColor,
                          },
                        ]}>
                        <TextInput
                          style={FirstPropertyStyle.locationInput}
                          value={propertyLocation}
                          onChangeText={text => {
                            setPropertyLocation(text);
                            if (text && error) setError('');
                            handleTextInputFocus(); // Clear error message if location is being filled
                          }}
                          onFocus={() => {
                            handleTextInputFocus();
                            setIsSearch(true);
                          }}
                          placeholder="Search location"
                          placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                        />
                      </View>
                      <TouchableOpacity
                        style={[
                          FirstPropertyStyle.locationIconView,
                          {
                            borderColor: error
                              ? _COLORS?.Kodie_redColor
                              : _COLORS?.Kodie_LightGrayColor,
                          },
                        ]}
                        onPress={() => {
                          setIsMap(true);
                          handleTextInputFocus();
                        }}>
                        <Octicons
                          name={'location'}
                          size={25}
                          color={_COLORS.Kodie_GreenColor}
                          style={FirstPropertyStyle.locationIcon}
                        />
                      </TouchableOpacity>
                    </View>
                    {error ? (
                      <Text style={FirstPropertyStyle?.Error_Text}>
                        {error}
                      </Text>
                    ) : null}
                  </View>
                  <View style={[FirstPropertyStyle.inputContainer]}>
                    <Text style={LABEL_STYLES._texinputLabel}>
                      Notes
                      <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
                    </Text>
                    <TextInput
                      style={[
                        FirstPropertyStyle.input,
                        {
                          borderColor: notesError
                            ? _COLORS?.Kodie_redColor
                            : _COLORS?.Kodie_LightGrayColor,
                        },
                      ]}
                      value={propertyDesc}
                      onChangeText={handleNote}
                      placeholder="Add any information about your property"
                      placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                      multiline
                      numberOfLines={5}
                      textAlignVertical={'top'}
                      onBlur={() => handleNote(propertyDesc)}
                    />
                    <Text style={FirstPropertyStyle.characterLimit}>
                      {propertyDesc.length}/1000
                    </Text>
                    {notesError ? (
                      <Text style={FirstPropertyStyle.Error_Text}>
                        {notesError}
                      </Text>
                    ) : null}
                  </View>
                  <View style={FirstPropertyStyle.inputContainer}>
                    <Text style={LABEL_STYLES._texinputLabel}>
                      Property type
                      <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
                    </Text>
                    <Dropdown
                      style={[
                        FirstPropertyStyle.dropdown,
                        {
                          borderColor: propertyError
                            ? _COLORS?.Kodie_redColor
                            : _COLORS?.Kodie_LightGrayColor,
                        },
                      ]}
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
                      placeholder="Select property type"
                      value={property_value}
                      onChange={item => {
                        setProperty_value(item.lookup_key);
                        setPropertyError('');
                      }}
                      renderItem={propertyType_render}
                    />
                    {propertyError ? (
                      <Text style={FirstPropertyStyle.Error_Text}>
                        {propertyError}
                      </Text>
                    ) : null}
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
                      <Counter
                        label="Bedrooms"
                        count={CountBedroom}
                        onIncrease={() => updateCount('Bedroom', 'increase')}
                        onDecrease={() => updateCount('Bedroom', 'decrease')}
                      />
                      <Counter
                        label="Bathrooms"
                        count={CountBathroom}
                        onIncrease={() => updateCount('Bathroom', 'increase')}
                        onDecrease={() => updateCount('Bathroom', 'decrease')}
                      />
                      <Counter
                        label="Reception rooms"
                        count={CountReception}
                        onIncrease={() => updateCount('Reception', 'increase')}
                        onDecrease={() => updateCount('Reception', 'decrease')}
                      />
                      <Counter
                        label="Parking / garage spaces"
                        count={CountParking}
                        onIncrease={() => updateCount('Parking', 'increase')}
                        onDecrease={() => updateCount('Parking', 'decrease')}
                      />
                      <Counter
                        label="On-street parking"
                        count={CountParkingStreet}
                        onIncrease={() =>
                          updateCount('ParkingStreet', 'increase')
                        }
                        onDecrease={() =>
                          updateCount('ParkingStreet', 'decrease')
                        }
                      />
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
                            placeholder="- m2"
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
                            placeholder="- m2"
                            placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                            keyboardType="number-pad"
                          />
                        </View>
                      </View>
                    </View>

                    <View>
                      <Text
                        style={[
                          LABEL_STYLES._texinputLabel,
                          FirstPropertyStyle.addition_featureText,
                        ]}>
                        {'Additional features'}
                      </Text>
                      <View style={[FirstPropertyStyle.addition_featureView]}>
                        <View style={{flex: 1}}>
                          <Text style={FirstPropertyStyle.Furnished_Text}>
                            {'Furnished?'}
                          </Text>
                          <ToggleButton
                            tabValue={selectedButtonFurnishedId}
                            setTabValue={setSelectedButtonFurnishedId}
                            activeColor={_COLORS.Kodie_GreenColor}
                            inactiveColor={_COLORS.Kodie_WhiteColor}
                            activeTextColor={_COLORS.Kodie_WhiteColor}
                            inactiveTextColor={_COLORS.Kodie_BlackColor}
                            firstTabLabel="Yes"
                            secondTabLabel="No"
                          />
                        </View>
                        <View style={{margin: 11}} />
                        <View style={{flex: 1}}>
                          <Text style={FirstPropertyStyle.Furnished_Text}>
                            {'External storage?'}
                          </Text>
                          <ToggleButton
                            tabValue={selectedButtonStorageId}
                            setTabValue={setSelectedButtonStorageId}
                            activeColor={_COLORS.Kodie_GreenColor}
                            inactiveColor={_COLORS.Kodie_WhiteColor}
                            activeTextColor={_COLORS.Kodie_WhiteColor}
                            inactiveTextColor={_COLORS.Kodie_BlackColor}
                            firstTabLabel="Yes"
                            secondTabLabel="No"
                          />
                        </View>
                      </View>
                      <View style={FirstPropertyStyle.addition_featureView}>
                        <View style={{flex: 1}}>
                          <Text style={FirstPropertyStyle.Furnished_Text}>
                            {'Garden?'}
                          </Text>
                          <ToggleButton
                            tabValue={selectedButtonGardenId}
                            setTabValue={setSelectedButtonGardenId}
                            activeColor={_COLORS.Kodie_GreenColor}
                            inactiveColor={_COLORS.Kodie_WhiteColor}
                            activeTextColor={_COLORS.Kodie_WhiteColor}
                            inactiveTextColor={_COLORS.Kodie_BlackColor}
                            firstTabLabel="Yes"
                            secondTabLabel="No"
                          />
                        </View>
                        <View style={{margin: 11}} />
                        <View style={{flex: 1}}>
                          <Text style={FirstPropertyStyle.Furnished_Text}>
                            {'Disability access?'}
                          </Text>
                          <ToggleButton
                            tabValue={selectedButtonDepositId}
                            setTabValue={setSelectedButtonDepositId}
                            activeColor={_COLORS.Kodie_GreenColor}
                            inactiveColor={_COLORS.Kodie_WhiteColor}
                            activeTextColor={_COLORS.Kodie_WhiteColor}
                            inactiveTextColor={_COLORS.Kodie_BlackColor}
                            firstTabLabel="Yes"
                            secondTabLabel="No"
                          />
                        </View>
                      </View>
                    </View>

                    <View style={FirstPropertyStyle?.inputContainer}>
                      <Text
                        style={[
                          LABEL_STYLES._texinputLabel,
                          FirstPropertyStyle.featureText,
                        ]}>
                        Additional key features
                      </Text>
                      <MultiSelect
                        // hideDropdown
                        items={additionalfeatureskey}
                        uniqueKey="paf_key"
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={additionalfeatureskeyvalue}
                        selectText="Add features such as pool, aircon, balcony etc."
                        searchInputPlaceholderText="Search Items..."
                        onChangeInput={item => {
                          console.warn(item);
                        }}
                        tagBorderColor={_COLORS.Kodie_BlackColor}
                        selectedItemTextColor={_COLORS.Kodie_GreenColor}
                        selectedItemIconColor={_COLORS.Kodie_GreenColor}
                        itemTextColor="#000"
                        displayKey="features_name"
                        searchInputStyle={{
                          color: _COLORS.Kodie_BlackColor,
                          borderColor: _COLORS.Kodie_GrayColor,
                          height: 40,
                          borderRadius: 5,
                          paddingHorizontal: 0,
                        }}
                        styleListContainer={{
                          paddingVertical: 10,
                          height: 200,
                        }}
                        styleRowList={{
                          height: 40,
                        }}
                        tagContainerStyle={{
                          borderWidth: 1,
                          height: 32,
                          backgroundColor: _COLORS.Kodie_BlackColor,
                        }}
                        tagRemoveIconColor={_COLORS.Kodie_WhiteColor}
                        styleTextTag={{
                          fontSize: 14,
                          color: _COLORS.Kodie_WhiteColor,
                          fontFamily: FONTFAMILY.K_Medium,
                        }}
                        styleTextDropdown={{
                          marginLeft: 20,
                          paddingHorizontal:
                            additionalfeatureskeyvalue.length > 0 ? 10 : 5,
                        }}
                        styleDropdownMenu={[
                          FirstPropertyStyle.dropdown,
                          {
                            paddingHorizontal:
                              additionalfeatureskeyvalue.length > 0 ? 10 : 5,
                          },
                        ]}
                        submitButtonColor={_COLORS.Kodie_GreenColor}
                        submitButtonText={
                          additionalfeatureskeyvalue.length > 0
                            ? 'Done'
                            : 'Cancel'
                        }
                      />
                    </View>
                  </View>
                </View>
                <View style={{marginHorizontal: 16}}>
                  <CustomSingleButton
                    disabled={isLoading ? true : false}
                    _ButtonText={'Save'}
                    Text_Color={_COLORS.Kodie_WhiteColor}
                    onPress={() => {
                      let isValid = true;
                      console.log('property_value:', property_value);
                      if (!propertyLocation) {
                        setError('Please enter a location!');
                        setNotesError(''); // Clear previous errors
                        setPropertyError('');
                        isValid = false;
                      } else if (!propertyDesc) {
                        setError(''); // Clear previous errors
                        setNotesError('Please enter notes!');
                        setPropertyError('');
                        isValid = false;
                      } else if (
                        property_value === null ||
                        property_value === undefined ||
                        property_value <= 0
                      ) {
                        setError(''); // Clear previous errors
                        setNotesError('');
                        setPropertyError('Please select a property type!');
                        isValid = false;
                      } else {
                        // Clear all errors if all fields are valid
                        setError('');
                        setNotesError('');
                        setPropertyError('');
                      }

                      if (isValid) {
                        handleSaveSignup();
                      }
                    }}
                    marginBottom={20}
                  />
                </View>
                <View style={{marginHorizontal: 16}}>
                  <CustomSingleButton
                    disabled={isLoading ? true : false}
                    _ButtonText={'Fill these details out later'}
                    Text_Color={_COLORS.Kodie_BlackColor}
                    backgroundColor={_COLORS.Kodie_WhiteColor}
                    onPress={() => {
                      handleSaveSignupfill();
                      // alert('kk')
                    }}
                    marginBottom={20}
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
                  <Text style={FirstPropertyStyle.goBack_Text}>
                    {'Go back'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}
        </View>
        {isLoading ? <CommonLoader /> : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
