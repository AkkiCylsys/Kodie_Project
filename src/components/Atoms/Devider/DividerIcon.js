import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../../Themes/CommonColors/CommonColor';
import { Dividerstyles } from './DividerCss'
const DividerIcon = (props) => {

    return (
        <>
            <View style={Dividerstyles.mainView}>
                <View
                    style={{
                        borderBottomWidth: 0.8,
                        borderColor: props.color ? props.color : colors.Kodie_GrayColor,
                        borderStyle: props.dashed ? 'dashed' : 'solid',
                        marginTop: 15,
                        marginBottom: 15,
                        flex: 1,
                        ...props.style,
                    }}
                />
                {
                    props.DeviderText &&
                    <View style={Dividerstyles.textView}>
                        <Text style={Dividerstyles.Divider_Text}>{props.DeviderText}</Text>
                    </View>
                }
                <View
                    style={{
                        borderBottomWidth: 0.8,
                        borderColor: props.color ? props.color : colors.Kodie_GrayColor,
                        borderStyle: props.dashed ? 'dashed' : 'solid',
                        marginTop: 15,
                        marginBottom: 15,
                        flex: 1,
                        ...props.style,
                    }}
                />
            </View>
        </>
    );
};


export default DividerIcon;