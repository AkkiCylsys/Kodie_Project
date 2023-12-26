import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { ContractorlistStyle } from "./ContractorlistStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import { _COLORS, IMAGES } from "../../../Themes";
import AntDesign from "react-native-vector-icons/AntDesign";
import ReadMore from "@fawazahmed/react-native-read-more";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
const data = [
  {
    id: "1",
    name: "jason s",
    prize: "$200",
    rating: "4.6(231)",
  },
  {
    id: "2",
    name: "Mesut S",
    prize: "$180",
    rating: "4.0(100)",
  },
  {
    id: "3",
    name: "Jack B",
    prize: "$200",
    rating: "4.6(50)",
  },
];
export default ContractorList = (props) => {
  const [isauto, setIsauto] = useState(false);
  const renderContractorList = ({ item, index }) => {
    return (
      <>
        <View style={ContractorlistStyle.usermainView}>
          <View>
            <TouchableOpacity style={ContractorlistStyle.usericon}>
              <Image source={IMAGES.userImage} />
            </TouchableOpacity>
          </View>
          <View style={ContractorlistStyle.nameView}>
            <Text style={ContractorlistStyle.nameText}>{item.name}</Text>
            <View style={ContractorlistStyle.Propose_Con}>
              <Text style={ContractorlistStyle.ProposeText}>{"Proposed:"}</Text>
              <Text style={ContractorlistStyle.prize}>{item.prize}</Text>
              {index == 0 ? (
                <View style={ContractorlistStyle.autoView}>
                  <TouchableOpacity style={ContractorlistStyle.button}>
                    <Text style={ContractorlistStyle.buttonText}>Auto</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              <View style={ContractorlistStyle.verticalLine} />
              <View style={ContractorlistStyle.ratingView}>
                <AntDesign
                  color={_COLORS.Kodie_lightGreenColor}
                  name="star"
                  size={20}
                />
                <Text style={ContractorlistStyle.ratingText}>
                  {item.rating}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={ContractorlistStyle.root}>
          <Text style={ContractorlistStyle.CoverText}>{"Cover letter -"}</Text>
          <ReadMore
            seeMoreStyle={ContractorlistStyle.readMore}
            seeLessStyle={ContractorlistStyle.readMore}
            seeMoreText={"read more"}
            seeLessText={"read Less"}
            numberOfLines={3}
            style={ContractorlistStyle.textStyle}
          >
            {
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
          </ReadMore>
          <RowButtons
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_BlackColor}
            RightButtonborderColor={_COLORS.Kodie_BlackColor}
            LeftButtonText={"View Profile"}
            RightButtonText={"Hire"}
            onPressLeftButton={() =>
              props.navigation.navigate("ContractorProfile")
            }
            onPressRightButton={() => {
              props.navigation.navigate("HireContractor");
            }}
          />
        </View>
        <View style={ContractorlistStyle.hor_Line} />
      </>
    );
  };
  return (
    <View style={ContractorlistStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Broken door handle"}
      />
      <SearchBar
        filterImage={IMAGES.filter}
        isFilterImage
        height={48}
        marginTop={20}
      />
      <View style={ContractorlistStyle.hor_Line} />
      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={renderContractorList}
      />
    </View>
  );
};
