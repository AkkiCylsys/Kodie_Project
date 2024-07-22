import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {_COLORS, FONTFAMILY, IMAGES, LABEL_STYLES} from '../../../../../Themes';
import TopHeader from '../../../../../components/Molecules/Header/Header';
import {RentalOfferStyle} from './RentalOfferStyle';
import {_goBack} from '../../../../../services/CommonServices';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import CalendarModal from '../../../../../components/Molecules/CalenderModal/CalenderModal';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import RowButtons from '../../../../../components/Molecules/RowButtons/RowButtons';
// import MultiSelect from 'react-native-multiple-select';

import {Config} from '../../../../../Config';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';
import TenantScreeningReportModal from '../../../../../components/Molecules/TenantScreeningReportModal/TenantScreeningReportModal';
import ApplicationSubmitModal from '../../../../../components/Molecules/TenantScreeningReportModal/ApplicationSubmitModal';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {SignupLookupDetails} from '../../../../../APIs/AllApi';
import {resolvePlugin} from '@babel/core';
import MapScreen from '../../../../../components/Molecules/GoogleMap/googleMap';
import Geocoder from 'react-native-geocoding';
import SearchPlaces from '../../../../../components/Molecules/SearchPlaces/SearchPlaces';
import DocumentPicker from 'react-native-document-picker';
import {useSelector} from 'react-redux';

