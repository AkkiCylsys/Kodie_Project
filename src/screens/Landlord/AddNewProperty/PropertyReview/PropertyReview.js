import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { PropertyReviewStyle } from "./PropertyReviewStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import { SliderBox } from "react-native-image-slider-box";
import { _COLORS, BANNERS } from "../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import Leases from "./Leases/Leases";
import Details from "./Details/Details";
import Expenses from "./Expenses/Expenses";
import Documents from "./Documents/Documents";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
const images = [
  BANNERS.Apartment,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];

export default PropertyReview = (props) => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [tabValue, setTabValue] = useState("");
  const [getPropertyDetail, setGetPropertyDetail] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const getPropertyDetails = () => {
    const url = Config.API_URL;
    const getPropertyDetailsurl = url + "get_All_Property_details";
    console.log("Request URL:", getPropertyDetailsurl);
    setIsLoading(true);
    axios
      .post(getPropertyDetailsurl, {
        user: 2,
      })
      .then((response) => {
        console.log("getPropertyDetails", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log(
            "getPropertyDetails....",
            response.data?.property_details
          );
          setGetPropertyDetail(response?.data?.property_details);
        } else {
          console.error("getPropertyDetails_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("getPropertyDetails error:", error);
        alert(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getPropertyDetails();
  }, []);
  const checkTabs = () => {
    switch (tabValue) {
      case "Details":
        return (
          <Details
            AddProperty={() => {
              props.navigation.navigate("NewInspection");
            }}
          />
        );
      case "Leases":
        return <Leases />;
      case "Expenses":
        return <Expenses />;
      case "Documents":
        return <Documents />;
      default:
        return <Details />;
    }
  };
  return (
    <View style={PropertyReviewStyle.mainContainer}>
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
          <View style={PropertyReviewStyle.Details_Tab}>
            <TouchableOpacity
              onPress={() => {
                setTabValue("Details");
              }}
            >
              <Text style={[PropertyReviewStyle.Tab_text]}>{"Details"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTabValue("Leases");
              }}
            >
              <Text style={PropertyReviewStyle.Tab_text}>{"Leases"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTabValue("Expenses");
              }}
            >
              <Text style={PropertyReviewStyle.Tab_text}>{"Expenses"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTabValue("Documents");
              }}
            >
              <Text style={PropertyReviewStyle.Tab_text}>{"Documents"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <DividerIcon borderBottomWidth={3} />
        {checkTabs()}
      </ScrollView>
    </View>
  );
};
