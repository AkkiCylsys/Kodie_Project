import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import ManagingTenantData from '../../../../components/Molecules/ManagingTenant/ManagingUserData/ManagingTenantData';
import TopHeader from '../../../../components/Molecules/Header/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {TenantDocumentsStyle} from './TenantDocumentsStyle';
import {_COLORS} from '../../../../Themes';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import TenantDocumentsFolder from './TenantDocumentsFolder/TenantDocumentsFolder';
import {_goBack} from '../../../../services/CommonServices';
import {useIsFocused} from '@react-navigation/native';
import Share from 'react-native-share';
import {Config} from '../../../../Config';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import RBSheet from 'react-native-raw-bottom-sheet';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {ScrollView} from 'react-native-gesture-handler';
import axiosInstance from '../../../../services/axiosInstance';

const TenantDocuments = props => {
  const refRBSheet = useRef();
  const isfocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [moduleName, setModuleName] = useState('');
  const [folderHeading, setFolderHeading] = useState('');
  const [fileKey, setFileKey] = useState(0);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [uploadDocData, setUploadDocData] = useState([]);
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
  const [showAllDocuments, setShowAllDocuments] = useState(false);
  const property_id = props?.route?.params?.property_id;
  console.log('property_id in tenant documents...', property_id);
  useEffect(() => {
    {
      isfocused ? getAllDocuments() : null;
    }
    getUploadedDocumentsByModule('Property');
    getUploadedDocumentsByModule('Lease');
    getUploadedDocumentsByModule('Tenant');
  }, [isfocused]);
  const toggleShowAllDocuments = () => {
    setShowAllDocuments(!showAllDocuments);
  };
  const handleDocumentFolderPress = (id, moduleName, folderHeading) => {
    setModuleName(moduleName);
    setFolderHeading(moduleName);
    props.navigation.navigate('TenantDocumentsDetails', {
      property_id: property_id,
      folderId: id,
      moduleName: moduleName,
      folderHeading: folderHeading,
    });
  };

  const closeModal = () => {
    refRBSheet.current.close();
  };
  const shareDocFile = async () => {
    setTimeout(() => {
      Share.open({url: filePath})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    }, 300);
  };
  // delete Document...
  const deleteHandler = fileKey => {
    console.log('filekeyIn_delete....', fileKey);
    const dataToSend = {
      fileId: fileKey,
    };
    const url = Config.BASE_URL;
    const delete_url ='deletedocument';
    console.log('url...', delete_url);
    setIsLoading(true);
    axiosInstance
      .delete(delete_url, {
        data: dataToSend,
      })
      .then(res => {
        console.log('res......', res?.data);
        if (res?.data?.success === true) {
          alert(res?.data?.message);
          getAllDocuments();
          closeModal();
        }
      })
      .catch(error => {
        console.error('Error deleting:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // Download documents...
  const REMOTE_PATH = filePath;
  const getAllDocuments = () => {
    const url = Config.BASE_URL;
    const getDocument_url = `get/document/${property_id}`;
    console.log('Request URL:', getDocument_url);
    setIsLoading(true);

    axiosInstance
      .get(getDocument_url)
      .then(response => {
        console.log('API Response getDocuments:', response?.data);
        if (response?.data?.success === true) {
          setUploadDocData(response?.data?.data);
          console.log('getAlluploadDocData..', response?.data?.data);
        } else {
          setUploadDocData([]); // Handle no data scenario
          console.log('No documents found.');
        }
      })
      .catch(error => {
        if (error.response?.status === 404) {
          // Handle the 404 specifically
          setUploadDocData([]); // Set to empty array when no documents exist
          console.log('No documents found (404).');
        } else {
          console.error('API failed AllDocuments', error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getUploadedDocumentsByModule = moduleName => {
    const url = Config.BASE_URL;
    const getDocumentUrl = 'get/documents';
    console.log('Request URL:', getDocumentUrl);
    setIsLoading(true);
    const documentModuleData = {
      Module_Name: moduleName,
      fileReferenceKey: property_id,
    };
    axiosInstance
      .post(getDocumentUrl, documentModuleData)
      .then(response => {
        console.log(`API Response for ${moduleName}:`, response?.data);
        if (response?.data?.status == true) {
          switch (moduleName) {
            case 'Property':
              setpropertyDocByproperty(response?.data?.data);
              console.log('Length for property:', response?.data?.data.length);
              setpropertyDocBypropertylength(response?.data?.data.length);
              console.log(
                'setpropertyDocBypropertylength..',
                propertyDocBypropertylength,
              );

              break;
            case 'Lease':
              setpropertyDocByLease(response?.data?.data);
              console.log(
                'Length for propertyDocByLease:',
                response?.data?.data.length,
              );
              setpropertyDocByLeaselength(response?.data?.data.length);
              console.log(
                'propertyDocByLeaselength...',
                propertyDocByLeaselength,
              );
              break;
            case 'Tenant':
              setpropertyDocByTenant(response?.data?.data);
              console.log(
                'Length for propertyDocByTenant:',
                response?.data?.data.length,
              );
              setpropertyDocByTenantlength(response?.data?.data.length);
              console.log(
                'propertyDocByTenantlength..',
                propertyDocByTenantlength,
              );
              break;
            case 'Inspection':
              setpropertyDocByTenant(response?.data?.data);
              console.log(
                'Length for propertyDocByTenant:',
                response?.data?.data.length,
              );
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
  const downloadviewFile = async () => {
    setIsLoading(true);
    const date = new Date();
    const {
      dirs: {DownloadDir, DocumentDir},
    } = RNFetchBlob.fs;
    const isIOS = Platform.OS === 'ios';
    const aPath = Platform.select({ios: DocumentDir, android: DownloadDir});
    const fPath =
      aPath + '/' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.pdf';

    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: fPath,
        notification: true,
      },
      android: {
        fileCache: false,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: fPath,
          description: 'Downloading pdf...',
        },
      },
    });

    try {
      closeModal();
      const res = await RNFetchBlob.config(configOptions).fetch(
        'GET',
        filePath.trim(),
      );
      if (isIOS) {
        FileViewer.open(res.data, {showOpenWithDialog: true})
          .then(() => {
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error opening file:', error);
            Alert.alert('Error', 'Failed to view file');
          });
      } else {
        FileViewer.open(res.path(), {showOpenWithDialog: true})
          .then(() => {
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error opening file:', error);
            Alert.alert('Error', 'Failed to view file');
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      Alert.alert('Error', 'Failed to download file');
    }
  };
  const getExtention = fileName => {
    return /[.]/.exec(fileName) ? /[^.]+$/.exec(fileName) : undefined;
  };
  const DocumentsData = ({item, index}) => {
    return (
      <>
        <View style={TenantDocumentsStyle.container}>
          <View style={TenantDocumentsStyle.pdfInfo}>
            <FontAwesome
              name="file-pdf-o"
              size={35}
              color={_COLORS.Kodie_BlackColor}
              resizeMode={'contain'}
            />
            <View style={TenantDocumentsStyle.textContainer}>
              <Text style={TenantDocumentsStyle.pdfName}>
                {item.PDUM_FILE_NAME}
              </Text>
              {/* <Text style={DocumentsStyle.pdfSize}>{item.pdfSize}</Text> */}
              {/* <Text style={DocumentsStyle.pdfSize}> {'4.5 MB'}</Text> */}
            </View>
          </View>
          <TouchableOpacity
            style={TenantDocumentsStyle.crossIcon}
            onPress={() => {
              refRBSheet.current.open();
              setFilePath(item.image_paths[0]);
              setFileKey(item.PDUM_FILE_KEY);
            }}>
            <Entypo
              name="dots-three-vertical"
              size={20}
              color={_COLORS.Kodie_GrayColor}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={TenantDocumentsStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'View profile'}
      />
      <ManagingTenantData />
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={[TenantDocumentsStyle.locationText]}>
              {'Gadarwara'}
            </Text>
          </View>
        </View>
        <DividerIcon />
        <View style={TenantDocumentsStyle.recentDocView}>
          <Text style={TenantDocumentsStyle.reacentDocText}>{'Folders'}</Text>
          <TouchableOpacity
            onPress={() => {
              props?.navigation.navigate('TenantAllDocumentsFolder', {
                property_id: property_id,
                moduleName: moduleName,
                folderHeading: folderHeading,
              });
            }}>
            <Text style={TenantDocumentsStyle.seeAllText}>{'See all'}</Text>
          </TouchableOpacity>
        </View>
        <TenantDocumentsFolder
          onpress={handleDocumentFolderPress}
          propertyDocBypropertylength={propertyDocBypropertylength}
          propertyDocByLeaselength={propertyDocByLeaselength}
          propertyDocByTenantlength={propertyDocByTenantlength}
          propertyDocByInspectionlength={propertyDocByInspectionlength}
        />
        <View style={[TenantDocumentsStyle.recentDocView, {marginTop: 30}]}>
          <Text style={TenantDocumentsStyle.reacentDocText}>
            {'Recent documents'}
          </Text>
          <TouchableOpacity onPress={toggleShowAllDocuments}>
            <Text style={TenantDocumentsStyle.seeAllText}>
              {showAllDocuments ? 'Hide all' : 'See all'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={TenantDocumentsStyle.card}>
          <FlatList
            data={showAllDocuments ? uploadDocData : uploadDocData.slice(0, 0)}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            keyExtractor={item => item?.id}
            renderItem={DocumentsData}
          />
        </View>
        <RBSheet
          ref={refRBSheet}
          height={260}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: TenantDocumentsStyle.bottomModal_container,
          }}>
          <View style={TenantDocumentsStyle.submodalContainer}>
            <Text style={TenantDocumentsStyle.Invite_tenant}>
              {'Edit document'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}>
              <Entypo name="cross" size={25} color={_COLORS.Kodie_BlackColor} />
            </TouchableOpacity>
          </View>
          <EditDocumentsModal
            closemodal={closeModal}
            deleteHandler={deleteHandler}
            downloadFile={downloadviewFile}
            fileKey={fileKey}
            filePath={filePath}
            shareDocFile={shareDocFile}
            onpress={() => {
              downloadviewFile();
            }}
          />
        </RBSheet>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default TenantDocuments;

const styles = StyleSheet.create({});
