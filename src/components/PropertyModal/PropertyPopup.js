import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
} from 'react-native';
import {PropertyPopupStyle} from './PropertyPopupStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dropdown} from 'react-native-element-dropdown';
import SwitchToggle from 'react-native-switch-toggle';
import CalendarModal from '../Molecules/CalenderModal/CalenderModal';
import {IMAGES, LABEL_STYLES} from '../../Themes';
import {_COLORS} from '../../Themes';
import CustomSingleButton from '../Atoms/CustomButton/CustomSingleButton';
import {CommonLoader} from '../Molecules/ActiveLoader/ActiveLoader';
import {useSelector} from 'react-redux';
import {Config} from '../../Config';
import Fontisto from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import {SignupLookupDetails} from '../../APIs/AllApi';
const PropertyPopup = props => {
  const [selectedCommDate, setselectedCommDate] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [listPrice, setListPrice] = useState(0);
  const [rentalBond, setRentalBond] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [on, setOn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [kodieDurationData, setkodieDurationData] = useState([]);
  const [duration_value, setDuration_value] = useState(null);
  const [notification_type_Data, setNotification_type_Data] = useState([]);
  const [notification_type_value, setNotification_type_value] = useState(null);
  const [Toggle_open, setToggle_open] = useState(false);
  const [toggle_Bid_Open, settoggle_Bid_Open] = useState(0);
  const [open_reminder_Data, setopen_reminder_Data] = useState([]);
  const [open_reminder_Value, setopen_reminder_Value] = useState(null);
  const [Close_reminder_Data, setClose_reminder_Data] = useState([]);
  const [Close_reminder_Value, setClose_reminder_Value] = useState(null);
  const [Newbid, setNewbid] = useState([]);
  const [Newbid_Value, setNewbid_Value] = useState(null);
  const [toggle_close, settoggle_close] = useState(false);
  const [toggle_Bid_Close, settoggle_Bid_Close] = useState(0);
  const [toggle_rental, setToggle_rental] = useState(false);
  const [toggle_New_bid, settoggle_New_bid] = useState(0);
  const [BidData, setBidData] = useState([]);
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [bidResponse, setBidResponse] = useState({});
  const propertyId = props.propertyId;
  const loginData = useSelector(state => state.authenticationReducer.data);
  <SwitchToggle switchOn={on} onPress={() => setOn(!on)} />;
  useEffect(() => {
    handle_notification_type();
    handle_Open_reminder();
    handle_Close_reminder();
    handle_NewBid_reminder();
    handle_duration();
  }, []);

  const handleOptionClick = option => {
    setSelectedOption(option);
    handleClosePopup();
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleDayPress = day => {
    setselectedCommDate(day.dateString);
    setShowValidation(false);
  };
  const handleSaveClick = () => {
    setIsSaveClicked(true);
    props.saveClicked(300);
  };
  const handleClosePopup = () => {
    props.onClose();
  };
  const handleSave = () => {
    if (!selectedCommDate) {
      setShowValidation(true);
    } else {
      handle_addlease_Bid();
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().slice(0, 10); // Get YYYY-MM-DD part
    const time = now.toTimeString().split(' ')[0]; // Get HH:MM:SS part
    return `${date} ${time}`;
  };

  const currentTime = new Date().toTimeString().split(' ')[0];
  const currentDateTime = getCurrentDateTime();
  const commencementDate = selectedCommDate
    ? `${selectedCommDate} ${currentTime}`
    : currentDateTime;
  const handle_addlease_Bid = () => {
    const url = Config.BASE_URL;
    const add_Bid_url = `${url}property_market_place_enable_bidding`;
    console.log('Request URL:', add_Bid_url);
    setIsLoading(true);
    const currentDate = new Date().toISOString().slice(0, 10);
    const Bid_Data = {
      user_id: loginData?.Login_details?.user_id,
      account_id: loginData?.Login_details?.user_account_id,
      property_id: propertyId,
      commencement_date: commencementDate,
      duration: duration_value,
      list_price: listPrice,
      auto_threshold: rentalBond,
      notif_type: notification_type_value,
      bid_open_reminder: toggle_Bid_Open,
      bid_open_day: open_reminder_Value,
      bid_open_before: '0',
      bid_close_reminder: toggle_Bid_Close,
      bid_close_day: Close_reminder_Value,
      bid_close_before: '0',
      new_bid: toggle_New_bid,
      new_bid_days: Newbid_Value,
      new_bid_before: '0',
    };
    console.log("Bid_Data payload...",Bid_Data)
    axios
      .post(add_Bid_url, Bid_Data)
      .then(response => {
        // console.log('API Response add_bid:', response?.data);
        setBidData(response?.data);
        if (response?.data?.success === true) {
          handleSaveClick();
          setBidResponse(response?.data);
        } else {
          // Alert.alert('Bid inserted', response?.data?.message);
        }
      })
      .catch(error => {
        console.error('API failed in add_Bid', error);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handle_duration = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'BID_DURATION',
      P_TYPE: 'OPTION',
    });

    console.log('kodie_duration_data', res);

    setkodieDurationData(res?.lookup_details);
    setIsLoading(false);
  };
  const handle_notification_type = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'SNT',
      P_TYPE: 'OPTION',
    });
    setNotification_type_Data(res?.lookup_details);
    setIsLoading(false);
  };
  const handle_Open_reminder = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'LER',
      P_TYPE: 'OPTION',
    });


    setopen_reminder_Data(res?.lookup_details);
    setIsLoading(false);
  };
  const handle_Close_reminder = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'RPR',
      P_TYPE: 'OPTION',
    });
    setClose_reminder_Data(res?.lookup_details);
    setIsLoading(false);
  };
  const handle_NewBid_reminder = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'NEW_BID',
      P_TYPE: 'OPTION',
    });
    setNewbid(res?.lookup_details);
    setIsLoading(false);
  };
  const handlePriceChange = text => {
    if (text && text[0] !== '$') {
      setListPrice(`$ ${text}`);
    } else {
      setListPrice(text);
    }
  };
  const handleBondChange = text => {
    if (text && text[0] !== '$') {
      setRentalBond(`$ ${text}`);
    } else {
      setRentalBond(text);
    }
  };
  const notification_render = item => {
    return (
      <View
        style={[
          PropertyPopupStyle.itemView,
          {
            backgroundColor:
              item.lookup_key === notification_type_value
                ? _COLORS.Kodie_MidLightGreenColor
                : null,
          },
        ]}>
        {item.lookup_key === notification_type_value ? (
          <Fontisto
            color={_COLORS.Kodie_GreenColor}
            name={'radio-btn-active'}
            size={20}
          />
        ) : (
          <Fontisto
            color={_COLORS.Kodie_GrayColor}
            name={'radio-btn-passive'}
            size={20}
          />
        )}
        <Text style={PropertyPopupStyle.textItem}>
          {item.lookup_description}
        </Text>
      </View>
    );
  };
  const Durantion_render = item => {
    return (
      <View
        style={[
          PropertyPopupStyle.itemView,
          {
            backgroundColor:
              item.lookup_key === duration_value
                ? _COLORS.Kodie_MidLightGreenColor
                : null,
          },
        ]}>
        {item.lookup_key === duration_value ? (
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
        <Text style={PropertyPopupStyle.textItem}>
          {item.lookup_description}
        </Text>
      </View>
    );
  };

  return (
    <>
      {!isSaveClicked ? (
        <View style={PropertyPopupStyle.mainContainer}>
          <View style={PropertyPopupStyle.heading_View}>
            <Text style={PropertyPopupStyle.heading_Text}>
              {'Add lease bidding details'}
            </Text>
            <TouchableOpacity onPress={handleClosePopup}>
              <AntDesign
                name="close"
                size={22}
                color={_COLORS.Kodie_BlackColor}
                style={{alignSelf: 'center', marginTop: 8}}
              />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={PropertyPopupStyle.card}>
              <Text style={LABEL_STYLES.commontext}>
                {'Bidding commencement date'}
                <Text style={{color: _COLORS?.Kodie_redColor}}>*</Text>
              </Text>
              <View style={PropertyPopupStyle.datePickerView}>
                <CalendarModal
                  current={selectedCommDate}
                  SelectDate={
                    selectedCommDate ? selectedCommDate : 'Start Date'
                  }
                  _textInputStyle={{
                    color: selectedCommDate
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_GrayColor,
                  }}
                  calenderIcon={toggleModal}
                  onDayPress={handleDayPress}
                  Visible={isModalVisible}
                  onRequestClose={toggleModal}
                  markedDates={{
                    [selectedCommDate]: {
                      selected: true,
                      selectedColor: _COLORS.Kodie_lightGreenColor,
                      selectedTextColor: _COLORS.Kodie_BlackColor,
                    },
                  }}
                  _closeButton={toggleModal}
                  _ApplyButton={toggleModal}
                />
              </View>

              {showValidation && (
                <Text style={{color: 'red'}}>Please select a date!</Text>
              )}
              <View style={PropertyPopupStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{'Bidding period'}</Text>
                <Dropdown
                  style={PropertyPopupStyle.dropdown1}
                  placeholderStyle={[
                    PropertyPopupStyle.placeholderStyle,
                    {color: _COLORS.Kodie_LightGrayColor},
                  ]}
                  selectedTextStyle={PropertyPopupStyle.selectedTextStyle}
                  inputSearchStyle={PropertyPopupStyle.inputSearchStyle}
                  iconStyle={PropertyPopupStyle.iconStyle}
                  data={kodieDurationData}
                  maxHeight={300}
                  labelField="lookup_description"
                  valueField="lookup_key"
                  placeholder="3 days"
                  value={duration_value}
                  onChange={item => {
                    setDuration_value(item.lookup_key);
                  }}
                  renderItem={Durantion_render}
                />
              </View>
              <View style={PropertyPopupStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{'Minimum price'}</Text>
                <TextInput
                  style={PropertyPopupStyle.input}
                  value={listPrice}
                  onChangeText={handlePriceChange}
                  placeholder="Enter the starting bid amount"
                  placeholderTextColor="#D9D9D9"
                  keyboardType="number-pad"
                />
              </View>
              <View style={PropertyPopupStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Auto-accept threshold'}
                </Text>
                <TextInput
                  style={PropertyPopupStyle.input}
                  value={rentalBond}
                  onChangeText={handleBondChange}
                  placeholder="The amount which you are prepared to accept"
                  placeholderTextColor="#D9D9D9"
                  keyboardType="number-pad"
                />
              </View>
              <View style={PropertyPopupStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Set bid notifications'}
                </Text>
                <View style={PropertyPopupStyle.notification_view}>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      PropertyPopupStyle.notification_text,
                    ]}>
                    {'Set notification type'}
                  </Text>
                  <Dropdown
                    style={[
                      PropertyPopupStyle.dropdown,
                      {flex: 1, borderRadius: 8, marginLeft: 45},
                    ]}
                    placeholderStyle={[
                      PropertyPopupStyle.placeholderStyle,
                      {color: _COLORS.Kodie_LightGrayColor},
                    ]}
                    selectedTextStyle={PropertyPopupStyle.selectedTextStyle}
                    inputSearchStyle={PropertyPopupStyle.inputSearchStyle}
                    iconStyle={PropertyPopupStyle.iconStyle}
                    data={notification_type_Data}
                    maxHeight={300}
                    labelField="lookup_description"
                    valueField="lookup_key"
                    placeholder="Email"
                    value={notification_type_value}
                    onChange={item => {
                      setNotification_type_value(item.lookup_key);
                    }}
                    renderItem={notification_render}
                  />
                </View>

                <View style={PropertyPopupStyle.reminder_m_view}>
                  <SwitchToggle
                    switchOn={Toggle_open}
                    onPress={() => {
                      setToggle_open(!Toggle_open);
                      settoggle_Bid_Open(Toggle_open ? 0 : 1);
                    }}
                    circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
                    circleColorOn={_COLORS.Kodie_GreenColor}
                    backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
                    backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
                    containerStyle={PropertyPopupStyle.toggle_con}
                    circleStyle={PropertyPopupStyle.toggle_circle}
                  />
                  <Text style={PropertyPopupStyle.exp_reminder_text}>
                    {'Bidding open reminder'}
                  </Text>
                  <View style={PropertyPopupStyle.reminder_dropdown}>
                    <Dropdown
                      style={[
                        PropertyPopupStyle.dropdown,
                        PropertyPopupStyle.reminder_dropdown_sty,
                      ]}
                      placeholderStyle={[
                        PropertyPopupStyle.placeholderStyle,
                        {color: _COLORS.Kodie_LightGrayColor},
                      ]}
                      selectedTextStyle={PropertyPopupStyle.selectedTextStyle}
                      inputSearchStyle={PropertyPopupStyle.inputSearchStyle}
                      iconStyle={PropertyPopupStyle.iconStyle}
                      data={open_reminder_Data}
                      maxHeight={300}
                      labelField="lookup_description"
                      valueField="lookup_key"
                      placeholder="30 days"
                      value={open_reminder_Value}
                      onChange={item => {
                        setopen_reminder_Value(item.lookup_key);
                      }}
                      disabled={!Toggle_open} // Disable dropdown if Toggle_open is false
                    />
                    <Text style={PropertyPopupStyle.before}>{'before'}</Text>
                  </View>
                </View>
                <View style={PropertyPopupStyle.reminder_m_view}>
                  <SwitchToggle
                    switchOn={toggle_close}
                    onPress={() => {
                      settoggle_close(!toggle_close);
                      settoggle_Bid_Close(toggle_close ? 0 : 1);
                    }}
                    circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
                    circleColorOn={_COLORS.Kodie_GreenColor}
                    backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
                    backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
                    containerStyle={PropertyPopupStyle.toggle_con}
                    circleStyle={PropertyPopupStyle.toggle_circle}
                  />
                  <Text style={PropertyPopupStyle.exp_reminder_text}>
                    {'Bidding close reminder'}
                  </Text>
                  <View style={PropertyPopupStyle.reminder_dropdown}>
                    <Dropdown
                      style={[
                        PropertyPopupStyle.dropdown,
                        PropertyPopupStyle.reminder_dropdown_sty,
                      ]}
                      placeholderStyle={[
                        PropertyPopupStyle.placeholderStyle,
                        {color: _COLORS.Kodie_LightGrayColor},
                      ]}
                      selectedTextStyle={PropertyPopupStyle.selectedTextStyle}
                      inputSearchStyle={PropertyPopupStyle.inputSearchStyle}
                      iconStyle={PropertyPopupStyle.iconStyle}
                      data={Close_reminder_Data}
                      maxHeight={300}
                      labelField="lookup_description"
                      valueField="lookup_key"
                      placeholder="2 days"
                      value={Close_reminder_Value}
                      onChange={item => {
                        setClose_reminder_Value(item.lookup_key);
                      }}
                    />
                    <Text style={PropertyPopupStyle.before}>{'before'}</Text>
                  </View>
                </View>
                <View style={PropertyPopupStyle.reminder_m_view}>
                  <SwitchToggle
                    switchOn={toggle_rental}
                    onPress={() => {
                      setToggle_rental(!toggle_rental);
                      settoggle_New_bid(toggle_rental ? 0 : 1);
                    }}
                    circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
                    circleColorOn={_COLORS.Kodie_GreenColor}
                    backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
                    backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
                    containerStyle={PropertyPopupStyle.toggle_con}
                    circleStyle={PropertyPopupStyle.toggle_circle}
                  />
                  <Text style={PropertyPopupStyle.exp_reminder_text}>
                    {'New bid'}
                  </Text>
                  <View style={PropertyPopupStyle.reminder_dropdown}>
                    <Dropdown
                      style={[
                        PropertyPopupStyle.dropdown,
                        PropertyPopupStyle.reminder_dropdown_sty,
                      ]}
                      placeholderStyle={[
                        PropertyPopupStyle.placeholderStyle,
                        {color: _COLORS.Kodie_LightGrayColor},
                      ]}
                      selectedTextStyle={PropertyPopupStyle.selectedTextStyle}
                      inputSearchStyle={PropertyPopupStyle.inputSearchStyle}
                      iconStyle={PropertyPopupStyle.iconStyle}
                      data={Newbid}
                      maxHeight={300}
                      labelField="lookup_description"
                      valueField="lookup_key"
                      placeholder="2 mins"
                      value={Newbid_Value}
                      onChange={item => {
                        setNewbid_Value(item.lookup_key);
                      }}
                    />
                    <Text style={PropertyPopupStyle.after}>{'after'}</Text>
                  </View>
                </View>
              </View>

              <View style={PropertyPopupStyle.ButtonView}>
                <TouchableOpacity
                  style={[
                    PropertyPopupStyle.closeText,
                    PropertyPopupStyle.applyText,
                    {
                      backgroundColor: _COLORS.Kodie_WhiteColor,
                    },
                  ]}
                  onPress={() => {
                    handleOptionClick('cancel');
                    handleClosePopup();
                  }}>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      {
                        color: _COLORS.Kodie_BlackColor,
                      },
                    ]}>
                    {'Cancel'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    PropertyPopupStyle.applyText,
                    {
                      backgroundColor: _COLORS.Kodie_BlackColor,
                    },
                  ]}
                  onPress={handleSave}>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      PropertyPopupStyle.text,
                      {
                        color: _COLORS.Kodie_WhiteColor,
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
      ) : (
        <View style={PropertyPopupStyle.modalContainer}>
          <Text style={PropertyPopupStyle.modalMainText}>Bidding enabled</Text>
          <Text style={PropertyPopupStyle.modalSubText}>
            {bidResponse?.message}
          </Text>
          <Image
            source={IMAGES.CheckIcon}
            resizeMode={'cover'}
            style={PropertyPopupStyle.checkStl}
          />
          <CustomSingleButton
            _ButtonText={'Continue'}
            Text_Color={_COLORS.Kodie_WhiteColor}
            height={48}
            onPress={handleClosePopup}
          />
          <CustomSingleButton
            disabled={isLoading ? true : false}
            _ButtonText={'Return'}
            Text_Color={_COLORS.Kodie_BlackColor}
            borderColor={_COLORS.Kodie_WhiteColor}
            backgroundColor={_COLORS.Kodie_WhiteColor}
            onPress={handleClosePopup}
          />
        </View>
      )}
    </>
  );
};

export default PropertyPopup;
