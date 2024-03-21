import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { NoticesStyle } from "./NoticesStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, IMAGES } from "../../../Themes";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import Notice from "../../../components/Molecules/Notice/Notice";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import NoticeBottomModal from "../../../components/Molecules/Select/NoticeBottomModal";
import { Config } from "../../../Config";
import axios from "axios";
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { Calendar } from "react-native-calendars"; //calender
const HorizontalData = [
  { filtername: "All", filterId: "All" },
  { filtername: "General", filterId: "367" },
  { filtername: "Inspection", filterId: "368" },
  { filtername: "Rent", filterId: "369" },
  { filtername: "Job", filterId: "370" },
];

const noticeData = [
  {
    day: "3/10",
    date: "Mon",
    lineimg: IMAGES.redLine,
    heading: "Lease agreement expiring in 30 days",
    locationimg: IMAGES.Location,
    address: "2118 Thornridge Cir. Syracuse,",
  },
  {
    day: "3/10",
    date: "Mon",
    lineimg: IMAGES.redLine,
    heading: "Lease agreement expiring in 30 days",
    locationimg: IMAGES.Location,
    address: "2118 Thornridge Cir. Syracuse,",
  },
  {
    day: "3/10",
    date: "Mon",
    lineimg: IMAGES.blueLine,
    heading: "Lease agreement expiring in 30 days",
    locationimg: IMAGES.Location,
    address: "2118 Thornridge Cir. Syracuse,",
  },
  {
    day: "3/10",
    date: "Mon",
    lineimg: IMAGES.redLine,
    heading: "Lease agreement expiring in 30 days",
    locationimg: IMAGES.Location,
    address: "2118 Thornridge Cir. Syracuse,",
  },
];
const Notices = (props) => {
  const [selectedDate, setSelectedDate] = useState(""); // calender state
  const isFocused = useIsFocused();
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse.....", loginData);
  const [isLoading, setIsLoading] = useState(false);
  const [noticeRemiderDetails, setNoticeRemiderDetails] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(["All"]);
  const [noticeReminderid, setNoticeReminderid] = useState("");
  const refRBSheet = useRef();


  const searchNoticesList =()=>{
    
  }
  const onDayPress = (day) => {
    //......
    setSelectedDate(day.dateString);
  };

  const onClose = () => {
    refRBSheet.current.close();
  };
  // useEffect(() => {
  //   getNoticesReminderDeatilsByFilter(selectedFilter);
  // }, [selectedFilter,]);

  useEffect(() => {
    if (isFocused) {
      getNoticesReminderDeatilsByFilter(selectedFilter);
    }
  }, [isFocused, selectedFilter]);
  // RenderItems......
  const horizontal_render = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          NoticesStyle.flatlistView,
          {
            backgroundColor: selectedFilter.includes(item.filterId)
              ? _COLORS?.Kodie_BlackColor
              : _COLORS?.Kodie_WhiteColor,
          },
        ]}
        onPress={() => setSelectedFilter([item.filterId])}
      >
        {selectedFilter.includes(item.filterId) ? null : (
          <View
            style={[
              NoticesStyle.round,
              {
                backgroundColor: selectedFilter.includes(item.filterId)
                  ? _COLORS?.Kodie_WhiteColor
                  : _COLORS?.Kodie_BlackColor,
              },
            ]}
          />
        )}
        <Text
          style={[
            NoticesStyle.item_style,
            {
              color: selectedFilter.includes(item.filterId) ? "white" : "black",
            },
          ]}
        >
          {item.filtername}
        </Text>
        {selectedFilter.includes(item.filterId) ? (
          <MaterialCommunityIcons
            name={"check"}
            size={18}
            color={_COLORS.Kodie_WhiteColor}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  const noticeRenderData = ({ item, index }) => {
    return (
      <View style={NoticesStyle.mainContainer}>
        <View style={NoticesStyle.dateDayview}>
          <Text style={NoticesStyle.datetext}>
            {moment(item.to_date).format("M/D ddd")}
          </Text>
        </View>
        <View style={NoticesStyle.middatabindview}>
          <View style={NoticesStyle.bindview}>
            <Image source={IMAGES.redLine} style={NoticesStyle.lineimg} />
            <View style={NoticesStyle.headinglineview}>
              <Text style={NoticesStyle.headintext}>{item.type_notice}</Text>
              <View style={NoticesStyle.addressviewbind}>
                <EvilIcons
                  name="location"
                  size={25}
                  color={_COLORS.Kodie_GrayColor}
                />
                <Text style={NoticesStyle.addresstext}>{item.location}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={NoticesStyle.dotsview}
            onPress={() => {
              refRBSheet.current.open();
              setNoticeReminderid(item.id);
              console.log("noticereminderId....", item.id);
            }}
          >
            <Entypo
              name="dots-three-vertical"
              size={25}
              color={_COLORS.Kodie_LightGrayColor}
              style={NoticesStyle.dotimg}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Api intrigation...
  const getNoticesReminderDeatilsByFilter = async (filter) => {
    setIsLoading(true);
    try {
      const url = Config.BASE_URL;
      const NoticesReminderDeatilsByFilter_url =
        url + "get_details_by_account_id_notices_reminder";
      console.log(
        "NoticesReminderDeatilsByFilter...",
        NoticesReminderDeatilsByFilter_url
      );
      const response = await axios.post(NoticesReminderDeatilsByFilter_url, {
        notices_filter: filter,
        // notices_filter: "All",
        account_id: loginData?.Login_details?.user_account_id,
        limit: 10,
        order_wise: "DESC",
        months: "02",
        year: "2024",
      });
      console.log(
        "NoticesReminderDeatilsByFilter_Data response...",
        response?.data
      );
      setNoticeRemiderDetails(response?.data?.data);
      console.log(
        "NoticesReminderDeatilsByFilter_Data..",
        response?.data?.data
      );
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert(error.response.message);
        setIsLoading(false);
      } else {
        // alert("An error occurred. Please try again later.");
        setIsLoading(false);
      }
      console.error("API Error NoticesReminderDeatilsByFilter_Data:", error);
      setIsLoading(false);
    }
  };

  const FinalDeleteProperty = async () => {
    setIsLoading(true);
    const url = Config.BASE_URL;
    const noticedelete = url + `delete_notices_reminder_details`;
    console.log("noticedelete", noticedelete);
    const noticesDeleteData = {
      notices_reminder_id: noticeReminderid,
      // notices_reminder_id: 24,
    };
    console.log("noticesDeleteData body.....", noticesDeleteData);
    try {
      const response = await axios.post(noticedelete, noticesDeleteData);
      console.log("API Response:", response.data);
      if (response.data.status === true) {
        // Alert.alert("notice Deleted", response.data.message);
        alert(response.data.data);
        getNoticesReminderDeatilsByFilter(selectedFilter);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("API Error noticedelete:", error);
      setIsLoading(false);
    }
  };
  return (
    <View style={NoticesStyle.mainview}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Notices"}
      />
      <ScrollView style={NoticesStyle.scrollContainer}>
        <View style={NoticesStyle.btnview}>
          <CustomSingleButton
            borderColor={_COLORS.Kodie_TransparentColor}
            _ButtonText={"Add new notice"}
            backgroundColor={_COLORS.Kodie_BlackColor}
            Text_Color={_COLORS.Kodie_WhiteColor}
            disabled={isLoading ? true : false}
            onPress={() => {
              props.navigation.navigate("AddNewNotice");
            }}
          />
        </View>

        <DividerIcon style={NoticesStyle.divider} />

        <View style={NoticesStyle.searchview}>
          <SearchBar
            marginTop={1}
            frontSearchIcon
            isFilterImage
            filterImage={IMAGES.up_down_Arrow}
            height={40}
            placeholder="Search notices"
          searchData={searchNoticesList}
            
          />
        </View>

        <View style={NoticesStyle.Container}>
          <View style={NoticesStyle.flat_MainView}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={HorizontalData}
              keyExtractor={(index, item) => item}
              renderItem={horizontal_render}
            />
          </View>
        </View>
        <DividerIcon />
        {/* .....calender */}
        <View style={{ flex: 1, backgroundColor: "#FFFFFF", marginTop: 100 }}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{ [selectedDate]: { selected: true } }}
          />
          <View>
            <Text>Selected Date: {selectedDate}</Text>
          </View>
        </View>
        {/* ..... */}
        {/* <View style={NoticesStyle.calenderview}>
          <MaterialCommunityIcons
            name={"chevron-left"}
            size={25}
            color={_COLORS.Kodie_BlackColor}
          />
          <Text style={NoticesStyle.monthtext}>September 2023</Text>
          <MaterialCommunityIcons
            name={"chevron-right"}
            size={25}
            color={_COLORS.Kodie_BlackColor}
          />
        </View> */}
        <View style={{ marginTop: 20, alignSelf: "center" }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={noticeRemiderDetails}
            keyExtractor={(index, item) => index.toString()}
            renderItem={noticeRenderData}
          />
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        height={220}
        closeOnDragDown={true}
        // closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: NoticesStyle.bottomModal_container,
        }}
      >
        <NoticeBottomModal
          onClose={onClose}
          noticeReminderid={noticeReminderid}
          FinalDeleteProperty={FinalDeleteProperty}
          selectFile={null}
        />
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default Notices;
