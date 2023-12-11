//ScreenNo:143
//ScreenNo:139
//ScreenNo:121
import React, { useState, useEffect } from "react";
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
import StepIndicator from "react-native-step-indicator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Config } from "../../Config";
import axios from "axios";
const stepLabels = ["Step 1", "Step 2", "Step 3", "Step 4"];

const data = [
  { label: "Electricals", value: "1" },
  { label: "Home cleaning", value: "2" },
  { label: "Outdoor cleaning", value: "3" },
  { label: "Heavy lifting", value: "4" },
  { label: "Fixing & maintenance", value: "5" },
];
export default CreateJobFirstScreen = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [value, setValue] = useState(null);
  const [jobDetails, setJobDetails] = useState("");
  const [location, setLocation] = useState("");
  const [isClick, setIsClick] = useState(null);
  const [Check, setCheck] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [property_Data, setProperty_Data] = useState([]);
  const [property_value, setProperty_value] = useState([]);
  const [jobPriorityData, setJobPriorityData] = useState([]);
  const [jobPriorityValue, setJobPriorityValue] = useState([]);
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

  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: "feed",
      // name: stepStatus === "finished" ? "check" : (position + 1).toString(),
      color: stepStatus === "finished" ? "#ffffff" : "#fe7013",
      size: 20,
    };

    switch (position) {
      case 0: {
        iconConfig.name = stepStatus === "finished" ? "check" : null;
        break;
      }
      case 1: {
        iconConfig.name = stepStatus === "finished" ? "check" : null;
        break;
      }
      case 2: {
        iconConfig.name = stepStatus === "finished" ? "check" : null;
        break;
      }
      case 3: {
        iconConfig.name = stepStatus === "finished" ? "check" : null;
        break;
      }

      default: {
        break;
      }
    }
    return iconConfig;
  };
  const firstIndicatorSignUpStepStyle = {
    stepIndicatorSize: 40,
    currentStepIndicatorSize: 20,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    separatorFinishedColor: _COLORS.Kodie_GrayColor,
    separatorUnFinishedColor: _COLORS.Kodie_LightOrange,
    stepIndicatorFinishedColor: _COLORS.Kodie_GreenColor,
    stepIndicatorUnFinishedColor: _COLORS.Kodie_GrayColor,
    stepIndicatorCurrentColor: _COLORS.Kodie_WhiteColor,
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: _COLORS.Kodie_BlackColor,
    stepIndicatorLabelFinishedColor: _COLORS.Kodie_BlackColor,
    stepIndicatorLabelUnFinishedColor: "rgba(255,255,255,0.5)",
    labelColor: _COLORS.Kodie_BlackColor,
    labelSize: 14,
    labelAlign: "center",
  };
  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  const renderLabel = ({ position, stepStatus }) => {
    // const iconColor = stepStatus === "finished" ? "#000000" : "#808080";
    const iconColor =
      position === currentPage // Check if it's the current step
        ? _COLORS.Kodie_BlackColor // Set the color for the current step
        : stepStatus === "finished"
        ? "#000000"
        : "#808080";
    const iconName =
      position === 0
        ? "Details"
        : position === 1
        ? "Terms"
        : position === 2
        ? "Images"
        : position === 3
        ? "Review"
        : "null";

    return (
      <View style={{}}>
        <Text
          style={{
            fontSize: 14,
            marginTop: 1,
            marginHorizontal: 10,
            color: iconColor,
            alignSelf: "center",
          }}
        >{`Step ${position + 1}`}</Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 5,
            marginHorizontal: 10,
            color: iconColor,
          }}
        >
          {iconName}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    handleProperty_Type();
    handleJob_priority();
  }, []);
  // api intrigation.......
  const handleProperty_Type = () => {
    const propertyData = {
      P_PARENT_CODE: "PROP_TYPE",
      P_TYPE: "OPTION",
    };
    const url = Config.BASE_URL;
    const propertyType = url + "lookup_details";
    console.log("Request URL:", propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then((response) => {
        console.log("property_type", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("propertyData....", response.data.lookup_details);
          setProperty_Data(response.data.lookup_details);
        } else {
          console.error("property_type_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("property_type error:", error);
        alert(error);
        setIsLoading(false);
      });
  };
  const handleJob_priority = () => {
    const propertyData = {
      P_PARENT_CODE: "JOB_PRIORITY",
      P_TYPE: "OPTION",
    };
    const url = Config.BASE_URL;
    const propertyType = url + "lookup_details";
    console.log("Request URL:", propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then((response) => {
        console.log("property_type", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("propertyData....", response.data.lookup_details);
          setJobPriorityData(response.data.lookup_details);
        } else {
          console.error("property_type_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("property_type error:", error);
        alert(error);
        setIsLoading(false);
      });
  };
  return (
    <View style={CreateJobFirstStyle.container}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Create new job request"}
      />
      <StepIndicator
        customSignUpStepStyle={firstIndicatorSignUpStepStyle}
        currentPosition={0}
        // onPress={onStepPress}
        renderStepIndicator={renderStepIndicator}
        labels={stepLabels}
        stepCount={4}
        renderLabel={renderLabel}
      />
      <ScrollView>
        <View style={CreateJobFirstStyle.mainView}>
          <Text style={CreateJobFirstStyle.heading}>{"Job details"}</Text>
          <Text style={CreateJobFirstStyle.servicestext}>
            {"Select the type of job you need:"}
          </Text>
        </View>
        <View style={CreateJobFirstStyle.servicesBoxView}>
          <ServicesBox
            images
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
            images
            Services_Name={"Outdoor cleaning"}
            Services_Icon={
              isClick === 2 ? IMAGES.outdoor : IMAGES.lightOutdorCleaner
            }
            BoxStyling={[
              CreateJobFirstStyle.box_style,
              {
                backgroundColor:
                  isClick === 2
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor,
              },
            ]}
            textColor={[
              CreateJobFirstStyle.box_Text_Style,
              {
                color:
                  isClick === 2
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor,
              },
            ]}
            onPress={() => handleBoxPress(2)}
          />
        </View>
        <View style={CreateJobFirstStyle.servicesBoxView}>
          <ServicesBox
            images
            Services_Name={"Heavy lifting"}
            Services_Icon={
              isClick === 3 ? IMAGES.heavyLifting : IMAGES.lightHeavylifting
            }
            BoxStyling={[
              CreateJobFirstStyle.box_style,
              {
                backgroundColor:
                  isClick === 3
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor,
              },
            ]}
            textColor={[
              CreateJobFirstStyle.box_Text_Style,
              {
                color:
                  isClick === 3
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_MediumGrayColor,
              },
            ]}
            onPress={() => handleBoxPress(3)}
          />
          <View style={CreateJobFirstStyle.spaceView} />
          <ServicesBox
            images
            Services_Name={"Fixing & maintenance"}
            Services_Icon={isClick === 4 ? IMAGES.fixing : IMAGES.fixingTool}
            BoxStyling={[
              CreateJobFirstStyle.box_style,
              {
                backgroundColor:
                  isClick === 4
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor,
              },
            ]}
            textColor={[
              CreateJobFirstStyle.box_Text_Style,
              {
                color:
                  isClick === 4
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
              {"What service are you looking for?"}
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
            <Text style={LABEL_STYLES.commontext}>
              {"Tell us more about your needs:"}
            </Text>
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
          <View style={{ marginTop: 12 }}>
            <Text style={LABEL_STYLES.commontext}>{"Job priority:"}</Text>
            <Dropdown
              style={CreateJobFirstStyle.dropdown}
              placeholderStyle={CreateJobFirstStyle.placeholderStyle}
              selectedTextStyle={CreateJobFirstStyle.selectedTextStyle}
              inputSearchStyle={CreateJobFirstStyle.inputSearchStyle}
              iconStyle={CreateJobFirstStyle.iconStyle}
              data={jobPriorityData}
              search
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="Urgent"
              searchPlaceholder="Search..."
              value={jobPriorityValue}
              onChange={(item) => {
                setJobPriorityValue(item.lookup_key);
              }}
            />
          </View>
          <View style={{ marginTop: 12 }}>
            <Text style={LABEL_STYLES.commontext}>{"Property type"}</Text>
            <Dropdown
              style={CreateJobFirstStyle.dropdown}
              placeholderStyle={CreateJobFirstStyle.placeholderStyle}
              selectedTextStyle={CreateJobFirstStyle.selectedTextStyle}
              inputSearchStyle={CreateJobFirstStyle.inputSearchStyle}
              iconStyle={CreateJobFirstStyle.iconStyle}
              data={property_Data}
              search
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="Select property"
              searchPlaceholder="Search..."
              value={property_value}
              onChange={(item) => {
                setProperty_value(item.lookup_key);
              }}
            />
          </View>
          <View style={{ marginTop: 12 }}>
            <Text style={LABEL_STYLES.commontext}>
              {"Where is the job taking place?"}
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
          {/* <View style={CreateJobFirstStyle.jobDetailsView}>
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
          </View> */}
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
          <CustomSingleButton
            disabled={isLoading ? true : false}
            onPress={() => props.navigation.navigate("CreateJobTermsScreen")}
            _ButtonText={"Next"}
            Text_Color={_COLORS.Kodie_WhiteColor}
          />
          <TouchableOpacity style={CreateJobFirstStyle.goBack_View}>
            <View style={CreateJobFirstStyle.backIcon}>
              <Ionicons
                name="chevron-back"
                size={22}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </View>
            <Text style={CreateJobFirstStyle.goBack_Text}>{"Go back"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
