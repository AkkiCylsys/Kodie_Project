import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { NewInspectionStyle } from "./NewInspectionStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import { _COLORS, BANNERS, FONTFAMILY, IMAGES } from "../../../Themes";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

const HorizontalData = ["Scheduled", "In Progress", "Complete"];

const inspection_data = [
  {
    id: 1,
    location: "8502 Preston Rd. Inglewood",
    img: BANNERS.Apartment,
    userImg: IMAGES.userImage,
    userName: "Alma Alma",
    review: ". In_progress",
  },
  {
    id: 2,
    location: "8502 Preston Rd. Inglewood",
    img: BANNERS.Apartment,
    userImg: IMAGES.userImage,
    userName: "Alma Alma",
    review: ". Scheduled",
  },
  {
    id: 3,
    location: "8502 Preston Rd. Inglewood",
    img: BANNERS.Apartment,
    userImg: IMAGES.userImage,
    userName: "Alma Alma",
    review: ". Cancelled",
  },
];

export default NewInspection = (props) => {
  const horizontal_render = ({ item }) => {
    return (
      <TouchableOpacity style={NewInspectionStyle.flatlistView}>
        <View style={NewInspectionStyle.round} />
        <Text style={NewInspectionStyle.item_style}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const Inspection_render = ({ item, index }) => {
    return (
      <>
        <View style={NewInspectionStyle.insp_data_View}>
          <View style={NewInspectionStyle.insp_cld_main_view}>
            <Text style={NewInspectionStyle.insp_cld_date}>{"3"}</Text>
            <Text style={NewInspectionStyle.insp_cld_Text}>{"Monday"}</Text>
            <Text style={NewInspectionStyle.insp_cld_Text}>{"8:30am"}</Text>
          </View>
          <View>
            <Image source={item.img} style={NewInspectionStyle.img_Sty} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={NewInspectionStyle.location_main_view}>
              <Entypo
                name="location-pin"
                size={18}
                color={_COLORS.Kodie_GreenColor}
              />
              <Text style={NewInspectionStyle.location_text}>
                {item.location}
              </Text>
              <Image
                source={IMAGES.noteBook}
                style={NewInspectionStyle.note_b_img_sty}
              />
              <TouchableOpacity>
                <Entypo
                  name="dots-three-horizontal"
                  size={18}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </View>
            <View style={NewInspectionStyle.user_main_view}>
              <View style={NewInspectionStyle.user_main_view}>
                <Image
                  source={item.userImg}
                  style={NewInspectionStyle.user_img_sty}
                />
                <Text style={NewInspectionStyle.user_name_text}>
                  {item.userName}
                </Text>
              </View>
              <TouchableOpacity style={NewInspectionStyle.in_progress_view}>
                <Text style={NewInspectionStyle.in_progress_txt}>
                  {item.review}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={NewInspectionStyle.subContainer}>
          <DividerIcon />
        </View>
      </>
    );
  };
  return (
    <View style={NewInspectionStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Inspections"}
      />
      <ScrollView>
        <View style={NewInspectionStyle.subContainer}>
          <CustomSingleButton
            _ButtonText={"Create new inspection"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={() => {
              props.navigation.navigate("NewInspection");
            }}
          />
        </View>
        <DividerIcon borderBottomWidth={4} color={_COLORS.Kodie_GrayColor} />
        <SearchBar
          filterImage={IMAGES.up_down_Arrow}
          isFilterImage
          height={48}
          marginTop={20}
        />
        <View style={NewInspectionStyle.flat_MainView}>
          <TouchableOpacity style={NewInspectionStyle.AllView}>
            <Text style={NewInspectionStyle.item_style}>ALL</Text>
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
        <DividerIcon />
        <View style={NewInspectionStyle.month_View}>
          <TouchableOpacity style={NewInspectionStyle.backIconSty}>
            <AntDesign name="left" size={25} color={_COLORS.Kodie_BlackColor} />
          </TouchableOpacity>
          <Text style={NewInspectionStyle.Month_Text}>{"September 2023"}</Text>
          <TouchableOpacity style={NewInspectionStyle.backIconSty}>
            <AntDesign
              name="right"
              size={25}
              color={_COLORS.Kodie_BlackColor}
            />
          </TouchableOpacity>
        </View>
        <DividerIcon />
        <FlatList
          data={inspection_data}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          keyExtractor={(item) => item?.id}
          renderItem={Inspection_render}
        />
      </ScrollView>
    </View>
  );
};
