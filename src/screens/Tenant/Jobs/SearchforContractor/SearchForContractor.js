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
} from "react-native";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import {
  VIEW_STYLES,
  _COLORS,
  LABEL_STYLES,
  IMAGES,
  FONTFAMILY,
} from "../../../../Themes/index";
import TopHeader from "../../../../components/Molecules/Header/Header";
import RangeSlider from "../../../../components/Molecules/RangeSlider/RangeSlider";
import { _goBack } from "../../../../services/CommonServices";
import { Dropdown } from "react-native-element-dropdown";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import ServicesBox from "../../../../components/Molecules/ServicesBox/ServicesBox";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import StepIndicator from "react-native-step-indicator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Config } from "../../../../Config";
import axios from "axios";
import Geocoder from "react-native-geocoding";
import Geolocation from "react-native-geolocation-service";
import MapScreen from "../../../../components/Molecules/GoogleMap/googleMap";
import SearchPlaces from "../../../../components/Molecules/SearchPlaces/SearchPlaces";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";
import { CreateJobFirstStyle } from "../../../CreateJob/CreateJobFirstScreenCss";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../../../components/Molecules/SearchBar/SearchBar";
const stepLabels = ["Step 1", "Step 2", "Step 3", "Step 4"];

export default SearchForContractor = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [value, setValue] = useState(null);
  const [aboutyourNeed, setAboutyourNeed] = useState("");
  const [location, setLocation] = useState("");
  const [isClick, setIsClick] = useState(166);
  const [Check, setCheck] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [property_Data, setProperty_Data] = useState([]);
  const [SearchType, setSearchType] = useState([]);
  const [property_value, setProperty_value] = useState([]);
  const [jobPriorityData, setJobPriorityData] = useState([]);
  const [jobPriorityValue, setJobPriorityValue] = useState([]);
  const [ratingThresholdData, setRatingThresholdData] = useState([]);
  const [ratingThresholdValue, setRatingThresholdValue] = useState([]);
  const [jobTypeData, setJobTypeData] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectJobType, setSelectJobType] = useState(166);
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
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse.....", loginData);
  // ...Location
  const ConfirmAddress = () => {
    setIsMap(false);
  };
  const openMapandClose = (text) => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = (Region) => {
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

        setUserCurrentCity(addressComponent2.long_name);
        setUserZip_Code(json.results[1]?.address_components[6]?.long_name);
        setLocation(MainFullAddress);
      })
      .catch((error) => console.warn(error));
  };
  const handleBoxPress = (lookup_key) => {
    setIsClick(lookup_key);
    setSelectJobTypeid(lookup_key);
  };

  useEffect(() => {
    handleProperty_Type();
    handleJob_priority();
    handleRatingThreshold();
    handleJobType();
    if (selectJobType !== null) {
      handleServices(selectJobType);
    }
    Geocoder.init("AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw", {
      language: "en",
    });
    CheckIOSMapPermission();
    setSelectJobType("");
    setservicesValue("");
    setAboutyourNeed("");
    setJobPriorityValue("");
    setProperty_value("");
    setLocation("");
    setRatingThresholdValue("");
  }, [selectJobType]);
  const populorServiceRender = ({ item }) => {
    return (
      <View style={CreateJobFirstStyle.item}>
        <Text style={CreateJobFirstStyle.selectedStyle}>
          {item.lookup_description}
        </Text>
        <TouchableOpacity style={{ alignSelf: "center" }}>
          <Entypo
            style={CreateJobFirstStyle.icon}
            color={_COLORS.Kodie_WhiteColor}
            name="cross"
            size={18}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const property_Type_render = (item) => {
    return (
      <ScrollView contentContainerStyle={{ flex: 1, height: "100%" }}>
        <View style={CreateJobFirstStyle.itemView}>
          {item.longitude === property_value ? (
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
      </ScrollView>
    );
  };
  const jobPriority_render = (item) => {
    return (
      <ScrollView contentContainerStyle={{ flex: 1, height: "100%" }}>
        <View style={CreateJobFirstStyle.itemView}>
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
      </ScrollView>
    );
  };
  const lookingServices_render = (item) => {
    return (
      <ScrollView contentContainerStyle={{ flex: 1, height: "100%" }}>
        <View style={CreateJobFirstStyle.itemView}>
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
      </ScrollView>
    );
  };
  const ratingThreshold_render = (item) => {
    return (
      <ScrollView contentContainerStyle={{ flex: 1, height: "100%" }}>
        <View style={CreateJobFirstStyle.itemView}>
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
      </ScrollView>
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
  // api intrigation.......
  const handleProperty_Type = () => {
    const propertyData = {
      account_id: loginData?.Login_details?.user_account_id,
    };
    const url = Config.BASE_URL;
    const propertyType = url + "get_property_details_my_acc_id";
    console.log("Request URL:", propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then((response) => {
        console.log("property_type", response.data);
        if (response.data.success === true) {
          setIsLoading(false);
          console.log("propertyData....", response.data.property_details);
          setProperty_Data(response.data.property_details);
        } else {
          console.error("property_type_error:", response.data.error);
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
  const handleSearch = () => {
    const SearchData = {
      job_need: "166",
      job_service: "170",
      longitude: "79.93382446467876",
      latitude: "22.926538970575436",
    };
    const url = Config.BASE_URL;
    const SearchType = url + "search_for_contractor";
    console.log("Request URL:", SearchType);
    setIsLoading(true);
    axios
      .post(SearchType, SearchData)
      .then((response) => {
        console.log("property_type", response.data);
        if (response.data.success === true) {
          setIsLoading(false);
          console.log("propertyData....", response.data.property_details);
          setSearchType(response.data.property_details);
        } else {
          console.error("property_type_error:", response.data.error);
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

  const top4Items = servicesData.slice(0, 4);
  return (
    <View style={CreateJobFirstStyle.container}>
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
          <SearchBar
            frontSearchIcon
            placeholder={"Start typing to search"}
            isFilterImage
          />
          <View
            style={[CreateJobFirstStyle.formContainer, { marginBottom: 0 }]}
          >
            <Text style={LABEL_STYLES.commontext}>
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
                data={servicesData}
                search
                maxHeight={300}
                labelField="lookup_description"
                valueField="lookup_key"
                placeholder="Select item"
                value={servicesValue}
                searchPlaceholder="Search..."
                onChange={(item) => {
                  setservicesValue(item.lookup_key);
                  // alert(item.lookup_key)
                }}
                renderItem={lookingServices_render}
              />
            </View>
            <View style={CreateJobFirstStyle.jobDetailsView}>
              <Text style={LABEL_STYLES.commontext}>{"Popular services:"}</Text>

              <FlatList
                data={top4Items}
                keyExtractor={(item) => item.id}
                renderItem={populorServiceRender}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
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
                  // alert(item.lookup_key)
                }}
                renderItem={jobPriority_render}
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
                data={property_Data}
                search
                maxHeight={300}
                labelField="location"
                valueField="longitude"
                placeholder="Select property"
                searchPlaceholder="Search..."
                value={property_value}
                onChange={(item) => {
                  setProperty_value(item.longitude);
                }}
                renderItem={property_Type_render}
              />
            </View>

            <View style={CreateJobFirstStyle.locationContainer}>
              <TextInput
                style={CreateJobFirstStyle.locationInput}
                value={location}
                onChangeText={setLocation}
                onFocus={() => {
                  setIsSearch(true);
                }}
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
                handleSearch();
              }}
              _ButtonText={"Search"}
              Text_Color={_COLORS.Kodie_WhiteColor}
            />
          </View>
        </ScrollView>
      )}
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
