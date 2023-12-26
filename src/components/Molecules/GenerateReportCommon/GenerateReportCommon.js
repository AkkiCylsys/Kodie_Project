import { View, Text, ScrollView ,Image, TouchableOpacity} from "react-native";
import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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

        <TouchableOpacity style={GeneralReportCommonStyle.optionsmenu}>
          <View>
             <MaterialIcons
                name="preview"
                size={20}
                color={_COLORS.Kodie_GreenColor}
              />
          </View>
          <View>
            <Text  style={GeneralReportCommonStyle.title}>{props.title}</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity style={GeneralReportCommonStyle.optionsmenu}>
          <View>
            <MaterialCommunityIcons
                name="file-download-outline"
                size={20}
                color={_COLORS.Kodie_GreenColor}
              />
          </View>
          <View>
            <Text  style={GeneralReportCommonStyle.title}>{props.secondDesc}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={GeneralReportCommonStyle.optionsmenu}    
            onPress={() => {
              refRBSheet.current.open();
            }}>
          <View>
            <MaterialCommunityIcons
                name="email-send-outline"
                size={20}
                color={_COLORS.Kodie_GreenColor}
              />
          </View>
          <View>
            <Text  style={GeneralReportCommonStyle.title}>{props.thirdDesc}</Text>
          </View>
        </TouchableOpacity>

        <RBSheet
          ref={refRBSheet}
          height={210}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
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
