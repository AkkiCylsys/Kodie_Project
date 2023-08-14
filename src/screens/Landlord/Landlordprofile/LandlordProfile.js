import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import { LandlordProfileStyle } from "./LandlordProfileStyle";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import AntDesign from "react-native-vector-icons/AntDesign";
import { _COLORS, IMAGES } from "../../../Themes/index";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import LandlordProfileData from "../../../components/Molecules/LandlordProfileData/LandlordProfileData";
export default LandlordProfile = (props) => {
  return (
    <View style={LandlordProfileStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Profile"}
      />
      <ScrollView>
        <SearchBar />
        <View style={LandlordProfileStyle.profilemainView}>
          <TouchableOpacity style={LandlordProfileStyle.ProfileView}>
            <Image
              source={IMAGES.Landlordprofile}
              style={LandlordProfileStyle.usericon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={LandlordProfileStyle.nameView}>
            <Text style={LandlordProfileStyle.nameText}>{"Jason Stathom"}</Text>
            <Text style={LandlordProfileStyle.emailText}>
              {"Jason5@gmail.com"}
            </Text>
            <View style={LandlordProfileStyle.staricon}>
              <AntDesign
                name="star"
                size={15}
                color={_COLORS.Kodie_lightGreenColor}
                style={LandlordProfileStyle.star}
              />
              <Text style={LandlordProfileStyle.ratingText}>{"4.6"}</Text>
              <Text style={LandlordProfileStyle.subrating}>({"231"})</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Help_FeedBack")}
            style={LandlordProfileStyle.contactIconView}
          >
            <Image
              source={IMAGES.contactDetails}
              style={LandlordProfileStyle.contactIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <DividerIcon />
        <LandlordProfileData />
      </ScrollView>
    </View>
  );
};
