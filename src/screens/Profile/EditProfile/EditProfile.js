import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  FlatList
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { EditProfileStyle } from "./EditProfileStyle";
import { Divider } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { CreateJobFirstStyle } from "../../CreateJob/CreateJobFirstScreenCss";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, IMAGES, FONTFAMILY, LABEL_STYLES } from "../../../Themes";
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from "react-native-vector-icons/Entypo";
import { _goBack } from "../../../services/CommonServices";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import CustomTabNavigator from "../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import UploadImageData from "../../../components/Molecules/UploadImage/UploadImage";
import Geocoder from "react-native-geocoding";
// import Geolocation from "react-native-geolocation-service";
import Geolocation from "@react-native-community/geolocation";
import MapScreen from "../../../components/Molecules/GoogleMap/googleMap";
import SearchPlaces from "../../../components/Molecules/SearchPlaces/SearchPlaces";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { useDispatch, useSelector } from "react-redux";
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";
import { Config } from "../../../Config";
import axios from "axios";
import CompanyDetails from "../../Landlord/Landlordprofile/CompanyDetails/CompanyDetails";
import ProfileDocuments from "../ProfileDocuments/ProfileDocuments";
import PersonalDetails from "../PersonalDetails/PersonalDetails";
import PhoneInput from "react-native-phone-number-input";
import styles from "rn-range-slider/styles";
import ServicesBox from "../../../components/Molecules/ServicesBox/ServicesBox";
//ScreenNo:189
//ScreenNo:190
//ScreenNo:192
//ScreenNo:193
//ScreenNo:194
const data = [
  { label: "Delhi", value: "1" },
  { label: "Mumbai", value: "2" },
  { label: "Punjab", value: "3" },
  { label: "West Bengal", value: "4" },
  { label: "Pune", value: "5" },
];

