//ScreenNo:94
//ScreenNo:95
//ScreenNo:96
//ScreenNo:97
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import { InspectionCss } from "./InspectionCss";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { IMAGES, LABEL_STYLES, _COLORS } from "../../../../Themes";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import RBSheet from "react-native-raw-bottom-sheet";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import { Dropdown } from "react-native-element-dropdown";
import Bedroom from "./Bedroom/Bedroom";
const Data = [
  {
    id: 1,
    image: IMAGES.BedroomIcon,
    name: "Bedroom",
  },
  {
    id: 2,
    image: IMAGES.Bathroom,
    name: "Bathroom",
  },
  {
    id: 3,
    image: IMAGES.diningRoom,
    name: "Dining Room",
  },
  {
    id: 4,
    image: IMAGES.Exterior,
    name: "Exterior",
  },
  {
    id: 5,
    image: IMAGES.Garage,
    name: "Garage",
  },
  {
    id: 6,
    image: IMAGES.Garden,
    name: "Garden",
  },
  {
    id: 7,
    image: IMAGES.kitchen,
    name: "Kitchen",
  },
  {
    id: 8,
    image: IMAGES.LivingRoom,
    name: "Living Room",
  },
  {
    id: 9,
    image: IMAGES.Roof,
    name: "Roof",
  },
];
const DropdownData = [
  { label: "Bedroom", value: "1" },
  { label: "Bathroom", value: "2" },
  { label: "Dining Room", value: "3" },
  { label: "Exterior", value: "4" },
  { label: "Garage", value: "5" },
  { label: "Garden", value: "6" },
  { label: "Kitchen", value: "7" },
  { label: "Living Room", value: "8" },
  { label: "Roof", value: "9" },
];
const Inspection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const navigateToScreen = (id) => {
    switch (id) {
      case 1:
        <Bedroom />;
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        break;
    }
  };
  const Inspection_render = ({ item }) => {
    return (
      <>
        <View style={InspectionCss.mainView}>
          <View style={InspectionCss.flatListContainer}>
            {!isEditing ? (
              <Image
                source={item.image}
                style={InspectionCss.ImageStyle}
                resizeMode={"center"}
              />
            ) : (
              <AntDesign
                name={"minuscircle"}
                size={20}
                color={_COLORS.Kodie_lightRedColor}
                style={InspectionCss.IconStyle}
              />
            )}
            <Text style={InspectionCss.editText}>{item.name}</Text>
          </View>
          {!isEditing ? (
            <TouchableOpacity
              onPress={() => navigateToScreen(item.id)}
              style={InspectionCss.rightIcon}
            >
              <Feather
                name={"chevron-right"}
                size={20}
                color={_COLORS.Kodie_BlackColor}
                style={InspectionCss.IconStyle}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Entypo
                name={"menu"}
                size={25}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </TouchableOpacity>
          )}
        </View>
        <DividerIcon />
      </>
    );
  };
  return (
    <View style={InspectionCss.MainContainer}>
      <View style={InspectionCss.Container}>
        <View style={InspectionCss.mainView}>
          <Text style={InspectionCss.areasText}>{"Inspection areas"}</Text>
          <View style={InspectionCss.editView}>
            <TouchableOpacity
              onPress={() => {
                refRBSheet2.current.open();
              }}
              style={InspectionCss.IconView}
            >
              <Entypo
                name={"dots-three-horizontal"}
                size={20}
                color={_COLORS.Kodie_BlackColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsEditing(!isEditing)}
              style={InspectionCss.IconView}
            >
              <Text style={InspectionCss.editText}>{"Edit"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <DividerIcon />
        {isEditing ? (
          <CustomSingleButton
            _ButtonText={"Add custom area"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            backgroundColor={_COLORS.Kodie_BlackColor}
            height={40}
            marginBottom={16}
            width={"50%"}
            onPress={() => {
              refRBSheet1.current.open();
            }}
            disabled={isLoading ? true : false}
          />
        ) : null}
        <FlatList
          data={Data}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item?.id}
          renderItem={Inspection_render}
        />
      </View>
      <RBSheet
        ref={refRBSheet1}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={550}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: InspectionCss.bottomModal_container,
        }}
      >
        <View style={InspectionCss.Container}>
          <View style={InspectionCss.ModalContainer}>
            <Text style={InspectionCss.ShareText}>{"Add custom area"}</Text>
            <AntDesign
              name="close"
              size={20}
              color={_COLORS.Kodie_BlackColor}
            />
          </View>
          <View style={InspectionCss.inputContainer}>
            <Text
              style={[LABEL_STYLES._texinputLabel, InspectionCss.cardHeight]}
            >
              {"Name of area:"}
            </Text>
            <TextInput
              style={InspectionCss.emailinput}
              value={email}
              onChangeText={setEmail}
              placeholder="Create a name for your custom area"
              placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
            />
          </View>
          <Text style={InspectionCss.cancelText}>
            {"Would you like to use a standard inspection checklist?"}
          </Text>
          <RowButtons
            LeftButtonText={"Yes"}
            leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            RightButtonText={"No"}
            RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
            RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
          />
          <Text style={[InspectionCss.cancelText, { marginVertical: 16 }]}>
            {" Select the area most similar to your custom area:"}
          </Text>
          <Dropdown
            style={InspectionCss.dropdown}
            placeholderStyle={InspectionCss.placeholderStyle}
            selectedTextStyle={InspectionCss.selectedTextStyle}
            inputSearchStyle={InspectionCss.inputSearchStyle}
            iconStyle={InspectionCss.iconStyle}
            data={DropdownData}
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
          <Text style={InspectionCss.cancelText}>
            {"Would you like to use a standard inspection checklist?"}
          </Text>
          <RowButtons
            LeftButtonText={"Yes"}
            leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            RightButtonText={"No"}
            RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
            RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
          />
          <View style={InspectionCss.ButtonView}>
            <TouchableOpacity style={InspectionCss.cancelView}>
              <Text style={[InspectionCss.cancelText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={InspectionCss.SaveView}>
              <Text style={InspectionCss.DoneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
      <RBSheet
        ref={refRBSheet2}
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
          container: InspectionCss.bottomModal_container,
        }}
      >
        <View style={InspectionCss.Container}>
          <View style={InspectionCss.ModalContainer}>
            <Text style={InspectionCss.ShareText}>{"Options"}</Text>
            <AntDesign
              name="close"
              size={20}
              color={_COLORS.Kodie_BlackColor}
            />
          </View>
          <TouchableOpacity style={InspectionCss.modalFile}>
            <Image
              source={IMAGES.Duplicate}
              style={InspectionCss.ImageStyle}
              resizeMode={"center"}
            />
            <Text style={InspectionCss.editText}>{"Duplicate inspection"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={InspectionCss.modalFile}>
            <View style={InspectionCss.deleteIconView}>
              <MaterialIcons
                name="delete-outline"
                size={20}
                color={_COLORS.Kodie_GreenColor}
              />
            </View>
            <Text style={InspectionCss.editText}>{"Delete inspection"}</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};
export default Inspection;
