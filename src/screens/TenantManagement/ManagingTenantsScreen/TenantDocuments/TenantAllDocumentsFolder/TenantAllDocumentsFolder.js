import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TenantDocumentsFolder from '../TenantDocumentsFolder/TenantDocumentsFolder';
import TopHeader from '../../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../../services/CommonServices';
import {TenantAllDocumentsFolderStyle} from './TenantAllDocumentsFolderStyle';
import {_COLORS} from '../../../../../Themes';
import {Config} from '../../../../../Config';
import axios from 'axios';

const TenantAllDocumentsFolder = props => {
  const property_id = props.route.params?.property_id;
  const moduleName = props.route.params?.moduleName;
  const folderHeading = props.route.params?.folderHeading;
  const [propertyDocByproperty, setpropertyDocByproperty] = useState([]);
  const [propertyDocByLease, setpropertyDocByLease] = useState([]);
  const [propertyDocByTenant, setpropertyDocByTenant] = useState([]);
  const [propertyDocBypropertylength, setpropertyDocBypropertylength] =
    useState('');
  const [propertyDocByLeaselength, setpropertyDocByLeaselength] = useState('');
  const [propertyDocByTenantlength, setpropertyDocByTenantlength] =
    useState('');
  const [propertyDocByInspectionlength, setpropertyDocByInspectionlength] =
    useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUploadedDocumentsByModule('Property');
    getUploadedDocumentsByModule('Lease');
    getUploadedDocumentsByModule('Tenant');
    getUploadedDocumentsByModule('Inspection');
  }, []);

  const getUploadedDocumentsByModule = moduleName => {
    const url = Config.BASE_URL + 'get/documents';
    setIsLoading(true);
    const documentModuleData = {
      Module_Name: moduleName,
      fileReferenceKey: property_id,
    };

    axios
      .post(url, documentModuleData)
      .then(response => {
        if (response?.data?.status == true) {
          switch (moduleName) {
            case 'Property':
              setpropertyDocByproperty(response?.data?.data);
              setpropertyDocBypropertylength(response?.data?.data.length);
              break;
            case 'Lease':
              setpropertyDocByLease(response?.data?.data);
              setpropertyDocByLeaselength(response?.data?.data.length);
              break;
            case 'Tenant':
              setpropertyDocByTenant(response?.data?.data);
              setpropertyDocByTenantlength(response?.data?.data.length);
              break;
            case 'Inspection':
              setpropertyDocByInspectionlength(response?.data?.data.length);
              break;
            default:
              break;
          }
        }
      })
      .catch(error => {
        console.error(`API failed for ${moduleName}:`, error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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

  const folderRenderData = ({item}) => (
    <TouchableOpacity
      style={TenantAllDocumentsFolderStyle.folderView}
      onPress={() => {
        props.navigation.navigate('TenantDocumentsDetails', {
          property_id: property_id,
          moduleName: item?.moduleName,
          folderHeading: item?.folderHeading,
        });
      }}>
      <View style={TenantAllDocumentsFolderStyle.folder_icon}>
        <Ionicons
          name="folder-outline"
          size={30}
          color={_COLORS.Kodie_GrayColor}
        />
      </View>
      <View>
        <Text style={TenantAllDocumentsFolderStyle.propertyDocText}>
          {item?.folderHeading}
        </Text>
        <Text style={TenantAllDocumentsFolderStyle.files_text}>
          {`${item.totalFile} Files`}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={TenantAllDocumentsFolderStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'All folders'}
      />
      <View style={TenantAllDocumentsFolderStyle.subContainer}>
        <Text style={TenantAllDocumentsFolderStyle.AllFolderText}>
          {'All folders'}
        </Text>
        <View style={{alignSelf: 'center'}}>
          <FlatList
            data={folderData}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={folderRenderData}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TenantAllDocumentsFolder;
