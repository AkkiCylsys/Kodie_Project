import React, { useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { PropertyImagesStyle } from "./PropertyImagesStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import { _COLORS, LABEL_STYLES, BANNERS } from "../../../../Themes";
import { SliderBox } from "react-native-image-slider-box";
import UploadImageBoxes from "../../../../components/Molecules/UploadImageBoxes/UploadImageBoxes";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import UploadImageData from "../../../../components/Molecules/UploadImage/UploadImage";
import Ionicons from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";

const images = [
  BANNERS.Apartment,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];
export default PropertyImages = (props) => {
  const refRBSheet = useRef();

  return (
    <View style={PropertyImagesStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Add new property"}
      />
      <ScrollView>
        <View style={PropertyImagesStyle.headingView}>
          <Text style={PropertyImagesStyle.heading}>{"Property images"}</Text>
        </View>
        <View style={PropertyImagesStyle.phototextView}>
          <View style={PropertyImagesStyle.slider_view}>
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
              dotStyle={PropertyImagesStyle.dotStyle}
              ImageComponentStyle={{
                flex: 1,
                resizeMode: "cover",
                borderRadius: 15,
                width: "90%",
                // position: "relative",
              }}
            />
          </View>
          <Text style={PropertyImagesStyle.upload_Heading_Text}>
            {"Upload images"}
          </Text>
          <View style={{ flex: 1 }}>
            <UploadImageBoxes
              Box_Text={"Add Photo"}
              onPress={() => {
                refRBSheet.current.open();
              }}
            />
            <Text style={PropertyImagesStyle.formatted_property_text}>
              {
                "Images should be formatted .jpg or .png Size per image should not exceed 2 MB"
              }
            </Text>
          </View>
          <Text style={PropertyImagesStyle.upload_Heading_Text}>
            {"Upload Video"}
          </Text>
          <View style={{ flex: 1 }}>
            <UploadImageBoxes
              Box_Text={"Add Photo"}
              onPress={() => {
                refRBSheet.current.open();
              }}
            />
            <Text style={PropertyImagesStyle.formatted_property_text}>
              {
                "Videos should be formatted .mp4, HEVC, MKV.Size per video should not exceed 100 MB"
              }
            </Text>
          </View>
          <View style={PropertyImagesStyle.btnView}>
            <CustomSingleButton
              _ButtonText={"Next"}
              Text_Color={_COLORS.Kodie_WhiteColor}
              onPress={() => {
                props.navigation.navigate("PropertyReview");
              }}
            />
          </View>
          <View style={PropertyImagesStyle.btnView}>
            <CustomSingleButton
              _ButtonText={"Add property photos later"}
              Text_Color={_COLORS.Kodie_BlackColor}
              backgroundColor={_COLORS.Kodie_WhiteColor}
              onPress={() => {
                props.navigation.navigate("AddTenantDetails");
              }}
            />
          </View>
          <TouchableOpacity style={PropertyImagesStyle.goBack_View}
           onPress={() => {
            props.navigation.navigate("PropertyFeature");}}>
            <View style={PropertyImagesStyle.backIcon}>
              <Ionicons
                name="chevron-back"
                size={22}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </View>
            <Text style={PropertyImagesStyle.goBack_Text}>{"Go back"}</Text>
          </TouchableOpacity>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height={180}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent",
              },
              draggableIcon: {
                backgroundColor: _COLORS.Kodie_LightGrayColor,
              },
              container: PropertyImagesStyle.bottomModal_container,
            }}
          >
            <UploadImageData heading_Text={"Upload more images"} />
          </RBSheet>
        </View>
      </ScrollView>
    </View>
  );
};
