import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { _COLORS, LABEL_STYLES, BANNERS, IMAGES } from "../../../Themes";
import { PropertyListCSS } from "./PropertyListCSS";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "./../../../services/CommonServices/index";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomModalData from "../../../components/Molecules/BottomModal/BottomModalData";
const HorizontalData = [
  "Occupied",
  "Vacant",
  "Rent Pending",
  "Rent Received",
  "Occupied",
  "Vacant",
  "Rent Pending",
  "Rent Received",
];
const property_List = [
  {
    id: "1",
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

export default PropertyList = (props) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const refRBSheet = useRef();

  const horizontal_render = ({ item }) => {
    return (
      <View style={PropertyListCSS.flatlistView}>
        <View style={PropertyListCSS.round} />
        <Text style={PropertyListCSS.item_style}>{item}</Text>
      </View>
    );
  };

  const propertyData_render = ({ item }) => {
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

  return (
    <View style={PropertyListCSS.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Property list"}
      />
      <ScrollView>
        <SearchBar height={40} />
        <View style={PropertyListCSS.Container}>
          <CustomSingleButton
            onPress={() => {}}
            _ButtonText={"+ Add New Property"}
            Text_Color={_COLORS.Kodie_BlackColor}
            backgroundColor={_COLORS.Kodie_lightGreenColor}
            height={40}
          />
          <View style={PropertyListCSS.flat_MainView}>
            <View style={PropertyListCSS.AllView}>
              <Text style={PropertyListCSS.item_style}>ALL</Text>
              <MaterialCommunityIcons
                name={"check"}
                size={18}
                color={_COLORS.Kodie_WhiteColor}
              />
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={HorizontalData}
              renderItem={horizontal_render}
            />
          </View>
        </View>
        <DividerIcon />
        <FlatList data={property_List} renderItem={propertyData_render} />
      </ScrollView>
    </View>
  );
};
