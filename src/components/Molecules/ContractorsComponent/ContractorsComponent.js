import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { ContractorsComponentStyle } from "./ContractorsComponentStyle";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import StarRating from "react-native-star-rating";
import RowButtons from "../../Molecules/RowButtons/RowButtons";
import { _COLORS, IMAGES } from "../../../Themes";

const ContractorsComponent = (props) => {
  const [rating, setRating] = useState(4);
  return (
    <>
      <ScrollView>
        <View style={ContractorsComponentStyle.mainview}>
          <View style={ContractorsComponentStyle.Container}>
            <View></View>
            <View style={ContractorsComponentStyle.namebindview}>
              <Text style={ContractorsComponentStyle.Jasontext}>{props.name}</Text>
              {props.verified ? (
                <View style={ContractorsComponentStyle.verifirdview}>
                  <AntDesign
                    name="checkcircle"
                    size={15}
                    color={_COLORS.Kodie_GreenColor}
                  />
                  <Text style={ContractorsComponentStyle.verifiedtext}>verified</Text>
                </View>
              ) : null}
              <Text style={ContractorsComponentStyle.Nottext}>{props.notverified}</Text>
            </View>
            <View></View>
            <View style={ContractorsComponentStyle.menuiconview}>
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

          <View style={ContractorsComponentStyle.imageview}>
            <View>
              <Image source={IMAGES.userImage} />
            </View>

            <View style={{ marginHorizontal: 12 }}>
              <Text style={ContractorsComponentStyle.userName}>{props.filedname}</Text>
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
                <Text style={ContractorsComponentStyle.text1234}>{props.address}</Text>
              </View>
            </View>
          </View>
          <View style={ContractorsComponentStyle.CoverView}>
          <Text style={ContractorsComponentStyle.CoverTextView2}>
            <Text style={ContractorsComponentStyle.CoverTextView}>{props.CoverText1}  </Text>{props.CoverText2} 
          </Text>
          <Text style={ContractorsComponentStyle.CoverTextView3}>
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

ContractorsComponent.defaultProps = {
  verified: false,
};
export default ContractorsComponent;
