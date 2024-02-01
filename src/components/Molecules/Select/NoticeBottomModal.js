import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { NoticeBottomModalStyle } from "./NoticeBottomModalStyle";
import Entypo from "react-native-vector-icons/Entypo";
import { _COLORS } from "../../../Themes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const NoticeBottomModal = (props) => {
  const navigation = useNavigation();

  const onClosemodal = () => {
    props.onClose();
  };

  const modalData = [
    {
      id: 1,
      Data: "View/edit notice",
      icon: (
        <MaterialCommunityIcons
          size={18}
          color={_COLORS.Kodie_GreenColor}
          name="alarm-snooze"
        />
      ),
    },
    {
      id: 2,
      Data: "Duplicate notice",
      icon: <Fontisto size={18} color={_COLORS.Kodie_GreenColor} name="copy" />,
    },
    {
      id: 3,
      Data: "Delete notice",
      icon: (
        <AntDesign size={18} color={_COLORS.Kodie_GreenColor} name="delete" />
      ),
    },
  ];

  const modalRenderData = ({ item }) => {
    return (
      <View style={NoticeBottomModalStyle.optionsmainview}>
        <TouchableOpacity
          style={NoticeBottomModalStyle.optionsview}
          onPress={() => {
            if (item.id == 1) {
              navigation.navigate("AddNewNotice", {
                noticeReminderid: props.noticeReminderid,
              });
            }
            onClosemodal();
          }}
        >
          <View style={NoticeBottomModalStyle.optionsiconview}>
            {item.icon}
          </View>
          <Text style={NoticeBottomModalStyle.textoption}>{item.Data}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={modalData}
        keyExtractor={(item) => item.id}
        renderItem={modalRenderData}
      />
    </View>
  );
};

export default NoticeBottomModal;
