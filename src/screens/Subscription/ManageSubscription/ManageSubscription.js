import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { ManageSubscriptionStyle } from "./ManageSubscriptionStyle";
import { IMAGES, FONTFAMILY, _COLORS } from "../../../Themes/index";
import RangeSlider from "../../../components/Molecules/RangeSlider/RangeSlider";
import { _goBack } from "../../../services/CommonServices/CommonMethods";
import SwitchButton from "../../../components/Molecules/SwitchButton/SwitchButton";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
const ManageSubscription = (props) => {



    const RowsData = (props) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 10, paddingVertical: 5 }}>
                <Image
                    source={IMAGES.Done}
                    style={ManageSubscriptionStyle.DoneImage}
                    resizeMode="contain"
                />

                <Text style={ManageSubscriptionStyle.SubDataText}>{props.DataTexts}</Text>
            </View>
        );
    };
    return (
        <>
            <View style={ManageSubscriptionStyle.Mainview}>
                <TopHeader
                    onPressLeftButton={() => _goBack(props)}
                    MiddleText={"Manage Subscription"}
                />

                <ScrollView style={{ paddingHorizontal: 10, }}>
                    <Image
                        source={IMAGES.Subscription}
                        style={ManageSubscriptionStyle.SubscriptionImage}
                        resizeMode="contain"
                    />
                    <Text style={ManageSubscriptionStyle.Heading}>{"Subscribe to Kodie"}</Text>
                    <Text style={ManageSubscriptionStyle.SubHeading}>Go beyond the limits, get <Text style={[ManageSubscriptionStyle.SubHeading, { color: _COLORS.Kodie_GreenColor }]}> exclusive features</Text>  by subscribing to <Text style={[ManageSubscriptionStyle.SubHeading, { color: _COLORS.Kodie_GreenColor, fontFamily: FONTFAMILY.K_Bold }]}>Kodie</Text>.</Text>
                    <Text style={[ManageSubscriptionStyle.SubUnderlineHeading, { color: _COLORS.Kodie_GreenColor }]}> 14-days unlimited FREE trial, then only $69 / month</Text>
                    <View style={ManageSubscriptionStyle.RangeSliderView}>
                        <View style={ManageSubscriptionStyle.switchBtn_view}>
              <SwitchButton
                leftBtnText={"Not approved"}
                rightBtnText={"Approved"}
              />
            </View>

                        <RangeSlider from={1} to={20} />
                    </View>

                    <View style={ManageSubscriptionStyle.SubscriptionDataView}>
                        <Text style={ManageSubscriptionStyle.Heading}>{"Property Essential"}</Text>
                        <RowsData DataTexts="Easily manage up to 3 properties" />
                        <RowsData DataTexts="Single user" />
                        <RowsData DataTexts="Standard financial dashboard (revenues & expenses)" />
                        <RowsData DataTexts="Service & maintenance requests with ease" />
                        <RowsData DataTexts="Standard access to contractors" />
                        <RowsData DataTexts="Income & expense tracking" />
                        <RowsData DataTexts="Tenant screening" />
                        <RowsData DataTexts="Standard document management" />
                        <RowsData DataTexts="Standard rental property listings on Kodie Property Marketplace" />
                        <View style={{ padding: 5 }}>
                            <RowButtons
                                leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
                                RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
                                LeftButtonTextColor={_COLORS.Kodie_BlackColor}
                                RightButtonTextColor={_COLORS.Kodie_WhiteColor}
                                LeftButtonborderColor={_COLORS.Kodie_TransparentColor}
                                RightButtonborderColor={_COLORS.Kodie_BlackColor}
                                LeftButtonText={"Contact us"}
                                RightButtonText={"Subscribe"}
                                onPressLeftButton={() =>
                                    props.navigation.navigate("ContractorProfile")
                                }
                                onPressRightButton={() => {
                                    props.navigation.navigate("HireContractor");
                                }}
                            />
                        </View>
                    </View>
                    <CustomSingleButton
                        onPress={() => props.navigation.navigate("BottomNav")}
                        _ButtonText={"Subscribe for only $69 / month"}
                        Text_Color={_COLORS.Kodie_WhiteColor}
                    />
                </ScrollView>
            </View>
        </>
    );
};

export default ManageSubscription;
