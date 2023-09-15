import { View, Text, Image, TextInput } from "react-native";
import React, { useState } from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { EditProfileStyle } from "./EditProfileStyle";
import { Divider } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { CreateJobFirstStyle } from "../../CreateJob/CreateJobFirstScreenCss";
import { ScrollView } from "react-native-gesture-handler";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, IMAGES } from "../../../Themes";
const data = [
  { label: "Delhi", value: "1" },
  { label: "Mumbai", value: "2" },
  { label: "Punjab", value: "3" },
  { label: "West Bengal", value: "4" },
  { label: "Pune", value: "5" },
];

const EditProfile = () => {
  const [value, setValue] = useState(null);
  return (
    <>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Edit profile"}
      />
      <ScrollView>
        <View style={EditProfileStyle.profilviewmain}>
          <View style={EditProfileStyle.editlogoview}>
            <Image
              style={EditProfileStyle.editlogo}
              source={require("../../../assets/icons/edit.png")}
            />
          </View>
          <View style={EditProfile.profileviewimg}>
            <Image
              style={EditProfileStyle.profilelogo}
              source={IMAGES.Landlordprofile}
              resizeMode="contain"
            />
          </View>
          <Text style={EditProfileStyle.edittext}>Edit profile photo</Text>
        </View>

        <Divider style={EditProfileStyle.firstdivider} />

        <View style={EditProfileStyle.inputmainview}>
          <View style={EditProfileStyle.firstview}>
            <Text style={EditProfileStyle.oldnumbertext}>Full name</Text>

            <View>
              <TextInput
                keyboardType="numeric"
                placeholder="Jason Stathom"
                style={EditProfileStyle.simpleinput}
              />
              <Image
                style={EditProfileStyle.Vectorimg}
                source={require("../../../assets/icons/Vector.png")}
              />
            </View>
          </View>

          <View style={EditProfileStyle.firstview}>
            <Text style={EditProfileStyle.oldnumbertext}>Email address</Text>

            <View>
              <TextInput
                keyboardType="numeric"
                placeholder="jason5@gmail.com"
                style={EditProfileStyle.simpleinput}
              />
              <Image
                style={EditProfileStyle.Vectorimg}
                source={require("../../../assets/icons/Vector.png")}
              />
            </View>
          </View>

          <View style={EditProfileStyle.firstview}>
            <Text style={EditProfileStyle.oldnumbertext}>Phone number</Text>

            <View>
              <View>
                <Text style={EditProfileStyle.numbercode}>+61</Text>
                <Image
                  style={EditProfileStyle.downarrowimg}
                  source={require("../../../assets/icons/downarrow.png")}
                />
                <Image
                  style={EditProfileStyle.lineimg}
                  source={require("../../../assets/icons/verticalLineimg.png")}
                />
              </View>
              <TextInput
                keyboardType="numeric"
                placeholder="1234567890"
                style={EditProfileStyle.input}
              />
              <Image
                style={EditProfileStyle.Vectorimg}
                source={require("../../../assets/icons/Vector.png")}
              />
            </View>
          </View>

          <View style={EditProfileStyle.firstview}>
            <Text style={EditProfileStyle.oldnumbertext}>Physical address</Text>

            <View>
              <Image
                style={EditProfileStyle.locationimg}
                source={require("../../../assets/icons/location.png")}
              />
              <TextInput
                keyboardType="numeric"
                placeholder="Search new location"
                style={EditProfileStyle.simpleinputphysical}
              />
              <Image
                style={EditProfileStyle.Vectorimg}
                source={require("../../../assets/icons/Vector.png")}
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
        />

          <View style={EditProfileStyle.secondbuttonview}>
          <CustomSingleButton
          leftImage={IMAGES.uploadIcon}
          isLeftImage={true}
          borderColor={_COLORS.Kodie_TransparentColor}
          _ButtonText={"Add second ID"}
          backgroundColor={_COLORS.Kodie_lightGreenColor}
        />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default EditProfile;
