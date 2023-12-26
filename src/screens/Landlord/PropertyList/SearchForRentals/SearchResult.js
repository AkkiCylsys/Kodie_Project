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
} from "../../../../Themes";
import { SearchResultCss } from "./SearchResultCss";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto"
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "./../../../../services/CommonServices/index";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomModalData from "../../../../components/Molecules/BottomModal/BottomModalData";

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
        day: '0 days',
        hours: '6 hrs',
        mint: '10 mins',
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
        day: '4 days',
        hours: '6 hrs',
        mint: '10 mins',
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
        day: '4 days',
        hours: '20 hrs',
        mint: '5 mins',
        aspact_ratio: "86m2",
        availableDate: false,
        availablenow: true,
    },
];

export default SearchResult = (props) => {
    const [expandedItems, setExpandedItems] = useState([]);
    const refRBSheet = useRef();


    const propertyData2_render = ({ item }) => {
        const isExpanded = expandedItems.includes(item.id);
        return (
            <>
                <View style={SearchResultCss.flatListContainer}>
                    <View style={[SearchResultCss.flat_MainView,{ marginBottom: 10,}]}>
                        <TouchableOpacity style={SearchResultCss.bidsButton}>
                            <Text style={SearchResultCss.bidsButtonText} >Accepting bids</Text>
                        </TouchableOpacity>
                        <Text style={SearchResultCss.biddingText}>Bidding closes in:</Text>
                        <View style={SearchResultCss.daysViewStl}>
                        <Text style={SearchResultCss.biddingText}>{item.day}</Text></View>
                        <View style={SearchResultCss.daysViewStl}>
                        <Text style = {SearchResultCss.biddingText}>{item.hours}</Text></View>
                        <View style={SearchResultCss.daysViewStl}>
                        <Text style={SearchResultCss.biddingText}>{item.mint}</Text></View>
                    </View>
                    <View style={SearchResultCss.flat_MainView}>
                        <View style={SearchResultCss.flexContainer}>
                            <Text style={SearchResultCss.apartmentText}>
                                {item.propertyName}
                            </Text>
                            <Text style={LABEL_STYLES.commontext}>{item.name}</Text>
                            <View style={SearchResultCss.flat_MainView}>
                                <MaterialCommunityIcons
                                    name={"map-marker"}
                                    size={12}
                                    color={_COLORS.Kodie_GreenColor}
                                />
                                <Text style={SearchResultCss.locationText}>
                                    {item.location}
                                </Text>
                            </View>
                        </View>
                        <Image source={item.image} style={SearchResultCss.imageStyle} />
                        <View style={SearchResultCss.flexContainer}>
                            <View style={SearchResultCss.noteStyle}>
                                <TouchableOpacity>
                                    <Entypo
                                        name="share"
                                        color={_COLORS.Kodie_MediumGrayColor}
                                        size={22}
                                        style={SearchResultCss.share_sty}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Fontisto
                                        name="heart-alt"
                                        color={_COLORS.Kodie_MediumGrayColor}
                                        size={22}
                                        style={SearchResultCss.share_sty}
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
                                    SearchResultCss.buttonView,
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
                                        SearchResultCss.buttonText,
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
                    <View style={SearchResultCss.expandedContent}>
                        <View style={SearchResultCss.leftIconsView}>
                            <Image
                                source={IMAGES.BedroomIcon}
                                style={SearchResultCss.ImagesStyle}
                            />
                            <Text style={SearchResultCss.bedroomStl}>{item.badroom}</Text>
                            <Image
                                source={IMAGES.Bathroom}
                                style={SearchResultCss.ImagesStyle}
                            />
                            <Text style={SearchResultCss.bedroomStl}>{item.bathroom}</Text>
                            <Image
                                source={IMAGES.Parking}
                                style={SearchResultCss.ImagesStyle}
                            />
                            <Text style={SearchResultCss.bedroomStl}>{item.parking}</Text>
                            <Image
                                source={IMAGES.AspactRatio}
                                style={SearchResultCss.ImagesStyle}
                            />
                            <Text style={SearchResultCss.bedroomStl}>
                                {item.aspact_ratio}
                            </Text>
                        </View>
                        <View style={[SearchResultCss.weeklyRent]}>
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
                        container: SearchResultCss.bottomModal_container,
                    }}
                >
                    <BottomModalData onPress={()=>props.navigation.navigate('ViewPropertyDetails')}/>
                </RBSheet>
            </>
        );
    };

    return (
        <View style={SearchResultCss.mainContainer}>
            <TopHeader
                onPressLeftButton={() => _goBack(props)}
                MiddleText={"Search results"}
            />
            <ScrollView
                showsHorizontalScrollIndicator={false}
            >

                <View style={SearchResultCss.propertyRentMainView}>
                    <View style={SearchResultCss.LeftTextView}>
                        <Text style={SearchResultCss.LeftText}>
                            Melbourne
                        </Text>
                        <Text style={SearchResultCss.LeftTextRentText}>
                            Apartment; $300 to $1000; 3 Beds; 2 Baths; Garden; Pool ...
                        </Text>
                    </View>
                    <View style={SearchResultCss.payButtonMainView}>
                        <TouchableOpacity style={SearchResultCss.payButtonView}>
                            <Image source={IMAGES.filter} />

                        </TouchableOpacity>
                    </View>

                </View>
                <DividerIcon
                    borderBottomWidth={4}
                    color={_COLORS.Kodie_LiteWhiteColor}
                />


                <FlatList data={property_List2} renderItem={propertyData2_render} />



            </ScrollView>
        </View>
    );
};
