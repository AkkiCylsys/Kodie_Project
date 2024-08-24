import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { _COLORS, IMAGES } from "../../../../Themes";
import { ContractorsImageStyle } from "./ContractorsImageStyle";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // Import the hook

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
    Data: "Remove contractor from preferred",
    Icon: (
      <MaterialCommunityIcons
        name="delete-outline"
        size={30}
        color={ _COLORS.Kodie_GreenColor }
        resizeMode={"contain"}
        style={{ alignSelf: "center" }}
      />
    ),
  },
];

const ContractorsImage = (props) => {
  const navigation = useNavigation(); // Get the navigation instance


  const ContractorsImageContent = ({ item }) => {
    return (
      <TouchableOpacity
        style={ContractorsImageStyle.content_View}
        onPress={() => {
          if (item.id === "3") {
            navigation.navigate("Notices"); // Navigate to Notices screen when id is "3"
          } 
        }}
      >
        <View style={ContractorsImageStyle.Bottomcontainer}>
          <Text style={ContractorsImageStyle.IconView}>{item.Icon}</Text>
        </View>
        <Text style={ContractorsImageStyle.text}>{item.Data}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={ContractorsImageStyle.mainContainer}>
      <View style={ContractorsImageStyle.upload_View}></View>
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

export default ContractorsImage;
