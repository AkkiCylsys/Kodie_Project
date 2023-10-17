import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices/CommonMethods";
import { ReviewjobdetailsStyle2 } from "./ReviewjobdetailsStyle2";
import { _COLORS } from "../../../Themes";
import ProgressBar from "react-native-progress/Bar";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import CustomStepIndicator from "../../../components/Molecules/StepIndicator/CustomStepIndicator";
import CustomTabNavigator from "../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";

const Reviewjobdetails2 = (props) => {
  const [activeTab, setActiveTab] = useState("Tab3");
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab2":
    }
  };
  const [progress, setProgress] = useState(0.4);
  const [value, setValue] = useState(null);
  return (
    <>
      <View style={ReviewjobdetailsStyle2.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Review job details"}
        />
        <ScrollView>
          <Image
            source={require("../../../assets/images/Banners/preview.png")}
            style={ReviewjobdetailsStyle2.img}
          />
          <View style={ReviewjobdetailsStyle2.Container}>
            <Text style={ReviewjobdetailsStyle2.TextFixing}>
              Fixing & Maintenance
            </Text>
            <Text style={ReviewjobdetailsStyle2.ElectricalsText}>
              Electricals
            </Text>
            <CustomTabNavigator
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              TAB3
              TAB4
              Tab1={"Details"}
              Tab2={"Bids"}
              Tab3={"Milestones"}
              Tab4={"Documents"}
              onPressTab1={() => setActiveTab("Tab1")}
              onPressTab2={() => setActiveTab("Tab2")}
              onPressTab3={() => setActiveTab("Tab3")}
              onPressTab4={() => setActiveTab("Tab4")}
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
              colorTab4={
                activeTab === "Tab4"
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              styleTab1={
                activeTab === "Tab1" && ReviewjobdetailsStyle2.activeTab
              }
              styleTab2={
                activeTab === "Tab2" && ReviewjobdetailsStyle2.activeTab
              }
              styleTab3={
                activeTab === "Tab3" && ReviewjobdetailsStyle2.activeTab
              }
              styleTab4={
                activeTab === "Tab4" && ReviewjobdetailsStyle2.activeTab
              }
            />
            <DividerIcon style={ReviewjobdetailsStyle2.divider} />
            <View>
              <Text style={ReviewjobdetailsStyle2.textview}>
                Job milestones
              </Text>
            </View>
            <View style={ReviewjobdetailsStyle2.progressborder}>
              <View style={ReviewjobdetailsStyle2.Inputbox}>
              <Text style={ReviewjobdetailsStyle2.Inpouttext}>Completed</Text>
              <Text style={ReviewjobdetailsStyle2.Inpouttext1}>70%</Text></View>
                <ProgressBar
                  progress={0.8}
                  width={254}
                  height={15}
                  color={_COLORS.Kodie_ExtraDarkGreen}
                  style={ReviewjobdetailsStyle2.progresBar}
                />   
            </View>
            <CustomStepIndicator/>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Reviewjobdetails2;
