import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  FlatList,
  Alert,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import TopHeader from '../../../components/Molecules/Header/Header';
import {EditProfileStyle} from './EditProfileStyle';
import {Divider} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {CreateJobFirstStyle} from '../../CreateJob/CreateJobFirstScreenCss';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import {_COLORS, IMAGES, FONTFAMILY, LABEL_STYLES} from '../../../Themes';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import {_goBack} from '../../../services/CommonServices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomTabNavigator from '../../../components/Molecules/CustomTopNavigation/CustomTopNavigation';
import UploadImageData from '../../../components/Molecules/UploadImage/UploadImage';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import MapScreen from '../../../components/Molecules/GoogleMap/googleMap';
import SearchPlaces from '../../../components/Molecules/SearchPlaces/SearchPlaces';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {Config} from '../../../Config';
import axios from 'axios';
import CompanyDetails from '../../Landlord/Landlordprofile/CompanyDetails/CompanyDetails';
import ProfileDocuments from '../ProfileDocuments/ProfileDocuments';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import PhoneInput from 'react-native-phone-number-input';
import styles from 'rn-range-slider/styles';
import ServicesBox from '../../../components/Molecules/ServicesBox/ServicesBox';
//ScreenNo:189
//ScreenNo:190
//ScreenNo:192
//ScreenNo:193
//ScreenNo:194
const data = [
  {label: 'Delhi', value: '1'},
  {label: 'Mumbai', value: '2'},
  {label: 'Punjab', value: '3'},
  {label: 'West Bengal', value: '4'},
  {label: 'Pune', value: '5'},
];

