import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
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
      <View style={ContractorsStyle.mainview}>
        <View style={ContractorsStyle.Container}>
          {/* <View></View> */}
          <View style={ContractorsStyle.imageview}>
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
                <Text style={ContractorsStyle.Nottext}>
                  {props.notverified}
                </Text>
              </View>

              <View>
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
            <View style={{ flexDirection: "row" }}>
              <AntDesign
                name="hearto"
                size={25}
                color={_COLORS.Kodie_GrayColor}
                style={ContractorsStyle.heartimg}
              />
              <TouchableOpacity onPress={props.onPress}>
                <Entypo
                  name="dots-three-horizontal"
                  size={20}
                  color={_COLORS.Kodie_GrayColor}
                  style={ContractorsStyle.closeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginHorizontal: 16 }}>
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
    </>
  );
};

Contractors.defaultProps = {
  verified: false,
};
export default Contractors;
