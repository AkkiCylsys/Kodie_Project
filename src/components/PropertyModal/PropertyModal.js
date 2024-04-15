// import React, { useRef } from "react";
// import { View, Text, Image, FlatList } from "react-native";
// import { PropertyModalStyle } from "./PropertyModalStyle";
// import { _COLORS,IMAGES } from "../../Themes";
// import { TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Entypo from "react-native-vector-icons/Entypo";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import RBSheet from "react-native-raw-bottom-sheet";
// import PropertyPopup from "./PropertyPopup";

// const data = [
//   {
//     id: "1",
//     Data: "View /edit property details",
//     Icon: (
//       <MaterialIcons
//         name="preview"
//         size={25}
//         color={_COLORS.Kodie_GreenColor}
//         style={{ alignSelf: "center" }}
//       />
//     ),
//   },
//   {
//     id: "2",
//     Data:'Make property available for rental bidding',
//     Icon: (
//       <MaterialCommunityIcons
//         name="alpha-k-box-outline"
//         size={25}
//         color={_COLORS.Kodie_GreenColor}
//       />
//     ),
//   },
//   {
//     id: "3",
//     Data: "Manage documents",
//     Icon: (
//       <MaterialCommunityIcons
//         name="file-download-outline"
//         size={25}
//         color={_COLORS.Kodie_GreenColor}
//       />
//     ),
//   },
//   {
//     id: "4",
//     Data: "Notices & reminders",
//     Icon: (
//       <Ionicons
//         name="mail-unread-outline"
//         size={25}
//         color={_COLORS.Kodie_GreenColor}
//       />
//     ),
//   },
//   {
//     id: "5",
//     Data: "Delete property",
//     Icon: (
//       <MaterialIcons
//         name="delete-outline"
//         size={25}
//         color={_COLORS.Kodie_GreenColor}
//       />
//     ),
//   },
// ];
// const data1 = [
//   {
//     id: "1",
//     Data: "Confirm delete property",
//     Icon: (
//       <MaterialIcons
//         name="delete-outline"
//         size={25}
//         color={_COLORS.Kodie_GreenColor}
//       />
//     ),
//   },
//   {
//     id: "2",
//     Data: "Archive instead",
//     Icon: (
//       <Ionicons
//         name="file-tray-full-outline"
//         size={25}
//         color={_COLORS.Kodie_GreenColor}
//       />
//     ),
//   },
// ];

// const PropertyModal = (props) => {
//   const propertyId = props?.propertyId;

//   const navigation = useNavigation(); // Hook to get navigation
//   const refRBSheet = useRef();
//   const handleCloseModal = () => {
//     props.onClose(); 
//     //alert('hi')
//   };
//   const handleDeleteProperty = (propertyDelId) => {
//     console.log(propertyDelId, "catch data");
//     props.onDeleteData(propertyDelId);
//     console.log("Vacent data cath........... ", props.onDeleteData(propertyDelId));
//     // alert(propertyDelId);
//   };
//   const FinalDeleteProperty = (propertyDelId, Address) => {
//     console.log(propertyDelId, Address, "catch data");
//     props.onDeleteData(propertyDelId, Address);
//     console.log("come data...........", propertyDelId);
//     console.log(
//       "Vacent data cath........... ",
//       props.onDeleteData(propertyDelId, Address)
//     );
//     // alert(propertyDelId);
//   };
//   const BottomData = ({ item, index }) => {
//     return (
//       <>
//         {props?.isDeletePropertyClicked ? (
//           <>
//             <TouchableOpacity
//               style={PropertyModalStyle.container}
//               onPress={() => {
//                 if (item.id === "1") {
//                   FinalDeleteProperty();
//                   // navigation.navigate("ViewPropertyDetails");
//                 }
//                 if (item.id === "2") {
//                 //   refRBSheet.current.open()
//                 //   navigation.navigate("ViewPropertyDetails");
//                   // console.log("Property ID:", item.property_id);
//                 }
//               }}
//             >
//               {/* <Image source={item.Img} style={PropertyModalStyle.Icons} /> */}
//               {/* //{item.Icon} */}
//               <View style={PropertyModalStyle.IconView}>{item.Icon}</View>
//               <Text style={PropertyModalStyle.text}>{item.Data}</Text>
//             </TouchableOpacity>
//           </>
//         ) : (
          // <TouchableOpacity
          //   style={PropertyModalStyle.container}
          //   onPress={() => {
          //     if (item.id === "1") {
          //       navigation.navigate("ViewPropertyDetails", {
          //         propertyId: propertyId,
          //       });
          //       handleCloseModal();
          //     }
          //     if (item.id === "2") {
                
          //       handleCloseModal();
          //     }
          //     if (item.id === "5") {
          //       // navigation.navigate("ViewPropertyDetails");
          //       handleDeleteProperty();
             
          //       // console.log("Property ID:", item.property_id);
          //     }
          //   }}
          // >
          //   {/* <Image source={item.Img} style={PropertyModalStyle.Icons} /> */}
          //   <View style={PropertyModalStyle.IconView}>{item.Icon}</View>
          //   <Text style={PropertyModalStyle.text}>{item.Data}</Text>
          // </TouchableOpacity>
