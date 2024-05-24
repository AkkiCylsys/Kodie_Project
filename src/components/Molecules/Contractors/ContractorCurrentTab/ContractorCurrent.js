import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { _COLORS } from '../../../../Themes';
import { ContractorCurrentStyle } from './ContractorCurrentStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    Data: 'View / edit contractor details',
    Icon: (
      <MaterialIcons
        name="preview"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={'contain'}
        style={{ alignSelf: 'center' }}
      />
    ),
  },
  {
    id: '2',
    Data: 'Request new quote',
    Icon: (
      <Ionicons
        name="document-outline"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={'contain'}
        style={{ alignSelf: 'center' }}
      />
    ),
  },
  {
    id: '3',
    Data: 'Create notice / reminder',
    Icon: (
      <Ionicons
        name="mail-unread-outline"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={'contain'}
        style={{ alignSelf: 'center' }}
      />
    ),
  },
  {
    id: '4',
    Data: 'Message contractor',
    Icon: (
      <Feather
        name="message-circle"
        size={30}
        color={_COLORS.Kodie_GreenColor}
        resizeMode={'contain'}
        style={{ alignSelf: 'center' }}
      />
    ),
  },
];

const ContractorCurrent = props => {
  const navigation = useNavigation();

  const ContractorsImageContent = ({ item }) => {
    return (
      <TouchableOpacity
        style={ContractorCurrentStyle.content_View}
        onPress={() => {
          if (item.id === '1') {
            navigation.navigate('AddContractorDetail');
          }
          if (item.id === '3') {
            navigation.navigate('Notices');
          }
        }}
      >
        <View style={ContractorCurrentStyle.Bottomcontainer}>
          <Text style={ContractorCurrentStyle.IconView}>{item.Icon}</Text>
        </View>
        <Text style={ContractorCurrentStyle.text}>{item.Data}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={ContractorCurrentStyle.mainContainer}>
      <View style={ContractorCurrentStyle.upload_View}></View>
      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={item => item?.id}
        renderItem={ContractorsImageContent}
      />
    </View>
  );
};

export default ContractorCurrent;
