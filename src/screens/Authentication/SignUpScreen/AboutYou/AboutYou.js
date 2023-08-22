import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { AboutYouStyle } from "./AboutYouStyle";
import { IMAGES, LABEL_STYLES, _COLORS } from "../../../../Themes";
import { Dropdown } from "react-native-element-dropdown";
import Octicons from "react-native-vector-icons/Octicons";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import RBSheet from "react-native-raw-bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import UploadImageData from "../../../../components/Molecules/UploadImage/UploadImage";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
const data = [
  { label: "123 Street, Brisbane, Australia", value: "1" },
  { label: "123 Street, Brisbane, America", value: "2" },
  { label: "123 Street, Brisbane, Australia", value: "3" },
  { label: "123 Street, Brisbane, Australia", value: "4" },
  { label: "123 Street, Brisbane, Australia", value: "5" },
];
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
  const [personalbio, setPersonalbio] = useState("");
  const [value, setValue] = useState(null);
  const [location, setLocation] = useState("");
  const [Check, setCheck] = useState(1);
  const refRBSheet = useRef();

  const wantList = ({ item, index }) => {
    return (
      <View>
        <View style={AboutYouStyle.want_List_View}>
          <TouchableOpacity
            onPress={() => {
              setCheck(item.id);
            }}
          >
            <View
              style={[
                AboutYouStyle.radio_View,
                {
                  borderColor:
                    Check == item.id
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_ExtraLightGrayColor,
                },
              ]}
            >
              {Check == item.id ? (
                <View style={AboutYouStyle.radioBg}></View>
              ) : null}
            </View>
          </TouchableOpacity>
          <Text style={AboutYouStyle.want_List_text}>{item.list}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={AboutYouStyle.mainContainer}>
      <TopHeader   MiddleText={"Set up your Kodie account"}
        onPressLeftButton={() => _goBack(props)}/>
      <ScrollView>
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
            <Image source={IMAGES.userIcons} style={AboutYouStyle.logo} />
          </TouchableOpacity>
          <View style={AboutYouStyle.Bio_View}>
            <Text style={LABEL_STYLES.commontext}>{"Personal bio"}</Text>
            <TextInput
              style={[AboutYouStyle.input, AboutYouStyle.BioD_]}
              value={personalbio}
              onChangeText={setPersonalbio}
              placeholder="Tell us more about you."
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              multiline
              numberOfLines={5}
              textAlignVertical={"top"}
            />
          </View>
          <View style={AboutYouStyle.Bio_View}>
            <Text style={LABEL_STYLES.commontext}>{"Physical address"}</Text>
            <Dropdown
              style={AboutYouStyle.dropdown}
              placeholderStyle={AboutYouStyle.placeholderStyle}
              selectedTextStyle={AboutYouStyle.selectedTextStyle}
              inputSearchStyle={AboutYouStyle.inputSearchStyle}
              iconStyle={AboutYouStyle.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="123 Street, Brisbane, Australia"
              searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
              renderLeftIcon={() => (
                <Text style={AboutYouStyle.HomeText}>{"Home :"}</Text>
              )}
            />
          </View>
          <View style={AboutYouStyle.locationContainer}>
            <Octicons
              name={"location"}
              size={20}
              color={_COLORS.Kodie_MediumGrayColor}
              style={AboutYouStyle.locationIcon}
            />
            <TextInput
              style={AboutYouStyle.locationInput}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter new location"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            />
          </View>

          <Text style={AboutYouStyle.want_Heading}>
            {"What do you want to do first with Kodie"}
          </Text>
          <FlatList
            data={List}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            keyExtractor={(item) => item?.id}
            renderItem={wantList}
          />
          <View>
            <CustomSingleButton
              _ButtonText={"Next"}
              Text_Color={_COLORS.Kodie_WhiteColor}
            />
            <CustomSingleButton
              _ButtonText={"Fill these details out later"}
              Text_Color={_COLORS.Kodie_BlackColor}
              backgroundColor={_COLORS.Kodie_WhiteColor}
            />
          </View>
          <View style={AboutYouStyle.goBack_View}>
            <TouchableOpacity style={AboutYouStyle.backIcon}>
              <Ionicons
                name="chevron-back"
                size={22}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </TouchableOpacity>
            <Text style={AboutYouStyle.goBack_Text}>{"Go back"}</Text>
          </View>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
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
            <UploadImageData />
          </RBSheet>
        </View>
      </ScrollView>
    </View>
  );
};
