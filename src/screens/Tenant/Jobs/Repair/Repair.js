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
  Alert,
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
import { useIsFocused } from "@react-navigation/native";
import { ArchiveJobStyle } from "../../../../components/Molecules/Archive/ArchiveJob/ArchiveJobStyle";
import BottomModalData from "../../../../components/Molecules/BottomModal/BottomModalData";
import BottomJobModal from "../../../../components/Molecules/BottomModal/BottomJobModal";
import Modal from "react-native-modal";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";

const HorizontalData = ["All", "Recent", "Posted", "Ongoing", "Completed"];

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
  const isvisible = useIsFocused();
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse.....", loginData);
  console.log(
    "loginresponse_jobdetails..",
    loginData?.Login_details?.user_account_id
  );
  const user_role_id = loginData?.Account_details[0]?.user_role_id;
  // alert(user_role_id);

  const account_id = loginData?.Login_details?.user_account_id;
  const [isLoading, setIsLoading] = useState(false);
  const [activeScreen, setActiveScreen] = useState(true);
  const [allJobData, setAllJobData] = useState([]);
  const [isDeleteData_Clicked, setIsDeleteData_Clicked] = useState(false);
  const [JobId, setJobId] = useState(0);
  const [Job_Id, setJob_Id] = useState(0);
  const [Address, setAddress] = useState();
  const [isDeleteBottomSheetVisible, setIsDeleteBottomSheetVisible] =
    useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [JobData, setJobData] = useState([]);
  // alert(Job_Id);
  const handleCloseModal = () => {
    setIsDeleteData_Clicked(false);
    setIsDeleteBottomSheetVisible(false);
  };
  const CloseUp = () => {
    setIsDeleteData_Clicked(false);
    setIsDeleteBottomSheetVisible(false);
  };
  const getJobDetailsByFilter = async (filter) => {
    setIsLoading(true);
    // alert(JSON.stringify(loginData?.Login_details?.user_account_id));
    try {
      const url = Config.BASE_URL;
      const filter_apiUrl = url + "job/getJobbyFilter";
      console.log("filter_apiUrl...", filter_apiUrl);
      const response = await axios.post(filter_apiUrl, {
        job_filter: filter,
        user_account_id: account_id,
        page_no: 1,
        limit: filter == "Recent" ? 5 : 10,
        order_col: "2",
        order_wise: "DESC",
      });

      setJobData(response?.data?.job_details);
      console.log("listJobdata", JobData);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert(error.response.message);
        setIsLoading(false);
      } else {
        alert("An error occurred. Please try again later.");
        setIsLoading(false);
      }
      console.error("API Error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isvisible) {
      getJobDetailsByFilter(selectedFilter);
    }
  }, [selectedFilter, isvisible]);
  const jobDelete = async () => {
    setIsDeleteData_Clicked(true);
  };
  const FinalDeleteProperty = async () => {
    setIsLoading(true);
    setIsDeleteData_Clicked(false);
    setIsDeleteBottomSheetVisible(false);
    const url = Config.BASE_URL;
    const jobdelete = url + `job/deletejob/${JobId}`;
    console.log("jobdelete", jobdelete);
    try {
      const response = await axios.delete(jobdelete);

      console.log("API Response:", response.data);
      if (response.data.success === true) {
        Alert.alert("Job Deleted", response.data.message);

        getJobDetailsByFilter(selectedFilter);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("API Error:", error);
      setIsLoading(false);
    }
  };
  // useEffect(() => {
  //   getAllJob();
  // }, []);
  const horizontal_render = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          RepairCss.flatlistView,
          {
            backgroundColor:
              selectedFilter === item
                ? _COLORS?.Kodie_BlackColor
                : _COLORS?.Kodie_WhiteColor,
          },
        ]}
        onPress={() => setSelectedFilter(item)}
      >
        {selectedFilter === item ? null : (
          <View
            style={[
              RepairCss.round,
              {
                backgroundColor:
                  selectedFilter === item
                    ? _COLORS?.Kodie_WhiteColor
                    : _COLORS?.Kodie_BlackColor,
              },
            ]}
          />
        )}
        <Text
          style={[
            RepairCss.item_style,
            { color: selectedFilter === item ? "white" : "black" },
          ]}
        >
          {item}
        </Text>
        {selectedFilter === item ? (
          <MaterialCommunityIcons
            name={"check"}
            size={18}
            color={_COLORS.Kodie_WhiteColor}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  // Archive component call here...................
  <ArchiveJob />;

  // Api intrigation....
  // const getAllJob = () => {
  //   const url = Config.BASE_URL;
  //   const getAllJobUrl = url + `job/getAlljobs/${account_id}`;
  //   console.log("Request URL:", getAllJobUrl);
  //   setIsLoading(true);
  //   axios
  //     .get(getAllJobUrl)
  //     .then((response) => {
  //       console.log("API Response getAllJob..:", response.data);
  //       setAllJobData(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("API failed_moduleName", error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  const propertyData_render1 = ({ item }) => {
    setJob_Id(item?.job_id);
    return (
      <TouchableOpacity
        onPress={() => {
          props.create_job_id?.(item.job_id);
        }}
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
            <TouchableOpacity
              onPress={() => {
                setIsDeleteBottomSheetVisible(true);
                setJobId(item.job_id);
                setAddress(item?.job_location);
              }}
            >
              <Entypo
                name={"dots-three-horizontal"}
                size={20}
                color={_COLORS.Kodie_GrayColor}
                style={{ marginLeft: 15 }}
              />
            </TouchableOpacity>
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
        {/* {user_role_id === "4" ? ( */}
          <>
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
                  activeScreen
                    ? _COLORS.Kodie_GrayColor
                    : _COLORS.Kodie_BlackColor
                }
                RightButtonTextColor={
                  activeScreen
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_GrayColor
                }
                RightButtonHeight={40}
                onPressLeftButton={() => setActiveScreen(false)}
                onPressRightButton={() => setActiveScreen(true)}
              />
            </View>
            <DividerIcon borderBottomWidth={5} marginTop={8} />
          </>
        {/* ) : null} */}

        {/* {user_role_id === "4" ? ( */}
          <>
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
                onPress={activeScreen ? props.onpress : props.onpress}
              />
            </View>
            <DividerIcon borderBottomWidth={5} marginTop={8} />
          </>
        {/* ) : null} */}

        <SearchBar frontSearchIcon height={48} marginTop={5} />
        <View style={RepairCss.Container}>
          <View style={RepairCss.flat_MainView}>
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
          <FlatList data={JobData} renderItem={propertyData_render1} />
        ) : (
          <ArchiveJob />
        )}
      </ScrollView>
      <Modal
        isVisible={isDeleteBottomSheetVisible}
        onBackdropPress={() => setIsDeleteBottomSheetVisible(true)}
        style={[
          RepairCss.bottomModal_container,
          {
            position: "absolute",
            left: -20,
            bottom: -30,
            width: "100%",
            height: isDeleteData_Clicked ? "40%" : "45%",
            backgroundColor: "white",
            borderRadius: 10,
            paddingVertical: 8,
          },
        ]}
      >
        <BottomJobModal
          JobId={JobId}
          onDelete={jobDelete}
          onCloseModal={handleCloseModal}
          isDeletePropertyClicked={isDeleteData_Clicked}
          onDeleteData={FinalDeleteProperty}
          Address={Address}
          onClose={CloseUp}
        />
      </Modal>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
