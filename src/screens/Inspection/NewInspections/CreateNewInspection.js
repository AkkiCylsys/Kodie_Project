//ScreenNo:88
//ScreenNo:89
//ScreenNo:90
//ScreenNo:92
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import TopHeader from '../../../components/Molecules/Header/Header';
import { Dropdown } from 'react-native-element-dropdown';
import { CreateNewInspectionStyle } from './CreateNewInspectionCss';
import CalendarModal from '../../../components/Molecules/CalenderModal/CalenderModal';
import TimePicker from '../../../components/Molecules/ClockPicker/TimePicker';
import { LABEL_STYLES, _COLORS, IMAGES } from '../../../Themes';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import { _goBack } from '../../../services/CommonServices';
import CustomDropdown from '../../../components/Molecules/CustomDropdown/CustomDropdown';
import { useEffect } from 'react';
import { Config } from '../../../Config';
import axios from 'axios';
import moment from 'moment'
import { useSelector } from 'react-redux';
import SearchPlaces from '../../../components/Molecules/SearchPlaces/SearchPlaces';
import MapScreen from '../../../components/Molecules/GoogleMap/googleMap';
import Geocoder from 'react-native-geocoding';
import { CommonLoader } from '../../../components/Molecules/ActiveLoader/ActiveLoader';

const select_property = [
  'All',
  '2118 Thornridge Cir. Syracuse',
  '8502 Preston Rd. Inglewood',
  '1729 Sickle St, QLD',
  '5 Aspen Villas',
];
const Detail = [
  {
    id: '1',
    name: 'Bathroom',
  },
  {
    id: '2',
    name: 'Garden',
  },
  {
    id: '3',
    name: 'Bedroom',
  },
  {
    id: '4',
    name: 'Kitchen',
  },
  {
    id: '5',
    name: 'Dining Room',
  },
  {
    id: '6',
    name: 'Living Room',
  },
  {
    id: '7',
    name: 'Exterior',
  },
  {
    id: '8',
    name: 'Roof ',
  },
  {
    id: '9',
    name: 'Garage',
  },
];

