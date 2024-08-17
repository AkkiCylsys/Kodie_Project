import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {LogrentalPaymentStyle} from './LogrentalpaymentStyle';
import {_COLORS, LABEL_STYLES} from '../../../../../../Themes';
import {Dropdown} from 'react-native-element-dropdown';
import CalendarModal from '../../../../../../components/Molecules/CalenderModal/CalenderModal';
import RowButtons from '../../../../../../components/Molecules/RowButtons/RowButtons';
import {CommonLoader} from '../../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import axios from 'axios';
import {Config} from '../../../../../../Config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
const data = [
  {label: '3-month', value: '1'},
  {label: '6-month', value: '2'},
  {label: '12-month', value: '3'},
];
const Logrentalpayment = props => {
  //   console.log("lease_keys...", props.lease_keys);
  //   alert(JSON.stringify(props.lease_keys));
  const lease_keys = props.lease_keys;
  const property_id = props.property_id;
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('lease_keys in log rental payment...', loginData);
  const [isLoading, setIsLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState('');
  const [totalAmountError, setTotalAmountError] = useState('');
  const [paymentTypeData, setPaymentTypeData] = useState([]);
  const [paymentTypeValue, setPaymentTypeValue] = useState('');
  const [paymentTypeError, setPaymentTypeError] = useState(false);
  const [notes, setNotes] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisiblepayment, setModalVisiblepayment] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateError, setSelectedDateError] = useState('');
  const [selectedpaymetPeriod, setSelectedpaymetPeriod] = useState('');
  const [selectedpaymetPeriodError, setSelectedpaymetPeriodError] =
    useState('');
  const [value, setValue] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Save');
  const [selected_payment_period_Button, setSelected_payment_period_Button] =
    useState(false);
  const [selected_payment_period_Id, setSelected_payment_period_Id] =
    useState(0);
  const [selected_payment_skipped_Button, setSelected_payment_skipped_Button] =
    useState(false);
  const [selected_payment_skipped_Id, setSelected_payment_skipped_Id] =
    useState(0);
  const [selected_Create_rental_Button, setSelected_Create_rental_Button] =
    useState(false);
  const [selected_Create_rental_Id, setSelected_Create_rental_Id] = useState(0);

  useEffect(() => {
    handlePaymentType();
  }, []);

  const handleOptionClick = option => {
    setSelectedOption(option);
    handlePopUp();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalpayment = () => {
    setModalVisiblepayment(!isModalVisiblepayment);
  };

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };
  const handlepaymentPeriodDate = payment_period => {
    setSelectedpaymetPeriod(payment_period.dateString);
  };

  const handlePopUp = () => {
    props.onClose();
  };

  const handleSaveBtn = () => {
    if (paymentTypeValue === '') {
      setPaymentTypeError('Payment type is required!');
    } else if (totalAmount.trim() === '' || !totalAmount.startsWith('$')) {
      setTotalAmountError('Total amount is required!');
    } else if (selectedDate.trim() === '') {
      setSelectedDateError('Payment date is required!');
    } else if (selectedpaymetPeriod.trim() === '') {
      setSelectedpaymetPeriodError('Rental payment period is required!');
    } else {
      handle_rental_payment();
    }
  };

  const handleTotalAmount = text => {
    let formattedText = text.replace(/^\$/, '').trim();
    if (formattedText === '') {
      setTotalAmountError('Total amount is required!');
    } else {
      formattedText = '$' + formattedText;
      setTotalAmountError('');
    }
    setTotalAmount(formattedText);
  };
  const handlePaymentDate = text => {
    setSelectedDate(text);
    if (text.trim() === '') {
      setSelectedDateError('Payment date is required!');
    } else {
      setSelectedDateError('');
    }
  };
  const handlePaymentPeriod = text => {
    setSelectedpaymetPeriod(text);
    if (text.trim() === '') {
      setSelectedpaymetPeriodError('Payment period is required!');
    } else {
      setSelectedpaymetPeriodError('');
    }
  };

  // rendert item..
  const PaymentTypeRender = item => {
    return (
      <View style={LogrentalPaymentStyle.itemView}>
        {item.lookup_key === paymentTypeValue ? (
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
        <Text style={LogrentalPaymentStyle.textItem}>
          {item.lookup_description}
        </Text>
      </View>
    );
  };

  const handlePaymentType = () => {
    const url = Config.BASE_URL;
    const PaymentType__url = url + 'lookup_details';
    console.log('Request URL:', PaymentType__url);
    setIsLoading(true);
    const PaymentType_data = {
      P_PARENT_CODE: 'PAYMENT_TYPE',
      P_TYPE: 'OPTION',
    };
    axios
      .post(PaymentType__url, PaymentType_data)
      .then(response => {
        console.log('API Response PaymentType', response?.data);
        if (response?.data?.status === true) {
          setPaymentTypeData(response?.data?.lookup_details);
          console.log(
            'PaymentType data ......',
            response?.data?.lookup_details,
          );
          // alert(JSON.stringify(response?.data?.lookup_details));
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed PaymentType', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handle_rental_payment = () => {
    const url = Config.BASE_URL;
    const rental_payment_url = url + 'create/paymentlog';
    console.log('Request URL:', rental_payment_url);
    setIsLoading(true);
    const rental_payment_Data = {
      p_LEASE_KEY: lease_keys,
      p_UPD_KEY: property_id,
      p_TOTAL_AMOUNT: totalAmount,
      p_PAYMENT_TYPE: paymentTypeValue,
      p_PAYMENT_DATE: selectedDate,
      p_RENTAL_PAYMENT_PERIOD: selectedpaymetPeriod,
      p_PAYMENT_PERIOD_COMPLETE: selected_payment_period_Id,
      p_PAYMENT_PERIOD_SKIPPED: selected_payment_skipped_Id,
      p_CREATE_RENTAL_RECEIPT: selected_Create_rental_Id,
      p_NOTE: notes,
      p_PLD_DEPOSIT_METHOD: '',
      p_CREATED_BY: loginData?.Login_details?.user_account_id,
    };
    console.log(rental_payment_Data, 'rental_payment_Data.....');
    axios
      .post(rental_payment_url, rental_payment_Data)
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
        console.error('API failed rental_payment', error);
        setIsLoading(false);
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={LogrentalPaymentStyle.mainContainer}>
      <ScrollView>
        <View style={LogrentalPaymentStyle.heading_View}>
          <Text style={LogrentalPaymentStyle.heading_Text}>
            {'Log rental payment'}
          </Text>
          <TouchableOpacity onPress={handlePopUp}>
            <AntDesign
              name="close"
              size={22}
              color={_COLORS.Kodie_BlackColor}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>
        <View style={LogrentalPaymentStyle.card}>
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Payment type'}
            <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
            </Text>
            <Dropdown
              style={[
                LogrentalPaymentStyle.dropdown,
                {flex: 1, borderRadius: 5, height: 45},
              ]}
              placeholderStyle={[
                LogrentalPaymentStyle.placeholderStyle,
                {color: _COLORS.Kodie_LightGrayColor},
              ]}
              selectedTextStyle={LogrentalPaymentStyle.selectedTextStyle}
              inputSearchStyle={LogrentalPaymentStyle.inputSearchStyle}
              iconStyle={LogrentalPaymentStyle.iconStyle}
              data={paymentTypeData}
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="Payment Type"
              value={paymentTypeValue}
              onChange={item => {
                setPaymentTypeValue(item.lookup_key);
                // alert(item.lookup_key);
                setPaymentTypeError(false);
              }}
              renderItem={PaymentTypeRender}
            />
          </View>
          {paymentTypeError ? (
            <Text style={LogrentalPaymentStyle.error_text}>
              {'Payment type is required!'}
            </Text>
          ) : null}
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Total amount'}
            <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
            </Text>
            <TextInput
              style={LogrentalPaymentStyle.input}
              value={totalAmount}
              onChangeText={handleTotalAmount} // Apply formatting on text change
              onBlur={() => handleTotalAmount(totalAmount)}
              placeholder="Enter the total amount of the expense"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              keyboardType="number-pad"
              maxLength={10} // Adjust length based on your needs
            />
          </View>
          {totalAmountError ? (
            <Text style={LogrentalPaymentStyle.error_text}>
              {totalAmountError}
            </Text>
          ) : null}
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Payment date'}
            <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
            </Text>
            <View style={LogrentalPaymentStyle.datePickerView}>
              <CalendarModal
                current={selectedDate}
                SelectDate={
                  selectedDate ? selectedDate : 'Date of rental payment'
                }
                _textInputStyle={{
                  color: selectedDate
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_GrayColor,
                }}
                calenderIcon={toggleModal}
                // onDayPress={handleDayPress}
                onDayPress={day => handlePaymentDate(day.dateString)}
                Visible={isModalVisible}
                onRequestClose={toggleModal}
                onChangeText={() => handlePaymentDate(selectedDate)}
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
          </View>
          {selectedDateError ? (
            <Text style={LogrentalPaymentStyle.error_text}>
              {selectedDateError}
            </Text>
          ) : null}
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {'Rental payment period'}
              <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
            </Text>
            <View style={LogrentalPaymentStyle.datePickerView}>
              <CalendarModal
                current={selectedpaymetPeriod}
                SelectDate={
                  selectedpaymetPeriod ? selectedpaymetPeriod : 'Week 2 August '
                }
                _textInputStyle={{
                  color: selectedpaymetPeriod
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_GrayColor,
                }}
                calenderIcon={toggleModalpayment}
                // onDayPress={handlepaymentPeriodDate}
                onDayPress={payment_period =>
                  handlePaymentPeriod(payment_period.dateString)
                }
                onChangeText={() => handlePaymentPeriod(selectedpaymetPeriod)}
                Visible={isModalVisiblepayment}
                onRequestClose={toggleModalpayment}
                markedDates={{
                  [selectedpaymetPeriod]: {
                    selected: true,
                    selectedColor: _COLORS.Kodie_lightGreenColor,
                    selectedTextColor: _COLORS.Kodie_BlackColor,
                  },
                }}
                _closeButton={toggleModalpayment}
                _ApplyButton={toggleModalpayment}
              />
            </View>
            {selectedpaymetPeriodError ? (
              <Text style={LogrentalPaymentStyle.error_text}>
                {selectedpaymetPeriodError}
              </Text>
            ) : null}
          </View>
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {'Payment period complete'}
            </Text>
            <RowButtons
              LeftButtonText={'Yes'}
              leftButtonbackgroundColor={
                !selected_payment_period_Button
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selected_payment_period_Button
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selected_payment_period_Button
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelected_payment_period_Button(false);
                setSelected_payment_period_Id(1);
                // alert(selected_payment_period_Id);
              }}
              RightButtonText={'No'}
              RightButtonbackgroundColor={
                selected_payment_period_Button
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selected_payment_period_Button
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selected_payment_period_Button
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressRightButton={() => {
                setSelected_payment_period_Button(true);
                setSelected_payment_period_Id(0);
                // alert(selected_payment_period_Id);
              }}
            />
          </View>
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {'Payment period skipped'}
            </Text>
            <RowButtons
              LeftButtonText={'Yes'}
              leftButtonbackgroundColor={
                !selected_payment_skipped_Button
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selected_payment_skipped_Button
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selected_payment_skipped_Button
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelected_payment_skipped_Button(false);
                setSelected_payment_skipped_Id(1);
                // alert(selected_payment_skipped_Id);
              }}
              RightButtonText={'No'}
              RightButtonbackgroundColor={
                selected_payment_skipped_Button
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selected_payment_skipped_Button
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selected_payment_skipped_Button
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressRightButton={() => {
                setSelected_payment_skipped_Button(true);
                setSelected_payment_skipped_Id(0);
                // alert(selected_payment_skipped_Id);
              }}
            />
          </View>
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {'Create rental receipt'}
            </Text>
            <RowButtons
              LeftButtonText={'Yes'}
              leftButtonbackgroundColor={
                !selected_Create_rental_Button
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selected_Create_rental_Button
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selected_Create_rental_Button
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelected_Create_rental_Button(false);
                setSelected_Create_rental_Id(1);
              }}
              RightButtonText={'No'}
              RightButtonbackgroundColor={
                selected_Create_rental_Button
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selected_Create_rental_Button
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selected_Create_rental_Button
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressRightButton={() => {
                setSelected_Create_rental_Button(true);
                setSelected_Create_rental_Id(0);
              }}
            />
          </View>
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Notes'}</Text>
            <TextInput
              style={[LogrentalPaymentStyle.input, {height: 100}]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Enter any notes about your expense"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              multiline
              numberOfLines={5}
              textAlignVertical={'top'}
            />
          </View>

          <View style={LogrentalPaymentStyle.ButtonView}>
            <TouchableOpacity
              style={[
                LogrentalPaymentStyle.closeText,
                LogrentalPaymentStyle.applyText,
                {
                  backgroundColor:
                    selectedOption == 'cancel'
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                handleOptionClick('cancel');
              }}>
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  {
                    color:
                      selectedOption == 'cancel'
                        ? _COLORS.Kodie_WhiteColor
                        : null,
                  },
                ]}>
                {'Cancel'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                LogrentalPaymentStyle.applyText,
                {
                  backgroundColor:
                    selectedOption == 'Save'
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                // handleOptionClick("Save");
                handleSaveBtn();
              }}>
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  LogrentalPaymentStyle.text,
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

export default Logrentalpayment;
