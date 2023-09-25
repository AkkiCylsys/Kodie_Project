import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import TopHeader from "../../../components/Molecules/Header/Header";
import CustomTabNavigator from "../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import { _goBack } from "./../../../services/CommonServices/index";
import { BANNERS, _COLORS } from "../../../Themes";
import { PropertyInspectionCSS } from "./PropertyInspectionCss";
import ReviewInspection from "./ReviewInspection/ReviewInspection";
import Entypo from "react-native-vector-icons/Entypo";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import Inspection from "./Inspection/Inspection";
import Schedule from "./Schedule/Schedule";
const images = [
  BANNERS.Apartment,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];
const PropertyInspection = (props) => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":
        return <Schedule />;
      case "Tab2":
        return <Inspection />;
      case "Tab3":
        return (
          <ReviewInspection
            ViewApplication={() => props.navigation.navigate("ViewApplication")}
          />
        );

      default:
        return (
          <View>
            <Text>Schedule</Text>
          </View>
        );
    }
  };

  return (
    <View style={PropertyInspectionCSS.MainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"8502 Preston Rd. Inglewood..."}
      />
      <ScrollView>
        <View style={PropertyInspectionCSS.slider_view}>
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
            dotStyle={PropertyInspectionCSS.dotStyle}
            ImageComponentStyle={{
              flex: 1,
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={PropertyInspectionCSS.Container}>
          <Text style={PropertyInspectionCSS.apartment_text}>
            {"Apartment"}
          </Text>

          <Text style={PropertyInspectionCSS.melbourne_Text}>
            {"Melbourne"}
          </Text>
          <View style={PropertyInspectionCSS.locationView}>
            <Entypo
              name="location-pin"
              size={20}
              color={_COLORS.Kodie_GreenColor}
            />
            <Text style={PropertyInspectionCSS.LocationText}>
              {"8502 Preston Rd.Inglewood,Queensland,Australia,."}
            </Text>
          </View>
        </View>
        <DividerIcon marginBottom={1} />
        <CustomTabNavigator
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          TAB3
          Tab1={"Schedule"}
          Tab2={"Inspection"}
          Tab3={"Review"}
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
          styleTab1={activeTab === "Tab1" && PropertyInspectionCSS.activeTab}
          styleTab2={activeTab === "Tab2" && PropertyInspectionCSS.activeTab}
          styleTab3={activeTab === "Tab3" && PropertyInspectionCSS.activeTab}
        />
        <View style={PropertyInspectionCSS.Line} />
        {checkTabs()}
      </ScrollView>
    </View>
  );
};

export default PropertyInspection;
