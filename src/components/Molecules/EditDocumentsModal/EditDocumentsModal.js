import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {IMAGES} from '../../../Themes';
import {useNavigation} from '@react-navigation/native';
import {_COLORS} from '../../../Themes';
import {EditDocumentsModalStyle} from './EditDocumentsModalStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const data = [
  {
    id: '1',
    title: 'View document',
    image: (
      <MaterialIcons
        name="preview"
        size={25}
        color={_COLORS.Kodie_GreenColor}
        style={{alignSelf: 'center'}}
      />
    ),
  },
  {
    id: '2',
    title: 'Delete document',
    image: (
      <MaterialIcons
        name="delete-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
        style={{alignSelf: 'center'}}
      />
    ),
  },
  {
    id: '3',
    title: 'Download document',
    image: (
      <MaterialCommunityIcons
        name="download-box"
        size={25}
        color={_COLORS.Kodie_GreenColor}
        style={{alignSelf: 'center'}}
      />
    ),
  },
  {
    id: '4',
    title: 'Share document',
    image: (
      <Fontisto
        name="share-a"
        size={20}
        color={_COLORS.Kodie_GreenColor}
        style={{alignSelf: 'center'}}
      />
    ),
  },
];

export default EditDocumentsModal = props => {
  const property_id = props.property_id;
  const closemodal = props.closemodal;
  const deleteHandler = props.deleteHandler;
  const shareDocFile = props.shareDocFile;
  const downloadFile = props.downloadFile;
  const fileKey = props.fileKey;
  const filePath = props.filePath;
  // alert(fileKey)
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={EditDocumentsModalStyle.Main_View}
      onPress={() => {
        if (item.id === '1') {
          props.onpress();
        }
        if (item.id === '2') {
          deleteHandler(fileKey);
        }
        if (item.id === '3') {
          downloadFile();
        }
        if (item.id === '4') {
          shareDocFile(filePath);
          closemodal();
        }
      }}>
      {/* <Image source={item.image} style={EditDocumentsModalStyle.IconView} /> */}
      <View style={EditDocumentsModalStyle.IconView}>{item.image}</View>
      <Text style={EditDocumentsModalStyle.Invite_Data_Text}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={EditDocumentsModalStyle.mainContainer}>
      <View style={EditDocumentsModalStyle.subContainer}>
        <Text style={EditDocumentsModalStyle.Invite_tenant}>
          {'Edit document'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            closemodal();
          }}>
          <Entypo name="cross" size={25} color={_COLORS.Kodie_BlackColor} />
        </TouchableOpacity>
      </View>
      <View style={EditDocumentsModalStyle.All_Data_View}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
  );
};