const EditProfile = (props) => {
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse.....", loginData);
  const [fullName, setFullName] = useState(
    loginData?.Account_details[0]?.UAD_FIRST_NAME
  );
  const [lastName, setLastName] = useState(
    loginData?.Account_details[0]?.UAD_LAST_NAME
  );
  const [email, setEmail] = useState(loginData?.Login_details?.email);
  const [phoneNumber, setPhoneNumber] = useState(
    String(loginData?.Account_details[0]?.UAD_PHONE_NO)
  );
  const [location, setLocation] = useState(
    loginData?.Account_details[0]?.UAD_CURR_PHYSICAL_ADD
  );
  let profileDoc = props?.route?.params?.profileDoc;
  console.log("profileDoc....", profileDoc);
  const [about, setAbout] = useState("");
  const [activeTab, setActiveTab] = useState("Tab1");
  const [value, setValue] = useState(null);
  const refRBSheet = useRef();
  const [visible, setVisible] = useState(false);
  const [photoid, setPhotoId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [UserCurrentCity, setUserCurrentCity] = useState("");
  const [UserZip_Code, setUserZip_Code] = useState("");
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [ImageName, setImageName] = useState("");
  const [companyPhysicaladdress, setCompanyPhysicaladdress] = useState("");
  const [company_latitude, setCompany_latitude] = useState("");
  const [company_longitude, setCompany_longitude] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [kodieDescribeYourselfData, setKodieDescribeYourselfData] = useState(
    []
  );
  const [kodieDescribeYourselfId, setKodieDescribeYourselfDataId] =
  useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(false);

  const [getLat, setGetLat] = useState("");
  const [getLong, setGetLong] = useState("");

  const phoneInput = useRef(null);
  console.log("latitude....", latitude);
  console.log("longitude....", longitude);
  // console.log("formattedValue....",formattedValue)
  // console.log("phoneNumber....",phoneNumber)
  const handleImageNameChange = async (newImageName) => {
    setImageName(newImageName);
    console.log("................ImageNAme", newImageName);
    // const fileUri = ImageName.path;
    // const fileName = fileUri.substring(fileUri.lastIndexOf("/") + 1);
    // const fileType = ImageName.mime;
    // console.log("fileUri....", fileUri);
    // console.log("fileName....", fileName);
    // console.log("fileType....", fileType);
  };
  useEffect(() => {
    Geocoder.init("AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw", {
      language: "en",
    });
    Platform.OS == "ios" ? CheckIOSMapPermission() : checkpermissionlocation();
    // setFullName(loginData?.Account_details[0]?.UAD_FIRST_NAME);
    // setEmail(loginData?.Login_details?.email);
    // setPhoneNumber(String(loginData?.Account_details[0]?.UAD_PHONE_NO));
    // setLocation(loginData?.Account_details[0]?.UAD_CURR_PHYSICAL_ADD);
    setActiveTab(profileDoc ? "Tab3" : "Tab1");
  }, [currentLocation]);
  const goBack = () => {
    props.navigation.pop();
  };
  const ConfirmAddress = () => {
    setIsMap(false);
    setCurrentLocation(true);
  };
  const openMapandClose = (text) => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = (Region) => {
    // alert(JSON.stringify(Region))
    if (activeTab === "Tab1") {
      setlatitude(Region.latitude);
    } else {
      setCompany_latitude(Region.latitude);
    }
    if (activeTab === "Tab1") {
      setlongitude(Region.longitude);
    } else {
      setCompany_longitude(Region.longitude);
    }
    // setlatitude(Region.latitude);
    // setlongitude(Region.longitude);
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
        // getAddressWithCordinates();
        fetchCurrentLocation();
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
            // getAddressWithCordinates();
            fetchCurrentLocation();
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
  const fetchCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("This is your current location.");
        if (activeTab === "Tab1") {
          setlatitude(position.coords.latitude);
          console.log("profile latitute....", position.coords.latitude);
        } else {
          setCompany_latitude(position.coords.latitude);
          console.log("company latitude....", position.coords.latitude);
        }
        if (activeTab === "Tab1") {
          setlongitude(position.coords.longitude);
          console.log("profile longitude....", position.coords.longitude);
        } else {
          setCompany_longitude(position.coords.longitude);
          console.log("company longitude....", position.coords.longitude);
        }
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  };
  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then((json) => {
        console.log("json location.......", json);
        console.log("current address...", json.results[0].formatted_address);
        if (activeTab === "Tab1") {
          currentLocation
            ? setLocation(json.results[0].formatted_address)
            : null;
        } else {
          currentLocation
            ? setCompanyPhysicaladdress(json.results[0].formatted_address)
            : null;
        }
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
        // alert(activeTab)
        if (activeTab === "Tab1") {
          setLocation(MainFullAddress);
        } else {
          setCompanyPhysicaladdress(MainFullAddress);
        }

        //setAddress(MainFullAddress);
      })
      .catch((error) => console.warn(error));
  };

  const toggleView = () => {
    setVisible(!visible);
  };

  // Api intrrigation......
  const Updateprofile = async () => {
    const formData = new FormData();
    const fileUri = ImageName.path;
    const fileName = fileUri.substring(fileUri.lastIndexOf("/") + 1);
    const fileType = ImageName.mime;

    console.log("fileUri....", fileUri);
    console.log("fileName....", fileName);
    console.log("fileType....", fileType);

    if (!fileUri || !fileName || !fileType) {
      console.error("Invalid image data:", ImageName);
      // Handle invalid image data
    } else {
      formData.append("profile_photo", {
        uri: fileUri,
        name: fileName,
        type: fileType,
      });
    }
    formData.append("uad_key", loginData?.Login_details?.user_account_id);
    formData.append("first_name", fullName);
    formData.append("last_name", lastName);
    // formData.append("phone_number", phoneNumber);
    formData.append("phone_number", formattedValue);
    formData.append("about", about);
    formData.append("physical_address", location);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);
    console.log("formData", formData);
    const url = Config.BASE_URL;
    const updateProfile_url = url + "profile/updateProfile";
    console.log("Request URL:", updateProfile_url);
    setIsLoading(true);
    try {
      const response = await axios.put(updateProfile_url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("updateprofile....", response.data);
      if (response.data.success === true) {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
      console.log("update_error...", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openMap = () => {
    Platform.OS == "ios" ? CheckIOSMapPermission : checkpermissionlocation();
    setIsMap(true);
  };
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":
        return (
          <ScrollView
            style={EditProfileStyle.mainContainer}
            contentContainerStyle={{ marginBottom: 200 }}
          >
            {IsMap || IsSearch ? null : (
              <>
                <View style={[EditProfileStyle.profilviewmain, { flex: 1 }]}>
                  <TouchableOpacity
                    style={EditProfileStyle.ProfileView}
                    onPress={() => {
                      refRBSheet.current.open();
                    }}
                  >
                    {ImageName ? (
                      <Image
                        source={{ uri: ImageName.path || ImageName }}
                        style={[
                          EditProfileStyle.logo,
                          { borderRadius: 110 / 2 },
                        ]}
                      />
                    ) : (
                      <Image
                        style={EditProfileStyle.profilelogo}
                        source={{
                          uri: loginData?.Login_details?.profile_photo_path,
                        }}
                        resizeMode="cover"
                      />
                    )}

                    {ImageName ? refRBSheet.current.close() : null}
                    <View style={EditProfileStyle.editlogoview}>
                      <FontAwesome
                        name="edit"
                        color={_COLORS.Kodie_GreenColor}
                        size={18}
                        style={{ alignSelf: "center" }}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={EditProfileStyle.edittext}>
                    Edit profile photo
                  </Text>
                </View>

                <Divider style={EditProfileStyle.firstdivider} />
                <View style={EditProfileStyle.inputmainview}>
                  <View style={EditProfileStyle.firstview}>
                    <Text style={EditProfileStyle.oldnumbertext}>
                      First name
                    </Text>
                    <View style={EditProfileStyle.simpleinputview}>
                      <TextInput
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Jason Stathom"
                        placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                        style={EditProfileStyle.inputStyle}
                      />
                    </View>
                  </View>
                  <View style={EditProfileStyle.firstview}>
                    <Text style={EditProfileStyle.oldnumbertext}>
                      Last name
                    </Text>
                    <View style={EditProfileStyle.simpleinputview}>
                      <TextInput
                        style={EditProfileStyle.inputStyle}
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder="Jason Stathom"
                        placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                      />
                    </View>
                  </View>
                  <View style={EditProfileStyle.firstview}>
                    <Text style={EditProfileStyle.oldnumbertext}>
                      Email address
                    </Text>
                    <View style={EditProfileStyle.simpleinputview}>
                      <TextInput
                        style={EditProfileStyle.inputStyle}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="numeric"
                        placeholder="jason5@gmail.com"
                        editable={false}
                      />
                    </View>
                  </View>
                  <View style={EditProfileStyle.firstview}>
                    <Text style={EditProfileStyle.oldnumbertext}>
                      Phone number
                    </Text>
                    {/* <View style={EditProfileStyle.phoneinputbindview}>
                      <View style={EditProfileStyle.phoneinput}>
                        <View style={EditProfileStyle.bindnumberview}>
                          <Text style={EditProfileStyle.numbercode}>+61</Text>
                          <Ionicons
                            name="chevron-down-outline"
                            size={20}
                            color={_COLORS.Kodie_LightGrayColor}
                            resizeMode={"contain"}
                          />
                          <Image
                            style={EditProfileStyle.lineimg}
                            source={IMAGES.verticalLine}
                          />
                          <TextInput
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="numeric"
                            placeholder="1234567890"
                            placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                          />
                        </View>
                      </View>
                    </View> */}
                    <View style={[EditProfileStyle.phoneinputview]}>
                      <PhoneInput
                        ref={phoneInput}
                        defaultValue={phoneNumber}
                        defaultCode="IN"
                        layout="second"
                        onChangeText={(text) => {
                          setPhoneNumber(text);
                        }}
                        placeholder={"Enter your phone number"}
                        onChangeFormattedText={(text) => {
                          setFormattedValue(text);
                        }}
                        // withDarkTheme
                        // withShadow
                        autoFocus
                        withFlag={false}
                        textContainerStyle={{
                          flex: 1,
                          backgroundColor: _COLORS.Kodie_WhiteColor,
                          // backgroundColor: _COLORS.Kodie_ExtraLightGrayColor,
                          // borderWidth:1,
                          paddingVertical: 2,
                          // borderWidth:1,
                          // borderColor:'red',
                          borderRadius: 10,
                        }}
                        containerStyle={{
                          flex: 1,
                          alignSelf: "center",
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 1,
                          // backgroundColor: 'blue',
                          borderColor: _COLORS.Kodie_GrayColor,
                          borderRadius: 12,
                        }}
                      />
                    </View>
                  </View>

                  <View style={EditProfileStyle.inputContainer}>
                    <Text style={LABEL_STYLES.commontext}>{"Bio"}</Text>
                    <TextInput
                      style={[EditProfileStyle.input, { height: 119 }]}
                      value={about}
                      onChangeText={setAbout}
                      placeholder="Tell us a bit more about yourself"
                      placeholderTextColor="#999"
                      multiline
                      numberOfLines={5}
                      textAlignVertical={"top"}
                    />
                  </View>
                  <View style={EditProfileStyle.describeYourselfView}>
                    <Text style={EditProfileStyle.want_Heading}>
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
                  </View>
                  <View style={EditProfileStyle.firstview}>
                    <Text style={EditProfileStyle.oldnumbertext}>
                      Physical address
                    </Text>

                    <View style={EditProfileStyle.locationContainer}>
                      <TextInput
                        style={EditProfileStyle.locationInput}
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
                        style={EditProfileStyle.locationIconView}
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
                          style={EditProfileStyle.locationIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={EditProfileStyle.saveBackButton}>
                  <View style={EditProfileStyle.secondview}>
                    <CustomSingleButton
                      leftImage={IMAGES.uploadIcon}
                      isLeftImage={true}
                      Text_Color={_COLORS.Kodie_WhiteColor}
                      borderColor={_COLORS.Kodie_TransparentColor}
                      _ButtonText={"Save and back"}
                      backgroundColor={_COLORS.Kodie_BlackColor}
                      disabled={isLoading ? true : false}
                      onPress={() => {
                        Updateprofile();
                      }}
                    />
                  </View>
                </View>
              </>
            )}
          </ScrollView>
          // <PersonalDetails />
        );
      case "Tab2":
        return (
          <>
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
                    placeholderTextColor={_COLORS.Kodie_BlackColor}
                  />
                </View>
                <TouchableOpacity
                  style={CompanyDetailsStyle.BtnContainer}
                  onPress={ConfirmAddress}
                >
                  <Image
                    source={IMAGES?.Shape}
                    style={{ height: 25, width: 25 }}
                  />
                </TouchableOpacity>
              </View>
            ) : IsSearch ? (
              <SearchPlaces
                onPress={(data, details = null) => {
                  console.log("LocationData....", details);
                  // setlatitude(details.geometry.location.lat);
                  // setlongitude(details.geometry.location.lng);
                  if (activeTab === "Tab1") {
                    setlatitude(details.geometry.location.lat);
                  } else {
                    setCompany_latitude(details.geometry.location.lat);
                  }
                  if (activeTab === "Tab1") {
                    setlongitude(details.geometry.location.lng);
                  } else {
                    setCompany_longitude(details.geometry.location.lng);
                  }
                  setIsSearch(false);
                  setIsMap(true);
                  setCompanyPhysicaladdress(details.formatted_address);
                }}
              />
            ) : (
              <CompanyDetails
                openMap={openMap}
                maplocation={companyPhysicaladdress}
                // latitude={latitude}
                // longitude={longitude}
                latitude={company_latitude}
                longitude={company_longitude}
                // isSearch={setIsSearch(true)}
              />
            )}
          </>
        );
      case "Tab3":
        return <ProfileDocuments />;
    }
  };
  return (
    <View
      style={{
        backgroundColor: _COLORS.Kodie_WhiteColor,
        flex: 1,
      }}
    >
      <TopHeader
        onPressLeftButton={() => {
          IsMap ? setIsMap(false) : IsSearch ? setIsSearch(false) : goBack();
        }}
        MiddleText={"Edit profile"}
      />
      {IsMap ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
          }}
        >
          <MapScreen
            style={{
              // flex:0.5,
              height: "100%",
              width: "100%",
              alignSelf: "center",
              marginBottom: 10,
            }}
            onRegionChange={onRegionChange}
            Maplat={activeTab === "Tab1" ? latitude : company_latitude}
            Maplng={activeTab === "Tab1" ? longitude : company_longitude}
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
              placeholderTextColor={_COLORS.Kodie_BlackColor}
            />
          </View>
          <TouchableOpacity
            style={EditProfileStyle.BtnContainer}
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
            if (activeTab === "Tab1") {
              setLocation(details.formatted_address);
            } else {
              setCompanyPhysicaladdress(details.formatted_address);
            }
          }}
        />
      ) : (
        <>
          <View
            style={{
              borderBottomWidth: 3,
              borderColor: _COLORS.Kodie_GrayColor,
              elevation: 1,
            }}
          >
            <CustomTabNavigator
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              TAB3
              Tab1={"Personal Details"}
              Tab2={"Company Details"}
              Tab3={"Documents"}
              onPressTab1={() => setActiveTab("Tab1")}
              onPressTab2={() => setActiveTab("Tab2")}
              onPressTab3={() => setActiveTab("Tab3")}
              colorTab1={
                activeTab === "Tab1"
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              colorTab2={
                activeTab === "Tab2"
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              colorTab3={
                activeTab === "Tab3"
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              FONTFAMILY1={
                activeTab === "Tab1" ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
              }
              FONTFAMILY2={
                activeTab === "Tab2" ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
              }
              FONTFAMILY3={
                activeTab === "Tab3" ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
              }
              styleTab1={activeTab === "Tab1" && EditProfileStyle.activeTab}
              styleTab2={activeTab === "Tab2" && EditProfileStyle.activeTab}
              styleTab3={activeTab === "Tab3" && EditProfileStyle.activeTab}
            />
          </View>
          <ScrollView>{checkTabs()}</ScrollView>
        </>
      )}
      {/*----------- first RBSheet of Edit docoment ---------*/}
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
          container: EditProfileStyle.bottomModal_container,
        }}
      >
        <View style={EditProfileStyle.upload_View}>
          <Text style={EditProfileStyle.uploadImgText}>
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
              style={EditProfileStyle.crossIconStyle}
            />
          </TouchableOpacity>
        </View>
        <UploadImageData
          heading_Text={"Upload image"}
          ImageName={handleImageNameChange}
        />
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default EditProfile;
