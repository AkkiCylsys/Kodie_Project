import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { UserTypeStyles } from './UserTypeCss';
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton"
import BottomTextsButton from './../../../components/Molecules/BottomTextsButton/BottomTextsButton'
import { FONTFAMILY, LABEL_STYLES, BANNERS, _COLORS } from "./../../../Themes/index"
export default UserType = () => {

    return (
        <View style={UserTypeStyles.container}>
            <ScrollView>
                <View style={UserTypeStyles.logoContainer}>
                    <Image
                        source={BANNERS.BannerFirst}
                        style={UserTypeStyles.logo}
                    />
                </View>
                <View style={ UserTypeStyles.maintextView}>
                    <Text style={UserTypeStyles.title}>Welcome to Kodie</Text>
                    <Text style={UserTypeStyles.discription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Netus dictumst molestie sit potenti velit tortor.</Text>
                    <Text style={UserTypeStyles.signupText}>SIGN UP AS</Text>
                </View>
                <View style={UserTypeStyles.formContainer}>

                    <View style={UserTypeStyles.card}>
                        <CustomSingleButton _ButtonText={"I’m a Tenant"} backgroundColor={_COLORS.Kodie_WhiteColor} />
                        <CustomSingleButton _ButtonText={"I’m a Contractor"} backgroundColor={_COLORS.Kodie_WhiteColor} />
                        <CustomSingleButton _ButtonText={"I’m a Landlord"} backgroundColor={_COLORS.Kodie_WhiteColor} />
                        <BottomTextsButton _LeftButtonText={"Already have an account?"} _RightButtonText={"Login"} onPress={() => alert('ok')} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
