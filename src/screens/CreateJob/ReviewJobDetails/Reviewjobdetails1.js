import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices/CommonMethods";
import { ReviewjobdetailsStyle1 } from "./ReviewjobdetailsStyle1";
import { _COLORS } from "../../../Themes";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import CustomTabNavigator from "../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";

const Reviewjobdetails1 = (props) => {
    const [activeTab, setActiveTab] = useState("Tab1");
    const checkTabs = () => {
        switch (activeTab) {
            case "Tab2":
        }
    };
    const [value, setValue] = useState(null);
    return (
        <>
            <View style={ReviewjobdetailsStyle1.Mainview}>
                <TopHeader
                    onPressLeftButton={() => _goBack(props)}
                    MiddleText={"Review job details"}
                />
                <ScrollView>
                    <Image
                        source={require("../../../assets/images/Banners/preview.png")}
                        style={ReviewjobdetailsStyle1.img}
                    />
                    <View style={ReviewjobdetailsStyle1.Container}>
                        <Text style={ReviewjobdetailsStyle1.TextFixing}>
                            Fixing & Maintenance
                        </Text>
                        <Text style={ReviewjobdetailsStyle1.ElectricalsText}>
                            Electricals
                        </Text>
                        <CustomTabNavigator
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            TAB3
                            TAB4                           
                            Tab1={"Details"}
                            Tab2={"Bids"}
                            Tab3={"Milestones"}
                            Tab4={"Documents"}
                            onPressTab1={() => setActiveTab("Tab1")}
                            onPressTab2={() => setActiveTab("Tab2")}
                            onPressTab3={() => setActiveTab("Tab3")}
                            onPressTab4={() => setActiveTab("Tab4")}
                            colorTab1={
                                activeTab === "Tab1"
                                    ? _COLORS.Kodie_BlackColor
                                    : _COLORS.Kodie_MediumGrayColor
                            }
                            colorTab2={
                                activeTab === "Tab2"
                                    ? _COLORS.Kodie_BlackColor
                                    : _COLORS.Kodie_MediumGrayColor
                            }
                            colorTab3={
                                activeTab === "Tab3"
                                    ? _COLORS.Kodie_BlackColor
                                    : _COLORS.Kodie_MediumGrayColor
                            }
                            colorTab4={
                                activeTab === "Tab4"
                                    ? _COLORS.Kodie_BlackColor
                                    : _COLORS.Kodie_MediumGrayColor
                            }
                            styleTab1={activeTab === "Tab1" && ReviewjobdetailsStyle1.activeTab}
                            styleTab2={activeTab === "Tab2" && ReviewjobdetailsStyle1.activeTab}
                            styleTab3={activeTab === "Tab3" && ReviewjobdetailsStyle1.activeTab}
                            styleTab4={activeTab === "Tab4" && ReviewjobdetailsStyle1.activeTab}
                        />
                        <DividerIcon style={ReviewjobdetailsStyle1.divider} />
                        <View>
                            <Text style={ReviewjobdetailsStyle1.textview}>
                                I need someone to help me fix plugs in my house that keep short
                                circuiting.
                            </Text>
                            <Text style={ReviewjobdetailsStyle1.textview1}>
                                Job request summary
                            </Text>
                        </View>
                        <View style={ReviewjobdetailsStyle1.Tableview}>
                            <View>
                                <Text style={ReviewjobdetailsStyle1.Tabletext}>Name</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext}>Location</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext}>Property type</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext}>Proposed date</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext}>Proposed time</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext}>Number of hours</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext}>How often</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext}>Budget range</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext}>Payment</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext}>Booking insurance</Text>
                            </View>
                            <View>
                                <Text style={ReviewjobdetailsStyle1.Tabletext1}>Tom Smith</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext1}>1729 Melbourne St Australia</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext1}>Apartment / flat</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext1}>Nov 11, 2022</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext1}>10pm - 2am (4 hours)</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext1}>3 hours</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext1}>One time</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext1}>$200 - $400</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext1}>Tenant</Text>
                                <Text style={ReviewjobdetailsStyle1.Tabletext1}>Yes</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default Reviewjobdetails1;
