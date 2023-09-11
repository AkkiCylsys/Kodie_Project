import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { PropertyReviewStyle } from "./PropertyReviewStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import { SliderBox } from "react-native-image-slider-box";
import { _COLORS, BANNERS, LABEL_STYLES } from "../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
const images = [
  BANNERS.Apartment,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];
export default PropertyReview = () => {
  return (
    <View style={PropertyReviewStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"8502 Preston Rd. Inglewood..."}
      />
      <ScrollView>
        <View style={PropertyReviewStyle.headingView}>
          <Text style={PropertyReviewStyle.heading}>
            {"Review property details"}
          </Text>
        </View>
        <View style={PropertyReviewStyle.slider_view}>
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
            dotStyle={PropertyReviewStyle.dotStyle}
            ImageComponentStyle={{
              flex: 1,
              resizeMode: "cover",
              // borderRadius: 15,
              // width: "90%",
              // position: "relative",
            }}
          />
        </View>
        <View style={PropertyReviewStyle.subContainer}>
          <View style={PropertyReviewStyle.apartment_View}>
            <Text style={PropertyReviewStyle.apartment_text}>
              {"Apartment"}
            </Text>
            <View style={PropertyReviewStyle.share_View}>
              <TouchableOpacity>
                <Entypo
                  name="share"
                  color={_COLORS.Kodie_MediumGrayColor}
                  size={22}
                  style={PropertyReviewStyle.share_sty}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo
                  name="heart-outlined"
                  color={_COLORS.Kodie_MediumGrayColor}
                  size={22}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={PropertyReviewStyle.melbourne_Text}>{"Melbourne"}</Text>
          <View style={PropertyReviewStyle.share_View}>
            <Entypo
              name="location-pin"
              size={20}
              color={_COLORS.Kodie_GreenColor}
            />
            <Text>{"8502 Preston Rd.Inglewood,Queensland,Australia,."}</Text>
          </View>
          <View>
            <Text style={PropertyReviewStyle.welcome_Text}>
              {
                "Welcome to your new home! This beautiful 3 bedroom, 2 bathroom apartment boasts modern interior finishes and a spacious extended balcony. As you enter, you..."
              }
            </Text>
          </View>
        </View>
        <DividerIcon borderBottomWidth={1} color={_COLORS.Kodie_GrayColor} />
        <View style={PropertyReviewStyle.subContainer}>
          <View style={PropertyReviewStyle.propety_details_view}>
            <Text style={PropertyReviewStyle.propery_det}>
              {"Property details"}
            </Text>

            <TouchableOpacity style={PropertyReviewStyle.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={8} />
        </View>
        <View style={PropertyReviewStyle.subContainer}>
          <View style={PropertyReviewStyle.propety_details_view}>
            <Text style={PropertyReviewStyle.propery_det}>{"Rooms"}</Text>

            <TouchableOpacity style={PropertyReviewStyle.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={8} />
        </View>
        <View style={PropertyReviewStyle.subContainer}>
          <View style={PropertyReviewStyle.propety_details_view}>
            <Text style={PropertyReviewStyle.propery_det}>
              {"External featuress"}
            </Text>

            <TouchableOpacity style={PropertyReviewStyle.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={8} />
        </View>
        <View style={PropertyReviewStyle.subContainer}>
          <View style={PropertyReviewStyle.propety_details_view}>
            <Text style={PropertyReviewStyle.propery_det}>
              {"Points of interest"}
            </Text>

            <TouchableOpacity style={PropertyReviewStyle.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={8} />
        </View>
        <View style={PropertyReviewStyle.btnView}>
          <CustomSingleButton
            _ButtonText={"Add property"}
            Text_Color={_COLORS.Kodie_WhiteColor}
          />
        </View>
        <View style={PropertyReviewStyle.goBack_View}>
          <TouchableOpacity style={PropertyReviewStyle.backIcon}>
            <Ionicons
              name="chevron-back"
              size={22}
              color={_COLORS.Kodie_MediumGrayColor}
            />
          </TouchableOpacity>
          <Text style={PropertyReviewStyle.goBack_Text}>{"Go back"}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
