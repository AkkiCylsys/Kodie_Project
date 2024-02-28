import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { leaseBottomModalStyle } from "./LeaseBottomModalStyle";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";

const data = [
  {
    id: "1",
    Data: "Renew lease",
    Icon: (
      <MaterialIcons
        name="preview"
        size={25}
        color={_COLORS.Kodie_GreenColor}
        style={{ alignSelf: "center" }}
      />
    ),
  },
  {
    id: "2",
    Data: "Delete lease",
    Icon: (
      <MaterialCommunityIcons
        name="file-download-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
];
const LeaseBottomModal = (props) => {
  const handleCloseModal = () => {
    props.onClose();
  };
  // render Item..
  const BottomDataRender = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          style={leaseBottomModalStyle.container}
          onPress={() => {
            if (item.id === "1") {
            }
            if (item.id === "2") {
            }
          }}
        >
          <View style={leaseBottomModalStyle.IconView}>{item.Icon}</View>
          <Text style={leaseBottomModalStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={leaseBottomModalStyle.mainContainer}>
      <TouchableOpacity
        style={{
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          paddingHorizontal: 20,
        }}
        onPress={handleCloseModal}
      >
        <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
      </TouchableOpacity>
      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.id}
        renderItem={BottomDataRender}
      />
    </View>
  );
};

export default LeaseBottomModal;

const styles = StyleSheet.create({});
