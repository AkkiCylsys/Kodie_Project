import React, { useState } from 'react';
import { View, BackHandler, Text, Image, TextInput, ScrollView } from 'react-native';
import { logos } from '../../../Themes/CommonVectors/Images';
import { TenantStyle } from './TenantStyle';
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton"
import BottomTextsButton from './../../../components/Molecules/BottomTextsButton/BottomTextsButton'
import TopHeader from "./../../../components/Molecules/Header/Header"
import StatusBar from "./../../../components/Atoms/StatusBar/StatusBar"
import { VIEW_STYLES, FONTFAMILY, LABEL_STYLES, IMAGES, _COLORS } from "./../../../Themes/index"
import { _goBack } from './../../../services/CommonServices/index'
export default TenantSignup = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    return (
        <View style={TenantStyle.container}>
            <TopHeader onPressLeftButton={() => _goBack(props)} />
           <StatusBar width={"25%"}/>
            <ScrollView >
                <Text style={TenantStyle.title}>Enter your personal information</Text>
                <View style={TenantStyle.formContainer}>

                    <View style={TenantStyle.card}>
                        <View style={TenantStyle.inputContainer}>
                            <Text style={LABEL_STYLES._texinputLabel}>Name</Text>
                            <TextInput
                                style={TenantStyle.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your name"
                                placeholderTextColor="#999"
                            />
                        </View>
                        <View style={TenantStyle.inputContainer}>
                            <Text style={LABEL_STYLES._texinputLabel}>Email</Text>
                            <TextInput
                                style={TenantStyle.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Your Email Address"
                                placeholderTextColor="#999"
                            />
                        </View>
                        <View style={TenantStyle.inputContainer}>
                            <Text style={LABEL_STYLES._texinputLabel}>Password</Text>
                            <TextInput
                                style={TenantStyle.input}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Enter Password"
                                placeholderTextColor="#999"
                                secureTextEntry
                            />
                        </View>
                        <View style={TenantStyle.inputContainer}>
                            <Text style={LABEL_STYLES._texinputLabel}>Phone number</Text>
                            <TextInput
                                style={TenantStyle.input}
                                value={phoneNumber}
                                keyboardType='number-pad'
                                onChangeText={setPhoneNumber}
                                placeholder="Enter your phone number"
                                placeholderTextColor="#999"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={VIEW_STYLES._bottomButtonView}>
                <CustomSingleButton onPress={() => props.navigation.navigate('UserTypeScreen')} _ButtonText={"Next"} Text_Color={_COLORS.Kodie_WhiteColor} />
            </View>
        </View>
    );
};
