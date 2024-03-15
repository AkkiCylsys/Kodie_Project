import React, { useRef } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { VacantModalStyle } from "./VacantModalStyle";
import { IMAGES, _COLORS } from "../../../Themes";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import { PropertyListCSS } from "../../../screens/Landlord/PropertyList/MyProperty/PropertyListCSS";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const data = [
  {
    id: "1",
    Data: "View /edit property details",
    Icon: (
      <MaterialIcons
        name="preview"
        size={25}
        color={_COLORS.Kodie_GreenColor}
        style={{ alignSelf: "center" }}
      />
    ),
  },
  {
    id: "2",
    Data:'List property on kodie property marketplace',
    Icon: (
      <MaterialCommunityIcons
        name="alpha-k-box-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: "3",
    Data: "Manage documents",
    Icon: (
      <MaterialCommunityIcons
        name="file-download-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: "4",
    Data: "Notices & reminders",
    Icon: (
      <Ionicons
        name="mail-unread-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: "5",
    Data: "Delete property",
    Icon: (
      <MaterialIcons
        name="delete-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
];
const data1 = [
  {
    id: "1",
    Data: "Confirm delete property",
    Icon: (
      <MaterialIcons
        name="delete-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: "2",
    Data: "Archive instead",
    Icon: (
      <Ionicons
        name="file-tray-full-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
];

const VacantModal = (props) => {
  const propertyId = props?.propertyId;
//   const isDeletePropertyClicked= props?.isDeletePropertyClicked
//   console.log("isDeletePropertyClicked....",isDeletePropertyClicked)
//   console.log("propertyId VAcant...", propertyId);
  const navigation = useNavigation(); // Hook to get navigation
  const refRBSheet = useRef();
  const handleCloseModal = () => {
    props.onClose(); // Call this function when you want to close the modal without performing delete action
    //alert('hi')
  };
  const handleDeleteProperty = (propertyDelId) => {
    console.log(propertyDelId, "catch data");
    props.onDeleteData(propertyDelId);
    console.log("Vacent data cath........... ", props.onDeleteData(propertyDelId));
    // alert(propertyDelId);
  };
  const FinalDeleteProperty = (propertyDelId, Address) => {
    console.log(propertyDelId, Address, "catch data");
    props.onDeleteData(propertyDelId, Address);
    console.log("come data...........", propertyDelId);
    console.log(
      "Vacent data cath........... ",
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
              style={VacantModalStyle.container}
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
              {/* <Image source={item.Img} style={VacantModalStyle.Icons} /> */}
              {/* //{item.Icon} */}
              <View style={VacantModalStyle.IconView}>{item.Icon}</View>
              <Text style={VacantModalStyle.text}>{item.Data}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={VacantModalStyle.container}
            onPress={() => {
              if (item.id === "1") {
                navigation.navigate("ViewPropertyDetails", {
                  propertyId: propertyId,
                });
                handleCloseModal();
              }
              if (item.id === "5") {
                // navigation.navigate("ViewPropertyDetails");
                handleDeleteProperty();

                // console.log("Property ID:", item.property_id);
              }
            }}
          >
            {/* <Image source={item.Img} style={VacantModalStyle.Icons} /> */}
            <View style={VacantModalStyle.IconView}>{item.Icon}</View>
            <Text style={VacantModalStyle.text}>{item.Data}</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };
  return (
    <View style={VacantModalStyle.mainContainer}>
      <TouchableOpacity
        style={{
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          paddingHorizontal: 20,
        }}
        onPress={handleCloseModal}
      >
        {/* <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} /> */}
        {/* <Icon name={"close"} size={15} color={_COLORS?.Kodie_BlackColor} /> */}
      </TouchableOpacity>
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
                  style={VacantModalStyle.text}
                >{`Delete property: ${props?.Address} ?`}</Text>
              ) : null}
            </>
          );
        }}
      />
    </View>
  );
};
export default VacantModal;
