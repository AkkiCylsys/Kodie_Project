import React, { useState, useRef } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { BiddingDetailsStyle } from "./BiddingDetailsStyle";
import TopHeader from "../../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../../services/CommonServices";
import { _COLORS, IMAGES, LABEL_STYLES } from "../../../../../Themes";
import DividerIcon from "../../../../../components/Atoms/Devider/DividerIcon";
import CustomSingleButton from "../../../../../components/Atoms/CustomButton/CustomSingleButton";
import SearchBar from "../../../../../components/Molecules/SearchBar/SearchBar";
import CustomTabNavigator from "../../../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
// import ContractorsComponent from "../../../../../components/Molecules/ContractorsComponent/ContractorsComponent";
import BiddingComponent from "../../../../../components/Molecules/Bidding/BiddingComponent";
import RBSheet from "react-native-raw-bottom-sheet";
import ContractorsImage from "../../../../../components/Molecules/Contractors/ContractorsImage/ContractorsImage";

const BiddingDetails = (props) => {
  const refRBSheet = useRef();
  // const [activeScreen, setActiveScreen] = useState(false);
  // const [activeTab, setActiveTab] = useState("Tab3");
  // const [isLoading, setIsLoading] = useState(false);
  // const toggleView = () => {
  //   setVisible(!visible);
  // };

  // const checkTabs = () => {
  //   switch (activeTab) {
  //     case "Tab1":
  //     case "Tab2":
  //     case "Tab3":
  //   }
  // };
  return (
    <View style={BiddingDetailsStyle.mainContainer}>
      <ScrollView>
        <View style={BiddingDetailsStyle.container}>
          <BiddingComponent
            name="Jason Stathom"
            filedname="Handyman"
            fileddate="8 Nov 2023"
            startRating="4.6"
            ratingnumber="231"
            ratingamount="Bid amount: "
            ratingprice="$200"
            address="1234, Contractor’s address. Australia"
            notverified="Not verified"
            CoverText1="Cover letter -"
            CoverText2="I am the best contractor in town, ready to go. Check my best works portfolio and..."
            CoverText3="read more"
          />

          <DividerIcon />
          <BiddingComponent
            name="Mesut Ozil"
            filedname="Plumber"
            fileddate="8 Nov 2023"
            startRating="4.0"
            ratingnumber="100"
            ratingamount="Bid amount: "
            ratingprice="$180"
            address="1234, Contractor’s address. Australia"
            verified={true}
            CoverText1="Cover letter -"
            CoverText2="I am the best contractor in town, ready to go. Check my best works portfolio and..."
            CoverText3="read more"
          />

          <DividerIcon />
          <BiddingComponent
            name="Jack Black"
            filedname="Handyman"
            fileddate="8 Nov 2023"
            startRating="3.6"
            ratingnumber="231"
            ratingamount="Bid amount: "
            ratingprice="$200"
            address="1234, Contractor’s address. Australia"
            verified={true}
            CoverText1="Cover letter -"
            CoverText2="I am the best contractor in town, ready to go. Check my best works portfolio and..."
            CoverText3="read more"
          />
          <DividerIcon />
        </View>
      </ScrollView>
      {/* <RBSheet
        ref={refRBSheet}
        height={200}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.20)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_BlackColor,
          },
          container: BiddingDetailsStyle.bottomModal_container,
        }}
      >
        <ContractorsImage
          heading_Text={"Upload  documents"}
          onPress={toggleView}
        />
      </RBSheet> */}
    </View>
  );
};
export default BiddingDetails;
