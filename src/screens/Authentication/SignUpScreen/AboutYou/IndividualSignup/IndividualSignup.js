import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Platform,
  BackHandler,
  PermissionsAndroid,
} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {_COLORS, LABEL_STYLES, FONTFAMILY} from '../../../../../Themes';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Config} from '../../../../../Config';
import ServicesBox from '../../../../../components/Molecules/ServicesBox/ServicesBox';
import IndividualSignupStyle from './IndividualSignupStyle';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
const IndividualSignup = ({IndividualData, props}) => {
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [servicesValue, setservicesValue] = useState([]);
  const [kodieDescribeYourselfData, setKodieDescribeYourselfData] = useState(
    [],
  );
  const [kodieDescribeYourselfId, setKodieDescribeYourselfDataId] =
    useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectJobTypeid, setSelectJobTypeid] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  const [selectJobType, setSelectJobType] = useState([]);
  const [isClick, setIsClick] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [arrowIcon, setArrowIcon] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(false);
  const [UserCurrentCity, setUserCurrentCity] = useState('');
  const [UserZip_Code, setUserZip_Code] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [p_latitude, setP_latitude] = useState('');
  const [p_longitude, setP_longitude] = useState('');
  const [toSet, setToSet] = useState({});
  // const handleBoxPress = lookup_key => {
  //   setIsClick(lookup_key);
  //   setSelectJobTypeid(lookup_key);
  // };
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
  const toggleSelection = lookup_key => {
    if (selectJobTypeid.includes(lookup_key)) {
      setSelectJobTypeid(prevSelected =>
        prevSelected.filter(item => item !== lookup_key),
      );
    } else {
      setSelectJobTypeid(prevSelected => [...prevSelected, lookup_key]);
    }
  };
  const jobType_render = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <ServicesBox
          images
          Services_Name={item.lookup_description}
          // Services_Icon={item.lookup_key ? IMAGES.cleaner : IMAGES.lightCleaner}
          Services_Icon={
            item.lookup_key === 166
              ? 'cleaning-services'
              : item.lookup_key === 167
              ? 'mower-bag'
              : item.lookup_key === 168
              ? 'forklift'
              : item.lookup_key === 169
              ? 'tools'
              : 'MaterialIcons'
          }
          iconLibrary={
            item.lookup_key === 166
              ? 'MaterialIcons'
              : item.lookup_key === 167
              ? 'MaterialCommunityIcons'
              : item.lookup_key === 168
              ? 'MaterialCommunityIcons'
              : item.lookup_key === 169
              ? 'Entypo'
              : 'MaterialIcons'
          }
          iconColor={
            // isClick === item.lookup_key
            selectJobTypeid.includes(item.lookup_key)
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_GrayColor
          }
          BoxStyling={[
            IndividualSignupStyle.box_style,
            {
              backgroundColor:
                // isClick === item.lookup_key
                selectJobTypeid.includes(item.lookup_key)
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          textColor={[
            IndividualSignupStyle.box_Text_Style,
            {
              color:
                // isClick === item.lookup_key
                selectJobTypeid.includes(item.lookup_key)
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor,
            },
          ]}
          // onPress={() => setIsClick(!isClick)}
          onPress={() => {
            toggleSelection(item.lookup_key);
            setSelectJobType(item.lookup_key);
            // alert(item.lookup_key);
          }}
        />
      </View>
    );
  };
  const selectedselectJobTypesString = selectJobTypeid.join(',');
  console.log(selectedselectJobTypesString, 'selectedselectJobTypesString');

  // describe your self.....
  const handle_describe_yourself = () => {
    const describe_yourself_Data = {
      P_PARENT_CODE: 'JOB_TYPE',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const describeYourselfApi = url + 'lookup_details';
    console.log('Request URL:', describeYourselfApi);
    setIsLoading(true);
    axios
      .post(describeYourselfApi, describe_yourself_Data)
      .then(response => {
        console.log('kodie_describeYouself_Data', response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log(
            'kodie_describeYouself_Data....',
            response.data.lookup_details,
          );
          setKodieDescribeYourselfData(response.data.lookup_details);
        } else {
          console.error(
            'kodie_describeYouself_Data_error:',
            response.data.error,
          );
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('kodie_describeYouself_Data error:', error);
        alert(error);
        setIsLoading(false);
      });
  };
  const handleServices = selectJobType => {
    const jobTypes = selectedselectJobTypesString.split(',').map(Number);
    console.log(jobTypes, 'klhfudssdkjfhdsjk');
    const servicesDatas = [];

    setIsLoading(true);

    const fetchServiceData = async jobType => {
      const propertyData = {
        P_PARENT_CODE:
          jobType === 166
            ? 'HOME_CLEANING'
            : jobType === 167
            ? 'OUTDOOR_CLEANING'
            : jobType === 168
            ? 'HEAVY_LIFTING'
            : jobType === 169
            ? 'FIXING_AND_MAINTENANCE'
            : null,
        P_TYPE: 'OPTION',
      };

      const url = Config.BASE_URL;
      const propertyType = url + 'lookup_details';

      try {
        const response = await axios.post(propertyType, propertyData);

        if (response.data.status === true) {
          servicesDatas.push(...response.data.lookup_details);
        } else {
          console.error('Services_error:', response.data.error);
          alert(response.data.error);
        }
      } catch (error) {
        console.error('Services error:', error);
        // alert(error);
      }
    };

    const fetchAllServices = async () => {
      try {
        const promises = jobTypes.map(jobType => fetchServiceData(jobType));
        await Promise.all(promises);

        setIsLoading(false);
        console.log('All Services Data:', servicesDatas);
        setServicesData(servicesDatas);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching services:', error);
      }
    };

    fetchAllServices();
  };

  useEffect(() => {
    IndividualData({
      website: website,
      selectJobType: selectedselectJobTypesString,
      servicesValue: servicesValue,
      p_latitude: p_latitude,
      p_longitude: p_longitude,
    });
    // console.log('About Data in IndividualSignup:', IndividualData);

    handle_describe_yourself();
    if (selectJobType !== null) {
      handleServices(selectJobType);
    }
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
    Platform.OS == 'ios' ? CheckIOSMapPermission() : checkpermissionlocation();
  }, [
    selectJobType,
    currentLocation,
    website,
    selectJobTypeid,
    servicesValue,
    p_latitude,
    p_longitude,
  ]);
  const lookingServices_render = item => {
    console.log(item, 'ithjhgbjbjbn');
    return (
      <View contentContainerStyle={{flex: 1, height: '100%'}}>
        <View
          style={[
            IndividualSignupStyle.itemView,
            {
              backgroundColor: item === servicesValue ? 'red' : null,
            },
          ]}>
          {item.isChecked ? (
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
          <Text style={IndividualSignupStyle.textItem}>
            {item.lookup_description}
          </Text>
        </View>
      </View>
    );
  };
  const handleChecked = () => {
    setIsChecked(!isChecked);
  };
  const checkpermissionlocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        // alert("You can use the location");
        fetchCurrentLocation();
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const CheckIOSMapPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            fetchCurrentLocation();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const fetchCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('This is your current location.');
        const {latitude, longitude} = position.coords;
        console.log('position.coords....', position.coords);
        setP_latitude(latitude);
        setP_longitude(longitude);
        getAddress(latitude, longitude);
      },
      error => {
        console.error('Error fetching location:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  const getAddress = (p_latitude, p_longitude) => {
    Geocoder.from(p_latitude, p_longitude)
      .then(json => {
        console.log('json location.......', json);
        console.log('current address...', json.results[0].formatted_address);
        currentLocation
          ? setPhysicalAddress(json.results[0].formatted_address)
          : null;
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
        // alert(addressComponent2)
        setUserCurrentCity(addressComponent2.long_name);
        setUserZip_Code(json.results[1]?.address_components[6]?.long_name);
        setPhysicalAddress(MainFullAddress);
        console.log('physicalAddress....', physicalAddress);

        //setAddress(MainFullAddress);
      })
      .catch(error => console.warn(error));
  };
  const ConfirmAddress = () => {
    setIsMap(false);
    setCurrentLocation(true);
  };
  const openMapandClose = text => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = Region => {
    // alert(JSON.stringify(Region))
    setP_latitude(Region.latitude);
    console.log('p_latitude...', p_latitude);
    setP_longitude(Region.longitude);
    console.log('p_longitude...', p_longitude);
    getAddress(Region.latitude, Region.longitude);
    getAddress();
  };
  console.log(servicesData, 'servicesData...............');
  return (
    <View>
      <View style={IndividualSignupStyle.card}>
        <View>
          <Text style={IndividualSignupStyle.want_Heading}>
            {
              'The category of service you offer (you can select multiple options)'
            }
          </Text>
          <FlatList
            data={kodieDescribeYourselfData}
            renderItem={jobType_render}
            keyExtractor={item => item.lookup_key.toString()}
            numColumns={2}
          />
        </View>
        {selectedselectJobTypesString == '' ? null : (
          <View style={IndividualSignupStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {'The type of service you perform'}
            </Text>
            <MultiSelect
              style={[
                IndividualSignupStyle.dropdown,
                // {
                //   backgroundColor: _COLORS.Kodie_LightGrayLineColor,
                // },
              ]}
              placeholderStyle={IndividualSignupStyle.placeholderStyle}
              selectedTextStyle={IndividualSignupStyle.selectedTextStyle}
              inputSearchStyle={IndividualSignupStyle.inputSearchStyle}
              iconStyle={IndividualSignupStyle.iconStyle}
              search
              data={servicesData}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={servicesValue}
              onChange={selectedItems => {
                setservicesValue(selectedItems);
              }}
              selectedStyle={{
                // flex: 1,
                backgroundColor: _COLORS.Kodie_BlackColor,
                borderRadius: 20,
                alignSelf: 'center',
              }}
              // renderItem={lookingServices_render}
            />
            {/* <Dropdown
    style={[
      IndividualSignupStyle.dropdown,
      {
        backgroundColor: isClick
          ? null
          : _COLORS.Kodie_LightGrayLineColor,
      },
    ]}
    placeholderStyle={IndividualSignupStyle.placeholderStyle}
    selectedTextStyle={IndividualSignupStyle.selectedTextStyle}
    inputSearchStyle={IndividualSignupStyle.inputSearchStyle}
    iconStyle={IndividualSignupStyle.iconStyle}
    data={servicesData}
    search
    maxHeight={300}
    labelField="lookup_description"
    valueField="lookup_key"
    placeholder="Select item"
    value={servicesValue}
    disable={selectedselectJobTypesString ? false : true}
    searchPlaceholder="Search..."
    onChange={item => {
      setservicesValue(item.lookup_key);
    }}
    renderItem={lookingServices_render}
  /> */}
          </View>
        )}

        <View style={IndividualSignupStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>
            {'Company / professional physical address'}
          </Text>

          <View style={IndividualSignupStyle.inputContainer}>
            <View style={IndividualSignupStyle.chekboxview}>
              <TouchableOpacity onPress={handleChecked}>
                {/* {isChecked ? ( */}
                <MaterialIcons
                  name={!isChecked ? 'check-box-outline-blank' : 'check-box'}
                  size={24}
                  color={
                    !isChecked
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_GreenColor
                  }
                  style={IndividualSignupStyle.Check_Icon}
                />
                {/* ) : null} */}
              </TouchableOpacity>

              <Text style={IndividualSignupStyle.commonaddresstext}>
                {'Same as personal physical address'}
              </Text>
            </View>
            <View style={IndividualSignupStyle.locationConView}>
              <View style={IndividualSignupStyle.locationContainer}>
                <TextInput
                  style={IndividualSignupStyle.locationInput}
                  value={location}
                  onChangeText={setLocation}
                  onFocus={() => {
                    setIsSearch(true);
                    // setlocationError("");
                  }}
                  placeholder="Search location"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>
              <TouchableOpacity
                style={IndividualSignupStyle.locationIconView}
                onPress={() => {
                  // props.navigation.navigate("Location");
                  Platform.OS == 'ios'
                    ? CheckIOSMapPermission
                    : checkpermissionlocation();
                  setIsMap(true);
                  console.log('IsMap....', IsMap);
                  props?.openMapCom(IsMap);
                }}>
                <Octicons
                  name={'location'}
                  size={22}
                  color={_COLORS.Kodie_GreenColor}
                  style={IndividualSignupStyle.locationIcon}
                />
              </TouchableOpacity>
            </View>
            {/* {locationError ? (
                  <Text style={PropertyDetailsStyle.error_text}>
                    {locationError}
                  </Text>
                ) : null} */}
          </View>
        </View>

        <View style={IndividualSignupStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>{'Website'}</Text>
          <TextInput
            style={IndividualSignupStyle.input}
            value={website}
            onChangeText={setWebsite}
            // onChangeText={() => {
            //   setWebsite();
            //   props.website(website);
            // }}
            placeholder="Enter your website address (if you have one)"
            placeholderTextColor={_COLORS.Kodie_LightGrayColor}
          />
        </View>
      </View>
    </View>
  );
};

export default IndividualSignup;
