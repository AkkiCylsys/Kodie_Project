//ScreenNo:199,200,201,202
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import { _COLORS, IMAGES } from "../../../../Themes";
import { AccountStepStyle } from "./AccountStepStyle";
import { Divider } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Dropdown } from "react-native-element-dropdown";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import RBSheet from "react-native-raw-bottom-sheet";
import UploadImageData from "../../../../components/Molecules/UploadImage/UploadImage";
import { logos } from "../../../../Themes/CommonVectors/Images";
const data = [
  { label: "Delhi", value: "1" },
  { label: "Mumbai", value: "2" },
  { label: "Punjab", value: "3" },
  { label: "West Bengal", value: "4" },
  { label: "Pune", value: "5" },
];
const AccountStep = (props) => {
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [activeTab, setActiveTab] = useState("Tab1");
  const [value, setValue] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleView = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Edit profile"}
      />
      <ScrollView>
        <View style={AccountStepStyle.maincontainer}>
          <View style={AccountStepStyle.topheading}>
            <Image
              source={logos.mainLogo}
              resizeMode="contain"
              style={AccountStepStyle.mainimg}
            />
            <Text style={AccountStepStyle.toptextheading}>
              Add company logo
            </Text>
          </View>

          <Divider />

          <View style={AccountStepStyle.organisationview}>
            <Text style={AccountStepStyle.organisationtext}>
              Organisation name
            </Text>
            <View style={AccountStepStyle.inputfiledbind}>
              <TextInput
                placeholder="Kodie Property Management PTY LTD"
                style={AccountStepStyle.inputbox}
                placeholderTextColor={_COLORS.Kodie_BlackColor}
              />
              <View style={AccountStepStyle.inputimgeview}>
                <AntDesign
                    name="edit"
                    size={25}
                    color={_COLORS.Kodie_LightGrayColor}
                    resizeMode={"contain"}
                  />
              </View>
            </View>
          </View>

          <View
            style={[
              AccountStepStyle.organisationview,
              AccountStepStyle.companyemailview,
            ]}
          >
            <Text style={AccountStepStyle.organisationtext}>
              Company email address
            </Text>
            <View
              style={[
                AccountStepStyle.inputfiledbind,
                AccountStepStyle.companyinputbind,
              ]}
            >
              <TextInput
                placeholder="info@kodie.com.au"
                style={AccountStepStyle.inputemailbox}
                placeholderTextColor={_COLORS.Kodie_BlackColor}
              />
              <View style={AccountStepStyle.inputimgeview}>
              <AntDesign
                    name="edit"
                    size={25}
                    color={_COLORS.Kodie_LightGrayColor}
                    resizeMode={"contain"}
                  />
              </View>
            </View>
          </View>

          <View
            style={[
              AccountStepStyle.organisationview,
              AccountStepStyle.companyemailview,
            ]}
          >
            <Text style={AccountStepStyle.organisationtext}>
              Company phone number
            </Text>
            <View
              style={[
                AccountStepStyle.inputfiledbind,
                AccountStepStyle.companyinputbind,
              ]}
            >
              <View style={AccountStepStyle.bindphonenumberview}>
                <Text style={AccountStepStyle.numbercode}>+</Text>
                <Text style={AccountStepStyle.numbercode}>61</Text>
                <Ionicons
                    name="chevron-down-outline"
                    size={20}
                    color={_COLORS.Kodie_LightGrayColor}
                    resizeMode={"contain"}
                  />
                  {/* <Image
                  style={AccountStepStyle.downarrowimg}
                  source={IMAGES.downarrow}
                /> */}
                <Image
                  style={AccountStepStyle.lineimg}
                  source={IMAGES.verticalLine}
                />
                <TextInput
                  placeholder="1234567890"
                  style={AccountStepStyle.inputbox}
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>

              <View style={AccountStepStyle.inputimgeview}>
              <AntDesign
                    name="edit"
                    size={25}
                    color={_COLORS.Kodie_LightGrayColor}
                    resizeMode={"contain"}
                  />
              </View>
            </View>
          </View>

          <View
            style={[
              AccountStepStyle.organisationview,
              AccountStepStyle.companyemailview,
            ]}
          >
            <Text style={AccountStepStyle.organisationtext}>
              Company physical address
            </Text>
            <View
              style={[
                AccountStepStyle.inputfiledbind,
                AccountStepStyle.companyinputbind,
              ]}
            >
              <View style={AccountStepStyle.locationbindfield}>
              <Ionicons
                    name="location-sharp"
                    size={25}
                    color={_COLORS.Kodie_MediumGrayColor}
                    resizeMode={"contain"}
                  />
                <TextInput
                  placeholder="Search new location"
                  style={AccountStepStyle.inputbox}
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>
              <View style={AccountStepStyle.inputimgeview}>
              <AntDesign
                    name="edit"
                    size={25}
                    color={_COLORS.Kodie_LightGrayColor}
                    resizeMode={"contain"}
                  />
              </View>
            </View>
            <Dropdown
              style={AccountStepStyle.dropdown}
              placeholderStyle={AccountStepStyle.placeholderStyle}
              selectedTextStyle={AccountStepStyle.selectedTextStyle}
              inputSearchStyle={AccountStepStyle.inputSearchStyle}
              iconStyle={AccountStepStyle.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Enter address manually"
              searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </View>

          <View
            style={[
              AccountStepStyle.organisationview,
              AccountStepStyle.companyemailview,
            ]}
          >
            <Text style={AccountStepStyle.organisationtext}>
              Company GST / VAT number
            </Text>
            <View
              style={[
                AccountStepStyle.inputfiledbind,
                AccountStepStyle.companyinputbind,
              ]}
            >
              <View style={AccountStepStyle.locationbindfield}>
                {/* <Image source={IMAGES.Location} /> */}
                <Ionicons
                    name="location-sharp"
                    size={25}
                    color={_COLORS.Kodie_MediumGrayColor}
                    resizeMode={"contain"}
                  />
                <TextInput
                  placeholder="Search new location"
                  style={AccountStepStyle.inputbox}
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>
              <View style={AccountStepStyle.inputimgeview}>
              <AntDesign
                    name="edit"
                    size={25}
                    color={_COLORS.Kodie_LightGrayColor}
                    resizeMode={"contain"}
                  />
              </View>
            </View>
          </View>

          <View style={AccountStepStyle.uploadDocumentview}>
            <Text style={AccountStepStyle.updloadtext}>
              Upload company documents{" "}
            </Text>
            <View style={AccountStepStyle.uploadDescriptionview}>
              <Text style={AccountStepStyle.uploadDescription}>
                Documents should be formatted .pdf or .jpg or .png Size per file
                should not exceed 5 MB
              </Text>
            </View>
          </View>

          {visible && (
            <View>
              <TouchableOpacity
                style={AccountStepStyle.textContainer}
                onPress={() => {
                  refRBSheet2.current.open();
                }}
              >
                <View style={AccountStepStyle.bindfile}>
                  {/* <MaterialCommunityIcons name="file" size={35} /> */}
                  <Image source={IMAGES.document} />
                  <View>
                    <Text style={AccountStepStyle.pdfName}>
                      {"Company document.pdf"}
                    </Text>
                    <Text style={AccountStepStyle.pdfSize}>{"4.8 MB"}</Text>
                  </View>
                </View>
                <Entypo
                  name="dots-three-vertical"
                  size={20}
                  style={AccountStepStyle.doticon}
                />
              </TouchableOpacity>

              <View style={AccountStepStyle.textContainer}>
                <View style={AccountStepStyle.bindfile}>
                  <Image source={IMAGES.document} />
                  <View>
                    <Text style={AccountStepStyle.pdfName}>
                      {"Company document.pdf"}
                    </Text>
                    <Text style={AccountStepStyle.pdfSize}>{"4.8 MB"}</Text>
                  </View>
                </View>
                <Entypo
                  name="dots-three-vertical"
                  size={20}
                  style={AccountStepStyle.doticon}
                />
              </View>
            </View>
          )}

          <View style={AccountStepStyle.buttonview}>
            <CustomSingleButton
              disabled={isLoading ? true : false}
              leftImage={<AntDesign
                name="edit"
                size={25}
                color={_COLORS.Kodie_LightGrayColor}
                resizeMode={"contain"}
              />}
              isLeftImage={true}
              borderColor={_COLORS.Kodie_TransparentColor}
              _ButtonText={"Upload"}
              backgroundColor={_COLORS.Kodie_lightGreenColor}
              onPress={() => {
                refRBSheet.current.open();
              }}
            />

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
                container: AccountStepStyle.bottomModal_container,
              }}
            >
              <UploadImageData
                heading_Text={"Upload  documents"}
                onPress={toggleView}
              />
            </RBSheet>

            {/* -----  edit docoment rb sheet here */}
            <RBSheet
              ref={refRBSheet2}
              height={200}
              customStyles={{
                wrapper: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                draggableIcon: {
                  backgroundColor: _COLORS.Kodie_LightGrayColor,
                },
                container: AccountStepStyle.bottomModal_container,
              }}
            >
              <UploadImageData
                heading_Text={"Edit  documents"}
                onPress={toggleView}
              />
            </RBSheet>

            <View style={AccountStepStyle.secondbuttonview}>
              <CustomSingleButton
                disabled={isLoading ? true : false}
                leftImage={IMAGES.uploadIcon}
                isLeftImage={true}
                Text_Color={_COLORS.Kodie_WhiteColor}
                borderColor={_COLORS.Kodie_TransparentColor}
                _ButtonText={"Save"}
                backgroundColor={_COLORS.Kodie_BlackColor}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountStep;
