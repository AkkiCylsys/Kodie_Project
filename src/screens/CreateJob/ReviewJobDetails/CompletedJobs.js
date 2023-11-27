import { View, Text, TouchableOpacity,ScrollView } from "react-native";
import React from "react";
import { CompletedJobsStyle } from "./CompletedJobsStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices/CommonMethods";
import { _COLORS } from "../../../Themes";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import Entypo from "react-native-vector-icons/Entypo";
const CompletedJobs = (props) => {
  return (
    <>
      <View style={CompletedJobsStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Completed jobs"}
        />
        <ScrollView>
        <View style={CompletedJobsStyle.Container}>
          <View style={CompletedJobsStyle.Lineview}>
            <Text style={CompletedJobsStyle.Linetext}>
              Door handle repairing
            </Text>
            <TouchableOpacity style={CompletedJobsStyle.AllView}>
              <Entypo
                name="dot-single"
                size={20}
                color={_COLORS.Kodie_GreenColor}
                style={CompletedJobsStyle.closeIcon}
              />
              <Text style={CompletedJobsStyle.item_style}>Complete</Text>
            </TouchableOpacity>
            <View>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={_COLORS.Kodie_GrayColor}
                style={CompletedJobsStyle.closeIcon}
              />
            </View>
          </View>
          <View style={CompletedJobsStyle.ref}>
            <Text>Ref #16642</Text>
          </View>
          <View style={CompletedJobsStyle.lineView1}>
            <Text style={CompletedJobsStyle.linetext1}>Tom Cat</Text>
            <Text style={CompletedJobsStyle.linetext1}>Cost</Text>
          </View>
          <View style={CompletedJobsStyle.lineView2}>
            <Entypo
              name="location-pin"
              size={15}
              color={_COLORS.Kodie_GrayColor}
              style={CompletedJobsStyle.closeIcon}
            />

            <Text style={CompletedJobsStyle.text}>
              Apartment: 1729 Melbourne St Australia
            </Text>
            <Text style={CompletedJobsStyle.text100}>$100</Text>
          </View>
          <DividerIcon />
          {/* ....../////...... */}

          <View style={CompletedJobsStyle.Lineview}>
            <Text style={CompletedJobsStyle.Linetext}>
              Plastering to fix wall
            </Text>
            <TouchableOpacity style={CompletedJobsStyle.AllView}>
              <Entypo
                name="dot-single"
                size={20}
                color={_COLORS.Kodie_GreenColor}
                style={CompletedJobsStyle.closeIcon}
              />
              <Text style={CompletedJobsStyle.item_style}>Complete</Text>
            </TouchableOpacity>
            <View>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={_COLORS.Kodie_GrayColor}
                style={CompletedJobsStyle.closeIcon}
              />
            </View>
          </View>
          <View style={CompletedJobsStyle.ref}>
            <Text>Ref #16694</Text>
          </View>
          <View style={CompletedJobsStyle.lineView1}>
            <Text style={CompletedJobsStyle.linetext1}>Fred Kennedy</Text>
            <Text style={CompletedJobsStyle.linetext1}>Cost</Text>
          </View>
          <View style={CompletedJobsStyle.lineView2}>
            <Entypo
              name="location-pin"
              size={15}
              color={_COLORS.Kodie_GrayColor}
              style={CompletedJobsStyle.closeIcon}
            />
            <Text style={CompletedJobsStyle.text}>
              House: 29 NSW St Australia
            </Text>
            <Text style={CompletedJobsStyle.text100}>$200</Text>
          </View>
          <DividerIcon />
          {/* ....../////...... */}

          <View style={CompletedJobsStyle.Lineview}>
            <Text style={CompletedJobsStyle.Linetext}>Roof repairing</Text>
            <TouchableOpacity style={CompletedJobsStyle.AllView}>
              <Entypo
                name="dot-single"
                size={20}
                color={_COLORS.Kodie_GreenColor}
                style={CompletedJobsStyle.closeIcon}
              />
              <Text style={CompletedJobsStyle.item_style}>Complete</Text>
            </TouchableOpacity>
            <View>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={_COLORS.Kodie_GrayColor}
                style={CompletedJobsStyle.closeIcon}
              />
            </View>
          </View>
          <View style={CompletedJobsStyle.ref}>
            <Text>Ref #17213</Text>
          </View>
          <View style={CompletedJobsStyle.lineView1}>
            <Text style={CompletedJobsStyle.linetext1}>Ralph Edwards</Text>
            <Text style={CompletedJobsStyle.linetext1}>Cost</Text>
          </View>
          <View style={CompletedJobsStyle.lineView2}>
            <Entypo
              name="location-pin"
              size={15}
              color={_COLORS.Kodie_GrayColor}
              style={CompletedJobsStyle.closeIcon}
            />
            <Text style={CompletedJobsStyle.text}>
              Cottage: 8502 Preston Rd. Inglewood
            </Text>
            <Text style={CompletedJobsStyle.text100}>$1000</Text>
          </View>
          <DividerIcon />
          {/* ....../////...... */}

          <View style={CompletedJobsStyle.Lineview}>
            <Text style={CompletedJobsStyle.Linetext}>Epoxy garage repair</Text>
            <TouchableOpacity style={CompletedJobsStyle.AllView}>
              <Entypo
                name="dot-single"
                size={20}
                color={_COLORS.Kodie_GreenColor}
                style={CompletedJobsStyle.closeIcon}
              />
              <Text style={CompletedJobsStyle.item_style}>Complete</Text>
            </TouchableOpacity>
            <View>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={_COLORS.Kodie_GrayColor}
                style={CompletedJobsStyle.closeIcon}
              />
            </View>
          </View>
          <View style={CompletedJobsStyle.ref}>
            <Text>Ref #19342</Text>
          </View>
          <View style={CompletedJobsStyle.lineView1}>
            <Text style={CompletedJobsStyle.linetext1}>Robert Fox</Text>
            <Text style={CompletedJobsStyle.linetext1}>Cost</Text>
          </View>
          <View style={CompletedJobsStyle.lineView2}>
            <Entypo
              name="location-pin"
              size={15}
              color={_COLORS.Kodie_GrayColor}
              style={CompletedJobsStyle.closeIcon}
            />
            <Text style={CompletedJobsStyle.text}>
              Flat: 2118 Thornridge Cir. Syracuse
            </Text>
            <Text style={CompletedJobsStyle.text100}>$700</Text>
          </View>
          <DividerIcon />
        </View>
        </ScrollView>
      </View>
    </>
  );
};

export default CompletedJobs;
