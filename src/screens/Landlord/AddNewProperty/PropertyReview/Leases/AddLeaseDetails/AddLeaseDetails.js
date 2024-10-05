import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {AddLeaseDetailsStyle} from './AddLeaseDetailsStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {FONTFAMILY, _COLORS} from '../../../../../../Themes';
import {LABEL_STYLES} from '../../../../../../Themes/CommonStyles/CommonStyles';
import CalendarModal from '../../../../../../components/Molecules/CalenderModal/CalenderModal';
import {Dropdown} from 'react-native-element-dropdown';
import SwitchToggle from 'react-native-switch-toggle';
import axios from 'axios';
import {CommonLoader} from '../../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {Config} from '../../../../../../Config';
import {useDispatch, useSelector} from 'react-redux';
import DividerIcon from '../../../../../../components/Atoms/Devider/DividerIcon';
import moment from 'moment/moment';
import {SignupLookupDetails} from '../../../../../../APIs/AllApi';
import {useIsFocused} from '@react-navigation/native';
const daysOfWeek = [
  {label: 'Monday', value: '1'},
  {label: 'Tuesday', value: '2'},
  {label: 'Wednesday', value: '3'},
  {label: 'Thursday', value: '4'},
  {label: 'Friday', value: '5'},
  {label: 'Saturday', value: '6'},
  {label: 'Sunday', value: '7'},
];
export default AddLeaseDetails = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const leaseDataDetails = props?.leaseData;
  const isFocus = useIsFocused();
  const property_id = props.property_id;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateError, setSelectedDateError] = useState('');
  const [lease_term_Data, setLease_term_Data] = useState([]);
  const [lease_term_value, setlLease_term_value] = useState('');
  const [lease_term_valueError, setlease_term_valueError] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleEndDate, setModalVisibleEndDate] = useState(false);
  const [isDueDayModalVisible, setIsDueDayModalVisible] = useState(false);
  const [rentalAmount, setRentalAmount] = useState('');
  const [rentalAmountError, setRentalAmountError] = useState('');
  const [rentalBond, setRentalBond] = useState(0);
  const [rentalDeposit, setRentalDeposit] = useState(0);
  const [rentalEscalation, setRentalEscalation] = useState('');
  const [paymentDueDay, setPaymentDueDay] = useState('');
  const [paymentDueDayError, setPaymentDueDayError] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Save');
  const [notification_type_Data, setNotification_type_Data] = useState([]);
  const [notification_type_value, setNotification_type_value] = useState(null);
  const [expiry_reminder_Data, setExpiry_reminder_Data] = useState([]);
  const [expiry_reminder_value, setExpiry_reminder_value] = useState(0);
  const [payment_reminder_Data, setPayment_reminder_Data] = useState([]);
  const [payment_reminder_value, setPayment_reminder_value] = useState(0);
  const [rental_reminder_Data, setrental_reminder_Data] = useState([]);
  const [rental_reminder_value, setrental_reminder_value] = useState(0);
  const [lease_end_Data, setLease_end_Data] = useState([]);
  const [lease_end_value, setlLease_end_value] = useState('');
  const [filteredFrequencies, setFilteredFrequencies] = useState([]);
  const [lease_end_valueError, setlLease_end_valueError] = useState(false);
  const [toggle_expiry, setToggle_expiry] = useState(false);
  const [toggle_lease_expire, setToggle_lease_expire] = useState(0);
  const [toggle_payment, setToggle_payment] = useState(false);
  const [toggle_rent_payment, setToggle_rent_payment] = useState(0);
  const [toggle_rental, setToggle_rental] = useState(false);
  const [toggle_late_rental, setToggle_late_rental] = useState(0);
  const [showNotificationData, setShowNotificationData] = useState(false);
  const [showLeaseDetailsData, setLeaseDetailsData] = useState(false);
  const [isYesSelected, setIsYesSelected] = useState(false);
  const [isYesSelectedId, setIsYesSelectedId] = useState(0);
  const [ProRate, setProRate] = useState(0);
  const [ProRateError, setProRateError] = useState('');
  const handleButtonClick = isYes => {
    setIsYesSelected(isYes);
  };
  useEffect(() => {
    handle_notification_type();
    handle_expiry_reminder();
    handle_payment_reminder();
    handle_rental_reminder();
    handle_lease_term();
    handle_lease_end();
  }, []);
  useEffect(() => {
    if (leaseDataDetails.LEASE_KEY) {
      updateLeaseData();
    }
  }, [leaseDataDetails.LEASE_KEY]);
  useEffect(() => {
    if (lease_term_value && isFocus) {
      handleLeaseTermChange({lookup_key: lease_term_value});
    }
  }, [lease_term_value, isFocus]);

  const updateLeaseData = async () => {
    try {
      setlLease_term_value(
        parseFloat(leaseDataDetails?.UPLD_RENTAL_LEASE_TERM),
      );
      setSelectedDate(
        moment(leaseDataDetails?.UPLD_COMMENCEMENT_DATE).format('YYYY-MM-DD'),
      );
      setSelectedEndDate(
        moment(leaseDataDetails?.UPLD_LEASE_END_DATE).format('YYYY-MM-DD'),
      );
      setRentalAmount(leaseDataDetails?.RENTAL_AMMOUNT);
      setRentalBond(`${leaseDataDetails?.UPLD_RENTAL_BOND_AMMOUNT}`);
      setRentalDeposit(`${leaseDataDetails?.UPLD_RENTAL_DEPOSIT}`);
      setRentalEscalation(leaseDataDetails?.UPLD_RENTAL_ESCALATION);
      setNotification_type_value(
        parseFloat(leaseDataDetails?.UPLD_SET_NOTIFICATION_TYPE),
      );
      setIsYesSelectedId(leaseDataDetails?.UPLD_FIRST_RENTAL_PAYMENT);
      setToggle_late_rental(leaseDataDetails?.UPLD_LATE_RENTAL);
      setToggle_rent_payment(leaseDataDetails?.UPLD_RENT_PAYMENT);
      setToggle_lease_expire(leaseDataDetails?.UPLD_LEASE_EXPIRE);
      setrental_reminder_value(leaseDataDetails?.UPLD_LATE_RENTAL_REMINDER);
      setPayment_reminder_value(leaseDataDetails?.UPLD_RENT_PAYMENT_REMINDER);
      setExpiry_reminder_value(leaseDataDetails?.UPLD_LEASE_EXPIRY_REMINDER);
      setProRate(`${leaseDataDetails?.UPLD_PRO_RATA_AMOUNT}`);
      setlLease_end_value({
        lookup_key: leaseDataDetails?.frequency_key,
        lookup_description: leaseDataDetails?.UPLD_RENTAL_PAYMENT_FREQUENCY,
      });
      setPaymentDueDay(leaseDataDetails?.UPLD_PAYMENT_DUE_DAY);
    } catch (error) {
      console.error('Failed to update lease data:', error);
    }
  };

  const handleOptionClick = option => {
    setSelectedOption(option);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalEndDate = item => {
    // alert(lease_term_value)
    if (lease_term_value === 546) {
      setModalVisibleEndDate(!isModalVisibleEndDate);
    }
  };
  const toggleModalDueDay = () => {
    setIsDueDayModalVisible(!isDueDayModalVisible);
  };
  const handleRequestDate = text => {
    setSelectedDate(text);
    if (text.trim() === '') {
      setSelectedDateError('Commencement date is required!');
    } else {
      setSelectedDateError('');
    }
  };
  const handleProRateAmount = text => {
    setProRate(text);
    if (text === '') {
      setProRateError('Pro rate amount is required!');
    } else {
      setProRateError('');
    }
  };
  const validateRentalAmount = text => {
    if (text === '') {
      setRentalAmount('');
    } else if (!text.startsWith('$')) {
      text = '$' + ' ' + text;
    } else if (text === '') {
      setRentalAmountError('Notice title is required!');
    } else {
      setRentalAmountError('');
    }
    setRentalAmount(text);
  };
  const handleEndDayPress = day => {
    const commencementDate = moment(selectedDate);
    const endDate = moment(day.dateString);
    if (endDate.isBefore(commencementDate)) {
      Alert.alert('Error', 'End date cannot be before the commencement date.');
    } else {
      setSelectedEndDate(day.dateString);
    }
  };
  const handleShowNotificationData = () => {
    setShowNotificationData(!showNotificationData);
  };
  const handleShowLeaseDetailsData = () => {
    setLeaseDetailsData(!showLeaseDetailsData);
  };
  const handlePopUp = () => {
    props.onClose();
  };
  const handlevalidUpdation = () => {
    if (selectedDate.trim() === '') {
      setSelectedDateError('Commencement date is required!');
    } else if (lease_term_value == '') {
      setlease_term_valueError(true);
    } else if (lease_end_value == '') {
      setlLease_end_valueError(true);
    } else if (rentalAmount.trim() == '') {
      setRentalAmountError('Rental amount is required!');
    } else if (paymentDueDay.trim() == '') {
      setPaymentDueDayError(true);
    } else if (ProRate == '' && isYesSelected) {
      setProRate('Rental amount is required!');
    } else {
      setSelectedDateError('');
      if (leaseDataDetails.LEASE_KEY) {
        handle_update_Lease();
      } else {
        handle_add_Lease();
      }
    }
  };
  const handle_add_Lease = () => {
    const url = Config.BASE_URL;
    const add_Lease_url = url + 'create/lease';
    console.log('Request URL:', add_Lease_url);
    setIsLoading(true);
    console.log('selectedDate', selectedDate);
    const lease_Data = {
      user_key: loginData?.Login_details?.user_id,
      upd_key: property_id,
      commencement_date: selectedDate,
      rental_lease_term: lease_term_value,
      lease_end_date: selectedEndDate,
      rental_amount: rentalAmount,
      rental_bond_amount: rentalBond,
      rental_payment_frequency: lease_end_value?.lookup_description,
      payment_due_day: paymentDueDay,
      pro_rata_amount: ProRate,
      first_rental_payment: isYesSelectedId,
      rental_deposit: rentalDeposit,
      rental_escalation: rentalEscalation,
      set_notification_type: notification_type_value,
      is_active: 1,
      lease_expire: toggle_lease_expire,
      rent_payment: toggle_rent_payment,
      late_rental: toggle_late_rental,
      lease_expiry_reminder: expiry_reminder_value,
      rent_payment_reminder: payment_reminder_value,
      late_rental_reminder: rental_reminder_value,
      lease_before_after: true,
    };
    console.log(lease_Data, 'lease_Data///////');
    axios
      .post(add_Lease_url, lease_Data)
      .then(response => {
        console.log('API Response add_lease:', response?.data);
        if (response?.data?.success === true) {
          alert(response?.data?.message);
          handlePopUp();
          setIsLoading(false);
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        if (error?.response?.status === 409) {
          Alert.alert('Warning', error?.response?.data?.message);
        }
        console.error('API failed add_Lease', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handle_update_Lease = () => {
    console.log('paymentDueDay....', paymentDueDay);
    const url = Config.BASE_URL;
    const add_Lease_url = url + 'updateLeasePropertyDetails';
    console.log('Request URL:', add_Lease_url);
    setIsLoading(true);
    console.log('selectedDate', selectedDate);
    const lease_Data = {
      p_UPLD_LEASE_KEY: leaseDataDetails.LEASE_KEY,
      p_USER_KEY: loginData?.Login_details?.user_id,
      p_UPD_KEY: property_id,
      p_COMMENCEMENT_DATE: selectedDate,
      p_RENTAL_LEASE_TERM: lease_term_value,
      p_UPLD_LEASE_END_DATE: selectedEndDate,
      p_RENTAL_AMMOUNT: rentalAmount,
      p_RENTAL_BOND_AMMOUNT: rentalBond,
      p_RENTAL_PAYMENT_FREQUENCY: lease_end_value?.lookup_description,
      p_PAYMENT_DUE_DAY: paymentDueDay,
      p_UPLD_PRO_RATA_AMOUNT: ProRate,
      p_FIRST_RENTAL_PAYMENT: isYesSelectedId,
      p_UPLD_RENTAL_DEPOSIT: rentalBond,
      p_UPLD_RENTAL_ESCALATION: rentalBond,
      p_SET_NOTIFICATION_TYPE: notification_type_value,
      p_LEASE_EXPIRE: toggle_lease_expire,
      p_RENT_PAYMENT: toggle_rent_payment,
      p_LATE_RENTAL: toggle_late_rental,
      p_LEASE_EXPIRY_REMINDER: expiry_reminder_value,
      p_RENT_PAYMENT_REMINDER: payment_reminder_value,
      p_LATE_RENTAL_REMINDER: rental_reminder_value,
      p_LEASE_BEFORE_AFTER: true,
    };
    console.log(lease_Data, 'lease_Data////update///');
    axios
      .put(add_Lease_url, lease_Data)
      .then(response => {
        console.log('API Response add_lease:', response?.data);
        if (response?.data?.success === true) {
          alert(response?.data?.message);
          handlePopUp();
          setIsLoading(false);
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed add_Lease', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handle_notification_type = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'SNT',
      P_TYPE: 'OPTION',
    });

    console.log('notification_type', res);

    setNotification_type_Data(res?.lookup_details);
    setIsLoading(false);
  };
  const handle_expiry_reminder = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'LER',
      P_TYPE: 'OPTION',
    });

    console.log('setExpiry_reminder_Data', res);

    setExpiry_reminder_Data(res?.lookup_details);
    setIsLoading(false);
  };
  const handle_payment_reminder = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'RPR',
      P_TYPE: 'OPTION',
    });

    console.log('setPayment_reminder_Data', res);

    setPayment_reminder_Data(res?.lookup_details);
    setIsLoading(false);
  };

  const handle_rental_reminder = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'LRR',
      P_TYPE: 'OPTION',
    });

    console.log('setrental_reminder_Data', res);

    setrental_reminder_Data(res?.lookup_details);
    setIsLoading(false);
  };

  const handle_lease_term = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'RLT',
      P_TYPE: 'OPTION',
    });

    console.log('setLease_term_Data', res);

    setLease_term_Data(res?.lookup_details);
    setIsLoading(false);
  };

  const handle_lease_end = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'RENT_PAID',
      P_TYPE: 'OPTION',
    });

    console.log('handle_lease_end', res);

    setLease_end_Data(res?.lookup_details);
    setIsLoading(false);
  };
  const handleLeaseTermChange = async item => {
    try {
      setlLease_term_value(item.lookup_key);
      await calculateLeaseEndDate(selectedDate, item.lookup_key);
      setlease_term_valueError(false);
      let newFrequencies = [];
      if (item.lookup_key === 79) {
        // 2 - Month
        newFrequencies = lease_end_Data.filter(freq =>
          [500, 501, 502, 503].includes(freq.lookup_key),
        );
      } else if (item.lookup_key === 80) {
        // 6 - Month
        newFrequencies = lease_end_Data.filter(freq =>
          [500, 501, 502, 503, 504, 505].includes(freq.lookup_key),
        );
      } else if (item.lookup_key === 81) {
        // 8 - Month
        newFrequencies = lease_end_Data.filter(freq =>
          [500, 501, 502, 503, 504, 505].includes(freq.lookup_key),
        );
      } else if (item.lookup_key === 82) {
        // 10 - Month
        newFrequencies = lease_end_Data.filter(freq =>
          [500, 501, 502, 503, 504, 505].includes(freq.lookup_key),
        );
      } else if (item.lookup_key === 83) {
        // 1 - year
        newFrequencies = lease_end_Data.filter(freq =>
          [500, 501, 502, 503, 504, 505, 506].includes(freq.lookup_key),
        );
      } else if (item.lookup_key === 546) {
        // other
        newFrequencies = lease_end_Data.filter(freq =>
          [507].includes(freq.lookup_key),
        );
      }
      setFilteredFrequencies(newFrequencies);
    } catch (error) {
      console.error('Failed to handle lease term change:', error);
    }
  };

  const lease_end_render = item => {
    return (
      <ScrollView contentContainerStyle={{flex: 1, height: '100%'}}>
        <View style={AddLeaseDetailsStyle.itemView}>
          {item.lookup_key === lease_end_value.lookup_key ? (
            <AntDesign
              color={_COLORS.Kodie_GreenColor}
              name={'checkcircle'}
              size={20}
            />
          ) : (
            <Fontisto
              color={_COLORS.Kodie_GrayColor}
              name={'radio-btn-passive'}
              size={20}
            />
          )}
          <Text style={AddLeaseDetailsStyle.textItem}>
            {item.lookup_description}
          </Text>
        </View>
      </ScrollView>
    );
  };
  const lease_term_render = item => {
    return (
      <ScrollView contentContainerStyle={{flex: 1, height: '100%'}}>
        <View
          style={[
            AddLeaseDetailsStyle.itemView,
            {
              backgroundColor:
                item.lookup_key === lease_term_value
                  ? _COLORS.Kodie_MidLightGreenColor
                  : _COLORS?.Kodie_WhiteColor,
            },
          ]}>
          {item.lookup_key === lease_term_value ? (
            <AntDesign
              color={_COLORS.Kodie_GreenColor}
              name={'checkcircle'}
              size={20}
            />
          ) : (
            <Fontisto
              color={_COLORS.Kodie_GrayColor}
              name={'radio-btn-passive'}
              size={20}
            />
          )}
          <Text style={AddLeaseDetailsStyle.textItem}>
            {item.lookup_description}
          </Text>
        </View>
      </ScrollView>
    );
  };
  const notification_render = item => {
    return (
      <View style={AddLeaseDetailsStyle.itemView}>
        {item.lookup_key === notification_type_value ? (
          <AntDesign
            color={_COLORS.Kodie_GreenColor}
            name={'checkcircle'}
            size={20}
          />
        ) : (
          <Fontisto
            color={_COLORS.Kodie_GrayColor}
            name={'radio-btn-passive'}
            size={20}
          />
        )}
        <Text style={AddLeaseDetailsStyle.textItem}>
          {item.lookup_description}
        </Text>
      </View>
    );
  };
  const updateDateToNextYear = () => {
    if (selectedDate) {
      const newDate = moment(selectedDate, 'YYYY-MM-DD')
        .add(1, 'years')
        .format('YYYY-MM-DD');
      setPaymentDueDay(newDate);
    }
  };
  useEffect(() => {
    if (
      lease_end_value.lookup_key === 506 ||
      lease_end_value.lookup_key === 507
    ) {
      updateDateToNextYear();
    }
  }, [lease_end_value.lookup_key, selectedDate]);
  const calculateLeaseEndDate = (startDate, termKey) => {
    let monthsToAdd;
    switch (termKey) {
      case 79:
        monthsToAdd = 2;
        break;
      case 80:
        monthsToAdd = 6;
        break;
      case 81:
        monthsToAdd = 8;
        break;
      case 82:
        monthsToAdd = 10;
        break;
      case 83:
        monthsToAdd = 12;
        break;
      default:
        monthsToAdd = null;
    }

    if (startDate && monthsToAdd !== null) {
      const endDate = moment(startDate)
        .add(monthsToAdd, 'months')
        .format('YYYY-MM-DD');
      setSelectedEndDate(endDate);
    } else {
      setSelectedEndDate('');
    }
  };
  const disableOutOfRangeDates = day => {
    return (
      day.dateString < selectedDate || day.dateString > selectedEndDate
    );
  };
  const renderPaymentDueDayPicker = () => {
    switch (lease_end_value.lookup_key) {
      case 500:
        return (
          <View style={{flex: 1}}>
            <CalendarModal
              current={paymentDueDay}
              SelectDate={
                paymentDueDay ? paymentDueDay : 'Select payment due date'
              }
              _textInputStyle={{
                color: paymentDueDay
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_GrayColor,
              }}
              calenderIcon={toggleModalDueDay}
              minDate={selectedDate}
              maxDate={selectedEndDate}
              hideExtraDays
              onDayPress={day => {
                if (!disableOutOfRangeDates(day)) {
                  setPaymentDueDay(day.dateString);
                  setPaymentDueDayError(false);
                }
              }}
              Visible={isDueDayModalVisible}
              onRequestClose={toggleModalDueDay}
              markedDates={{
                [paymentDueDay]: {
                  selected: true,
                  selectedColor: _COLORS.Kodie_lightGreenColor,
                  selectedTextColor: _COLORS.Kodie_BlackColor,
                },
              }}
              _closeButton={toggleModalDueDay}
              _ApplyButton={toggleModalDueDay}
            />
          </View>
        );
      case 501:
        return (
          <>
            <Dropdown
              style={[
                AddLeaseDetailsStyle.dropdown,
                {flex: 1, borderRadius: 5, height: 45},
              ]}
              placeholderStyle={[
                AddLeaseDetailsStyle.placeholderStyle,
                {color: _COLORS.Kodie_LightGrayColor},
              ]}
              selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
              inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
              iconStyle={AddLeaseDetailsStyle.iconStyle}
              data={daysOfWeek}
              labelField="label"
              valueField="value"
              placeholder="Select day"
              value={paymentDueDay}
              onChange={item => {
                setPaymentDueDay(item.value);
                setPaymentDueDayError(false);
              }}
            />
          </>
        );
      case 502:
        return (
          <Dropdown
            style={[
              AddLeaseDetailsStyle.dropdown,
              {flex: 1, borderRadius: 5, height: 45},
            ]}
            placeholderStyle={[
              AddLeaseDetailsStyle.placeholderStyle,
              {color: _COLORS.Kodie_LightGrayColor},
            ]}
            selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
            inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
            iconStyle={AddLeaseDetailsStyle.iconStyle}
            data={daysOfWeek}
            labelField="label"
            valueField="value"
            placeholder="Select day"
            value={paymentDueDay}
            onChange={item => {
              setPaymentDueDay(item.value);
              setPaymentDueDayError(false);
            }}
          />
        );
      case 503:
        return (
          <Dropdown
            style={[
              AddLeaseDetailsStyle.dropdown,
              {flex: 1, borderRadius: 5, height: 45},
            ]}
            placeholderStyle={[
              AddLeaseDetailsStyle.placeholderStyle,
              {color: _COLORS.Kodie_LightGrayColor},
            ]}
            selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
            inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
            iconStyle={AddLeaseDetailsStyle.iconStyle}
            data={Array.from({length: 31}, (_, i) => ({
              label: `${i + 1}`,
              value: `${i + 1}`,
            }))}
            labelField="label"
            valueField="value"
            placeholder="Select day"
            value={paymentDueDay}
            onChange={item => {
              setPaymentDueDay(item.value);
              setPaymentDueDayError(false);
            }}
          />
        );
      case 504:
        return (
          <Dropdown
            style={[
              AddLeaseDetailsStyle.dropdown,
              {flex: 1, borderRadius: 5, height: 45},
            ]}
            placeholderStyle={[
              AddLeaseDetailsStyle.placeholderStyle,
              {color: _COLORS.Kodie_LightGrayColor},
            ]}
            selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
            inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
            iconStyle={AddLeaseDetailsStyle.iconStyle}
            data={Array.from({length: 31}, (_, i) => ({
              label: `${i + 1}`,
              value: `${i + 1}`,
            }))}
            labelField="label"
            valueField="value"
            placeholder="Select day"
            value={paymentDueDay}
            onChange={item => {
              setPaymentDueDay(item.value);
              setPaymentDueDayError(false);
            }}
          />
        );
      case 505:
        return (
          <Dropdown
            style={[
              AddLeaseDetailsStyle.dropdown,
              {flex: 1, borderRadius: 5, height: 45},
            ]}
            placeholderStyle={[
              AddLeaseDetailsStyle.placeholderStyle,
              {color: _COLORS.Kodie_LightGrayColor},
            ]}
            selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
            inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
            iconStyle={AddLeaseDetailsStyle.iconStyle}
            data={Array.from({length: 31}, (_, i) => ({
              label: `${i + 1}`,
              value: `${i + 1}`,
            }))}
            labelField="label"
            valueField="value"
            placeholder="Select day"
            value={paymentDueDay}
            onChange={item => {
              setPaymentDueDay(item.value);
              setPaymentDueDayError(false);
            }}
          />
        );
      case 506:
        return (
          <TextInput
            style={AddLeaseDetailsStyle.input}
            value={paymentDueDay}
            placeholder="Enter the rental amount"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            maxLength={5}
          />
        );
      case 507:
        return (
          <View style={{flex: 1}}>
            <CalendarModal
              // current={paymentDueDay}
              SelectDate={
                paymentDueDay ? paymentDueDay : 'Select payment due date'
              }
              _textInputStyle={{
                color: paymentDueDay
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_GrayColor,
              }}
              calenderIcon={toggleModalDueDay}
              minDate={selectedDate}
              maxDate={selectedEndDate}
              hideExtraDays
              onDayPress={day => {
                if (!disableOutOfRangeDates(day)) {
                  setPaymentDueDay(day.dateString);
                  setPaymentDueDayError(false);
                }
              }}
              Visible={isDueDayModalVisible}
              onRequestClose={toggleModalDueDay}
              markedDates={{
                [paymentDueDay]: {
                  selected: true,
                  selectedColor: _COLORS.Kodie_lightGreenColor,
                  selectedTextColor: _COLORS.Kodie_BlackColor,
                },
              }}
              _closeButton={toggleModalDueDay}
              _ApplyButton={toggleModalDueDay}
            />
          </View>
        );
      default:
        return null;
    }
  };
  return (
    <View style={AddLeaseDetailsStyle.mainContainer}>
      <View style={AddLeaseDetailsStyle.heading_View}>
        <Text style={AddLeaseDetailsStyle.heading_Text}>
          {props?.editMode === true
            ? 'Edit lease details'
            : 'Add lease details'}
        </Text>
        <View style={{alignSelf: 'center', marginTop: 5}}>
          <TouchableOpacity onPress={handlePopUp}>
            <AntDesign
              name="close"
              size={22}
              color={_COLORS.Kodie_BlackColor}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={AddLeaseDetailsStyle.card}>
          <Text style={[LABEL_STYLES.commontext]}>{'Commencement date'}
          <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
          </Text>
          <View style={AddLeaseDetailsStyle.datePickerView}>
            <CalendarModal
              SelectDate={
                selectedDate ? selectedDate : 'Start date of the lease'
              }
              _textInputStyle={{
                color: selectedDate
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_GrayColor,
              }}
              calenderIcon={toggleModal}
              onDayPress={day => {
                const selected = moment(day.dateString).format('YYYY-MM-DD');
                setSelectedDate(selected);
                handleRequestDate(day.dateString);
                if (lease_term_value) {
                  calculateLeaseEndDate(selected, lease_term_value); // Recalculate end date if lease term is already selected
                }
              }}
              onChangeText={() => handleRequestDate(selectedDate)}
              Visible={isModalVisible}
              onRequestClose={toggleModal}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: _COLORS.Kodie_lightGreenColor,
                  selectedTextColor: _COLORS.Kodie_BlackColor,
                },
              }}
              current={selectedDate}
              _closeButton={toggleModal}
              _ApplyButton={toggleModal}
            />
          </View>
          {selectedDateError ? (
            <Text style={AddLeaseDetailsStyle.error}>{selectedDateError}</Text>
          ) : null}
          <View style={AddLeaseDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Rental lease term'}
            <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
            </Text>
            <Dropdown
              style={[
                AddLeaseDetailsStyle.dropdown,
                {flex: 1, borderRadius: 5, height: 45},
              ]}
              placeholderStyle={[
                AddLeaseDetailsStyle.placeholderStyle,
                {color: _COLORS.Kodie_LightGrayColor},
              ]}
              selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
              inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
              iconStyle={AddLeaseDetailsStyle.iconStyle}
              data={lease_term_Data}
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="Select length of lease"
              value={lease_term_value}
              onChange={handleLeaseTermChange}
              renderItem={lease_term_render}
            />
          </View>
          {lease_term_valueError ? (
            <Text style={AddLeaseDetailsStyle.error}>
              {'Please select a rental lease term!'}
            </Text>
          ) : null}
          <Text style={[LABEL_STYLES.commontext, {marginTop: 12}]}>
            {'Lease end date'}
            <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
          </Text>
          <View style={AddLeaseDetailsStyle.datePickerView}>
            <CalendarModal
              SelectDate={
                selectedEndDate ? selectedEndDate : 'End date of the lease'
              }
              hideExtraDays
              current={selectedEndDate}
              _textInputStyle={{
                color: selectedEndDate
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_GrayColor,
              }}
              calenderIcon={toggleModalEndDate}
              onDayPress={handleEndDayPress}
              Visible={isModalVisibleEndDate}
              onRequestClose={toggleModalEndDate}
              markedDates={{
                [selectedEndDate]: {
                  selected: true,
                  selectedColor: _COLORS.Kodie_lightGreenColor,
                  selectedTextColor: _COLORS.Kodie_BlackColor,
                },
              }}
              _closeButton={() =>
                setModalVisibleEndDate(!isModalVisibleEndDate)
              }
              _ApplyButton={() =>
                setModalVisibleEndDate(!isModalVisibleEndDate)
              }
            />
          </View>
          <View style={AddLeaseDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Payment frequency'}
            <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
            </Text>
            <Dropdown
              style={[
                AddLeaseDetailsStyle.dropdown,
                {flex: 1, borderRadius: 5, height: 45},
              ]}
              placeholderStyle={[
                AddLeaseDetailsStyle.placeholderStyle,
                {color: _COLORS.Kodie_LightGrayColor},
              ]}
              selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
              inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
              iconStyle={AddLeaseDetailsStyle.iconStyle}
              data={filteredFrequencies}
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="How often is rent paid"
              value={lease_end_value}
              onChange={item => {
                setlLease_end_value({
                  lookup_key: item?.lookup_key,
                  lookup_description: item?.lookup_description,
                });
                setlLease_end_valueError(false);
                // alert(item.lookup_key);
              }}
              renderItem={lease_end_render}
            />
          </View>
          {lease_end_valueError ? (
            <Text style={AddLeaseDetailsStyle.error}>
              {'Please select a payment frequency!'}
            </Text>
          ) : null}
          <View style={AddLeaseDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Rental amount'}
            <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
            </Text>
            <TextInput
              style={AddLeaseDetailsStyle.input}
              value={rentalAmount}
              onChangeText={validateRentalAmount}
              onBlur={() => validateRentalAmount(rentalAmount)}
              placeholder="Enter the rental amount"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              // maxLength={5}
            />
          </View>
          {rentalAmountError ? (
            <Text style={AddLeaseDetailsStyle.error}>{rentalAmountError}</Text>
          ) : null}
          {lease_end_value.lookup_key ? (
            <View style={AddLeaseDetailsStyle.inputContainer}>
              <Text style={LABEL_STYLES.commontext}>{'Payment due day'}
              <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
              </Text>
              {renderPaymentDueDayPicker()}
            </View>
          ) : null}
          {paymentDueDayError ? (
            <Text style={AddLeaseDetailsStyle.error}>
              {'Payment due day is required!'}
            </Text>
          ) : null}
          <View style={AddLeaseDetailsStyle.probtn}>
            <View style={{flex: 1}}>
              <Text style={AddLeaseDetailsStyle.Protext}>
                Pro rata first payment
                <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
              </Text>
            </View>
            <View style={{margin: 5}} />
            {isYesSelectedId == 1 ? (
              <View style={{flex: 1}}>
                <Text style={AddLeaseDetailsStyle.Protext1}>
                  Pro rata amount
                </Text>
              </View>
            ) : null}
          </View>
          <View style={AddLeaseDetailsStyle.Twobtn}>
            <View style={AddLeaseDetailsStyle.btn_main_view}>
              <TouchableOpacity
                style={[
                  AddLeaseDetailsStyle.no_view,
                  !isYesSelected && AddLeaseDetailsStyle.selectedBtn,
                ]}
                onPress={() => {
                  handleButtonClick(false);
                  setIsYesSelectedId(0);
                }}>
                <Text style={[AddLeaseDetailsStyle.no_text]}>{'No'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  AddLeaseDetailsStyle.yes_view,
                  isYesSelected && AddLeaseDetailsStyle.selectedBtn,
                ]}
                onPress={() => {
                  handleButtonClick(true);
                  setIsYesSelectedId(1);
                }}>
                <Text style={[AddLeaseDetailsStyle.yes_text]}>{'Yes'}</Text>
              </TouchableOpacity>
            </View>
            <View style={{margin: 5}} />
            {isYesSelectedId == 1 ? (
              <View style={{flex: 1}}>
                <TextInput
                  style={AddLeaseDetailsStyle.Amountinput}
                  value={ProRate}
                  onChangeText={handleProRateAmount}
                  onBlur={() => handleProRateAmount(ProRate)}
                  placeholder="Amount"
                  placeholderTextColor="#999"
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
            ) : (
              <View style={{flex: 1}} />
            )}
          </View>
          {isYesSelected && ProRateError ? (
            <Text style={AddLeaseDetailsStyle.error}>{ProRateError}</Text>
          ) : null}
          <DividerIcon borderColor={_COLORS.Kodie_ExtraLiteGrayColor} />
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: FONTFAMILY.K_Bold,
                  color: _COLORS.Kodie_BlackColor,
                }}>
                Other lease details
              </Text>
              <TouchableOpacity
                style={AddLeaseDetailsStyle.down_Arrow_icon}
                onPress={handleShowLeaseDetailsData}>
                <Entypo
                  name={
                    showLeaseDetailsData
                      ? 'chevron-small-up'
                      : 'chevron-small-down'
                  }
                  size={22}
                  color={_COLORS.Kodie_BlackColor}
                />
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 12}}>
              Enter extra information about your lease
            </Text>
          </View>
          <DividerIcon marginBottom={8}/>
          {showLeaseDetailsData ? (
            <View>
              <View style={AddLeaseDetailsStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{'Rental bond'}</Text>
                <TextInput
                  style={AddLeaseDetailsStyle.input}
                  value={rentalBond}
                  onChangeText={setRentalBond}
                  placeholder="Enter the rental bond amount"
                  keyboardType="number-pad"
                />
              </View>
              <View style={AddLeaseDetailsStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{'Rental deposit'}</Text>
                <TextInput
                  style={AddLeaseDetailsStyle.input}
                  // value={rentalDeposit}
                  value={rentalBond}
                  onChangeText={setRentalBond}
                  // onChangeText={setRentalDeposit}
                  placeholder="Enter the rental deposit amount"
                  keyboardType="number-pad"
                />
              </View>
              <View style={AddLeaseDetailsStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Rental escalation %'}
                </Text>
                <TextInput
                  style={AddLeaseDetailsStyle.input}
                  // value={rentalEscalation}
                  value={rentalBond}
                  onChangeText={setRentalBond}
                  // onChangeText={setRentalEscalation}
                  placeholder="Period rent escalation %"
                  keyboardType="number-pad"
                />
              </View>
            </View>
          ) : null}
          <DividerIcon borderColor={_COLORS.Kodie_ExtraLiteGrayColor} />
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: FONTFAMILY.K_Bold,
                  color: _COLORS.Kodie_BlackColor,
                }}>
                Set property notifications
              </Text>
              <TouchableOpacity
                style={AddLeaseDetailsStyle.down_Arrow_icon}
                onPress={handleShowNotificationData}>
                <Entypo
                  name={
                    showNotificationData
                      ? 'chevron-small-up'
                      : 'chevron-small-down'
                  }
                  size={22}
                  color={_COLORS.Kodie_BlackColor}
                />
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 12}}>
              Select the automatic notifications you would like sent
            </Text>
          </View>
          <DividerIcon borderColor={_COLORS.Kodie_ExtraLiteGrayColor} />
          {showNotificationData ? (
            <View>
              <View style={AddLeaseDetailsStyle.inputContainer}>
                {/* <Text style={LABEL_STYLES.commontext}>
              {"Set property notifications"}
            </Text> */}
                <View style={AddLeaseDetailsStyle.notification_view}>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      AddLeaseDetailsStyle.notification_text,
                    ]}>
                    {'Set notification type'}
                  </Text>
                  <Dropdown
                    style={[
                      AddLeaseDetailsStyle.dropdown,
                      {flex: 1, borderRadius: 8, marginLeft: 45},
                    ]}
                    placeholderStyle={[
                      AddLeaseDetailsStyle.placeholderStyle,
                      {color: _COLORS.Kodie_LightGrayColor},
                    ]}
                    selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
                    inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
                    iconStyle={AddLeaseDetailsStyle.iconStyle}
                    data={notification_type_Data}
                    maxHeight={300}
                    labelField="lookup_description"
                    valueField="lookup_key"
                    placeholder="Email"
                    value={notification_type_value}
                    onChange={item => {
                      setNotification_type_value(item.lookup_key);
                      // alert(item.lookup_key);
                    }}
                    renderItem={notification_render}
                  />
                </View>
              </View>
              <View style={AddLeaseDetailsStyle.reminder_m_view}>
                <SwitchToggle
                  switchOn={toggle_expiry}
                  onPress={() => {
                    setToggle_expiry(!toggle_expiry);
                    setToggle_lease_expire(toggle_expiry ? 0 : 1);
                    // alert(toggle_lease_expire);
                  }}
                  circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
                  circleColorOn={_COLORS.Kodie_GreenColor}
                  backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
                  backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
                  containerStyle={AddLeaseDetailsStyle.toggle_con}
                  circleStyle={AddLeaseDetailsStyle.toggle_circle}
                />
                <View style={{margin: 5}} />
                <Text style={AddLeaseDetailsStyle.exp_reminder_text}>
                  {'Lease expiry reminder'}
                </Text>
                <View style={AddLeaseDetailsStyle.reminder_dropdown}>
                  <Dropdown
                    style={[
                      AddLeaseDetailsStyle.dropdown,
                      AddLeaseDetailsStyle.reminder_dropdown_sty,
                    ]}
                    placeholderStyle={[
                      AddLeaseDetailsStyle.placeholderStyle,
                      {color: _COLORS.Kodie_LightGrayColor},
                    ]}
                    selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
                    inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
                    iconStyle={AddLeaseDetailsStyle.iconStyle}
                    data={expiry_reminder_Data}
                    maxHeight={300}
                    labelField="lookup_description"
                    valueField="lookup_key"
                    placeholder="30 days"
                    value={expiry_reminder_value}
                    onChange={item => {
                      setExpiry_reminder_value(item.lookup_key);
                      // alert(item.lookup_key)
                    }}
                  />
                  <Text style={AddLeaseDetailsStyle.before}>{'before'}</Text>
                </View>
              </View>
              <View style={AddLeaseDetailsStyle.reminder_m_view}>
                <SwitchToggle
                  switchOn={toggle_payment}
                  onPress={() => {
                    setToggle_payment(!toggle_payment);
                    setToggle_rent_payment(toggle_payment ? 0 : 1);
                  }}
                  circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
                  circleColorOn={_COLORS.Kodie_GreenColor}
                  backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
                  backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
                  containerStyle={AddLeaseDetailsStyle.toggle_con}
                  circleStyle={AddLeaseDetailsStyle.toggle_circle}
                />
                <View style={{margin: 5}} />
                <Text style={AddLeaseDetailsStyle.exp_reminder_text}>
                  {'Rent payment reminder'}
                </Text>
                <View style={AddLeaseDetailsStyle.reminder_dropdown}>
                  <Dropdown
                    style={[
                      AddLeaseDetailsStyle.dropdown,
                      AddLeaseDetailsStyle.reminder_dropdown_sty,
                    ]}
                    placeholderStyle={[
                      AddLeaseDetailsStyle.placeholderStyle,
                      {color: _COLORS.Kodie_LightGrayColor},
                    ]}
                    selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
                    inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
                    iconStyle={AddLeaseDetailsStyle.iconStyle}
                    data={payment_reminder_Data}
                    maxHeight={300}
                    labelField="lookup_description"
                    valueField="lookup_key"
                    placeholder="2 days"
                    value={payment_reminder_value}
                    onChange={item => {
                      setPayment_reminder_value(item.lookup_key);
                    }}
                  />
                  <Text style={AddLeaseDetailsStyle.before}>{'before'}</Text>
                </View>
              </View>
              <View style={AddLeaseDetailsStyle.reminder_m_view}>
                <SwitchToggle
                  switchOn={toggle_rental}
                  onPress={() => {
                    setToggle_rental(!toggle_rental);
                    setToggle_late_rental(toggle_rental ? 0 : 1);
                  }}
                  circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
                  circleColorOn={_COLORS.Kodie_GreenColor}
                  backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
                  backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
                  containerStyle={AddLeaseDetailsStyle.toggle_con}
                  circleStyle={AddLeaseDetailsStyle.toggle_circle}
                />
                <View style={{margin: 5}} />
                <Text style={AddLeaseDetailsStyle.exp_reminder_text}>
                  {'Late rental reminder'}
                </Text>
                <View style={AddLeaseDetailsStyle.reminder_dropdown}>
                  <Dropdown
                    style={[
                      AddLeaseDetailsStyle.dropdown,
                      AddLeaseDetailsStyle.reminder_dropdown_sty,
                    ]}
                    placeholderStyle={[
                      AddLeaseDetailsStyle.placeholderStyle,
                      {color: _COLORS.Kodie_LightGrayColor},
                    ]}
                    selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
                    inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
                    iconStyle={AddLeaseDetailsStyle.iconStyle}
                    data={rental_reminder_Data}
                    maxHeight={300}
                    labelField="lookup_description"
                    valueField="lookup_key"
                    placeholder="2 days"
                    value={rental_reminder_value}
                    onChange={item => {
                      setrental_reminder_value(item.lookup_key);
                    }}
                  />
                  <Text style={AddLeaseDetailsStyle.after}>{'after'}</Text>
                </View>
              </View>
            </View>
          ) : null}
          <View style={AddLeaseDetailsStyle.ButtonView}>
            <TouchableOpacity
              style={[
                AddLeaseDetailsStyle.closeText,
                AddLeaseDetailsStyle.applyText,
                {
                  backgroundColor:
                    selectedOption == 'Cancel'
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                handleOptionClick('Cancel');
                handlePopUp();
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
                AddLeaseDetailsStyle.applyText,
                {
                  backgroundColor:
                    selectedOption == 'Save'
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={handlevalidUpdation}>
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  AddLeaseDetailsStyle.text,
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
