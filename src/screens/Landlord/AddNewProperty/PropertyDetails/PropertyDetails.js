import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Permission,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { PropertyDetailsStyle } from "./PropertyDetailsStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import { Dropdown } from "react-native-element-dropdown";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IMAGES, LABEL_STYLES } from "../../../../Themes";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import CustomDropdown from "../../../../components/Molecules/CustomDropdown/CustomDropdown";
import { Config } from "../../../../Config";
import axios from "axios";
import Geocoder from "react-native-geocoding";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";
import CustomSingleDropdown from "../../../../components/Molecules/CustomSingleDropdown/CustomSingleDropdown";
import StepIndicator from "react-native-step-indicator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SearchPlaces from "../../../../components/Molecules/SearchPlaces/SearchPlaces";
import MapScreen from "../../../../components/Molecules/GoogleMap/googleMap";
import { SignUpStepStyle } from "../../../Authentication/SignUpScreen/SignUpSteps/SignUpStepsStyle";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
const stepLabels = ["Step 1", "Step 2", "Step 3", "Step 4"];
export default PropertyDetails = (props) => {
  const propertyid = props?.route?.params?.propertyid;
  const editMode = props?.route?.params?.editMode;
  console.log("propertyid....", propertyid);
  console.log("EditProperty....", editMode);
  const [currentPage, setCurrentPage] = useState(0);
  const [location, setLocation] = useState("");
  const [propertyDesc, setPropertyDesc] = useState("");
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [UserCurrentCity, setUserCurrentCity] = useState("");
  const [UserZip_Code, setUserZip_Code] = useState("");
  const [property_value, setProperty_value] = useState(0);
  const [selectedButton, setSelectedButton] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  const [property_Data, setProperty_Data] = useState([]);
  const [property_Detail, setProperty_Details] = useState([]);
  const [updateProperty_Details, setupdateProperty_Details] = useState([]);
  const [property_Data_id, setProperty_Data_id] = useState({});
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  // const [locationError, setlocationError] = useState("");
  // const [propertytypeError, setpropertytypeError] = useState("");
  // const validateFields = () => {
  //   if (!location) {
  //     // alert('Please enter a location.');
  //     setlocationError("Please enter a location.");
  //   } else if (!property_value) {
  //     setpropertytypeError("Please select a property type.");
  //   } else {
  //     null;
  //   }
  // };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (IsMap || IsSearch) {
          setIsMap(false);
          setIsSearch(false);
          return true;
        }
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [IsMap, IsSearch])
  );

  const handle_next_btn = () => {
    props.navigation.navigate("PropertyFeature", {
      location: location,
      property_value: property_value,
      propertyDesc: propertyDesc,
      selectedButtonId: selectedButtonId,
      latitude: latitude,
      longitude: longitude,
      propertyid: propertyid,
    });
  };

  useEffect(() => {
    handleProperty_Type();
    DetailsData();
    Geocoder.init("AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw", {
      language: "en",
    });
    setLocation(property_Detail?.location);
  }, []);

  const DetailsData = () => {
    const detailData = {
      property_id: propertyid,
    };
    console.log("detailData", detailData);
    const url = Config.BASE_URL;
    const property_Detailss = url + "get_property_details";
    console.log("Request URL:", property_Detailss);
    setIsLoading(true);
    axios
      .post(property_Detailss, detailData)
      .then((response) => {
        console.log("propertyDetail", response.data);
        if (response.data.success === true) {
          setIsLoading(false);
          setProperty_Details(response.data.property_details[0]);
          setLocation(response.data.property_details[0]?.location);
          setProperty_value(
            // 24
            parseInt(response.data.property_details[0]?.property_type_id)
            // response.data.property_details[0]?.property_type_id.replace(
            //   /\D/g,
            //   ""
            // )
          );
          setSelectedButton(
            parseInt(response.data.property_details[0]?.auto_list)
          );
          setPropertyDesc(
            response.data.property_details[0]?.property_description
          );

          console.log("propertyDetail....", response.data.property_details);
        } else {
          console.error("propertyDetail_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("property_type error:", error);
        // alert(error);
        setIsLoading(false);
      });
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
        ? "Features"
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
  const CheckIOSMapPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              "This feature is not available (on this device / in this context)"
            );
            break;
          case RESULTS.DENIED:
            console.log(
              "The permission has not been requested / is denied but requestable"
            );
            break;
          case RESULTS.LIMITED:
            console.log("The permission is limited: some actions are possible");
            break;
          case RESULTS.GRANTED:
            console.log("The permission is granted");
            getAddressWithCordinates();
            break;
          case RESULTS.BLOCKED:
            console.log("The permission is denied and not requestable anymore");
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkpermissionlocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Example App",
          message: "Example App access to your location ",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        // alert("You can use the location");
        getAddressWithCordinates();
      } else {
        console.log("location permission denied");
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const ConfirmAddress = () => {
    setIsMap(false);
  };
  const openMapandClose = (text) => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = (Region) => {
    // alert(JSON.stringify(Region))
    setlatitude(Region.latitude);
    setlongitude(Region.longitude);
    getAddress(Region.latitude, Region.longitude);
  };
  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then((json) => {
        let MainFullAddress = json.results[0].formatted_address;
        var addressComponent2 = json.results[0].address_components[1];
        // alert(addressComponent2)
        setUserCurrentCity(addressComponent2.long_name);
        setUserZip_Code(json.results[1]?.address_components[6]?.long_name);
        setLocation(MainFullAddress);
        console.log("location....", location);
        //setAddress(MainFullAddress);
      })
      .catch((error) => console.warn(error));
  };
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
          // setProperty_value(property_Detail[0]?.property_type_id);
        } else {
          console.error("property_type_error:", response.data.error);
          // alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("property_type error:", error);
        // alert(error);
        setIsLoading(false);
      });
  };

  const goBack = () => {
    props.navigation.pop();
  };
  return (
    <View style={PropertyDetailsStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => {
          IsMap ? setIsMap(false) : IsSearch ? setIsSearch(false) : goBack();
        }}
        MiddleText={
          IsMap || IsSearch
            ? "Location"
            : editMode
            ? "Edit property"
            : "Add new property"
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {IsMap || IsSearch ? null : (
          <View
            style={{
              marginTop: 15,
            }}
          >
            <StepIndicator
              customSignUpStepStyle={firstIndicatorSignUpStepStyle}
              currentPosition={0}
              // onPress={onStepPress}
              renderStepIndicator={renderStepIndicator}
              labels={stepLabels}
              stepCount={4}
              renderLabel={renderLabel}
            />
          </View>
        )}
        {IsMap ? (
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
            }}
          >
            <MapScreen
              style={{
                height: "100%",
                width: "100%",
                alignSelf: "center",
                marginBottom: 10,
              }}
              onRegionChange={onRegionChange}
              Maplat={latitude}
              Maplng={longitude}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignSelf: "center",
                width: "96%",
                borderWidth: 1,
                borderRadius: 8,
                backgroundColor: "white",
                borderColor: "#E5E4E2",
                marginTop: 10,
                position: "absolute",
              }}
            >
              <TextInput
                style={{
                  backgroundColor: "transparent",

                  width: "90%",
                  height: 45,
                  alignSelf: "center",
                }}
                onFocus={() => openMapandClose()}
                placeholder={"Search Place"}
              />
            </View>
            <TouchableOpacity
              style={SignUpStepStyle.BtnContainer}
              onPress={ConfirmAddress}
            >
              <Image source={IMAGES?.Shape} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
          </View>
        ) : IsSearch ? (
          <SearchPlaces
            onPress={(data, details = null) => {
              setlatitude(details.geometry.location.lat);
              setlongitude(details.geometry.location.lng);
              setIsSearch(false);
              setIsMap(true);
              const city = details.address_components[0].long_name;
              const state = details.address_components[3].long_name;
              const country = details.address_components[4].long_name;
              setLocation(details.formatted_address);
              setCity(city);
              setState(state);
              setCountry(country);
              console.log("locationSearch....", location);
              console.log("details.......", details);
              console.log(city, state, country, "location rahul..........");
            }}
          />
        ) : (
          <ScrollView
            contentContainerStyle={{ marginBottom: 190 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={PropertyDetailsStyle.headingView}>
              <Text style={PropertyDetailsStyle.heading}>
                {"Property details"}
              </Text>
            </View>

            <View style={PropertyDetailsStyle.card}>
              <View style={PropertyDetailsStyle.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>Location</Text>
                <View style={PropertyDetailsStyle.locationConView}>
                  <View style={PropertyDetailsStyle.locationContainer}>
                    <TextInput
                      style={PropertyDetailsStyle.locationInput}
                      value={location}
                      onChangeText={setLocation}
                      onFocus={() => {
                        setIsSearch(true);
                        // setlocationError("");
                      }}
                      placeholder="Search location"
                      placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                    />
                  </View>
                  <TouchableOpacity
                    style={PropertyDetailsStyle.locationIconView}
                    onPress={() => {
                      // props.navigation.navigate("Location");
                      Platform.OS == "ios"
                        ? CheckIOSMapPermission
                        : checkpermissionlocation();
                      setIsMap(true);
                    }}
                  >
                    <Octicons
                      name={"location"}
                      size={22}
                      color={_COLORS.Kodie_GreenColor}
                      style={PropertyDetailsStyle.locationIcon}
                    />
                  </TouchableOpacity>
                </View>
                {/* {locationError ? (
                  <Text style={PropertyDetailsStyle.error_text}>
                    {locationError}
                  </Text>
                ) : null} */}
              </View>
              <View style={PropertyDetailsStyle.inputContainer}>
                <Text style={PropertyDetailsStyle.property_Text}>
                  Property type
                </Text>
                <Dropdown
                  style={PropertyDetailsStyle.dropdown}
                  placeholderStyle={[
                    PropertyDetailsStyle.placeholderStyle,
                    { color: _COLORS.Kodie_LightGrayColor },
                  ]}
                  selectedTextStyle={PropertyDetailsStyle.selectedTextStyle}
                  inputSearchStyle={PropertyDetailsStyle.inputSearchStyle}
                  iconStyle={PropertyDetailsStyle.iconStyle}
                  data={property_Data}
                  maxHeight={300}
                  labelField="lookup_description"
                  valueField="lookup_key"
                  placeholder="Select property type"
                  value={
                    // property_Detail[0]?.property_type
                    //   ? property_Detail[0]?.property_type
                    //   :
                    property_value
                    // 24
                  }
                  onChange={(item) => {
                    setProperty_value(item.lookup_key);
                    // handlePropertyValue()
                    // setpropertytypeError("");
                  }}
                />
                {/* {propertytypeError ? (
                  <Text style={PropertyDetailsStyle.error_text}>
                    {"please select a property type"}
                  </Text>
                ) : null} */}
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
                  setSelectedButtonId(0);
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
                  setSelectedButtonId(1);
                }}
              />
              <View style={PropertyDetailsStyle.btnView}>
                <CustomSingleButton
                  _ButtonText={"Next"}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    // handleLocation(location);
                    // handlePropertyValue(property_value);
                    // if (handleLocation() ||handlePropertyValue()) {
                    props.navigation.navigate("PropertyFeature", {
                      location: location,
                      property_value: property_value,
                      propertyDesc: propertyDesc,
                      selectedButtonId: selectedButtonId,
                      latitude: latitude,
                      longitude: longitude,
                      propertyid: propertyid,
                      city: city,
                      state: state,
                      country: country,
                      editMode: editMode,
                    });
                    setLocation("");
                    setPropertyDesc("");
                    setProperty_value("");
                  }}
                  disabled={isLoading ? true : false}
                />
              </View>

              <TouchableOpacity
                style={PropertyDetailsStyle.goBack_View}
                onPress={() => {
                  goBack();
                }}
              >
                <View style={PropertyDetailsStyle.backIcon}>
                  <Ionicons
                    name="chevron-back"
                    size={22}
                    color={_COLORS.Kodie_MediumGrayColor}
                  />
                </View>
                <Text style={PropertyDetailsStyle.goBack_Text}>
                  {"Go back"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
