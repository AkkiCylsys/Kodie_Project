//ScreenNo:11
//ScreenNo:12
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { AboutYouStyle } from "./AboutYouStyle";
import ServicesBox from "../../../../components/Molecules/ServicesBox/ServicesBox";
import { IMAGES, _COLORS } from "../../../../Themes";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import RBSheet from "react-native-raw-bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import UploadImageData from "../../../../components/Molecules/UploadImage/UploadImage";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import Entypo from "react-native-vector-icons/Entypo";
import { Config } from "../../../../Config";
import axios from "axios";
import StepIndicator from "react-native-step-indicator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";

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
  stepIndicatorCurrentColor: _COLORS.Kodie_GreenColor,
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
const List = [
  {
    id: "1",
    list: "I have properties I would like to manage",
  },
  {
    id: "2",
    list: "I am looking for a property to rente",
  },
  {
    id: "3",
    list: "I would like to find contractors easily",
  },
  {
    id: "4",
    list: "I would like to offer my contracting services",
  },
  {
    id: "5",
    list: "I need a way to manage my rental documents",
  },
  {
    id: "6",
    list: "I would like to advertise my properties",
  },
  {
    id: "7",
    list: "I want to set notifications to remind me of key dates",
  },
];
export default AboutYou = (props) => {
  let firstName = props?.route?.params?.firstName;
  let lastName = props?.route?.params?.lastName;
  let mobileNumber = props?.route?.params?.mobileNumber;
  let physicalAddress = props?.route?.params?.physicalAddress;
  let organisation = props?.route?.params?.organisation;
  let referral = props?.route?.params?.referral;
  let email = props?.route?.params?.email;
  console.log("firstname..", firstName);
  console.log("lastName..", lastName);
  console.log("mobileNumber..", mobileNumber);
  console.log("physicalAddress..", physicalAddress);
  console.log("organisation..", organisation);
  console.log("referral..", referral);
  console.log("email..", email);

  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setIsClick] = useState(null);
  const [selectManageProperty, setSelectManageProperty] = useState("");
  const [selected, setSelected] = useState([]);
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

  const [kodiehelplookupid, setKodiehelplookupid] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedkey_features, setSelectedkey_features] = useState([]);
  const [selectedLookupKeys, setSelectedLookupKeys] = useState([]); // State to store selected lookup keys
  const refRBSheet = useRef();
  // .....
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
            <View style={{ flexDirection: "row" }}>
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
              <Text style={AboutYouStyle.want_List_text}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleImageNameChange = async (newImageName) => {
    setImageName(newImageName);
    console.log("................ImageNAme", newImageName);
    console.log("................ImageNAmeDeependra", newImageName.path);
  };

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
  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  // const toggleSelection = (lookup_key) => {
  //   if (selectedServices.includes(lookup_key)) {
  //     setSelectedServices(
  //       selectedServices.filter((item) => item !== lookup_key)
  //       // alert(selectedServices.filter((item) => item !== lookup_key))
  //     );
  //   } else {
  //     setSelectedServices([...selectedServices, lookup_key]);
  //     // alert([...selectedServices]);
  //   }
  // };

  const toggleSelection = (lookup_key) => {
    if (selectedServices.includes(lookup_key)) {
      // Item is already selected, remove it
      setSelectedServices((prevSelected) =>
        prevSelected.filter((item) => item !== lookup_key)
      );
    } else {
      // Item is not selected, add it
      setSelectedServices((prevSelected) => [...prevSelected, lookup_key]);
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
        // alert(item.lookup_key);
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
  useEffect(() => {
    handle_manage_property(), handle_kodiehelp(), handle_describe_yourself();
  }, []);

  const selectedServiceKeysString = selectedServices.join(",");
  const kodieHelpValue = selectedLookupKeys.join(",");

  // ...Api intrigatrion
  // describe your self.....
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
  // kodie help api...
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
  const goBack = () => {
    props.navigation.pop();
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
  return (
    <ScrollView>
      <TopHeader
        MiddleText={"Set up your Kodie account"}
        onPressLeftButton={goBack}
      />
      <View style={AboutYouStyle.stepIndicator}>
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
            <Image source={IMAGES?.userIcons} style={[AboutYouStyle.logo]} />
          )}
        </TouchableOpacity>
        {ImageName ? refRBSheet.current.close() : null}
        <Text style={AboutYouStyle.want_Heading}>
          {"How would you describe yourself? (you can select multiple options)"}
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
          <View style={AboutYouStyle.upload_View}>
            <Text style={AboutYouStyle.uploadImgText}>
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
                style={AboutYouStyle.crossIconStyle}
              />
            </TouchableOpacity>
          </View>
          <UploadImageData
            heading_Text={"Upload image"}
            ImageName={handleImageNameChange}
          />
        </RBSheet>
      </View>
      <View style={{ marginHorizontal: 16 }}>
        <CustomSingleButton
          _ButtonText={"Next"}
          Text_Color={_COLORS.Kodie_WhiteColor}
          onPress={() => {
            props.navigation.navigate("FirstProperty", {
              firstName: firstName,
              lastName: lastName,
              mobileNumber: mobileNumber,
              physicalAddress: physicalAddress,
              organisation: organisation,
              referral: referral,
              selectManageProperty: selectManageProperty,
              selectedServiceKeysString: selectedServiceKeysString,
              kodieHelpValue: kodieHelpValue,
              ImageName: ImageName,
              email: email,
            });
          }}
        />
      </View>
      <View style={{ marginHorizontal: 16 }}>
        <CustomSingleButton
          _ButtonText={"Fill these details out later"}
          Text_Color={_COLORS.Kodie_BlackColor}
          backgroundColor={_COLORS.Kodie_WhiteColor}
          onPress={() => {
            props.navigation.navigate("FirstProperty");
          }}
        />
      </View>
      <TouchableOpacity style={AboutYouStyle.goBack_View} onPress={goBack}>
        <View style={AboutYouStyle.backIcon}>
          <Ionicons
            name="chevron-back"
            size={22}
            color={_COLORS.Kodie_MediumGrayColor}
          />
        </View>
        <Text style={AboutYouStyle.goBack_Text}>{"Go back"}</Text>
      </TouchableOpacity>
      {isLoading ? <CommonLoader /> : null}
    </ScrollView>
  );
};
