import React, { useState, useRef } from "react";
import { View, ScrollView } from "react-native";
import { ManagingcontractorsStyle } from "./ManagingcontractorsStyle";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
import { _COLORS, IMAGES } from "../../Themes";
import DividerIcon from "../../components/Atoms/Devider/DividerIcon";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
import SearchBar from "../../components/Molecules/SearchBar/SearchBar";
import CustomTabNavigator from "../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import Contractors from "../../components/Molecules/Contractors/Contractors";
import RBSheet from "react-native-raw-bottom-sheet";
import ContractorsImage from "../../components/Molecules/Contractors/ContractorsImage/ContractorsImage";
const Managingcontractors = (props) => {
  const refRBSheet = useRef();
  const [activeScreen, setActiveScreen] = useState(false);
  const [activeTab, setActiveTab] = useState("Tab1");
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
    <View style={ManagingcontractorsStyle.mainContainer}>
      <TopHeader
        IsNotification={true}
        RightUserProfile={IMAGES.Landlordprofile}
        MiddleText={"Contractors"}
        leftImage={"menu"}
        onPressLeftButton={() => props.navigation.openDrawer()}
      />
      <ScrollView>
        <View style={ManagingcontractorsStyle.container}>
          <View style={ManagingcontractorsStyle.tabview}>
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
              styleTab1={
                activeTab === "Tab1" && ManagingcontractorsStyle.activeTab
              }
              styleTab2={
                activeTab === "Tab2" && ManagingcontractorsStyle.activeTab
              }
              styleTab3={
                activeTab === "Tab3" && ManagingcontractorsStyle.activeTab
              }
            />
          </View>
          <View style={ManagingcontractorsStyle.Line} />
          <SearchBar
            marginTop={20}
            frontSearchIcon
            isFilterImage
            filterImage={IMAGES.filter}
            height={48}
          />
          <View style={ManagingcontractorsStyle.Line1} />
          <View style={ManagingcontractorsStyle.buttonview}>
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
            />
          </View>
          <View style={ManagingcontractorsStyle.Line1} />
          <Contractors
            name="Jason Stathom"
            filedname="Handyman"
            startRating="4.6"
            ratingnumber="231"
            address="1234, Contractor’s address. Australia"
            notverified="Not verified"
          />

          <DividerIcon />
          <Contractors
            name="Mesut Ozil"
            filedname="Plumber"
            startRating="4.0"
            ratingnumber="100"
            address="1234, Contractor’s address. Australia"
            verified={true}
          />

          <DividerIcon />
          <Contractors
            name="Jack Black"
            filedname="Handyman"
            startRating="3.6"
            ratingnumber="231"
            address="1234, Contractor’s address. Australia"
            verified={true}
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
          container: ManagingcontractorsStyle.bottomModal_container,
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
export default Managingcontractors;
