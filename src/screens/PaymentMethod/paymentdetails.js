import React, { useRef } from "react";
import { View, Text, TextInput, ScrollView, Image, } from "react-native";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
import { _COLORS, IMAGES } from "../../Themes";
import PayButton from "../../components/PayButton/PayButton";
import { paymentdetailsStyle } from "./paymentdetailsStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import RBSheet from "react-native-raw-bottom-sheet";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";

const paymentdetails = (props) => {
    const refRBSheet = useRef(); // Move useRef inside the component

    const CloseUp = () => {
        refRBSheet.current.close();
        setOverlayVisible(false);
    };

    return (
        <View style={paymentdetailsStyle.Mainview}>
            <View style={paymentdetailsStyle.MainContainer}>
                <TopHeader
                    onPressLeftButton={() => props.navigation.navigate("PaymentMethod")}
                    MiddleText={"Enter payment details"}
                />
            </View>
            <ScrollView>
                <View style={paymentdetailsStyle.container}>
                    <View style={paymentdetailsStyle.PaymentView}>
                        <Text style={paymentdetailsStyle.Paymenttext}>
                            For payment:
                        </Text>
                        <Text style={paymentdetailsStyle.Paymenttext}>
                            $173.25
                        </Text>
                    </View>
                    <View>
                        <Text style={{ alignSelf: "flex-end" }}>
                            Including VAT (21%)
                        </Text>
                    </View>
                    <View style={paymentdetailsStyle.job_billing}>
                        <View style={paymentdetailsStyle.switchBtn_view}>
                            <PayButton
                                leftBtnText={"Credit card"}
                                rightBtnText={"Apple Pay"}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 39 }}>
                        <Text style={paymentdetailsStyle.inputtext}>
                            Card number
                        </Text>
                        <View style={paymentdetailsStyle.inputContainer}>
                            <TextInput
                                style={paymentdetailsStyle.Input}
                                placeholder="0000   0000   0000    0000"
                                placeholderTextColor="#999"
                            />
                            <AntDesign
                                name={"creditcard"}
                                size={20}
                                color={_COLORS.Kodie_LightGrayColor}
                                style={paymentdetailsStyle.cardIcon}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={paymentdetailsStyle.inputtext}>
                            Cardholder name
                        </Text>
                        <View style={paymentdetailsStyle.inputContainer}>
                            <TextInput
                                style={paymentdetailsStyle.Input}
                                placeholder="ex. Jonathan Paul Ive"
                                placeholderTextColor="#999"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={paymentdetailsStyle.inputtext}>
                                Expiry date
                            </Text>
                            <View style={paymentdetailsStyle.inputCarddate}>
                                <TextInput
                                    style={paymentdetailsStyle.Input}
                                    placeholder="MM   /   YYYY"
                                    placeholderTextColor="#999"
                                />
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={paymentdetailsStyle.inputtext}>
                                    CVV / CVC
                                </Text>
                                <AntDesign
                                    name={"questioncircleo"}
                                    size={20}
                                    color={_COLORS.Kodie_lightGreenColor}
                                    style={{ marginRight: 25 }}
                                />
                            </View>
                            <View style={paymentdetailsStyle.inputCarddate}>
                                <TextInput
                                    style={paymentdetailsStyle.Input}
                                    placeholder="3-4 digits"
                                    placeholderTextColor="#999"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={paymentdetailsStyle.ViewTextstyle}>
                        <Text style={paymentdetailsStyle.Textstyle}>
                            We will send you an order details to your email after the successful payment
                        </Text>
                    </View>
                    <View style={paymentdetailsStyle.btnview}>
                        <CustomSingleButton
                            borderColor={_COLORS.Kodie_TransparentColor}
                            _ButtonText={"Complete payment"}
                            backgroundColor={_COLORS.Kodie_BlackColor}
                            Text_Color={_COLORS.Kodie_WhiteColor}
                            // disabled={isLoading ? true : false}
                            onPress={() => {
                                refRBSheet.current.open();
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
            <RBSheet
                ref={refRBSheet}
                height={400}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                    draggableIcon: {
                        backgroundColor: _COLORS.Kodie_LightGrayColor,
                    },
                    container: paymentdetailsStyle.bottomModal_container,
                }}
            >
                <View style={paymentdetailsStyle.modalContainer}>
                    <Text style={paymentdetailsStyle.modalMainText}>Payment Successful!</Text>
                    <Text style={paymentdetailsStyle.modalMainText2}>Successfully made payment
                        and scheduled job.</Text>
                    <Image
                        source={IMAGES.CheckIcon}
                        resizeMode={"center"}
                        style={paymentdetailsStyle.checkStl}
                    />
                    <CustomSingleButton
                        _ButtonText={"View history"}
                        Text_Color={_COLORS.Kodie_WhiteColor}
                        height={48}
                        onPress={() => {
                            refRBSheet.current.close();
                            _goBack(props);
                        }}
                    />
                    <CustomSingleButton
                        // disabled={isLoading ? true : false}
                        _ButtonText={"Return home"}
                        Text_Color={_COLORS.Kodie_BlackColor}
                        height={48}
                        borderColor={_COLORS.Kodie_WhiteColor}
                        backgroundColor={_COLORS.Kodie_WhiteColor}
                    />
                </View>
            </RBSheet>
        </View>
    );
};

export default paymentdetails;
