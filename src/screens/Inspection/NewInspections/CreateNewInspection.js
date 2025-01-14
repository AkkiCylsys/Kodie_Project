//ScreenNo:88
//ScreenNo:89
//ScreenNo:90
//ScreenNo:92
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from 'react-native';
import TopHeader from '../../../components/Molecules/Header/Header';
import { Dropdown } from 'react-native-element-dropdown';
import { CreateNewInspectionStyle } from './CreateNewInspectionCss';
import CalendarModal from '../../../components/Molecules/CalenderModal/CalenderModal';
import TimePicker from '../../../components/Molecules/ClockPicker/TimePicker';
import { LABEL_STYLES, _COLORS, FONTFAMILY } from '../../../Themes';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import { _goBack } from '../../../services/CommonServices';
import { Config } from '../../../Config';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { CommonLoader } from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import debounce from 'lodash/debounce';
import RBSheet from 'react-native-raw-bottom-sheet';
import GuestSelectionContent from '../../../components/GuestSelectionContent/GuestSelectionContent';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AddCustomArea, GetInspectionAreaDetail } from '../../../services/InspectionModuleServices.js/InspectionServices';
import { log } from 'react-native-reanimated';
import axiosInstance from '../../../services/axiosInstance';
import { MapOverlay } from 'react-native-maps';

