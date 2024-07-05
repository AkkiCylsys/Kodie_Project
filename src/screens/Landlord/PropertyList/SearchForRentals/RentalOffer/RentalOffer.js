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

const DocumentData = [
  {
    id: 1,
    fileName: 'Tenant  screening report.pdf',
  },
];
const RentalOffer = props => {
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
  const [expandedItems, setExpandedItems] = useState({});
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
  const [toggleleaseHolder, setToggleLeaseHolder] = useState(false);
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
  }, [question]);

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
  const handleAddOccupant = () => {
    if (fullName === '') {
      setFullNameError('Full name is required.');
    } else if (emailAddress === '') {
      setEmailAddressError('Email address is required.');
    } else if (!validateResetEmail(emailAddress)) {
      setEmailAddressError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else {
      addOccupant();
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
      setLeaseFullNameError('Lease fullName is required.');
    } else if (leaseEmailAddress === '') {
      setleaseEmailAddressError('Lease Email Address is required.');
    } else if (!validateResetEmail(leaseEmailAddress)) {
      setleaseEmailAddressError(
        'Hold on, this email appears to be invalid. Please enter a valid email address.',
      );
    } else if (leaseConfirmEmailAddress === '') {
      setLeaseConfirmEmailAddressError(
        'Lease Confirm Email Address is required.',
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
      addLeaseHolder();
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

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleRentalDetails = () => {
    setRentalDetails(!RentalDetails);
  };
  const toggleItem = itemId => {
    setExpandedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId], // Toggle the expanded state for the clicked item
    }));
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

  const addOccupant = () => {
    if (fullName && emailAddress) {
      const newOccupant = {fullName, emailAddress};
      setOccupants([...occupants, newOccupant]);
      console.log('occupants...', occupants);
      // handleInputChange('occupants', occupants);
      setFullName('');
      setEmailAddress('');
      setToggleOccupants(false);
    }
  };
  const addLeaseHolder = () => {
    if (leaseFullName && leaseEmailAddress && leaseConfirmEmailAddress) {
      const newLeaseHolder = {
        leaseFullName,
        leaseEmailAddress,
        leaseConfirmEmailAddress,
      };
      setLeaseHolderItem([...leaseHolderItem, newLeaseHolder]);
      console.log('leaseHolderItem...', leaseHolderItem);
      // handleInputChange('leaseHolderItem', leaseHolderItem);
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
      p_question_code: 'All',
      p_type: 'OPTION',
    };
    axios
      .post(tenantQues_url, tenantQuesData)
      .then(response => {
        console.log('API Response tenantQues..', response?.data);
        if (response?.data?.success === true) {
          setQuesHeading(response?.data?.data);
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

  const handleQuesCode = questionCode => {
    const url = Config.BASE_URL;
    const tenantQues_url = url + 'question_details_for_tenant_ques';
    console.log('Request URL:', tenantQues_url);
    setIsLoading(true);
    const tenantQuesData = {
      p_question_code: questionCode,
      p_type: 'OPTION',
    };

    axios
      .post(tenantQues_url, tenantQuesData)
      .then(response => {
        console.log('API Response QuesCode..', response?.data);
        if (response?.data?.success === true) {
          const data = response?.data?.data;
          setAllQuestion(data);

          if (questionCode === 'RENTAL_DETIALS') {
            setRentailDetails(data);
            console.log('rentailDetails.....', data);
            data.forEach(item => {
              if (item?.tqm_Question_code === 'PEOPLE_STAY_IN_PROPERTY') {
                console.log('tqm_Question_code deependra', item);
                setPeopleStayInPropertyCode(item?.tqm_Question_code);
                handleQuesCode(item?.tqm_Question_code);
              }
            });
          } else if (questionCode === 'PEOPLE_STAY_IN_PROPERTY') {
            setPeopleStayInPropertyData(data);
            console.log('data in property stay ', data);
            if (data[1]?.tqm_Question_code) {
              try {
                const parsedCode = JSON.parse(data[1].tqm_Question_code);
                setOccupantsNames(parsedCode);
                console.log('parsedCode...', parsedCode);
              } catch (error) {
                console.error('Error parsing tqm_Question_code:', error);
              }
            }
            if (data[3]?.tqm_Question_code) {
              try {
                const parsedLeaseCode = JSON.parse(data[3].tqm_Question_code);
                setLeaseHolderNames(parsedLeaseCode);
                console.log('parsedCode...', parsedLeaseCode);
              } catch (error) {
                console.error('Error parsing tqm_Question_code:', error);
              }
            }
          } else if (questionCode === 'EMPLOYEMENT&INCOME') {
            setEmployeeQues(data);
            console.log('employeeQues....', data);
          } else if (questionCode === 'RENTAL_HISTORY') {
            setRental_History(data);
          } else if (questionCode === 'PREFERENCES') {
            setPreference(data);
          }
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('API failed QuesCode', error);
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
      <View
        style={{
          marginTop: 5,
        }}>
        <View style={RentalOfferStyle.propety_details_view}>
          <Text style={RentalOfferStyle.propery_det}>
            {item?.tqm_Question_description}
          </Text>
          <TouchableOpacity
            style={RentalOfferStyle.down_Arrow_icon}
            onPress={() => {
              setQuestionCode(item?.tqm_Question_code);
              handleQuesCode(item?.tqm_Question_code);
              toggleItem(item?.tqm_Question_code);
            }}>
            <AntDesign
              name={expandedItems[item?.tqm_Question_code] ? 'up' : 'down'}
              size={15}
              color={_COLORS.Kodie_GrayColor}
            />
          </TouchableOpacity>
        </View>
        <DividerIcon />
        {expandedItems[item?.tqm_Question_code] && (
          <FlatList
            data={
              item?.tqm_Question_code === 'RENTAL_DETIALS'
                ? rentailDetails
                : item?.tqm_Question_code === 'EMPLOYEMENT&INCOME'
                ? employeeQues
                : item?.tqm_Question_code === 'RENTAL_HISTORY'
                ? rental_History
                : item?.tqm_Question_code === 'PREFERENCES'
                ? preference
                : question
            }
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
    const allQuestions = [
      ...question,
      ...employeeQues,
      ...rentailDetails,
      ...rental_History,
      ...preference,
    ];

    const allData = {};
    allQuestions.forEach(q => {
      const value = inputValues[q?.tqm_Question_code];
      allData[q?.id] = value !== undefined ? value : null;
    });

    allData[4] = numberOccupants;
    // allData[28] = inputValues['occupants']; // Store occupants data
    allData[28] = occupants;
    allData[29] = numberLeaseHolder;
    // allData[30] = inputValues['leaseHolderItem'];
    allData[30] = leaseHolderItem;
    allData[10] = numberYearEmp;
    allData[25] = numberPets;
    allData[13] = selectedButton;
    allData[23] = selectedSomokingButton;
    allData[18] = location;
    allData[41] = referencesItem;
    allData[28] = fullName;
    allData[27] = emailAddress;
    allData[31] = leaseFullName;
    allData[30] = leaseEmailAddress;
    allData[29] = leaseConfirmEmailAddress;
    allData[40] = referenceFullName;
    allData[39] = referenceEmail;
    allData[24] = selectedPetsButton;
    allData[21] = selectedPreviousRentalButton;
    allData[20] = selectedRentalBondButton;

    const jsonData = {
      allData: allData,
    };

    console.log('JSON Data:', jsonData);
    return jsonData;
  };

  const renderQuestionComponent = (question, index) => {
    // console.log("Question inside the details...",question)
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
            <View style={RentalOfferStyle.mainfeaturesview} key={index}>
              <View style={RentalOfferStyle.key_feature_Text_view}>
                <Text style={RentalOfferStyle.key_feature_Text}>
                  {/* {'Number of occupants'} */}
                  {peopleStayInPropertyData[0]?.tqm_Question_description}
                </Text>
              </View>
              <TouchableOpacity style={RentalOfferStyle.plus_minusview}>
                <TouchableOpacity
                  style={RentalOfferStyle.menusIconView}
                  onPress={decreaseNumberOccupants}>
                  <AntDesign
                    name="minus"
                    size={20}
                    color={_COLORS.Kodie_BlackColor}
                  />
                </TouchableOpacity>
                <Text style={RentalOfferStyle.countdata}>
                  {numberOccupants}
                </Text>
                <TouchableOpacity
                  style={RentalOfferStyle.menusIconView}
                  onPress={() => {
                    increaseNumberOccupants();
                  }}>
                  <AntDesign
                    name="plus"
                    size={20}
                    color={_COLORS.Kodie_BlackColor}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            {numberOccupants > 0 && (
              <View style={RentalOfferStyle.AddOccupantMainView}>
                <TouchableOpacity
                  style={RentalOfferStyle.AddOccupantView}
                  onPress={() => {
                    setToggleOccupants(!toggleOccupants);
                  }}>
                  <Entypo
                    name={
                      toggleOccupants
                        ? 'chevron-small-up'
                        : 'chevron-small-down'
                    }
                    color={_COLORS.Kodie_BlackColor}
                    size={25}
                  />
                  <Text style={RentalOfferStyle.AddOccupantText}>
                    {/* {'Add occupants'} */}
                    {peopleStayInPropertyData[1]?.tqm_Question_description}
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
                      <Text style={LABEL_STYLES.commontext}>
                        {occupantsNames[0]?.Fullname}
                      </Text>
                      <TextInput
                        style={RentalOfferStyle.input}
                        placeholder={'Enter full name'}
                        onChangeText={setFullName}
                        onBlur={() => handleValidFullName(fullName)}
                        value={fullName}
                      />
                    </View>
                    {fullNameError ? (
                      <Text style={RentalOfferStyle.error_text}>
                        {fullNameError}
                      </Text>
                    ) : null}
                    <View style={RentalOfferStyle.inputView}>
                      <Text style={LABEL_STYLES.commontext}>
                        {occupantsNames[1]?.Email_address}
                      </Text>
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
                      onPress={handleAddOccupant}
                    />
                  </View>
                )}
              </View>
            )}
            {/* LeaseHolder... */}
            <View style={RentalOfferStyle.mainfeaturesview} key={index}>
              <View style={RentalOfferStyle.key_feature_Text_view}>
                <Text style={RentalOfferStyle.key_feature_Text}>
                  {/* {"Number of leaseholders"} */}
                  {peopleStayInPropertyData[2]?.tqm_Question_description}
                </Text>
              </View>
              <TouchableOpacity style={RentalOfferStyle.plus_minusview}>
                <TouchableOpacity
                  style={RentalOfferStyle.menusIconView}
                  onPress={decreaseLeaseHolder}>
                  <AntDesign
                    name="minus"
                    size={20}
                    color={_COLORS.Kodie_BlackColor}
                  />
                </TouchableOpacity>
                <Text style={RentalOfferStyle.countdata}>
                  {numberLeaseHolder}
                </Text>
                <TouchableOpacity
                  style={RentalOfferStyle.menusIconView}
                  onPress={() => {
                    increaseLeaseHolder();
                  }}>
                  <AntDesign
                    name="plus"
                    size={20}
                    color={_COLORS.Kodie_BlackColor}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            {numberLeaseHolder > 0 && (
              <View style={RentalOfferStyle.AddOccupantMainView}>
                <TouchableOpacity
                  style={RentalOfferStyle.AddOccupantView}
                  onPress={() => {
                    setToggleLeaseHolder(!toggleleaseHolder);
                  }}>
                  <Entypo
                    name={
                      toggleleaseHolder
                        ? 'chevron-small-up'
                        : 'chevron-small-down'
                    }
                    color={_COLORS.Kodie_BlackColor}
                    size={25}
                  />
                  <Text style={RentalOfferStyle.AddOccupantText}>
                    {/* {'Add leaseholders'} */}
                    {peopleStayInPropertyData[3]?.tqm_Question_description}
                  </Text>
                </TouchableOpacity>
                <View style={{marginTop: 10}}>
                  {toggleleaseHolder && (
                    <Text style={RentalOfferStyle.AddLeasesubText}>
                      {
                        'Each tenant who is party to the lease agreement is considered a leaseholder. Each leaseholder will receive an email link to submit a completed application. '
                      }
                    </Text>
                  )}
                  <FlatList
                    data={leaseHolderItem}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={leaseHolderRender}
                  />
                  {toggleleaseHolder && (
                    <View>
                      <View style={RentalOfferStyle.inputView}>
                        <Text style={LABEL_STYLES.commontext}>
                          {leaseHolderNames[0]?.Full_name}
                        </Text>
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
                        <Text style={LABEL_STYLES.commontext}>
                          {leaseHolderNames[1]?.Email_address}
                        </Text>
                        <TextInput
                          style={RentalOfferStyle.input}
                          placeholder={'Enter email address'}
                          onChangeText={setleaseEmailAddress}
                          value={leaseEmailAddress}
                          onBlur={() =>
                            validLeaseEmailAddress(leaseEmailAddress)
                          }
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
                          {leaseHolderNames[2]?.Confirm_email_address}
                        </Text>
                        <TextInput
                          style={RentalOfferStyle.input}
                          placeholder={'Confirm email address'}
                          onChangeText={setLeaseConfirmEmailAddress}
                          value={leaseConfirmEmailAddress}
                          onBlur={() =>
                            validConfirmLeaseEmailAddress(
                              leaseConfirmEmailAddress,
                            )
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
                        disabled={isLoading ? true : false}
                        onPress={() => {
                          handleValidLeaseHolder();
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>
            )}
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
                handleSubmit();
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
                refRBSheet1.current.open();
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
