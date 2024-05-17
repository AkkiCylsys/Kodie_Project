import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { _COLORS } from "../../../../Themes";
import { ContractorPreviousStyle } from "./ContractorPreviousStyle";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

const data = [
  {
    id: "1",
    Data: "View / edit contractor details",
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
    Icon: (
      <MaterialCommunityIcons
        name="image-area"
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
    id: "5",
    Data: "View completed jobs",
    Icon: (
      <Entypo
        name="tools"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={"contain"}
        style={{ alignSelf: "center" }}
      />
    ),
  },
  {
    id: "6",
    Data: "Ratings & feedback",
    Icon: (
      <MaterialCommunityIcons
        name="star-box-outline"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={"contain"}
        style={{ alignSelf: "center" }}
      />
    ),
  },
];

const ContractorPrevious = (props) => {
  const handleDeleteContractor = (ContractorId) => {
    console.log(ContractorId, "catch data");
    props.onDelete(ContractorId);
  };

  const ContractorsImageContent = ({ item }) => {
    return (
      <TouchableOpacity
        style={ContractorPreviousStyle.content_View}
        onPress={() => {
          if (item.id == "4") {
            handleDeleteContractor();
          }
        }}
      >
        <View style={ContractorPreviousStyle.Bottomcontainer}>
          <Text style={ContractorPreviousStyle.IconView}>{item.Icon}</Text>
        </View>
        <Text style={ContractorPreviousStyle.text}>{item.Data}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={ContractorPreviousStyle.mainContainer}>
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

export default ContractorPrevious;
