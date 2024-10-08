import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Permission,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import {PropertyDetailsStyle} from './PropertyDetailsStyle';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../services/CommonServices';
import {Dropdown} from 'react-native-element-dropdown';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IMAGES, LABEL_STYLES} from '../../../../Themes';
import {_COLORS, FONTFAMILY} from '../../../../Themes';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import CustomDropdown from '../../../../components/Molecules/CustomDropdown/CustomDropdown';
import {Config} from '../../../../Config';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import CustomSingleDropdown from '../../../../components/Molecules/CustomSingleDropdown/CustomSingleDropdown';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import SearchPlaces from '../../../../components/Molecules/SearchPlaces/SearchPlaces';
import MapScreen from '../../../../components/Molecules/GoogleMap/googleMap';
import {SignUpStepStyle} from '../../../Authentication/SignUpScreen/SignUpSteps/SignUpStepsStyle';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {BackHandler} from 'react-native';
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';
const stepLabels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
export default PropertyDetails = props => {
  const addPropertySecondStepData = useSelector(
    state => state.AddPropertyStepsReducer.data,
  );
  console.log('addPropertySecondStepData...', addPropertySecondStepData);
  const isFocus = useIsFocused();
  const propertyid = props?.route?.params?.propertyid;
  const editMode = props?.route?.params?.editMode;
  console.log('propertyid....', propertyid);
  console.log('EditProperty....', editMode);
  const [currentPage, setCurrentPage] = useState(0);
  const [location, setLocation] = useState('');
  const [propertyDesc, setPropertyDesc] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [UserCurrentCity, setUserCurrentCity] = useState('');
  const [UserZip_Code, setUserZip_Code] = useState('');
  const [property_value, setProperty_value] = useState(0);
  const [selectedButton, setSelectedButton] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState(1);
  const [property_Data, setProperty_Data] = useState([]);
  const [property_Detail, setProperty_Details] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [error, setError] = useState('');
  const [notesError, setNotesError] = useState('');
  const [propertyError, setPropertyError] = useState('');
  const loginData = useSelector(state => state.authenticationReducer.data);
  const handleTextInputFocus = () => {
    if (error) {
      setError('');
      setPropertyError('');
      setNotesError('');
    }
  };

  const handleLocationSearch = () => {
    if (!location) {
      setError('Please enter a location.');
    } else {
      setError('');
    }
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
  useEffect(() => {
    handleProperty_Type();
    // propertyid > 0 || addPropertySecondStepData ? DetailsData() : null;
    propertyid > 0 ||
    (Array.isArray(addPropertySecondStepData) &&
      addPropertySecondStepData.length > 0) ||
    typeof addPropertySecondStepData === 'number'
      ? DetailsData()
      : null;
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
    setLocation('');
    setProperty_value('');
    setPropertyDesc('');
  }, [propertyid, addPropertySecondStepData]);
  const DetailsData = async () => {
    const detailData = {
      property_id:
        addPropertySecondStepData && !Array.isArray(addPropertySecondStepData)
          ? addPropertySecondStepData
          : propertyid,
    };
    console.log('detailData', detailData);
    const url = Config.BASE_URL;
    const property_Detailss = url + 'get_property_details';
    console.log('Request URL:', property_Detailss);
    setIsLoading(true);

    try {
      const response = await axios.post(property_Detailss, detailData);
      console.log('propertyDetail', response?.data);

      if (response?.data?.success === true) {
        setIsLoading(false);
        setProperty_Details(response?.data?.property_details[0]);
        setLocation(response?.data?.property_details[0]?.location);
        setlongitude(response?.data?.property_details[0]?.longitude);
        setlatitude(response?.data?.property_details[0]?.latitude);
        setProperty_value(
          parseInt(response?.data?.property_details[0]?.property_type_id),
        );
        const autoListValue = parseInt(
          response?.data?.property_details[0]?.auto_list,
        );
        setSelectedButton(autoListValue === 0);
        setCity(response?.data?.property_details[0]?.city)
        setCountry(response?.data?.property_details[0]?.country)
        setState(response?.data?.property_details[0]?.state)
        setPropertyDesc(
          response?.data?.property_details[0]?.property_description,
        );

        console.log('propertyDetail....', response?.data?.property_details);
      } else {
        console.error('propertyDetail_error:', response?.data?.error);
        // Alert.alert('Warning', error?.response?.data?.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(
        'property_type error in get data:',
        error?.response?.data?.message,
      );
      // Alert.alert('Warning', error?.response?.data?.message);
      setIsLoading(false);
    }
  };
  const updatePropertyDetails = () => {
    const updateData = {
      user: loginData?.Login_details?.user_id,
      user_account_details_id: loginData?.Login_details?.user_account_id,
      location: location,
      location_longitude: longitude,
      location_latitude: latitude,
      islocation: 1,
      property_description: propertyDesc,
      property_type: property_value,
      key_features: property_Detail?.key_features,
      additional_features: property_Detail?.additional_features_id,
      UPD_FLOOR_SIZE: property_Detail?.floor_size,
      UPD_LAND_AREA: property_Detail?.land_area,
      additional_key_features: property_Detail?.additional_key_features_id,
      autolist: selectedButtonId,
      property_id:
        // addPropertySecondStepData && !Array.isArray(addPropertySecondStepData)
        //   ? addPropertySecondStepData
        //   : 
          propertyid,
      p_city: city,
      p_state: state,
      p_country: country,
    };
    console.log('updateData', updateData);
    const url = Config.BASE_URL;
    const update_property_details = url + 'update_property_details';
    console.log('Request URL:', update_property_details);
    setIsLoading(true);
    console.log('updated data in edit mode cgheck...', updateData);
    axios
      .put(update_property_details, updateData)
      .then(response => {
        console.log('update_property_details', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);
          props.navigation.navigate('PropertyFeature', {
            location: location,
            property_value: property_value,
            propertyDesc: propertyDesc,
            selectedButtonId: selectedButtonId,
            latitude: latitude,
            longitude: longitude,
            city: city,
            state: state,
            country: country,
            propertyid: 
               propertyid,
            editMode: editMode,
          });
         
        } else {
          console.error('update_property_detailserror:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('update_property_details error:', error);
        setIsLoading(false);
      });
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
        ? 'Features'
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

  const ConfirmAddress = () => {
    setIsMap(false);
    setLocation(currentLocation);
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
        console.log('location....', location);
      })
      .catch(error => console.warn(error));
  };

  const handleProperty_Type = async () => {
    const propertyData = {
      P_PARENT_CODE: 'PROP_TYPE',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const propertyType = url + 'lookup_details';
    console.log('Request URL:', propertyType);
    setIsLoading(true);

    try {
      const response = await axios.post(propertyType, propertyData);
      console.log('property_type', response?.data);

      if (response?.data?.status === true) {
        setIsLoading(false);
        console.log('propertyData....', response?.data?.lookup_details);
        setProperty_Data(response?.data?.lookup_details);
      } else {
        console.error('property_type_error:', response?.data?.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('property_type error:', error);
      setIsLoading(false);
    }
  };

  const handleNote = text => {
    setPropertyDesc(text);
    if (text.trim() === '') {
      setNotesError('please enter note!');
    } else {
      setNotesError('');
    }
  };
  //dropDown render Item....
  const propertyType_render = item => {
    return (
      <View
        style={[
          PropertyDetailsStyle.itemView,
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
        <Text style={PropertyDetailsStyle.textItem}>
          {item?.lookup_description}
        </Text>
      </View>
    );
  };
  const goBack = () => {
    props.navigation.pop();
  };
  const property_details = async () => {
    const url = Config.BASE_URL;
    const additionalApi = url + 'add_property_details';
    console.log('Request URL:', additionalApi);
    setIsLoading(true);
    let data = {
      user: loginData?.Login_details?.user_id,
      user_account_details_id: loginData?.Login_details?.user_account_id,
      location: location,
      location_longitude: longitude,
      location_latitude: latitude,
      islocation: 1,
      property_description: propertyDesc,
      property_type: property_value > 0 ? property_value : 0,
      key_features: 0,
      additional_features: 0,
      additional_key_features: 0,
      autolist: selectedButtonId,
      UPD_FLOOR_SIZE: 0,
      UPD_LAND_AREA: 0,
      p_city: city,
      p_state: state,
      p_country: country,
    };
    console.log('Property details data..', data);
    axios
      .post(additionalApi, {
        user: loginData?.Login_details?.user_id,
        user_account_details_id: loginData?.Login_details?.user_account_id,
        location: location,
        location_longitude: longitude,
        location_latitude: latitude,
        islocation: 1,
        property_description: propertyDesc,
        property_type: property_value > 0 ? property_value : 0,
        key_features: 0,
        additional_features: 1,
        additional_key_features: 0,
        autolist: selectedButtonId,
        UPD_FLOOR_SIZE: 0,
        UPD_LAND_AREA: 0,
        p_city: city,
        p_state: state,
        p_country: country,
      })

      .then(response => {
        console.log('property_details', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);

          console.log(
            'response?.data?.Property_id',
            response?.data?.Property_id,
          );

          props.navigation.navigate('PropertyFeature', {
            location: location,
            property_value: property_value,
            propertyDesc: propertyDesc,
            selectedButtonId: selectedButtonId,
            latitude: latitude,
            longitude: longitude,
            city: city,
            state: state,
            country: country,
            editMode: editMode,
            propertyid: response?.data?.Property_id,
          });
          console.log('property_details....', response?.data);
        } else {
          console.error('property_details_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('property_details error:', error);
        setIsLoading(false);
      });
  };
  return (
    <SafeAreaView style={PropertyDetailsStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => {
          if (IsMap) {
            setIsMap(false);
          } else if (IsSearch) {
            setIsSearch(false);
          } else {
            goBack();
          }
        }}
        MiddleText={
          IsMap || IsSearch
            ? 'Location'
            : editMode
            ? 'Edit property'
            : 'Add new property'
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        {IsMap || IsSearch ? null : (
          <View
            style={{
              marginTop: 15,
            }}>
            <StepIndicator
              customSignUpStepStyle={firstIndicatorSignUpStepStyle}
              currentPosition={0}
              // onPress={onStepPress}
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
              // Maplat={getLat}
              // Maplng={getLong}
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
              style={SignUpStepStyle.BtnContainer}
              onPress={ConfirmAddress}>
              <Image source={IMAGES?.Shape} style={{height: 25, width: 25}} />
            </TouchableOpacity>
          </View>
        ) : IsSearch ? (
          <SearchPlaces
            onPress={(data, details = null) => {
              setlatitude(details.geometry.location.lat);
              setlongitude(details.geometry.location.lng);
              setIsSearch(false);
              setIsMap(true);
              const city = details.address_components[0].long_name;
              const state = details.address_components[3].long_name;
              const country = details.address_components[4].long_name;
              // setLocation(details.formatted_address);
              setCurrentLocation(details.formatted_address);
              setCity(city);
              setState(state);
              setCountry(country);
              console.log('locationSearch....', location);
              console.log('details.......', details);
              console.log(city, state, country, 'location rahul..........');
            }}
          />
        ) : (
          <ScrollView
            contentContainerStyle={{marginBottom: 190}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={PropertyDetailsStyle.headingView}>
              <Text style={PropertyDetailsStyle.heading}>
                {'Property details'}
              </Text>
            </View>

            <View style={PropertyDetailsStyle.card}>
              <View style={PropertyDetailsStyle.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>
                  {'Location'}
                  <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
                </Text>
                <View style={PropertyDetailsStyle.locationConView}>
                  <View style={PropertyDetailsStyle.locationContainer}>
                    <TextInput
                      style={PropertyDetailsStyle.locationInput}
                      value={location}
                      onChangeText={text => {
                        setLocation(text);
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
                    style={PropertyDetailsStyle.locationIconView}
                    onPress={() => {
                      setIsMap(true);
                      handleTextInputFocus();
                    }}>
                    <Octicons
                      name={'location'}
                      size={22}
                      color={_COLORS.Kodie_GreenColor}
                      style={PropertyDetailsStyle.locationIcon}
                    />
                  </TouchableOpacity>
                </View>
                {error ? (
                  <Text style={PropertyDetailsStyle.errorText}>{error}</Text>
                ) : null}
              </View>
              <View style={PropertyDetailsStyle.inputContainer}>
                <Text style={PropertyDetailsStyle.property_Text}>
                  Property type
            <Text style={{color:_COLORS?.Kodie_redColor}}>*</Text>

                </Text>
                <Dropdown
                  style={PropertyDetailsStyle.dropdown}
                  placeholderStyle={[
                    PropertyDetailsStyle.placeholderStyle,
                    {color: _COLORS.Kodie_LightGrayColor},
                  ]}
                  selectedTextStyle={PropertyDetailsStyle.selectedTextStyle}
                  inputSearchStyle={PropertyDetailsStyle.inputSearchStyle}
                  iconStyle={PropertyDetailsStyle.iconStyle}
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
                  <Text style={PropertyDetailsStyle.errorText}>
                    {propertyError}
                  </Text>
                ) : null}
              </View>
              <View style={PropertyDetailsStyle.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>Notes 
            <Text style={{color:_COLORS?.Kodie_redColor}}>*</Text>

                </Text>
                <TextInput
                  style={PropertyDetailsStyle.input}
                  value={propertyDesc}
                  onChangeText={handleNote}
                  placeholder="Add information about your property"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={5}
                  maxLength={1000}
                  textAlignVertical={'top'}
                  onBlur={() => handleNote(propertyDesc)}
                />
                <Text style={PropertyDetailsStyle.characterLimit}>
                  {propertyDesc.length}/1000
                </Text>
                {notesError ? (
                  <Text style={PropertyDetailsStyle.errorText}>
                    {notesError}
                  </Text>
                ) : null}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={PropertyDetailsStyle.AutoList_text}>
                  {'Auto-list property on Kodie property marketplace '}
                </Text>
                <TouchableOpacity style={PropertyDetailsStyle.questionmark}>
                  <AntDesign name="question" size={20} color="#8AFBA5" />
                </TouchableOpacity>
              </View>
              <RowButtons
                LeftButtonText={'Yes'}
                leftButtonbackgroundColor={
                  !selectedButton
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor
                }
                LeftButtonTextColor={
                  !selectedButton
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor
                }
                LeftButtonborderColor={
                  !selectedButton
                    ? _COLORS.Kodie_GrayColor
                    : _COLORS.Kodie_LightWhiteColor
                }
                onPressLeftButton={() => {
                  setSelectedButton(false);
                  setSelectedButtonId(1);
                }}
                RightButtonText={'No'}
                RightButtonbackgroundColor={
                  selectedButton
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor
                }
                RightButtonTextColor={
                  selectedButton
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor
                }
                RightButtonborderColor={
                  selectedButton
                    ? _COLORS.Kodie_GrayColor
                    : _COLORS.Kodie_LightWhiteColor
                }
                onPressRightButton={() => {
                  setSelectedButton(true);
                  setSelectedButtonId(0);
                }}
              />
              <View style={PropertyDetailsStyle.btnView}>
                <CustomSingleButton
                  _ButtonText={'Next'}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    let isValid = true;

                    if (!location) {
                      setError('Please enter a location!');
                      isValid = false;
                    } else if (!property_value) {
                      setError('');
                      setPropertyError('Please select a property type!');
                      isValid = false;
                    } else if (!propertyDesc) {
                      setPropertyError('');
                      setNotesError('Please enter notes!');
                      isValid = false;
                    } else {
                      setError('');
                      setPropertyError('');
                      setNotesError('');
                    }

                    if (isValid) {
                     propertyid? updatePropertyDetails(): property_details();
                      // props.navigation.navigate('PropertyFeature', {
                      //   location: location,
                      //   property_value: property_value,
                      //   propertyDesc: propertyDesc,
                      //   selectedButtonId: selectedButtonId,
                      //   latitude: latitude,
                      //   longitude: longitude,
                      //   propertyid: propertyid,
                      //   city: city,
                      //   state: state,
                      //   country: country,
                      //   editMode: editMode,
                      // });
                    }
                  }}
                  disabled={isLoading ? true : false}
                />
              </View>

              <TouchableOpacity
                style={PropertyDetailsStyle.goBack_View}
                onPress={() => {
                  goBack();
                }}>
                <View style={PropertyDetailsStyle.backIcon}>
                  <Ionicons
                    name="chevron-back"
                    size={22}
                    color={_COLORS.Kodie_MediumGrayColor}
                  />
                </View>
                <Text style={PropertyDetailsStyle.goBack_Text}>
                  {'Go back'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
