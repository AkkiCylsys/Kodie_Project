//ScreenNo:88
//ScreenNo:89
//ScreenNo:90
//ScreenNo:92
import React, { useState, useRef, useEffect } from 'react';
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
} from 'react-native';
import TopHeader from '../../../components/Molecules/Header/Header';
import { Dropdown } from 'react-native-element-dropdown';
import { CreateNewInspectionStyle } from './CreateNewInspectionCss';
import CalendarModal from '../../../components/Molecules/CalenderModal/CalenderModal';
import TimePicker from '../../../components/Molecules/ClockPicker/TimePicker';
import { LABEL_STYLES, _COLORS, IMAGES, FONTFAMILY } from '../../../Themes';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import { _goBack } from '../../../services/CommonServices';
import CustomDropdown from '../../../components/Molecules/CustomDropdown/CustomDropdown';
import { Config } from '../../../Config';
import axios from 'axios';
import moment from 'moment'
import { useSelector } from 'react-redux';
import SearchPlaces from '../../../components/Molecules/SearchPlaces/SearchPlaces';
import MapScreen from '../../../components/Molecules/GoogleMap/googleMap';
import Geocoder from 'react-native-geocoding';
import { CommonLoader } from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import debounce from 'lodash/debounce';
import RBSheet from 'react-native-raw-bottom-sheet';
import GuestSelectionContent from '../../../components/GuestSelectionContent/GuestSelectionContent';

