//ScreenNo:11
//ScreenNo:12
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  BackHandler,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import uuid from 'react-native-uuid';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import Geocoder from 'react-native-geocoding';
import {AboutYouStyle} from './AboutYouStyle';
import ServicesBox from '../../../../components/Molecules/ServicesBox/ServicesBox';
import {IMAGES, LABEL_STYLES, _COLORS} from '../../../../Themes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../services/CommonServices';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import IndividualSignup from './IndividualSignup/IndividualSignup';
import CompanySignup from './CompanySignup/CompanySignup';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import MapScreen from '../../../../components/Molecules/GoogleMap/googleMap';
import SearchPlaces from '../../../../components/Molecules/SearchPlaces/SearchPlaces';
import {FirstPropertyStyle} from '../FirstProperty/FirstPropertyStyle';
import {SignupLookupDetails} from '../../../../APIs/AllApi';
import IndividualSignupStyle from './IndividualSignup/IndividualSignupStyle';
import Octicons from 'react-native-vector-icons/Octicons';
import MultiSelect from 'react-native-multiple-select';
import CompanySignupStyle from './CompanySignup/CompanySignupStyle';
import {MapOverlay} from 'react-native-maps';
import DeviceInfo from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import {signupAccountApiActionCreator} from '../../../../redux/Actions/Authentication/AuthenticationApiCreator';

const firstIndicatorSignUpStepStyle = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: _COLORS.Kodie_GrayColor,
  separatorUnFinishedColor: _COLORS.Kodie_GrayColor,
  stepIndicatorFinishedColor: _COLORS.Kodie_GreenColor,
  stepIndicatorUnFinishedColor: _COLORS.Kodie_GrayColor,
  stepIndicatorCurrentColor: _COLORS.Kodie_GreenColor,
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

