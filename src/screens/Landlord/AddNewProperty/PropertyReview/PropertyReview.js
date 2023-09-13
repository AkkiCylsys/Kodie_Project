import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { PropertyReviewStyle } from "./PropertyReviewStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import { SliderBox } from "react-native-image-slider-box";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, BANNERS, LABEL_STYLES, IMAGES } from "../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import CustomTabNavigator from "../../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import Leases from "../Leases/Leases";
import {
  useIsFocused,
  CommonActions,
  useFocusEffect,
} from "@react-navigation/native";
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
export default PropertyReview = (props) => {
  const [activeTab, setActiveTab] = useState("Tab1");
  const [tabValue, setTabValue] = useState("PropertyReview");

  useFocusEffect(
    useCallback(() => {
      checkTabs(tabValue);
    }, [props, tabValue])
  );
  const Detail_rander = ({ item, index }) => {
    return (
      <>
        <View style={PropertyReviewStyle.DetailsView}>
          <Image source={item.images} style={PropertyReviewStyle.DetailsIcon} />
          <Text style={PropertyReviewStyle.details_text}>{item.name}</Text>
        </View>
      </>
    );
  };

  const checkTabs = (data) => {
    console.log("checkTabs_data......", data);
    switch (data) {
      case "PropertyReview":
        setTabValue("PropertyReview");
        break;
      case "Leases":
        setTabValue("Leases");
        // props.navigation.navigate("Leases");
        break;
      case "Expenses":
        setTabValue("Expenses");
        break;
      case "Documents":
        setTabValue("Documents");
        break;

      default:
        setTabValue("PropertyReview");
        break;
    }
  };
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
          {/* <CustomTabNavigator
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            TAB3
            TAB4
            Tab1={"Details"}
            Tab2={"Leases"}
            Tab3={"Expenses"}
            Tab4={"Documents"}
          /> */}
          <View style={PropertyReviewStyle.Details_Tab}>
            <TouchableOpacity
              onPress={() => {
                checkTabs("PropertyReview");
              }}
            >
              <Text>{"Details"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                checkTabs("Leases");
              }}
            >
              <Text>{"Leases"}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>{"Expenses"}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>{"Documents"}</Text>
            </TouchableOpacity>
          </View>

          <Text style={PropertyReviewStyle.welcome_Text}>
            {
              "Welcome to your new home! This beautiful 3 bedroom, 2 bathroom apartment boasts modern interior finishes and a spacious extended balcony. As you enter, you..."
            }
          </Text>

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
            onPress={() => {
              props.navigation.navigate("NewInspection");
            }}
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
