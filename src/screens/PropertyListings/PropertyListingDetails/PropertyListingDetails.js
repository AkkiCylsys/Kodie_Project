import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {_COLORS} from '../../../Themes';
import {DetailsStyle} from '../../Landlord/AddNewProperty/PropertyReview/Details/DetailsStyles';
import TopHeader from '../../../components/Molecules/Header/Header';
import {
  LABEL_STYLES,
  LabelStyles,
} from '../../../Themes/CommonStyles/CommonStyles';
import CalendarModal from '../../../components/Molecules/CalenderModal/CalenderModal';
import {SignupLookupDetails} from '../../../APIs/AllApi';
import SectionToggle from '../../../components/Molecules/SectionToggle/SectionToggle';
import DropdownField from '../../../components/Molecules/DropdownField/DropdownField';
import InputField from '../../../components/Molecules/InputField/InputField';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import ToggleButton from '../../../components/Molecules/ToggleButton/ToggleButton';
import {Divider} from 'react-native-paper';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import {
  AddBidDetails,
  insertMarketDetails,
} from '../../../services/PropertyListing/ListingServices';
import {useSelector} from 'react-redux';
import {Config} from '../../../Config';

const PropertyListingDetail = props => {
  const [propertyDetailsVisible, setPropertyDetailsVisible] = useState(true);
  const [preferencesVisible, setPreferencesVisible] = useState(false);
  const [propertyDescription, setPropertyDescription] = useState('');
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [leaseEndData, setLeaseEndData] = useState([]);
  const [leaseEndValue, setLeaseEndValue] = useState('');
  const [leaseTermData, setLeaseTermData] = useState([]);
  const [leaseTermValue, setLeaseTermValue] = useState('');
  const [selectedButtonSmokingId, setSelectedButtonSmokingId] = useState(0);
  const [selectedButtonPetId, setSelectedButtonPetId] = useState(0);
  const [selectedButtonconsideredId, setSelectedButtonconsideredId] =
    useState(0);
  const [maxOccupantsError, setMaxOccupantsError] = useState('');
  const [listPriceError, setListPriceError] = useState('');
  const [Occupant, setOccupant] = useState('');
  const [ListPrice, setListPrice] = useState('');
  const [Otherpreference, setOtherpreference] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDateError, setSelectedDateError] = useState('');
  const [lease_end_valueError, setlLease_end_valueError] = useState(false);

  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginData', loginData);
  const propertyid = props?.route?.params?.propertyid;
  console.log('propertyid', propertyid);

  useEffect(() => {
    fetchLeaseOptions();
    fetchLeaseTermOptions();
  }, []);

  const fetchLeaseOptions = async () => {
    try {
      const res = await SignupLookupDetails({
        P_PARENT_CODE: 'RENT_PAID',
        P_TYPE: 'OPTION',
      });
      setLeaseEndData(res?.lookup_details || []);
    } catch (error) {
      console.error('Error fetching lease end options:', error);
    }
  };

  const fetchLeaseTermOptions = async () => {
    try {
      const res = await SignupLookupDetails({
        P_PARENT_CODE: 'RLT',
        P_TYPE: 'OPTION',
      });
      setLeaseTermData(res?.lookup_details || []);
    } catch (error) {
      console.error('Error fetching lease term options:', error);
    }
  };

  const toggleVisibility = setter => setter(prev => !prev);

  const handleDateSelection = day => {
    setSelectedDate(day.dateString);
  };
  const handleMaxOccupantsChange = text => {
    setOccupant(text);
    if (text.trim() === '') {
      setMaxOccupantsError('Maximum number of occupants is required.');
    } else {
      setMaxOccupantsError('');
    }
  };
  const handleRequestDate = text => {
    setSelectedDate(text);
    if (text.trim() === '') {
      setSelectedDateError('Request date is required!');
    } else {
      setSelectedDateError('');
    }
  };
  // const handleListPriceChange = text => {
  //   setListPrice(text);
  //   if (text.trim() === '') {
  //     setListPriceError('List price is required.');
  //   } else {
  //     setListPriceError('');
  //   }
  // };
  const handleListPriceChange = text => {
    // Remove non-numeric characters to keep only the numbers
    const numericText = text.replace(/[^0-9]/g, '');

    // Set the numeric value without the dollar sign in the state
    setListPrice(numericText);

    // Validation: if the input is empty, show an error message
    if (numericText.trim() === '') {
      setListPriceError('List price is required.');
    } else {
      setListPriceError('');
    }
  };
  const renderDropdownItem = (item, selectedItemKey) => (
    <View
      style={[
        DetailsStyle.itemView,
        {
          backgroundColor:
            item.lookup_key === selectedItemKey
              ? _COLORS.Kodie_MidLightGreenColor
              : _COLORS.Kodie_WhiteColor,
        },
      ]}>
      {item.lookup_key === selectedItemKey ? (
        <AntDesign
          color={_COLORS.Kodie_GreenColor}
          name="checkcircle"
          size={20}
        />
      ) : (
        <Fontisto
          color={_COLORS.Kodie_GrayColor}
          name="radio-btn-passive"
          size={20}
        />
      )}
      <Text style={DetailsStyle.textItem}>{item.lookup_description}</Text>
    </View>
  );
  const prereference = `${selectedButtonSmokingId}, ${selectedButtonPetId}, ${selectedButtonconsideredId}`;
  const validateInputs = () => {
    let isValid = true;
    if (selectedDate.trim() === '') {
      setSelectedDateError('Select date is required!');
      isValid = false;
    } else if (leaseTermValue == '') {
      setlLease_end_valueError(true);
      isValid = false;
    } else if (Occupant.trim() === '') {
      setMaxOccupantsError('Maximum number of occupants is required.');
      isValid = false;
    } else if (ListPrice.trim() === '') {
      setListPriceError('List price is required.');
      isValid = false;
    } else {
      setMaxOccupantsError('');
      setListPriceError('');
    }
    if (isValid) {
      handleInsertList();
      handle_addlease_Bid();
    }
  };
  const handle_addlease_Bid = async () => {
    setIsLoading(true);
    const Bid_Data = {
      user_id: loginData?.Login_details?.user_id,
      account_id: loginData?.Login_details?.user_account_id,
      property_id: propertyid,
      commencement_date: '2024-09-19 18:05:12',
      duration: 314,
      list_price: ListPrice,
      auto_threshold: '1000',
      notif_type: 1,
      bid_open_reminder: 0,
      bid_open_day: 86,
      bid_open_before: 0,
      bid_close_reminder: '0',
      bid_close_day: 116,
      bid_close_before: '0',
      new_bid: 0,
      new_bid_days: '358',
      new_bid_before: '0',
    };
    console.log(Bid_Data);
    try {
      const response = await AddBidDetails(Bid_Data);
      console.log(response, 'bidresponse');
      setIsLoading(false);
    } catch (error) {
      console.log(error, 'fkdd');
      // Alert.alert('Error', 'Failed to insert market details.');
      setIsLoading(false);
    }
  };

  const handleInsertList = async () => {
    console.log('dsdsadfgds');
    setIsLoading(true);
    const data = {
      user_key: loginData?.Login_details?.user_id,
      account_id: loginData?.Login_details?.user_account_id,
      property_id: propertyid,
      pitch_property: propertyDescription,
      property_available_from: selectedDate,
      rental_lease_term: leaseTermValue,
      maximum_occupant: Occupant,
      list_price: ListPrice,
      frequency_payment: leaseEndValue,
      prereference: prereference,
      other: Otherpreference,
    };
    console.log('add market place..', data);
    try {
      const response = await insertMarketDetails(data);
      Alert.alert('Success', 'Market details have been save successfully.');
      props.navigation.navigate('Properties');
      setLeaseEndValue('');
      setLeaseTermValue('');
      setOccupant('');
      setListPrice('');
      setSelectedDate('');
      setOtherpreference('');
      setPropertyDescription('');
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to insert market details.');
      setIsLoading(false);
    }
  };
  const allPropertyFilled =
    propertyDescription &&
    selectedDate &&
    leaseTermValue &&
    Occupant &&
    ListPrice &&
    leaseEndValue;
  const allPreferencesFilled =
    selectedButtonSmokingId &&
    selectedButtonPetId &&
    selectedButtonconsideredId &&
    Otherpreference;
  return (
    <SafeAreaView style={DetailsStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => props.navigation.navigate('Properties')}
        MiddleText="Property listing details"
      />

      <View style={DetailsStyle.headingView}>
        <Text style={LabelStyles.largeTextBold}>Property listing details</Text>
      </View>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={DetailsStyle.subContainer}>
          {/* Property Details Section */}
          <SectionToggle
            titleStyle={{
              color: allPropertyFilled
                ? _COLORS?.Kodie_GreenColor
                : _COLORS?.Kodie_BlackColor,
            }}
            title="Other property details"
            isVisible={propertyDetailsVisible}
            onPress={() => toggleVisibility(setPropertyDetailsVisible)}>
            <Text style={[LABEL_STYLES.commontext, {marginBottom: 12}]}>
              Pitch your property
            </Text>
            <TextInput
              style={[DetailsStyle.input, {height: 100}]}
              placeholder="Enter a sales description of your property"
              value={propertyDescription}
              onChangeText={setPropertyDescription}
              multiline
              numberOfLines={5}
              maxLength={1000}
              textAlignVertical="top"
            />

            <View style={DetailsStyle.section}>
              <Text style={[LABEL_STYLES.commontext, {marginBottom: 12}]}>
                Property available from
                <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
              </Text>
              <CalendarModal
                current={selectedDate}
                SelectDate={selectedDate || 'Select Date'}
                _textInputStyle={{
                  color: selectedDate
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_GrayColor,
                }}
                calenderStyle={{
                  marginTop: 0,
                  height: 48,
                  borderColor: selectedDateError
                    ? _COLORS?.Kodie_redColor
                    : _COLORS?.Kodie_GrayColor,
                }}
                calenderIcon={() => toggleVisibility(setCalendarModalVisible)}
                onDayPress={day => {
                  handleRequestDate(day.dateString);
                }}
                onChangeText={() => handleRequestDate(selectedDate)}
                Visible={isCalendarModalVisible}
                onRequestClose={() => setCalendarModalVisible(false)}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: _COLORS.Kodie_lightGreenColor,
                    selectedTextColor: _COLORS.Kodie_BlackColor,
                  },
                }}
                _closeButton={() => setCalendarModalVisible(false)}
                _ApplyButton={() => setCalendarModalVisible(false)}
              />
              {selectedDateError ? (
                <Text style={{color: 'red', marginLeft: 5, marginTop: 5}}>
                  {selectedDateError}
                </Text>
              ) : null}
            </View>

            <DropdownField
              label="Rental lease term"
              Starpoint={'*'}
              placeholder="Select length of lease"
              data={leaseTermData}
              value={leaseTermValue}
              dropdownStyle={{
                borderColor: lease_end_valueError
                  ? _COLORS?.Kodie_redColor
                  : _COLORS?.Kodie_GrayColor,
              }}
              onChange={item => {
                setLeaseTermValue(item.lookup_key);
                setlLease_end_valueError(false);
              }}
              renderItem={item => renderDropdownItem(item, leaseTermValue)}
            />
            {lease_end_valueError ? (
              <Text style={{color: 'red', marginLeft: 5, marginTop: 5}}>
                {'Please select an option.'}
              </Text>
            ) : null}
            <InputField
              label="Maximum number of occupants"
              placeholder="Enter the maximum number of tenants"
              value={Occupant}
              Starpoint={'*'}
              onChangeText={handleMaxOccupantsChange}
              keyboardType="number-pad"
              inputStyle={{
                borderColor: maxOccupantsError
                  ? _COLORS?.Kodie_redColor
                  : _COLORS?.Kodie_GrayColor,
              }}
            />
            {maxOccupantsError ? (
              <Text style={{color: 'red', marginLeft: 5, marginTop: 5}}>
                {maxOccupantsError}
              </Text>
            ) : null}

            <InputField
              label="List price"
              placeholder="Enter the rental amount"
              // value={ListPrice}
              value={ListPrice ? `$${ListPrice}` : ''}
              Starpoint={'*'}
              onChangeText={handleListPriceChange}
              keyboardType="number-pad"
              inputStyle={{
                borderColor: listPriceError
                  ? _COLORS?.Kodie_redColor
                  : _COLORS?.Kodie_GrayColor,
              }}
            />
            {listPriceError ? (
              <Text style={{color: 'red', marginLeft: 5, marginTop: 5}}>
                {listPriceError}
              </Text>
            ) : null}

            <DropdownField
              label="Frequency of rental payments"
              placeholder="Select rental lease term"
              data={leaseEndData}
              value={leaseEndValue}
              onChange={item => setLeaseEndValue(item.lookup_key)}
              renderItem={item => renderDropdownItem(item, leaseEndValue)}
            />
            <DividerIcon />
          </SectionToggle>

          {/* Preferences Section */}
          <SectionToggle
            titleStyle={{
              color: allPreferencesFilled
                ? _COLORS?.Kodie_GreenColor
                : _COLORS?.Kodie_BlackColor,
            }}
            title="Preferences"
            isVisible={preferencesVisible}
            onPress={() => toggleVisibility(setPreferencesVisible)}>
            <View style={[DetailsStyle.addition_featureView]}>
              <View style={{flex: 1}}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Smoking allowed?'}
                </Text>
                <ToggleButton
                  tabValue={selectedButtonSmokingId}
                  setTabValue={setSelectedButtonSmokingId}
                  activeColor={_COLORS.Kodie_GreenColor}
                  inactiveColor={_COLORS.Kodie_WhiteColor}
                  activeTextColor={_COLORS.Kodie_WhiteColor}
                  inactiveTextColor={_COLORS.Kodie_BlackColor}
                  firstTabLabel="Yes"
                  secondTabLabel="No"
                />
              </View>
              <View style={{margin: 11}} />
              <View style={{flex: 1}}>
                <Text style={LABEL_STYLES.commontext}>{'Pets allowed?'}</Text>
                <ToggleButton
                  tabValue={selectedButtonPetId}
                  setTabValue={setSelectedButtonPetId}
                  activeColor={_COLORS.Kodie_GreenColor}
                  inactiveColor={_COLORS.Kodie_WhiteColor}
                  activeTextColor={_COLORS.Kodie_WhiteColor}
                  inactiveTextColor={_COLORS.Kodie_BlackColor}
                  firstTabLabel="Yes"
                  secondTabLabel="No"
                />
              </View>
            </View>
            <View style={[DetailsStyle.addition_featureView]}>
              <View style={{flex: 1}}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Short term rental considered?'}
                </Text>
                <ToggleButton
                  tabValue={selectedButtonconsideredId}
                  setTabValue={setSelectedButtonconsideredId}
                  activeColor={_COLORS.Kodie_GreenColor}
                  inactiveColor={_COLORS.Kodie_WhiteColor}
                  activeTextColor={_COLORS.Kodie_WhiteColor}
                  inactiveTextColor={_COLORS.Kodie_BlackColor}
                  firstTabLabel="Yes"
                  secondTabLabel="No"
                  width={'48%'}
                />
              </View>
            </View>
            <InputField
              label="Other"
              placeholder="Type another preference here"
              value={Otherpreference}
              onChangeText={setOtherpreference}
            />
            <View style={{marginBottom: '10%'}} />
          </SectionToggle>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[DetailsStyle.headingView, {marginTop: 0}]}>
        <CustomSingleButton
          _ButtonText={'List now'}
          Text_Color={_COLORS.Kodie_WhiteColor}
          text_Size={18}
          marginBottom={12}
          onPress={validateInputs}
        />
      </View>
    </SafeAreaView>
  );
};

export default PropertyListingDetail;
