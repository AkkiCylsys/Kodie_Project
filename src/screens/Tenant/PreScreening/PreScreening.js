import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {PreScreeningStyle} from './PreScreeningStyle';
import TopHeader from '../../../components/Molecules/Header/Header';
import {_goBack} from '../../../services/CommonServices';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import Entypo from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {_COLORS, FONTFAMILY, IMAGES, LABEL_STYLES} from '../../../Themes';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import CalendarModal from '../../../components/Molecules/CalenderModal/CalenderModal';
import {Dropdown} from 'react-native-element-dropdown';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import {MultiSelect} from 'react-native-element-dropdown';
import {Config} from '../../../Config';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import axios from 'axios';
import {stringify} from 'querystring';
import {useSelector} from 'react-redux';

const data = [
  {label: 'Electricals', value: '1'},
  {label: 'Home cleaning', value: '2'},
  {label: 'Outdoor cleaning', value: '3'},
  {label: 'Heavy lifting', value: '4'},
  {label: 'Fixing & maintenance', value: '5'},
];

const PetsData = [
  {label: 'Dog', value: '1'},
  {label: 'Cat', value: '2'},
  {label: 'Bird', value: '3'},
  {label: 'Fish', value: '4'},
  {label: 'Cow', value: '5'},
];

const renderDataItem = item => {
  return (
    <View style={PreScreeningStyle.item}>
      <Text style={PreScreeningStyle.selectedTextStyle}>
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

const PreScreening = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  // console.log('loginData', loginData);
  const [rating, setRating] = useState(0);
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
  const [jobDetails, setJobDetails] = useState(0);
  const [roomnumberOfYear, setRoomNumberOfYear] = useState('');
  const [numberOfYear, setNumberOfYear] = useState('');
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
  const [preScreening, setPreScreening] = useState([]);
  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleRentalDetails = () => {
    setRentalDetails(!RentalDetails);
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

  // API bind Add PreScreening code here.....
  const PreScreeninghandle = () => {
    // const formattedPets = JSON.stringify(pets);
    console.log(
      selectedDate,
      RentalLeasevalue,
      valueStying,
      jobDetails,
      selected_Paying_Id,
      EmployeeValue,
      roomnumberOfYear,
      weeklyIncome,
      numberOfYear,
      selected_Agreement_Id,
      selected_Previous_Id,
      selected_Smoking_Id,
      selected_Pets_Id,
      JSON.stringify(pets),
    );

    const PreScreeningData =
      //   {
      //     uad_key: 4,
      //     tpq_move_date: "2023-11-29",
      //     tpq_lease_term: null,
      //     tpq_staying_person: 2,
      //     tpq_rental_budget: 1500,
      //     tpq_paying_rent: 1,
      //     tpq_employment_status: 1,
      //     tpq_employment_year: "4 Year",
      //     tpq_weekly_income: 500,
      //     tpq_end_date: "2024-06-31",
      //     tpq_broken_rental_agreement: 1,
      //     tpq_previous_rental: 1,
      //     tpq_smoking: 0,
      //     tpq_any_pets: 1,
      //     tpq_type_pets: "[1,2,3]",
      //     tpq_is_active: 1,
      //     tpq_created_by: "admin123"
      // }
      {
        uad_key: loginData?.Login_details?.user_account_id,
        tpq_move_date: selectedDate,
        tpq_lease_term: RentalLeasevalue,
        tpq_staying_person: valueStying,
        tpq_rental_budget: jobDetails,
        tpq_paying_rent: selected_Paying_Id,
        tpq_employment_status: EmployeeValue,
        tpq_employment_year: roomnumberOfYear,
        tpq_weekly_income: weeklyIncome,
        tpq_end_date: numberOfYear,
        tpq_broken_rental_agreement: selected_Agreement_Id,
        tpq_previous_rental: selected_Previous_Id,
        tpq_smoking: selected_Smoking_Id,
        tpq_any_pets: selected_Pets_Id,
        tpq_type_pets: JSON.stringify(pets),
        tpq_is_active: 1,
        tpq_created_by: 'admin123',
      };
    const url = Config.BASE_URL;
    const PreScreeningUrl = url + 'add_tenant_questionarie/create';
    console.log('Request URL:', PreScreeningUrl);
    setIsLoading(true);

    axios
      .post(PreScreeningUrl, PreScreeningData)
      .then(response => {
        setPreScreening(response.data);
        console.log('PreScreening_data response...', response.data);
        if (response?.data?.success === true) {
          alert(response?.data?.message);
          setSelectedDate('');
          setValueStying('');
          setRoomNumberOfYear('');
          setJobDetails('');
          setEmployeeValue('');
          setNumberOfYear('');
          setWeeklyIncome('');
          setPets('');
          props.navigation.navigate('TenantList', {});
          setIsLoading(false);
        } else {
          console.error('PreScreening_data_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('PreScreening_data error...:', error);
        setIsLoading(false);
      });
  };

  // API bind What rental lease term are you looking for Lookup key code here........
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
        console.log('Tenant_Data_type', response.data);
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

  // API bind How many people will be staying in the property? Lookup key code here........
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

  // API bind How would you describe your employment status Lookup key code here........
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
          setIsLoading(false);
          console.log('Describe_Status....', response?.data?.lookup_details);
          setEmployeeValueData(response?.data?.lookup_details);
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

  // API bind What type of pets do you have? Lookup key code here........
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

  useEffect(() => {
    handleLeaseTerm();
    handleStyingProperty();
    handleDescribeStatus();
    handleTypesPets();
  }, []);

  const handleStartNowBtn = () => {
    PreScreeninghandle();
  };

  return (
    <>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Pre-screening'}
      />
      <ScrollView style={PreScreeningStyle.mainContainer}>
        <ScrollView>
          <View style={PreScreeningStyle.userDetailView}>
            <View style={PreScreeningStyle.userImagebindView}>
              <Image
                source={IMAGES.userImage}
                style={PreScreeningStyle.UserImages}
              />
              <Text style={PreScreeningStyle.userName}>Jack Black</Text>
            </View>
            <View style={PreScreeningStyle.ratingmainview}>
              <View style={PreScreeningStyle.ratingview1}>
                <StarRating
                  disabled={false}
                  maxStars={1}
                  rating={rating}
                  fullStarColor={_COLORS.Kodie_lightGreenColor}
                  emptyStarColor={_COLORS.Kodie_GrayColor}
                  starSize={18}
                  selectedStar={rating => setRating(rating)}
                />
                <Text style={PreScreeningStyle.ratingtext}>
                  3.9 (
                  <Text style={PreScreeningStyle.ratingtextnumber}>81</Text>)
                </Text>
              </View>

              <View style={PreScreeningStyle.VerifiedView}>
                <AntDesign
                  name={'checkcircle'}
                  size={12}
                  color={_COLORS.Kodie_GreenColor}
                  style={PreScreeningStyle.iconStl}
                />
                <Text style={PreScreeningStyle.verifystl}>Verified</Text>
              </View>
            </View>

            <View>
              <Entypo
                name={'dots-three-horizontal'}
                size={20}
                color={_COLORS.Kodie_GrayColor}
                style={PreScreeningStyle.iconStl}
              />
            </View>
          </View>
          <DividerIcon style={PreScreeningStyle.dividerstyle} />
          <View style={PreScreeningStyle.Container}>
            <Text style={PreScreeningStyle.apartment_text}>{'Apartment'}</Text>

            <Text style={PreScreeningStyle.melbourne_Text}>{'Sydney'}</Text>
            <View style={PreScreeningStyle.locationView}>
              <Entypo
                name="location-pin"
                size={20}
                color={_COLORS.Kodie_GreenColor}
              />
              <Text style={PreScreeningStyle.LocationText}>
                {'2118 Thornridge Cir. Syracuse.'}
              </Text>
            </View>
          </View>
          <DividerIcon />

          <View style={PreScreeningStyle.Container}>
            <Text style={PreScreeningStyle.propety_details_view_Heading}>
              Pre-rental questionnaire
            </Text>
            <View style={PreScreeningStyle.propety_details_view}>
              <Text style={PreScreeningStyle.propery_det}>
                {'Rental details'}
              </Text>

              <TouchableOpacity
                style={PreScreeningStyle.down_Arrow_icon}
                onPress={toggleRentalDetails}>
                <AntDesign
                  name={RentalDetails ? 'up' : 'down'}
                  size={15}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </View>
            <DividerIcon marginTop={5} />
            {/* Rental details hide code here.... */}
            {RentalDetails && (
              <View>
                <Text style={LABEL_STYLES.commontext}>
                  {'What date would you like to move?'}
                </Text>
                <View style={PreScreeningStyle.datePickerView}>
                  <CalendarModal
                    current={selectedDate}

                    SelectDate={selectedDate ? selectedDate : 'Start Date'}
                    _textInputStyle={{
                      color: selectedDate
                        ? _COLORS.Kodie_BlackColor
                        : _COLORS.Kodie_GrayColor,
                    }}
                    calenderIcon={toggleModal}
                    onDayPress={handleDayPress}
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

                <View style={PreScreeningStyle.rentalleaseview}>
                  <Text style={LABEL_STYLES.commontext}>
                    {'What rental lease term are you looking for?'}
                  </Text>
                  <Dropdown
                    style={PreScreeningStyle.dropdown}
                    placeholderStyle={PreScreeningStyle.placeholderStyle}
                    selectedTextStyle={PreScreeningStyle.selectedTextStyle}
                    inputSearchStyle={PreScreeningStyle.inputSearchStyle}
                    iconStyle={PreScreeningStyle.iconStyle}
                    data={RentalLeaseData}
                    search
                    maxHeight={300}
                    labelField="lookup_description"
                    valueField="lookup_key"
                    placeholder="Electricals"
                    searchPlaceholder="Search..."
                    value={RentalLeasevalue}
                    onChange={item => {
                      setRentalLeaseValue(item.lookup_key);
                    }}
                  />
                </View>

                <View style={PreScreeningStyle.tenentpeople}>
                  <Text style={LABEL_STYLES.commontext}>
                    {'How many people will be staying in the property?'}
                  </Text>
                  <Dropdown
                    style={PreScreeningStyle.dropdown}
                    placeholderStyle={PreScreeningStyle.placeholderStyle}
                    selectedTextStyle={PreScreeningStyle.selectedTextStyle}
                    inputSearchStyle={PreScreeningStyle.inputSearchStyle}
                    iconStyle={PreScreeningStyle.iconStyle}
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

                <View style={PreScreeningStyle.jobDetailsView}>
                  <Text style={LABEL_STYLES.commontext}>
                    {'What is your rental budget?'}
                  </Text>
                  <TextInput
                    style={[PreScreeningStyle.input, PreScreeningStyle.jobD_]}
                    value={jobDetails}
                    onChangeText={setJobDetails}
                    placeholder="Enter the rental amount"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                    multiline
                    numberOfLines={5}
                    textAlignVertical={'top'}
                    keyboardType="phone-pad"
                  />
                </View>

                <View
                  style={[
                    PreScreeningStyle.inputContainer,
                    PreScreeningStyle.paymentbtnselectview,
                  ]}>
                  <Text style={LABEL_STYLES.commontext}>
                    {'Rental payment frequency'}
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
                      // alert(selectedButtonId)
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
                </View>
                <DividerIcon marginTop={5} />
              </View>
            )}
          </View>

          <View style={PreScreeningStyle.Container}>
            <View style={PreScreeningStyle.propety_details_view}>
              <Text style={PreScreeningStyle.propery_det}>{'Rooms'}</Text>

              <TouchableOpacity
                style={PreScreeningStyle.down_Arrow_icon}
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
              <View>
                <View style={PreScreeningStyle.rentalleaseview}>
                  <Text style={LABEL_STYLES.commontext}>
                    {'How would you describe your employment status?'}
                  </Text>
                  <Dropdown
                    style={PreScreeningStyle.dropdown}
                    placeholderStyle={PreScreeningStyle.placeholderStyle}
                    selectedTextStyle={PreScreeningStyle.selectedTextStyle}
                    inputSearchStyle={PreScreeningStyle.inputSearchStyle}
                    iconStyle={PreScreeningStyle.iconStyle}
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

                <View style={PreScreeningStyle.jobDetailsView}>
                  <Text style={LABEL_STYLES.commontext}>
                    {'How long have you been employed for?'}
                  </Text>
                  <TextInput
                    style={[PreScreeningStyle.input, PreScreeningStyle.jobD_]}
                    value={roomnumberOfYear}
                    onChangeText={setRoomNumberOfYear}
                    placeholder="Enter number of years"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                    multiline
                    numberOfLines={5}
                    textAlignVertical={'top'}
                    keyboardType="phone-pad"
                  />
                </View>

                <View
                  style={[
                    PreScreeningStyle.jobDetailsView,
                    PreScreeningStyle.weeklyincomeview,
                  ]}>
                  <Text style={LABEL_STYLES.commontext}>
                    {'What is your household weekly gross  income?'}
                  </Text>
                  <TextInput
                    style={[PreScreeningStyle.input, PreScreeningStyle.jobD_]}
                    value={weeklyIncome}
                    onChangeText={setWeeklyIncome}
                    placeholder="Enter weekly income"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                    multiline
                    numberOfLines={5}
                    textAlignVertical={'top'}
                    keyboardType="phone-pad"
                  />
                </View>
                <DividerIcon marginTop={5} />
              </View>
            )}
          </View>

          <View style={PreScreeningStyle.Container}>
            <View style={PreScreeningStyle.propety_details_view}>
              <Text style={PreScreeningStyle.propery_det}>
                {'Rental history'}
              </Text>

              <TouchableOpacity
                style={PreScreeningStyle.down_Arrow_icon}
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
              <View>
                <View style={[PreScreeningStyle.longemployed]}>
                  <Text style={LABEL_STYLES.commontext}>
                    {'How long have you been employed for?'}
                  </Text>
                  <TextInput
                    style={[PreScreeningStyle.input, PreScreeningStyle.jobD_]}
                    value={numberOfYear}
                    onChangeText={setNumberOfYear}
                    placeholder="Enter number of years"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                    multiline
                    numberOfLines={5}
                    textAlignVertical={'top'}
                    keyboardType="phone-pad"
                  />
                </View>

                <View
                  style={[
                    // PreScreeningStyle.inputContainer,
                    PreScreeningStyle.paymentbtnselectview,
                    PreScreeningStyle.rentalagrementview,
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
                    // PreScreeningStyle.inputContainer,
                    PreScreeningStyle.paymentbtnselectview,
                    PreScreeningStyle.rentalagrementview,
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
          <View style={PreScreeningStyle.Container}>
            <View style={PreScreeningStyle.propety_details_view}>
              <Text style={PreScreeningStyle.propery_det}>{'Preferences'}</Text>

              <TouchableOpacity
                style={PreScreeningStyle.down_Arrow_icon}
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
              <View>
                <View
                  style={[
                    // PreScreeningStyle.inputContainer,
                    PreScreeningStyle.paymentbtnselectview,
                    PreScreeningStyle.rentalagrementview,
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
                    // PreScreeningStyle.inputContainer,
                    PreScreeningStyle.paymentbtnselectview,
                    PreScreeningStyle.rentalagrementview,
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

                <View style={PreScreeningStyle.additional_key_view}>
                  <Text style={PreScreeningStyle.Furnished_Text}>
                    {'What type of pets do you have?'}
                  </Text>
                  <MultiSelect
                    style={PreScreeningStyle.dropdown}
                    placeholderStyle={PreScreeningStyle.placeholderStyle}
                    selectedTextStyle={PreScreeningStyle.selectedTextStyle}
                    inputSearchStyle={PreScreeningStyle.inputSearchStyle}
                    iconStyle={PreScreeningStyle.iconStyle}
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
                        <View style={PreScreeningStyle.selectedStyle}>
                          <Text style={PreScreeningStyle.textSelectedStyle}>
                            {item.lookup_description}
                          </Text>
                          <AntDesign color="white" name="close" size={17} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                <DividerIcon style={PreScreeningStyle.dividericonpreferance} />
              </View>
            )}
          </View>

          <View style={PreScreeningStyle.Container}>
            <Text style={PreScreeningStyle.inspections}>
              {'Tenant  screening report (recommended)'}
            </Text>
            <CustomSingleButton
              _ButtonText={'Start Now'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              disabled={isLoading ? true : false}
              onPress={() => {
                handleStartNowBtn();
              }}
            />
          </View>

          <View
            style={[PreScreeningStyle.Container, PreScreeningStyle.uplodbtn]}>
            <Text style={PreScreeningStyle.inspections}>
              {'Already have a background report?'}
            </Text>
            <CustomSingleButton
              _ButtonText={'Upload'}
              Text_Color={_COLORS.Kodie_BlackColor}
              borderColor={_COLORS.Kodie_TransparentColor}
              backgroundColor={_COLORS.Kodie_lightGreenColor}
              isLeftImage={true}
              leftImage={IMAGES.uploadIcon}
              disabled={isLoading ? true : false}
            />
          </View>
          <DividerIcon />
        </ScrollView>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </>
  );
};

export default PreScreening;

//   onPress={() => {
//     refRBSheet.current.open();
//   }}
