import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from "react-native";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import { SliderBox } from "react-native-image-slider-box";
import { _COLORS, BANNERS, IMAGES } from "../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ViewDetailCss } from "./ViewPropertyDetailsCss";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
const images = [
  BANNERS.Apartment,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];
const Detail = [
  {
    id: "1",
    images: IMAGES.BedroomIcon,
    name: "Bedrooms: 3",
  },
  {
    id: "2",
    images: IMAGES.Bathroom,
    name: "Bathrooms: 2",
  },
  {
    id: "3",
    images: IMAGES.Parking,
    name: "Garages: 1",
  },
  {
    id: "4",
    images: IMAGES.BedroomIcon,
    name: "Parkings: 1",
  },
  {
    id: "5",
    images: IMAGES.BedroomIcon,
    name: "Garden",
  },
  {
    id: "6",
    images: IMAGES.BedroomIcon,
    name: "Pool",
  },
  {
    id: "7",
    images: IMAGES.BedroomIcon,
    name: "Furnished",
  },
  {
    id: "8",
    images: IMAGES.BedroomIcon,
    name: "WiFi",
  },
];

export default ViewPropertyDetails = (props) => {
  const Detail_rander = ({ item, index }) => {
    return (
      <>
        <View style={ViewDetailCss.DetailsView}>
          <Image source={item.images} style={ViewDetailCss.DetailsIcon} />
          <Text style={ViewDetailCss.details_text}>{item.name}</Text>
        </View>
      </>
    );
  };

  return (
    <View style={ViewDetailCss.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"8502 Preston Rd. Inglewood..."}
      />
      <ScrollView>

        <View style={ViewDetailCss.slider_view}>
          <SliderBox
            images={images}
            sliderBoxHeight={200}
            onCurrentImagePressed={(index) =>
              console.warn(`image ${index} pressed`)
            }
            inactiveDotColor={_COLORS.Kodie_GrayColor}
            dotColor={_COLORS.Kodie_GreenColor}
            autoplay
            circleLoop
            resizeMethod={"resize"}
            resizeMode={"cover"}
            dotStyle={ViewDetailCss.dotStyle}
            ImageComponentStyle={{
              flex: 1,
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={ViewDetailCss.Container}>
          <View style={ViewDetailCss.apartment_View}>
            <Text style={ViewDetailCss.apartment_text}>
              {"Apartment"}
            </Text>
            <View style={ViewDetailCss.share_View}>
              <TouchableOpacity style={ViewDetailCss.availableButtonview}>
                <Text style={ViewDetailCss.availableButtonText}>AVAILABLE : NOW</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo
                  name="share"
                  color={_COLORS.Kodie_MediumGrayColor}
                  size={22}
                  style={ViewDetailCss.share_sty}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Fontisto
                  name="heart-alt"
                  color={_COLORS.Kodie_MediumGrayColor}
                  size={22}
                  style={ViewDetailCss.share_sty}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={ViewDetailCss.melbourne_Text}>{"Melbourne"}</Text>
          <View style={ViewDetailCss.locationView}>
            <Entypo
              name="location-pin"
              size={20}
              color={_COLORS.Kodie_GreenColor}
            />
            <Text style={ViewDetailCss.LocationText}>{"8502 Preston Rd.Inglewood,Queensland,Australia,."}</Text>
          </View>
          <Text style={ViewDetailCss.apartment_text}>$850.00</Text>

        </View>
        <DividerIcon />
        <View style={ViewDetailCss.subContainer}>
          <Text style={ViewDetailCss.welcome_Text}>
            {
              "Welcome to your new home! This beautiful 3 bedroom, 2 bathroom apartment boasts modern interior finishes and a spacious extended balcony. As you enter, you..."
            }
          </Text>

        </View>
        <DividerIcon />
        <View style={ViewDetailCss.subContainer}>

          <FlatList
            data={Detail}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            numColumns={2}
            keyExtractor={(item) => item?.id}
            renderItem={Detail_rander}
          />
        </View>
        <DividerIcon />
        <View style={ViewDetailCss.Container}>
          <Text style={ViewDetailCss.inspections}>
            {
              "Inspections"
            }
          </Text>
          <CustomSingleButton _ButtonText={'Request an inspection'} Text_Color={_COLORS.Kodie_WhiteColor} />
        </View>
        <DividerIcon />
        <View style={ViewDetailCss.Container}>
          <View style={ViewDetailCss.propety_details_view}>
            <Text style={ViewDetailCss.propery_det}>{"Property details"}</Text>

            <TouchableOpacity style={ViewDetailCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={ViewDetailCss.Container}>
          <View style={ViewDetailCss.propety_details_view}>
            <Text style={ViewDetailCss.propery_det}>{"Rooms"}</Text>

            <TouchableOpacity style={ViewDetailCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={ViewDetailCss.Container}>
          <View style={ViewDetailCss.propety_details_view}>
            <Text style={ViewDetailCss.propery_det}>{"External featuress"}</Text>

            <TouchableOpacity style={ViewDetailCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={ViewDetailCss.Container}>
          <View style={ViewDetailCss.propety_details_view}>
            <Text style={ViewDetailCss.propery_det}>{"Points of interest"}</Text>

            <TouchableOpacity style={ViewDetailCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={ViewDetailCss.bottomButtonMainView}>
          <RowButtons
            LeftButtonText={'Submit application'}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_BlackColor}
            onPressLeftButton={() => props.navigation.navigate('SubmitApplication')}
            RightButtonText={'Message owner'}
            RightButtonborderColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
          />
        </View>
      </ScrollView>
    </View>
  );
};
