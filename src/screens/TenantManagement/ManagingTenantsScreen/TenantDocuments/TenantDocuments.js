import React,{useState,useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import ManagingTenantData from '../../../../components/Molecules/ManagingTenant/ManagingUserData/ManagingTenantData';
import TopHeader from '../../../../components/Molecules/Header/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TenantDocumentsStyle} from './TenantDocumentsStyle';
import {_COLORS, FONTFAMILY} from '../../../../Themes';
import Documents from '../../../Landlord/AddNewProperty/PropertyReview/Documents/Documents';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';

const TenantDocuments = (props) => {
  const [propertyDocBypropertylength, setpropertyDocBypropertylength] =
    useState('');
  const [propertyDocByLeaselength, setpropertyDocByLeaselength] = useState('');
  const [propertyDocByTenantlength, setpropertyDocByTenantlength] =
    useState('');
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
  ];

  const folderRenderData = ({item, index}) => {
    return (
      <TouchableOpacity
        style={TenantDocumentsStyle.folderView}
        onPress={() => {
          console.log('item.id:', item.id);
        //   props?.documentDetail(item.id, item.moduleName, property_id);
        }}>
        <View style={TenantDocumentsStyle.folder_icon}>
          <Ionicons
            name="folder-outline"
            size={30}
            color={_COLORS.Kodie_GrayColor}
          />
        </View>
        <View>
          <Text style={TenantDocumentsStyle.propertyDocText}>
            {item?.folderHeading}
          </Text>
          <Text
            style={TenantDocumentsStyle.files_text}>{`${item.totalFile} Files`}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={TenantDocumentsStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'View profile'}
      />
      <ManagingTenantData />
      <View style={TenantDocumentsStyle.ApartmentMainView}>
        <Text style={TenantDocumentsStyle.apartmentText}>{'Apartments'}</Text>
        <Text style={TenantDocumentsStyle.cityText}>{'gadarwara'}</Text>
        <View style={TenantDocumentsStyle.flat_MainView}>
          <MaterialCommunityIcons
            name={'map-marker'}
            size={15}
            color={_COLORS.Kodie_GreenColor}
            style={{marginTop: 10}}
          />
          <Text style={[TenantDocumentsStyle.locationText]}>{'Gadarwara'}</Text>
        </View>
      </View>
      {/* <Documents/> */}
      <DividerIcon />
      <View style={TenantDocumentsStyle.recentDocView}>
        <Text style={TenantDocumentsStyle.reacentDocText}>{'Folders'}</Text>
        <Text style={TenantDocumentsStyle.seeAllText}>{'See all'}</Text>
      </View>
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
    </SafeAreaView>
  );
};

export default TenantDocuments;

const styles = StyleSheet.create({});
