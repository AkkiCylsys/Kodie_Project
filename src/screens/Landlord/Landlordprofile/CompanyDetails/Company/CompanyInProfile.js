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
import CompanyInProfileStyle from "./CompanyInProfileStyle";
import PhoneInput from "react-native-phone-number-input";
import CustomSingleButton from "../../../../../components/Atoms/CustomButton/CustomSingleButton";
import { Dropdown } from "react-native-element-dropdown";
import { _COLORS, FONTFAMILY, LABEL_STYLES } from "../../../../../Themes";
import { Divider } from "react-native-paper";
import { IMAGES } from "../../../../../Themes";
import Octicons from "react-native-vector-icons/Octicons";
import { Config } from "../../../../../Config";
import ServicesBox from "../../../../../components/Molecules/ServicesBox/ServicesBox";
import { CommonLoader } from "../../../../../components/Molecules/ActiveLoader/ActiveLoader";
import axios from "axios";
const data = [
  { lookup_key: 1, lookup_description: "Item 1" },
  { lookup_key: 2, lookup_description: "Item 2" },
  { lookup_key: 3, lookup_description: "Item 3" },
  { lookup_key: 4, lookup_description: "Item 4" },
];

const CompanyInProfile = (props) => {
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [companyGSTNumber, setCompanyGSTNumber] = useState("");
  const [location, setLocation] = useState("");
  const [servicesValue, setservicesValue] = useState(0);
  const [businessNumber, SetBusinessNumber] = useState("");
  const [kodieDescribeYourselfData, setKodieDescribeYourselfData] = useState(
    []
  );
  const [kodieDescribeYourselfId, setKodieDescribeYourselfDataId] =
    useState("");
    const [selectedServices, setSelectedServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectJobTypeid, setSelectJobTypeid] = useState("");
    const [selectJobType, setSelectJobType] = useState();
    const [isClick, setIsClick] = useState(false);

    const handleBoxPress = (lookup_key) => {
      setIsClick(lookup_key);
      setSelectJobTypeid(lookup_key);
      // alert(selectJobTypeid);
      // alert(isClick)
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
              CompanyInProfileStyle.box_style,
              {
                backgroundColor:
                  isClick === item.lookup_key
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor,
              },
            ]}
            textColor={[
              CompanyInProfileStyle.box_Text_Style,
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
      // describe your self.....
  const handle_describe_yourself = () => {
    const describe_yourself_Data = {
      P_PARENT_CODE: "JOB_TYPE",
      P_TYPE: "OPTION",
    };
    const url = Config.BASE_URL;
    const describeYourselfApi = url + "lookup_details";
    console.log("Request URL:", describeYourselfApi);
    setIsLoading(true);
    axios
      .post(describeYourselfApi, describe_yourself_Data)
      .then((response) => {
        console.log("kodie_describeYouself_Data", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log(
            "kodie_describeYouself_Data....",
            response.data.lookup_details
          );
          setKodieDescribeYourselfData(response.data.lookup_details);
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

  useEffect(() => {
  handle_describe_yourself();
  }, []);
  return (
    <View>
      <View style={CompanyInProfileStyle.card}>
        <View style={CompanyInProfileStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>{"Organisation name"}</Text>
          <TextInput
            style={CompanyInProfileStyle.input}
            value={companyName}
            onChangeText={setCompanyName}
            placeholder="Enter the name of your company"
            placeholderTextColor="#999"
          />
          <Text style={CompanyInProfileStyle.smstext}>
            Your organisation name will be used in emails and SMS correspondence
            from Kodie.
          </Text>
        </View>

        <View style={CompanyInProfileStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>
            {"Australian business number"}
          </Text>
          <TextInput
            style={[CompanyInProfileStyle.input]}
            value={businessNumber}
            onChangeText={SetBusinessNumber}
            placeholder="Enter your ABN"
            placeholderTextColor="#999"
          />
        </View>

        <View style={CompanyInProfileStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>
            {"Company GST / VAT number"}
          </Text>
          <TextInput
            style={[CompanyInProfileStyle.input]}
            value={companyGSTNumber}
            onChangeText={setCompanyGSTNumber}
            placeholder="1234567890"
            placeholderTextColor="#999"
          />
        </View>

        <View>
          <Text style={CompanyInProfileStyle.want_Heading}>
            {
              "How would you describe yourself? (you can select multiple options)"
            }
          </Text>
          <FlatList
            data={kodieDescribeYourselfData}
            renderItem={jobType_render}
            keyExtractor={(item) => item.lookup_key.toString()}
            numColumns={2}
          />
        </View>
        <View style={CompanyInProfileStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>
            {"The type of service you perform"}
          </Text>
          <Dropdown
            style={CompanyInProfileStyle.dropdown}
            placeholderStyle={CompanyInProfileStyle.placeholderStyle}
            selectedTextStyle={CompanyInProfileStyle.selectedTextStyle}
            inputSearchStyle={CompanyInProfileStyle.inputSearchStyle}
            iconStyle={CompanyInProfileStyle.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="lookup_description"
            valueField="lookup_key"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={servicesValue}
            onChange={(item) => {
              setservicesValue(item.lookup_key);
              // You can perform any additional actions here based on the selected item
            }}
          />
        </View>
        <View style={CompanyInProfileStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>
            {"Company physical address"}
          </Text>

          <View style={CompanyInProfileStyle.inputContainer}>
            <View style={CompanyInProfileStyle.locationConView}>
              <View style={CompanyInProfileStyle.locationContainer}>
                <TextInput
                  style={CompanyInProfileStyle.locationInput}
                  value={location}
                  onChangeText={setLocation}
                  onFocus={() => {
                    setIsSearch(true);
                    // setlocationError("");
                  }}
                  placeholder="Search location"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>
              <TouchableOpacity
                style={CompanyInProfileStyle.locationIconView}
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
                  size={22}
                  color={_COLORS.Kodie_GreenColor}
                  style={CompanyInProfileStyle.locationIcon}
                />
              </TouchableOpacity>
            </View>
            {/* {locationError ? (
                  <Text style={PropertyDetailsStyle.error_text}>
                    {locationError}
                  </Text>
                ) : null} */}
          </View>
        </View>

        <View style={CompanyInProfileStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>{"Website"}</Text>
          <TextInput
            style={CompanyInProfileStyle.input}
            value={website}
            onChangeText={setWebsite}
            placeholder="Enter your website address (if you have one)"
            placeholderTextColor={_COLORS.Kodie_LightGrayColor}
          />
        </View>
      </View>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default CompanyInProfile;
