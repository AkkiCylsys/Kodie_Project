import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Platform,
} from "react-native";
import { CompanyDetailsStyle } from "./CompanyDetailsStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IMAGES } from "../../../../Themes";
import { Divider } from "react-native-paper";
import { _COLORS, LABEL_STYLES } from "../../../../Themes";
import ServicesBox from "../../../../components/Molecules/ServicesBox/ServicesBox";
import axios from "axios";
import { Config } from "../../../../Config";
import { Dropdown } from "react-native-element-dropdown";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";

import Geocoder from "react-native-geocoding";
import Geolocation from "react-native-geolocation-service";
import MapScreen from "../../../../components/Molecules/GoogleMap/googleMap";
import SearchPlaces from "../../../../components/Molecules/SearchPlaces/SearchPlaces";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";
import RBSheet from "react-native-raw-bottom-sheet";
import UploadImageData from "../../../../components/Molecules/UploadImage/UploadImage";
import { useDispatch, useSelector } from "react-redux";
const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
];
export default CompanyDetails = (props) => {
  const refRBSheet = useRef();
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse.....", loginData);
  const [isLoading, setIsLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyEmailError, setCompanyEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyGSTNumber, setCompanyGSTNumber] = useState("");
  const [jobTypeData, setJobTypeData] = useState([]);
  const [selectJobType, setSelectJobType] = useState(166);
  const [selectJobTypeid, setSelectJobTypeid] = useState("");
  const [isClick, setIsClick] = useState(null);
  const [value, setValue] = useState(null);
  const [location, setLocation] = useState("");
  const [serviceYouPerformData, setServiceYouPerformData] = useState([]);
  const [serviceYouPerformValue, setServiceYouPerformValue] = useState("");
  const [servicesData, setServicesData] = useState([]);
  const [servicesValue, setservicesValue] = useState("");
  const [ImageName, setImageName] = useState("");

  const [UserCurrentCity, setUserCurrentCity] = useState("");
  const [UserZip_Code, setUserZip_Code] = useState("");
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const handleImageNameChange = async (newImageName) => {
    setImageName(newImageName);
    console.log("................ImageNAme", newImageName);
    console.log("................ImageNAmeDeependra", newImageName.path);
  };
  useEffect(() => {
    handleJobType();
    Geocoder.init("AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw", {
      language: "en",
    });
    handle_ServiceYouPerform();
    if (selectJobType !== null) {
      handleServices(selectJobType);
    }
  }, [selectJobType]);

  // Validation....
  const validateCompanyEmail = (companyEmail) => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(companyEmail);
  };
  const handlecompanyEmail = (text) => {
    setCompanyEmail(text);
    if (text.trim() === "") {
      setCompanyEmailError("Company Email is required !");
    } else if (!validateCompanyEmail(text)) {
      setCompanyEmailError(
        "Hold on, this email appears to be invalid. Please enter a valid email address."
      );
    } else {
      setCompanyEmailError("");
    }
  };

  const handleSubmit = async () => {
    if (companyEmail.trim() === "") {
      setCompanyEmailError("Company Email is required!");
    } else if (!validateCompanyEmail(companyEmail)) {
      setCompanyEmailError(
        "Hold on, this email appears to be invalid. Please enter a valid email address."
      );
    } else {
      addUserCompanyData();
    }
  };

  //   map....
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

        //setAddress(MainFullAddress);
      })
      .catch((error) => console.warn(error));
  };

  const openMap = () => {
    props.openMap();
  };
  const handleBoxPress = (lookup_key) => {
    setIsClick(lookup_key);
    setSelectJobTypeid(lookup_key);
    alert(selectJobTypeid);
    // alert(isClick)
  };
  //   renderItem....
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
            CompanyDetailsStyle.box_style,
            {
              backgroundColor:
                isClick === item.lookup_key
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          textColor={[
            CompanyDetailsStyle.box_Text_Style,
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
  const serviceYouPerformrender = (item) => {
    return (
      <View style={CompanyDetailsStyle.itemView}>
        {item.lookup_key === servicesValue ? (
          <Fontisto
            color={_COLORS.Kodie_GreenColor}
            name={"radio-btn-active"}
            size={20}
          />
        ) : (
          <Fontisto
            color={_COLORS.Kodie_GreenColor}
            name={"radio-btn-passive"}
            size={20}
          />
        )}
        <Text style={CompanyDetailsStyle.textItem}>
          {item.lookup_description}
        </Text>
      </View>
    );
  };
  //   ApiIntrigation....
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
  const handle_ServiceYouPerform = () => {
    const url = Config.BASE_URL;
    const ServiceYouPerform_url = url + "lookup_details";
    console.log("Request URL:", ServiceYouPerform_url);
    setIsLoading(true);
    const ServiceYouPerform_data = {
      P_PARENT_CODE: "FIXING_AND_MAINTENANCE",
      P_TYPE: "OPTION",
    };
    axios
      .post(ServiceYouPerform_url, ServiceYouPerform_data)
      .then((response) => {
        console.log("API Response Service You Perform", response.data);
        if (response.data.status === true) {
          setServiceYouPerformData(response.data.lookup_details);
          // alert(JSON.stringify(response.data.lookup_details));
          console.log(
            "setServiceYouPerformData.....",
            response.data.lookup_details
          );
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed Service You Perform", error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
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

  const addUserCompanyData = async () => {
    console.log("Formadata.....", formData);
    const formData = new FormData();
    if (ImageName && typeof ImageName === "string") {
      const imageUri = ImageName;
      const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
      formData.append("UCDM_COMPANY_LOGO", {
        uri: imageUri,
        name: imageName,
      });
    }
    formData.append("uad_key", loginData?.Login_details?.user_account_id);
    formData.append("UCDM_COMPANY_NAME", companyName);
    formData.append("UCDM_COMPANY_EMAIL", companyEmail);
    formData.append("UCDM_COMPANY_CONTACT_NUMBER", phoneNumber);
    formData.append("UCDM_COMPANY_DESCRIPTION", companyDescription);
    formData.append("UCDM_SERVICE_YOU_OFFERING", selectJobTypeid);
    formData.append("UCDM_SERVICE_YOU_PERFORM", servicesValue);
    formData.append("UCDM_COMPANY_ADDRESS", "Gadarwara");
    formData.append("UCDM_COMPANY_LONGITUDE", 25.265256);
    formData.append("UCDM_COMPANY_LATITUDE", 123.52221);
    formData.append("UCDM_COMPANY_GST_VAT_NUMBER", companyGSTNumber);
    console.log("formData", formData);
    const url = Config.BASE_URL;
    const addUserCompanyData_url = url + "profile/addusercompanydata";
    console.log("Request URL:", addUserCompanyData_url);
    setIsLoading(true);
    try {
      const response = await axios.post(addUserCompanyData_url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("addUserCompanyData.....", response.data);
      if (response.data.success === true) {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
      console.log("update_error addUserCompanyData...", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <View style={CompanyDetailsStyle.mainContaier}>
        <View style={[CompanyDetailsStyle.profilviewmain, { flex: 1 }]}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              refRBSheet.current.open();
            }}
          >
            {ImageName ? (
              <Image
                source={{ uri: ImageName.path || ImageName }}
                style={[CompanyDetailsStyle.logo, { borderRadius: 110 / 2 }]}
              />
            ) : (
              <Image
                source={IMAGES?.Landlordprofile}
                resizeMode="cover"
                style={CompanyDetailsStyle.profilelogo}
              />
            )}
            {ImageName ? refRBSheet.current.close() : null}
            <View style={CompanyDetailsStyle.editlogoview}>
              <FontAwesome
                name="edit"
                color={_COLORS.Kodie_GreenColor}
                size={18}
              />
            </View>
          </TouchableOpacity>
          <Text style={CompanyDetailsStyle.edittext}>Edit company logo</Text>
        </View>
        <Divider style={CompanyDetailsStyle.firstdivider} />
        <View style={CompanyDetailsStyle.card}>
          <View style={CompanyDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Company name"}</Text>
            <TextInput
              style={CompanyDetailsStyle.input}
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="Enter registered company name"
              placeholderTextColor="#999"
            />
          </View>
          <View style={CompanyDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Company email address"}
            </Text>
            <TextInput
              style={CompanyDetailsStyle.input}
              value={companyEmail}
              onChangeText={setCompanyEmail}
              onBlur={() => handlecompanyEmail(companyEmail)}
              placeholder="Enter company email address"
              placeholderTextColor="#999"
            />
          </View>
          {companyEmailError ? (
            <Text style={CompanyDetailsStyle.error_text}>
              {companyEmailError}
            </Text>
          ) : null}
          <View style={CompanyDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Company phone number"}
            </Text>
            <View style={CompanyDetailsStyle.phoneinputbindview}>
              <View style={CompanyDetailsStyle.phoneinput}>
                <View style={CompanyDetailsStyle.bindnumberview}>
                  <Text style={CompanyDetailsStyle.numbercode}>+61</Text>
                  <Ionicons
                    name="chevron-down-outline"
                    size={20}
                    color={_COLORS.Kodie_LightGrayColor}
                    resizeMode={"contain"}
                  />
                  <Image
                    style={CompanyDetailsStyle.lineimg}
                    source={IMAGES.verticalLine}
                  />
                  <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="numeric"
                    placeholder="1234567890"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                    maxLength={10}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={CompanyDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Company description"}</Text>
            <TextInput
              style={[CompanyDetailsStyle.input, { height: 119 }]}
              value={companyDescription}
              onChangeText={setCompanyDescription}
              placeholder="Enter a description of your company / servicee"
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={"top"}
            />
          </View>
          <View style={CompanyDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"The category of service you offer"}
            </Text>
            <FlatList
              data={jobTypeData}
              keyExtractor={(item) => item.lookup_key.toString()}
              renderItem={jobType_render}
              numColumns={2}
            />
          </View>
          <View style={CompanyDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"The type of service you perform"}
            </Text>
            <Dropdown
              style={CompanyDetailsStyle.dropdown}
              placeholderStyle={CompanyDetailsStyle.placeholderStyle}
              selectedTextStyle={CompanyDetailsStyle.selectedTextStyle}
              inputSearchStyle={CompanyDetailsStyle.inputSearchStyle}
              iconStyle={CompanyDetailsStyle.iconStyle}
              data={servicesData}
              search
              maxHeight={300}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={servicesValue}
              onChange={(item) => {
                setservicesValue(item.lookup_key);
                // alert(item.lookup_key)
              }}
              renderItem={serviceYouPerformrender}
            />
          </View>
          <View style={CompanyDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Company physical address"}
            </Text>

            <View style={CompanyDetailsStyle.locationContainer}>
              <TextInput
                style={CompanyDetailsStyle.locationInput}
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
                style={CompanyDetailsStyle.locationIconView}
                onPress={() => {
                  // Platform.OS == "ios"
                  //   ? CheckIOSMapPermission
                  //   : checkpermissionlocation();
                  // setIsMap(true);
                  openMap();
                }}
              >
                <Octicons
                  name={"location"}
                  size={22}
                  color={_COLORS.Kodie_GreenColor}
                  style={CompanyDetailsStyle.locationIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={CompanyDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Company GST / VAT number"}
            </Text>
            <TextInput
              style={[CompanyDetailsStyle.input]}
              value={companyGSTNumber}
              onChangeText={setCompanyGSTNumber}
              placeholder="1234567890"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        <View style={CompanyDetailsStyle.saveBackButton}>
          <View style={CompanyDetailsStyle.secondview}>
            <CustomSingleButton
              Text_Color={_COLORS.Kodie_WhiteColor}
              borderColor={_COLORS.Kodie_TransparentColor}
              _ButtonText={"Save and back"}
              backgroundColor={_COLORS.Kodie_BlackColor}
              disabled={isLoading ? true : false}
              onPress={() => {
                handleSubmit();
              }}
            />
          </View>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        height={200}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: CompanyDetailsStyle.bottomModal_container,
        }}
      >
        <View style={CompanyDetailsStyle.upload_View}>
          <Text style={CompanyDetailsStyle.uploadImgText}>
            {props.heading_Text || "Upload image"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.close();
            }}
          >
            <Entypo
              name="cross"
              size={25}
              color={_COLORS.Kodie_BlackColor}
              style={CompanyDetailsStyle.crossIconStyle}
            />
          </TouchableOpacity>
        </View>
        <UploadImageData
          heading_Text={"Upload image"}
          ImageName={handleImageNameChange}
        />
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </>
  );
};
