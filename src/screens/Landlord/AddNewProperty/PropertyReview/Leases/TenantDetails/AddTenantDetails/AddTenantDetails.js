import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AddTenantDetailsStyle } from "./AddTenantDetailsStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import { _COLORS } from "../../../../../../../Themes";
import Person from "./Person/Person";
import Company from "./Company/Company";
export default AddTenantDetails = () => {
  const [tabValue, setTabValue] = useState("Person");
  const checkTabs = () => {
    switch (tabValue) {
      case "Person":
        return <Person />;
      case "Company":
        return <Company />;
      default:
        return <Person />;
    }
  };
  return (
    <View style={AddTenantDetailsStyle.mainContainer}>
      <View>
        <View style={AddTenantDetailsStyle.heading_View}>
          <Text style={AddTenantDetailsStyle.heading_Text}>
            {"Add lease details"}
          </Text>
          <AntDesign
            name="close"
            size={22}
            color={_COLORS.Kodie_BlackColor}
            style={{ alignSelf: "center" }}
          />
        </View>
        <View>
          <View style={AddTenantDetailsStyle.btn_main_view}>
            <TouchableOpacity
              style={[
                AddTenantDetailsStyle.person_view,
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
                  AddTenantDetailsStyle.person_text,
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
                AddTenantDetailsStyle.person_view,
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
                  AddTenantDetailsStyle.company_text,
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