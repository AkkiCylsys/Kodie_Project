import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import moment from "moment";
import { _COLORS, LABEL_STYLES, IMAGES } from "../../../Themes";
import { HireContractorCSS } from "./HireContractorCSS";
import TopHeader from "../../../components/Molecules/Header/Header";
import Budget from "../../../components/Molecules/Budget/Budget";
import Calendar from "../../../components/Molecules/Calander/Calendar";
import TimePicker from "../../../components/Molecules/ClockPicker/TimePicker";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import { _goBack } from "./../../../services/CommonServices/index";

export default HireContractor = (props) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [isLeftButtonClicked, setIsLeftButtonClicked] = useState(false);
  const [isRequestButtonClicked, setIsRequestButtonClicked] = useState(false);
  const handleLeftHireButtonClick = () => {
    setIsLeftButtonClicked(!isLeftButtonClicked);
  };
  const handleRightHireButtonClick = () => {
    setIsLeftButtonClicked(!isLeftButtonClicked);
  };
  useEffect(() => {
    setCurrentDate(moment(new Date()).format("DD-MM-YYYY"));
    setCurrentTime(moment(new Date()).format("hh:mm "));
  }, []);
  return (
    <View style={HireContractorCSS.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Job Detail"}
      />
      <ScrollView>
        <View style={HireContractorCSS.Container}>
          <Text style={LABEL_STYLES.commontext}>Plasterer to fix wall</Text>
          <Text style={HireContractorCSS.haddingText}>Posted Nov 5, 2022</Text>
          <Text
            style={[LABEL_STYLES.commontext, HireContractorCSS.discription]}
          >
            Description
          </Text>
          <Text style={[HireContractorCSS.Disc_Text]}>
            My wall needs to fixed, its cracked. I need a plasterer to fix my
            wall and need approval from landlord.
          </Text>
          <Text
            style={[LABEL_STYLES.commontext, HireContractorCSS.discription]}
          >
            Contractor
          </Text>
          <View style={HireContractorCSS.Cont_View}>
            <View style={HireContractorCSS.UserImageView}>
              <Image source={IMAGES.userImage} />
            </View>
            <Text
              style={[LABEL_STYLES._texinputLabel, HireContractorCSS.userName]}
            >
              Jason Statham
            </Text>
          </View>
          <Budget PriceText={" $200"} />
          <Text style={HireContractorCSS.terms}>Terms</Text>
          <Text
            style={[LABEL_STYLES.commontext, HireContractorCSS.discription]}
          >
            Request date and time
          </Text>
          <View style={HireContractorCSS.datePickerView}>
            <View style={HireContractorCSS.calenderView}>
              <Text style={HireContractorCSS.textInputStyle}>
                {currentDate && currentDate != ""
                  ? String(currentDate)
                  : "Date "}
              </Text>
              <Calendar
                data={new Date()}
                getData={(date) =>
                  setCurrentDate(moment(date).format("DD-MM-YYYY"))
                }
              />
            </View>
            <View style={HireContractorCSS.spaceView} />
            <View style={[HireContractorCSS.calenderView]}>
              <Text style={HireContractorCSS.textInputStyle}>
                {currentTime && currentTime != ""
                  ? String(currentTime)
                  : "Time"}
              </Text>
              <TimePicker
                data={new Date()}
                getData={(date) => {
                  setCurrentTime(moment(date).format("hh:mm "));
                }}
              />
            </View>
          </View>
          <Text
            style={[LABEL_STYLES.commontext, HireContractorCSS.discription]}
          >
            Who pays?
          </Text>
          <RowButtons
            leftButtonHeight={38}
            RightButtonHeight={38}
            LeftButtonText={"Tenant"}
            RightButtonText={"PM"}
            RightButtonbackgroundColor={
              isLeftButtonClicked
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            leftButtonbackgroundColor={
              isLeftButtonClicked
                ? _COLORS.Kodie_WhiteColor
                : _COLORS.Kodie_lightGreenColor
            }
            RightButtonborderColor={
              isLeftButtonClicked
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_GrayColor
            }
            LeftButtonborderColor={
              isLeftButtonClicked
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_lightGreenColor
            }
            LeftButtonTextColor={
              isLeftButtonClicked
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_BlackColor
            }
            RightButtonTextColor={
              isLeftButtonClicked
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_GrayColor
            }
            onPressLeftButton={handleLeftHireButtonClick}
            onPressRightButton={handleRightHireButtonClick}
          />
        </View>
      </ScrollView>
      <View style={HireContractorCSS.buttonView}>
        <View style={HireContractorCSS.button}>
          <RowButtons
            LeftButtonText={"Cancel"}
            RightButtonText={
              isRequestButtonClicked ? "Request approval" : "Hire"
            }
            onPressRightButton={() => {
              setIsRequestButtonClicked(!isRequestButtonClicked);
              props.navigation.navigate("JobCompletion");
            }}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_WhiteColor}
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            RightButtonborderColor={_COLORS.Kodie_BlackColor}
          />
        </View>
      </View>
    </View>
  );
};
