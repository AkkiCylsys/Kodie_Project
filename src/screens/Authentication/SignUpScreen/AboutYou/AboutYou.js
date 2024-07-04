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
import Geocoder from 'react-native-geocoding';
import {AboutYouStyle} from './AboutYouStyle';
import ServicesBox from '../../../../components/Molecules/ServicesBox/ServicesBox';
import {IMAGES, LABEL_STYLES, _COLORS} from '../../../../Themes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../services/CommonServices';
import {Config} from '../../../../Config';
import axios from 'axios';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {launchImageLibrary} from 'react-native-image-picker';
import IndividualSignup from './IndividualSignup/IndividualSignup';
import CompanySignup from './CompanySignup/CompanySignup';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import MapScreen from '../../../../components/Molecules/GoogleMap/googleMap';
import SearchPlaces from '../../../../components/Molecules/SearchPlaces/SearchPlaces';
import {FirstPropertyStyle} from '../FirstProperty/FirstPropertyStyle';
import {SignupLookupDetails} from '../../../../APIs/AllApi';
import IndividualSignupStyle from './IndividualSignup/IndividualSignupStyle';
import Octicons from 'react-native-vector-icons/Octicons';
import {MultiSelect} from 'react-native-element-dropdown';
import CompanySignupStyle from './CompanySignup/CompanySignupStyle';
import {set} from 'lodash';
import {onPress} from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';

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
  let image = props?.route?.params?.image;
  let Bio = props?.route?.params?.Bio;
  let country_code = props?.route?.params?.country_code;
  console.log('firstname..', firstName);
  console.log('lastName..', lastName);
  console.log('mobileNumber..', mobileNumber);
  console.log('physicalAddress..', physicalAddress);
  console.log('organisation..', organisation);
  console.log('referral..', referral);
  console.log('email..', email);
  console.log('country..', country);
  console.log('state..', state);
  console.log('city..', city);
  console.log('p_latitude..', p_latitude);
  console.log('p_longitude..', p_longitude);
  console.log('user_key_a..', user_key);
  console.log('image', image);
  console.log('Bio..', Bio);
  console.log('country_code...About_You', country_code);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setIsClick] = useState(null);
  const [selectManageProperty, setSelectManageProperty] = useState('');
  const [selected, setSelected] = useState([]);
  const [kodiehelpData, setKodiehelpData] = useState([]);
  const [kodieDescribeYourselfId, setKodieDescribeYourselfDataId] =
    useState('');
  const [manage_property_Data, setmanage_property_Data] = useState([]);
  const [ImageName, setImageName] = useState('');
  const [kodiehelplookupid, setKodiehelplookupid] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
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
  const [website, setWebsite] = useState('');
  const [Indiwebsite, setIndiWebsite] = useState('');
  const [companyGSTNumber, setCompanyGSTNumber] = useState('');
  const [location, setLocation] = useState('');
  const [IndiservicesValue, setIndiservicesValue] = useState([]);
  const [servicesValue, setservicesValue] = useState([]);
  const [businessNumber, SetBusinessNumber] = useState('');
  const [kodieDescribeYourselfData, setKodieDescribeYourselfData] = useState(
    [],
  );
  const [kodieServicesData, setKodieServicesData] = useState([]);
  const [IndikodieServicesData, setIndiKodieServicesData] = useState([]);
  const [selectJobTypeid, setSelectJobTypeid] = useState([]);
  const [IndiselectJobTypeid, setIndiSelectJobTypeid] = useState([]);
  const [selectJobType, setSelectJobType] = useState('');
  const [IndiselectJobType, setIndiSelectJobType] = useState();
  const [servicesData, setServicesData] = useState([]);
  const [IndiservicesData, setIndiServicesData] = useState([]);
  const [showProperties, setShowProperties] = useState(true);
  const isvisible = useIsFocused();
  const toggleServicesSelection = lookup_key => {
    if (selectJobTypeid.includes(lookup_key)) {
      setSelectJobTypeid(prevSelected =>
        prevSelected.filter(item => item !== lookup_key),
      );
    } else {
      setSelectJobTypeid(prevSelected => [...prevSelected, lookup_key]);
    }
  };
  const toggleServicesSelection1 = lookup_key => {
    if (IndiselectJobTypeid.includes(lookup_key)) {
      setIndiSelectJobTypeid(prevSelected =>
        prevSelected.filter(item => item !== lookup_key),
      );
    } else {
      setIndiSelectJobTypeid(prevSelected => [...prevSelected, lookup_key]);
    }
  };

  const jobType_render = ({item}) => {
    return (
      <View style={{flex: 1}}>
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
      <View style={{flex: 1}}>
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
            : null,
        P_TYPE: 'OPTION',
      });

      console.log('INdidi', res);
      servicesDatas.push(...res.lookup_details);
      setIsLoading(false);
    };

    const fetchIndiAllServices = async () => {
      try {
        const promises = jobTypes.map(jobType => fetchIndiServiceData(jobType));
        await Promise.all(promises);

        setIsLoading(false);
        console.log('All Services Data:', servicesDatas);

        setIndiServicesData(servicesDatas);
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
    if (
      isvisible &&
      IndiselectJobType !== undefined &&
      IndiselectJobType !== null
    ) {
      handleIndiServices(IndiselectJobType);
    }
  }, [isvisible, IndiselectJobType]);

  useEffect(() => {
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
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
  console.log('Individual', Individual);
  console.log('CompanyCome', CompanyCome);
  const refRBSheet = useRef();
  // .....
  const handleBoxPress = lookupID => {
    setIsClick(lookupID);
    setSelectManageProperty(lookupID);
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
          margin: 4,
          backgroundColor:
            isClick === item?.lookup_key
              ? _COLORS.Kodie_lightGreenColor
              : _COLORS.Kodie_WhiteColor,
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
      setSelectedServices(prevSelected =>
        prevSelected.filter(item => item !== lookup_key),
      );
    } else {
      setSelectedServices(prevSelected => [...prevSelected, lookup_key]);
    }
  };
  const renderItemDescribeYourself = ({item}) => (
    <ServicesBox
      Services_Name={item?.lookup_description}
      BoxStyling={[
        AboutYouStyle.box_style,
        {
          margin: 4,
          backgroundColor: selectedServices.includes(item?.lookup_key)
            ? _COLORS.Kodie_lightGreenColor
            : _COLORS.Kodie_WhiteColor,
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
    if (isVisible) {
      handle_manage_property();
      handle_kodiehelp();
      handle_describe_yourself();
      handle_ServicesOffer();
      handle_CompanyServicesOffer();
    }
  }, [isVisible]);

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
    // getAddress();
  };
  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        console.log('json location.......', json);
        console.log('current address...', json.results[0].formatted_address);
        // setLocation(json.results[0].formatted_address);
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
    // const iconColor = stepStatus === "finished" ? "#000000" : "#808080";
    const iconColor =
      position === currentPage // Check if it's the current step
        ? _COLORS.Kodie_BlackColor // Set the color for the current step
        : stepStatus === 'finished'
        ? '#000000'
        : '#808080';
    const iconName =
      position === 0
        ? 'Account'
        : position === 1
        ? 'About you'
        : position === 2
        ? 'First Property'
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

  // tab code here .....
  const [tabValue, setTabValue] = useState('IndividualSignup');
  let lastOtherIndex = -1;
  IndiservicesData.forEach((item, index) => {
    if (item.lookup_description === 'Other') {
      lastOtherIndex = index;
    }
  });

  // Filter data to keep only the last "Other" item
  const filteredIndiservicesData = IndiservicesData.filter((item, index) => {
    return item.lookup_description !== 'Other' || index === lastOtherIndex;
  });

  let lastComOtherIndex = -1;
  servicesData.forEach((item, index) => {
    if (item.lookup_description === 'Other') {
      lastComOtherIndex = index;
    }
  });

  // Filter data to keep only the last "Other" item
  const filteredCompservicesData = servicesData.filter((item, index) => {
    return item.lookup_description !== 'Other' || index === lastComOtherIndex;
  });
  const checkTabs = () => {
    switch (tabValue) {
      case 'IndividualSignup':
        return (
          // <IndividualSignup
          //   IndividualData={handleIndividualData}
          //   physicalAddress={physicalAddress}
          //   Individualp_latitude={p_latitude}
          //   Individualp_longitude={p_longitude}
          //   onPresslocation={openMapCom}
          //   IndividualLocation={location}
          //   onChangeIndivialLocation={setLocation}
          //   IndividualOnFocus={() => setIsSearch(true)}
          // />

          <View style={{flex: 1}}>
            <View style={IndividualSignupStyle.card}>
              <View>
                <Text style={IndividualSignupStyle.want_Heading}>
                  {
                    'The category of service you offer (you can select multiple options)'
                  }
                </Text>
                <FlatList
                  data={IndikodieServicesData}
                  renderItem={jobIndiType_render}
                  keyExtractor={item => item.lookup_key}
                  numColumns={2}
                />
              </View>
              {selectedselectIndiJobTypesString == '' ? null : (
                <View style={IndividualSignupStyle.inputContainer}>
                  <Text style={LABEL_STYLES.commontext}>
                    {'The type of service you perform'}
                  </Text>
                  <MultiSelect
                    style={[IndividualSignupStyle.dropdown]}
                    placeholderStyle={IndividualSignupStyle.placeholderStyle}
                    selectedTextStyle={IndividualSignupStyle.selectedTextStyle}
                    inputSearchStyle={IndividualSignupStyle.inputSearchStyle}
                    iconStyle={IndividualSignupStyle.iconStyle}
                    search
                    activeColor={_COLORS.Kodie_MidLightGreenColor}
                    // activeColor={_COLORS.Kodie_MidLightGreenColor}
                    data={filteredIndiservicesData}
                    labelField="lookup_description"
                    valueField="lookup_key"
                    placeholder="Select item"
                    searchPlaceholder="Search..."
                    value={IndiservicesValue}
                    onChange={selectedItems => {
                      setIndiservicesValue(selectedItems);
                    }}
                    selectedStyle={{
                      backgroundColor: _COLORS.Kodie_BlackColor,
                      borderRadius: 20,
                      alignSelf: 'center',
                    }}
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
                      {/* {isChecked ? ( */}
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
                      {/* ) : null} */}
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
                          // value={location}
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
                  {/* {locationError ? (
                  <Text style={PropertyDetailsStyle.error_text}>
                    {locationError}
                  </Text>
                ) : null} */}
                </View>
              </View>

              <View style={IndividualSignupStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{'Website'}</Text>
                <TextInput
                  style={IndividualSignupStyle.input}
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
          // <CompanySignup
          //   CompanyData={handleCompanyData}
          //   onPressCompanylocation={openMapCom}
          //   CompanyLocation={Companylocation}
          //   onChangeCompanyLocation={setCompanyLocation}
          //   CompanyOnFocus={() => setIsSearch(true)}
          // />
          <View>
            <View style={CompanySignupStyle.card}>
              <View style={CompanySignupStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Organisation name'}
                </Text>
                <TextInput
                  style={CompanySignupStyle.input}
                  value={companyName}
                  onChangeText={setCompanyName}
                  placeholder="Enter the name of your company"
                  placeholderTextColor="#999"
                />
                <Text style={CompanySignupStyle.smstext}>
                  Your organisation name will be used in emails and SMS
                  correspondence from Kodie.
                </Text>
              </View>

              <View style={CompanySignupStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Australian business number'}
                </Text>
                <TextInput
                  style={[CompanySignupStyle.input]}
                  value={businessNumber}
                  onChangeText={SetBusinessNumber}
                  placeholder="Enter your ABN"
                  placeholderTextColor="#999"
                />
              </View>

              <View>
                <Text style={CompanySignupStyle.want_Heading}>
                  {
                    'The category of service you offer (you can select multiple options)'
                  }
                </Text>
                <FlatList
                  data={kodieServicesData}
                  renderItem={jobType_render}
                  keyExtractor={item => item.lookup_key.toString()}
                  numColumns={2}
                />
              </View>
              {selectedselectJobTypesString == '' ? null : (
                <View style={CompanySignupStyle.inputContainer}>
                  <Text style={[LABEL_STYLES.commontext]}>
                    {'The type of service you perform'}
                  </Text>
                  <MultiSelect
                    style={[CompanySignupStyle.dropdown]}
                    placeholderStyle={CompanySignupStyle.placeholderStyle}
                    selectedTextStyle={CompanySignupStyle.selectedTextStyle}
                    inputSearchStyle={CompanySignupStyle.inputSearchStyle}
                    iconStyle={CompanySignupStyle.iconStyle}
                    search
                    activeColor={_COLORS.Kodie_MidLightGreenColor}
                    data={filteredCompservicesData}
                    labelField="lookup_description"
                    valueField="lookup_key"
                    placeholder="Select item"
                    searchPlaceholder="Search..."
                    value={servicesValue}
                    onChange={selectedItems => {
                      setservicesValue(selectedItems);
                    }}
                    selectedStyle={{
                      backgroundColor: _COLORS.Kodie_BlackColor,
                      borderRadius: 20,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              )}
              <View style={CompanySignupStyle.inputContainer}>
                <View style={[CompanySignupStyle.commontextfield]}>
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
              </View>
              <View style={CompanySignupStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{'Website'}</Text>
                <TextInput
                  style={CompanySignupStyle.input}
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
    <SafeAreaView style={{flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <TopHeader
          MiddleText={IsMap || IsSearch ? 'Location' : 'Account set up'}
          onPressLeftButton={() => {
            IsMap ? setIsMap(false) : IsSearch ? setIsSearch(false) : goBack();
          }}
        />
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
              Maplat={
                tabValue == 'IndividualSignup' ? latitude : Companylatitude
              }
              Maplng={
                tabValue == 'IndividualSignup' ? longitude : Companylongitude
              }
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
              // setLocation(details.formatted_address);
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
                stepCount={3}
                renderLabel={renderLabel}
              />
            </View>
            <ScrollView>
              <View style={AboutYouStyle.Container}>
                <Text style={AboutYouStyle.heading_Text}>
                  {'Tell us more about you'}
                </Text>
                <Text style={AboutYouStyle.want_Heading}>
                  {
                    'How would you Describe yourself? (you can select multiple options)'
                  }
                </Text>
                <FlatList
                  data={kodieDescribeYourselfData}
                  renderItem={renderItemDescribeYourself}
                  keyExtractor={item => item.lookup_key.toString()}
                  numColumns={2}
                />
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
                          setKodieServicesData('');
                          setCompanyGSTNumber('');
                          setCompanyName('');
                          SetBusinessNumber('');
                          setCompanyLocation('');
                          setSelectJobType('');
                          setWebsite('');
                          setservicesValue([]);
                          setSelectJobTypeid([]);
                          setservicesValue([]);
                          // api...
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
                          setIndiKodieServicesData('');
                          setIndiSelectJobTypeid([]);
                          setIndiSelectJobType('');
                          setIndiWebsite('');
                          setLocation('');
                          setIsChecked(false);
                          setIndiservicesValue([]);
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
                <Text style={AboutYouStyle.want_Heading}>
                  {'What do you want to do first with Kodie'}
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
              <View style={{marginHorizontal: 16}}>
                <CustomSingleButton
                  disabled={isLoading ? true : false}
                  _ButtonText={'Next'}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    props.navigation.navigate('FirstProperty', {
                      firstName: firstName,
                      lastName: lastName,
                      mobileNumber: mobileNumber,
                      physicalAddress: physicalAddress,
                      referral: referral,
                      selectManageProperty: selectManageProperty,
                      selectedServiceKeysString: selectedServiceKeysString,
                      kodieHelpValue: kodieHelpValue,
                      ImageName: image,
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
                      run_your_business: tabValue == 'IndividualSignup' ? 0 : 1,
                      company_address: Companylocation,
                      country_code: country_code,
                    });
                  }}
                />
              </View>
              <View style={{marginHorizontal: 16, marginBottom: 10}}>
                <CustomSingleButton
                  disabled={isLoading ? true : false}
                  _ButtonText={'Fill these details out later'}
                  Text_Color={_COLORS.Kodie_BlackColor}
                  backgroundColor={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    props.navigation.navigate('FirstProperty');
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