//         )}
//       </>
//     );
//   };
//   return (
//     <View style={PropertyModalStyle.mainContainer}>
//       <TouchableOpacity
//         style={{
//           justifyContent: "flex-end",
//           alignSelf: "flex-end",
//           paddingHorizontal: 20,
//         }}
//         onPress={handleCloseModal}
//       >
//         {/* <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} /> */}
//         {/* <Icon name={"close"} size={15} color={_COLORS?.Kodie_BlackColor} /> */}
//       </TouchableOpacity>
//       <FlatList
//         data={props?.isDeletePropertyClicked ? data1 : data}
//         scrollEnabled
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{}}
//         keyExtractor={(item) => item?.id}
//         renderItem={BottomData}
//         ListHeaderComponent={() => {
//           return (
//             <>
//               {props?.isDeletePropertyClicked ? (
//                 <Text
//                   style={PropertyModalStyle.text}
//                 >{`Delete property: ${props?.Address} ?`}</Text>
//               ) : null}
//             </>
//           );
//         }}
//       />
//         <RBSheet 
//                     ref={refRBSheet}
//                     height={750}
//                     closeOnDragDown={true}
//                     customStyles={{
//                       wrapper: {
//                         backgroundColor: "rgba(0, 0, 0, 0.5)",
//                       },
//                       draggableIcon: {
//                         backgroundColor: _COLORS.Kodie_LightGrayColor,
//                       },
//                     //   container: AddContractorModalStyle.bottomModal_container,
//                     }}
//                   >
//                    <PropertyPopup/>
//                   </RBSheet>
//     </View>
//   );
// };
// export default PropertyModal;
import React, { useRef } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { PropertyModalStyle } from "./PropertyModalStyle";
import { _COLORS,IMAGES } from "../../Themes";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RBSheet from "react-native-raw-bottom-sheet";
import PropertyPopup from "./PropertyPopup";

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
    Data: "Make property available for rental bidding",
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
      <MaterialCommunityIcons
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

const PropertyModal = (props) => {
  const refRBSheet = useRef();

  const handleCloseModal = () => {
    props.onClose();
  };

  const handleMakePropertyAvailable = () => {
    // Open the new RBSheet for making property available for rental bidding
    refRBSheet.current.open();
  };

  const BottomData = ({ item }) => {
    return (
      <TouchableOpacity
        style={PropertyModalStyle.container}
        onPress={() => {
          if (item.id === "2") {
            handleMakePropertyAvailable();
          } else {
            handleCloseModal();
          }
        }}
      >
        <View style={PropertyModalStyle.IconView}>{item.Icon}</View>
        <Text style={PropertyModalStyle.text}>{item.Data}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={PropertyModalStyle.mainContainer}>
      <TouchableOpacity
        style={{
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          paddingHorizontal: 20,
        }}
        onPress={handleCloseModal}
      />
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
                  style={PropertyModalStyle.text}
                >{`Delete property: ${props?.Address} ?`}</Text>
              ) : null}
            </>
          );
        }}
      />
     <RBSheet
  ref={refRBSheet}
  height={590}
  closeOnDragDown={true}
  customStyles={{
    wrapper: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    draggableIcon: {
      backgroundColor: _COLORS.Kodie_LightGrayColor,
    },
  }}
>
  <PropertyPopup />
</RBSheet>

    </View>
  );
};

export default PropertyModal;
