import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { _COLORS } from "../../../Themes";
import PersonContractor from "./PersonContractor/PersonContractor";
import CompanyContractor from "./CompanyContractor/CompanyContractor";
import { AddContractorstyle } from "./AddContractorstyle";

export default AddContractorDetail = (props) => {
  const property_id = props.property_id;
  const handleClosePopup = () => {
    props.onClose();
  };
  const [tabValue, setTabValue] = useState("Person");
  const checkTabs = () => {
    switch (tabValue) {
      case "Person":
        return <PersonContractor onClose={handleClosePopup} />;
      case "Company":
        return <CompanyContractor />;
      default:
        return <PersonContractor />;
    }
  };
  return (
    <View style={AddContractorstyle.mainContainer}>
      <View>
        <View style={AddContractorstyle.heading_View}>
          <Text style={AddContractorstyle.heading_Text}>
            {"Add contractor details"}
          </Text>
          <TouchableOpacity onPress={props.onCloseperson}>
            <AntDesign
              name="close"
              size={22}
              color={_COLORS.Kodie_BlackColor}
              style={{ alignSelf: "center", marginTop: 5 }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={AddContractorstyle.btn_main_view}>
              <TouchableOpacity
                style={[
                  AddContractorstyle.person_view,
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
                    AddContractorstyle.person_text,
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
                  AddContractorstyle.person_view,
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
                    AddContractorstyle.company_text,
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
      </View>
      {checkTabs()}
    </View>
  );
};
