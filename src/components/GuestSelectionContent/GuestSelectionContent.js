import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
  mainStyle
}) => {
  
  return (
    
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={[{flex: 1, marginHorizontal: 16},mainStyle]} >
      
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
          borderColor: _COLORS.Kodie_GrayColor,
          borderWidth: 1,
          borderRadius: 8,
          marginTop: 22,
          alignItems: 'center',
          paddingHorizontal: 10,
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
          style={{flex: 1, marginLeft: 10}}
          onFocus={() => {
            refRBSheet.current.open();
          }}
          placeholderTextColor={_COLORS.Kodie_BlackColor}
        />
      </View>
      <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
        <FlatList
          data={results}
          keyExtractor={item => item.UAD_KEY.toString()}
          renderItem={({item}) => (
            <View
              style={{
                flex:1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 8,
              }}>
              <View style={{flexDirection: 'row',flex:1}}>
                {item.image_paths && item.image_paths.length > 0 ? (
                  <Image
                    source={{uri: item.image_paths[0]}}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 50 / 2,
                      borderWidth: 1,
                      borderColor: _COLORS?.Kodie_GrayColor,
                      alignSelf: 'center',
                    }}
                  />
                ) : (
                  <View
                    style={[{
                      borderColor: _COLORS?.Kodie_GrayColor,
                      justifyContent: "center",
                    }]}
                  >
                  <FontAwesome
                    name="user-circle"
                    size={48}
                    color={_COLORS.Kodie_GrayColor}
                  />
                  </View>
                )}
                <Text
                  style={{
                    flex:1,
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
                onPress={() => {handleSelect(item);
                  // Keyboard.dismiss();
                }}
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
                  {tempSelectedValues.some(user => user.UAD_KEY === item.UAD_KEY)
                    ? 'Added'
                    : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: _COLORS?.Kodie_WhiteColor,
        }}>
        <TouchableOpacity
          style={{paddingHorizontal: 25, paddingVertical: 12}}
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
            paddingHorizontal: 25,
            paddingVertical: 12,
            backgroundColor: _COLORS?.Kodie_BlackColor,
            borderRadius: 4,
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
    </KeyboardAvoidingView>
  );
};

export default GuestSelectionContent;
