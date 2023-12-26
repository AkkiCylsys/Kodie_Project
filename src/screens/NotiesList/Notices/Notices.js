import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { NoticesStyle } from "./NoticesStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, IMAGES } from "../../../Themes";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import Notice from "../../../components/Molecules/Notice/Notice";
import { useState } from "react";
const HorizontalData = ["General", "Inspection", "Rent", "Job"];
const horizontal_render = ({ item }) => {
  return (
    <TouchableOpacity style={NoticesStyle.flatlistView}>
      <View style={NoticesStyle.round} />
      <Text style={NoticesStyle.item_style}>{item}</Text>
    </TouchableOpacity>
  );
};

const Notices = (props) => {
  const [isLoading, setIsLoading] = useState(false);
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

        <View style={NoticesStyle.mainviewcomponent}>
          <View style={NoticesStyle.componentview}>
            <Notice
              day="3/10"
              date="Mon"
              lineimg={IMAGES.redLine}
              heading="Lease agreement expiring in 30 days"
              locationimg={IMAGES.Location}
              address="2118 Thornridge Cir. Syracuse,"
            />
          </View>

          <View style={NoticesStyle.componentview}>
            <Notice
              day="4/11"
              date="Tue"
              lineimg={IMAGES.blueLine}
              heading="Pre move inspection due"
              locationimg={IMAGES.Location}
              address="8502 Preston Rd. Inglewood"
            />
          </View>

          <View style={NoticesStyle.componentview}>
            <Notice
              day="5/11"
              date="Wed"
              lineimg={IMAGES.blueLine}
              heading="Post move inspection due"
              locationimg={IMAGES.Location}
              address="65 Mountain View Parade"
            />
          </View>

          <View style={NoticesStyle.componentview}>
            <Notice
              day="6/11"
              date="Thus"
              lineimg={IMAGES.redLine}
              heading="Lease agreement expiring in 30 days"
              locationimg={IMAGES.Location}
              address="2118 Thornridge Cir. Syracuse,"
            />
          </View>

          <View style={NoticesStyle.componentview}>
            <Notice
              day="7/12"
              date="Mon"
              lineimg={IMAGES.redLine}
              heading="Lease agreement expiring in 30 days"
              locationimg={IMAGES.Location}
              address="2118 Thornridge Cir. Syracuse,"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Notices;
