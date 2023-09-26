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
import { SearchUserStyle } from "./SearchUserStyle";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
// Screen no. 212
import { _COLORS, IMAGES } from "../../../Themes/index";
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
  {
    id: "6",
    Heading: "jackson",
    Sub_heading: "+124253 152425",
    IsBlock: false,
  },
  {
    id: "7",
    Heading: "Mumtaz",
    Sub_heading: "+124253 152425",
    IsBlock: false,
  },
  {
    id: "8",
    Heading: "Tell a Friend",
    Sub_heading: "+124253 152425",
    IsBlock: false,
  },
  {
    id: "9",
    Heading: "Switch Account",
    Sub_heading: "Switch to another Kodie account",
    IsBlock: false,
  },
  {
    id: "10",
    Heading: "Logout",
    Sub_heading: "Logout of your Kodie profile",
    IsBlock: false,
  },
];
export default SearchUser = (props) => {
  const UserList_renderItem = ({ item, index }) => {
    return (
      <>
        <View style={SearchUserStyle.container}>
          <View style={SearchUserStyle.profileView}>
            <Image
              source={IMAGES.Landlordprofile}
              style={SearchUserStyle.usericon}
              resizeMode="contain"
            />
            <View style={SearchUserStyle.textContainer}>
              <Text style={SearchUserStyle.profile_Heading}>
                {item.Heading}
              </Text>
              <Text style={SearchUserStyle.profile_SubHeading}>
                {item.Sub_heading}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              SearchUserStyle.ArrowIcon,
              {
                borderColor: item.IsBlock
                  ? _COLORS.Kodie_GreenColor
                  : _COLORS.Kodie_MediumGrayColor,
              },
            ]}
          >
            <Text
              style={[
                SearchUserStyle.profile_SubHeading,
                {
                  color: item.IsBlock
                    ? _COLORS.Kodie_GreenColor
                    : _COLORS.Kodie_MediumGrayColor,
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
      <View style={SearchUserStyle.shareMainView}>
        <Text style={SearchUserStyle.AllcontactsText}>All Contacts</Text>
      </View>
    );
  };

  return (
    <View style={SearchUserStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Select users"}
      />
      <View style={SearchUserStyle.searchandShareMainView}>
        <SearchBar
          placeholder="Search contacts"
          backSearchIcon={true}
          height={48}
          marginTop={20}
        />
      </View>
      <FlatList
        style={SearchUserStyle.FlatlistContainer}
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