const CreateNewInspection = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const isVisible = useNavigation();
  const [inspectionType, setInspectionType] = useState([]);
  const [Inspection_value, setInspection_value] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [Notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddressData, setSelectedAddreeData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [selectedAddressDetail, setSelectedAddressDetail] = useState([]);
  const [AreaKey, setAreaKey] = useState([]);
  const [selectedButtonFurnished, setSelectedButtonFurnished] = useState(false);
  const [selectedButtonFurnishedId, setSelectedButtonFurnishedId] =
    useState(67);
  const [checkedItems, setCheckedItems] = useState({});
  const [TIM_key, setTIM_key] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [tempSelectedValues, setTempSelectedValues] = useState([]);
  const [showError, setShowError] = useState(false);
  const [showcustomAreaNameError, setShowcustomAreaNameError] = useState('');
  const [selectedDateError, setSelectedDateError] = useState(false);
  const [errorInspection, setErrorInspection] = useState(false);
  const [errorSimiarArea, setErrorSimiarArea] = useState(false);
  const [Inspection_Detail, setInspection_Details] = useState([]);
  const [displaySelectedValues, setDisplaySelectedValues] = useState('');
  const [selectedButtonStandard, setSelectedButtonStandard] = useState(false);
  const [selectedButtonStandardId, setSelectedButtonStandardId] = useState(1);
  const [selectedButtonFutue, setSelectedButtonFutue] = useState(false);
  const [selectedButtonFutueId, setSelectedButtonFutueId] = useState(1);
  const [validationMessage, setValidationMessage] = useState('');

  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const [customAreaName, setCustomAreaName] = useState('');
  const [currentTimeError, setCurrentTimeError] = useState('');
  const [customeAreavalue, setCustomeAreaValue] = useState([]);
  const TIM_KEY = props?.route?.params?.TIM_KEY;
  const InspectionView = props?.route?.params?.InspectionView;
  const Ins_editMode = props?.route?.params?.Ins_editMode;
  console.log(InspectionView, Ins_editMode, TIM_KEY);
  const Area_key = async (shouldSetNegativeKey = false) => {
    setIsLoading(true);
    const AreaData = {
      p_TIM_KEY: shouldSetNegativeKey ? -1 : 0,
      p_TAM_CREATED_BY: loginData?.Login_details?.user_account_id,
    };
    const response = await GetInspectionAreaDetail(AreaData);
    setAreaKey(response);
    console.log('setAreaKey:', response);
    setIsLoading(false)
  };
  const handleAddCustomArea = async () => {
    refRBSheet1.current.close();
    const data = {
      custom_area_name: customAreaName,
      is_standard_check_inspection: selectedButtonStandardId,
      area_similar: selectedButtonStandardId == 0 ? 0 :customeAreavalue,
      area_future_inspection: selectedButtonFutueId,
      property_id: 0,
      inspection_id: 0,
      created_by: loginData?.Login_details?.user_account_id.toString(),
    };
    console.log('data', data);
    const response = await AddCustomArea(data);
  Alert.alert('Success',response?.message)
    console.log('handleAddCustomArea',response?.message);
    Area_key(true); // Refresh the area list
    setSelectedButtonStandardId(1);
        setSelectedButtonFutueId(1);
    setCustomeAreaValue([]);
    setCustomAreaName('')
  };
  const handleCustomName = text => {
    setCustomAreaName(text);
    if (text.trim() === '') {
      setShowcustomAreaNameError('Custom area name cannot be empty!');
    } else {
      setShowcustomAreaNameError('');
    }
  };
  const SubmitCustomArea =()=>{
  if (customAreaName.trim() === '') {
      // Alert.alert('Validation', 'Custom area name cannot be empty.');
      setShowcustomAreaNameError('Custom area name cannot be empty!')
    }else if (selectedButtonStandardId !== 0 && customeAreavalue ==''){
      setErrorSimiarArea(true);
    }else{
      handleAddCustomArea();
    }
  }
  const Detail_render = ({ item }) => {
    const isChecked = checkedItems[item?.TAM_AREA_KEY];
    return (
      <TouchableOpacity style={CreateNewInspectionStyle.DetailsView} onPress={() => toggleCheckBox(item.TAM_AREA_KEY)}>
        <TouchableOpacity onPress={() => toggleCheckBox(item.TAM_AREA_KEY)}>
          <MaterialIcons
            name={isChecked ? 'check-box' : 'check-box-outline-blank'}
            size={25}
            color={
              isChecked
                ? _COLORS?.Kodie_GreenColor
                : _COLORS.Kodie_MediumGrayColor
            }
          />
        </TouchableOpacity>
        <Text style={CreateNewInspectionStyle.details_text}>
          {item.TAM_AREA_NAME}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const getInspectionDetails = async () => {
    setIsLoading(true);
    const url = Config.BASE_URL;
    const apiUrl = `get_inspection_details/${TIM_KEY}`;
  
    try {
      const response = await axiosInstance.get(apiUrl);
      const data = response?.data?.data[0];
  
      setInspection_Details(data);
      setInspection_value(data?.v_TIM_INSPECTION_TYPE);
      setSelectedDate(moment(data?.v_TIM_SCHEDULE_DATE).format('YYYY-MM-DD'));
      setCurrentTime(data?.v_TIM_SCHEDULE_TIME);
  
      // Initialize checkedItems based on cur_TAM_AREA_KEY
      const areaKeys = data?.cur_TAM_AREA_KEY ? data.cur_TAM_AREA_KEY.split(',') : [];
      const initialCheckedItems = {};
      areaKeys.forEach(key => {
        initialCheckedItems[key] = true; // Set true for checked areas
      });
      setCheckedItems(initialCheckedItems); // Set checked items based on API response
  
      console.log(areaKeys, 'cur_TAM_AREA_KEY');
  
      setSelectedAddress({
        latitude: data?.v_TIM_LOCATION_LATITUDE,
        longitude: data?.v_TIM_LOCATION_LONGITUDE,
        location: data?.v_TIM_LOCATION,
        property_id: data?.v_UPD_KEY,
        user_Id: data?.v_CREATED_BY,
      });
      setSelectedAddressDetail(data?.v_UPD_KEY);
      setDisplaySelectedValues(data?.v_TIM_ADD_ATTENDENCE);
      setNotes(data?.v_TIM_DESCRIPTION);
      setSelectedButtonFurnishedId(data?.v_TIM_IS_FURNISHED);
    } catch (error) {
      console.error('API Error PersonalDetails CIP:', error);
    } finally {
      setIsLoading(false); // Ensure loading state is reset in case of error
    }
  };
  
  const toggleCheckBox = itemId => {
    console.log(itemId, 'itemIditemId');
    
    setCheckedItems(prevCheckedItems => {
      const newCheckedItems = {
        ...prevCheckedItems,
        [itemId]: !prevCheckedItems[itemId], // Toggle the checked state
      };
      
      console.log(newCheckedItems, 'newCheckedItems'); // Log to track changes
      return newCheckedItems; // Return the updated checked items
    });
    
    setValidationMessage(''); // Clear any previous validation message
  };
  
  const getCheckedItemIds = () => {
    // Filter checked items to get an array of checked IDs
    return Object.keys(checkedItems).filter(
      itemId => checkedItems[itemId] && itemId !== '0' && itemId !== ''
    );
  };
  
  const checkedItemIds = getCheckedItemIds();
  console.log(checkedItemIds, 'checkedItemIds');
  const handlePress = () => {
    refRBSheet.current.open();
  };
  const handleRemove = () => {
    setDisplaySelectedValues('');
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    setSelectedDateError(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (isVisible) {
        fetchData();
      }

      // Optional cleanup function
      return () => {
        // Any cleanup code if necessary
      };
    }, [isVisible])
  );

  const fetchData = async () => {
    await getInspectionDetails();
    await handleInspection_Type();
    await Selected_Address_Type();
    await Area_key();
  };
  const Selected_Address_Type = async () => {
    const Selected_Address = {
      account_id: loginData?.Login_details?.user_account_id,
    };
    const url = Config.BASE_URL;
    const Selected_AddressType = 'get_property_details_my_acc_id';
    console.log('Request URL:', Selected_AddressType);
    setIsLoading(true);
    await axiosInstance
      .post(Selected_AddressType, Selected_Address)
      .then(response => {
        console.log('Selected_Address', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);
          console.log('Selected_Address....', response?.data?.property_details);
          setSelectedAddreeData(response?.data?.property_details);
        } else {
          console.error('Selected_Address_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Selected_Address error:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const selectedValuesString = selectedValues
      .map(user => `${user.UAD_FIRST_NAME} ${user.UAD_LAST_NAME}`)
      .join(', ');
    setDisplaySelectedValues(selectedValuesString);
  }, [selectedValues]);
  const handleInspection_Type = async () => {
    const InspectionData = {
      P_PARENT_CODE: 'INSPECTION_TYPE',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const Inspectiontype = url + 'lookup_details';
    console.log('Request URL:', Inspectiontype);
    setIsLoading(true);

    try {
      const response = await axios.post(Inspectiontype, InspectionData);
      console.log('Inspection_type', response?.data);

      if (response?.data?.status === true) {
        setIsLoading(false);
        console.log('InspectionData....', response?.data?.lookup_details);
        setInspectionType(response?.data?.lookup_details);
      } else {
        console.error('Inspection_type_error:', response?.data?.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Inspection_type error:', error);
      setIsLoading(false);
    }
  };
  const InspectionType_render = item => {
    return (
      <View
        style={[
          CreateNewInspectionStyle.itemView,
          {
            backgroundColor:
              item?.lookup_key === Inspection_value
                ? _COLORS.Kodie_MidLightGreenColor
                : null,
          },
        ]}>
        {item?.lookup_key === Inspection_value ? (
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
        <Text style={CreateNewInspectionStyle.textItem}>
          {item?.lookup_description}
        </Text>
      </View>
    );
  };
  const Customarea_render = item => {
    return (
      <View
        style={[
          CreateNewInspectionStyle.itemView,
          {
            backgroundColor:
              item?.TAM_AREA_KEY === customeAreavalue
                ? _COLORS.Kodie_MidLightGreenColor
                : null,
          },
        ]}>
        {item?.TAM_AREA_KEY === customeAreavalue ? (
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
        <Text style={CreateNewInspectionStyle.textItem}>
          {item?.TAM_AREA_NAME}
        </Text>
      </View>
    );
  };
  const Selected_Time_render = item => {
    const isSelected = selectedAddress?.property_id === item.property_id;
    return (
      <View contentContainerStyle={{ flex: 1, height: '100%' }}>
        <View
          style={[
            CreateNewInspectionStyle.itemView,
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
          <Text style={CreateNewInspectionStyle.textItem}>{item.location}</Text>
        </View>
      </View>
    );
  };
  const SubmitInspection = async () => {
    setIsLoading(true);
    try {
      const Inspectiondata = {
        UPD_KEY: selectedAddressDetail,
        TIM_INSPECTION_TYPE: Inspection_value,
        TIM_SCHEDULE_TIME: currentTime,
        TIM_SCHEDULE_DATE: selectedDate,
        TIM_LOCATION: selectedAddress.location,
        TIM_LOCATION_LONGITUDE: parseFloat(selectedAddress.longitude),
        TIM_LOCATION_LATITUDE: parseFloat(selectedAddress.latitude),
        TIM_ADD_ATTENDENCE: displaySelectedValues,
        TIM_IS_FURNISHED: selectedButtonFurnishedId,
        TIM_DESCRIPTION: Notes,
        TAM_AREA_KEYS: checkedItemIds.toString(),
        CREATED_BY: loginData?.Login_details?.user_account_id.toString(),
      };
      console.log('inspec', Inspectiondata);
      const Url = Config.BASE_URL;
      const Inspection_Url ='inspection_details/save';
      console.log('Inspection_Url', Inspection_Url);
      const res = await axiosInstance.post(Inspection_Url, Inspectiondata);
      console.log('scheduule inspection....', res?.data);
      if (res?.data?.success == true) {
        setTIM_key(res?.data?.data);
        console.log('TIM_KEY', res?.data?.data);
        alert(res?.data?.message);
        props?.navigation?.navigate('PropertyInspection', {
          TIM_KEY: res?.data?.data?.TIM_KEY,
          PropertyId: selectedAddress?.property_id,
          account_id: selectedAddress?.user_Id,
        });
        setIsLoading(false);
        setInspection_value();
        setCurrentTime('');
        setSelectedDate('');
        setSelectedAddressDetail('');
        setTempSelectedValues([]);
        setSelectedValues([]);
        setSelectedButtonFurnishedId();
        setSelectedButtonFurnished([]);
        setNotes('');
        setCheckedItems({});
      }
    } catch (error) {
      if (error?.response && error?.response?.status === 404) {
        alert(error?.response?.data?.message);
        setIsLoading(false);
      } else {
        alert(error?.response?.data?.message);
        setIsLoading(false);
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const UpdateInspection = async () => {
    setIsLoading(true);
    try {
      const Inspectiondata = {
        TIM_KEY: TIM_KEY,
        UPD_KEY: selectedAddressDetail,
        TIM_INSPECTION_TYPE: Inspection_value,
        TIM_SCHEDULE_TIME: currentTime,
        TIM_SCHEDULE_DATE: selectedDate,
        TIM_LOCATION: selectedAddress.location,
        TIM_LOCATION_LONGITUDE: parseFloat(selectedAddress.longitude),
        TIM_LOCATION_LATITUDE: parseFloat(selectedAddress.latitude),
        TIM_ADD_ATTENDENCE: displaySelectedValues== null ? '': displaySelectedValues,
        TIM_IS_FURNISHED: selectedButtonFurnishedId  ,
        TIM_DESCRIPTION: Notes== null ? '':Notes,
        TAM_AREA_KEYS: checkedItemIds.toString(),
        CREATED_BY: loginData?.Login_details?.user_account_id.toString(),
      };
      console.log('inspecsdupdate', Inspectiondata);
      const Url = Config.BASE_URL;
      const Inspection_Url ='inspection_details/update';
      console.log('Inspection_Url', Inspection_Url);
      const res = await axiosInstance.put(Inspection_Url, Inspectiondata);
      console.log(res?.data);
      if (res?.data?.success == true) {
        setTIM_key(res?.data?.data);
        alert(res?.data?.message);
        props?.navigation?.navigate('PropertyInspection', {
          TIM_KEY: TIM_KEY,
          PropertyId: selectedAddress?.property_id,
          account_id: selectedAddress?.user_Id,
        });
        setIsLoading(false);
        setInspection_value();
        setCurrentTime('');
        setSelectedDate('');
        setSelectedAddressDetail([]);
        setTempSelectedValues([]);
        setSelectedValues([]);
        setSelectedButtonFurnishedId();
        setSelectedButtonFurnished([]);
        setNotes('');
        setCheckedItems({});
      }
    } catch (error) {
      if (error?.response && error?.response?.status === 404) {
        alert(error?.response?.data?.message);
        setIsLoading(false);
      } else {
        alert(error?.response?.data?.message);
        setIsLoading(false);
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = () => {
    if (Inspection_value == '') {
      setErrorInspection(true);
    } else if (selectedDate === '') {
      setSelectedDateError(true);
    }  else if (currentTime == '') {
      setCurrentTimeError('Select time is required!');
    } else if (selectedAddress == '') {
      setShowError(true);
    }else if (checkedItemIds.length === 0) {
      setValidationMessage('Please select at least one area!');
      
    } else {
      InspectionView
        ? UpdateInspection()
        : Ins_editMode
          ? UpdateInspection()
          : SubmitInspection();
    }
  };
  const fetchResults = async searchQuery => {
    setIsLoading(true);
    try {
      const Url = Config.BASE_URL;
      const search_Url ='add_attendees/search';
      console.log('Inspection_Url', search_Url);
      const response = await axiosInstance.post(search_Url, {
        search: searchQuery,
      });
      if (response?.data?.success == true) {
        setResults(response?.data?.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };
  const debouncedFetchResults = debounce(searchQuery => {
    if (searchQuery) {
      fetchResults(searchQuery);
    } else {
      setResults([]);
    }
  }, 100); 
  useEffect(() => {
    debouncedFetchResults(query);
    return () => {
      debouncedFetchResults.cancel();
    };
  }, [query]);
  const handleSelect = user => {
    setTempSelectedValues(prevSelectedUsers => {
      const isSelected = prevSelectedUsers.find(
        selectedUser => selectedUser.UAD_KEY === user.UAD_KEY,
      );
      if (isSelected) {
        return prevSelectedUsers.filter(
          selectedUser => selectedUser.UAD_KEY !== user.UAD_KEY,
        );
      } else {
        return [...prevSelectedUsers, user];
      }
    });
  };
  const applySelection = () => {
    setSelectedValues(tempSelectedValues);
    refRBSheet.current.close();
    refRBSheet1.current.close();
  };
  const handleClosePopup = () => {
    refRBSheet.current.close();
    refRBSheet1.current.close();
  };
  const handleSelectTime = text => {
    if (text.trim() === '') {
      setCurrentTimeError('Select time is required!');
    } else {
      setCurrentTimeError('');
    }
  };
  return (
    <SafeAreaView style={CreateNewInspectionStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={
          InspectionView
            ? 'Reschedule Inspections'
            : Ins_editMode
              ? 'Edit Inspections'
              : 'Create new inspections'
        }
      />

      <KeyboardAvoidingView
        // style={CreateNewInspectionStyle.mainConatainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0} // Adjust this value based on your view
  style={{ flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={CreateNewInspectionStyle.Container}>
          <Text style={CreateNewInspectionStyle.HeadingText}>
            {'Tell us about your inspection'}
          </Text>

          <View style={{}}>
            <Text style={LABEL_STYLES.commontext}>
              {'What type of inspection is this?'}
              <Text style={{ color: _COLORS?.Kodie_redColor }}>*</Text>
            </Text>
            <Dropdown
              style={[CreateNewInspectionStyle.dropdown,{
                borderColor:errorInspection? _COLORS.Kodie_redColor : _COLORS?.Kodie_GrayColor
              }]}
              placeholderStyle={[
                CreateNewInspectionStyle.placeholderStyle,
                { color: _COLORS.Kodie_LightGrayColor },
              ]}
              selectedTextStyle={CreateNewInspectionStyle.selectedTextStyle}
              inputSearchStyle={CreateNewInspectionStyle.inputSearchStyle}
              iconStyle={CreateNewInspectionStyle.iconStyle}
              data={inspectionType}
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="Select inspection type"
              value={Inspection_value}
              onChange={item => {
                setInspection_value(item.lookup_key);
                setErrorInspection(false);
              }}
              renderItem={InspectionType_render}
            />
          </View>
          {errorInspection ? (
            <Text style={CreateNewInspectionStyle.errorText}>
              {'Please select a inspection type!'}
            </Text>
          ) : null}
          <Text style={[LABEL_STYLES.commontext, { marginTop: 20 }]}>
            {'Schedule time and date of inspection'}
            <Text style={{ color: _COLORS?.Kodie_redColor }}>*</Text>
          </Text>
          <View style={CreateNewInspectionStyle.datePickerView}>
            <CalendarModal
              current={selectedDate}
              SelectDate={selectedDate ? selectedDate : 'Select Date'}
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
              onDayPress={handleDayPress}
              Visible={isModalVisible}
              onRequestClose={toggleModal}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: _COLORS.Kodie_lightGreenColor,
                  selectedTextColor: _COLORS.Kodie_BlackColor,
                },
              }}
              _closeButton={toggleModal}
              _ApplyButton={toggleModal}
            />

            <View style={CreateNewInspectionStyle.spaceView} />

            <TimePicker
              selectedTime={
                currentTime && currentTime !== ''
                  ? String(currentTime)
                  : 'Select time'
              }
              _TextTimeColor={
                currentTime ? _COLORS.Kodie_BlackColor : _COLORS.Kodie_LightGrayColor
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

          {selectedDateError && (
            <Text style={CreateNewInspectionStyle.errorText}>
              {'Please select a date!'}
            </Text>
          )}
           {currentTimeError ? (
            <Text style={CreateNewInspectionStyle.errorText}>
              {currentTimeError}
            </Text>
          ) : null}

          <View style={{ marginBottom: 12, marginTop: 20 }}>
            <Text style={LABEL_STYLES.commontext}>
              {'Where is the inspection taking place?'}
              <Text style={{ color: _COLORS?.Kodie_redColor }}>*</Text>
            </Text>
            <Dropdown
              style={[CreateNewInspectionStyle.dropdown,{
                borderColor:showError? _COLORS.Kodie_redColor : _COLORS?.Kodie_GrayColor
              }]}
              placeholderStyle={CreateNewInspectionStyle.placeholderStyle}
              selectedTextStyle={CreateNewInspectionStyle.selectedTextStyle}
              inputSearchStyle={CreateNewInspectionStyle.inputSearchStyle}
              iconStyle={CreateNewInspectionStyle.iconStyle}
              data={selectedAddressData}
              search
              maxHeight={300}
              labelField="location"
              valueField="property_id"
              placeholder="Select property"
              searchPlaceholder="Search..."
              value={selectedAddressDetail}
              onChange={item => {
                setSelectedAddressDetail(item?.property_id);
                setSelectedAddress({
                  latitude: item.latitude,
                  longitude: item.longitude,
                  location: item.location,
                  property_id: item?.property_id,
                  propertyType: item?.type_id,
                  property_type_id: item?.property_type_id,
                });
                setShowError(false);
              }}
              renderItem={Selected_Time_render}
            />
          </View>
          <View style={CreateNewInspectionStyle.locationContainer}>
            <Octicons
              name={'location'}
              size={22}
              color={_COLORS.Kodie_ExtraLightGrayColor}
              style={CreateNewInspectionStyle.locationIcon}
            />
            <TextInput
              style={CreateNewInspectionStyle.locationInput}
              value={selectedAddress?.location}
              editable={false}
              placeholder="Enter new location"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            />
          </View>
          {showError ? (
            <Text style={CreateNewInspectionStyle.errorText}>
              {'Please select a property!'}
            </Text>
          ) : null}

          <View style={{ marginTop: 20 }}>
            <Text style={LABEL_STYLES.commontext}>Add attendees</Text>

            <TouchableOpacity
              style={CreateNewInspectionStyle.TextInputView}
              onPress={handlePress}>
              <Text
                style={[
                  CreateNewInspectionStyle.input,
                  {
                    color: displaySelectedValues
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_LightGrayColor,
                  },
                ]}>
                {displaySelectedValues || 'Add people attending the inspection'}
              </Text>

              <Feather
                name={'user-plus'}
                size={22}
                color={_COLORS.Kodie_GrayColor}
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRemove} />
          </View>
          <View style={{ marginTop: 20 }}>
          <Text style={LABEL_STYLES.commontext}>
            {'Is the place furnished or unfurnished?'}
          </Text>
          <View style={CreateNewInspectionStyle.margin}>
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
                  ? _COLORS.Kodie_GreenColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelectedButtonFurnished(false);
                setSelectedButtonFurnishedId(67);
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
                  ? _COLORS.Kodie_GreenColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressRightButton={() => {
                setSelectedButtonFurnished(true);
                setSelectedButtonFurnishedId(68);
                // alert(selectedButtonId)
              }}
            />
          </View>
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={LABEL_STYLES.commontext}>
              {'Select the areas you would like to include:'}
            <Text style={{ color: _COLORS?.Kodie_redColor }}>*</Text>

            </Text>
            <View style={{ marginTop: 10 }}>
              <FlatList
                data={[
                  ...(Array.isArray(AreaKey) ? AreaKey : []),
                  { TAMAREAKEY: 'add_custom_area' },
                ]}
                scrollEnabled
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  if (item.TAMAREAKEY === 'add_custom_area') {
                    return (
                      <View>
                        <TouchableOpacity
                          style={{ marginRight: 35, marginTop: 10 }}
                          onPress={() => {
                            refRBSheet1.current.open();
                            // Alert.alert('Add custom area', 'Coming soon');
                          }}>
                          <Text
                            style={{
                              color: _COLORS.Kodie_GreenColor,
                              fontSize: 14,
                              fontFamily: FONTFAMILY.K_Bold,
                            }}>
                            {'Add custom area...'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }
                  return <Detail_render item={item} />;
                }}
              />
            </View>
            {validationMessage ? (
          <Text style={{ color: 'red', marginTop: 10 }}>{validationMessage}</Text>
        ) : null}
          </View>
          <Text style={LABEL_STYLES.commontext}>{'Notes:'}</Text>
          <TextInput
            style={CreateNewInspectionStyle.NotesInput}
            value={Notes}
            onChangeText={setNotes}
            placeholder="Enter any notes about this item"
            placeholderTextColor={_COLORS?.Kodie_LightGrayColor}
            multiline
            numberOfLines={5}
            textAlignVertical={'top'}
          />
          <CustomSingleButton
            _ButtonText={
              InspectionView
                ? 'Reschedule Inspection'
                : Ins_editMode
                  ? 'Edit Inspections'
                  : 'Schedule inspection'
            }
            Text_Color={_COLORS.Kodie_WhiteColor}
            backgroundColor={_COLORS.Kodie_BlackColor}
            disabled={isLoading ? true : false}
            onPress={handleSubmit}
            // marginBottom={Platform.OS === 'ios' ? 0 : '35%'}
          />
        </ScrollView>
      </KeyboardAvoidingView>
     
      <RBSheet
        ref={refRBSheet1}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={550}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: CreateNewInspectionStyle.bottomModal_container,
        }}>
        <ScrollView style={CreateNewInspectionStyle.Container}>
          <View style={CreateNewInspectionStyle.ModalContainer}>
            <Text style={CreateNewInspectionStyle.ShareText}>
              {'Add custom area'}
            </Text>
            <TouchableOpacity onPress={handleClosePopup}>
              <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
            </TouchableOpacity>
          </View>
          <View style={CreateNewInspectionStyle.inputContainer}>
            <Text
              style={[
                LABEL_STYLES._texinputLabel,
                CreateNewInspectionStyle.cardHeight,
              ]}>
              {'Name of area:'}
              <Text style={{ color: _COLORS?.Kodie_redColor }}>*</Text>
            </Text>
            <TextInput
              style={[CreateNewInspectionStyle.emailinput, {
                borderColor:showcustomAreaNameError? _COLORS.Kodie_redColor : _COLORS?.Kodie_GrayColor
              }]}
              value={customAreaName}
              onChangeText={handleCustomName}
              placeholder="Create a name for your custom area"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              keyboardType="email-address"
              onBlur={()=>{
                handleCustomName(customAreaName)
              }}
            />
              {showcustomAreaNameError ? (
            <Text style={CreateNewInspectionStyle.errorText}>
              {showcustomAreaNameError}
            </Text>
          ) : null}
          </View>
        
          <Text style={CreateNewInspectionStyle.cancelText}>
            {'Would you like to use a standard inspection checklist?'}
          </Text>
          <View style={{ marginBottom: 15 ,marginTop:5}}>
            <RowButtons
              LeftButtonText={'Yes'}
              leftButtonbackgroundColor={
                !selectedButtonStandard
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selectedButtonStandard
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selectedButtonStandard
                  ? _COLORS.Kodie_GreenColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelectedButtonStandard(false);
                setSelectedButtonStandardId(1);
              }}
              RightButtonText={'No'}
              onPressRightButton={() => {
                setSelectedButtonStandard(true);
                setSelectedButtonStandardId(0);
              }}
              RightButtonbackgroundColor={
                selectedButtonStandard
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selectedButtonStandard
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selectedButtonStandard
                  ? _COLORS.Kodie_GreenColor
                  : _COLORS.Kodie_LightWhiteColor
              }
            />
          </View>
          {selectedButtonStandardId == 0 ? null :(
 <View style={{ marginBottom: 15,marginTop:5 }}>
 <Text style={CreateNewInspectionStyle.cancelText}>
   {' Select the area most similar to your custom area:'}
   <Text style={{ color: _COLORS?.Kodie_redColor }}>*</Text>
 </Text>
 <Dropdown
   style={[CreateNewInspectionStyle.dropdown,
     {
       borderColor:errorSimiarArea? _COLORS.Kodie_redColor : _COLORS?.Kodie_GrayColor
     }
   ]}
   placeholderStyle={CreateNewInspectionStyle.placeholderStyle}
   selectedTextStyle={CreateNewInspectionStyle.selectedTextStyle}
   inputSearchStyle={CreateNewInspectionStyle.inputSearchStyle}
   iconStyle={CreateNewInspectionStyle.iconStyle}
   data={AreaKey}
   search
   maxHeight={300}
   labelField="TAM_AREA_NAME"
   valueField="TAM_AREA_KEY"
   placeholder="Please select custom area"
   searchPlaceholder="Search ..."
   value={customeAreavalue}
   onChange={item => {
     setCustomeAreaValue(item.TAM_AREA_KEY);
     setErrorSimiarArea(false)
   }}
   renderItem={Customarea_render}
 />
{errorSimiarArea ? (
 <Text style={CreateNewInspectionStyle.errorText}>
   {'Please select a most similar to your custom area!'}
 </Text>
) : null}
</View>
          )}
         
          <Text style={[CreateNewInspectionStyle.cancelText,{marginBottom:8}]}>
            {'Make this a standard area for future inspections?'}
          </Text>
          <RowButtons
            LeftButtonText={'Yes'}
            onPressLeftButton={() => {
              setSelectedButtonFutue(false);
              setSelectedButtonFutueId(1);
            }}
            leftButtonbackgroundColor={
              !selectedButtonFutue
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            LeftButtonTextColor={
              !selectedButtonFutue
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            LeftButtonborderColor={
              !selectedButtonFutue
                ? _COLORS.Kodie_GreenColor
                : _COLORS.Kodie_LightWhiteColor
            }
            RightButtonText={'No'}
            onPressRightButton={() => {
              setSelectedButtonFutue(true);
              setSelectedButtonFutueId(0);
            }}
            RightButtonbackgroundColor={
              selectedButtonFutue
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            RightButtonTextColor={
              selectedButtonFutue
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            RightButtonborderColor={
              selectedButtonFutue
                ? _COLORS.Kodie_GreenColor
                : _COLORS.Kodie_LightWhiteColor
            }
          />
        
        </ScrollView>
        <View style={CreateNewInspectionStyle.ButtonView}>
            <TouchableOpacity
              style={CreateNewInspectionStyle.cancelView}
              onPress={handleClosePopup}>
              <Text style={[CreateNewInspectionStyle.cancelText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={CreateNewInspectionStyle.SaveView}
              onPress={SubmitCustomArea}
              disabled={isLoading}>
              <Text style={CreateNewInspectionStyle.DoneText}>Done</Text>
            </TouchableOpacity>
          </View>
      </RBSheet>

      <RBSheet
        ref={refRBSheet}
        height={500}
        openDuration={250}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: CreateNewInspectionStyle.bottomModal_container,
        }}>
          
        <GuestSelectionContent
          query={query}
          setQuery={setQuery}
          results={results}
          handleSelect={handleSelect}
          tempSelectedValues={tempSelectedValues}
          selectedValues={selectedValues}
          refRBSheet={refRBSheet}
          applySelection={applySelection}
          handleClosePopup={handleClosePopup}
          mainStyle={{marginVertical:25}}
        />
    
        {isLoading ? <CommonLoader /> : null}
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
export default CreateNewInspection;
