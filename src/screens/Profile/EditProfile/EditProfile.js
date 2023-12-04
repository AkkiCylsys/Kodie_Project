import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { EditProfileStyle } from "./EditProfileStyle";
import { Divider } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { CreateJobFirstStyle } from "../../CreateJob/CreateJobFirstScreenCss";
import { ScrollView } from "react-native-gesture-handler";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, IMAGES } from "../../../Themes";
import RBSheet from "react-native-raw-bottom-sheet";
import UploadImageData from "../../../components/Molecules/UploadImage/UploadImage";
import Entypo from "react-native-vector-icons/Entypo";
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

const EditProfile = () => {
  const [value, setValue] = useState(null);
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [visible, setVisible] = useState(false);
  const [photoid, setPhotoId] = useState(false);

  const toggleView = () => {
    setVisible(!visible);
  };
  return (
    <>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Edit profile"}
      />
      <ScrollView>
        <View style={EditProfileStyle.profilviewmain}>
          <View style={EditProfile.profileviewimg}>
            <Image
              style={EditProfileStyle.profilelogo}
              source={IMAGES.Landlordprofile}
              resizeMode="contain"
            />
            <View style={EditProfileStyle.editlogoview}>
              <Image style={EditProfileStyle.editlogo} source={IMAGES.edit} />
            </View>
          </View>
          <Text style={EditProfileStyle.edittext}>Edit profile photo</Text>
        </View>

        <Divider style={EditProfileStyle.firstdivider} />

        <View style={EditProfileStyle.inputmainview}>
          <View style={EditProfileStyle.firstview}>
            <Text style={EditProfileStyle.oldnumbertext}>Full name</Text>

            <View style={EditProfileStyle.simpleinputview}>
              <TextInput
                keyboardType="numeric"
                placeholder="Jason Stathom"
                placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              />
              <Image
                style={EditProfileStyle.Vectorimg}
                source={IMAGES.pencile}
              />
            </View>
          </View>

          <View style={EditProfileStyle.firstview}>
            <Text style={EditProfileStyle.oldnumbertext}>Email address</Text>

            <View style={EditProfileStyle.simpleinputview}>
              <TextInput
                keyboardType="numeric"
                placeholder="jason5@gmail.com"
              />
              <Image
                style={EditProfileStyle.Vectorimg}
                source={IMAGES.pencile}
              />
            </View>
          </View>

          <View style={EditProfileStyle.firstview}>
            <Text style={EditProfileStyle.oldnumbertext}>Phone number</Text>
            <View style={EditProfileStyle.phoneinputbindview}>
              <View style={EditProfileStyle.phoneinput}>
                <View style={EditProfileStyle.bindnumberview}>
                  <Text style={EditProfileStyle.numbercode}>+61</Text>

                  <Image
                    style={EditProfileStyle.downarrowimg}
                    source={IMAGES.downarrow}
                  />
                  <Image
                    style={EditProfileStyle.lineimg}
                    source={IMAGES.verticalLine}
                  />
                  <TextInput
                    keyboardType="numeric"
                    placeholder="1234567890"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  />
                </View>
                <Image
                  style={EditProfileStyle.Vectorimg}
                  source={IMAGES.pencile}
                />
              </View>
            </View>
          </View>

          <View style={EditProfileStyle.firstview}>
            <Text style={EditProfileStyle.oldnumbertext}>Physical address</Text>

            <View style={EditProfileStyle.simpleinputphysical}>
              <View style={EditProfileStyle.physicalsecondview}>
                <Image
                  style={EditProfileStyle.locationimg}
                  source={IMAGES.Location}
                />
                <TextInput
                  keyboardType="numeric"
                  placeholder="Search new location"
                />
              </View>
              <Image
                style={EditProfileStyle.Vectorimg}
                source={IMAGES.pencile}
              />
            </View>
          </View>

          <View style={EditProfileStyle.dropdownview}>
            <Dropdown
              style={CreateJobFirstStyle.dropdown}
              placeholderStyle={CreateJobFirstStyle.placeholderStyle}
              selectedTextStyle={CreateJobFirstStyle.selectedTextStyle}
              inputSearchStyle={CreateJobFirstStyle.inputSearchStyle}
              iconStyle={CreateJobFirstStyle.iconStyle}
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
        </View>

        <View style={EditProfileStyle.uploadview}>
          <Text style={EditProfileStyle.uploadtext}>
            Upload your ID{" "}
            <Text style={EditProfileStyle.optionaltext}>(optional) </Text>{" "}
          </Text>
          <Text style={EditProfileStyle.leasttext}>
            Upload images of your ID. At least one ID must have your photo on
            it.{" "}
          </Text>
        </View>

        <View style={EditProfileStyle.buttonview}>
          <CustomSingleButton
            leftImage={IMAGES.uploadIcon}
            isLeftImage={true}
            borderColor={_COLORS.Kodie_TransparentColor}
            _ButtonText={"Add photo ID"}
            backgroundColor={_COLORS.Kodie_lightGreenColor}
            onPress={() => {
              refRBSheet.current.open();
            }}
          />

          {photoid && (
            <View style={EditProfileStyle.textContainer}>
              <View style={EditProfileStyle.bindfile}>
                <Image source={IMAGES.document} />
                <View>
                  <Text style={EditProfileStyle.pdfName}>
                    {"Company document.pdf"}
                  </Text>
                  <Text style={EditProfileStyle.pdfSize}>{"4.8 MB"}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet2.current.open();
                }}
              >
                <Entypo
                  name="dots-three-vertical"
                  size={20}
                  style={EditProfileStyle.doticon}
                />
              </TouchableOpacity>
            </View>
          )}
          {/*----------- first RBSheet of uploadImageData ---------*/}
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
            <UploadImageData
              heading_Text={"Upload  documents"}
              onPress={toggleView}
            />
          </RBSheet>
          <View style={EditProfileStyle.secondbuttonview}>
            <CustomSingleButton
              leftImage={IMAGES.uploadIcon}
              isLeftImage={true}
              borderColor={_COLORS.Kodie_TransparentColor}
              _ButtonText={"Add second ID"}
              backgroundColor={_COLORS.Kodie_lightGreenColor}
              onPress={() => {
                refRBSheet2.current.open();
              }}
            />
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
            />
          </View>
        </View>
      </ScrollView>

      {/*----------- first RBSheet of Edit docoment ---------*/}
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
          container: EditProfileStyle.bottomModal_container,
        }}
      >
        <UploadImageData
          heading_Text={"Edit  documents"}
          onPress={toggleView}
        />
      </RBSheet>
    </>
  );
};

export default EditProfile;
