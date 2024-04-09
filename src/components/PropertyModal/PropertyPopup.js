import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { PropertyModalStyle } from './PropertyModalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { _COLORS, FONTFAMILY } from '../../Themes';
import { LABEL_STYLES } from '../../Themes';
import CalendarModal from '../Molecules/CalenderModal/CalenderModal';
import {Dropdown} from 'react-native-element-dropdown';
import SwitchToggle from 'react-native-switch-toggle';
import DividerIcon from '../Atoms/Devider/DividerIcon';

const data = [
  {value: 0, label: 'Weekly'},
  {value: 1, label: 'Monthly'},
];
 const PropertyPopup = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [rentalAmount, setRentalAmount] = useState(null);
  const [lease_term_value, setlLease_term_value] = useState('');
  const [lease_end_value, setlLease_end_value] = useState('');
  const [toggle_expiry, setToggle_expiry] = useState(false);
  const [toggle_payment, setToggle_payment] = useState(false);
  const [toggle_rental, setToggle_rental] = useState(false);
  const [showNotificationData, setShowNotificationData] = useState(false);
  const [showLeaseDetailsData, setLeaseDetailsData] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Save');
  const [isModalVisibleEndDate, setModalVisibleEndDate] = useState(false);
  const handlePopUp = () => {
    // Implement your logic to handle popup close
  };

  const handleDayPress = day => {
    // Implement your logic for handling day press
  };

  const handleEndDayPress = day => {
    // Implement your logic for handling end day press
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalEndDate = () => {
    setModalVisibleEndDate(!isModalVisibleEndDate);
  };
  const handleShowLeaseDetailsData = () => {
    setLeaseDetailsData(!showLeaseDetailsData);
  };

  const handleShowNotificationData = () => {
    setShowNotificationData(!showNotificationData);
  };

  const handleOptionClick = option => {
    setSelectedOption(option);
  };

  const handle_add_Lease = () => {
    // Implement your logic for adding lease details
  };

  const lease_end_render = item => {
    return (
      <ScrollView contentContainerStyle={{flex: 1, height: '100%'}}>
        <View style={PropertyModalStyle.itemView}>
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
          <Text style={PropertyModalStyle.textItem}>
            {item.lookup_description}
          </Text>
        </View>
      </ScrollView>
    );
  };

  const lease_term_render = item => {
    return (
      <ScrollView contentContainerStyle={{flex: 1, height: '100%'}}>
        <View style={PropertyModalStyle.itemView}>
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
          <Text style={PropertyModalStyle.textItem}>
            {item.lookup_description}
          </Text>
        </View>
      </ScrollView>
    );
  };

  const notification_render = item => {
    return (
      <View style={PropertyModalStyle.itemView}>
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
        <Text style={PropertyModalStyle.textItem}>
          {item.lookup_description}
        </Text>
      </View>
    );
  };

  return (
    <View style={PropertyModalStyle.mainContainer}>
      <View style={PropertyModalStyle.heading_View}>
        <Text style={PropertyModalStyle.heading_Text}>
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
        <View style={PropertyModalStyle.card}>
          <Text style={[LABEL_STYLES.commontext]}>{'Commencement date*'}</Text>
          <View style={PropertyModalStyle.datePickerView}>
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
          <View style={PropertyModalStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Rental lease term*'}</Text>
            <Dropdown
              style={[
                PropertyModalStyle.dropdown,
                {flex: 1, borderRadius: 5, height: 45},
              ]}
              placeholderStyle={[
                PropertyModalStyle.placeholderStyle,
                {color: _COLORS.Kodie_LightGrayColor},
              ]}
              selectedTextStyle={PropertyModalStyle.selectedTextStyle}
              inputSearchStyle={PropertyModalStyle.inputSearchStyle}
              iconStyle={PropertyModalStyle.iconStyle}
              // data={lease_term_Data}
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
          <View style={PropertyModalStyle.datePickerView}>
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
          <View style={PropertyModalStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Payment frequency*'}</Text>
            <Dropdown
              style={[
                PropertyModalStyle.dropdown,
                {flex: 1, borderRadius: 5, height: 45},
              ]}
              placeholderStyle={[
                PropertyModalStyle.placeholderStyle,
                {color: _COLORS.Kodie_LightGrayColor},
              ]}
              selectedTextStyle={PropertyModalStyle.selectedTextStyle}
              inputSearchStyle={PropertyModalStyle.inputSearchStyle}
              iconStyle={PropertyModalStyle.iconStyle}
              data={lease_end_Data}
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="How often is rent paid"
              value={lease_end_value}
              onChange={item => {
                setlLease_end_value(item.value);
                // alert(item.lookup_key);
              }}
              renderItem={lease_end_render}
            />
          </View>
          <View style={PropertyModalStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{'Rental amount*'}</Text>
            <TextInput
              style={PropertyModalStyle.input}
              value={rentalAmount}
              onChangeText={setRentalAmount}
              placeholder="Enter the rental amount"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>
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
                style={PropertyModalStyle.down_Arrow_icon}
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
              <DividerIcon borderColor={_COLORS.Kodie_ExtraLiteGrayColor} />
              <View style={PropertyModalStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{'Rental bond'}</Text>
                <TextInput
                  style={PropertyModalStyle.input}
                  value={paymentDueDay}
                  onChangeText={setPaymentDueDay}
                  placeholder="Enter the rental bond amount"
                />
              </View>
              <View style={PropertyModalStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{'Rental deposit'}</Text>
                <TextInput
                  style={PropertyModalStyle.input}
                  value={paymentDueDay}
                  onChangeText={setPaymentDueDay}
                  placeholder="Enter the rental deposit amount"
                />
              </View>
              <View style={PropertyModalStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Rental escalation %'}
                </Text>
                <TextInput
                  style={PropertyModalStyle.input}
                  value={paymentDueDay}
                  onChangeText={setPaymentDueDay}
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
                style={PropertyModalStyle.down_Arrow_icon}
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
              <View style={PropertyModalStyle.inputContainer}>
                {/* <Text style={LABEL_STYLES.commontext}>
              {"Set property notifications"}
            </Text> */}
                <View style={PropertyModalStyle.notification_view}>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      PropertyModalStyle.notification_text,
                    ]}>
                    {'Set notification type'}
                  </Text>
                  <Dropdown
                    style={[
                      PropertyModalStyle.dropdown,
                      {flex: 1, borderRadius: 8, marginLeft: 45},
                    ]}
                    placeholderStyle={[
                      PropertyModalStyle.placeholderStyle,
                      {color: _COLORS.Kodie_LightGrayColor},
                    ]}
                    selectedTextStyle={PropertyModalStyle.selectedTextStyle}
                    inputSearchStyle={PropertyModalStyle.inputSearchStyle}
                    iconStyle={PropertyModalStyle.iconStyle}
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
              <View style={PropertyModalStyle.reminder_m_view}>
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
                  containerStyle={PropertyModalStyle.toggle_con}
                  circleStyle={PropertyModalStyle.toggle_circle}
                />
                <View style={{margin: 5}} />
                <Text style={PropertyModalStyle.exp_reminder_text}>
                  {'Lease expiry reminder'}
                </Text>
                <View style={PropertyModalStyle.reminder_dropdown}>
                  <Dropdown
                    style={[
                      PropertyModalStyle.dropdown,
                      PropertyModalStyle.reminder_dropdown_sty,
                    ]}
                    placeholderStyle={[
                      PropertyModalStyle.placeholderStyle,
                      {color: _COLORS.Kodie_LightGrayColor},
                    ]}
                    selectedTextStyle={PropertyModalStyle.selectedTextStyle}
                    inputSearchStyle={PropertyModalStyle.inputSearchStyle}
                    iconStyle={PropertyModalStyle.iconStyle}
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
                  <Text style={PropertyModalStyle.before}>{'before'}</Text>
                </View>
              </View>
              <View style={PropertyModalStyle.reminder_m_view}>
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
                  containerStyle={PropertyModalStyle.toggle_con}
                  circleStyle={PropertyModalStyle.toggle_circle}
                />
                <View style={{margin: 5}} />
                <Text style={PropertyModalStyle.exp_reminder_text}>
                  {'Rent payment reminder'}
                </Text>
                <View style={PropertyModalStyle.reminder_dropdown}>
                  <Dropdown
                    style={[
                      PropertyModalStyle.dropdown,
                      PropertyModalStyle.reminder_dropdown_sty,
                    ]}
                    placeholderStyle={[
                      PropertyModalStyle.placeholderStyle,
                      {color: _COLORS.Kodie_LightGrayColor},
                    ]}
                    selectedTextStyle={PropertyModalStyle.selectedTextStyle}
                    inputSearchStyle={PropertyModalStyle.inputSearchStyle}
                    iconStyle={PropertyModalStyle.iconStyle}
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
                  <Text style={PropertyModalStyle.before}>{'before'}</Text>
                </View>
              </View>
              <View style={PropertyModalStyle.reminder_m_view}>
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
                  containerStyle={PropertyModalStyle.toggle_con}
                  circleStyle={PropertyModalStyle.toggle_circle}
                />
                <View style={{margin: 5}} />
                <Text style={PropertyModalStyle.exp_reminder_text}>
                  {'Late rental reminder'}
                </Text>
                <View style={PropertyModalStyle.reminder_dropdown}>
                  <Dropdown
                    style={[
                      PropertyModalStyle.dropdown,
                      PropertyModalStyle.reminder_dropdown_sty,
                    ]}
                    placeholderStyle={[
                      PropertyModalStyle.placeholderStyle,
                      {color: _COLORS.Kodie_LightGrayColor},
                    ]}
                    selectedTextStyle={PropertyModalStyle.selectedTextStyle}
                    inputSearchStyle={PropertyModalStyle.inputSearchStyle}
                    iconStyle={PropertyModalStyle.iconStyle}
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
                  <Text style={PropertyModalStyle.after}>{'after'}</Text>
                </View>
              </View>
            </View>
          ) : null}
          <View style={PropertyModalStyle.ButtonView}>
            <TouchableOpacity
              style={[
                PropertyModalStyle.closeText,
                PropertyModalStyle.applyText,
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
                PropertyModalStyle.applyText,
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
                  PropertyModalStyle.text,
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
export default PropertyPopup;