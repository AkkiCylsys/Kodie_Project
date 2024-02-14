import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { IMAGES } from "../../../Themes";
import { useNavigation } from "@react-navigation/native";
import { _COLORS } from "../../../Themes";
import { EditDocumentsModalStyle } from "./EditDocumentsModalStyle";
import Entypo from "react-native-vector-icons/Entypo";
const data = [
  {
    id: "1",
    title: "View document",
    image: IMAGES.view_doc,
  },
  {
    id: "2",
    title: "Delete document",
    image: IMAGES.Delete,
  },
  {
    id: "3",
    title: "Download document",
    image: IMAGES.Download_doc,
  },
];

export default EditDocumentsModal = (props) => {
  const property_id = props.property_id;
  const closemodal = props.closemodal;
  const deleteHandler = props.deleteHandler;
  const downloadFile = props.downloadFile;
  const fileKey = props.fileKey;
  // alert(fileKey)
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={EditDocumentsModalStyle.Main_View}
      onPress={() => {
        // if (item.id === "1") {
        //   props.onpress();
        // }
        if (item.id === "2") {
          deleteHandler(fileKey);
        }
        if (item.id === "3") {
          downloadFile();
        }
      }}
    >
      <Image source={item.image} style={EditDocumentsModalStyle.Icons} />
      <Text style={EditDocumentsModalStyle.Invite_Data_Text}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={EditDocumentsModalStyle.mainContainer}>
      <View style={EditDocumentsModalStyle.subContainer}>
        <Text style={EditDocumentsModalStyle.Invite_tenant}>
          {"Edit document"}
        </Text>
        <TouchableOpacity
          onPress={() => {
            closemodal();
          }}
        >
          <Entypo name="cross" size={25} color={_COLORS.Kodie_BlackColor} />
        </TouchableOpacity>
      </View>
      <View style={EditDocumentsModalStyle.All_Data_View}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};
