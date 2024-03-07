import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import {Dropdown} from 'react-native-element-dropdown';
import {_COLORS, FONTFAMILY, LABEL_STYLES} from '../../../../../Themes';
import {Divider} from 'react-native-paper';
import {IMAGES} from '../../../../../Themes';
import Octicons from 'react-native-vector-icons/Octicons';
import {Config} from '../../../../../Config';
import ServicesBox from '../../../../../components/Molecules/ServicesBox/ServicesBox';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import axios from 'axios';
import CompanySignupStyle from './CompanySignupStyle';
import SearchPlaces from '../../../../../components/Molecules/SearchPlaces/SearchPlaces';
import MapScreen from '../../../../../components/Molecules/GoogleMap/googleMap';
import Geocoder from 'react-native-geocoding';
const data = [
  {lookup_key: 1, lookup_description: 'Item 1'},
  {lookup_key: 2, lookup_description: 'Item 2'},
  {lookup_key: 3, lookup_description: 'Item 3'},
  {lookup_key: 4, lookup_description: 'Item 4'},
];

const CompanySignup = ({CompanyData}) => {
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [servicesValue, setservicesValue] = useState(0);
  const [businessNumber, SetBusinessNumber] = useState('');
  const [kodieDescribeYourselfData, setKodieDescribeYourselfData] = useState(
    [],
  );
  const [kodieDescribeYourselfId, setKodieDescribeYourselfDataId] =
    useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectJobTypeid, setSelectJobTypeid] = useState('');
  const [selectJobType, setSelectJobType] = useState();
  const [isClick, setIsClick] = useState(false);
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [p_latitude, setP_latitude] = useState('');
  const [p_longitude, setP_longitude] = useState('');
  const [currentLocation, setCurrentLocation] = useState(false);
  const addressParts = physicalAddress.split(', ');

  const country = addressParts.pop();
  const state = addressParts.pop();
  const city = addressParts.join(', ');
  const handleBoxPress = lookup_key => {
    setIsClick(lookup_key);
    setSelectJobTypeid(lookup_key);
    // alert(selectJobTypeid);
    // alert(isClick)
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
            isClick === item.lookup_key
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_GrayColor
          }
          BoxStyling={[
            CompanySignupStyle.box_style,
            {
              backgroundColor:
                isClick === item.lookup_key
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          textColor={[
            CompanySignupStyle.box_Text_Style,
            {
              color:
                isClick === item.lookup_key
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor,
            },
          ]}
          // onPress={() => setIsClick(!isClick)}
          onPress={() => {
            handleBoxPress(item.lookup_key);
            setSelectJobType(item.lookup_key);
            // alert(item.lookup_key);
          }}
        />
      </View>
    );
  };
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
  useEffect(() => {
    CompanyData({
      companyName: companyName,
      businessNumber: businessNumber,
      selectJobType: selectJobTypeid,
      servicesValue: servicesValue,
      website: website,
      p_latitude: p_latitude,
      p_longitude: p_longitude,
    });
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
    Platform.OS == 'ios' ? CheckIOSMapPermission() : checkpermissionlocation();
    handle_describe_yourself();
  }, [
    companyName,
    website,
    businessNumber,
    selectJobTypeid,
    servicesValue,
    currentLocation,
  ]);
  return (
    <View>
      <View style={CompanySignupStyle.card}>
        <View style={CompanySignupStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>{'Organisation name'}</Text>
          <TextInput
            style={CompanySignupStyle.input}
            value={companyName}
            onChangeText={setCompanyName}
            placeholder="Enter the name of your company"
            placeholderTextColor="#999"
          />
          <Text style={CompanySignupStyle.smstext}>
            Your organisation name will be used in emails and SMS correspondence
            from Kodie.
          </Text>
        </View>

        <View style={CompanySignupStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>
            {'Australian business number'}
          </Text>
          <TextInput
            style={[CompanySignupStyle.input]}
            value={businessNumber}
            onChangeText={SetBusinessNumber}
            placeholder="Enter your ABN"
            placeholderTextColor="#999"
          />
        </View>

        {/* <View style={CompanySignupStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>
            {"Company GST / VAT number"}
          </Text>
          <TextInput
            style={[CompanySignupStyle.input]}
            value={companyGSTNumber}
            onChangeText={setCompanyGSTNumber}
            placeholder="1234567890"
            placeholderTextColor="#999"
          />
        </View> */}

        <View>
          <Text style={CompanySignupStyle.want_Heading}>
            {
              'How would you describe yourself? (you can select multiple options)'
            }
          </Text>
          <FlatList
            data={kodieDescribeYourselfData}
            renderItem={jobType_render}
            keyExtractor={item => item.lookup_key.toString()}
            numColumns={2}
          />
        </View>
        <View style={CompanySignupStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>
            {'The type of service you perform'}
          </Text>
          <Dropdown
            style={CompanySignupStyle.dropdown}
            placeholderStyle={CompanySignupStyle.placeholderStyle}
            selectedTextStyle={CompanySignupStyle.selectedTextStyle}
            inputSearchStyle={CompanySignupStyle.inputSearchStyle}
            iconStyle={CompanySignupStyle.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="lookup_description"
            valueField="lookup_key"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={servicesValue}
            onChange={item => {
              setservicesValue(item.lookup_key);
              // You can perform any additional actions here based on the selected item
            }}
          />
        </View>
        <View style={CompanySignupStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>
            {'Company physical address'}
          </Text>

          <View style={CompanySignupStyle.inputContainer}>
            <View style={CompanySignupStyle.locationConView}>
              <View style={CompanySignupStyle.locationContainer}>
                <TextInput
                  style={CompanySignupStyle.locationInput}
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
                style={CompanySignupStyle.locationIconView}
                onPress={() => {
                  // props.navigation.navigate("Location");
                  Platform.OS == 'ios'
                    ? CheckIOSMapPermission
                    : checkpermissionlocation();
                  setIsMap(true);
                }}>
                <Octicons
                  name={'location'}
                  size={22}
                  color={_COLORS.Kodie_GreenColor}
                  style={CompanySignupStyle.locationIcon}
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

        <View style={CompanySignupStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>{'Website'}</Text>
          <TextInput
            style={CompanySignupStyle.input}
            value={website}
            onChangeText={setWebsite}
            placeholder="Enter your website address (if you have one)"
            placeholderTextColor={_COLORS.Kodie_LightGrayColor}
          />
        </View>
      </View>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default CompanySignup;
