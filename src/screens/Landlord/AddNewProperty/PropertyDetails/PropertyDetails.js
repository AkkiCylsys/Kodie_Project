import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  BackHandler,
  Alert,
} from 'react-native';
import {PropertyDetailsStyle} from './PropertyDetailsStyle';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../services/CommonServices';
import {Dropdown} from 'react-native-element-dropdown';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {IMAGES, LABEL_STYLES} from '../../../../Themes';
import {_COLORS} from '../../../../Themes';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import {Config} from '../../../../Config';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SearchPlaces from '../../../../components/Molecules/SearchPlaces/SearchPlaces';
import MapScreen from '../../../../components/Molecules/GoogleMap/googleMap';
import {SignUpStepStyle} from '../../../Authentication/SignUpScreen/SignUpSteps/SignUpStepsStyle';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { SavePropertyDetailSevices, getPropertyDetailSevice, updatePropertyDetailSevices } from '../../../../services/PropertyModule/PropertyModul';
const stepLabels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
export default PropertyDetails = props => {
  const addPropertySecondStepData = useSelector(
    state => state.AddPropertyStepsReducer.data,
  );
  const propertyid = props?.route?.params?.propertyid;
  const editMode = props?.route?.params?.editMode;
  const [savePropertyId, setSavePropertyId] = useState('');
  console.log('savePropertyId...', savePropertyId);
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
  const [property_Data, setProperty_Data] = useState([]);
  const [property_Detail, setProperty_Details] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [addressComponents, setAddressComponents] = useState([]);
  const [error, setError] = useState('');
  const [notesError, setNotesError] = useState('');
  const [propertyError, setPropertyError] = useState('');
  const loginData = useSelector(state => state.authenticationReducer.data);
  useEffect(() => {
    if (!addressComponents) return;
    function getAddressComponent(addressComponents, type) {
      return addressComponents.find(component => component.types.includes(type))?.long_name || '';
    }
    const selected_city = getAddressComponent(addressComponents, 'locality');
    const selected_state = getAddressComponent(addressComponents, 'administrative_area_level_1');
    const selected_country = getAddressComponent(addressComponents, 'country');
    setCity(selected_city);
    setState(selected_state);
    setCountry(selected_country);
  
  }, [addressComponents]);
  const handleTextInputFocus = () => {
    if (error) {
      setError('');
      setPropertyError('');
      setNotesError('');
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

  useFocusEffect(
    React.useCallback(() => {
      if (savePropertyId || propertyid) {
        DetailsData(); 
      }
    }, [savePropertyId,propertyid]),
  );

  useEffect(() => {
    handleProperty_Type();
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
    setLocation('');
    setProperty_value('');
    setPropertyDesc('');
  }, [propertyid, addPropertySecondStepData]);
  const DetailsData = async () => {
    setIsLoading(true);
    try {
      const details = await getPropertyDetailSevice(savePropertyId || propertyid);
      console.log(details,"detailis");
      setProperty_Details(details);
      setLocation(details?.location);
      setlongitude(details?.longitude);
      setlatitude(details?.latitude);
      setProperty_value(parseInt(details?.property_type_id));
      setCity(details?.city);
      setCountry(details?.country);
      setState(details?.state);
      setPropertyDesc(details?.property_description);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      Alert.alert('Request timed out' ,'The request took too long to complete. Please try again later.')
    } finally {
      setIsLoading(false);
    }
  };
    console.log(property_Detail, 'property_Detail?.key_features');
  const updatePropertyDetails = async() => {
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
      autolist: property_Detail?.auto_list,
      property_id: savePropertyId ? savePropertyId : propertyid,
      p_city: city,
      p_state: state,
      p_country: country,
    };
    console.log('updateData', updateData);
 const response = await updatePropertyDetailSevices(updateData)
 console.log(response,'updateProperty');
        if (response?.success === true) {
          setIsLoading(false);
          props.navigation.navigate('PropertyFeature', {
            location: location,
            property_value: property_value,
            propertyDesc: propertyDesc,
            selectedButtonId: 0,
            latitude: latitude,
            longitude: longitude,
            city: city,
            state: state,
            country: country,
            propertyid:savePropertyId ?savePropertyId: propertyid,
            editMode: editMode,
          });
        } else {
          console.error('update_property_detailserror:', response?.data?.error);
          setIsLoading(false);
        }
      
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
        console.log('json location.......', JSON.stringify(json));
        setAddressComponents(json?.results[0]?.address_components);
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
      console.error('property_type P_PARENT_CODE error:', error);
      setIsLoading(false);
    }
  };

  const handleNote = text => {
    setPropertyDesc(text);
    if (text.trim() === '') {
      setNotesError('Please enter note!');
    } else {
      setNotesError('');
    }
  };
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
    setIsLoading(true); 
    const addPropertyPayload = {
        user: loginData?.Login_details?.user_id,
        user_account_details_id: loginData?.Login_details?.user_account_id,
        location,
        location_longitude: longitude,
        location_latitude: latitude,
        islocation: 1,
        property_description: propertyDesc,
        property_type: property_value > 0 ? property_value : 0,
        key_features: [
            { Bedrooms: 0 },
            { Bathrooms: 0 },
            { 'Reception rooms': 0 },
            { 'Parking / garage spaces': 0 },
            { 'On-street parking': 0 },
        ],
        additional_features: '0,0,0,0',
        additional_key_features: 0,
        autolist: 0,
        UPD_FLOOR_SIZE: 0,
        UPD_LAND_AREA: 0,
        p_city: city,
        p_state: state,
        p_country: country,
    };
    try {
        const response = await SavePropertyDetailSevices(addPropertyPayload);
        if (response?.success) {
            setSavePropertyId(response?.Property_id);
            console.log('Property ID:', response?.Property_id);
            props.navigation.navigate('PropertyFeature', {
                location,
                property_value,
                propertyDesc,
                selectedButtonId: 0,
                latitude,
                longitude,
                city,
                state,
                country,
                editMode,
                propertyid: response?.Property_id,
            });
        } else {
            console.error('Error in property details:', response?.error);
        }
    } catch (error) {
        console.error('Error while saving property details:', error);
    } finally {
        setIsLoading(false);
    }
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
              iscancel={() => setIsMap(false)}
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
              setCurrentLocation(details.formatted_address);
              console.log('locationSearch....', location);
              console.log('details.......', details);
              console.log(city, state, country, 'location rahul..........');
              setAddressComponents(details?.address_components);
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
                  <View
                    style={[
                      PropertyDetailsStyle.locationContainer,
                      {
                        borderColor: error
                          ? _COLORS?.Kodie_redColor
                          : _COLORS?.Kodie_LightGrayColor,
                      },
                    ]}>
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
                    style={[
                      PropertyDetailsStyle.locationIconView,
                      {
                        borderColor: error
                          ? _COLORS?.Kodie_redColor
                          : _COLORS?.Kodie_LightGrayColor,
                      },
                    ]}
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
                  <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
                </Text>
                <Dropdown
                  style={[
                    PropertyDetailsStyle.dropdown,
                    {
                      borderColor: propertyError
                        ? _COLORS?.Kodie_redColor
                        : _COLORS?.Kodie_LightGrayColor,
                    },
                  ]}
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
                  iconColor={_COLORS?.Kodie_BlackColor}
                />
                {propertyError ? (
                  <Text style={PropertyDetailsStyle.errorText}>
                    {propertyError}
                  </Text>
                ) : null}
              </View>
              <View style={PropertyDetailsStyle.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>
                  Notes
                  <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
                </Text>

                <TextInput
                  style={[
                    PropertyDetailsStyle.input,
                    {
                      borderColor: notesError
                        ? _COLORS?.Kodie_redColor
                        : _COLORS?.Kodie_LightGrayColor,
                    },
                  ]}
                  value={propertyDesc}
                  onChangeText={handleNote}
                  placeholder="Add any information about your property"
                  placeholderTextColor={_COLORS?.Kodie_LightGrayColor}
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
                      savePropertyId || propertyid
                        ? updatePropertyDetails()
                        : property_details();
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
