import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import CompanyInProfileStyle from './CompanyInProfileStyle';
import PhoneInput from 'react-native-phone-number-input';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import {MultiSelect} from 'react-native-element-dropdown';
import {_COLORS, FONTFAMILY, LABEL_STYLES} from '../../../../../Themes';
import {Divider} from 'react-native-paper';
import {IMAGES} from '../../../../../Themes';
import Octicons from 'react-native-vector-icons/Octicons';
import {Config} from '../../../../../Config';
import ServicesBox from '../../../../../components/Molecules/ServicesBox/ServicesBox';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

import {useSelector} from 'react-redux';
const data = [
  {lookup_key: 1, lookup_description: 'Item 1'},
  {lookup_key: 2, lookup_description: 'Item 2'},
  {lookup_key: 3, lookup_description: 'Item 3'},
  {lookup_key: 4, lookup_description: 'Item 4'},
];

const CompanyInProfile = ({
  CompanyData,
  CompanyLocation,
  CompanyOnFocus,
  onPressCompanylocation,
  onChangeCompanyLocation,
}) => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginResponse.....', loginData);
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [companyGSTNumber, setCompanyGSTNumber] = useState('');
  const [location, setLocation] = useState('');
  const [servicesValue, setservicesValue] = useState([]);
  const [businessNumber, SetBusinessNumber] = useState('');
  const [kodieDescribeYourselfData, setKodieDescribeYourselfData] = useState(
    [],
  );
  const [p_latitude, setP_latitude] = useState('');
  const [p_longitude, setP_longitude] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [selectJobTypeid, setSelectJobTypeid] = useState([]);
  const [selectJobType, setSelectJobType] = useState();
  const [servicesData, setServicesData] = useState([]);
  const [accountDetails, setAccountDetails] = useState(null);
  const isvisible = useIsFocused();
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
            CompanyInProfileStyle.box_style,
            {
              backgroundColor: selectJobTypeid.includes(item.lookup_key)
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor,
            },
          ]}
          textColor={[
            CompanyInProfileStyle.box_Text_Style,
            {
              color: selectJobTypeid.includes(item.lookup_key)
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor,
            },
          ]}
          onPress={() => {
            toggleSelection(item.lookup_key);
            setSelectJobType(item.lookup_key);
          }}
        />
      </View>
    );
  };

  const selectedselectJobTypesString = selectJobTypeid.join(',');

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
          alert('Oops samthing went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('kodie_describeYouself_Data error:', error);
        alert(error);
        setIsLoading(false);
      });
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

        if (response.data.status === true) {
          servicesDatas.push(...response.data.lookup_details);
          setIsLoading(false);
        } else {
          console.error('company profile Services_error:', response.data.error);
          alert('Oops samthing went wrong! Please try again later.');
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

  const getPersonalDetails = () => {
    setIsLoading(true);
    const url = Config.BASE_URL;

    const apiUrl =
      url + `getAccount_details/${loginData.Login_details.user_id}`;

    axios
      .get(apiUrl)
      .then(response => {
        console.log('API Response:', response.data.data[0][0]);
        setAccountDetails(response.data.data[0][0]);
        const initialJobTypeIds = response.data.data[0][0]
          ?.UAD_CATEGORY_SERVICE_YOU_OFFER
          ? response.data.data[0][0].UAD_CATEGORY_SERVICE_YOU_OFFER.split(
              ',',
            ).map(Number)
          : [];
        const initialServiceIds = response.data.data[0][0]
          ?.UAD_SERVICE_YOU_PERFORM
          ? response.data.data[0][0].UAD_SERVICE_YOU_PERFORM.split(',').map(
              Number,
            )
          : [];
        setSelectJobTypeid(
          response.data.data[0][0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? initialJobTypeIds
            : [],
        );
        setservicesValue(
          response.data.data[0][0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? initialServiceIds
            : [],
        );
        setWebsite(
          response.data.data[0][0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? response.data.data[0][0]?.UAD_WEBSITE
            : '',
        );
        setCompanyName(
          response.data.data[0][0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? response.data.data[0][0]?.UAD_ORGANIZATION_NAME
            : '',
        );
        SetBusinessNumber(
          response.data.data[0][0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? response.data.data[0][0]?.UAD_AUSTR_BUSINESS_NO
            : '',
        );
        setCompanyGSTNumber(
          response.data.data[0][0]?.UAD_HOW_TO_RUN_YOUR_BUSINESS == 1
            ? response.data.data[0][0]?.UAD_COMPANY_GST_VAT_NO
            : '',
        );
        setIsLoading(false);
      })
      .catch(error => {
        // Handle error
        console.error('API Error PersonalDetails CIP:', error);
      });
  };

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
    CompanyData({
      companyName: companyName,
      businessNumber: businessNumber,
      selectJobType: selectedselectJobTypesString,
      servicesValue: servicesValue,
      website: website,
      CompanyGst: companyGSTNumber,
    });
  }, [
    companyName,
    website,
    businessNumber,
    selectedselectJobTypesString,
    servicesValue,
    p_latitude,
    p_longitude,
    companyGSTNumber,
  ]);

  return (
    <View>
      {isLoading ? (
        <CommonLoader />
      ) : (
        <View style={CompanyInProfileStyle.card}>
          <View style={CompanyInProfileStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Organisation name'}</Text>
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
                      value={CompanyLocation}
                      onChangeText={onChangeCompanyLocation}
                      onFocus={CompanyOnFocus}
                      placeholder="Search location"
                      placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                    />
                  </View>
                  <TouchableOpacity
                    style={CompanyInProfileStyle.locationIconView}
                    onPress={onPressCompanylocation}>
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
              placeholder="Enter your website address (if you have one)"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default CompanyInProfile;
