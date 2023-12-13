import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { ManagingTenantStyle } from "./ManagingTenantStyle";
import { _COLORS, IMAGES } from "../../../Themes";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const data = [
  {
    id: "1",
    Data: "View / edit tenant details",
    Img: IMAGES.View_property,
  },
  {
    id: "2",
    Data: "Rent history",
    Img: IMAGES.Documents,
  },
  {
    id: "3",
    Data: "Manage documents",
    Img: IMAGES.Reminder,
  },
  {
    id: "4",
    Data: "Notices & reminders",
    Img: IMAGES.Chat_Tenant,
  },
  {
    id: "5",
    Data: "Delete tenant",
    Img: IMAGES.Delete,
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
          <Image source={item.Img} style={ManagingTenantStyle.Icons} />
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
