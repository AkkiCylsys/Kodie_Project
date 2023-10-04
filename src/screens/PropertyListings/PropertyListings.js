// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import React, { useState } from "react";
// import { PropertyListingStyle } from "./PropertyListingStyle";
// import TopHeader from "../../components/Molecules/Header/Header";
// import SearchBar from "../../components/Molecules/SearchBar/SearchBar";
// import { _COLORS, IMAGES } from "../../Themes";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import DividerIcon from "../../components/Atoms/Devider/DividerIcon";
// import PropertyListing from "../../components/Molecules/PropertyListings/PropertyListing";
// import AcceptingBids from "./AcceptingBids/AcceptingBids";

// const HorizontalData = [
//   { id: 1, title: "Accepting bids" },
//   { id: 2, title: "Vacant" },
//   { id: 3, title: "Rent Pending" },
//   { id: 4, title: "Job" },
// ];

// const PropertyListings = () => {
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [selectedComponent, setSelectedComponent] = useState(null);

//   const toggleMenu = (id) => {
//     if (openMenuId === id) {
//       setOpenMenuId(null);
//       setSelectedComponent(null);
//     } else {
//       setOpenMenuId(id);
//       setSelectedComponent(id === 1 ? <AcceptingBids /> : null);
//     }
//   };

//   const horizontal_render = ({ item }) => {
//     const isOpen = openMenuId === item.id;
//     const isBlackBackground = isOpen ? { backgroundColor: "black" } : {};
//     return (
//       <TouchableOpacity
//         style={[PropertyListingStyle.flatlistView, isBlackBackground]}
//         onPress={() => toggleMenu(item.id)}
//       >
//         <View style={PropertyListingStyle.round} />
//         <Text
//           style={[
//             PropertyListingStyle.item_style,
//             isOpen && { color: "white" },
//           ]}
//         >
//           {item.title}
//         </Text>
//       </TouchableOpacity>
//     );
//   };
//   return (
//     <View style={PropertyListingStyle.mainview}>
//       <TopHeader
//         onPressLeftButton={() => _goBack(props)}
//         MiddleText={"Propery listings"}
//       />
//       <ScrollView>
//         <View style={PropertyListingStyle.searchview}>
//           <SearchBar
//             filterImage={IMAGES.filter}
//             frontSearchIcon
//             marginTop={3}
//             placeholder="Search properties"
//           />
//         </View>

//         <View style={PropertyListingStyle.Container}>
//           <View style={PropertyListingStyle.flat_MainView}>
//             <TouchableOpacity style={PropertyListingStyle.AllView}>
//               <Text style={PropertyListingStyle.item_style}>ALL</Text>
//               <MaterialCommunityIcons
//                 name={"check"}
//                 size={18}
//                 color={_COLORS.Kodie_WhiteColor}
//               />
//             </TouchableOpacity>

//             <FlatList
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               data={HorizontalData}
//               renderItem={horizontal_render}
//             />
//           </View>
//         </View>
//         <DividerIcon style={PropertyListingStyle.divider} />

//         {selectedComponent}

//         <View>
//           <PropertyListing />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default PropertyListings;


import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { PropertyListingStyle } from "./PropertyListingStyle";
import TopHeader from "../../components/Molecules/Header/Header";
import SearchBar from "../../components/Molecules/SearchBar/SearchBar";
import { _COLORS, IMAGES } from "../../Themes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DividerIcon from "../../components/Atoms/Devider/DividerIcon";
import AcceptingBids from "./AcceptingBids/AcceptingBids";
import PropertyListing from "../../components/Molecules/PropertyListings/PropertyListing";
import { _goBack } from "../../services/CommonServices";
const HorizontalData = [
  { id: 1, title: "Accepting bids" },
  { id: 2, title: "Vacant" },
  { id: 3, title: "Rent Pending" },
  { id: 4, title: "Job" },
];

const PropertyListings = (props) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const toggleMenu = (id) => {
    if (openMenuId === id) {
      setOpenMenuId(null);
      setSelectedComponent(null);
    } else {
      setOpenMenuId(id);
      setSelectedComponent(id === 1 ? <AcceptingBids /> : null);
    }
  };

  const horizontal_render = ({ item }) => {
    const isOpen = openMenuId === item.id;
    const isBlackBackground = isOpen ? { backgroundColor: "black" } : {};
    return (
      <TouchableOpacity
        style={[PropertyListingStyle.flatlistView, isBlackBackground]}
        onPress={() => toggleMenu(item.id)}
      >
        <View style={PropertyListingStyle.round} />
        <Text
          style={[
            PropertyListingStyle.item_style,
            isOpen && { color: _COLORS.Kodie_WhiteColor },
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={PropertyListingStyle.mainview}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Propery listings"}
      />
      <ScrollView>
        <View style={PropertyListingStyle.searchview}>
          <SearchBar
            filterImage={IMAGES.filter}
            frontSearchIcon
            marginTop={3}
            placeholder="Search properties"
          />
        </View>

        <View style={PropertyListingStyle.Container}>
          <View style={PropertyListingStyle.flat_MainView}>
            <TouchableOpacity style={PropertyListingStyle.AllView}>
              <Text style={PropertyListingStyle.item_style}>ALL</Text>
              <MaterialCommunityIcons
                name={"check"}
                size={18}
                color={_COLORS.Kodie_WhiteColor}
              />
            </TouchableOpacity>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={HorizontalData}
              renderItem={horizontal_render}
            />
          </View>
        </View>
        <DividerIcon style={PropertyListingStyle.divider} />

        {selectedComponent ? (
          selectedComponent
        ) : (
          <View>
            <PropertyListing />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PropertyListings;
