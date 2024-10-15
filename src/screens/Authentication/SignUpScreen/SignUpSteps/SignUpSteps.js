//ScreenNo:11
//ScreenNo:12
//ScreenNo:13
//ScreenNo:14
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import PhoneInput from 'react-native-phone-number-input';
import Geocoder from 'react-native-geocoding';
import {useFocusEffect} from '@react-navigation/native';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import SearchPlaces from '../../../../components/Molecules/SearchPlaces/SearchPlaces';
import TopHeader from '../../../../components/Molecules/Header/Header';
import MapScreen from '../../../../components/Molecules/GoogleMap/googleMap';
import UploadImageData from '../../../../components/Molecules/UploadImage/UploadImage';
import {_goBack} from '../../../../services/CommonServices';
import {LABEL_STYLES, _COLORS, IMAGES} from '../../../../Themes';
import {SignUpStepStyle} from './SignUpStepsStyle';
import {AccountStyle} from '../Account/AccountStyle';
import GoogleMapScreen from '../../../../components/Molecules/GoogleMapScreens/GoogleMapScreen';
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

const getStepIndicatorIconConfig = ({position, stepStatus}) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? '#ffffff' : 'black',
    size: 20,
  };
  iconConfig.name = stepStatus === 'finished' ? 'check' : null;

  return iconConfig;
};
const SignUpSteps = props => {
  const phoneInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet = useRef();
  const [ImageName, setImageName] = useState('');
  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [bio, setBio] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [physicalAddress, setPhysicalAddress] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [referral, setRefferral] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [UserCurrentCity, setUserCurrentCity] = useState('');
  const [UserZip_Code, setUserZip_Code] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [p_latitude, setP_latitude] = useState('');
  const [p_longitude, setP_longitude] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [country_Code_Get, setCountry_Code_Get] = useState('');
  const [addressComponents, setAddressComponents] = useState([]);
  const addressParts = physicalAddress.split(', ');
  const country = addressParts.pop();
  const state = addressParts.pop();
  const city = addressParts.join(', ');
  function getAddressComponent(addressComponents, type) {
    return addressComponents.find(component => component.types.includes(type));
  }
  const selected_city = getAddressComponent(
    addressComponents,
    'locality',
  )?.long_name;
  const Selected_State = getAddressComponent(
    addressComponents,
    'administrative_area_level_1',
  )?.long_name;
  const selected_Country = getAddressComponent(
    addressComponents,
    'country',
  )?.long_name;
  console.log(`selected_city: ${selected_city}`);
  console.log(`Selected_State: ${Selected_State}`);
  console.log(`selected_Country: ${selected_Country}`);
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

  const handleImageNameChange = async newImageName => {
    setImageName(newImageName);
    console.log(newImageName, 'ImageNAme');
    refRBSheet.current.close();
  };
  let email = props?.route?.params?.email;
  let user_key = props?.route?.params?.user_key;
  let password = props?.route?.params?.password;
  let _social_userInfo = props?.route?.params?._socialuserInfo;
  let _facebook_userInfo = props?.route?.params?._FacebookuserInfo;
  console.log('email...', email);
  console.log('user_key...', user_key);
  console.log('countryCode...', country_Code_Get);
  const ConfirmAddress = () => {
    setIsMap(false);
    setPhysicalAddress(currentLocation);
  };
  const openMapandClose = text => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = Region => {
    setP_latitude(Region.latitude);
    console.log('p_latitude...', p_latitude);
    setP_longitude(Region.longitude);
    console.log('p_longitude...', p_longitude);
    getAddress(Region.latitude, Region.longitude);
  };
  const getAddress = (p_latitude, p_longitude) => {
    Geocoder.from(p_latitude, p_longitude)
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
        setPhysicalAddress(MainFullAddress);
        console.log('physicalAddress....', physicalAddress);
      })
      .catch(error => console.warn(error));
  };
  // const validMobileNumber = () => {
  //   const mobileReg = /^(\+?61|0)4[0-9]{8}$/;
  // };
  // const validateMobileNumber = text => {
  //   if (text === '') {
  //     setMobileNumberError('Phone number is required!');
  //   } else if (!validMobileNumber(text)) {
  //     setMobileNumberError('Invalid phone number format!');
  //   } else {
  //     setMobileNumberError('');
  //   }
  //   setMobileNumber(text);
  // };
  // const phoneNumber = mobileNumber;
  // const phoneNumberParts = phoneNumber.match(/^(\+\d{1,2})(\d+)$/);
  // if (phoneNumberParts) {
  //   const countryCode = phoneNumberParts[1];
  //   const remainingNumber = phoneNumberParts[2];
  //   console.log('CountryCode:', countryCode);
  //   setCountry_Code_Get(countryCode);
  //   console.log('RemainingsNumber:', remainingNumber);
  //   setMobileNumber(remainingNumber);
  //   console.log(country_Code_Get, 'country_Code_Get');
  // } else {
  //   console.error('Invalid phone number format!');
  // }

  const isValidFirstName = text => {
    // const trimmedText = text.trim();
    const trimmedText = text;
    if (trimmedText === '') {
      setFirstNameError('First name is required!');
      return false;
    } else if (!/^[A-Za-z]+(?:[\s-]?[A-Za-z]*)*$/.test(trimmedText)) {
      setFirstNameError(
        'First name should only contain alphabetic characters, spaces, or hyphens in the correct format!',
      );
      return false;
    } else {
      setFirstNameError('');
      return true;
    }
  };

  const isValidLastName = text => {
    // const trimmedText = text.trim();
    const trimmedText = text;
    if (trimmedText === '') {
      setLastNameError('Last name is required!');
      return false;
    } else if (!/^[A-Za-z]+(?:[\s-]?[A-Za-z]*)*$/.test(trimmedText)) {
      setLastNameError(
        'Last name should only contain alphabetic characters, spaces, or hyphens in the correct format!',
      );
      return false;
    } else {
      setLastNameError('');
      return true;
    }
  };

  const isValidPhoneNumber = text => {
    if (text.trim() === '') {
      setMobileNumberError('Phone number is required!');
      return false;
    } else if (!/^[24][0-9]{8}$/.test(text)) {
      setMobileNumberError('Invalid phone number!');
      return false;
    } else {
      setMobileNumberError('');
      return true;
    }
  };

  const handleNextBtn = () => {
    const isFirstNameValid = isValidFirstName(firstName);
    if (!isFirstNameValid) {
      return;
    }

    const isLastNameValid = isValidLastName(lastName);
    if (!isLastNameValid) {
      return;
    }
    const isPhoneNumberValid = isValidPhoneNumber(mobileNumber);
    if (!isPhoneNumberValid) {
      return;
    }

    if (isFirstNameValid && isLastNameValid && isPhoneNumberValid) {
      props.navigation.navigate('AboutYou', {
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobileNumber,
        physicalAddress: physicalAddress,
        organisation: organisation,
        referral: referral,
        email: email,
        country: selected_Country,
        state: Selected_State,
        city: selected_city,
        p_latitude: p_latitude,
        p_longitude: p_longitude,
        user_key: user_key,
        image: ImageName,
        Bio: bio,
        country_code: '+61',
        password: password,
      });
    }
  };

  useEffect(() => {
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
    setFirstName(
      _facebook_userInfo?.userID
        ? _facebook_userInfo?.firstName
        : _social_userInfo?.user?.givenName,
    );
    setLastName(
      _facebook_userInfo?.userID
        ? _facebook_userInfo?.lastName
        : _social_userInfo?.user?.familyName,
    );
  }, []);

  const goBack = () => {
    props.navigation.navigate('LoginScreen');
  };
  const renderLabel = ({position, stepStatus}) => {
    const iconColor =
      position === currentPage
        ? _COLORS.Kodie_BlackColor
        : stepStatus === 'finished'
        ? '#000000'
        : '#808080';
    const iconName =
      position === 0
        ? 'Account'
        : position === 1
        ? 'About you'
        : position === 2
        ? 'First property'
        : 'circle';

    return (
      <View style={SignUpStepStyle.labelContainer}>
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

  const renderStepIndicator = params => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  const handleimage = () => {
    refRBSheet.current.close();
  };
  const renderPageContent = () => {
    return (
      <ScrollView ref={scrollViewRef}>
        <View style={AccountStyle.headingView}>
          <Text style={AccountStyle.heading}>
            {'Introduce yourself to Kodie'}
          </Text>
        </View>

        <Text style={AccountStyle.edittext}>Profile photo</Text>
        <View style={[AccountStyle.profilviewmain, {flex: 1}]}>
          <TouchableOpacity
            style={AccountStyle.ProfileView}
            onPress={() => {
              refRBSheet.current.open();
            }}>
            {ImageName ? (
              <Image
                source={{uri: ImageName.path || ImageName}}
                style={[AccountStyle.logo, {borderRadius: 130 / 2}]}
              />
            ) : (
              <View style={AccountStyle.profilelogo}>
                <FontAwesome
                  size={60}
                  name={'user-circle-o'}
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                  color={_COLORS.Kodie_LightGrayColor}
                />
              </View>
            )}

            <View style={AccountStyle.editlogoview}>
              <Fontisto
                name="camera"
                color={_COLORS.Kodie_WhiteColor}
                size={15}
                style={{alignItems: 'center'}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={AccountStyle.card}>
          <View style={AccountStyle.inputContainer}>
            <Text style={LABEL_STYLES._texinputLabel}>
              First name
              <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
            </Text>
            <TextInput
              style={[
                AccountStyle.input,
                {
                  borderColor: firstNameError
                    ? _COLORS.Kodie_lightRedColor
                    : _COLORS.Kodie_GrayColor,
                },
              ]}
              value={firstName}
              onChangeText={text => {
                isValidFirstName(text);
                setFirstName(text);
              }}
              onBlur={() => isValidFirstName(firstName)}
              placeholder="Enter your first name"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            />
            <Text style={AccountStyle.errorText}>{firstNameError}</Text>
          </View>
          <View style={AccountStyle.inputContainer}>
            <Text style={LABEL_STYLES._texinputLabel}>
              Last name
              <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
            </Text>
            <TextInput
              style={[
                AccountStyle.input,
                {
                  borderColor: lastNameError
                    ? _COLORS.Kodie_lightRedColor
                    : _COLORS.Kodie_GrayColor,
                },
              ]}
              value={lastName}
              onChangeText={text => {
                isValidLastName(text);
                setLastName(text);
              }}
              onBlur={() => isValidLastName(lastName)}
              placeholder="Enter your last name"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            />
            <Text style={AccountStyle.errorText}>{lastNameError}</Text>
          </View>
          {/* <View style={AccountStyle.inputContainer}>
            <Text style={LABEL_STYLES._texinputLabel}>
              Phone number
              <Text style={{color: _COLORS?.Kodie_redColor}}>* </Text>
              <Text style={{fontSize: 14}}>(mobile preferred)</Text>
            </Text>
            <View style={[AccountStyle.phoneinputview]}>
              <PhoneInput
                ref={phoneInput}
                defaultValue={mobileNumber}
                defaultCode="AU"
                layout="second"
                Country={false}
                // disabled
                disableArrowIcon={true}
                textInputProps={{
                  maxLength: 9,
                  keyboardType: 'number-pad',
                }}
                placeholder={'Enter your phone number'}
                onChangeText={text => {
                  const checkValid = phoneInput.current?.isValidNumber(text);
                  if (text === '') {
                    setMobileNumberError('Phone number is required!');
                  } else if (checkValid == false) {
                    setMobileNumberError('Invalid phone number format!');
                  } else {
                    setMobileNumberError('');
                  }
                }}
                onChangeFormattedText={text => {
                  setMobileNumber(text);
                }}
                textContainerStyle={{
                  flex: 1,
                  backgroundColor: _COLORS.Kodie_WhiteColor,
                  paddingVertical: 2,
                  borderRadius: Platform.OS == 'ios' ? 6 : 10,
                  height: 50,
                }}
                containerStyle={{
                  flex: 1,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: mobileNumberError
                    ? _COLORS.Kodie_lightRedColor
                    : _COLORS.Kodie_GrayColor,
                  borderRadius: Platform.OS == 'ios' ? 6 : 10,
                  // backgroundColor:_COLORS.Kodie_LightGrayColor
                }}
              />
            </View>
            {mobileNumberError ? (
              <Text style={AccountStyle.errorText}>{mobileNumberError}</Text>
            ) : null}
          </View> */}
          <View style={AccountStyle.inputContainer}>
            <Text style={LABEL_STYLES._texinputLabel}>
              Phone number
              <Text style={{color: _COLORS?.Kodie_redColor}}>* </Text>
              <Text style={{fontSize: 14}}>(mobile preferred)</Text>
            </Text>
            <View
              style={[
                AccountStyle.phoneinputview,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <View style={{position: 'relative', flex: 1}}>
                <Text
                  style={{
                    position: 'absolute',
                    left: 15,
                    top: 14,
                    color: _COLORS.Kodie_BlackColor,
                    fontSize: 16,
                    zIndex: 1,
                  }}>
                  +61
                </Text>
                <TextInput
                  value={mobileNumber}
                  keyboardType="number-pad"
                  maxLength={9}
                  placeholder="Enter your phone number"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  style={{
                    height: 50,
                    backgroundColor: _COLORS.Kodie_WhiteColor,
                    paddingVertical: 2,
                    paddingLeft: 70,
                    paddingRight: 10,
                    borderRadius: Platform.OS === 'ios' ? 6 : 10,
                    borderWidth: 1,
                    borderColor: mobileNumberError
                      ? _COLORS.Kodie_lightRedColor
                      : _COLORS.Kodie_GrayColor,
                    fontSize: 16,
                  }}
                  onChangeText={text => {
                    isValidPhoneNumber(text);
                    setMobileNumber(text);
                  }}
                />
              </View>
            </View>
            {mobileNumberError ? (
              <Text style={AccountStyle.errorText1}>{mobileNumberError}</Text>
            ) : null}
          </View>

          <View style={AccountStyle.inputContainerbio}>
            <Text style={LABEL_STYLES._texinputLabel}>Bio</Text>
            <TextInput
              style={AccountStyle.inputdescription}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us a bit more about yourself"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              multiline
              numberOfLines={5}
              maxLength={1000}
              textAlignVertical={'top'}
            />
          </View>

          <View style={[AccountStyle.inputContainer, {marginTop: 25}]}>
            <Text style={LABEL_STYLES._texinputLabel}>
              Current physical address
            </Text>
            <View style={AccountStyle.locationConView}>
              <View style={AccountStyle.locationContainer}>
                <TextInput
                  style={AccountStyle.locationInput}
                  value={physicalAddress}
                  onChangeText={setPhysicalAddress}
                  onFocus={() => {
                    setIsSearch(true);
                  }}
                  placeholder="Search new location"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>
              <TouchableOpacity
                style={AccountStyle.locationIconView}
                onPress={() => {
                  setIsMap(true);
                }}>
                <Entypo
                  name={'location-pin'}
                  size={28}
                  color={_COLORS.Kodie_GreenColor}
                  style={AccountStyle.locationIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[AccountStyle.inputContainer, AccountStyle.referralcode]}>
            <Text style={LABEL_STYLES._texinputLabel}>Referral code</Text>
            <TextInput
              style={AccountStyle.input}
              value={referral}
              onChangeText={setRefferral}
              placeholder="If you have a referral code, enter it here"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            />
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <TopHeader
          MiddleText={IsMap || IsSearch ? 'Location' : 'Account set up'}
          onPressLeftButton={() => {
            IsMap
              ? setIsMap(false)
              : IsSearch
              ? setIsSearch(false)
              : _goBack(props);
          }}
        />
        <View style={SignUpStepStyle.container}>
          {IsMap || IsSearch ? null : (
            <View style={SignUpStepStyle.stepIndicator}>
              <StepIndicator
                customSignUpStepStyle={firstIndicatorSignUpStepStyle}
                currentPosition={0}
                renderStepIndicator={renderStepIndicator}
                labels={labels}
                stepCount={3}
                renderLabel={renderLabel}
              />
            </View>
          )}
          {IsMap ? (
            <GoogleMapScreen
              onRegionChange={onRegionChange}
              Maplat={p_latitude}
              Maplng={p_longitude}
              openMapandClose={() => openMapandClose()}
              ConfirmAddress={ConfirmAddress}
              iscancel={() => setIsMap(false)}
            />
          ) : IsSearch ? (
            <SearchPlaces
              onPress={(data, details = null) => {
                setP_latitude(details.geometry.location.lat);
                console.log('p_latitude...', p_latitude);
                setP_longitude(details.geometry.location.lng);
                console.log('p_longitude...', p_longitude);
                setIsSearch(false);
                setIsMap(true);
                setCurrentLocation(details.formatted_address);
                console.log('physicalAddressSearch....', physicalAddress);
                console.log('details.......', details);
                setAddressComponents(details?.address_components);
              }}
            />
          ) : (
            <ScrollView
              contentContainerStyle={{marginBottom: 50}}
              showsVerticalScrollIndicator={false}>
              <View style={SignUpStepStyle.stepIndicator}>
                {renderPageContent()}
              </View>

              <View
                style={{
                  marginHorizontal: 16,
                  backgroundColor: _COLORS.Kodie_WhiteColor,
                  // marginBottom: 10,
                }}>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    marginBottom: 30,
                  }}>
                  <CustomSingleButton
                    disabled={isLoading ? true : false}
                    _ButtonText={'Next'}
                    marginBottom={25}
                    marginTop={1}
                    Text_Color={_COLORS.Kodie_WhiteColor}
                    onPress={() => {
                      handleNextBtn();
                    }}
                  />
                  <TouchableOpacity
                    style={SignUpStepStyle.goBack_View}
                    onPress={goBack}>
                    <View style={SignUpStepStyle.backIcon}>
                      <Ionicons
                        name="chevron-back"
                        size={22}
                        color={_COLORS.Kodie_MediumGrayColor}
                      />
                    </View>
                    <Text style={SignUpStepStyle.goBack_Text}>{'Go back'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
          {isLoading ? <CommonLoader /> : null}
        </View>
      </KeyboardAvoidingView>
      <RBSheet
        ref={refRBSheet}
        height={177}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: AccountStyle.bottomModal_container,
        }}>
        <View style={AccountStyle.upload_View}>
          <Text style={AccountStyle.uploadImgText}>
            {props.heading_Text || 'Upload image'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.close();
            }}>
            <Entypo
              name="cross"
              size={25}
              color={_COLORS.Kodie_BlackColor}
              style={AccountStyle.crossIconStyle}
            />
          </TouchableOpacity>
        </View>
        <UploadImageData
          heading_Text={'Upload image'}
          ImageName={handleImageNameChange}
        />
      </RBSheet>
    </SafeAreaView>
  );
};

export default SignUpSteps;
