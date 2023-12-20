//ScreenNo:107
//ScreenNo:108
//ScreenNo:109
//ScreenNo:112
//ScreenNo:113
//ScreenNo:114
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { _COLORS, LABEL_STYLES } from "../../../../Themes";
import { RepairCss } from "./RepairCss";
import { _goBack } from "../../../../services/CommonServices/index";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SearchBar from "../../../../components/Molecules/SearchBar/SearchBar";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import Entypo from "react-native-vector-icons/Entypo";
import ArchiveJob from "../../../../components/Molecules/Archive/ArchiveJob/ArchiveJob";
import { Config } from "../../../../Config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ArchiveJobStyle } from "../../../../components/Molecules/Archive/ArchiveJob/ArchiveJobStyle";
const HorizontalData = ["Posted", "Ongoing", "Completed"];

const property_List1 = [
  {
    id: "1",
    name: "Electricals",
    location: "1729 Melbourne St Australia",
    buttonName: "Awaiting payment",
    tanentname: "Tom",
    budget: "Budget",
    spend: "$500",
    readText:
      "My door handle is broken and need some simple repairmen for this and need some Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    isPosted: true,
    isongoing: false,
    isCompleted: false,
    refno: "Ref #16694",
  },
];

export default Repair = (props) => {
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse.....", loginData);
  console.log("loginresponse_jobdetails..", loginData?.Login_details?.user_id);
  const account_id = loginData?.Login_details?.user_account_id;
  const [isLoading, setIsLoading] = useState(false);
  const [activeScreen, setActiveScreen] = useState(true);
  const [allJobData, setAllJobData] = useState([]);

  useEffect(() => {
    getAllJob();
  }, []);
  const horizontal_render = ({ item }) => {
    return (
      <TouchableOpacity style={RepairCss.flatlistView}>
        <View style={RepairCss.round} />
        <Text style={RepairCss.item_style}>{item}</Text>
      </TouchableOpacity>
    );
  };

  // Archive component call here...................
  <ArchiveJob />;

  // Api intrigation....
  const getAllJob = () => {
    const url = Config.BASE_URL;
    const getAllJobUrl = url + `job/getAlljobs/${account_id}`;
    console.log("Request URL:", getAllJobUrl);
    setIsLoading(true);
    axios
      .get(getAllJobUrl)
      .then((response) => {
        console.log("API Response getAllJob..:", response.data);
        setAllJobData(response.data.data);
      })
      .catch((error) => {
        console.error("API failed_moduleName", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const propertyData_render1 = ({ item }) => {
    return (
      <TouchableOpacity
      // onPress={props.onPress}
      >
        <View style={RepairCss.Container}>
          <View style={RepairCss.flat_MainView}>
            <View style={RepairCss.flexContainer}>
              <Text style={LABEL_STYLES.commontext}>
                {item.service_looking}
              </Text>
            </View>
            <View style={RepairCss.RightContainer}>
              <View
                style={[
                  RepairCss.buttonView,
                  {
                    backgroundColor: item.isPosted
                      ? _COLORS.Kodie_mostLightBlueColor
                      : item.isongoing
                      ? _COLORS.Kodie_LightOrange
                      : _COLORS.Kodie_mostLightGreenColor,
                  },
                ]}
              >
                <View
                  style={[
                    RepairCss.roundButton,

                    {
                      backgroundColor: item.isPosted
                        ? _COLORS.Kodie_BlueColor
                        : item.isongoing
                        ? _COLORS.Kodie_DarkOrange
                        : _COLORS.Kodie_GreenColor,
                    },
                  ]}
                />
                <Text
                  style={[
                    RepairCss.buttonText,
                    {
                      color: item.isPosted
                        ? _COLORS.Kodie_BlueColor
                        : item.isongoing
                        ? _COLORS.Kodie_DarkOrange
                        : _COLORS.Kodie_GreenColor,
                      flex: 1,
                    },
                  ]}
                >
                  {"Awaiting"}
                </Text>
              </View>
            </View>
            <Entypo
              name={"dots-three-horizontal"}
              size={20}
              color={_COLORS.Kodie_GrayColor}
              style={{ marginLeft: 15 }}
            />
          </View>
          <Text style={LABEL_STYLES.commonMidtext}>{item.job_reference}</Text>
          <View style={RepairCss.flat_MainView}>
            <View style={RepairCss.flexContainer}>
              <View style={RepairCss.propertyView}>
                <View style={RepairCss.flexContainer}>
                  <Text
                    style={RepairCss.tom}
                  >{`${item.first_name} ${item.last_name}`}</Text>
                  <View style={RepairCss.locationView}>
                    <MaterialCommunityIcons
                      name={"map-marker"}
                      size={12}
                      color={_COLORS.Kodie_MediumGrayColor}
                      style={{ alignSelf: "center" }}
                    />
                    <Text style={RepairCss.locationText}>
                      {item.job_location}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[RepairCss.BudgetView]}>
              <View style={RepairCss.flexContainer}>
                <Text style={RepairCss.bugetText}>{"Budget"}</Text>
                <Text style={RepairCss.spend}>{item.job_budget}</Text>
              </View>
            </View>
          </View>
        </View>
        <DividerIcon />
      </TouchableOpacity>
    );
  };
  return (
    <View style={RepairCss.mainContainer}>
      <ScrollView>
        <View style={RepairCss.Container}>
          <RowButtons
            LeftButtonText={"Jobs I am servicing"}
            leftButtonHeight={40}
            leftButtonbackgroundColor={
              activeScreen
                ? _COLORS.Kodie_WhiteColor
                : _COLORS.Kodie_lightGreenColor
            }
            LeftButtonborderColor={
              activeScreen
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_lightGreenColor
            }
            RightButtonText={"Jobs I have requested"}
            RightButtonbackgroundColor={
              activeScreen
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            RightButtonborderColor={
              activeScreen
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_GrayColor
            }
            LeftButtonTextColor={
              activeScreen ? _COLORS.Kodie_GrayColor : _COLORS.Kodie_BlackColor
            }
            RightButtonTextColor={
              activeScreen ? _COLORS.Kodie_BlackColor : _COLORS.Kodie_GrayColor
            }
            RightButtonHeight={40}
            onPressLeftButton={() => setActiveScreen(false)}
            onPressRightButton={() => setActiveScreen(true)}
          />
        </View>
        <DividerIcon borderBottomWidth={5} marginTop={8} />
        <View style={RepairCss.Container}>
          <CustomSingleButton
            _ButtonText={
              activeScreen ? "+ Create new job request" : "+ Add job"
            }
            disabled={isLoading ? true : false}
            Text_Color={_COLORS.Kodie_WhiteColor}
            text_Size={14}
            backgroundColor={_COLORS.Kodie_BlackColor}
            height={40}
            marginTop={3}
            onPress={activeScreen ? props.onpress : null}
          />
        </View>
        <DividerIcon borderBottomWidth={5} marginTop={8} />
        <SearchBar frontSearchIcon height={48} marginTop={5} />
        <View style={RepairCss.Container}>
          <View style={RepairCss.flat_MainView}>
            <TouchableOpacity style={RepairCss.AllView}>
              <Text style={RepairCss.item_style}>ALL</Text>
              <MaterialCommunityIcons
                name={"check"}
                size={18}
                color={_COLORS.Kodie_WhiteColor}
              />
            </TouchableOpacity>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={HorizontalData}
              renderItem={horizontal_render}
            />
          </View>
        </View>
        <DividerIcon />
        {activeScreen ? (
          <FlatList data={allJobData} renderItem={propertyData_render1} />
        ) : (
          <ArchiveJob />
        )}
      </ScrollView>
    </View>
  );
};
