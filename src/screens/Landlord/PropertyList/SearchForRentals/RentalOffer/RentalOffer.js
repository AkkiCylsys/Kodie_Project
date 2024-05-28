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
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {_COLORS, FONTFAMILY, IMAGES, LABEL_STYLES} from '../../../../../Themes';
import TopHeader from '../../../../../components/Molecules/Header/Header';
import {RentalOfferStyle} from './RentalOfferStyle';
import {_goBack} from '../../../../../services/CommonServices';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import CalendarModal from '../../../../../components/Molecules/CalenderModal/CalenderModal';
import {Dropdown} from 'react-native-element-dropdown';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import RowButtons from '../../../../../components/Molecules/RowButtons/RowButtons';
import {MultiSelect} from 'react-native-element-dropdown';
import {Config} from '../../../../../Config';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';
import TenantScreeningReportModal from '../../../../../components/Molecules/TenantScreeningReportModal/TenantScreeningReportModal';
import ApplicationSubmitModal from '../../../../../components/Molecules/TenantScreeningReportModal/ApplicationSubmitModal';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {SignupLookupDetails} from '../../../../../APIs/AllApi';

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
  const [RentalDetails, setRentalDetails] = useState(false);
  const [RentalHistory, setRentalHistory] = useState(false);
  const [TenantRooms, setTenantRooms] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [RentalLeasevalue, setRentalLeaseValue] = useState(0);
  const [RentalLeaseData, setRentalLeaseData] = useState([]);
  const [EmployeeValue, setEmployeeValue] = useState(0);
  const [EmployeeValueData, setEmployeeValueData] = useState(null);
  const [valueStying, setValueStying] = useState(0);
  const [valueStyingData, setValueStyingData] = useState([]);
  const [rentalBudget, setRentalBudget] = useState('');
  const [longEmployee, setLongEmployee] = useState('');
  const [lookingmove, setLookingmove] = useState('');
  const [weeklyIncome, setWeeklyIncome] = useState(0);
  const [selected_Paying_Button, setSelected_Paying_Button] = useState(false);
  const [selected_Paying_Id, setSelected_Paying_Id] = useState(1);
  const [selected_Rental_Agreement, setSelected_Rental_Agreement] =
    useState(false);
  const [selected_Agreement_Id, setSelected_Agreement_Id] = useState(1);
  const [selected_Previous_Rental, setSelected_Previous_Rental] =
    useState(false);
  const [selected_Previous_Id, setSelected_Previous_Id] = useState(1);
  const [selected_Smoking, setSelected_Smoking] = useState(false);
  const [selected_Smoking_Id, setSelected_Smoking_Id] = useState(1);
  const [selected_Pets, setSelected_Pets] = useState(false);
  const [selected_Pets_Id, setSelected_Pets_Id] = useState(1);
  const [pets, setPets] = useState([]);
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
  const [earnIncome, setEarnIncome] = useState([]);
  const [rentailDetails, setRentailDetails] = useState([]);
  const [peopalStay, setPeopalStay] = useState([]);
  const [rental_History, setRental_History] = useState([]);
  const [preference, setPreference] = useState([]);
  const [personalDetails, setPersonalDetails] = useState({});
  const [employmentStatus, setEmploymentStatus] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [income, setIncome] = useState('');
  const [dropdownData, setDropdownData] = useState({});
  const [allQuestion, setAllQuestion] = useState([]);
  useEffect(() => {
    handleLeaseTerm();
    handleStyingProperty();
    handleDescribeStatus();
    handleTypesPets();
    handleTenantQues();
  }, []);

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

  // Api intrigation....
  const handleLeaseTerm = () => {
    const TenantData = {
      P_PARENT_CODE: 'RLT',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const propertyType = url + 'lookup_details';
    console.log('Request URL:', propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, TenantData)
      .then(response => {
        console.log('Renal Lease response', response.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          console.log('Renal Lease....', response?.data?.lookup_details);
          setRentalLeaseData(response?.data?.lookup_details);
        } else {
          console.error('Renal_Lease_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Renal_Lease error:', error);
        setIsLoading(false);
      });
  };
  const handleStyingProperty = () => {
    const StyingPropertData = {
      P_PARENT_CODE: 'PST',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const StyingPropertType = url + 'lookup_details';
    console.log('Request URL:', StyingPropertType);
    setIsLoading(true);
    axios
      .post(StyingPropertType, StyingPropertData)
      .then(response => {
        console.log('Stying_Propert_type', response.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          console.log('Renal Lease....', response?.data?.lookup_details);
          setValueStyingData(response?.data?.lookup_details);
        } else {
          console.error('Stying_Propert_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Stying_Propert error:', error);
        setIsLoading(false);
      });
  };
  const handleDescribeStatus = () => {
    const DescribeStatustData = {
      P_PARENT_CODE: 'ES',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const DescribeStatustType = url + 'lookup_details';
    console.log('Request URL:', DescribeStatustType);
    setIsLoading(true);
    axios
      .post(DescribeStatustType, DescribeStatustData)
      .then(response => {
        console.log('Describe_Status_type', response.data);
        if (response?.data?.status === true) {
          console.log('Describe_Status....', response?.data?.lookup_details);
          setEmployeeValueData(response?.data?.lookup_details);
          setIsLoading(false);
        } else {
          console.error('Describe_Status_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Describe_Status error:', error);
        setIsLoading(false);
      });
  };
  const handleTypesPets = () => {
    const PetsTypeData = {
      P_PARENT_CODE: 'TP',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const PetsDataType = url + 'lookup_details';
    console.log('Request URL:', PetsDataType);
    setIsLoading(true);
    axios
      .post(PetsDataType, PetsTypeData)
      .then(response => {
        console.log('Pets_type', response.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          console.log('Pets_type_....', response?.data?.lookup_details);
          setPetsData(response?.data?.lookup_details);
          console.log('pets daa...', response?.data?.lookup_details);
        } else {
          console.error('Pets_type_Status_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Pets_type_Status error:', error);
        setIsLoading(false);
      });
  };

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
          if (questionCode === 'PERSONAL_DETAILS') {
            setQuestion(data);
          } else if (questionCode === 'Employment_Status') {
            setEmployeeQues(data);
          } else if (questionCode === 'EARN_INCOME') {
            setEarnIncome(data);
          } else if (questionCode === 'RENTAL_DETAILS') {
            setRentailDetails(data);
          } else if (questionCode === 'PEOPLE_STAY') {
            setPeopalStay(data);
          } else if (questionCode === 'RENTAL_HISTORY') {
            setRental_History(data);
          } else if (questionCode === 'PREFERENCES') {
            setPreference(data);
          }
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed QuesCode', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handle_Income = async () => {
    setIsLoading(true);
    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'JOB_TYPE',
      P_TYPE: 'OPTION',
    });

    console.log('IndiServicesOffer', res);
    if (res.status === true) {
      setIncome(res?.lookup_details);
    }
    setIsLoading(false);
  };

  // const handleDropdown = async questionCode => {
  //   setIsLoading(true);
  //   const res = await SignupLookupDetails({
  //     P_PARENT_CODE: questionCode, // Use the dynamic question code here
  //     P_TYPE: 'OPTION',
  //   });

  //   console.log('Dropdown data...', res);
  //   if (res.status === true) {
  //     // Update the dropdown data state with the fetched data
  //     setDropdownData(prevData => ({
  //       ...prevData,
  //       [questionCode]: res?.lookup_details,
  //     }));
  //   } else {
  //     alert("false")
  //     setIsLoading(false);
  //   }
  // };
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

  // renderItem......
  const renderDataItem = item => {
    return (
      <View style={RentalOfferStyle.item}>
        <Text style={RentalOfferStyle.selectedTextStyle}>
          {item.lookup_description}
        </Text>
        {/* <AntDesign
            style={PropertyFeatureStyle.icon}
            color={_COLORS.Kodie_BlackColor}
            name="check"
            size={20}
          /> */}
      </View>
    );
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
              item?.tqm_Question_code === 'PERSONAL_DETAILS'
                ? question
                : item?.tqm_Question_code === 'Employment_Status'
                ? employeeQues
                : item?.tqm_Question_code === 'EARN_INCOME'
                ? earnIncome
                : item?.tqm_Question_code === 'PEOPLE_STAY'
                ? peopalStay
                : item?.tqm_Question_code === 'RENTAL_DETAILS'
                ? rentailDetails
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

    switch (questionCode) {
      case 'PERSONAL_DETAILS':
        setPersonalDetails(prevState => ({
          ...prevState,
          [questionCode]: value,
        }));
        break;
      case 'Employment_Status':
        setEmploymentStatus(prevState => ({
          ...prevState,
          [questionCode]: value,
        }));
        break;
      default:
        break;
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const formData = {
      ...inputValues,
      personalDetails,
      employmentStatus,
    };

    const resultData = {};

    const processQuestions = questions => {
      questions.forEach(questionItem => {
        resultData[questionItem.tqm_Question_code] =
          formData[questionItem.tqm_Question_code] || '';
      });
    };
    processQuestions(question);
    processQuestions(employeeQues);
    processQuestions(earnIncome);
    processQuestions(rentailDetails);
    processQuestions(peopalStay);
    processQuestions(rental_History);
    processQuestions(preference);

    console.log('Result Data:', resultData);
    return resultData;
  };

  const renderQuestionComponent = (question, index) => {
    switch (question.tqm_Question_type) {
      case 'Text':
        return (
          <View key={index}>
            <TextInput
              style={RentalOfferStyle.input}
              placeholder={`Enter your ${question.tqm_Question_description}`}
              onChangeText={text => {
                handleInputChange(question.tqm_Question_code, text, index);
                // alert(index);
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
      case 'Calendar':
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
              onChange={item =>
                handleInputChange(question.tqm_Question_code, item.lookup_key)
              }
            />
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
        <View style={{marginHorizontal: 16, marginBottom: 20}}>
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
              // justifyContent: 'flex-end',
              // alignSelf: 'flex-end',
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
          {/* <BottomModalSearchRental onClose={onClose} /> */}
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
              // flexDirection: 'row',
              // justifyContent: 'space-between',
            }}
            onPress={() => {
              onClose1();
            }}>
            <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
          </TouchableOpacity>
          {/* <TenantScreeningReportModal onClose={onClose} /> */}
          <ApplicationSubmitModal onClose={onClose1} />
        </RBSheet>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default RentalOffer;
