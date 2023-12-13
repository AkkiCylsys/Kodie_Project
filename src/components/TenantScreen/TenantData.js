import React, { useRef } from "react";
import { View, Text, Image, FlatList,TouchableOpacity} from "react-native";
import { _COLORS,IMAGES } from "../../Themes";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { TenantDataStyle } from "./TenantDataStyle";
const data = [
  {
    id: "1",
    Data: "Screen tenant",
    // Img: IMAGES.View_property,
    Icon:<MaterialCommunityIcons
    name="home-account"
    size={25}
    color={_COLORS.Kodie_GreenColor}
    />
  },
  {
    id: "2",
    Data: "Message tenant",
    // Img: IMAGES.Chat_Tenant,
    Icon:<Feather
    name="message-circle"
    size={25}
    color={_COLORS.Kodie_GreenColor}
  />
  },
  {
    id: "3",
    Data: "View profile",
    // Img: IMAGES.View_property,
    Icon:<MaterialIcons
    name="preview"
    size={25}
    color={_COLORS.Kodie_GreenColor}
    />
  },
  {
    id: "4",
    Data: "Add tenant to property",
    // Img: IMAGES.Chat_Tenant,
    Icon:<MaterialCommunityIcons
    name="home-plus-outline"
    size={25}
    color={_COLORS.Kodie_GreenColor}
    />
  },
];
// const data1 = [
//   {
//     id: "1",
//     Data: "Delete property",
//     Img: IMAGES.View_property,
//   },
//   {
//     id: "2",
//     Data: "Archive instead",
//     Img: IMAGES.Documents,
//   },
// ];

const TenantData = (props) => {
  const navigation = useNavigation(); // Hook to get navigation
  const refRBSheet = useRef();
  const handleCloseModal = () => {
    props.onCloseModal(); // Call this function when you want to close the modal without performing delete action
  };
  const handleDeleteProperty = (propertyDelId) => {
    console.log(propertyDelId, "catch data");
    props.onDelete(propertyDelId);
    console.log("Raul data cath........... ", props.onDelete(propertyDelId));
    // alert(propertyDelId);
  };
  const toggleclose = () => {
    props.onClose();
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
              style={TenantDataStyle.container}
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
              <Image source={item.Img} style={TenantDataStyle.Icons} />
              <Text style={TenantDataStyle.text}>{item.Data}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={TenantDataStyle.container}
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
            {/* <Image source={item.Img} style={TenantDataStyle.Icons} /> */}
            {item.Icon}
            <Text style={TenantDataStyle.text}>{item.Data}</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };
  return (
    <View style={TenantDataStyle.mainContainer}>
      <TouchableOpacity
        style={{
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          paddingHorizontal: 20,
        }}
        onPress={toggleclose}
      >
        <Icon name={"close"} size={15} color={_COLORS?.Kodie_BlackColor} />
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
                  style={TenantDataStyle.text}
                >{`Delete property: ${props?.Address} ?`}</Text>
              ) : null}
            </>
          );
        }}
      />
    </View>
  );
};
export default TenantData;
