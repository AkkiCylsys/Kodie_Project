import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { EditProfileStyle } from "./EditProfileStyle";
import { Divider } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { CreateJobFirstStyle } from "../../CreateJob/CreateJobFirstScreenCss";
import { ScrollView } from "react-native-gesture-handler";
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
import Geolocation from "react-native-geolocation-service";
import MapScreen from "../../../components/Molecules/GoogleMap/googleMap";
import SearchPlaces from "../../../components/Molecules/SearchPlaces/SearchPlaces";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { useDispatch, useSelector } from "react-redux";
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";
import { Config } from "../../../Config";
import axios from "axios";
import CompanyDetails from "../../Landlord/Landlordprofile/CompanyDetails/CompanyDetails";
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

  const handleImageNameChange = async (newImageName) => {
    setImageName(newImageName);
    console.log("................ImageNAme", newImageName);
    console.log("................ImageNAmeDeependra", newImageName.path);
  };
  useEffect(() => {
    Geocoder.init("AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw", {
      language: "en",
    });
    CheckIOSMapPermission();
    // setFullName(loginData?.Account_details[0]?.UAD_FIRST_NAME);
    // setEmail(loginData?.Login_details?.email);
    // setPhoneNumber(String(loginData?.Account_details[0]?.UAD_PHONE_NO));
    // setLocation(loginData?.Account_details[0]?.UAD_CURR_PHYSICAL_ADD);
  }, []);
  const goBack = () => {
    props.navigation.pop();
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

  const toggleView = () => {
    setVisible(!visible);
  };

  // Api intrrigation......
  const Updateprofile = async () => {
    const formData = new FormData();
    if (ImageName && typeof ImageName === "string") {
      const imageUri = ImageName;
      const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
      formData.append("profile_photo", {
        uri: imageUri,
        name: imageName,
      });
    }
    formData.append("uad_key", loginData?.Login_details?.user_account_id);
    formData.append("first_name", fullName);
    formData.append("last_name", lastName);
    formData.append("phone_number", phoneNumber);
    formData.append("physical_address", location);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);
    console.log("formData", formData);
    const url = Config.BASE_URL;
    const updateProfile_url = url + "profile/updateProfile";
    console.log("Request URL:", updateProfile_url);
    setIsLoading(true);
    try {
      const response = await axios.post(updateProfile_url, formData, {
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
                    style={{}}
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
                      Full name
                    </Text>
                    <View style={EditProfileStyle.simpleinputview}>
                      <TextInput
                        value={fullName}
                        onChangeText={setFullName}
                        keyboardType="numeric"
                        placeholder="Jason Stathom"
                        placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                      />
                    </View>
                  </View>
                  <View style={EditProfileStyle.firstview}>
                    <Text style={EditProfileStyle.oldnumbertext}>
                      Last name
                    </Text>
                    <View style={EditProfileStyle.simpleinputview}>
                      <TextInput
                        value={lastName}
                        onChangeText={setLastName}
                        keyboardType="numeric"
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
                    <View style={EditProfileStyle.phoneinputbindview}>
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
                    </View>
                  </View>
                  <View style={EditProfileStyle.inputContainer}>
                    <Text style={LABEL_STYLES.commontext}>{"About"}</Text>
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
                  setlatitude(details.geometry.location.lat);
                  setlongitude(details.geometry.location.lng);
                  setIsSearch(false);
                  setIsMap(true);
                  setLocation(details.formatted_address);
                }}
              />
            ) : (
              <CompanyDetails openMap={openMap} />
            )}
          </>
        );
      case "Tab3":
        return (
          <View>
            <Text>{"Personal Documents"}</Text>
          </View>
        );
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
            // flex:0.5,
            backgroundColor: "transparent",
          }}
        >
          <MapScreen
            style={{
              // flex:0.5,
              height: "85%",
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
            setLocation(details.formatted_address);
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
              Tab3={"Personal Documents"}
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
