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
import {_COLORS, FONTFAMILY, IMAGES, LABEL_STYLES} from '../../../../Themes';
import {PreRentalQuestionnaireStyle} from './PreRentalQuestionnaireStyle';
import {_goBack} from '../../../../services/CommonServices';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DividerIcon from '../../../Atoms/Devider/DividerIcon';
import CalendarModal from '../../../Molecules/CalenderModal/CalenderModal';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import CustomSingleButton from '../../../Atoms/CustomButton/CustomSingleButton';
import RowButtons from '../../../Molecules/RowButtons/RowButtons';
import {Config} from '../../../../Config';
import axios from 'axios';
import {CommonLoader} from '../../../Molecules/ActiveLoader/ActiveLoader';
import {SignupLookupDetails} from '../../../../APIs/AllApi';
import Geocoder from 'react-native-geocoding';
import DocumentPicker from 'react-native-document-picker';
import {useSelector} from 'react-redux';
import {acceptingLandlord} from '../../../../services/PropertyRentalOfferApi/AcceptingBiddingApi';
import {useNavigation} from '@react-navigation/native';
const PreRentalQuestionnaire = props => {
  const {
    accountId,
    propertyId,
    bid_id,
    tenant_id,
    landlord_id,
    acceptBiddingData,
  } = props;
  const bibId = props?.route?.params?.bibId;
  console.log('propertyId..', propertyId);
  console.log('bibId in rental..', bibId);
  const navigation = useNavigation();
  const [fileKey, setFileKey] = useState(0);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [submitApplicationBtn, setSubmitApplicationBtn] = useState(false);
  const [acceptBiddingBtnId, setAcceptBiddingBtnId] = useState(556);
  // ...
  const [quesHeading, setQuesHeading] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [question, setQuestion] = useState([]);
  const [dropdownData, setDropdownData] = useState({});
  const [numberOccupants, setNumberOccupants] = useState(0);
  const [numberLeaseHolder, setNumberLeaseHolder] = useState(0);
  const [numberYearEmp, setNumberYearEmp] = useState(0);
  const [numberPets, setNumberPets] = useState(0);
  const [toggleOccupants, setToggleOccupants] = useState(false);
  const [toggleLeaseHolder, setToggleLeaseHolder] = useState(false);
  const [selectedButton, setSelectedButton] = useState(false);
  const [selectedRentalBondButton, setSelectedRentalBondButton] =
    useState(false);
  const [selectedPetsButton, setSelectedPetsButton] = useState(false);
  const [selectedPreviousRentalButton, setSelectedPreviousRentalButton] =
    useState(false);
  const [selectedSomokingButton, setSelectedSomokingButton] = useState(false);
  const [typeOfPetsValue, setTypeOfPetsValue] = useState([]);
  const [toggleReference, setToggleReference] = useState(false);

  const [location, setLocation] = useState('');
  const addressParts = location ? location.split(', ') : [];
  const country = addressParts.pop();
  const state = addressParts.pop();
  const city = addressParts.join(', ');
  const [occupants, setOccupants] = useState([]);
  const [leaseHolderItem, setLeaseHolderItem] = useState([]);
  const [subChildren, setSubChildren] = useState([]);
  const [petsSubChildren, setPetsSubChildren] = useState([]);
  useEffect(() => {
    handleTenantQues();
    getEditAllQuestion();
  }, [question]);

  useEffect(() => {
    if (inputValues['PREVIOUS_ADDRESS']) {
      setLocation(inputValues['PREVIOUS_ADDRESS']);
    }
  }, [inputValues]);
  const handleAcceptingLandlord = async () => {
    setIsLoading(true);

    const acceptingLandlordData = {
      property_id: propertyId,
      bid_id: bid_id,
      tenant_id: tenant_id,
      landlord_id: landlord_id,
      accepting_details: acceptBiddingBtnId,
    };

    console.log('acceptingLandlordData:', acceptingLandlordData);

    try {
      const response = await acceptingLandlord(acceptingLandlordData);
      console.log('Response in handleAcceptingLandlord:', response);

      if (response?.success === true) {
        alert(response?.data);
        navigation.navigate('Properties', {
          tab3: 'tab3',
        });
      }
    } catch (error) {
      if (error.response) {
        console.error(
          'Server responded with a status code:',
          error.response.status,
        );
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    } finally {
      setIsLoading(false); // Stop loading state
    }
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
  const handleLocationChange = text => {
    setLocation(text);
    handleInputChange('PREVIOUS_ADDRESS', text);
  };

  const getEditAllQuestion = async () => {
    const url = Config.BASE_URL;
    const Ques_url = url + 'question_details_for_tenant_ques';
    console.log('Request URL:', Ques_url);
    setIsLoading(true);

    const QuesData = {
      p_account_id: accountId,
      //   p_property_id: propertyId,
      p_property_id: propertyId,
    };

    try {
      const response = await axios.post(Ques_url, QuesData);
      console.log('Response edit question..', response?.data);

      if (response?.data?.success === true) {
        const data = response?.data?.data?.[0]?.parent_json;
        console.log('Response edit question data..', JSON.stringify(data));
        if (Array.isArray(data)) {
          const initialValues = {};
          const dropdownQuestions = [];

          data.forEach(parentQuestion => {
            if (Array.isArray(parentQuestion.children)) {
              parentQuestion.children.forEach(childQuestion => {
                if (childQuestion.tqm_Question_type === 'Dropdown') {
                  dropdownQuestions.push(childQuestion.tqm_Question_code);
                }

                if (
                  childQuestion.tqm_Question_value !== undefined &&
                  childQuestion.tqm_Question_value !== null
                ) {
                  initialValues[childQuestion.tqm_Question_code] =
                    childQuestion.tqm_Question_value;

                  // Set the initial state for Yes/No and Smoking buttons
                  if (childQuestion.tqm_Question_code === 'EARN_INCOME') {
                    setSelectedButton(childQuestion.tqm_Question_value === 1);
                  } else if (
                    childQuestion.tqm_Question_code === 'EVER_BROKEN'
                  ) {
                    setSelectedRentalBondButton(
                      childQuestion.tqm_Question_value === 1,
                    );
                  } else if (
                    childQuestion.tqm_Question_code === 'EVICTED_PREVIOUS_BOND'
                  ) {
                    setSelectedPreviousRentalButton(
                      childQuestion.tqm_Question_value === 1,
                    );
                  } else if (childQuestion.tqm_Question_code === 'ANY_PETS') {
                    setSelectedPetsButton(
                      childQuestion.tqm_Question_value === 1,
                    );
                  } else if (childQuestion.tqm_Question_code === 'S/NS') {
                    setSelectedSomokingButton(
                      childQuestion.tqm_Question_value === 0,
                    ); // Assuming 0 means Smoking and 1 means Non-smoking
                  }
                }
              });
            }
          });

          // Fetch dropdown data and set initial values
          const dropdownDataPromises = dropdownQuestions.map(
            async questionCode => {
              const options = await handleDropdown(questionCode);
              setDropdownData(prevData => ({
                ...prevData,
                [questionCode]: options,
              }));

              // Convert initialValues to match dropdown options format
              const value = initialValues[questionCode];
              if (value) {
                const selectedOption = options.find(
                  option => String(option.lookup_key) === String(value),
                );
                if (selectedOption) {
                  initialValues[questionCode] = selectedOption.lookup_key; // Ensure value matches valueField
                }
              }
            },
          );

          // Wait for all dropdown data to be fetched and set
          await Promise.all(dropdownDataPromises);

          setInputValues(initialValues);
          if (initialValues['PREVIOUS_ADDRESS']) {
            setLocation(initialValues['PREVIOUS_ADDRESS']);
          }
          console.log('response in edit mode...', JSON.stringify(data));
        } else {
          console.error(
            'Invalid data structure: parent_json is not an array',
            data,
          );
        }
      }
    } catch (error) {
      console.error('API failed EdittenantQues', error);
    } finally {
      setIsLoading(false);
    }
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
      <View style={[PreRentalQuestionnaireStyle.item]}>
        <Text style={PreRentalQuestionnaireStyle.selectedTextStyle}>
          {item.lookup_description}
        </Text>
        <AntDesign
          style={PreRentalQuestionnaireStyle.icon}
          color={_COLORS.Kodie_WhiteColor}
          name="check"
          size={20}
        />
      </View>
    );
  };
  const addOccupantRender = ({item, index}) => {
    return (
      <View style={PreRentalQuestionnaireStyle.occupants_item_View}>
        <View>
          <Text style={PreRentalQuestionnaireStyle.occupants_name}>
            {item?.fullName}
          </Text>
          <Text style={PreRentalQuestionnaireStyle.occupants_email}>
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
      <View style={PreRentalQuestionnaireStyle.occupants_item_View}>
        <View>
          <Text style={PreRentalQuestionnaireStyle.occupants_name}>
            {item?.leaseFullName}
          </Text>
          <Text style={PreRentalQuestionnaireStyle.occupants_email}>
            {item?.leaseEmailAddress}
          </Text>
          <Text style={PreRentalQuestionnaireStyle.occupants_email}>
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
      <View style={PreRentalQuestionnaireStyle.occupants_item_View}>
        <View>
          <Text style={PreRentalQuestionnaireStyle.occupants_name}>
            {item?.referenceFullName}
          </Text>
          <Text style={PreRentalQuestionnaireStyle.occupants_email}>
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
      <View style={PreRentalQuestionnaireStyle.AddOccupantMainView}>
        <TouchableOpacity
          style={PreRentalQuestionnaireStyle.AddOccupantView}
          onPress={() => {
            setToggleOccupants(!toggleOccupants);
          }}>
          <Entypo
            name={toggleOccupants ? 'chevron-small-up' : 'chevron-small-down'}
            color={_COLORS.Kodie_BlackColor}
            size={25}
          />
          <Text style={PreRentalQuestionnaireStyle.AddOccupantText}>
            {'Add occupants'}
          </Text>
        </TouchableOpacity>

        <FlatList
          data={occupants}
          keyExtractor={(item, index) => index.toString()}
          renderItem={addOccupantRender}
        />
        {toggleOccupants && (
          <View style={PreRentalQuestionnaireStyle.inputView}>
            <View style={{marginTop: 11}}>
              <Text style={LABEL_STYLES.commontext}>{fullNameLabel}</Text>
              <TextInput
                style={PreRentalQuestionnaireStyle.input}
                placeholder={'Enter full name'}
                onChangeText={setFullName}
                onBlur={() => handleValidFullName(fullName)}
                value={fullName}
              />
            </View>
            {fullNameError ? (
              <Text style={PreRentalQuestionnaireStyle.error_text}>
                {fullNameError}
              </Text>
            ) : null}
            <View style={PreRentalQuestionnaireStyle.inputView}>
              <Text style={LABEL_STYLES.commontext}>{emailAddressLabel}</Text>
              <TextInput
                style={PreRentalQuestionnaireStyle.input}
                placeholder={'Enter email address'}
                onChangeText={setEmailAddress}
                onBlur={() => handleValidEmial(emailAddress)}
                value={emailAddress}
                keyboardType="email-address"
              />
            </View>
            {emailAddressError ? (
              <Text style={PreRentalQuestionnaireStyle.error_text}>
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
      <View style={PreRentalQuestionnaireStyle.AddOccupantMainView}>
        <TouchableOpacity
          style={PreRentalQuestionnaireStyle.AddOccupantView}
          onPress={() => {
            setToggleLeaseHolder(!toggleLeaseHolder);
          }}>
          <Entypo
            name={toggleLeaseHolder ? 'chevron-small-up' : 'chevron-small-down'}
            color={_COLORS.Kodie_BlackColor}
            size={25}
          />
          <Text style={PreRentalQuestionnaireStyle.AddOccupantText}>
            {'Add leaseholders'}
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: 10}}>
          {toggleLeaseHolder && (
            <Text style={PreRentalQuestionnaireStyle.AddLeasesubText}>
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
              <View style={PreRentalQuestionnaireStyle.inputView}>
                <Text style={LABEL_STYLES.commontext}>{fullNameLabel}</Text>
                <TextInput
                  style={PreRentalQuestionnaireStyle.input}
                  placeholder={'Enter full name'}
                  onChangeText={setLeaseFullName}
                  value={leaseFullName}
                  onBlur={() => validLeaseFullName(leaseFullName)}
                />
              </View>
              {leaseFullNameError ? (
                <Text style={PreRentalQuestionnaireStyle.error_text}>
                  {leaseFullNameError}
                </Text>
              ) : null}
              <View style={PreRentalQuestionnaireStyle.inputView}>
                <Text style={LABEL_STYLES.commontext}>{emailAddressLabel}</Text>
                <TextInput
                  style={PreRentalQuestionnaireStyle.input}
                  placeholder={'Enter email address'}
                  onChangeText={setleaseEmailAddress}
                  value={leaseEmailAddress}
                  onBlur={() => validLeaseEmailAddress(leaseEmailAddress)}
                  keyboardType="email-address"
                />
              </View>
              {leaseEmailAddressError ? (
                <Text style={PreRentalQuestionnaireStyle.error_text}>
                  {leaseEmailAddressError}
                </Text>
              ) : null}
              <View style={PreRentalQuestionnaireStyle.inputView}>
                <Text style={LABEL_STYLES.commontext}>
                  {confirmEmailAddressLabel}
                </Text>
                <TextInput
                  style={PreRentalQuestionnaireStyle.input}
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
                <Text style={PreRentalQuestionnaireStyle.error_text}>
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
        <View style={PreRentalQuestionnaireStyle.mainfeaturesview}>
          <View style={PreRentalQuestionnaireStyle.key_feature_Text_view}>
            <Text style={PreRentalQuestionnaireStyle.key_feature_Text}>
              {section?.tqm_Question_description}
            </Text>
          </View>
          <TouchableOpacity style={PreRentalQuestionnaireStyle.plus_minusview}>
            <TouchableOpacity
              style={PreRentalQuestionnaireStyle.menusIconView}
              onPress={
                section?.tqm_Question_code === 'NOO'
                  ? decreaseNumberOccupants
                  : decreaseLeaseHolder
              }>
              <AntDesign name="minus" size={20} color={'black'} />
            </TouchableOpacity>
            <Text style={PreRentalQuestionnaireStyle.countdata}>
              {section?.tqm_Question_code === 'NOO'
                ? numberOccupants
                : numberLeaseHolder}
            </Text>
            <TouchableOpacity
              style={PreRentalQuestionnaireStyle.menusIconView}
              onPress={
                section?.tqm_Question_code === 'NOO'
                  ? increaseNumberOccupants
                  : increaseLeaseHolder
              }>
              <AntDesign name="plus" size={20} color={'black'} />
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
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleItem = itemChildren => {
    setExpandedItem(prevState =>
      prevState === itemChildren ? null : itemChildren,
    );
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
        questionId,
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
      p_account_id: accountId,
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

          // Find the question with tqm_Question_code "MANY_PETS"
          const preferencesQuestion = parentJson.find(item =>
            item?.children?.some(
              child => child?.tqm_Question_code === 'MANY_PETS',
            ),
          );

          let petsSubChildren = [];
          if (preferencesQuestion) {
            const targetPreferencesQuestion = preferencesQuestion.children.find(
              child => child.tqm_Question_code === 'MANY_PETS',
            );
            petsSubChildren = targetPreferencesQuestion?.sub_children || [];
          }

          // Store petsSubChildren in a state or variable
          console.log('Pets Sub Children:', petsSubChildren);
          setPetsSubChildren(petsSubChildren);

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
        const dropdownOptions = res?.lookup_details;
        setDropdownData(prevData => ({
          ...prevData,
          [questionCode]: dropdownOptions,
        }));
        return dropdownOptions; // Return the fetched options
      } else {
        console.error(
          'Error: Unable to fetch dropdown data',
          JSON.stringify(res),
        );
        setIsLoading(false);
        return [];
      }
    } catch (error) {
      console.log('error.....', error);
      alert('Lookup Code Miss Match');
      setIsLoading(false);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const QuesHeadingRender = ({item}) => {
    return (
      <View style={{marginTop: 5}}>
        <View style={PreRentalQuestionnaireStyle.propety_details_view}>
          <Text style={PreRentalQuestionnaireStyle.propery_det}>
            {item?.tqm_Question_description}
          </Text>
          <TouchableOpacity
            style={PreRentalQuestionnaireStyle.down_Arrow_icon}
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
    console.log(`Handling input change for ${questionCode}: ${value}`);
    setInputValues(prevValues => ({
      ...prevValues,
      [questionCode]: value,
    }));
  };
  const renderQuestionComponent = (question, index) => {
    switch (question.tqm_Question_type) {
      case 'Input':
        return (
          <View key={index}>
            <TextInput
              style={PreRentalQuestionnaireStyle.input}
              placeholder={`Enter your ${question.tqm_Question_description}`}
              onChangeText={text => {
                handleInputChange(question.tqm_Question_code, text, index);
              }}
              value={inputValues[question.tqm_Question_code] || ''}
              editable={false}
            />
          </View>
        );
      case 'Number':
        return (
          <View>
            <TextInput
              style={PreRentalQuestionnaireStyle.input}
              placeholder={`Enter your ${question.tqm_Question_description}`}
              onChangeText={text =>
                handleInputChange(question.tqm_Question_code, text, index)
              }
              value={inputValues[question.tqm_Question_code] || ''}
              keyboardType="number-pad"
              editable={false}
            />
          </View>
        );
      case 'Date':
        return (
          <View style={PreRentalQuestionnaireStyle.datePickerView}>
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
              editable={false}
            />
          </View>
        );
      case 'Dropdown':
        return (
          <View>
            <Dropdown
              style={PreRentalQuestionnaireStyle.dropdown}
              placeholderStyle={PreRentalQuestionnaireStyle.placeholderStyle}
              selectedTextStyle={PreRentalQuestionnaireStyle.selectedTextStyle}
              inputSearchStyle={PreRentalQuestionnaireStyle.inputSearchStyle}
              iconStyle={PreRentalQuestionnaireStyle.iconStyle}
              data={dropdownData[question.tqm_Question_code] || []}
              search
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="Select an option"
              searchPlaceholder="Search..."
              disable
              value={inputValues[question.tqm_Question_code] || ''}
              onFocus={() => handleDropdown(question.tqm_Question_code, index)}
              onChange={item => {
                console.log(
                  `Dropdown change for ${question.tqm_Question_code}: ${item.lookup_key}`,
                );
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
            <View
              style={PreRentalQuestionnaireStyle.mainfeaturesview}
              key={index}>
              <View style={PreRentalQuestionnaireStyle.key_feature_Text_view}>
                <Text style={PreRentalQuestionnaireStyle.key_feature_Text}>
                  {'Number of years employed'}
                </Text>
              </View>
              <TouchableOpacity
                style={PreRentalQuestionnaireStyle.plus_minusview}>
                <TouchableOpacity
                  style={PreRentalQuestionnaireStyle.menusIconView}
                >
                  <AntDesign
                    name="minus"
                    size={20}
                    color={_COLORS.Kodie_BlackColor}
                  />
                </TouchableOpacity>
                <Text style={PreRentalQuestionnaireStyle.countdata}>
                  {numberYearEmp}
                </Text>
                <TouchableOpacity
                  style={PreRentalQuestionnaireStyle.menusIconView}
                >
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
            <View
              style={PreRentalQuestionnaireStyle.mainfeaturesview}
              key={index}>
              <View style={PreRentalQuestionnaireStyle.key_feature_Text_view}>
                <Text style={PreRentalQuestionnaireStyle.key_feature_Text}>
                  {/* {'Number of pets'} */}
                  {petsSubChildren[0]?.tqm_Question_description}
                </Text>
              </View>
              <TouchableOpacity
                style={PreRentalQuestionnaireStyle.plus_minusview}>
                <TouchableOpacity
                  style={PreRentalQuestionnaireStyle.menusIconView}
                >
                  <AntDesign
                    name="minus"
                    size={20}
                    color={_COLORS.Kodie_BlackColor}
                  />
                </TouchableOpacity>
                <Text style={PreRentalQuestionnaireStyle.countdata}>
                  {numberPets}
                </Text>
                <TouchableOpacity
                  style={PreRentalQuestionnaireStyle.menusIconView}
                >
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
                  handleInputChange(question.id, 1);
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
                  handleInputChange(question.id, 0);
                }}
                disabled={true} // Set this to true to make buttons non-interactive
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
                  handleInputChange(question.id, 1);
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
                  handleInputChange(question.id, 0);
                }}
                disabled={true} // Set this to true to make buttons non-interactive
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
                  handleInputChange(question.id, 1);
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
                  handleInputChange(question.id, 0);
                }}
                disabled={true} // Set this to true to make buttons non-interactive
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
                  handleInputChange(question.id, 1);
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
                  handleInputChange(question.id, 0);
                }}
                disabled={true} // Set this to true to make buttons non-interactive
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
                handleInputChange(question.id, 1);
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
                handleInputChange(question.id, 0);
              }}
              disabled={true}
            />
          </View>
        );

      case 'Search':
        return (
          <View key={index}>
            <MultiSelect
              style={PreRentalQuestionnaireStyle.dropdown}
              placeholderStyle={PreRentalQuestionnaireStyle.placeholderStyle}
              selectedTextStyle={PreRentalQuestionnaireStyle.selectedTextStyle}
              inputSearchStyle={PreRentalQuestionnaireStyle.inputSearchStyle}
              iconStyle={PreRentalQuestionnaireStyle.iconStyle}
              data={dropdownData[question.tqm_Question_code] || []}
              labelField="lookup_description"
              valueField="lookup_key"
              searchPlaceholder="Search..."
              search
              disable
              value={inputValues[question.tqm_Question_code] || []}
              onChange={items =>
                handleInputChange(question.tqm_Question_code, items)
              }
              onFocus={() => handleDropdown(question.tqm_Question_code)}
              renderItem={renderDataItem}
              renderSelectedItem={(item, unSelect) => (
                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View style={PreRentalQuestionnaireStyle.selectedStyle}>
                    <Text style={PreRentalQuestionnaireStyle.textSelectedStyle}>
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
            <View style={[PreRentalQuestionnaireStyle.locationConView]}>
              <View style={PreRentalQuestionnaireStyle.locationContainer}>
                <TextInput
                  style={PreRentalQuestionnaireStyle.locationInput}
                  value={location}
                  onChangeText={handleLocationChange}
                  placeholder="Search location"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  editable={false}
                />
              </View>
              <TouchableOpacity
                style={PreRentalQuestionnaireStyle.locationIconView}
                onPress={() => {}}>
                <Octicons
                  name={'location'}
                  size={22}
                  color={_COLORS.Kodie_GreenColor}
                  style={PreRentalQuestionnaireStyle.locationIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={PreRentalQuestionnaireStyle.AddOccupantMainView}>
              <TouchableOpacity
                style={PreRentalQuestionnaireStyle.AddOccupantView}
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
                <Text style={PreRentalQuestionnaireStyle.AddOccupantText}>
                  {'Add rental references'}
                </Text>
              </TouchableOpacity>
              <FlatList
                data={referencesItem}
                keyExtractor={(item, index) => index.toString()}
                renderItem={addReferencesRender}
              />
              {toggleReference && (
                <View style={PreRentalQuestionnaireStyle.inputView}>
                  <View style={{marginTop: 11}}>
                    <Text style={LABEL_STYLES.commontext}>{'Full name'}</Text>
                    <TextInput
                      style={PreRentalQuestionnaireStyle.input}
                      placeholder={'Enter full name'}
                      onChangeText={setReferenceFullName}
                      value={referenceFullName}
                      onBlur={() => validReferenceFullName(referenceFullName)}
                    />
                  </View>
                  {referenceFullNameError ? (
                    <Text style={PreRentalQuestionnaireStyle.error_text}>
                      {referenceFullNameError}
                    </Text>
                  ) : null}
                  <View style={PreRentalQuestionnaireStyle.inputView}>
                    <Text style={LABEL_STYLES.commontext}>
                      {'Email address'}
                    </Text>
                    <TextInput
                      style={PreRentalQuestionnaireStyle.input}
                      placeholder={'Enter email address'}
                      onChangeText={setReferenceEmail}
                      value={referenceEmail}
                      onBlur={() => validReferencesEmailAddress(referenceEmail)}
                      keyboardType="email-address"
                    />
                  </View>
                  {referenceEmailError ? (
                    <Text style={PreRentalQuestionnaireStyle.error_text}>
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
    <SafeAreaView style={PreRentalQuestionnaireStyle.mainContainer}>
      <ScrollView>
        <FlatList
          data={quesHeading}
          keyExtractor={(item, index) => item.id}
          renderItem={QuesHeadingRender}
        />
        <View style={{marginHorizontal: 16}}>
          <Text style={PreRentalQuestionnaireStyle.inspections}>
            {'Tenant  screening report (recommended)'}
          </Text>

          <View style={PreRentalQuestionnaireStyle.container}>
            <View style={PreRentalQuestionnaireStyle.pdfInfo}>
              <FontAwesome
                name="file-pdf-o"
                size={35}
                color={_COLORS.Kodie_BlackColor}
                resizeMode={'contain'}
              />
              <View style={PreRentalQuestionnaireStyle.textContainer}>
                <Text style={PreRentalQuestionnaireStyle.pdfName}>
                  {'Tenant  screening report.pdf'}
                </Text>
                <Text style={PreRentalQuestionnaireStyle.pdfSize}>
                  {' '}
                  {'4.5 MB'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={PreRentalQuestionnaireStyle.crossIcon}
              onPress={() => {
                // setFilePath();
                // setFileKey();
              }}>
              <Entypo name="cross" size={25} color={_COLORS.Kodie_GrayColor} />
            </TouchableOpacity>
          </View>
        </View>
        <DividerIcon marginTop={5} />
        <View style={PreRentalQuestionnaireStyle.submitApplicationbtn}>
          <RowButtons
            LeftButtonText={
              acceptBiddingData[1]?.lookup_description || 'Reject'
            }
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
              setAcceptBiddingBtnId(555);
            }}
            RightButtonText={
              acceptBiddingData[0]?.lookup_description || 'Accept'
            }
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
              setAcceptBiddingBtnId(556);
              handleAcceptingLandlord();
            }}
          />
        </View>
      </ScrollView>
      {/* {isLoading ? <CommonLoader /> : null} */}
    </SafeAreaView>
  );
};

export default PreRentalQuestionnaire;