const EditProfile = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const [valid, setValid] = useState(false);
  const [fullName, setFirstName] = useState('');
  const [fullNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState(loginData?.Login_details?.email);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [location, setLocation] = useState(
    accountDetails?.UAD_CURR_PHYSICAL_ADD,
  );
  let profileDoc = props?.route?.params?.profileDoc;
  console.log('profileDoc....', profileDoc);
  const [about, setAbout] = useState('');
  const [activeTab, setActiveTab] = useState('Tab1');
  const [value, setValue] = useState(null);
  const refRBSheet = useRef();
  const [visible, setVisible] = useState(false);
  const [photoid, setPhotoId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [UserCurrentCity, setUserCurrentCity] = useState('');
  const [UserZip_Code, setUserZip_Code] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [ImageName, setImageName] = useState('');
  const [companyPhysicaladdress, setCompanyPhysicaladdress] = useState('');
  const [company_latitude, setCompany_latitude] = useState('');
  const [company_longitude, setCompany_longitude] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [kodieDescribeYourselfData, setKodieDescribeYourselfData] = useState(
    [],
  );
  const [kodieDescribeYourselfId, setKodieDescribeYourselfDataId] =
    useState('');

  const [selectedServices, setSelectedServices] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const [accountDetails, setAccountDetails] = useState(null);

  const [Individuallatitude, setIndividuallatitude] = useState('');
  const [Individuallongitude, setIndividuallongitude] = useState('');
  const [country_Code_Get, setCountry_Code_Get] = useState('');

  const phoneInput = useRef(null);
  console.log('latitude....', latitude);
  console.log('longitude....', longitude);
  const handleImageNameChange = async newImageName => {
    setImageName(newImageName);
    console.log('................ImageNAme', newImageName);
  };

  const validateFirstName = text => {
    if (text === '') {
      setFirstNameError('First name is required');
      // } else if (!/^[A-Za-z]+$/.test(text)) {
    } else if (!/^[A-Za-z]+(?:\s)?$/.test(text)) {
      setFirstNameError('First name should contain only alphabetic characters');
    } else {
      setFirstNameError('');
    }
    setFirstName(text);
  };

  // Validation for Last Name
  const validateLastName = text => {
    if (text === '') {
      setLastNameError('Last name is required!');
      // } else if (!/^[A-Za-z]+$/.test(text)) {
    } else if (!/^[A-Za-z]+(?:\s)?$/.test(text)) {
      setLastNameError('Last name should contain only alphabetic characters');
    } else {
      setLastNameError('');
    }
    setLastName(text);
  };

  const handlevalidUpdation = () => {
    if (fullName.trim() == '') {
      setFirstNameError('First name is required!');
    } else if (!/^[A-Za-z]+(?:\s)?$/.test(fullName)) {
      setFirstNameError('First name should contain only alphabetic characters');
    } else if (lastName.trim() == '') {
      setLastNameError('Last name is required!');
    } else if (!/^[A-Za-z]+(?:\s)?$/.test(lastName)) {
      setLastNameError('Last name should contain only alphabetic characters');
    } else {
      Updateprofile();
    }
  };
  const formatNumber = phoneNumber;
  const phoneNumberParts = formatNumber.match(/^(\+\d{1,2})(\d+)$/);

  if (phoneNumberParts) {
    const countryCode = phoneNumberParts[1]; // Extracted country code
    const remainingNumber = phoneNumberParts[2]; // Remaining part of the number

    console.log('CountryCode:', countryCode);
    setCountry_Code_Get(countryCode);
    console.log('RemainingsNumber:', remainingNumber);
    setPhoneNumber(remainingNumber);
    console.log(country_Code_Get, 'country_Code_Get');
  } else {
    console.error('Invalid phone number format');
  }
  const getPersonalDetails = () => {
    const url = Config.BASE_URL;
    setIsLoading(true);
    const apiUrl =
      url + `getAccount_details/${loginData.Login_details.user_account_id}`;
    console.log(apiUrl, 'apiUrl');
    // Make a GET request using Axios
    axios
      .get(apiUrl)
      .then(response => {
        console.log('API Response:', response?.data?.data[0]);
        setAccountDetails(response?.data?.data[0]);
        setFirstName(response?.data?.data[0]?.UAD_FIRST_NAME);
        setLastName(response?.data?.data[0]?.UAD_LAST_NAME);
        setLocation(response?.data?.data[0]?.UAD_CURR_PHYSICAL_ADD);
        setAbout(response?.data?.data[0]?.UAD_BIO);
        setPhoneNumber(response?.data?.data[0]?.UAD_PHONE_NO);

        const initialJobTypeIds = response?.data?.data[0]
          ?.UAD_HOW_WOULD_YOU_DES_YOUR_SELF
          ? response?.data?.data[0]?.UAD_HOW_WOULD_YOU_DES_YOUR_SELF.split(
              ',',
            ).map(Number)
          : [];
        setSelectedServices(initialJobTypeIds);
        console.log(accountDetails.UAD_AUSTR_BUSINESS_NO);
        setIsLoading(false);
      })
      .catch(error => {
        // Handle error
        console.error('API Error PersonalDetails EP:', error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
    getPersonalDetails();
    console.log('companyPhysicaladdress', companyPhysicaladdress);
    setActiveTab(profileDoc ? 'Tab3' : 'Tab1');
    handle_describe_yourself();
  }, []);
  // describe your self Api call code here .....
  const handle_describe_yourself = () => {
    const describe_yourself_Data = {
      P_PARENT_CODE: 'TEN_DESC',
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
        if (response?.data?.status === true) {
          setIsLoading(false);
          console.log(
            'kodie_describeYouself_Data....',
            response?.data?.lookup_details,
          );
          setKodieDescribeYourselfData(response?.data?.lookup_details);
        } else {
          console.error(
            'kodie_describeYouself_Data_error:',
            response?.data?.error,
          );
          // alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('kodie_describeYouself_Data error:', error);
        alert(error);
        setIsLoading(false);
      });
  };
  const toggleSelection = lookup_key => {
    if (selectedServices.includes(lookup_key)) {
      // Item is already selected, remove it
      setSelectedServices(prevSelected =>
        prevSelected.filter(item => item !== lookup_key),
      );
    } else {
      // Item is not selected, add it
      setSelectedServices(prevSelected => [...prevSelected, lookup_key]);
    }
  };

  const renderItemDescribeYourself = ({item}) => (
    <ServicesBox
      Services_Name={item?.lookup_description}
      BoxStyling={[
        EditProfileStyle.box_style,
        {
          margin: 8,
          backgroundColor: selectedServices.includes(item.lookup_key)
            ? _COLORS.Kodie_lightGreenColor
            : _COLORS.Kodie_WhiteColor,
        },
      ]}
      textColor={[EditProfileStyle.box_Text_Style]}
      onPress={() => {
        toggleSelection(item.lookup_key);
        setKodieDescribeYourselfDataId(item.lookup_key);
        // alert(item.lookup_key);
      }}
    />
  );

  const goBack = () => {
    props.navigation.pop();
  };
  const ConfirmAddress = () => {
    setIsMap(false);
    if (activeTab === 'Tab1') {
      setLocation(currentLocation);
    } else {
      setCompanyPhysicaladdress(currentLocation);
    }
  };
  const openMapandClose = text => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = Region => {
    // alert(JSON.stringify(Region))
    if (activeTab === 'Tab1') {
      setlatitude(Region.latitude);
    } else {
      setCompany_latitude(Region.latitude);
    }
    if (activeTab === 'Tab1') {
      setlongitude(Region.longitude);
    } else {
      setCompany_longitude(Region.longitude);
    }
    getAddress(Region.latitude, Region.longitude);
    getAddress();
  };
  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        console.log('json location.......', json);
        console.log('current address...', json.results[0].formatted_address);
        const formatedAddress = json.results[0].formatted_address;
        if (activeTab === 'Tab1') {
          setCurrentLocation(formatedAddress);
        } else {
          setCurrentLocation(formatedAddress);
        }
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
      })
      .catch(error => console.warn(error));
  };
  console.log(selectedServices, 'selectedServices');
  const toggleView = () => {
    setVisible(!visible);
  };

  // Api intrrigation......
  const Updateprofile = async () => {
    const formData = new FormData();
    const fileUri = ImageName?.path; // Use optional chaining to avoid errors if ImageName is undefined
    const fileName = fileUri
      ? fileUri.substring(fileUri.lastIndexOf('/') + 1)
      : null;
    const fileType = ImageName?.mime;

    console.log('fileUri....', fileUri);
    console.log('fileName....', fileName);
    console.log('fileType....', fileType);

    if (!fileUri || !fileName || !fileType) {
      console.error('Invalid image data:', ImageName);

      // Handle invalid image data
    } else {
      formData.append('profile_photo', {
        uri: fileUri,
        name: fileName,
        type: fileType,
      });
    }
    formData.append('uad_key', loginData?.Login_details?.user_account_id);
    formData.append('first_name', fullName);
    formData.append('last_name', lastName);
    formData.append('phone_number', phoneNumber);
    formData.append('country_code', accountDetails?.UAD_COUNTRY_CODE);
    formData.append('bio', about);
    formData.append('describe_yourself', selectedServices);
    formData.append('physical_address', location);
    formData.append('longitude', longitude);
    formData.append('latitude', latitude);
    console.log('formData in editmode...', formData);
    const url = Config.BASE_URL;
    const updateProfile_url = url + 'profile/updateProfile';
    console.log('Request URL:', updateProfile_url);
    setIsLoading(true);
    try {
      const response = await axios.put(updateProfile_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('updateprofile....', response.data);
      if (response?.data?.success === true) {
        alert(response?.data?.message);
        getPersonalDetails();
        props.navigation.navigate('LandlordProfile');
      }
    } catch (error) {
      // alert(error);
      console.log('update_error...', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openMap = () => {
    setIsMap(true);
  };
  const checkTabs = () => {
    switch (activeTab) {
      case 'Tab1':
        return (
          <ScrollView
            style={EditProfileStyle.mainContainer}
            contentContainerStyle={{marginBottom: 50}}>
            {IsMap || IsSearch ? null : (
              <>
                <View style={[EditProfileStyle.profilviewmain, {flex: 1}]}>
                  <TouchableOpacity
                    style={EditProfileStyle.ProfileView}
                    onPress={() => {
                      refRBSheet.current.open();
                    }}>
                    {ImageName ? (
                      <Image
                        source={{uri: ImageName.path || ImageName}}
                        style={[EditProfileStyle.logo, {borderRadius: 110 / 2}]}
                      />
                    ) : (
                      <Image
                        style={EditProfileStyle.profilelogo}
                        source={{
                          uri: accountDetails?.image_path[0],
                        }}
                        resizeMode="cover"
                      />
                    )}

                    {ImageName ? refRBSheet.current.close() : null}
                    <View style={EditProfileStyle.editlogoview}>
                      <FontAwesome
                        name="edit"
                        color={_COLORS.Kodie_GreenColor}
                        size={15}
                        style={{alignItems: 'center'}}
                        // resizeMode="center"
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={EditProfileStyle.edittext}>
                    Edit profile photo
                  </Text>
                </View>

                <Divider style={EditProfileStyle.firstdivider} />
                <View style={EditProfileStyle.inputmainview}>
                  <View style={EditProfileStyle.firstview}>
                    <Text style={EditProfileStyle.oldnumbertext}>
                      First name
                    </Text>
                    <View style={EditProfileStyle.simpleinputview}>
                      <TextInput
                        value={fullName}
                        onChangeText={validateFirstName}
                        onBlur={() => validateFirstName(fullName)}
                        placeholder="First Name"
                        placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                        style={EditProfileStyle.inputStyle}
                      />
                    </View>
                    {fullNameError ? (
                      <Text style={EditProfileStyle.errorText}>
                        {fullNameError}
                      </Text>
                    ) : null}
                  </View>
                  <View style={EditProfileStyle.firstview}>
                    <Text style={EditProfileStyle.oldnumbertext}>
                      Last name
                    </Text>
                    <View style={EditProfileStyle.simpleinputview}>
                      <TextInput
                        style={EditProfileStyle.inputStyle}
                        value={lastName}
                        onChangeText={validateLastName}
                        onBlur={() => validateLastName(lastName)}
                        placeholder="Last name"
                        placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                      />
                    </View>
                    {lastNameError ? (
                      <Text style={EditProfileStyle.errorText}>
                        {lastNameError}
                      </Text>
                    ) : null}
                  </View>
                  <View style={EditProfileStyle.firstview}>
                    <Text style={EditProfileStyle.oldnumbertext}>
                      Email address
                    </Text>
                    <View style={EditProfileStyle.simpleinputview}>
                      <TextInput
                        style={EditProfileStyle.inputStyle}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        keyboardType='email-address'
                        placeholder="jason5@gmail.com"
                        editable={false}
                      />
                    </View>
                  </View>
                  <View style={EditProfileStyle.firstview}>
                    <Text style={EditProfileStyle.oldnumbertext}>
                      Phone number
                    </Text>
                    <View
                      style={[
                        EditProfileStyle.simpleinputview,
                        {backgroundColor: _COLORS.Kodie_GrayColor},
                      ]}>
                      <TextInput
                        style={EditProfileStyle.inputStyle}
                        value={`${accountDetails?.UAD_COUNTRY_CODE || ''} ${
                          phoneNumber || ''
                        }`}
                        editable={false}
                      />
                    </View>
                  </View>
                  <View style={EditProfileStyle.inputContainer}>
                    <Text style={LABEL_STYLES.commontext}>{'Bio'}</Text>
                    <TextInput
                      style={[EditProfileStyle.input, {height: 119}]}
                      value={about}
                      onChangeText={text => setAbout(text)}
                      placeholder="Tell us a bit more about yourself"
                      placeholderTextColor="#999"
                      multiline
                      numberOfLines={5}
                      textAlignVertical={'top'}
                    />
                  </View>
                  <View style={EditProfileStyle.describeYourselfView}>
                    <Text style={EditProfileStyle.want_Heading}>
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
                  </View>
                  <View style={EditProfileStyle.firstview}>
                    <Text style={EditProfileStyle.oldnumbertext}>
                      Current physical address
                    </Text>

                    <View style={EditProfileStyle.locationContainer}>
                      <TextInput
                        style={EditProfileStyle.locationInput}
                        value={location}
                        onChangeText={text => setLocation(text)}
                        onFocus={() => {
                          setIsSearch(true);
                        }}
                        placeholder="Enter new location"
                        placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                      />
                      <TouchableOpacity
                        style={EditProfileStyle.locationIconView}
                        onPress={() => {
                          setIsMap(true);
                        }}>
                        <Octicons
                          name={'location'}
                          size={22}
                          color={_COLORS.Kodie_GreenColor}
                          style={EditProfileStyle.locationIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={EditProfileStyle.saveBackButton}>
                  <View style={EditProfileStyle.secondview}>
                    <CustomSingleButton
                      Text_Color={_COLORS.Kodie_WhiteColor}
                      borderColor={_COLORS.Kodie_TransparentColor}
                      _ButtonText={'Save and back'}
                      backgroundColor={_COLORS.Kodie_BlackColor}
                      disabled={isLoading ? true : false}
                      onPress={() => {
                        handlevalidUpdation();
                      }}
                    />
                  </View>
                </View>
              </>
            )}
          </ScrollView>
        );
      case 'Tab2':
        return (
          <>
            <CompanyDetails />
          </>
        );
      case 'Tab3':
        return <ProfileDocuments />;
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: _COLORS.Kodie_WhiteColor,
        flex: 1,
      }}>
      <TopHeader
        onPressLeftButton={() => {
          IsMap ? setIsMap(false) : IsSearch ? setIsSearch(false) : goBack();
        }}
        MiddleText={'Edit profile'}
      />
      {IsMap ? (
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}>
          <MapScreen
            style={{
              // flex:0.5,
              height: '100%',
              width: '100%',
              alignSelf: 'center',
              marginBottom: 10,
            }}
            onRegionChange={onRegionChange}
            Maplat={activeTab === 'Tab1' ? latitude : company_latitude}
            Maplng={activeTab === 'Tab1' ? longitude : company_longitude}
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
            style={EditProfileStyle.BtnContainer}
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
            if (activeTab === 'Tab1') {
              setCurrentLocation(details.formatted_address);
            } else {
              setCurrentLocation(details.formatted_address);
            }
          }}
        />
      ) : (
        <>
          <View
            style={{
              borderBottomWidth: 3,
              borderColor: _COLORS.Kodie_GrayColor,
              elevation: 1,
            }}>
            <CustomTabNavigator
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              TAB3
              Tab1={'Personal Details'}
              Tab2={'Company Details'}
              Tab3={'Documents'}
              onPressTab1={() => setActiveTab('Tab1')}
              onPressTab2={() => setActiveTab('Tab2')}
              onPressTab3={() => setActiveTab('Tab3')}
              colorTab1={
                activeTab === 'Tab1'
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              colorTab2={
                activeTab === 'Tab2'
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              colorTab3={
                activeTab === 'Tab3'
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              FONTFAMILY1={
                activeTab === 'Tab1' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
              }
              FONTFAMILY2={
                activeTab === 'Tab2' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
              }
              FONTFAMILY3={
                activeTab === 'Tab3' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
              }
              styleTab1={activeTab === 'Tab1' && EditProfileStyle.activeTab}
              styleTab2={activeTab === 'Tab2' && EditProfileStyle.activeTab}
              styleTab3={activeTab === 'Tab3' && EditProfileStyle.activeTab}
            />
          </View>
          <ScrollView>{checkTabs()}</ScrollView>
        </>
      )}
      {/*----------- first RBSheet of Edit docoment ---------*/}
      <RBSheet
        ref={refRBSheet}
        height={200}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: EditProfileStyle.bottomModal_container,
        }}>
        <View style={EditProfileStyle.upload_View}>
          <Text style={EditProfileStyle.uploadImgText}>
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
              style={EditProfileStyle.crossIconStyle}
            />
          </TouchableOpacity>
        </View>
        <UploadImageData
          heading_Text={'Upload image'}
          ImageName={handleImageNameChange}
        />
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default EditProfile;
