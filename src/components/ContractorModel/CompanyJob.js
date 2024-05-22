import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import { CompanyJobStyle } from "./CompanyStyle";
import {CompanyJobStyle} from './CompanyJobStyle';
// import { _COLORS, LABEL_STYLES } from "../../../../../../../../Themes";
import {_COLORS, LABEL_STYLES} from '../../Themes';
// import { useDispatch, useSelector } from "react-redux";
import {useDispatch, useSelector} from 'react-redux';
// import { CommonLoader } from "../../../../../../../../components/Molecules/ActiveLoader/ActiveLoader";
import {CommonLoader} from '../Molecules/ActiveLoader/ActiveLoader';
// import axios from "axios";
import axios from 'axios';
import {Config} from '../../Config';

export default CompanyJob = props => {
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
  const [selectedOption, setSelectedOption] = useState('Save');
  const [companyResponse, setCompanyResponse] = useState('');
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
  const CompanyDetailsData = {
    user_key: loginData.Login_details.user_id,
    upd_key: property_id,
    org_name: companyName,
    email: email,
    phone_number: PhoneNumber,
    mobile_number: mobileNumber,
    notes: note,
  };

  // API bind person code here.....
  const Companyhandle = () => {
    const url = Config.BASE_URL;
    // const PersonUrl = url + "user_signup";
    const CompanyUrl = url + 'tanant_details/create/company';
    console.log('Request URL:', CompanyUrl);
    setIsLoading(true);

    axios
      .post(CompanyUrl, CompanyDetailsData)
      .then(response => {
        setCompanyResponse(response?.data);
        console.log('Company Details_data response', response?.data);
        if (response?.data.success === true) {
          // props.navigation.navigate("LeaseSummary");
          alert(response?.data.message);
          // setIsLoading(false);
          setCompanyName('');
          setEmail('');
          setPhoneNumber('');
          setMobileNumber('');
          setNote('');
          setIsLoading(false);
        } else {
          setEmailError(response?.data.message);
          console.error('CompanyDetail_error:', response?.data.error);
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
  return (
    <View style={CompanyJobStyle.mainConatainer}>
      <ScrollView>
        <View style={CompanyJobStyle.card}>
          <View style={CompanyJobStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Organisation name*'}</Text>
            <TextInput
              style={CompanyJobStyle.input}
              value={companyName}
              onChangeText={validateCompanyName}
              placeholder="Enter company’s name"
              placeholderTextColor="#999"
            />
            <Text style={CompanyJobStyle.errorText}>{companyNameError}</Text>
          </View>
          <View style={CompanyJobStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Email*'}</Text>
            <TextInput
              style={CompanyJobStyle.input}
              value={email}
              onChangeText={setEmail}
              onBlur={() => handleCompanyEmail(email)}
              placeholder="Enter company’s email address"
              placeholderTextColor="#999"
            />
            <Text style={CompanyJobStyle.errorText}>{emailError}</Text>
          </View>
          <View style={CompanyJobStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Phone number'}</Text>
            <TextInput
              style={CompanyJobStyle.input}
              value={PhoneNumber}
              onChangeText={setPhoneNumber}
              onBlur={() => validatePhoneNumber(PhoneNumber)}
              placeholder="Enter company’s phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={6}
            />
            <Text style={CompanyJobStyle.errorText}>{PhoneNumberError}</Text>
          </View>
          <View style={CompanyJobStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Mobile number'}</Text>
            <TextInput
              style={CompanyJobStyle.input}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              onBlur={() => validateMobileNumber(mobileNumber)}
              placeholder="Enter company’s mobile number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={10}
            />
            <Text style={CompanyJobStyle.errorText}>{mobileNumberError}</Text>
          </View>
          <View style={CompanyJobStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Notes'}</Text>
            <TextInput
              style={[CompanyJobStyle.input, {height: 100}]}
              value={note}
              onChangeText={setNote}
              placeholder="Enter any notes about your tenant"
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={'top'}
            />
          </View>
          <View style={CompanyJobStyle.ButtonView}>
            <TouchableOpacity
              style={[
                CompanyJobStyle.closeText,
                CompanyJobStyle.applyText,
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
                CompanyJobStyle.applyText,
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
                  CompanyJobStyle.text,
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
