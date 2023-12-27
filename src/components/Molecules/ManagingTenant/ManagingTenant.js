import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { ManagingTenantStyle } from "./ManagingTenantStyle";
import { _COLORS, IMAGES } from "../../../Themes";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const data = [
  {
    id: "1",
    Data: "View / edit tenant details",
    // Img: IMAGES.View_property,
    Icon:<MaterialIcons
    name="preview"
    size={25}
    color={_COLORS.Kodie_GreenColor}
  />
  },
  {
    id: "2",
    Data: "Rent history",
    // Img: IMAGES.Documents,
    Icon:<MaterialCommunityIcons
    name="folder-cog-outline"
    size={25}
    color={_COLORS.Kodie_GreenColor}
  />
  },
  {
    id: "3",
    Data: "Manage documents",
    // Img: IMAGES.Reminder,
    Icon:<MaterialCommunityIcons
    name="folder-cog-outline"
    size={25}
    color={_COLORS.Kodie_GreenColor}
  />
  },
  {
    id: "4",
    Data: "Notices & reminders",
    // Img: IMAGES.Chat_Tenant,
    Icon:<Ionicons
    name="mail-unread-outline"
    size={25}
    color={_COLORS.Kodie_GreenColor}
  />
  },
  {
    id: "5",
    Data: "Delete tenant",
    // Img: IMAGES.Delete,
    Icon:<MaterialCommunityIcons
    name="delete-outline"
    size={25}
    color={_COLORS.Kodie_GreenColor}
  />
  },
];

const ManagingTenant = (props) => {
  const handleCloseModal = () => {
    props.onClose();
  };
  const BottomData = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={ManagingTenantStyle.container}
          onPress={() => {
            if (item.id === "1") {
              // navigation.navigate("ViewPropertyDetails");
            }
            if (item.id === "2") {
            }
          }}
        >
          {/* <Image source={item.Img} style={ManagingTenantStyle.Icons} /> */}
          {/* {item.Icon} */}
          <Text style={ManagingTenantStyle.IcontenantView}>
            {item.Icon}
            </Text>
          <Text style={ManagingTenantStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={ManagingTenantStyle.mainContainer}>
      <TouchableOpacity
        style={ManagingTenantStyle.closeicon}
        onPress={handleCloseModal}
      >
        <Icon name={"close"} size={22} color={_COLORS?.Kodie_BlackColor} />
      </TouchableOpacity>
      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={BottomData}
      />
    </View>
  );
};
export default ManagingTenant;