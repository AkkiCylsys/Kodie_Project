import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import TopHeader from "../../components/Molecules/Header/Header";
import { NotificationStyle } from "./NotificationStyle";
import SearchBar from "../../components/Molecules/SearchBar/SearchBar";
import { FlatList } from "react-native-gesture-handler";
import { IMAGES, _COLORS } from "../../Themes/index";
import { Divider } from "react-native-paper";
import CustomTabNavigator from "../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import { PropertiesCSS } from "../Landlord/PropertyList/PropertiesCss";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from "react-native-vector-icons/Entypo";
import NotificationOptions from "../../components/Molecules/NotificationOptions/NotificationOptions";
const Notifications = (props) => {
  const refRBSheet = useRef();
  const [activeTab, setActiveTab] = useState("Tab1");
  const Alldata = [
    {
      id: 1,
      name: "Don’t forget!",
      title:
        "Lease agreement expiring in 30 days. 2118 Thornridge Cir Syracuse,",
      img: IMAGES.kodie_icon,
      time: "3m ago",
      starimg: IMAGES.star,
      menuimg: IMAGES.menuIcon,
    },
    {
      id: 2,
      name: "Good news! Quote incoming.",
      title: "Jason Stathom is preparing your quote. It will arrive shortly. ,",
      img: IMAGES.kodie_icon,
      time: "4h ago",
      starimg: IMAGES.star,
      menuimg: IMAGES.menuIcon,
    },
    {
      id: 3,
      name: "Congratulations! Offer Accepted.",
      title:
        "Your offer to rent property at Preston Rd, Melbourne has been accepted...,",
      img: IMAGES.kodie_icon,
      time: "7h ago",
      starimg: IMAGES.star,
      menuimg: IMAGES.menuIcon,
    },
  ];

  const seconddata = [
    {
      id: 4,
      namehead: "Don’t forget!",
      titles:
        "Lease agreement expiring in 30 days. 2118 Thornridge Cir Syracuse,",
      imgmain: IMAGES.kodie_icon,
      times: "5d ago",
      starimgs: IMAGES.star,
      menuimgs: IMAGES.menuIcon,
    },
  ];

  const HorizontalData = ["Starred", "Snoozed", "Archived", "Muted"];

  const horizontal_render = ({ item }) => {
    return (
      <TouchableOpacity style={NotificationStyle.flatlistView}>
        <View style={NotificationStyle.round} />
        <Text style={NotificationStyle.item_style}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderItemLatest = ({ item }) => (
    <>
      <View style={NotificationStyle.bindview}>
        <Image source={item.img} style={NotificationStyle.kodioimg} />
        <View style={NotificationStyle.nametextview}>
          <Text style={NotificationStyle.nametext}>{item.name}</Text>
          <Text style={NotificationStyle.titletext}>{item.title}</Text>
        </View>

        <View>
          <Text style={NotificationStyle.timetext}>{item.time}</Text>
          <View style={NotificationStyle.starimageview}>
            <Image source={item.starimg} style={NotificationStyle.starimg} />
            <TouchableOpacity onPress={props.onPress}>
              {/* <Image source={item.menuimg} style={NotificationStyle.menuimg}
             /> */}
              <Entypo
                name="dots-three-vertical"
                size={30}
                color={_COLORS.Kodie_GrayColor}
                onPress={() => {
                  refRBSheet.current.open();
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );

  const renderItemEarlier = ({ item }) => (
    <>
      <View style={NotificationStyle.bindview}>
        <Image source={item.imgmain} style={NotificationStyle.kodioimg} />
        <View style={NotificationStyle.nametextview}>
          <Text style={NotificationStyle.nametext}>{item.namehead}</Text>
          <Text style={NotificationStyle.titletext}>{item.titles}</Text>
        </View>

        <View>
          <Text style={NotificationStyle.timetext}>{item.times}</Text>
          <View style={NotificationStyle.starimageview}>
            <Image source={item.starimgs} style={NotificationStyle.starimg} />
            <Entypo
              name="dots-three-vertical"
              size={30}
              color={_COLORS.Kodie_GrayColor}
              onPress={() => {
                refRBSheet.current.open();
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
  return (
    <>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Notifications"}
      />
      <CustomTabNavigator
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        TAB3
        Tab1={"General"}
        Tab2={"Properties"}
        Tab3={"Jobs"}
        onPressTab1={() => setActiveTab("Tab1")}
        onPressTab2={() => setActiveTab("Tab2")}
        onPressTab3={() => setActiveTab("Tab3")}
        colorTab1={
          activeTab === "Tab1"
            ? _COLORS.Kodie_BlackColor
            : _COLORS.Kodie_MediumGrayColor
        }
        colorTab2={
          activeTab === "Tab2"
            ? _COLORS.Kodie_BlackColor
            : _COLORS.Kodie_MediumGrayColor
        }
        colorTab3={
          activeTab === "Tab3"
            ? _COLORS.Kodie_BlackColor
            : _COLORS.Kodie_MediumGrayColor
        }
        styleTab1={activeTab === "Tab1" && PropertiesCSS.activeTab}
        styleTab2={activeTab === "Tab2" && PropertiesCSS.activeTab}
        styleTab3={activeTab === "Tab3" && PropertiesCSS.activeTab}
      />
      <SearchBar
        filterImage={IMAGES.up_down_Arrow}
        isFilterImage
        height={48}
        marginTop={20}
      />

      <View style={NotificationStyle.Container}>
        <View style={NotificationStyle.flat_MainView}>
          <TouchableOpacity style={NotificationStyle.AllView}>
            <Text style={NotificationStyle.item_style}>ALL</Text>
            <MaterialCommunityIcons
              name={"check"}
              size={18}
              color={_COLORS.Kodie_WhiteColor}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={HorizontalData}
          renderItem={horizontal_render}
        />
      </View>

      <Divider style={NotificationStyle.divider} />

      <View style={NotificationStyle.mainview}>
        <View style={NotificationStyle.latesttext}>
          <Text style={NotificationStyle.firstheadingtext}>Latest</Text>
        </View>
        <FlatList
          data={Alldata}
          keyExtractor={(item) => item.id}
          renderItem={renderItemLatest}
        />
      </View>

      <View style={NotificationStyle.mainview}>
        <View style={NotificationStyle.Earliertextview}>
          <Text style={NotificationStyle.secondtext}>Earlier</Text>
        </View>
        <FlatList
          data={seconddata}
          keyExtractor={(item) => item.id}
          renderItem={renderItemEarlier}
        />
      </View>
      <RBSheet
        ref={refRBSheet}
        height={510}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: NotificationStyle.bottomModal_container,
        }}
      >
        <NotificationOptions />
      </RBSheet>
    </>
  );
};

export default Notifications;
