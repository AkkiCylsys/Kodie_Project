//ScreenNo:11
//ScreenNo:12
//ScreenNo:13
//ScreenNo:14
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import Account from "../Account/Account";
import ProgressBar from "react-native-progress/Bar";
import AboutYou from "../AboutYou/AboutYou";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import FirstProperty from "../FirstProperty/FirstProperty";
import { SignUpStepStyle } from "./SignUpStepsStyle";
import { AccountStyle } from "../Account/AccountStyle";
import { LABEL_STYLES, _COLORS, IMAGES } from "../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
// about you...
import { AboutYouStyle } from "../AboutYou/AboutYouStyle";
import ServicesBox from "../../../../components/Molecules/ServicesBox/ServicesBox";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RBSheet from "react-native-raw-bottom-sheet";
import UploadImageData from "../../../../components/Molecules/UploadImage/UploadImage";
// First property...
import { FirstPropertyStyle } from "../FirstProperty/FirstPropertyStyle";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import { MultiSelect } from "react-native-element-dropdown";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
const List = [
  {
    id: "1",
    list: "I have properties I would like to manage",
  },
  {
    id: "2",
    list: "I am looking for a property to rente",
  },
  {
    id: "3",
    list: "I would like to find contractors easily",
  },
  {
    id: "4",
    list: "I would like to offer my contracting services",
  },
  {
    id: "5",
    list: "I need a way to manage my rental documents",
  },
  {
    id: "6",
    list: "I would like to advertise my properties",
  },
  {
    id: "7",
    list: "I want to set notifications to remind me of key dates",
  },
];
const labels = ["Step 1", "Step 2", "Step 3"];

