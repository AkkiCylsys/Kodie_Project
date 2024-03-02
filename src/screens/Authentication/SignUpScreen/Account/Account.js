import React, { useState, useRef, useEffect } from "react";
//ScreenNo:9
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { AccountStyle } from "./AccountStyle";
import { LABEL_STYLES } from "../../../../Themes";
import { _COLORS, IMAGES } from "../../../../Themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import TopHeader from "../../../../components/Molecules/Header/Header";
import Geocoder from "react-native-geocoding";
import Geolocation from "react-native-geolocation-service";
import MapScreen from "../../../../components/Molecules/GoogleMap/googleMap";
import SearchPlaces from "../../../../components/Molecules/SearchPlaces/SearchPlaces";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
export default Account = (props) => {
  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [referral, setRefferral] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setIsClick] = useState(null);
  const [selectManageProperty, setSelectManageProperty] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [propertyDesc, setPropertyDesc] = useState("");
  const [florSize, setFlorSize] = useState("");
  const [selected, setSelected] = useState([]);
  const [value, setValue] = useState(null);
  const [bedroomValue, setbedroomValue] = useState([]);
  const [garagesValue, setGaragesValue] = useState([]);
  const [bathRoomValue, setBathRoomValue] = useState([]);
  const [parkingValue, setParkingValue] = useState([]);
  const [property_Data, setProperty_Data] = useState([]);
  const [bedRoomData, setBedRoomData] = useState([]);
  const [garagesData, setGaragesData] = useState([]);
  const [bathroomData, setBathroomData] = useState([]);
  const [parkingData, setParkingData] = useState([]);
  const [kodiehelpData, setKodiehelpData] = useState([]);
  const [kodieDescribeYourselfData, setKodieDescribeYourselfData] = useState(
    []
  );
  const [kodieDescribeYourselfId, setKodieDescribeYourselfDataId] =
    useState("");
  const [manage_property_Data, setmanage_property_Data] = useState([]);
  const [property_value, setProperty_value] = useState([]);
  const [ImageName, setImageName] = useState("");
  const [imagePath, setImagePath] = useState("");

  const [selectedButton, setSelectedButton] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState(0);
  const [kodiehelplookupid, setKodiehelplookupid] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const refRBSheet = useRef();
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedkey_features, setSelectedkey_features] = useState([]);
  const [selectedLookupKeys, setSelectedLookupKeys] = useState([]); // State to store selected lookup keys

  const [additionalfeatureskey, setAdditionalfeatureskey] = useState([]);
  const [additionalfeatureskeyvalue, setAdditionalFeaturesKeyValue] = useState(
    []
  );
  const [describeBtn, setDescribeBtn] = useState([]);
  const [data_add, setData_add] = useState([]);
  //
  const [UserCurrentCity, setUserCurrentCity] = useState("");
  const [UserZip_Code, setUserZip_Code] = useState("");
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");

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
    const mobileReg = /^\d{10}$/;
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
    } else if (mobileNumber.trim() == "") {
      setMobileNumberError("Phone number is required.");
    } else {
      props.navigation.navigate("AboutYou");
      // alert("done")
    }
    console.log('mobileNumber..',mobileNumber)
  };
  const goBack = () => {
    props.navigation.pop();
    // props.navigation.navigate("SignUp");
  };
  useEffect(() => {
    Geocoder.init("AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw", {
      language: "en",
    });
    CheckIOSMapPermission();
  }, []);

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
    getAddress();
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
        console.log("json location.......", json);
        console.log("current address...", json.results[0].formatted_address);
        setPhysicalAddress(json.results[0].formatted_address);
        let MainFullAddress =
          json.results[0].address_components[1].long_name +
          ", " +
          json.results[0].address_components[2].long_name +
          ", " +
          json.results[0].address_components[3].long_name +
          ", " +
          json.results[0].address_components[4].long_name +
          ", " +
          json.results[0].address_components[5].long_name +
          ", " +
          json.results[0].address_components[6].long_name +
          ", " +
          json.results[0].address_components[7].long_name +
          ", " +
          json.results[0].address_components[8].long_name;
        var addressComponent2 = json.results[0].address_components[1];
        // alert(addressComponent2)
        setUserCurrentCity(addressComponent2.long_name);
        setUserZip_Code(json.results[1]?.address_components[6]?.long_name);
        setPhysicalAddress(MainFullAddress);

        //setAddress(MainFullAddress);
      })
      .catch((error) => console.warn(error));
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{ height: 500 }}
      style={{ backgroundColor: _COLORS.Kodie_WhiteColor }}
    >
      <View style={{ flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor }}>
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
                flex: 1,
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
                placeholder={"Search Place "}
                placeholderTextColor={_COLORS.Kodie_BlackColor}
              />
            </View>
            <TouchableOpacity
              style={AccountStyle.BtnContainer}
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
            }}
          />
        ) : (
          <View style={{ flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor }}>
            <TopHeader
              MiddleText={"Account set up"}
              onPressLeftButton={goBack}
            />
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
            <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
              <CustomSingleButton
                disabled={isLoading ? true : false}
                _ButtonText={"Next"}
                Text_Color={_COLORS.Kodie_WhiteColor}
                onPress={() => {
                  handleNextBtn();
                }}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
