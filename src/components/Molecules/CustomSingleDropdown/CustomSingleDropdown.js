import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomSingleDropdownStyle } from "./CustomSingleDropdownStyle";
import { _COLORS } from "../../../Themes";

const CustomSingleDropdown = (props) => {
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [appliedOption, setAppliedOption] = useState("");

  // ----- Define the available property types without "All"
  const data = props.data || [
    "House",
    "Cottage",
    "Apartment / Flat",
    "Townhouse",
    "Farm",
  ];

  const toggleOption = (option) => {
    if (selectedOption === option) {
      setSelectedOption("");
    } else {
      setSelectedOption(option);
    }
  };

  const toggleshow = () => {
    setShow(!show);
  };

  const applySelection = () => {
    setAppliedOption(selectedOption);
    setShow(false);
    if (props.onApply) {
      props.onApply(selectedOption);
    }
  };

  const clearSelection = () => {
    setSelectedOption("");
    setAppliedOption("");
    if (props.onClear) {
      props.onClear();
    }
  };

  return (
    <View>
      <View style={CustomSingleDropdownStyle.bindview}>
        <TouchableOpacity style={CustomSingleDropdownStyle.dropmenu} onPress={toggleshow}>
          {appliedOption ? (
            <Text style={CustomSingleDropdownStyle.selectedOptionText}>
              {appliedOption}
            </Text>
          ) : (
            <Text style={CustomSingleDropdownStyle.placeholdertext}>
              {props.placeholdertext}
            </Text>
          )}
          <Entypo
            name={show ? "chevron-up" : "chevron-down"}
            size={22}
            color={_COLORS.Kodie_BlackColor}
          />
        </TouchableOpacity>
      </View>

      {show && (
        <View style={CustomSingleDropdownStyle.dropoptionsview}>
          <ScrollView>
            {data.map((option) => (
              <View style={CustomSingleDropdownStyle.bindselectmenu} key={option}>
                <TouchableOpacity onPress={() => toggleOption(option)}>
                  <MaterialCommunityIcons
                    name={
                      selectedOption === option
                        ? "checkbox-marked-circle"
                        : "circle-outline"
                    }
                    size={25}
                    style={CustomSingleDropdownStyle.checkbox}
                    color={
                      selectedOption === option
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_LightGrayColor
                    }
                  />
                </TouchableOpacity>
                <Text style={CustomSingleDropdownStyle.bindselecttext}>{option}</Text>
              </View>
            ))}
          </ScrollView>

          {props.btnview ? (
            <View style={CustomSingleDropdownStyle.btnview}>
              <View style={CustomSingleDropdownStyle.cancleview}>
                <TouchableOpacity onPress={clearSelection}>
                  <Text style={CustomSingleDropdownStyle.canclebtn}>Cancel</Text>
                </TouchableOpacity>
              </View>

              <View style={CustomSingleDropdownStyle.applyview}>
                <TouchableOpacity onPress={applySelection}>
                  <Text style={CustomSingleDropdownStyle.aaplybtn}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

CustomSingleDropdown.defaultprops = {
  btnview: false,
};

export default CustomSingleDropdown;



