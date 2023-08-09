import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { CreateJobFirstStyle } from "./CreateJobFirstScreenCss";
import StepText from "../../components/Molecules/StepText/StepText";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
import { VIEW_STYLES, _COLORS, LABEL_STYLES, IMAGES } from "../../Themes/index";
import TopHeader from "../../components/Molecules/Header/Header";
import RangeSlider from "../../components/Molecules/RangeSlider/RangeSlider";
import { _goBack } from "../../services/CommonServices";
import { Dropdown } from "react-native-element-dropdown";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import ServicesBox from "../../components/Molecules/ServicesBox/ServicesBox";
import RowButtons from "../../components/Molecules/RowButtons/RowButtons";
const data = [
  { label: "Electricals", value: "1" },
  { label: "Home cleaning", value: "2" },
  { label: "Outdoor cleaning", value: "3" },
  { label: "Heavy lifting", value: "4" },
  { label: "Fixing & maintenance", value: "5" },
];
export default CreateJobFirstScreen = (props) => {
  const [value, setValue] = useState(null);
  const [jobDetails, setJobDetails] = useState("");
  const [location, setLocation] = useState("");
  return (
    <View style={CreateJobFirstStyle.container}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Create job"}
      />
      <StepText _StepNo={"1"} _StepText={"Job details"} />
      <ScrollView>
        <View style={CreateJobFirstStyle.mainView}>
          <Text style={CreateJobFirstStyle.servicestext}>
            {"What service are you looking for?"}
          </Text>
        </View>
        <View style={CreateJobFirstStyle.servicesBoxView}>
          <ServicesBox
            Services_Name={"Home cleaning"}
            Services_Icon={IMAGES.cleaner}
            BoxStyling={{ backgroundColor: _COLORS.Kodie_lightGreenColor }}
          />

          <View style={CreateJobFirstStyle.spaceView} />
          <ServicesBox
            Services_Name={"Outdoor cleaning"}
            Services_Icon={IMAGES.outdoor}
            BoxStyling={{ backgroundColor: _COLORS.Kodie_lightGreenColor }}
          />
        </View>
        <View style={CreateJobFirstStyle.servicesBoxView}>
          <ServicesBox
            Services_Name={"Heavy lifting"}
            Services_Icon={IMAGES.heavyLifting}
            BoxStyling={{ backgroundColor: _COLORS.Kodie_lightGreenColor }}
          />
          <View style={CreateJobFirstStyle.spaceView} />
          <ServicesBox
            Services_Name={"Fixing & maintenance"}
            Services_Icon={IMAGES.fixingTool}
            BoxStyling={CreateJobFirstStyle.box_style}
            textColor={CreateJobFirstStyle.box_Text_Style}
          />
        </View>
        <View style={CreateJobFirstStyle.formContainer}>
          <View>
            <Text style={LABEL_STYLES.commontext}>
              {"Search for your trusted professional"}
            </Text>
            <Dropdown
              style={CreateJobFirstStyle.dropdown}
              placeholderStyle={CreateJobFirstStyle.placeholderStyle}
              selectedTextStyle={CreateJobFirstStyle.selectedTextStyle}
              inputSearchStyle={CreateJobFirstStyle.inputSearchStyle}
              iconStyle={CreateJobFirstStyle.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Electricals"
              searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </View>
          <View style={CreateJobFirstStyle.jobDetailsView}>
            <Text style={LABEL_STYLES.commontext}>{"Job details"}</Text>
            <TextInput
              style={[CreateJobFirstStyle.input, CreateJobFirstStyle.jobD_]}
              value={jobDetails}
              onChangeText={setJobDetails}
              placeholder="Describe the job you need help with..."
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              multiline
              numberOfLines={5}
              textAlignVertical={"top"}
            />
          </View>
          <View style={CreateJobFirstStyle.jobDetailsView}>
            <Text style={LABEL_STYLES.commontext}>{"Location"}</Text>
            <Dropdown
              style={CreateJobFirstStyle.dropdown}
              placeholderStyle={CreateJobFirstStyle.placeholderStyle}
              selectedTextStyle={CreateJobFirstStyle.selectedTextStyle}
              inputSearchStyle={CreateJobFirstStyle.inputSearchStyle}
              iconStyle={CreateJobFirstStyle.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="123 Street, Brisbane, Australia"
              searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
              renderLeftIcon={() => (
                <Text style={CreateJobFirstStyle.HomeText}>{"Home :"}</Text>
              )}
            />
          </View>
          <View style={CreateJobFirstStyle.locationContainer}>
            <Octicons
              name={"location"}
              size={20}
              color={_COLORS.Kodie_MediumGrayColor}
              style={CreateJobFirstStyle.locationIcon}
            />
            <TextInput
              style={CreateJobFirstStyle.locationInput}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter new location"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            />
          </View>
          <View style={CreateJobFirstStyle.jobDetailsView}>
            <Text style={LABEL_STYLES.commontext}>{"Rating threshold"}</Text>
            <Dropdown
              style={CreateJobFirstStyle.dropdown}
              placeholderStyle={CreateJobFirstStyle.placeholderStyle}
              selectedTextStyle={CreateJobFirstStyle.selectedTextStyle}
              inputSearchStyle={CreateJobFirstStyle.inputSearchStyle}
              iconStyle={CreateJobFirstStyle.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="1 star and above"
              searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={CreateJobFirstStyle.starIcon}
                  color={_COLORS.Kodie_lightGreenColor}
                  name="star"
                  size={20}
                />
              )}
            />
          </View>
          <View style={CreateJobFirstStyle.budgetView}>
            <Text style={CreateJobFirstStyle.budgetText}>{"Budget"}</Text>
            <RangeSlider from={1} to={2000} />
          </View>
          <RowButtons LeftButtonText={'Yes ($1.50)'} />
        </View>
        
      </ScrollView>
      <View style={VIEW_STYLES._bottomButtonView}>
        <CustomSingleButton
          onPress={() => props.navigation.navigate("CreateJobSecondScreen")}
          _ButtonText={"Next"}
          Text_Color={_COLORS.Kodie_WhiteColor}
        />
      </View>
    </View>
  );
};
