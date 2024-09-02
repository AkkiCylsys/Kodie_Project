import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {TenantDocumentsFolderStyle} from './TenantDocumentsFolderStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {_COLORS, FONTFAMILY} from '../../../../../Themes';
const TenantDocumentsFolder = props => {
  const {onpress,propertyDocBypropertylength,propertyDocByLeaselength,propertyDocByTenantlength,propertyDocByInspectionlength}= props
  const folderData = [
    {
      id: '1',
      moduleName: 'Property',
      folderHeading: 'Property documents',
      totalFile: propertyDocBypropertylength,
    },
    {
      id: '2',
      moduleName: 'Lease',
      folderHeading: 'Lease documents',
      totalFile: propertyDocByLeaselength,
    },
    {
      id: '3',
      moduleName: 'Tenant',
      folderHeading: 'Tenant documents',
      totalFile: propertyDocByTenantlength,
    },
    {
      id: '4',
      moduleName: 'Inspection',
      folderHeading: 'Inspection documents',
      totalFile: propertyDocByInspectionlength,
    },
  ];

  const folderRenderData = ({item, index}) => {
    return (
      <TouchableOpacity
        style={TenantDocumentsFolderStyle.folderView}
        onPress={() => {
          console.log('item.id:', item.id);
            props?.onpress(item?.id, item?.moduleName,item?.folderHeading);
        }}>
        <View style={TenantDocumentsFolderStyle.folder_icon}>
          <Ionicons
            name="folder-outline"
            size={30}
            color={_COLORS.Kodie_GrayColor}
          />
        </View>
        <View>
          <Text style={TenantDocumentsFolderStyle.propertyDocText}>
            {item?.folderHeading}
          </Text>
          <Text
            style={
              TenantDocumentsFolderStyle.files_text
            }>{`${item.totalFile} Files`}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{}}>
      <FlatList
        data={folderData}
        scrollEnabled   
        horizontal={true}    
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={item => item?.id}
        renderItem={folderRenderData}
      />
    </View>
  );
};

export default TenantDocumentsFolder;

const styles = StyleSheet.create({});
