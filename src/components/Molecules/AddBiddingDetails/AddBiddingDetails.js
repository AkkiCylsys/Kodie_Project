import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { AddBiddingDetailsCss } from "./AddBiddingDetailsCss";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import SwitchToggle from "react-native-switch-toggle";
import RowButtons from "../RowButtons/RowButtons";
import CalendarModal from "../CalenderModal/CalenderModal";
import { LABEL_STYLES } from "../../../Themes";
import { _COLORS, IMAGES, FONTFAMILY } from "../../../Themes";
import CustomSingleButton from "../../Atoms/CustomButton/CustomSingleButton";
import { CommonLoader } from "../ActiveLoader/ActiveLoader";
import { useSelector } from "react-redux";
import { Config } from "../../../Config";
import Fontisto from "react-native-vector-icons/Fontisto";
import axios from "axios";
import RBSheet from "react-native-raw-bottom-sheet";
const data = [
  { label: "3-month", value: "1" },
  { label: "6-month", value: "2" },
  { label: "12-month", value: "3" },
];
const notification_data = [
  { label: "Notification", value: "1" },
  { label: "Email", value: "2" },
];
const reminder_data = [
  { label: "30-day", value: "1" },
  { label: "2-day", value: "2" },
  { label: "2-day", value: "3" },
];

