import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import DividerIcon from "../../Atoms/Devider/DividerIcon";
import BottomModalData from "../BottomModal/BottomModalData";
import { PropertyListingCss } from "./PropertyListingCss";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { _COLORS, IMAGES, BANNERS } from "../../../Themes";
import AddBiddingDetails from "../AddBiddingDetails/AddBiddingDetails";
import InviteTenant from "../InviteTenant/InviteTenant";
const property_List1 = [
  {
    id: "1",
    propertyName: "Apartment",
    name: "Melbourne",
    location: "8502 Preston Rd. Inglewood",
    image: BANNERS.apartment,
    buttonName: "+ Invite Tenant",
    tanentDay: "27 Days",
    rent: "$850",
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
    buttonName: "+ Invite Tenant",
    tanentDay: "27 Days",
    rent: "$850",
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
    tanentDay: "27 Days",
    rent: "$850",
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
    buttonName: "+ Invite Tenant",
    tanentDay: "27 Days",
    rent: "$850",
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
    buttonName: "+ Invite Tenant",
    tanentDay: "27 Days",
    rent: "$850",
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
    tanentDay: "27 Days",
    rent: "$850",
    isRentPanding: false,
    isRentReceived: false,
    isinviteTenants: true,
  },
];

const PropertyListing = () => {
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const [expandedItems, setExpandedItems] = useState([]);
  const propertyData1_render = ({ item }) => {
    const isExpanded = expandedItems.includes(item.id);
    return (
      <>
        <View style={PropertyListingCss.flatListContainer}>
          <View style={PropertyListingCss.flat_MainView}>
            <View style={PropertyListingCss.flexContainer}>
              <Text style={PropertyListingCss.apartmentText}>
                {item.propertyName}
              </Text>
              <Text style={PropertyListingCss.commontext}>{item.name}</Text>
              <View style={PropertyListingCss.flat_MainView}>
                <MaterialCommunityIcons
                  name={"map-marker"}
                  size={12}
                  color={_COLORS.Kodie_GreenColor}
                />
                <Text style={PropertyListingCss.locationText}>
                  {item.location}
                </Text>
              </View>
            </View>
            <Image source={item.image} style={PropertyListingCss.imageStyle} />
            <View style={PropertyListingCss.flexContainer}>
              <View style={PropertyListingCss.noteStyle}>
                <TouchableOpacity>
                  <Image
                    source={IMAGES.noteBook}
                    style={PropertyListingCss.noteIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    refRBSheet1.current.open();
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
                  PropertyListingCss.buttonView,
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
                    PropertyListingCss.roundButton,
                    {
                      backgroundColor: item.isRentPanding
                        ? _COLORS.Kodie_LightGrayColor
                        : item.isRentReceived
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_LightGrayColor,
                    },
                  ]}
                />
                <Text
                  style={[
                    PropertyListingCss.buttonText,
                    {
                      color: item.isRentPanding
                        ? _COLORS.Kodie_DarkOrange
                        : item.isRentReceived
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_MediumGrayColor,
                    },
                  ]}
                  onPress={() => {
                    refRBSheet3.current.open();
                  }}
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
          <View style={PropertyListingCss.expandedContent}>
            <View style={PropertyListingCss.flexContainer}>
              <Text style={PropertyListingCss.commonMidtext}>
                Number of days listed:
              </Text>
              <Text style={PropertyListingCss.commonDay}>{item.tanentDay}</Text>
            </View>

            <View style={[PropertyListingCss.rentView]}>
              <Text style={PropertyListingCss.commonMidtext}>
                Listed price:
              </Text>

              <View style={PropertyListingCss.commonRentview}>
                <Text style={PropertyListingCss.commonRent}>{item.rent}</Text>
              </View>
            </View>
          </View>
        )}
        <DividerIcon />
        {/* three dot click popup menu */}
        <RBSheet
          ref={refRBSheet1}
          closeOnDragDown={true}
          height={330}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: PropertyListingCss.bottomModal_container,
          }}
        >
          <BottomModalData
            onPress={() => {
              refRBSheet2.current.open();
            }}
          />
        </RBSheet>
        {/* AddBiddingDetails popup */}
        <RBSheet
          ref={refRBSheet2}
          closeOnDragDown={true}
          height={760}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: PropertyListingCss.bottomModal_container,
          }}
        >
          <AddBiddingDetails />
        </RBSheet>

        {/* invite tenent popup */}
        <RBSheet
          ref={refRBSheet3}
          closeOnDragDown={true}
          height={230}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: PropertyListingCss.bottomModal_container,
          }}
        >
          <InviteTenant />
        </RBSheet>
      </>
    );
  };
  return (
    <View>
      <FlatList data={property_List1} renderItem={propertyData1_render} />
    </View>
  );
};

export default PropertyListing;
