import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {AddLeaseDetailsStyle} from './AddLeaseDetailsStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {FONTFAMILY, _COLORS} from '../../../../../../Themes';
import {LABEL_STYLES} from '../../../../../../Themes/CommonStyles/CommonStyles';
import CalendarModal from '../../../../../../components/Molecules/CalenderModal/CalenderModal';
import {Dropdown} from 'react-native-element-dropdown';
import RowButtons from '../../../../../../components/Molecules/RowButtons/RowButtons';
import SwitchToggle from 'react-native-switch-toggle';
import CustomDropdown from '../../../../../../components/Molecules/CustomDropdown/CustomDropdown';
import axios from 'axios';
import {CommonLoader} from '../../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {Config} from '../../../../../../Config';
import {useDispatch, useSelector} from 'react-redux';
import DividerIcon from '../../../../../../components/Atoms/Devider/DividerIcon';
import {color} from 'react-native-reanimated';
const data = [
  {value: 0, label: 'Weekly'},
  {value: 1, label: 'Monthly'},
];
export default AddLeaseDetails = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginData...', loginData);
  // alert(loginData?.Login_details?.user_id)

  // alert(JSON.stringify(props.property_id));
  const property_id = props.property_id;
  console.log('property id in add lease Detail..', property_id);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleEndDate, setModalVisibleEndDate] = useState(false);
  const [rentalAmount, setRentalAmount] = useState(null);
  // const [rentalBond, setRentalBond] = useState(null);
  const [rentalBond, setRentalBond] = useState('');
  const [rentalDeposit, setRentalDeposit] = useState('');
  const [rentalEscalation, setRentalEscalation] = useState('');
  const [paymentDueDay, setPaymentDueDay] = useState('');
  const [selectedOption, setSelectedOption] = useState('Save');
  const [selected_frequency_Button, setSelected_frequency_Button] =
    useState(false);
  const [selected_frequency_Id, setSelected_frequency_Id] = useState(1);
  const [selected_payment_Button, setSelected_payment_Button] = useState(false);
  const [selected_payment_Id, setSelected_payment_Id] = useState(1);
  const [notification_type_Data, setNotification_type_Data] = useState([]);
  const [notification_type_value, setNotification_type_value] = useState(null);
  const [expiry_reminder_Data, setExpiry_reminder_Data] = useState([]);
  const [expiry_reminder_value, setExpiry_reminder_value] = useState(null);
  const [payment_reminder_Data, setPayment_reminder_Data] = useState([]);
  const [payment_reminder_value, setPayment_reminder_value] = useState(null);
  const [rental_reminder_Data, setrental_reminder_Data] = useState([]);
  const [rental_reminder_value, setrental_reminder_value] = useState(null);
  const [lease_term_Data, setLease_term_Data] = useState([]);
  const [lease_term_value, setlLease_term_value] = useState('');
  const [lease_end_Data, setLease_end_Data] = useState([]);
  const [lease_end_value, setlLease_end_value] = useState('');

  const [toggle_expiry, setToggle_expiry] = useState(false);
  const [toggle_lease_expire, setToggle_lease_expire] = useState(0);
  const [toggle_payment, setToggle_payment] = useState(false);
  const [toggle_rent_payment, setToggle_rent_payment] = useState(0);
  const [toggle_rental, setToggle_rental] = useState(false);
  const [toggle_late_rental, setToggle_late_rental] = useState(0);
  const [showNotificationData, setShowNotificationData] = useState(false);
  const [showLeaseDetailsData, setLeaseDetailsData] = useState(false);
  const [isYesSelected, setIsYesSelected] = useState(false);

  const handleButtonClick = isYes => {
    setIsYesSelected(isYes);
  };
  // <SwitchToggle switchOn={on} onPress={() => setOn(!on)} />;

  useEffect(() => {
    handle_notification_type();
    handle_expiry_reminder();
    handle_payment_reminder();
    handle_rental_reminder();
    handle_lease_term();
    handle_lease_end();
  }, []);

  const handleOptionClick = option => {
    setSelectedOption(option);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalEndDate = () => {
    setModalVisibleEndDate(!isModalVisibleEndDate);
  };
  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };
  const handleEndDayPress = day => {
    setSelectedEndDate(day.dateString);
  };

  const handleShowNotificationData = () => {
    setShowNotificationData(!showNotificationData);
  };
  const handleShowLeaseDetailsData = () => {
    setLeaseDetailsData(!showLeaseDetailsData);
  };
  // ----data come from dropdown and define these condition
  const handleApply = selectedOptions => {
    console.log('Clear Action');
  };
  const handleClear = () => {
    console.log('Clear Action');
  };
  const handlePopUp = () => {
    props.onClose();
  };

  const handle_add_Lease = () => {
    console.log('paymentDueDay....', paymentDueDay);
    const url = Config.BASE_URL;
    const add_Lease_url = url + 'property_lease_details/create';
    console.log('Request URL:', add_Lease_url);
    setIsLoading(true);
    console.log('selectedDate', selectedDate);
    const lease_Data = {
      user_key: loginData?.Login_details?.user_id,
      upd_key: property_id,
      commencement_date: selectedDate,
      rental_lease_term: lease_term_value,
      lease_end_date:selectedEndDate,
      rental_amount: rentalAmount,
      rental_bond_amount: rentalBond,
      rental_payment_frequency: lease_end_value,
      payment_due_day: paymentDueDay,
      pro_rata_amount:25,
      first_rental_payment: selected_payment_Id,
      rental_deposit:25000,
      rental_escalation:'20%',
      set_notification_type: notification_type_value,
      is_active: 1,
      lease_expire: toggle_lease_expire,
      rent_payment: toggle_rent_payment,
      late_rental: toggle_late_rental,
      lease_expiry_reminder: expiry_reminder_value,
      rent_payment_reminder: payment_reminder_value,
      late_rental_reminder: rental_reminder_value,
    };
    axios
      .post(add_Lease_url, lease_Data)
      .then(response => {
        console.log('API Response add_lease:', response?.data);
        if (response?.data?.success === true) {
          alert(response?.data?.message);
          handlePopUp();
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed add_Lease', error);
        setIsLoading(false);
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handle_notification_type = () => {
    const url = Config.BASE_URL;
    const notification_url = url + 'lookup_details';
    console.log('Request URL:', notification_url);
    setIsLoading(true);
    const notification_data = {
      P_PARENT_CODE: 'SNT',
      P_TYPE: 'OPTION',
    };

    axios
      .post(notification_url, notification_data)
      .then(response => {
        console.log('API Response notification_type:', response?.data);
        if (response?.data?.status === true) {
          setNotification_type_Data(response?.data?.lookup_details);
          // alert(JSON.stringify(response?.data?.lookup_details));
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed notification_type', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handle_expiry_reminder = () => {
    const url = Config.BASE_URL;
    const expiry_url = url + 'lookup_details';
    console.log('Request URL:', expiry_url);
    setIsLoading(true);
    const notification_data = {
      P_PARENT_CODE: 'LER',
      P_TYPE: 'OPTION',
    };
    axios
      .post(expiry_url, notification_data)
      .then(response => {
        console.log('API Response expiry reminder:', response?.data);
        if (response?.data?.status === true) {
          setExpiry_reminder_Data(response?.data?.lookup_details);
          // alert(JSON.stringify(response?.data?.lookup_details));
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed expiry_reminde', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handle_payment_reminder = () => {
    const url = Config.BASE_URL;
    const payment_url = url + 'lookup_details';
    console.log('Request URL:', payment_url);
    setIsLoading(true);
    const notification_data = {
      P_PARENT_CODE: 'RPR',
      P_TYPE: 'OPTION',
    };
    axios
      .post(payment_url, notification_data)
      .then(response => {
        console.log('API Response payment reminder:', response?.data);
        if (response?.data?.status === true) {
          setPayment_reminder_Data(response?.data?.lookup_details);
          // alert(JSON.stringify(response?.data?.lookup_details));
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed payment_reminder', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handle_rental_reminder = () => {
    const url = Config.BASE_URL;
    const rental_url = url + 'lookup_details';
    console.log('Request URL:', rental_url);
    setIsLoading(true);
    const notification_data = {
      P_PARENT_CODE: 'LRR',
      P_TYPE: 'OPTION',
    };
    axios
      .post(rental_url, notification_data)
      .then(response => {
        console.log('API Response rental reminder:', response?.data);
        if (response?.data?.status === true) {
          setrental_reminder_Data(response?.data?.lookup_details);
          // alert(JSON.stringify(response?.data?.lookup_details));
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed rental_reminder', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handle_lease_term = () => {
    const url = Config.BASE_URL;
    const lease_term__url = url + 'lookup_details';
    console.log('Request URL:', lease_term__url);
    setIsLoading(true);
    const lease_term_data = {
      P_PARENT_CODE: 'RLT',
      P_TYPE: 'OPTION',
    };
    axios
      .post(lease_term__url, lease_term_data)
      .then(response => {
        console.log('API Response rental lease terms:', response?.data);
        if (response?.data?.status === true) {
          setLease_term_Data(response?.data?.lookup_details);
          // alert(JSON.stringify(response?.data?.lookup_details));
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed lease_term', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handle_lease_end = () => {
    const url = Config.BASE_URL;
    const lease_end__url = url + 'lookup_details';
    console.log('Request URL:', lease_end__url);
    setIsLoading(true);
    const lease_end_data = {
      P_PARENT_CODE: 'GET_PAID',
      P_TYPE: 'OPTION',
    };
    axios
      .post(lease_end__url, lease_end_data)
      .then(response => {
        console.log('API Response rental lease terms:', response?.data);
        if (response?.data?.status === true) {
          setLease_end_Data(response?.data?.lookup_details);
          // alert(JSON.stringify(response?.data?.lookup_details));
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed lease_term', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const lease_end_render = item => {
    return (
      <ScrollView contentContainerStyle={{flex: 1, height: '100%'}}>
        <View style={AddLeaseDetailsStyle.itemView}>
          {item.lookup_key === lease_end_value ? (
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
        <View style={AddLeaseDetailsStyle.itemView}>
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
  return (
    <View style={AddLeaseDetailsStyle.mainContainer}>
      <View style={AddLeaseDetailsStyle.heading_View}>
        <Text style={AddLeaseDetailsStyle.heading_Text}>
          {'Add lease details'}
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
          <Text style={[LABEL_STYLES.commontext]}>{'Commencement date*'}</Text>
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
          <View style={AddLeaseDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Rental lease term*'}</Text>
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
              onChange={item => {
                setlLease_term_value(item.lookup_key);
                // alert(item.lookup_key);
              }}
              renderItem={lease_term_render}
            />
          </View>
          <Text style={[LABEL_STYLES.commontext, {marginTop: 12}]}>
            {'Lease end date*'}
          </Text>
          <View style={AddLeaseDetailsStyle.datePickerView}>
            <CalendarModal
              SelectDate={
                selectedEndDate ? selectedEndDate : 'End date of the lease'
              }
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
              _closeButton={toggleModalEndDate}
              _ApplyButton={toggleModalEndDate}
            />
          </View>
          <View style={AddLeaseDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Payment frequency*'}</Text>
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
              data={lease_end_Data}
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="How often is rent paid"
              value={lease_end_value}
              onChange={item => {
                setlLease_end_value(item.lookup_key);
                // alert(item.lookup_key);
              }}
              renderItem={lease_end_render}
            />
          </View>
          <View style={AddLeaseDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Rental amount*'}</Text>
            <TextInput
              style={AddLeaseDetailsStyle.input}
              value={rentalAmount}
              onChangeText={setRentalAmount}
              placeholder="Enter the rental amount"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>
          <View style={AddLeaseDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Payment due day*'}</Text>
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
              data={lease_end_Data}
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="Select day in each period rent is paid"
              value={lease_end_value}
              onChange={item => {
                setlLease_end_value(item.value);
                // alert(item.lookup_key);
              }}
              renderItem={lease_end_render}
            />
          </View>
          <View style={AddLeaseDetailsStyle.probtn}>
            <Text style={AddLeaseDetailsStyle.Protext}>Pro rata first payment*</Text>
            <Text style={AddLeaseDetailsStyle.Protext1}>Pro rata amount</Text>
          </View>
          <View style={AddLeaseDetailsStyle.Twobtn}>
            <View style={AddLeaseDetailsStyle.btn_main_view}>
              <TouchableOpacity
                style={[
                  AddLeaseDetailsStyle.no_view,
                  !isYesSelected && AddLeaseDetailsStyle.selectedBtn,
                ]}
                onPress={() => handleButtonClick(false)}>
                <Text style={[AddLeaseDetailsStyle.no_text]}>{'No'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  AddLeaseDetailsStyle.yes_view,
                  isYesSelected && AddLeaseDetailsStyle.selectedBtn,
                ]}
                onPress={() => handleButtonClick(true)}>
                <Text style={[AddLeaseDetailsStyle.yes_text]}>{'Yes'}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TextInput
                style={AddLeaseDetailsStyle.Amountinput}
                placeholder="Amount"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                maxLength={5}
              />
            </View>
          </View>
          <DividerIcon borderColor={_COLORS.Kodie_ExtraLiteGrayColor}/>
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
          {showLeaseDetailsData ? (
            <View>
              <View style={AddLeaseDetailsStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{'Rental bond'}</Text>
                <TextInput
                  style={AddLeaseDetailsStyle.input}
                  value={rentalBond}
                  onChangeText={setRentalBond}
                  placeholder="Enter the rental bond amount"
                />
              </View>
              <View style={AddLeaseDetailsStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{'Rental deposit'}</Text>
                <TextInput
                  style={AddLeaseDetailsStyle.input}
                  value={rentalDeposit}
                  onChangeText={setRentalDeposit}
                  placeholder="Enter the rental deposit amount"
                />
              </View>
              <View style={AddLeaseDetailsStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Rental escalation %'}
                </Text>
                <TextInput
                  style={AddLeaseDetailsStyle.input}
                  value={rentalEscalation}
                  onChangeText={setRentalEscalation}
                  placeholder="Period rent escalation %"
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
              onPress={() => {
                handleOptionClick('Save');
                handle_add_Lease();
              }}>
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
