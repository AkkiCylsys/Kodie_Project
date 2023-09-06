import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { CreateJobFirstStyle } from "./CreateJobFirstScreenCss";
import StepText from "../../components/Molecules/StepText/StepText";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
import {
  VIEW_STYLES,
  _COLORS,
  LABEL_STYLES,
  IMAGES,
  FONTFAMILY,
} from "../../Themes/index";
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
const jod_Priority = [
  {
    id: 1,
    name: "Urgent",
  },
  {
    id: 2,
    name: "Medium",
  },
  {
    id: 3,
    name: "High",
  },
  {
    id: 4,
    name: "Low",
  },
];
export default CreateJobFirstScreen = (props) => {
  const [value, setValue] = useState(null);
  const [jobDetails, setJobDetails] = useState("");
  const [location, setLocation] = useState("");
  const [isClick, setIsClick] = useState(null);
  const [Check, setCheck] = useState(1);

  const handleBoxPress = (boxNumber) => {
    setIsClick(boxNumber);
  };
  const priority_render = ({ item, index }) => {
    return (
      <View style={CreateJobFirstStyle.priority_container}>
        <View style={CreateJobFirstStyle.priority_view}>
          <TouchableOpacity
            onPress={() => {
              setCheck(item.id);
            }}
          >
            <View
              style={[
                CreateJobFirstStyle.checkbox_View,
                {
                  borderColor:
                    Check == item.id
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_ExtraLightGrayColor,
                },
              ]}
            >
              {Check == item.id ? (
                <View style={CreateJobFirstStyle.radioBg}></View>
              ) : null}
            </View>
          </TouchableOpacity>
          <Text style={CreateJobFirstStyle.priority_Text}>{item?.name}</Text>
        </View>
      </View>
    );
  };
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
            Services_Icon={isClick === 1 ? IMAGES.cleaner : IMAGES.lightCleaner}
            BoxStyling={[
              CreateJobFirstStyle.box_style,
              {
                backgroundColor:
                  isClick === 1
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor,
              },
            ]}
            textColor={[
              CreateJobFirstStyle.box_Text_Style,
              {
                color:
                  isClick === 1
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor,
              },
            ]}
            // onPress={() => setIsClick(!isClick)}
            onPress={() => handleBoxPress(1)}
          />

          <View style={CreateJobFirstStyle.spaceView} />
          <ServicesBox
            Services_Name={"Outdoor cleaning"}
            Services_Icon={isClick===2 ? IMAGES.outdoor : IMAGES.lightOutdorCleaner}
            BoxStyling={[
              CreateJobFirstStyle.box_style,
              {
                backgroundColor: isClick===2
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor,
              },
            ]}
            textColor={[
              CreateJobFirstStyle.box_Text_Style,
              {
                color: isClick===2
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor,
              },
            ]}
            onPress={() => handleBoxPress(2)}
          />
        </View>
        <View style={CreateJobFirstStyle.servicesBoxView}>
          <ServicesBox
            Services_Name={"Heavy lifting"}
            Services_Icon={
              isClick ===3? IMAGES.heavyLifting : IMAGES.lightHeavylifting
            }
            BoxStyling={[
              CreateJobFirstStyle.box_style,
              {
                backgroundColor: isClick===3
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor,
              },
            ]}
            textColor={[
              CreateJobFirstStyle.box_Text_Style,
              {
                color: isClick===3
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor,
              },
            ]}
            onPress={() => handleBoxPress(3)}
          />
          <View style={CreateJobFirstStyle.spaceView} />
          <ServicesBox
            Services_Name={"Fixing & maintenance"}
            Services_Icon={isClick===4 ? IMAGES.fixing : IMAGES.fixingTool}
            BoxStyling={[
              CreateJobFirstStyle.box_style,
              {
                backgroundColor: isClick===4
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor,
              },
            ]}
            textColor={[
              CreateJobFirstStyle.box_Text_Style,
              {
                color: isClick===4
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor,
              },
            ]}
            onPress={() => handleBoxPress(4)}
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
            <Text style={LABEL_STYLES.commontext}>{"Job priority"}</Text>
            <FlatList
              data={jod_Priority}
              scrollEnabled
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{}}
              keyExtractor={(item) => item?.id}
              renderItem={priority_render}
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
