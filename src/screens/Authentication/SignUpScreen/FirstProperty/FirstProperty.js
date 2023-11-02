//ScreenNo:13
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FirstPropertyStyle } from "./FirstPropertyStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
import { LABEL_STYLES } from "../../../../Themes";
import { Dropdown } from "react-native-element-dropdown";
import { MultiSelect } from "react-native-element-dropdown";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";

const data = [
  { label: "Bharat", value: "1" },
  { label: "Australia", value: "2" },
  { label: "America", value: "3" },
];
const DATA = [
  { label: "Pool", value: "1" },
  { label: "Garden", value: "2" },
  { label: "Furnished", value: "3" },
  { label: "Flat", value: "4" },
];
const key_features = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
];
const renderDataItem = (item) => {
  return (
    <View style={FirstPropertyStyle.item}>
      <Text style={FirstPropertyStyle.selectedTextStyle}>{item.label}</Text>
      <AntDesign
        style={FirstPropertyStyle.icon}
        color={_COLORS.Kodie_BlackColor}
        name="check"
        size={20}
      />
    </View>
  );
};
export default FirstProperty = (props) => {
  const [location, setLocation] = useState("");
  const [propertyDesc, setPropertyDesc] = useState("");
  const [selected, setSelected] = useState([]);
  const [value, setValue] = useState(null);
  return (
    // <View style={FirstPropertyStyle.mainContainer}>
    <ScrollView>
      <View style={FirstPropertyStyle.headingView}>
        <Text style={FirstPropertyStyle.heading}>
          {"Add your first property"}
        </Text>
      </View>
      <View style={FirstPropertyStyle.card}>
        <View style={FirstPropertyStyle.inputContainer}>
          <Text style={LABEL_STYLES._texinputLabel}>Location</Text>
          <View style={FirstPropertyStyle.locationContainer}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Location");
              }}
            >
              <Octicons
                name={"location"}
                size={20}
                color={_COLORS.Kodie_MediumGrayColor}
                style={FirstPropertyStyle.locationIcon}
              />
            </TouchableOpacity>
            <TextInput
              style={FirstPropertyStyle.locationInput}
              value={location}
              onChangeText={setLocation}
              placeholder="Search location"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            />
          </View>
          <Dropdown
            style={FirstPropertyStyle.dropdown}
            placeholderStyle={FirstPropertyStyle.placeholderStyle}
            selectedTextStyle={FirstPropertyStyle.selectedTextStyle}
            inputSearchStyle={FirstPropertyStyle.inputSearchStyle}
            iconStyle={FirstPropertyStyle.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Enter address manually"
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
        </View>
        <View style={FirstPropertyStyle.inputContainer}>
          <Text style={LABEL_STYLES._texinputLabel}>Property description</Text>
          <TextInput
            style={FirstPropertyStyle.input}
            value={propertyDesc}
            onChangeText={setPropertyDesc}
            placeholder="Enter a description of your property"
            placeholderTextColor="#999"
            multiline
            numberOfLines={5}
            textAlignVertical={"top"}
          />
        </View>
        <View style={FirstPropertyStyle.inputContainer}>
          <Text style={LABEL_STYLES._texinputLabel}>Property type</Text>
          <Dropdown
            style={FirstPropertyStyle.dropdown}
            placeholderStyle={[
              FirstPropertyStyle.placeholderStyle,
              { color: _COLORS.Kodie_LightGrayColor },
            ]}
            selectedTextStyle={FirstPropertyStyle.selectedTextStyle}
            inputSearchStyle={FirstPropertyStyle.inputSearchStyle}
            iconStyle={FirstPropertyStyle.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Apartment"
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
        </View>
        <View style={FirstPropertyStyle.inputContainer}>
          <Text style={LABEL_STYLES._texinputLabel}>Key features</Text>
          <View style={FirstPropertyStyle.key_feature_mainView}>
            <View style={FirstPropertyStyle.key_feature_subView}>
              <Text style={FirstPropertyStyle.key_feature_Text}>
                {"Bedrooms"}
              </Text>
              <Dropdown
                style={[
                  FirstPropertyStyle.dropdown,
                  FirstPropertyStyle.key_feature_Dropdownstyle,
                ]}
                placeholderStyle={[
                  FirstPropertyStyle.placeholderStyle,
                  { color: _COLORS.Kodie_LightGrayColor },
                ]}
                selectedTextStyle={FirstPropertyStyle.selectedTextStyle}
                inputSearchStyle={FirstPropertyStyle.inputSearchStyle}
                iconStyle={FirstPropertyStyle.iconStyle}
                data={key_features}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="3"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
            </View>
            <View style={FirstPropertyStyle.key_feature_subView}>
              <Text style={FirstPropertyStyle.key_feature_Text}>
                {"Garages"}
              </Text>
              <Dropdown
                style={[
                  FirstPropertyStyle.dropdown,
                  FirstPropertyStyle.key_feature_Dropdownstyle,
                ]}
                placeholderStyle={[
                  FirstPropertyStyle.placeholderStyle,
                  { color: _COLORS.Kodie_LightGrayColor },
                ]}
                selectedTextStyle={FirstPropertyStyle.selectedTextStyle}
                inputSearchStyle={FirstPropertyStyle.inputSearchStyle}
                iconStyle={FirstPropertyStyle.iconStyle}
                data={key_features}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="1"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={FirstPropertyStyle.key_feature_mainView}>
            <View style={FirstPropertyStyle.key_feature_subView}>
              <Text style={FirstPropertyStyle.key_feature_Text}>
                {"Bathrooms"}
              </Text>
              <Dropdown
                style={[
                  FirstPropertyStyle.dropdown,
                  FirstPropertyStyle.key_feature_Dropdownstyle,
                ]}
                placeholderStyle={[
                  FirstPropertyStyle.placeholderStyle,
                  { color: _COLORS.Kodie_LightGrayColor },
                ]}
                selectedTextStyle={FirstPropertyStyle.selectedTextStyle}
                inputSearchStyle={FirstPropertyStyle.inputSearchStyle}
                iconStyle={FirstPropertyStyle.iconStyle}
                data={key_features}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="3"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
            </View>
            <View style={FirstPropertyStyle.key_feature_subView}>
              <Text style={FirstPropertyStyle.key_feature_Text}>
                {"Parkings"}
              </Text>
              <Dropdown
                style={[
                  FirstPropertyStyle.dropdown,
                  FirstPropertyStyle.key_feature_Dropdownstyle,
                ]}
                placeholderStyle={[
                  FirstPropertyStyle.placeholderStyle,
                  { color: _COLORS.Kodie_LightGrayColor },
                ]}
                selectedTextStyle={FirstPropertyStyle.selectedTextStyle}
                inputSearchStyle={FirstPropertyStyle.inputSearchStyle}
                iconStyle={FirstPropertyStyle.iconStyle}
                data={key_features}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="1"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={FirstPropertyStyle.key_feature_mainView}>
            <View style={FirstPropertyStyle.key_feature_subView}>
              <Text style={FirstPropertyStyle.key_feature_Text}>
                {"Floor size"}
              </Text>
              <Dropdown
                style={[
                  FirstPropertyStyle.dropdown,
                  FirstPropertyStyle.key_feature_Dropdownstyle,
                  { flex: 0.3, height: 40, marginLeft: 10 },
                ]}
                placeholderStyle={[
                  FirstPropertyStyle.placeholderStyle,
                  { color: _COLORS.Kodie_LightGrayColor },
                ]}
                selectedTextStyle={FirstPropertyStyle.selectedTextStyle}
                inputSearchStyle={FirstPropertyStyle.inputSearchStyle}
                iconStyle={FirstPropertyStyle.iconStyle}
                data={key_features}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="3"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={FirstPropertyStyle.inputContainer}>
            <Text
              style={[
                LABEL_STYLES._texinputLabel,
                FirstPropertyStyle.addition_featureText,
              ]}
            >
              Additional features
            </Text>
            <MultiSelect
              style={FirstPropertyStyle.dropdown}
              placeholderStyle={FirstPropertyStyle.placeholderStyle}
              selectedTextStyle={FirstPropertyStyle.selectedTextStyle}
              inputSearchStyle={FirstPropertyStyle.inputSearchStyle}
              iconStyle={FirstPropertyStyle.iconStyle}
              data={DATA}
              labelField="label"
              valueField="value"
              placeholder="Search"
              value={selected}
              search
              searchPlaceholder="Search..."
              onChange={(item) => {
                setSelected(item);
              }}
              renderRightIcon={() => (
                <AntDesign
                  style={FirstPropertyStyle.icon}
                  color={_COLORS.Kodie_BlackColor}
                  name="search1"
                  size={20}
                />
              )}
              renderItem={renderDataItem}
              renderSelectedItem={(item, unSelect) => (
                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View style={FirstPropertyStyle.selectedStyle}>
                    <Text style={FirstPropertyStyle.textSelectedStyle}>
                      {item.label}
                    </Text>
                    <AntDesign color="black" name="close" size={17} />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <Text style={FirstPropertyStyle.AutoList_text}>
          {"Auto-list property on Kodie property marketplace "}
        </Text>
        <RowButtons
          LeftButtonText={"Yes"}
          leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
          LeftButtonTextColor={_COLORS.Kodie_BlackColor}
          LeftButtonborderColor={_COLORS.Kodie_GrayColor}
          RightButtonText={"No"}
          RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
          RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
          RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
        />
      </View>
    </ScrollView>
    // </View>
  );
};
