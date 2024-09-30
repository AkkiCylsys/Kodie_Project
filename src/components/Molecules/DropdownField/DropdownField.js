import React from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; // Ensure you have installed and imported the correct dropdown package
import { LABEL_STYLES, _COLORS } from '../../../Themes';
import { DropdownFieldStyle } from './DropdownFeildStyle';

const DropdownField = ({
    label,
    placeholder,
    data,
    value,
    onChange,
    renderItem,
    Starpoint,
    dropdownStyle
}) => {
    return (
        <View style={DropdownFieldStyle.section}>
            <Text style={[LABEL_STYLES.commontext,{marginBottom:12}]}>{label}
            <Text style={{color: _COLORS?.Kodie_redColor}}>{Starpoint}</Text>
            </Text>
            <Dropdown
                style={[DropdownFieldStyle.dropdown, dropdownStyle, { flex: 1, borderRadius: 5, height: 48 }]}
                placeholderStyle={[
                    DropdownFieldStyle.placeholderStyle,
                    { color: _COLORS.Kodie_GrayColor },
                ]}
                selectedTextStyle={[
                    DropdownFieldStyle.selectedTextStyle,
                    { color: _COLORS.Kodie_BlackColor },
                ]}
                data={data}
                value={value}
                placeholder={placeholder}
                labelField="lookup_description"
                valueField="lookup_key"
                renderItem={renderItem}
                onChange={onChange}
                inputSearchStyle={DropdownFieldStyle.inputSearchStyle}
                iconStyle={DropdownFieldStyle.iconStyle}

            />
        </View>
    );
};

export default DropdownField;
