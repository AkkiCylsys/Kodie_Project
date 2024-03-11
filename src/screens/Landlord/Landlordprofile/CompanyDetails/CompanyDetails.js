import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import {CompanyDetailsStyle} from './CompanyDetailsStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IMAGES} from '../../../../Themes';
import {Divider} from 'react-native-paper';
import {_COLORS, LABEL_STYLES} from '../../../../Themes';
import ServicesBox from '../../../../components/Molecules/ServicesBox/ServicesBox';
import axios from 'axios';
import {Config} from '../../../../Config';
import {Dropdown} from 'react-native-element-dropdown';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';

import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import MapScreen from '../../../../components/Molecules/GoogleMap/googleMap';
import SearchPlaces from '../../../../components/Molecules/SearchPlaces/SearchPlaces';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import RBSheet from 'react-native-raw-bottom-sheet';
import UploadImageData from '../../../../components/Molecules/UploadImage/UploadImage';
import {useDispatch, useSelector} from 'react-redux';
import PhoneInput from 'react-native-phone-number-input';
import CompanyInProfile from './Company/CompanyInProfile';
import IndividualInProfile from './Individual/IndividualInProfile';
import TopHeader from '../../../../components/Molecules/Header/Header';
const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
];
const windowHeight = Dimensions.get('window').height;
export default CompanyDetails = props => {
  const maplocation = props.maplocation;
  const company_latitude = props.latitude;
  const comapny_longitude = props.longitude;

  console.log('maplocation....', maplocation);
  console.log('latitude_company....', company_latitude);
  console.log('longitude company....', comapny_longitude);

  // isSearch = props.isSearch;
  const refRBSheet = useRef();
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginResponse.....', loginData);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [ImageName, setImageName] = useState('');
  const [Individual, setIndividual] = useState({});
  const [CompanyCome, setCompanyCome] = useState({});
  const [UserCurrentCity, setUserCurrentCity] = useState('');
  const [UserZip_Code, setUserZip_Code] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [Companylatitude, setCompanylatitude] = useState('');
  const [Companylongitude, setCompanylongitude] = useState('');
  const [Companylocation, setCompanyLocation] = useState();
  const [currentLocation, setCurrentLocation] = useState('');
  const [accountDetails, setAccountDetails] = useState(null);
  console.log('formattedValue....', CompanyCome);
  const handleImageNameChange = async newImageName => {
    setImageName(newImageName);
    console.log('................ImageNAme', newImageName);
    console.log('................ImageNAmeDeependra', newImageName.path);
  };

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
  useEffect(() => {
    getPersonalDetails();
  }, []); // Call this useEffect only once on component mount
  useEffect(() => {
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
  }, []);
  const openMapCom = () => {
    setIsMap(true);
    console.log('Location pressed');
  };
  const getPersonalDetails = () => {
    const url = Config.BASE_URL;

    const apiUrl =
      url + `getAccount_details/${loginData.Login_details.user_id}`;

    // Make a GET request using Axios
    axios
      .get(apiUrl)
      .then(response => {
        console.log('API Response:', response.data.data[0][0]);
        setAccountDetails(response.data.data[0][0]);
        setLocation(
          response.data.data[0][0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 0
            ? response.data.data[0][0]?.UAD_CURR_PHYSICAL_ADD
            : '',
        );
        setCompanyLocation(
          response.data.data[0][0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? response.data.data[0][0]?.UAD_CURR_PHYSICAL_ADD
            : '',
        );
      })
      .catch(error => {
        // Handle error
        console.error('API Error:', error);
      });
  };
  const UpdateCompanyData = async () => {
    const formData = new FormData();

    const fileUri = ImageName.path;
    const fileName = fileUri
      ? fileUri.substring(fileUri.lastIndexOf('/') + 1)
      : null;
    const fileType = ImageName.mime;

    console.log('fileUri....', fileUri);
    console.log('fileName....', fileName);
    console.log('fileType....', fileType);

    if (!fileUri || !fileName || !fileType) {
      console.error('Invalid image data:', ImageName);
      // Handle invalid image data
    } else {
      formData.append('company_logo', {
        uri: fileUri,
        name: fileName,
        type: fileType,
      });
    }
    formData.append('account_id', loginData?.Login_details?.user_account_id);
    formData.append('run_business', tabValue === 'IndividualInProfile' ? 0 : 1);
    formData.append(
      'organisation_name',
      tabValue === 'IndividualInProfile' ? '' : CompanyCome.companyName,
    );
    formData.append(
      'austrialian_business_no',
      tabValue === 'IndividualInProfile' ? '' : CompanyCome.businessNumber,
    );
    formData.append(
      'company_gst',
      tabValue === 'IndividualInProfile' ? '' : CompanyCome.CompanyGst,
    );
    formData.append(
      'category_offer',
      tabValue === 'IndividualInProfile'
        ? Individual.selectJobType
        : CompanyCome.selectJobType,
    );
    formData.append(
      'service_perform',
      tabValue === 'IndividualInProfile'
        ? Individual.servicesValue
        : CompanyCome.servicesValue,
    );
    formData.append(
      'company_address',
      tabValue === 'IndividualInProfile' ? location : Companylocation,
    );
    formData.append(
      'company_longitude',
      tabValue === 'IndividualInProfile' ? longitude : Companylongitude,
    );
    formData.append(
      'company_latitude',
      tabValue === 'IndividualInProfile' ? latitude : Companylatitude,
    );
    formData.append(
      'website',
      tabValue === 'IndividualInProfile'
        ? Individual.website
        : CompanyCome.website,
    );
    console.log('formData', formData);
    const url = Config.BASE_URL;
    const updateCompanyData_url = url + 'profile/updateusercompanydata';
    console.log('Request URL:', updateCompanyData_url);
    setIsLoading(true);
    try {
      const response = await axios.put(updateCompanyData_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('UpdateCompanyData....', response.data);
      if (response.data.success === true) {
        alert(response.data.message);
        getPersonalDetails();
        // getComapnyDetails();
      }
    } catch (error) {
      alert(error);
      console.log('update_error UpdateCompanyData...', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleIndividualData = e => {
    console.log(e);
    setIndividual(e);
  };
  const handleCompanyData = e => {
    setCompanyCome(e);
  };
  const [tabValue, setTabValue] = useState('IndividualInProfile');
  const checkTabs = () => {
    switch (tabValue) {
      case 'IndividualInProfile':
        return (
          <IndividualInProfile
            IndividualData={handleIndividualData}
            handleMap={handleMapIndividualDetails}
            IndividualLocation={location}
            onChangeIndivialLocation={setLocation}
            IndividualOnFocus={() => setIsSearch(true)}
          />
        );
      case 'CompanyInProfile':
        return (
          <CompanyInProfile
            CompanyData={handleCompanyData}
            onPressCompanylocation={openMapCom}
            CompanyLocation={Companylocation}
            onChangeCompanyLocation={setCompanyLocation}
            CompanyOnFocus={() => setIsSearch(true)}
          />
        );
      default:
        return <IndividualInProfile />;
    }
  };
  const handleMapIndividualDetails = () => {
    // alert('company details....');
    setIsMap(true);
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor}}>
      {IsMap ? (
        <View style={{height: windowHeight - 135, flex: 1}}>
          <View
            style={{
              // flex: 1,
              backgroundColor: 'transparent',
              alignItems: 'center',
              height: '100%',
              // marginTop: 100,
            }}>
            <MapScreen
              style={{
                height: '100%',
                width: '100%',
                alignSelf: 'center',
                marginBottom: 10,
              }}
              onRegionChange={onRegionChange}
              Maplat={
                tabValue == 'IndividualSignup' ? latitude : Companylatitude
              }
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
              style={CompanyDetailsStyle.BtnContainer}
              onPress={ConfirmAddress}>
              <Image source={IMAGES?.Shape} style={{height: 25, width: 25}} />
            </TouchableOpacity>
          </View>
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
          <View style={CompanyDetailsStyle.mainContaier}>
            <View style={[CompanyDetailsStyle.profilviewmain, {flex: 1}]}>
              <TouchableOpacity
                style={CompanyDetailsStyle.ProfileView}
                onPress={() => {
                  refRBSheet.current.open();
                }}>
                {ImageName ? (
                  <Image
                    source={{uri: ImageName.path || ImageName}}
                    style={[CompanyDetailsStyle.logo, {borderRadius: 110 / 2}]}
                  />
                ) : (
                  <Image
                    style={CompanyDetailsStyle.profilelogo}
                    source={{
                      uri: `https://kodieapis.cylsys.com/upload/photo/${accountDetails?.UAD_Company_logo}`,
                    }}
                    resizeMode="cover"
                  />
                )}
                {ImageName ? refRBSheet.current.close() : null}
                <View style={CompanyDetailsStyle.editlogoview}>
                  <FontAwesome
                    name="edit"
                    color={_COLORS.Kodie_GreenColor}
                    size={18}
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <Text style={CompanyDetailsStyle.edittext}>
                Edit company logo
              </Text>
            </View>
            <Divider style={CompanyDetailsStyle.firstdivider} />

            {/* Tab component code here...... */}
            <View style={CompanyDetailsStyle.tabmainview}>
              <Text style={CompanyDetailsStyle.tabheadingtext}>
                How do you run your business?
              </Text>
              <View style={CompanyDetailsStyle.btn_main_view}>
                <TouchableOpacity
                  style={[
                    CompanyDetailsStyle.person_view,
                    {
                      backgroundColor:
                        tabValue === 'IndividualInProfile'
                          ? _COLORS.Kodie_GreenColor
                          : _COLORS.Kodie_WhiteColor,
                    },
                  ]}
                  onPress={() => {
                    setTabValue('IndividualInProfile');
                  }}>
                  <Text
                    style={[
                      CompanyDetailsStyle.person_text,
                      {
                        color:
                          tabValue === 'IndividualInProfile'
                            ? _COLORS.Kodie_WhiteColor
                            : _COLORS.Kodie_BlackColor,
                      },
                    ]}>
                    {'Individual'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    CompanyDetailsStyle.person_view,
                    {
                      backgroundColor:
                        tabValue === 'CompanyInProfile'
                          ? _COLORS.Kodie_GreenColor
                          : _COLORS.Kodie_WhiteColor,
                    },
                  ]}
                  onPress={() => {
                    setTabValue('CompanyInProfile');
                  }}>
                  <Text
                    style={[
                      CompanyDetailsStyle.company_text,
                      {
                        color:
                          tabValue === 'CompanyInProfile'
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
            <View style={CompanyDetailsStyle.saveBackButton}>
              <View style={CompanyDetailsStyle.secondview}>
                <CustomSingleButton
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  borderColor={_COLORS.Kodie_TransparentColor}
                  _ButtonText={'Save and back'}
                  backgroundColor={_COLORS.Kodie_BlackColor}
                  disabled={isLoading ? true : false}
                  onPress={() => {
                    UpdateCompanyData();
                  }}
                />
              </View>
            </View>
          </View>
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
              container: CompanyDetailsStyle.bottomModal_container,
            }}>
            <View style={CompanyDetailsStyle.upload_View}>
              <Text style={CompanyDetailsStyle.uploadImgText}>
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
                  style={CompanyDetailsStyle.crossIconStyle}
                />
              </TouchableOpacity>
            </View>
            <UploadImageData
              heading_Text={'Upload image'}
              ImageName={handleImageNameChange}
            />
          </RBSheet>
        </>
      )}
      {isLoading ? <CommonLoader /> : null}
    </ScrollView>
  );
};
