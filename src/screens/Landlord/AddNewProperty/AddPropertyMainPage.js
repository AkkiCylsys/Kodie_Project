import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import PropertyDetails from "./PropertyDetails/PropertyDetails";
import PropertyFeature from "./PropertyFeature/PropertyFeature";
import PropertyImages from "./PropertyImages/PropertyImages";
import PropertyReview from "./PropertyReview/PropertyReview";
import { _COLORS, LABEL_STYLES, BANNERS, IMAGES } from "../../../Themes";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { SignUpStepStyle } from "../../Authentication/SignUpScreen/SignUpSteps/SignUpStepsStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { PropertyDetailsStyle } from "./PropertyDetails/PropertyDetailsStyle";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import CustomDropdown from "../../../components/Molecules/CustomDropdown/CustomDropdown";
import { Config } from "../../../Config";
import axios from "axios";
import UploadImageBoxes from "../../../components/Molecules/UploadImageBoxes/UploadImageBoxes";
import { FirstPropertyStyle } from "../../Authentication/SignUpScreen/FirstProperty/FirstPropertyStyle";
import { PropertyFeatureStyle } from "./PropertyFeature/PropertyFeatureStyle";
import { AccountStyle } from "../../Authentication/SignUpScreen/Account/AccountStyle";
import { SliderBox } from "react-native-image-slider-box";
import { PropertyImagesStyle } from "./PropertyImages/PropertyImagesStyle";
import RBSheet from "react-native-raw-bottom-sheet";
import UploadMultipleImage from "../../../components/Molecules/UploadImage/UploadMultipleImage";
import { Image } from "react-native";
import { AboutYouStyle } from "../../Authentication/SignUpScreen/AboutYou/AboutYouStyle";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { PropertyReviewStyle } from "./PropertyReview/PropertyReviewStyle";

import ImagePicker from "react-native-image-crop-picker";
import Video from "react-native-video";
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";
import { DetailsStyle } from "./PropertyReview/Details/DetailsStyles";
// ..
import Geocoder from "react-native-geocoding";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import SearchPlaces from "../../../components/Molecules/SearchPlaces/SearchPlaces";
import MapScreen from "../../../components/Molecules/GoogleMap/googleMap";
const stepLabels = ["Step 1", "Step 2", "Step 3", "Step 4"];

const Detail = [
  {
    id: "1",
    images: IMAGES.BedroomIcon,
    name: "Bedrooms: 3",
  },
  {
    id: "2",
    images: IMAGES.Bathroom,
    name: "Bathrooms: 2",
  },
  {
    id: "3",
    images: IMAGES.Parking,
    name: "Garages: 1",
  },
  {
    id: "4",
    images: IMAGES.BedroomIcon,
    name: "Parkings: 1",
  },
  {
    id: "5",
    images: IMAGES.BedroomIcon,
    name: "Garden",
  },
  {
    id: "6",
    images: IMAGES.BedroomIcon,
    name: "Pool",
  },
  {
    id: "7",
    images: IMAGES.BedroomIcon,
    name: "Furnished",
  },
  {
    id: "8",
    images: IMAGES.BedroomIcon,
    name: "WiFi",
  },
];
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
const images = [
  BANNERS.Apartment,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];
