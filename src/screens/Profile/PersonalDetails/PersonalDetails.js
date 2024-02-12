import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import PersonalDetailStyle from "./PersonalDetailStyle";
import { Divider } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import { _goBack } from "../../../services/CommonServices";
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
import { _COLORS, IMAGES, LABEL_STYLES } from "../../../Themes";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import axios from "axios";

const PersonalDetails = (props) => {
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
    getAddress()
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
        console.log("json location.......",json)
        console.log("current address...",json.results[0].formatted_address)
        setLocation(json.results[0].formatted_address)
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
  //   Api intrigation....
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
  return (
    <View>
      <ScrollView
        style={PersonalDetailStyle.mainContainer}
        contentContainerStyle={{ marginBottom: 200 }}
      >
        {IsMap || IsSearch ? null : (
          <>
            <View style={[PersonalDetailStyle.profilviewmain, { flex: 1 }]}>
              <TouchableOpacity
                style={PersonalDetailStyle.ProfileView}
                onPress={() => {
                  refRBSheet.current.open();
                }}
              >
                {ImageName ? (
                  <Image
                    source={{ uri: ImageName.path || ImageName }}
                    style={[
                      PersonalDetailStyle.logo,
                      { borderRadius: 110 / 2 },
                    ]}
                  />
                ) : (
                  <Image
                    style={PersonalDetailStyle.profilelogo}
                    source={{
                      uri: loginData?.Login_details?.profile_photo_path,
                    }}
                    resizeMode="cover"
                  />
                )}

                {ImageName ? refRBSheet.current.close() : null}
                <View style={PersonalDetailStyle.editlogoview}>
                  <FontAwesome
                    name="edit"
                    color={_COLORS.Kodie_GreenColor}
                    size={18}
                    style={{ alignSelf: "center" }}
                  />
                </View>
              </TouchableOpacity>
              <Text style={PersonalDetailStyle.edittext}>
                Edit profile photo
              </Text>
            </View>

            <Divider style={PersonalDetailStyle.firstdivider} />
            <View style={PersonalDetailStyle.inputmainview}>
              <View style={PersonalDetailStyle.firstview}>
                <Text style={PersonalDetailStyle.oldnumbertext}>Full name</Text>
                <View style={PersonalDetailStyle.simpleinputview}>
                  <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    keyboardType="numeric"
                    placeholder="Jason Stathom"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  />
                </View>
              </View>
              <View style={PersonalDetailStyle.firstview}>
                <Text style={PersonalDetailStyle.oldnumbertext}>Last name</Text>
                <View style={PersonalDetailStyle.simpleinputview}>
                  <TextInput
                    value={lastName}
                    onChangeText={setLastName}
                    keyboardType="numeric"
                    placeholder="Jason Stathom"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  />
                </View>
              </View>
              <View style={PersonalDetailStyle.firstview}>
                <Text style={PersonalDetailStyle.oldnumbertext}>
                  Email address
                </Text>
                <View style={PersonalDetailStyle.simpleinputview}>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="numeric"
                    placeholder="jason5@gmail.com"
                    editable={false}
                  />
                </View>
              </View>
              <View style={PersonalDetailStyle.firstview}>
                <Text style={PersonalDetailStyle.oldnumbertext}>
                  Phone number
                </Text>
                <View style={PersonalDetailStyle.phoneinputbindview}>
                  <View style={PersonalDetailStyle.phoneinput}>
                    <View style={PersonalDetailStyle.bindnumberview}>
                      <Text style={PersonalDetailStyle.numbercode}>+61</Text>
                      <Ionicons
                        name="chevron-down-outline"
                        size={20}
                        color={_COLORS.Kodie_LightGrayColor}
                        resizeMode={"contain"}
                      />
                      <Image
                        style={PersonalDetailStyle.lineimg}
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
              <View style={PersonalDetailStyle.inputContainer}>
                <Text style={LABEL_STYLES.commontext}>{"About"}</Text>
                <TextInput
                  style={[PersonalDetailStyle.input, { height: 119 }]}
                  value={about}
                  onChangeText={setAbout}
                  placeholder="Tell us a bit more about yourself"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={5}
                  textAlignVertical={"top"}
                />
              </View>
              <View style={PersonalDetailStyle.firstview}>
                <Text style={PersonalDetailStyle.oldnumbertext}>
                  Physical address
                </Text>

                <View style={PersonalDetailStyle.locationContainer}>
                  <TextInput
                    style={PersonalDetailStyle.locationInput}
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
                    style={PersonalDetailStyle.locationIconView}
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
                      style={PersonalDetailStyle.locationIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={PersonalDetailStyle.saveBackButton}>
              <View style={PersonalDetailStyle.secondview}>
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
          container: PersonalDetailStyle.bottomModal_container,
        }}
      >
        <View style={PersonalDetailStyle.upload_View}>
          <Text style={PersonalDetailStyle.uploadImgText}>
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
              style={PersonalDetailStyle.crossIconStyle}
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

export default PersonalDetails;
