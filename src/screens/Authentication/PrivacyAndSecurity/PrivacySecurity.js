import React from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { _COLORS, IMAGES } from "../../../Themes";
import { PrivacySecurityStyle } from "../../Authentication/PrivacyAndSecurity/PrivacySecurityStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { _goBack } from "../../../services/CommonServices";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const PrivacySecurity = (props) => {
    return (
        <>
            <View style={PrivacySecurityStyle.Mainview}>
                <TopHeader
                    onPressLeftButton={() => _goBack(props)}
                    MiddleText={"Linked devices"}
                />
                <ScrollView>
                    <View style={PrivacySecurityStyle.container}>
                        <View>
                            <View style={PrivacySecurityStyle.bindview}>
                                <View style={PrivacySecurityStyle.checkimgview}>
                                    <Image
                                        source={IMAGES.Contact}
                                        style={PrivacySecurityStyle.imgicon}
                                    />
                                </View>
                                <View style={PrivacySecurityStyle.innertextview}>
                                    <Text style={PrivacySecurityStyle.textitem}>
                                        Blocked Users
                                    </Text>
                                    <View style={PrivacySecurityStyle.texticon}>
                                        <Text>Block or unblock users</Text>
                                        <Text style={PrivacySecurityStyle.text3}>3</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <DividerIcon style={PrivacySecurityStyle.divider} />
                        <View>
                            <View style={PrivacySecurityStyle.bindview}>
                                <View style={PrivacySecurityStyle.checkimgview}>
                                    <Image
                                        source={IMAGES.Contact}
                                        style={PrivacySecurityStyle.imgicon}
                                    />
                                </View>
                                <View style={PrivacySecurityStyle.innertextview}>
                                    <Text style={PrivacySecurityStyle.textitem}>
                                        Linked devices
                                    </Text>
                                    <View style={PrivacySecurityStyle.texticon}>
                                        <Text>Manage your linked devices</Text>
                                        <Text style={PrivacySecurityStyle.text0}>0</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <DividerIcon style={PrivacySecurityStyle.divider} />
                        <View>
                            <View style={PrivacySecurityStyle.bindview}>
                                <View style={PrivacySecurityStyle.checkimgview}>
                                    <Image
                                        source={IMAGES.Contact}
                                        style={PrivacySecurityStyle.imgicon}
                                    />
                                </View>
                                <View style={PrivacySecurityStyle.innertextview}>
                                    <Text style={PrivacySecurityStyle.textitem}>
                                        Two-Step Verification
                                    </Text>
                                    <View style={PrivacySecurityStyle.texticon}>
                                        <Text>Secure your account with 2 step verification </Text>
                                        <View style={PrivacySecurityStyle.icon}>
                                            <TouchableOpacity>
                                            <MaterialIcons
                                                name="keyboard-arrow-right"
                                                size={30}
                                                color={_COLORS.Kodie_GrayColor}
                                            />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <DividerIcon style={PrivacySecurityStyle.divider} />
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default PrivacySecurity;
