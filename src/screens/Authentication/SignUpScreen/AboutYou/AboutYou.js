import React, { useState, useRef } from "react";
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
  const [isClick, setIsClick] = useState(false);
  const initialSelectedServices = {
    Tenant: false,
    Landlord: false,
    Contractor: false,
    "Property Manager": false,
  };

  // State to keep track of selected services
  const [selectedServices, setSelectedServices] = useState(
    initialSelectedServices
  );

  // Function to toggle the selection of a service
  const toggleService = (serviceName) => {
    setSelectedServices((prevSelectedServices) => ({
      ...prevSelectedServices,
      [serviceName]: !prevSelectedServices[serviceName],
    }));
  };
  const handleBoxPress = (boxNumber) => {
    setIsClick(boxNumber);
  };
  const refRBSheet = useRef();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const toggleCheckbox = (itemId) => {
    const isSelected = selectedCheckboxes.includes(itemId);
    if (isSelected) {
      setSelectedCheckboxes(selectedCheckboxes.filter((id) => id !== itemId));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, itemId]);
    }
  };
  const wantList = ({ item, index }) => {
    const isSelected = selectedCheckboxes.includes(item.id);
    return (
      <View>
        <View style={AboutYouStyle.want_List_View}>
          <TouchableOpacity
            onPress={() => {
              // setCheck(item.id);
              toggleCheckbox(item.id);
            }}
          >
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
          </TouchableOpacity>
          <Text style={AboutYouStyle.want_List_text}>{item.list}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={AboutYouStyle.mainContainer}>
      <TopHeader
        MiddleText={"Set up your Kodie account"}
        onPressLeftButton={() => _goBack(props)}
      />
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
          <Text style={AboutYouStyle.want_Heading}>
            {
              "How would you describe yourself? (you can select multiple options)"
            }
          </Text>
          <View style={AboutYouStyle.servicesBoxView}>
            <ServicesBox
              Services_Name={"Tenant"}
              Services_Icon={
                selectedServices["Tenant"]
                  ? IMAGES.cleaner
                  : IMAGES.lightCleaner
              }
              BoxStyling={[
                AboutYouStyle.box_style,
                {
                  backgroundColor: selectedServices["Tenant"]
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor,
                },
              ]}
              textColor={[AboutYouStyle.box_Text_Style]}
              onPress={() => toggleService("Tenant")}
            />

            <View style={AboutYouStyle.spaceView} />
            <ServicesBox
              Services_Name={"Landlord"}
              Services_Icon={
                selectedServices["Landlord"]
                  ? IMAGES.outdoor
                  : IMAGES.lightOutdorCleaner
              }
              BoxStyling={[
                AboutYouStyle.box_style,
                {
                  backgroundColor: selectedServices["Landlord"]
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor,
                },
              ]}
              textColor={[AboutYouStyle.box_Text_Style]}
              onPress={() => toggleService("Landlord")}
            />
          </View>

          <View style={AboutYouStyle.servicesBoxView}>
            <ServicesBox
              Services_Name={"Contractor"}
              Services_Icon={
                selectedServices["Contractor"]
                  ? IMAGES.cleaner
                  : IMAGES.lightCleaner
              }
              BoxStyling={[
                AboutYouStyle.box_style,
                {
                  backgroundColor: selectedServices["Contractor"]
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor,
                },
              ]}
              textColor={[AboutYouStyle.box_Text_Style]}
              onPress={() => toggleService("Contractor")}
            />

            <View style={AboutYouStyle.spaceView} />
            <ServicesBox
              Services_Name={"Property Manager"}
              Services_Icon={
                selectedServices["Property Manager"]
                  ? IMAGES.outdoor
                  : IMAGES.lightOutdorCleaner
              }
              BoxStyling={[
                AboutYouStyle.box_style,
                {
                  backgroundColor: selectedServices["Property Manager"]
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_WhiteColor,
                },
              ]}
              textColor={[AboutYouStyle.box_Text_Style]}
              onPress={() => toggleService("Property Manager")}
            />
          </View>
          <Text style={AboutYouStyle.want_Heading}>
            {" How many properties do you own, manage or rent?"}
          </Text>
          <View style={AboutYouStyle.servicesBoxView}>
            <ServicesBox
              Services_Name={"1 - 3 properties"}
              Services_Icon={isClick ? IMAGES.cleaner : IMAGES.lightCleaner}
              BoxStyling={[
                AboutYouStyle.box_style,
                {
                  backgroundColor:
                    isClick === 1
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              textColor={[AboutYouStyle.box_Text_Style]}
              onPress={() => handleBoxPress(1)}
            />

            <View style={AboutYouStyle.spaceView} />
            <ServicesBox
              Services_Name={"4 - 10 properties"}
              Services_Icon={
                isClick ? IMAGES.outdoor : IMAGES.lightOutdorCleaner
              }
              BoxStyling={[
                AboutYouStyle.box_style,
                {
                  backgroundColor:
                    isClick === 2
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              textColor={[AboutYouStyle.box_Text_Style]}
              onPress={() => handleBoxPress(2)}
            />
          </View>

          <View style={AboutYouStyle.servicesBoxView}>
            <ServicesBox
              Services_Name={"10 - 20 properties"}
              Services_Icon={isClick ? IMAGES.cleaner : IMAGES.lightCleaner}
              BoxStyling={[
                AboutYouStyle.box_style,
                {
                  backgroundColor:
                    isClick === 3
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              textColor={[AboutYouStyle.box_Text_Style]}
              onPress={() => handleBoxPress(3)}
            />

            <View style={AboutYouStyle.spaceView} />
            <ServicesBox
              Services_Name={"> 20 properties"}
              Services_Icon={
                isClick ? IMAGES.outdoor : IMAGES.lightOutdorCleaner
              }
              BoxStyling={[
                AboutYouStyle.box_style,
                {
                  backgroundColor:
                    isClick === 4
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              textColor={[AboutYouStyle.box_Text_Style]}
              onPress={() => handleBoxPress(4)}
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
            <UploadImageData heading_Text={"Upload image"} />
          </RBSheet>
        </View>
      </ScrollView>
    </View>
  );
};
