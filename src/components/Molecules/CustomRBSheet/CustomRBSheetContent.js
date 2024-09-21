import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {_COLORS, FONTFAMILY} from '../../../Themes';

const CustomRBSheetContent = props => {
  const {data, closeModal} = props;
  const navigation = useNavigation();

  const handlePress = item => {
    switch (item.id) {
      case '1':
        closeModal();
        break;
      case '2':
        closeModal();
        break;
      case '3':
        closeModal();
        break;
      case '4':
        closeModal();
        break;
      default:
        break;
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={Styles.container}
      onPress={() => handlePress(item)}>
      <View style={Styles.IconView}>{item.Icon}</View>
      <Text style={Styles.text}>{item.Data}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={Styles.mainContainer}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CustomRBSheetContent;
const Styles = StyleSheet.create({
  mainContainer: {flex: 1},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2%',
    marginHorizontal: 10,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 10,
  },
  Icons: {width: 40, height: 40, resizeMode: 'cover'},
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  IconView: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    marginLeft: 5,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
