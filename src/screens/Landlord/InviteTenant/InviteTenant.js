import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { InviteTenantStyle } from "./InviteTenantStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import { _COLORS, IMAGES } from "../../../Themes/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import StarRating from "react-native-star-rating";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
const data = [
  {
    id: "1",
    name: "Jason S",
    rating: "4.0",
    view: "231",
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
          <TouchableOpacity style={InviteTenantStyle.usericon}>
            <Image source={IMAGES.userImage} />
          </TouchableOpacity>
          <View style={InviteTenantStyle.nameView}>
            <Text style={InviteTenantStyle.nameText}>{item.name}</Text>
            <View style={InviteTenantStyle.staricon}>
              <AntDesign
                name="star"
                size={15}
                color={_COLORS.Kodie_GrayColor}
                style={InviteTenantStyle.star}
              />
              <Text style={InviteTenantStyle.ratingText}>{item.rating}</Text>
              <Text style={InviteTenantStyle.subrating}>({item.view})</Text>
            </View>
          </View>

          <View style={InviteTenantStyle.starStyle}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              fullStarColor={_COLORS.Kodie_lightGreenColor}
              emptyStarColor={_COLORS.Kodie_LightGrayColor}
              starSize={20}
              selectedStar={(rating) => setRating(rating)}
              starStyle={InviteTenantStyle.startRating}
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
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_BlackColor}
            RightButtonText="Invite Tenant"
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
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
        MiddleText={"Invite Tenant"}
      />
      <SearchBar />
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