const AddBiddingDetails = (props) => {
  const [value, setValue] = useState(null);
  const [selectedCommDate, setselectedCommDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [rentalAmount, setRentalAmount] = useState(0);
  const [rentalBond, setRentalBond] = useState("");
  const [paymentDueDay, setPaymentDueDay] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [on, setOn] = useState(true);
  const [Visible, setVisible] = useState(false);
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
  const [selected_payment_Button, setselected_payment_Button] = useState(false);
  const [selected_payment_id, setselected_payment_id] = useState(319);
  const [BidData, setBidData] = useState([]);
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  const JOB_ID = props.JOB_ID;
  console.log("sheet JOB_ID", JOB_ID);
  const refRBSheet = useRef();
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log(
    "loginresponse_jobdetails..",
    loginData?.Login_details?.user_account_id
  );
  <SwitchToggle switchOn={on} onPress={() => setOn(!on)} />;
  useEffect(() => {
    handle_notification_type();
    handle_Open_reminder();
    handle_Close_reminder();
    handle_NewBid_reminder();
    handle_duration();
  }, []);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const sendDataToParent = () => {
    const data = "Hello from child!";
    props.continueOnPress(BidData);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleDayPress = (day) => {
    setselectedCommDate(day.dateString);
  };

  const toggleview = () => {
    setVisible(!Visible);
  };
  const handleSaveClick = () => {
    setIsSaveClicked(true);
  };
  const handleclosepopUp = () => {
    props.onclose();
  };
  const handle_add_Bid = () => {
    const url = Config.BASE_URL;
    const add_Bid_url = url + "job/addBidding";
    console.log("Request URL:", add_Bid_url);

    setIsLoading(true);
    const Bid_Data = {
      UAD_USER_KEY: loginData?.Login_details?.user_account_id,
      BIDDING_MODULE: "Job",
      BIDDING_REF_KEY: JOB_ID,
      BIDDING_COMMENCEMENT_DATE: selectedCommDate,
      BIDDING_DURATION: duration_value,
      BIDDING_LIST_PRICE: rentalAmount,
      BIDDING_AUTO_ACCEPT: rentalBond,
      BIDDING_PAYMENT_TERMS: selected_payment_id,
      BIDDING_NOTIFICATION_TYPE: notification_type_value,
      BIDDING_OPEN_REMINDER: open_reminder_Value,
      BIDDING_CLOSE_REMINDER: Close_reminder_Value,
      BIDDING_NEW_BID: Newbid_Value,
      BM_IS_BIDDING_OPEN: toggle_Bid_Open,
      BM_IS_BIDDING_CLOSE: toggle_Bid_Close,
      BM_IS_NEW_BID: toggle_New_bid,
      BIDDING_IS_WINNER: 0,
      IS_ACTIVE: true,
    };
    console.log("Bid_Data", Bid_Data);
    axios
      .post(add_Bid_url, Bid_Data)
      .then((response) => {
        console.log("API Response add_bid:", response.data);
        setBidData(response.data);

        if (response.data.success === true) {
          alert(response.data.message);
          // handleclosepopUp();
          // setVisible(!Visible);
          handleSaveClick();
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsLoading(false);
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handle_duration = () => {
    const duration_data = {
      P_PARENT_CODE: "BID_DURATION",
      P_TYPE: "OPTION",
    };
    const url = Config.BASE_URL;
    const durationapi = url + "lookup_details";
    console.log("Request URL:", durationapi);
    setIsLoading(true);
    axios
      .post(durationapi, duration_data)
      .then((response) => {
        console.log("kodie_duration_data", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("kodie_duration_data...", response.data.lookup_details);
          setkodieDurationData(response.data.lookup_details);
        } else {
          console.error("kodie_duration_data_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("kodie_describeYouself_Data error:", error);
        alert(error);
        setIsLoading(false);
      });
  };
  const handle_notification_type = () => {
    const url = Config.BASE_URL;
    const notification_url = url + "lookup_details";
    console.log("Request URL:", notification_url);
    setIsLoading(true);
    const notification_data = {
      P_PARENT_CODE: "SNT",
      P_TYPE: "OPTION",
    };

    axios
      .post(notification_url, notification_data)
      .then((response) => {
        console.log("API Response notification_type:", response.data);
        if (response.data.status === true) {
          setNotification_type_Data(response.data.lookup_details);
          // alert(JSON.stringify(response.data.lookup_details));
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handle_Open_reminder = () => {
    const url = Config.BASE_URL;
    const expiry_url = url + "lookup_details";
    console.log("Request URL:", expiry_url);
    setIsLoading(true);
    const notification_data = {
      P_PARENT_CODE: "LER",
      P_TYPE: "OPTION",
    };
    axios
      .post(expiry_url, notification_data)
      .then((response) => {
        console.log("API Response expiry reminder:", response.data);
        if (response.data.status === true) {
          setopen_reminder_Data(response.data.lookup_details);
          // alert(JSON.stringify(response.data.lookup_details));
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handle_Close_reminder = () => {
    const url = Config.BASE_URL;
    const payment_url = url + "lookup_details";
    console.log("Request URL:", payment_url);
    setIsLoading(true);
    const notification_data = {
      P_PARENT_CODE: "RPR",
      P_TYPE: "OPTION",
    };
    axios
      .post(payment_url, notification_data)
      .then((response) => {
        console.log("API Response payment reminder:", response.data);
        if (response.data.status === true) {
          setClose_reminder_Data(response.data.lookup_details);
          // alert(JSON.stringify(response.data.lookup_details));
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handle_NewBid_reminder = () => {
    const url = Config.BASE_URL;
    const rental_url = url + "lookup_details";
    console.log("Request URL:", rental_url);
    setIsLoading(true);
    const notification_data = {
      P_PARENT_CODE: "LRR",
      P_TYPE: "OPTION",
    };
    axios
      .post(rental_url, notification_data)
      .then((response) => {
        console.log("API Response rental reminder:", response.data);
        if (response.data.status === true) {
          setNewbid(response.data.lookup_details);
          // alert(JSON.stringify(response.data.lookup_details));
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const notification_render = (item) => {
    return (
      <View style={AddBiddingDetailsCss.itemView}>
        {item.lookup_key === notification_type_value ? (
          <Fontisto
            color={_COLORS.Kodie_GreenColor}
            name={"radio-btn-active"}
            size={20}
          />
        ) : (
          <Fontisto
            color={_COLORS.Kodie_GreenColor}
            name={"radio-btn-passive"}
            size={20}
          />
        )}
        <Text style={AddBiddingDetailsCss.textItem}>
          {item.lookup_description}
        </Text>
      </View>
    );
  };

  return (
    <>
      {!isSaveClicked ? (
        <View style={AddBiddingDetailsCss.mainContainer}>
          <View style={AddBiddingDetailsCss.heading_View}>
            <Text style={AddBiddingDetailsCss.heading_Text}>
              {"Add bidding details"}
            </Text>
            <TouchableOpacity onPress={handleclosepopUp}>
              <AntDesign
                name="close"
                size={22}
                color={_COLORS.Kodie_BlackColor}
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={AddBiddingDetailsCss.card}>
              <Text style={LABEL_STYLES.commontext}>{"Commencement date"}</Text>
              <View style={AddBiddingDetailsCss.datePickerView}>
                <CalendarModal
                  SelectDate={
                    selectedCommDate ? selectedCommDate : "Start Date"
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
              <View style={AddBiddingDetailsCss.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{"Duration"}</Text>
                <Dropdown
                  style={AddBiddingDetailsCss.dropdown}
                  placeholderStyle={[
                    AddBiddingDetailsCss.placeholderStyle,
                    { color: _COLORS.Kodie_LightGrayColor },
                  ]}
                  selectedTextStyle={AddBiddingDetailsCss.selectedTextStyle}
                  inputSearchStyle={AddBiddingDetailsCss.inputSearchStyle}
                  iconStyle={AddBiddingDetailsCss.iconStyle}
                  data={kodieDurationData}
                  maxHeight={300}
                  labelField="lookup_description"
                  valueField="lookup_key"
                  placeholder="3 days"
                  value={duration_value}
                  onChange={(item) => {
                    setDuration_value(item.lookup_key);
                  }}
                />
              </View>
              <View style={AddBiddingDetailsCss.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{"List price"}</Text>
                <TextInput
                  style={AddBiddingDetailsCss.input}
                  value={rentalAmount}
                  onChangeText={setRentalAmount}
                  placeholder="Enter the rental amount"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={AddBiddingDetailsCss.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {"Auto-accept threshold"}
                </Text>
                <TextInput
                  style={AddBiddingDetailsCss.input}
                  value={rentalBond}
                  onChangeText={setRentalBond}
                  placeholder="Enter the rental bond amount"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={AddBiddingDetailsCss.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {"Rental payment frequency"}
                </Text>
                <RowButtons
                  LeftButtonText={"Upfront"}
                  leftButtonbackgroundColor={
                    !selected_payment_Button
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  LeftButtonTextColor={
                    !selected_payment_Button
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  LeftButtonborderColor={
                    !selected_payment_Button
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressLeftButton={() => {
                    setselected_payment_Button(false);
                    setselected_payment_id(319);
                    // alert(selectedButtonId)
                  }}
                  RightButtonText={"After completion"}
                  RightButtonbackgroundColor={
                    selected_payment_Button
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  RightButtonTextColor={
                    selected_payment_Button
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  RightButtonborderColor={
                    selected_payment_Button
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressRightButton={() => {
                    setselected_payment_Button(true);
                    setselected_payment_id(319);
                  }}
                />
              </View>

              <View style={AddBiddingDetailsCss.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>
                  {"Set bid notifications"}
                </Text>
                <View style={AddBiddingDetailsCss.notification_view}>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      AddBiddingDetailsCss.notification_text,
                    ]}
                  >
                    {"Set notification type"}
                  </Text>
                  <Dropdown
                    style={[
                      AddBiddingDetailsCss.dropdown,
                      { flex: 1, borderRadius: 8, marginLeft: 6 },
                    ]}
                    placeholderStyle={[
                      AddBiddingDetailsCss.placeholderStyle,
                      { color: _COLORS.Kodie_LightGrayColor },
                    ]}
                    selectedTextStyle={AddBiddingDetailsCss.selectedTextStyle}
                    inputSearchStyle={AddBiddingDetailsCss.inputSearchStyle}
                    iconStyle={AddBiddingDetailsCss.iconStyle}
                    data={notification_type_Data}
                    maxHeight={300}
                    labelField="lookup_description"
                    valueField="lookup_key"
                    placeholder="Email"
                    value={notification_type_value}
                    onChange={(item) => {
                      setNotification_type_value(item.lookup_key);
                      // alert(item.lookup_key);
                    }}
                    renderItem={notification_render}
                  />
                </View>

                <View style={AddBiddingDetailsCss.reminder_m_view}>
                  <SwitchToggle
                    switchOn={Toggle_open}
                    onPress={() => {
                      setToggle_open(!Toggle_open);
                      settoggle_Bid_Open(Toggle_open ? 0 : 1);
                      // alert(toggle_Bid_Open);
                    }}
                    circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
                    circleColorOn={_COLORS.Kodie_GreenColor}
                    backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
                    backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
                    containerStyle={AddBiddingDetailsCss.toggle_con}
                    circleStyle={AddBiddingDetailsCss.toggle_circle}
                  />
                  {/* <View style={{ margin: 5 }} /> */}
                  <Text style={AddBiddingDetailsCss.exp_reminder_text}>
                    {"Bidding open reminder"}
                  </Text>
                  <View style={AddBiddingDetailsCss.reminder_dropdown}>
                    <Dropdown
                      style={[
                        AddBiddingDetailsCss.dropdown,
                        AddBiddingDetailsCss.reminder_dropdown_sty,
                      ]}
                      placeholderStyle={[
                        AddBiddingDetailsCss.placeholderStyle,
                        { color: _COLORS.Kodie_LightGrayColor },
                      ]}
                      selectedTextStyle={AddBiddingDetailsCss.selectedTextStyle}
                      inputSearchStyle={AddBiddingDetailsCss.inputSearchStyle}
                      iconStyle={AddBiddingDetailsCss.iconStyle}
                      data={open_reminder_Data}
                      maxHeight={300}
                      labelField="lookup_description"
                      valueField="lookup_key"
                      placeholder="30 days"
                      value={open_reminder_Value}
                      onChange={(item) => {
                        setopen_reminder_Value(item.lookup_key);
                        // alert(item.lookup_key)
                      }}
                    />
                    <Text style={AddBiddingDetailsCss.before}>{"before"}</Text>
                  </View>
                </View>
                <View style={AddBiddingDetailsCss.reminder_m_view}>
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
                    containerStyle={AddBiddingDetailsCss.toggle_con}
                    circleStyle={AddBiddingDetailsCss.toggle_circle}
                  />
                  {/* <View style={{ margin: 5 }} /> */}
                  <Text style={AddBiddingDetailsCss.exp_reminder_text}>
                    {"Bidding close reminder"}
                  </Text>
                  <View style={AddBiddingDetailsCss.reminder_dropdown}>
                    <Dropdown
                      style={[
                        AddBiddingDetailsCss.dropdown,
                        AddBiddingDetailsCss.reminder_dropdown_sty,
                      ]}
                      placeholderStyle={[
                        AddBiddingDetailsCss.placeholderStyle,
                        { color: _COLORS.Kodie_LightGrayColor },
                      ]}
                      selectedTextStyle={AddBiddingDetailsCss.selectedTextStyle}
                      inputSearchStyle={AddBiddingDetailsCss.inputSearchStyle}
                      iconStyle={AddBiddingDetailsCss.iconStyle}
                      data={Close_reminder_Data}
                      maxHeight={300}
                      labelField="lookup_description"
                      valueField="lookup_key"
                      placeholder="2 days"
                      value={Close_reminder_Value}
                      onChange={(item) => {
                        setClose_reminder_Value(item.lookup_key);
                      }}
                    />
                    <Text style={AddBiddingDetailsCss.before}>{"before"}</Text>
                  </View>
                </View>
                <View style={AddBiddingDetailsCss.reminder_m_view}>
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
                    containerStyle={AddBiddingDetailsCss.toggle_con}
                    circleStyle={AddBiddingDetailsCss.toggle_circle}
                  />
                  {/* <View style={{ margin: 5 }} /> */}
                  <Text style={AddBiddingDetailsCss.exp_reminder_text}>
                    {"New bid"}
                  </Text>
                  <View style={AddBiddingDetailsCss.reminder_dropdown}>
                    <Dropdown
                      style={[
                        AddBiddingDetailsCss.dropdown,
                        AddBiddingDetailsCss.reminder_dropdown_sty,
                      ]}
                      placeholderStyle={[
                        AddBiddingDetailsCss.placeholderStyle,
                        { color: _COLORS.Kodie_LightGrayColor },
                      ]}
                      selectedTextStyle={AddBiddingDetailsCss.selectedTextStyle}
                      inputSearchStyle={AddBiddingDetailsCss.inputSearchStyle}
                      iconStyle={AddBiddingDetailsCss.iconStyle}
                      data={Newbid}
                      maxHeight={300}
                      labelField="lookup_description"
                      valueField="lookup_key"
                      placeholder="2 days"
                      value={Newbid_Value}
                      onChange={(item) => {
                        setNewbid_Value(item.lookup_key);
                      }}
                    />
                    <Text style={AddBiddingDetailsCss.after}>{"after"}</Text>
                  </View>
                </View>
              </View>

              {/* Button section here */}
              <View style={AddBiddingDetailsCss.ButtonView}>
                <TouchableOpacity
                  style={[
                    AddBiddingDetailsCss.closeText,
                    AddBiddingDetailsCss.applyText,
                    {
                      backgroundColor: _COLORS.Kodie_WhiteColor,
                    },
                  ]}
                  onPress={() => {
                    handleOptionClick("cancel");
                  }}
                >
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      {
                        color: _COLORS.Kodie_BlackColor,
                      },
                    ]}
                  >
                    {"cancel"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    AddBiddingDetailsCss.applyText,
                    {
                      backgroundColor: _COLORS.Kodie_BlackColor,
                    },
                  ]}
                  onPress={() => {
                    // toggleview("Save");

                    handle_add_Bid();
                  }}
                >
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      AddBiddingDetailsCss.text,
                      {
                        color: _COLORS.Kodie_WhiteColor,
                      },
                    ]}
                  >
                    {" Save"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {isLoading ? <CommonLoader /> : null}
        </View>
      ) : (
        // <View style={AddBiddingDetailsCss.ModalMainView}>
        //   <View style={AddBiddingDetailsCss.ModalView}>
        <View style={AddBiddingDetailsCss.modalContainer}>
          {/* <TouchableOpacity>
                <AntDesign
                  name="close"
                  size={20}
                  color={_COLORS.Kodie_BlackColor}
                  style={AddBiddingDetailsCss.modalCloseIcon}
                />
              </TouchableOpacity> */}
          <Text style={AddBiddingDetailsCss.modalMainText}>
            Bidding enabled
          </Text>
          <Text style={AddBiddingDetailsCss.modalSubText}>
            {/* Congratulations! You have successfully enabled property
                  bidding feature. You will be notified once a tenant places a
                  bid . */}
            {BidData?.message}
          </Text>
          <Image
            source={IMAGES.CheckIcon}
            resizeMode={"center"}
            style={AddBiddingDetailsCss.checkStl}
          />
          <CustomSingleButton
            _ButtonText={"Continue"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            height={48}
            onPress={sendDataToParent}
          />
          <CustomSingleButton
            disabled={isLoading ? true : false}
            _ButtonText={"Return"}
            Text_Color={_COLORS.Kodie_BlackColor}
            height={48}
            borderColor={_COLORS.Kodie_WhiteColor}
            backgroundColor={_COLORS.Kodie_WhiteColor}
          />
        </View>
        //   </View>
        // </View>
      )}
    </>
  );
};

export default AddBiddingDetails;
