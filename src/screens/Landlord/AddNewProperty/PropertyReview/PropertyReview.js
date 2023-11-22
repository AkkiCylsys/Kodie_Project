import React, { useEffect, useState } from "react";
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
import { _COLORS, BANNERS, IMAGES } from "../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import Leases from "./Leases/Leases";
import Details from "./Details/Details";
import Expenses from "./Expenses/Expenses";
import Documents from "./Documents/Documents";

import AntDesign from "react-native-vector-icons/AntDesign";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import { Config } from "../../../../Config";
import axios from "axios";

import StepIndicator from "react-native-step-indicator";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";
import { DetailsStyle } from "./Details/DetailsStyles";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
const stepLabels = ["Step 1", "Step 2", "Step 3", "Step 4"];

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
  const property_id = props?.route?.params?.property_id;
  const MultiImageName = props?.route?.params?.MultiImageName;
  const selectedVideos = props?.route?.params?.selectedVideos;
  console.log(
    ".............property_idreview",
    property_id,
    MultiImageName,
    selectedVideos
  );
  const [activeTab, setActiveTab] = useState("Tab1");
  const [tabValue, setTabValue] = useState("");
  const [getPropertyDetail, setGetPropertyDetail] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [property_Detail, setProperty_Details] = useState([]);

  const [currentPage, setCurrentPage] = useState(4);
  const Detail_rander = ({ item, index }) => {
    return (
      <>
        <View style={DetailsStyle.DetailsView}>
          <Image source={item.images} style={DetailsStyle.DetailsIcon} />
          <Text style={DetailsStyle.details_text}>{item.name}</Text>
        </View>
      </>
    );
  };
  useEffect(() => {
    DetailsData();
  }, []);
  const DetailsData = () => {
    const detailData = {
      user: property_id,
    };
    console.log("detailData", detailData);
    const url = Config.API_URL;
    const property_Detailss = url + "get_All_Property_details";
    console.log("Request URL:", property_Detailss);
    setIsLoading(true);
    axios
      .post(property_Detailss, detailData)
      .then((response) => {
        console.log("propertyDetail", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          setProperty_Details(response.data.property_details);

          console.log("propertyDetail....", response.data.property_details);
        } else {
          console.error("propertyDetail_error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("property_type error:", error);
        // alert(error);
        setIsLoading(false);
      });
  };
  const imagePaths = MultiImageName.map((image) => image.path);

  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: "feed",
      // name: stepStatus === "finished" ? "check" : (position + 1).toString(),
      color: stepStatus === "finished" ? "#ffffff" : "#fe7013",
      size: 20,
    };

    switch (position) {
      case 0: {
        iconConfig.name = stepStatus === "finished" ? "check" : null;
        break;
      }
      case 1: {
        iconConfig.name = stepStatus === "finished" ? "check" : null;
        break;
      }
      case 2: {
        iconConfig.name = stepStatus === "finished" ? "check" : null;
        break;
      }
      case 3: {
        iconConfig.name = stepStatus === "finished" ? "check" : null;
        break;
      }

      default: {
        break;
      }
    }
    return iconConfig;
  };
  const firstIndicatorSignUpStepStyle = {
    stepIndicatorSize: 40,
    currentStepIndicatorSize: 20,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    separatorFinishedColor: _COLORS.Kodie_GrayColor,
    separatorUnFinishedColor: _COLORS.Kodie_LightOrange,
    stepIndicatorFinishedColor: _COLORS.Kodie_GreenColor,
    stepIndicatorUnFinishedColor: _COLORS.Kodie_GrayColor,
    stepIndicatorCurrentColor: _COLORS.Kodie_WhiteColor,
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: _COLORS.Kodie_BlackColor,
    stepIndicatorLabelFinishedColor: _COLORS.Kodie_BlackColor,
    stepIndicatorLabelUnFinishedColor: "rgba(255,255,255,0.5)",
    labelColor: _COLORS.Kodie_BlackColor,
    labelSize: 14,
    labelAlign: "center",
  };
  const renderStepIndicator = (params) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  const renderLabel = ({ position, stepStatus }) => {
    // const iconColor = stepStatus === "finished" ? "#000000" : "#808080";
    const iconColor =
      position === currentPage // Check if it's the current step
        ? _COLORS.Kodie_BlackColor // Set the color for the current step
        : stepStatus === "finished"
        ? "#000000"
        : "#808080";
    const iconName =
      position === 0
        ? "Details"
        : position === 1
        ? "Features"
        : position === 2
        ? "Images"
        : position === 3
        ? "Review"
        : "null";

    return (
      <View style={{}}>
        <Text
          style={{
            fontSize: 14,
            marginTop: 1,
            marginHorizontal: 10,
            color: iconColor,
            alignSelf: "center",
          }}
        >{`Step ${position + 1}`}</Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 5,
            marginHorizontal: 10,
            color: iconColor,
          }}
        >
          {iconName}
        </Text>
      </View>
    );
  };
  const goBack = () => {
    props.navigation.pop();
  };
  const checkTabs = () => {
    switch (tabValue) {
      case "Details":
        return (
          // <Details
          //   AddProperty={() => {
          //     props.navigation.navigate("NewInspection");
          //   }}
          // />
          <>
            <Text style={DetailsStyle.welcome_Text}>
              {/* {
                  "Welcome to your new home! This beautiful 3 bedroom, 2 bathroom apartment boasts modern interior finishes and a spacious extended balcony. As you enter, you..."
                } */}
              {property_Detail[0]?.property_description}
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
            <DividerIcon
              borderBottomWidth={1}
              color={_COLORS.Kodie_GrayColor}
            />

            <View style={DetailsStyle.subContainer}>
              <View style={DetailsStyle.propety_details_view}>
                <Text style={DetailsStyle.propery_det}>
                  {"Property details"}
                </Text>

                <TouchableOpacity style={DetailsStyle.down_Arrow_icon}>
                  <AntDesign
                    name="down"
                    size={15}
                    color={_COLORS.Kodie_GrayColor}
                  />
                </TouchableOpacity>
              </View>
              <DividerIcon marginTop={8} />
            </View>
            <View style={DetailsStyle.subContainer}>
              <View style={DetailsStyle.propety_details_view}>
                <Text style={DetailsStyle.propery_det}>{"Rooms"}</Text>

                <TouchableOpacity style={DetailsStyle.down_Arrow_icon}>
                  <AntDesign
                    name="down"
                    size={15}
                    color={_COLORS.Kodie_GrayColor}
                  />
                </TouchableOpacity>
              </View>
              <DividerIcon marginTop={8} />
            </View>
            <View style={DetailsStyle.subContainer}>
              <View style={DetailsStyle.propety_details_view}>
                <Text style={DetailsStyle.propery_det}>
                  {"External featuress"}
                </Text>

                <TouchableOpacity style={DetailsStyle.down_Arrow_icon}>
                  <AntDesign
                    name="down"
                    size={15}
                    color={_COLORS.Kodie_GrayColor}
                  />
                </TouchableOpacity>
              </View>
              <DividerIcon marginTop={8} />
            </View>
            <View style={DetailsStyle.subContainer}>
              <View style={DetailsStyle.propety_details_view}>
                <Text style={DetailsStyle.propery_det}>
                  {"Points of interest"}
                </Text>

                <TouchableOpacity style={DetailsStyle.down_Arrow_icon}>
                  <AntDesign
                    name="down"
                    size={15}
                    color={_COLORS.Kodie_GrayColor}
                  />
                </TouchableOpacity>
              </View>
              <DividerIcon marginTop={8} />
              <View style={PropertyReviewStyle.btnView}>
                <CustomSingleButton
                  _ButtonText={"Add property"}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    props?.navigation?.navigate("Properties");
                  }}
                />
              </View>
              <View style={PropertyReviewStyle.btnView}>
                <CustomSingleButton
                  _ButtonText={"Add property features later"}
                  Text_Color={_COLORS.Kodie_BlackColor}
                  backgroundColor={_COLORS.Kodie_WhiteColor}
                />
              </View>
              <TouchableOpacity
                style={PropertyReviewStyle.goBack_View}
                onPress={() => {
                  goBack();
                }}
              >
                <View style={PropertyReviewStyle.backIcon}>
                  <Ionicons
                    name="chevron-back"
                    size={22}
                    color={_COLORS.Kodie_MediumGrayColor}
                  />
                </View>
                <Text style={PropertyReviewStyle.goBack_Text}>{"Go back"}</Text>
              </TouchableOpacity>
            </View>
          </>
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
      <TopHeader onPressLeftButton={goBack} MiddleText={"Add new property"} />
      <View
        style={{
          marginTop: 15,
        }}
      >
        <StepIndicator
          customSignUpStepStyle={firstIndicatorSignUpStepStyle}
          currentPosition={currentPage}
          // onPress={onStepPress}
          renderStepIndicator={renderStepIndicator}
          labels={stepLabels}
          stepCount={4}
          renderLabel={renderLabel}
        />
      </View>
      <ScrollView>
        <View style={PropertyReviewStyle.headingView}>
          <Text style={PropertyReviewStyle.heading}>
            {"Review property details"}
          </Text>
        </View>
        <View style={PropertyReviewStyle.slider_view}>
          <SliderBox
            images={
              property_Detail[0]?.image_path
                ? property_Detail[0]?.image_path
                : imagePaths
            }
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
              {property_Detail[0]?.property_type}
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
          <Text style={PropertyReviewStyle.melbourne_Text}>
            {property_Detail[0]?.location || "Melbourne"}
          </Text>
          <View style={PropertyReviewStyle.share_View}>
            <Entypo
              name="location-pin"
              size={20}
              color={_COLORS.Kodie_GreenColor}
            />
            <Text>
              {property_Detail[0]?.location ||
                "8502 Preston Rd.Inglewood,Queensland,Australia,."}
            </Text>
          </View>
          <View style={PropertyReviewStyle.Details_Tab}>
            <TouchableOpacity
              onPress={() => {
                setTabValue("Details");
              }}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: _COLORS.Kodie_BlackColor,
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
        {isLoading ? <CommonLoader /> : null}
      </ScrollView>
    </View>
  );
};
