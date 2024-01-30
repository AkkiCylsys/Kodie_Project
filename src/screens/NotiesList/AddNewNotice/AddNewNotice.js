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
import ToggleSwitch from "toggle-switch-react-native";
import AddGuest from "../../../components/Molecules/AddGuests/AddGuest";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _goBack } from "../../../services/CommonServices";
import SwitchToggle from "react-native-switch-toggle";
import { Config } from "../../../Config";
import axios from "axios";
const data = [
  { label: "Bharat", value: "1" },
  { label: "Australia", value: "2" },
  { label: "America", value: "3" },
];
const AddNewNotice = (props) => {
  const [value, setValue] = useState(null);
  const [location, setLocation] = useState("");
  const [noticeTittle, setNoticeTittle] = useState("");
  const [addGuest, setAddGuest] = useState("");
  const [select, setSelect] = useState("");
  const [propertyDesc, setPropertyDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toggleDay, setToggleDay] = useState(false);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [noticeTypeData, setNoticeTypeData] = useState([]);
  const [noticeTypeDataValue, setNoticeTypeDataValue] = useState("");
  const [repeatData, setRepeatData] = useState([]);
  const [repeatDataValue, setRepeatDataValue] = useState([]);
  const [notification_type_Data, setNotification_type_Data] = useState([]);
  const [notification_type_value, setNotification_type_value] = useState("");

  useEffect(() => {
    handle_notice();
    handle_Repeat();
    handle_notification_type();
  }, []);
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
      P_PARENT_CODE: "TYPE_OF_NOTICE",
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
  return (
    <View style={AddNewNoticeStyle.MainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Add new notice"}
      />
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
          {/* third part start here */}
          <View style={AddNewNoticeStyle.mainreapeatview}>
            {/* <Image source={IMAGES.RightLeftarrow} /> */}
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
          <View style={AddNewNoticeStyle.datetimeview}>
            <View style={AddNewNoticeStyle.dateview}>
              <Text style={AddNewNoticeStyle.datetext}>Thu, Aug 17 2023</Text>
              <Text style={AddNewNoticeStyle.timetext}>5:00 PM</Text>
            </View>
            <View style={AddNewNoticeStyle.dateview}>
              <Text style={AddNewNoticeStyle.datetext}>Thu, Aug 17 2023</Text>
              <Text style={AddNewNoticeStyle.timetext}>1:00 PM</Text>
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
            <View style={AddNewNoticeStyle.addlocationmainview}>
              <Text style={AddNewNoticeStyle.addlocationtext}>
                Add location
              </Text>
              <View style={AddNewNoticeStyle.locationInputview}>
                <Entypo name="location-pin" size={20} />
                <TextInput
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Enter new location"
                />
              </View>
            </View>
            <Divider style={AddNewNoticeStyle.dividerfourth} />

            {/*seven part start here */}
            <View style={AddNewNoticeStyle.setnotificationview}>
              <View style={AddNewNoticeStyle.notificationbind}>
                <SimpleLineIcons name="bell" size={25} />
                <Text style={AddNewNoticeStyle.settext}>Set notification </Text>
              </View>
              <SwitchToggle
                switchOn={toggleNotification}
                onPress={() => {
                  setToggleNotification(!toggleNotification);
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
                style={[AddNewNoticeStyle.setnotificationdrop, { width: 130 }]}
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
          {/* <View style={AddNewNoticeStyle.inputContainer}>
            <Text style={AddNewNoticeStyle.propertydesctext}>Notes</Text>
            <TextInput
              style={AddNewNoticeStyle.input}
              value={propertyDesc}
              onChangeText={setPropertyDesc}
              placeholder="Add additional notes..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={"top"}
            />
          </View> */}
          <View style={AddNewNoticeStyle.jobDetailsView}>
            <Text style={LABEL_STYLES.commontext}>{"Notes"}</Text>
            <TextInput
              style={[AddNewNoticeStyle.input, { height: 100 }]}
              value={propertyDesc}
              onChangeText={setPropertyDesc}
              placeholder="Search location"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              multiline
              numberOfLines={5}
              textAlignVertical={"top"}
            />
          </View>
          <View style={AddNewNoticeStyle.addattachmentbtnview}>
            <Text style={AddNewNoticeStyle.addattachment}>Add attachment</Text>
            <CustomSingleButton
              leftImage={IMAGES.uploadIcon}
              isLeftImage={true}
              _ButtonText={"Upload"}
              backgroundColor={_COLORS.Kodie_lightGreenColor}
              Text_Color={_COLORS.Kodie_BlackColor}
              disabled={isLoading ? true : false}
            />
            <Divider style={AddNewNoticeStyle.dividerfourth} />
            <CustomSingleButton
              _ButtonText={"Add notice"}
              Text_Color={_COLORS.Kodie_WhiteColor}
              disabled={isLoading ? true : false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddNewNotice;
