//Screen no.211
import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices/CommonMethods";
import { BlockedUserstyle } from "./BlockedUserstyle";
import { _COLORS, IMAGES } from "../../../Themes/index";
//ScreenNo:211
const LandlordData = [
  {
    id: "1",
    Heading: "Akshay",
    Sub_heading: "+124253 152425",
    IsBlock: true,
  },
  {
    id: "2",
    Heading: "Asma",
    Sub_heading: "+124253 152425",
    IsBlock: false,
  },
  {
    id: "3",
    Heading: "Jason",
    Sub_heading: "+124253 152425",
    IsBlock: false,
  },
  {
    id: "4",
    Heading: "Jack",
    Sub_heading: "+124253 152425",
    IsBlock: false,
  },
  {
    id: "5",
    Heading: "Marina",
    Sub_heading: "+124253 152425",
    IsBlock: false,
  },
];
export default BlockedUser = (props) => {
  const UserList_renderItem = ({ item, index }) => {
    return (
      <>
        <View style={BlockedUserstyle.container}>
          <View style={BlockedUserstyle.profileView}>
            <Image
              source={IMAGES.Landlordprofile}
              style={BlockedUserstyle.usericon}
              resizeMode="contain"
            />
            <View style={BlockedUserstyle.textContainer}>
              <Text style={BlockedUserstyle.profile_Heading}>
                {item.Heading}
              </Text>
              <Text style={BlockedUserstyle.profile_SubHeading}>
                {item.Sub_heading}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              BlockedUserstyle.ArrowIcon,
              {
                borderColor: item.IsBlock
                  ? _COLORS.Kodie_GreenColor
                  : _COLORS.Kodie_BlackColor,
              },
            ]}
          >
            <Text
              style={[
                BlockedUserstyle.profile_SubHeading,
                {
                  color: item.IsBlock
                    ? _COLORS.Kodie_GreenColor
                    : _COLORS.Kodie_BlackColor,
                },
              ]}
            >
              {item.IsBlock ? "Unblock" : "Block"}
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const ListHeader = () => {
    return (
      <View style={BlockedUserstyle.shareMainView}>
        <Text style={BlockedUserstyle.AllcontactsText}>Blocked Users</Text>
      </View>
    );
  };

  return (
    <View style={BlockedUserstyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Blocked users"}
      />

      <FlatList
        style={BlockedUserstyle.FlatlistContainer}
        data={LandlordData}
        scrollEnabled
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={UserList_renderItem}
      />
      <View style={BlockedUserstyle.ShadowLine} />
      <View style={BlockedUserstyle.addnewView}>
        <Text style={BlockedUserstyle.AddNew_Text}>{"Add new..."}</Text>
        <View style={BlockedUserstyle.arrowiconview}>
          <Image
            source={IMAGES.rightarrow}
            style={BlockedUserstyle.rightarrowicon}
          />
        </View>
      </View>
      <View style={BlockedUserstyle.ShadowLine} />

      <Text style={BlockedUserstyle.bottomText}>
        Blocked users will no longer be able to send you messages, or be able to
        to see your interactions on Kodie.
      </Text>

      <View style={{ height: 300 }}></View>
    </View>
  );
};
