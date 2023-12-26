//ScreenNo:228
import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices/CommonMethods";
import { InviteStyles } from "./InviteStyles";
import SearchBar from "../../components/Molecules/SearchBar/SearchBar";
import AntDesign from "react-native-vector-icons/AntDesign";
import { _COLORS, IMAGES } from "../../Themes/index";
import Entypo from "react-native-vector-icons/Entypo";

const LandlordData = [
  {
    id: "1",
    Heading: "Akshay",
    Sub_heading: "+124253 152425",
    img: IMAGES.Account,
  },
  {
    id: "2",
    Heading: "Asma",
    Sub_heading: "+124253 152425",
    img: IMAGES.Subscription,
  },
  {
    id: "3",
    Heading: "Jason",
    Sub_heading: "+124253 152425",
    img: IMAGES.Privacy,
  },
  {
    id: "4",
    Heading: "Jack",
    Sub_heading: "+124253 152425",
    img: IMAGES.Notification,
  },
  {
    id: "5",
    Heading: "Marina",
    Sub_heading: "+124253 152425",
    img: IMAGES.Storage,
  },
  {
    id: "6",
    Heading: "jackson",
    Sub_heading: "+124253 152425",
    img: IMAGES.language,
  },
  {
    id: "7",
    Heading: "Mumtaz",
    Sub_heading: "+124253 152425",
    img: IMAGES.FeedBack,
  },
  {
    id: "8",
    Heading: "Tell a Friend",
    Sub_heading: "+124253 152425",
    img: IMAGES.Contact,
  },
  {
    id: "9",
    Heading: "Switch Account",
    Sub_heading: "Switch to another Kodie account",
    img: IMAGES.SwitchAcc_,
  },
  {
    id: "10",
    Heading: "Logout",
    Sub_heading: "Logout of your Kodie profile",
    img: IMAGES.Logout,
  },
];
export default Invitefriend = (props) => {
  const UserList_renderItem = ({ item, index }) => {
    return (
      <>
        <View style={InviteStyles.container}>
          <View style={InviteStyles.profileView}>
            <Image
              source={IMAGES.Landlordprofile}
              style={InviteStyles.usericon}
              resizeMode="contain"
            />
            <View style={InviteStyles.textContainer}>
              <Text style={InviteStyles.profile_Heading}>{item.Heading}</Text>
              <Text style={InviteStyles.profile_SubHeading}>
                {item.Sub_heading}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={InviteStyles.ArrowIcon}>
            <Text style={InviteStyles.profile_SubHeading}>{"Invite"}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const ListHeader = () => {
    return (
      <View style={InviteStyles.shareMainView}>
        <Text style={InviteStyles.AllcontactsText}>All Contacts</Text>
      </View>
    );
  };

  return (
    <View style={InviteStyles.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Invite a friend"}
      />
      <View style={InviteStyles.searchandShareMainView}>
        <SearchBar backSearchIcon={true} height={48} marginTop={20} />
        <View style={InviteStyles.shareMainView}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Help_FeedBack")}
            style={InviteStyles.contactIconView}
          >
            {/* <Image
              source={IMAGES.Share}
              style={InviteStyles.contactIcon}
              resizeMode="contain"
            /> */}
            <Entypo
              name="share"
              size={20}
              color={_COLORS.Kodie_GreenColor}
            />
          </TouchableOpacity>
          <View style={InviteStyles.shareTextView}>
            <Text style={InviteStyles.shareText}>{"Share Link"}</Text>
          </View>
        </View>
      </View>
      <FlatList
        style={InviteStyles.FlatlistContainer}
        data={LandlordData}
        scrollEnabled
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={UserList_renderItem}
      />
    </View>
  );
};
