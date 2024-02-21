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
  Image,
  PermissionsAndroid,
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
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import ServicesBox from "../../components/Molecules/ServicesBox/ServicesBox";
import RowButtons from "../../components/Molecules/RowButtons/RowButtons";
import StepIndicator from "react-native-step-indicator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Config } from "../../Config";
import axios from "axios";
import Geocoder from "react-native-geocoding";
// import Geolocation from "react-native-geolocation-service";
import Geolocation from "@react-native-community/geolocation";
import MapScreen from "../../components/Molecules/GoogleMap/googleMap";
import SearchPlaces from "../../components/Molecules/SearchPlaces/SearchPlaces";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { CommonLoader } from "../../components/Molecules/ActiveLoader/ActiveLoader";
import { useSelector } from "react-redux";
const stepLabels = ["Step 1", "Step 2", "Step 3", "Step 4"];

export default CreateJobFirstScreen = (props) => {
  const [getLat, setGetLat] = useState("");
  const [getLong, setGetLong] = useState("");
  const JobId = props.route.params?.JobId;
  const editMode = props.route.params?.editMode;
  const myJob = props.route.params?.myJob;
  const job_sub_type = props.route.params?.job_sub_type;
  console.log("myJob.......", myJob);
  console.log("editMode.......", editMode);
  console.log("job_sub_type.......", job_sub_type);
  const [currentPage, setCurrentPage] = useState(0);
  const [value, setValue] = useState(null);
  const [aboutyourNeed, setAboutyourNeed] = useState("");
  const [location, setLocation] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [Check, setCheck] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [property_Data, setProperty_Data] = useState([]);
  const [property_value, setProperty_value] = useState([]);
  const [property_valueError, setProperty_valueError] = useState(false);
  const [selectedAddressData, setSelectedAddreeData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [jobPriorityData, setJobPriorityData] = useState([]);
  const [jobPriorityValue, setJobPriorityValue] = useState([]);
  const [jobPriorityValueError, setJobPriorityValueError] = useState(false);

  const [ratingThresholdData, setRatingThresholdData] = useState([]);
  const [ratingThresholdValue, setRatingThresholdValue] = useState([]);
  const [jobTypeData, setJobTypeData] = useState([]);
  const [selectJobType, setSelectJobType] = useState();
  const [selectJobTypeid, setSelectJobTypeid] = useState("");
  const [servicesData, setServicesData] = useState([]);
  const [servicesValue, setservicesValue] = useState([]);
  const [jobDetailsData, setJobDetailsData] = useState([]);

  const [UserCurrentCity, setUserCurrentCity] = useState("");
  const [UserZip_Code, setUserZip_Code] = useState("");
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [arrowIcon , setArrowIcon] = useState(false)
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse.....", loginData);

  // validation.....

  const handleNextbtn = () => {
    if (jobPriorityValue == "") {
      setJobPriorityValueError(true);
    } else if (property_value == "") {
      setProperty_valueError(true);
    } else {
      props.navigation.navigate("CreateJobTermsScreen", {
        selectJobType: selectJobTypeid,
        servicesValue: servicesValue,
        aboutyourNeed: aboutyourNeed,
        jobPriorityValue: jobPriorityValue,
        property_value: property_value,
        location: location || selectedAddress.location,
        ratingThresholdValue: ratingThresholdValue,
        latitude: latitude || selectedAddress.latitude,
        longitude: longitude || selectedAddress.longitude,
        JobId: JobId,
        editMode: editMode,
        myJob: myJob,
      });
    }
  };

  const goBack = () => {
    props.navigation.pop();
    props.navigation.navigate("Jobs", {
      job_sub_type: job_sub_type,
    });
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
    console.log("Region....", JSON.stringify(Region));
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
        // getOneTimeLocation();
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
            // getOneTimeLocation();
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
    console.log("Enter cordinates..");
    Geolocation.watchPosition(
      (position) => {
        // alert("with cordinates..");
        console.log("with cordinates..");
        setGetLat(position.coords.latitude);
        setGetLong(position.coords.longitude);
        // setlatitude(position.coords.latitude);
        console.log("withCordinates latitude....", position.coords.latitude);
        // setlongitude(position.coords.longitude);
        console.log("withCordinates Longitude....", position.coords.longitude);
        // getAddress(position.coords.latitude, position.coords.longitude);
        getAddress(getLat,getLong);
      },
      (error) => {
        alert(error.message.toString());
        console.log("watch cordinates err..", error.message);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  };
  // const getOneTimeLocation = () => {
  //   // setLocationStatus('Getting Location ...');
  //   console.log("Getting Location ...");
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       // setLocationStatus('You are Here');
  //       console.log("You are Here");
  //       alert("you are here")
  //       const currentLongitude = JSON.stringify(position.coords.longitude);
  //       const currentLatitude = JSON.stringify(position.coords.latitude);
  //       // setlatitude(currentLatitude);
  //       // setlongitude(currentLongitude);

  //       // Log the latitude and longitude to check if they are received correctly
  //       console.log("Latitude:", currentLatitude);
  //       console.log("Longitude:", currentLongitude);
  //       setGetLat(position.coords.latitude);
  //       setGetLong(position.coords.longitude)
  //       getAddress(currentLatitude, currentLongitude);
  //     },
  //     (error) => {
  //       // setLocationStatus(error.message);
  //       // Log any error messages
  //       console.error("Location Error!:", error.message);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 30000,
  //       maximumAge: 1000,
  //     }
  //   );
  // };
  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then((json) => {
        console.log("json location.......", json);
        console.log("current address...", json.results[0].formatted_address);
        setLocation(json.results[0].formatted_address);
        // getAddressWithCordinates();
        // checkpermissionlocation();
        // getOneTimeLocation();
        getAddressWithCordinates();
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
        console.log("addressComponent2.....", addressComponent2);
        setUserCurrentCity(addressComponent2.long_name);
        setUserZip_Code(json.results[1]?.address_components[6]?.long_name);
        setLocation(MainFullAddress);
        console.log("mainFullAddress....", MainFullAddress);
        //setAddress(MainFullAddress);
      })
      .catch((error) => console.warn(error));
  };
  const handleBoxPress = (lookup_key) => {
    setIsClick(lookup_key);
    setSelectJobTypeid(lookup_key);
    // alert(selectJobTypeid);
    // alert(isClick)
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
    Selected_Address_Type();
    handleJob_priority();
    handleRatingThreshold();
    handleJobType();
    getJobDetails();
    if (selectJobType !== null) {
      handleServices(selectJobType);
    }
    Geocoder.init("AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw", {
      language: "en",
    });
    // CheckIOSMapPermission();
    setservicesValue("");
    setAboutyourNeed("");
    setJobPriorityValue("");
    setProperty_value("");
    setLocation("");
    setSelectedAddress("");
    setRatingThresholdValue("");

    // map...
    Platform.OS == "ios" ? CheckIOSMapPermission() : checkpermissionlocation();
  }, [selectJobType]);
  const Selected_Time_render = (item) => {
    const isSelected =
      item.longitude === selectedAddress.longitude &&
      item.latitude === selectedAddress.latitude;

    return (
      <View contentContainerStyle={{ flex: 1, height: "100%" }}>
        <View
          style={[
            CreateJobFirstStyle.itemView,
            {
              backgroundColor: isSelected
                ? _COLORS.Kodie_MidLightGreenColor
                : null,
            },
          ]}
        >
          {isSelected ? (
            <AntDesign
              color={_COLORS.Kodie_GreenColor}
              name={"checkcircle"}
              size={20}
            />
          ) : (
            <Fontisto
              color={_COLORS.Kodie_GrayColor}
              name={"radio-btn-passive"}
              size={20}
            />
          )}
          <Text style={CreateJobFirstStyle.textItem}>{item.location}</Text>
        </View>
      </View>
    );
  };

  const jobPriority_render = (item) => {
    return (
      <View contentContainerStyle={{ flex: 1, height: "100%" }}>
        <View
          style={[
            CreateJobFirstStyle.itemView,
            {
              backgroundColor:
                item.lookup_key === jobPriorityValue
                  ? _COLORS.Kodie_MidLightGreenColor
                  : null,
            },
          ]}
        >
          {item.lookup_key === jobPriorityValue ? (
            <AntDesign
              color={_COLORS.Kodie_GreenColor}
              name={"checkcircle"}
              size={20}
            />
          ) : (
            <Fontisto
              color={_COLORS.Kodie_GrayColor}
              name={"radio-btn-passive"}
              size={20}
            />
          )}
          <Text style={CreateJobFirstStyle.textItem}>
            {item.lookup_description}
          </Text>
        </View>
      </View>
    );
  };
  const property_Type_render = (item) => {
    return (
      <View contentContainerStyle={{ flex: 1, height: "100%" }}>
        <View
          style={[
            CreateJobFirstStyle.itemView,
            {
              backgroundColor:
                item.lookup_key === property_value
                  ? _COLORS.Kodie_MidLightGreenColor
                  : null,
            },
          ]}
        >
          {item.lookup_key === property_value ? (
            <AntDesign
              color={_COLORS.Kodie_GreenColor}
              name={"checkcircle"}
              size={20}
            />
          ) : (
            <Fontisto
              color={_COLORS.Kodie_GrayColor}
              name={"radio-btn-passive"}
              size={20}
            />
          )}
          <Text style={CreateJobFirstStyle.textItem}>
            {item.lookup_description}
          </Text>
        </View>
      </View>
    );
  };
  const lookingServices_render = (item) => {
    setArrowIcon
    return (
      <View contentContainerStyle={{ flex: 1, height: "100%" }}>
        <View
          style={[
            CreateJobFirstStyle.itemView,
            {
              backgroundColor:
                item.lookup_key === servicesValue
                  ? _COLORS.Kodie_MidLightGreenColor
                  : null,
            },
          ]}
        >
          {item.lookup_key === servicesValue ? (
            <AntDesign
              color={_COLORS.Kodie_GreenColor}
              name={"checkcircle"}
              size={20}
            />
          ) : (
            <Fontisto
              color={_COLORS.Kodie_GrayColor}
              name={"radio-btn-passive"}
              size={20}
            />
          )}
          <Text style={CreateJobFirstStyle.textItem}>
            {item.lookup_description}
          </Text>
        </View>
      </View>
    );
  };
  const ratingThreshold_render = (item) => {
    return (
      <View contentContainerStyle={{ flex: 1, height: "100%" }}>
        <View
          style={[
            CreateJobFirstStyle.itemView,
            {
              backgroundColor:
                item.lookup_key === ratingThresholdValue
                  ? _COLORS.Kodie_MidLightGreenColor
                  : null,
            },
          ]}
        >
          {item.lookup_key === ratingThresholdValue ? (
            <AntDesign
              color={_COLORS.Kodie_GreenColor}
              name={"checkcircle"}
              size={20}
            />
          ) : (
            <Fontisto
              color={_COLORS.Kodie_GrayColor}
              name={"radio-btn-passive"}
              size={20}
            />
          )}
          <AntDesign
            style={CreateJobFirstStyle.starIcon}
            color={_COLORS.Kodie_lightGreenColor}
            name="star"
            size={20}
          />
          <Text style={CreateJobFirstStyle.textItem}>
            {item.lookup_description}
          </Text>
        </View>
      </View>
    );
  };
  const jobType_render = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <ServicesBox
          images
          Services_Name={item.lookup_description}
          // Services_Icon={item.lookup_key ? IMAGES.cleaner : IMAGES.lightCleaner}
          Services_Icon={
            item.lookup_key === 166
              ? "cleaning-services"
              : item.lookup_key === 167
              ? "mower-bag"
              : item.lookup_key === 168
              ? "forklift"
              : item.lookup_key === 169
              ? "tools"
              : "MaterialIcons"
          }
          iconLibrary={
            item.lookup_key === 166
              ? "MaterialIcons"
              : item.lookup_key === 167
              ? "MaterialCommunityIcons"
              : item.lookup_key === 168
              ? "MaterialCommunityIcons"
              : item.lookup_key === 169
              ? "Entypo"
              : "MaterialIcons"
          }
          iconColor={
            isClick === item.lookup_key
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_GrayColor
          }
          BoxStyling={[
            CreateJobFirstStyle.box_style,
            {
              backgroundColor:
                isClick === item.lookup_key
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          textColor={[
            CreateJobFirstStyle.box_Text_Style,
            {
              color:
                isClick === item.lookup_key
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor,
            },
          ]}
          // onPress={() => setIsClick(!isClick)}
          onPress={() => {
            handleBoxPress(item.lookup_key);
            setSelectJobType(item.lookup_key);
            // alert(item.lookup_key);
          }}
        />
      </View>
    );
  };
  console.log(selectedAddress.latitude, "jkhujsdgfhdgsfildsgfliuesfgdsjg");
  // api intrigation.......
  const Selected_Address_Type = () => {
    const Selected_Address = {
      account_id: loginData?.Login_details?.user_account_id,
    };
    const url = Config.BASE_URL;
    const Selected_AddressType = url + "get_property_details_my_acc_id";
    console.log("Request URL:", Selected_AddressType);
    setIsLoading(true);
    axios
      .post(Selected_AddressType, Selected_Address)
      .then((response) => {
        console.log("Selected_Address", response.data);
        if (response.data.success === true) {
          setIsLoading(false);
          console.log("Selected_Address....", response.data.property_details);
          setSelectedAddreeData(response.data.property_details);
        } else {
          console.error("Selected_Address_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Selected_Address error:", error);
        // alert(error);
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
        console.log("Job_priority", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("Job_priorityData....", response.data.lookup_details);
          setJobPriorityData(response.data.lookup_details);
        } else {
          console.error("Job_priority_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Job_priority error:", error);
        alert(error);
        setIsLoading(false);
      });
  };
  const handleRatingThreshold = () => {
    const propertyData = {
      P_PARENT_CODE: "RATING_THRESHOLD",
      P_TYPE: "OPTION",
    };
    const url = Config.BASE_URL;
    const propertyType = url + "lookup_details";
    console.log("Request URL:", propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then((response) => {
        console.log("RatingThreshold...", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("RatingThresholdData....", response.data.lookup_details);
          setRatingThresholdData(response.data.lookup_details);
        } else {
          console.error("RatingThreshold_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("RatingThreshold error:", error);
        alert(error);
        setIsLoading(false);
      });
  };
  const handleJobType = () => {
    const propertyData = {
      P_PARENT_CODE: "JOB_TYPE",
      P_TYPE: "OPTION",
    };
    const url = Config.BASE_URL;
    const propertyType = url + "lookup_details";
    console.log("Request URL:", propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then((response) => {
        console.log("JobType...", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("JobTypeData....", response.data.lookup_details);
          setJobTypeData(response.data.lookup_details);
        } else {
          console.error("JobType_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("JobType error:", error);
        alert(error);
        setIsLoading(false);
      });
  };
  const handleServices = (selectJobType) => {
    const propertyData = {
      P_PARENT_CODE:
        selectJobType === 166
          ? "HOME_CLEANING"
          : selectJobType === 167
          ? "OUTDOOR_CLEANING"
          : selectJobType === 168
          ? "HEAVY_LIFTING"
          : selectJobType === 169
          ? "FIXING_AND_MAINTENANCE"
          : null,
      P_TYPE: "OPTION",
    };
    const url = Config.BASE_URL;
    const propertyType = url + "lookup_details";
    console.log("Request URL:", propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then((response) => {
        console.log("ServicesType...", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("ServicesTypeData....", response.data.lookup_details);
          setServicesData(response.data.lookup_details);
        } else {
          console.error("Services_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Services error:", error);
        // alert(error);
        setIsLoading(false);
      });
  };
  // EditMode ..................
  const getJobDetails = () => {
    const url = Config.BASE_URL;
    const jobDetails_url = url + "job/get";
    console.log("Request URL:", jobDetails_url);
    setIsLoading(true);
    const jobDetails_Data = {
      jm_job_id: JobId,
    };
    axios
      .post(jobDetails_url, jobDetails_Data)
      .then((response) => {
        console.log("API Response JobDetails:", response.data);
        if (response.data.success === true) {
          setJobDetailsData(response.data.data);
          console.log("jobDetailsData....", response.data.data);
          // setSelectJobTypeid(response.data.data.job_type_key);
          // alert(response.data.data.job_type_key);
          setIsClick(parseInt(response.data.data.job_type_key));
          setAboutyourNeed(response.data.data.job_description);
          setservicesValue(
            parseInt(response.data.data?.job_service_you_looking_key)
          );
          setJobPriorityValue(parseInt(response.data.data?.job_priority_key));
          setProperty_value(parseInt(response.data.data?.property_type_key));
          setLocation(response.data.data?.job_location);
          setRatingThresholdValue(parseInt(response.data.data?.job_rating_key));
          setlatitude(response.data.data?.location_latitude);
          setlongitude(response.data.data?.location_longitude);
          handleServices(response.data.data.job_type_key);
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
  return (
    <View style={CreateJobFirstStyle.container}>
      <TopHeader
        isprofileImage
        IsNotification
        onPressLeftButton={() => {
          IsMap ? setIsMap(false) : IsSearch ? setIsSearch(false) : goBack();
        }}
        MiddleText={
          IsMap || IsSearch
            ? "Location"
            : editMode
            ? "Edit job"
            : "Create new job request"
        }
      />
      {IsMap || IsSearch ? null : (
        <View style={{ marginVertical: 10 }}>
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
            // Maplat={latitude}
            // Maplng={longitude}
            Maplat={getLat}
            Maplng={getLong}
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
            style={CreateJobFirstStyle.BtnContainer}
            onPress={ConfirmAddress}
          >
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
            setLocation(details.formatted_address);
          }}
        />
      ) : (
        <ScrollView>
          <View style={CreateJobFirstStyle.mainView}>
            <Text style={CreateJobFirstStyle.heading}>{"Job details"}</Text>
            <Text style={CreateJobFirstStyle.servicestext}>
              {"Select the type of job you need:"}
            </Text>
          </View>

          <FlatList
            data={jobTypeData}
            keyExtractor={(item) => item.lookup_key.toString()}
            renderItem={jobType_render}
            numColumns={2}
          />
          <View style={CreateJobFirstStyle.formContainer}>
            <View style={{ flex: 1 }}>
              <Text style={LABEL_STYLES.commontext}>
                {"What service are you looking for?"}
              </Text>
              <Dropdown
                style={[
                  CreateJobFirstStyle.dropdown,
                  {
                    backgroundColor: isClick
                      ? null
                      : _COLORS.Kodie_LightGrayLineColor,
                  },
                ]}
                placeholderStyle={CreateJobFirstStyle.placeholderStyle}
                selectedTextStyle={CreateJobFirstStyle.selectedTextStyle}
                inputSearchStyle={CreateJobFirstStyle.inputSearchStyle}
                iconStyle={CreateJobFirstStyle.iconStyle}
                data={servicesData}
                search
                maxHeight={300}
                labelField="lookup_description"
                valueField="lookup_key"
                placeholder="Select item"
                value={servicesValue}
                disable={isClick ? false : true}
                searchPlaceholder="Search..."
                onChange={(item) => {
                  setservicesValue(item.lookup_key);
                  // alert(item.lookup_key)
                }}
                renderItem={lookingServices_render}
                // renderRightIcon={() => (
                //   <AntDesign
                //     // name={dropdownIcon ? "down" : "up"}
                //     // name="down"
                //     name={arrowIcon ? "up" : "down"} 
                //     size={20}
                //   />
                // )}
              />
            </View>
            <View style={CreateJobFirstStyle.jobDetailsView}>
              <Text style={LABEL_STYLES.commontext}>
                {"Tell us more about your needs:"}
              </Text>
              <TextInput
                style={[CreateJobFirstStyle.input, CreateJobFirstStyle.jobD_]}
                value={aboutyourNeed}
                onChangeText={setAboutyourNeed}
                placeholder="Describe the job you need help with..."
                placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                multiline
                maxLength={150}
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
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={jobPriorityValue}
                onChange={(item) => {
                  setJobPriorityValue(item.lookup_key);
                  // alert(item.lookup_key)
                  setJobPriorityValueError(false);
                }}
                renderItem={jobPriority_render}
              />
            </View>
            {jobPriorityValueError ? (
              <Text style={CreateJobFirstStyle.error_text}>
                {"Job priority is require."}
              </Text>
            ) : null}
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
                placeholder="Select property type"
                searchPlaceholder="Search..."
                value={property_value}
                onChange={(item) => {
                  setProperty_value(item.lookup_key);
                  setProperty_valueError(false);
                }}
                renderItem={property_Type_render}
              />
            </View>
            {property_valueError ? (
              <Text style={CreateJobFirstStyle.error_text}>
                {"Property type is require."}
              </Text>
            ) : null}
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
                data={selectedAddressData}
                search
                maxHeight={300}
                labelField="location"
                valueField="longitude"
                placeholder="Select property"
                searchPlaceholder="Search..."
                value={selectedAddress}
                onChange={(item) => {
                  setSelectedAddress({
                    latitude: item.latitude,
                    longitude: item.longitude,
                    location: item.location,
                  });
                }}
                renderItem={Selected_Time_render}
              />
            </View>
            {!selectedAddress ? (
              <View style={CreateJobFirstStyle.locationContainer}>
                <TextInput
                  style={CreateJobFirstStyle.locationInput}
                  value={location}
                  onChangeText={setLocation}
                  onFocus={() => {
                    setIsSearch(true);
                  }}
                  // editable={false}
                  placeholder="Enter new location"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
                <TouchableOpacity
                  style={CreateJobFirstStyle.locationIconView}
                  onPress={() => {
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
                    style={CreateJobFirstStyle.locationIcon}
                  />
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={CreateJobFirstStyle.jobDetailsView}>
              <Text style={LABEL_STYLES.commontext}>{"Rating threshold"}</Text>
              <Dropdown
                style={CreateJobFirstStyle.dropdown}
                placeholderStyle={CreateJobFirstStyle.placeholderStyle}
                selectedTextStyle={CreateJobFirstStyle.selectedTextStyle}
                inputSearchStyle={CreateJobFirstStyle.inputSearchStyle}
                iconStyle={CreateJobFirstStyle.iconStyle}
                data={ratingThresholdData}
                search
                maxHeight={300}
                labelField="lookup_description"
                valueField="lookup_key"
                placeholder="1 star and above"
                searchPlaceholder="Search..."
                value={ratingThresholdValue}
                onChange={(item) => {
                  setRatingThresholdValue(item.lookup_key);
                  // alert(item.lookup_key);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={CreateJobFirstStyle.starIcon}
                    color={_COLORS.Kodie_lightGreenColor}
                    name="star"
                    size={20}
                  />
                )}
                renderItem={ratingThreshold_render}
              />
            </View>
            <CustomSingleButton
              disabled={isLoading ? true : false}
              onPress={() => {
                handleNextbtn();
              }}
              _ButtonText={"Next"}
              Text_Color={_COLORS.Kodie_WhiteColor}
            />
            <TouchableOpacity
              style={CreateJobFirstStyle.goBack_View}
              onPress={() => {
                goBack();
              }}
            >
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
      )}
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
