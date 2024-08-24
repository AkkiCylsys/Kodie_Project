import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { _goBack } from "../../../../services/CommonServices";
import TopHeader from "../../../../components/Molecules/Header/Header";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import { _COLORS, IMAGES, FONTFAMILY } from "../../../../Themes";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import { SearchJobResultStyle } from "./SearchJobResultStyle";



const SearchJobResult = (props) => {
  const [rating, setRating] = useState(4);
  let SearchDataDetail = props?.route?.params?.SearchDataDetail;
  console.log(SearchDataDetail,"jgjhgjhgjyg");
  const uniqueJobTypes = [
    ...new Set(SearchDataDetail.searchTypeData.map((item) => item.job_type)),
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={SearchJobResultStyle.Container}>
        <View style={SearchJobResultStyle.Dataitem}>
          <View style={SearchJobResultStyle.fixcontain}>
            <View style={{ flex: 1 }}>
              <Text>{item.job_type}</Text>
              <Text>{item.reference_no}</Text>
            </View>

            <View style={SearchJobResultStyle.hearto}>
              <Text style={SearchJobResultStyle.heartotext}>Panding bid</Text>
            </View>

            <AntDesign
              name="hearto"
              size={20}
              color={_COLORS.Kodie_GrayColor}
              style={{
                alignSelf: "center",
                marginHorizontal: 12,
              }}
            />

            <Entypo
              name="dots-three-horizontal"
              size={20}
              color={_COLORS.Kodie_GrayColor}
              style={{ alignSelf: "center" }}
            />
          </View>
        </View>
        <View style={SearchJobResultStyle.Budgetstyle}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: FONTFAMILY.K_Medium,
              color: _COLORS.Kodie_GrayColor,
            }}
          >
            {item.contractor}
          </Text>
          <Octicons name="location" size={20} color={_COLORS.Kodie_GrayColor} />
          <Text style={SearchJobResultStyle.locationcurrent}>
            {item.location}
          </Text>
          <View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: FONTFAMILY.K_Medium,
                color: _COLORS.Kodie_BlackColor,
              }}
            >
              Budget
            </Text>
            <Text style={SearchJobResultStyle.locationcurrent}>
              {item.job_min_budget}
            </Text>
          </View>
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
            onPressRightButton={() => {
              props.navigation.navigate("JobDetails", {
                SearchJobId: item.job_id,
                searchView: "searchView",
              });
            }}
            onPressLeftButton={() => {
              props.navigation.navigate("BidforJob", {
                BidJobId: item.job_id,
              });
            }}
          />
        </View>
        <DividerIcon />
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={SearchJobResultStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Search results"}
        />
        <View style={SearchJobResultStyle.Fixtext}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: FONTFAMILY.K_Bold,
                color: _COLORS.Kodie_BlackColor,
              }}
            >
              {uniqueJobTypes}
            </Text>
            <Text>{`Electricals; Sydney; Greater than 4 rating; Budget`}</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              padding: 8,
              borderRadius: 5,
              justifyContent: "center",
              borderColor: _COLORS.Kodie_GrayColor,
            }}
          >
            <AntDesign
              name="filter"
              size={25}
              color={_COLORS.Kodie_GrayColor}
              style={{ alignSelf: "center" }}
            />
          </View>
        </View>
        <DividerIcon />
        <FlatList
          data={SearchDataDetail.searchTypeData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </>
  );
};

export default SearchJobResult;
