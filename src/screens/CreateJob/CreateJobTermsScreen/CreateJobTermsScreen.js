import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {CreateJobTermsStyle} from './CreateJobTermsStyle';
import TopHeader from '../../../components/Molecules/Header/Header';
import {_goBack} from '../../../services/CommonServices';
import {Dropdown} from 'react-native-element-dropdown';
import {_COLORS, LABEL_STYLES} from '../../../Themes/index';
import TimePicker from '../../../components/Molecules/ClockPicker/TimePicker';
import moment from 'moment';
import RangeSlider from '../../../components/Molecules/RangeSlider/RangeSlider';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarModal from '../../../components/Molecules/CalenderModal/CalenderModal';
import StepIndicator from 'react-native-step-indicator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {Config} from '../../../Config';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {fetchCreateJobSuccess} from '../../../redux/Actions/AddJob/CreateJob/CreateJobApiAction';
const stepLabels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
const data = [
  {label: '3 hours', value: '1'},
  {label: '4 hours', value: '2'},
  {label: '5 hours', value: '3'},
  {label: '6 hours', value: '4'},
];
export default CreateJobTermsScreen = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const userRole = loginData?.Account_details?.[0]?.user_role_id;
  // const userRole = '2';
  const roleArray = userRole ? userRole.split(',') : [];
  const hasTenantRole = roleArray.includes('2'); // Tenant role (2)
  const hasLandlordRole = roleArray.includes('3'); // Landlord role (3)
  const hasContractorRole = roleArray.includes('4'); // Contractor role (4)

  const dispatch = useDispatch();
  const createJobId = useSelector(state => state.AddCreateJobReducer.data);
  console.log('createJobId.....', createJobId);

  const handlePriceRangeChange = priceRange => {
    console.log('Price Range in Parent Component:', priceRange);
    setPriceRanges(priceRange);
  };
  const handlemaxRange = high => {
    console.log('High Range in Parent Component:', high);
    setMax(high);
  };
  const handleminRange = low => {
    console.log('Low Range in Parent Component:', low);
    setMin(low);
  };
  const {
    JobId,
    editMode,
    selectJobType,
    servicesValue,
    aboutyourNeed,
    jobPriorityValue,
    property_value,
    location,
    ratingThresholdValue,
    latitude,
    longitude,
    myJob,
    jm_upd_key,
  } = props.route.params;

  console.log('JobId:', JobId);
  console.log('editMode:', editMode);
  console.log('selectJobType:', selectJobType);
  console.log('servicesValue:', servicesValue);
  console.log('aboutyourNeed:', aboutyourNeed);
  console.log('jobPriorityValue:', jobPriorityValue);
  console.log('property_value:', property_value);
  console.log('location:', location);
  console.log('ratingThresholdValue:', ratingThresholdValue);
  console.log('latitude:', latitude);
  console.log('longitude:', longitude);
  console.log('myJob:', myJob);

  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(0);
  const [priceRanges, setPriceRanges] = useState(0);
  const [formattedPriceRanges, setFormattedPriceRanges] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTime, setCurrentTime] = useState('');
  const [currentTimeError, setCurrentTimeError] = useState('');
  const [value, setValue] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateError, setSelectedDateError] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [hourlyNeedData, setHourlyNeedData] = useState([]);
  const [hourlyNeedValue, setHourlyNeedValue] = useState([]);
  const [needServicesData, setNeedServicesData] = useState([]);
  const [needServicesValue, setneedServicesValue] = useState([]);
  const [selectedResponsibleData, setSelectedResponsibleData] = useState([]);
  const [selectedButtonResponsible, setSelectedButtonResponsible] =
    useState(false);
  const [selectedButtonResponsibleId, setSelectedButtonResponsibleId] =
    useState(259);
  const [bookingInsuranceData, setBookingInsuranceData] = useState([]);
  const [selectedButtonBookingInsurance, setSelectedButtonBookingInsurance] =
    useState(false);

  const [selectedButtonBookingInsuranceId, setSelectedButtoBookingInsuranceId] =
    useState(null);
  const [jobDetailsData, setJobDetailsData] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const apply_toggleModal = () => {
    setModalVisible(!isModalVisible);
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

  const handleRequestDate = text => {
    setSelectedDate(text);
    if (text.trim() === '') {
      setSelectedDateError('Request date is required!');
    } else {
      setSelectedDateError('');
    }
  };
  const handleSelectTime = text => {
    if (text.trim() === '') {
      setCurrentTimeError('Select time is required!');
    } else {
      setCurrentTimeError('');
    }
  };
  const handleValidatiomtionCreateJob = () => {
    if (selectedDate.trim() === '') {
      setSelectedDateError('Select date is required!');
    } else if (currentTime.trim() == '') {
      setCurrentTimeError('Select time is required!');
    } else {
      updateCreateJob();
    }
  };

  useEffect(() => {
    handleHourlyNeed();
    handleNeedServices();
    handleResponsible();
    handleBookingInsurance();
    if (priceRanges) {
      setFormattedPriceRanges(`$${priceRanges}`);
    }
    JobId ? getJobDetails() : null;
  }, []);
  console.log(`Formatted Price Range: ${formattedPriceRanges}`);

  // renderitems.....
  const NeedHour_render = item => {
    return (
      <ScrollView contentContainerStyle={{flex: 1, height: '100%'}}>
        <View
          style={[
            CreateJobTermsStyle.itemView,
            {
              backgroundColor:
                item?.lookup_key === hourlyNeedValue
                  ? _COLORS.Kodie_MidLightGreenColor
                  : null,
            },
          ]}>
          {item?.lookup_key === hourlyNeedValue ? (
            <Ionicons
              color={_COLORS.Kodie_GreenColor}
              name={'checkmark-circle'}
              size={25}
            />
          ) : (
            <Fontisto
              color={_COLORS.Kodie_GrayColor}
              name={'radio-btn-passive'}
              size={20}
            />
          )}
          <Text style={CreateJobTermsStyle.textItem}>
            {item?.lookup_description}
          </Text>
        </View>
      </ScrollView>
    );
  };
  const NeedService_render = item => {
    return (
      <ScrollView contentContainerStyle={{flex: 1, height: '100%'}}>
        <View
          style={[
            CreateJobTermsStyle.itemView,
            {
              backgroundColor:
                item?.lookup_key === needServicesValue
                  ? _COLORS.Kodie_MidLightGreenColor
                  : null,
            },
          ]}>
          {item?.lookup_key === needServicesValue ? (
            <Ionicons
              color={_COLORS.Kodie_GreenColor}
              name={'checkmark-circle'}
              size={25}
            />
          ) : (
            <Fontisto
              color={_COLORS.Kodie_GrayColor}
              name={'radio-btn-passive'}
              size={20}
            />
          )}
          <Text style={CreateJobTermsStyle.textItem}>
            {item?.lookup_description}
          </Text>
        </View>
      </ScrollView>
    );
  };
  // Api intrigation.....
  const handleHourlyNeed = () => {
    const propertyData = {
      P_PARENT_CODE: 'HOURLY_NEED',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const propertyType = url + 'lookup_details';
    console.log('Request URL:', propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then(response => {
        console.log('HourlyNeed....', response?.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          console.log('HourlyNeedData....', response?.data?.lookup_details);
          setHourlyNeedData(response?.data?.lookup_details);
        } else {
          console.error('HourlyNeed_error:', response?.data?.error);
          alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('HourlyNeed error:', error);
        setIsLoading(false);
      });
  };
  const handleNeedServices = () => {
    const propertyData = {
      P_PARENT_CODE: 'OFTEN_NEED_SERVICE',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const propertyType = url + 'lookup_details';
    console.log('Request URL:', propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then(response => {
        console.log('NeedServices....', response?.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          console.log('NeedServices....', response?.data?.lookup_details);
          setNeedServicesData(response?.data?.lookup_details);
        } else {
          console.error('Need Services_error:', response?.data?.error);
          alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('NeedServices error:', error);
        setIsLoading(false);
      });
  };
  const handleResponsible = () => {
    const propertyData = {
      P_PARENT_CODE: 'PAYMENT_RESPONSIBLE',
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
          console.log(
            'Responsible Category....',
            response?.data?.lookup_details,
          );
          setSelectedResponsibleData(response?.data?.lookup_details);
        } else {
          console.error('Responsible_Category_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Responsible Category error:', error);
        setIsLoading(false);
      });
  };
  const handleBookingInsurance = () => {
    const propertyData = {
      P_PARENT_CODE: 'BOOKING_INSURANCE',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const propertyType = url + 'lookup_details';
    console.log('Request URL:', propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then(response => {
        console.log('BookingInsurance...', response?.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          console.log('BookingInsurance....', response?.data?.lookup_details);
          setBookingInsuranceData(response?.data?.lookup_details);
        } else {
          console.error('BookingInsurance_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('BookingInsurance error:', error);
        setIsLoading(false);
      });
  };

  // Final Submit create job.......
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
      property_type: property_value,
      job_location: location,
      location_latitude: latitude,
      location_longitude: longitude,
      job_rating: ratingThresholdValue > 0 ? ratingThresholdValue : 0,
      job_date: selectedDate,
      job_time: currentTime,
      job_hourly: hourlyNeedValue,
      job_often_need_service: needServicesValue,
      job_min_budget: `$${min}`,
      job_max_budget: `$${max}`,
      job_payment_by:
        selectedButtonResponsibleId > 0 ? selectedButtonResponsibleId : 0,
      // job_booking_insurance: selectedButtonBookingInsuranceId,
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
          dispatch(fetchCreateJobSuccess(response?.data?.job_id));
          props.navigation.navigate('CreateJobSecondScreen', {
            JobId: response?.data?.job_id,
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

  // EditMode Api.........
  const getJobDetails = () => {
    const url = Config.BASE_URL;
    const jobDetails_url = url + 'job/get';
    console.log('Request URL:', jobDetails_url);
    setIsLoading(true);
    const jobDetails_Data = {
      jm_job_id: JobId,
    };
    axios
      .post(jobDetails_url, jobDetails_Data)
      .then(response => {
        console.log('API Response JobDetails:', response?.data);
        if (response?.data?.success === true) {
          setJobDetailsData(response?.data?.data);
          console.log('jobDetailsData_term....', response?.data?.data);
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
          // setSelectedButtonResponsible(true);
          setSelectedButtonBookingInsurance(
            parseInt(response?.data?.data?.job_insurence_key),
          );
          setMaxBudget(response?.data?.data?.job_max_budget);
          setMinBudget(response?.data?.data?.job_min_budget);
          console.log('max budget..', maxBudget);
          console.log('min budget..', minBudget);
          setIsLoading(false);
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed JobDetails in edit mode ', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateCreateJob = () => {
    const url = Config.BASE_URL;
    const update_createJob_url = url + `job/updateJob/${JobId}`;
    console.log('Request URL u:', update_createJob_url);
    setIsLoading(true);
    const update_createJob_Data = {
      type_of_job: selectJobType,
      job_service_you_looking: servicesValue,
      more_about_job: aboutyourNeed,
      job_priority: jobPriorityValue,
      property_type: property_value,
      job_location: location,
      location_longitude: longitude,
      location_latitude: latitude,
      jm_upd_key: jm_upd_key,
      job_rating: ratingThresholdValue,
      job_date: selectedDate,
      job_time: currentTime,
      job_hourly: hourlyNeedValue,
      job_often_need_service: needServicesValue,
      job_min_budget: jobDetailsData?.job_min_budget
        ? jobDetailsData?.job_min_budget
        : `$${min}`,
      job_max_budget: jobDetailsData?.job_max_budget
        ? jobDetailsData?.job_max_budget
        : `$${max}`,
      job_payment_by: selectedButtonResponsibleId,
      job_booking_insurance: null,
    };
    console.log('updatedBody in second step .....', update_createJob_Data);
    axios
      .put(update_createJob_url, update_createJob_Data)
      .then(response => {
        console.log('API Response updateCreateJob..:', response?.data);
        if (response?.data?.success === true) {
          // alert(response?.data?.message);
          props.navigation.navigate('CreateJobSecondScreen', {
            JobId: JobId,
            editMode: editMode,
          });
          // setIsLoading(false);
        } else {
          alert(response?.data?.message);
          // setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed updateCreateJob', error);
        // setIsLoading(false);
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <SafeAreaView style={CreateJobTermsStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={editMode ? 'Edit job' : 'Create new job request'}
      />
      <View style={{marginVertical: 10}}>
        <StepIndicator
          customSignUpStepStyle={firstIndicatorSignUpStepStyle}
          currentPosition={1}
          renderStepIndicator={renderStepIndicator}
          labels={stepLabels}
          stepCount={4}
          renderLabel={renderLabel}
        />
      </View>
      <ScrollView>
        <View style={CreateJobTermsStyle.container}>
          <Text style={CreateJobTermsStyle.terms_Text}>{'Terms'}</Text>
          <Text style={[LABEL_STYLES.commontext, CreateJobTermsStyle.heading]}>
            {'What date and time would you prefer?'}
            <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
          </Text>
          <View style={CreateJobTermsStyle.datePickerView}>
            <CalendarModal
              SelectDate={selectedDate ? selectedDate : 'Select date'}
              _textInputStyle={{
                color: selectedDate
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_GrayColor,
              }}
              calenderStyle={{
                borderColor: selectedDateError
                  ? _COLORS?.Kodie_redColor
                  : _COLORS?.Kodie_GrayColor,
              }}
              calenderIcon={toggleModal}
              onDayPress={day => {
                handleRequestDate(day.dateString);
              }}
              onChangeText={() => handleRequestDate(selectedDate)}
              Visible={isModalVisible}
              onRequestClose={toggleModal}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: _COLORS.Kodie_lightGreenColor,
                  selectedTextColor: _COLORS.Kodie_BlackColor,
                },
              }}
              current={selectedDate || moment().format('YYYY-MM-DD')}
              _closeButton={toggleModal}
              _ApplyButton={apply_toggleModal}
            />

            <View style={CreateJobTermsStyle.spaceView} />

            <TimePicker
              selectedTime={
                currentTime && currentTime != ''
                  ? String(currentTime)
                  : 'Select time'
              }
              _TextTimeColor={
                currentTime ? _COLORS.Kodie_BlackColor : _COLORS.Kodie_GrayColor
              }
              timerConStyle={{
                borderColor: currentTimeError
                  ? _COLORS?.Kodie_redColor
                  : _COLORS?.Kodie_GrayColor,
              }}
              data={new Date()}
              getData={date => {
                const formattedTime = moment(date).format('hh:mm A');
                setCurrentTime(formattedTime);
                handleSelectTime(formattedTime);
              }}
            />
          </View>
          {selectedDateError ? (
            <Text style={CreateJobTermsStyle.error_text}>
              {selectedDateError}
            </Text>
          ) : null}
          {currentTimeError ? (
            <Text style={CreateJobTermsStyle.error_text}>
              {currentTimeError}
            </Text>
          ) : null}
          {hasContractorRole ? (
            <>
              <Text
                style={[LABEL_STYLES.commontext, CreateJobTermsStyle.heading]}>
                {'How many hours do you need?'}
              </Text>
              <Dropdown
                style={CreateJobTermsStyle.dropdown}
                placeholderStyle={CreateJobTermsStyle.placeholderStyle}
                selectedTextStyle={CreateJobTermsStyle.selectedTextStyle}
                inputSearchStyle={CreateJobTermsStyle.inputSearchStyle}
                iconStyle={CreateJobTermsStyle.iconStyle}
                data={hourlyNeedData}
                search
                maxHeight={300}
                labelField="lookup_description"
                valueField="lookup_key"
                placeholder="Select number"
                searchPlaceholder="Search..."
                value={hourlyNeedValue}
                onChange={item => {
                  setHourlyNeedValue(item?.lookup_key);
                  // alert(item.lookup_key);
                }}
                renderItem={NeedHour_render}
              />
            </>
          ) : null}

          <Text style={[LABEL_STYLES.commontext, CreateJobTermsStyle.heading]}>
            {'How often do you need this service?'}
          </Text>
          <Dropdown
            style={CreateJobTermsStyle.dropdown}
            placeholderStyle={CreateJobTermsStyle.placeholderStyle}
            selectedTextStyle={CreateJobTermsStyle.selectedTextStyle}
            inputSearchStyle={CreateJobTermsStyle.inputSearchStyle}
            iconStyle={CreateJobTermsStyle.iconStyle}
            data={needServicesData}
            search
            maxHeight={300}
            labelField="lookup_description"
            valueField="lookup_key"
            placeholder="Select frequency"
            searchPlaceholder="Search..."
            value={needServicesValue}
            onChange={item => {
              setneedServicesValue(item?.lookup_key);
              // alert(item.lookup_key)
            }}
            renderItem={NeedService_render}
          />
          <Text style={[LABEL_STYLES.commontext, CreateJobTermsStyle.heading]}>
            {'What is your budget for this job?'}
          </Text>
          <RangeSlider
            from={1}
            to={2000}
            onPriceRangeChange={handlePriceRangeChange}
            onHighRange={handlemaxRange}
            onLowRange={handleminRange}
            onLowrange={2}
          />
          {
            hasContractorRole ? null :
          
          <View style={CreateJobTermsStyle.resp_View}>
            <Text style={LABEL_STYLES.commontext}>
              {'Who is responsible for paying for this?'}
            </Text>
            <Text style={CreateJobTermsStyle.sub_des_Text}>
              {
                'Authorisation will be required by the party responsible for payment.'
              }
            </Text>

            <RowButtons
              LeftButtonText={
                selectedResponsibleData[0]?.lookup_description || 'Tenant'
              }
              leftButtonbackgroundColor={
                !selectedButtonResponsible
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selectedButtonResponsible
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selectedButtonResponsible
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelectedButtonResponsible(false);
                setSelectedButtonResponsibleId(259);
              }}
              RightButtonText={
                selectedResponsibleData[1]?.lookup_description || 'Landlord'
              }
              RightButtonbackgroundColor={
                selectedButtonResponsible
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selectedButtonResponsible
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selectedButtonResponsible
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressRightButton={() => {
                setSelectedButtonResponsible(true);
                setSelectedButtonResponsibleId(260);
              }}
            />
          </View>
}
          {/* <Text style={[LABEL_STYLES.commontext, CreateJobTermsStyle.heading]}>
            {"Booking insurance?"}
          </Text>
          <RowButtons
            LeftButtonText={
              bookingInsuranceData[0]?.lookup_description || "Yes ($1.50)"
            }
            leftButtonbackgroundColor={
              !selectedButtonBookingInsurance
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            LeftButtonTextColor={
              !selectedButtonBookingInsurance
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            LeftButtonborderColor={
              !selectedButtonBookingInsurance
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_LightWhiteColor
            }
            onPressLeftButton={() => {
              setSelectedButtonBookingInsurance(false);
              setSelectedButtoBookingInsuranceId(262);
              // alert(bookingInsuranceData[0]?.lookup_key);
            }}
            RightButtonText={
              bookingInsuranceData[1]?.lookup_description || "No"
            }
            RightButtonbackgroundColor={
              selectedButtonBookingInsurance
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            RightButtonTextColor={
              selectedButtonBookingInsurance
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            RightButtonborderColor={
              selectedButtonBookingInsurance
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_LightWhiteColor
            }
            onPressRightButton={() => {
              setSelectedButtonBookingInsurance(true);
              setSelectedButtoBookingInsuranceId(263);
              // alert(bookingInsuranceData[1]?.lookup_key);
            }}
          /> */}
          <View style={CreateJobTermsStyle.nextBtn_view}>
            <CustomSingleButton
              _ButtonText={'Next'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              disabled={isLoading}
              onPress={() => {
                JobId ? handleValidatiomtionCreateJob() : null;
              }}
            />
          </View>
          <TouchableOpacity
            style={CreateJobTermsStyle.goBack_View}
            onPress={() => {
              props.navigation.pop();
            }}>
            <View style={CreateJobTermsStyle.backIcon}>
              <Ionicons
                name="chevron-back"
                size={22}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </View>
            <Text style={CreateJobTermsStyle.goBack_Text}>{'Go back'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