export default AboutYou = props => {
  const device = DeviceInfo.getUniqueId();
  const deviceId = device?._z
  // const deviceType = DeviceInfo.getDeviceType();
  const deviceType = Platform.OS === 'ios' ? 'iOS' : 'Android';
  let firstName = props?.route?.params?.firstName;
  let lastName = props?.route?.params?.lastName;
  let mobileNumber = props?.route?.params?.mobileNumber;
  let physicalAddress = props?.route?.params?.physicalAddress;
  let organisation = props?.route?.params?.organisation;
  let referral = props?.route?.params?.referral;
  let email = props?.route?.params?.email;
  let country = props?.route?.params?.country;
  let state = props?.route?.params?.state;
  let city = props?.route?.params?.city;
  let p_latitude = props?.route?.params?.p_latitude;
  let p_longitude = props?.route?.params?.p_longitude;
  let user_key = props?.route?.params?.user_key;
  let ImageName = props?.route?.params?.image;
  let Bio = props?.route?.params?.Bio;
  let country_code = props?.route?.params?.country_code;
  let password = props?.route?.params?.password;
  console.log('user_key:', user_key);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setIsClick] = useState(null);
  const [Fcm_token, setFcm_token] = useState('');

  const [selectManageProperty, setSelectManageProperty] = useState('');
  const [selectManagePropertyError, setSelectManagePropertyError] =
    useState('');
  const [selected, setSelected] = useState([]);
  const [kodiehelpData, setKodiehelpData] = useState([]);
  const [kodieDescribeYourselfId, setKodieDescribeYourselfDataId] =
    useState('');
  const [manage_property_Data, setmanage_property_Data] = useState([]);
  const [kodiehelplookupid, setKodiehelplookupid] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedServicesError, setSelectedServicesError] = useState([]);
  const [selectedLookupKeys, setSelectedLookupKeys] = useState([]); // State to store selected lookup keys
  const [Individual, setIndividual] = useState({});
  const [CompanyCome, setCompanyCome] = useState({});
  const [UserCurrentCity, setUserCurrentCity] = useState('');
  const [UserZip_Code, setUserZip_Code] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [Companylatitude, setCompanylatitude] = useState('');
  const [Companylongitude, setCompanylongitude] = useState('');
  const [Companylocation, setCompanyLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [website, setWebsite] = useState('');
  const [Indiwebsite, setIndiWebsite] = useState('');
  const [companyGSTNumber, setCompanyGSTNumber] = useState('');
  const [location, setLocation] = useState('');
  const [IndiservicesValue, setIndiservicesValue] = useState([]);
  const [servicesValue, setservicesValue] = useState([]);
  const [businessNumber, setBusinessNumber] = useState('');
  const [businessNumberError, setBusinessNumberError] = useState('');
  const [kodieDescribeYourselfData, setKodieDescribeYourselfData] = useState(
    [],
  );
  const [kodieServicesData, setKodieServicesData] = useState([]);
  const [IndikodieServicesData, setIndiKodieServicesData] = useState([]);
  const [selectJobTypeid, setSelectJobTypeid] = useState([]);
  const [selectJobTypeidError, setSelectJobTypeidError] = useState([]);
  const [IndiselectJobTypeid, setIndiSelectJobTypeid] = useState([]);
  const [IndiselectJobTypeidError, setIndiSelectJobTypeidError] = useState([]);
  const [selectJobType, setSelectJobType] = useState('');
  const [IndiselectJobType, setIndiSelectJobType] = useState();
  const [servicesData, setServicesData] = useState([]);
  const [IndiservicesData, setIndiServicesData] = useState([]);
  const isvisible = useIsFocused();
  const hasBasicInfo =
    kodieDescribeYourselfId.includes(2) || kodieDescribeYourselfId.includes(4);
  const hasPropertyInfo = kodieDescribeYourselfId.includes(3);
  const hasAdditionalInfo = kodieDescribeYourselfId.includes(10);

  // Simplified label logic based on conditions
  const labels =
    (hasBasicInfo && hasPropertyInfo) || (hasAdditionalInfo && hasBasicInfo)
      ? ['Step 1', 'Step 2', 'Step 3']
      : hasBasicInfo
      ? ['Step 1', 'Step 2']
      : ['Step 1', 'Step 2', 'Step 3'];
  const stepCount =
    (hasBasicInfo && hasPropertyInfo) || (hasAdditionalInfo && hasBasicInfo)
      ? 3
      : hasBasicInfo
      ? 2
      : 3;
  const handleButton =
    (hasBasicInfo && hasPropertyInfo) || (hasAdditionalInfo && hasBasicInfo)
      ? 'Next'
      : hasBasicInfo
      ? 'Save'
      : 'Next';
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
  // validation
  const naviagteData = () => {
    props.navigation.navigate('FirstProperty', {
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber,
      physicalAddress: physicalAddress,
      referral: referral,
      selectManageProperty: selectManageProperty,
      selectedServiceKeysString: selectedServiceKeysString,
      kodieHelpValue: kodieHelpValue,
      ImageName: ImageName,
      Bio: Bio,
      email: email,
      country: country,
      state: state,
      city: city,
      p_latitude: p_latitude,
      p_longitude: p_longitude,
      user_key: user_key,
      BusinessNumber: businessNumber,
      companyName: companyName,
      CompanyselectJobType: selectedselectJobTypesString,
      CompanyservicesValue: servicesValue,
      CompanyWebSide: website,
      Individualp_latitude: p_latitude || latitude,
      Individualp_longitude: p_longitude || longitude,
      individualAddress: physicalAddress || location,
      Companyp_latitude: Companylatitude,
      Companyp_longitude: Companylongitude,
      IndividualselectJobType: selectedselectIndiJobTypesString,
      IndividualservicesValue: IndiservicesValue,
      IndividualWebSide: Indiwebsite,
      run_your_business: '0 , 1',
      company_address: Companylocation,
      country_code: country_code,
      password: password,
    });
  };
  const validateSelection = newSelected => {
    if (newSelected.length === 0) {
      setSelectedServicesError('Please select an option!');
    } else {
      setSelectedServicesError('');
    }
  };
  const validateManyProperty = newSelected => {
    if (newSelected.length === 0) {
      setSelectManagePropertyError('Please select an option.');
    } else {
      setSelectManagePropertyError('');
    }
  };

  const validateCategorySelection = newCategorySelected => {
    if (newCategorySelected.length === 0) {
      setSelectJobTypeidError('Please select an option!');
    } else {
      setSelectJobTypeidError('');
    }
  };
  const validateIndiCategorySelection = newIndiCategorySelected => {
    if (newIndiCategorySelected.length === 0) {
      setIndiSelectJobTypeidError(
        'Please select an option!',
      );
    } else {
      setIndiSelectJobTypeidError('');
    }
  };
  const validOrganisation = text => {
    setCompanyName(text);
    if (text == '') {
      setCompanyNameError('Organisation name is required!');
    } else {
      setCompanyNameError('');
    }
  };
  const validateABN = abn => {
    const cleanedABN = abn.replace(/\s+/g, '');
    if (cleanedABN.length !== 11) return false;

    const abnDigits = cleanedABN.split('').map(Number);

    abnDigits[0] -= 1;

    const weighting = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

    const sum = abnDigits.reduce(
      (acc, digit, index) => acc + digit * weighting[index],
      0,
    );

    return sum % 89 === 0;
  };

  const handleABNChange = text => {
    setBusinessNumber(text);
    if (text == '') {
      setBusinessNumberError('Australian business number is required!');
    } else if (validateABN(text)) {
      setBusinessNumberError(''); // Clear error if ABN is valid
    } else {
      setBusinessNumberError('Invalid Australian business number!');
    }
  };
  const validNextButton = () => {
    // Ensure a service is selected
    if (selectedServices.length == 0) {
      setSelectedServicesError('Please select an option!');
      return;
    } else if (selectManageProperty.length == 0) {
      setSelectManagePropertyError('Please select an option.');
      return;
    }

    // If kodieDescribeYourselfId includes 4, check for additional details
    if (kodieDescribeYourselfId.includes(4)) {
      if (tabValue === 'IndividualSignup') {
        // Check if job type is selected for individual sign-up
        if (IndiselectJobTypeid.length == 0) {
          setIndiSelectJobTypeidError('Please select an option!');
        } else {
          setSelectJobTypeidError(''); // Clear error
          navigateOrHandle();
        }
      } else if (tabValue === 'CompanySignup') {
        // Check for company sign-up validation
        let valid = true;

        if (companyName === '') {
          setCompanyNameError('Organisation name is required!');
          valid = false;
        }
        if (selectJobTypeid.length == 0) {
          setSelectJobTypeidError('Please select an option!');
          valid = false;
        }
        if (businessNumber === '') {
          setBusinessNumberError('Australian business number is required!');
          valid = false;
        } else if (!validateABN(businessNumber)) {
          setBusinessNumberError('Invalid Australian business number!');
          valid = false;
        }

        if (valid) {
          navigateOrHandle(); // If all validations pass, continue
        }
      }
    } else {
      // No additional checks for other cases
      navigateOrHandle();
    }
  };

  // Helper function to handle navigation or saving based on kodieDescribeYourselfId
  const navigateOrHandle = () => {
    if (
      (hasBasicInfo && hasPropertyInfo) ||
      (hasAdditionalInfo && hasBasicInfo)
    ) {
      naviagteData();
    } else if (hasBasicInfo) {
      handleSaveSignupfill();
    } else {
      naviagteData();
    }
  };

  const toggleServicesSelection = lookup_key => {
    if (selectJobTypeid.includes(lookup_key)) {
      setSelectJobTypeid(prevSelected => {
        const newCategorySelected = prevSelected.filter(
          item => item !== lookup_key,
        );
        validateIndiCategorySelection(newCategorySelected); // Validate after removal
        return newCategorySelected;
      });
    } else {
      setSelectJobTypeid(prevSelected => {
        const newCategorySelected = [...prevSelected, lookup_key];
        validateIndiCategorySelection(newCategorySelected); // Validate after addition
        setSelectJobTypeidError(''); // Clear error when a selection is made
        return newCategorySelected;
      });
    }
  };

  const toggleServicesSelection1 = lookup_key => {
    if (IndiselectJobTypeid.includes(lookup_key)) {
      setIndiSelectJobTypeid(prevSelected => {
        const newIndiCategorySelected = prevSelected.filter(
          item => item !== lookup_key,
        );
        validateCategorySelection(newIndiCategorySelected); // Validate after removal
        return newIndiCategorySelected;
      });
    } else {
      setIndiSelectJobTypeid(prevSelected => {
        const newIndiCategorySelected = [...prevSelected, lookup_key];
        validateCategorySelection(newIndiCategorySelected); // Validate after addition
        setIndiSelectJobTypeidError(''); // Clear error when a selection is made
        return newIndiCategorySelected;
      });
    }
  };

  const jobType_render = ({item}) => {
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <ServicesBox
          images
          Services_Name={item.lookup_description}
          Services_Icon={
            item.lookup_key === 166
              ? 'cleaning-services'
              : item.lookup_key === 167
              ? 'mower-bag'
              : item.lookup_key === 168
              ? 'forklift'
              : item.lookup_key === 169
              ? 'tools'
              : 'MaterialIcons'
          }
          iconLibrary={
            item.lookup_key === 166
              ? 'MaterialIcons'
              : item.lookup_key === 167
              ? 'MaterialCommunityIcons'
              : item.lookup_key === 168
              ? 'MaterialCommunityIcons'
              : item.lookup_key === 169
              ? 'Entypo'
              : 'MaterialIcons'
          }
          iconColor={
            selectJobTypeid.includes(item.lookup_key)
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_GrayColor
          }
          BoxStyling={[
            CompanySignupStyle.box_style,
            {
              backgroundColor: selectJobTypeid.includes(item.lookup_key)
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor,
            },
          ]}
          textColor={[
            CompanySignupStyle.box_Text_Style,
            {
              color: selectJobTypeid.includes(item.lookup_key)
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor,
            },
          ]}
          onPress={() => {
            toggleServicesSelection(item.lookup_key);
            setSelectJobType(item.lookup_key);
          }}
        />
      </View>
    );
  };
  const jobIndiType_render = ({item}) => {
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <ServicesBox
          images
          Services_Name={item.lookup_description}
          Services_Icon={
            item.lookup_key === 166
              ? 'cleaning-services'
              : item.lookup_key === 167
              ? 'mower-bag'
              : item.lookup_key === 168
              ? 'forklift'
              : item.lookup_key === 169
              ? 'tools'
              : 'MaterialIcons'
          }
          iconLibrary={
            item.lookup_key === 166
              ? 'MaterialIcons'
              : item.lookup_key === 167
              ? 'MaterialCommunityIcons'
              : item.lookup_key === 168
              ? 'MaterialCommunityIcons'
              : item.lookup_key === 169
              ? 'Entypo'
              : 'MaterialIcons'
          }
          iconColor={
            IndiselectJobTypeid.includes(item.lookup_key)
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_GrayColor
          }
          BoxStyling={[
            CompanySignupStyle.box_style,
            {
              backgroundColor: IndiselectJobTypeid.includes(item.lookup_key)
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor,
            },
          ]}
          textColor={[
            CompanySignupStyle.box_Text_Style,
            {
              color: IndiselectJobTypeid.includes(item.lookup_key)
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor,
            },
          ]}
          onPress={() => {
            toggleServicesSelection1(item.lookup_key);
            setIndiSelectJobType(item.lookup_key);
          }}
        />
      </View>
    );
  };

  const selectedselectJobTypesString = selectJobTypeid.join(',');
  const selectedselectIndiJobTypesString = IndiselectJobTypeid.join(',');

  const handle_ServicesOffer = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'JOB_TYPE',
      P_TYPE: 'OPTION',
    });

    console.log('IndiServicesOffer', res);
    if (res.status === true) {
      setIndiKodieServicesData(res?.lookup_details);
    }
    setIsLoading(false);
  };
  const handle_CompanyServicesOffer = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'JOB_TYPE',
      P_TYPE: 'OPTION',
    });

    console.log('ComapanyServicesOffer', res);
    if (res.status === true) {
      setKodieServicesData(res?.lookup_details);
    }
    setIsLoading(false);
  };
  console.log(kodieServicesData, '{{{kodieServicesData');
  const handleIndiServices = async () => {
    const jobTypes = selectedselectIndiJobTypesString.split(',').map(Number);
    console.log(jobTypes, 'klhfudssdkjfhdsjk');
    const servicesDatas = [];
    setIsLoading(true);
    const fetchIndiServiceData = async jobType => {
      console.log(jobType, '{{jobType}}');
      const res = await SignupLookupDetails({
        P_PARENT_CODE:
          jobType === 166
            ? 'HOME_CLEANING'
            : jobType === 167
            ? 'OUTDOOR_CLEANING'
            : jobType === 168
            ? 'HEAVY_LIFTING'
            : jobType === 169
            ? 'FIXING_AND_MAINTENANCE'
            : 'HOME_CLEANING',
        P_TYPE: 'OPTION',
      });

      console.log('INdidi', res);
      servicesDatas.push(...res.lookup_details);
      // setIsLoading(false);
    };
    const fetchIndiAllServices = async () => {
      try {
        const promises = jobTypes.map(jobType => fetchIndiServiceData(jobType));
        await Promise.all(promises);
        console.log('All Services Data:', servicesDatas);
        setIndiServicesData(servicesDatas);
        // setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching services:', error);
      }
    };
    fetchIndiAllServices();
    setIsLoading(false);
  };
  const handleServices = async () => {
    const CompanyjobTypes = selectedselectJobTypesString.split(',').map(Number);
    console.log(CompanyjobTypes, 'CompanyjobTypes');
    const CompanyservicesDatas = [];

    setIsLoading(true);

    const fetchServiceData = async CompanyjobType => {
      console.log(CompanyjobType, 'CompanyjobTypeCompanyjobType');
      let P_PARENT_CODE = null;

      // Map CompanyjobType to P_PARENT_CODE
      switch (CompanyjobType) {
        case 166:
          P_PARENT_CODE = 'HOME_CLEANING';
          break;
        case 167:
          P_PARENT_CODE = 'OUTDOOR_CLEANING';
          break;
        case 168:
          P_PARENT_CODE = 'HEAVY_LIFTING';
          break;
        case 169:
          P_PARENT_CODE = 'FIXING_AND_MAINTENANCE';
          break;
        default:
          console.error('Unknown CompanyjobType:', CompanyjobType);
          break;
      }

      console.log('P_PARENT_CODE:', P_PARENT_CODE);

      if (P_PARENT_CODE !== null) {
        const Companydata = {
          P_PARENT_CODE: P_PARENT_CODE,
          P_TYPE: 'OPTION',
        };

        console.log('Companydata', Companydata);

        try {
          const res = await SignupLookupDetails(Companydata);
          console.log('ServicesOffer', res);
          CompanyservicesDatas.push(...res.lookup_details);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      }
    };

    const fetchAllServices = async () => {
      try {
        const promises = CompanyjobTypes.map(CompanyjobType =>
          fetchServiceData(CompanyjobType),
        );
        await Promise.all(promises);

        console.log('All Services Data:', CompanyservicesDatas);
        setServicesData(CompanyservicesDatas);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after all operations are completed
      }
    };

    await fetchAllServices(); // Wait for all services to be fetched
  };

  useEffect(() => {
    const fetchIndiServices = async () => {
      if (
        isvisible &&
        IndiselectJobType !== undefined &&
        IndiselectJobType !== null
      ) {
        await handleIndiServices(IndiselectJobType); // Ensure async/await is used correctly
      }
    };

    fetchIndiServices();
  }, [isvisible, IndiselectJobType, tabValue]);

  useEffect(() => {
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
    handlemessage();
    requestUserPermission();
  }, []);
  const handleChecked = () => {
    setIsChecked(!isChecked);
  };
  const isVisible = useIsFocused();
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
  useEffect(() => {
    if (isvisible && selectJobType !== undefined && selectJobType !== null) {
      handleServices(selectJobType);
    }
  }, [isvisible, selectJobType]);
  // .....
  const handleBoxPress = lookupID => {
    setIsClick(lookupID);
    setSelectManageProperty(lookupID);
    validateManyProperty([lookupID]);
  };

  const toggleCheckbox = lookupKey => {
    if (selectedLookupKeys.includes(lookupKey)) {
      setSelectedLookupKeys(
        selectedLookupKeys.filter(key => key !== lookupKey),
      );
    } else {
      setSelectedLookupKeys([...selectedLookupKeys, lookupKey]);
    }
  };
  const wantList = ({item}) => {
    const isSelected = selectedLookupKeys.includes(item.lookup_key);

    return (
      <View>
        <View style={AboutYouStyle.want_List_View}>
          <TouchableOpacity
            onPress={() => {
              toggleCheckbox(item.lookup_key);
              setKodiehelplookupid(item.lookup_key);
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={[
                  AboutYouStyle.checkbox_View,
                  {
                    borderColor: isSelected
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_ExtraLightGrayColor,
                  },
                ]}>
                {isSelected ? (
                  <FontAwesome
                    name="check"
                    size={15}
                    color={_COLORS.Kodie_GreenColor}
                    style={AboutYouStyle.Check_Icon}
                  />
                ) : null}
              </View>

              <Text style={AboutYouStyle.want_List_text}>
                {item.lookup_description}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({item}) => (
    <ServicesBox
      Services_Name={item?.lookup_description}
      BoxStyling={[
        AboutYouStyle.box_style,
        {
          margin: 6,
          backgroundColor:
            isClick === item?.lookup_key
              ? _COLORS.Kodie_lightGreenColor
              : _COLORS.Kodie_WhiteColor,
          borderColor:
            isClick === item?.lookup_key
              ? _COLORS.Kodie_GreenColor
              : _COLORS.Kodie_GrayColor,
        },
      ]}
      textColor={[AboutYouStyle.box_Text_Style]}
      onPress={() => {
        handleBoxPress(item?.lookup_key),
          setSelectManageProperty(item?.lookup_key);
      }}
    />
  );
  const renderStepIndicator = params => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );

  const toggleSelection = lookup_key => {
    if (selectedServices.includes(lookup_key)) {
      setSelectedServices(prevSelected => {
        const newSelected = prevSelected.filter(item => item !== lookup_key);
        validateSelection(newSelected); // Validate after removal
        return newSelected;
      });
    } else {
      setSelectedServices(prevSelected => {
        const newSelected = [...prevSelected, lookup_key];
        validateSelection(newSelected); // Validate after addition
        return newSelected;
      });
    }
  };
  const renderItemDescribeYourself = ({item}) => (
    <ServicesBox
      Services_Name={item?.lookup_description}
      BoxStyling={[
        AboutYouStyle.box_style,
        {
          margin: 6,
          backgroundColor: selectedServices.includes(item?.lookup_key)
            ? _COLORS.Kodie_lightGreenColor
            : _COLORS.Kodie_WhiteColor,
          borderColor: selectedServices.includes(item?.lookup_key)
            ? _COLORS.Kodie_GreenColor
            : _COLORS.Kodie_GrayColor,
        },
      ]}
      textColor={[AboutYouStyle.box_Text_Style]}
      onPress={() => {
        toggleSelection(item?.lookup_key);
        setKodieDescribeYourselfDataId(prevIds => {
          const index = prevIds.indexOf(item?.lookup_key);
          if (index !== -1) {
            const newIds = [
              ...prevIds.slice(0, index),
              ...prevIds.slice(index + 1),
            ];
            console.log('kodieDescribeYourselfId removed.... ', newIds);
            return newIds;
          } else {
            const newIds = [...prevIds, item?.lookup_key];
            console.log('kodieDescribeYourselfId added.... ', newIds);
            return newIds;
          }
        });
      }}
    />
  );
  useEffect(() => {
    const fetchData = async () => {
      if (isVisible) {
        await fetchAllGetApi(); // Ensure async/await is used correctly
      }
    };

    fetchData();
  }, [isVisible, tabValue]);

  const fetchAllGetApi = async () => {
    try {
      await handle_manage_property();
      await handle_kodiehelp();
      await handle_describe_yourself();
      await handle_ServicesOffer();
      await handle_CompanyServicesOffer();
    } catch (error) {
      console.error('Error fetching data in fetchAllGetApi:', error);
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
      P_state: null,
      p_country: null,
      p_city: null,
      islocation: 1,
      propertyDesc: null,
      property_value: null,
      key_features: '[]',
      landArea: null,
      buildingFlorSize: null,
      deviceId: deviceId,
      deviceType: deviceType,
      additional_features: '[]',
      key_additional_features: '[]',
      auto_list: 0,
      fcm_token: Fcm_token,
      run_your_business: '0,1',
      bio: Bio,
      website: website,
      p_website_individual: Indiwebsite,
      company_latitude: Companylatitude,
      company_latitude_individual: p_latitude || latitude,
      company_longitude: Companylongitude,
      company_longitude_individual: p_longitude || longitude,
      company_address: Companylocation,
      company_address_individual: physicalAddress || location,
      category_service_perform: servicesValue,
      category_service_perform_individual: IndiservicesValue,
      category_service_offer: selectedselectJobTypesString,
      category_service_offer_individual: selectedselectIndiJobTypesString,
      austrilian_busi_no: businessNumber,
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
      setCurrentPage(0);
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
        // Set a default image URL if no image is provided
        downloadURL = ''; // Replace with your default image URL
      }

      // Create a new user without password validation
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      // Save user data to Firestore
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

      // Save user data to AsyncStorage
      await AsyncStorage.setItem('USERID', userId);
      await AsyncStorage.setItem('NAME', firstName);
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('MOBILE', mobileNumber);
      await AsyncStorage.setItem('USERKEY', String(user_key));

      console.log('User data saved to AsyncStorage');
      props.navigation.navigate('DrawerNavigatorLeftMenu');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const ConfirmAddress = () => {
    setIsMap(false);
    if (tabValue == 'IndividualSignup') {
      setLocation(currentLocation);
    } else {
      setCompanyLocation(currentLocation);
    }
  };
  const openMapandClose = text => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = Region => {
    if (tabValue == 'IndividualSignup') {
      setlatitude(Region.latitude);
      setlongitude(Region.longitude);
    } else {
      setCompanylatitude(Region.latitude);
      setCompanylongitude(Region.longitude);
    }

    getAddress(Region.latitude, Region.longitude);
  };
  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        console.log('json location.......', json);
        console.log('current address...', json.results[0].formatted_address);
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
        if (tabValue == 'IndividualSignup') {
          setLocation(MainFullAddress);
        } else {
          setCompanyLocation(MainFullAddress);
        }
      })
      .catch(error => console.warn(error));
  };
  const selectedServiceKeysString = selectedServices.join(',');
  const kodieHelpValue = selectedLookupKeys.join(',');

  // ...Api intrigatrion
  const handle_describe_yourself = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'TEN_DESC',
      P_TYPE: 'OPTION',
    });

    console.log('resDescribe', res);

    setKodieDescribeYourselfData(res?.lookup_details);
    setIsLoading(false);
  };
  const handle_manage_property = async () => {
    setIsLoading(true);
    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'TEN_PROPERTY',
      P_TYPE: 'OPTION',
    });

    console.log('handle_manage_property', res);

    setmanage_property_Data(res?.lookup_details);
    setIsLoading(false);
  };
  const handle_kodiehelp = async () => {
    setIsLoading(true);
    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'KODIE_HELP',
      P_TYPE: 'OPTION',
    });

    console.log('handle_kodiehelp', res);

    setKodiehelpData(res?.lookup_details);
    setIsLoading(false);
  };
  const openMapCom = () => {
    setIsMap(true);
    console.log('Location pressed');
  };
  const goBack = () => {
    props.navigation.pop();
  };
  const renderLabel = ({position, stepStatus}) => {
    const iconColor =
      position === currentPage
        ? _COLORS.Kodie_BlackColor // Current step color
        : stepStatus === 'finished'
        ? '#000000'
        : '#808080';

    // Extracted function for determining icon name based on `kodieDescribeYourselfId`
    const getIconName = position => {
      const hasProperty =
        kodieDescribeYourselfId.includes(3) ||
        kodieDescribeYourselfId.includes(10);
      const isBasic =
        kodieDescribeYourselfId.includes(2) ||
        kodieDescribeYourselfId.includes(4);

      if (isBasic && hasProperty) {
        return position === 0
          ? 'Account'
          : position === 1
          ? 'About you'
          : 'First property';
      }
      if (isBasic || kodieDescribeYourselfId.includes(4)) {
        return position === 0 ? 'Account' : 'About you';
      }
      if (hasProperty) {
        return position === 0
          ? 'Account'
          : position === 1
          ? 'About you'
          : 'First property';
      }
      return position === 0
        ? 'Account'
        : position === 1
        ? 'About you'
        : 'First property';
    };

    const iconName = getIconName(position);

    // Styles extracted for clarity
    const labelStyle = {
      fontSize: 14,
      marginTop: 1,
      marginHorizontal: 10,
      color: iconColor,
      alignSelf: 'center',
    };

    return (
      <View>
        <Text style={labelStyle}>{`Step ${position + 1}`}</Text>
        <Text style={{...labelStyle, marginTop: 5}}>{iconName}</Text>
      </View>
    );
  };

  // tab code here .....
  const [tabValue, setTabValue] = useState('IndividualSignup');
  let lastOtherIndex = -1;
  IndiservicesData.forEach((item, index) => {
    if (item.lookup_description === 'Other') {
      lastOtherIndex = index;
    }
  });

  const filteredIndiservicesData = IndiservicesData.filter((item, index) => {
    return item.lookup_description !== 'Other' || index === lastOtherIndex;
  });

  let lastComOtherIndex = -1;
  servicesData.forEach((item, index) => {
    if (item.lookup_description === 'Other') {
      lastComOtherIndex = index;
    }
  });

  const filteredCompservicesData = servicesData.filter((item, index) => {
    return item.lookup_description !== 'Other' || index === lastComOtherIndex;
  });
  const checkTabs = () => {
    switch (tabValue) {
      case 'IndividualSignup':
        return (
          <View style={{flex: 1}}>
            <View style={IndividualSignupStyle.card}>
              <Text
                style={[
                  IndividualSignupStyle.want_Heading,
                  {marginTop: 0, marginLeft: 4},
                ]}>
                {'The category of service you offer '}
                <Text
                  style={[IndividualSignupStyle.want_Heading, {fontSize: 12}]}>
                  {'(you can select multiple options)'}
                </Text>
                <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
              </Text>
              <FlatList
                data={IndikodieServicesData}
                renderItem={jobIndiType_render}
                keyExtractor={item => item.lookup_key}
                numColumns={2}
              />
              {IndiselectJobTypeidError ? (
                <Text style={[AboutYouStyle.errorText]}>
                  {IndiselectJobTypeidError}
                </Text>
              ) : null}
              {selectedselectIndiJobTypesString == '' ? null : (
                <View style={IndividualSignupStyle.inputContainer}>
                  <Text style={LABEL_STYLES.commontext}>
                    {'The type of service you perform'}
                  </Text>
                  <MultiSelect
                    items={filteredIndiservicesData}
                    uniqueKey="lookup_key"
                    noItemsText={
                      'Feature being searched for is not found on the list.'
                    }
                    onSelectedItemsChange={item => setIndiservicesValue(item)}
                    selectedItems={IndiservicesValue || []}
                    selectText="Search services"
                    searchInputPlaceholderText="Search Items..."
                    onChangeInput={item => {
                      console.warn(item);
                    }}
                    tagBorderColor={_COLORS.Kodie_BlackColor}
                    selectedItemTextColor={_COLORS.Kodie_GreenColor}
                    selectedItemIconColor={_COLORS.Kodie_GreenColor}
                    itemTextColor="#000"
                    displayKey="lookup_description"
                    searchInputStyle={AboutYouStyle.searchInput}
                    styleListContainer={AboutYouStyle.listContainer}
                    styleRowList={AboutYouStyle.rowList}
                    tagContainerStyle={AboutYouStyle.tagContainer}
                    tagRemoveIconColor={_COLORS.Kodie_WhiteColor}
                    styleTextTag={AboutYouStyle.textTag}
                    styleTextDropdown={[
                      AboutYouStyle.textDropdown,
                      {
                        paddingHorizontal:
                          IndiservicesValue.length > 0 ? 10 : 5,
                      },
                    ]}
                    styleDropdownMenu={[
                      AboutYouStyle.dropdownMenu,
                      {
                        paddingHorizontal:
                          IndiservicesValue.length > 0 ? 10 : 5,
                      },
                    ]}
                    submitButtonColor={_COLORS.Kodie_GreenColor}
                    submitButtonText={
                      IndiservicesValue.length > 0 ? 'Done' : 'Cancel'
                    }
                  />
                </View>
              )}
              <View style={IndividualSignupStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Company / professional physical address'}
                </Text>

                <View style={IndividualSignupStyle.inputContainer}>
                  <TouchableOpacity onPress={handleChecked}>
                    <View style={IndividualSignupStyle.chekboxview}>
                      <MaterialIcons
                        name={
                          !isChecked ? 'check-box-outline-blank' : 'check-box'
                        }
                        size={24}
                        color={
                          !isChecked
                            ? _COLORS.Kodie_GrayColor
                            : _COLORS.Kodie_GreenColor
                        }
                        style={IndividualSignupStyle.Check_Icon}
                      />
                      <Text style={IndividualSignupStyle.commonaddresstext}>
                        {'Same as personal physical address'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={IndividualSignupStyle.locationConView}>
                    <View style={IndividualSignupStyle.locationContainer}>
                      {isChecked ? (
                        <TextInput
                          style={IndividualSignupStyle.locationInput}
                          value={isChecked ? physicalAddress : ''}
                          placeholder="Search location"
                          placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                        />
                      ) : (
                        <TextInput
                          style={IndividualSignupStyle.locationInput}
                          value={location}
                          onChangeText={setLocation}
                          onFocus={() => setIsSearch(true)}
                          placeholder="Search location"
                          placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                        />
                      )}
                    </View>
                    <TouchableOpacity
                      style={IndividualSignupStyle.locationIconView}
                      onPress={openMapCom}>
                      <Octicons
                        name={'location'}
                        size={22}
                        color={_COLORS.Kodie_GreenColor}
                        style={IndividualSignupStyle.locationIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={[IndividualSignupStyle.inputContainer, {marginTop: 24}]}>
                <Text style={LABEL_STYLES.commontext}>{'Website'}</Text>
                <TextInput
                  style={[IndividualSignupStyle.input, {marginBottom: 20}]}
                  value={Indiwebsite}
                  onChangeText={text => {
                    setIndiWebsite(text);
                  }}
                  placeholder="Enter your website address (if you have one)"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>
            </View>
            {isLoading ? <CommonLoader /> : null}
          </View>
        );
      case 'CompanySignup':
        return (
          <View>
            <View style={CompanySignupStyle.card}>
              <View style={[CompanySignupStyle.inputContainer, {marginTop: 0}]}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Organisation name'}
                  <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
                </Text>
                <TextInput
                  style={CompanySignupStyle.input}
                  value={companyName}
                  onChangeText={setCompanyName}
                  onBlur={() => {
                    validOrganisation(companyName);
                  }}
                  placeholder="Enter the name of your company"
                  placeholderTextColor="#999"
                />
                <Text style={CompanySignupStyle.smstext}>
                  Your organisation name will be used in emails and SMS
                  correspondence from Kodie.
                </Text>
              </View>
              {companyNameError ? (
                <Text style={AboutYouStyle?.errorText}>{companyNameError}</Text>
              ) : null}
              <View style={CompanySignupStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Australian business number'}
                  <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
                </Text>
                <TextInput
                  style={[CompanySignupStyle.input]}
                  value={businessNumber}
                  onChangeText={setBusinessNumber}
                  onBlur={() => {
                    handleABNChange(businessNumber);
                  }}
                  maxLength={11}
                  placeholder="Enter your ABN"
                  placeholderTextColor="#999"
                />
              </View>
              {businessNumberError ? (
                <Text style={AboutYouStyle.errorText}>
                  {businessNumberError}
                </Text>
              ) : null}
              <View>
                <Text
                  style={[
                    IndividualSignupStyle.want_Heading,
                    {marginLeft: 4, marginBottom: 2},
                  ]}>
                  {'The category of service you offer '}
                  <Text
                    style={[
                      IndividualSignupStyle.want_Heading,
                      {fontSize: 12},
                    ]}>
                    {'(you can select multiple options)'}
                  </Text>
                  <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
                </Text>
                <FlatList
                  data={kodieServicesData}
                  renderItem={jobType_render}
                  keyExtractor={item => item.lookup_key.toString()}
                  numColumns={2}
                />
                {selectJobTypeidError ? (
                  <Text style={[AboutYouStyle.errorText]}>
                    {selectJobTypeidError}
                  </Text>
                ) : null}
              </View>
              {selectedselectJobTypesString == '' ? null : (
                <View style={CompanySignupStyle.inputContainer}>
                  <Text style={[LABEL_STYLES.commontext]}>
                    {'The type of service you perform'}
                  </Text>
                  <MultiSelect
                    items={filteredCompservicesData}
                    uniqueKey="lookup_key"
                    noItemsText={
                      'Feature being searched for is not found on the list.'
                    }
                    onSelectedItemsChange={item => setservicesValue(item)}
                    selectedItems={servicesValue || []}
                    selectText="Select items"
                    searchInputPlaceholderText="Search Items..."
                    onChangeInput={item => {
                      console.warn(item);
                      // setAdditionalFeaturesKeyValue(item)
                    }}
                    tagBorderColor={_COLORS.Kodie_BlackColor}
                    selectedItemTextColor={_COLORS.Kodie_GreenColor}
                    selectedItemIconColor={_COLORS.Kodie_GreenColor}
                    itemTextColor="#000"
                    displayKey="lookup_description"
                    searchInputStyle={AboutYouStyle.searchInput}
                    styleListContainer={AboutYouStyle.listContainer}
                    styleRowList={AboutYouStyle.rowList}
                    tagContainerStyle={AboutYouStyle.tagContainer}
                    tagRemoveIconColor={_COLORS.Kodie_WhiteColor}
                    styleTextTag={AboutYouStyle.textTag}
                    styleTextDropdown={[
                      AboutYouStyle.textDropdown,
                      {
                        paddingHorizontal: servicesValue.length > 0 ? 10 : 5,
                      },
                    ]}
                    styleDropdownMenu={[
                      AboutYouStyle.dropdownMenu,
                      {
                        paddingHorizontal: servicesValue.length > 0 ? 10 : 5,
                      },
                    ]}
                    submitButtonColor={_COLORS.Kodie_GreenColor}
                    submitButtonText={
                      servicesValue.length > 0 ? 'Done' : 'Cancel'
                    }
                  />
                </View>
              )}
              <View style={CompanySignupStyle.inputContainer}>
                <View>
                  <Text style={[LABEL_STYLES.commontext]}>
                    {'Company physical address'}
                  </Text>
                  <View style={CompanySignupStyle.locationConView}>
                    <View style={CompanySignupStyle.locationContainer}>
                      <TextInput
                        style={CompanySignupStyle.locationInput}
                        value={Companylocation}
                        onChangeText={setCompanyLocation}
                        onFocus={() => {
                          setIsSearch(true);
                          // props.IsSearch();
                        }}
                        placeholder="Search location"
                        placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                      />
                    </View>
                    <TouchableOpacity
                      style={CompanySignupStyle.locationIconView}
                      onPress={() => {
                        setIsMap(true);
                      }}>
                      <Octicons
                        name={'location'}
                        size={22}
                        color={_COLORS.Kodie_GreenColor}
                        style={CompanySignupStyle.locationIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={CompanySignupStyle.websiteContainer}>
                <Text style={LABEL_STYLES.commontext}>{'Website'}</Text>
                <TextInput
                  style={[CompanySignupStyle.input, {marginBottom: 20}]}
                  value={website}
                  onChangeText={setWebsite}
                  placeholder="Enter your website address (if you have one)"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>
            </View>
          </View>
        );
      default:
        return <IndividualSignup />;
    }
  };
  return (
    <SafeAreaView style={AboutYouStyle.mainContainer}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <TopHeader
          MiddleText={IsMap || IsSearch ? 'Location' : 'Account set up'}
          onPressLeftButton={() => {
            IsMap ? setIsMap(false) : IsSearch ? setIsSearch(false) : goBack();
          }}
        />
        {IsMap ? (
          <View style={AboutYouStyle.mapContainer}>
            <MapScreen
              style={AboutYouStyle.MapMainView}
              onRegionChange={onRegionChange}
              Maplat={
                tabValue == 'IndividualSignup' ? latitude : Companylatitude
              }
              Maplng={
                tabValue == 'IndividualSignup' ? longitude : Companylongitude
              }
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
              if (tabValue == 'IndividualSignup') {
                setlatitude(details.geometry.location.lat);
                setlongitude(details.geometry.location.lng);
              } else {
                setCompanylatitude(details.geometry.location.lat);
                setCompanylongitude(details.geometry.location.lng);
              }
              setIsSearch(false);
              setIsMap(true);
              setCurrentLocation(details.formatted_address);
            }}
          />
        ) : (
          <>
            <View style={AboutYouStyle.stepIndicator}>
              <StepIndicator
                customSignUpStepStyle={firstIndicatorSignUpStepStyle}
                currentPosition={currentPage}
                renderStepIndicator={renderStepIndicator}
                labels={labels}
                stepCount={stepCount}
                renderLabel={renderLabel}
              />
            </View>
            <ScrollView>
              <View style={AboutYouStyle.Container}>
                <Text style={AboutYouStyle.heading_Text}>
                  {'Tell us more about you'}
                </Text>
                <Text style={AboutYouStyle.want_Heading}>
                  {'How would you describe yourself? '}
                  <Text style={[AboutYouStyle.want_Heading, {fontSize: 12}]}>
                    {'(you can select multiple options)'}
                  </Text>
                  <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
                </Text>
                <View>
                  <FlatList
                    data={kodieDescribeYourselfData}
                    renderItem={renderItemDescribeYourself}
                    keyExtractor={item => item.lookup_key.toString()}
                    numColumns={2}
                  />

                  {selectedServicesError ? (
                    <Text style={[AboutYouStyle.errorText]}>
                      {selectedServicesError}
                    </Text>
                  ) : null}
                </View>
                {kodieDescribeYourselfId.includes(3) ||
                kodieDescribeYourselfId.includes(10) ||
                kodieDescribeYourselfId.includes(2) ||
                kodieDescribeYourselfId.length > 2 ? (
                  <View>
                    <Text style={AboutYouStyle.want_Heading}>
                      {'How many properties do you own, manage or rent?'}
                    </Text>
                    <FlatList
                      data={manage_property_Data}
                      renderItem={renderItem}
                      keyExtractor={item => item.lookup_key.toString()}
                      numColumns={2}
                    />
                    {selectManagePropertyError ? (
                      <Text style={[AboutYouStyle.errorText]}>
                        {selectManagePropertyError}
                      </Text>
                    ) : null}
                  </View>
                ) : null}

                {kodieDescribeYourselfId.includes(4) ? (
                  <View style={AboutYouStyle.tabmainview}>
                    <Text style={AboutYouStyle.tabheadingtext}>
                      How do you run your business?
                    </Text>
                    <View style={AboutYouStyle.btn_main_view}>
                      <TouchableOpacity
                        style={[
                          AboutYouStyle.person_view,
                          {
                            backgroundColor:
                              tabValue === 'IndividualSignup'
                                ? _COLORS.Kodie_GreenColor
                                : _COLORS.Kodie_WhiteColor,
                          },
                        ]}
                        onPress={() => {
                          setTabValue('IndividualSignup');
                          handle_ServicesOffer();
                          handleIndiServices();
                        }}>
                        <Text
                          style={[
                            AboutYouStyle.person_text,
                            {
                              color:
                                tabValue === 'IndividualSignup'
                                  ? _COLORS.Kodie_WhiteColor
                                  : _COLORS.Kodie_BlackColor,
                            },
                          ]}>
                          {'Individual'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          AboutYouStyle.person_view,
                          {
                            backgroundColor:
                              tabValue === 'CompanySignup'
                                ? _COLORS.Kodie_GreenColor
                                : _COLORS.Kodie_WhiteColor,
                          },
                        ]}
                        onPress={() => {
                          setTabValue('CompanySignup');
                          handle_CompanyServicesOffer();
                          handleServices();
                        }}>
                        <Text
                          style={[
                            AboutYouStyle.company_text,
                            {
                              color:
                                tabValue === 'CompanySignup'
                                  ? _COLORS.Kodie_WhiteColor
                                  : _COLORS.Kodie_BlackColor,
                            },
                          ]}>
                          {'Company'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
                {kodieDescribeYourselfId.includes(4) ? checkTabs() : null}
                <Text
                  style={[
                    AboutYouStyle.want_Heading,
                    {marginTop: kodieDescribeYourselfId.includes(4) ? 5 : 25},
                  ]}>
                  {'How would you like Kodie to help you?'}
                </Text>
                <FlatList
                  data={kodiehelpData}
                  scrollEnabled
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{}}
                  keyExtractor={item => item?.id}
                  renderItem={wantList}
                />
              </View>
              <View style={{marginHorizontal: 16, marginTop: 30}}>
                <CustomSingleButton
                  disabled={isLoading ? true : false}
                  // _ButtonText={kodieDescribeYourselfId.includes(2) ? 'Save' : 'Next'}
                  _ButtonText={handleButton}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    validNextButton();
                  }}
                />
              </View>

              <TouchableOpacity
                style={AboutYouStyle.goBack_View}
                onPress={goBack}>
                <View style={AboutYouStyle.backIcon}>
                  <Ionicons
                    name="chevron-back"
                    size={22}
                    color={_COLORS.Kodie_MediumGrayColor}
                  />
                </View>
                <Text style={AboutYouStyle.goBack_Text}>{'Go back'}</Text>
              </TouchableOpacity>
            </ScrollView>
          </>
        )}
      </KeyboardAvoidingView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
