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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";
import { DetailsStyle } from "./Details/DetailsStyles";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import CustomTabNavigator from "../../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import { FONTFAMILY, fontFamily } from "../../../../Themes/FontStyle/FontStyle";
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

  const propertyid = props?.route?.params?.propertyid;
  const propertyView = props?.route?.params?.propertyView;
  const MultiImageName = props?.route?.params?.MultiImageName;
  const selectedVideos = props?.route?.params?.selectedVideos;
  const editMode = props?.route?.params?.editMode;
  console.log(propertyView, propertyid);
  const [activeTab, setActiveTab] = useState("Tab1");
  const [isLoading, setIsLoading] = useState([]);
  const [property_Detail, setProperty_Details] = useState([]);
  const [Detail, setDetail] = useState([]);
  const [additionalKeyFeaturesString, setAdditionalKeyFeaturesString] =
    useState([]);
  const [currentPage, setCurrentPage] = useState(3);
  const [additionalKeyFeatures, setAdditionalKeyFeatures] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const Detail_rander = ({ item, index }) => {
    return (
      <>
        <View style={DetailsStyle.DetailsView}>
          {Object.keys(item)[0] == "Bedrooms" ? (
            // (<Image
            //     source={IMAGES.BedroomIcon}
            //     style={DetailsStyle.DetailsIcon}
            //   />)

            <MaterialCommunityIcons
              name="bed-double-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={"contain"}
            />
          ) : Object.keys(item)[0] == "Bathrooms" ? (
            // (
            //   <Image source={IMAGES.Bathroom}
            //   style={DetailsStyle.DetailsIcon} />
            // )
            <MaterialCommunityIcons
              name="shower-head"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={"contain"}
            />
          ) : Object.keys(item)[0] == "Parking Space" ? (
            // (
            //   <Image source={IMAGES.Parking}
            //   style={DetailsStyle.DetailsIcon} />
            // )
            <Ionicons
              name="car-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={"contain"}
            />
          ) : (
            // (
            //   <Image source={IMAGES.Garden}
            //   style={DetailsStyle.DetailsIcon} />
            // )
            <Ionicons
              name="car-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={"contain"}
            />
          )}
          <Text style={DetailsStyle.details_text}>
            {`${Object.keys(item)[0]}: ${Object.values(item)[0]}` || ""}
            {/* {`${key}: ${value}`} */}
          </Text>
        </View>
      </>
    );
  };
  const renderItem = ({ item }) => (
    <View style={DetailsStyle.DetailsView}>
      {item === "Pool" ? (
        // (
        //   <Image source={IMAGES.Bathroom}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialIcons
          name="pool"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={"contain"}
        />
      ) : item === "Garage" ? (
        //  (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="garage"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={"contain"}
        />
      ) : item === "Balcony" ? (
        //   (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="window-closed-variant"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={"contain"}
        />
      ) : item === "Outdoor Area" ? (
        // (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="table-chair"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={"contain"}
        />
      ) : item === "Ensuite" ? (
        //  (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="shower"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={"contain"}
        />
      ) : item === "Dishwasher" ? (
        // (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="dishwasher"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={"contain"}
        />
      ) : item === "Study" ? (
        //  (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="bookshelf"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={"contain"}
        />
      ) : item === "Built in Robes" ? (
        //  (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="fireplace"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={"contain"}
        />
      ) : item === "Air Conditioning" ? (
        //  (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="air-conditioner"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={"contain"}
        />
      ) : item === "Solar Panels" ? (
        // (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="solar-panel"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={"contain"}
        />
      ) : item === "Heating" ? (
        //   (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="fireplace"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={"contain"}
        />
      ) : item === "High Energy Efficiency" ? (
        //  (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <SimpleLineIcons
          name="energy"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={"contain"}
        />
      ) : null}
      <Text style={DetailsStyle.details_text}>{item}</Text>
    </View>
  );
  const fetchData = async () => {
    try {
      // Fetch property details
      const detailData = {
        property_id: propertyView ? propertyid : property_id,
      };
      const url = Config.BASE_URL;
      const property_Detailss = url + "get_property_details";

      console.log("url..", property_Detailss);
      setIsLoading(true);
      const response = await axios.post(property_Detailss, detailData);
      setIsLoading(false);
      console.log("response_get_property_details...", response.data);
      if (response.data.success === true) {
        setProperty_Details(response.data.data[0]);
        // Fetch and process key features..........
        if (response.data.data[0].key_features) {
          const parsedData = JSON.parse(
            response.data.data[0].key_features.replace(/\\/g, "")
          );
          setDetail(parsedData);
        }
        const additionalKeyFeatures =
          response.data.data[0].additional_key_features[0];
        setAdditionalKeyFeaturesString(additionalKeyFeatures);
      } else {
        console.error("propertyDetail_error:", response.data.error);
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    try {
      const keyFeaturesArray = additionalKeyFeaturesString.split(",");
      setAdditionalKeyFeatures(keyFeaturesArray);
    } catch (error) {
      console.error("Error parsing additional_key_features:", error);
    }
    const timeout = setTimeout(() => {
      setNumColumns(2); // Change to the desired number of columns
    }, 2000); // Change this delay as needed

    return () => clearTimeout(timeout);
  }, [property_id, propertyid, additionalKeyFeaturesString]);

  // const imagePaths = MultiImageName.map((image) => image.path);

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
    switch (activeTab) {
      case "Tab1":
        return (
          <>
            <Text style={DetailsStyle.welcome_Text}>
              {property_Detail?.property_description}
              {/* Welcome to your new home! This beautiful 3 bedroom, 2 bathroom
              apartment boasts modern interior finishes and a spacious extended
              balcony. As you enter, you... */}
            </Text>
            {/* <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            > */}

            <Text style={[DetailsStyle.propery_det, { marginHorizontal: 16 }]}>
              {"Key features"}
            </Text>
            <FlatList
              data={Detail}
              scrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{}}
              numColumns={numColumns}
              keyExtractor={(item) => item?.id}
              // keyExtractor={(item, index) => index.toString()}
              renderItem={Detail_rander}
            />
            <DividerIcon />
            <Text style={[DetailsStyle.propery_det, { marginHorizontal: 16 }]}>
              {"Additional key features"}
            </Text>

            <FlatList
              data={additionalKeyFeatures}
              numColumns={numColumns}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
            {/* </View> */}
            <DividerIcon
              borderBottomWidth={1}
              color={_COLORS.Kodie_GrayColor}
            />

            {/* <View style={DetailsStyle.subContainer}>
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
            </View> */}
            <View style={DetailsStyle.subContainer}>
              {/* <View style={DetailsStyle.propety_details_view}>
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
              <DividerIcon marginTop={8} /> */}
              <View style={PropertyReviewStyle.btnView}>
                <CustomSingleButton
                  disabled={isLoading ? true : false}
                  _ButtonText={
                    editMode
                      ? "Edit property"
                      : propertyView
                      ? "Edit details"
                      : "Add property"
                  }
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    props?.navigation?.navigate("Properties");
                  }}
                />
              </View>
              {propertyView ? null : (
                <>
                  <View style={PropertyReviewStyle.btnView}>
                    <CustomSingleButton
                      _ButtonText={
                        editMode
                          ? "Edit property features later"
                          : "Add property features later"
                      }
                      Text_Color={_COLORS.Kodie_BlackColor}
                      backgroundColor={_COLORS.Kodie_WhiteColor}
                      disabled={isLoading ? true : false}
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
                    <Text style={PropertyReviewStyle.goBack_Text}>
                      {"Go back"}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </>
        );
      case "Tab2":
        return <Leases property_id={property_id} />;

      case "Tab3":
        return <Expenses property_id={property_id} />;
      case "Tab4":
        return (
          <Documents
            documentDetail={(folderId, folderHeading, property_id) => {
              props.navigation.navigate("DocumentDetails", {
                folderId: folderId,
                folderHeading: folderHeading,
                property_id: property_id,
              });
            }}
            property_id={property_id}
          />
        );

      default:
        return <Details />;
    }
  };

  return (
    <View style={PropertyReviewStyle.mainContainer}>
      <TopHeader
        isprofileImage
        onPressLeftButton={goBack}
        MiddleText={
          editMode
            ? "Edit property"
            : propertyView
            ? property_Detail?.location
            : "Add new property"
        }
      />
      {propertyView ? null : (
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
      )}
      <ScrollView contentContainerStyle={{}}>
        {propertyView ? null : (
          <View style={[PropertyReviewStyle.headingView]}>
            <Text style={PropertyReviewStyle.heading}>
              {"Review property details"}
            </Text>
          </View>
        )}
        <View style={PropertyReviewStyle.slider_view}>
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
              dotStyle={PropertyReviewStyle.dotStyle}
              ImageComponentStyle={{
                flex: 1,
                resizeMode: "cover",
              }}
            />
          ) : null}
        </View>
        <View style={PropertyReviewStyle.subContainer}>
          <View style={PropertyReviewStyle.apartment_View}>
            <Text style={PropertyReviewStyle.apartment_text}>
              {property_Detail?.property_type}
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
            {property_Detail?.state || property_Detail?.city || ""}
          </Text>
          <View style={PropertyReviewStyle.share_View}>
            <Entypo
              name="location-pin"
              size={20}
              color={_COLORS.Kodie_GreenColor}
            />
            <Text>{property_Detail?.location || ""}</Text>
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: 3,
            borderColor: _COLORS.Kodie_GrayColor,
            elevation: 1,
          }}
        >
          <CustomTabNavigator
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            TAB3
            TAB4
            Tab1={"Details"}
            Tab2={editMode ? null : propertyView ? "Leases" : null}
            Tab3={editMode ? null : propertyView ? "Expenses" : null}
            Tab4={editMode ? null : propertyView ? "Documents" : null}
            onPressTab1={() => setActiveTab("Tab1")}
            onPressTab2={() => {
              if (editMode) {
                null;
              } else if (propertyView) {
                setActiveTab("Tab2");
              } else {
                null;
              }
            }}
            onPressTab3={() => {
              if (editMode) {
                null;
              } else if (propertyView) {
                setActiveTab("Tab3");
              } else {
                null;
              }
            }}
            onPressTab4={() => {
              if (editMode) {
                null;
              } else if (propertyView) {
                setActiveTab("Tab4");
              } else {
                null;
              }
            }}
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
            colorTab4={
              activeTab === "Tab4"
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            FONTFAMILY1={
              activeTab === "Tab1" ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
            }
            FONTFAMILY2={
              activeTab === "Tab2" ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
            }
            FONTFAMILY3={
              activeTab === "Tab3" ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
            }
            FONTFAMILY4={
              activeTab === "Tab4" ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
            }
            styleTab1={activeTab === "Tab1" && PropertyReviewStyle.activeTab}
            styleTab2={activeTab === "Tab2" && PropertyReviewStyle.activeTab}
            styleTab3={activeTab === "Tab3" && PropertyReviewStyle.activeTab}
            styleTab4={activeTab === "Tab4" && PropertyReviewStyle.activeTab}
          />
        </View>
        {checkTabs()}
        {isLoading ? <CommonLoader /> : null}
      </ScrollView>
    </View>
  );
};
