//ScreenNo:88
//ScreenNo:89
//ScreenNo:90
//ScreenNo:92
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  Button,
  Alert
} from 'react-native';
import TopHeader from '../../../components/Molecules/Header/Header';
import {Dropdown} from 'react-native-element-dropdown';
// import {CreateNewInspectionStyle} from './CreateNewCreateNewInspectionStyle';
import {CreateNewInspectionStyle} from './CreateNewInspectionCss';
import CalendarModal from '../../../components/Molecules/CalenderModal/CalenderModal';
import TimePicker from '../../../components/Molecules/ClockPicker/TimePicker';
import {LABEL_STYLES, _COLORS, IMAGES, FONTFAMILY} from '../../../Themes';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import {_goBack} from '../../../services/CommonServices';
import CustomDropdown from '../../../components/Molecules/CustomDropdown/CustomDropdown';
import {Config} from '../../../Config';
import axios from 'axios';
import moment from 'moment';
import {useSelector} from 'react-redux';
import SearchPlaces from '../../../components/Molecules/SearchPlaces/SearchPlaces';
import MapScreen from '../../../components/Molecules/GoogleMap/googleMap';
import Geocoder from 'react-native-geocoding';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import debounce from 'lodash/debounce';
import RBSheet from 'react-native-raw-bottom-sheet';
import GuestSelectionContent from '../../../components/GuestSelectionContent/GuestSelectionContent';
import {useNavigation} from '@react-navigation/native';
import {clockRunning} from 'react-native-reanimated';

