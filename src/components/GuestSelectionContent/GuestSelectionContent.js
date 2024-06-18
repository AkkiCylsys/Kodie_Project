import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {_COLORS, FONTFAMILY, IMAGES} from '../../Themes';

const GuestSelectionContent = ({
  query,
  setQuery,
  results,
  handleSelect,
  tempSelectedValues,
  selectedValues,
  handleClosePopup,
  applySelection,
  refRBSheet,
}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontSize: 20,
            color: _COLORS?.Kodie_BlackColor,
            fontFamily: FONTFAMILY?.K_Bold,
          }}>
          {'Add guests'}
        </Text>
        <TouchableOpacity onPress={() => refRBSheet.current.close()}>
          <AntDesign
            color={_COLORS.Kodie_BlackColor}
            name={'close'}
            size={25}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          height: 48,
          borderColor: _COLORS?.Kodie_GrayColor,
          borderWidth: 1,
          borderRadius: 8,
          marginVertical: 22,
          alignItems: 'center',
        }}>
        <EvilIcons
          name="search"
          size={28}
          color={_COLORS.Kodie_MediumGrayColor}
        />
        <TextInput
          placeholder="Type to search"
          value={query}
          onChangeText={text => setQuery(text)}
          style={{alignSelf: 'center'}}
          onFocus={() => {
            refRBSheet.current.open();
          }}
        />
      </View>

      <FlatList
        data={results}
        keyExtractor={item => item.UAD_KEY.toString()}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 8,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={IMAGES?.userImage}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50 / 2,
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: _COLORS?.Kodie_BlackColor,
                  fontFamily: FONTFAMILY?.K_Bold,
                  alignSelf: 'center',
                  marginLeft: 15,
                }}>
                {`${item?.UAD_FIRST_NAME} ${item?.UAD_LAST_NAME}`}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: tempSelectedValues.some(
                  user => user.UAD_KEY === item.UAD_KEY,
                )
                  ? _COLORS?.Kodie_GreenColor
                  : _COLORS?.Kodie_MediumGrayColor,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: tempSelectedValues.some(
                    user => user.UAD_KEY === item.UAD_KEY,
                  )
                    ? _COLORS?.Kodie_GreenColor
                    : _COLORS?.Kodie_MediumGrayColor,
                  fontFamily: FONTFAMILY?.K_Medium,
                  alignSelf: 'center',
                }}>
                {tempSelectedValues.some(
                  user => user.UAD_KEY === item.UAD_KEY,
                ) ? "Added":'Add'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          style={{paddingHorizontal: 20, paddingVertical: 10}}
          onPress={handleClosePopup}>
          <Text
            style={{
              fontSize: 14,
              color: _COLORS?.Kodie_BlackColor,
              fontFamily: FONTFAMILY?.K_Bold,
            }}>
            {'Cancel'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: _COLORS?.Kodie_BlackColor,
            borderRadius: 8,
          }}
          onPress={applySelection}>
          <Text
            style={{
              fontSize: 14,
              color: _COLORS?.Kodie_WhiteColor,
              fontFamily: FONTFAMILY?.K_Bold,
            }}>
            {'Apply'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GuestSelectionContent;
