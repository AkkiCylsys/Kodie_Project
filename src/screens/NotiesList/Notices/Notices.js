import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { NoticesStyle } from "./NoticesStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, IMAGES } from "../../../Themes";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import Notice from "../../../components/Molecules/Notice/Notice";
import Entypo from "react-native-vector-icons/Entypo";
import RBSheet from "react-native-raw-bottom-sheet";
import Select from "../../../components/Molecules/Select/Select";
import { useState } from "react";
const HorizontalData = ["General", "Inspection", "Rent", "Job"];

const noticeData = [
  {
    day: "3/10",
    date: "Mon",
    lineimg: IMAGES.redLine,
    heading: "Lease agreement expiring in 30 days",
    locationimg: IMAGES.Location,
    address: "2118 Thornridge Cir. Syracuse,",
  },
  {
    day: "3/10",
    date: "Mon",
    lineimg: IMAGES.redLine,
    heading: "Lease agreement expiring in 30 days",
    locationimg: IMAGES.Location,
    address: "2118 Thornridge Cir. Syracuse,",
  },
  {
    day: "3/10",
    date: "Mon",
    lineimg: IMAGES.blueLine,
    heading: "Lease agreement expiring in 30 days",
    locationimg: IMAGES.Location,
    address: "2118 Thornridge Cir. Syracuse,",
  },
  {
    day: "3/10",
    date: "Mon",
    lineimg: IMAGES.redLine,
    heading: "Lease agreement expiring in 30 days",
    locationimg: IMAGES.Location,
    address: "2118 Thornridge Cir. Syracuse,",
  },
];
const Notices = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet = useRef();

  const onClose = () => {
    refRBSheet.current.close();
  };
  // renderItems....
  const horizontal_render = ({ item }) => {
    return (
      <TouchableOpacity style={NoticesStyle.flatlistView}>
        <View style={NoticesStyle.round} />
        <Text style={NoticesStyle.item_style}>{item}</Text>
      </TouchableOpacity>
    );
  };
  const noticeRenderData = ({ item, index }) => {
    return (
      <View style={NoticesStyle.mainContainer}>
        <View style={NoticesStyle.dateDayview}>
          <Text style={NoticesStyle.daytext}>{item.day}</Text>
          <Text style={NoticesStyle.datetext}>{item.date}</Text>
        </View>
        <View style={NoticesStyle.middatabindview}>
          <View style={NoticesStyle.bindview}>
            <Image source={item.lineimg} style={NoticesStyle.lineimg} />
            <View style={NoticesStyle.headinglineview}>
              <Text style={NoticesStyle.headintext}>{item.heading}</Text>
              <View style={NoticesStyle.addressviewbind}>
                <Image
                  source={item.locationimg}
                  style={NoticesStyle.locationimg}
                />
                <Text style={NoticesStyle.addresstext}>{item.address}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={NoticesStyle.dotsview}
            onPress={() => {
              refRBSheet.current.open();
            }}
          >
            <Entypo
              name="dots-three-vertical"
              size={25}
              color={_COLORS.Kodie_LightGrayColor}
              style={NoticesStyle.dotimg}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={NoticesStyle.mainview}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Notices"}
      />
      <ScrollView style={NoticesStyle.scrollContainer}>
        <View style={NoticesStyle.btnview}>
          <CustomSingleButton
            borderColor={_COLORS.Kodie_TransparentColor}
            _ButtonText={"Add new notice"}
            backgroundColor={_COLORS.Kodie_BlackColor}
            Text_Color={_COLORS.Kodie_WhiteColor}
            disabled={isLoading ? true : false}
          />
        </View>

        <DividerIcon style={NoticesStyle.divider} />

        <View style={NoticesStyle.searchview}>
          <SearchBar
            marginTop={1}
            frontSearchIcon
            isFilterImage
            filterImage={IMAGES.up_down_Arrow}
            height={40}
            placeholder="Search notices"
          />
        </View>

        <View style={NoticesStyle.Container}>
          <View style={NoticesStyle.flat_MainView}>
            <TouchableOpacity style={NoticesStyle.AllView}>
              <Text style={NoticesStyle.item_style}>ALL</Text>
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

        <View style={NoticesStyle.calenderview}>
          <MaterialCommunityIcons
            name={"chevron-left"}
            size={25}
            color={_COLORS.Kodie_BlackColor}
          />
          <Text style={NoticesStyle.monthtext}>September 2023</Text>
          <MaterialCommunityIcons
            name={"chevron-right"}
            size={25}
            color={_COLORS.Kodie_BlackColor}
          />
        </View>
        <View style={{ flex: 1, alignSelf: "center" }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={noticeData}
            keyExtractor={(index, item) => index}
            renderItem={noticeRenderData}
          />
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        height={220}
        // closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: NoticesStyle.bottomModal_container,
        }}
      >
        <Select onClose={onClose} />
      </RBSheet>
    </View>
  );
};

export default Notices;