const CreateNewInspection = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  // console.log('loginResponse.....', loginData);
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
  const [selectedDateError, setSelectedDateError] = useState(false);
  const [errorInspection, setErrorInspection] = useState(false);
  const [Inspection_Detail, setInspection_Details] = useState([]);
  const [displaySelectedValues, setDisplaySelectedValues] = useState('');
  const [selectedButtonStandard, setSelectedButtonStandard] = useState(false);
  const [selectedButtonStandardId, setSelectedButtonStandardId] = useState(1);
  const [selectedButtonFutue, setSelectedButtonFutue] = useState(false);
  const [selectedButtonFutueId, setSelectedButtonFutueId] = useState(1);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const [email, setEmail] = useState('');
  const [customeAreavalue, setCustomeAreaValue] = useState([]);
  const [getCustomeArea, setGetCustomeArea] = useState([]);
  const TIM_KEY = props?.route?.params?.TIM_KEY;
  const InspectionView = props?.route?.params?.InspectionView;
  const Ins_editMode = props?.route?.params?.Ins_editMode;
  console.log(InspectionView, Ins_editMode, TIM_KEY);
  const Area_key = async () => {
    const url = Config.BASE_URL;
    const AreaGetUrl = url + 'get_inspection_area';
    console.log('Request URL:', AreaGetUrl);
    setIsLoading(true);
    await axios
      .get(AreaGetUrl)
      .then(response => {
        console.log('area response', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);
          console.log('area response....', response?.data?.data);
          setAreaKey(response?.data?.data[0]);
          console.log('setAreaKey..', AreaKey);
        } else {
          console.error('area response_error:', response?.data?.error);
          // alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('area response error:', error);
        // alert(error);
        setIsLoading(false);
      });
  };
  const toggleCheckBox = itemId => {
    console.log(itemId, 'itemIditemId');
    setCheckedItems(prevCheckedItems => {
      const newCheckedItems = {
        ...prevCheckedItems,
        [itemId]: !prevCheckedItems[itemId],
      };
      console.log(newCheckedItems, 'newCheckedItems');
      return newCheckedItems;
    });
  };


  const handleDone = async () => {
    // alert(value);
    setIsLoading(true);
    const url = Config.BASE_URL;
    const AreaPostUrl = url + `inspection_details/CustomArea`;

    try {
      const response = await axios.post(AreaPostUrl, {
        custom_area_name: email,
        is_standard_check_inspection: selectedButtonStandardId,
        area_similar: customeAreavalue,
        area_future_inspection: selectedButtonFutueId,
        property_id: PropertyId,
        inspection_id: TIM_KEY,
        created_by: 543,
      });
      console.log(response);
      if (response?.data?.success) {
        Alert.alert('Success', 'Custom area added successfully');
        refRBSheet1.current.close();
        setEmail('');
        setSelectedButtonStandardId('');
        setSelectedButtonFutueId('');
        setCustomeAreaValue('');
        await getInspectionAreas();
      } else {
        Alert.alert('Error', 'Failed to add custom area');
        console.error('Error:', response?.data?.error || 'Unknown error');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add custom area');
      console.error('Error:', error.response || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const getCheckedItemIds = () => {
    return Object.keys(checkedItems)
      .filter(itemId => checkedItems[itemId] && itemId !== '0' && itemId !== '')
      .join(',');
  };

  const checkedItemIds = getCheckedItemIds();
  console.log(checkedItemIds, 'checkedItemIds');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    setSelectedDateError(false);
  };
  const getInspectionDetails = async () => {
    // alert(TIM_KEY)
    setIsLoading(true);
    const url = Config.BASE_URL;

    const apiUrl = url + `get_inspection_details/${TIM_KEY}`;

    await axios
      .get(apiUrl)
      .then(response => {
        console.log(
          'API Response:get_inspection_details',
          response?.data?.data[0],
        );
        setInspection_Details(response?.data?.data[0]);
        setInspection_value(response?.data?.data[0]?.v_TIM_INSPECTION_TYPE);
        setSelectedDate(
          moment(response?.data?.data[0]?.v_TIM_SCHEDULE_DATE).format(
            'YYYY-MM-DD',
          ),
        );
        setCurrentTime(response?.data?.data[0]?.v_TIM_SCHEDULE_TIME);
        setCheckedItems(response?.data?.data[0]?.cur_TAM_AREA_KEY);
        console.log(
          response?.data?.data[0]?.cur_TAM_AREA_KEY,
          'cur_TAM_AREA_KEY',
        );
        setSelectedAddress({
          latitude: response?.data?.data[0]?.v_TIM_LOCATION_LATITUDE,
          longitude: response?.data?.data[0]?.v_TIM_LOCATION_LONGITUDE,
          location: response?.data?.data[0]?.v_TIM_LOCATION,
          property_id: response?.data?.data[0]?.v_UPD_KEY,
          user_Id: response?.data?.data[0]?.v_CREATED_BY,
        });
        setSelectedAddressDetail(response?.data?.data[0]?.v_UPD_KEY);
        setDisplaySelectedValues(response?.data?.data[0]?.v_TIM_ADD_ATTENDENCE);
        setNotes(response?.data?.data[0]?.v_TIM_DESCRIPTION);
        setSelectedButtonFurnishedId(
          response?.data?.data[0]?.v_TIM_IS_FURNISHED,
        );
        setIsLoading(false);
      })
      .catch(error => {
        // Handle error
        console.error('API Error PersonalDetails CIP:', error);
      });
  };
  // alert(JSON.stringify(selectedAddress))
  useEffect(() => {
    if (isVisible) {
      fetchData();
    }
  }, [isVisible]);

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
    const Selected_AddressType = url + 'get_property_details_my_acc_id';
    console.log('Request URL:', Selected_AddressType);
    setIsLoading(true);
    await axios
      .post(Selected_AddressType, Selected_Address)
      .then(response => {
        console.log('Selected_Address', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);
          console.log('Selected_Address....', response?.data?.property_details);
          setSelectedAddreeData(response?.data?.property_details);
        } else {
          console.error('Selected_Address_error:', response?.data?.error);
          // alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Selected_Address error:', error);
        // alert(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const allSelectedValues = [...displaySelectedValues, ...selectedValues];
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
  const Selected_Time_render = item => {
    const isSelected =
      item?.longitude === selectedAddress.longitude &&
      item?.latitude === selectedAddress.latitude;

    return (
      <View contentContainerStyle={{flex: 1, height: '100%'}}>
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
  const Detail_render = ({item, index}) => {
    const isChecked = checkedItems[item.TAM_AREA_KEY]; // Use a unique identifier for each item
    return (
      <View style={CreateNewInspectionStyle.DetailsView}>
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
      </View>
    );
  };
  const SubmitInspection = async () => {
    // alert(selectedAddress?.property_id)
    setIsLoading(true);
    try {
      const Inspectiondata = {
        UPD_KEY: selectedAddress?.property_id,
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
      const Inspection_Url = Url + 'inspection_details/save';
      console.log('Inspection_Url', Inspection_Url);
      const res = await axios.post(Inspection_Url, Inspectiondata);
      console.log('scheduule inspection....', res?.data);
      if (res?.data?.success == true) {
        setTIM_key(res?.data?.data);
        console.log('TIM_KEY', res?.data?.data?.TIM_KEY);
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
  const UpdateInspection = async () => {
    // alert(selectedAddress?.property_id)
    setIsLoading(true);
    try {
      const Inspectiondata = {
        TIM_KEY: TIM_KEY,
        UPD_KEY: selectedAddress?.property_id,
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
      console.log('inspecsd', Inspectiondata);
      const Url = Config.BASE_URL;
      const Inspection_Url = Url + 'inspection_details/update';
      console.log('Inspection_Url', Inspection_Url);
      const res = await axios.put(Inspection_Url, Inspectiondata);
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
    } else if (selectedAddress == '') {
      setShowError(true);
    } else {
      InspectionView
        ? UpdateInspection()
        : Ins_editMode
        ? UpdateInspection()
        : SubmitInspection();
    }
  };

  const fetchResults = async searchQuery => {
    // alert(searchQuery)
    setIsLoading(true);

    try {
      const Url = Config.BASE_URL;
      const search_Url = Url + 'add_attendees/search';
      console.log('Inspection_Url', search_Url);
      const response = await axios.post(search_Url, {
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
  }, 100); // Delay in milliseconds

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
  // const displaySelectedValues = selectedValues
  //   .map(user => `${user.UAD_FIRST_NAME} ${user.UAD_LAST_NAME}`)
  //   .join(', ');
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={CreateNewInspectionStyle.Container}>
        <Text style={CreateNewInspectionStyle.HeadingText}>
          {'Tell us about your inspection'}
        </Text>

        <View style={{marginBottom: 15}}>
          <Text style={LABEL_STYLES.commontext}>
            {'What type of inspection is this?'}
          </Text>
          <Dropdown
            style={CreateNewInspectionStyle.dropdown}
            placeholderStyle={[
              CreateNewInspectionStyle.placeholderStyle,
              {color: _COLORS.Kodie_LightGrayColor},
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
            {'Please select a inspection type.'}
          </Text>
        ) : null}
        <Text style={LABEL_STYLES.commontext}>
          {'Schedule time and date of inspection'}
        </Text>
        <View style={CreateNewInspectionStyle.datePickerView}>
          <CalendarModal
            SelectDate={selectedDate ? selectedDate : 'Select Date'}
            _textInputStyle={{
              color: selectedDate
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_GrayColor,
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
              currentTime ? _COLORS.Kodie_BlackColor : _COLORS.Kodie_GrayColor
            }
            data={new Date()}
            getData={date => {
              setCurrentTime(moment(date).format('hh:mm A'));
            }}
          />
        </View>

        {selectedDateError && (
          <Text style={CreateNewInspectionStyle.errorText}>
            {'Please select a date.'}
          </Text>
        )}

        <View style={{marginBottom: 15}}>
          <Text style={LABEL_STYLES.commontext}>
            {'Where is the inspection taking place?'}
          </Text>
          <Dropdown
            style={CreateNewInspectionStyle.dropdown}
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
                latitude: item?.latitude,
                longitude: item?.longitude,
                location: item?.location,
                property_id: item?.property_id,
                user_Id: item?.account_id,
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
            {'Please select a property.'}
          </Text>
        ) : null}

        <View style={{marginBottom: 15, marginTop: 15}}>
          <Text style={LABEL_STYLES.commontext}>{'Add attendees'}</Text>

          <TouchableOpacity
            style={CreateNewInspectionStyle.TextInputView}
            onPress={() => refRBSheet.current.open()}>
            <Text
              style={[
                CreateNewInspectionStyle.input,
                {
                  color: displaySelectedValues
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor,
                },
              ]}>
              {displaySelectedValues
                ? displaySelectedValues
                : 'Add people attending the inspection'}
            </Text>

            {/* <TextInput
              value={displaySelectedValues}
              placeholder={'Add people attending the inspection'}
              style={CreateNewInspectionStyle.input}
              palceholderColor={_COLORS.Kodie_MediumGrayColor}
              editable={false}
            /> */}
            <Feather
              name={'user-plus'}
              size={22}
              color={_COLORS.Kodie_GrayColor}
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        </View>
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
        <View style={{marginBottom: 15}}>
          <Text style={LABEL_STYLES.commontext}>
            {'Select the areas you would like to include:'}
          </Text>
          <View style={{marginTop: 10}}>
            <FlatList
              data={[...AreaKey, {TAM_AREA_KEY: 'add_custom_area'}]}
              scrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{}}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                if (item.TAM_AREA_KEY === 'add_custom_area') {
                  return (
                    <View>
                      <TouchableOpacity
                      style={{marginRight: 50,marginTop:10}}
                        onPress={() => {
                          // refRBSheet1.current.open();
                          Alert.alert('Add custom area', 'Coming soon');
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
        </View>
        <Text style={LABEL_STYLES.commontext}>{'Notes:'}</Text>
        <TextInput
          style={CreateNewInspectionStyle.NotesInput}
          value={Notes}
          onChangeText={setNotes}
          placeholder="Enter any notes about this item"
          placeholderTextColor="#999"
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
        />
      </ScrollView>

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
        />
        {isLoading ? <CommonLoader /> : null}
      </RBSheet>
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
          <View style={CreateNewInspectionStyle.Container}>
            <View style={CreateNewInspectionStyle.ModalContainer}>
              <Text style={CreateNewInspectionStyle.ShareText}>{'Add custom area'}</Text>
              <TouchableOpacity onPress={handleClosePopup}>
                <Entypo
                  name="cross"
                  size={24}
                  color={_COLORS.Kodie_BlackColor}
                />
              </TouchableOpacity>
            </View>
            <View style={CreateNewInspectionStyle.inputContainer}>
              <Text
                style={[LABEL_STYLES._texinputLabel, CreateNewInspectionStyle.cardHeight]}>
                {'Name of area:'}
              </Text>
              <TextInput
                style={CreateNewInspectionStyle.emailinput}
                value={email}
                onChangeText={setEmail}
                placeholder="Create a name for your custom area"
                placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
                keyboardType="email-address"
              />
            </View>
            <Text style={CreateNewInspectionStyle.cancelText}>
              {'Would you like to use a standard inspection checklist?'}
            </Text>
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
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelectedButtonStandard(false);
                setSelectedButtonStandardId(1);
                // alert(selectedButtonStandard)
              }}
              RightButtonText={'No'}
              onPressRightButton={() => {
                setSelectedButtonStandard(true);
                setSelectedButtonStandardId(0);

                // alert(selectedButtonStandard)
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
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
            />
            <Text style={[CreateNewInspectionStyle.cancelText, {marginVertical: 12}]}>
              {' Select the area most similar to your custom area:'}
            </Text>
            <Dropdown
              style={CreateNewInspectionStyle.dropdown}
              placeholderStyle={CreateNewInspectionStyle.placeholderStyle}
              selectedTextStyle={CreateNewInspectionStyle.selectedTextStyle}
              inputSearchStyle={CreateNewInspectionStyle.inputSearchStyle}
              iconStyle={CreateNewInspectionStyle.iconStyle}
              data={getCustomeArea}
              search
              maxHeight={300}
              labelField="TAM_AREA_NAME"
              valueField="TAM_AREA_KEY"
              placeholder="Enter address manually"
              searchPlaceholder="Search ..."
              value={customeAreavalue}
              onChange={item => {
                setCustomeAreaValue(item.TAM_AREA_KEY);
              }}
            />
            <Text style={CreateNewInspectionStyle.cancelText}>
              {'Make this a standard area for future inspections?'}
            </Text>
            <RowButtons
              LeftButtonText={'Yes'}
              onPressLeftButton={() => {
                setSelectedButtonFutue(false);
                setSelectedButtonFutueId(1);
                // alert(selectedButtonFutue)
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
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              RightButtonText={'No'}
              onPressRightButton={() => {
                setSelectedButtonFutue(true);
                // alert(selectedButtonFutue)
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
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
            />
            <View style={CreateNewInspectionStyle.ButtonView}>
              <TouchableOpacity style={CreateNewInspectionStyle.cancelView}>
                <Text style={[CreateNewInspectionStyle.cancelText]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={CreateNewInspectionStyle.SaveView}
                onPress={handleDone}
                disabled={isLoading}>
                <Text style={CreateNewInspectionStyle.DoneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
export default CreateNewInspection;