const DocumentData = [
  {
    id: 1,
    fileName: 'Tenant  screening report.pdf',
  },
];
const RentalOffer = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginresponse_Rental offer..', loginData?.Login_details);
  const propertyId = props?.route?.params?.propertyId;
  console.log('propertyId..', propertyId);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [referenceFullName, setReferenceFullName] = useState('');
  const [referenceFullNameError, setReferenceFullNameError] = useState('');
  const [referenceEmail, setReferenceEmail] = useState('');
  const [referenceEmailError, setReferenceEmailError] = useState('');
  const [referencesItem, setReferencesItem] = useState([]);
  const [leaseFullName, setLeaseFullName] = useState('');
  const [leaseFullNameError, setLeaseFullNameError] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressError, setEmailAddressError] = useState('');
  const [leaseEmailAddress, setleaseEmailAddress] = useState('');
  const [leaseEmailAddressError, setleaseEmailAddressError] = useState('');
  const [leaseConfirmEmailAddress, setLeaseConfirmEmailAddress] = useState('');
  const [leaseConfirmEmailAddressError, setLeaseConfirmEmailAddressError] =
    useState('');
  const [RentalDetails, setRentalDetails] = useState(false);
  const [RentalHistory, setRentalHistory] = useState(false);
  const [TenantRooms, setTenantRooms] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [RentalLeaseData, setRentalLeaseData] = useState([]);
  const [EmployeeValueData, setEmployeeValueData] = useState(null);
  const [valueStyingData, setValueStyingData] = useState([]);
  const [petsData, setPetsData] = useState([]);
  const [Preferences, setPreferences] = useState(false);
  const [submitApplicationBtn, setSubmitApplicationBtn] = useState(false);
  const [submitApplicationBtnId, setSubmitApplicationBtnId] = useState(0);
  // ...
  const [quesHeading, setQuesHeading] = useState([]);
  const [questionCode, setQuestionCode] = useState('');
  const [expandedItem, setExpandedItem] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [question, setQuestion] = useState([]);
  const [employeeQues, setEmployeeQues] = useState([]);
  const [rentailDetails, setRentailDetails] = useState([]);
  const [rental_History, setRental_History] = useState([]);
  const [preference, setPreference] = useState([]);
  const [personalDetails, setPersonalDetails] = useState({});
  const [employmentStatus, setEmploymentStatus] = useState({});
  const [income, setIncome] = useState('');
  const [dropdownData, setDropdownData] = useState({});
  const [allQuestion, setAllQuestion] = useState([]);
  const [numberOccupants, setNumberOccupants] = useState(0);
  const [numberLeaseHolder, setNumberLeaseHolder] = useState(0);
  const [numberYearEmp, setNumberYearEmp] = useState(0);
  const [numberPets, setNumberPets] = useState(0);
  const [toggleOccupants, setToggleOccupants] = useState(false);
  const [toggleLeaseHolder, setToggleLeaseHolder] = useState(false);
  const [selectedButton, setSelectedButton] = useState(false);
  const [selectedEarnButton, setSelectedEarnButton] = useState(false);
  const [selectedRentalBondButton, setSelectedRentalBondButton] =
    useState(false);
  const [selectedPetsButton, setSelectedPetsButton] = useState(false);
  const [selectedPreviousRentalButton, setSelectedPreviousRentalButton] =
    useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState(0);
  const [selectedSomokingButton, setSelectedSomokingButton] = useState(false);
  const [selectedSomokingButtonId, setSelectedSomokingButtonId] = useState(0);
  const [typeOfPetsValue, setTypeOfPetsValue] = useState([]);
  const [toggleReference, setToggleReference] = useState(false);

  const [location, setLocation] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const addressParts = location ? location.split(', ') : [];
  const country = addressParts.pop();
  const state = addressParts.pop();
  const city = addressParts.join(', ');
  const [occupants, setOccupants] = useState([]);
  const [leaseHolderItem, setLeaseHolderItem] = useState([]);
  const [selectFile, setSelectFile] = useState([]);
  const [getuploadDocByModuleName, setGetuploadDocByModuleName] = useState([]);
  const [peopleStayInPropertyData, setPeopleStayInPropertyData] = useState([]);
  const [peopleStayInPropertyCode, setPeopleStayInPropertyCode] =
    useState(null);
  const [occupantsNames, setOccupantsNames] = useState([]);
  const [leaseHolderNames, setLeaseHolderNames] = useState([]);
  const [subChildren, setSubChildren] = useState([]);
  const [finalJsonData, setFinalJsonData] = useState([]);
  const [editAllQuestion, setEditAllQuestion] = useState([]);
  const [editData, setEditData] = useState(null);
  // location....
  const ConfirmAddress = () => {
    setIsMap(false);
    setLocation(currentLocation);
  };
  const openMapandClose = text => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = Region => {
    // alert(JSON.stringify(Region));
    console.log('Region....', JSON.stringify(Region));
    setlatitude(Region.latitude);
    setlongitude(Region.longitude);
    getAddress(Region.latitude, Region.longitude);
  };
  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        console.log('json location.......', json);
        console.log('current address...', json.results[0].formatted_address);
        // currentLocation ? setLocation(json.results[0].formatted_address) : null;
        const formatedAddress = json.results[0].formatted_address;
        setCurrentLocation(formatedAddress);
        // setLocation(json.results[0].formatted_address);
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
        console.log('addressComponent2.....', addressComponent2);
        setUserCurrentCity(addressComponent2.long_name);
        console.log('UserCurrentCity....', UserCurrentCity);
        setUserZip_Code(json.results[1]?.address_components[6]?.long_name);
        console.log('mainFullAddress....', MainFullAddress);
      })
      .catch(error => console.warn(error));
  };
  const increaseNumberOccupants = () => {
    setNumberOccupants(prevCount => prevCount + 1);
    setToggleOccupants(true);
  };
  const increaseLeaseHolder = () => {
    setNumberLeaseHolder(prevCount => prevCount + 1);
    setToggleLeaseHolder(true);
  };
  const decreaseNumberOccupants = () => {
    if (numberOccupants > 0) {
      setNumberOccupants(prevCount => prevCount - 1);
      setToggleOccupants(false);
    }
  };
  const decreaseLeaseHolder = () => {
    if (numberLeaseHolder > 0) {
      setNumberLeaseHolder(prevCount => prevCount - 1);
      setToggleLeaseHolder(false);
    }
  };
  const increaseNumberYearEmp = () => {
    setNumberYearEmp(prevCount => prevCount + 1);
  };
  const decreaseNumberYearEmp = () => {
    if (numberYearEmp > 0) {
      setNumberYearEmp(prevCount => prevCount - 1);
    }
  };
  const decreaseNumberPet = () => {
    if (numberPets > 0) {
      setNumberPets(prevCount => prevCount - 1);
    }
  };
  const increaseNumberPets = () => {
    setNumberPets(prevCount => prevCount + 1);
  };
  const onSelectedItemsChange = selectedItems => {
    setTypeOfPetsValue(selectedItems);
  };
  useEffect(() => {
    handleTenantQues();
    getEditAllQuestion();
  }, [question]);

  const getEditAllQuestion = () => {
    const url = Config.BASE_URL;
    const Ques_url = url + 'question_details_for_tenant_ques';
    console.log('Request URL:', Ques_url);
    setIsLoading(true);
    const QuesData = {
      p_account_id: loginData?.Login_details?.user_account_id,
      p_property_id: propertyId,
    };
    axios
      .post(Ques_url, QuesData)
      .then(response => {
        console.log('Response edit question..', response?.data);
        if (response?.data?.success === true) {
          const data = response?.data?.data[0]?.parent_json;
          setEditData(data);
          // Initialize input values with the fetched data
          const initialValues = {};
          data.quesHeading.forEach(parentQuestion => {
            parentQuestion.children.forEach(childQuestion => {
              initialValues[childQuestion.tqm_Question_code] = childQuestion.value || '';
            });
          });
          setInputValues(initialValues);
          console.log('response in edit mode...', JSON.stringify(data));
        }
      })
      .catch(error => {
        console.error('API failed EdittenantQues', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  

  //... Regex login email validation
  const validateResetEmail = resetEmail => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(resetEmail);
  };
  // Validation...
  const handleValidFullName = text => {
    setFullName(text);
    if (fullName === '') {
      setFullNameError('Full name is required.');
    } else {
      setFullNameError('');
    }
  };
  const handleValidEmial = text => {
    setEmailAddress(text);
    if (emailAddress === '') {
      setEmailAddressError('Email address is required.');
    } else if (!validateResetEmail(emailAddress)) {
      setEmailAddressError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      setEmailAddressError('');
    }
  };
  const handleAddOccupant = (fullName, emailAddress, questionId) => {
    if (fullName === '') {
      setFullNameError('Full name is required.');
    } else if (emailAddress === '') {
      setEmailAddressError('Email address is required.');
    } else if (!validateResetEmail(emailAddress)) {
      setEmailAddressError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      addOccupant(fullName, emailAddress, questionId);
    }
  };
  // InviteLeaseHolder

  const validLeaseFullName = text => {
    setLeaseFullName(text);
    if (leaseFullName === '') {
      setLeaseFullNameError('Lease fullName is required.');
    } else {
      setLeaseFullNameError('');
    }
  };
  const validLeaseEmailAddress = text => {
    setleaseEmailAddress(text);
    if (leaseEmailAddress === '') {
      setleaseEmailAddressError('Lease Email Address is required.');
    } else if (!validateResetEmail(leaseEmailAddress)) {
      setleaseEmailAddressError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      setleaseEmailAddressError('');
    }
  };
  const validConfirmLeaseEmailAddress = text => {
    setLeaseConfirmEmailAddress(text);
    if (leaseConfirmEmailAddress === '') {
      setLeaseConfirmEmailAddressError(
        'Lease Confirm Email Address is required.',
      );
    } else if (!validateResetEmail(leaseConfirmEmailAddress)) {
      setLeaseConfirmEmailAddressError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      setLeaseConfirmEmailAddressError('');
    }
  };
  const handleValidLeaseHolder = () => {
    if (leaseFullName === '') {
      setLeaseFullNameError('Lease full name is required.');
    } else if (leaseEmailAddress === '') {
      setleaseEmailAddressError('Lease email address is required.');
    } else if (!validateResetEmail(leaseEmailAddress)) {
      setleaseEmailAddressError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else if (leaseConfirmEmailAddress === '') {
      setLeaseConfirmEmailAddressError(
        'Lease confirm email address is required.',
      );
    } else if (!validateResetEmail(leaseConfirmEmailAddress)) {
      setLeaseConfirmEmailAddressError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else if (leaseEmailAddress !== leaseConfirmEmailAddress) {
      setLeaseConfirmEmailAddressError(
        'Email address and confirm email address do not match.',
      );
    } else {
      // Find the question with id 30
      const question30 = subChildren.find(item => item.id === 30);
      addLeaseHolder(
        leaseFullName,
        leaseEmailAddress,
        leaseConfirmEmailAddress,
        question30.id, // Pass questionId to addLeaseHolder
      );
    }
  };

  // Reference validation
  const validReferenceFullName = text => {
    setReferenceFullName(text);
    if (referenceFullName === '') {
      setReferenceFullNameError('References fullName is required.');
    } else {
      setReferenceFullNameError('');
    }
  };
  const validReferencesEmailAddress = text => {
    setReferenceEmail(text);
    if (referenceEmail === '') {
      setReferenceEmailError('References email Address is required.');
    } else if (!validateResetEmail(referenceEmail)) {
      setReferenceEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      setReferenceEmailError('');
    }
  };
  const handleReferences = () => {
    if (referenceFullName === '') {
      setReferenceFullNameError('References fullName is required.');
    } else if (referenceEmail === '') {
      setReferenceEmailError('References email Address is required.');
    } else if (!validateResetEmail(referenceEmail)) {
      setReferenceEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      addReferences();
    }
  };
  // render item
  const renderDataItem = item => {
    return (
      <View style={[RentalOfferStyle.item]}>
        <Text style={RentalOfferStyle.selectedTextStyle}>
          {item.lookup_description}
        </Text>
        <AntDesign
          style={RentalOfferStyle.icon}
          color={_COLORS.Kodie_WhiteColor}
          name="check"
          size={20}
        />
      </View>
    );
  };
  const addOccupantRender = ({item, index}) => {
    return (
      <View style={RentalOfferStyle.occupants_item_View}>
        <View>
          <Text style={RentalOfferStyle.occupants_name}>{item?.fullName}</Text>
          <Text style={RentalOfferStyle.occupants_email}>
            {item?.emailAddress}
          </Text>
        </View>
        <View style={{marginHorizontal: 5}}>
          <CustomSingleButton
            _ButtonText={'Remove'}
            backgroundColor={_COLORS.Kodie_WhiteColor}
            borderColor={_COLORS.Kodie_GrayColor}
            height={35}
            width={90}
            marginTop={0}
            onPress={() => {
              Alert.alert(
                'Remove person?',
                'This person will be permanently removed from the application.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Remove',
                    onPress: () => {
                      console.log('Remove');
                      removeOccupant(index);
                    },
                  },
                ],
              );
            }}
          />
        </View>
      </View>
    );
  };
  const leaseHolderRender = ({item, index}) => {
    return (
      <View style={RentalOfferStyle.occupants_item_View}>
        <View>
          <Text style={RentalOfferStyle.occupants_name}>
            {item?.leaseFullName}
          </Text>
          <Text style={RentalOfferStyle.occupants_email}>
            {item?.leaseEmailAddress}
          </Text>
          <Text style={RentalOfferStyle.occupants_email}>
            {item?.leaseConfirmEmailAddress}
          </Text>
        </View>
        <View style={{marginHorizontal: 5}}>
          <CustomSingleButton
            _ButtonText={'Remove'}
            backgroundColor={_COLORS.Kodie_WhiteColor}
            borderColor={_COLORS.Kodie_GrayColor}
            height={35}
            width={90}
            marginTop={0}
            onPress={() => {
              Alert.alert(
                'Remove person?',
                'This person will be permanently removed from the application.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Remove',
                    onPress: () => {
                      console.log('Remove');
                      removeLeaseHolderItem(index);
                    },
                  },
                ],
              );
            }}
          />
        </View>
      </View>
    );
  };
  const addReferencesRender = ({item, index}) => {
    return (
      <View style={RentalOfferStyle.occupants_item_View}>
        <View>
          <Text style={RentalOfferStyle.occupants_name}>
            {item?.referenceFullName}
          </Text>
          <Text style={RentalOfferStyle.occupants_email}>
            {item?.referenceEmail}
          </Text>
        </View>
        <View style={{marginHorizontal: 5}}>
          <CustomSingleButton
            _ButtonText={'Remove'}
            backgroundColor={_COLORS.Kodie_WhiteColor}
            borderColor={_COLORS.Kodie_GrayColor}
            height={35}
            width={90}
            marginTop={0}
            onPress={() => {
              Alert.alert(
                'Remove person?',
                'This person will be permanently removed from the application.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Remove',
                    onPress: () => {
                      console.log('Remove');
                      removeReferenceItem(index);
                    },
                  },
                ],
              );
            }}
          />
        </View>
      </View>
    );
  };
  const occupantsRender = () => {
    // Find the question with id 28
    const question28 = subChildren.find(item => item.id === 28);

    // Parse the tqm_Question_code JSON string
    const questionData = JSON.parse(question28.tqm_Question_code);

    // Extract labels
    const fullNameLabel =
      questionData.find(item => item.Fullname)?.Fullname || 'Full name';
    const emailAddressLabel =
      questionData.find(item => item.Email_address)?.Email_address ||
      'Email address';

    // Extract the id for question 28
    const questionId = question28.id;

    return (
      <View style={RentalOfferStyle.AddOccupantMainView}>
        <TouchableOpacity
          style={RentalOfferStyle.AddOccupantView}
          onPress={() => {
            setToggleOccupants(!toggleOccupants);
          }}>
          <Entypo
            name={toggleOccupants ? 'chevron-small-up' : 'chevron-small-down'}
            color={_COLORS.Kodie_BlackColor}
            size={25}
          />
          <Text style={RentalOfferStyle.AddOccupantText}>
            {'Add occupants'}
          </Text>
        </TouchableOpacity>

        <FlatList
          data={occupants}
          keyExtractor={(item, index) => index.toString()}
          renderItem={addOccupantRender}
        />
        {toggleOccupants && (
          <View style={RentalOfferStyle.inputView}>
            <View style={{marginTop: 11}}>
              <Text style={LABEL_STYLES.commontext}>{fullNameLabel}</Text>
              <TextInput
                style={RentalOfferStyle.input}
                placeholder={'Enter full name'}
                onChangeText={setFullName}
                onBlur={() => handleValidFullName(fullName)}
                value={fullName}
              />
            </View>
            {fullNameError ? (
              <Text style={RentalOfferStyle.error_text}>{fullNameError}</Text>
            ) : null}
            <View style={RentalOfferStyle.inputView}>
              <Text style={LABEL_STYLES.commontext}>{emailAddressLabel}</Text>
              <TextInput
                style={RentalOfferStyle.input}
                placeholder={'Enter email address'}
                onChangeText={setEmailAddress}
                onBlur={() => handleValidEmial(emailAddress)}
                value={emailAddress}
                keyboardType="email-address"
              />
            </View>
            {emailAddressError ? (
              <Text style={RentalOfferStyle.error_text}>
                {emailAddressError}
              </Text>
            ) : null}
            <CustomSingleButton
              _ButtonText={'Add occupant'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              disabled={isLoading ? true : false}
              onPress={() => {
                // addOccupant(fullName, emailAddress, questionId);
                handleAddOccupant(fullName, emailAddress, questionId);
              }}
            />
          </View>
        )}
      </View>
    );
  };

  const leaseHolderRenderComponents = () => {
    // Extract labels from the subChildren
    const question30 = subChildren.find(item => item.id === 30);
    const questionData = JSON.parse(question30.tqm_Question_code);

    const fullNameLabel =
      questionData.find(item => item.Full_name)?.Full_name || 'Full name';
    const emailAddressLabel =
      questionData.find(item => item.Email_address)?.Email_address ||
      'Email address';
    const confirmEmailAddressLabel =
      questionData.find(item => item.Confirm_email_address)
        ?.Confirm_email_address || 'Confirm email address';

    return (
      <View style={RentalOfferStyle.AddOccupantMainView}>
        <TouchableOpacity
          style={RentalOfferStyle.AddOccupantView}
          onPress={() => {
            setToggleLeaseHolder(!toggleLeaseHolder);
          }}>
          <Entypo
            name={toggleLeaseHolder ? 'chevron-small-up' : 'chevron-small-down'}
            color={_COLORS.Kodie_BlackColor}
            size={25}
          />
          <Text style={RentalOfferStyle.AddOccupantText}>
            {'Add leaseholders'}
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: 10}}>
          {toggleLeaseHolder && (
            <Text style={RentalOfferStyle.AddLeasesubText}>
              {
                'Each tenant who is party to the lease agreement is considered a leaseholder. Each leaseholder will receive an email link to submit a completed application.'
              }
            </Text>
          )}
          <FlatList
            data={leaseHolderItem}
            keyExtractor={(item, index) => index.toString()}
            renderItem={leaseHolderRender}
          />
          {toggleLeaseHolder && (
            <View>
              <View style={RentalOfferStyle.inputView}>
                <Text style={LABEL_STYLES.commontext}>{fullNameLabel}</Text>
                <TextInput
                  style={RentalOfferStyle.input}
                  placeholder={'Enter full name'}
                  onChangeText={setLeaseFullName}
                  value={leaseFullName}
                  onBlur={() => validLeaseFullName(leaseFullName)}
                />
              </View>
              {leaseFullNameError ? (
                <Text style={RentalOfferStyle.error_text}>
                  {leaseFullNameError}
                </Text>
              ) : null}
              <View style={RentalOfferStyle.inputView}>
                <Text style={LABEL_STYLES.commontext}>{emailAddressLabel}</Text>
                <TextInput
                  style={RentalOfferStyle.input}
                  placeholder={'Enter email address'}
                  onChangeText={setleaseEmailAddress}
                  value={leaseEmailAddress}
                  onBlur={() => validLeaseEmailAddress(leaseEmailAddress)}
                  keyboardType="email-address"
                />
              </View>
              {leaseEmailAddressError ? (
                <Text style={RentalOfferStyle.error_text}>
                  {leaseEmailAddressError}
                </Text>
              ) : null}
              <View style={RentalOfferStyle.inputView}>
                <Text style={LABEL_STYLES.commontext}>
                  {confirmEmailAddressLabel}
                </Text>
                <TextInput
                  style={RentalOfferStyle.input}
                  placeholder={'Confirm email address'}
                  onChangeText={setLeaseConfirmEmailAddress}
                  value={leaseConfirmEmailAddress}
                  onBlur={() =>
                    validConfirmLeaseEmailAddress(leaseConfirmEmailAddress)
                  }
                  keyboardType="email-address"
                />
              </View>
              {leaseConfirmEmailAddressError ? (
                <Text style={RentalOfferStyle.error_text}>
                  {leaseConfirmEmailAddressError}
                </Text>
              ) : null}
              <CustomSingleButton
                _ButtonText={'Invite leaseholder'}
                Text_Color={_COLORS.Kodie_WhiteColor}
                disabled={isLoading}
                onPress={handleValidLeaseHolder}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderFormSection = section => {
    return (
      <View>
        <View style={RentalOfferStyle.mainfeaturesview}>
          <View style={RentalOfferStyle.key_feature_Text_view}>
            <Text style={RentalOfferStyle.key_feature_Text}>
              {section?.tqm_Question_description}
            </Text>
          </View>
          <TouchableOpacity style={RentalOfferStyle.plus_minusview}>
            <TouchableOpacity
              style={RentalOfferStyle.menusIconView}
              onPress={
                section?.tqm_Question_code === 'NOO'
                  ? decreaseNumberOccupants
                  : decreaseLeaseHolder
              }>
              <AntDesign
                name="minus"
                size={20}
                color={'black'} // Adjust color as needed
              />
            </TouchableOpacity>
            <Text style={RentalOfferStyle.countdata}>
              {section?.tqm_Question_code === 'NOO'
                ? numberOccupants
                : numberLeaseHolder}
            </Text>
            <TouchableOpacity
              style={RentalOfferStyle.menusIconView}
              onPress={
                section?.tqm_Question_code === 'NOO'
                  ? increaseNumberOccupants
                  : increaseLeaseHolder
              }>
              <AntDesign
                name="plus"
                size={20}
                color={'black'} // Adjust color as needed
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        {section?.tqm_Question_code === 'NOO' &&
          numberOccupants > 0 &&
          occupantsRender()}
        {section?.tqm_Question_code === 'NOL' &&
          numberLeaseHolder > 0 &&
          leaseHolderRenderComponents()}
      </View>
    );
  };
  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleRentalDetails = () => {
    setRentalDetails(!RentalDetails);
  };
  const toggleItem = itemChildren => {
    setExpandedItem(prevState =>
      prevState === itemChildren ? null : itemChildren,
    );
  };
  const toggleTenantRooms = () => {
    setTenantRooms(!TenantRooms);
  };
  const toggleRentalHistory = () => {
    setRentalHistory(!RentalHistory);
  };
  const togglePreferences = () => {
    setPreferences(!Preferences);
  };

  const onClose = () => {
    refRBSheet.current.close();
  };
  const onClose1 = () => {
    refRBSheet1.current.close();
  };

  const addOccupant = (fullName, emailAddress, questionId) => {
    if (fullName && emailAddress) {
      const newOccupant = {fullName, emailAddress, questionId};
      setOccupants([...occupants, newOccupant]);
      setFullName('');
      setEmailAddress('');
      setToggleOccupants(false);
    }
  };

  const addLeaseHolder = (
    fullName,
    emailAddress,
    confirmEmailAddress,
    questionId,
  ) => {
    if (fullName && emailAddress && confirmEmailAddress) {
      const newLeaseHolder = {
        leaseFullName: fullName,
        leaseEmailAddress: emailAddress,
        leaseConfirmEmailAddress: confirmEmailAddress,
        questionId, // Ensure questionId is included
      };
      setLeaseHolderItem([...leaseHolderItem, newLeaseHolder]);
      setLeaseFullName('');
      setleaseEmailAddress('');
      setLeaseConfirmEmailAddress('');
      setToggleLeaseHolder(false);
    }
  };

  const addReferences = () => {
    if (referenceFullName && referenceEmail) {
      const newReferences = {
        referenceFullName,
        referenceEmail,
      };
      setReferencesItem([...referencesItem, newReferences]);
      console.log('referencesItem...', referencesItem);
      setReferenceFullName('');
      setReferenceEmail('');
    }
  };
  const removeOccupant = index => {
    const updatedOccupants = occupants.filter((_, i) => i !== index);
    setOccupants(updatedOccupants);
  };
  const removeLeaseHolderItem = index => {
    const updatedLeaseHolder = leaseHolderItem.filter((_, i) => i !== index);
    setLeaseHolderItem(updatedLeaseHolder);
  };
  const removeReferenceItem = index => {
    const updatedReferences = referencesItem.filter((_, i) => i !== index);
    setReferencesItem(updatedReferences);
  };
  // Api intrigation....
  const handleTenantQues = () => {
    const url = Config.BASE_URL;
    const tenantQues_url = url + 'question_details_for_tenant_ques';
    console.log('Request URL:', tenantQues_url);
    setIsLoading(true);
    const tenantQuesData = {
      p_account_id: loginData?.Login_details?.user_account_id,
      p_property_id: propertyId,
    };
    axios
      .post(tenantQues_url, tenantQuesData)
      .then(response => {
        if (response?.data?.success === true) {
          console.log(
            'API Response Quesinaries....',
            JSON.stringify(response?.data?.data[0]?.parent_json),
          );

          const parentJson = response?.data?.data[0]?.parent_json;

          // Find the question with tqm_Question_code "PEOPLE_STAY_IN_PROPERTY"
          const peopleStayInProperty = parentJson.find(item =>
            item?.children?.some(
              child => child?.tqm_Question_code === 'PEOPLE_STAY_IN_PROPERTY',
            ),
          );

          // Get the sub_children of the found question
          let subChildren = [];
          if (peopleStayInProperty) {
            const targetQuestion = peopleStayInProperty.children.find(
              child => child.tqm_Question_code === 'PEOPLE_STAY_IN_PROPERTY',
            );
            subChildren = targetQuestion?.sub_children || [];
          }

          // Store subChildren in a state or variable
          console.log('Sub Children:', subChildren);
          setSubChildren(subChildren);

          setQuesHeading(parentJson);
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed tenantQues', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDropdown = async questionCode => {
    setIsLoading(true);
    try {
      const res = await SignupLookupDetails({
        P_PARENT_CODE: questionCode,
        P_TYPE: 'OPTION',
      });

      console.log('Dropdown data...', res);
      if (res.status === true) {
        setDropdownData(prevData => ({
          ...prevData,
          [questionCode]: res?.lookup_details,
        }));
      } else {
        console.error(
          'Error: Unable to fetch dropdown data',
          JSON.stringify(res),
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error.....', error);
      alert('Lookup Code Miss Match');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const QuesHeadingRender = ({item}) => {
    return (
      <View style={{marginTop: 5}}>
        <View style={RentalOfferStyle.propety_details_view}>
          <Text style={RentalOfferStyle.propery_det}>
            {item?.tqm_Question_description}
          </Text>
          <TouchableOpacity
            style={RentalOfferStyle.down_Arrow_icon}
            onPress={() => {
              toggleItem(item?.children);
              console.log('QuestionChildren...', item?.children);
            }}>
            <AntDesign
              name={expandedItem === item?.children ? 'up' : 'down'}
              size={15}
              color={_COLORS.Kodie_GrayColor}
            />
          </TouchableOpacity>
        </View>
        <DividerIcon />
        {expandedItem === item?.children && (
          <FlatList
            data={item?.children} // Use item?.children as data
            keyExtractor={(item, index) => index.toString()}
            renderItem={QuestionCodeRender}
          />
        )}
      </View>
    );
  };

  const handleInputChange = (questionCode, value) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [questionCode]: value,
    }));
  };

  const handleSubmit = () => {
    const jsonData = [];
    console.log('quesHeading:', quesHeading);
    console.log('subChildren:', subChildren);

    // Create a mapping of questionCode to id from quesHeading and subChildren
    const questionCodeToId = {};
    quesHeading.forEach(parentQuestion => {
      parentQuestion.children.forEach(childQuestion => {
        questionCodeToId[childQuestion.tqm_Question_code] = childQuestion.id;
      });
    });
    subChildren.forEach(subChild => {
      questionCodeToId[subChild.tqm_Question_code] = subChild.id;
    });

    // Process main questions
    quesHeading.forEach(parentQuestion => {
      parentQuestion.children.forEach(childQuestion => {
        const questionValue =
          inputValues[childQuestion.tqm_Question_code] || '';
        if (questionValue) {
          jsonData.push({
            question_id: childQuestion.id,
            question_value: questionValue,
            question_reference:
              childQuestion.tqm_Question_type === 'Dropdown' ? 1 : 0,
            question_is_lookup:
              childQuestion.tqm_Question_type === 'Dropdown' ? 1 : 0,
          });
        }
      });
    });

    // Group occupants by their question_id
    const occupantGroups = groupBy(occupants, 'questionId');
    console.log('occupantGroups...', occupantGroups);
    // Add grouped occupants data to jsonData
    addGroupedDataToJsonData(jsonData, occupantGroups);

    // Group leaseholders by their question_id
    const leaseHolderGroups = groupBy(leaseHolderItem, 'questionId');
    console.log('leaseHolderGroups...', leaseHolderGroups);
    // Add grouped leaseholders data to jsonData
    addGroupedDataToJsonData(
      jsonData,
      leaseHolderGroups,
      'leaseFullName',
      'leaseEmailAddress',
      'leaseConfirmEmailAddress',
    );

    const finalJson = {
      json_data: jsonData,
    };

    console.log('Final JSON:', JSON.stringify(finalJson));
    saveAllJson(finalJson);
    resetDynamicFields();
  };

  const resetDynamicFields = () => {
    Object.keys(inputValues).forEach(key => {
      inputValues[key] = '';
    });

    occupants.length = 0;
    leaseHolderItem.length = 0;

    setInputValues({...inputValues});
    setOccupants([]);
    setLeaseHolderItem([]);
    setNumberOccupants(0);
    setNumberLeaseHolder(0);
  };

  const saveAllJson = finalJson => {
    const url = Config.BASE_URL;
    const saveJson_url = `${url}save_json_details`;
    console.log('Request URL:', saveJson_url);
    setIsLoading(true);

    const saveJsonData = {
      p_property_id: propertyId,
      p_account_id: loginData?.Login_details?.user_account_id,
      p_bid_id: 0,
      json_data: finalJson.json_data, // Ensure json_data is not stringified here
    };

    console.log('saveJsonData:', JSON.stringify(saveJsonData));

    axios
      .post(saveJson_url, saveJsonData)
      .then(response => {
        if (response?.data?.success === true) {
          console.log(
            'API Response saveJson Data:',
            JSON.stringify(response?.data),
          );
          refRBSheet1.current.open();
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed save Json', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Utility function to group items by a specified key
  const groupBy = (items, key) => {
    return items.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item);
      return result;
    }, {});
  };

  const addGroupedDataToJsonData = (
    jsonData,
    groups,
    fullNameKey = 'fullName',
    emailKey = 'emailAddress',
    confirmEmailKey,
  ) => {
    for (const questionId in groups) {
      const groupData = groups[questionId].map(item => {
        const data = {
          fullName: item[fullNameKey],
          emailAddress: item[emailKey],
        };
        if (confirmEmailKey) {
          data.confirmEmailAddress = item[confirmEmailKey];
        }
        return data;
      });

      jsonData.push({
        question_id: questionId,
        question_value: JSON.stringify(groupData),
        question_reference: 0,
        question_is_lookup: 0,
      });
    }
  };

  const renderQuestionComponent = (question, index) => {
    switch (question.tqm_Question_type) {
      case 'Input':
        return (
          <View key={index}>
            <TextInput
              style={RentalOfferStyle.input}
              placeholder={`Enter your ${question.tqm_Question_description}`}
              onChangeText={text => {
                handleInputChange(question.tqm_Question_code, text, index);
              }}
              value={inputValues[question.tqm_Question_code] || ''}
            />
          </View>
        );
      case 'Number':
        return (
          <View>
            <TextInput
              style={RentalOfferStyle.input}
              placeholder={`Enter your ${question.tqm_Question_description}`}
              onChangeText={text =>
                handleInputChange(question.tqm_Question_code, text, index)
              }
              value={inputValues[question.tqm_Question_code] || ''}
              keyboardType="number-pad"
            />
          </View>
        );
      case 'Date':
        return (
          <View style={RentalOfferStyle.datePickerView}>
            <CalendarModal
              SelectDate={
                inputValues[question.tqm_Question_code] || 'Start Date'
              }
              _textInputStyle={{
                color: inputValues[question.tqm_Question_code]
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_GrayColor,
              }}
              calenderIcon={toggleModal}
              onDayPress={day =>
                handleInputChange(
                  question.tqm_Question_code,
                  day.dateString,
                  index,
                )
              }
              Visible={isModalVisible}
              onRequestClose={toggleModal}
              markedDates={{
                [inputValues[question.tqm_Question_code]]: {
                  selected: true,
                  selectedColor: _COLORS.Kodie_lightGreenColor,
                  selectedTextColor: _COLORS.Kodie_BlackColor,
                },
              }}
              _closeButton={toggleModal}
              _ApplyButton={toggleModal}
            />
          </View>
        );
      case 'Dropdown':
        return (
          <View>
            <Dropdown
              style={RentalOfferStyle.dropdown}
              placeholderStyle={RentalOfferStyle.placeholderStyle}
              selectedTextStyle={RentalOfferStyle.selectedTextStyle}
              inputSearchStyle={RentalOfferStyle.inputSearchStyle}
              iconStyle={RentalOfferStyle.iconStyle}
              data={dropdownData[question.tqm_Question_code] || []}
              search
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="Select an option"
              searchPlaceholder="Search..."
              value={inputValues[question.tqm_Question_code] || ''}
              onFocus={() => handleDropdown(question.tqm_Question_code, index)}
              onChange={item => {
                handleInputChange(question.tqm_Question_code, item.lookup_key);
              }}
            />
          </View>
        );
      case 'Occupant_Count':
        return (
          <View>
            {subChildren.map(section => (
              <View key={section.id}>
                {section.tqm_Question_type === 'Count_Occupant' &&
                  renderFormSection(section)}
                {section.tqm_Question_type === 'lease_count' &&
                  renderFormSection(section)}
              </View>
            ))}
          </View>
        );
      case 'Count':
        return (
          <View>
            <View style={RentalOfferStyle.mainfeaturesview} key={index}>
              <View style={RentalOfferStyle.key_feature_Text_view}>
                <Text style={RentalOfferStyle.key_feature_Text}>
                  {'Number of years employed'}
                </Text>
              </View>
              <TouchableOpacity style={RentalOfferStyle.plus_minusview}>
                <TouchableOpacity
                  style={RentalOfferStyle.menusIconView}
                  onPress={decreaseNumberYearEmp}>
                  <AntDesign
                    name="minus"
                    size={20}
                    color={_COLORS.Kodie_BlackColor}
                  />
                </TouchableOpacity>
                <Text style={RentalOfferStyle.countdata}>{numberYearEmp}</Text>
                <TouchableOpacity
                  style={RentalOfferStyle.menusIconView}
                  onPress={() => {
                    increaseNumberYearEmp();
                  }}>
                  <AntDesign
                    name="plus"
                    size={20}
                    color={_COLORS.Kodie_BlackColor}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'Pets_Count':
        return (
          <View>
            <View style={RentalOfferStyle.mainfeaturesview} key={index}>
              <View style={RentalOfferStyle.key_feature_Text_view}>
                <Text style={RentalOfferStyle.key_feature_Text}>
                  {'Number of pets'}
                </Text>
              </View>
              <TouchableOpacity style={RentalOfferStyle.plus_minusview}>
                <TouchableOpacity
                  style={RentalOfferStyle.menusIconView}
                  onPress={decreaseNumberPet}>
                  <AntDesign
                    name="minus"
                    size={20}
                    color={_COLORS.Kodie_BlackColor}
                  />
                </TouchableOpacity>
                <Text style={RentalOfferStyle.countdata}>{numberPets}</Text>
                <TouchableOpacity
                  style={RentalOfferStyle.menusIconView}
                  onPress={() => {
                    increaseNumberPets();
                  }}>
                  <AntDesign
                    name="plus"
                    size={20}
                    color={_COLORS.Kodie_BlackColor}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'Yes_no':
        return (
          <View>
            {question.id === 13 ? (
              <RowButtons
                LeftButtonText={'Yes'}
                leftButtonbackgroundColor={
                  !selectedButton
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor
                }
                LeftButtonTextColor={
                  !selectedButton
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor
                }
                LeftButtonborderColor={
                  !selectedButton
                    ? _COLORS.Kodie_GrayColor
                    : _COLORS.Kodie_LightWhiteColor
                }
                onPressLeftButton={() => {
                  setSelectedButton(false);
                  handleInputChange(question.id, 'Yes');
                }}
                RightButtonText={'No'}
                RightButtonbackgroundColor={
                  selectedButton
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor
                }
                RightButtonTextColor={
                  selectedButton
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor
                }
                RightButtonborderColor={
                  selectedButton
                    ? _COLORS.Kodie_GrayColor
                    : _COLORS.Kodie_LightWhiteColor
                }
                onPressRightButton={() => {
                  setSelectedButton(true);
                  handleInputChange(question.id, 'No');
                }}
              />
            ) : question.id === 20 ? (
              <RowButtons
                LeftButtonText={'Yes'}
                leftButtonbackgroundColor={
                  !selectedRentalBondButton
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor
                }
                LeftButtonTextColor={
                  !selectedRentalBondButton
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor
                }
                LeftButtonborderColor={
                  !selectedRentalBondButton
                    ? _COLORS.Kodie_GrayColor
                    : _COLORS.Kodie_LightWhiteColor
                }
                onPressLeftButton={() => {
                  setSelectedRentalBondButton(false);
                  handleInputChange(question.id, 'Yes');
                }}
                RightButtonText={'No'}
                RightButtonbackgroundColor={
                  selectedRentalBondButton
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor
                }
                RightButtonTextColor={
                  selectedRentalBondButton
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor
                }
                RightButtonborderColor={
                  selectedRentalBondButton
                    ? _COLORS.Kodie_GrayColor
                    : _COLORS.Kodie_LightWhiteColor
                }
                onPressRightButton={() => {
                  setSelectedRentalBondButton(true);
                  handleInputChange(question.id, 'No');
                }}
              />
            ) : question.id === 21 ? (
              <RowButtons
                LeftButtonText={'Yes'}
                leftButtonbackgroundColor={
                  !selectedPreviousRentalButton
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor
                }
                LeftButtonTextColor={
                  !selectedPreviousRentalButton
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor
                }
                LeftButtonborderColor={
                  !selectedPreviousRentalButton
                    ? _COLORS.Kodie_GrayColor
                    : _COLORS.Kodie_LightWhiteColor
                }
                onPressLeftButton={() => {
                  setSelectedPreviousRentalButton(false);
                  handleInputChange(question.id, 'Yes');
                }}
                RightButtonText={'No'}
                RightButtonbackgroundColor={
                  selectedPreviousRentalButton
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor
                }
                RightButtonTextColor={
                  selectedPreviousRentalButton
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor
                }
                RightButtonborderColor={
                  selectedPreviousRentalButton
                    ? _COLORS.Kodie_GrayColor
                    : _COLORS.Kodie_LightWhiteColor
                }
                onPressRightButton={() => {
                  setSelectedPreviousRentalButton(true);
                  handleInputChange(question.id, 'No');
                }}
              />
            ) : question.id === 24 ? (
              <RowButtons
                LeftButtonText={'Yes'}
                leftButtonbackgroundColor={
                  !selectedPetsButton
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor
                }
                LeftButtonTextColor={
                  !selectedPetsButton
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor
                }
                LeftButtonborderColor={
                  !selectedPetsButton
                    ? _COLORS.Kodie_GrayColor
                    : _COLORS.Kodie_LightWhiteColor
                }
                onPressLeftButton={() => {
                  setSelectedPetsButton(false);
                  handleInputChange(question.id, 'Yes');
                }}
                RightButtonText={'No'}
                RightButtonbackgroundColor={
                  selectedPetsButton
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor
                }
                RightButtonTextColor={
                  selectedPetsButton
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor
                }
                RightButtonborderColor={
                  selectedPetsButton
                    ? _COLORS.Kodie_GrayColor
                    : _COLORS.Kodie_LightWhiteColor
                }
                onPressRightButton={() => {
                  setSelectedPetsButton(true);
                  handleInputChange(question.id, 'No');
                }}
              />
            ) : null}
          </View>
        );

      case 'Smoking/Non-smoking':
        return (
          <View>
            <RowButtons
              LeftButtonText={'Smoking'}
              leftButtonbackgroundColor={
                !selectedSomokingButton
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selectedSomokingButton
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selectedSomokingButton
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelectedSomokingButton(false);
                setSelectedSomokingButtonId(1);
              }}
              RightButtonText={'Non-smoking'}
              RightButtonbackgroundColor={
                selectedSomokingButton
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selectedSomokingButton
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selectedSomokingButton
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressRightButton={() => {
                setSelectedSomokingButton(true);
                setSelectedSomokingButtonId(1);
              }}
            />
          </View>
        );
      case 'Search':
        return (
          <View key={index}>
            <MultiSelect
              style={RentalOfferStyle.dropdown}
              placeholderStyle={RentalOfferStyle.placeholderStyle}
              selectedTextStyle={RentalOfferStyle.selectedTextStyle}
              inputSearchStyle={RentalOfferStyle.inputSearchStyle}
              iconStyle={RentalOfferStyle.iconStyle}
              data={dropdownData[question.tqm_Question_code] || []}
              labelField="lookup_description"
              valueField="lookup_key"
              searchPlaceholder="Search..."
              search
              value={inputValues[question.tqm_Question_code] || []}
              onChange={items =>
                handleInputChange(question.tqm_Question_code, items)
              }
              onFocus={() => handleDropdown(question.tqm_Question_code)}
              renderItem={renderDataItem}
              renderSelectedItem={(item, unSelect) => (
                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View style={RentalOfferStyle.selectedStyle}>
                    <Text style={RentalOfferStyle.textSelectedStyle}>
                      {item.lookup_description}
                    </Text>
                    <AntDesign
                      color={_COLORS.Kodie_WhiteColor}
                      name="close"
                      size={17}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        );
      case 'Input_location':
        return (
          <View key={index} style={{marginTop: 10}}>
            <View style={[RentalOfferStyle.locationConView]}>
              <View style={RentalOfferStyle.locationContainer}>
                <TextInput
                  style={RentalOfferStyle.locationInput}
                  value={location}
                  onChangeText={setLocation}
                  onFocus={() => {
                    setIsSearch(true);
                    props.setOpenMap && props.setOpenMap(true);
                  }}
                  placeholder="Search location"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>
              <TouchableOpacity
                style={RentalOfferStyle.locationIconView}
                onPress={() => {
                  setIsMap(true);
                }}>
                <Octicons
                  name={'location'}
                  size={22}
                  color={_COLORS.Kodie_GreenColor}
                  style={RentalOfferStyle.locationIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={RentalOfferStyle.AddOccupantMainView}>
              <TouchableOpacity
                style={RentalOfferStyle.AddOccupantView}
                onPress={() => {
                  setToggleReference(!toggleReference);
                }}>
                <Entypo
                  name={
                    toggleReference ? 'chevron-small-up' : 'chevron-small-down'
                  }
                  color={_COLORS.Kodie_BlackColor}
                  size={25}
                />
                <Text style={RentalOfferStyle.AddOccupantText}>
                  {'Add rental references'}
                </Text>
              </TouchableOpacity>
              <FlatList
                data={referencesItem}
                keyExtractor={(item, index) => index.toString()}
                renderItem={addReferencesRender}
              />
              {toggleReference && (
                <View style={RentalOfferStyle.inputView}>
                  <View style={{marginTop: 11}}>
                    <Text style={LABEL_STYLES.commontext}>{'Full name'}</Text>
                    <TextInput
                      style={RentalOfferStyle.input}
                      placeholder={'Enter full name'}
                      onChangeText={setReferenceFullName}
                      value={referenceFullName}
                      onBlur={() => validReferenceFullName(referenceFullName)}
                    />
                  </View>
                  {referenceFullNameError ? (
                    <Text style={RentalOfferStyle.error_text}>
                      {referenceFullNameError}
                    </Text>
                  ) : null}
                  <View style={RentalOfferStyle.inputView}>
                    <Text style={LABEL_STYLES.commontext}>
                      {'Email address'}
                    </Text>
                    <TextInput
                      style={RentalOfferStyle.input}
                      placeholder={'Enter email address'}
                      onChangeText={setReferenceEmail}
                      value={referenceEmail}
                      onBlur={() => validReferencesEmailAddress(referenceEmail)}
                      keyboardType="email-address"
                    />
                  </View>
                  {referenceEmailError ? (
                    <Text style={RentalOfferStyle.error_text}>
                      {referenceEmailError}
                    </Text>
                  ) : null}
                  <CustomSingleButton
                    _ButtonText={'Add reference'}
                    Text_Color={_COLORS.Kodie_WhiteColor}
                    disabled={isLoading ? true : false}
                    onPress={() => {
                      handleReferences();
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const QuestionCodeRender = ({item, index}) => {
    return (
      <View style={{marginHorizontal: 16, marginTop: 5}}>
        <View key={question.id}>
          <Text style={LABEL_STYLES.commontext}>
            {item.tqm_Question_description}
          </Text>
          {renderQuestionComponent(item, index)}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={RentalOfferStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Submit application'}
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
            Maplat={latitude}
            Maplng={longitude}
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
                //marginTop: 10,
              }}
              onFocus={() => openMapandClose()}
              placeholder={'Search Place'}
              placeholderTextColor={_COLORS.Kodie_BlackColor}
            />
          </View>
          <TouchableOpacity
            style={RentalOfferStyle.BtnContainer}
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
            setCurrentLocation(details.formatted_address);
          }}
        />
      ) : (
        <ScrollView>
          <View style={RentalOfferStyle.container}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={IMAGES.userImage}
                resizeMode={'cover'}
                style={RentalOfferStyle.userImg}
              />
              <View style={RentalOfferStyle.userNameView}>
                <Text style={RentalOfferStyle.username}>{'Jack'}</Text>
                <Text style={RentalOfferStyle.username}>{'Black'}</Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <AntDesign
                  name="star"
                  size={18}
                  color={_COLORS.Kodie_lightGreenColor}
                  style={RentalOfferStyle.starIcon}
                />
                <Text style={[RentalOfferStyle.username]}>{'3.9 (81)'}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <AntDesign
                  name="checkcircle"
                  size={18}
                  color={_COLORS.Kodie_lightGreenColor}
                  style={RentalOfferStyle.starIcon}
                />
                <Text
                  style={[
                    RentalOfferStyle.username,
                    {color: _COLORS.Kodie_GreenColor},
                  ]}>
                  {'Verified'}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={{}}>
              <Entypo
                name="dots-three-horizontal"
                size={18}
                color={_COLORS.Kodie_GrayColor}
                style={{
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon
            borderBottomWidth={3}
            color={_COLORS.Kodie_LiteWhiteColor}
          />
          <View style={RentalOfferStyle.apartmentView}>
            <Text style={RentalOfferStyle.propertyHeading}>{'Apartment'}</Text>
            <Text
              style={[
                RentalOfferStyle.propertyHeading,
                {fontFamily: FONTFAMILY.K_Bold},
              ]}>
              {'Melbourne'}
            </Text>
            <View style={RentalOfferStyle.locationView}>
              <Entypo
                color={_COLORS.Kodie_GreenColor}
                name="location-pin"
                size={20}
              />
              <Text style={RentalOfferStyle.location}>
                {'8502 Preston Rd. Inglewood, Queensland, Australia, ...'}
              </Text>
            </View>
          </View>
          <DividerIcon
            borderBottomWidth={3}
            color={_COLORS.Kodie_LiteWhiteColor}
          />
          <View
            style={{
              marginHorizontal: 16,
            }}>
            <Text style={[RentalOfferStyle.PreRentaltext]}>
              {'Pre-rental questionnaire'}
            </Text>
          </View>
          <FlatList
            data={quesHeading}
            keyExtractor={(item, index) => item.id}
            renderItem={QuesHeadingRender}
          />
          <View style={{marginHorizontal: 16}}>
            <Text style={RentalOfferStyle.inspections}>
              {'Tenant  screening report (recommended)'}
            </Text>
            <CustomSingleButton
              _ButtonText={'Start Now'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              disabled={isLoading ? true : false}
              onPress={() => {
                refRBSheet.current.open();
              }}
            />
            {/* .... */}
          </View>
          <DividerIcon marginTop={5} />
          <View style={RentalOfferStyle.submitApplicationbtn}>
            <RowButtons
              LeftButtonText={'Cancel'}
              leftButtonbackgroundColor={
                !submitApplicationBtn
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !submitApplicationBtn
                  ? _COLORS.Kodie_WhiteColor
                  : _COLORS.Kodie_BlackColor
              }
              LeftButtonborderColor={
                !submitApplicationBtn
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_BlackColor
              }
              onPressLeftButton={() => {
                setSubmitApplicationBtn(false);
                setSubmitApplicationBtnId(0);
                // handleSubmit();
                // alert(selectPetFriendlyBtnId)
              }}
              RightButtonText={'Submit'}
              RightButtonbackgroundColor={
                submitApplicationBtn
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                submitApplicationBtn
                  ? _COLORS.Kodie_WhiteColor
                  : _COLORS.Kodie_BlackColor
              }
              RightButtonborderColor={
                submitApplicationBtn
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_BlackColor
              }
              onPressRightButton={() => {
                setSubmitApplicationBtn(true);
                setSubmitApplicationBtnId(1);
                // alert(selectPetFriendlyBtnId)
                handleSubmit();
              }}
            />
          </View>
          <View style={{marginHorizontal: 16, marginBottom: 20}}>
            <CustomSingleButton
              _ButtonText={'Upload'}
              Text_Color={_COLORS.Kodie_BlackColor}
              disabled={isLoading ? true : false}
              isLeftImage={true}
              leftImage={IMAGES.uploadIcon}
              onPress={() => {
                selectDoc();
              }}
              backgroundColor={_COLORS.Kodie_lightGreenColor}
            />
          </View>
          <RBSheet
            height={500}
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
              draggableIcon: {
                backgroundColor: _COLORS.Kodie_LightGrayColor,
              },
              container: RentalOfferStyle.bottomModal_container,
            }}>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                onClose();
              }}>
              <Text style={RentalOfferStyle.tenantScreenText}>
                {'Tenant screening report'}
              </Text>
              <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
            </TouchableOpacity>
            <TenantScreeningReportModal onClose={onClose} />
          </RBSheet>
          <RBSheet
            height={400}
            ref={refRBSheet1}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
              draggableIcon: {
                backgroundColor: _COLORS.Kodie_LightGrayColor,
              },
              container: RentalOfferStyle.bottomModal_container,
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                marginHorizontal: 10,
              }}
              onPress={() => {
                onClose1();
              }}>
              <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
            </TouchableOpacity>
            <ApplicationSubmitModal onClose={onClose1} />
          </RBSheet>
        </ScrollView>
      )}
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default RentalOffer;
