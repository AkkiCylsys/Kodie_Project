import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity,FlatList,Image } from "react-native";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import { SliderBox } from "react-native-image-slider-box";
import { _COLORS, BANNERS,IMAGES } from "../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SubmitApplicationCss } from "./SubmitApplicationCss";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";

export default SubmitApplication = (props) => {

    return (
        <View style={SubmitApplicationCss.mainContainer}>
            <TopHeader
                onPressLeftButton={() => _goBack(props)}
                MiddleText={"Submit application"}
            />
            <ScrollView>
                <View style={SubmitApplicationCss.Container}>
                        <Text style={SubmitApplicationCss.apartment_text}>
                            {"Apartment"}
                        </Text>
                 
                    <Text style={SubmitApplicationCss.melbourne_Text}>{"Melbourne"}</Text>
                    <View style={SubmitApplicationCss.locationView}>
                        <Entypo
                            name="location-pin"
                            size={20}
                            color={_COLORS.Kodie_GreenColor}
                        />
                        <Text style={SubmitApplicationCss.LocationText}>{"8502 Preston Rd.Inglewood,Queensland,Australia,."}</Text>
                    </View>

                </View>
                <DividerIcon />
               
            
                <View style={SubmitApplicationCss.Container}>
          <View style={SubmitApplicationCss.propety_details_view}>
            <Text style={SubmitApplicationCss.propery_det}>{"Property details"}</Text>

            <TouchableOpacity style={SubmitApplicationCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={SubmitApplicationCss.Container}>
          <View style={SubmitApplicationCss.propety_details_view}>
            <Text style={SubmitApplicationCss.propery_det}>{"Rooms"}</Text>

            <TouchableOpacity style={SubmitApplicationCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={SubmitApplicationCss.Container}>
          <View style={SubmitApplicationCss.propety_details_view}>
            <Text style={SubmitApplicationCss.propery_det}>{"External featuress"}</Text>

            <TouchableOpacity style={SubmitApplicationCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={SubmitApplicationCss.Container}>
          <View style={SubmitApplicationCss.propety_details_view}>
            <Text style={SubmitApplicationCss.propery_det}>{"Points of interest"}</Text>

            <TouchableOpacity style={SubmitApplicationCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
                <View style={SubmitApplicationCss.Container}>
                <Text style={SubmitApplicationCss.inspections}>
                        {
                            "ITenant  screening report (recommended)"
                        }
                    </Text>
                    <CustomSingleButton _ButtonText={'Start Now'} Text_Color={_COLORS.Kodie_WhiteColor}/>
                </View>
                <DividerIcon/>

       
            </ScrollView>
            <View style={SubmitApplicationCss.bottomButtonView}>
            <RowButtons 
LeftButtonText={'Cancel'}
LeftButtonTextColor={_COLORS.Kodie_BlackColor}
leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
LeftButtonborderColor={_COLORS.Kodie_BlackColor}
RightButtonText={'Submit'}
RightButtonborderColor={_COLORS.Kodie_BlackColor}
RightButtonTextColor={_COLORS.Kodie_WhiteColor}
RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
/>
</View>
        </View>
    );
};
