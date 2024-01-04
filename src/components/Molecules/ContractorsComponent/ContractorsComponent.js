import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { ContractorsComponentStyle } from "./ContractorsComponentStyle";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import StarRating from "react-native-star-rating";
import RowButtons from "../../Molecules/RowButtons/RowButtons";
import { _COLORS, IMAGES } from "../../../Themes";
import ReadMore from "@fawazahmed/react-native-read-more";

const ContractorsComponent = (props) => {
  const [rating, setRating] = useState(4);
  return (
    <>
      <View style={ContractorsComponentStyle.mainview}>
        <View style={ContractorsComponentStyle.Container}>
          {/* <View></View> */}
          <View style={ContractorsComponentStyle.imageview}>
            <View
              style={{
                height: 60,
                width: 60,
                borderWidth: 1,
                borderRadius: 60 / 2,
                alignSelf: "center",
              }}
            >
              <Image
                source={props.userImage || IMAGES.userImage}
                resizeMode={"cover"}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 60 / 2,
                }}
              />
            </View>
            <View style={{ flex: 1, marginHorizontal: 15 }}>
              <View style={ContractorsComponentStyle.namebindview}>
                <Text style={ContractorsComponentStyle.Jasontext}>
                  {props.name}
                </Text>
                {props.verified ? (
                  <View style={ContractorsComponentStyle.verifirdview}>
                    <AntDesign
                      name="checkcircle"
                      size={15}
                      color={_COLORS.Kodie_GreenColor}
                    />
                    <Text style={ContractorsComponentStyle.verifiedtext}>
                      verified
                    </Text>
                  </View>
                ) : null}
                <Text style={ContractorsComponentStyle.Nottext}>
                  {props.notverified}
                </Text>
              </View>

              <View>
                <Text style={ContractorsComponentStyle.userName}>
                  {props.filedname}
                </Text>
                <View style={ContractorsComponentStyle.ratingbindview}>
                  <StarRating
                    disabled={false}
                    maxStars={1}
                    rating={rating}
                    fullStarColor={_COLORS.Kodie_lightGreenColor}
                    emptyStarColor={_COLORS.Kodie_LightGrayColor}
                    starSize={20}
                    selectedStar={(rating) => setRating(rating)}
                    starStyle={ContractorsComponentStyle.startRating}
                  />
                  <Text style={ContractorsComponentStyle.starView}>
                    {props.startRating} (
                    <Text style={ContractorsComponentStyle.text231}>
                      {props.ratingnumber}
                    </Text>
                    )
                  </Text>
                </View>
                <View style={ContractorsComponentStyle.iconbindview}>
                  <Entypo
                    name="location-pin"
                    size={15}
                    color={_COLORS.Kodie_GreenColor}
                    style={ContractorsComponentStyle.closeIcon}
                  />
                  <Text style={ContractorsComponentStyle.text1234}>
                    {props.address}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <AntDesign
                name="hearto"
                size={25}
                color={_COLORS.Kodie_GrayColor}
                style={ContractorsComponentStyle.heartimg}
              />

              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={_COLORS.Kodie_GrayColor}
                style={ContractorsComponentStyle.closeIcon}
              />
            </View>
          </View>
        </View>
        <View style={ContractorsComponentStyle.CoverView}>
          <Text style={ContractorsComponentStyle.CoverText}>
            {"Cover letter -"}
          </Text>
          <ReadMore
            seeMoreStyle={ContractorsComponentStyle.readMore}
            seeLessStyle={ContractorsComponentStyle.readMore}
            seeMoreText={"read more"}
            seeLessText={"read Less"}
            numberOfLines={2}
            style={ContractorsComponentStyle.textStyle}
          >
            {props.CoverText1}
          </ReadMore>
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
    </>
  );
};

ContractorsComponent.defaultProps = {
  verified: false,
};
export default ContractorsComponent;