const CreateNewInspection = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  // console.log('loginResponse.....', loginData);
  const [inspectionType, setInspectionType] = useState([]);
  const [Inspection_value, setInspection_value] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [Notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddressData, setSelectedAddreeData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);
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
  const refRBSheet = useRef();
  const Area_key = () => {
    const url = Config.BASE_URL;
    const AreaGetUrl = url + 'get_inspection_area';
    console.log('Request URL:', AreaGetUrl);
    setIsLoading(true);
    axios
      .get(AreaGetUrl)
      .then(response => {
        console.log('Selected_Address', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);
          console.log('Selected_Address....', response?.data?.data);
          setAreaKey(response?.data?.data);
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

  const toggleCheckBox = (itemId) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemId]: !prevCheckedItems[itemId],
    }));
  };
  const getCheckedItemIds = () => {
    return Object.keys(checkedItems)
      .filter(itemId => checkedItems[itemId])
      .join(',');
  };
  const checkedItemIds = getCheckedItemIds();
  console.log(checkedItemIds);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };
  useEffect(() => {
    handleInspection_Type();
    Selected_Address_Type();
    Area_key();
  }, [])
 
  const Selected_Address_Type = () => {
    const Selected_Address = {
      account_id: loginData?.Login_details?.user_account_id,
    };
    const url = Config.BASE_URL;
    const Selected_AddressType = url + 'get_property_details_my_acc_id';
    console.log('Request URL:', Selected_AddressType);
    setIsLoading(true);
    axios
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
  const Detail_render = ({ item, index }) => {
    const isChecked = checkedItems[item.TAM_AREA_KEY]; // Use a unique identifier for each item
    return (
      <View style={CreateNewInspectionStyle.DetailsView}>
        <TouchableOpacity onPress={() => toggleCheckBox(item.TAM_AREA_KEY)}>
          <MaterialIcons
            name={isChecked ? 'check-box' : 'check-box-outline-blank'}
            size={25}
            color={isChecked ? _COLORS?.Kodie_GreenColor : _COLORS.Kodie_MediumGrayColor}
          />
        </TouchableOpacity>
        <Text style={CreateNewInspectionStyle.details_text}>{item.TAM_AREA_NAME}</Text>
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
        TIM_LOCATION_LONGITUDE:parseFloat(selectedAddress.longitude),
        TIM_LOCATION_LATITUDE: parseFloat(selectedAddress.latitude),
        TIM_ADD_ATTENDENCE: displaySelectedValues,
        TIM_IS_FURNISHED: selectedButtonFurnishedId,
        TIM_DESCRIPTION: Notes,
        TAM_AREA_KEYS: checkedItemIds.toString(),
        CREATED_BY: loginData?.Login_details?.user_account_id.toString()
      }
      console.log("inspec", Inspectiondata);
      const Url = Config.BASE_URL
      const Inspection_Url = Url + "inspection_details/save"
      console.log("Inspection_Url", Inspection_Url);
      const res = await axios.post(Inspection_Url, Inspectiondata)
      console.log(res?.data);
      if (res?.data?.success == true) {
        setTIM_key(res?.data?.data);
        console.log("TIM_KEY",res?.data?.data?.TIM_KEY);
        alert(res?.data?.message)
        props?.navigation?.navigate('PropertyInspection',{
          TIM_KEY:res?.data?.data?.TIM_KEY,
          PropertyId:selectedAddress?.property_id,
          account_id:selectedAddress?.user_Id
        })
        setIsLoading(false);
        setInspection_value();
        setCurrentTime('');
        setSelectedDate('')
        setSelectedAddress([]);
        setTempSelectedValues([]);
        setSelectedValues([]);
        setSelectedButtonFurnishedId();
        setSelectedButtonFurnished([])
        setNotes('')
        setCheckedItems({})
      }
    } catch (error) {
      if (error?.response && error?.response?.status === 404) {
        alert(error?.response?.data?.message)
        setIsLoading(false)
      } else {
        alert(error?.response?.data?.message)
        setIsLoading(false);
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  const handleSubmit = () => {
    if (selectedAddress == '') {
      setShowError(true);
    } else {
      SubmitInspection()
    }
  };
  const fetchResults = async (searchQuery) => {
    // alert(searchQuery)
    setIsLoading(true);

    try {
      const Url = Config.BASE_URL
      const search_Url = Url + "add_attendees/search"
      console.log("Inspection_Url", search_Url);
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

  const debouncedFetchResults = debounce((searchQuery) => {
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

  const handleSelect = (user) => {
    setTempSelectedValues((prevSelectedUsers) => {
      const isSelected = prevSelectedUsers.find(selectedUser => selectedUser.UAD_KEY === user.UAD_KEY);
    if (isSelected) {
      return prevSelectedUsers.filter((selectedUser) => selectedUser.UAD_KEY !== user.UAD_KEY);
    } else {
      return [...prevSelectedUsers, user];
    }
    });
  };
  const applySelection = () => {
    setSelectedValues(tempSelectedValues);
    refRBSheet.current.close();
  };
  const handleClosePopup = () => {
    refRBSheet.current.close();
  };
  const displaySelectedValues = selectedValues.map(user => `${user.UAD_FIRST_NAME} ${user.UAD_LAST_NAME}`).join(', ');;
  return (
    <SafeAreaView style={CreateNewInspectionStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() =>  _goBack(props)}
        MiddleText={ 'Create New Inspections'}
      />
     
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={CreateNewInspectionStyle.Container}>
          <Text style={CreateNewInspectionStyle.HeadingText}>
            {'Tell us about your inspection'}
          </Text>


          <View style={{ marginBottom: 15 }}>
            <Text style={LABEL_STYLES.commontext}>
              {'What type if inspection is this?'}
            </Text>
            <Dropdown
              style={CreateNewInspectionStyle.dropdown}
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
              value={
                Inspection_value
              }
              onChange={item => {
                setInspection_value(item.lookup_key);
              }}
              renderItem={InspectionType_render}
            />
          </View>
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
                currentTime && currentTime != ''
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


          <View style={{ marginBottom: 15 }}>
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
              valueField="longitude"
              placeholder="Select property"
              searchPlaceholder="Search..."
              value={selectedAddress}
              onChange={item => {
                setSelectedAddress({
                  latitude: item?.latitude,
                  longitude: item?.longitude,
                  location: item?.location,
                  property_id:item?.property_id,
                  user_Id:item?.account_id,
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
          {showError? <Text style={CreateNewInspectionStyle.errorText}>{"Please select a property."}</Text> : null}

          <View style={{ marginBottom: 15 ,marginTop:15}}>
            <Text style={LABEL_STYLES.commontext}>{'Add attendees'}</Text>
           
              <TouchableOpacity style={CreateNewInspectionStyle.TextInputView}
               onPress={() => refRBSheet.current.open()}>
                <TextInput
                  value={displaySelectedValues}
                  placeholder={'Add people attending the inspection'}
                  style={CreateNewInspectionStyle.input}
                  palceholderColor={_COLORS.Kodie_MediumGrayColor}
                  editable={false}

                />
                <Feather
                  name={'user-plus'}
                  size={22}
                  color={_COLORS.Kodie_GrayColor}
                  style={{ marginRight: 10 }}
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
          <View style={{ marginBottom: 15 }}>
            <Text style={LABEL_STYLES.commontext}>
              {'Select the areas you would like to include:'}
            </Text>
            <View style={{ marginTop: 10 }}>
              <FlatList
                data={AreaKey}
                scrollEnabled
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}
                numColumns={2}
                keyExtractor={(item) => item.TAM_AREA_KEY.toString()}
                renderItem={Detail_render}
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
            _ButtonText={'Schedule inspection'}
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
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: CreateNewInspectionStyle.bottomModal_container,
        }}
      >
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
       {
        isLoading ? <CommonLoader /> : null
      }
    
      </RBSheet>
      {
        isLoading ? <CommonLoader /> : null
      }
    </SafeAreaView>
  );
};
export default CreateNewInspection;
