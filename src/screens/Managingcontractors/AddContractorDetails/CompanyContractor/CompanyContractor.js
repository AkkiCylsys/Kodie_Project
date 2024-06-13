import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {_COLORS, LABEL_STYLES} from '../../../../Themes';
import {useDispatch, useSelector} from 'react-redux';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import axios from 'axios';
import {Config} from '../../../../Config';
import {Dropdown} from 'react-native-element-dropdown';
import ServicesBox from '../../../../components/Molecules/ServicesBox/ServicesBox';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {CompanyContractorStyle} from './CompanyContractorStyle';

export default CompanyContractor = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const property_id = props.property_id;
  const [companyName, setCompanyName] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [PhoneNumberError, setPhoneNumberError] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [note, setNote] = useState('');
  const [website, setWebsite] = useState('');
  const [selectedOption, setSelectedOption] = useState('Save');
  const [companyResponse, setCompanyResponse] = useState('');
  const [jobTypeData, setJobTypeData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [servicesValue, setservicesValue] = useState([]);
  const [selectJobType, setSelectJobType] = useState(166);
  const [selectJobTypeid, setSelectJobTypeid] = useState('');
  const [isClick, setIsClick] = useState(null);
  const handleOptionClick = option => {
    setSelectedOption(option);
  };

  //... Regex signup email validation
  const validateCompanyEmail = email => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(email);
  };
  // Validation for First Name....
  const validateCompanyName = text => {
    if (text === '') {
      setCompanyNameError('Organisation name is required!');
    } else if (!/^[A-Za-z]+$/.test(text)) {
      setCompanyNameError(
        'Organisation name should contain only alphabetic characters',
      );
    } else {
      setCompanyNameError('');
    }
    setCompanyName(text);
  };

  // Email validation define here....
  const handleCompanyEmail = text => {
    setEmail(text);
    if (text.trim() === '') {
      setEmailError('Email is required!');
    } else if (!validateCompanyEmail(text)) {
      setEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      setEmailError('');
    }
  };

  // Validation for Phone Number
  const validatePhoneNumber = text => {
    const mobileReg = /^\d{6}$/;
    if (text === '') {
      setPhoneNumberError('Phone number is required!');
    } else if (!mobileReg.test(text)) {
      setPhoneNumberError('Invalid phone number format');
    } else {
      setPhoneNumberError('');
    }
    setPhoneNumber(text);
  };
  // Validation for Phone Number
  const validateMobileNumber = text => {
    const mobileReg = /^\d{10}$/;
    if (text === '') {
      setMobileNumberError('Phone number is required!');
    } else if (!mobileReg.test(text)) {
      setMobileNumberError('Invalid phone number format');
    } else {
      setMobileNumberError('');
    }
    setMobileNumber(text);
  };

  const handleClosePopup = () => {
    props.onCloseSave();
  };
  // API bind person code here.....
  const Companyhandle = () => {
    // const url = Config.API_URL;
    // const PersonUrl = url + "user_signup";
    const CompanyDetailsData = {
      User_USP_KEY: loginData.Login_details.user_id,
      User_Account_UDP_KEY: loginData.Login_details.user_account_id,
      UACP_IS_COMPANY: 1,
      FIRST_NAME: '',
      LAST_NAME: '',
      ORGANISATION_NAME: companyName,
      CATEGORY_CONTRACTOR: selectJobTypeid,
      CONTRACTOR_PROFESSION: servicesValue,
      EMAIL: email,
      PHONE_NUMBER: PhoneNumber,
      MOBILE_NUMBER: mobileNumber,
      WEBSITE: website,
      NOTES: note,
    };
    const url = Config.BASE_URL;
    const CompanyUrl = url + 'invitecontractor_details';
    console.log('Request URL:', CompanyUrl);
    setIsLoading(true);

    axios
      .post(CompanyUrl, CompanyDetailsData)
      .then(response => {
        setCompanyResponse(response?.data);
        console.log('Company Details_data response', response?.data);
        if (
          response?.data?.success === true ||
          response?.data?.error == false
        ) {
          // props.navigation.navigate("LeaseSummary");
          alert(response?.data?.message);
          // setIsLoading(false);
          setCompanyName('');
          setEmail('');
          setPhoneNumber('');
          setMobileNumber('');
          setNote('');
          website('');
          selectJobTypeid('');
          props.onCloseSave();
          setIsLoading(false);
        } else {
          setEmailError(response?.data?.message);
          console.error('CompanyDetail_error:', response?.data?.error);
          alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('CompanyDetail error...:', error);
        setIsLoading(false);
      });
  };

  const handleSaveBtn = () => {
    if (companyName.trim() === '') {
      setCompanyNameError('Organisation name is required!');
    } else if (email.trim() == '') {
      setEmailError('Email is required!');
    } else {
      Companyhandle();
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
            isClick === item.lookup_key
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_GrayColor
          }
          BoxStyling={[
            CompanyContractorStyle.box_style,
            {
              backgroundColor:
                isClick === item.lookup_key
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          textColor={[
            CompanyContractorStyle.box_Text_Style,
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
  useEffect(() => {
    handleJobType();

    if (selectJobType !== null) {
      handleServices(selectJobType);
    }
  }, [selectJobType]);
  const handleJobType = () => {
    const propertyData = {
      P_PARENT_CODE: 'JOB_TYPE',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const propertyType = url + 'lookup_details';
    console.log('Request URL:', propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then(response => {
        console.log('JobType...', response?.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          console.log('JobTypeData....', response?.data?.lookup_details);
          setJobTypeData(response?.data?.lookup_details);
        } else {
          console.error('JobType_error:', response?.data?.error);
          alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('JobType error:', error);
        alert(error);
        setIsLoading(false);
      });
  };
  const handleBoxPress = lookup_key => {
    setIsClick(lookup_key);
    setSelectJobTypeid(lookup_key);
    // alert(selectJobTypeid);
    // alert(isClick)
  };
  const handleServices = selectJobType => {
    const propertyData = {
      P_PARENT_CODE:
        selectJobType === 166
          ? 'HOME_CLEANING'
          : selectJobType === 167
          ? 'OUTDOOR_CLEANING'
          : selectJobType === 168
          ? 'HEAVY_LIFTING'
          : selectJobType === 169
          ? 'FIXING_AND_MAINTENANCE'
          : null,
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const propertyType = url + 'lookup_details';
    console.log('Request URL:', propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then(response => {
        console.log('ServicesType...', response?.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          console.log('ServicesTypeData....', response?.data?.lookup_details);
          setServicesData(response?.data?.lookup_details);
        } else {
          console.error('Services_error:', response?.data?.error);
          alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Services error:', error);
        // alert(error);
        setIsLoading(false);
      });
  };
  const lookingServices_render = item => {
    return (
      <ScrollView contentContainerStyle={{flex: 1, height: '100%'}}>
        <View style={CompanyContractorStyle.itemView}>
          {item.lookup_key === servicesValue ? (
            <Fontisto
              color={_COLORS.Kodie_GreenColor}
              name={'radio-btn-active'}
              size={20}
            />
          ) : (
            <Fontisto
              color={_COLORS.Kodie_GreenColor}
              name={'radio-btn-passive'}
              size={20}
            />
          )}
          <Text style={CompanyContractorStyle.textItem}>
            {item.lookup_description}
          </Text>
        </View>
      </ScrollView>
    );
  };
  return (
    <View style={CompanyContractorStyle.mainConatainer}>
      <ScrollView>
        <View style={CompanyContractorStyle.card}>
          <View style={CompanyContractorStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Organisation name*'}</Text>
            <TextInput
              style={CompanyContractorStyle.input}
              value={companyName}
              onChangeText={validateCompanyName}
              placeholder="Enter company’s name"
              placeholderTextColor="#999"
            />
            <Text style={CompanyContractorStyle.errorText}>
              {companyNameError}
            </Text>
          </View>

          <View style={CompanyContractorStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {'Select the category of contractor*'}
            </Text>

            <FlatList
              data={jobTypeData}
              keyExtractor={item => item.lookup_key.toString()}
              renderItem={jobType_render}
              numColumns={2}
            />
          </View>
          <View style={CompanyContractorStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {'Select the contractor’s profession*'}
            </Text>
            <Dropdown
              style={CompanyContractorStyle.dropdown}
              placeholderStyle={CompanyContractorStyle.placeholderStyle}
              selectedTextStyle={CompanyContractorStyle.selectedTextStyle}
              inputSearchStyle={CompanyContractorStyle.inputSearchStyle}
              iconStyle={CompanyContractorStyle.iconStyle}
              data={servicesData}
              search
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={servicesValue}
              onChange={item => {
                setservicesValue(item.lookup_key);
                // alert(item.lookup_key)
              }}
              renderItem={lookingServices_render}
            />
          </View>
          <View style={CompanyContractorStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Email*'}</Text>
            <TextInput
              style={CompanyContractorStyle.input}
              value={email}
              onChangeText={setEmail}
              onBlur={() => handleCompanyEmail(email)}
              placeholder="Enter company’s email address"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
            <Text style={CompanyContractorStyle.errorText}>{emailError}</Text>
          </View>
          <View style={CompanyContractorStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Phone number'}</Text>
            <TextInput
              style={CompanyContractorStyle.input}
              value={PhoneNumber}
              onChangeText={setPhoneNumber}
              onBlur={() => validatePhoneNumber(PhoneNumber)}
              placeholder="Enter company’s phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={6}
            />
            <Text style={CompanyContractorStyle.errorText}>
              {PhoneNumberError}
            </Text>
          </View>
          <View style={CompanyContractorStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Mobile number'}</Text>
            <TextInput
              style={CompanyContractorStyle.input}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              onBlur={() => validateMobileNumber(mobileNumber)}
              placeholder="Enter company’s mobile number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={10}
            />
            <Text style={CompanyContractorStyle.errorText}>
              {mobileNumberError}
            </Text>
          </View>
          <View style={CompanyContractorStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Website'}</Text>
            <TextInput
              style={[CompanyContractorStyle.input]}
              value={website}
              onChangeText={setWebsite}
              placeholder="Enter contractor’s mobile number"
              placeholderTextColor="#999"
            />
          </View>
          <View style={CompanyContractorStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Notes'}</Text>
            <TextInput
              style={[CompanyContractorStyle.input, {height: 100}]}
              value={note}
              onChangeText={setNote}
              placeholder="Enter any notes about your tenant"
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={'top'}
            />
          </View>
          <View style={CompanyContractorStyle.ButtonView}>
            <TouchableOpacity
              style={[
                CompanyContractorStyle.closeText,
                CompanyContractorStyle.applyText,
                {
                  backgroundColor:
                    selectedOption == 'Cancel'
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                handleOptionClick('Cancel');
              }}>
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  {
                    color:
                      selectedOption == 'Cancel'
                        ? _COLORS.Kodie_WhiteColor
                        : null,
                  },
                ]}>
                {'Cancel'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                CompanyContractorStyle.applyText,
                {
                  backgroundColor:
                    selectedOption == 'Save'
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                handleSaveBtn();
                // handleOptionClick("Save");
              }}>
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  CompanyContractorStyle.text,
                  {
                    color:
                      selectedOption == 'Save'
                        ? _COLORS.Kodie_WhiteColor
                        : null,
                  },
                ]}>
                {' Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
