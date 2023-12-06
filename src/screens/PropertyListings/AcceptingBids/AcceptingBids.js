import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  _COLORS,
  LABEL_STYLES,
  IMAGES,
  FONTFAMILY,
  BANNERS,
} from "../../../Themes";
import { AcceptingBidsStyle } from "./AcceptingBidsStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { _goBack } from "../../../services/CommonServices";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomModalData from "../../../components/Molecules/BottomModal/BottomModalData";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
const property_List2 = [
  {
    id: "1",
    propertyName: "Apartment",
    name: "Melbourne",
    location: "8502 Preston Rd. Inglewood",
    image: BANNERS.apartment,
    buttonName: "AVAILABLE: 1 OCT",
    tanentname: "Jason Stathom",
    rent: "$870.00",
    badroom: "3",
    bathroom: "2",
    parking: "1",
    day: "0 days",
    hours: "6 hrs",
    mint: "10 mins",
    aspact_ratio: "86m2",
    availableDate: true,
    availablenow: false,
  },
  {
    id: "2",
    propertyName: "Apartment",
    name: "Melbourne",
    location: "8502 Preston Rd. Inglewood",
    image: BANNERS.apartment,
    buttonName: "AVAILABLE: NOW",
    tanentname: "Jason Stathom",
    rent: "$660.00",
    badroom: "3",
    bathroom: "2",
    parking: "1",
    day: "4 days",
    hours: "6 hrs",
    mint: "10 mins",
    aspact_ratio: "86m2",
    availableDate: false,
    availablenow: true,
  },
];
const AcceptingBids = () => {
  const [expandedItems, setExpandedItems] = useState([]);
  const refRBSheet = useRef();
  const propertyData2_render = ({ item }) => {
    const isExpanded = expandedItems.includes(item.id);
    return (
      <>
        <View style={AcceptingBidsStyle.flatListContainer}>
          <View
            style={[AcceptingBidsStyle.flat_MainView, { marginBottom: 10 }]}
          >
            <TouchableOpacity style={AcceptingBidsStyle.bidsButton}>
              <Text style={AcceptingBidsStyle.bidsButtonText}>
                Accepting bids
              </Text>
            </TouchableOpacity>
            <Text style={AcceptingBidsStyle.biddingText}>
              Bidding closes in:
            </Text>
            <View style={AcceptingBidsStyle.daysViewStl}>
              <Text style={AcceptingBidsStyle.biddingText}>{item.day}</Text>
            </View>
            <View style={AcceptingBidsStyle.daysViewStl}>
              <Text style={AcceptingBidsStyle.biddingText}>{item.hours}</Text>
            </View>
            <View style={AcceptingBidsStyle.daysViewStl}>
              <Text style={AcceptingBidsStyle.biddingText}>{item.mint}</Text>
            </View>
          </View>
          <View style={AcceptingBidsStyle.flat_MainView}>
            <View style={AcceptingBidsStyle.flexContainer}>
              <Text style={AcceptingBidsStyle.apartmentText}>
                {item.propertyName}
              </Text>
              <Text style={LABEL_STYLES.commontext}>{item.name}</Text>
              <View style={AcceptingBidsStyle.flat_MainView}>
                <MaterialCommunityIcons
                  name={"map-marker"}
                  size={12}
                  color={_COLORS.Kodie_GreenColor}
                />
                <Text style={AcceptingBidsStyle.locationText}>
                  {item.location}
                </Text>
              </View>
            </View>
            <Image source={item.image} style={AcceptingBidsStyle.imageStyle} />
            <View style={AcceptingBidsStyle.flexContainer}>
              <View style={AcceptingBidsStyle.noteStyle}>
                <TouchableOpacity>
                  <Entypo
                    name="share"
                    color={_COLORS.Kodie_MediumGrayColor}
                    size={22}
                    style={AcceptingBidsStyle.share_sty}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Fontisto
                    name="heart-alt"
                    color={_COLORS.Kodie_MediumGrayColor}
                    size={22}
                    style={AcceptingBidsStyle.share_sty}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    refRBSheet.current.open();
                  }}
                >
                  <MaterialCommunityIcons
                    name={"dots-horizontal"}
                    size={22}
                    color={_COLORS.Kodie_MediumGrayColor}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  AcceptingBidsStyle.buttonView,
                  {
                    backgroundColor: item.availableDate
                      ? _COLORS.Kodie_LightOrange
                      : item.availablenow
                      ? _COLORS.Kodie_mostLightGreenColor
                      : _COLORS.Kodie_LightGrayColor,
                  },
                ]}
              >
                <Text
                  style={[
                    AcceptingBidsStyle.buttonText,
                    {
                      color: item.availableDate
                        ? _COLORS.Kodie_DarkOrange
                        : item.availablenow
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
          <View style={AcceptingBidsStyle.expandedContent}>
            <View style={AcceptingBidsStyle.leftIconsView}>
              <Image
                source={IMAGES.BedroomIcon}
                style={AcceptingBidsStyle.ImagesStyle}
              />
              <Text style={AcceptingBidsStyle.bedroomStl}>{item.badroom}</Text>
              <Image
                source={IMAGES.Bathroom}
                style={AcceptingBidsStyle.ImagesStyle}
              />
              <Text style={AcceptingBidsStyle.bedroomStl}>{item.bathroom}</Text>
              <Image
                source={IMAGES.Parking}
                style={AcceptingBidsStyle.ImagesStyle}
              />
              <Text style={AcceptingBidsStyle.bedroomStl}>{item.parking}</Text>
              <Image
                source={IMAGES.AspactRatio}
                style={AcceptingBidsStyle.ImagesStyle}
              />
              <Text style={AcceptingBidsStyle.bedroomStl}>
                {item.aspact_ratio}
              </Text>
            </View>
            <View style={[AcceptingBidsStyle.weeklyRent]}>
              <Text style={LABEL_STYLES.commonMidtext}>Listed Price</Text>
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
            container: AcceptingBidsStyle.bottomModal_container,
          }}
        >
          <BottomModalData
            onPress={() => props.navigation.navigate("ViewPropertyDetails")}
          />
        </RBSheet>
      </>
    );
  };

  return (
    <View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        {/* <View style={AcceptingBidsStyle.propertyRentMainView}>
          <View style={AcceptingBidsStyle.LeftTextView}>
            <Text style={AcceptingBidsStyle.LeftText}>Melbourne</Text>
            <Text style={AcceptingBidsStyle.LeftTextRentText}>
              Apartment; $300 to $1000; 3 Beds; 2 Baths; Garden; Pool ...
            </Text>
          </View>
          <View style={AcceptingBidsStyle.payButtonMainView}>
            <TouchableOpacity style={AcceptingBidsStyle.payButtonView}>
              <Image source={IMAGES.filter} />
            </TouchableOpacity>
          </View>
        </View>
        <DividerIcon
          borderBottomWidth={4}
          color={_COLORS.Kodie_LiteWhiteColor}
        /> */}

        <FlatList data={property_List2} renderItem={propertyData2_render} />
      </ScrollView>
    </View>
  );
};

export default AcceptingBids;
