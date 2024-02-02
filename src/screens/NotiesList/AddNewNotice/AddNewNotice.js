//ScreenNo:159
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AddNewNoticeStyle } from "./AddNewNoticeStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { Dropdown } from "react-native-element-dropdown";
import { _COLORS, IMAGES, LABEL_STYLES } from "../../../Themes";
import { Divider } from "react-native-paper";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import ToggleSwitch from "toggle-switch-react-native";
import AddGuest from "../../../components/Molecules/AddGuests/AddGuest";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _goBack } from "../../../services/CommonServices";
import SwitchToggle from "react-native-switch-toggle";
import { Config } from "../../../Config";
import axios from "axios";
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";
import Geocoder from "react-native-geocoding";
import Geolocation from "react-native-geolocation-service";
import MapScreen from "../../../components/Molecules/GoogleMap/googleMap";
import SearchPlaces from "../../../components/Molecules/SearchPlaces/SearchPlaces";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { useDispatch, useSelector } from "react-redux";

import RNFetchBlob from "rn-fetch-blob";
import DocumentPicker from "react-native-document-picker";
import CalendarModal from "../../../components/Molecules/CalenderModal/CalenderModal";
import TimePicker from "../../../components/Molecules/ClockPicker/TimePicker";
import moment from "moment/moment";

