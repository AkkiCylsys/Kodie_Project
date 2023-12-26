import React, { useState, useRef } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { ContractorsStyle3 } from "./ContractorsStyle3";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
import { _COLORS, IMAGES, LABEL_STYLES } from "../../Themes";
import DividerIcon from "../../components/Atoms/Devider/DividerIcon";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
import SearchBar from "../../components/Molecules/SearchBar/SearchBar";
import CustomTabNavigator from "../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import ContractorsComponent from "../../components/Molecules/ContractorsComponent/ContractorsComponent";
import RBSheet from "react-native-raw-bottom-sheet";
import ContractorsImage from "../../components/Molecules/Contractors/ContractorsImage/ContractorsImage";

const Contractors3 = (props) => {
  const refRBSheet = useRef();
  const [activeScreen, setActiveScreen] = useState(false);
  const [activeTab, setActiveTab] = useState("Tab3");
  const [isLoading, setIsLoading] = useState(false);
  const toggleView = () => {
    setVisible(!visible);
  };

  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":
      case "Tab2":
      case "Tab3":
    }
  };
  return (
    <View style={ContractorsStyle3.mainContainer}>
      <TopHeader
        IsNotification={true}
        RightUserProfile={IMAGES.Landlordprofile}
        MiddleText={"Contractors"}
        leftImage={"menu"}
        onPressLeftButton={() => props.navigation.openDrawer()}
      />
      <ScrollView>
        <View style={ContractorsStyle3.container}>
          <View style={ContractorsStyle3.tabview}>
            <CustomTabNavigator
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              TAB3
              Tab1={"Preferred"}
              Tab2={"Current"}
              Tab3={"Previous"}
              onPressTab1={() => setActiveTab("Tab1")}
              onPressTab2={() => setActiveTab("Tab2")}
              onPressTab3={() => setActiveTab("Tab3")}
              colorTab1={
                activeTab === "Tab1"
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              colorTab2={
                activeTab === "Tab2"
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              colorTab3={
                activeTab === "Tab3"
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              styleTab1={activeTab === "Tab1" && ContractorsStyle3.activeTab}
              styleTab2={activeTab === "Tab2" && ContractorsStyle3.activeTab}
              styleTab3={activeTab === "Tab3" && ContractorsStyle3.activeTab}
            />
          </View>
          <View style={ContractorsStyle3.Line} />
          <SearchBar
            marginTop={20}
            frontSearchIcon
            isFilterImage
            filterImage={IMAGES.filter}
            height={48}
          />
          <View style={ContractorsStyle3.Line1} />
          <View style={ContractorsStyle3.buttonview}>
            <CustomSingleButton
              _ButtonText={activeScreen ? "" : "+ Add contractor"}
              Text_Color={_COLORS.Kodie_WhiteColor}
              text_Size={14}
              backgroundColor={_COLORS.Kodie_BlackColor}
              height={40}
              marginTop={20}
              onPress={() => {
                refRBSheet.current.open();
              }}
              disabled={isLoading ? true : false}
            />
          </View>
          <View style={ContractorsStyle3.Line1} />
          <ContractorsComponent
            name="Jason Stathom"
            filedname="Handyman"
            startRating="4.6"
            ratingnumber="231"
            address="1234, Contractor’s address. Australia"
            notverified="Not verified"
            CoverText1="Cover letter -"
            CoverText2="I am the best contractor in town, ready to go. Check my best works portfolio and..."
            CoverText3="read more"
          />

          <DividerIcon />
          <ContractorsComponent
            name="Mesut Ozil"
            filedname="Plumber"
            startRating="4.0"
            ratingnumber="100"
            address="1234, Contractor’s address. Australia"
            verified={true}
            CoverText1="Cover letter -"
            CoverText2="I am the best contractor in town, ready to go. Check my best works portfolio and..."
            CoverText3="read more"
          />

          <DividerIcon />
          <ContractorsComponent
            name="Jack Black"
            filedname="Handyman"
            startRating="3.6"
            ratingnumber="231"
            address="1234, Contractor’s address. Australia"
            verified={true}
            CoverText1="Cover letter -"
            CoverText2="I am the best contractor in town, ready to go. Check my best works portfolio and..."
            CoverText3="read more"
          />
          <DividerIcon />
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        height={200}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.20)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_BlackColor,
          },
          container: ContractorsStyle3.bottomModal_container,
        }}
      >
        <ContractorsImage
          heading_Text={"Upload  documents"}
          onPress={toggleView}
        />
      </RBSheet>
    </View>
  );
};
export default Contractors3;
