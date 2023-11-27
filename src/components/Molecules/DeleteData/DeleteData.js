import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";
import { IMAGES, _COLORS } from "../../../Themes";
import { useNavigation } from "@react-navigation/native";
import { DeleteDataStyle } from "./DeleteDataStyle";
const data = [
  {
    id: "1",
    Data: "Delete property",
    Img: IMAGES.Delete,
  },
  {
    id: "2",
    Data: "Archive instead",
    Img: IMAGES.Archive,
  },
];
const DeleteData = (props) => {
  const navigation = useNavigation(); // Hook to get navigation

  const handleDeleteProperty = (propertyIdToDelete) => {
    console.log(propertyIdToDelete, "catch data");
    props.onDelete(propertyIdToDelete);
    console.log("come data...........", propertyIdToDelete);
    console.log("Raul data cath........... ", props.onDelete(propertyIdToDelete));
    console.log("Delete property successful....",propertyIdToDelete);
  };

  const DeleteData = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={DeleteDataStyle.container}
          onPress={() => {
            if (item.id === "1") {
            //   navigation.navigate("ViewPropertyDetails");
            handleDeleteProperty();
            }
            if (item.id === "2") {
              // console.log("Property ID:", item.property_id);
            }
          }}
        >
          <Image source={item.Img} style={DeleteDataStyle.Icons} />
          <Text style={DeleteDataStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={DeleteDataStyle.mainContainer}>
      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={DeleteData}
      />
    </View>
  );
};

export default DeleteData;
