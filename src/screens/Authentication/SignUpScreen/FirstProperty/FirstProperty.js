//ScreenNo:13
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from "react-native";
import { FirstPropertyStyle } from "./FirstPropertyStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
import { LABEL_STYLES, IMAGES } from "../../../../Themes";
import { Dropdown } from "react-native-element-dropdown";
import { MultiSelect } from "react-native-element-dropdown";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import { Config } from "../../../../Config";
import axios from "axios";
import Geocoder from "react-native-geocoding";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import StepIndicator from "react-native-step-indicator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MapScreen from "../../../../components/Molecules/GoogleMap/googleMap";
import Geolocation from "react-native-geolocation-service";
import SearchPlaces from "../../../../components/Molecules/SearchPlaces/SearchPlaces";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { signupAccountApiActionCreator } from "../../../../redux/Actions/Authentication/AuthenticationApiCreator";
import mime from "mime";
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
    // name: stepStatus === "finished" ? "check" : (position + 1).toString(),
    color: stepStatus === "finished" ? "#ffffff" : "#ffffff",
    size: 20,
  };
  iconConfig.name = stepStatus === "finished" ? "check" : null;
  return iconConfig;
};
const DATA = [
  {
    label: "Pool",
    value: 1,
  },
  {
    label: "Garage",
    value: 2,
  },
  {
    label: "Balcony",
    value: 3,
  },
  {
    label: "Outdoor Area",
    value: 4,
  },
  {
    label: "Ensuit",
    value: 5,
  },
  {
    label: "Dishwasher",
    value: 6,
  },
  {
    label: "Study",
    value: 7,
  },
  {
    label: "Built in Robes",
    value: 8,
  },
  {
    label: "Air Conditioning",
    value: 9,
  },
  {
    label: "Solar Panels",
    value: 10,
  },
  {
    label: "Heating",
    value: 11,
  },
  {
    label: "Hight Energy Efficiency",
    value: 12,
  },
];
const renderDataItem = (item) => {
  return (
    <View style={FirstPropertyStyle.item}>
      <Text style={FirstPropertyStyle.selectedTextStyle}>
        {item.FeatureName}
      </Text>
      {/* <AntDesign
        style={FirstPropertyStyle.icon}
        color={_COLORS.Kodie_BlackColor}
        name="check"
        size={20}
      /> */}
    </View>
  );
};
export default FirstProperty = (props) => {
  const signUp_account_response = useSelector(
    (state) => state?.authenticationReducer?.data
  );
  console.log("signUp_account_response.....", signUp_account_response);

  let firstName = props?.route?.params?.firstName;
  let lastName = props?.route?.params?.lastName;
  let mobileNumber = props?.route?.params?.mobileNumber;
  let physicalAddress = props?.route?.params?.physicalAddress;
  let organisation = props?.route?.params?.organisation;
  let referral = props?.route?.params?.referral;
  let selectManageProperty = props?.route?.params?.selectManageProperty;
  let selectedServiceKeysString =
    props?.route?.params?.selectedServiceKeysString;
  let kodieHelpValue = props?.route?.params?.kodieHelpValue;
  let ImageName = props?.route?.params?.ImageName;
  let email = props?.route?.params?.email;
  let country = props?.route?.params?.country;
  let state = props?.route?.params?.state;
  let city = props?.route?.params?.city;
  let p_latitude = props?.route?.params?.p_latitude;
  let p_longitude = props?.route?.params?.p_longitude;
  let user_key = props?.route?.params?.user_key;
  // let image_result = props?.route?.params?.image_result;

  console.log("firstname..", firstName);
  console.log("lastName..", lastName);
  console.log("mobileNumber..", mobileNumber);
  console.log("physicalAddress..", physicalAddress);
  console.log("organisation..", organisation);
  console.log("referral..", referral);
  console.log("selectManageProperty..", selectManageProperty);
  console.log("selectedServiceKeysString..", selectedServiceKeysString);
  console.log("kodieHelpValue..", kodieHelpValue);
  console.log("ImageName_data..", ImageName);
  console.log("email..", email);
  console.log("country..", country);
  console.log("state..", state);
  console.log("city..", city);
  console.log("p_latitude..", p_latitude);
  console.log("p_longitude..", p_longitude);
  console.log("user_key..", user_key);
  // console.log("image_result..", image_result);

  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setIsClick] = useState(null);
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
  const [property_value, setProperty_value] = useState([]);
  const [selectedButton, setSelectedButton] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState(0);
  const [selectedkey_features, setSelectedkey_features] = useState([]);
  const [additionalfeatureskey, setAdditionalfeatureskey] = useState([]);
  const [additionalfeatureskeyvalue, setAdditionalFeaturesKeyValue] = useState(
    []
  );
  const [data_add, setData_add] = useState([]);
  //
  const [UserCurrentCity, setUserCurrentCity] = useState("");
  const [UserZip_Code, setUserZip_Code] = useState("");
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [CountBedroom, setCountBedroom] = useState(0);
  // const [CountBedRoomData, setCountBedRoomData] = useState([]);
  const [CountBathroom, setCountBathroom] = useState(0);
  const [CountParking, setCountParking] = useState(0);
  const [CountParkingStreet, setCountParkingStreet] = useState(0);
  const [buildingFlorSize, setBuildingFlorSize] = useState("");
  const [landArea, setLandArea] = useState("");
  const dispatch = useDispatch();
  const P_addressParts = propertyLocation.split(", ");

  const p_country = P_addressParts.pop();
  const P_state = P_addressParts.pop();
  const p_city = P_addressParts.join(", ");
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

  console.log("p_country:", p_country);
  console.log("P_state:", P_state);
  console.log("p_city:", p_city);

  const AllCountsData = [
    { Bedrooms: CountBedroom },
    { Bathrooms: CountBathroom },
    { "Parking Space": CountParking },
    { "On-StreetParking": CountParkingStreet },
  ];
  const increaseBedroomCount = () => {
    setCountBedroom((prevCount) => prevCount + 1);
  };
  const decreaseBedroomCount = () => {
    if (CountBedroom > 0) {
      setCountBedroom((prevCount) => prevCount - 1);
    }
  };
  // key_features count for Bathroom code here------
  const increaseBathroomCount = () => {
    setCountBathroom((prevCount) => prevCount + 1);
  };
  const decreaseBathroomCount = () => {
    if (CountBathroom > 0) {
      setCountBathroom((prevCount) => prevCount - 1);
    }
  };
  const increaseParkingStreetCount = () => {
    setCountParkingStreet((prevCount) => prevCount + 1);
  };
  const decreaseParkingStreetCount = () => {
    if (CountParkingStreet > 0) {
      setCountParkingStreet((prevCount) => prevCount - 1);
    }
  };
  const increaseParkingCount = () => {
    setCountParking((prevCount) => prevCount + 1);
  };
  const decreaseParkingCount = () => {
    if (CountParking > 0) {
      setCountParking((prevCount) => prevCount - 1);
    }
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
        ? "Account"
        : position === 1
        ? "About you"
        : position === 2
        ? "First property"
        : "circle";

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
    additional_features();
    Geocoder.init("AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw", {
      language: "en",
    });
    CheckIOSMapPermission();
  }, []);

  const handleProperty_Type = () => {
    const propertyData = {
      P_PARENT_CODE: "PROP_TYPE",
      P_TYPE: "OPTION",
    };
    const url = Config.API_URL;
    const propertyType = url + "lookup_details";
    console.log("Request URL:", propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then((response) => {
        console.log("property_type", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("propertyData....", response.data.data);
          setProperty_Data(response.data.data);
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
  const additional_features = () => {
    const url = Config.API_URL;
    const additionalApi = url + "key_features";
    console.log("Request URL:", additionalApi);
    setIsLoading(true);
    axios
      .get(additionalApi) // Change from .post to .get
      .then((response) => {
        console.log("additional_Data", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("additional_features....", response.data);
          setAdditionalfeatureskey(response.data.PAF_KEY);
          // setData_add(response.data.PAF_KEY);
          console.log("AdditionalFeaturesKey....", response.data.PAF_KEY);
        } else {
          console.error("additional_features_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("additional_features error:", error);
        alert(error);
        setIsLoading(false);
      });
  };
  // final Save Api ...
  const handleSaveSignup = async () => {
    // alert(selectedServices);
    setIsLoading(true);
    console.log("AllCountsData..", AllCountsData);
    console.log("propertyLocation..", propertyLocation);
    console.log("propertyDesc..", propertyDesc);
    console.log("property_value..", property_value);
    console.log("additionalfeatureskeyvalue..", additionalfeatureskeyvalue);
    console.log("selectedButtonId..", selectedButtonId);
    console.log("islocation..", 1);
    console.log("buildingFlorSize..", buildingFlorSize);
    console.log("landArea..", landArea);

    const formData = new FormData();
    // formData.append("user", 46);
    formData.append("user", user_key);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone_number", mobileNumber);
    formData.append("email", email);
    formData.append("physical_address", physicalAddress);
    formData.append("p_longitude", p_longitude);
    formData.append("p_latitude", p_latitude);
    formData.append("State", state);
    formData.append("Country", country);
    formData.append("City", city);
    formData.append("organisation_name", organisation);
    formData.append("referral_code", referral);
    formData.append("describe_yourself", selectedServiceKeysString);
    formData.append("kodie_help", kodieHelpValue);
    formData.append("property_manage", selectManageProperty);
    formData.append("location", propertyLocation);
    formData.append("location_longitude", longitude);
    formData.append("location_latitude", latitude);
    formData.append("p_state", P_state);
    formData.append("p_country", p_country);
    formData.append("p_city", p_city);
    formData.append("islocation", 1);
    formData.append("property_description", propertyDesc);
    formData.append("property_type", property_value);
    formData.append("key_features", JSON.stringify(AllCountsData));
    formData.append("land_area", landArea);
    formData.append("floor_size", buildingFlorSize);
    formData.append("device_id", "14565Android");
    formData.append("device_type", "Android");
    formData.append(
      "additional_features",
      JSON.stringify(additionalfeatureskeyvalue)
    );
    formData.append("auto_list", selectedButtonId);

    if (ImageName) {
      const imageUri = ImageName;
      const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
      formData.append("profile_photo", {
        uri: imageUri,
        // type: imageType,
        name: imageName,
      });
    }
    const url = "https://e3.cylsys.com/api/v1/signup_step_one";
    const saveAccountDetails = url;
    console.log("Request URL:", saveAccountDetails);
    setIsLoading(true);
    try {
      const response = await axios.post(saveAccountDetails, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Save Account Details", response.data);

      if (response.data.status === true) {
        setIsLoading(false);
        alert(response.data.message);
        props.navigation.navigate("DrawerNavigatorLeftMenu");
        setCurrentPage(0);
        setProperty_value("");
        setbedroomValue("");
        setGaragesValue("");
        setBathRoomValue("");
        setParkingValue("");
        setAdditionalFeaturesKeyValue("");
      } else {
        setIsLoading(false);
        console.error("Save Account Details error:", response.data.error);
        alert(response.data.error);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Account_Details error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSaveSignup = async () => {
  //   setIsLoading(true);
  //   console.log("AllCountsData..", AllCountsData);
  //   console.log("propertyLocation..", propertyLocation);
  //   console.log("propertyDesc..", propertyDesc);
  //   console.log("property_value..", property_value);
  //   console.log("additionalfeatureskeyvalue..", additionalfeatureskeyvalue);
  //   console.log("selectedButtonId..", selectedButtonId);
  //   console.log("islocation..", 1);
  //   console.log("buildingFlorSize..", buildingFlorSize);
  //   console.log("landArea..", landArea);

  //   const formData = new FormData();
  //   formData.append("user", user_key);
  //   formData.append("first_name", firstName);
  //   formData.append("last_name", lastName);
  //   formData.append("phone_number", mobileNumber);
  //   formData.append("email", email);
  //   formData.append("physical_address", physicalAddress);
  //   formData.append("p_longitude", p_longitude);
  //   formData.append("p_latitude", p_latitude);
  //   formData.append("State", state);
  //   formData.append("Country", country);
  //   formData.append("City", city);
  //   formData.append("organisation_name", organisation);
  //   formData.append("referral_code", referral);
  //   formData.append("describe_yourself", selectedServiceKeysString);
  //   formData.append("kodie_help", kodieHelpValue);
  //   formData.append("property_manage", selectManageProperty);
  //   formData.append("location", propertyLocation);
  //   formData.append("location_longitude", longitude);
  //   formData.append("location_latitude", latitude);
  //   formData.append("p_state", P_state);
  //   formData.append("p_country", p_country);
  //   formData.append("p_city", p_city);
  //   formData.append("islocation", 1);
  //   formData.append("property_description", propertyDesc);
  //   formData.append("property_type", property_value);
  //   formData.append("key_features", AllCountsData);
  //   formData.append("land_area", landArea);
  //   formData.append("floor_size", buildingFlorSize);
  //   formData.append("additional_features", additionalfeatureskeyvalue);
  //   formData.append("auto_list", selectedButtonId);
  //   // if (ImageName) {
  //   //   const imageUri = ImageName;
  //   //   // const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
  //   //   formData.append("profile_photo", {
  //   //     uri: imageUri,
  //   //     name: "abc",
  //   //   });
  //   // }
  //   //   formData.append("profile_photo", {
  //   //   uri: ImageName[0].uri,
  //   //   type: ImageName[0].type,
  //   //   name: ImageName[0].fileName,
  //   // });

  //   const url = "https://e3.cylsys.com/api/v1/signup_step_one";
  //   setIsLoading(true);

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       body: formData,
  //       headers: {
  //         "content-type": "multipart/form-data",
  //       },
  //     });

  //     const responseData = await response.json();

  //     console.log("Save Account Details", responseData);

  //     if (responseData.success === true) {
  //       setIsLoading(false);
  //       alert(responseData.message);
  //       props.navigation.navigate("DrawerNavigatorLeftMenu");
  //       setCurrentPage(0);
  //       setProperty_value("");
  //       setbedroomValue("");
  //       setGaragesValue("");
  //       setBathRoomValue("");
  //       setParkingValue("");
  //       setAdditionalFeaturesKeyValue("");
  //     } else {
  //       setIsLoading(false);
  //       console.error("Save Account Details error:", responseData.error);
  //       alert(responseData.error);
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error("Account_Details error:", error);
  //     alert(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const goBack = () => {
    props.navigation.pop();
  };

  // ...Location
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
        setPropertyLocation(MainFullAddress);

        //setAddress(MainFullAddress);
      })
      .catch((error) => console.warn(error));
  };
  return (
    <View style={{ flex: 1 }}>
      <TopHeader
        MiddleText={
          IsMap || IsSearch ? "Location" : "Set up your Kodie account"
        }
        onPressLeftButton={() => {
          IsMap ? setIsMap(false) : IsSearch ? setIsSearch(false) : goBack();
        }}
      />
      <View style={FirstPropertyStyle.container}>
        {/* {IsMap || IsSearch ? null : (
          <View style={FirstPropertyStyle.stepIndicator}>
            <StepIndicator
              customSignUpStepStyle={firstIndicatorSignUpStepStyle}
              currentPosition={currentPage}
              // onPress={onStepPress}
              renderStepIndicator={renderStepIndicator}
              labels={labels}
              stepCount={3}
              renderLabel={renderLabel}
            />
          </View>
        )} */}
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
              style={FirstPropertyStyle.BtnContainer}
              onPress={ConfirmAddress}
            >
              {/* <Text style={SignUpStepStyle.labeltxt}>Confirm</Text> */}
              <Image source={IMAGES?.Shape} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
          </View>
        ) : IsSearch ? (
          <SearchPlaces
            onPress={(data, details = null) => {
              console.log("LocationData....", details);
              setlatitude(details.geometry.location.lat);
              setlongitude(details.geometry.location.lng);
              setIsSearch(false);
              setIsMap(true);
              setPropertyLocation(details.formatted_address);
              // alert(propertyLocation);
            }}
          />
        ) : (
          <ScrollView>
            <View style={FirstPropertyStyle.stepIndicator}>
              <StepIndicator
                customSignUpStepStyle={firstIndicatorSignUpStepStyle}
                currentPosition={currentPage}
                // onPress={onStepPress}
                renderStepIndicator={renderStepIndicator}
                labels={labels}
                stepCount={3}
                renderLabel={renderLabel}
              />
            </View>
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
                      Platform.OS == "ios"
                        ? CheckIOSMapPermission
                        : checkpermissionlocation();
                      setIsMap(true);
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
                    onFocus={() => {
                      setIsSearch(true);
                    }}
                    placeholder="Search location"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  />
                </View>
              </View>
              <View style={FirstPropertyStyle.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>
                  Property description
                </Text>
                <TextInput
                  style={FirstPropertyStyle.input}
                  value={propertyDesc}
                  onChangeText={setPropertyDesc}
                  placeholder="Describe your property here..."
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
                  data={property_Data}
                  maxHeight={300}
                  labelField="description"
                  valueField="lookup_key"
                  placeholder="Apartment"
                  value={property_value}
                  onChange={(item) => {
                    setProperty_value(item.lookup_key);
                    // alert(item.lookup_key)
                  }}
                />
              </View>
              <Text
                style={[
                  LABEL_STYLES._texinputLabel,
                  FirstPropertyStyle.addition_featureText,
                ]}
              >
                Key features
              </Text>
              <View style={FirstPropertyStyle.inputContainer}>
                <View>
                  <View style={FirstPropertyStyle.mainfeaturesview}>
                    <View style={FirstPropertyStyle.key_feature_Text_view}>
                      <Text style={FirstPropertyStyle.key_feature_Text}>
                        {"Bedrooms"}
                      </Text>
                    </View>

                    <TouchableOpacity style={FirstPropertyStyle.plus_minusview}>
                      <TouchableOpacity
                        style={FirstPropertyStyle.menusIconView}
                        onPress={decreaseBedroomCount}
                      >
                        <AntDesign name="minus" size={20} />
                      </TouchableOpacity>
                      <Text style={FirstPropertyStyle.countdata}>
                        {CountBedroom}
                      </Text>
                      <TouchableOpacity
                        style={FirstPropertyStyle.menusIconView}
                        onPress={() => {
                          increaseBedroomCount();
                        }}
                      >
                        <AntDesign name="plus" size={20} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>

                  <View style={FirstPropertyStyle.mainfeaturesview}>
                    <View style={FirstPropertyStyle.key_feature_Text_view}>
                      <Text style={FirstPropertyStyle.key_feature_Text}>
                        {"Bathrooms"}
                      </Text>
                    </View>

                    <TouchableOpacity style={FirstPropertyStyle.plus_minusview}>
                      <TouchableOpacity
                        style={FirstPropertyStyle.menusIconView}
                        onPress={decreaseBathroomCount}
                      >
                        <AntDesign name="minus" size={20} />
                      </TouchableOpacity>
                      <Text style={FirstPropertyStyle.countdata}>
                        {CountBathroom}
                      </Text>
                      <TouchableOpacity
                        style={FirstPropertyStyle.menusIconView}
                        onPress={increaseBathroomCount}
                      >
                        <AntDesign name="plus" size={20} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>

                  <View style={FirstPropertyStyle.mainfeaturesview}>
                    <View style={FirstPropertyStyle.key_feature_Text_view}>
                      <Text style={FirstPropertyStyle.key_feature_Text}>
                        {"Parking spaces"}
                      </Text>
                    </View>

                    <TouchableOpacity style={FirstPropertyStyle.plus_minusview}>
                      <TouchableOpacity
                        style={FirstPropertyStyle.menusIconView}
                        onPress={decreaseParkingCount}
                      >
                        <AntDesign name="minus" size={20} />
                      </TouchableOpacity>
                      <Text style={FirstPropertyStyle.countdata}>
                        {CountParking}
                      </Text>
                      <TouchableOpacity
                        style={FirstPropertyStyle.menusIconView}
                        onPress={increaseParkingCount}
                      >
                        <AntDesign name="plus" size={20} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>

                  <View style={FirstPropertyStyle.mainfeaturesview}>
                    <View style={FirstPropertyStyle.key_feature_Text_view}>
                      <Text style={FirstPropertyStyle.key_feature_Text}>
                        {"On-street parking"}
                      </Text>
                    </View>

                    <TouchableOpacity style={FirstPropertyStyle.plus_minusview}>
                      <TouchableOpacity
                        style={FirstPropertyStyle.menusIconView}
                        onPress={decreaseParkingStreetCount}
                      >
                        <AntDesign name="minus" size={20} />
                      </TouchableOpacity>
                      <Text style={FirstPropertyStyle.countdata}>
                        {CountParkingStreet}
                      </Text>
                      <TouchableOpacity
                        style={FirstPropertyStyle.menusIconView}
                        onPress={increaseParkingStreetCount}
                      >
                        <AntDesign name="plus" size={20} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <View style={FirstPropertyStyle.key_feature_mainView}>
                    <View style={FirstPropertyStyle.key_feature_subView}>
                      <Text style={FirstPropertyStyle.key_feature_Text}>
                        {"Building floor size  (optional)"}
                      </Text>
                    </View>

                    <View style={FirstPropertyStyle.floorsizeview}>
                      <TextInput
                        style={FirstPropertyStyle.flor_input_field}
                        value={buildingFlorSize}
                        onChangeText={setBuildingFlorSize}
                        placeholder="102m2"
                        placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>

                  <View style={FirstPropertyStyle.key_feature_mainView}>
                    <View style={FirstPropertyStyle.key_feature_subView}>
                      <Text style={FirstPropertyStyle.key_feature_Text}>
                        {"Land area (optional)"}
                      </Text>
                    </View>

                    <View style={FirstPropertyStyle.floorsizeview}>
                      <TextInput
                        style={FirstPropertyStyle.flor_input_field}
                        value={landArea}
                        onChangeText={setLandArea}
                        placeholder="102m2"
                        placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                        keyboardType="number-pad"
                      />
                    </View>
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
                    data={additionalfeatureskey}
                    labelField="FeatureName"
                    valueField="key"
                    placeholder="Select additional features"
                    value={additionalfeatureskeyvalue}
                    search
                    searchPlaceholder="Search..."
                    onChange={(item) => {
                      setAdditionalFeaturesKeyValue(item);
                      // alert(item);
                    }}
                    renderItem={renderDataItem}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity
                        onPress={() => unSelect && unSelect(item)}
                      >
                        <View style={FirstPropertyStyle.selectedStyle}>
                          <Text style={FirstPropertyStyle.textSelectedStyle}>
                            {item.FeatureName}
                          </Text>
                          <AntDesign color="white" name="close" size={17} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={FirstPropertyStyle.AutoList_text}>
                  {"Auto-list property on Kodie property marketplace "}
                </Text>
                <TouchableOpacity style={FirstPropertyStyle.questionmark}>
                  <AntDesign name="question" size={20} color="#8AFBA5" />
                </TouchableOpacity>
              </View>
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
            </View>
            <View style={{ marginHorizontal: 16 }}>
              <CustomSingleButton
                disabled={isLoading ? true : false}
                _ButtonText={"Save"}
                Text_Color={_COLORS.Kodie_WhiteColor}
                onPress={() => {
                  handleSaveSignup();
                }}
              />
            </View>
            <View style={{ marginHorizontal: 16 }}>
              <CustomSingleButton
                disabled={isLoading ? true : false}
                _ButtonText={"Fill these details out later"}
                Text_Color={_COLORS.Kodie_BlackColor}
                backgroundColor={_COLORS.Kodie_WhiteColor}
                onPress={() => {
                  handleSaveSignup();
                }}
              />
            </View>
            <TouchableOpacity
              style={FirstPropertyStyle.goBack_View}
              onPress={goBack}
            >
              <View style={FirstPropertyStyle.backIcon}>
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color={_COLORS.Kodie_MediumGrayColor}
                />
              </View>
              <Text style={FirstPropertyStyle.goBack_Text}>{"Go back"}</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
