import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import {_COLORS, LABEL_STYLES} from '../../../../Themes';
import axios from 'axios';
import {Dropdown} from 'react-native-element-dropdown';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useDispatch, useSelector} from 'react-redux';
import {Config} from '../../../../Config';
import ServicesBox from '../../../../components/Molecules/ServicesBox/ServicesBox';
import {PersonContractorStyle} from './PersonContractorStyle';
export default PersonContractor = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [PhoneNumbeError, setPhoneNumberError] = useState('');
  const [note, setNote] = useState('');
  const [jobTypeData, setJobTypeData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [servicesValue, setservicesValue] = useState([]);
  const [selectJobType, setSelectJobType] = useState(166);
  const [selectJobTypeid, setSelectJobTypeid] = useState('');
  const [isClick, setIsClick] = useState(null);
  const handleClosePopup = () => {
    props.onClose();
  };
  const loginData = useSelector(state => state.authenticationReducer.data);
  const validatePersonEmail = email => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(email);
  };
  // Validation for First Name....
  const validateFirstName = text => {
    if (text === '') {
      setFirstNameError('First name is required');
    } else if (!/^[A-Za-z]+$/.test(text)) {
      setFirstNameError('First name should contain only alphabetic characters');
    } else {
      setFirstNameError('');
    }
    setFirstName(text);
  };

  // Validation for Last Name....
  const validateLastName = text => {
    if (text === '') {
      setLastNameError('Last name is required');
    } else if (!/^[A-Za-z]+$/.test(text)) {
      setLastNameError('Last name should contain only alphabetic characters');
    } else {
      setLastNameError('');
    }
    setLastName(text);
  };

  // Email validation define here....
  const handlePersonEmail = text => {
    setEmail(text);
    if (text.trim() === '') {
      setEmailError('Email is required');
    } else if (!validatePersonEmail(text)) {
      setEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      setEmailError('');
    }
  };

  // Validation for Phone Number
  const validatePhoneNumber = text => {
    const mobileReg = /^\d{10}$/;
    if (text === '') {
      setPhoneNumberError('Phone number is required');
    } else if (!mobileReg.test(text)) {
      setPhoneNumberError('Invalid phone number format');
    } else {
      setPhoneNumberError('');
    }
    setPhoneNumber(text);
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
            PersonContractorStyle.box_style,
            {
              backgroundColor:
                isClick === item.lookup_key
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          textColor={[
            PersonContractorStyle.box_Text_Style,
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
        <View style={PersonContractorStyle.itemView}>
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
          <Text style={PersonContractorStyle.textItem}>
            {item.lookup_description}
          </Text>
        </View>
      </ScrollView>
    );
  };
  const Personhandle = () => {
    console.log('servicesValue..................', selectJobTypeid);
    const PersonDetailsData = {
      User_USP_KEY: loginData.Login_details.user_id,
      User_Account_UDP_KEY: loginData.Login_details.user_account_id,
      UACP_IS_COMPANY: 0,
      FIRST_NAME: firstName,
      LAST_NAME: lastName,
      ORGANISATION_NAME: '',
      CATEGORY_CONTRACTOR: selectJobTypeid,
      CONTRACTOR_PROFESSION: servicesValue,
      EMAIL: email,
      PHONE_NUMBER: PhoneNumber,
      MOBILE_NUMBER: '',
      WEBSITE: '',
      NOTES: note,
    };
    const url = Config.BASE_URL;
    const PersonUrl = url + 'invitecontractor_details';
    console.log('Request URL:', PersonUrl);
    setIsLoading(true);

    axios
      .post(PersonUrl, PersonDetailsData)
      .then(response => {
        console.log('Person Details_data response', response?.data);
        if (response?.data?.success == true || response?.data?.error == false) {
          alert(response?.data?.message);
          setIsLoading(false);
          setFirstName('');
          setLastName('');
          setEmail('');
          setPhoneNumber('');
          setPhoneNumber('');
          setNote('');
          props.onCloseSave();
          setIsLoading(false);
        } else {
          setEmailError(response?.data?.message);
          console.error('personDetail_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('personDetail error...:', error);
        alert(error);
        setIsLoading(false);
      });
  };
  // setEmailError(response?.data?.message);
  // props.navigation.navigate("LeaseSummary");
  const handleSaveBtn = () => {
    if (firstName.trim() === '') {
      setFirstNameError('First name is required.');
    } else if (lastName.trim() === '') {
      setLastNameError('Last name is required.');
    } else if (email.trim() == '') {
      setEmailError('Email is required.');
    } else {
      Personhandle();
    }
  };

  return (
    <KeyboardAvoidingView
      style={PersonContractorStyle.mainConatainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <View style={PersonContractorStyle.card}>
          <View style={PersonContractorStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'First name*'}</Text>
            <TextInput
              style={PersonContractorStyle.input}
              value={firstName}
              onChangeText={validateFirstName}
              placeholder="Enter tenant’s first name"
              placeholderTextColor="#999"
            />
            <Text style={PersonContractorStyle.errorText}>
              {firstNameError}
            </Text>
          </View>

          <View style={PersonContractorStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Last name*'}</Text>
            <TextInput
              style={PersonContractorStyle.input}
              value={lastName}
              onChangeText={validateLastName}
              placeholder="Enter tenant’s last name"
              placeholderTextColor="#999"
            />
            <Text style={PersonContractorStyle.errorText}>{lastNameError}</Text>
          </View>
          <View style={PersonContractorStyle.inputContainer}>
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
          <View style={PersonContractorStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {'Select the contractor’s profession*'}
            </Text>
            <Dropdown
              style={PersonContractorStyle.dropdown}
              placeholderStyle={PersonContractorStyle.placeholderStyle}
              selectedTextStyle={PersonContractorStyle.selectedTextStyle}
              inputSearchStyle={PersonContractorStyle.inputSearchStyle}
              iconStyle={PersonContractorStyle.iconStyle}
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
          <View style={[PersonContractorStyle.inputContainer, {}]}>
            <Text style={LABEL_STYLES.commontext}>{'Email*'}</Text>
            <TextInput
              style={PersonContractorStyle.input}
              value={email}
              onChangeText={setEmail}
              onBlur={() => handlePersonEmail(email)}
              // onChangeText={() => handlePersonEmail(email)}
              placeholder="Enter tenant’s email address"
              placeholderTextColor="#999"
            />
            <Text style={PersonContractorStyle.errorText}>{emailError}</Text>
          </View>

          <View style={PersonContractorStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {'Phone number (mobile preferred)'}
            </Text>
            <TextInput
              style={PersonContractorStyle.input}
              value={PhoneNumber}
              onChangeText={setPhoneNumber}
              onBlur={() => validatePhoneNumber(PhoneNumber)}
              placeholder="Enter tenant’s mobile number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={10}
            />
            <Text style={PersonContractorStyle.errorText}>
              {PhoneNumbeError}
            </Text>
          </View>
          <View style={PersonContractorStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Notes'}</Text>
            <TextInput
              style={[PersonContractorStyle.input, {height: 100}]}
              value={note}
              onChangeText={setNote}
              placeholder="Enter any notes about your tenant"
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={'top'}
            />
          </View>
          <View style={PersonContractorStyle.ButtonView}>
            <TouchableOpacity
              style={[
                PersonContractorStyle.closeText,
                PersonContractorStyle.applyText,
                {
                  backgroundColor: _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                // handleOptionClick("Cancel");
              }}>
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  {
                    color: _COLORS.Kodie_BlackColor,
                  },
                ]}>
                {'Cancel'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                PersonContractorStyle.applyText,
                {
                  backgroundColor: _COLORS.Kodie_BlackColor,
                },
              ]}
              onPress={() => {
                handleSaveBtn();
                // handleOptionClick("Save");
              }}>
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  PersonContractorStyle.text,
                  {
                    color: _COLORS.Kodie_WhiteColor,
                  },
                ]}>
                {' Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </KeyboardAvoidingView>
  );
};
