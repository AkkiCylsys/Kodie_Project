import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { BottomModalDataStyle } from "./BottomModalDataStyle";
import { IMAGES, _COLORS } from "../../../Themes";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const data = [
  {
    id: "1",
    Data: "View property details",
    Img: IMAGES.View_property,
  },
  {
    id: "2",
    Data: "Manage documents",
    Img: IMAGES.Documents,
  },
  {
    id: "3",
    Data: "Create notice / reminder",
    Img: IMAGES.Reminder,
  },
  {
    id: "4",
    Data: "Chat to tenant",
    Img: IMAGES.Chat_Tenant,
  },
  {
    id: "5",
    Data: "Delete property",
    Img: IMAGES.Delete,
  },
];

const BottomModalData = (props) => {
  const navigation = useNavigation(); // Hook to get navigation

  const handleDeleteProperty =  (property_id) => {
    console.log(property_id,'catch data')
    props.onDelete(property_id);
    console.log('come data',property_id)
    console.log('Raul data ', props.onDelete(property_id))
  };
  // const propertyIdToDelete = item.property_id;
  // props.onDelete(propertyIdToDelete);

  const BottomData = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={BottomModalDataStyle.container}
          onPress={() => {
            if (item.id === "1") {
              navigation.navigate("ViewPropertyDetails");
            }
            if (item.id === "5") {
              // navigation.navigate("ViewPropertyDetails");
              handleDeleteProperty()
              console.log("Property ID:", item.property_id);
            }
          }}
        >
          <Image source={item.Img} style={BottomModalDataStyle.Icons} />
          <Text style={BottomModalDataStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={BottomModalDataStyle.mainContainer}>
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
export default BottomModalData;
