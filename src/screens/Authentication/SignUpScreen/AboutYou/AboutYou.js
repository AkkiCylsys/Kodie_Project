//ScreenNo:11
//ScreenNo:12
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  BackHandler,
  TextInput,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {AboutYouStyle} from './AboutYouStyle';
import ServicesBox from '../../../../components/Molecules/ServicesBox/ServicesBox';
import {IMAGES, _COLORS} from '../../../../Themes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../services/CommonServices';
import {Config} from '../../../../Config';
import axios from 'axios';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {launchImageLibrary} from 'react-native-image-picker';
import IndividualSignup from './IndividualSignup/IndividualSignup';
import CompanySignup from './CompanySignup/CompanySignup';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import MapScreen from '../../../../components/Molecules/GoogleMap/googleMap';
import SearchPlaces from '../../../../components/Molecules/SearchPlaces/SearchPlaces';
import {FirstPropertyStyle} from '../FirstProperty/FirstPropertyStyle';
import {SignupLookupDetails} from '../../../../APIs/AllApi';
const labels = ['Step 1', 'Step 2', 'Step 3'];
const firstIndicatorSignUpStepStyle = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: _COLORS.Kodie_GrayColor,
  separatorUnFinishedColor: _COLORS.Kodie_GrayColor,
  stepIndicatorFinishedColor: _COLORS.Kodie_GreenColor,
  stepIndicatorUnFinishedColor: _COLORS.Kodie_GrayColor,
  stepIndicatorCurrentColor: _COLORS.Kodie_GreenColor,
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: _COLORS.Kodie_BlackColor,
  stepIndicatorLabelFinishedColor: _COLORS.Kodie_BlackColor,
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: _COLORS.Kodie_BlackColor,
  labelSize: 14,
  labelAlign: 'center',
};

const getStepIndicatorIconConfig = ({position, stepStatus}) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? '#ffffff' : '#ffffff',
    size: 20,
  };
  iconConfig.name = stepStatus === 'finished' ? 'check' : null;
  return iconConfig;
};

