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
  Image,
  FlatList,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import { SignUpStepStyle } from "./SignUpStepsStyle";
import { AccountStyle } from "../Account/AccountStyle";
import { LABEL_STYLES, _COLORS, IMAGES } from "../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import { AboutYouStyle } from "../AboutYou/AboutYouStyle";
import ServicesBox from "../../../../components/Molecules/ServicesBox/ServicesBox";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RBSheet from "react-native-raw-bottom-sheet";
import UploadImageData from "../../../../components/Molecules/UploadImage/UploadImage";
import { FirstPropertyStyle } from "../FirstProperty/FirstPropertyStyle";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import { MultiSelect } from "react-native-element-dropdown";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import { Config } from "../../../../Config";
import axios from "axios";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";
import RNFetchBlob from "rn-fetch-blob";
import { useScrollToTop } from "@react-navigation/native";
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
    name: "stepbackward",
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

    default: {
      break;
    }
  }
  return iconConfig;
};
const SignUpSteps = (props) => {
  const ref = React.useRef(null);

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
  const fs = RNFetchBlob.fs;

  const handleBoxPress = (lookupID) => {
    setIsClick(lookupID);
    setSelectManageProperty(lookupID);
  };
  const toggleCheckbox = (lookupKey) => {
    if (selectedLookupKeys.includes(lookupKey)) {
      setSelectedLookupKeys(
        selectedLookupKeys.filter((key) => key !== lookupKey)
      );
    } else {
      setSelectedLookupKeys([...selectedLookupKeys, lookupKey]);
    }
  };
  const wantList = ({ item }) => {
    const isSelected = selectedLookupKeys.includes(item.lookup_key);

    return (
      <View>
        <View style={AboutYouStyle.want_List_View}>
          <TouchableOpacity
            onPress={() => {
              toggleCheckbox(item.lookup_key);
              setKodiehelplookupid(item.lookup_key);
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
          <Text style={AboutYouStyle.want_List_text}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const handleImageNameChange = async (newImageName) => {
    setImageName(newImageName);
    console.log("................ImageNAme", newImageName);
    console.log("................ImageNAme", newImageName.path);
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
  // manage property renderItem in about you page
  const renderItem = ({ item }) => (
    <ServicesBox
      Services_Name={item?.description}
      BoxStyling={[
        AboutYouStyle.box_style,
        {
          margin: 4,
          backgroundColor:
            isClick === item.lookup_key
              ? _COLORS.Kodie_lightGreenColor
              : _COLORS.Kodie_WhiteColor,
        },
      ]}
      textColor={[AboutYouStyle.box_Text_Style]}
      onPress={() => {
        handleBoxPress(item.lookup_key),
          setSelectManageProperty(item.lookup_key);
      }}
    />
  );

  const toggleSelection = (lookup_key) => {
    if (selectedServices.includes(lookup_key)) {
      setSelectedServices(
        selectedServices.filter((item) => item !== lookup_key)
        // alert(selectedServices.filter((item) => item !== lookup_key))
      );
    } else {
      setSelectedServices([...selectedServices, lookup_key]);
      // alert([...selectedServices]);
    }
  };

  const handle_key_feature = (lookup_key) => {
    if (selectedkey_features.includes(lookup_key)) {
      setSelectedkey_features(
        selectedkey_features.filter((item) => item !== lookup_key)
      );
    } else {
      setSelectedkey_features([...selectedkey_features, lookup_key]);
    }
  };

  const renderItemDescribeYourself = ({ item }) => (
    <ServicesBox
      Services_Name={item?.description}
      BoxStyling={[
        AboutYouStyle.box_style,
        {
          margin: 4,
          backgroundColor: selectedServices.includes(item.lookup_key)
            ? _COLORS.Kodie_lightGreenColor
            : _COLORS.Kodie_WhiteColor,
        },
      ]}
      textColor={[AboutYouStyle.box_Text_Style]}
      onPress={() => {
        toggleSelection(item.lookup_key);
        setKodieDescribeYourselfDataId(item.lookup_key);
        alert(item.lookup_key);
      }}
    />
  );
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
    scrollViewRef.current.scrollTo({ y: 0, x: 0, animated: true });
    if (firstName.trim() === "") {
      setFirstNameError("First name is required.");
    } else if (lastName.trim() === "") {
      setLastNameError("Last name is required.");
    } else if (mobileNumber.trim() === "") {
      setMobileNumberError("Phone number is required.");
    } else {
      if (currentPage == 0) {
        setCurrentPage(currentPage + 1);
        scrollViewRef.current.scrollTo({ y: 0, x: 0, animated: true });
      } else if (currentPage === 1) {
        setCurrentPage(currentPage + 1);
        scrollViewRef.current.scrollTo({ y: 0, x: 0, animated: true });
      } else if (currentPage === 2) {
        scrollViewRef.current.scrollTo({ y: 0, x: 0, animated: true });
        // props.navigation.navigate("DrawerNavigatorLeftMenu");
        handleSaveSignup();
        console.log(
          selectedServices,
          firstName,
          // selectedCheckboxes,
          selectManageProperty,
          selectedkey_features,
          additionalfeatureskeyvalue
        );
      } else {
        null;
      }
    }
  };

  const handleSaveSignup = async () => {
    alert(selectedServices);
    const selectedServiceKeysString = selectedServices.join(",");
    const kodieHelpValue = selectedLookupKeys.join(",");
    const selectedKeyFeature = selectedkey_features.join(",");

    const formData = new FormData();
    formData.append("user", "46");
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone_number", mobileNumber);
    formData.append("physical_address", physicalAddress);
    formData.append("organisation_name", organisation);
    formData.append("referral_code", referral);
    formData.append("describe_yourself", selectedServiceKeysString);
    formData.append("kodie_help", kodieHelpValue);
    formData.append("property_manage", selectManageProperty);
    formData.append("location", propertyLocation);
    formData.append("location_longitude", "102.002.001");
    formData.append("location_latitude", "104.004.002");
    formData.append("islocation", "1");
    formData.append("property_description", propertyDesc);
    formData.append("property_type", property_value);
    formData.append("key_features", selectedKeyFeature);
    formData.append("additional_features", additionalfeatureskeyvalue);
    formData.append("auto_list", selectedButtonId);

    if (ImageName) {
      const imageUri = ImageName;
      const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
      // const imageType = ImageName.mime || "image/jpeg";

      // if (ImageName?.path) {
      //   const imageUri = ImageName.path;
      //   const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
      //   const imageType = ImageName.mime || "image/jpeg";
      //   console.log("imageType...", ImageName.mime);

      formData.append("profile_photo", {
        uri: imageUri,
        // type: imageType,
        name: imageName,
      });
    }

    const url = Config.API_URL;
    const saveAccountDetails = url + "user_save_signup_account_details";
    console.log("Request URL:", saveAccountDetails);
    setIsLoading(true);

    try {
      const response = await axios.post(saveAccountDetails, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      console.log("Save Account Details", response.data);

      if (response.data.status === true) {
        setIsLoading(false);
        alert(response.data.message);
        props.navigation.navigate("DrawerNavigatorLeftMenu");
        setCurrentPage(0);
        setFirstName("");
        setLastName("");
        setMobileNumber("");
        setPhysicalAddress("");
        setOrganisation("");
        setRefferral("");
        setProperty_value("");
        setbedroomValue("");
        setGaragesValue("");
        setBathRoomValue("");
        setParkingValue("");
      } else {
        console.error("Save Account Details error:", response.data.error);
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Account_Details error:", error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current.scrollTo({ y: 0, x: 0, animated: true });
    handleProperty_Type();
    handle_manage_property();
    handle_bedRoom();
    handle_Garages();
    handle_Bathroom();
    handle_parking();
    handle_kodiehelp();
    handle_describe_yourself();
    additional_features();
  }, []);
  // property Type API with LookupKey...
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
  // manage property API with lookup key...
  const handle_manage_property = () => {
    const propertyData = {
      P_PARENT_CODE: "TEN_PROPERTY",
      P_TYPE: "OPTION",
    };
    const url = Config.API_URL;
    const propertyType = url + "lookup_details";
    console.log("Request URL:", propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then((response) => {
        console.log("maneg_property_type", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("maneg_property_type....", response.data.data);
          setmanage_property_Data(response.data.data);
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
  //  key feature module BedRoom API....
  const handle_bedRoom = () => {
    const bedRoom_Data = {
      P_PARENT_CODE: "BEDROOM",
      P_TYPE: "OPTION",
    };
    const url = Config.API_URL;
    const bedroomApi = url + "lookup_details";
    console.log("Request URL:", bedroomApi);
    setIsLoading(true);
    axios
      .post(bedroomApi, bedRoom_Data)
      .then((response) => {
        console.log("bedRoom_data", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("bedRoom_data....", response.data.data);
          setBedRoomData(response.data.data);
        } else {
          console.error("bedRoom_data_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("bedRoom_data error:", error);
        alert(error);
        setIsLoading(false);
      });
  };

  //  key feature module Garages API....
  const handle_Garages = () => {
    const garages_Data = {
      P_PARENT_CODE: "GARAGES",
      P_TYPE: "OPTION",
    };
    const url = Config.API_URL;
    const garagesApi = url + "lookup_details";
    console.log("Request URL:", garagesApi);
    setIsLoading(true);
    axios
      .post(garagesApi, garages_Data)
      .then((response) => {
        console.log("garages_Data", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("garages_Data....", response.data.data);
          setGaragesData(response.data.data);
        } else {
          console.error("garages_Data_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("garages_Data error:", error);
        alert(error);
        setIsLoading(false);
      });
  };

  // key feature module Bathroom API....
  const handle_Bathroom = () => {
    const Bathroom_Data = {
      P_PARENT_CODE: "BATHROOM",
      P_TYPE: "OPTION",
    };
    const url = Config.API_URL;
    const bathrooApi = url + "lookup_details";
    console.log("Request URL:", bathrooApi);
    setIsLoading(true);
    axios
      .post(bathrooApi, Bathroom_Data)
      .then((response) => {
        console.log("bathroom_Data", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("bathroom_Data....", response.data.data);
          setBathroomData(response.data.data);
        } else {
          console.error("bathroom_Data_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("bathroom_Data error:", error);
        alert(error);
        setIsLoading(false);
      });
  };

  // // key feature module Bathroom API....
  const handle_parking = () => {
    const parking_Data = {
      P_PARENT_CODE: "PARKING",
      P_TYPE: "OPTION",
    };
    const url = Config.API_URL;
    const parkingApi = url + "lookup_details";
    console.log("Request URL:", parking_Data);
    setIsLoading(true);
    axios
      .post(parkingApi, parking_Data)
      .then((response) => {
        console.log("parking_Data", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("parking_Data....", response.data.data);
          setParkingData(response.data.data);
        } else {
          console.error("parking_Data_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("parking_Data error:", error);
        alert(error);
        setIsLoading(false);
      });
  };
  const handle_kodiehelp = () => {
    const kodiehelp_Data = {
      P_PARENT_CODE: "KODIE_HELP",
      P_TYPE: "OPTION",
    };
    const url = Config.API_URL;
    const kodiehelpApi = url + "lookup_details";
    console.log("Request URL:", kodiehelp_Data);
    setIsLoading(true);
    axios
      .post(kodiehelpApi, kodiehelp_Data)
      .then((response) => {
        console.log("kodie_Data", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("kodie_Data....", response.data.data);
          setKodiehelpData(response.data.data);
        } else {
          console.error("kodie_Data_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("kodie_Data error:", error);
        alert(error);
        setIsLoading(false);
      });
  };
  const handle_describe_yourself = () => {
    const describe_yourself_Data = {
      P_PARENT_CODE: "TEN_DESC",
      P_TYPE: "OPTION",
    };
    const url = Config.API_URL;
    const describeYourselfApi = url + "lookup_details";
    console.log("Request URL:", describeYourselfApi);
    setIsLoading(true);
    axios
      .post(describeYourselfApi, describe_yourself_Data)
      .then((response) => {
        console.log("kodie_describeYouself_Data", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("kodie_describeYouself_Data....", response.data.data);
          setKodieDescribeYourselfData(response.data.data);
        } else {
          console.error(
            "kodie_describeYouself_Data_error:",
            response.data.error
          );
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("kodie_describeYouself_Data error:", error);
        alert(error);
        setIsLoading(false);
      });
  };

  const additional_features = () => {
    const url = Config.API_URL;
    const additionalApi = url + "key_features";
    console.log("Request URL:", additionalApi);
    // const url = 'https://cylsys-kodie-api-01-e3fa986bbe83.herokuapp.com/api/v1/key_features';
    setIsLoading(true);
    axios
      .get(additionalApi) // Change from .post to .get
      .then((response) => {
        console.log("additional_Data", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("additional_features....", response.data);
          setAdditionalfeatureskey(response.data.PAF_KEY);
          setData_add(response.data.PAF_KEY);
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

  const onStepPress = (position) => {
    setCurrentPage(position);
  };

  //  go back button...............
  const goBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage === 0) {
      props.navigation.navigate("SignUp");
    }
  };
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
    switch (currentPage) {
      case 0:
        // return <Account />;
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
          </ScrollView>
        );
      case 1:
        // return <AboutYou />;
        return (
          <ScrollView ref={scrollViewRef}>
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
                {ImageName ? (
                  <Image
                    source={{ uri: ImageName.path || ImageName }}
                    style={[AboutYouStyle.logo, { borderRadius: 110 / 2 }]}
                  />
                ) : (
                  <Image
                    source={IMAGES?.userIcons}
                    style={[AboutYouStyle.logo]}
                  />
                )}
              </TouchableOpacity>
              <Text style={AboutYouStyle.want_Heading}>
                {
                  "How would you describe yourself? (you can select multiple options)"
                }
              </Text>
              <FlatList
                data={kodieDescribeYourselfData}
                renderItem={renderItemDescribeYourself}
                keyExtractor={(item) => item.lookup_key.toString()}
                numColumns={2}
              />
              {kodieDescribeYourselfId === 2 ||
              kodieDescribeYourselfId === 4 ? null : (
                <View>
                  <Text style={AboutYouStyle.want_Heading}>
                    {"How many properties do you own, manage or rent?"}
                  </Text>
                  <FlatList
                    data={manage_property_Data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.lookup_key.toString()}
                    numColumns={2}
                  />
                </View>
              )}
              <Text style={AboutYouStyle.want_Heading}>
                {"What do you want to do first with Kodie"}
              </Text>

              <FlatList
                data={kodiehelpData}
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{}}
                keyExtractor={(item) => item?.id}
                renderItem={wantList}
              />

              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
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
                <UploadImageData
                  heading_Text={"Upload image"}
                  ImageName={handleImageNameChange}
                />
              </RBSheet>
            </View>
          </ScrollView>
        );
      case 2:
        // return <FirstProperty />;
        return (
          <ScrollView ref={scrollViewRef}>
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
                      data={bedRoomData}
                      maxHeight={300}
                      labelField="description"
                      valueField="lookup_key"
                      placeholder="3"
                      value={bedroomValue}
                      onChange={(item) => {
                        setbedroomValue(item.lookup_key);
                        handle_key_feature(item.lookup_key);
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
                      data={garagesData}
                      maxHeight={300}
                      labelField="description"
                      valueField="lookup_key"
                      placeholder="1"
                      value={garagesValue}
                      onChange={(item) => {
                        setGaragesValue(item.lookup_key);
                        handle_key_feature(item.lookup_key);
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
                      data={bathroomData}
                      maxHeight={300}
                      labelField="description"
                      valueField="lookup_key"
                      placeholder="3"
                      value={bathRoomValue}
                      onChange={(item) => {
                        setBathRoomValue(item.lookup_key);
                        handle_key_feature(item.lookup_key);
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
                      data={parkingData}
                      maxHeight={300}
                      labelField="description"
                      valueField="lookup_key"
                      placeholder="1"
                      value={parkingValue}
                      onChange={(item) => {
                        setParkingValue(item.lookup_key);
                        handle_key_feature(item.lookup_key);
                      }}
                    />
                  </View>
                </View>

                <View style={FirstPropertyStyle.key_feature_mainView}>
                  <View style={FirstPropertyStyle.key_feature_subView}>
                    <Text style={FirstPropertyStyle.key_feature_Text}>
                      {"Floor size"}
                    </Text>
                    <TextInput
                      style={AccountStyle.flor_input}
                      value={florSize}
                      onChangeText={setFlorSize}
                      placeholder="102m2"
                      placeholderTextColor={_COLORS.Kodie_LightGrayColor}
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
                    placeholder="Select additional features"
                    value={additionalfeatureskeyvalue}
                    search
                    searchPlaceholder="Search..."
                    onChange={(item) => {
                      setAdditionalFeaturesKeyValue(item);
                      // alert(item);
                    }}
                    // renderRightIcon={() => (
                    //   <AntDesign
                    //     style={FirstPropertyStyle.icon}
                    //     color={_COLORS.Kodie_BlackColor}
                    //     name="search1"
                    //     size={20}
                    //   />
                    // )}
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
                  {/* <MultiSelect
                    style={FirstPropertyStyle.dropdown}
                    placeholderStyle={FirstPropertyStyle.placeholderStyle}
                    selectedTextStyle={FirstPropertyStyle.selectedTextStyle}
                    inputSearchStyle={FirstPropertyStyle.inputSearchStyle}
                    iconStyle={FirstPropertyStyle.iconStyle}
                    data={additionalfeatureskey}
                    labelField="PAF_ADDITIONAL_FEATURES_NAME"
                    valueField="PAF_KEY"
                    placeholder="Search"
                    value={additionalfeatureskeyvalue}
                    search
                    searchPlaceholder="Search..."
                    onChange={(item) => {
                      setAdditionalFeaturesKeyValue(item);
                      alert(item);
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
                  /> */}
                </View>
              </View>

              <Text style={FirstPropertyStyle.AutoList_text}>
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
                  setSelectedButtonId(1);
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
                  setSelectedButtonId(2);
                  // alert(selectedButtonId)
                }}
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
        onPressLeftButton={goBack}
      />
      <View style={SignUpStepStyle.container}>
        <View style={SignUpStepStyle.stepIndicator}>
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
                _ButtonText={currentPage == 2 ? "Save" : "Next"}
                Text_Color={_COLORS.Kodie_WhiteColor}
                onPress={() => {
                  handleNextBtn();
                }}
              />
              {currentPage === 1 || currentPage === 2 ? (
                <>
                  <CustomSingleButton
                    _ButtonText={"Fill these details out later"}
                    Text_Color={_COLORS.Kodie_BlackColor}
                    backgroundColor={_COLORS.Kodie_WhiteColor}
                    onPress={() => {
                      if (currentPage === 2) {
                        handleNextBtn();
                      } else {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                  />
                  {/* 
                  <TouchableOpacity style={SignUpStepStyle.goBack_View}>
                    <View style={SignUpStepStyle.backIcon}>
                      <Ionicons
                        name="chevron-back"
                        size={22}
                        color={_COLORS.Kodie_MediumGrayColor}
                      />
                    </View>
                    <Text style={SignUpStepStyle.goBack_Text}>{"Go back"}</Text>
                  </TouchableOpacity> */}
                </>
              ) : null}
              {currentPage === 0 || currentPage === 1 || currentPage === 2 ? (
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
              ) : null}
            </View>
          </View>
        </ScrollView>
        {isLoading ? <CommonLoader /> : null}
      </View>
    </>
  );
};

export default SignUpSteps;
