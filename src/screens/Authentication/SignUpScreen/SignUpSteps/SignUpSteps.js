//ScreenNo:11
//ScreenNo:12
//ScreenNo:13
//ScreenNo:14
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  PermissionsAndroid,
  Image,
  FlatList,
} from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import StepIndicator from "react-native-step-indicator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import { SignUpStepStyle } from "./SignUpStepsStyle";
import { AccountStyle } from "../Account/AccountStyle";
import { LABEL_STYLES, _COLORS, IMAGES } from "../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";
import { useDispatch, useSelector } from "react-redux";
import SearchPlaces from "../../../../components/Molecules/SearchPlaces/SearchPlaces";
import MapScreen from "../../../../components/Molecules/GoogleMap/googleMap";
import Geocoder from "react-native-geocoding";
import Geolocation from "react-native-geolocation-service";
import Ionicons from "react-native-vector-icons/Ionicons";

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
    color: stepStatus === "finished" ? "#ffffff" : "black",
    size: 20,
  };
  iconConfig.name = stepStatus === "finished" ? "check" : null;

  return iconConfig;
};
const SignUpSteps = (props) => {
  // const signup_response = useSelector(
  //   (state) => state?.authenticationReducer?.data
  // );
  // console.log("signup_response.....", signup_response);
  const [isLoading, setIsLoading] = useState(false);
  const ref = React.useRef(null);
  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [referral, setRefferral] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [UserCurrentCity, setUserCurrentCity] = useState("");
  const [UserZip_Code, setUserZip_Code] = useState("");
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");

  let email = props?.route?.params?.email;
  console.log("email...", email);
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

  const getAddressWithCordinates = () => {
    Geolocation.watchPosition(
      (position) => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
        getAddress(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  };

  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then((json) => {
        let MainFullAddress = json.results[0].formatted_address;
        var addressComponent2 = json.results[0].address_components[1];
        // alert(addressComponent2)
        setUserCurrentCity(addressComponent2.long_name);
        setUserZip_Code(json.results[1]?.address_components[6]?.long_name);
        setPhysicalAddress(MainFullAddress);
        console.log("physicalAddress....", physicalAddress);

        //setAddress(MainFullAddress);
      })
      .catch((error) => console.warn(error));
  };
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
      props.navigation.navigate("AboutYou", {
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobileNumber,
        physicalAddress: physicalAddress,
        organisation: organisation,
        referral: referral,
        email: email,
      });
    }
  };
  useEffect(() => {
    Geocoder.init("AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw", {
      language: "en",
    });
    CheckIOSMapPermission();
  }, []);

  //  go back button...............
  const goBack = () => {
    props.navigation.navigate("LoginScreen");
  };
  const renderLabel = ({ position, stepStatus }) => {
    const iconColor =
      position === currentPage
        ? _COLORS.Kodie_BlackColor
        : stepStatus === "finished"
        ? "#000000"
        : "#808080";
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

  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  const renderPageContent = () => {
    return (
      <ScrollView ref={scrollViewRef}>
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
                  // props.navigation.navigate("Location");

                  Platform.OS == "ios"
                    ? CheckIOSMapPermission
                    : checkpermissionlocation();
                  setIsMap(true);
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
                value={physicalAddress}
                onChangeText={setPhysicalAddress}
                onFocus={() => {
                  setIsSearch(true);
                }}
                placeholder="Enter new location"
                placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              />
            </View>
          </View>
          <View style={AccountStyle.inputContainer}>
            <Text style={[LABEL_STYLES._texinputLabel, { marginTop: 16 }]}>
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
  };

  return (
    <>
      <TopHeader
        MiddleText={
          IsMap || IsSearch ? "Location" : "Set up your Kodie account"
        }
        
        onPressLeftButton={() => {
          IsMap ?setIsMap(false):IsSearch ? setIsSearch(false) : goBack();
        }}
      />
      <View style={SignUpStepStyle.container}>
        {IsMap || IsSearch ? null : (
          <View style={SignUpStepStyle.stepIndicator}>
            <StepIndicator
              customSignUpStepStyle={firstIndicatorSignUpStepStyle}
              currentPosition={1}
              renderStepIndicator={renderStepIndicator}
              labels={labels}
              stepCount={3}
              renderLabel={renderLabel}
            />
          </View>
        )}
        {IsMap ? (
          <View
            style={{
              flex: 1,
              // paddingHorizontal: 10,
              backgroundColor: "transparent",
            }}
          >
            <MapScreen
              style={{
                height: "100%",
                width: "100%",
                // borderRadius: 20,
                // borderWidth: 1,
                //borderColor: .greenAppColor,
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
                  //marginTop: 10,
                }}
                onFocus={() => openMapandClose()}
                placeholder={"Search Place"}
              />
            </View>
            <TouchableOpacity
              style={SignUpStepStyle.BtnContainer}
              onPress={ConfirmAddress}
            >
              {/* <Text style={SignUpStepStyle.labeltxt}>Confirm</Text> */}
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
              setPhysicalAddress(details.formatted_address);
              console.log("physicalAddressSearch....", physicalAddress);
              console.log("details.......", details);
            }}
          />
        ) : (
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
                    handleNextBtn();
                    // props.navigation.navigate("AboutYou");
                  }}
                />
                <TouchableOpacity
                  style={SignUpStepStyle.goBack_View}
                  onPress={goBack}
                >
                  <View style={SignUpStepStyle.backIcon}>
                    <Ionicons
                      name="chevron-back"
                      size={22}
                      color={_COLORS.Kodie_MediumGrayColor}
                    />
                  </View>
                  <Text style={SignUpStepStyle.goBack_Text}>{"Go back"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
        {isLoading ? <CommonLoader /> : null}
      </View>
    </>
  );
};

export default SignUpSteps;
