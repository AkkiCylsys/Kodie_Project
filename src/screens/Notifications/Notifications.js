import { View, Text, Image } from "react-native";
import React from "react";
import TopHeader from "../../components/Molecules/Header/Header";
import { NotificationStyle } from "./NotificationStyle";
import SearchBar from "../../components/Molecules/SearchBar/SearchBar";
import { FlatList } from "react-native-gesture-handler";
import { IMAGES } from "../../Themes/index";
const Notifications = () => {
  const Alldata = [
    {
      id: 1,
      name: "Don’t forget!",
      title:
        "Lease agreement expiring in 30 days. 2118 Thornridge Cir Syracuse,",
      img: IMAGES.kodie_icon,
    },
    {
      id: 2,
      name: "Good news! Quote incoming.",
      title: "Jason Stathom is preparing your quote. It will arrive shortly. ,",
      img: IMAGES.kodie_icon,
    },
    {
      id: 3,
      name: "Congratulations! Offer Accepted.",
      title:
        "Your offer to rent property at Preston Rd, Melbourne has been accepted...,",
      img: IMAGES.kodie_icon,
    },
  ];

  const renderItem = ({ item }) => (
    <>
      <View>
        <Text>{item.name}</Text>
        <Text>{item.title}</Text>
        <Image source={item.img} style={{ width: 30, height: 30 }} />
      </View>
    </>
  );
  return (
    <>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Notifications"}
      />
      <SearchBar
        filterImage={IMAGES.up_down_Arrow}
        isFilterImage
        height={48}
        marginTop={20}
      />

      <View style={NotificationStyle.searchmainview}></View>

      <View>
        <Text>Latest</Text>
        <FlatList
          data={Alldata}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export default Notifications;
