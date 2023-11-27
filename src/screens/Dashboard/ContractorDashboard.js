import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { ContractorDashboardStyle } from "./ContractorDashboardStyle";
import TopHeader from "../../components/Molecules/Header/Header";
import { _COLORS, IMAGES } from "../../Themes";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
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
        <View style={ContractorDashboardStyle.container}>
          <Text style={ContractorDashboardStyle.TextContractor}>
            Contractor details
          </Text>
          <Text style={ContractorDashboardStyle.text}>
            Invite contractor to connect
          </Text>
          <View style={ContractorDashboardStyle.Button}>
            <CustomSingleButton
              _ButtonText={"+ Add contractor"}
              Text_Color={_COLORS.Kodie_WhiteColor}
              text_Size={14}
              backgroundColor={_COLORS.Kodie_BlackColor}
              height={38}
              marginTop={3}
              onPress={props.propertyDetail}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default ContractorDashboard;
