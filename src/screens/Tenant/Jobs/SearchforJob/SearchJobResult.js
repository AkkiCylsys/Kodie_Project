import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { _goBack } from "../../../../services/CommonServices";
import TopHeader from "../../../../components/Molecules/Header/Header";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import { _COLORS, IMAGES } from "../../../../Themes";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import { SearchJobResultStyle } from "./SearchJobResultStyle";

const searchData = [
  {
    id: "1",
    category: "Fixing & maintenance",
    description: "Electricals; Sydney; Greater than 4 rating; Budget: $200 ...",
    title: "Fix plugs",
    refNumber: "Ref #16642",
    contractor: "Tom Smith",
    budget: "$100",
    location: "1729 Melbourne St Australia",
  },
  // Add more items as needed
];

const SearchJobResult = (props) => {
  const [rating, setRating] = useState(4);

  const renderItem = ({ item }) => {
    return (
      <View style={SearchJobResultStyle.Container}>
        <View style={SearchJobResultStyle.Fixtext}>
          <View>
            <Text>{item.category}</Text>
            <Text>{item.description}</Text>
          </View>
          <View>
            <AntDesign name="filter" size={15} color={_COLORS.Kodie_GrayColor} />
          </View>
        </View>
        <DividerIcon />
        <View style={SearchJobResultStyle.Dataitem}>
          <View style={SearchJobResultStyle.fixcontain}>
            <Text>{item.title}</Text>
            <View style={SearchJobResultStyle.hearto}>
              <Text style={SearchJobResultStyle.heartotext}>Panding bid</Text>
            </View>
            <View >
              <AntDesign name="hearto" size={20} color={_COLORS.Kodie_GrayColor} />
            </View>
            <View>
              <Entypo name="dots-three-horizontal" size={20} color={_COLORS.Kodie_GrayColor} />
            </View>
          </View>
          <Text>{item.refNumber}</Text>
        </View>
        <View style={SearchJobResultStyle.Budgetstyle}>
          <Text>{item.contractor}</Text>
          <Text>Budget</Text>
        </View>
        <View style={SearchJobResultStyle.locationstyle}>
          <Octicons name="location" size={20} color={_COLORS.Kodie_GrayColor} />
          <Text style={SearchJobResultStyle.locationcurrent}>{item.location}</Text>
          <Text>{item.budget}</Text>
        </View>
        <View style={{ marginHorizontal: 25, marginTop: 30 }}>
          <RowButtons
            LeftButtonText={"Bid for job"}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_BlackColor}
            RightButtonText={"View details"}
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
            RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={SearchJobResultStyle.Mainview}>
        <TopHeader onPressLeftButton={() => _goBack(props)} MiddleText={"Search results"} />
        <FlatList
          data={searchData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export default SearchJobResult;
