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
  BackHandler,
} from 'react-native';
import {CompanyDetailsStyle} from './CompanyDetailsStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {IMAGES} from '../../../../Themes';
import {Divider} from 'react-native-paper';
import {_COLORS, LABEL_STYLES} from '../../../../Themes';
import ServicesBox from '../../../../components/Molecules/ServicesBox/ServicesBox';
import axios from 'axios';
import {Config} from '../../../../Config';
import {MultiSelect} from 'react-native-element-dropdown';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import Geocoder from 'react-native-geocoding';
import MapScreen from '../../../../components/Molecules/GoogleMap/googleMap';
import SearchPlaces from '../../../../components/Molecules/SearchPlaces/SearchPlaces';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import RBSheet from 'react-native-raw-bottom-sheet';
import UploadImageData from '../../../../components/Molecules/UploadImage/UploadImage';
import {useSelector} from 'react-redux';
import IndividualInProfile from './Individual/IndividualInProfile';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import CompanyInProfileStyle from './Company/CompanyInProfileStyle';
import IndividualProfileStyle from './Individual/IndividualProfileStyle';

const windowHeight = Dimensions.get('window').height;
export default CompanyDetails = props => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginResponse.....', loginData);
  const [tabValue, setTabValue] = useState('IndividualInProfile');
  const [isLoading, setIsLoading] = useState(false);
  const [ImageName, setImageName] = useState('');
  const [UserCurrentCity, setUserCurrentCity] = useState('');
  const [UserZip_Code, setUserZip_Code] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [location, setLocation] = useState('');
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [Companylatitude, setCompanylatitude] = useState('');
  const [Companylongitude, setCompanylongitude] = useState('');
  const [Companylocation, setCompanyLocation] = useState();
  const [currentLocation, setCurrentLocation] = useState('');
  const [accountDetails, setAccountDetails] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [Indiwebsite, setIndiWebsite] = useState('');
  const [companyGSTNumber, setCompanyGSTNumber] = useState('');
  const [IndiservicesValue, setIndiservicesValue] = useState([]);
  const [servicesValue, setservicesValue] = useState([]);
  const [businessNumber, SetBusinessNumber] = useState('');
  const [kodieDescribeYourselfData, setKodieDescribeYourselfData] = useState(
    [],
  );
  const [IndikodieDescribeYourselfData, setIndiKodieDescribeYourselfData] =
    useState([]);
  const [selectJobTypeid, setSelectJobTypeid] = useState([]);
  const [IndiselectJobTypeid, setIndiSelectJobTypeid] = useState([]);
  const [selectJobType, setSelectJobType] = useState();
  const [IndiselectJobType, setIndiSelectJobType] = useState();
  const [servicesData, setServicesData] = useState([]);
  const [IndiservicesData, setIndiServicesData] = useState([]);
  const isvisible = useIsFocused();
  const [IsHeeight, SetIsHeeight] = useState(false);
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
    if (isvisible) {
      getPersonalDetails();
      handle_describe_yourself();
    }
  }, [isvisible]);
  useEffect(() => {
    if (selectJobType !== undefined && selectJobType !== null) {
      handleServices(selectJobType);
    }
  }, [selectJobType]);
  useEffect(() => {
    if (IndiselectJobType !== undefined && IndiselectJobType !== null) {
      handleIndiServices(IndiselectJobType);
    }
  }, [IndiselectJobType]);
  useEffect(() => {
    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
  }, []);
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
        if (response?.data?.status === true) {
          setIsLoading(false);
          console.log(
            'kodie_describeYouself_Data....',
            response?.data?.lookup_details,
          );
          setKodieDescribeYourselfData(response?.data?.lookup_details);
          setIndiKodieDescribeYourselfData(response?.data?.lookup_details);
        } else {
          console.error(
            'kodie_describeYouself_Data_error:',
            response?.data?.error,
          );
          // alert('Oops samthing went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('kodie_describeYouself_Data error:', error);
        // alert(error);
        setIsLoading(false);
      });
  };
  const toggleServicesSelection = lookup_key => {
    if (selectJobTypeid.includes(lookup_key)) {
      setSelectJobTypeid(prevSelected =>
        prevSelected.filter(item => item !== lookup_key),
      );
    } else {
      setSelectJobTypeid(prevSelected => [...prevSelected, lookup_key]);
    }
  };
  const toggleServicesSelection1 = lookup_key => {
    if (IndiselectJobTypeid.includes(lookup_key)) {
      setIndiSelectJobTypeid(prevSelected =>
        prevSelected.filter(item => item !== lookup_key),
      );
    } else {
      setIndiSelectJobTypeid(prevSelected => [...prevSelected, lookup_key]);
    }
  };

  const jobType_render = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <ServicesBox
          images
          Services_Name={item.lookup_description}
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
            selectJobTypeid.includes(item.lookup_key)
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_GrayColor
          }
          BoxStyling={[
            CompanySignupStyle.box_style,
            {
              backgroundColor: selectJobTypeid.includes(item.lookup_key)
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor,
            },
          ]}
          textColor={[
            CompanySignupStyle.box_Text_Style,
            {
              color: selectJobTypeid.includes(item.lookup_key)
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor,
            },
          ]}
          onPress={() => {
            toggleServicesSelection(item.lookup_key);
            setSelectJobType(item.lookup_key);
          }}
        />
      </View>
    );
  };
  const jobIndiType_render = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <ServicesBox
          images
          Services_Name={item.lookup_description}
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
            IndiselectJobTypeid.includes(item.lookup_key)
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_GrayColor
          }
          BoxStyling={[
            CompanySignupStyle.box_style,
            {
              backgroundColor: IndiselectJobTypeid.includes(item.lookup_key)
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor,
            },
          ]}
          textColor={[
            CompanySignupStyle.box_Text_Style,
            {
              color: IndiselectJobTypeid.includes(item.lookup_key)
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor,
            },
          ]}
          onPress={() => {
            toggleServicesSelection1(item.lookup_key);
            setIndiSelectJobType(item.lookup_key);
          }}
        />
      </View>
    );
  };
  const handleServices = async () => {
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

        if (response?.data?.status === true) {
          servicesDatas.push(...response?.data?.lookup_details);
          setIsLoading(false);
        } else {
          console.error(
            'company profile Services_error:',
            response?.data?.error,
          );
          // alert('Oops samthing went wrong! Please try again later.');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Services error:', error);
        setIsLoading(false);
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
    setIsLoading(false);
  };
  const handleIndiServices = async () => {
    const jobTypes = selectedselectIndiJobTypesString.split(',').map(Number);
    console.log(jobTypes, 'klhfudssdkjfhdsjk');
    const servicesDatas = [];

    setIsLoading(true);

    const fetchIndiServiceData = async jobType => {
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

        if (response?.data?.status === true) {
          servicesDatas.push(...response?.data?.lookup_details);
          setIsLoading(false);
        } else {
          console.error(
            'company profile Services_error:',
            response?.data?.error,
          );
          // alert('Oops samthing went wrong! Please try again later.');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Services error:', error);
        setIsLoading(false);
      }
    };

    const fetchIndiAllServices = async () => {
      try {
        const promises = jobTypes.map(jobType => fetchIndiServiceData(jobType));
        await Promise.all(promises);

        setIsLoading(false);
        console.log('All Services Data:', servicesDatas);

        setIndiServicesData(servicesDatas);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching services:', error);
      }
    };

    fetchIndiAllServices();
    setIsLoading(false);
  };
  const selectedselectJobTypesString = selectJobTypeid.join(',');
  const selectedselectIndiJobTypesString = IndiselectJobTypeid.join(',');

  const handleImageNameChange = async newImageName => {
    setImageName(newImageName);
    console.log('................ImageNAme', newImageName);
    console.log('................ImageNAmeDeependra', newImageName.path);
    refRBSheet.current.close();
  };

  const ConfirmAddress = () => {
    // alert(tabValue);
    setIsMap(false);
    if (tabValue == 'IndividualInProfile') {
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
    if (tabValue == 'IndividualInProfile') {
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
        if (tabValue == 'IndividualInProfile') {
          setLocation(MainFullAddress);
        } else {
          setCompanyLocation(MainFullAddress);
        }
      })
      .catch(error => console.warn(error));
  };

  const getPersonalDetails = () => {
    const url = Config.BASE_URL;
    setIsLoading(true);
    const apiUrl =
      url + `getAccount_details/${loginData.Login_details.user_id}`;

    // Make a GET request using Axios
    axios
      .get(apiUrl)
      .then(response => {
        console.log('API Response:', response?.data?.data[0]);
        setAccountDetails(response?.data?.data[0]);
        setLocation(
          response?.data?.data[0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 0
            ? response?.data?.data[0]?.UAD_COMPANY_ADDRESS
            : '',
        );
        setCompanyLocation(
          response?.data?.data[0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? response?.data?.data[0]?.UAD_COMPANY_ADDRESS
            : '',
        );
        const initialJobTypeIds = response?.data?.data[0]
          ?.UAD_CATEGORY_SERVICE_YOU_OFFER
          ? response?.data?.data[0].UAD_CATEGORY_SERVICE_YOU_OFFER.split(
              ',',
            ).map(Number)
          : [];
        const initialServiceIds = response?.data?.data[0]
          ?.UAD_SERVICE_YOU_PERFORM
          ? response?.data?.data[0].UAD_SERVICE_YOU_PERFORM.split(',').map(
              Number,
            )
          : [];
        setSelectJobTypeid(
          response?.data?.data[0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? initialJobTypeIds
            : [],
        );
        setIndiSelectJobTypeid(
          response?.data?.data[0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 0
            ? initialJobTypeIds
            : [],
        );
        setSelectJobType(
          response?.data?.data[0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? initialJobTypeIds
            : [],
        );
        setIndiSelectJobType(
          response?.data?.data[0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? initialJobTypeIds
            : [],
        );
        setservicesValue(
          response?.data?.data[0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? initialServiceIds
            : [],
        );
        setIndiservicesValue(
          response?.data?.data[0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 0
            ? initialServiceIds
            : [],
        );
        setWebsite(
          response?.data?.data[0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? response?.data?.data[0]?.UAD_WEBSITE
            : '',
        );
        setIndiWebsite(
          response?.data?.data[0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 0
            ? response?.data?.data[0]?.UAD_WEBSITE
            : '',
        );
        setCompanyName(
          response?.data?.data[0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? response?.data?.data[0]?.UAD_ORGANIZATION_NAME
            : '',
        );
        SetBusinessNumber(
          response?.data?.data[0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? response?.data?.data[0]?.UAD_AUSTR_BUSINESS_NO
            : '',
        );
        setCompanyGSTNumber(
          response?.data?.data[0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? response?.data?.data[0]?.UAD_COMPANY_GST_VAT_NO
            : '',
        );
        setIsLoading(false);
      })
      .catch(error => {
        // Handle error
        console.error('API Error PersonalDetails C:', error);
      });
  };
  useEffect(() => {
    // Set initial tab value based on accountDetails
    if (accountDetails?.UAD_HOW_TO_RUN_YOUR_BUSINESS === 0) {
      setTabValue('IndividualInProfile');
    } else if (accountDetails?.UAD_HOW_TO_RUN_YOUR_BUSINESS === 1) {
      setTabValue('CompanyInProfile');
    }
  }, [accountDetails]);
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
      tabValue === 'IndividualInProfile' ? '' : companyName,
    );
    formData.append(
      'austrialian_business_no',
      tabValue === 'IndividualInProfile' ? '' : businessNumber,
    );
    formData.append(
      'company_gst',
      tabValue === 'IndividualInProfile' ? '' : companyGSTNumber,
    );
    formData.append(
      'category_offer',
      tabValue === 'IndividualInProfile'
        ? selectedselectIndiJobTypesString
        : selectedselectJobTypesString,
    );
    formData.append(
      'service_perform',
      tabValue === 'IndividualInProfile' ? IndiservicesValue : servicesValue,
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
      tabValue === 'IndividualInProfile' ? Indiwebsite : website,
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
      if (response?.data?.success === true) {
        alert(response?.data?.message);
        navigation.navigate('LandlordProfile');
        getPersonalDetails();
        // getComapnyDetails();
      }
    } catch (error) {
      // alert(error);
      console.log('update_error UpdateCompanyData...', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkTabs = () => {
    switch (tabValue) {
      case 'IndividualInProfile':
        return (
          <View style={{flex: 1}}>
            <View style={IndividualProfileStyle.card}>
              <View>
                <Text style={IndividualProfileStyle.want_Heading}>
                  {
                    'The category of service you offer (you can select multiple options)'
                  }
                </Text>
                <FlatList
                  data={IndikodieDescribeYourselfData}
                  renderItem={jobIndiType_render}
                  keyExtractor={item => item.lookup_key}
                  numColumns={2}
                />
              </View>
              {selectedselectIndiJobTypesString == '' ? null : (
                <View style={IndividualProfileStyle.inputContainer}>
                  <Text style={LABEL_STYLES.commontext}>
                    {'The type of service you perform'}
                  </Text>
                  <MultiSelect
                    style={[IndividualProfileStyle.dropdown]}
                    placeholderStyle={IndividualProfileStyle.placeholderStyle}
                    selectedTextStyle={IndividualProfileStyle.selectedTextStyle}
                    inputSearchStyle={IndividualProfileStyle.inputSearchStyle}
                    iconStyle={IndividualProfileStyle.iconStyle}
                    search
                    activeColor={_COLORS.Kodie_MidLightGreenColor}
                    data={IndiservicesData}
                    labelField="lookup_description"
                    valueField="lookup_key"
                    placeholder="Select item"
                    searchPlaceholder="Search..."
                    value={IndiservicesValue}
                    onChange={selectedItems => {
                      setIndiservicesValue(selectedItems);
                    }}
                    selectedStyle={{
                      backgroundColor: _COLORS.Kodie_BlackColor,
                      borderRadius: 20,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              )}
              <View style={IndividualProfileStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Company physical address'}
                </Text>

                <View style={IndividualProfileStyle.inputContainer}>
                  <View style={IndividualProfileStyle.locationConView}>
                    <View style={IndividualProfileStyle.locationContainer}>
                      <TextInput
                        style={IndividualProfileStyle.locationInput}
                        value={location}
                        onChangeText={setLocation}
                        onFocus={() => setIsSearch(true)}
                        placeholder="Search location"
                        placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                      />
                    </View>
                    <TouchableOpacity
                      style={IndividualProfileStyle.locationIconView}
                      onPress={() => {
                        setIsMap(true);
                      }}>
                      <Octicons
                        name={'location'}
                        size={22}
                        color={_COLORS.Kodie_GreenColor}
                        style={IndividualProfileStyle.locationIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={IndividualProfileStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{'Website'}</Text>
                <TextInput
                  style={IndividualProfileStyle.input}
                  value={Indiwebsite}
                  onChangeText={text => {
                    setIndiWebsite(text);
                  }}
                  onFocus={() => SetIsHeeight(true)}
                  onBlur={() => SetIsHeeight(false)}
                  placeholder="Enter your website address (if you have one)"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>
            </View>
            {isLoading ? <CommonLoader /> : null}
          </View>
          // <IndividualInProfile
          //   IndividualData={handleIndividualData}
          //   handleMap={handleMapIndividualDetails}
          //   IndividualLocation={location}
          //   onChangeIndivialLocation={setLocation}
          //   IndividualOnFocus={() => setIsSearch(true)}
          // />
        );
      case 'CompanyInProfile':
        return (
          <View>
            <View style={CompanyInProfileStyle.card}>
              <View style={CompanyInProfileStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Organisation name'}
                </Text>
                <TextInput
                  style={CompanyInProfileStyle.input}
                  value={companyName}
                  onChangeText={setCompanyName}
                  placeholder="Enter the name of your company"
                  placeholderTextColor="#999"
                />
                <Text style={CompanyInProfileStyle.smstext}>
                  Your organisation name will be used in emails and SMS
                  correspondence from Kodie.
                </Text>
              </View>

              <View style={CompanyInProfileStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Australian business number'}
                </Text>
                <TextInput
                  style={[CompanyInProfileStyle.input]}
                  value={businessNumber}
                  onChangeText={SetBusinessNumber}
                  placeholder="Enter your ABN"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={CompanyInProfileStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Company GST / VAT number'}
                </Text>
                <TextInput
                  style={[CompanyInProfileStyle.input]}
                  value={companyGSTNumber}
                  onChangeText={setCompanyGSTNumber}
                  placeholder="1234567890"
                  placeholderTextColor="#999"
                />
              </View>

              <View>
                <Text style={CompanyInProfileStyle.want_Heading}>
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
                <View style={CompanyInProfileStyle.inputContainer}>
                  <Text style={[CompanyInProfileStyle.typescommontext]}>
                    {'The type of service you perform'}
                  </Text>
                  <MultiSelect
                    style={[CompanyInProfileStyle.dropdown]}
                    placeholderStyle={CompanyInProfileStyle.placeholderStyle}
                    selectedTextStyle={CompanyInProfileStyle.selectedTextStyle}
                    inputSearchStyle={CompanyInProfileStyle.inputSearchStyle}
                    iconStyle={CompanyInProfileStyle.iconStyle}
                    search
                    activeColor={_COLORS.Kodie_MidLightGreenColor}
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
                      backgroundColor: _COLORS.Kodie_BlackColor,
                      borderRadius: 20,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              )}
              <View style={CompanyInProfileStyle.inputContainer}>
                <View style={[CompanyInProfileStyle.commontextfield]}>
                  <View>
                    <Text style={CompanyInProfileStyle.companycommontext}>
                      {'Company physical address'}
                    </Text>
                    <View style={CompanyInProfileStyle.locationConView}>
                      <View style={CompanyInProfileStyle.locationContainer}>
                        <TextInput
                          style={CompanyInProfileStyle.locationInput}
                          value={Companylocation}
                          onChangeText={setCompanyLocation}
                          onFocus={() => {
                            setIsSearch(true);
                          }}
                          placeholder="Search location"
                          placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                        />
                      </View>
                      <TouchableOpacity
                        style={CompanyInProfileStyle.locationIconView}
                        onPress={() => {
                          setIsMap(true);
                        }}>
                        <Octicons
                          name={'location'}
                          size={22}
                          color={_COLORS.Kodie_GreenColor}
                          style={CompanyInProfileStyle.locationIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <View style={CompanyInProfileStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{'Website'}</Text>
                <TextInput
                  style={CompanyInProfileStyle.input}
                  value={website}
                  onChangeText={setWebsite}
                  onFocus={() => SetIsHeeight(true)}
                  onBlur={() => SetIsHeeight(false)}
                  placeholder="Enter your website address (if you have one)"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>
            </View>
            {isLoading ? <CommonLoader /> : null}
          </View>
          // <CompanyInProfile
          //   CompanyData={handleCompanyData}
          //   onPressCompanylocation={openMapCom}
          //   CompanyLocation={Companylocation}
          //   onChangeCompanyLocation={setCompanyLocation}
          //   CompanyOnFocus={() => setIsSearch(true)}
          // />
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
    <>
      {IsMap ? (
        <View style={{height: windowHeight - 200, flex: 1}}>
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
                tabValue == 'IndividualInProfile' ? latitude : Companylatitude
              }
              Maplng={
                tabValue == 'IndividualInProfile' ? longitude : Companylongitude
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
            if (tabValue == 'IndividualInProfile') {
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
          <ScrollView
            style={{flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor}}
            onScroll={isLoading ? false : true}>
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
                      style={[
                        CompanyDetailsStyle.logo,
                        {borderRadius: 110 / 2},
                      ]}
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
                  {/* {ImageName ? refRBSheet.current.close() : null} */}
                  <View style={CompanyDetailsStyle.editlogoview}>
                    <FontAwesome
                      name="edit"
                      color={_COLORS.Kodie_GreenColor}
                      size={14}
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
                      if (accountDetails?.UAD_HOW_TO_RUN_YOUR_BUSINESS === 0) {
                        setTabValue('IndividualInProfile');
                      }
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
                      if (accountDetails?.UAD_HOW_TO_RUN_YOUR_BUSINESS === 1) {
                        setTabValue('CompanyInProfile');
                      }
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
              {Platform.OS == 'ios' ? (
                <View style={{height: IsHeeight ? 120 : 0}}></View>
              ) : null}
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
          </ScrollView>
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
    </>
  );
};
