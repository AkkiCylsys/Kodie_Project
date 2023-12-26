import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Noticecss } from "./Noticecss";
import { IMAGES, _COLORS } from "../../Themes/index";
import Entypo from "react-native-vector-icons/Entypo";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
const data = [
  {
    id: "1",
    image: IMAGES.redLine,
    notice: "Lease agreement expiring in 30 days",
    location: "2118 Thornridge Cir. Syracuse,",
  },
  {
    id: "2",
    image: IMAGES.greenLine,
    notice: "Pre move inspection due",
    location: "8502 Preston Rd. Inglewood",
  },
  {
    id: "3",
    image: IMAGES.blueLine,
    notice: "Post move inspection due",
    location: "65 Mountain View Parade",
  },
];
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
import { useState } from "react";
export default Notice = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const NoticeData = ({ item, index }) => {
    return (
      <>
        <View style={Noticecss.container}>
          <View style={Noticecss.pdfInfo}>
            <Image source={item.image} style={Noticecss.lines} />
            <View style={Noticecss.textContainer}>
              <Text style={Noticecss.note}>{item.notice}</Text>
              <View style={Noticecss.address}>
                <Entypo
                  name="location-pin"
                  size={15}
                  color={_COLORS.Kodie_GrayColor}
                />
                <Text style={Noticecss.location}>{item.location}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={Noticecss.crossIcon}>
            <Entypo
              name="chevron-small-right"
              size={20}
              color={_COLORS.Kodie_BlackColor}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <View style={Noticecss.maincontainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Notice"}
      />
      <View style={Noticecss.propertyView}>
        <Text style={Noticecss.propertyTittle}>{"Property Notices"}</Text>
      </View>
      <FlatList
        data={data}
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={NoticeData}
      />
      <View style={Noticecss.btnView}>
        <CustomSingleButton
          height={45}
          _ButtonText={"Add Notice"}
          backgroundColor={_COLORS.Kodie_lightGreenColor}
          Text_Color={_COLORS.Kodie_BlackColor}
          borderColor={_COLORS.Kodie_GreenColor}
          disabled={isLoading ? true : false}
        />
      </View>
    </View>
  );
};
