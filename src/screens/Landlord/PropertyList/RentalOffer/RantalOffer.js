// screen no. 77 ,84,85
import React, { useState, useRef } from "react";
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
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import { _goBack } from "./../../../../services/CommonServices/index";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomModalData from "../../../../components/Molecules/BottomModal/BottomModalData";
import { RantalOfferCss } from "./RantalOfferCss";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import SearchBar from "../../../../components/Molecules/SearchBar/SearchBar";
import MultiSelectDropDown from "../../../../components/Molecules/MultiSelectDropdown/MultiSelectDropDown";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";

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
  {
    id: "3",
    propertyName: "Apartment",
    name: "Melbourne",
    location: "8502 Preston Rd. Inglewood",
    image: BANNERS.apartment,
    buttonName: "AVAILABLE: NOW",
    tanentname: "Jason Stathom",
    rent: "$850.00",
    badroom: "3",
    bathroom: "2",
    parking: "1",
    day: "4 days",
    hours: "20 hrs",
    mint: "5 mins",
    aspact_ratio: "86m2",
    availableDate: false,
    availablenow: true,
  },
];
const DropdownOption = [
  { name: "All" },
  { name: "8502 Preston Rd. Inglewood" },
  { name: "2118 Thornridge Cir. Syracuse" },
  { name: "1729 Sickle St, QLD, 4010 " },
  { name: "5 Aspen Villas, Morningside, NSW" },
  { name: "792 Zetland Road, Zetland, NSW" },
];
const offersForProperties = [
  {
    id: 1,
    banner: BANNERS.Apartment,
    apartment: "Apartment",
    Name: "Melbourne",
    bidAmount: "$870",
    location: "8502 preston Rd Inglewood",
    star: "3.9",
    roundimage: IMAGES.userImage,
    roundName: "Jenny dio",
  },
  {
    id: 2,
    banner: BANNERS.Apartment,
    apartment: "Apartment",
    Name: "Melbourne",
    bidAmount: "$870",
    location: "8502 preston Rd Inglewood",
    star: "3.9",
    roundimage: IMAGES.userImage,
    roundName: "Jenny dio",
  },
  {
    id: 3,
    banner: BANNERS.Apartment,
    apartment: "Apartment",
    Name: "Melbourne",
    bidAmount: "$870",
    location: "8502 preston Rd Inglewood",
    star: "3.9",
    roundimage: IMAGES.userImage,
    roundName: "Jenny dio",
  },
  {
    id: 4,
    banner: BANNERS.Apartment,
    apartment: "Apartment",
    Name: "Melbourne",
    bidAmount: "$870",
    location: "8502 preston Rd Inglewood",
    star: "3.9",
    roundimage: IMAGES.userImage,
    roundName: "Jenny dio",
  },
];

