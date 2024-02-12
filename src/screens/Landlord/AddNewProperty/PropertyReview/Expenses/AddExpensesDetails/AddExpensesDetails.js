import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {AddExpensesDetailsStyle} from './AddExpensesDetailsStyle';
import {_COLORS} from '../../../../../../Themes';
import {LABEL_STYLES} from '../../../../../../Themes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CalendarModal from '../../../../../../components/Molecules/CalenderModal/CalenderModal';
import RowButtons from '../../../../../../components/Molecules/RowButtons/RowButtons';
import {Dropdown} from 'react-native-element-dropdown';
import {CommonLoader} from '../../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {Config} from '../../../../../../Config';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {color} from 'react-native-reanimated';

const data = [
  {label: '3-month', value: '1'},
  {label: '6-month', value: '2'},
  {label: '12-month', value: '3'},
];
export default AddExpensesDetails = props => {
  //  alert(JSON.stringify(props.property_id));
  const property_id = props.property_id;
  console.log('property_id in Add details..', property_id);
  const loginData = useSelector(state => state.authenticationReducer.data);
  const [totalAmount, setTotalAmount] = useState('');
  const [totalAmountError, setTotalAmountError] = useState('');
  const [accountXcl, setAccountXcl] = useState('');
  const [tax, setTax] = useState('');
  const [suplier, setSuplier] = useState('');
  const [expenseDes, setExpenseDes] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPaidModalVisible, setPaidModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateError, setSelectedDateError] = useState('');
  const [selectedPaidDate, setSelectedPaidDate] = useState('');
  const [selectedPaidDateError, setSelectedPaidDateError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ExpenceCategoryValue, setExpenceCategoryValue] = useState('');
  const [ExpenceCategoryValueError, setExpenceCategoryValueError] =
    useState('');
  const [ExpenceCategoryData, setExpenceCategoryData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Save');
  const [selectedButtonDeposit, setSelectedButtonDeposit] = useState(false);
  const [selectedButtonRepeating, setSelectedButtonRepeating] = useState(false);
  const [selectedButtonResponsible, setSelectedButtonResponsible] =
    useState(false);
  const [selectedButtonResponsibleId, setSelectedButtonResponsibleId] =
    useState(0);
  const [selectedResponsibleData, setSelectedResponsibleData] = useState([]);
  const [selectedButtonRepeatingError, setSelectedButtonRepeatingError] =
    useState('');
  const [selectedButtonRepeatingId, setSelectedButtonRepeatingId] = useState(0);
  const [selectedButtonDepositId, setSelectedButtonDepositId] = useState(0);
  const [ExpenceResponse, setExpenceResponse] = useState([]);
  const [notes, setNotes] = useState('');

  const handleOptionClick = option => {
    setSelectedOption(option);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const togglePaidModal = () => {
    setPaidModalVisible(!isPaidModalVisible);
  };
  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };
  const handlePaidDatePress = paidDate => {
    setSelectedPaidDate(paidDate.dateString);
  };

  const handlePopUp = () => {
    props.onClose();
  };

  // Validation for Total amount........
  const validateTotalamount = text => {
    const mobileReg = /^\d{1,5}$/;
    if (text === '') {
      setTotalAmountError('Total amount is required');
    } else if (!mobileReg.test(text)) {
      setTotalAmountError('Invalid amount format');
    } else {
      setTotalAmountError('');
    }
    setTotalAmount(text);
  };

  // Validation for Due date........
  const handleduedate = text => {
    setSelectedDate(text);
    if (text.trim() === '') {
      setSelectedDateError('Due date is required.');
    } else {
      setSelectedDateError('');
    }
  };

  // Validation for Paid date........
  const handledpaiddate = text => {
    setSelectedPaidDate(text);
    if (text.trim() === '') {
      setSelectedPaidDateError('Paid date is required.');
    } else {
      setSelectedPaidDateError('');
    }
  };

  const handleDropdownChange = item => {
    if (item) {
      setExpenceCategoryValue('');
      setExpenceCategoryValueError('Please select an expense category.');
    } else {
      setExpenceCategoryValueError('');
    }
  };

  // API bind Expence Category Lookup key code here........
  const handleExpenceCategory = () => {
    const propertyData = {
      P_PARENT_CODE: 'AEC',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const propertyType = url + 'lookup_details';
    console.log('Request URL:', propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then(response => {
        console.log('property_type', response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log('Expence Category....', response.data.lookup_details);
          setExpenceCategoryData(response.data.lookup_details);
          // setProperty_value(property_Detail[0]?.property_type_id);
        } else {
          console.error('Expence_Category_error:', response.data.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Expence Category error:', error);
        // alert(error);
        setIsLoading(false);
      });
  };

  // API bind Responsible Lookup key code here.....
  const handleResponsible = () => {
    const propertyData = {
      P_PARENT_CODE: 'RESPONSIBLE FOR PAYING',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const propertyType = url + 'lookup_details';
    console.log('Request URL:', propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then(response => {
        console.log('property_type', response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log('Responsible Category....', response.data.lookup_details);
          setSelectedResponsibleData(response.data.lookup_details);
        } else {
          console.error('Responsible_Category_error:', response.data.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Responsible Category error:', error);
        setIsLoading(false);
      });
  };

  // API bind Add Expense code here.....
  const Expencehandle = () => {
    console.log(
      totalAmount,
      accountXcl,
      suplier,
      expenseDes,
      ExpenceCategoryValue,
      notes,
    );

    const ExpenceData = {
      user_key: loginData.Login_details.user_id,
      upd_key: property_id,
      total_amount: totalAmount,
      total_amount_excl_tax: accountXcl,
      tax: tax,
      due_date: selectedDate,
      repeating_expense: selectedButtonRepeatingId,
      responsible_paying: selectedButtonResponsibleId,
      expense_category: ExpenceCategoryValue,
      supplier: suplier,
      expenses_description: expenseDes,
      note: notes,
      paid: selectedButtonDepositId,
      start_date: selectedPaidDate,
      is_active: 1,
    };
    const url = Config.BASE_URL;
    const ExpenceUrl = url + 'property_expenses_details/create';
    console.log('Request URL:', ExpenceUrl);
    setIsLoading(true);

    axios
      .post(ExpenceUrl, ExpenceData)
      .then(response => {
        setExpenceResponse(response.data);
        console.log('Expence Details_data response', response.data);
        if (response.data.success === true) {
          alert(response.data.message);
          setTotalAmount('');
          setAccountXcl('');
          setTax('');
          setSelectedDate('');
          setSelectedButtonRepeatingId('');
          setSelectedButtonResponsibleId('');
          setExpenceCategoryValue('');
          setSuplier('');
          setNotes('');
          setSelectedButtonDepositId('');
          setSelectedPaidDate('');
          setExpenseDes('');
          setIsLoading(false);
          handlePopUp();
        } else {
          setEmailError(response.data.message);
          console.error('ExpenceDetail_error:', response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('ExpenceDetail error...:', error);
        setIsLoading(false);
      });
  };

  const handleSaveBtn = () => {
    if (totalAmount.trim() === '') {
      setTotalAmountError('Total amount is required.');
    } else if (selectedDate.trim() === '') {
      setSelectedDateError('Due date is required.');
    } else if (!ExpenceCategoryValue) {
      setExpenceCategoryValueError('Select Responsible Category.');
    } else if (selectedPaidDate.trim() === '') {
      setSelectedPaidDateError('Paid date is required.');
    } else {
      Expencehandle();
      setSelectedPaidDateError('');
      setSelectedDateError('');
      setSelectedPaidDateError('');
      setExpenceCategoryValueError('');
    }
  };

  useEffect(() => {
    handleExpenceCategory();
    handleResponsible();
    Expencehandle();
  }, []);
  return (
    <View style={AddExpensesDetailsStyle.mainContainer}>
      <View style={AddExpensesDetailsStyle.heading_View}>
        <Text style={AddExpensesDetailsStyle.heading_Text}>
          {'Add expense details'}
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
      <ScrollView>
        <View style={AddExpensesDetailsStyle.card}>
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Total amount*'}</Text>
            <TextInput
              style={AddExpensesDetailsStyle.input}
              value={totalAmount}
              onChangeText={setTotalAmount}
              onBlur={() => validateTotalamount(totalAmount)}
              placeholder="Enter the total amount of the expense"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={5}
            />
            <Text style={AddExpensesDetailsStyle.errorText}>
              {totalAmountError}
            </Text>
          </View>
          <View style={AddExpensesDetailsStyle.tax_main_view}>
            <View style={[AddExpensesDetailsStyle.inputContainer, {flex: 1}]}>
              <Text style={LABEL_STYLES.commontext}>
                {'Total amount (excl. tax)'}
              </Text>
              <TextInput
                style={[AddExpensesDetailsStyle.input, {flex: 1}]}
                value={accountXcl}
                onChangeText={setAccountXcl}
                placeholder="Amount excl."
                placeholderTextColor="#999"
              />
            </View>
            <View
              style={[
                AddExpensesDetailsStyle.inputContainer,
                AddExpensesDetailsStyle.Tax_input_cont,
              ]}>
              <Text style={LABEL_STYLES.commontext}>{'Tax (0.000%)'}</Text>
              <TextInput
                style={[AddExpensesDetailsStyle.input, {flex: 1}]}
                value={tax}
                onChangeText={setTax}
                placeholder="Enter tax %"
                placeholderTextColor="#999"
              />
            </View>
          </View>
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Due date*'}</Text>
            <View style={AddExpensesDetailsStyle.datePickerView}>
              <CalendarModal
                SelectDate={selectedDate ? selectedDate : 'Start Date'}
                _textInputStyle={{
                  color: selectedDate
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_GrayColor,
                }}
                calenderIcon={toggleModal}
                // onDayPress={handleDayPress}
                onDayPress={day => handleduedate(day.dateString)}
                onChangeText={() => handleduedate(selectedDate)}
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
            <Text style={AddExpensesDetailsStyle.errorText}>
              {selectedDateError}
            </Text>
          </View>

          <View style={AddExpensesDetailsStyle.addition_featureView}>
            <Text style={AddExpensesDetailsStyle.Furnished_Text}>
              {'Repeating expense?*'}
            </Text>
            <RowButtons
              LeftButtonText={'Yes'}
              leftButtonbackgroundColor={
                !selectedButtonRepeating
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selectedButtonRepeating
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selectedButtonRepeating
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelectedButtonRepeating(false);
                setSelectedButtonRepeatingId(1);
              }}
              RightButtonText={'No'}
              RightButtonbackgroundColor={
                selectedButtonRepeating
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selectedButtonRepeating
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selectedButtonRepeating
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressRightButton={() => {
                setSelectedButtonRepeating(true);
                setSelectedButtonRepeatingId(0);
              }}
            />
            <Text style={AddExpensesDetailsStyle.errorText}>
              {selectedButtonRepeatingError}
            </Text>
          </View>

          <View style={AddExpensesDetailsStyle.additiontext}>
            <Text style={AddExpensesDetailsStyle.Furnished_Text}>
              {'Who is responsible for paying for this?'}
            </Text>
            <RowButtons
              LeftButtonText={
                selectedResponsibleData[0]?.description || 'Landlord'
              }
              leftButtonbackgroundColor={
                !selectedButtonResponsible
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selectedButtonResponsible
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selectedButtonResponsible
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelectedButtonResponsible(false);
                setSelectedButtonResponsibleId(
                  selectedResponsibleData[0]?.lookup_key,
                );
              }}
              RightButtonText={
                selectedResponsibleData[1]?.description || 'Tenant'
              }
              RightButtonbackgroundColor={
                selectedButtonResponsible
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selectedButtonResponsible
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selectedButtonResponsible
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressRightButton={() => {
                setSelectedButtonResponsible(true);
                setSelectedButtonResponsibleId(
                  selectedResponsibleData[1]?.lookup_key,
                );
              }}
            />
            <Text style={AddExpensesDetailsStyle.errorText}>
              {selectedButtonRepeatingError}
            </Text>
          </View>
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Expense category*'}</Text>
            <Dropdown
              style={AddExpensesDetailsStyle.dropdown}
              placeholderStyle={[
                AddExpensesDetailsStyle.placeholderStyle,
                {color: _COLORS.Kodie_LightGrayColor},
              ]}
              selectedTextStyle={AddExpensesDetailsStyle.selectedTextStyle}
              inputSearchStyle={AddExpensesDetailsStyle.inputSearchStyle}
              iconStyle={AddExpensesDetailsStyle.iconStyle}
              data={ExpenceCategoryData}
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="Select expense category"
              value={ExpenceCategoryValue}
              onChange={item => {
                setExpenceCategoryValue(item.lookup_key);
                handleDropdownChange();
              }}
            />
            <Text style={AddExpensesDetailsStyle.errorText}>
              {ExpenceCategoryValueError}
            </Text>
          </View>

          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Supplier'}</Text>
            <TextInput
              style={AddExpensesDetailsStyle.input}
              value={suplier}
              onChangeText={setSuplier}
              placeholder="Enter supplier’s name"
              placeholderTextColor="#999"
            />
          </View>
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Expense description'}</Text>
            <TextInput
              style={AddExpensesDetailsStyle.input}
              value={expenseDes}
              onChangeText={setExpenseDes}
              placeholder="Create a description for your expense"
              placeholderTextColor="#999"
            />
          </View>

          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Notes'}</Text>
            <TextInput
              style={[AddExpensesDetailsStyle.input, {height: 100}]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Enter any notes about your expense"
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={'top'}
            />
          </View>
          <View style={AddExpensesDetailsStyle.addition_featureView}>
            <Text style={AddExpensesDetailsStyle.Furnished_Text}>
              {'Mark as paid?'}
            </Text>
            <RowButtons
              LeftButtonText={'Yes'}
              leftButtonbackgroundColor={
                !selectedButtonDeposit
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selectedButtonDeposit
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selectedButtonDeposit
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelectedButtonDeposit(false);
                setSelectedButtonDepositId(0);
              }}
              RightButtonText={'No'}
              RightButtonbackgroundColor={
                selectedButtonDeposit
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selectedButtonDeposit
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selectedButtonDeposit
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressRightButton={() => {
                setSelectedButtonDeposit(true);
                setSelectedButtonDepositId(1);
              }}
            />
          </View>

          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Paid date*'}</Text>
            <View style={AddExpensesDetailsStyle.datePickerView}>
              <CalendarModal
                SelectDate={selectedPaidDate ? selectedPaidDate : 'Start Date'}
                _textInputStyle={{
                  color: selectedPaidDate
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_GrayColor,
                }}
                calenderIcon={togglePaidModal}
                // onDayPress={handlePaidDatePress}
                onDayPress={paidDate => handledpaiddate(paidDate.dateString)}
                onChangeText={() => handledpaiddate(selectedPaidDate)}
                Visible={isPaidModalVisible}
                onRequestClose={togglePaidModal}
                markedDates={{
                  [selectedPaidDate]: {
                    selected: true,
                    selectedColor: _COLORS.Kodie_lightGreenColor,
                    selectedTextColor: _COLORS.Kodie_BlackColor,
                  },
                }}
                _closeButton={togglePaidModal}
                _ApplyButton={togglePaidModal}
              />
            </View>
            <Text style={AddExpensesDetailsStyle.errorText}>
              {selectedPaidDateError}
            </Text>
          </View>
          <View style={AddExpensesDetailsStyle.ButtonView}>
            <TouchableOpacity
              style={[
                AddExpensesDetailsStyle.closeText,
                AddExpensesDetailsStyle.applyText,
                {
                  backgroundColor:
                    selectedOption == 'Cancel'
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                handlePopUp();
                handleOptionClick('Cancel');
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
                AddExpensesDetailsStyle.applyText,
                {
                  backgroundColor:
                    selectedOption == 'Save'
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                handleSaveBtn();
                handleOptionClick('Save');
              }}>
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  AddExpensesDetailsStyle.text,

                  {
                    color:
                      selectedOption == 'Save'
                        ? _COLORS.Kodie_WhiteColor
                        : null,
                  },
                ]}>
                {'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
