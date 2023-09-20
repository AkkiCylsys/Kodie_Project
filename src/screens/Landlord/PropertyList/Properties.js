import React, { useState } from "react";
import { View } from "react-native";
import TopHeader from "../../../components/Molecules/Header/Header";
import CustomTabNavigator from "../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import PropertyList from "./MyProperty/PropertyList";
import PropertyList2 from "./SearchForRentals/PropertyList2";
import { _goBack } from "./../../../services/CommonServices/index";
import { _COLORS } from "../../../Themes";
import { PropertiesCSS } from "./PropertiesCss";
import RantalOffer from "./RentalOffer/RantalOffer";

const Properties = (props) => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":
        return (
          <PropertyList
            propertyDetail={() => props.navigation.navigate("PropertyDetails")}
          />
        );
      case "Tab2":
        return (
          <PropertyList2
            SearchButton={() => props.navigation.navigate("SearchResult")}
          />
        );
      case "Tab3":
        return <RantalOffer />;

      default:
        return <PropertyList />;
    }
  };

  return (
    <View style={PropertiesCSS.Container}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Properties"}
      />
      <CustomTabNavigator
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        TAB3
        Tab1={"My properties"}
        Tab2={"Search for rentals"}
        Tab3={"Rental offers"}
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
        styleTab1={activeTab === "Tab1" && PropertiesCSS.activeTab}
        styleTab2={activeTab === "Tab2" && PropertiesCSS.activeTab}
        styleTab3={activeTab === "Tab3" && PropertiesCSS.activeTab}
      />
      <View style={PropertiesCSS.Line} />
      {checkTabs()}
      {/* {activeTab === "Tab1" && (
        <PropertyList
          propertyDetail={() => props.navigation.navigate("PropertyDetails")}
        />
      )}
      {activeTab === "Tab2" && <PropertyList2 />}
      {activeTab === "Tab3" && <PropertyList3 />} */}
    </View>
  );
};

export default Properties;
