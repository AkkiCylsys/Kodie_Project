import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {IMAGES} from '../../../../Themes';
import SearchBar from '../../../../components/Molecules/SearchBar/SearchBar';
import {FONTFAMILY, _COLORS} from '../../../../Themes';
import {PropertyList2Css} from './PropertyList2Css';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import {SignupLookupDetails} from '../../../../APIs/AllApi';
import RangeSlider from '../../../../components/Molecules/RangeSlider/RangeSlider';
import {Config} from '../../../../Config';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import MapScreen from '../../../../components/Molecules/GoogleMap/googleMap';
import SearchPlaces from '../../../../components/Molecules/SearchPlaces/SearchPlaces';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import axios from 'axios';
import {useIsFocused, useNavigation} from '@react-navigation/native';
const data = [
  {label: 'Bharat', value: '1'},
  {label: 'Australia', value: '2'},
  {label: 'America', value: '3'},
];
const AdditionalKeyFeatures = [
  {label: 'Pool', value: '1'},
  {label: 'Garage', value: '2'},
  {label: 'Balcony', value: '3'},
  {label: 'Ensuite', value: '4'},
  {label: 'Dishwasher', value: '5'},
  {label: 'Study', value: '6'},
  {label: 'Built in robes', value: '7'},
  {label: 'Climate Control & energy', value: '8'},
  {label: 'Air conditioning', value: '8'},
  {label: 'Solar panels', value: '8'},
  {label: 'Heating', value: '8'},
  {label: 'High energy efficiency', value: '8'},
];
const PropertyList2 = props => {
  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [proteryTypeData, setProteryTypeData] = useState([]);
  const [proteryTypeValue, setProteryTypeValue] = useState("");
  const [proteryTypeValueError, setProteryTypeValueError] = useState(false);
  const [additionalfeatureskey, setAdditionalfeatureskey] = useState([]);
  const [additionalfeatureskeyvalue, setAdditionalFeaturesKeyValue] = useState(
    [],
  );
  const [selectedButtonFurnished, setSelectedButtonFurnished] = useState(false);
  const [selectedButtonFurnishedId, setSelectedButtonFurnishedId] =
    useState(67);
  const [selectPetFriendlyBtn, setSelectPetFriendlyBtn] = useState(false);
  const [selectPetFriendlyBtnId, setSelectPetFriendlyBtnId] = useState(0);
  const [secureByDepositBtn, setSecureByDepositBtn] = useState(false);
  const [secureByDepositBtnId, setSecureByDepositBtnId] = useState(0);
  const [priceRanges, setPriceRanges] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [CountBedroom, setCountBedroom] = useState(0);
  const [CountBathroom, setCountBathroom] = useState(0);
  const [CountParking, setCountParking] = useState(0);
  const [CountParkingStreet, setCountParkingStreet] = useState(0);
  const [location, setLocation] = useState('');
  const [locationError, setLocationError] = useState('');
  const [UserCurrentCity, setUserCurrentCity] = useState('');
  const [UserZip_Code, setUserZip_Code] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [keyFeature, setKeyFeature] = useState('');
  const isFocus = useIsFocused();
  const navigation = useNavigation();
  const addressParts = location ? location.split(', ') : [];
  const country = addressParts.pop();
  const state = addressParts.pop();
  const city = addressParts.join(', ');

  console.log('city....', city);
  console.log('country....', country);
  console.log('state....', state);
  useEffect(() => {
    handle_property_Type();
    additional_key_features();
  }, [isFocus]);
  // const goBack = () => {
  //   navigation.pop();
  // };
  // props.backHandleData(
  //   IsMap ? setIsMap(false) : IsSearch ? setIsSearch(false) : goBack(),
  // );
  const dataToSend = {
    input_Location: location,
    input_PropertyType: proteryTypeValue,
    input_minRange: min,
    input_maxRange: max,
    input_KeyFeature: AllCountsData,
    input_Fur_unFurnished: selectedButtonFurnishedId,
    input_petFrendly: selectPetFriendlyBtnId,
    input_secureDeposit: secureByDepositBtnId,
    input_addtional_keyFeature: additionalfeatureskeyvalue,
    city: city,
  };
  console.log('AllCountsData....', AllCountsData);
  // ...Location
  const ConfirmAddress = () => {
    setIsMap(false);
    // setLocation(currentLocation);
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
    setLocationError('');
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
        console.log('UserCurrentCity....', UserCurrentCity);
        setUserZip_Code(json.results[1]?.address_components[6]?.long_name);
        // setLocation(MainFullAddress);
        console.log('mainFullAddress....', MainFullAddress);
      })
      .catch(error => console.warn(error));
  };

  const handlePriceRangeChange = priceRange => {
    console.log('Price Range in Parent Component:', priceRange);
    setPriceRanges(priceRange);
    // Do something with the price range in the parent component
  };
  const handlemaxRange = high => {
    console.log('High Range in Parent Component:', high);
    setMax(high);
  };
  const handleminRange = low => {
    console.log('Low Range in Parent Component:', low);
    setMin(low);
  };

  // renderItem....
  const additional_key_feature_render = item => {
    return (
      <View style={PropertyList2Css.item}>
        <Text
          style={[
            PropertyList2Css.selectedTextStyle,
            {color: _COLORS.Kodie_BlackColor},
          ]}>
          {item.features_name}
        </Text>
        <AntDesign
          style={PropertyList2Css.icon}
          color={_COLORS.Kodie_BlackColor}
          name="check"
          size={20}
        />
      </View>
    );
  };
  // Api intrigation....
  const handle_property_Type = async () => {
    setIsLoading(true);
    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'PROP_TYPE',
      P_TYPE: 'OPTION',
    });
    console.log('handle_property_Type', res);
    setProteryTypeData(res?.lookup_details);
    setIsLoading(false);
  };

  const additional_key_features = () => {
    const url = Config.BASE_URL;
    const additionalApi = url + 'get_key_features';
    console.log('Request URL:', additionalApi);
    setIsLoading(true);
    axios
      .get(additionalApi)
      .then(response => {
        console.log('additional_Data', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);
          console.log('additional key_features....', response?.data);
          setAdditionalfeatureskey(response?.data?.key_features_details);
          console.log(
            'AdditionalFeaturesKey....',
            response?.data?.key_features_details,
          );
        } else {
          console.error('additional_features_error:', response?.data?.error);
          // alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('additional_features error:', error);
        // alert(error);
        setIsLoading(false);
      });
  };
  // Validation ...
  const handleLocation = text => {
    if (text === '') {
      setLocationError('Location is require.');
    } else {
      setLocationError('');
    }
    setLocation(text);
  };

  const handleSearchForRental = () => {
    if (location == '') {
      setLocationError('Location is requireb.');
    } else if (proteryTypeValue == '') {
      setProteryTypeValueError(true);
    } else {
      searchForRental();
    }
  };

  const searchForRental = () => {
    const url = Config.BASE_URL;
    const serchForrental_url = url + 'Search_For_Rental';
    console.log('Request URL:', serchForrental_url);
    setIsLoading(true);
    const searchForrental_Data = {
      location: location,
      location_longitude: longitude,
      location_latitude: latitude,
      property_type: proteryTypeValue,
      min_price: max,
      max_price: min,
      bedrooms: CountBedroom,
      bathrooms: CountBathroom,
      carspaces: CountParking,
      on_street_parking: CountParkingStreet,
      furn_unfurn: selectedButtonFurnishedId,
      pet_friendly: selectPetFriendlyBtnId,
    };
    console.log('request Data search for rental.. ', searchForrental_Data);
    axios
      .post(serchForrental_url, searchForrental_Data)
      .then(response => {
        console.log('API Response searchForRental..', response?.data);
        if (response?.data?.success === true) {
          navigation.navigate('SearchResult', {
            searchRentalResponse: response?.data,
            searchInputData: dataToSend,
            AllCountsData: AllCountsData,
          });
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed searchForRental', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const AllCountsData = [
    {Bedrooms: CountBedroom},
    {Bathrooms: CountBathroom},
    {Parking_Space: CountParking},
    {StreetParking: CountParkingStreet},
  ];
  console.log('AllCountsData....', AllCountsData);
  const increaseBedroomCount = () => {
    setCountBedroom(prevCount => prevCount + 1);
  };
  const decreaseBedroomCount = () => {
    if (CountBedroom > 0) {
      setCountBedroom(prevCount => prevCount - 1);
    }
  };
  const increaseBathroomCount = () => {
    setCountBathroom(prevCount => prevCount + 1);
  };
  const decreaseBathroomCount = () => {
    if (CountBathroom > 0) {
      setCountBathroom(prevCount => prevCount - 1);
    }
  };
  const increaseParkingStreetCount = () => {
    setCountParkingStreet(prevCount => prevCount + 1);
  };
  const decreaseParkingStreetCount = () => {
    if (CountParkingStreet > 0) {
      setCountParkingStreet(prevCount => prevCount - 1);
    }
  };
  const increaseParkingCount = () => {
    setCountParking(prevCount => prevCount + 1);
  };
  const decreaseParkingCount = () => {
    if (CountParking > 0) {
      setCountParking(prevCount => prevCount - 1);
    }
  };
  return (
    <>
      {IsMap ? (
        <View
          style={{
            flex: 1,
            // paddingHorizontal: 10,
            backgroundColor: 'transparent',
          }}>
          <MapScreen
            style={{
              height: '100%',
              width: '100%',
              // borderRadius: 20,
              // borderWidth: 1,
              //borderColor: .greenAppColor,
              alignSelf: 'center',
              marginBottom: 10,
            }}
            onRegionChange={onRegionChange}
            // onRegionChangeComplete={onRegionChangeComplete}
            Maplat={latitude}
            Maplng={longitude}
            // Maplat={getLat}
            // Maplng={getLong}
          />
          {/* <MapComponent/> */}
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
                //marginTop: 10,
              }}
              onFocus={() => openMapandClose()}
              placeholder={'Search Place'}
              placeholderTextColor={_COLORS.Kodie_BlackColor}
            />
          </View>
          <TouchableOpacity
            style={PropertyList2Css.BtnContainer}
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
        <ScrollView contentContainerStyle={PropertyList2Css.scrollViewStl}>
          <View style={PropertyList2Css.Container}>
            <View style={[PropertyList2Css.locationConView, {marginTop: 10}]}>
              <View style={PropertyList2Css.locationContainer}>
                <TextInput
                  style={PropertyList2Css.locationInput}
                  value={location}
                  onChangeText={handleLocation}
                  onFocus={() => {
                    setIsSearch(true);
                    handleLocation();
                  }}
                  placeholder="Search location"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>
              <TouchableOpacity
                style={PropertyList2Css.locationIconView}
                onPress={() => {
                  setIsMap(true);
                }}>
                <Octicons
                  name={'location'}
                  size={22}
                  color={_COLORS.Kodie_GreenColor}
                  style={PropertyList2Css.locationIcon}
                />
              </TouchableOpacity>
            </View>
            {locationError ? (
              <Text style={PropertyList2Css.error_text}>{locationError}</Text>
            ) : null}
            <Text style={PropertyList2Css.inputText}>Property Type:</Text>
            <Dropdown
              style={PropertyList2Css.dropdown}
              placeholderStyle={PropertyList2Css.placeholderStyle}
              selectedTextStyle={PropertyList2Css.selectedTextStyle}
              inputSearchStyle={PropertyList2Css.inputSearchStyle}
              iconStyle={PropertyList2Css.iconStyle}
              data={proteryTypeData}
              search
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="Apartment"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setProteryTypeValue(item.lookup_key);
                setProteryTypeValueError(false);
              }}
            />
            {proteryTypeValueError ? (
              <Text style={PropertyList2Css.error_text}>
                {'Property type is require.'}
              </Text>
            ) : null}
            <View style={PropertyList2Css.rowView}>
              <Text style={PropertyList2Css.inputText}>Min Price:</Text>
              <Text style={PropertyList2Css.inputText}>Max Price:</Text>
            </View>
            <RangeSlider
              from={1}
              to={5000}
              onPriceRangeChange={handlePriceRangeChange}
              onHighRange={handlemaxRange}
              onLowRange={handleminRange}
              onLowrange={2}
            />
            <View>
              <View style={PropertyList2Css.mainfeaturesview}>
                <View style={PropertyList2Css.key_feature_Text_view}>
                  <Text style={PropertyList2Css.key_feature_Text}>
                    {'Bedrooms'}
                  </Text>
                </View>

                <TouchableOpacity style={PropertyList2Css.plus_minusview}>
                  <TouchableOpacity
                    style={PropertyList2Css.menusIconView}
                    onPress={decreaseBedroomCount}>
                    <AntDesign
                      name="minus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                  <Text style={PropertyList2Css.countdata}>{CountBedroom}</Text>
                  <TouchableOpacity
                    style={PropertyList2Css.menusIconView}
                    onPress={() => {
                      increaseBedroomCount();
                    }}>
                    <AntDesign
                      name="plus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              <View style={PropertyList2Css.mainfeaturesview}>
                <View style={PropertyList2Css.key_feature_Text_view}>
                  <Text style={PropertyList2Css.key_feature_Text}>
                    {'Bathrooms'}
                  </Text>
                </View>

                <TouchableOpacity style={PropertyList2Css.plus_minusview}>
                  <TouchableOpacity
                    style={PropertyList2Css.menusIconView}
                    onPress={decreaseBathroomCount}>
                    <AntDesign
                      name="minus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                  <Text style={PropertyList2Css.countdata}>
                    {CountBathroom}
                  </Text>
                  <TouchableOpacity
                    style={PropertyList2Css.menusIconView}
                    onPress={increaseBathroomCount}>
                    <AntDesign
                      name="plus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              <View style={PropertyList2Css.mainfeaturesview}>
                <View style={PropertyList2Css.key_feature_Text_view}>
                  <Text style={PropertyList2Css.key_feature_Text}>
                    {'Parking spaces'}
                  </Text>
                </View>

                <TouchableOpacity style={PropertyList2Css.plus_minusview}>
                  <TouchableOpacity
                    style={PropertyList2Css.menusIconView}
                    onPress={decreaseParkingCount}>
                    <AntDesign
                      name="minus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                  <Text style={PropertyList2Css.countdata}>{CountParking}</Text>
                  <TouchableOpacity
                    style={PropertyList2Css.menusIconView}
                    onPress={increaseParkingCount}>
                    <AntDesign
                      name="plus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              <View style={PropertyList2Css.mainfeaturesview}>
                <View style={PropertyList2Css.key_feature_Text_view}>
                  <Text style={PropertyList2Css.key_feature_Text}>
                    {'On-street parking'}
                  </Text>
                </View>

                <TouchableOpacity style={PropertyList2Css.plus_minusview}>
                  <TouchableOpacity
                    style={PropertyList2Css.menusIconView}
                    onPress={decreaseParkingStreetCount}>
                    <AntDesign
                      name="minus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                  <Text style={PropertyList2Css.countdata}>
                    {CountParkingStreet}
                  </Text>
                  <TouchableOpacity
                    style={PropertyList2Css.menusIconView}
                    onPress={increaseParkingStreetCount}>
                    <AntDesign
                      name="plus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={[PropertyList2Css.inputText, {marginVertical: 23}]}>
              {'Additional features'}
            </Text>
            <Text style={PropertyList2Css.inputText}>
              {'Furnished or unfurnished? '}
            </Text>
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
              }}
            />
            <Text style={PropertyList2Css.inputText}>{'Pet friendly?'}</Text>
            <RowButtons
              LeftButtonText={'Yes'}
              leftButtonbackgroundColor={
                !selectPetFriendlyBtn
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selectPetFriendlyBtn
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selectPetFriendlyBtn
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelectPetFriendlyBtn(false);
                setSelectPetFriendlyBtnId(0);
              }}
              RightButtonText={'No'}
              RightButtonbackgroundColor={
                selectPetFriendlyBtn
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selectPetFriendlyBtn
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selectPetFriendlyBtn
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressRightButton={() => {
                setSelectPetFriendlyBtn(true);
                setSelectPetFriendlyBtnId(1);
              }}
            />
            <Text style={PropertyList2Css.inputText}>
              {'Exclude properties secured by deposit?'}
            </Text>
            <RowButtons
              LeftButtonText={'Yes'}
              leftButtonbackgroundColor={
                !secureByDepositBtn
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !secureByDepositBtn
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !secureByDepositBtn
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSecureByDepositBtn(false);
                setSecureByDepositBtnId(0);
                // alert(selectPetFriendlyBtnId)
              }}
              RightButtonText={'No'}
              RightButtonbackgroundColor={
                secureByDepositBtn
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                secureByDepositBtn
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                secureByDepositBtn
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressRightButton={() => {
                setSecureByDepositBtn(true);
                setSecureByDepositBtnId(1);
                // alert(selectPetFriendlyBtnId)
              }}
            />
            <Text style={PropertyList2Css.inputText}>
              {'Additional key features'}
            </Text>
            <MultiSelect
              style={PropertyList2Css.dropdown}
              placeholderStyle={PropertyList2Css.placeholderStyle}
              selectedTextStyle={PropertyList2Css.selectedTextStyle}
              inputSearchStyle={PropertyList2Css.inputSearchStyle}
              iconStyle={PropertyList2Css.iconStyle}
              data={additionalfeatureskey}
              labelField="features_name"
              valueField="paf_key"
              placeholder="Search features "
              activeColor={_COLORS.Kodie_MidLightGreenColor}
              value={additionalfeatureskeyvalue}
              search
              searchPlaceholder="Search..."
              onChange={item => {
                setAdditionalFeaturesKeyValue(item);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={PropertyList2Css.icon}
                  color={_COLORS.Kodie_GrayColor}
                  name="search1"
                  size={20}
                />
              )}
              renderRightIcon={() => <></>}
              renderItem={additional_key_feature_render}
              renderSelectedItem={(item, unSelect) => (
                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View style={PropertyList2Css.selectedStyle}>
                    <Text style={PropertyList2Css.textSelectedStyle}>
                      {item.features_name}
                    </Text>
                    <AntDesign
                      color={_COLORS.Kodie_WhiteColor}
                      name="close"
                      size={15}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
            <CustomSingleButton
              _ButtonText={'Search'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              backgroundColor={_COLORS.Kodie_BlackColor}
              onPress={() => {
                handleSearchForRental();
                // navigation.navigate('ViewRentalDetails');
              }}
              disabled={isLoading ? true : false}
            />
          </View>
        </ScrollView>
      )}
      {isLoading ? <CommonLoader /> : null}
    </>
  );
};
export default PropertyList2;
