import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  _COLORS,
  LABEL_STYLES,
  BANNERS,
  IMAGES,
  FONTFAMILY,
} from "../../../../Themes";
import { PropertyListCSS } from "./PropertyListCSS";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices/index";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SearchBar from "../../../../components/Molecules/SearchBar/SearchBar";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomModalData from "../../../../components/Molecules/BottomModal/BottomModalData";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import { Config } from "../../../../Config";
import axios from "axios";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";
import { useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
const HorizontalData = [
  "All",
  "Recent",
  "Occupied",
  "Vacant",
  "Rent Pending",
  "Rent Received",
  "Archive",
];
const property_List2 = [
  {
    id: "1",
    propertyName: "Apartment",
    name: "Melbourne",
    location: "8502 Preston Rd. Inglewood",
    image: BANNERS.apartment,
    buttonName: "Late Payment",
    tanentname: "Jason Stathom",
    rent: "$850.00",
    badroom: "3",
    bathroom: "2",
    parking: "1",
    aspact_ratio: "86m2",
    isRentPanding: true,
    isRentReceived: false,
    isinviteTenants: false,
  },
];
const PropertyList = (props) => {
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginData", loginData?.Login_details?.result);
  const isvisible = useIsFocused();
  const [activeScreen, setActiveScreen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const [Property_Data_List, setProperty_Data_List] = useState([]);
  const [filterData, setFliterData] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteData_Clicked, setIsDeleteData_Clicked] = useState(false);
  const [propertyDelId, setPropertyDelId] = useState();
  const [Address, setAddress] = useState();
  const [page, setPage] = useState(1);
  const refRBSheet = useRef();

  useEffect(() => {
    if (isvisible) {
      propertyList_Data();
    }
  }, [isvisible, page, isvisible, filterData]);

  const propertyList_Data = (filter) => {
    const propertyDataList = {
      property_filter: filter || "All",
      user_account_id: loginData?.Login_details?.result,
      // user_account_id: 84,
      page_no: page,
      limit: filter === "Most Recent" ? 5 : 10,
      order_col: 1,
      order_wise: "DESC",
    };

    const url =
      "https://cylsys-kodie-api-01-e3fa986bbe83.herokuapp.com/api/v1/get_property_details_by_filter";
    console.log("Request URL :", url);
    setIsLoading(true);
    axios
      .post(url, propertyDataList)
      .then((response) => {
        console.log("property_Data_list", response.data);
        if (response.data.status === true) {
          setIsLoading(false);

          if (filter === "Recent") {
            const newData = response.data.property_details.slice(0, 5);
            setProperty_Data_List(newData);
            console.log("New Data for Most Recent:...........", newData);
          } else if (filter === "Occupied") {
            const newData = response.data.property_details.slice(0);
            setProperty_Data_List(newData);
            console.log("New Data for Occupied:...........", newData);
          } else if (filter === "Vacant") {
            const newData = response.data.property_details.slice(0);
            setProperty_Data_List(newData);
            console.log("New Data for Vacant:...........", newData);
          } else if (filter === "Rent Pending") {
            const newData = response.data.property_details.slice(0);
            setProperty_Data_List(newData);
            console.log("New Data for Rent Pending:...........", newData);
          } else if (filter === "Rent Received") {
            const newData = response.data.property_details.slice(0);
            setProperty_Data_List(newData);
            console.log("New Data for Rent Received:...........", newData);
          } else if (filter === "Archive") {
            const newData = response.data.property_details.slice(0);
            setProperty_Data_List(newData);
            console.log("New Data for Archive:...........", newData);
          } else {
            let newData;

            // Check if the filter is "All" or if there are at least 5 items for the filter
            if (
              filter === "All" ||
              response.data.property_details.length >= 5
            ) {
              newData = response.data.property_details;
            } else {
              newData = [];
            }

            setProperty_Data_List((prevData) =>
              page > 1 ? [...prevData, ...newData] : newData
            );
          }
        } else {
          console.error("property_Data_list_error:", response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("property_Data_list error:", error);
        setIsLoading(false);
      });
  };

  // const propertyList_Data = (filter) => {
  //   const propertyDataList = {
  //     property_filter: filter || 'All',
  //     user_account_id: loginData?.Login_details?.result,
  //     page_no: page,
  //     limit: 10,
  //     order_col: 1,
  //     order_wise: "DESC",
  //   };

  //   const url =
  //     "https://cylsys-kodie-api-01-e3fa986bbe83.herokuapp.com/api/v1/get_property_details_by_filter";
  //   console.log("Request URL :", url);
  //   setIsLoading(true);
  //   axios
  //     .post(url, propertyDataList)
  //     .then((response) => {
  //       console.log("property_Data_list", response.data);
  //       console.log("Property_Data_List", Property_Data_List);

  //       if (response.data.status === true) {
  //         setIsLoading(false);

  //         if (filter === "Recent") {
  //           const newData = response.data.property_details.slice(0, 5);
  //           setProperty_Data_List(newData);
  //           console.log("New Data for Most Recent:...........", newData);
  //         } else if (filter === "Occupied") {
  //           const newData = response.data.property_details.slice(0);
  //           setProperty_Data_List(newData);
  //           console.log("New Data for Occupied:...........", newData);
  //         } else if (filter === "Vacant") {
  //           const newData = response.data.property_details.slice(0);
  //           setProperty_Data_List(newData);
  //           console.log("New Data for Vacant:...........", newData);
  //         } else if (filter === "Rent Pending") {
  //           const newData = response.data.property_details.slice(0);
  //           setProperty_Data_List(newData);
  //           console.log("New Data for Rent Pending:...........", newData);
  //         } else if (filter === "Rent Received") {
  //           const newData = response.data.property_details.slice(0);
  //           setProperty_Data_List(newData);
  //           console.log("New Data for Rent Received:...........", newData);
  //         } else if (filter === "Archive") {
  //           const newData = response.data.property_details.slice(0);
  //           setProperty_Data_List(newData);
  //           console.log("New Data for Archive:...........", newData);
  //         } else {
  //           let newData;

  //           // Check if the filter is "All" or if there are at least 5 items for the filter
  //           if (
  //             filter === "All" ||
  //             response.data.property_details.length >= 5
  //           ) {
  //             newData = response.data.property_details;
  //           } else {
  //             newData = [];
  //           }

  //           setProperty_Data_List((prevData) =>
  //             page > 1 ? [...prevData, ...newData] : newData
  //           );
  //         }
  //       } else {
  //         console.error("property_Data_list_error:", response.data.error);
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("property_Data_list error:", error);
  //       setIsLoading(false);
  //     });
  // };

  // const propertyList_Data = (filter) => {
  //   const propertyDataList = {
  //     property_filter: filter || "All",
  //     user_account_id: loginData?.Login_details?.result,
  //     page_no: page,
  //     limit: 10,
  //     order_col: 1,
  //     order_wise: "DESC",
  //   };

  //   const url =
  //     "https://cylsys-kodie-api-01-e3fa986bbe83.herokuapp.com/api/v1/get_property_details_by_filter";
  //   console.log("Request URL :", url);
  //   setIsLoading(true);
  //   axios
  //     .post(url, propertyDataList)
  //     .then((response) => {
  //       console.log("property_Data_list", response.data);
  //       if (response.data.status === true) {
  //         setIsLoading(false);

  //         if (filter === "Recent") {
  //           const newData = response.data.property_details.slice(0, 5);
  //           setProperty_Data_List(newData);
  //           console.log("New Data for Most Recent:...........", newData);
  //         } else {
  //           const newData = response.data.property_details;

  //           setProperty_Data_List((prevData) =>
  //             page > 1 ? [...prevData, ...newData] : newData
  //           );

  //         }
  //       } else {
  //         console.error("property_Data_list_error:", response.data.error);
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("property_Data_list error:", error);
  //       setIsLoading(false);
  //     });
  // };

  // new bind to show the data.......
  // const propertyList_Data = (filter) => {
  //   const propertyDataList = {
  //     property_filter: filter || "All",
  //     user_account_id: loginData?.Login_details?.result,
  //     page_no: 1, // Reset page to 1 when changing the filter
  //     limit: 10,
  //     order_col: 1,
  //     order_wise: "DESC",
  //   };

  //   const url =
  //     "https://cylsys-kodie-api-01-e3fa986bbe83.herokuapp.com/api/v1/get_property_details_by_filter";
  //   console.log("Request URL :", url);
  //   setIsLoading(true);

  //   axios
  //     .post(url, propertyDataList)
  //     .then((response) => {
  //       console.log("property_Data_list", response.data);
  //       if (response.data.status === true) {
  //         setIsLoading(false);

  //         if (filter === "Recent") {
  //           const newData = response.data.property_details.slice(0, 5);
  //           setProperty_Data_List(newData);
  //           console.log("New Data for Most Recent:...........", newData);
  //         } else if (filter === "Occupied") {
  //           const newData = response.data.property_details.slice(0);
  //           setProperty_Data_List(newData);
  //           console.log("New Data for Occupied:...........", newData);
  //         } else {
  //           const newData = response.data.property_details;
  //           setProperty_Data_List(newData);
  //         }
  //       } else {
  //         console.error("property_Data_list_error:", response.data.error);
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("property_Data_list error:", error);
  //       setIsLoading(false);
  //     });
  // };

  const handleEndReached = () => {
    if (!isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const propertyDelete = async () => {
    // setIsLoading(true);
    // alert(propertyDelId);
    setIsDeleteData_Clicked(true);
  };
  const FinalDeleteProperty = async () => {
    // alert(propertyDelId);
    setIsLoading(true);
    setIsDeleteData_Clicked(false);
    refRBSheet.current.close();

    try {
      let propertyIdToDelete = propertyDelId;
      // Replace with the actual property ID
      // const apiUrl = `https://cylsys-kodie-api-01-e3fa986bbe83.herokuapp.com/api/v1/delete_property_by_id?property_id=${propertyIdToDelete}`;
      const apiUrl = `https://cylsys-kodie-api-01-e3fa986bbe83.herokuapp.com/api/v1/delete_property_by_id`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          // Add any necessary headers here
          Accept: "application/json",
          "Content-Type": "application/json",
          // Add any authorization headers if required
        },
        body: JSON.stringify({ property_id: propertyDelId }),
      });
      console.log("response...............", response.data);
      if (response.ok) {
        Alert.alert(
          "Property Deleted",
          "The property was deleted successfully."
        );

        propertyList_Data();
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      // Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  const handleButtonClick = (filter) => {
    propertyList_Data(filter);

    setFliterData(filter);
  };

  const horizontal_render = ({ item }) => {
    const isSelected = item === filterData;
    console.log("isSelected.....", isSelected, item);

    return (
      <TouchableOpacity
        style={[
          PropertyListCSS.flatlistView,
          isSelected && { backgroundColor: "black" },
        ]}
        onPress={() => handleButtonClick(item)}
      >
        {isSelected ? null : (
          <View
            style={[
              PropertyListCSS.round,
              isSelected && { backgroundColor: "white" },
            ]}
          />
        )}
        <Text
          style={[PropertyListCSS.item_style, isSelected && { color: "white" }]}
        >
          {item}
        </Text>
        {isSelected ? (
          <MaterialCommunityIcons
            name={"check"}
            size={18}
            color={_COLORS.Kodie_WhiteColor}
          />
        ) : null}
      </TouchableOpacity>
    );
  };
  // const [name, state, country] = Property_Data_List[0]?.location.split(", ");

  const propertyData1_render = ({ item }) => {
    const isExpanded = expandedItems.includes(item.property_id);

    return (
      <>
        <View style={PropertyListCSS.flatListContainer}>
          <View style={PropertyListCSS.flat_MainView}>
            <View style={PropertyListCSS.flexContainer}>
              <Text style={PropertyListCSS.apartmentText}>
                {item.property_type}
              </Text>
              <Text style={LABEL_STYLES.commontext}>{item.State}</Text>
              <View style={PropertyListCSS.flat_MainView}>
                <MaterialCommunityIcons
                  name={"map-marker"}
                  size={12}
                  color={_COLORS.Kodie_GreenColor}
                />
                <Text style={PropertyListCSS.locationText}>
                  {item.location}
                </Text>
              </View>
            </View>
            {item?.image_path[0] ? (
              <Image
                source={{ uri: item.image_path[0] }}
                style={PropertyListCSS.imageStyle}
              />
            ) : (
              <View
                style={[
                  PropertyListCSS.imageStyle,
                  { justifyContent: "center" },
                ]}
              >
                <Text style={PropertyListCSS.Img_found}>
                  {"Image not found"}
                </Text>
              </View>
            )}

            <View style={PropertyListCSS.flexContainer}>
              <View style={PropertyListCSS.noteStyle}>
                <TouchableOpacity
                  // onPress={props?.onEdit(item?.property_id)}
                  // onPress={props?.onEdit?.(item?.property_id)}
                  onPress={() => {
                    props?.onEdit?.({
                      propertyid: item?.property_id,
                    });
                  }}
                >
                  <Image
                    source={IMAGES.noteBook}
                    // source={IMAGES.noteBook}
                    style={PropertyListCSS.noteIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    refRBSheet.current.open();
                    // propertyDelete(propertyDelId);
                    // alert(item.property_id);
                    setPropertyDelId(item.property_id);

                    setAddress(item?.location);
                  }}
                >
                  <MaterialCommunityIcons
                    name={"dots-horizontal"}
                    size={25}
                    color={_COLORS.Kodie_LightGrayColor}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  PropertyListCSS.buttonView,
                  {
                    backgroundColor: item.isRentPanding
                      ? _COLORS.Kodie_LightOrange
                      : item.isRentReceived
                      ? _COLORS.Kodie_mostLightGreenColor
                      : _COLORS.Kodie_LightGrayColor,
                  },
                ]}
              >
                <View
                  style={[
                    PropertyListCSS.roundButton,
                    {
                      backgroundColor: item.isRentPanding
                        ? _COLORS.Kodie_DarkOrange
                        : item.isRentReceived
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_LightGrayColor,
                    },
                  ]}
                />
                <Text
                  style={[
                    PropertyListCSS.buttonText,
                    {
                      color: item.isRentPanding
                        ? _COLORS.Kodie_DarkOrange
                        : item.isRentReceived
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_MediumGrayColor,
                    },
                  ]}
                >
                  {/* {item.buttonName} */}
                  {"+ Invite Tenant"}
                </Text>
              </View>
            </View>
          </View>
          <DividerIcon
            IsShowIcon
            iconName={isExpanded ? "chevron-up" : "chevron-down"}
            onPress={() => {
              if (isExpanded) {
                setExpandedItems(
                  expandedItems.filter(
                    (property_id) => property_id !== item.property_id
                  )
                );
              } else {
                setExpandedItems([...expandedItems, item.property_id]);
              }
            }}
          />
        </View>
        {isExpanded && (
          <View style={PropertyListCSS.expandedContent}>
            <View style={PropertyListCSS.flexContainer}>
              <Text style={LABEL_STYLES.commonMidtext}>Current tenant:</Text>
              <Text style={LABEL_STYLES.commontext}>{item.tanentname}</Text>
            </View>

            <View style={[PropertyListCSS.rentView]}>
              <Text style={LABEL_STYLES.commonMidtext}>Weekly rent</Text>
              <Text style={LABEL_STYLES.commontext}>{item.rent}</Text>
            </View>
            <View style={[PropertyListCSS.rentView]}>
              <Text style={LABEL_STYLES.commonMidtext}>Total spend</Text>
              <Text style={LABEL_STYLES.commontext}>{item.spend}</Text>
            </View>
          </View>
        )}
        <DividerIcon />
        <RBSheet
          height={isDeleteData_Clicked ? 200 : 330}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: PropertyListCSS.bottomModal_container,
          }}
        >
          <BottomModalData
            onDelete={propertyDelete}
            isDeletePropertyClicked={isDeleteData_Clicked}
            onDeleteData={FinalDeleteProperty}
            Address={Address}
          />
        </RBSheet>
      </>
    );
  };
  const propertyData2_render = ({ item }) => {
    const isExpanded = expandedItems.includes(item.id);
    return (
      <>
        <View style={PropertyListCSS.flatListContainer}>
          <View style={PropertyListCSS.flat_MainView}>
            <View style={PropertyListCSS.flexContainer}>
              <Text style={PropertyListCSS.apartmentText}>
                {item.propertyName}
              </Text>
              <Text style={LABEL_STYLES.commontext}>{item.name}</Text>
              <View style={PropertyListCSS.flat_MainView}>
                <MaterialCommunityIcons
                  name={"map-marker"}
                  size={12}
                  color={_COLORS.Kodie_GreenColor}
                />
                <Text style={PropertyListCSS.locationText}>
                  {item.location}
                </Text>
              </View>
            </View>
            <Image source={item.image} style={PropertyListCSS.imageStyle} />
            <View style={PropertyListCSS.flexContainer}>
              <View style={PropertyListCSS.noteStyle}>
                <TouchableOpacity>
                  <Image
                    source={IMAGES.noteBook}
                    style={PropertyListCSS.noteIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    refRBSheet.current.open();
                  }}
                >
                  <MaterialCommunityIcons
                    name={"dots-horizontal"}
                    size={25}
                    color={_COLORS.Kodie_LightGrayColor}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  PropertyListCSS.buttonView,
                  {
                    backgroundColor: item.isRentPanding
                      ? _COLORS.Kodie_LightOrange
                      : item.isRentReceived
                      ? _COLORS.Kodie_mostLightGreenColor
                      : _COLORS.Kodie_LightGrayColor,
                  },
                ]}
              >
                <View
                  style={[
                    PropertyListCSS.roundButton,
                    {
                      backgroundColor: item.isRentPanding
                        ? _COLORS.Kodie_DarkOrange
                        : item.isRentReceived
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_LightGrayColor,
                    },
                  ]}
                />
                <Text
                  style={[
                    PropertyListCSS.buttonText,
                    {
                      color: item.isRentPanding
                        ? _COLORS.Kodie_DarkOrange
                        : item.isRentReceived
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_MediumGrayColor,
                    },
                  ]}
                >
                  {item.buttonName}
                </Text>
              </View>
            </View>
          </View>
          <DividerIcon
            IsShowIcon
            iconName={isExpanded ? "chevron-up" : "chevron-down"}
            onPress={() => {
              if (isExpanded) {
                setExpandedItems(expandedItems.filter((id) => id !== item.id));
              } else {
                setExpandedItems([...expandedItems, item.id]);
              }
            }}
          />
        </View>
        {isExpanded && (
          <View style={PropertyListCSS.expandedContent}>
            <View style={PropertyListCSS.leftIconsView}>
              <Image
                source={IMAGES.BedroomIcon}
                style={PropertyListCSS.ImagesStyle}
              />
              <Text style={PropertyListCSS.bedroomStl}>{item.badroom}</Text>
              <Image
                source={IMAGES.Bathroom}
                style={PropertyListCSS.ImagesStyle}
              />
              <Text style={PropertyListCSS.bedroomStl}>{item.bathroom}</Text>
              <Image
                source={IMAGES.Parking}
                style={PropertyListCSS.ImagesStyle}
              />
              <Text style={PropertyListCSS.bedroomStl}>{item.parking}</Text>
              <Image
                source={IMAGES.AspactRatio}
                style={PropertyListCSS.ImagesStyle}
              />
              <Text style={PropertyListCSS.bedroomStl}>
                {item.aspact_ratio}
              </Text>
            </View>
            <View style={[PropertyListCSS.weeklyRent]}>
              <Text style={LABEL_STYLES.commonMidtext}>Weekly rent</Text>
              <Text style={LABEL_STYLES.commontext}>{item.rent}</Text>
            </View>
          </View>
        )}
        <DividerIcon />
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: PropertyListCSS.bottomModal_container,
          }}
        >
          <BottomModalData />
        </RBSheet>
      </>
    );
  };

  return (
    <View style={PropertyListCSS.mainContainer}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginBottom: 50 }}
      >
        <View style={PropertyListCSS.Container}>
          <RowButtons
            LeftButtonText={"Properties I own"}
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
            RightButtonText={"Properties I rent"}
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
        <DividerIcon
          borderBottomWidth={9}
          color={_COLORS.Kodie_LiteWhiteColor}
        />
        <View style={PropertyListCSS.Container}>
          <CustomSingleButton
            _ButtonText={"+ Add New Property"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            text_Size={14}
            backgroundColor={_COLORS.Kodie_BlackColor}
            height={38}
            marginTop={3}
            onPress={props.propertyDetail}
            disabled={isLoading ? true : false}
          />
        </View>
        <DividerIcon
          borderBottomWidth={9}
          color={_COLORS.Kodie_LiteWhiteColor}
        />

        <SearchBar filterImage={IMAGES.filter} frontSearchIcon marginTop={3} />
        {activeScreen ? (
          <>
            <DividerIcon />

            <FlatList data={property_List2} renderItem={propertyData2_render} />
            <View style={PropertyListCSS.propertyRentMainView}>
              <View style={PropertyListCSS.LeftTextView}>
                <Text style={PropertyListCSS.LeftText}>
                  Your rent is due. You have not selected autopay as a payment
                  option.
                </Text>
                <Text style={PropertyListCSS.LeftTextRentText}>
                  Would you like to pay your rent now?
                </Text>
              </View>
              <View style={PropertyListCSS.payButtonMainView}>
                <TouchableOpacity style={PropertyListCSS.payButtonView}>
                  <Text style={PropertyListCSS.payButtonText}>
                    Pay $850 now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={PropertyListCSS.Container}>
              <View style={PropertyListCSS.flat_MainView}>
                {/* <TouchableOpacity style={PropertyListCSS.AllView}>
                  <Text style={PropertyListCSS.item_style}>ALL</Text>
                  <MaterialCommunityIcons
                    name={"check"}
                    size={18}
                    color={_COLORS.Kodie_WhiteColor}
                  />
                </TouchableOpacity> */}
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={HorizontalData}
                  renderItem={horizontal_render}
                />
              </View>
            </View>
            <DividerIcon />
            <FlatList
              data={Property_Data_List}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.8}
              renderItem={propertyData1_render}
            />
          </>
        )}
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default PropertyList;
