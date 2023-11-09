import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { PropertyFeatureStyle } from "./PropertyFeatureStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import { MultiSelect } from "react-native-element-dropdown";
import { Dropdown } from "react-native-element-dropdown";
import { LABEL_STYLES } from "../../../../Themes";
import { _COLORS } from "../../../../Themes";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";

const key_features = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
];
const DATA = [
  { label: "Pool", value: "1" },
  { label: "Garden", value: "2" },
  { label: "Furnished", value: "3" },
  { label: "Flat", value: "4" },
];
const renderDataItem = (item) => {
  return (
    <View style={PropertyFeatureStyle.item}>
      <Text style={PropertyFeatureStyle.selectedTextStyle}>{item.label}</Text>
      <AntDesign
        style={PropertyFeatureStyle.icon}
        color={_COLORS.Kodie_BlackColor}
        name="check"
        size={20}
      />
    </View>
  );
};
export default PropertyFeature = (props) => {
  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState([]);
  const [selectedButton, setSelectedButton] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState(0);
  const [selectedButtonDeposit, setSelectedButtonDeposit] = useState(false);
  const [selectedButtonDepositId, setSelectedButtonDepositId] = useState(0);
  const [selectedButtonFurnished, setSelectedButtonFurnished] = useState(false);
  const [selectedButtonFurnishedId, setSelectedButtonFurnishedId] = useState(0);

  return (
    <View style={PropertyFeatureStyle.mainContainer}>
      <View style={PropertyFeatureStyle.headingView}>
        <Text style={PropertyFeatureStyle.heading}>{"Property features"}</Text>
      </View>
      <ScrollView>
        <View style={PropertyFeatureStyle.card}>
          <View style={PropertyFeatureStyle.inputContainer}>
            <Text style={LABEL_STYLES._texinputLabel}>Key features</Text>
            <View style={PropertyFeatureStyle.key_feature_mainView}>
              <View style={PropertyFeatureStyle.key_feature_subView}>
                <Text style={PropertyFeatureStyle.key_feature_Text}>
                  {"Bedrooms"}
                </Text>
                <Dropdown
                  style={[
                    PropertyFeatureStyle.dropdown,
                    PropertyFeatureStyle.key_feature_Dropdownstyle,
                  ]}
                  placeholderStyle={[
                    PropertyFeatureStyle.placeholderStyle,
                    { color: _COLORS.Kodie_LightGrayColor },
                  ]}
                  selectedTextStyle={PropertyFeatureStyle.selectedTextStyle}
                  inputSearchStyle={PropertyFeatureStyle.inputSearchStyle}
                  iconStyle={PropertyFeatureStyle.iconStyle}
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
              <View style={PropertyFeatureStyle.key_feature_subView}>
                <Text style={PropertyFeatureStyle.key_feature_Text}>
                  {"Garages"}
                </Text>
                <Dropdown
                  style={[
                    PropertyFeatureStyle.dropdown,
                    PropertyFeatureStyle.key_feature_Dropdownstyle,
                  ]}
                  placeholderStyle={[
                    PropertyFeatureStyle.placeholderStyle,
                    { color: _COLORS.Kodie_LightGrayColor },
                  ]}
                  selectedTextStyle={PropertyFeatureStyle.selectedTextStyle}
                  inputSearchStyle={PropertyFeatureStyle.inputSearchStyle}
                  iconStyle={PropertyFeatureStyle.iconStyle}
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
            <View style={PropertyFeatureStyle.key_feature_mainView}>
              <View style={PropertyFeatureStyle.key_feature_subView}>
                <Text style={PropertyFeatureStyle.key_feature_Text}>
                  {"Bathrooms"}
                </Text>
                <Dropdown
                  style={[
                    PropertyFeatureStyle.dropdown,
                    PropertyFeatureStyle.key_feature_Dropdownstyle,
                  ]}
                  placeholderStyle={[
                    PropertyFeatureStyle.placeholderStyle,
                    { color: _COLORS.Kodie_LightGrayColor },
                  ]}
                  selectedTextStyle={PropertyFeatureStyle.selectedTextStyle}
                  inputSearchStyle={PropertyFeatureStyle.inputSearchStyle}
                  iconStyle={PropertyFeatureStyle.iconStyle}
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
              <View style={PropertyFeatureStyle.key_feature_subView}>
                <Text style={PropertyFeatureStyle.key_feature_Text}>
                  {"Parkings"}
                </Text>
                <Dropdown
                  style={[
                    PropertyFeatureStyle.dropdown,
                    PropertyFeatureStyle.key_feature_Dropdownstyle,
                  ]}
                  placeholderStyle={[
                    PropertyFeatureStyle.placeholderStyle,
                    { color: _COLORS.Kodie_LightGrayColor },
                  ]}
                  selectedTextStyle={PropertyFeatureStyle.selectedTextStyle}
                  inputSearchStyle={PropertyFeatureStyle.inputSearchStyle}
                  iconStyle={PropertyFeatureStyle.iconStyle}
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
            <View style={PropertyFeatureStyle.key_feature_mainView}>
              <View style={PropertyFeatureStyle.key_feature_subView}>
                <Text style={PropertyFeatureStyle.key_feature_Text}>
                  {"Floor size"}
                </Text>
                <Dropdown
                  style={[
                    PropertyFeatureStyle.dropdown,
                    PropertyFeatureStyle.key_feature_Dropdownstyle,
                    { flex: 0.3, height: 40, marginLeft: 10 },
                  ]}
                  placeholderStyle={[
                    PropertyFeatureStyle.placeholderStyle,
                    { color: _COLORS.Kodie_LightGrayColor },
                  ]}
                  selectedTextStyle={PropertyFeatureStyle.selectedTextStyle}
                  inputSearchStyle={PropertyFeatureStyle.inputSearchStyle}
                  iconStyle={PropertyFeatureStyle.iconStyle}
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
            <View style={PropertyFeatureStyle.addition_featureView}>
              <Text style={PropertyFeatureStyle.additional_Text}>
                {"Additional features"}
              </Text>
              <View style={PropertyFeatureStyle.addition_featureView}>
                <Text style={PropertyFeatureStyle.Furnished_Text}>
                  {"Furnished or unfurnished?"}
                </Text>
                <RowButtons
                  LeftButtonText={"Furnished"}
                  leftButtonbackgroundColor={
                    !selectedButtonFurnished
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  LeftButtonTextColor={
                    !selectedButtonFurnished
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  LeftButtonborderColor={
                    !selectedButtonFurnished
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressLeftButton={() => {
                    setSelectedButtonFurnished(false);
                    setSelectedButtonFurnishedId(1);
                    // alert(selectedButtonId)
                  }}
                  RightButtonText={"Unfurnished"}
                  RightButtonbackgroundColor={
                    selectedButtonFurnished
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  RightButtonTextColor={
                    selectedButtonFurnished
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  RightButtonborderColor={
                    selectedButtonFurnished
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressRightButton={() => {
                    setSelectedButtonFurnished(true);
                    setSelectedButtonFurnishedId(2);
                    // alert(selectedButtonId)
                  }}
                />
              </View>
              <View style={PropertyFeatureStyle.addition_featureView}>
                <Text style={PropertyFeatureStyle.Furnished_Text}>
                  {"Pet friendly?"}
                </Text>
                <RowButtons
                  LeftButtonText={"Yes"}
                  leftButtonbackgroundColor={
                    !selectedButton
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  LeftButtonTextColor={
                    !selectedButton
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  LeftButtonborderColor={
                    !selectedButton
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressLeftButton={() => {
                    setSelectedButton(false);
                    setSelectedButtonId(1);
                    // alert(selectedButtonId)
                  }}
                  RightButtonText={"No"}
                  RightButtonbackgroundColor={
                    selectedButton
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  RightButtonTextColor={
                    selectedButton
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  RightButtonborderColor={
                    selectedButton
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressRightButton={() => {
                    setSelectedButton(true);
                    setSelectedButtonId(2);
                    // alert(selectedButtonId)
                  }}
                />
              </View>
              <View style={PropertyFeatureStyle.addition_featureView}>
                <Text style={PropertyFeatureStyle.Furnished_Text}>
                  {"To be secured by deposit?"}
                </Text>
                <RowButtons
                  LeftButtonText={"Yes"}
                  leftButtonbackgroundColor={
                    !selectedButtonDeposit
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  LeftButtonTextColor={
                    !selectedButtonDeposit
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  LeftButtonborderColor={
                    !selectedButtonDeposit
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressLeftButton={() => {
                    setSelectedButtonDeposit(false);
                    setSelectedButtonDepositId(1);
                    // alert(selectedButtonId)
                  }}
                  RightButtonText={"No"}
                  RightButtonbackgroundColor={
                    selectedButtonDeposit
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  RightButtonTextColor={
                    selectedButtonDeposit
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  RightButtonborderColor={
                    selectedButtonDeposit
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressRightButton={() => {
                    setSelectedButtonDeposit(true);
                    setSelectedButtonDepositId(2);
                    // alert(selectedButtonId)
                  }}
                />
              </View>
            </View>
            <View style={PropertyFeatureStyle.additional_key_view}>
              <Text style={PropertyFeatureStyle.Furnished_Text}>
                {"Additional key features"}
              </Text>
              <MultiSelect
                style={PropertyFeatureStyle.dropdown}
                placeholderStyle={PropertyFeatureStyle.placeholderStyle}
                selectedTextStyle={PropertyFeatureStyle.selectedTextStyle}
                inputSearchStyle={PropertyFeatureStyle.inputSearchStyle}
                iconStyle={PropertyFeatureStyle.iconStyle}
                data={DATA}
                labelField="label"
                valueField="value"
                placeholder="Add features such as pool, aircon, balcony etc."
                value={selected}
                search
                searchPlaceholder="Search..."
                onChange={(item) => {
                  setSelected(item);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={PropertyFeatureStyle.icon}
                    color={_COLORS.Kodie_BlackColor}
                    name="search1"
                    size={20}
                  />
                )}
                renderItem={renderDataItem}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <View style={PropertyFeatureStyle.selectedStyle}>
                      <Text style={PropertyFeatureStyle.textSelectedStyle}>
                        {item.label}
                      </Text>
                      <AntDesign
                        color={_COLORS.Kodie_WhiteColor}
                        name="close"
                        size={17}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
            {/* <View style={PropertyFeatureStyle.btnView}>
              <CustomSingleButton
                _ButtonText={"Next"}
                Text_Color={_COLORS.Kodie_WhiteColor}
                onPress={() => {
                  props.navigation.navigate("PropertyImages");
                }}
              />
            </View>
            <View style={PropertyFeatureStyle.btnView}>
              <CustomSingleButton
                _ButtonText={"Add property features later"}
                Text_Color={_COLORS.Kodie_BlackColor}
                backgroundColor={_COLORS.Kodie_WhiteColor}
              />
            </View>
            <TouchableOpacity style={PropertyFeatureStyle.goBack_View}
            onPress={() => {
              props.navigation.navigate("PropertyDetails");}}>
              <View style={PropertyFeatureStyle.backIcon}>
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color={_COLORS.Kodie_MediumGrayColor}
                />
              </View>
              <Text style={PropertyFeatureStyle.goBack_Text}>{"Go back"}</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
