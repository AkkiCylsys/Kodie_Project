import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { CurrentTenantStyle } from "./CurrentTenantStyle";
import { _goBack } from "../../../services/CommonServices";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import { _COLORS, IMAGES } from "../../../Themes/index";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import StarRating from "react-native-star-rating";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";
import ManagingTenant from "../../../components/Molecules/ManagingTenant/ManagingTenant";
import RBSheet from "react-native-raw-bottom-sheet";
const data = [
  {
    id: "1",
    name: "Jason S",
    name1: "Stathom",
  },
  {
    id: "2",
    name: "Mesut S",
    rating: "4.0",
    view: "100",
  },
  {
    id: "3",
    name: "Jack B",
    rating: "3.6",
    view: "50",
  },
];

const CurrentTenant = (props) => {
  const [rating, setRating] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet = useRef();

  const CloseUp = () => {
    refRBSheet.current.close();
  };
  const tenantData = ({ item, index }) => {
    return (
      <>
        <View style={CurrentTenantStyle.usermainView}>
          <View>
            <TouchableOpacity style={CurrentTenantStyle.usericon}>
              <Image source={IMAGES.userImage} />
            </TouchableOpacity>
          </View>
          <View style={CurrentTenantStyle.nameView}>
            <Text style={CurrentTenantStyle.nameText}>{item.name}</Text>
            <Text style={CurrentTenantStyle.nameText}>{item.name1}</Text>
          </View>

          <View style={CurrentTenantStyle.starStyle}>
            <View style={CurrentTenantStyle.bindstarview}>
              <StarRating
                disabled={false}
                maxStars={1}
                rating={rating}
                fullStarColor={_COLORS.Kodie_lightGreenColor}
                emptyStarColor={_COLORS.Kodie_LightGrayColor}
                starSize={20}
                selectedStar={(rating) => setRating(rating)}
              />
              <Text style={CurrentTenantStyle.starratingStyle}>4.6 (231)</Text>
            </View>
            <View style={CurrentTenantStyle.verifiedView}>
              <Text style={CurrentTenantStyle.verifiedtext}>Not verified</Text>
            </View>
          </View>
          <View style={CurrentTenantStyle.menuiconview}>
            <AntDesign
              name="hearto"
              size={25}
              color={_COLORS.Kodie_GrayColor}
              style={CurrentTenantStyle.heartimg}
            />
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}
            >
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={_COLORS.Kodie_GrayColor}
                style={CurrentTenantStyle.closeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={CurrentTenantStyle.RowBtnView}>
          <RowButtons
            leftButtonHeight={50}
            RightButtonHeight={50}
            LeftButtonText="View Profile"
            onPressLeftButton={props?.ViewButton}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_BlackColor}
            RightButtonText="Message"
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
            onPressRightButton={() => props.navigation.navigate("Language")}
          />
        </View>
        <DividerIcon />
      </>
    );
  };
  return (
    <View style={CurrentTenantStyle.mainContainer}>
      <SearchBar
        filterImage={IMAGES.filter}
        isFilterImage
        height={48}
        marginTop={20}
        placeholder={"Search tenants"}
        frontSearchIcon
      />

      <DividerIcon borderBottomWidth={8} color={_COLORS.Kodie_LiteWhiteColor} />

      <View style={CurrentTenantStyle.Container}>
        <CustomSingleButton
          _ButtonText={"+ Add tenant"}
          Text_Color={_COLORS.Kodie_WhiteColor}
          text_Size={14}
          backgroundColor={_COLORS.Kodie_BlackColor}
          height={38}
          marginTop={3}
          //   onPress={props.propertyDetail}
          disabled={isLoading ? true : false}
        />
      </View>

      <DividerIcon borderBottomWidth={8} color={_COLORS.Kodie_LiteWhiteColor} />

      <FlatList
        data={data}
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={tenantData}
      />

      <RBSheet
        ref={refRBSheet}
        // closeOnDragDown={true}
        height={330}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: CurrentTenantStyle.bottomModal_container,
        }}
      >
        <ManagingTenant onClose={CloseUp} />
      </RBSheet>
    </View>
  );
};

export default CurrentTenant;