export default AboutYou = props => {
  let firstName = props?.route?.params?.firstName;
  let lastName = props?.route?.params?.lastName;
  let mobileNumber = props?.route?.params?.mobileNumber;
  let physicalAddress = props?.route?.params?.physicalAddress;
  let organisation = props?.route?.params?.organisation;
  let referral = props?.route?.params?.referral;
  let email = props?.route?.params?.email;
  let country = props?.route?.params?.country;
  let state = props?.route?.params?.state;
  let city = props?.route?.params?.city;
  let p_latitude = props?.route?.params?.p_latitude;
  let p_longitude = props?.route?.params?.p_longitude;
  let user_key = props?.route?.params?.user_key;
  let image = props?.route?.params?.image;
  let Bio = props?.route?.params?.Bio;
  let country_code = props?.route?.params?.country_code;
  console.log('firstname..', firstName);
  console.log('lastName..', lastName);
  console.log('mobileNumber..', mobileNumber);
  console.log('physicalAddress..', physicalAddress);
  console.log('organisation..', organisation);
  console.log('referral..', referral);
  console.log('email..', email);
  console.log('country..', country);
  console.log('state..', state);
  console.log('city..', city);
  console.log('p_latitude..', p_latitude);
  console.log('p_longitude..', p_longitude);
  console.log('user_key_a..', user_key);
  console.log('image', image);
  console.log('Bio..', Bio);
  console.log('country_code...About_You', country_code);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setIsClick] = useState(null);
  const [selectManageProperty, setSelectManageProperty] = useState('');
  const [selected, setSelected] = useState([]);
  const [kodiehelpData, setKodiehelpData] = useState([]);
  const [kodieDescribeYourselfData, setKodieDescribeYourselfData] = useState(
    [],
  );
  const [kodieDescribeYourselfId, setKodieDescribeYourselfDataId] =
    useState('');
  const [manage_property_Data, setmanage_property_Data] = useState([]);
  const [ImageName, setImageName] = useState('');
  const [kodiehelplookupid, setKodiehelplookupid] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedLookupKeys, setSelectedLookupKeys] = useState([]); // State to store selected lookup keys
  const [Individual, setIndividual] = useState({});
  const [CompanyCome, setCompanyCome] = useState({});
  const [UserCurrentCity, setUserCurrentCity] = useState('');
  const [UserZip_Code, setUserZip_Code] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [location, setLocation] = useState('');
  const [Companylatitude, setCompanylatitude] = useState('');
  const [Companylongitude, setCompanylongitude] = useState('');
  const [Companylocation, setCompanyLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const isVisible = useIsFocused();
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
  const handleIndividualData = e => {
    setIndividual(e);
  };
  const handleCompanyData = e => {
    setCompanyCome(e);
  };
  console.log('Individual', Individual);
  console.log('CompanyCome', CompanyCome);
  const refRBSheet = useRef();
  // .....
  const handleBoxPress = lookupID => {
    setIsClick(lookupID);
    setSelectManageProperty(lookupID);
  };
  const toggleCheckbox = lookupKey => {
    if (selectedLookupKeys.includes(lookupKey)) {
      setSelectedLookupKeys(
        selectedLookupKeys.filter(key => key !== lookupKey),
      );
    } else {
      setSelectedLookupKeys([...selectedLookupKeys, lookupKey]);
    }
  };
  const wantList = ({item}) => {
    const isSelected = selectedLookupKeys.includes(item.lookup_key);

    return (
      <View>
        <View style={AboutYouStyle.want_List_View}>
          <TouchableOpacity
            onPress={() => {
              toggleCheckbox(item.lookup_key);
              setKodiehelplookupid(item.lookup_key);
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={[
                  AboutYouStyle.checkbox_View,
                  {
                    borderColor: isSelected
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_ExtraLightGrayColor,
                  },
                ]}>
                {isSelected ? (
                  <FontAwesome
                    name="check"
                    size={15}
                    color={_COLORS.Kodie_GreenColor}
                    style={AboutYouStyle.Check_Icon}
                  />
                ) : null}
              </View>

              <Text style={AboutYouStyle.want_List_text}>
                {item.lookup_description}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({item}) => (
    <ServicesBox
      Services_Name={item?.lookup_description}
      BoxStyling={[
        AboutYouStyle.box_style,
        {
          margin: 4,
          backgroundColor:
            isClick === item.lookup_key
              ? _COLORS.Kodie_lightGreenColor
              : _COLORS.Kodie_WhiteColor,
        },
      ]}
      textColor={[AboutYouStyle.box_Text_Style]}
      onPress={() => {
        handleBoxPress(item.lookup_key),
          setSelectManageProperty(item.lookup_key);
      }}
    />
  );
  const renderStepIndicator = params => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );

  const toggleSelection = lookup_key => {
    if (selectedServices.includes(lookup_key)) {
      setSelectedServices(prevSelected =>
        prevSelected.filter(item => item !== lookup_key),
      );
    } else {
      setSelectedServices(prevSelected => [...prevSelected, lookup_key]);
    }
  };
  const renderItemDescribeYourself = ({item}) => (
    <ServicesBox
      Services_Name={item?.lookup_description}
      BoxStyling={[
        AboutYouStyle.box_style,
        {
          margin: 4,
          backgroundColor: selectedServices.includes(item.lookup_key)
            ? _COLORS.Kodie_lightGreenColor
            : _COLORS.Kodie_WhiteColor,
        },
      ]}
      textColor={[AboutYouStyle.box_Text_Style]}
      onPress={() => {
        toggleSelection(item.lookup_key);
        setKodieDescribeYourselfDataId(item.lookup_key);
      }}
    />
  );
  useEffect(() => {
    if (isVisible) {
      handle_manage_property();
      handle_kodiehelp();
      handle_describe_yourself();
    }
  }, [isVisible]);

  useEffect(() => {
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
  }, []);
  const ConfirmAddress = () => {
    setIsMap(false);
    if (tabValue == 'IndividualSignup') {
      setLocation(currentLocation);
    } else {
      setCompanyLocation(currentLocation);
    }
  };
  const openMapandClose = text => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = Region => {
    if (tabValue == 'IndividualSignup') {
      setlatitude(Region.latitude);
      setlongitude(Region.longitude);
    } else {
      setCompanylatitude(Region.latitude);
      setCompanylongitude(Region.longitude);
    }

    getAddress(Region.latitude, Region.longitude);
    // getAddress();
  };
  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        console.log('json location.......', json);
        console.log('current address...', json.results[0].formatted_address);
        // setLocation(json.results[0].formatted_address);
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
        if (tabValue == 'IndividualSignup') {
          setLocation(MainFullAddress);
        } else {
          setCompanyLocation(MainFullAddress);
        }
      })
      .catch(error => console.warn(error));
  };
  const selectedServiceKeysString = selectedServices.join(',');
  const kodieHelpValue = selectedLookupKeys.join(',');

  // ...Api intrigatrion
  const handle_describe_yourself = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'TEN_DESC',
      P_TYPE: 'OPTION',
    });

    console.log('resDescribe', res);

    setKodieDescribeYourselfData(res?.lookup_details);
    setIsLoading(false);
  };
  const handle_manage_property = async () => {
    setIsLoading(true);
    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'TEN_PROPERTY',
      P_TYPE: 'OPTION',
    });

    console.log('handle_manage_property', res);

    setmanage_property_Data(res?.lookup_details);
    setIsLoading(false);
  };
  const handle_kodiehelp = async () => {
    setIsLoading(true);
    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'KODIE_HELP',
      P_TYPE: 'OPTION',
    });

    console.log('handle_kodiehelp', res);

    setKodiehelpData(res?.lookup_details);
    setIsLoading(false);
  };
  // describe your self.....
  // const handle_describe_yourself = () => {
  //   const describe_yourself_Data = {
  //     P_PARENT_CODE: 'TEN_DESC',
  //     P_TYPE: 'OPTION',
  //   };
  //   const url = Config.BASE_URL;
  //   const describeYourselfApi = url + 'lookup_details';
  //   console.log('Request URL:', describeYourselfApi);
  //   setIsLoading(true);
  //   axios
  //     .post(describeYourselfApi, describe_yourself_Data)
  //     .then(response => {
  //       console.log('kodie_describeYouself_Data', response.data);
  //       if (response.data.status === true) {
  //         console.log(
  //           'kodie_describeYouself_Data....',
  //           response.data.lookup_details,
  //         );
  //         setKodieDescribeYourselfData(response.data.lookup_details);
  //         setIsLoading(false);
  //       } else {
  //         console.error(
  //           'kodie_describeYouself_Data_error:',
  //           response.data.error,
  //         );
  //         alert('Oops something went wrong! Please try again later.');
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('kodie_describeYouself_Data error:', error);
  //       alert(error);
  //       setIsLoading(false);
  //     });
  // };
  // manage property API with lookup key...
  // const handle_manage_property = () => {
  //   const propertyData = {
  //     P_PARENT_CODE: 'TEN_PROPERTY',
  //     P_TYPE: 'OPTION',
  //   };
  //   const url = Config.BASE_URL;
  //   const propertyType = url + 'lookup_details';
  //   console.log('Request URL:', propertyType);
  //   setIsLoading(true);
  //   axios
  //     .post(propertyType, propertyData)
  //     .then(response => {
  //       console.log('maneg_property_type', response.data);
  //       if (response.data.status === true) {
  //         console.log('maneg_property_type....', response.data.lookup_details);
  //         setmanage_property_Data(response.data.lookup_details);
  //         setIsLoading(false);
  //       } else {
  //         console.error('property_type_error:', response.data.error);
  //         alert('Oops something went wrong! Please try again later.');
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('property_type error:', error);
  //       alert(error);
  //       setIsLoading(false);
  //     });
  // };
  // kodie help api...
  // const handle_kodiehelp = () => {
  //   const kodiehelp_Data = {
  //     P_PARENT_CODE: 'KODIE_HELP',
  //     P_TYPE: 'OPTION',
  //   };
  //   const url = Config.BASE_URL;
  //   const kodiehelpApi = url + 'lookup_details';
  //   console.log('Request URL:', kodiehelp_Data);
  //   setIsLoading(true);
  //   axios
  //     .post(kodiehelpApi, kodiehelp_Data)
  //     .then(response => {
  //       console.log('kodie_Data', response.data);
  //       if (response.data.status === true) {
  //         console.log('kodie_Data....', response.data.lookup_details);
  //         setKodiehelpData(response.data.lookup_details);
  //         setIsLoading(false);
  //       } else {
  //         console.error('kodie_Data_error:', response.data);
  //         alert('Oops something went wrong! Please try again later.');
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('kodie_Data error:', error);
  //       alert(error);
  //       setIsLoading(false);
  //     });
  // };
  const openMapCom = () => {
    setIsMap(true);
    console.log('Location pressed');
  };
  const goBack = () => {
    props.navigation.pop();
  };
  const renderLabel = ({position, stepStatus}) => {
    // const iconColor = stepStatus === "finished" ? "#000000" : "#808080";
    const iconColor =
      position === currentPage // Check if it's the current step
        ? _COLORS.Kodie_BlackColor // Set the color for the current step
        : stepStatus === 'finished'
        ? '#000000'
        : '#808080';
    const iconName =
      position === 0
        ? 'Account'
        : position === 1
        ? 'About you'
        : position === 2
        ? 'First Property'
        : 'circle';

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

  // tab code here .....
  const [tabValue, setTabValue] = useState('IndividualSignup');
  const website = dataa => {
    console.log('data', dataa);
  };
  const checkTabs = () => {
    switch (tabValue) {
      case 'IndividualSignup':
        return (
          <IndividualSignup
            IndividualData={handleIndividualData}
            physicalAddress={physicalAddress}
            Individualp_latitude={p_latitude}
            Individualp_longitude={p_longitude}
            onPresslocation={openMapCom}
            IndividualLocation={location}
            onChangeIndivialLocation={setLocation}
            IndividualOnFocus={() => setIsSearch(true)}
          />
        );
      case 'CompanySignup':
        return (
          <CompanySignup
            CompanyData={handleCompanyData}
            onPressCompanylocation={openMapCom}
            CompanyLocation={Companylocation}
            onChangeCompanyLocation={setCompanyLocation}
            CompanyOnFocus={() => setIsSearch(true)}
          />
        );
      default:
        return <IndividualSignup />;
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor}}>
      <TopHeader
        MiddleText={IsMap || IsSearch ? 'Location' : 'Account set up'}
        onPressLeftButton={() => {
          IsMap ? setIsMap(false) : IsSearch ? setIsSearch(false) : goBack();
        }}
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
            Maplat={tabValue == 'IndividualSignup' ? latitude : Companylatitude}
            Maplng={
              tabValue == 'IndividualSignup' ? longitude : Companylongitude
            }
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
          {/* <TouchableOpacity
              style={FirstPropertyStyle.c_locationBtn}
              onPress={() => {}}
            >
              <Entypo
                name="location-pin"
                size={30}
                color={_COLORS.Kodie_lightGreenColor}
              />
            </TouchableOpacity> */}
          <TouchableOpacity
            style={FirstPropertyStyle.BtnContainer}
            onPress={ConfirmAddress}>
            <Image source={IMAGES?.Shape} style={{height: 25, width: 25}} />
          </TouchableOpacity>
        </View>
      ) : IsSearch ? (
        <SearchPlaces
          onPress={(data, details = null) => {
            console.log('LocationData....', details);
            if (tabValue == 'IndividualSignup') {
              setlatitude(details.geometry.location.lat);
              setlongitude(details.geometry.location.lng);
            } else {
              setCompanylatitude(details.geometry.location.lat);
              setCompanylongitude(details.geometry.location.lng);
            }

            setIsSearch(false);
            setIsMap(true);
            // setLocation(details.formatted_address);
            setCurrentLocation(details.formatted_address);
          }}
        />
      ) : (
        <>
          <View style={AboutYouStyle.stepIndicator}>
            <StepIndicator
              customSignUpStepStyle={firstIndicatorSignUpStepStyle}
              currentPosition={currentPage}
              renderStepIndicator={renderStepIndicator}
              labels={labels}
              stepCount={3}
              renderLabel={renderLabel}
            />
          </View>
          <ScrollView>
            <View style={AboutYouStyle.Container}>
              <Text style={AboutYouStyle.heading_Text}>
                {'Tell us more about you'}
              </Text>
              <Text style={AboutYouStyle.want_Heading}>
                {
                  'How would you describe yourself? (you can select multiple options)'
                }
              </Text>
              <FlatList
                data={kodieDescribeYourselfData}
                renderItem={renderItemDescribeYourself}
                keyExtractor={item => item.lookup_key.toString()}
                numColumns={2}
              />
              {kodieDescribeYourselfId === 2 ||
              kodieDescribeYourselfId === 4 ? null : (
                <View>
                  <Text style={AboutYouStyle.want_Heading}>
                    {'How many properties do you own, manage or rent?'}
                  </Text>
                  <FlatList
                    data={manage_property_Data}
                    renderItem={renderItem}
                    keyExtractor={item => item.lookup_key.toString()}
                    numColumns={2}
                  />
                </View>
              )}

              <View style={AboutYouStyle.tabmainview}>
                <Text style={AboutYouStyle.tabheadingtext}>
                  How do you run your business?
                </Text>
                <View style={AboutYouStyle.btn_main_view}>
                  <TouchableOpacity
                    style={[
                      AboutYouStyle.person_view,
                      {
                        backgroundColor:
                          tabValue === 'IndividualSignup'
                            ? _COLORS.Kodie_GreenColor
                            : _COLORS.Kodie_WhiteColor,
                      },
                    ]}
                    onPress={() => {
                      setTabValue('IndividualSignup');
                    }}>
                    <Text
                      style={[
                        AboutYouStyle.person_text,
                        {
                          color:
                            tabValue === 'IndividualSignup'
                              ? _COLORS.Kodie_WhiteColor
                              : _COLORS.Kodie_BlackColor,
                        },
                      ]}>
                      {'Individual'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      AboutYouStyle.person_view,
                      {
                        backgroundColor:
                          tabValue === 'CompanySignup'
                            ? _COLORS.Kodie_GreenColor
                            : _COLORS.Kodie_WhiteColor,
                      },
                    ]}
                    onPress={() => {
                      setTabValue('CompanySignup');
                    }}>
                    <Text
                      style={[
                        AboutYouStyle.company_text,
                        {
                          color:
                            tabValue === 'CompanySignup'
                              ? _COLORS.Kodie_WhiteColor
                              : _COLORS.Kodie_BlackColor,
                        },
                      ]}>
                      {'Company'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {checkTabs()}

              <Text style={AboutYouStyle.want_Heading}>
                {'What do you want to do first with Kodie'}
              </Text>

              <FlatList
                data={kodiehelpData}
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{}}
                keyExtractor={item => item?.id}
                renderItem={wantList}
              />
            </View>
            <View style={{marginHorizontal: 16}}>
              <CustomSingleButton
                disabled={isLoading ? true : false}
                _ButtonText={'Next'}
                Text_Color={_COLORS.Kodie_WhiteColor}
                onPress={() => {
                  props.navigation.navigate('FirstProperty', {
                    firstName: firstName,
                    lastName: lastName,
                    mobileNumber: mobileNumber,
                    physicalAddress: physicalAddress,
                    referral: referral,
                    selectManageProperty: selectManageProperty,
                    selectedServiceKeysString: selectedServiceKeysString,
                    kodieHelpValue: kodieHelpValue,
                    ImageName: image,
                    Bio: Bio,
                    email: email,
                    country: country,
                    state: state,
                    city: city,
                    p_latitude: p_latitude,
                    p_longitude: p_longitude,
                    user_key: user_key,
                    BusinessNumber: CompanyCome.businessNumber,
                    companyName: CompanyCome.companyName,
                    CompanyselectJobType: CompanyCome.selectJobType,
                    CompanyservicesValue: CompanyCome.servicesValue,
                    CompanyWebSide: CompanyCome.website,
                    Individualp_latitude: Individual.p_latitude || latitude,
                    Individualp_longitude: Individual.p_longitude || longitude,
                    individualAddress: Individual.physicalAddress || location,
                    Companyp_latitude: CompanyCome.p_latitude,
                    Companyp_longitude: CompanyCome.p_longitude,
                    IndividualselectJobType: Individual.selectJobType,
                    IndividualservicesValue: Individual.servicesValue,
                    IndividualWebSide: Individual.website,
                    run_your_business: tabValue == 'IndividualSignup' ? 0 : 1,
                    company_address: Companylocation,
                    country_code: country_code,
                  });
                }}
              />
            </View>
            <View style={{marginHorizontal: 16, marginBottom: 10}}>
              <CustomSingleButton
                disabled={isLoading ? true : false}
                _ButtonText={'Fill these details out later'}
                Text_Color={_COLORS.Kodie_BlackColor}
                backgroundColor={_COLORS.Kodie_WhiteColor}
                onPress={() => {
                  props.navigation.navigate('FirstProperty');
                }}
              />
            </View>
            <TouchableOpacity
              style={AboutYouStyle.goBack_View}
              onPress={goBack}>
              <View style={AboutYouStyle.backIcon}>
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color={_COLORS.Kodie_MediumGrayColor}
                />
              </View>
              <Text style={AboutYouStyle.goBack_Text}>{'Go back'}</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