export default RantalOffer = (props) => {
  const [activeScreen, setActiveScreen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const refRBSheet = useRef();

  const propertyData2_render = ({ item }) => {
    const isExpanded = expandedItems.includes(item.id);
    return (
      <>
        <View style={RantalOfferCss.flatListContainer}>
          <View style={[RantalOfferCss.flat_MainView, { marginBottom: 10 }]}>
            <TouchableOpacity style={RantalOfferCss.bidsButton}>
              <Text style={RantalOfferCss.bidsButtonText}>Accepting bids</Text>
            </TouchableOpacity>
            <Text style={RantalOfferCss.biddingText}>Bidding closes in:</Text>
            <View style={RantalOfferCss.daysViewStl}>
              <Text style={RantalOfferCss.biddingText}>{item.day}</Text>
            </View>
            <View style={RantalOfferCss.daysViewStl}>
              <Text style={RantalOfferCss.biddingText}>{item.hours}</Text>
            </View>
            <View style={RantalOfferCss.daysViewStl}>
              <Text style={RantalOfferCss.biddingText}>{item.mint}</Text>
            </View>
          </View>
          <View style={RantalOfferCss.flat_MainView}>
            <View style={RantalOfferCss.flexContainer}>
              <Text style={RantalOfferCss.apartmentText}>
                {item.propertyName}
              </Text>
              <Text style={LABEL_STYLES.commontext}>{item.name}</Text>
              <View style={RantalOfferCss.flat_MainView}>
                <MaterialCommunityIcons
                  name={"map-marker"}
                  size={12}
                  color={_COLORS.Kodie_GreenColor}
                />
                <Text style={RantalOfferCss.locationText}>{item.location}</Text>
              </View>
            </View>
            <Image source={item.image} style={RantalOfferCss.imageStyle} />
            <View style={RantalOfferCss.flexContainer}>
              <View style={RantalOfferCss.noteStyle}>
                <TouchableOpacity>
                  <Entypo
                    name="share"
                    color={_COLORS.Kodie_MediumGrayColor}
                    size={22}
                    style={RantalOfferCss.share_sty}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Fontisto
                    name="heart-alt"
                    color={_COLORS.Kodie_MediumGrayColor}
                    size={22}
                    style={RantalOfferCss.share_sty}
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
                  RantalOfferCss.buttonView,
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
                    RantalOfferCss.buttonText,
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
          <>
            <View style={RantalOfferCss.expandedContent}>
              <View style={RantalOfferCss.leftIconsView}>
                <Image
                  source={IMAGES.BedroomIcon}
                  style={RantalOfferCss.ImagesStyle}
                />
                <Text style={RantalOfferCss.bedroomStl}>{item.badroom}</Text>
                <Image
                  source={IMAGES.Bathroom}
                  style={RantalOfferCss.ImagesStyle}
                />
                <Text style={RantalOfferCss.bedroomStl}>{item.bathroom}</Text>
                <Image
                  source={IMAGES.Parking}
                  style={RantalOfferCss.ImagesStyle}
                />
                <Text style={RantalOfferCss.bedroomStl}>{item.parking}</Text>
                <Image
                  source={IMAGES.AspactRatio}
                  style={RantalOfferCss.ImagesStyle}
                />
                <Text style={RantalOfferCss.bedroomStl}>
                  {item.aspact_ratio}
                </Text>
              </View>
              <View style={[RantalOfferCss.weeklyRent]}>
                <Text style={LABEL_STYLES.commonMidtext}>Listed Price</Text>
                <Text style={LABEL_STYLES.commontext}>{item.rent}</Text>
              </View>
            </View>
            <View style={RantalOfferCss.expandedContent}>
              <RowButtons
                LeftButtonText={"Withdraw bid"}
                leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
                LeftButtonTextColor={_COLORS.Kodie_BlackColor}
                LeftButtonborderColor={_COLORS.Kodie_BlackColor}
                RightButtonText={"Edit offer"}
                RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
                RightButtonTextColor={_COLORS.Kodie_WhiteColor}
                RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
              />
            </View>
          </>
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
            container: RantalOfferCss.bottomModal_container,
          }}
        >
          <BottomModalData
            onPress={() => props.navigation.navigate("ViewPropertyDetails")}
          />
        </RBSheet>
      </>
    );
  };

  const offer_Properties = ({ item }) => {
    return (
      <>
        <View style={RantalOfferCss.flatListContainer}>
          <View style={RantalOfferCss.flat_MainView}>
            <Image
              source={BANNERS.Apartment}
              style={RantalOfferCss.Imagestl}
              resizeMode={"center"}
            />
            <View style={RantalOfferCss.margin}>
              <View
                style={[RantalOfferCss.flat_MainView, RantalOfferCss.flat_View]}
              >
                <View>
                  <Text style={RantalOfferCss.apartmentText}>
                    {item.apartment}
                  </Text>
                  <Text style={LABEL_STYLES.commontext}>{item.Name}</Text>
                </View>
                <View style={RantalOfferCss.bidView}>
                  <Text style={RantalOfferCss.bidText}>Bid amount</Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: FONTFAMILY.K_Bold,
                      color: _COLORS.Kodie_GreenColor,
                      textAlign: "right",
                    }}
                  >
                    {item.bidAmount}
                  </Text>
                </View>
              </View>
              <View style={RantalOfferCss.flat_MainView}>
                <MaterialCommunityIcons
                  name={"map-marker"}
                  size={12}
                  color={_COLORS.Kodie_GreenColor}
                />
                <Text style={RantalOfferCss.locationText}>{item.location}</Text>
              </View>
              <View style={RantalOfferCss.flat_MainView}>
                <Image
                  source={item.roundimage}
                  resizeMode={"center"}
                  style={RantalOfferCss.RoundImage}
                />
                <Text
                  style={[RantalOfferCss.apartmentText, RantalOfferCss.margin]}
                >
                  {item.roundName}
                </Text>
                <View
                  style={[
                    RantalOfferCss.flat_MainView,
                    RantalOfferCss.StarView,
                  ]}
                >
                  <Fontisto
                    name="star"
                    color={_COLORS.Kodie_lightGreenColor}
                    size={12}
                  />
                  <Text style={RantalOfferCss.starText}>{item.star}</Text>
                </View>
              </View>
            </View>
          </View>
          <DividerIcon />
          <CustomSingleButton
            _ButtonText={"View application"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            backgroundColor={_COLORS.Kodie_BlackColor}
            height={40}
            marginTop={1}
            onPress={props.ViewApplication}
          />
        </View>
        <DividerIcon />
      </>
    );
  };

  return (
    <View style={RantalOfferCss.mainContainer}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={RantalOfferCss.propertyRentMainView}>
          <RowButtons
            LeftButtonText={"Offers for my properties"}
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
            RightButtonText={"My current offers"}
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
          borderBottomWidth={7}
          color={_COLORS.Kodie_LiteWhiteColor}
        />
        <SearchBar
          marginTop={1}
          frontSearchIcon
          isFilterImage
          filterImage={IMAGES.filter}
          height={40}
        />
        <DividerIcon
          borderBottomWidth={2}
          color={_COLORS.Kodie_LiteWhiteColor}
        />
        {activeScreen ? (
          <FlatList data={property_List2} renderItem={propertyData2_render} />
        ) : (
          <>
            <View style={RantalOfferCss.Container}>
              <MultiSelectDropDown
                options={DropdownOption}
                modalmarginTop={250}
              />
            </View>
            <DividerIcon />
            <FlatList
              data={offersForProperties}
              renderItem={offer_Properties}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};