const CreateNewInspection = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginResponse.....', loginData);
  const [inspectionType, setInspectionType] = useState([]);
  const [Inspection_value, setInspection_value] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [location, setLocation] = useState('');
  const [UserCurrentCity, setUserCurrentCity] = useState('');
  const [UserZip_Code, setUserZip_Code] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [AddInspection, setAddInspection] = useState('');
  const [Notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddressData, setSelectedAddreeData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [selectedButtonFurnished, setSelectedButtonFurnished] = useState(false);
  const [selectedButtonFurnishedId, setSelectedButtonFurnishedId] =
    useState(67);
  const [checkedItems, setCheckedItems] = useState({});

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
  }, [])
  const ConfirmAddress = () => {
    setIsMap(false);
    setLocation(currentLocation);
  };
  const openMapandClose = text => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = Region => {
    // alert(JSON.stringify(Region));
    console.log('Region....', JSON.stringify(Region));
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
        // currentLocation ? setLocation(json.results[0].formatted_address) : null;
        const formatedAddress = json.results[0].formatted_address;
        setCurrentLocation(formatedAddress);
        // setLocation(json.results[0].formatted_address);
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
        // setLocation(MainFullAddress);
        console.log('mainFullAddress....', MainFullAddress);
      })
      .catch(error => console.warn(error));
  };
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
    const isChecked = checkedItems[item.id]; // Use a unique identifier for each item
    return (
      <View style={CreateNewInspectionStyle.DetailsView}>
        <TouchableOpacity onPress={() => toggleCheckBox(item.id)}>
          <MaterialIcons
            name={isChecked ? 'check-box' : 'check-box-outline-blank'}
            size={25}
            color={isChecked? _COLORS?.Kodie_GreenColor:_COLORS.Kodie_MediumGrayColor}
          />
        </TouchableOpacity>
        <Text style={CreateNewInspectionStyle.details_text}>{item.name}</Text>
      </View>
    );
  };
  const SubmitInspection = async() =>{
    setIsLoading(true);
    try{
      const Inspectiondata = {
        UPD_KEY: 1562,
        TIM_INSPECTION_TYPE: Inspection_value,
        TIM_SCHEDULE_TIME:currentTime ,
        TIM_SCHEDULE_DATE: selectedDate,
        TIM_LOCATION: location || selectedAddress.location,
        TIM_LOCATION_LONGITUDE: longitude || selectedAddress.longitude,
        TIM_LOCATION_LATITUDE: latitude || selectedAddress.latitude,
        TIM_ADD_ATTENDENCE: " ",
        TIM_IS_FURNISHED: selectedButtonFurnishedId,
        TIM_DESCRIPTION: Notes,
        TAM_AREA_KEYS: checkedItemIds.toString(),
        CREATED_BY: loginData?.Login_details?.user_account_id.toString()
      }
      console.log("inspec", Inspectiondata);
      const Url = Config.BASE_URL
      const Inspection_Url = Url + "inspection_details/save"
      console.log("Inspection_Url",Inspection_Url);
      const res = await axios.post(Inspection_Url,Inspectiondata)
      console.log(res?.data);
      if(res?.data?.success == true){
        alert(res?.data?.message)
        setIsLoading(false);
      }
    }catch(error){
      if(error?.response && error?.response?.status === 404){
        alert(error?.response?.data?.message)
        setIsLoading(false)
      }else{
        alert(error?.response?.data?.message)
        setIsLoading(false);
      }
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <SafeAreaView style={CreateNewInspectionStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => IsMap ? setIsMap(false) : IsSearch ? setIsSearch(false) : _goBack(props)}
        MiddleText={IsMap || IsSearch
          ? 'Location'
          : 'Create New Inspections'}
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
            style={CreateNewInspectionStyle.BtnContainer}
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
                  latitude: item.latitude,
                  longitude: item.longitude,
                  location: item.location,
                });
              }}
              renderItem={Selected_Time_render}
            />
          </View>
          {!selectedAddress ? (
            <View style={CreateNewInspectionStyle.locationContainer}>
              <TextInput
                style={CreateNewInspectionStyle.locationInput}
                value={location}
                onChangeText={setLocation}
                onFocus={() => {
                  setIsSearch(true);
                }}
                // editable={false}
                placeholder="Enter new location"
                placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              />
              <TouchableOpacity
                style={CreateNewInspectionStyle.locationIconView}
                onPress={() => {
                  setIsMap(true);
                 
                }}>
                <Octicons
                  name={'location'}
                  size={22}
                  color={_COLORS.Kodie_GreenColor}
                  style={CreateNewInspectionStyle.locationIcon}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={{ marginBottom: 15 }}>
            <Text style={LABEL_STYLES.commontext}>{'Add attendees'}</Text>
            <TouchableOpacity>
              <View style={CreateNewInspectionStyle.TextInputView}>
                <TextInput
                  value={AddInspection}
                  placeholder={'Add people attending the inspection'}
                  style={CreateNewInspectionStyle.input}
                  onChange={text => setAddInspection(text)}
                  palceholderColor={_COLORS.Kodie_MediumGrayColor}
                />
                <Feather
                  name={'user-plus'}
                  size={22}
                  color={_COLORS.Kodie_GrayColor}
                  style={{ marginRight: 10 }}
                />
              </View>
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
          <View style={{marginBottom:15}}>
          <Text style={LABEL_STYLES.commontext}>
            {'Select the areas you would like to include:'}
          </Text>
          <View style={{marginTop:10}}>
          <FlatList
            data={Detail}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={Detail_render}
          />
          </View>
          </View>
          <Text style={LABEL_STYLES.commontext}>{'Notes:'}</Text>
          <TextInput
            style={CreateNewInspectionStyle.NotesInput}
            value={Notes}
            onChangeText={text => setNotes(text)}
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
            onPress={SubmitInspection}
          />
        </ScrollView>
      )}
      {
        isLoading ? <CommonLoader/> : null 
      }
    </SafeAreaView>
  );
};
export default CreateNewInspection;