const AddPropertyMainPage = (props) => {
  const propertyid = props?.route?.params?.propertyid;
  console.log("propertyid....", propertyid);
  const [currentPage, setCurrentPage] = useState(0);
  const [location, setLocation] = useState("");
  const [value, setValue] = useState(null);
  const [propertyDesc, setPropertyDesc] = useState("");
  const [tabValue, setTabValue] = useState("");

  // add api state to here
  const [isLoading, setIsLoading] = useState(false);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  const [property_Data, setProperty_Data] = useState([]);
  const [property_Detail, setProperty_Details] = useState([]);
  const [updateProperty_Details, setupdateProperty_Details] = useState([]);
  const [property_Data_id, setProperty_Data_id] = useState({});
  const [property_value, setProperty_value] = useState([]);
  const [property_name, setPropertyName] = useState([]);
  const [selectedkey_features, setSelectedkey_features] = useState([]);
  const [selectedButton, setSelectedButton] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState(0);
  const [bedroomValue, setbedroomValue] = useState([]);
  const [garagesValue, setGaragesValue] = useState([]);
  const [bathRoomValue, setBathRoomValue] = useState([]);
  const [parkingValue, setParkingValue] = useState([]);
  const [bedRoomData, setBedRoomData] = useState([]);
  const [garagesData, setGaragesData] = useState([]);
  const [bathroomData, setBathroomData] = useState([]);
  const [parkingData, setParkingData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedButton1, setSelectedButton1] = useState(false);
  const [selectedButtonId1, setSelectedButtonId1] = useState(0);
  const [selectedButtonDeposit, setSelectedButtonDeposit] = useState(false);
  const [selectedButtonDepositId, setSelectedButtonDepositId] = useState(0);
  const [selectedButtonFurnished, setSelectedButtonFurnished] = useState(false);
  const [selectedButtonFurnishedId, setSelectedButtonFurnishedId] = useState(0);
  const [florSize, setFlorSize] = useState("");
  const [additionalfeatureskeyvalue, setAdditionalFeaturesKeyValue] = useState(
    []
  );
  const [additionalfeatureskey, setAdditionalfeatureskey] = useState([]);
  const [data_add, setData_add] = useState([]);
  const [MultiImageName, setMultiImageName] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [UserCurrentCity, setUserCurrentCity] = useState("");
  const [UserZip_Code, setUserZip_Code] = useState("");
  // key_features count state code here------
  const [CountBedroom, setCountBedroom] = useState(1);
  // const [CountBedRoomData, setCountBedRoomData] = useState([]);
  const [CountBathroom, setCountBathroom] = useState(1);
  const [CountParking, setCountParking] = useState(1);
  const [CountParkingStreet, setCountParkingStreet] = useState(1);
  const [buildingFlorSize, setBuildingFlorSize] = useState("");
  const [landArea, setLandArea] = useState("");

  const AllCountsData = [
    CountBedroom,
    CountBathroom,
    CountParking,
    CountParkingStreet,
  ];
  // key_features count for Bedroom code here------
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

  // key_features count for Parking code here------
  const increaseParkingCount = () => {
    setCountParking((prevCount) => prevCount + 1);
  };
  const decreaseParkingCount = () => {
    if (CountParking > 0) {
      setCountParking((prevCount) => prevCount - 1);
    }
  };

  // key_features count for Parking code here------
  const increaseParkingStreetCount = () => {
    setCountParkingStreet((prevCount) => prevCount + 1);
  };
  const decreaseParkingStreetCount = () => {
    if (CountParkingStreet > 0) {
      setCountParkingStreet((prevCount) => prevCount - 1);
    }
  };

  console.log("property_Detail", property_Detail);
  // ...
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
        setLocation(MainFullAddress);
        console.log("location....", location);
        //setAddress(MainFullAddress);
      })
      .catch((error) => console.warn(error));
  };

  const openVideoPicker = () => {
    ImagePicker.openPicker({
      mediaType: "video",
      multiple: true,
    })
      .then((videos) => {
        setSelectedVideos([...selectedVideos, ...videos]);
      })
      .catch((error) => {
        console.error("Error selecting videos:", error);
      });
  };

  const refRBSheet = useRef();

  const handleImageNameChange = (multipleImages) => {
    // const imageSizeLimit = 2 * 1024 * 1024; // 2 MB in bytes

    // const imagesWithinSizeLimit = multipleImages.filter(
    //   (image) => image.size <= imageSizeLimit
    // );

    // if (imagesWithinSizeLimit.length === multipleImages.length) {
    //   setMultiImageName(multipleImages);
    //   refRBSheet.current.close();
    // } else {
    //   Alert.alert("Warning", "Image size should not exceed 2 MB.");
    // }
    setMultiImageName(multipleImages);
    console.log("................ImageNAme", multipleImages);
    console.log("................ImageNAme", multipleImages.path);
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
          // alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("bedRoom_data error:", error);
        // alert(error);
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
          // alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("garages_Data error:", error);
        // alert(error);
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
          // alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("bathroom_Data error:", error);
        // alert(error);
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
          // alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("additional_features error:", error);
        // alert(error);
        setIsLoading(false);
      });
  };
  //  go back button...............
  const goBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage === 0) {
      props.navigation.navigate("Properties");
    }
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
          // alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("parking_Data error:", error);
        // alert(error);
        setIsLoading(false);
      });
  };
  // handle property details api start to here
  const property_details = () => {
    // const selectedKeyFeature = selectedKeyFeature.join(",");
    console.log(AllCountsData);
    const url = Config.API_URL;
    const additionalApi = url + "add_property_details";
    console.log("Request URL:", additionalApi);
    setIsLoading(true);
    axios
      .post(additionalApi, {
        user: 35,
        user_account_details_id: 84,
        location: location,
        location_longitude: "102.201.123",
        location_latitude: "104.402.210",
        islocation: 1,
        property_description: propertyDesc,
        property_type: property_value,
        key_features: AllCountsData,
        additional_features: "12",
        additional_key_features: additionalfeatureskeyvalue,
        autolist: selectedButtonId,
      })
      .then((response) => {
        console.log("property_details", response?.data);
        if (response.data.status === true) {
          setIsLoading(false);
          setProperty_Data_id(response?.data?.property_id);

          console.log(
            "response?.data?.property_id",
            response?.data?.property_id
          );

          // setCurrentPage(currentPage + 1);
          // props.navigation.navigate("PropertyFeature");
          console.log("property_details....", response.data);
          console.log(
            location,
            propertyDesc,
            propertyTypeData,
            selectedKeyFeature,
            additionalfeatureskeyvalue
          );
        } else {
          console.error("property_details_error:", response.data.error);
          // alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("property_details error:", error);
        // alert(error);
        setIsLoading(false);
      });
  };
  console.log("harshita", property_Data_id);
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
          setProperty_value(property_Detail[0]?.property_type_id);
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
  const DetailsData = () => {
    const detailData = {
      user: propertyid ? propertyid : property_Data_id,
    };
    console.log("detailData", detailData);
    const url = Config.API_URL;
    const property_Detailss = url + "get_All_Property_details";
    console.log("Request URL:", property_Detailss);
    setIsLoading(true);
    axios
      .post(property_Detailss, detailData)
      .then((response) => {
        console.log("propertyDetail", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log("propertyDetail....", response.data.property_details);
          setProperty_Details(response.data.property_details);
          setLocation(response.data.property_details[0].location);
          setProperty_value(response.data.property_details[0].property_type_id);
          setPropertyDesc(
            response.data.property_details[0].property_description
          );
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
  const updatePropertyDetails = () => {
    const selectedKeyFeature = selectedkey_features.join(",");
    const updateData = {
      user: 35,
      user_account_details_id: 84,
      location: location,
      location_longitude: "102.201.123",
      location_latitude: "104.402.210",
      islocation: 1,
      property_description: propertyDesc,
      property_type: property_value,
      key_features: selectedKeyFeature,
      additional_features: "12",
      additional_key_features: additionalfeatureskeyvalue,
      autolist: selectedButtonId,
      property_id: propertyid,
    };
    console.log("updateData", updateData);
    const url = Config.API_URL;
    const update_property_details = url + "update_property_details";
    console.log("Request URL:", update_property_details);
    setIsLoading(true);
    axios
      .put(update_property_details, updateData)
      .then((response) => {
        console.log("update_property_details", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log(
            "update_property_details....",
            response.data.property_details
          );
          setupdateProperty_Details(response.data.property_details);
        } else {
          console.error("update_property_detailserror:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("update_property_details error:", error);
        // alert(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleProperty_Type();
    handle_bedRoom();
    handle_Garages();
    handle_Bathroom();
    handle_parking();
    additional_features();

    property_details();
    DetailsData();
    Geocoder.init("AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw", {
      language: "en",
    });
    setLocation(property_Detail?.location);
  }, []);
  const checkTabs = () => {
    switch (tabValue) {
      case "Details":
        return (
          <Details
            AddProperty={() => {
              props.navigation.navigate("NewInspection");
            }}
          />
        );
      case "Leases":
        return <Leases />;
      case "Expenses":
        return <Expenses />;
      case "Documents":
        return <Documents />;
      default:
        return <Details />;
    }
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
  const handleNextBtn = () => {
    if (currentPage == 0) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage == 1) {
      if (propertyid) {
        updatePropertyDetails();
      } else {
        property_details();
      }
      setCurrentPage(currentPage + 1);
    } else if (currentPage == 2) {
      if (propertyid) {
        handleSaveUpdateImage();
        console.log("count data............", AllCountsData);
        alert(AllCountsData);
      } else {
        handleSaveImage();
      }
      setCurrentPage(currentPage + 1);
    } else if (currentPage == 3) {
      props.navigation.navigate("DrawerNavigatorLeftMenu");
      // handleSaveImage();
    } else {
      null;
    }
  };
  const renderDataItem = (item) => {
    return (
      <View style={PropertyFeatureStyle.item}>
        <Text style={PropertyFeatureStyle.selectedTextStyle}>{item.label}</Text>
        {/* <AntDesign
          style={PropertyFeatureStyle.icon}
          color={_COLORS.Kodie_BlackColor}
          name="check"
          size={20}
        /> */}
      </View>
    );
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
  const Detail_rander = ({ item, index }) => {
    return (
      <>
        <View style={DetailsStyle.DetailsView}>
          <Image source={item.images} style={DetailsStyle.DetailsIcon} />
          <Text style={DetailsStyle.details_text}>{item.name}</Text>
        </View>
      </>
    );
  };
  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  const handleSaveImage = async () => {
    const formData = new FormData();
    formData.append("user", property_Data_id);
    console.log("kljproperty_Data_id", property_Data_id);
    const imagePaths = MultiImageName.map((image) => image.path);

    // Append all image paths to the same key 'images[]'
    imagePaths.forEach((path, index) => {
      formData.append(
        "images[]",
        {
          uri: path,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        },
        path
      );
    });
    // Append videos
    if (selectedVideos && selectedVideos.length > 0) {
      selectedVideos.forEach((videoUri, index) => {
        if (typeof videoUri === "string") {
          const videoName = videoUri.substring(videoUri.lastIndexOf("/") + 1);
          formData.append(`media[]`, {
            uri: videoUri,
            name: videoName,
            type: "video/mp4", // Set the appropriate video type
          });
        } else {
          console.error(`Invalid video URI at index ${index}: ${videoUri}`);
        }
      });
    }
    console.log("formData", formData);
    const url = Config.API_URL;
    const saveAccountDetails = url + "add_property_images";
    console.log("Request URL:", saveAccountDetails);
    setIsLoading(true);

    try {
      const response = await axios.post(saveAccountDetails, formData, {
        headers: {
          "content-type": "multipart/form-data",

          // 'Content-Type': 'text/plain'
        },
      });

      console.log("Save Account Details", response.data);

      if (response.data.status === true) {
        setIsLoading(false);
        MultiImageName ? refRBSheet.current.close() : null;
        // alert(response.data.message);
        // props.navigation.navigate("DrawerNavigatorLeftMenu");
        // setCurrentPage(0);
      } else {
        console.error("Save Account Details error:", response.data.error);
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Account_Details error:", error);
      // alert(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSaveUpdateImage = async () => {
    refRBSheet.current.close();
    const formData = new FormData();
    formData.append("user", property_Data_id || propertyid);
    console.log("kljproperty_Data_id", property_Data_id);
    const imagePaths = MultiImageName.map((image) => image.path);

    // Append all image paths to the same key 'images[]'
    imagePaths.forEach((path, index) => {
      formData.append(
        "images[]",
        {
          uri: path,
          name: `image.jpg`,
          type: "image/jpeg",
        },
        path
      );
    });
    // Append videos
    if (selectedVideos && selectedVideos.length > 0) {
      selectedVideos.forEach((videoUri, index) => {
        if (typeof videoUri === "string") {
          const videoName = videoUri.substring(videoUri.lastIndexOf("/") + 1);
          formData.append(`media[]`, {
            uri: videoUri,
            name: videoName,
            type: "video/mp4", // Set the appropriate video type
          });
        } else {
          console.error(`Invalid video URI at index ${index}: ${videoUri}`);
        }
      });
    }
    console.log("formData", formData);
    const url = Config.API_URL;
    const saveAccountDetails = url + "add_property_images";
    console.log("Request URL:", saveAccountDetails);
    setIsLoading(true);

    try {
      const response = await axios.post(saveAccountDetails, formData, {
        headers: {
          "content-type": "multipart/form-data",

          // 'Content-Type': 'text/plain'
        },
      });

      console.log("Save Account Details", response.data);

      if (response.data.status === true) {
        setIsLoading(false);
        // alert(response.data.message);
        // props.navigation.navigate("DrawerNavigatorLeftMenu");
        // setCurrentPage(0);
      } else {
        console.error("Save Account Details error:", response.data.error);
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Account_Details error:", error);
      // alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const imagePaths = MultiImageName.map((image) => image.path);
  const renderPageContent = () => {
    // const shortAddress = property_Detail[0]?.location;
    // const [name, state, country] = property_Detail[0]?.location.split(", ");
    switch (currentPage) {
      case 0:
        // return <PropertyDetails />;
        return (
          <View style={PropertyDetailsStyle.mainContainer}>
            <View style={PropertyDetailsStyle.headingView}>
              <Text style={PropertyDetailsStyle.heading}>
                {"Property details"}
              </Text>
            </View>

            <View style={PropertyDetailsStyle.card}>
              <View style={PropertyDetailsStyle.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>Location</Text>
                <View style={PropertyDetailsStyle.locationContainer}>
                  <TouchableOpacity
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
                      size={20}
                      color={_COLORS.Kodie_MediumGrayColor}
                      style={PropertyDetailsStyle.locationIcon}
                    />
                  </TouchableOpacity>

                  <TextInput
                    style={PropertyDetailsStyle.locationInput}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Search location"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  />
                </View>
                {/* <Dropdown
                  style={PropertyDetailsStyle.dropdown}
                  placeholderStyle={PropertyDetailsStyle.placeholderStyle}
                  selectedTextStyle={PropertyDetailsStyle.selectedTextStyle}
                  inputSearchStyle={PropertyDetailsStyle.inputSearchStyle}
                  iconStyle={PropertyDetailsStyle.iconStyle}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Enter address manually"
                  value={value}
                  onChange={(item) => {
                    setValue(item.value);
                  }}
                /> */}
              </View>
              <View style={PropertyDetailsStyle.inputContainer}>
                <Text style={PropertyDetailsStyle.property_Text}>
                  Property type
                </Text>
                {/* <CustomDropdown
                  btnview={true}
                  placeholdertext={"Apartment"}
                  data={property_value}
                /> */}
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
                  labelField="description"
                  valueField="lookup_key"
                  placeholder="Select property type"
                  value={
                    property_Detail[0]?.property_type
                      ? property_Detail[0]?.property_type
                      : property_value
                  }
                  onChange={(item) => {
                    setProperty_value(item.lookup_key);
                    setPropertyName(item.description);
                    // alert(item.lookup_key)
                  }}
                />
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
          </View>
        );
      case 1:
        // return <PropertyFeature />;
        return (
          <View style={PropertyFeatureStyle.mainContainer}>
            <View style={PropertyFeatureStyle.headingView}>
              <Text style={PropertyFeatureStyle.heading}>
                {"Property features"}
              </Text>
            </View>
            <ScrollView>
              <View style={PropertyFeatureStyle.card}>
                <View style={PropertyFeatureStyle.inputContainer}>
                  <Text style={LABEL_STYLES._texinputLabel}>Key features</Text>
                  {/* <View style={FirstPropertyStyle.key_feature_mainView}>
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
                          const dataToSend = { 29: item.lookup_key };

                          // Send the data wherever you need it
                          console.log(dataToSend);

                          // If you want to show it as an alert
                          // alert(JSON.stringify(dataToSend));
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
                  </View> */}
                  {/* <View style={FirstPropertyStyle.key_feature_mainView}>
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
                  </View> */}

                  {/* new code start here -----------*/}
                  <View>
                    <View style={FirstPropertyStyle.mainfeaturesview}>
                      <View style={FirstPropertyStyle.key_feature_Text_view}>
                        <Text style={FirstPropertyStyle.key_feature_Text}>
                          {"Bedrooms"}
                        </Text>
                      </View>

                      <View style={FirstPropertyStyle.plus_minusview}>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                        >
                          <AntDesign
                            name="minus"
                            size={20}
                            onPress={decreaseBedroomCount}
                          />
                        </TouchableOpacity>
                        <Text style={FirstPropertyStyle.countdata}>
                          {CountBedroom}
                        </Text>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                        >
                          <AntDesign
                            name="plus"
                            size={20}
                            onPress={() => {
                              increaseBedroomCount();
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={FirstPropertyStyle.mainfeaturesview}>
                      <View style={FirstPropertyStyle.key_feature_Text_view}>
                        <Text style={FirstPropertyStyle.key_feature_Text}>
                          {"Bathrooms"}
                        </Text>
                      </View>

                      <View style={FirstPropertyStyle.plus_minusview}>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                        >
                          <AntDesign
                            name="minus"
                            size={20}
                            onPress={decreaseBathroomCount}
                          />
                        </TouchableOpacity>
                        <Text style={FirstPropertyStyle.countdata}>
                          {CountBathroom}
                        </Text>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                        >
                          <AntDesign
                            name="plus"
                            size={20}
                            onPress={increaseBathroomCount}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={FirstPropertyStyle.mainfeaturesview}>
                      <View style={FirstPropertyStyle.key_feature_Text_view}>
                        <Text style={FirstPropertyStyle.key_feature_Text}>
                          {"Parking spaces"}
                        </Text>
                      </View>

                      <View style={FirstPropertyStyle.plus_minusview}>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                        >
                          <AntDesign
                            name="minus"
                            size={20}
                            onPress={decreaseParkingCount}
                          />
                        </TouchableOpacity>
                        <Text style={FirstPropertyStyle.countdata}>
                          {CountParking}
                        </Text>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                        >
                          <AntDesign
                            name="plus"
                            size={20}
                            onPress={increaseParkingCount}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={FirstPropertyStyle.mainfeaturesview}>
                      <View style={FirstPropertyStyle.key_feature_Text_view}>
                        <Text style={FirstPropertyStyle.key_feature_Text}>
                          {"On-street parking"}
                        </Text>
                      </View>

                      <View style={FirstPropertyStyle.plus_minusview}>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                        >
                          <AntDesign
                            name="minus"
                            size={20}
                            onPress={decreaseParkingStreetCount}
                          />
                        </TouchableOpacity>
                        <Text style={FirstPropertyStyle.countdata}>
                          {CountParkingStreet}
                        </Text>
                        <TouchableOpacity
                          style={FirstPropertyStyle.menusIconView}
                        >
                          <AntDesign
                            name="plus"
                            size={20}
                            onPress={increaseParkingStreetCount}
                          />
                        </TouchableOpacity>
                      </View>
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
                        />
                      </View>
                    </View>
                  </View>

                  <View style={PropertyFeatureStyle.addition_featureView}>
                    <Text style={PropertyFeatureStyle.additional_Text}>
                      {"Additional features"}
                    </Text>
                    <View style={PropertyFeatureStyle.addition_featureView}>
                      <Text style={PropertyFeatureStyle.Furnished_Text}>
                        {"Furnished or unfurnished?"}
                      </Text>
                      <RowButtons
                        LeftButtonText={"Furnished"}
                        leftButtonbackgroundColor={
                          !selectedButtonFurnished
                            ? _COLORS.Kodie_lightGreenColor
                            : _COLORS.Kodie_WhiteColor
                        }
                        LeftButtonTextColor={
                          !selectedButtonFurnished
                            ? _COLORS.Kodie_BlackColor
                            : _COLORS.Kodie_MediumGrayColor
                        }
                        LeftButtonborderColor={
                          !selectedButtonFurnished
                            ? _COLORS.Kodie_GrayColor
                            : _COLORS.Kodie_LightWhiteColor
                        }
                        onPressLeftButton={() => {
                          setSelectedButtonFurnished(false);
                          setSelectedButtonFurnishedId(1);
                          // alert(selectedButtonId)
                        }}
                        RightButtonText={"Unfurnished"}
                        RightButtonbackgroundColor={
                          selectedButtonFurnished
                            ? _COLORS.Kodie_lightGreenColor
                            : _COLORS.Kodie_WhiteColor
                        }
                        RightButtonTextColor={
                          selectedButtonFurnished
                            ? _COLORS.Kodie_BlackColor
                            : _COLORS.Kodie_MediumGrayColor
                        }
                        RightButtonborderColor={
                          selectedButtonFurnished
                            ? _COLORS.Kodie_GrayColor
                            : _COLORS.Kodie_LightWhiteColor
                        }
                        onPressRightButton={() => {
                          setSelectedButtonFurnished(true);
                          setSelectedButtonFurnishedId(2);
                          // alert(selectedButtonId)
                        }}
                      />
                    </View>
                    <View style={PropertyFeatureStyle.addition_featureView}>
                      <Text style={PropertyFeatureStyle.Furnished_Text}>
                        {"Pet friendly?"}
                      </Text>
                      <RowButtons
                        LeftButtonText={"Yes"}
                        leftButtonbackgroundColor={
                          !selectedButton1
                            ? _COLORS.Kodie_lightGreenColor
                            : _COLORS.Kodie_WhiteColor
                        }
                        LeftButtonTextColor={
                          !selectedButton1
                            ? _COLORS.Kodie_BlackColor
                            : _COLORS.Kodie_MediumGrayColor
                        }
                        LeftButtonborderColor={
                          !selectedButton1
                            ? _COLORS.Kodie_GrayColor
                            : _COLORS.Kodie_LightWhiteColor
                        }
                        onPressLeftButton={() => {
                          setSelectedButton1(false);
                          setSelectedButtonId1(1);
                          // alert(selectedButtonId)
                        }}
                        RightButtonText={"No"}
                        RightButtonbackgroundColor={
                          selectedButton1
                            ? _COLORS.Kodie_lightGreenColor
                            : _COLORS.Kodie_WhiteColor
                        }
                        RightButtonTextColor={
                          selectedButton1
                            ? _COLORS.Kodie_BlackColor
                            : _COLORS.Kodie_MediumGrayColor
                        }
                        RightButtonborderColor={
                          selectedButton1
                            ? _COLORS.Kodie_GrayColor
                            : _COLORS.Kodie_LightWhiteColor
                        }
                        onPressRightButton={() => {
                          setSelectedButton1(true);
                          setSelectedButtonId1(2);
                          // alert(selectedButtonId)
                        }}
                      />
                    </View>
                    <View style={PropertyFeatureStyle.addition_featureView}>
                      <Text style={PropertyFeatureStyle.Furnished_Text}>
                        {"To be secured by deposit?"}
                      </Text>
                      <RowButtons
                        LeftButtonText={"Yes"}
                        leftButtonbackgroundColor={
                          !selectedButtonDeposit
                            ? _COLORS.Kodie_lightGreenColor
                            : _COLORS.Kodie_WhiteColor
                        }
                        LeftButtonTextColor={
                          !selectedButtonDeposit
                            ? _COLORS.Kodie_BlackColor
                            : _COLORS.Kodie_MediumGrayColor
                        }
                        LeftButtonborderColor={
                          !selectedButtonDeposit
                            ? _COLORS.Kodie_GrayColor
                            : _COLORS.Kodie_LightWhiteColor
                        }
                        onPressLeftButton={() => {
                          setSelectedButtonDeposit(false);
                          setSelectedButtonDepositId(1);
                          // alert(selectedButtonId)
                        }}
                        RightButtonText={"No"}
                        RightButtonbackgroundColor={
                          selectedButtonDeposit
                            ? _COLORS.Kodie_lightGreenColor
                            : _COLORS.Kodie_WhiteColor
                        }
                        RightButtonTextColor={
                          selectedButtonDeposit
                            ? _COLORS.Kodie_BlackColor
                            : _COLORS.Kodie_MediumGrayColor
                        }
                        RightButtonborderColor={
                          selectedButtonDeposit
                            ? _COLORS.Kodie_GrayColor
                            : _COLORS.Kodie_LightWhiteColor
                        }
                        onPressRightButton={() => {
                          setSelectedButtonDeposit(true);
                          setSelectedButtonDepositId(2);
                          // alert(selectedButtonId)
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
                      Additional key features
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
                      placeholder="Add features such as pool,aircon,balcony etc."
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
                  {/* <View style={PropertyFeatureStyle.btnView}>
                    <CustomSingleButton
                      _ButtonText={"Next"}
                      Text_Color={_COLORS.Kodie_WhiteColor}
                      onPress={() => {
                        props.navigation.navigate("PropertyImages");
                      }}
                    />
                  </View>
                  <View style={PropertyFeatureStyle.btnView}>
                    <CustomSingleButton
                      _ButtonText={"Add property features later"}
                      Text_Color={_COLORS.Kodie_BlackColor}
                      backgroundColor={_COLORS.Kodie_WhiteColor}
                    />
                  </View>
                  <TouchableOpacity style={PropertyFeatureStyle.goBack_View}
                  onPress={() => {
                    props.navigation.navigate("PropertyDetails");}}>
                    <View style={PropertyFeatureStyle.backIcon}>
                      <Ionicons
                        name="chevron-back"
                        size={22}
                        color={_COLORS.Kodie_MediumGrayColor}
                      />
                    </View>
                    <Text style={PropertyFeatureStyle.goBack_Text}>{"Go back"}</Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </ScrollView>
          </View>
        );
      case 2:
        return (
          // <PropertyImages />;
          <View style={PropertyImagesStyle.mainContainer}>
            <View style={PropertyImagesStyle.headingView}>
              <Text style={PropertyImagesStyle.heading}>
                {"Property images"}
              </Text>
            </View>
            <View style={PropertyImagesStyle.phototextView}>
              <View style={PropertyImagesStyle.slider_view}>
                <SliderBox
                  images={
                    property_Detail[0]?.image_path
                      ? property_Detail[0]?.image_path
                      : imagePaths
                  }
                  sliderBoxHeight={200}
                  onCurrentImagePressed={(index) =>
                    console.warn(`image ${index} pressed`)
                  }
                  inactiveDotColor={_COLORS.Kodie_GrayColor}
                  dotColor={_COLORS.Kodie_GreenColor}
                  autoplay
                  circleLoop
                  resizeMethod={"resize"}
                  resizeMode={"cover"}
                  dotStyle={PropertyImagesStyle.dotStyle}
                  ImageComponentStyle={{
                    flex: 1,
                    resizeMode: "cover",
                    borderRadius: 15,
                    width: "90%",
                    // position: "relative",
                  }}
                />
              </View>
              <Text style={PropertyImagesStyle.upload_Heading_Text}>
                {"Upload images"}
              </Text>
              <View style={{ flex: 1 }}>
                <UploadImageBoxes
                  Box_Text={"Add Photo"}
                  onPress={() => {
                    refRBSheet.current.open();
                  }}
                />
                {MultiImageName.length > 0 ? refRBSheet.current.close() : null}

                {/* {MultiImageName.length > 0 && (
                  <FlatList
                    horizontal
                    data={MultiImageName}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <Image
                        source={{ uri: item.path }}
                        style={{ width: 100, height: 100, margin: 5 }}
                      />
                    )}
                  />
                )} */}

                <Text style={PropertyImagesStyle.formatted_property_text}>
                  {
                    "Images should be formatted .jpg or .png Size per image should not exceed 2 MB"
                  }
                </Text>
              </View>

              {/* {MultiImageName.length == 0 ? refRBSheet.current.close() : null} */}
              <Text style={PropertyImagesStyle.upload_Heading_Text}>
                {"Upload Video"}
              </Text>
              <View style={{ flex: 1 }}>
                <UploadImageBoxes
                  Box_Text={"Add video"}
                  onPress={() => {
                    // refRBSheet.current.open();
                    openVideoPicker();
                  }}
                />
                {selectedVideos.length > 0 && (
                  <View style={{ marginTop: 10 }}>
                    {/* <Text>Selected Videos:</Text> */}
                    <FlatList
                      horizontal
                      data={selectedVideos}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <>
                          <Video
                            source={{ uri: item.path }}
                            style={{
                              width: 150,
                              height: 150,
                              borderRadius: 5,
                              marginLeft: 10,
                            }}
                            controls={true}
                          />
                          {/* <Text style={{fontSize:14,color:_COLORS?.Kodie_BlackColor}}>{item.path}</Text> */}
                        </>
                      )}
                    />
                  </View>
                )}
                <Text style={PropertyImagesStyle.formatted_property_text}>
                  {
                    "Videos should be formatted .mp4, HEVC, MKV.Size per video should not exceed 100 MB"
                  }
                </Text>
              </View>
              {/* {selectedVideos.length > 0 && refRBSheet.current.close()} */}

              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={180}
                customStyles={{
                  wrapper: {
                    backgroundColor: "transparent",
                  },
                  draggableIcon: {
                    backgroundColor: _COLORS.Kodie_LightGrayColor,
                  },
                  container: PropertyImagesStyle.bottomModal_container,
                }}
              >
                <UploadMultipleImage
                  heading_Text={"Upload image"}
                  multipleImage={handleImageNameChange}
                />
              </RBSheet>
            </View>
          </View>
        );
      case 3:
        // return <PropertyReview />;
        return (
          <View style={PropertyReviewStyle.mainContainer}>
            <ScrollView>
              <View style={PropertyReviewStyle.headingView}>
                <Text style={PropertyReviewStyle.heading}>
                  {"Review property details"}
                </Text>
              </View>
              <View style={PropertyReviewStyle.slider_view}>
                <SliderBox
                  images={
                    property_Detail[0]?.image_path
                      ? property_Detail[0]?.image_path
                      : imagePaths
                  }
                  sliderBoxHeight={200}
                  onCurrentImagePressed={(index) =>
                    console.warn(`image ${index} pressed`)
                  }
                  inactiveDotColor={_COLORS.Kodie_GrayColor}
                  dotColor={_COLORS.Kodie_GreenColor}
                  autoplay
                  circleLoop
                  resizeMethod={"resize"}
                  resizeMode={"cover"}
                  dotStyle={PropertyReviewStyle.dotStyle}
                  ImageComponentStyle={{
                    flex: 1,
                    resizeMode: "cover",
                  }}
                />
              </View>
              <View style={PropertyReviewStyle.subContainer}>
                <View style={PropertyReviewStyle.apartment_View}>
                  <Text style={PropertyReviewStyle.apartment_text}>
                    {property_Detail[0]?.property_type}
                  </Text>
                  <View style={PropertyReviewStyle.share_View}>
                    <TouchableOpacity>
                      <Entypo
                        name="share"
                        color={_COLORS.Kodie_MediumGrayColor}
                        size={22}
                        style={PropertyReviewStyle.share_sty}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Entypo
                        name="heart-outlined"
                        color={_COLORS.Kodie_MediumGrayColor}
                        size={22}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={PropertyReviewStyle.melbourne_Text}>
                  {property_Detail[0]?.location || "Melbourne"}
                </Text>
                <View style={PropertyReviewStyle.share_View}>
                  <Entypo
                    name="location-pin"
                    size={20}
                    color={_COLORS.Kodie_GreenColor}
                  />
                  <Text>
                    {property_Detail[0]?.location ||
                      location ||
                      "8502 Preston Rd.Inglewood,Queensland,Australia,."}
                  </Text>
                </View>
                <View style={PropertyReviewStyle.Details_Tab}>
                  <TouchableOpacity
                    onPress={() => {
                      setTabValue("Details");
                    }}
                  >
                    <Text style={[PropertyReviewStyle.Tab_text]}>
                      {"Details"}
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    onPress={() => {
                      setTabValue("Leases");
                    }}
                  >
                    <Text style={PropertyReviewStyle.Tab_text}>{"Leases"}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setTabValue("Expenses");
                    }}
                  >
                    <Text style={PropertyReviewStyle.Tab_text}>
                      {"Expenses"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setTabValue("Documents");
                    }}
                  >
                    <Text style={PropertyReviewStyle.Tab_text}>
                      {"Documents"}
                    </Text>
                  </TouchableOpacity> */}
                </View>
              </View>
              <DividerIcon borderBottomWidth={3} />
              <Text style={DetailsStyle.welcome_Text}>
                {/* {
                  "Welcome to your new home! This beautiful 3 bedroom, 2 bathroom apartment boasts modern interior finishes and a spacious extended balcony. As you enter, you..."
                } */}
                {property_Detail[0]?.property_description || propertyDesc}
              </Text>

              <FlatList
                data={Detail}
                scrollEnabled
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}
                numColumns={2}
                keyExtractor={(item) => item?.id}
                renderItem={Detail_rander}
              />

              <DividerIcon
                borderBottomWidth={1}
                color={_COLORS.Kodie_GrayColor}
              />
              <View style={DetailsStyle.subContainer}>
                <View style={DetailsStyle.propety_details_view}>
                  <Text style={DetailsStyle.propery_det}>
                    {"Property details"}
                  </Text>

                  <TouchableOpacity style={DetailsStyle.down_Arrow_icon}>
                    <AntDesign
                      name="down"
                      size={15}
                      color={_COLORS.Kodie_GrayColor}
                    />
                  </TouchableOpacity>
                </View>
                <DividerIcon marginTop={8} />
              </View>
              <View style={DetailsStyle.subContainer}>
                <View style={DetailsStyle.propety_details_view}>
                  <Text style={DetailsStyle.propery_det}>{"Rooms"}</Text>

                  <TouchableOpacity style={DetailsStyle.down_Arrow_icon}>
                    <AntDesign
                      name="down"
                      size={15}
                      color={_COLORS.Kodie_GrayColor}
                    />
                  </TouchableOpacity>
                </View>
                <DividerIcon marginTop={8} />
              </View>
              <View style={DetailsStyle.subContainer}>
                <View style={DetailsStyle.propety_details_view}>
                  <Text style={DetailsStyle.propery_det}>
                    {"External featuress"}
                  </Text>

                  <TouchableOpacity style={DetailsStyle.down_Arrow_icon}>
                    <AntDesign
                      name="down"
                      size={15}
                      color={_COLORS.Kodie_GrayColor}
                    />
                  </TouchableOpacity>
                </View>
                <DividerIcon marginTop={8} />
              </View>
              <View style={DetailsStyle.subContainer}>
                <View style={DetailsStyle.propety_details_view}>
                  <Text style={DetailsStyle.propery_det}>
                    {"Points of interest"}
                  </Text>

                  <TouchableOpacity style={DetailsStyle.down_Arrow_icon}>
                    <AntDesign
                      name="down"
                      size={15}
                      color={_COLORS.Kodie_GrayColor}
                    />
                  </TouchableOpacity>
                </View>
                <DividerIcon marginTop={8} />
              </View>
              {/* {checkTabs()} */}
            </ScrollView>
          </View>
        );

      default:
        return null;
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor }}>
      <TopHeader
        // onPressLeftButton={() => _goBack(props)}
        onPressLeftButton={goBack}
        MiddleText={IsMap || IsSearch ? "Location" : "Add new property"}
      />
      <View style={{ flex: 1 }}>
        {/* <View style={{ marginTop: 15 }}>
          <StepIndicator
            customSignUpStepStyle={firstIndicatorSignUpStepStyle}
            currentPosition={currentPage}
            // onPress={onStepPress}
            renderStepIndicator={renderStepIndicator}
            labels={stepLabels}
            stepCount={4}
            renderLabel={renderLabel}
          />
        </View> */}
        {IsMap || IsSearch ? null : (
          <View style={DetailsStyle.stepIndicator}>
            <StepIndicator
              customSignUpStepStyle={firstIndicatorSignUpStepStyle}
              currentPosition={currentPage}
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
              setLocation(details.formatted_address);
              console.log("locationSearch....", location);
              console.log("details.......", details);
            }}
          />
        ) : (
          <ScrollView
            contentContainerStyle={{ marginBottom: 190 }}
            showsVerticalScrollIndicator={false}
          >
            <View>{renderPageContent()}</View>
            <View
              style={{
                marginHorizontal: 16,
                backgroundColor: _COLORS.Kodie_WhiteColor,
                marginBottom: 100,
              }}
            >
              <View
                style={{
                  justifyContent: "flex-end",
                  // marginBottom: 30,
                }}
              >
                <CustomSingleButton
                  _ButtonText={currentPage == 3 ? "Add property" : "Next"}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    handleNextBtn();
                  }}
                />
                {currentPage == 1 || currentPage == 2 ? (
                  <>
                    <CustomSingleButton
                      _ButtonText={"Fill these details out later"}
                      Text_Color={_COLORS.Kodie_BlackColor}
                      backgroundColor={_COLORS.Kodie_WhiteColor}
                      onPress={() => {
                        if (currentPage == 2) {
                          // handleNextBtn();
                        } else {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                    />

                    <TouchableOpacity
                      style={SignUpStepStyle.goBack_View}
                      onPress={() => goBack()}
                    >
                      <View style={SignUpStepStyle.backIcon}>
                        <Ionicons
                          name="chevron-back"
                          size={22}
                          color={_COLORS.Kodie_MediumGrayColor}
                        />
                      </View>
                      <Text style={SignUpStepStyle.goBack_Text}>
                        {"Go back"}
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : null}
                {currentPage == 0 || currentPage == 3 ? (
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
        )}
      </View>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default AddPropertyMainPage;
