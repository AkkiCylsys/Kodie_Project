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
        <SearchBar frontSearchIcon={true} height={48} marginTop={20} />
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
        <Text style={LandlordProfileStyle.AllcontactsText}>Settings</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Account");
          }}>
          <RowTab
            IsDivider={false}
            isSecondRowText={true}
            LeftImage={IMAGES.Accountsetting}
            TabTaxt="Account"
            TabSubTaxt="Manage your account & payment settings"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ManageSubscription");
          }}>
          <RowTab
            IsDivider={false}
            isSecondRowText={true}
            LeftImage={IMAGES.ManageSubscription}
            TabTaxt="Manage Subscription"
            TabSubTaxt="Manage your subscription plans"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Contactus");
          }}>
          <RowTab
            IsDivider={false}
            isSecondRowText={true}
            LeftImage={IMAGES.Privacy}
            TabTaxt="Privacy & Security"
            TabSubTaxt="View your privacy and security settings"
          />
        </TouchableOpacity>
        <Text style={LandlordProfileStyle.AllcontactsText}>Feedback</Text>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Help_FeedBack");
          }}>
          <RowTab
            IsDivider={false}
            isSecondRowText={true}
            LeftImage={IMAGES.Accountsetting}
            TabTaxt="Help & Feedback"
            TabSubTaxt="Get help and leave feedback"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("SocialMedia");
          }}>
          <RowTab
            IsDivider={false}
            isSecondRowText={true}
            LeftImage={IMAGES.Subscription}
            TabTaxt="Follow us on social media"
            TabSubTaxt="Follow us for news, insights and more!"
          />
        </TouchableOpacity>

        <Text style={LandlordProfileStyle.AllcontactsText}>Share</Text>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Invitefriend");
          }}>
          <RowTab
            IsDivider={false}
            isSecondRowText={true}
            LeftImage={IMAGES.Subscription}
            TabTaxt="Tell a Friend"
            TabSubTaxt="Tell your friends about Kodie"
          />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => {
            props.navigation.navigate("PropertyExpenses");
          }}>
          <RowTab
            IsDivider={false}
            isSecondRowText={true}
            LeftImage={IMAGES.RateKodie}
            TabTaxt="Rate Kodie"
            TabSubTaxt="Rate your Kodie experience"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Dashboard");
          }}>
            <RowTab
            IsDivider={false}
            isSecondRowText={true}
            LeftImage={IMAGES.Logout}
            TabTaxt="Logout"
            TabSubTaxt="Logout of your Kodie profile"
          />
        </TouchableOpacity>
        {/* <LandlordProfileData /> */}
      </ScrollView>
    </View>
  );
};