const data = [
  { label: "Bharat", value: "1" },
  { label: "Australia", value: "2" },
  { label: "America", value: "3" },
];
const AddNewNotice = (props) => {
  const noticeReminderid = props.route.params?.noticeReminderid;
  console.log("noticeReminderid in addNewNotice...", noticeReminderid);
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse.....", loginData);
  const [location, setLocation] = useState("");
  const [noticeTittle, setNoticeTittle] = useState("");
  const [addGuest, setAddGuest] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toggleDay, setToggleDay] = useState(false);
  const [toggleDayValue, setToggleDayValue] = useState(0);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [toggleNotificationValue, setToggleNotificationValue] = useState(0);
  const [noticeTypeData, setNoticeTypeData] = useState([]);
  const [noticeTypeDataValue, setNoticeTypeDataValue] = useState("");
  const [repeatData, setRepeatData] = useState([]);
  const [repeatDataValue, setRepeatDataValue] = useState("");
  const [notification_type_Data, setNotification_type_Data] = useState([]);
  const [notification_type_value, setNotification_type_value] = useState("");
  const [UserCurrentCity, setUserCurrentCity] = useState("");
  const [UserZip_Code, setUserZip_Code] = useState("");
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");

  const [selectFile, setSelectFile] = useState([]);
  const [fileKey, setFileKey] = useState(0);
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [isModalToDateVisible, setModalToDateVisible] = useState(false);
  const [currentfromTime, setCurrentfromTime] = useState("");
  const [currentToTime, setCurrentToTime] = useState("");

  useEffect(() => {
    handle_notice();
    handle_Repeat();
    handle_notification_type();
    getNoticesReminderDetails();
    Geocoder.init("AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw", {
      language: "en",
    });
    CheckIOSMapPermission();
  }, []);

  // calender..
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setSelectedDate("");
  };
  const apply_toggleModal = () => {
    setModalVisible(!isModalVisible);
    console.log("date...", selectedDate);
  };
  const toggleToDateModal = () => {
    setModalToDateVisible(!isModalToDateVisible);
    setSelectedToDate("");
  };
  const apply_toggleToDateModal = () => {
    setModalToDateVisible(!isModalToDateVisible);
    // console.log("date...", selectedDate);
  };
  // For map screen.....
  const ConfirmAddress = () => {
    setIsMap(false);
  };
  const openMapandClose = (text) => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = (Region) => {
    // alert(JSON.stringify(Region))
    setlatitude(Region.latitude);
    setlongitude(Region.longitude);
    getAddress(Region.latitude, Region.longitude);
  };
  const checkpermissionlocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Example App",
          message: "Example App access to your location ",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        // alert("You can use the location");
        getAddressWithCordinates();
      } else {
        console.log("location permission denied");
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const CheckIOSMapPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              "This feature is not available (on this device / in this context)"
            );
            break;
          case RESULTS.DENIED:
            console.log(
              "The permission has not been requested / is denied but requestable"
            );
            break;
          case RESULTS.LIMITED:
            console.log("The permission is limited: some actions are possible");
            break;
          case RESULTS.GRANTED:
            console.log("The permission is granted");
            getAddressWithCordinates();
            break;
          case RESULTS.BLOCKED:
            console.log("The permission is denied and not requestable anymore");
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAddressWithCordinates = () => {
    Geolocation.watchPosition(
      (position) => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
        getAddress(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  };
  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then((json) => {
        let MainFullAddress =
          json.results[0].address_components[1].long_name +
          ", " +
          json.results[0].address_components[2].long_name +
          ", " +
          json.results[0].address_components[3].long_name +
          ", " +
          json.results[0].address_components[4].long_name +
          ", " +
          json.results[0].address_components[5].long_name +
          ", " +
          json.results[0].address_components[6].long_name +
          ", " +
          json.results[0].address_components[7].long_name +
          ", " +
          json.results[0].address_components[8].long_name;

        var addressComponent2 = json.results[0].address_components[1];
        // alert(addressComponent2)
        setUserCurrentCity(addressComponent2.long_name);
        setUserZip_Code(json.results[1]?.address_components[6]?.long_name);
        setLocation(MainFullAddress);
        // alert(location)

        //setAddress(MainFullAddress);
      })
      .catch((error) => console.warn(error));
  };

  // Api intrrigation....
  const handle_notice = () => {
    const url = Config.BASE_URL;
    const noticeType_url = url + "lookup_details";
    console.log("Request URL:", noticeType_url);
    setIsLoading(true);
    const notification_data = {
      P_PARENT_CODE: "TYPE_OF_NOTICE",
      P_TYPE: "OPTION",
    };
    axios
      .post(noticeType_url, notification_data)
      .then((response) => {
        console.log("API Response noticeType_url:", response.data);
        if (response.data.status === true) {
          setNoticeTypeData(response.data.lookup_details);
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
  const handle_Repeat = () => {
    const url = Config.BASE_URL;
    const Repear_url = url + "lookup_details";
    console.log("Request URL:", Repear_url);
    setIsLoading(true);
    const notification_data = {
      P_PARENT_CODE: "REPEAT",
      P_TYPE: "OPTION",
    };
    axios
      .post(Repear_url, notification_data)
      .then((response) => {
        console.log("API Response Repear_url:", response.data);
        if (response.data.status === true) {
          setRepeatData(response.data.lookup_details);
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
  // clearState ..
  const clearState = () => {
    setNoticeTypeDataValue(""),
      setNoticeTittle(""),
      setRepeatDataValue(""),
      setToggleDayValue("");
    setNotes(""),
      setAddGuest(""),
      setToggleDay(false),
      setToggleNotification(false),
      setToggleNotificationValue("");
    setNotification_type_value("");
    setLocation(""),
      setSelectedDate(""),
      setSelectedToDate(""),
      setCurrentfromTime(""),
      setCurrentToTime("");
  };
  const createNoticeReminder = async () => {
    const formData = new FormData();
    formData.append("account_id", loginData?.Login_details?.user_account_id);
    formData.append("notice_type", noticeTypeDataValue);
    formData.append("notice_title", noticeTittle);
    formData.append("notice_repeat", repeatDataValue);
    formData.append("notice_notifications", toggleDayValue);
    formData.append("notice_from_date", selectedDate);
    formData.append("notice_from_time", currentfromTime);
    formData.append("notice_to_date", selectedToDate);
    formData.append("notice_to_time", currentToTime);
    formData.append("guests", addGuest);
    formData.append("location", location);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);
    formData.append("notification", toggleNotificationValue);
    formData.append("notification_type", notification_type_value);
    formData.append("custom", 1);
    formData.append("notes", notes);
    // formData.append("file_name", fileName);
    formData.append("file_name", {
      uri: selectFile[0].uri,
      name: selectFile[0].name,
      type: selectFile[0].type,
    });
    console.log("formData", formData);
    const url = Config.BASE_URL;
    const createNoticeReminder_url = url + "create_notices_reminder";
    setIsLoading(true);
    try {
      console.log("Request URL:", createNoticeReminder_url);
      const response = await axios.post(createNoticeReminder_url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("hello deependra");
      console.log("createNoticeReminder....", response.data);
      if (response.data.status === true) {
        alert(response.data.message);
        props.navigation.navigate("Notices");
      }
      clearState();
      setIsLoading(false);
    } catch (error) {
      alert(error);
      console.log("createNoticeReminder_error...", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNoticesReminderDetails = () => {
    const url = Config.BASE_URL;
    const getNoticesReminderDetails_url = url + "get_notices_reminder_details";
    console.log("Request URL:", getNoticesReminderDetails_url);
    setIsLoading(true);
    const notification_data = {
      notices_reminder_id: noticeReminderid,
    };
    axios
      .post(getNoticesReminderDetails_url, notification_data)
      .then((response) => {
        console.log(
          "API Response getNoticesReminderDetailsData...:",
          response.data
        );
        if (response.data.status === true) {
          setNoticeTypeDataValue(parseInt(response.data.data.type_notice_id));
          setNoticeTittle(response.data.data.title);
          setRepeatDataValue(parseInt(response.data.data.Repeat_id));
          setToggleDay(String(response.data.data.notification_notice));
          setSelectedDate(response.data.data.from_date);
          setSelectedToDate(response.data.data.to_date);
          setCurrentfromTime(response.data.data.from_time);
          setCurrentToTime(response.data.data.to_time);
          setAddGuest(response.data.data.guests);
          setLocation(response.data.data.location);
          setToggleNotification(response.data.data.notifications);
          setNotification_type_value(parseInt(response.data.data.type_id));
          setNotes(response.data.data.notes);
          // setFileName(response.data.data.file_name)
          setSelectFile(response.data.data.file_name);
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed getNoticesReminderDetails_url", error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const update_createNoticeReminder = async () => {
    const formData = new FormData();
    formData.append("notices_reminder_id", noticeReminderid);
    formData.append("notice_type", noticeTypeDataValue);
    formData.append("notice_title", noticeTittle);
    formData.append("notice_repeat", repeatDataValue);
    formData.append("notice_notifications", toggleDayValue);
    formData.append("notice_from_date", selectedDate);
    formData.append("notice_from_time", currentfromTime);
    formData.append("notice_to_date", selectedToDate);
    formData.append("notice_to_time", currentToTime);
    formData.append("guests", addGuest);
    formData.append("location", location);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);
    formData.append("notification", toggleNotificationValue);
    formData.append("notification_type", notification_type_value);
    formData.append("custom", 1);
    formData.append("notes", notes);
    // formData.append("file_name", fileName);
    formData.append("file_name", {
      uri: selectFile[0].uri,
      name: selectFile[0].name,
      type: selectFile[0].type,
    });
    console.log("formData", formData);
    const url = Config.BASE_URL;
    const update_createNoticeReminder_url = url + "update_notices_reminder";
    setIsLoading(true);
    try {
      console.log("Request URL:", update_createNoticeReminder_url);
      const response = await axios.put(
        update_createNoticeReminder_url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("update_createNoticeReminderResponse....", response.data);
      if (response.data.status === true) {
        alert(response.data.message);
        props.navigation.navigate("Notices");
      }
      clearState();
      setIsLoading(false);
    } catch (error) {
      alert(error);
      console.log("update_createNoticeReminder_url...", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Documents....
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.images,
        ],
        // allowMultiSelection: true,
      });
      //   const doc = await DocumentPicker.pickSingle({
      //     type: [
      //       DocumentPicker.types.pdf,
      //       DocumentPicker.types.doc,
      //       DocumentPicker.types.docx,
      //     ],
      //   });
      console.log("doc......", doc);
      setSelectFile(doc);
      setFileName(doc[0].name);
      console.log("filename...", doc[0].name);
      // await uploadDocument(doc);
      // console.log("Documents.....", doc);
      // console.log("selectFile.....", selectFile);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log("User cancelled the upload", err);
      else console.log(err);
    }
  };
  return (
    <View style={AddNewNoticeStyle.MainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Add new notice"}
      />
      {IsMap ? (
        <View
          style={{
            flex: 1,
            // paddingHorizontal: 10,
            backgroundColor: "transparent",
          }}
        >
          <MapScreen
            style={{
              height: "100%",
              width: "100%",
              // borderRadius: 20,
              // borderWidth: 1,
              //borderColor: .greenAppColor,
              alignSelf: "center",
              marginBottom: 10,
            }}
            onRegionChange={onRegionChange}
            Maplat={latitude}
            Maplng={longitude}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center",
              width: "96%",
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: "white",
              borderColor: "#E5E4E2",
              marginTop: 10,
              position: "absolute",
            }}
          >
            <TextInput
              style={{
                backgroundColor: "transparent",

                width: "90%",
                height: 45,
                alignSelf: "center",
                //marginTop: 10,
              }}
              onFocus={() => openMapandClose()}
              placeholder={"Search Place"}
            />
          </View>
          <TouchableOpacity
            style={AddNewNoticeStyle.BtnContainer}
            onPress={ConfirmAddress}
          >
            <Image source={IMAGES?.Shape} style={{ height: 25, width: 25 }} />
          </TouchableOpacity>
        </View>
      ) : IsSearch ? (
        <SearchPlaces
          onPress={(data, details = null) => {
            console.log("LocationData....", details);
            setlatitude(details.geometry.location.lat);
            setlongitude(details.geometry.location.lng);
            setIsSearch(false);
            setIsMap(true);
            setLocation(details.formatted_address);
          }}
        />
      ) : (
        <ScrollView contentContainerStyle={{ marginBottom: 50 }}>
          <View style={AddNewNoticeStyle.mainview}>
            <View style={AddNewNoticeStyle.jobDetailsView}>
              <Text style={LABEL_STYLES.commontext}>
                {"Select the type of notice you want to create"}
              </Text>
              <Dropdown
                style={AddNewNoticeStyle.dropdown}
                placeholderStyle={AddNewNoticeStyle.placeholderStyle}
                selectedTextStyle={AddNewNoticeStyle.selectedTextStyle}
                inputSearchStyle={AddNewNoticeStyle.inputSearchStyle}
                iconStyle={AddNewNoticeStyle.iconStyle}
                data={noticeTypeData}
                search
                maxHeight={300}
                labelField="lookup_description"
                valueField="lookup_key"
                placeholder="Inspection reminder"
                searchPlaceholder="Search..."
                value={noticeTypeDataValue}
                onChange={(item) => {
                  setNoticeTypeDataValue(item.lookup_key);
                  // alert(item.lookup_key)
                }}
              />
            </View>
            <View style={AddNewNoticeStyle.jobDetailsView}>
              <Text style={LABEL_STYLES.commontext}>{"Notice title"}</Text>
              <TextInput
                style={[AddNewNoticeStyle.input]}
                value={noticeTittle}
                onChangeText={setNoticeTittle}
                placeholder="Pre move inspection due"
                placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              />
            </View>

            <Divider style={AddNewNoticeStyle.divider} />
            <View style={AddNewNoticeStyle.mainreapeatview}>
              <Fontisto
                name="arrow-swap"
                size={30}
                color={_COLORS.Kodie_ExtraLiteGrayColor}
                style={{ marginTop: 10 }}
              />
              <Text style={AddNewNoticeStyle.repeattext}>Repeat</Text>
              <View style={AddNewNoticeStyle.noticedropdownview}>
                <Dropdown
                  style={[
                    AddNewNoticeStyle.dropdown,
                    { borderRadius: 8, height: 25 },
                  ]}
                  placeholderStyle={AddNewNoticeStyle.placeholderStyle}
                  selectedTextStyle={AddNewNoticeStyle.selectedTextStyle}
                  inputSearchStyle={AddNewNoticeStyle.inputSearchStyle}
                  iconStyle={AddNewNoticeStyle.iconStyle}
                  data={repeatData}
                  search
                  maxHeight={300}
                  labelField="lookup_description"
                  valueField="lookup_key"
                  placeholder="Every weekday (Mon-Fri)"
                  searchPlaceholder="Search..."
                  value={repeatDataValue}
                  onChange={(item) => {
                    setRepeatDataValue(item.lookup_key);
                    // alert(item.lookup_key)
                  }}
                />
              </View>
            </View>
            <Divider style={AddNewNoticeStyle.dividersecond} />
            {/* fourth part start here */}
            <View style={AddNewNoticeStyle.alldayviewmain}>
              <View style={AddNewNoticeStyle.alldayview}>
                <MaterialCommunityIcons name="alarm-plus" size={30} />
                <Text style={AddNewNoticeStyle.alldaytext}>All Day</Text>
              </View>
              <SwitchToggle
                switchOn={toggleDay}
                onPress={() => {
                  setToggleDay(!toggleDay);
                  setToggleDayValue(toggleDay ? 0 : 1);
                  // alert(toggleDayValue);
                }}
                circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
                circleColorOn={_COLORS.Kodie_GreenColor}
                backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
                backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
                containerStyle={AddNewNoticeStyle.toggle_con}
                circleStyle={AddNewNoticeStyle.toggle_circle}
              />
            </View>
            <View style={AddNewNoticeStyle.datetimeview}>
              <View style={AddNewNoticeStyle.dateview}>
                <View style={{ flex: 1 }}>
                  <CalendarModal
                    // SelectDate={selectedDate ? selectedDate : "Select Date"}
                    SelectDate={
                      selectedDate
                        ? moment(selectedDate).format("ddd, MMM DD YYYY")
                        : "Select from Date"
                    }
                    _textInputStyle={{
                      color: selectedDate
                        ? _COLORS.Kodie_BlackColor
                        : _COLORS.Kodie_BlackColor,
                    }}
                    calenderStyle={{
                      borderWidth: 0,
                      marginTop: 0,
                    }}
                    calenderIcons
                    calenderIcon={toggleModal}
                    // onDayPress={handleDayPress}
                    // onDayPress={(day) => handleRequestDate(day.dateString)}
                    // onChangeText={() => handleRequestDate(selectedDate)}
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    onChangeText={() => setSelectedDate(selectedDate)}
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
                    _ApplyButton={apply_toggleModal}
                  />
                </View>
                <TimePicker
                  selectedTime={
                    currentfromTime && currentfromTime != ""
                      ? String(currentfromTime)
                      : "Select from time"
                  }
                  timerConStyle={{
                    borderWidth: 0,
                    marginTop: 0,
                  }}
                  _TextTimeColor={
                    currentfromTime
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_BlackColor
                  }
                  timerIcons
                  data={new Date()}
                  getData={(date) => {
                    setCurrentfromTime(moment(date).format("hh:mm A"));
                  }}
                />
              </View>
              <View style={AddNewNoticeStyle.dateview}>
                <View style={{ flex: 1 }}>
                  <CalendarModal
                    // SelectDate={selectedDate ? selectedDate : "Select Date"}
                    SelectDate={
                      selectedToDate
                        ? moment(selectedToDate).format("ddd, MMM DD YYYY")
                        : "Select to Date"
                    }
                    _textInputStyle={{
                      color: selectedToDate
                        ? _COLORS.Kodie_BlackColor
                        : _COLORS.Kodie_BlackColor,
                    }}
                    calenderStyle={{
                      borderWidth: 0,
                      marginTop: 0,
                    }}
                    calenderIcons
                    calenderIcon={toggleToDateModal}
                    // onDayPress={handleDayPress}
                    // onDayPress={(day) => handleRequestDate(day.dateString)}
                    // onChangeText={() => handleRequestDate(selectedDate)}
                    onDayPress={(day) => setSelectedToDate(day.dateString)}
                    onChangeText={() => setSelectedToDate(selectedToDate)}
                    Visible={isModalToDateVisible}
                    onRequestClose={toggleToDateModal}
                    markedDates={{
                      [selectedToDate]: {
                        selected: true,
                        selectedColor: _COLORS.Kodie_lightGreenColor,
                        selectedTextColor: _COLORS.Kodie_BlackColor,
                      },
                    }}
                    _closeButton={toggleToDateModal}
                    _ApplyButton={apply_toggleToDateModal}
                  />
                </View>
                <TimePicker
                  selectedTime={
                    currentToTime && currentToTime != ""
                      ? String(currentToTime)
                      : "Select time"
                  }
                  timerConStyle={{
                    borderWidth: 0,
                    marginTop: 0,
                  }}
                  _TextTimeColor={
                    currentToTime
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_BlackColor
                  }
                  timerIcons
                  data={new Date()}
                  getData={(date) => {
                    setCurrentToTime(moment(date).format("hh:mm A"));
                  }}
                />
              </View>
            </View>

            <Divider style={AddNewNoticeStyle.dividerthird} />
            <View style={AddNewNoticeStyle.secondmainview}>
              {/* <AddGuest /> */}
              <View style={AddNewNoticeStyle.jobDetailsView}>
                <Text style={LABEL_STYLES.commontext}>{"Add guests"}</Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View
                    style={[
                      AddNewNoticeStyle.input,
                      AddNewNoticeStyle.input_guest,
                    ]}
                  >
                    <TextInput
                      style={{ flex: 1 }}
                      value={addGuest}
                      onChangeText={setAddGuest}
                      placeholder="Add guests"
                      placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                    />
                    <Feather
                      name="user-plus"
                      size={30}
                      color={_COLORS.Kodie_GrayColor}
                      style={{ alignSelf: "center", marginHorizontal: 10 }}
                    />
                  </View>
                  <TouchableOpacity style={AddNewNoticeStyle.chatBtn}>
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={30}
                      color={_COLORS.Kodie_WhiteColor}
                      style={{ alignSelf: "center" }}
                    />
                    <Text style={AddNewNoticeStyle.ChatText}>{"Chat "}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={AddNewNoticeStyle.firstview}>
                <Text style={AddNewNoticeStyle.oldnumbertext}>
                  Add location
                </Text>

                <View style={AddNewNoticeStyle.locationContainer}>
                  <TextInput
                    style={AddNewNoticeStyle.locationInput}
                    value={location}
                    onChangeText={setLocation}
                    onFocus={() => {
                      setIsSearch(true);
                    }}
                    // editable={false}
                    placeholder="Enter new location"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  />
                  <TouchableOpacity
                    style={AddNewNoticeStyle.locationIconView}
                    onPress={() => {
                      Platform.OS == "ios"
                        ? CheckIOSMapPermission
                        : checkpermissionlocation();
                      setIsMap(true);
                    }}
                  >
                    <Octicons
                      name={"location"}
                      size={22}
                      color={_COLORS.Kodie_GreenColor}
                      style={AddNewNoticeStyle.locationIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Divider style={AddNewNoticeStyle.dividerfourth} />

              {/*seven part start here */}
              <View style={AddNewNoticeStyle.setnotificationview}>
                <View style={AddNewNoticeStyle.notificationbind}>
                  <SimpleLineIcons name="bell" size={25} />
                  <Text style={AddNewNoticeStyle.settext}>
                    Set notification{" "}
                  </Text>
                </View>
                <SwitchToggle
                  switchOn={toggleNotification}
                  onPress={() => {
                    setToggleNotification(!toggleNotification);
                    setToggleNotificationValue(toggleNotification ? 1 : 0);
                    // alert(toggle_lease_expire);
                  }}
                  circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
                  circleColorOn={_COLORS.Kodie_GreenColor}
                  backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
                  backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
                  containerStyle={AddNewNoticeStyle.toggle_con}
                  circleStyle={AddNewNoticeStyle.toggle_circle}
                />
              </View>
              {/*eight part start here */}
              <View style={AddNewNoticeStyle.setnoticeviewdrop}>
                <Text style={AddNewNoticeStyle.Notificationtypetext}>
                  Set notification type
                </Text>
                <Dropdown
                  style={[
                    AddNewNoticeStyle.setnotificationdrop,
                    { width: 130 },
                  ]}
                  placeholderStyle={AddNewNoticeStyle.placeholderStyle}
                  selectedTextStyle={AddNewNoticeStyle.selectedTextStyle}
                  inputSearchStyle={AddNewNoticeStyle.inputSearchStyle}
                  iconStyle={AddNewNoticeStyle.iconStyle}
                  data={notification_type_Data}
                  maxHeight={300}
                  labelField="lookup_description"
                  valueField="lookup_key"
                  placeholder="Select"
                  value={notification_type_value}
                  onChange={(item) => {
                    setNotification_type_value(item.lookup_key);
                    // alert(item.lookup_key)
                  }}
                />
              </View>
              {/*nine part start here */}
              <View style={AddNewNoticeStyle.setcustomview}>
                <Text style={AddNewNoticeStyle.setcustometext}>Set custom</Text>
                <View style={AddNewNoticeStyle.customIcon}>
                  <Entypo
                    name="chevron-small-right"
                    size={22}
                    color={_COLORS.Kodie_GrayColor}
                    style={{ flex: 1, alignItems: "center" }}
                  />
                </View>
              </View>
            </View>

            <Divider style={AddNewNoticeStyle.dividerfourth} />
            <View style={AddNewNoticeStyle.jobDetailsView}>
              <Text style={LABEL_STYLES.commontext}>{"Notes"}</Text>
              <TextInput
                style={[AddNewNoticeStyle.input, { height: 100 }]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Add additional notes"
                placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                multiline
                numberOfLines={5}
                textAlignVertical={"top"}
              />
            </View>
            <View style={AddNewNoticeStyle.addattachmentbtnview}>
              <Text style={AddNewNoticeStyle.addattachment}>
                Add attachment
              </Text>
              <CustomSingleButton
                leftImage={IMAGES.uploadIcon}
                isLeftImage={true}
                _ButtonText={"Upload"}
                backgroundColor={_COLORS.Kodie_lightGreenColor}
                Text_Color={_COLORS.Kodie_BlackColor}
                disabled={isLoading ? true : false}
                onPress={() => {
                  selectDoc();
                }}
              />
              <Divider style={AddNewNoticeStyle.dividerfourth} />
              <CustomSingleButton
                _ButtonText={"Add notice"}
                Text_Color={_COLORS.Kodie_WhiteColor}
                disabled={isLoading ? true : false}
                onPress={() => {
                  noticeReminderid
                    ? update_createNoticeReminder()
                    : createNoticeReminder();
                }}
              />
            </View>
          </View>
        </ScrollView>
      )}
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default AddNewNotice;
