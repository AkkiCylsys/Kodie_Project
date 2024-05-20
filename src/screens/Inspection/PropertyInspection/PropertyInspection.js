import React, { useState,useRef, useEffect } from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
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
import { Config } from "../../../Config";
import axios from "axios";
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";
const images = [
  BANNERS.Apartment,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];
const PropertyInspection = (props) => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [property_Detail, setProperty_Details] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

const TIM_KEY = props?.route?.params?.TIM_KEY;
const PropertyId = props?.route?.params?.PropertyId;
const account_id = props?.route?.params?.account_id;
console.log("TIM_KEY ins",TIM_KEY);
console.log("PropertyId ins",PropertyId);
useEffect(()=>{
  fetchPropertyData();
},[])
  const refRBSheet = useRef();
  const fetchPropertyData = async () => {
    try {
      // Fetch property details
      const detailData = {
        property_id:PropertyId,
      };
      // alert(JSON.stringify(detailData))
      const url = Config.BASE_URL;
      const property_Detailss = url + 'get_property_details';

      console.log('url..', property_Detailss);
      setIsLoading(true);
      const response = await axios.post(property_Detailss, detailData);
      setIsLoading(false);
      console.log('response_get_property_details...', response?.data);
      if (response?.data?.success === true) {
        setProperty_Details(response?.data?.property_details[0]);
      } else {
        console.error('propertyDetail_error:', response?.data?.error);
        // alert('Oops something went wrong! Please try again later.');
      }
     
    } catch (error) {
      console.error('Error:', error);
      // alert(error);
      setIsLoading(false);
    }
  };
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":
        return <Schedule TIM_KEY={TIM_KEY} account_id={account_id}/>;
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
    <SafeAreaView style={PropertyInspectionCSS.MainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={property_Detail?.location || ''}
      />
      <ScrollView>
        <View style={PropertyInspectionCSS.slider_view}>
        {property_Detail.image_path &&
            property_Detail.image_path.length != 0 ? (
          <SliderBox
            images={property_Detail.image_path}
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
            ):null}
        </View>
        <View style={PropertyInspectionCSS.Container}>
          <Text style={PropertyInspectionCSS.apartment_text}>
         { property_Detail?.property_type}
          </Text>

          <Text style={PropertyInspectionCSS.melbourne_Text}>
          {property_Detail?.state || property_Detail?.city || ''}
          </Text>
          <View style={PropertyInspectionCSS.locationView}>
            <Entypo
              name="location-pin"
              size={20}
              color={_COLORS.Kodie_GreenColor}
            />
            <Text style={PropertyInspectionCSS.LocationText}>
            {property_Detail?.location || ''}

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
      {isLoading?<CommonLoader/>:null}
    </SafeAreaView>
  );
};

export default PropertyInspection;
