import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { DetailsStyle } from "./DetailsStyles";
import { _goBack } from "../../../../../services/CommonServices";
import AntDesign from "react-native-vector-icons/AntDesign";
import DividerIcon from "../../../../../components/Atoms/Devider/DividerIcon";
import { _COLORS, BANNERS, LABEL_STYLES, IMAGES } from "../../../../../Themes";
import { Config } from "../../../../../Config";
import axios from "axios";
import { CommonLoader } from "../../../../../components/Molecules/ActiveLoader/ActiveLoader";
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

export default Details = (props) => {
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
  return (
    <View>
      <ScrollView>
        <Text style={DetailsStyle.welcome_Text}>
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

        <DividerIcon borderBottomWidth={1} color={_COLORS.Kodie_GrayColor} />
        <View style={DetailsStyle.subContainer}>
          <View style={DetailsStyle.propety_details_view}>
            <Text style={DetailsStyle.propery_det}>{"Property details"}</Text>

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
            <Text style={DetailsStyle.propery_det}>{"External featuress"}</Text>

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
            <Text style={DetailsStyle.propery_det}>{"Points of interest"}</Text>

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
        {/* <View style={DetailsStyle.btnView}>
          <CustomSingleButton
            _ButtonText={"Edit details"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={props.AddProperty}
          />
        </View> */}
        {/* <TouchableOpacity
          style={DetailsStyle.goBack_View}
          onPress={() => {
            props.navigation.navigate("PropertyImages");
          }}
        >
          <View style={DetailsStyle.backIcon}>
            <Ionicons
              name="chevron-back"
              size={22}
              color={_COLORS.Kodie_MediumGrayColor}
            />
          </View>
          <Text style={DetailsStyle.goBack_Text}>{"Go back"}</Text>
        </TouchableOpacity> */}
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
