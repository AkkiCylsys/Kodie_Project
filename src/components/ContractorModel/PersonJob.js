import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// import { PersonStyle } from "./PersonStyle";
import {PersonJobStyle} from './PersonJobStyle';
// import { _COLORS, LABEL_STYLES } from "../../../../../../../../Themes";
import {_COLORS, LABEL_STYLES} from '../../Themes';
// import { CommonLoader } from "../../../../../../../../components/Molecules/ActiveLoader/ActiveLoader";
import {CommonLoader} from '../Molecules/ActiveLoader/ActiveLoader';
// import { useDispatch, useSelector } from "react-redux";
import {useDispatch, useSelector} from 'react-redux';
import axiosInstance from '../../services/axiosInstance';
export default PersonJob = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  // console.log('loginData.....', loginData);
  const property_id = props.property_id;
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [PhoneNumbeError, setPhoneNumberError] = useState('');
  const [note, setNote] = useState('');
  const [selectedOption, setSelectedOption] = useState('Save');
  const [isLoading, setIsLoading] = useState(false);
  const [personResponse, setpersonResponse] = useState('');
  const handleOptionClick = option => {
    setSelectedOption(option);
  };

  //... Regex signup email validation
  const validatePersonEmail = email => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(email);
  };
  // Validation for First Name....
  const validateFirstName = text => {
    if (text === '') {
      setFirstNameError('First name is required!');
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
      setLastNameError('Last name is required!');
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
      setEmailError('Email is required!');
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
      setPhoneNumberError('Phone number is required!');
    } else if (!mobileReg.test(text)) {
      setPhoneNumberError('Invalid phone number format');
    } else {
      setPhoneNumberError('');
    }
    setPhoneNumber(text);
  };

  // API bind person code here.....
  const Personhandle = () => {
    const PersonDetailsData = {
      user_key: loginData.Login_details.user_id,
      upd_key: property_id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: PhoneNumber,
      notes: note,
    };
    const PersonUrl ='tanant_details/create/person';
    console.log('Request URL:', PersonUrl);
    setIsLoading(true);

    axiosInstance
      .post(PersonUrl, PersonDetailsData)
      .then(response => {
        setpersonResponse(response?.data);
        console.log('Person Details_data response', response?.data);
        if (response?.data.success == true || response?.data.error == false) {
          alert(response?.data.message);
          setIsLoading(false);
          setFirstName('');
          setLastName('');
          setEmail('');
          setPhoneNumber('');
          setPhoneNumber('');
          setNote('');
          setIsLoading(false);
        } else {
          setEmailError(response?.data.message);
          console.error(
            'personDetail_error:',
            'Oops something went wrong! Please try again later.',
          );
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('personDetail error...:', error);
        alert(error);
        setIsLoading(false);
      });
  };
  // setEmailError(response?.data.message);
  // props.navigation.navigate("LeaseSummary");
  const handleSaveBtn = () => {
    if (firstName.trim() === '') {
      setFirstNameError('First name is required!');
    } else if (lastName.trim() === '') {
      setLastNameError('Last name is required!');
    } else if (email.trim() == '') {
      setEmailError('Email is required!');
    } else {
      Personhandle();
    }
  };

  return (
    <KeyboardAvoidingView
      style={PersonJobStyle.mainConatainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <View style={PersonJobStyle.card}>
          <View style={PersonJobStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'First name*'}</Text>
            <TextInput
              style={PersonJobStyle.input}
              value={firstName}
              onChangeText={validateFirstName}
              placeholder="Enter tenant’s first name"
              placeholderTextColor="#999"
            />
            <Text style={PersonJobStyle.errorText}>{firstNameError}</Text>
          </View>

          <View style={PersonJobStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Last name*'}</Text>
            <TextInput
              style={PersonJobStyle.input}
              value={lastName}
              onChangeText={validateLastName}
              placeholder="Enter tenant’s last name"
              placeholderTextColor="#999"
            />
            <Text style={PersonJobStyle.errorText}>{lastNameError}</Text>
          </View>

          <View style={PersonJobStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Email*'}</Text>
            <TextInput
              style={PersonJobStyle.input}
              value={email}
              onChangeText={setEmail}
              onBlur={() => handlePersonEmail(email)}
              // onChangeText={() => handlePersonEmail(email)}
              placeholder="Enter tenant’s email address"
              placeholderTextColor="#999"
              keyboardType='email-address'
            />
            <Text style={PersonJobStyle.errorText}>{emailError}</Text>
          </View>

          <View style={PersonJobStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {'Phone number (mobile preferred)'}
            </Text>
            <TextInput
              style={PersonJobStyle.input}
              value={PhoneNumber}
              onChangeText={setPhoneNumber}
              onBlur={() => validatePhoneNumber(PhoneNumber)}
              placeholder="Enter tenant’s mobile number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={10}
            />
            <Text style={PersonJobStyle.errorText}>{PhoneNumbeError}</Text>
          </View>
          <View style={PersonJobStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Notes'}</Text>
            <TextInput
              style={[PersonJobStyle.input, {height: 100}]}
              value={note}
              onChangeText={setNote}
              placeholder="Enter any notes about your tenant"
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={'top'}
            />
          </View>
          <View style={PersonJobStyle.ButtonView}>
            <TouchableOpacity
              style={[
                PersonJobStyle.closeText,
                PersonJobStyle.applyText,
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
                PersonJobStyle.applyText,
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
                  PersonJobStyle.text,
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
    </KeyboardAvoidingView>
  );
};
