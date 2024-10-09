import React, { useState, useEffect, useRef } from 'react';
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
import { CreateJobFirstStyle } from './CreateJobFirstScreenCss';
import CustomSingleButton from '../../components/Atoms/CustomButton/CustomSingleButton';
import { _COLORS, LABEL_STYLES, IMAGES } from '../../Themes/index';
import TopHeader from '../../components/Molecules/Header/Header';
import { _goBack } from '../../services/CommonServices';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ServicesBox from '../../components/Molecules/ServicesBox/ServicesBox';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Config } from '../../Config';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import MapScreen from '../../components/Molecules/GoogleMap/googleMap';
import SearchPlaces from '../../components/Molecules/SearchPlaces/SearchPlaces';
import { CommonLoader } from '../../components/Molecules/ActiveLoader/ActiveLoader';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { SignupLookupDetails } from '../../APIs/AllApi';
const stepLabels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

export default CreateJobFirstScreen = props => {
  const createJobId = useSelector(state => state.AddCreateJobReducer.data);
  console.log('createJobId.....', createJobId);
  const JobId = props.route.params?.JobId;
  console.log('JobId in first page..', JobId);
  const editMode = props.route.params?.editMode;
  const myJob = props.route.params?.myJob;
  const job_sub_type = props.route.params?.job_sub_type;
  const ReviewInspection = props.route.params?.ReviewInspection;
  const [currentPage, setCurrentPage] = useState(0);
  const [saveJobId, setSaveJobId] = useState(0);
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

  const [selectedDate, setSelectedDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [hourlyNeedValue, setHourlyNeedValue] = useState(0);
  const [needServicesValue, setneedServicesValue] = useState(0);
  const [formattedPriceRanges, setFormattedPriceRanges] = useState('');
  const [selectedButtonResponsible, setSelectedButtonResponsible] =
    useState(false);
  const [selectedButtonBookingInsurance, setSelectedButtonBookingInsurance] =
    useState(false);
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(0);
  const loginData = useSelector(state => state.authenticationReducer.data);

  // validation.....
  const handleNextbtn = () => {
    if (selectJobTypeid === '') {
      setSelectJobTypeidError('Please choose an option!');
    } else if (servicesValue === '') {
      setservicesValueError(true);
    } else if (jobPriorityValue === '') {
      setJobPriorityValueError(true);
    } else if (selectedAddress === '') {
      setTakingPlaceError(true);
    } else {
      if (JobId || saveJobId) {
        updateCreateJob(); // Call update job if JobId is present
      } else {
        handleCreateJob(); // Otherwise, call create job
      }
    }
  };

  useEffect(() => {
    handleProperty_Type();
    Selected_Address_Type();
    handleJob_priority();
    handleRatingThreshold();
    handleJobType();
    // JobId ?getJobDetails() : null;
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
    setservicesValue('');
    setAboutyourNeed('');
    setJobPriorityValue('');
    setProperty_value('');
    setLocation('');
    setSelectedAddress('');
    setRatingThresholdValue('');
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      if (JobId || saveJobId) {
        getJobDetails(); // Fetch job details when the screen is focused
      }
    }, [JobId, saveJobId])
  );
  console.log("saveJobId...", saveJobId)
  useEffect(() => {
    if (selectJobType !== null) {
      handleServices(selectJobType);
    }
  }, [selectJobType]);

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
  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
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
  const renderLabel = ({ position, stepStatus }) => {
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

  // EditMode ..................
  const getJobDetails = () => {
    const url = Config.BASE_URL;
    const jobDetails_url = url + 'job/get';
    console.log('Request URL:', jobDetails_url);
    setIsLoading(true);
    const jobDetails_Data = {
      jm_job_id: saveJobId ? saveJobId : JobId,
    };
    axios
      .post(jobDetails_url, jobDetails_Data)
      .then(response => {
        // console.log('API Response JobDetails:', response?.data);
        if (response?.data?.success === true) {
          setJobDetailsData(response?.data?.data);
          console.log('get job data in first page....', response?.data?.data);
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
            location: response?.data?.data?.job_location,
            property_id: response?.data?.data?.property_id,
            propertyType: response?.data?.data?.property_type,
            property_type_id: response?.data?.data?.property_type_key,
          });
          setlatitude(response?.data?.data?.location_latitude);
          setlongitude(response?.data?.data?.location_longitude);
          handleServices(response?.data?.data.job_type_key);
          setSelectedDate(
            response?.data?.data?.job_date === '0' ||
              response?.data?.data?.job_date === null
              ? ''
              : response?.data?.data?.job_date.substring(0, 10),
          );
          setCurrentTime(
            response?.data?.data?.job_time === '0' ||
              response?.data?.data?.job_time === null
              ? ''
              : response?.data?.data?.job_time,
          );
          setHourlyNeedValue(parseInt(response?.data?.data?.job_hourly_key));
          setneedServicesValue(
            parseInt(response?.data?.data?.job_how_often_key),
          );
          setFormattedPriceRanges(response?.data?.data?.job_budget);
          const payingThis = parseInt(response?.data?.data?.job_payment_by_key);
          console.log('payingThis...', payingThis);
          setSelectedButtonResponsible(
            payingThis === 259 ? false : payingThis === 260 ? true : null,
          );
          console.log('selectedButtonResponsible..', selectedButtonResponsible);
          // setSelectedButtonResponsible(true);
          setSelectedButtonBookingInsurance(
            parseInt(response?.data?.data?.job_insurence_key),
          );
          setMaxBudget(response?.data?.data?.job_max_budget);
          setMinBudget(response?.data?.data?.job_min_budget);
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
  // createJOb method...
  const handleCreateJob = () => {
    const url = Config.BASE_URL;
    const createJob_url = url + 'job/create';
    console.log('Request URL:', createJob_url);
    setIsLoading(true);
    const createJob_Data = {
      user_account_details_id: loginData?.Login_details?.user_account_id,
      type_of_job: selectJobType > 0 ? selectJobType : 0,
      job_service_you_looking: servicesValue > 0 ? servicesValue : 0,
      more_about_job: aboutyourNeed,
      job_priority: jobPriorityValue,
      property_type: selectedAddress?.property_type_id,
      job_location: selectedAddress?.location,
      location_latitude: selectedAddress?.latitude,
      location_longitude: selectedAddress?.longitude,
      upd_key: selectedAddress?.property_id,
      job_rating: ratingThresholdValue > 0 ? ratingThresholdValue : 0,
      job_date: 0,
      job_time: 0,
      job_hourly: 0,
      job_often_need_service: 0,
      job_min_budget: '',
      job_max_budget: '',
      job_payment_by: 0,
      job_booking_insurance: null,
      job_sub_type: myJob == 'requested' ? 1 : 0,
    };
    console.log('createJob_Data....', createJob_Data);
    axios
      .post(createJob_url, createJob_Data)
      .then(response => {
        console.log('API Response jobCreate..:', response?.data);
        if (response?.data?.success === true) {
          alert(response?.data?.message);
          setSaveJobId(response?.data?.job_id);
          // dispatch(fetchCreateJobSuccess(response?.data?.job_id));
          props.navigation.navigate('CreateJobTermsScreen', {
            JobId: response?.data?.job_id,
            editMode: editMode,
            selectJobType: selectJobType > 0 ? selectJobType : 0,
            servicesValue: servicesValue > 0 ? servicesValue : 0,
            aboutyourNeed: aboutyourNeed,
            jobPriorityValue: jobPriorityValue,
            property_value: selectedAddress?.property_type_id,
            location: selectedAddress?.location,
            ratingThresholdValue: ratingThresholdValue,
            latitude: selectedAddress.latitude,
            longitude: selectedAddress.longitude,
            jm_upd_key: 0,
            myJob: myJob,
            jm_upd_key: selectedAddress?.property_id
              ? selectedAddress?.property_id
              : 0,
          });
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed handleCreateJob', error);
        setIsLoading(false);
      });
    // .finally(() => {
    //   setIsLoading(false);
    // });
  };

  const updateCreateJob = () => {
    console.log('update job ');
    const url = Config.BASE_URL;
    const update_createJob_url = url + `job/updateJob/${saveJobId ? saveJobId : JobId}`;
    console.log('Request URL update:', update_createJob_url);
    setIsLoading(true);
    const update_createJob_Data = {
      type_of_job: selectJobTypeid,
      job_service_you_looking: servicesValue ? servicesValue : 0,
      more_about_job: aboutyourNeed,
      job_priority: jobPriorityValue,
      property_type: selectedAddress?.property_type_id,
      job_location: selectedAddress?.location,
      location_longitude: selectedAddress?.longitude,
      location_latitude: selectedAddress?.latitude,
      jm_upd_key: selectedAddress?.property_id
        ? selectedAddress?.property_id
        : 0,
      job_rating: ratingThresholdValue > 0 ? ratingThresholdValue : 0,
      job_date: selectedDate ? selectedDate : 0,
      job_time: currentTime ? currentTime : 0,
      job_hourly: hourlyNeedValue ? hourlyNeedValue : 0,
      job_often_need_service: needServicesValue ? needServicesValue : 0,
      job_min_budget: '',
      job_max_budget: '',
      job_payment_by: selectedButtonResponsible == true ? 260 : 259,
      job_booking_insurance: null,
    };
    console.log('updatedBody.....', update_createJob_Data);
    axios
      .put(update_createJob_url, update_createJob_Data)
      .then(response => {
        console.log('API Response updateCreateJob..:', response?.data);
        if (response?.data?.success === true) {
          alert(response?.data?.message);
          props.navigation.navigate('CreateJobTermsScreen', {
            JobId: saveJobId ? saveJobId : JobId,
            editMode: editMode,
            selectJobType: selectJobTypeid,
            servicesValue: servicesValue,
            aboutyourNeed: aboutyourNeed,
            jobPriorityValue: jobPriorityValue,
            property_value: selectedAddress?.property_type_id,
            location: location || selectedAddress.location,
            ratingThresholdValue: ratingThresholdValue,
            latitude: latitude || selectedAddress.latitude,
            longitude: longitude || selectedAddress.longitude,
            myJob: myJob,
            jm_upd_key: selectedAddress?.property_id
              ? selectedAddress?.property_id
              : 0,
          });
        } else {
          alert(response?.data?.message);
        }
      })
      .catch(error => {
        console.error('API failed updateCreateJob', error);
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const Selected_Time_render = item => {
    const isSelected = selectedAddress?.property_id === item.property_id;

    return (
      <View contentContainerStyle={{ flex: 1, height: '100%' }}>
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
      <View contentContainerStyle={{ flex: 1, height: '100%' }}>
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
      <View contentContainerStyle={{ flex: 1, height: '100%' }}>
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
      <View contentContainerStyle={{ flex: 1, height: '100%' }}>
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
      <View contentContainerStyle={{ flex: 1, height: '100%' }}>
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
  const jobType_render = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
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

  const handleJob_priority = async () => {
    setIsLoading(true); // Start loading state

    try {
      const response = await SignupLookupDetails({
        P_PARENT_CODE: 'JOB_PRIORITY',
        P_TYPE: 'OPTION',
      });

      console.log('Job Priority...', response); // Log the response

      // Check the response status
      if (response?.status === true) {
        setJobPriorityData(response?.lookup_details); // Set the job priority data
        console.log('JobPriorityData....', response?.lookup_details);
      } else {
        console.error('JobPriority_error:', response?.error); // Log error if status is not true
      }
    } catch (error) {
      console.error('Job_priority error:', error); // Log any errors that occur during the API call
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  const handleRatingThreshold = async () => {
    setIsLoading(true); // Start loading state

    try {
      const response = await SignupLookupDetails({
        P_PARENT_CODE: 'RATING_THRESHOLD',
        P_TYPE: 'OPTION',
      });

      console.log('RatingThreshold...', response); // Log the response

      // Check the response status
      if (response?.status === true) {
        setRatingThresholdData(response?.lookup_details); // Set the rating threshold data
        console.log('RatingThresholdData....', response?.lookup_details);
      } else {
        console.error('RatingThreshold_error:', response?.error); // Log error if status is not true
      }
    } catch (error) {
      console.error('RatingThreshold error:', error); // Log any errors that occur during the API call
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  const handleJobType = async () => {
    setIsLoading(true); // Start loading state

    try {
      const response = await SignupLookupDetails({
        P_PARENT_CODE: 'JOB_TYPE',
        P_TYPE: 'OPTION',
      });

      console.log('JobType data...', response); // Log the response

      // Check the response status
      if (response?.status === true) {
        setJobTypeData(response?.lookup_details); // Set the job type data
        console.log('JobTypeData....', response?.lookup_details);
      } else {
        console.error('JobType_error:', response?.error); // Log error if status is not true
      }
    } catch (error) {
      console.error('JobType error:', error); // Log any errors that occur during the API call
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  const handleServices = selectJobType => {
    let P_PARENT_CODE = null;

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
        <View style={{ marginVertical: 10 }}>
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
            iscancel={() => setIsMap(false)}

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
            setCurrentLocation(details.formatted_address);
          }}
        />
      ) : (
        <ScrollView>
          <View style={CreateJobFirstStyle.mainView}>
            <Text style={CreateJobFirstStyle.heading}>{'Job details'}</Text>
            <Text style={CreateJobFirstStyle.servicestext}>
              {'Select the type of job you need:'}
              <Text style={{ color: _COLORS?.Kodie_redColor }}>*</Text>
            </Text>
          </View>
          <View style={{ marginHorizontal: 6 }}>
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
            <View style={{ flex: 1 }}>
              <Text style={[LABEL_STYLES.commontext, { marginTop: 6 }]}>
                {'What service are you looking for?'}
                <Text style={{ color: _COLORS?.Kodie_redColor }}>*</Text>
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
            <View style={{ marginTop: 12 }}>
              <Text style={LABEL_STYLES.commontext}>
                {'Job priority:'}
                <Text style={{ color: _COLORS?.Kodie_redColor }}>*</Text>
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
            <View style={{ marginTop: 12 }}>
              <Text style={LABEL_STYLES.commontext}>
                {'Where is the job taking place?'}
                <Text style={{ color: _COLORS?.Kodie_redColor }}>*</Text>
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
              <View style={{ marginTop: 12 }}>
                <Text style={LABEL_STYLES.commontext}>{'Property type:'}</Text>
                <TextInput
                  style={[
                    CreateJobFirstStyle.input,
                    { backgroundColor: _COLORS?.Kodie_GrayColor },
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
                placeholder="Rating threshold"
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
            <View style={{ marginTop: 27, marginBottom: 5 }}>
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
