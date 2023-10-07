import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { ContractorsStyle } from "./ContractorsStyle";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import StarRating from "react-native-star-rating";
import RowButtons from "../../Molecules/RowButtons/RowButtons";
import { _COLORS, IMAGES } from "../../../Themes";

const Contractors = (props) => {
  const [rating, setRating] = useState(4);
  return (
    <>
      <ScrollView>
        <View style={ContractorsStyle.mainview}>
          <View style={ContractorsStyle.Container}>
            <View></View>
            <View style={ContractorsStyle.namebindview}>
              <Text style={ContractorsStyle.Jasontext}>{props.name}</Text>
              {props.verified ? (
                <View style={ContractorsStyle.verifirdview}>
                  <AntDesign
                    name="checkcircle"
                    size={15}
                    color={_COLORS.Kodie_GreenColor}
                  />
                  <Text style={ContractorsStyle.verifiedtext}>verified</Text>
                </View>
              ) : null}
              <Text style={ContractorsStyle.Nottext}>{props.notverified}</Text>
            </View>
            <View></View>
            <View style={ContractorsStyle.menuiconview}>
              <AntDesign
                name="hearto"
                size={25}
                color={_COLORS.Kodie_GrayColor}
                style={ContractorsStyle.heartimg}
              />

              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={_COLORS.Kodie_GrayColor}
                style={ContractorsStyle.closeIcon}
              />
            </View>
          </View>

          <View style={ContractorsStyle.imageview}>
            <View>
              <Image source={IMAGES.userImage} />
            </View>

            <View style={{ marginHorizontal: 12 }}>
              <Text style={ContractorsStyle.userName}>{props.filedname}</Text>
              <View style={ContractorsStyle.ratingbindview}>
                <StarRating
                  disabled={false}
                  maxStars={1}
                  rating={rating}
                  fullStarColor={_COLORS.Kodie_lightGreenColor}
                  emptyStarColor={_COLORS.Kodie_LightGrayColor}
                  starSize={20}
                  selectedStar={(rating) => setRating(rating)}
                  starStyle={ContractorsStyle.startRating}
                />
                <Text style={ContractorsStyle.starView}>
                  {props.startRating} (
                  <Text style={ContractorsStyle.text231}>
                    {props.ratingnumber}
                  </Text>
                  )
                </Text>
              </View>
              <View style={ContractorsStyle.iconbindview}>
                <Entypo
                  name="location-pin"
                  size={15}
                  color={_COLORS.Kodie_GreenColor}
                  style={ContractorsStyle.closeIcon}
                />
                <Text style={ContractorsStyle.text1234}>{props.address}</Text>
              </View>
            </View>
          </View>
          {/* <Text>
            <Text>{props.CoverText}  </Text>{props.CoverText} 
          </Text>
          <Text>
          {props.CoverText} 
          </Text> */}
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

Contractors.defaultProps = {
  verified: false,
};
export default Contractors;
