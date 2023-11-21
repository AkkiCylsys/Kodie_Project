import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { PropertyDetailsStyle } from "./PropertyDetailsStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import { Dropdown } from "react-native-element-dropdown";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LABEL_STYLES } from "../../../../Themes";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import CustomDropdown from "../../../../components/Molecules/CustomDropdown/CustomDropdown";
import { Config } from "../../../../Config";
import axios from "axios";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";
import CustomSingleDropdown from "../../../../components/Molecules/CustomSingleDropdown/CustomSingleDropdown";
const data = [
  { label: "Bharat", value: "1" },
  { label: "Australia", value: "2" },
  { label: "America", value: "3" },
];
const Apartment_data = [
  { label: "House", value: "1" },
  { label: "Cottage", value: "2" },
  { label: "Apartment / Flat", value: "3" },
  { label: "Townhouse", value: "4" },
  { label: "ApLand / vacant plot", value: "5" },
  { label: "Farm", value: "6" },
];
export default PropertyDetails = (props) => {
  const [location, setLocation] = useState("");
  const [value, setValue] = useState(null);
  const [propertyDesc, setPropertyDesc] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  const [property_value, setProperty_value] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <View style={PropertyDetailsStyle.mainContainer}>
      <ScrollView>
        <View style={PropertyDetailsStyle.headingView}>
          <Text style={PropertyDetailsStyle.heading}>{"Property details"}</Text>
        </View>

        <View style={PropertyDetailsStyle.card}>
          <View style={PropertyDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES._texinputLabel}>Location</Text>
            <View style={PropertyDetailsStyle.locationContainer}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Location");
                }}
              >
                <Octicons
                  name={"location"}
                  size={20}
                  color={_COLORS.Kodie_MediumGrayColor}
                  style={PropertyDetailsStyle.locationIcon}
                />
              </TouchableOpacity>

              <TextInput
                style={PropertyDetailsStyle.locationInput}
                value={location}
                onChangeText={setLocation}
                placeholder="Search location"
                placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              />
            </View>
            <Dropdown
              style={PropertyDetailsStyle.dropdown}
              placeholderStyle={PropertyDetailsStyle.placeholderStyle}
              selectedTextStyle={PropertyDetailsStyle.selectedTextStyle}
              inputSearchStyle={PropertyDetailsStyle.inputSearchStyle}
              iconStyle={PropertyDetailsStyle.iconStyle}
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
          <View style={PropertyDetailsStyle.inputContainer}>
            <Text style={PropertyDetailsStyle.property_Text}>
              Property type
              {selectedProperty ? selectedProperty.description : "None"}
            </Text>
            <CustomSingleDropdown
              btnview={true}
              placeholdertext={"Apartment"}
              data={propertyTypeData}
              onApply={handle_key_feature}
              onClear={handleClearSelection}
            />
          </View>
          <View style={PropertyDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES._texinputLabel}>
              Property description
            </Text>
            <TextInput
              style={PropertyDetailsStyle.input}
              value={propertyDesc}
              onChangeText={setPropertyDesc}
              placeholder="Describe your property here..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={"top"}
            />
          </View>
          <Text style={PropertyDetailsStyle.AutoList_text}>
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
          {/* <View style={PropertyDetailsStyle.btnView}>
            <CustomSingleButton
              _ButtonText={"Next"}
              Text_Color={_COLORS.Kodie_WhiteColor}
              // onPress={() => {
              //   props.navigation.navigate("PropertyFeature");
              // }}
              onPress={props?.PropertyDetailsButton}
              onPress={handlePropertyDetails}
            />
          </View>
          <View style={PropertyDetailsStyle.btnView}>
            <CustomSingleButton
              _ButtonText={"Fill these details out later"}
              Text_Color={_COLORS.Kodie_BlackColor}
              backgroundColor={_COLORS.Kodie_WhiteColor}
            />
          </View>
          <TouchableOpacity
            style={PropertyDetailsStyle.goBack_View}
            // onPress={() => {
            //   props.navigation.navigate("Properties");
            // }}
          >
            <View style={PropertyDetailsStyle.backIcon}>
              <Ionicons
                name="chevron-back"
                size={22}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </View>
            <Text style={PropertyDetailsStyle.goBack_Text}>{"Go back"}</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};
