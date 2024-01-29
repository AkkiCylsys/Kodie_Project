import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { BiddingComponentStyle } from "./BiddingComponentStyle";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import StarRating from "react-native-star-rating";
import RowButtons from "../../Molecules/RowButtons/RowButtons";
import { _COLORS, IMAGES } from "../../../Themes";

const BiddingComponent = (props) => {
    const [rating, setRating] = useState(4);
    return (
        <>
            <ScrollView>
                <View style={BiddingComponentStyle.mainview}>
                    <View style={BiddingComponentStyle.Container}>
                        <View></View>
                        <View style={BiddingComponentStyle.namebindview}>
                            <Text style={BiddingComponentStyle.Jasontext}>{props.name}</Text>
                            {props.verified ? (
                                <View style={BiddingComponentStyle.verifirdview}>
                                    <AntDesign
                                        name="checkcircle"
                                        size={15}
                                        color={_COLORS.Kodie_GreenColor}
                                    />
                                    <Text style={BiddingComponentStyle.verifiedtext}>verified</Text>
                                </View>
                            ) : null}
                            <Text style={BiddingComponentStyle.Nottext}>{props.notverified}</Text>
                        </View>
                        <View></View>
                        <View style={BiddingComponentStyle.menuiconview}>
                            <AntDesign
                                name="hearto"
                                size={25}
                                color={_COLORS.Kodie_GrayColor}
                                style={BiddingComponentStyle.heartimg}
                            />

                            <Entypo
                                name="dots-three-horizontal"
                                size={20}
                                color={_COLORS.Kodie_GrayColor}
                                style={BiddingComponentStyle.closeIcon}
                            />
                        </View>
                    </View>

                    <View style={BiddingComponentStyle.imageview}>
                        <View>
                            <Image source={IMAGES.userImage} />
                        </View>

                        <View style={{ marginHorizontal: 12 }}>
                            <View style={BiddingComponentStyle.userName}>
                                <Text style={BiddingComponentStyle.filedname}>
                                {props.filedname}
                                </Text>
                                <Text style={BiddingComponentStyle.fileddate}>
                                {props.fileddate}
                                </Text>
                            </View>
                            {/* <Text style={BiddingComponentStyle.userName}>{props.filedname}</Text>
                            <Text style={BiddingComponentStyle.userName}>{props.fileddate}</Text> */}
                            <View style={BiddingComponentStyle.ratingbindview}>
                                <StarRating
                                    disabled={false}
                                    maxStars={1}
                                    rating={rating}
                                    fullStarColor={_COLORS.Kodie_lightGreenColor}
                                    emptyStarColor={_COLORS.Kodie_LightGrayColor}
                                    starSize={20}
                                    selectedStar={(rating) => setRating(rating)}
                                    starStyle={BiddingComponentStyle.startRating}
                                />
                                <Text style={BiddingComponentStyle.starView}>
                                    {props.startRating} (
                                    <Text style={BiddingComponentStyle.text231}>
                                        {props.ratingnumber}
                                    </Text>
                                    )
                                    <Text style={BiddingComponentStyle.ratingamount}>
                                        {props.ratingamount}
                                    </Text>
                                    <Text style={BiddingComponentStyle.ratingprice}>
                                        {props.ratingprice}
                                    </Text>
                                </Text>
                            </View>
                            <View style={BiddingComponentStyle.iconbindview}>
                                <Entypo
                                    name="location-pin"
                                    size={15}
                                    color={_COLORS.Kodie_GreenColor}
                                    style={BiddingComponentStyle.closeIcon}
                                />
                                <Text style={BiddingComponentStyle.text1234}>{props.address}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={BiddingComponentStyle.CoverView}>
                        <Text style={BiddingComponentStyle.CoverTextView2}>
                            <Text style={BiddingComponentStyle.CoverTextView}>{props.CoverText1}  </Text>{props.CoverText2}
                        </Text>
                        <Text style={BiddingComponentStyle.CoverTextView3}>
                            {props.CoverText3}
                        </Text>
                    </View>
                    {/* button section here */}
                    <View>
                        <RowButtons
                            LeftButtonText={"View profile"}
                            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
                            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
                            LeftButtonborderColor={_COLORS.Kodie_BlackColor}
                            RightButtonText={"Message"}
                            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
                            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
                            RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

BiddingComponent.defaultProps = {
    verified: false,
};
export default BiddingComponent;
