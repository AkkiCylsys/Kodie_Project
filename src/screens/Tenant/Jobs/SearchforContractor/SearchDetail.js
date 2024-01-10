import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { SearchDetailStyle } from "./SearchDetailStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import Icon from "react-native-vector-icons/AntDesign";
import { _COLORS } from "../../../../Themes";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import ContractorsComponent from "../../../../components/Molecules/ContractorsComponent/ContractorsComponent";

const SearchDetail = (props) => {
  let SearchDataDetail = props?.route?.params?.SearchDataDetail;
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(SearchDataDetail);
  const renderItem = ({ item }) => (
    <View>
      <ContractorsComponent
        name={`${item.first_name} ${item.last_name}`}
        userImage={{ uri: item.profile_path }}
        filedname={item.filedname}
        startRating={item.startRating}
        ratingnumber={item.ratingnumber}
        address={item.address}
        notverified={item.notverified}
        verified={item.verified}
        CoverText1={item.coverText1}
      />

      <DividerIcon
        IsShowIcon
        iconName={expanded ? "chevron-up" : "chevron-down"}
        onPress={toggleItems}
      />
    </View>
  );
  return (
    <View style={SearchDetailStyle.Container}>
      <TopHeader
        onPressLeftButton={() => props.navigation.pop()}
        MiddleText={"Searchresults"}
      />
      <View style={SearchDetailStyle.ContainerView}>
        <View style={SearchDetailStyle.flexContainer}>
          <View style={{ flex: 1 }}>
            <Text>{"Fixing & maintenance"}</Text>
            <Text>{"Electricals; Sydney; Greater than 4 rating..."}</Text>
          </View>
          <View style={SearchDetailStyle.filterIcon}>
            <Icon
              name={"filter"}
              size={25}
              color={_COLORS.Kodie_ExtraLightGrayColor}
              style={{ alignSelf: "center" }}
            />
          </View>
        </View>
      </View>
      <DividerIcon borderBottomWidth={3} marginTop={8} />
      <FlatList
        data={SearchDataDetail}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default SearchDetail;
