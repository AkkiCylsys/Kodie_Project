import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WheelPicker from 'react-native-wheel-scrollview-picker';
import { FONTFAMILY, _COLORS } from '../../Themes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MAX_COMPOSER_HEIGHT } from 'react-native-gifted-chat';

const CustomNotificationPicker = (props) => {
  const [selectedValue, setSelectedValue] = useState(1);
  const [currentUnit, setCurrentUnit] = useState("Days");

  const generatePickerItems = () => {
    let items = [];
    for (let i = 1; i <= 59; i++) {
      items.push(`${i}`);
    }
    return items;
  };

  const handleApply = () => {
    const value = `${selectedValue} ${currentUnit}`;
    console.log(value);
    props?.onApply(value);
  };
  const unitOptions = ['Minutes', 'Hours', 'Days', 'Weeks', 'Months'];
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}>Set custom notification</Text>
        <TouchableOpacity onPress={props?.onClose}>
          <AntDesign
            color={_COLORS.Kodie_BlackColor}
            name={'close'}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.pickerRow}>
        <WheelPicker
          style={styles.picker}
          dataSource={generatePickerItems()}
          selectedIndex={selectedValue - 1}
          onValueChange={(index) => setSelectedValue(index)}
          wrapperBackground="#FFFFFF"
          itemHeight={35}
          highlightColor="#d8d8d8"
          highlightBorderWidth={2}
          itemTextStyle={{ fontSize: 16, fontFamily: FONTFAMILY?.K_Medium }}
          activeItemTextStyle={{ fontSize: 16, fontFamily: FONTFAMILY?.K_Bold }}
        />
        <WheelPicker
          style={styles.picker}
          dataSource={unitOptions}
          selectedIndex={currentUnit}
  onValueChange={(value) => setCurrentUnit(value)}
          wrapperBackground="#FFFFFF"
          itemHeight={35}
          highlightColor="#d8d8d8"
          highlightBorderWidth={2}
          itemTextStyle={{ fontSize: 16, fontFamily: FONTFAMILY?.K_Medium, }}
          activeItemTextStyle={{ fontSize: 16, fontFamily: FONTFAMILY?.K_Bold, }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: _COLORS?.Kodie_WhiteColor }]} onPress={props?.onClose}>
          <Text style={[styles.buttonText, { color: _COLORS?.Kodie_BlackColor }]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleApply}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:16
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginVertical: 15,
    borderColor: _COLORS?.Kodie_MediumGrayColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  picker: {
    width: "100%",
    height: 200,
    backgroundColor: _COLORS?.Kodie_lightGreenColor
  },
  buttonContainer: {
    flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'
  },
  button: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: _COLORS?.Kodie_BlackColor, borderRadius: 8 },
  buttonText: { fontSize: 14, color: _COLORS?.Kodie_WhiteColor, fontFamily: FONTFAMILY?.K_Bold },
});

export default CustomNotificationPicker;
