import React, { useEffect, useState } from "react";
import { View } from "react-native";
import TopHeader from "../../../components/Molecules/Header/Header";
import CustomTabNavigator from "../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import PropertyList from "./MyProperty/PropertyList";
import PropertyList2 from "./SearchForRentals/PropertyList2";
import { _goBack } from "./../../../services/CommonServices/index";
import { _COLORS } from "../../../Themes";
import { PropertiesCSS } from "./PropertiesCss";
import RantalOffer from "./RentalOffer/RantalOffer";
import { Config } from "../../../Config";
import axios from "axios";
import { useSelector } from "react-redux";

const Properties = (props) => {
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginData", loginData?.Login_details?.result);

  const [activeTab, setActiveTab] = useState("Tab1");
  const [Property_Data_List, setProperty_Data_List] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    propertyList_Data();
  }, []);
  const propertyList_Data = () => {
    const propertyDataList = {
      user: loginData?.Login_details?.result,
    };

    const url = Config.API_URL;
    const propertyData_List = url + "get_property_details_by_id";
    console.log("Request URL :", propertyData_List);
    setIsLoading(true);
    axios
      .post(propertyData_List, propertyDataList)
      .then((response) => {
        console.log("property_Data_list", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log(
            "propertyDataList....",
            response.data?.property_details?.image_path
          );
          setProperty_Data_List(response?.data?.property_details);
          console.log(Property_Data_List, "Rahul...");
        } else {
          console.error("property_Data_list_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("property_Data_list error:", error);
        // alert(error);
        setIsLoading(false);
      });
  };
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":
        return (
          <PropertyList
            propertyDetail={() => props.navigation.navigate("PropertyDetails")}
            onEdit={(data) => {
              // Access propertyid in onEdit function
              const { propertyid } = data;
              // alert(propertyid);
              props.navigation.navigate("PropertyDetails", {
                propertyid: propertyid,
                editMode: "editMode",
              });
            }}
          />
        );
      case "Tab2":
        return (
          <PropertyList2
            SearchButton={() => props.navigation.navigate("SearchResult")}
          />
        );
      case "Tab3":
        return (
          <RantalOffer
            ViewApplication={() => props.navigation.navigate("ViewApplication")}
          />
        );

      default:
        return <PropertyList />;
    }
  };

  return (
    <View style={PropertiesCSS.Container}>
      <TopHeader
        // onPressLeftButton={() => _goBack(props)}

        onPressLeftButton={() => props.navigation.navigate("Dashboard")}
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
