import React from "react";
import { SwiperListStyle } from "./SwiperListStyle";
import { SwipeListView } from "react-native-swipe-list-view";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { _COLORS ,LABEL_STYLES} from "../../../Themes";
import DividerIcon from "../../Atoms/Devider/DividerIcon";

const SwipeList = ({ data }) => {
  return (
    <SwipeListView
      data={data}
      renderItem={(rowdata, rowmap, index) => (
        <View style={SwiperListStyle.rowFront} key={index}>
          <Text> {rowdata.item.name} </Text>
          {/* -------------- */}

        </View>
      )}
      renderHiddenItem={(data, index) => (
        <View style={SwiperListStyle.rowBack}>
          <Text>Left</Text>
          <TouchableOpacity
            style={[
              SwiperListStyle.backRightBtn,
              SwiperListStyle.backRightBtnLeft,
            ]}
            onPress={() => closeRow(rowMap, data.item.key)}
          >
            <Entypo
              name="dots-three-horizontal"
              size={25}
              color={_COLORS.Kodie_WhiteColor}
            />
            <Text style={SwiperListStyle.backTextWhite}>More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              SwiperListStyle.backRightBtn,
              SwiperListStyle.backRightBtnRight,
            ]}
            onPress={() => deleteRow(rowMap, data.item.key)}
          >
            <Ionicons
              name="archive-outline"
              size={25}
              color={_COLORS.Kodie_WhiteColor}
            />
            <Text style={SwiperListStyle.backTextWhite}>Archive</Text>
          </TouchableOpacity>
        </View>
      )}
      leftOpenValue={75}
      rightOpenValue={-150}
      previewRowKey={"0"}
      previewOpenValue={-40}
      previewOpenDelay={3000}
    />
  );
};

export default SwipeList;

