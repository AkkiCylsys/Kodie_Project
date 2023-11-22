import React, { useRef } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { BottomModalDataStyle } from "./BottomModalDataStyle";
import { IMAGES, _COLORS } from "../../../Themes";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DeleteData from "../DeleteData/DeleteData";
import RBSheet from "react-native-raw-bottom-sheet";
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
  const refRBSheet = useRef(); // RB Sheet useRef .............
  const navigation = useNavigation(); // Hook to get navigation.............
  // Define propertyDelete here
  // const propertyDelete = (propertyIdToDelete) => {
  //   props.onDelete(propertyIdToDelete);
  //   console.log("accept delete...!",propertyIdToDelete);
  //   alert(propertyIdToDelete,'id.....')
  // };
  // const handleDeleteProperty = (propertyIdToDelete) => {
  //   console.log(propertyIdToDelete, "catch data");
  //   props.onDelete(propertyIdToDelete);
  //   console.log("Raul data cath........... ", props.onDelete(propertyIdToDelete));
  //   console.log("Delete property successful....");
  //   alert(propertyIdToDelete);
  // };

  const handleDeleteProperty = (propertyDelId) => {
    console.log(propertyDelId, "catch data");
    props.onDelete(propertyDelId);
    console.log("Raul data cath........... ", props.onDelete(propertyDelId));
    console.log("Delete property successful....");
    alert(propertyDelId);
  };
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
              // alert(propertyIdToDelete,'id.....')
              // refRBSheet.current.open();
              // propertyDelete()
              // propertyDelete()
              handleDeleteProperty(propertyDelId)
            }
          }}
        >
          <Image source={item.Img} style={BottomModalDataStyle.Icons} />
          <Text style={BottomModalDataStyle.text}>{item.Data}</Text>
        </TouchableOpacity>

        {/* rbSheet code here */}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={180}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: BottomModalDataStyle.bottomModal_container,
          }}
        >
          {/* <DeleteData onDelete={propertyDelete}/> */}
          {/* {typeof props.onDelete === "function" && (
            <DeleteData onDelete={props.onDelete} />
          )} */}
        </RBSheet>
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
