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
  const [question, setQuestion] = useState([]);
  const [inputValues, setInputValues] = useState({});

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
      // p_question_code: questionCode ? questionCode : 'All',
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
          setQuestion(response?.data?.data);
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
            data={question}
            keyExtractor={(item, index) => index.toString()}
            renderItem={QuestionCodeRender}
          />
        )}
      </View>
    );
  };
  const handleInputChange = (questionCode, value) => {
    setInputValues(prevInputValues => {
      const updatedInputValues = {
        ...prevInputValues,
        [questionCode]: value,
      };
      console.log('Updated Input Values:', updatedInputValues);
      return updatedInputValues;
    });
  };
  const renderQuestionComponent = question => {
    switch (question.tqm_Question_type) {
      case 'Text':
        return (
          <View>
            <TextInput
              style={RentalOfferStyle.input}
              placeholder={`Enter your ${question.tqm_Question_description}`}
              onChangeText={text =>
                handleInputChange(question.tqm_Question_code, text)
              }
              value={inputValues[question.tqm_Question_code]}
            />
          </View>
        );
      case 'Calendar':
        return (
          <View style={RentalOfferStyle.datePickerView}>
            <CalendarModal
              SelectDate={
                inputValues[question.tqm_Question_code]
                  ? inputValues[question.tqm_Question_code]
                  : 'Start Date'
              }
              _textInputStyle={{
                color: selectedDate
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_GrayColor,
              }}
              calenderIcon={toggleModal}
              onDayPress={day => {
                setSelectedDate(day.dateString);
                handleInputChange(question.tqm_Question_code, day.dateString);
              }}
              Visible={isModalVisible}
              onRequestClose={toggleModal}
              markedDates={{
                [selectedDate]: {
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
      // case 'Dropdown':
      //   return (
      //     <View>
      //       <Dropdown
      //         style={RentalOfferStyle.dropdown}
      //         placeholderStyle={RentalOfferStyle.placeholderStyle}
      //         selectedTextStyle={RentalOfferStyle.selectedTextStyle}
      //         inputSearchStyle={RentalOfferStyle.inputSearchStyle}
      //         iconStyle={RentalOfferStyle.iconStyle}
      //         data={}
      //         search
      //         maxHeight={300}
      //         labelField="lookup_description"
      //         valueField="lookup_key"
      //         placeholder="6-month"
      //         searchPlaceholder="Search..."
      //         value={inputValues[question.tqm_Question_code]}
      //         onChange={item => {
      //           handleInputChange(question.tqm_Question_code, text)
      //         }}
      //       />
      //     </View>
      //   );
      default:
        return null;
    }
  };
  const QuestionCodeRender = ({item}) => {
    return (
      <View style={{marginHorizontal: 16, marginTop: 5}}>
        <View key={question.id}>
          <Text style={LABEL_STYLES.commontext}>
            {item.tqm_Question_description}
          </Text>
          {renderQuestionComponent(item)}
        </View>
        {/* <View style={RentalOfferStyle.rentalleaseview}>
          <Text style={LABEL_STYLES.commontext}>
            {'What rental lease term are you looking for?'}
          </Text>
          <Dropdown
            style={RentalOfferStyle.dropdown}
            placeholderStyle={RentalOfferStyle.placeholderStyle}
            selectedTextStyle={RentalOfferStyle.selectedTextStyle}
            inputSearchStyle={RentalOfferStyle.inputSearchStyle}
            iconStyle={RentalOfferStyle.iconStyle}
            data={RentalLeaseData}
            search
            maxHeight={300}
            labelField="lookup_description"
            valueField="lookup_key"
            placeholder="6-month"
            searchPlaceholder="Search..."
            value={RentalLeasevalue}
            onChange={item => {
              setRentalLeaseValue(item.lookup_key);
            }}
          />
        </View>
        <View style={RentalOfferStyle.tenentpeople}>
          <Text style={LABEL_STYLES.commontext}>
            {'How many people will be staying in the property?'}
          </Text>
          <Dropdown
            style={RentalOfferStyle.dropdown}
            placeholderStyle={RentalOfferStyle.placeholderStyle}
            selectedTextStyle={RentalOfferStyle.selectedTextStyle}
            inputSearchStyle={RentalOfferStyle.inputSearchStyle}
            iconStyle={RentalOfferStyle.iconStyle}
            data={valueStyingData}
            search
            maxHeight={300}
            labelField="lookup_description"
            valueField="lookup_key"
            placeholder="3 people"
            searchPlaceholder="Search..."
            value={valueStying}
            onChange={item => {
              setValueStying(item.lookup_key);
            }}
          />
        </View>
        <View style={RentalOfferStyle.jobDetailsView}>
          <Text style={LABEL_STYLES.commontext}>
            {'What is your rental budget?'}
          </Text>
          <TextInput
            style={RentalOfferStyle.input}
            value={rentalBudget}
            onChangeText={setRentalBudget}
            placeholder="Enter the rental amount"
            placeholderTextColor={_COLORS.Kodie_LightGrayColor}
          />
        </View>
        <View
          style={[
            RentalOfferStyle.inputContainer,
            RentalOfferStyle.paymentbtnselectview,
          ]}>
          <Text style={LABEL_STYLES.commontext}>
            {'How often will you be paying rent?'}
          </Text>
          <RowButtons
            LeftButtonText={'Weekly'}
            leftButtonbackgroundColor={
              !selected_Paying_Button
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            LeftButtonTextColor={
              !selected_Paying_Button
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            LeftButtonborderColor={
              !selected_Paying_Button
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_LightWhiteColor
            }
            onPressLeftButton={() => {
              setSelected_Paying_Button(false);
              setSelected_Paying_Id(1);
            }}
            RightButtonText={'Monthly'}
            RightButtonbackgroundColor={
              selected_Paying_Button
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            RightButtonTextColor={
              selected_Paying_Button
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            RightButtonborderColor={
              selected_Paying_Button
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_LightWhiteColor
            }
            onPressRightButton={() => {
              setSelected_Paying_Button(true);
              setSelected_Paying_Id(0);
            }}
          />
        </View> */}
        {/* <DividerIcon marginTop={5} /> */}
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
        {/* .. */}

        {/* <View style={{}}>
          <View style={RentalOfferStyle.propety_details_view}>
            <Text style={RentalOfferStyle.propery_det}>
              {'Employment & income'}
            </Text>

            <TouchableOpacity
              style={RentalOfferStyle.down_Arrow_icon}
              onPress={toggleTenantRooms}>
              <AntDesign
                name={TenantRooms ? 'up' : 'down'}
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />

          {TenantRooms && (
            <View style={{marginHorizontal: 16}}>
              <View style={{}}>
                <Text style={LABEL_STYLES.commontext}>
                  {'How would you describe your employment status?'}
                </Text>
                <Dropdown
                  style={RentalOfferStyle.dropdown}
                  placeholderStyle={RentalOfferStyle.placeholderStyle}
                  selectedTextStyle={RentalOfferStyle.selectedTextStyle}
                  inputSearchStyle={RentalOfferStyle.inputSearchStyle}
                  iconStyle={RentalOfferStyle.iconStyle}
                  data={EmployeeValueData}
                  search
                  maxHeight={300}
                  labelField="lookup_description"
                  valueField="lookup_key"
                  placeholder="Full-time employed"
                  searchPlaceholder="Search..."
                  value={EmployeeValue}
                  onChange={item => {
                    setEmployeeValue(item.lookup_key);
                  }}
                />
              </View>

              <View style={RentalOfferStyle.jobDetailsView}>
                <Text style={LABEL_STYLES.commontext}>
                  {'How long have you been employed for?'}
                </Text>
                <TextInput
                  style={RentalOfferStyle.input}
                  value={longEmployee}
                  onChangeText={setLongEmployee}
                  placeholder="Enter number of years"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>
              <View
                style={[
                  RentalOfferStyle.jobDetailsView,
                  RentalOfferStyle.weeklyincomeview,
                ]}>
                <Text style={LABEL_STYLES.commontext}>
                  {'What is your household weekly gross  income?'}
                </Text>
                <TextInput
                  style={RentalOfferStyle.input}
                  value={weeklyIncome}
                  onChangeText={setWeeklyIncome}
                  placeholder="Enter weekly income"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>
              <DividerIcon marginTop={5} />
            </View>
          )}
        </View>

        <View style={{}}>
          <View style={RentalOfferStyle.propety_details_view}>
            <Text style={RentalOfferStyle.propery_det}>{'Rental history'}</Text>

            <TouchableOpacity
              style={RentalOfferStyle.down_Arrow_icon}
              onPress={toggleRentalHistory}>
              <AntDesign
                name={RentalHistory ? 'up' : 'down'}
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />

          {RentalHistory && (
            <View style={{marginHorizontal: 16}}>
              <View style={[RentalOfferStyle.longemployed]}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Why are you looking to move?'}
                </Text>
                <TextInput
                  style={RentalOfferStyle.input}
                  value={lookingmove}
                  onChangeText={setLookingmove}
                  placeholder="Enter reason for move"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>

              <View
                style={[
                  RentalOfferStyle.paymentbtnselectview,
                  RentalOfferStyle.rentalagrementview,
                ]}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Have you ever broken a rental agreement?'}
                </Text>
                <RowButtons
                  LeftButtonText={'Yes'}
                  leftButtonbackgroundColor={
                    !selected_Rental_Agreement
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  LeftButtonTextColor={
                    !selected_Rental_Agreement
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  LeftButtonborderColor={
                    !selected_Rental_Agreement
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressLeftButton={() => {
                    setSelected_Rental_Agreement(false);
                    setSelected_Agreement_Id(1);
                    // alert(selectedButtonId)
                  }}
                  RightButtonText={'No'}
                  RightButtonbackgroundColor={
                    selected_Rental_Agreement
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  RightButtonTextColor={
                    selected_Rental_Agreement
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  RightButtonborderColor={
                    selected_Rental_Agreement
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressRightButton={() => {
                    setSelected_Rental_Agreement(true);
                    setSelected_Agreement_Id(0);
                  }}
                />
              </View>

              <View
                style={[
                  RentalOfferStyle.paymentbtnselectview,
                  RentalOfferStyle.rentalagrementview,
                ]}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Have you ever been evicted from a previous rental?'}
                </Text>
                <RowButtons
                  LeftButtonText={'Yes'}
                  leftButtonbackgroundColor={
                    !selected_Previous_Rental
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  LeftButtonTextColor={
                    !selected_Previous_Rental
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  LeftButtonborderColor={
                    !selected_Previous_Rental
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressLeftButton={() => {
                    setSelected_Previous_Rental(false);
                    setSelected_Previous_Id(1);
                    // alert(selectedButtonId)
                  }}
                  RightButtonText={'No'}
                  RightButtonbackgroundColor={
                    selected_Previous_Rental
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  RightButtonTextColor={
                    selected_Previous_Rental
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  RightButtonborderColor={
                    selected_Previous_Rental
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressRightButton={() => {
                    setSelected_Previous_Rental(true);
                    setSelected_Previous_Id(0);
                  }}
                />
              </View>
              <DividerIcon marginTop={5} />
            </View>
          )}
        </View>

        <View style={{}}>
          <View style={RentalOfferStyle.propety_details_view}>
            <Text style={RentalOfferStyle.propery_det}>{'Preferences'}</Text>

            <TouchableOpacity
              style={RentalOfferStyle.down_Arrow_icon}
              onPress={togglePreferences}>
              <AntDesign
                name={Preferences ? 'up' : 'down'}
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
          {Preferences && (
            <View style={{marginHorizontal: 16}}>
              <View
                style={[
                  // RentalOfferStyle.inputContainer,
                  RentalOfferStyle.paymentbtnselectview,
                  RentalOfferStyle.rentalagrementview,
                ]}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Are you a smoking or non-smoking household?'}
                </Text>
                <RowButtons
                  LeftButtonText={'Non-smoking'}
                  leftButtonbackgroundColor={
                    !selected_Smoking
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  LeftButtonTextColor={
                    !selected_Smoking
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  LeftButtonborderColor={
                    !selected_Smoking
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressLeftButton={() => {
                    setSelected_Smoking(false);
                    setSelected_Smoking_Id(1);
                    // alert(selectedButtonId)
                  }}
                  RightButtonText={'Non-smoking'}
                  RightButtonbackgroundColor={
                    selected_Smoking
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  RightButtonTextColor={
                    selected_Smoking
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  RightButtonborderColor={
                    selected_Smoking
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressRightButton={() => {
                    setSelected_Smoking(true);
                    setSelected_Smoking_Id(0);
                  }}
                />
              </View>

              <View
                style={[
                  // RentalOfferStyle.inputContainer,
                  RentalOfferStyle.paymentbtnselectview,
                  RentalOfferStyle.rentalagrementview,
                ]}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Do you have any pets?'}
                </Text>
                <RowButtons
                  LeftButtonText={'Yes'}
                  leftButtonbackgroundColor={
                    !selected_Pets
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  LeftButtonTextColor={
                    !selected_Pets
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  LeftButtonborderColor={
                    !selected_Pets
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressLeftButton={() => {
                    setSelected_Pets(false);
                    setSelected_Pets_Id(1);
                    // alert(selectedButtonId)
                  }}
                  RightButtonText={'No'}
                  RightButtonbackgroundColor={
                    selected_Pets
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  RightButtonTextColor={
                    selected_Pets
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  RightButtonborderColor={
                    selected_Pets
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressRightButton={() => {
                    setSelected_Pets(true);
                    setSelected_Pets_Id(0);
                  }}
                />
              </View>

              <View style={RentalOfferStyle.additional_key_view}>
                <Text style={RentalOfferStyle.Furnished_Text}>
                  {'What type of pets do you have?'}
                </Text>
                <MultiSelect
                  style={RentalOfferStyle.dropdown}
                  placeholderStyle={RentalOfferStyle.placeholderStyle}
                  selectedTextStyle={RentalOfferStyle.selectedTextStyle}
                  inputSearchStyle={RentalOfferStyle.inputSearchStyle}
                  iconStyle={RentalOfferStyle.iconStyle}
                  data={petsData}
                  activeColor={_COLORS.Kodie_MidLightGreenColor}
                  labelField="lookup_description"
                  valueField="lookup_key"
                  placeholder="Search"
                  value={pets}
                  search
                  searchPlaceholder="Search..."
                  onChange={item => {
                    setPets(item);
                  }}
                  renderItem={renderDataItem}
                  renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity
                      onPress={() => unSelect && unSelect(item)}>
                      <View style={RentalOfferStyle.selectedStyle}>
                        <Text style={RentalOfferStyle.textSelectedStyle}>
                          {item.lookup_description}
                        </Text>
                        <AntDesign color="white" name="close" size={17} />
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <DividerIcon style={RentalOfferStyle.dividericonpreferance} />
            </View>
          )}
        </View> */}

        <FlatList
          data={quesHeading}
          keyExtractor={(item, index) => item.id}
          renderItem={QuesHeadingRender}
        />
        {/* .... */}
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
