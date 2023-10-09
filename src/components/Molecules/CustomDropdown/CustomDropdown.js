import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomDropdownStyle } from "./CustomDropdownStyle";
import { _COLORS } from "../../../Themes";

const CustomDropdown = (props) => {
  const [show, setShow] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [appliedOptions, setAppliedOptions] = useState([]);

  // -----all data is show in the dropdown menu
  const data = props.data || [
    "All",
    "House",
    "Cottage",
    "Apartment / Flat",
    "Townhouse",
    "Farm",
  ];

  const toggleOption = (option) => {
    if (option === "All") {
      //   -----when you clicked  "All", select all options or clear all if already selected.
      const updatedOptions =
        selectedOptions.length === data.length - 1 ? [] : [...data.slice(1)];

      setSelectedOptions(updatedOptions);
    } else {
      const updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option];
      setSelectedOptions(updatedOptions);
    }
  };

  

  const toggleshow = () => {
    setShow(!show);
  };
  //  -------this is applied data code here
  const applySelection = () => {
    setAppliedOptions(selectedOptions);
    setShow(false);
    if (props.onApply) {
        props.onApply(selectedOptions); // Callback to parent component
      }
  };
  //  -------this is clearing data code here
  const clearSelection = () => {
    setSelectedOptions([]);
    console.warn('selected')
    setAppliedOptions([]);
        if (props.onClear) {
      props.onClear(); // Callback to parent component
    }
  };

  return (
    <View>
      <View style={CustomDropdownStyle.bindview}>
        {/* ------------- bydefault hide the options value and showing data in dropdown value  */}
        <TouchableOpacity
          style={CustomDropdownStyle.dropmenu}
          onPress={toggleshow}>
          {appliedOptions.length > 0 ? (
            <View style={CustomDropdownStyle.datavisiable}>
              {appliedOptions.map((option) => (
                <Text
                  key={option}
                  style={CustomDropdownStyle.selectedOptionText}
                >
                  {option}
                </Text>
              ))}
            </View>
          ) : (
            <Text style={CustomDropdownStyle.placeholdertext}>
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

      {/* ------------------ bydefault hide the options value  */}
      {show && (
        <View style={CustomDropdownStyle.dropoptionsview}>
          <ScrollView>
            {data.map((option) => (
              <View style={CustomDropdownStyle.bindselectmenu} key={option}>
                <TouchableOpacity
                  onPress={() => toggleOption(option)}
                  style={CustomDropdownStyle.checkboxbind}
                >
                  <MaterialCommunityIcons
                    name={
                      selectedOptions.includes(option)
                        ? "checkbox-marked-circle"
                        : "circle-outline"
                    }
                    size={25}
                    style={CustomDropdownStyle.checkbox}
                    color={
                      selectedOptions.includes(option)
                        ? "_COLORS.Kodie_GreenColor"
                        : "_COLORS.Kodie_LightGrayColor"
                    }
                  />
                </TouchableOpacity>
                <Text style={CustomDropdownStyle.bindselecttext}>{option}</Text>
              </View>
            ))}
          </ScrollView>

          {/* ------------------ button selction section here  */}

          {props.btnview ? (
            <View style={CustomDropdownStyle.btnview}>
              <View style={CustomDropdownStyle.cancleview}>
                <TouchableOpacity onPress={clearSelection}>
                  <Text style={CustomDropdownStyle.canclebtn}>Cancel</Text>
                </TouchableOpacity>
              </View>

              <View style={CustomDropdownStyle.applyview}>
                <TouchableOpacity onPress={applySelection}>
                  <Text style={CustomDropdownStyle.aaplybtn}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

CustomDropdown.defaultprops = {
    btnview: false,
};

export default CustomDropdown;
