import React, { useRef } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { BottomModalDataStyle } from "./BottomModalDataStyle";
import { IMAGES, _COLORS } from "../../../Themes";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import { PropertyListCSS } from "../../../screens/Landlord/PropertyList/MyProperty/PropertyListCSS";

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
const data1 = [
  {
    id: "1",
    Data: "Delete property",
    Img: IMAGES.View_property,
  },
  {
    id: "2",
    Data: "Archive instead",
    Img: IMAGES.Documents,
  },
];

const BottomModalData = (props) => {
  const navigation = useNavigation(); // Hook to get navigation
  const refRBSheet = useRef();
  const handleDeleteProperty = (propertyDelId) => {
    console.log(propertyDelId, "catch data");
    props.onDelete(propertyDelId);
    console.log("come data...........", propertyDelId);
    console.log("Raul data cath........... ", props.onDelete(propertyDelId));
    // alert(propertyDelId);
  };
  const FinalDeleteProperty = (propertyDelId, Address) => {
    console.log(propertyDelId, Address, "catch data");
    props.onDelete(propertyDelId, Address);
    console.log("come data...........", propertyDelId);
    console.log(
      "Raul data cath........... ",
      props.onDeleteData(propertyDelId, Address)
    );
    // alert(propertyDelId);
  };

  const BottomData = ({ item, index }) => {
    return (
      <>
        {props?.isDeletePropertyClicked ? (
          <>
            <TouchableOpacity
              style={BottomModalDataStyle.container}
              onPress={() => {
                if (item.id === "1") {
                  FinalDeleteProperty();
                  // navigation.navigate("ViewPropertyDetails");
                }
                if (item.id === "2") {
                  // navigation.navigate("ViewPropertyDetails");
                  // console.log("Property ID:", item.property_id);
                }
              }}
            >
              <Image source={item.Img} style={BottomModalDataStyle.Icons} />
              <Text style={BottomModalDataStyle.text}>{item.Data}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={BottomModalDataStyle.container}
            onPress={() => {
              if (item.id === "1") {
                navigation.navigate("ViewPropertyDetails");
              }
              if (item.id === "5") {
                // navigation.navigate("ViewPropertyDetails");
                handleDeleteProperty();

                // console.log("Property ID:", item.property_id);
              }
            }}
          >
            <Image source={item.Img} style={BottomModalDataStyle.Icons} />
            <Text style={BottomModalDataStyle.text}>{item.Data}</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };
  return (
    <View style={BottomModalDataStyle.mainContainer}>
      <FlatList
        data={props?.isDeletePropertyClicked ? data1 : data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={BottomData}
        ListHeaderComponent={() => {
          return (
            <>
              {props?.isDeletePropertyClicked ? (
                <Text
                  style={BottomModalDataStyle.text}
                >{`Delete property: ${props?.Address} ?`}</Text>
              ) : null}
            </>
          );
        }}
      />
    </View>
  );
};
export default BottomModalData;
