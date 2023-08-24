import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { _COLORS, LABEL_STYLES, BANNERS, IMAGES } from "../../../Themes";
import { RepairCss } from "./RepairCss";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "./../../../services/CommonServices/index";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import ReadMore from "@fawazahmed/react-native-read-more";
const HorizontalData = ["Posted", "Ongoing", "Completed"];
const property_List = [
  {
    id: "1",
    name: "Door handle repairing Posted",
    location: "1729 Melbourne St Australia",
    buttonName: "Posted",
    tanentname: "Tom",
    budget: "Budget",
    spend: "$200",
    readText:
      "My door handle is broken and need some simple repairmen for this and need some Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    isPosted: true,
    isongoing: false,
    isCompleted: false,
  },
  {
    id: "2",
    name: "Plasterer to fix wall",
    location: "1729 Melbourne St Australia",
    buttonName: "ongoing",
    tanentname: "Tom",
    budget: "Budget",
    spend: "$200",
    readText:
      "My door handle is broken and need some simple repairmen for this and need some Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    isPosted: false,
    isongoing: true,
    isCompleted: false,
  },
  {
    id: "3",
    name: "Epoxy garage repair",
    location: "1729 Melbourne St Australia",
    buttonName: "Completed",
    tanentname: "Tom",
    budget: "Budget",
    spend: "$200",
    readText:
      "My door handle is broken and need some simple repairmen for this and need some Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    isPosted: false,
    isongoing: false,
    isCompleted: true,
  },
];

export default Repair = (props) => {
  const horizontal_render = ({ item }) => {
    return (
      <TouchableOpacity style={RepairCss.flatlistView}>
        <View style={RepairCss.round} />
        <Text style={RepairCss.item_style}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const propertyData_render = ({ item }) => {
    return (
      <>
        <View style={RepairCss.Container}>
          <View style={RepairCss.flat_MainView}>
            <View style={RepairCss.flexContainer}>
              <Text style={LABEL_STYLES.commontext}>{item.name}</Text>
              <View style={RepairCss.propertyView}>
                <Image
                  source={IMAGES.property}
                  style={RepairCss.propertyImage}
                />
                <View style={RepairCss.flexContainer}>
                  <Text style={RepairCss.tom}>Tom</Text>
                  <View style={RepairCss.locationView}>
                    <MaterialCommunityIcons
                      name={"map-marker"}
                      size={12}
                      color={_COLORS.Kodie_MediumGrayColor}
                      style={{ alignSelf: "center" }}
                    />
                    <Text style={RepairCss.locationText}>
                      {"1729 Melbourne St Australia"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={RepairCss.RightContainer}>
              <View
                style={[
                  RepairCss.buttonView,
                  {
                    backgroundColor: item.isPosted
                      ? _COLORS.Kodie_mostLightBlueColor
                      : item.isongoing
                      ? _COLORS.Kodie_LightOrange
                      : _COLORS.Kodie_mostLightGreenColor,
                  },
                ]}
              >
                <View
                  style={[
                    RepairCss.roundButton,
                    {
                      backgroundColor: item.isPosted
                        ? _COLORS.Kodie_BlueColor
                        : item.isongoing
                        ? _COLORS.Kodie_DarkOrange
                        : _COLORS.Kodie_GreenColor,
                    },
                  ]}
                />
                <Text
                  style={[
                    RepairCss.buttonText,
                    {
                      color: item.isPosted
                        ? _COLORS.Kodie_BlueColor
                        : item.isongoing
                        ? _COLORS.Kodie_DarkOrange
                        : _COLORS.Kodie_GreenColor,
                    },
                  ]}
                >
                  {item.buttonName}
                </Text>
              </View>
              <View style={[RepairCss.BudgetView]}>
                <Image
                  source={IMAGES.estimate}
                  style={RepairCss.propertyImage}
                />
                <View style={RepairCss.flexContainer}>
                  <Text style={RepairCss.tom}>{item.budget}</Text>

                  <Text style={RepairCss.spend}>{item.spend}</Text>
                </View>
              </View>
            </View>
          </View>
          <DividerIcon />

          <ReadMore
            seeMoreStyle={RepairCss.readMore}
            seeLessStyle={RepairCss.readMore}
            seeMoreText={"read more"}
            seeLessText={"read Less"}
            numberOfLines={2}
            style={RepairCss.textStyle}
          >
            {item.readText}
          </ReadMore>
        </View>
      </>
    );
  };

  return (
    <View style={RepairCss.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Repair"}
      />
      <ScrollView>
        <SearchBar
          isButtonShow
          height={40}
          buttonName={"Create Job"}
          onPress={() => {
            props.navigation.navigate('CreateJobFirstScreen')
          }}
        />
        <View style={RepairCss.Container}>
          <Text style={[LABEL_STYLES.commontext, RepairCss.filter]}>
            Filter
          </Text>
          <View style={RepairCss.flat_MainView}>
            <TouchableOpacity style={RepairCss.AllView}>
              <Text style={RepairCss.item_style}>ALL</Text>
              <MaterialCommunityIcons
                name={"check"}
                size={18}
                color={_COLORS.Kodie_WhiteColor}
              />
            </TouchableOpacity>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={HorizontalData}
              renderItem={horizontal_render}
            />
          </View>
        </View>
        <DividerIcon />
        <FlatList data={property_List} renderItem={propertyData_render} />
      </ScrollView>
    </View>
  );
};
