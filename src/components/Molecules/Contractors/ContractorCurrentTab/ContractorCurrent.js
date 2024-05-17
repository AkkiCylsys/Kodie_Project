import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { _COLORS } from "../../../../Themes";
import { ContractorCurrentStyle } from "./ContractorCurrentStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

const data = [
  {
    id: "1",
    Data: "View / edit contractor details",
    // Img: IMAGES.View_property,
    Icon: (
      <MaterialIcons
        name="preview"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={"contain"}
        style={{ alignSelf: "center" }}
      />
    ),
  },
  {
    id: "2",
    Data: "Request new quote",
    // Img: IMAGES.gallery,
    Icon: (
      <Ionicons
        name="document-outline"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={"contain"}
        style={{ alignSelf: "center" }}
      />
    ),
  },
  {
    id: "3",
    Data: "Create notice / reminder",
    // Img: IMAGES.Reminder,
    Icon: (
      <Ionicons
        name="mail-unread-outline"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={"contain"}
        style={{ alignSelf: "center" }}
      />
    ),
  },
  {
    id: "4",
    Data: "Message contractor",
    // Img: IMAGES.Delete,
    Icon: (
      <Entypo
        name="flow-line"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={"contain"}
        style={{ alignSelf: "center" }}
      />
    ),
  },
];

const ContractorCurrent = (props) => {
  const handleDeleteContractor = (ContractorId) => {
    console.log(ContractorId, "catch data");
    props.onDelete(ContractorId);
  };
  const ContractorsImageContent = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={ContractorCurrentStyle.content_View}
          onPress={() => {
            if (item.id == "4") {
              handleDeleteContractor();
            }
          }}
        >
          <TouchableOpacity style={ContractorCurrentStyle.Bottomcontainer}>
            {/* <Image source={item.Img} style={ContractorCurrentStyle.Icons} /> */}
            {/* {item.icon} */}
            <Text style={ContractorCurrentStyle.IconView}>{item.Icon}</Text>
          </TouchableOpacity>
          <Text style={ContractorCurrentStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={ContractorCurrentStyle.mainContainer}>
      <View style={ContractorCurrentStyle.upload_View}></View>

      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={ContractorsImageContent}
      />
    </View>
  );
};

export default ContractorCurrent;
