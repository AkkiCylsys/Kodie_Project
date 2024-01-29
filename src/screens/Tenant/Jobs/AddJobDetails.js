import React, { useState } from "react";
import { View,Text,TouchableOpacity } from "react-native";
import { AddJobDetailsStyle } from "./AddJobDetailsStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import { _COLORS } from "../../../Themes";
import PersonJob from "../../../components/ContractorModel/PersonJob";
import CompanyJob from "../../../components/ContractorModel/CompanyJob";
export default AddTenantDetails = (props) => {
  const property_id = props.property_id;
  const handleClosePopup = () => {
    props.onClose();
  };
  const [tabValue, setTabValue] = useState("Person");
  const checkTabs = () => {
    switch (tabValue) {
      case "Person":
        return <PersonJob property_id={property_id}/>;
      case "Company":
        return <CompanyJob property_id={property_id}/>;
      default:
        return <Person />;
    }
  };
  return (
    <View style={AddJobDetailsStyle.mainContainer}>
      <View>
        <View style={AddJobDetailsStyle.heading_View}>
          <Text style={AddJobDetailsStyle.heading_Text}>
            {"Add contractor details"}
          </Text>
          <TouchableOpacity onPress={handleClosePopup}>
            <AntDesign
              name="close"
              size={22}
              color={_COLORS.Kodie_BlackColor}
              style={{ alignSelf: "center",marginTop:5}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View style={AddJobDetailsStyle.btn_main_view}>
            <TouchableOpacity
              style={[
                AddJobDetailsStyle.person_view,
                {
                  backgroundColor:
                    tabValue === "Person"
                      ? _COLORS.Kodie_GreenColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                setTabValue("Person");
              }}
            >
              <Text
                style={[
                    AddJobDetailsStyle.person_text,
                  {
                    color:
                      tabValue === "Person"
                        ? _COLORS.Kodie_WhiteColor
                        : _COLORS.Kodie_BlackColor,
                  },
                ]}
              >
                {"Person"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                AddJobDetailsStyle.person_view,
                {
                  backgroundColor:
                    tabValue === "Company"
                      ? _COLORS.Kodie_GreenColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                setTabValue("Company");
              }}
            >
              <Text
                style={[
                    AddJobDetailsStyle.company_text,
                  {
                    color:
                      tabValue === "Company"
                        ? _COLORS.Kodie_WhiteColor
                        : _COLORS.Kodie_BlackColor,
                  },
                ]}
              >
                {"Company"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {checkTabs()}
    </View>
  );
};
