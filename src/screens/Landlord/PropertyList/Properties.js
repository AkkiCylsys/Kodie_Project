import React, { useState } from "react";
import { View } from "react-native";
import TopHeader from "../../../components/Molecules/Header/Header";
import CustomTabNavigator from "../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import PropertyList from "./PropertyList";
import PropertyList2 from "./PropertyList2";
import PropertyList3 from "./PropertyList3";
import { _goBack } from "./../../../services/CommonServices/index";
import { _COLORS } from "../../../Themes";
import { PropertiesCSS } from "./PropertiesCss";

const Properties = (props) => {
  const [activeTab, setActiveTab] = useState("");
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":
        return (
          <PropertyList
            propertyDetail={() => props.navigation.navigate("PropertyDetails")}
          />
        );
      case "Tab2":
        return <PropertyList2 />;
      case "Tab3":
        return <PropertyList />;

      default:
        return <PropertyList />;
    }
  };

  return (
    <View style={PropertiesCSS.Container}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Property list"}
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
