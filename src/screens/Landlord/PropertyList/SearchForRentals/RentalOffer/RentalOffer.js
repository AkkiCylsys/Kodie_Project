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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import CalendarModal from '../../../../../components/Molecules/CalenderModal/CalenderModal';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import RowButtons from '../../../../../components/Molecules/RowButtons/RowButtons';

import {Config} from '../../../../../Config';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';
import TenantScreeningReportModal from '../../../../../components/Molecules/TenantScreeningReportModal/TenantScreeningReportModal';
import ApplicationSubmitModal from '../../../../../components/Molecules/TenantScreeningReportModal/ApplicationSubmitModal';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {SignupLookupDetails} from '../../../../../APIs/AllApi';
import MapScreen from '../../../../../components/Molecules/GoogleMap/googleMap';
import Geocoder from 'react-native-geocoding';
import SearchPlaces from '../../../../../components/Molecules/SearchPlaces/SearchPlaces';
import DocumentPicker from 'react-native-document-picker';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const RentalOffer = props => {
  const edit_offer = props?.route?.params?.edit_offer;
  const propertyDetails = props?.route?.params?.propertyDetails;
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('propertyDetails....', propertyDetails);
  const profile_image = loginData?.Login_details?.profile_photo_path;
  const loginAccountDetails = loginData?.Account_details[0];
  const propertyId = props?.route?.params?.propertyId;
  const bibId = props?.route?.params?.bibId;
  console.log('propertyId..', propertyId);
  console.log('bibId in rental..', bibId);

  const [errors, setErrors] = useState({});
  const [allparentsQuestion, setAllparentsQuestion] = useState([]);

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

  const [employeeReferenceFullName, setEmployeeReferenceFullName] =
    useState('');
  const [employeereferenceFullNameError, setEmployeeReferenceFullNameError] =
    useState('');
  const [employeeReferenceEmail, setEmployeeReferenceEmail] = useState('');
  const [employeeReferenceEmailError, setEmployeeReferenceEmailError] =
    useState('');
  const [employeeReferencesItem, setEmployeeReferencesItem] = useState([]);

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
  const [submitApplicationBtnId, setSubmitApplicationBtnId] = useState(0);
  // ...
  const [quesHeading, setQuesHeading] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [question, setQuestion] = useState([]);
  const [preference, setPreference] = useState([]);
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
  const [selectedSomokingButton, setSelectedSomokingButton] = useState(true);
  const [typeOfPetsValue, setTypeOfPetsValue] = useState([]);
  const [toggleReference, setToggleReference] = useState(false);
  const [toggleEmployeeReference, setToggleEmployeeReference] = useState(false);

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
  const [subChildren, setSubChildren] = useState([]);
  const [petsSubChildren, setPetsSubChildren] = useState([]);
  const [biddingDetailsMessage, setBiddingDetailsMessage] = useState('');
  const [budgetValue, setBudgetValue] = useState('');
  const isFocus = useIsFocused();
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

  const increaseNumberYearEmp = questionCode => {
    setNumberYearEmp(prevCount => {
      const newCount = prevCount + 1; // This will now correctly add 1 to the numeric value
      handleInputChange(questionCode, newCount); // Call handleInputChange with the updated value
      return newCount;
    });
  };

  const decreaseNumberYearEmp = questionCode => {
    setNumberYearEmp(prevCount => {
      if (prevCount > 0) {
        const newCount = prevCount - 1; // This will now correctly subtract 1
        handleInputChange(questionCode, newCount); // Call handleInputChange with the updated value
        return newCount;
      }
      return prevCount; // Return the current count if it's already 0
    });
  };
  const decreaseNumberPets = questionCode => {
    setNumberPets(prevCount => {
      if (prevCount > 0) {
        const newCount = prevCount - 1;
        handleInputChange(questionCode, newCount); // Update the input value
        return newCount;
      }
      return prevCount; // Prevent going below 0
    });
  };

  const increaseNumberPets = questionCode => {
    setNumberPets(prevCount => {
      const newCount = prevCount + 1;
      handleInputChange(questionCode, newCount); // Update the input value
      return newCount;
    });
  };

  useEffect(() => {
    handleTenantQues();
    edit_offer == 'edit_offer' ? getEditAllQuestion() : null;
  }, [question, isFocus]);

  useEffect(() => {
    if (inputValues['PREVIOUS_ADDRESS']) {
      setLocation(inputValues['PREVIOUS_ADDRESS']);
    }
  }, [inputValues]);

  // Upload Documents....
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        // allowMultiSelection: true,
      });
      console.log('doc......', doc);
      setSelectFile(doc);
      // await uploadDocument(doc);
      console.log('Documents.....', doc);
      console.log('selectFile.....', selectFile);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };
  const bytesToMB = bytes => {
    if (bytes === 0) return '0 MB';
    const MB = bytes / (1024 * 1024);
    return `${MB.toFixed(2)} MB`;
  };
  const fileSizeInMB = selectFile[0] ? bytesToMB(selectFile[0].size) : 'N/A';
  const handleLocationChange = text => {
    setLocation(text);
    handleInputChange('PREVIOUS_ADDRESS', text);
    // inputValues[question.tqm_Question_code] = text;
    // validateFields();
  };

  const getEditAllQuestion = async () => {
    const url = Config.BASE_URL;
    const Ques_url = url + 'question_details_for_tenant_ques';
    console.log('Request URL:', Ques_url);
    setIsLoading(true);

    const QuesData = {
      p_account_id: loginData?.Login_details?.user_account_id,
      p_property_id: propertyId,
    };

    console.log('QuesData in edit offer..', QuesData);

    try {
      const response = await axios.post(Ques_url, QuesData);
      console.log('Response edit question..', response?.data);

      // This is for get Occupants ,Leaseholders,EmployeeReference and Reference Data.
      if (response?.data?.success) {
        const data = response?.data?.data?.[0]?.parent_json;

        if (Array.isArray(data)) {
          const initialValues = {};
          const dropdownQuestions = [];
          let occupants = [];
          let leaseHolders = [];
          let employeeReferences = [];
          let rentalReferences = [];

          data.forEach(parentQuestion => {
            if (Array.isArray(parentQuestion.children)) {
              parentQuestion.children.forEach(childQuestion => {
                if (Array.isArray(childQuestion.sub_children)) {
                  childQuestion.sub_children.forEach(subChildQuestion => {
                    // Parsing Occupants
                    if (
                      subChildQuestion.tqm_Question_description?.trim() ===
                      'Add Occupant'
                    ) {
                      console.log("Found 'Add Occupant' question");
                      try {
                        const parsedOccupants = JSON.parse(
                          subChildQuestion.tqm_Question_value || '[]',
                        );
                        if (Array.isArray(parsedOccupants)) {
                          occupants = parsedOccupants;
                          console.log(
                            'Occupant data parsed successfully:',
                            occupants,
                          );
                        }
                      } catch (e) {
                        console.error('Error parsing occupants:', e);
                      }
                    }

                    // Parsing Leaseholders
                    if (
                      subChildQuestion.tqm_Question_description?.trim() ===
                      'Add leaseholders'
                    ) {
                      console.log("Found 'Add leaseholders' question");
                      try {
                        const parsedLeaseHolders = JSON.parse(
                          subChildQuestion.tqm_Question_value || '[]',
                        );
                        if (Array.isArray(parsedLeaseHolders)) {
                          leaseHolders = parsedLeaseHolders;
                          console.log(
                            'Leaseholder data parsed successfully:',
                            leaseHolders,
                          );
                        }
                      } catch (e) {
                        console.error('Error parsing leaseholders:', e);
                      }
                    }
                  });
                }

                // Parsing Employee References
                if (
                  childQuestion.tqm_Question_description?.trim() ===
                  'Add employment references'
                ) {
                  console.log("Found 'Add employment references' question");
                  try {
                    const parsedEmployeeReferences = JSON.parse(
                      childQuestion.tqm_Question_value || '[]',
                    );
                    if (Array.isArray(parsedEmployeeReferences)) {
                      employeeReferences = parsedEmployeeReferences;
                      console.log(
                        'Employee reference data parsed successfully:',
                        employeeReferences,
                      );
                    }
                  } catch (e) {
                    console.error('Error parsing employee references:', e);
                  }
                }

                // Parsing Rental References
                if (
                  childQuestion.tqm_Question_description?.trim() ===
                  'Add rental references'
                ) {
                  console.log("Found 'Add rental references' question");
                  try {
                    const parsedRentalReferences = JSON.parse(
                      childQuestion.tqm_Question_value || '[]',
                    );
                    if (Array.isArray(parsedRentalReferences)) {
                      rentalReferences = parsedRentalReferences;
                      console.log(
                        'Rental reference data parsed successfully:',
                        rentalReferences,
                      );
                    }
                  } catch (e) {
                    console.error('Error parsing rental references:', e);
                  }
                }

                // Handling Dropdown and Yes/No questions
                if (childQuestion.tqm_Question_type === 'Dropdown') {
                  dropdownQuestions.push(childQuestion.tqm_Question_code);
                }

                if (childQuestion.tqm_Question_type === 'Yes_no') {
                  setButtonState(
                    childQuestion.tqm_Question_code,
                    childQuestion.tqm_Question_value,
                  );
                }

                // Setting initial values
                if (
                  childQuestion.tqm_Question_value !== undefined &&
                  childQuestion.tqm_Question_value !== null
                ) {
                  initialValues[childQuestion.tqm_Question_code] =
                    childQuestion.tqm_Question_value;
                }
              });
            }
          });

          // Set state variables
          setOccupants(occupants);
          setLeaseHolderItem(leaseHolders);
          // setEmployeeReferences(employeeReferences);
          setEmployeeReferencesItem(employeeReferences);
          // setRentalReferences(rentalReferences);
          setReferencesItem(rentalReferences);

          // Logging the counts
          console.log('Occupants in edit mode...', occupants);
          console.log('Leaseholder item in edit mode...', leaseHolders);
          console.log(
            'Employee references in edit mode...',
            employeeReferences,
          );
          console.log('Rental references in edit mode...', rentalReferences);

          // Handle dropdown data

          const dropdownDataPromises = dropdownQuestions.map(
            async questionCode => {
              const options = await handleDropdown(questionCode);
              setDropdownData(prevData => ({
                ...prevData,
                [questionCode]: options,
              }));

              const value = initialValues[questionCode];
              if (value) {
                const selectedOption = options.find(
                  option => String(option.lookup_key) === String(value),
                );
                if (selectedOption) {
                  initialValues[questionCode] = selectedOption.lookup_key;
                }
              }
            },
          );

          await Promise.all(dropdownDataPromises);
          setInputValues(initialValues);
          if (initialValues['PREVIOUS_ADDRESS']) {
            setLocation(initialValues['PREVIOUS_ADDRESS']);
          }

          console.log('Response data in edit mode...', JSON.stringify(data));

          // This is for all buttons.
          const EmploymentfilteredData =
            data[1]?.children?.filter(
              item => item.tqm_Question_view !== null,
            ) || [];
          console.log('EmploymentfilteredData...', EmploymentfilteredData);
          // Ensure to convert tqm_Question_value to a number before setting it
          const initialValue =
            Number(EmploymentfilteredData[2]?.tqm_Question_value) || 0;
          console.log('initialValue of no emp....', initialValue);
          setNumberYearEmp(initialValue);

          const rentalHistoryfilteredData =
            data[2]?.children?.filter(
              item => item.tqm_Question_view !== null,
            ) || [];

          console.log(
            'rentalHistoryfilteredData...',
            rentalHistoryfilteredData,
          );

          const peferencefilteredData =
            data[3]?.children?.filter(
              item => item.tqm_Question_view !== null,
            ) || [];

          console.log('peferencefilteredData...', peferencefilteredData);
          const initialPetsValue =
            Number(peferencefilteredData[2]?.tqm_Question_value) || 0;
          console.log('No of pets....', initialPetsValue);
          setNumberPets(initialPetsValue);

          const DoEarnIncomeBtn = data[1]?.children[5];

          console.log('DoEarnIncomeBtn...', DoEarnIncomeBtn);
          if (
            DoEarnIncomeBtn?.id === 13 &&
            DoEarnIncomeBtn?.tqm_Question_value == 1
          ) {
            setSelectedButton(true); // "Yes" is selected
          }
          rentalHistoryfilteredData.forEach(item => {
            if (item?.id === 20 && item?.tqm_Question_value == 1) {
              setSelectedRentalBondButton(true); // "Yes" is selected
            }
            if (item?.id === 21 && item?.tqm_Question_value == 1) {
              setSelectedPreviousRentalButton(true); // "Yes" is selected
            }
          });

          if (
            peferencefilteredData[1]?.id === 24 &&
            peferencefilteredData[1]?.tqm_Question_value == 1
          ) {
            setSelectedPetsButton(true); // "Yes" is selected
          }
          if (
            peferencefilteredData[0]?.id === 23 &&
            peferencefilteredData[0]?.tqm_Question_value == 0
          ) {
            setSelectedSomokingButton(true); // Non-smoking is selected (Yes)
          } else {
            setSelectedSomokingButton(false); // Smoking is selected (No)
          }
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

  const setButtonState = (questionCode, value) => {
    console.log('value in buttons....', value);
    const isYesSelected = value === 0; // true if Yes is selected, false if No is selected

    switch (questionCode) {
      case 'EARN_INCOME':
        setSelectedButton(isYesSelected);
        break;
      case 'EVER_BROKEN':
        setSelectedRentalBondButton(isYesSelected);
        break;
      case 'EVICTED_PREVIOUS_BOND':
        setSelectedPreviousRentalButton(isYesSelected);
        break;
      case 'ANY_PETS':
        setSelectedPetsButton(isYesSelected);
        break;
      case 'S/NS':
        setSelectedSomokingButton(isYesSelected); // Assuming 0 means Smoking and 1 means Non-smoking
        break;
      default:
        console.warn(`Unhandled Yes/No question code: ${questionCode}`);
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
    const isInvalid = !/^[A-Za-z]+(?:[\s-]?[A-Za-z]*)*$/.test(text);
    setFullName(text);
    if (fullName === '') {
      setFullNameError('Full name is required!');
    } else if (isInvalid) {
      setFullNameError(
        'First name should only contain alphabetic characters, spaces, or hyphens in the correct format!',
      );
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
        'Hold on, this email appears to be invalid. Please enter a valid email address!',
      );
    } else {
      setEmailAddressError('');
    }
  };
  const handleAddOccupant = (fullName, emailAddress, questionId) => {
    if (fullName === '') {
      setFullNameError('Full name is required!');
    } else if (emailAddress === '') {
      setEmailAddressError('Email address is required!');
    } else if (!validateResetEmail(emailAddress)) {
      setEmailAddressError(
        'Hold on, this email appears to be invalid. Please enter a valid email address!',
      );
    } else {
      addOccupant(fullName, emailAddress, questionId);
    }
  };
  // InviteLeaseHolder

  const validLeaseFullName = text => {
    setLeaseFullName(text);
    const isInvalid = !/^[A-Za-z]+(?:[\s-]?[A-Za-z]*)*$/.test(text);
    if (leaseFullName === '') {
      setLeaseFullNameError('Fullname is required!');
    } else if (isInvalid) {
      setLeaseFullNameError(
        'First name should only contain alphabetic characters, spaces, or hyphens in the correct format!',
      );
    } else {
      setLeaseFullNameError('');
    }
  };
  const validLeaseEmailAddress = text => {
    setleaseEmailAddress(text);
    if (leaseEmailAddress === '') {
      setleaseEmailAddressError('The lease email address is required!');
    } else if (!validateResetEmail(leaseEmailAddress)) {
      setleaseEmailAddressError(
        'Hold on, this email appears to be invalid. Please enter a valid email address!',
      );
    } else {
      setleaseEmailAddressError('');
    }
  };
  const validConfirmLeaseEmailAddress = text => {
    setLeaseConfirmEmailAddress(text);
    if (leaseConfirmEmailAddress === '') {
      setLeaseConfirmEmailAddressError('Confirm email address is required!');
    } else if (!validateResetEmail(leaseConfirmEmailAddress)) {
      setLeaseConfirmEmailAddressError(
        'Hold on, this email appears to be invalid. Please enter a valid email address!',
      );
    } else {
      setLeaseConfirmEmailAddressError('');
    }
  };
  const handleValidLeaseHolder = () => {
    if (leaseFullName === '') {
      setLeaseFullNameError('fullname is required!');
    } else if (leaseEmailAddress === '') {
      setleaseEmailAddressError('Email address is required!');
    } else if (!validateResetEmail(leaseEmailAddress)) {
      setleaseEmailAddressError(
        'Hold on, this email appears to be invalid. Please enter a valid email address!',
      );
    } else if (leaseConfirmEmailAddress === '') {
      setLeaseConfirmEmailAddressError('Confirm email address is required!');
    } else if (!validateResetEmail(leaseConfirmEmailAddress)) {
      setLeaseConfirmEmailAddressError(
        'Hold on, this email appears to be invalid. Please enter a valid email address!',
      );
    } else if (leaseEmailAddress !== leaseConfirmEmailAddress) {
      setLeaseConfirmEmailAddressError(
        'Email address and confirm email address do not match!',
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
    const isInvalid = !/^[A-Za-z]+(?:[\s-]?[A-Za-z]*)*$/.test(text);
    if (referenceFullName === '') {
      setReferenceFullNameError('Fullname is required!');
    } else if (isInvalid) {
      setReferenceFullNameError(
        'First name should only contain alphabetic characters, spaces, or hyphens in the correct format!',
      );
    } else {
      setReferenceFullNameError('');
    }
  };
  const validEmployeeReferenceFullName = text => {
    setEmployeeReferenceFullName(text);
    const isInvalid = !/^[A-Za-z]+(?:[\s-]?[A-Za-z]*)*$/.test(text);
    if (employeeReferenceFullName === '') {
      setEmployeeReferenceFullNameError('Fullname is required.');
    } else if (isInvalid) {
      setEmployeeReferenceFullNameError(
        'First name should only contain alphabetic characters, spaces, or hyphens in the correct format!',
      );
    } else {
      setEmployeeReferenceFullNameError('');
    }
  };
  const validReferencesEmailAddress = text => {
    setReferenceEmail(text);
    if (referenceEmail === '') {
      setReferenceEmailError('Email address is required!');
    } else if (!validateResetEmail(referenceEmail)) {
      setReferenceEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      setReferenceEmailError('');
    }
  };
  const validEmployeeReferencesEmailAddress = text => {
    setEmployeeReferenceEmail(text);
    if (employeeReferenceEmail === '') {
      setEmployeeReferenceEmailError('Email address is required!');
    } else if (!validateResetEmail(employeeReferenceEmail)) {
      setEmployeeReferenceEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      setEmployeeReferenceEmailError('');
    }
  };
  const handleReferences = () => {
    if (referenceFullName === '') {
      setReferenceFullNameError('Fullname is required!');
    } else if (referenceEmail === '') {
      setReferenceEmailError('Email address is required!');
    } else if (!validateResetEmail(referenceEmail)) {
      setReferenceEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      addReferences();
    }
  };
  const handleEmployeeReferences = () => {
    if (employeeReferenceFullName === '') {
      setEmployeeReferenceFullNameError('Fullname is required!');
    } else if (employeeReferenceEmail === '') {
      setEmployeeReferenceEmailError('Email address is required!');
    } else if (!validateResetEmail(employeeReferenceEmail)) {
      setEmployeeReferenceEmailError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      addEmployeeReferences();
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
            {item?.fullName ? item?.fullName : item?.leaseFullName}
          </Text>
          <Text style={RentalOfferStyle.occupants_email}>
            {item?.emailAddress ? item?.emailAddress : item?.leaseEmailAddress}
          </Text>
          {/* <Text style={RentalOfferStyle.occupants_email}>
            {item?.confirmEmailAddress
              ? item?.confirmEmailAddress
              : item?.leaseConfirmEmailAddress}
          </Text> */}
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
            {item?.fullName ? item?.fullName : item?.referenceFullName}
          </Text>
          <Text style={RentalOfferStyle.occupants_email}>
            {item?.email ? item?.email : item?.referenceEmail}
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
  const addEmployeeReferencesRender = ({item, index}) => {
    return (
      <View style={RentalOfferStyle.occupants_item_View}>
        <View>
          <Text style={RentalOfferStyle.occupants_name}>
            {item?.fullName ? item?.fullName : item?.employeeReferenceFullName}
          </Text>
          <Text style={RentalOfferStyle.occupants_email}>
            {item?.email ? item?.email : item?.employeeReferenceEmail}
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
                      EmployeeRemoveReferenceItem(index);
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
            <Text style={[RentalOfferStyle.key_feature_Text, {width: 150}]}>
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
                ? occupants.length > 0
                  ? occupants.length
                  : numberOccupants
                : section?.tqm_Question_code === 'NOL'
                ? leaseHolderItem.length > 0
                  ? leaseHolderItem.length
                  : numberLeaseHolder
                : null}
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
          (numberOccupants > 0 || occupants.length > 0) &&
          occupantsRender()}

        {section?.tqm_Question_code === 'NOL' &&
          (numberLeaseHolder > 0 || leaseHolderItem.length > 0) &&
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
        fullName: fullName,
        emailAddress: emailAddress,
        confirmEmailAddress: confirmEmailAddress,
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
      setToggleReference(false);
    }
  };
  const addEmployeeReferences = () => {
    if (employeeReferenceFullName && employeeReferenceEmail) {
      const newReferences = {
        employeeReferenceFullName,
        employeeReferenceEmail, // Corrected key to employeeReferenceEmail
      };

      // Ensure you are spreading the correct state variable
      setEmployeeReferencesItem(prevReferences => [
        ...prevReferences,
        newReferences,
      ]);

      console.log('referencesItem...', [...referencesItem, newReferences]); // Log the updated references

      // Reset input fields
      setEmployeeReferenceFullName('');
      setEmployeeReferenceEmail('');
      setToggleEmployeeReference(false);
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
  const EmployeeRemoveReferenceItem = index => {
    const updatedEmployeeReferences = employeeReferencesItem.filter(
      (_, i) => i !== index,
    );
    setEmployeeReferencesItem(updatedEmployeeReferences);
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
    console.log('tenant_ques payload..', tenantQuesData);
    axios
      .post(tenantQues_url, tenantQuesData)
      .then(response => {
        if (response?.data?.success === true) {
          console.log(
            'API Response Quesinaries....',
            JSON.stringify(response?.data?.data[0]?.parent_json),
          );

          const parentJson = response?.data?.data[0]?.parent_json;
          setAllparentsQuestion(parentJson);
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
        <TouchableOpacity
          style={RentalOfferStyle.propety_details_view}
          onPress={() => {
            toggleItem(item?.children);
          }}>
          <Text style={RentalOfferStyle.propery_det}>
            {item?.tqm_Question_description}
          </Text>
          <TouchableOpacity
            style={RentalOfferStyle.down_Arrow_icon}
            onPress={() => {
              toggleItem(item?.children);
            }}>
            <AntDesign
              name={expandedItem === item?.children ? 'up' : 'down'}
              size={15}
              color={_COLORS.Kodie_GrayColor}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <DividerIcon marginTop={20} />
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
    if (questionCode === 'RENTAL_BUDGET') {
      setBudgetValue(value); // Save budget value to its separate state
      console.log('budgetValue....', value);
    }

    setInputValues(prevValues => ({
      ...prevValues,
      [questionCode]: value,
    }));
  };

  const handleSubmit = () => {
    const isValid = validateFields();

    // Check if validation fails
    if (!isValid) {
      console.log('Validation failed. Errors:', errors); // Log errors for debugging
      return; // Stop the submission process if validation fails
    } else {
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

      // Use a Set to track processed question codes to prevent duplicates
      const processedQuestionCodes = new Set();

      // Process main questions
      quesHeading.forEach(parentQuestion => {
        parentQuestion.children.forEach(childQuestion => {
          const questionValue = inputValues[childQuestion.tqm_Question_code];
          if (
            questionValue !== undefined &&
            questionValue !== null &&
            questionValue !== '' && // Check if value is not empty
            !processedQuestionCodes.has(childQuestion.tqm_Question_code)
          ) {
            jsonData.push({
              question_id: childQuestion.id,
              question_value: questionValue,
              question_reference:
                childQuestion.tqm_Question_type === 'Dropdown' ? 1 : 0,
              question_is_lookup:
                childQuestion.tqm_Question_type === 'Dropdown' ? 1 : 0,
            });
            processedQuestionCodes.add(childQuestion.tqm_Question_code);
          }
        });
      });

      // Add Yes/No button values to jsonData
      const yesNoButtonValues = {
        EARN_INCOME: selectedButton, // EARN_INCOME question code
        EVER_BROKEN: selectedRentalBondButton, // EVER_BROKEN question code
        EVICTED_PREVIOUS_BOND: selectedPreviousRentalButton, // EVICTED_PREVIOUS_BOND question code
        ANY_PETS: selectedPetsButton, // ANY_PETS question code
      };

      Object.keys(yesNoButtonValues).forEach(questionCode => {
        const questionId = questionCodeToId[questionCode];
        const isYesSelected = yesNoButtonValues[questionCode];

        const value =
          isYesSelected === undefined || isYesSelected === null
            ? 0
            : isYesSelected
            ? 1
            : 0;

        if (
          questionId !== undefined &&
          !processedQuestionCodes.has(questionCode)
        ) {
          jsonData.push({
            question_id: questionId,
            question_value: value,
            question_reference: 0,
            question_is_lookup: 0,
          });
          processedQuestionCodes.add(questionCode);
        }
      });

      // Add smoking button value to jsonData
      const smokingQuestionId = questionCodeToId['S/NS'];
      const smokingValue = selectedSomokingButton ? 0 : 1;
      if (
        smokingQuestionId !== undefined &&
        smokingValue !== null &&
        smokingValue !== undefined &&
        !processedQuestionCodes.has('S/NS')
      ) {
        jsonData.push({
          question_id: smokingQuestionId,
          question_value: smokingValue,
          question_reference: 0,
          question_is_lookup: 0,
        });
        processedQuestionCodes.add('S/NS');
      }

      // Add 'Number of pets' value to jsonData
      const numberOfPetsQuestion = petsSubChildren.find(
        subChild => subChild.tqm_Question_code === 'NUMBER_OF_PETS',
      );
      const petsQuestionId = numberOfPetsQuestion?.id;
      if (
        petsQuestionId !== undefined &&
        numberPets !== null &&
        numberPets !== undefined &&
        !processedQuestionCodes.has('NUMBER_OF_PETS')
      ) {
        jsonData.push({
          question_id: petsQuestionId,
          question_value: numberPets,
          question_reference: 0,
          question_is_lookup: 0,
        });
        processedQuestionCodes.add('NUMBER_OF_PETS');
      }

      // Add location data if available
      const locationQuestionId = questionCodeToId['PREVIOUS_ADDRESS'];
      if (locationQuestionId !== undefined && location) {
        const existingLocationIndex = jsonData.findIndex(
          item => item.question_id === locationQuestionId,
        );
        if (existingLocationIndex !== -1) {
          jsonData[existingLocationIndex].question_value = location;
        } else {
          jsonData.push({
            question_id: locationQuestionId,
            question_value: location,
            question_reference: 0,
            question_is_lookup: 0,
          });
        }
        processedQuestionCodes.add('PREVIOUS_ADDRESS');
      }
      // Occupants - Using static question ID 28
      const occupantGroups = groupBy(occupants, 'questionId');
      addGroupedDataToJsonData(
        jsonData,
        occupantGroups,
        'fullName',
        'emailAddress',
        null, // No confirm email for occupants
        28, // Static ID for occupants
      );

      // Leaseholders - Using static question ID 30
      const leaseHolderGroups = groupBy(leaseHolderItem, 'questionId');
      addGroupedDataToJsonData(
        jsonData,
        leaseHolderGroups,
        'fullName', // Map to fullName
        'emailAddress', // Map to emailAddress
        'confirmEmailAddress', // Include confirm email for leaseholders
        30, // Static ID for leaseholders
      );

      // Add references and employee references as arrays (ensure uniqueness)
      const referenceIds = {34: [], 33: []};

      // For references (ID 34)
      referencesItem.forEach(reference => {
        // Push only once, either existing or new data
        referenceIds[34].push({
          fullName: reference.fullName || reference.referenceFullName,
          email: reference.email || reference.referenceEmail,
        });
      });

      // For employee references (ID 33)
      employeeReferencesItem.forEach(employeeReference => {
        // Push only once, either existing or new data
        referenceIds[33].push({
          fullName:
            employeeReference.fullName ||
            employeeReference.employeeReferenceFullName,
          email:
            employeeReference.email || employeeReference.employeeReferenceEmail,
        });
      });

      // Prevent duplicate data for 33 and 34
      Object.keys(referenceIds).forEach(questionId => {
        const idAsNumber = Number(questionId);
        if (
          referenceIds[idAsNumber].length > 0 &&
          !jsonData.find(item => item.question_id === idAsNumber)
        ) {
          jsonData.push({
            question_id: idAsNumber,
            question_value: referenceIds[idAsNumber],
            question_reference: 0,
            question_is_lookup: 0,
          });
        }
      });

      const finalJson = {
        json_data: jsonData,
      };

      console.log('Final JSON:', JSON.stringify(finalJson));
      saveAllJson(finalJson);
      edit_offer === 'edit_offer' ? null : saveBiddingDetails();
    }
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
      p_bid_id: bibId,
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
  const saveBiddingDetails = () => {
    const url = Config.BASE_URL;
    const saveBiddingDetails_url = `${url}save_bidding_details`;
    console.log('Request URL:', saveBiddingDetails_url);
    setIsLoading(true);

    const saveBiddingDetailsData = new FormData();
    saveBiddingDetailsData.append('bid_id', bibId);
    saveBiddingDetailsData.append(
      'account_id',
      loginData?.Login_details?.user_account_id,
    );
    saveBiddingDetailsData.append('property_id', propertyId);
    saveBiddingDetailsData.append('amount', budgetValue ? budgetValue : 0);

    // Check if selectFile is defined and has at least one file
    if (selectFile && selectFile.length > 0) {
      const file = selectFile[0];
      saveBiddingDetailsData.append('screening_report', {
        uri: file.uri,
        name: file.name.replace(/\s/g, ''),
        type: file.type,
      });
    }

    console.log('saveBiddingDetails_Data:', saveBiddingDetailsData);

    axios
      .post(saveBiddingDetails_url, saveBiddingDetailsData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response?.data?.success === true) {
          console.log(
            'API Response saveBiddingDetails Data:',
            JSON.stringify(response?.data),
          );
          setBiddingDetailsMessage(response?.data?.data);
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed saveBiddingDetails', error);
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
    staticQuestionId,
  ) => {
    // Find existing data for the staticQuestionId in jsonData
    const existingData = jsonData.find(
      item => item.question_id === staticQuestionId,
    );

    // Prepare the new group data
    let newGroupData = [];

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

      // Append the new group data to the newGroupData array
      newGroupData = newGroupData.concat(groupData);
    }

    if (existingData) {
      // Merge the new group data with the existing data
      const existingGroupData = JSON.parse(existingData.question_value);
      existingData.question_value = JSON.stringify([
        ...existingGroupData,
        ...newGroupData,
      ]);
    } else {
      // If no existing data, push new data to jsonData
      jsonData.push({
        question_id: staticQuestionId,
        question_value: JSON.stringify(newGroupData),
        question_reference: 0,
        question_is_lookup: 0,
      });
    }
  };

  const renderYesNoButton = (question, isYesSelected, setSelectedState) => (
    <RowButtons
      LeftButtonText={'Yes'}
      leftButtonbackgroundColor={
        isYesSelected ? _COLORS.Kodie_lightGreenColor : _COLORS.Kodie_WhiteColor
      }
      LeftButtonTextColor={
        isYesSelected ? _COLORS.Kodie_BlackColor : _COLORS.Kodie_MediumGrayColor
      }
      LeftButtonborderColor={
        isYesSelected ? _COLORS.Kodie_GrayColor : _COLORS.Kodie_LightWhiteColor
      }
      onPressLeftButton={() => {
        setSelectedState(true); // Set to "Yes"
        handleInputChange(question.tqm_Question_code, 1); // Save value as 1 for "Yes"
      }}
      RightButtonText={'No'}
      RightButtonbackgroundColor={
        !isYesSelected
          ? _COLORS.Kodie_lightGreenColor
          : _COLORS.Kodie_WhiteColor
      }
      RightButtonTextColor={
        !isYesSelected
          ? _COLORS.Kodie_BlackColor
          : _COLORS.Kodie_MediumGrayColor
      }
      RightButtonborderColor={
        !isYesSelected ? _COLORS.Kodie_GrayColor : _COLORS.Kodie_LightWhiteColor
      }
      onPressRightButton={() => {
        setSelectedState(false); // Set to "No"
        handleInputChange(question.tqm_Question_code, 0); // Save value as 0 for "No"
      }}
    />
  );

  // Validation function
  const validateFields = () => {
    let isValid = true;
    const tempErrors = {};

    // Initialize an array to hold validated children
    const validatedChildren = [];

    allparentsQuestion.forEach(question => {
      console.log('question in validation:', question);

      // Check if the question has children and loop through them
      if (question.children && Array.isArray(question.children)) {
        question.children.forEach(child => {
          console.log('child question:', child);

          // Check if the child's validation flag is set to 1
          if (child.tqm_Question_validate === 1) {
            const value = inputValues[child.tqm_Question_code]; // Get the current input value for the child

            // Store validated children for further processing if needed
            validatedChildren.push(child);

            if (!value || value === '') {
              // Updated to use trim
              isValid = false; // Mark as invalid
              tempErrors[child.tqm_Question_code] =
                child.tqm_validate_msg || 'This field is required'; // Set error message
            } else {
              // Clear the error if the input is valid
              delete tempErrors[child.tqm_Question_code];
            }
          }
        });
      }

      // Validate the parent question if it requires validation
      if (question.tqm_Question_validate === 1) {
        const parentValue = inputValues[question.tqm_Question_code]; // Get the current input value for the parent

        if (!parentValue || parentValue === '') {
          // Updated to use trim
          isValid = false; // Mark as invalid
          tempErrors[question.tqm_Question_code] = 'This field is required'; // Set error message
        } else {
          // Clear the error if the input is valid
          delete tempErrors[question.tqm_Question_code];
        }
      }
    });

    // Log the validated children
    console.log('Validated children:', validatedChildren);

    setErrors(tempErrors); // Update error messages state
    return isValid; // Return form validity
  };

  const renderQuestionComponent = (question, index) => {
    switch (question.tqm_Question_type) {
      case 'Input':
        return (
          <View key={index}>
            <TextInput
              style={RentalOfferStyle.input}
              placeholder={`Enter your ${question.tqm_Question_placeholder}`}
              // onChangeText={text => {
              //   handleInputChange(question.tqm_Question_code, text, index);
              // }}
              onChangeText={text => {
                handleInputChange(question.tqm_Question_code, text, index);
                if (errors[question.tqm_Question_code]) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    [question.tqm_Question_code]: undefined, // Clear the error for this specific field
                  }));
                }
              }}
              value={inputValues[question.tqm_Question_code] || ''}
            />
            {errors[question.tqm_Question_code] && (
              <Text style={RentalOfferStyle?.errorText}>
                {errors[question.tqm_Question_code]}
              </Text>
            )}
          </View>
        );
      case 'Number':
        return (
          <View>
            <TextInput
              style={RentalOfferStyle.input}
              placeholder={`Enter your ${question.tqm_Question_placeholder}`}
              // onChangeText={text =>
              //   handleInputChange(question.tqm_Question_code, text, index)
              // }
              onChangeText={text => {
                handleInputChange(question.tqm_Question_code, text, index);

                // Clear the error message when user starts typing
                if (errors[question.tqm_Question_code]) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    [question.tqm_Question_code]: undefined, // Clear the error for this specific field
                  }));
                }
              }}
              value={inputValues[question.tqm_Question_code] || ''}
              keyboardType="number-pad"
            />
            {errors[question.tqm_Question_code] && (
              <Text style={RentalOfferStyle?.errorText}>
                {errors[question.tqm_Question_code]}
              </Text>
            )}
          </View>
        );
      // case 'Date':
      //   return (
      //     <>
      //       <View style={RentalOfferStyle.datePickerView}>
      //         <CalendarModal
      //           SelectDate={
      //             inputValues[question.tqm_Question_code] || 'Start Date'
      //           }
      //           _textInputStyle={{
      //             color: inputValues[question.tqm_Question_code]
      //               ? _COLORS.Kodie_BlackColor
      //               : _COLORS.Kodie_GrayColor,
      //           }}
      //           calenderIcon={toggleModal}
      //           onDayPress={day => {
      //             handleInputChange(
      //               question.tqm_Question_code,
      //               day.dateString,
      //               index,
      //             );

      //             // Clear the error message when a date is selected
      //             if (errors[question.tqm_Question_code]) {
      //               setErrors(prevErrors => ({
      //                 ...prevErrors,
      //                 [question.tqm_Question_code]: undefined, // Clear the error for this specific field
      //               }));
      //             }
      //           }}
      //           Visible={isModalVisible}
      //           onRequestClose={toggleModal}
      //           markedDates={{
      //             [inputValues[question.tqm_Question_code]]: {
      //               selected: true,
      //               selectedColor: _COLORS.Kodie_lightGreenColor,
      //               selectedTextColor: _COLORS.Kodie_BlackColor,
      //             },
      //           }}
      //           _closeButton={toggleModal}
      //           _ApplyButton={toggleModal}
      //         />
      //       </View>
      //       {errors[question.tqm_Question_code] && (
      //         <Text style={RentalOfferStyle?.errorText}>
      //           {errors[question.tqm_Question_code]}
      //         </Text>
      //       )}
      //     </>
      //   );
      case 'Date':
        return (
          <>
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
                onDayPress={day => {
                  handleInputChange(
                    question.tqm_Question_code,
                    day.dateString,
                    index,
                  );

                  // Clear the error message when a date is selected
                  if (errors[question.tqm_Question_code]) {
                    setErrors(prevErrors => ({
                      ...prevErrors,
                      [question.tqm_Question_code]: undefined, // Clear the error for this specific field
                    }));
                  }
                }}
                Visible={isModalVisible}
                onRequestClose={toggleModal}
                markedDates={{
                  [inputValues[question.tqm_Question_code]]: {
                    selected: true,
                    selectedColor: _COLORS.Kodie_lightGreenColor,
                    selectedTextColor: _COLORS.Kodie_BlackColor,
                  },
                }}
                // Disable past dates when question.id === 2
                minDate={
                  question.id === 2
                    ? new Date().toISOString().split('T')[0]
                    : undefined
                }
                _closeButton={toggleModal}
                _ApplyButton={toggleModal}
              />
            </View>
            {errors[question.tqm_Question_code] && (
              <Text style={RentalOfferStyle?.errorText}>
                {errors[question.tqm_Question_code]}
              </Text>
            )}
          </>
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
              // placeholder="Select an option"
              placeholder={question?.tqm_Question_placeholder}
              searchPlaceholder="Search..."
              value={inputValues[question.tqm_Question_code] || ''}
              onFocus={() => handleDropdown(question.tqm_Question_code, index)}
              // onChange={item => {
              //   console.log(
              //     `Dropdown change for ${question.tqm_Question_code}: ${item.lookup_key}`,
              //   );
              //   handleInputChange(question.tqm_Question_code, item.lookup_key);
              // }}
              onChange={item => {
                console.log(
                  `Dropdown change for ${question.tqm_Question_code}: ${item.lookup_key}`,
                );
                handleInputChange(question.tqm_Question_code, item.lookup_key);

                // Clear the error message when a valid selection is made
                if (errors[question.tqm_Question_code]) {
                  setErrors(prevErrors => ({
                    ...prevErrors,
                    [question.tqm_Question_code]: undefined, // Clear the error for this specific field
                  }));
                }
              }}
            />
            {errors[question.tqm_Question_code] && (
              <Text style={RentalOfferStyle?.errorText}>
                {errors[question.tqm_Question_code]}
              </Text>
            )}
          </View>
        );
      case 'Form':
        if (question.id == 33) {
          return (
            <View style={RentalOfferStyle.AddOccupantMainView}>
              <TouchableOpacity
                style={RentalOfferStyle.AddOccupantView}
                onPress={() =>
                  setToggleEmployeeReference(!toggleEmployeeReference)
                }>
                <Entypo
                  name={
                    toggleEmployeeReference
                      ? 'chevron-small-up'
                      : 'chevron-small-down'
                  }
                  color={_COLORS.Kodie_BlackColor}
                  size={25}
                />
                <Text style={RentalOfferStyle.AddOccupantText}>
                  {question.tqm_Question_description}
                </Text>
              </TouchableOpacity>

              <FlatList
                data={employeeReferencesItem}
                keyExtractor={(item, index) => index.toString()}
                renderItem={addEmployeeReferencesRender}
              />

              {toggleEmployeeReference && (
                <View style={RentalOfferStyle.inputView}>
                  <View style={{marginTop: 11}}>
                    <Text style={LABEL_STYLES.commontext}>{'Full name'}</Text>
                    <TextInput
                      style={RentalOfferStyle.input}
                      placeholder={'Enter full name'}
                      onChangeText={setEmployeeReferenceFullName}
                      value={employeeReferenceFullName}
                      onBlur={() =>
                        validEmployeeReferenceFullName(
                          employeeReferenceFullName,
                        )
                      }
                    />
                  </View>
                  {employeereferenceFullNameError && (
                    <Text style={RentalOfferStyle.error_text}>
                      {employeereferenceFullNameError}
                    </Text>
                  )}

                  <View style={RentalOfferStyle.inputView}>
                    <Text style={LABEL_STYLES.commontext}>
                      {'Email address'}
                    </Text>
                    <TextInput
                      style={RentalOfferStyle.input}
                      placeholder={'Enter email address'}
                      onChangeText={setEmployeeReferenceEmail}
                      value={employeeReferenceEmail}
                      onBlur={() =>
                        validEmployeeReferencesEmailAddress(
                          employeeReferenceEmail,
                        )
                      }
                      keyboardType="email-address"
                    />
                  </View>
                  {employeeReferenceEmailError && (
                    <Text style={RentalOfferStyle.error_text}>
                      {employeeReferenceEmailError}
                    </Text>
                  )}

                  <CustomSingleButton
                    _ButtonText={'Add reference'}
                    Text_Color={_COLORS.Kodie_WhiteColor}
                    disabled={isLoading}
                    onPress={handleEmployeeReferences}
                  />
                </View>
              )}
            </View>
          );
        } else {
          return (
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
                  {question.tqm_Question_description}
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
          );
        }
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
          <View key={index}>
            <View style={RentalOfferStyle.mainfeaturesview}>
              <View style={RentalOfferStyle.key_feature_Text_view}>
                <Text style={RentalOfferStyle.key_feature_Text}>
                  {'Number of years employed'}
                </Text>
              </View>
              <View style={RentalOfferStyle.plus_minusview}>
                <TouchableOpacity
                  style={RentalOfferStyle.menusIconView}
                  onPress={() => {
                    decreaseNumberYearEmp(question.tqm_Question_code);
                    handleInputChange(
                      question.tqm_Question_code,
                      numberYearEmp - 1,
                    );
                  }}>
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
                    increaseNumberYearEmp(question.tqm_Question_code);
                    handleInputChange(
                      question.tqm_Question_code,
                      numberYearEmp + 1,
                    );
                  }}>
                  <AntDesign
                    name="plus"
                    size={20}
                    color={_COLORS.Kodie_BlackColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      case 'Pets_Count':
        return (
          <View>
            <View style={RentalOfferStyle.mainfeaturesview} key={index}>
              <View style={RentalOfferStyle.key_feature_Text_view}>
                <Text style={RentalOfferStyle.key_feature_Text}>
                  {petsSubChildren[0]?.tqm_Question_description}
                </Text>
              </View>
              <View style={RentalOfferStyle.plus_minusview}>
                <TouchableOpacity
                  style={RentalOfferStyle.menusIconView}
                  onPress={() => {
                    decreaseNumberPets(question?.tqm_Question_code);
                  }}>
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
                    increaseNumberPets(question?.tqm_Question_code);
                  }}>
                  <AntDesign
                    name="plus"
                    size={20}
                    color={_COLORS.Kodie_BlackColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      case 'Yes_no':
        switch (question.id) {
          case 13:
            return renderYesNoButton(
              question,
              selectedButton,
              setSelectedButton,
            );
          case 20:
            return renderYesNoButton(
              question,
              selectedRentalBondButton,
              setSelectedRentalBondButton,
            );
          case 21:
            return renderYesNoButton(
              question,
              selectedPreviousRentalButton,
              setSelectedPreviousRentalButton,
            );
          case 24:
            return renderYesNoButton(
              question,
              selectedPetsButton,
              setSelectedPetsButton,
            );
          default:
            return null;
        }
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
                handleInputChange(question.tqm_Question_code, 1);
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
                handleInputChange(question.tqm_Question_code, 0);
              }}
            />
            {/* {errors[question.tqm_Question_code] && (
              <Text style={RentalOfferStyle?.errorText}>
                {errors[question.tqm_Question_code]}
              </Text>
            )} */}
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
                  onChangeText={() => handleLocationChange(location)}
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
            {/* {errors[question.tqm_Question_code] && (
              <Text style={RentalOfferStyle?.errorText}>
                {errors[question.tqm_Question_code]}
              </Text>
            )} */}
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
          <Text style={[LABEL_STYLES.commontext]}>
            {item?.tqm_Question_description}
          </Text>
          <View style={{marginBottom: 20}}>
            {renderQuestionComponent(item, index)}
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={RentalOfferStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={edit_offer ? 'Edit offer' : 'Submit application'}
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
            iscancel={() => setIsMap(false)}
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
              {profile_image ? (
                <Image
                  source={{uri: profile_image}}
                  resizeMode={'cover'}
                  style={RentalOfferStyle.userImg}
                />
              ) : (
                <EvilIcons
                  color={_COLORS.Kodie_GrayColor}
                  name={'user'}
                  size={70}
                />
              )}
              <View style={RentalOfferStyle.userNameView}>
                <Text style={RentalOfferStyle.username}>
                  {loginAccountDetails?.UAD_FIRST_NAME}
                </Text>
                <Text style={RentalOfferStyle.username}>
                  {loginAccountDetails?.UAD_LAST_NAME}
                </Text>
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
                <Text style={[RentalOfferStyle.username]}>{'0.0 (0)'}</Text>
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
            <Text style={RentalOfferStyle.propertyHeading}>
              {propertyDetails?.property_type}
            </Text>
            <Text
              style={[
                RentalOfferStyle.propertyHeading,
                {fontFamily: FONTFAMILY.K_Bold},
              ]}>
              {propertyDetails?.city}
            </Text>
            <View style={RentalOfferStyle.locationView}>
              <Entypo
                color={_COLORS.Kodie_GreenColor}
                name="location-pin"
                size={20}
              />
              <Text
                style={RentalOfferStyle.location}
                numberOfLines={1}
                ellipsizeMode="tail">
                {propertyDetails?.location}
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
          {/* We can use this in the future */}
          {/* <View style={{marginHorizontal: 16}}>
            <Text style={RentalOfferStyle.inspections}>
              {'Tenant  screening report '}
              <Text style={[RentalOfferStyle.inspections, {fontSize: 14}]}>
                {'(recommended)'}
              </Text>
            </Text>
            {selectFile.length > 0 && (
              <View style={RentalOfferStyle.Doc_container}>
                <View style={RentalOfferStyle.pdfInfo}>
                  <FontAwesome
                    name="file-pdf-o"
                    size={35}
                    color={_COLORS.Kodie_BlackColor}
                    resizeMode={'contain'}
                  />
                  <View style={RentalOfferStyle.textContainer}>
                    <Text style={RentalOfferStyle.pdfName}>
                      {selectFile[0]?.name}
                    </Text>
                    <Text style={RentalOfferStyle.pdfSize}>{fileSizeInMB}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={RentalOfferStyle.crossIcon}
                  onPress={() => {
                    setSelectFile([]);
                  }}>
                  <Entypo
                    name="circle-with-cross"
                    size={20}
                    color={_COLORS.Kodie_GrayColor}
                  />
                </TouchableOpacity>
              </View>
            )}
            <CustomSingleButton
              _ButtonText={'Start Now'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              disabled={isLoading ? true : false}
              onPress={() => {
                refRBSheet.current.open();
              }}
            />
          </View> */}

          {/* <DividerIcon marginTop={5} /> */}
          <View style={RentalOfferStyle.submitApplicationbtn}>
            <RowButtons
              leftButtonHeight={50}
              RightButtonHeight={50}
              LeftButtonText="Cancel"
              onPressLeftButton={() => {
                setSubmitApplicationBtn(false);
                setSubmitApplicationBtnId(0);
                props.navigation.pop();
              }}
              leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
              LeftButtonborderColor={_COLORS.Kodie_BlackColor}
              RightButtonText={
                edit_offer == 'edit_offer' ? 'Edit offer' : 'Submit'
              }
              RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
              RightButtonTextColor={_COLORS.Kodie_WhiteColor}
              onPressRightButton={() => {
                setSubmitApplicationBtn(true);
                setSubmitApplicationBtnId(1);
                // alert(selectPetFriendlyBtnId)
                handleSubmit();
              }}
            />
          </View>

          {!selectFile.length > 0 && (
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
          )}
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
            height={430}
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
            <ApplicationSubmitModal
              onClose={onClose1}
              biddingDetailsMessage={biddingDetailsMessage}
            />
          </RBSheet>
        </ScrollView>
      )}
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default RentalOffer;