const firstIndicatorSignUpStepStyle = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: _COLORS.Kodie_GrayColor,
  separatorUnFinishedColor: _COLORS.Kodie_GrayColor,
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

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: "feed",
    color: stepStatus === "finished" ? "#ffffff" : "#fe7013",
    size: 25,
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

    default: {
      break;
    }
  }
  return iconConfig;
};
const SignUpSteps = (props) => {
  const [currentPage, setCurrentPage] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [referral, setRefferral] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");

  // about you
  const [isClick, setIsClick] = useState(false);
  const refRBSheet = useRef();
  const initialSelectedServices = {
    Tenant: false,
    Landlord: false,
    Contractor: false,
    "Property Manager": false,
  };

  const [selectedServices, setSelectedServices] = useState(
    initialSelectedServices
  );

  const toggleService = (serviceName) => {
    setSelectedServices((prevSelectedServices) => ({
      ...prevSelectedServices,
      [serviceName]: !prevSelectedServices[serviceName],
    }));
  };
  const handleBoxPress = (boxNumber) => {
    setIsClick(boxNumber);
  };
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const toggleCheckbox = (itemId) => {
    const isSelected = selectedCheckboxes.includes(itemId);
    if (isSelected) {
      setSelectedCheckboxes(selectedCheckboxes.filter((id) => id !== itemId));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, itemId]);
    }
  };
  const wantList = ({ item, index }) => {
    const isSelected = selectedCheckboxes.includes(item.id);
    return (
      <View>
        <View style={AboutYouStyle.want_List_View}>
          <TouchableOpacity
            onPress={() => {
              // setCheck(item.id);
              toggleCheckbox(item.id);
            }}
          >
            <View
              style={[
                AboutYouStyle.checkbox_View,
                {
                  borderColor: isSelected
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_ExtraLightGrayColor,
                },
              ]}
            >
              {isSelected ? (
                <FontAwesome
                  name="check"
                  size={15}
                  color={_COLORS.Kodie_GreenColor}
                  style={AboutYouStyle.Check_Icon}
                />
              ) : null}
            </View>
          </TouchableOpacity>
          <Text style={AboutYouStyle.want_List_text}>{item.list}</Text>
        </View>
      </View>
    );
  };
  // First Property..
  const [propertyLocation, setPropertyLocation] = useState("");
  const [propertyDesc, setPropertyDesc] = useState("");
  const [selected, setSelected] = useState([]);
  const [value, setValue] = useState(null);

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

  // Account page

  const data = [
    { label: "Bharat", value: "1" },
    { label: "Australia", value: "2" },
    { label: "America", value: "3" },
  ];
  // Validation for First Name
  const validateFirstName = (text) => {
    if (text === "") {
      setFirstNameError("First name is required");
    } else if (!/^[A-Za-z]+$/.test(text)) {
      setFirstNameError("First name should contain only alphabetic characters");
    } else {
      setFirstNameError("");
    }
    setFirstName(text);
  };

  // Validation for Last Name
  const validateLastName = (text) => {
    if (text === "") {
      setLastNameError("Last name is required");
    } else if (!/^[A-Za-z]+$/.test(text)) {
      setLastNameError("Last name should contain only alphabetic characters");
    } else {
      setLastNameError("");
    }
    setLastName(text);
  };
  // Validation for Phone Number
  const validateMobileNumber = (text) => {
    const mobileReg = /^[6-9]\d{9}$/;
    if (text === "") {
      setMobileNumberError("Phone number is required");
    } else if (!mobileReg.test(text)) {
      setMobileNumberError("Invalid phone number format");
    } else {
      setMobileNumberError("");
    }
    setMobileNumber(text);
  };
  const handleNextBtn = () => {
    if (firstName.trim() === "") {
      setFirstNameError("First name is required.");
    } else if (lastName.trim() === "") {
      setLastNameError("Last name is required.");
    } else if (mobileNumber.trim() === "") {
      setMobileNumberError("Phone number is required.");
    } else {
      if (currentPage === 0) {
        // props.navigation.navigate("AboutYou");
        setCurrentPage(currentPage + 1);
        // console.log(firstName, lastName, mobileNumber, "account Data 1");
      } else if (currentPage === 1) {
        setCurrentPage(currentPage + 1);
        // console.log(firstName, lastName, mobileNumber, "account Data 2");
      } else if (currentPage === 2) {
        props.navigation.navigate("DrawerNavigatorLeftMenu");
        // console.log(firstName, lastName, mobileNumber, "account Data 3");
      }
    }
  };

  const onStepPress = (position) => {
    setCurrentPage(position);
  };
  const renderLabel = ({ position, stepStatus }) => {
    const iconColor = stepStatus === "finished" ? "#000000" : "#808080";
    const iconName =
      position === 0
        ? "Account"
        : position === 1
        ? "About you"
        : position === 2
        ? "First Property"
        : "circle";

    return (
      <View style={SignUpStepStyle.labelContainer}>
        <Text
          style={{
            fontSize: 14,
            marginTop: 1,
            marginHorizontal: 10,
            color: iconColor,
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

  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        // return <Account />;
        return (
          <ScrollView>
            <View style={AccountStyle.headingView}>
              <Text style={AccountStyle.heading}>
                {"Introduce yourself to Kodie"}
              </Text>
            </View>
            <View style={AccountStyle.card}>
              <View style={AccountStyle.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>First name*</Text>
                <TextInput
                  style={AccountStyle.input}
                  value={firstName}
                  onChangeText={validateFirstName}
                  placeholder="Enter your first name"
                  placeholderTextColor="#999"
                />
                <Text style={AccountStyle.errorText}>{firstNameError}</Text>
              </View>
              <View style={AccountStyle.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>Last name*</Text>
                <TextInput
                  style={AccountStyle.input}
                  value={lastName}
                  onChangeText={validateLastName}
                  placeholder="Enter your last name"
                  placeholderTextColor="#999"
                />
                <Text style={AccountStyle.errorText}>{lastNameError}</Text>
              </View>
              <View style={AccountStyle.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>
                  Phone number* (mobile preferred)
                </Text>
                <TextInput
                  style={AccountStyle.input}
                  value={mobileNumber}
                  onChangeText={validateMobileNumber}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  maxLength={10}
                />
                <Text style={AccountStyle.errorText}>{mobileNumberError}</Text>
              </View>
              <View style={AccountStyle.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>
                  Current physical address
                </Text>
                <View style={AccountStyle.locationContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("Location");
                    }}
                  >
                    <Entypo
                      name={"location-pin"}
                      size={24}
                      color={_COLORS.Kodie_MediumGrayColor}
                      style={AccountStyle.locationIcon}
                    />
                  </TouchableOpacity>
                  <TextInput
                    style={AccountStyle.locationInput}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Enter new location"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  />
                </View>
              </View>
              <View style={AccountStyle.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>
                  Organisation name
                </Text>
                <TextInput
                  style={AccountStyle.input}
                  value={organisation}
                  onChangeText={setOrganisation}
                  placeholder="Enter the name of your company"
                  placeholderTextColor="#999"
                />
              </View>
              <Text style={AccountStyle.org_desc}>
                {
                  "Your organisation name will be used in emails and SMS correspondence from Kodie."
                }
              </Text>
              <View style={AccountStyle.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>Referral code</Text>
                <TextInput
                  style={AccountStyle.input}
                  value={referral}
                  onChangeText={setRefferral}
                  placeholder="If you have a referral code, enter it here"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
          </ScrollView>
        );
      case 1:
        // return <AboutYou />;
        return (
          <ScrollView>
            <View style={AboutYouStyle.Container}>
              <Text style={AboutYouStyle.heading_Text}>
                {"Tell us more about you"}
              </Text>
              <Text style={AboutYouStyle.profile_Text}>{"Profile photo"}</Text>
              <TouchableOpacity
                style={AboutYouStyle.logoContainer}
                onPress={() => {
                  refRBSheet.current.open();
                }}
              >
                <Image source={IMAGES.userIcons} style={AboutYouStyle.logo} />
              </TouchableOpacity>
              <Text style={AboutYouStyle.want_Heading}>
                {
                  "How would you describe yourself? (you can select multiple options)"
                }
              </Text>
              <View style={AboutYouStyle.servicesBoxView}>
                <ServicesBox
                  Services_Name={"Tenant"}
                  BoxStyling={[
                    AboutYouStyle.box_style,
                    {
                      backgroundColor: selectedServices["Tenant"]
                        ? _COLORS.Kodie_lightGreenColor
                        : _COLORS.Kodie_WhiteColor,
                    },
                  ]}
                  textColor={[AboutYouStyle.box_Text_Style]}
                  onPress={() => toggleService("Tenant")}
                />

                <View style={AboutYouStyle.spaceView} />
                <ServicesBox
                  Services_Name={"Landlord"}
                  BoxStyling={[
                    AboutYouStyle.box_style,
                    {
                      backgroundColor: selectedServices["Landlord"]
                        ? _COLORS.Kodie_lightGreenColor
                        : _COLORS.Kodie_WhiteColor,
                    },
                  ]}
                  textColor={[AboutYouStyle.box_Text_Style]}
                  onPress={() => toggleService("Landlord")}
                />
              </View>

              <View style={AboutYouStyle.servicesBoxView}>
                <ServicesBox
                  Services_Name={"Contractor"}
                  BoxStyling={[
                    AboutYouStyle.box_style,
                    {
                      backgroundColor: selectedServices["Contractor"]
                        ? _COLORS.Kodie_lightGreenColor
                        : _COLORS.Kodie_WhiteColor,
                    },
                  ]}
                  textColor={[AboutYouStyle.box_Text_Style]}
                  onPress={() => toggleService("Contractor")}
                />

                <View style={AboutYouStyle.spaceView} />
                <ServicesBox
                  Services_Name={"Property Manager"}
                  BoxStyling={[
                    AboutYouStyle.box_style,
                    {
                      backgroundColor: selectedServices["Property Manager"]
                        ? _COLORS.Kodie_lightGreenColor
                        : _COLORS.Kodie_WhiteColor,
                    },
                  ]}
                  textColor={[AboutYouStyle.box_Text_Style]}
                  onPress={() => toggleService("Property Manager")}
                />
              </View>
              <Text style={AboutYouStyle.want_Heading}>
                {" How many properties do you own, manage or rent?"}
              </Text>
              <View style={AboutYouStyle.servicesBoxView}>
                <ServicesBox
                  Services_Name={"1 - 3 properties"}
                  BoxStyling={[
                    AboutYouStyle.box_style,
                    {
                      backgroundColor:
                        isClick === 1
                          ? _COLORS.Kodie_lightGreenColor
                          : _COLORS.Kodie_WhiteColor,
                    },
                  ]}
                  textColor={[AboutYouStyle.box_Text_Style]}
                  onPress={() => handleBoxPress(1)}
                />

                <View style={AboutYouStyle.spaceView} />
                <ServicesBox
                  Services_Name={"4 - 10 properties"}
                  BoxStyling={[
                    AboutYouStyle.box_style,
                    {
                      backgroundColor:
                        isClick === 2
                          ? _COLORS.Kodie_lightGreenColor
                          : _COLORS.Kodie_WhiteColor,
                    },
                  ]}
                  textColor={[AboutYouStyle.box_Text_Style]}
                  onPress={() => handleBoxPress(2)}
                />
              </View>

              <View style={AboutYouStyle.servicesBoxView}>
                <ServicesBox
                  Services_Name={"10 - 20 properties"}
                  BoxStyling={[
                    AboutYouStyle.box_style,
                    {
                      backgroundColor:
                        isClick === 3
                          ? _COLORS.Kodie_lightGreenColor
                          : _COLORS.Kodie_WhiteColor,
                    },
                  ]}
                  textColor={[AboutYouStyle.box_Text_Style]}
                  onPress={() => handleBoxPress(3)}
                />

                <View style={AboutYouStyle.spaceView} />
                <ServicesBox
                  Services_Name={"> 20 properties"}
                  BoxStyling={[
                    AboutYouStyle.box_style,
                    {
                      backgroundColor:
                        isClick === 4
                          ? _COLORS.Kodie_lightGreenColor
                          : _COLORS.Kodie_WhiteColor,
                    },
                  ]}
                  textColor={[AboutYouStyle.box_Text_Style]}
                  onPress={() => handleBoxPress(4)}
                />
              </View>
              <Text style={AboutYouStyle.want_Heading}>
                {"What do you want to do first with Kodie"}
              </Text>

              <FlatList
                data={List}
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{}}
                keyExtractor={(item) => item?.id}
                renderItem={wantList}
              />

              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={200}
                customStyles={{
                  wrapper: {
                    backgroundColor: "transparent",
                  },
                  draggableIcon: {
                    backgroundColor: _COLORS.Kodie_LightGrayColor,
                  },
                  container: AboutYouStyle.bottomModal_container,
                }}
              >
                <UploadImageData heading_Text={"Upload image"} />
              </RBSheet>
            </View>
          </ScrollView>
        );
      case 2:
        // return <FirstProperty />;
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
                    value={propertyLocation}
                    onChangeText={setPropertyLocation}
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
                <Text style={LABEL_STYLES._texinputLabel}>
                  Property description
                </Text>
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
                      <TouchableOpacity
                        onPress={() => unSelect && unSelect(item)}
                      >
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
      default:
        return null;
    }
  };

  return (
    <>
      <TopHeader
        MiddleText={"Set up your Kodie account"}
        onPressLeftButton={() => _goBack(props)}
      />
      <ProgressBar
        progress={0.4}
        width={800}
        height={5}
        color={_COLORS.Kodie_lightGreenColor}
        style={SignUpStepStyle.progresBar}
      />
      <View style={SignUpStepStyle.container}>
        <View style={SignUpStepStyle.stepIndicator}>
          <StepIndicator
            customSignUpStepStyle={firstIndicatorSignUpStepStyle}
            currentPosition={currentPage}
            onPress={onStepPress}
            renderStepIndicator={renderStepIndicator}
            labels={labels}
            stepCount={3}
            renderLabel={renderLabel}
          />
        </View>
        <ScrollView
          contentContainerStyle={{ marginBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={SignUpStepStyle.stepIndicator}>
            {renderPageContent()}
          </View>

          <View
            style={{
              marginHorizontal: 16,
              backgroundColor: _COLORS.Kodie_WhiteColor,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                justifyContent: "flex-end",
                marginBottom: 30,
              }}
            >
              <CustomSingleButton
                _ButtonText={"Next"}
                Text_Color={_COLORS.Kodie_WhiteColor}
                onPress={() => {
                  // if (currentPage === 2) {
                  //   props.navigation.navigate("DrawerNavigatorLeftMenu");
                  // } else {
                  //   setCurrentPage(currentPage + 1);
                  // }
                  handleNextBtn();
                }}
              />

              {currentPage === 1 || currentPage === 2 ? (
                <>
                  <CustomSingleButton
                    _ButtonText={"Fill these details out later"}
                    Text_Color={_COLORS.Kodie_BlackColor}
                    backgroundColor={_COLORS.Kodie_WhiteColor}
                  />

                  <TouchableOpacity style={SignUpStepStyle.goBack_View}>
                    <View style={SignUpStepStyle.backIcon}>
                      <Ionicons
                        name="chevron-back"
                        size={22}
                        color={_COLORS.Kodie_MediumGrayColor}
                      />
                    </View>
                    <Text style={SignUpStepStyle.goBack_Text}>{"Go back"}</Text>
                  </TouchableOpacity>
                </>
              ) : null}
              {currentPage === 0 ? (
                <TouchableOpacity style={SignUpStepStyle.goBack_View}>
                  <View style={SignUpStepStyle.backIcon}>
                    <Ionicons
                      name="chevron-back"
                      size={22}
                      color={_COLORS.Kodie_MediumGrayColor}
                    />
                  </View>
                  <Text style={SignUpStepStyle.goBack_Text}>{"Go back"}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SignUpSteps;
