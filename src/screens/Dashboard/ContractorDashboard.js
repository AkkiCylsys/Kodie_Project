import React, { useState } from "react";
import { View,Text,ScrollView } from "react-native";
import { ContractorDashboardStyle } from "./ContractorDashboardStyle";
import TopHeader from "../../components/Molecules/Header/Header";
import { _COLORS,IMAGES } from "../../Themes";
import CustomTabNavigator from "../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import { _goBack } from "../../services/CommonServices";


const ContractorDashboard = (props) => {
    const [activeTab, setActiveTab] = useState("Tab1");
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":
      case "Tab2":
      case "Tab3":
    }
  };
  
  return (
    <>
      <View style={ContractorDashboardStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Contractors"}
          IsNotification={true}
          RightUserProfile={IMAGES.Landlordprofile}
        />
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
        styleTab1={activeTab === "Tab1" && ContractorDashboardStyle.activeTab}
        styleTab2={activeTab === "Tab2" && ContractorDashboardStyle.activeTab}
        styleTab3={activeTab === "Tab3" && ContractorDashboardStyle.activeTab}
      />
      <View style={ContractorDashboardStyle.Line} />
      {checkTabs()}
      <View><Text>Contractor details</Text></View>
      <ScrollView>
          <View style={ContractorDashboardStyle.Container}>
            <Text style={ContractorDashboardStyle.TextCalendar}>
              Calendar settings
            </Text>
            <Text style={ContractorDashboardStyle.text}>
              These options will allow you to change your preferred weekly
              availability to ensure that bookings are only made when you are
              available.
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ContractorDashboard;
