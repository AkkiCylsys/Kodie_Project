import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { InviteTenantStyle } from "./InviteTenantStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import { _COLORS, IMAGES } from "../../../Themes/index";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import StarRating from "react-native-star-rating";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
const data = [
  {
    id: "1",
    name: "Jason S",
    name1: "Stathom",
    looking_For: "Home",
    location: "Sydney",
    budget: "$580 per week",
  },
  {
    id: "2",
    name: "Mesut S",
    rating: "4.0",
    view: "100",
    looking_For: "flat",
    location: "Sydney",
    budget: "$580 per week",
  },
  {
    id: "3",
    name: "Jack B",
    rating: "3.6",
    view: "50",
    looking_For: "Apartment",
    location: "Sydney",
    budget: "$580 per week",
  },
];
export default InviteTenant = (props) => {
  const [rating, setRating] = useState(2);

  const tenantData = ({ item, index }) => {
    return (
      <>
        <View style={InviteTenantStyle.usermainView}>
          <View>
            <TouchableOpacity style={InviteTenantStyle.usericon}>
              <Image source={IMAGES.userImage} />
            </TouchableOpacity>
          </View>
          <View style={InviteTenantStyle.nameView}>
            <Text style={InviteTenantStyle.nameText}>{item.name}</Text>
            <Text style={InviteTenantStyle.nameText}>{item.name1}</Text>
          </View>

          <View style={InviteTenantStyle.starStyle}>
            <View style={InviteTenantStyle.bindstarview}>
              <StarRating
                disabled={false}
                maxStars={1}
                rating={rating}
                fullStarColor={_COLORS.Kodie_lightGreenColor}
                emptyStarColor={_COLORS.Kodie_LightGrayColor}
                starSize={20}
                selectedStar={(rating) => setRating(rating)}
              />
              <Text style={InviteTenantStyle.starratingStyle}>4.6 (231)</Text>
            </View>
            <View style={InviteTenantStyle.verifiedView}>
              <Text style={InviteTenantStyle.verifiedtext}>Not verified</Text>
            </View>
          </View>
          <View style={InviteTenantStyle.menuiconview}>
            <AntDesign
              name="hearto"
              size={25}
              color={_COLORS.Kodie_GrayColor}
              style={InviteTenantStyle.heartimg}
            />

            <Entypo
              name="dots-three-horizontal"
              size={20}
              color={_COLORS.Kodie_GrayColor}
              style={InviteTenantStyle.closeIcon}
            />
          </View>
        </View>
        <View style={InviteTenantStyle.description}>
          <View style={InviteTenantStyle.desc_View}>
            <Text style={InviteTenantStyle.desc_heading}>
              {"Looking for : "}
            </Text>
            <Text style={InviteTenantStyle.desc_value}>{item.looking_For}</Text>
          </View>
          <View style={InviteTenantStyle.desc_View}>
            <Text style={InviteTenantStyle.desc_heading}>{"Location : "}</Text>
            <Text style={InviteTenantStyle.desc_value}>{item.location}</Text>
          </View>
          <View style={InviteTenantStyle.desc_View}>
            <Text style={InviteTenantStyle.desc_heading}>{"Budget : "}</Text>
            <Text style={InviteTenantStyle.desc_value}>{item.budget}</Text>
          </View>
          <TouchableOpacity>
            <Text style={InviteTenantStyle.readtext}>{"Read more"}</Text>
          </TouchableOpacity>
        </View>
        <View style={InviteTenantStyle.RowBtnView}>
          <RowButtons
            leftButtonHeight={50}
            RightButtonHeight={50}
            LeftButtonText="View Profile"
            onPressLeftButton={()=>props.navigation.navigate("PreScreening")}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_BlackColor}
            RightButtonText="Add to property"
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
            onPressRightButton={() => props.navigation.navigate("Language")}
          />
        </View>
        <DividerIcon />
      </>
    );
  };
  return (
    <View style={InviteTenantStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Tenant"}
      />
      <SearchBar
        filterImage={IMAGES.filter}
        isFilterImage
        height={48}
        marginTop={20}
      />
      <DividerIcon />
      <FlatList
        data={data}
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={tenantData}
      />
    </View>
  );
};
