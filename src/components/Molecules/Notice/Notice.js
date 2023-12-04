import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { NoticeStyle } from "./NoticeStyle";
import Entypo from "react-native-vector-icons/Entypo";
import RBSheet from "react-native-raw-bottom-sheet";
import Select from "../Select/Select";
import { _COLORS, IMAGES } from "../../../Themes";
const Notice = (props) => {
  const refRBSheet = useRef();
  return (
    <>
      <View style={NoticeStyle.mainContainer}>
        <View style={NoticeStyle.dateDayview}>
          <Text style={NoticeStyle.daytext}>{props.day}</Text>
          <Text style={NoticeStyle.datetext}>{props.date}</Text>
        </View>

        <View style={NoticeStyle.middatabindview}>
          <View style={NoticeStyle.bindview}>
            <Image source={props.lineimg} style={NoticeStyle.lineimg} />

            <View style={NoticeStyle.headinglineview}>
              <Text style={NoticeStyle.headintext}>{props.heading}</Text>
              <View style={NoticeStyle.addressviewbind}>
                <Image
                  source={props.locationimg}
                  style={NoticeStyle.locationimg}
                />
                <Text style={NoticeStyle.addresstext}>{props.address}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={NoticeStyle.dotsview}
            onPress={() => {
              refRBSheet.current.open();
            }}
          >
            <Entypo
              name="dots-three-vertical"
              size={25}
              color={_COLORS.Kodie_LightGrayColor}
              style={NoticeStyle.dotimg}
            />
          </TouchableOpacity>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        height={220}
        // closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: NoticeStyle.bottomModal_container,
        }}
      >
        <Select />
      </RBSheet>
    </>
  );
};

export default Notice;
