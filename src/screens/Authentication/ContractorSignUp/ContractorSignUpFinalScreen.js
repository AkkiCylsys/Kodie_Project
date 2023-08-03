import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { C_SignUpFinalStyle } from './ContractorSignUpFinalStyle';
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton"
import TopHeader from "./../../../components/Molecules/Header/Header"
import StatusBar from "./../../../components/Atoms/StatusBar/StatusBar"
import { VIEW_STYLES, LABEL_STYLES, _COLORS } from "./../../../Themes/index"
import { _goBack } from './../../../services/CommonServices/index'
import StepText from "../../../components/Molecules/StepText/StepText";

export default ContractorSignUpFinalScreen = (props) => {
    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <View style={C_SignUpFinalStyle.container}>
            <TopHeader onPressLeftButton={() => _goBack(props)} />
            <StatusBar width={"100%"} />
            <StepText _StepNo={" 4"} _StepText={"Bank details"} />

            <View style={C_SignUpFinalStyle.formContainer}>
                <View style={C_SignUpFinalStyle.card}>
                    <View style={C_SignUpFinalStyle.inputContainer}>
                        <Text style={LABEL_STYLES._texinputLabel}>Account Holder Name</Text>
                        <TextInput
                            style={C_SignUpFinalStyle.input}
                            value={accountHolderName}
                            onChangeText={setAccountHolderName}
                            placeholder="Enter Holder Name"
                            placeholderTextColor="#999"
                        />
                    </View>
                    <View style={C_SignUpFinalStyle.AccountNumberContainer}>
                        <Text style={LABEL_STYLES._texinputLabel}>Account Number</Text>
                        <TextInput
                            style={C_SignUpFinalStyle.input}
                            value={accountNumber}
                            onChangeText={setAccountNumber}
                            keyboardType='number-pad'
                            placeholder="Your account number"
                            placeholderTextColor="#999"
                        />
                    </View>
                    <Text style={C_SignUpFinalStyle.discription}>
                        By adding this bank account you are confirming that you are the owner and have full authorization to this bank account.
                    </Text>
                    <View style={C_SignUpFinalStyle.ABNContainer}>
                        <Text style={LABEL_STYLES._texinputLabel}>ABN</Text>
                        <TextInput
                            style={C_SignUpFinalStyle.input}
                            value={phoneNumber}
                            keyboardType='number-pad'
                            onChangeText={setPhoneNumber}
                            placeholder="__-___-___"
                            placeholderTextColor="#999"
                        />
                    </View>
                </View>
            </View>
            <View style={VIEW_STYLES._bottomButtonView}>
                <CustomSingleButton onPress={() => props.navigation.navigate('UserTypeScreen')} _ButtonText={"Save"} Text_Color={_COLORS.Kodie_WhiteColor} />
            </View>
        </View>
    );
};
