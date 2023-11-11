import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
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
const HorizontalData = [
  "Occupied",
  "Vacant",
  "Rent Pending",
  "Rent Received",
  "Archive",
];

const property_List1 = [
  {
    id: "1",
    propertyName: "Apartment",
    name: "Melbourne",
    location: "8502 Preston Rd. Inglewood",
    image: BANNERS.apartment,
    buttonName: "Late payment",
    tanentname: "Jason Stathom",
    rent: "$850",
    spend: "$830",
    isRentPanding: true,
    isRentReceived: false,
    isinviteTenants: false,
  },

  {
    id: "2",
    propertyName: "House",
    name: "Sydney",
    location: "2118 Thornridge Cir. Syracuse",
    image: BANNERS.house,
    buttonName: "Rent Received",
    tanentname: "Jason Stathom",
    rent: "$850",
    spend: "$830",
    isRentPanding: false,
    isRentReceived: true,
    isinviteTenants: false,
  },
  {
    id: "3",
    propertyName: "Cottage",
    name: "Brisbane",
    location: "1729 Sickle St, QLD, 4010, Australia ",
    image: BANNERS.cottage,
    buttonName: "+ Invite Tenant",
    tanentname: "Jason Stathom",
    rent: "$850",
    spend: "$830",
    isRentPanding: false,
    isRentReceived: false,
    isinviteTenants: true,
  },
  {
    id: "4",
    propertyName: "Apartment",
    name: "Melbourne",
    location: "8502 Preston Rd. Inglewood",
    image: BANNERS.apartment,
    buttonName: "Rent Pending",
    tanentname: "Jason Stathom",
    rent: "$850",
    spend: "$830",
    isRentPanding: true,
    isRentReceived: false,
    isinviteTenants: false,
  },
  {
    id: "5",
    propertyName: "House",
    name: "Sydney",
    location: "2118 Thornridge Cir. Syracuse",
    image: BANNERS.house,
    buttonName: "Rent Received",
    tanentname: "Jason Stathom",
    rent: "$850",
    spend: "$830",
    isRentPanding: false,
    isRentReceived: true,
    isinviteTenants: false,
  },
  {
    id: "6",
    propertyName: "Cottage",
    name: "Brisbane",
    location: "1729 Sickle St, QLD, 4010, Australia ",
    image: BANNERS.cottage,
    buttonName: "+ Invite Tenant",
    tanentname: "Jason Stathom",
    rent: "$850",
    spend: "$830",
    isRentPanding: false,
    isRentReceived: false,
    isinviteTenants: true,
  },
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
  const [activeScreen, setActiveScreen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const [Property_Data_List, setProperty_Data_List] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const refRBSheet = useRef();
  useEffect(() => {
    propertyList_Data();
  }, []);
  const propertyList_Data = () => {
    const propertyDataList = {
      user: 3,
    };
    const url = Config.API_URL;
    const propertyData_List = url + "get_All_Property_details";
    console.log("Request URL :", propertyData_List);
    setIsLoading(true);
    axios
      .post(propertyData_List, propertyDataList)
      .then((response) => {
        console.log("property_Data_list", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("propertyDataList....", response.data);
          setProperty_Data_List(response.data);
          console.log(Property_Data_List,'rahul...')
        } else {
          console.error("property_Data_list_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("property_Data_list error:", error);
        alert(error);
        setIsLoading(false);
      });
  };
  const horizontal_render = ({ item }) => {
    return (
      <TouchableOpacity style={PropertyListCSS.flatlistView}>
        <View style={PropertyListCSS.round} />
        <Text style={PropertyListCSS.item_style}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const propertyData1_render = ({ item }) => {
    const isExpanded = expandedItems.includes(item.id);
    return (
      <>
        <View style={PropertyListCSS.flatListContainer}>
          <View style={PropertyListCSS.flat_MainView}>
            <View style={PropertyListCSS.flexContainer}>
              <Text style={PropertyListCSS.apartmentText}>
                {item.property_type}
              </Text>
              <Text style={LABEL_STYLES.commontext}>{item.property_description}</Text>
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
            <Image source={item.image_path} style={PropertyListCSS.imageStyle} />
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
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
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
              backgroundColor: "transparent",
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
                <TouchableOpacity style={PropertyListCSS.AllView}>
                  <Text style={PropertyListCSS.item_style}>ALL</Text>
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
            <FlatList
               data={Property_Data_List}
              // data={property_List1}
              renderItem={propertyData1_render}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default PropertyList;
