import { View, Text, ScrollView ,Image, TouchableOpacity} from "react-native";
import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import { GeneralReportCommonStyle } from "./GenerateReportCommonStyle";
import { _COLORS,IMAGES } from "../../../Themes";
import { useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import ShareReport from "../ShareReport/ShareReport";
const GenerateReportCommon = (props) => {
    const refRBSheet = useRef();

  return (
    <View>
      <ScrollView>
        <View style={GeneralReportCommonStyle.headerview}>
          <Text style={GeneralReportCommonStyle.headingtext}>
            {props.Header}
          </Text>
          <Entypo name="cross" color={_COLORS.Kodie_BlackColor} size={30} />
        </View>

        <View style={GeneralReportCommonStyle.optionsmenu}>
          <View>
            <Image
              source={props.imageSource}
              style={GeneralReportCommonStyle.image}
            />
          </View>
          <View>
            <Text  style={GeneralReportCommonStyle.title}>{props.title}</Text>
          </View>
        </View>

        <View style={GeneralReportCommonStyle.optionsmenu}>
          <View>
            <Image
              source={IMAGES.Save}
              style={GeneralReportCommonStyle.image}
            />
          </View>
          <View>
            <Text  style={GeneralReportCommonStyle.title}>Save report to files</Text>
          </View>
        </View>

        <TouchableOpacity style={GeneralReportCommonStyle.optionsmenu}    
            onPress={() => {
              refRBSheet.current.open();
            }}>
          <View>
            <Image
              source={IMAGES.Email}
              style={GeneralReportCommonStyle.image}
            />
          </View>
          <View>
            <Text  style={GeneralReportCommonStyle.title}>Share report to email</Text>
          </View>
        </TouchableOpacity>

        <RBSheet
          ref={refRBSheet}
          height={210}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: GeneralReportCommonStyle.bottomModal_container,
          }}
        >
          <ShareReport
            Header="Share report"
            title='Email address*'
          />

        </RBSheet>
      </ScrollView>
    </View>
  );
};

export default GenerateReportCommon;
