import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import { FONTFAMILY, _COLORS } from "../../../Themes";
import { PropertyList2Css } from "./PropertyList2Css";
const data = [
  { label: "Bharat", value: "1" },
  { label: "Australia", value: "2" },
  { label: "America", value: "3" },
];
const PropertyList2 = () => {
  const [location, setLocation] = useState("");
  const [value, setValue] = useState(null);
  return (
    <>
      <ScrollView contentContainerStyle={PropertyList2Css.scrollViewStl}>
        <SearchBar frontSearchIcon height={48} mapIcon />
        <View style={PropertyList2Css.Container}>
          <Text style={PropertyList2Css.inputText}>Property Type:</Text>
          <Dropdown
            style={PropertyList2Css.dropdown}
            placeholderStyle={PropertyList2Css.placeholderStyle}
            selectedTextStyle={PropertyList2Css.selectedTextStyle}
            inputSearchStyle={PropertyList2Css.inputSearchStyle}
            iconStyle={PropertyList2Css.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Apartment"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
          <View style={PropertyList2Css.rowView}>
            <View style={PropertyList2Css.flexContainer}>
              <Text style={PropertyList2Css.inputText}>Min Price:</Text>
              <Dropdown
                style={PropertyList2Css.dropdown}
                placeholderStyle={PropertyList2Css.placeholderStyle}
                selectedTextStyle={PropertyList2Css.selectedTextStyle}
                inputSearchStyle={PropertyList2Css.inputSearchStyle}
                iconStyle={PropertyList2Css.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="$300 per week"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
            </View>
            <View style={PropertyList2Css.spaceView} />

            <View style={PropertyList2Css.flexContainer}>
              <Text style={PropertyList2Css.inputText}>Max Price:</Text>
              <Dropdown
                style={PropertyList2Css.dropdown}
                placeholderStyle={PropertyList2Css.placeholderStyle}
                selectedTextStyle={PropertyList2Css.selectedTextStyle}
                inputSearchStyle={PropertyList2Css.inputSearchStyle}
                iconStyle={PropertyList2Css.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Apartment"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={PropertyList2Css.rowView}>
            <View style={PropertyList2Css.flexContainer}>
              <Text style={PropertyList2Css.inputText}>Min Price:</Text>
              <Dropdown
                style={PropertyList2Css.dropdown}
                placeholderStyle={PropertyList2Css.placeholderStyle}
                selectedTextStyle={PropertyList2Css.selectedTextStyle}
                inputSearchStyle={PropertyList2Css.inputSearchStyle}
                iconStyle={PropertyList2Css.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Apartment"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
            </View>
            <View style={PropertyList2Css.spaceView} />

            <View style={PropertyList2Css.flexContainer}>
              <Text style={PropertyList2Css.inputText}>Max Price:</Text>
              <Dropdown
                style={PropertyList2Css.dropdown}
                placeholderStyle={PropertyList2Css.placeholderStyle}
                selectedTextStyle={PropertyList2Css.selectedTextStyle}
                inputSearchStyle={PropertyList2Css.inputSearchStyle}
                iconStyle={PropertyList2Css.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Apartment"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={PropertyList2Css.rowView}>
            <View style={PropertyList2Css.flexContainer}>
              <Text style={PropertyList2Css.inputText}>Min Price:</Text>
              <Dropdown
                style={PropertyList2Css.dropdown}
                placeholderStyle={PropertyList2Css.placeholderStyle}
                selectedTextStyle={PropertyList2Css.selectedTextStyle}
                inputSearchStyle={PropertyList2Css.inputSearchStyle}
                iconStyle={PropertyList2Css.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Apartment"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
            </View>
            <View style={PropertyList2Css.spaceView} />

            <View style={PropertyList2Css.flexContainer}>
              <Text style={PropertyList2Css.inputText}>Max Price:</Text>
              <Dropdown
                style={PropertyList2Css.dropdown}
                placeholderStyle={PropertyList2Css.placeholderStyle}
                selectedTextStyle={PropertyList2Css.selectedTextStyle}
                inputSearchStyle={PropertyList2Css.inputSearchStyle}
                iconStyle={PropertyList2Css.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Apartment"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default PropertyList2;
