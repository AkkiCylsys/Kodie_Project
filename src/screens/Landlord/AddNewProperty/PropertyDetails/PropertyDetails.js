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
  // add api state to here
  const [isLoading, setIsLoading] = useState(false);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  const [property_value, setProperty_value] = useState("");
  // handle property details api start to here
  const handlePropertyDetails = async () => {
    property_details();
    // handleProperty_Type_Data()
  };

  const property_details = () => {
    const url = Config.API_URL;
    const additionalApi = url + "add_property_details";
    console.log("Request URL:", additionalApi);
    setIsLoading(true);
    axios
      .post(additionalApi, {
        user: 35,
        user_account_details_id: 82,
        islocation: 1,
        location: location,
        property_type:propertyTypeData,
        property_description: propertyDesc,
        autolist: 1,
      })
      .then((response) => {
        console.log("property_details", response);
        if (response.data.status === true) {
          setIsLoading(false);
          props.navigation.navigate("PropertyFeature");
          console.log("property_details....", response.data);
          console.log(location, propertyDesc, propertyTypeData, selectedOption);
        } else {
          console.error("property_details_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("property_details error:", error);
        alert(error);
        setIsLoading(false);
      });
  };

  // property Type API with LookupKey...
  const handleProperty_Type_Data = () => {
    const propertyData = {
      P_PARENT_CODE: "PROP_TYPE",
      P_TYPE: "OPTION",
    };
    const url = Config.API_URL;
    const propertyType = url + "lookup_details";
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then((response) => {
        console.log("handleProperty_Type_Data", response.data.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("handleProperty_Type_Data....", response.data.data);
          setPropertyTypeData(
            response.data.data.map((item) => item.description)
          );
          setProperty_value(response.data.data.map((item) => item.lookup_key));
          console.log(response.data.data.map((item) => item.lookup_key));
        } else {
          console.error("handleProperty_Type_Data_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("handleProperty_Type_Data error:", error);
        alert(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
   
    property_details();
    handleProperty_Type_Data();

  }, []);

  return (
    <View style={PropertyDetailsStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Add new property"}
      />
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
            </Text>
            {/* <CustomSingleDropdown
              btnview={true}
              placeholdertext={"Apartment"}
              data={propertyTypeData}
              value={property_value}
              labelField="description"
              valueField="lookup_key"
              onChange={(item) => {
                // setProperty_value(item.lookup_key);
                alert(item);
               
              }}
            /> */}
              <Dropdown
              style={PropertyDetailsStyle.dropdown}
              placeholderStyle={PropertyDetailsStyle.placeholderStyle}
              selectedTextStyle={PropertyDetailsStyle.selectedTextStyle}
              inputSearchStyle={PropertyDetailsStyle.inputSearchStyle}
              iconStyle={PropertyDetailsStyle.iconStyle}
              data={propertyTypeData}
              maxHeight={300}
              labelField="description"
              valueField="lookup_key"
              placeholder="Apartment"
              value={property_value}
              onChange={(item) => {
                setProperty_value(item.lookup_key);
                alert(item)
              }}
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
          <View style={PropertyDetailsStyle.btnView}>
            <CustomSingleButton
              _ButtonText={"Next"}
              Text_Color={_COLORS.Kodie_WhiteColor}
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
            onPress={() => {
              props.navigation.navigate("Properties");
            }}
          >
            <View style={PropertyDetailsStyle.backIcon}>
              <Ionicons
                name="chevron-back"
                size={22}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </View>
            <Text style={PropertyDetailsStyle.goBack_Text}>{"Go back"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
