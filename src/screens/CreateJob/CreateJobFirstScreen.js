//ScreenNo:143
//ScreenNo:139
//ScreenNo:121
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import {CreateJobFirstStyle} from './CreateJobFirstScreenCss';
import CustomSingleButton from '../../components/Atoms/CustomButton/CustomSingleButton';
import {_COLORS, LABEL_STYLES, IMAGES} from '../../Themes/index';
import TopHeader from '../../components/Molecules/Header/Header';
import {_goBack} from '../../services/CommonServices';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ServicesBox from '../../components/Molecules/ServicesBox/ServicesBox';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Config} from '../../Config';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import MapScreen from '../../components/Molecules/GoogleMap/googleMap';
import SearchPlaces from '../../components/Molecules/SearchPlaces/SearchPlaces';
import {CommonLoader} from '../../components/Molecules/ActiveLoader/ActiveLoader';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const stepLabels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

export default CreateJobFirstScreen = props => {
  const createJobId = useSelector(state => state.AddCreateJobReducer.data);
  const JobId = props.route.params?.JobId;
  const editMode = props.route.params?.editMode;
  const myJob = props.route.params?.myJob;
  const job_sub_type = props.route.params?.job_sub_type;
  const ReviewInspection = props.route.params?.ReviewInspection;
  const [currentPage, setCurrentPage] = useState(0);
  const [aboutyourNeed, setAboutyourNeed] = useState('');
  const [location, setLocation] = useState('');
  const [takingPlaceError, setTakingPlaceError] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [property_Data, setProperty_Data] = useState([]);
  const [property_value, setProperty_value] = useState([]);
  const [selectedAddressData, setSelectedAddreeData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [jobPriorityData, setJobPriorityData] = useState([]);
  const [jobPriorityValue, setJobPriorityValue] = useState([]);
  const [jobPriorityValueError, setJobPriorityValueError] = useState(false);
  const [ratingThresholdData, setRatingThresholdData] = useState([]);
  const [ratingThresholdValue, setRatingThresholdValue] = useState([]);
  const [jobTypeData, setJobTypeData] = useState([]);
  const [selectJobType, setSelectJobType] = useState();
  const [selectJobTypeid, setSelectJobTypeid] = useState('');
  const [selectJobTypeidError, setSelectJobTypeidError] = useState('');
  const [servicesData, setServicesData] = useState([]);
  const [servicesValue, setservicesValue] = useState([]);
  const [servicesValueError, setservicesValueError] = useState(false);
  const [jobDetailsData, setJobDetailsData] = useState([]);

  const [UserCurrentCity, setUserCurrentCity] = useState('');
  const [UserZip_Code, setUserZip_Code] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [arrowIcon, setArrowIcon] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const loginData = useSelector(state => state.authenticationReducer.data);

  // validation.....
  const handleNextbtn = () => {
    console.log(
      'selectedAddress?.property_type_id',
      selectedAddress?.property_type_id,
    );
    if (selectJobTypeid == '') {
      setSelectJobTypeidError('Please choose an option!');
    } else if (servicesValue == '') {
      setservicesValueError(true);
    } else if (jobPriorityValue == '') {
      setJobPriorityValueError(true);
    } else if (selectedAddress == '') {
      setTakingPlaceError(true);
    } else {
      props.navigation.navigate('CreateJobTermsScreen', {
        selectJobType: selectJobTypeid,
        servicesValue: servicesValue,
        aboutyourNeed: aboutyourNeed,
        jobPriorityValue: jobPriorityValue,
        property_value: selectedAddress?.property_type_id,
        location: location || selectedAddress.location,
        ratingThresholdValue: ratingThresholdValue,
        latitude: latitude || selectedAddress.latitude,
        longitude: longitude || selectedAddress.longitude,
        JobId: JobId,
        editMode: editMode,
        myJob: myJob,
      });
    }
  };

  const goBack = () => {
    props.navigation.pop();
    props.navigation.navigate('Jobs', {
      job_sub_type: job_sub_type,
    });
  };
  // ...Location
  const ConfirmAddress = () => {
    setIsMap(false);
    setLocation(currentLocation);
  };
  const openMapandClose = text => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = Region => {
    console.log('Region....', JSON.stringify(Region));
    setlatitude(Region.latitude);
    setlongitude(Region.longitude);
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
        console.log('addressComponent2.....', addressComponent2);
        setUserCurrentCity(addressComponent2.long_name);
        setUserZip_Code(json.results[1]?.address_components[6]?.long_name);
        console.log('mainFullAddress....', MainFullAddress);
      })
      .catch(error => console.warn(error));
  };
  const handleBoxPress = lookup_key => {
    setIsClick(lookup_key);
    setSelectJobTypeid(lookup_key);
    setSelectJobTypeidError();
  };
  const getStepIndicatorIconConfig = ({position, stepStatus}) => {
    const iconConfig = {
      name: 'feed',
      color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
      size: 20,
    };

    switch (position) {
      case 0: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }
      case 1: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }
      case 2: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }
      case 3: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }

      default: {
        break;
      }
    }
    return iconConfig;
  };

  const firstIndicatorSignUpStepStyle = {
    stepIndicatorSize: 40,
    currentStepIndicatorSize: 20,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    separatorFinishedColor: _COLORS.Kodie_GrayColor,
    separatorUnFinishedColor: _COLORS.Kodie_LightOrange,
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
  const renderStepIndicator = params => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  const renderLabel = ({position, stepStatus}) => {
    const iconColor =
      position === currentPage
        ? _COLORS.Kodie_BlackColor
        : stepStatus === 'finished'
        ? '#000000'
        : '#808080';
    const iconName =
      position === 0
        ? 'Details'
        : position === 1
        ? 'Terms'
        : position === 2
        ? 'Images'
        : position === 3
        ? 'Review'
        : 'null';

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
    handleProperty_Type();
    Selected_Address_Type();
    handleJob_priority();
    handleRatingThreshold();
    handleJobType();
    JobId > 0 ||
    (Array.isArray(createJobId) && createJobId.length > 0) ||
    typeof createJobId === 'number'
      ? getJobDetails()
      : null;
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
    // CheckIOSMapPermission();
    setservicesValue('');
    setAboutyourNeed('');
    setJobPriorityValue('');
    setProperty_value('');
    setLocation('');
    setSelectedAddress('');
    setRatingThresholdValue('');
  }, []); //pass the selectJobType in the depandency.
  useEffect(() => {
    if (selectJobType !== null) {
      handleServices(selectJobType);
    }
  }, [selectJobType]);
  const Selected_Time_render = item => {
    const isSelected = selectedAddress?.property_id === item.property_id;

    return (
      <View contentContainerStyle={{flex: 1, height: '100%'}}>
        <View
          style={[
            CreateJobFirstStyle.itemView,
            {
              backgroundColor: isSelected
                ? _COLORS.Kodie_MidLightGreenColor
                : null,
            },
          ]}>
          {isSelected ? (
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
          <Text style={CreateJobFirstStyle.textItem}>{item.location}</Text>
        </View>
      </View>
    );
  };

  const jobPriority_render = item => {
    return (
      <View contentContainerStyle={{flex: 1, height: '100%'}}>
        <View
          style={[
            CreateJobFirstStyle.itemView,
            {
              backgroundColor:
                item?.lookup_key === jobPriorityValue
                  ? _COLORS.Kodie_MidLightGreenColor
                  : null,
            },
          ]}>
          {item.lookup_key === jobPriorityValue ? (
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
          <Text style={CreateJobFirstStyle.textItem}>
            {item?.lookup_description}
          </Text>
        </View>
      </View>
    );
  };
  const property_Type_render = item => {
    return (
      <View contentContainerStyle={{flex: 1, height: '100%'}}>
        <View
          style={[
            CreateJobFirstStyle.itemView,
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
          <Text style={CreateJobFirstStyle.textItem}>
            {item?.lookup_description}
          </Text>
        </View>
      </View>
    );
  };
  const lookingServices_render = item => {
    setArrowIcon;
    return (
      <View contentContainerStyle={{flex: 1, height: '100%'}}>
        <View
          style={[
            CreateJobFirstStyle.itemView,
            {
              backgroundColor:
                item?.lookup_key === servicesValue
                  ? _COLORS.Kodie_MidLightGreenColor
                  : null,
            },
          ]}>
          {item?.lookup_key === servicesValue ? (
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
          <Text style={CreateJobFirstStyle.textItem}>
            {item?.lookup_description}
          </Text>
        </View>
      </View>
    );
  };
  const ratingThreshold_render = item => {
    return (
      <View contentContainerStyle={{flex: 1, height: '100%'}}>
        <View
          style={[
            CreateJobFirstStyle.itemView,
            {
              backgroundColor:
                item?.lookup_key === ratingThresholdValue
                  ? _COLORS.Kodie_MidLightGreenColor
                  : null,
            },
          ]}>
          {item?.lookup_key === ratingThresholdValue ? (
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
          <AntDesign
            style={CreateJobFirstStyle.starIcon}
            color={_COLORS.Kodie_lightGreenColor}
            name="star"
            size={20}
          />
          <Text style={CreateJobFirstStyle.textItem}>
            {item?.lookup_description}
          </Text>
        </View>
      </View>
    );
  };
  const jobType_render = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <ServicesBox
          images
          Services_Name={item.lookup_description}
          Services_Icon={
            item?.lookup_key === 166
              ? 'cleaning-services'
              : item?.lookup_key === 167
              ? 'mower-bag'
              : item?.lookup_key === 168
              ? 'forklift'
              : item?.lookup_key === 169
              ? 'tools'
              : 'MaterialIcons'
          }
          iconLibrary={
            item?.lookup_key === 166
              ? 'MaterialIcons'
              : item?.lookup_key === 167
              ? 'MaterialCommunityIcons'
              : item?.lookup_key === 168
              ? 'MaterialCommunityIcons'
              : item?.lookup_key === 169
              ? 'Entypo'
              : 'MaterialIcons'
          }
          iconColor={
            isClick === item?.lookup_key
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_GrayColor
          }
          BoxStyling={[
            CreateJobFirstStyle.box_style,
            {
              backgroundColor:
                isClick === item?.lookup_key
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor,
              borderColor: selectJobTypeidError
                ? _COLORS?.Kodie_redColor
                : isClick === item?.lookup_key
                ? _COLORS?.Kodie_GreenColor
                : _COLORS.Kodie_GrayColor,
            },
          ]}
          textColor={[
            CreateJobFirstStyle.box_Text_Style,
            {
              color:
                isClick === item?.lookup_key
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor,
            },
          ]}
          onPress={() => {
            handleBoxPress(item?.lookup_key);
            setSelectJobType(item?.lookup_key);
          }}
        />
      </View>
    );
  };
  // api intrigation.......
  const Selected_Address_Type = () => {
    const Selected_Address = {
      account_id: loginData?.Login_details?.user_account_id,
    };
    const url = Config.BASE_URL;
    const Selected_AddressType = url + 'get_property_details_my_acc_id';
    setIsLoading(true);
    axios
      .post(Selected_AddressType, Selected_Address)
      .then(response => {
        // console.log('Selected_Address', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);
          console.log('Selected_Address....', response?.data?.property_details);
          setSelectedAddreeData(response?.data?.property_details);
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Selected_Address error:', error);
        // alert(error);
        setIsLoading(false);
      });
  };
  const handleJob_priority = () => {
    const propertyData = {
      P_PARENT_CODE: 'JOB_PRIORITY',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const propertyType = url + 'lookup_details';
    console.log('Request URL:', propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then(response => {
        // console.log('Job_priority', response?.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          // console.log('Job_priorityData....', response?.data?.lookup_details);
          setJobPriorityData(response?.data?.lookup_details);
        } else {
          console.error('Job_priority_error:', response?.data?.error);
          // alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Job_priority error:', error);
        setIsLoading(false);
      });
  };
  const handleRatingThreshold = () => {
    const propertyData = {
      P_PARENT_CODE: 'RATING_THRESHOLD',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const propertyType = url + 'lookup_details';
    console.log('Request URL:', propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then(response => {
        // console.log('RatingThreshold...', response?.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          // console.log(
          //   'RatingThresholdData....',
          //   response?.data?.lookup_details,
          // );
          setRatingThresholdData(response?.data?.lookup_details);
        } else {
          console.error(
            'RatingThreshold_error:',
            'Oops something went wrong! Please try again later.',
          );
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('RatingThreshold error:', error);
        // alert(error);
        setIsLoading(false);
      });
  };
  const handleJobType = () => {
    const propertyData = {
      P_PARENT_CODE: 'JOB_TYPE',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const propertyType = url + 'lookup_details';
    console.log('Request URL:', propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then(response => {
        // console.log('JobType...', response?.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          // console.log('JobTypeData....', response?.data?.lookup_details);
          setJobTypeData(response?.data?.lookup_details);
        } else {
          console.error('JobType_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('JobType error:', error);
        // alert(error);
        setIsLoading(false);
      });
  };

  const handleServices = selectJobType => {
    let P_PARENT_CODE = null;

    // Map CompanyjobType to P_PARENT_CODE
    switch (selectJobType) {
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
        console.error('Unknown CompanyjobType:', selectJobType);
        return;
    }

    console.log('P_PARENT_CODE:', P_PARENT_CODE);

    if (P_PARENT_CODE !== null) {
      const propertyData = {
        P_PARENT_CODE: P_PARENT_CODE,
        P_TYPE: 'OPTION',
      };

      console.log('Companydata', propertyData);

      const url = Config.BASE_URL;
      const propertyType = url + 'lookup_details';
      console.log('Request URL:', propertyType);
      setIsLoading(true);

      // Make POST request with axios
      axios
        .post(propertyType, propertyData)
        .then(response => {
          console.log('ServicesType...', response?.data);
          if (response?.data?.status === true) {
            setIsLoading(false);
            console.log('ServicesTypeData....', response?.data?.lookup_details);
            setServicesData(response?.data?.lookup_details);
          } else {
            console.error('Job Services Error:', response?.data?.error);
            setIsLoading(false);
          }
        })
        .catch(error => {
          console.error('Job Services Error:', error);
          setIsLoading(false);
        });
    }
  };

  // EditMode ..................
  const getJobDetails = () => {
    const url = Config.BASE_URL;
    const jobDetails_url = url + 'job/get';
    console.log('Request URL:', jobDetails_url);
    setIsLoading(true);
    const jobDetails_Data = {
      jm_job_id:
        createJobId && !Array.isArray(createJobId) ? createJobId : JobId,
    };
    axios
      .post(jobDetails_url, jobDetails_Data)
      .then(response => {
        // console.log('API Response JobDetails:', response?.data);
        if (response?.data?.success === true) {
          setJobDetailsData(response?.data?.data);
          console.log('jobDetailsData....', response?.data?.data);
          setSelectJobTypeid(response?.data?.data?.job_type_key);
          setIsClick(parseInt(response?.data?.data?.job_type_key));
          setAboutyourNeed(response?.data?.data?.job_description);
          setservicesValue(
            parseInt(response?.data?.data?.job_service_you_looking_key),
          );
          setJobPriorityValue(parseInt(response?.data?.data?.job_priority_key));
          setProperty_value(parseInt(response?.data?.data?.property_type_key));
          setLocation(response?.data?.data?.job_location);
          setRatingThresholdValue(
            parseInt(response?.data?.data?.job_rating_key),
          );
          setSelectedAddress({
            latitude: response?.data?.data?.location_latitude,
            longitude: response?.data?.data?.location_longitude,
            location:response?.data?.data?.job_location,
            property_id: response?.data?.data?.property_id,
            propertyType: response?.data?.data?.property_type,
            property_type_id: response?.data?.data?.property_type_key,
          })
          setlatitude(response?.data?.data?.location_latitude);
          setlongitude(response?.data?.data?.location_longitude);
          handleServices(response?.data?.data.job_type_key);
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed JobDetails in Edit mode ', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
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
        // console.log('property_type', response?.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          // console.log('propertyData....', response?.data?.lookup_details);
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
  return (
    <SafeAreaView style={CreateJobFirstStyle.container}>
      <TopHeader
        onPressLeftButton={() => {
          IsMap
            ? setIsMap(false)
            : IsSearch
            ? setIsSearch(false)
            : ReviewInspection
            ? _goBack(props)
            : goBack();
        }}
        MiddleText={
          IsMap || IsSearch
            ? 'Location'
            : editMode
            ? 'Edit job'
            : 'Create new job request'
        }
      />
      {IsMap || IsSearch ? null : (
        <View style={{marginVertical: 10}}>
          <StepIndicator
            customSignUpStepStyle={firstIndicatorSignUpStepStyle}
            currentPosition={0}
            renderStepIndicator={renderStepIndicator}
            labels={stepLabels}
            stepCount={4}
            renderLabel={renderLabel}
          />
        </View>
      )}
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
          <TouchableOpacity
            style={CreateJobFirstStyle.BtnContainer}
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
        <ScrollView>
          <View style={CreateJobFirstStyle.mainView}>
            <Text style={CreateJobFirstStyle.heading}>{'Job details'}</Text>
            <Text style={CreateJobFirstStyle.servicestext}>
              {'Select the type of job you need:'}
              <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
            </Text>
          </View>
          <View style={{marginHorizontal: 6}}>
            <FlatList
              data={jobTypeData}
              keyExtractor={item => item.lookup_key.toString()}
              renderItem={jobType_render}
              numColumns={2}
            />
            {selectJobTypeidError ? (
              <Text style={CreateJobFirstStyle.error_text1}>
                {selectJobTypeidError}
              </Text>
            ) : null}
          </View>
          <View style={CreateJobFirstStyle.formContainer}>
            <View style={{flex: 1}}>
              <Text style={[LABEL_STYLES.commontext, {marginTop: 6}]}>
                {'What service are you looking for?'}
                <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
              </Text>
              <Dropdown
                style={[
                  CreateJobFirstStyle.dropdown,
                  {
                      borderColor: servicesValueError
                        ? _COLORS?.Kodie_redColor
                        : _COLORS?.Kodie_GrayColor,
                  },
                ]}
                placeholderStyle={CreateJobFirstStyle.placeholderStyle}
                selectedTextStyle={CreateJobFirstStyle.selectedTextStyle}
                inputSearchStyle={CreateJobFirstStyle.inputSearchStyle}
                iconStyle={CreateJobFirstStyle.iconStyle}
                data={servicesData}
                search
                maxHeight={300}
                labelField="lookup_description"
                valueField="lookup_key"
                placeholder="Select item"
                iconColor={_COLORS.Kodie_BlackColor}
                value={servicesValue}
                disable={isClick ? false : true}
                searchPlaceholder="Search..."
                onChange={item => {
                  setservicesValue(item.lookup_key);
                  setservicesValueError(false);
                }}
                renderItem={lookingServices_render}
              />
            </View>
            {servicesValueError ? (
              <Text style={CreateJobFirstStyle.error_text}>
                {'Please choose an option!'}
              </Text>
            ) : null}
            <View style={CreateJobFirstStyle.jobDetailsView}>
              <Text style={LABEL_STYLES.commontext}>
                {'Tell us more about your needs:'}
              </Text>
              <TextInput
                style={[CreateJobFirstStyle.input, CreateJobFirstStyle.jobD_]}
                value={aboutyourNeed}
                onChangeText={setAboutyourNeed}
                placeholder="Describe the job you need help with..."
                placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                multiline
                maxLength={150}
                numberOfLines={5}
                textAlignVertical={'top'}
              />
            </View>
            <View style={{marginTop: 12}}>
              <Text style={LABEL_STYLES.commontext}>
                {'Job priority:'}
                <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
              </Text>
              <Dropdown
                style={[
                  CreateJobFirstStyle.dropdown,
                  {
                    borderColor: jobPriorityValueError
                      ? _COLORS?.Kodie_redColor
                      : _COLORS?.Kodie_GrayColor,
                  },
                ]}
                placeholderStyle={CreateJobFirstStyle.placeholderStyle}
                selectedTextStyle={CreateJobFirstStyle.selectedTextStyle}
                inputSearchStyle={CreateJobFirstStyle.inputSearchStyle}
                iconStyle={CreateJobFirstStyle.iconStyle}
                data={jobPriorityData}
                search
                maxHeight={300}
                labelField="lookup_description"
                valueField="lookup_key"
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={jobPriorityValue}
                onChange={item => {
                  setJobPriorityValue(item.lookup_key);
                  setJobPriorityValueError(false);
                }}
                renderItem={jobPriority_render}
                dropdownPosition="bottom"
              />
            </View>
            {jobPriorityValueError ? (
              <Text style={CreateJobFirstStyle.error_text}>
                {'Please choose an option!'}
              </Text>
            ) : null}
            {/* <View style={{marginTop: 12}}>
              <Text style={LABEL_STYLES.commontext}>
                {'Property type'}
                <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
              </Text>
              <Dropdown
                style={CreateJobFirstStyle.dropdown}
                placeholderStyle={CreateJobFirstStyle.placeholderStyle}
                selectedTextStyle={CreateJobFirstStyle.selectedTextStyle}
                inputSearchStyle={CreateJobFirstStyle.inputSearchStyle}
                iconStyle={CreateJobFirstStyle.iconStyle}
                data={property_Data}
                search
                maxHeight={300}
                labelField="lookup_description"
                valueField="lookup_key"
                placeholder="Select property type"
                searchPlaceholder="Search..."
                value={property_value}
                onChange={item => {
                  setProperty_value(item.lookup_key);
                  setProperty_valueError(false);
                }}
                renderItem={property_Type_render}
              />
            </View>
            {property_valueError ? (
              <Text style={CreateJobFirstStyle.error_text}>
                {'Property type is required!'}
              </Text>
            ) : null} */}
            <View style={{marginTop: 12}}>
              <Text style={LABEL_STYLES.commontext}>
                {'Where is the job taking place?'}
                <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
              </Text>
              <Dropdown
                style={[
                  CreateJobFirstStyle.dropdown,
                  {
                      borderColor: takingPlaceError
                        ? _COLORS?.Kodie_redColor
                        : _COLORS?.Kodie_GrayColor,
                  },
                ]}
                placeholderStyle={CreateJobFirstStyle.placeholderStyle}
                selectedTextStyle={CreateJobFirstStyle.selectedTextStyle}
                inputSearchStyle={CreateJobFirstStyle.inputSearchStyle}
                iconStyle={CreateJobFirstStyle.iconStyle}
                data={selectedAddressData}
                search
                maxHeight={300}
                labelField="location"
                valueField="longitude"
                placeholder="Select property"
                searchPlaceholder="Search..."
                value={selectedAddress || null}
                onChange={item => {
                  setSelectedAddress({
                    latitude: item.latitude,
                    longitude: item.longitude,
                    location: item.location,
                    property_id: item?.property_id,
                    propertyType: item?.type_id,
                    property_type_id: item?.property_type_id,
                  });
                  setTakingPlaceError(false);
                }}
                renderItem={Selected_Time_render}
              />
            </View>

            {/* {!selectedAddress ? (
              <View style={CreateJobFirstStyle.locationContainer}>
                <TextInput
                  style={CreateJobFirstStyle.locationInput}
                  value={location}
                  onChangeText={setLocation}
                  onFocus={() => {
                    setIsSearch(true);
                  }}
                  placeholder="Enter new location"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
                <TouchableOpacity
                  style={CreateJobFirstStyle.locationIconView}
                  onPress={() => {
                    setIsMap(true);
                  }}>
                  <Octicons
                    name={'location'}
                    size={22}
                    color={_COLORS.Kodie_GreenColor}
                    style={CreateJobFirstStyle.locationIcon}
                  />
                </TouchableOpacity>
              </View>
            ) : null} */}
            {takingPlaceError ? (
              <Text style={CreateJobFirstStyle.error_text}>
                {'Please choose an option!'}
              </Text>
            ) : null}
            {selectedAddress?.propertyType ? (
              <View style={{marginTop: 12}}>
                <Text style={LABEL_STYLES.commontext}>{'Property type'}</Text>
                <TextInput
                  style={[
                    CreateJobFirstStyle.input,
                    {backgroundColor: _COLORS?.Kodie_GrayColor},
                  ]}
                  value={selectedAddress?.propertyType}
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  editable={false}
                />
              </View>
            ) : null}
            <View style={CreateJobFirstStyle.jobDetailsView}>
              <Text style={LABEL_STYLES.commontext}>{'Rating threshold:'}</Text>
              <Dropdown
                style={CreateJobFirstStyle.dropdown}
                placeholderStyle={CreateJobFirstStyle.placeholderStyle}
                selectedTextStyle={CreateJobFirstStyle.selectedTextStyle}
                inputSearchStyle={CreateJobFirstStyle.inputSearchStyle}
                iconStyle={CreateJobFirstStyle.iconStyle}
                data={ratingThresholdData}
                search
                maxHeight={300}
                labelField="lookup_description"
                valueField="lookup_key"
                placeholder="1 star and above"
                searchPlaceholder="Search..."
                value={ratingThresholdValue}
                onChange={item => {
                  setRatingThresholdValue(item.lookup_key);
                  // alert(item.lookup_key);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={CreateJobFirstStyle.starIcon}
                    color={_COLORS.Kodie_lightGreenColor}
                    name="star"
                    size={20}
                  />
                )}
                renderItem={ratingThreshold_render}
              />
            </View>
            <View style={{marginTop: 27, marginBottom: 5}}>
              <CustomSingleButton
                disabled={isLoading ? true : false}
                onPress={() => {
                  handleNextbtn();
                }}
                _ButtonText={'Next'}
                Text_Color={_COLORS.Kodie_WhiteColor}
              />
            </View>
            <TouchableOpacity
              style={CreateJobFirstStyle.goBack_View}
              onPress={() => {
                goBack();
              }}>
              <View style={CreateJobFirstStyle.backIcon}>
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color={_COLORS.Kodie_MediumGrayColor}
                />
              </View>
              <Text style={CreateJobFirstStyle.goBack_Text}>{'Go back'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
