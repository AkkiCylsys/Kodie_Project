import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {DocumentsStyle} from './DocumentsStyle';
import {_COLORS, IMAGES} from '../../../../../Themes';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Config} from '../../../../../Config';
import EditDocumentsModal from '../../../../../components/Molecules/EditDocumentsModal/EditDocumentsModal';
import RNFetchBlob from 'rn-fetch-blob';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useIsFocused} from '@react-navigation/native';
import Share from 'react-native-share';
import {useNavigation} from '@react-navigation/native';
import FileViewer from 'react-native-file-viewer';
import axiosInstance from '../../../../../services/axiosInstance';

export default Documents = props => {
  const isfocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    {
      isfocused ? getAllDocuments() : null;
    }
    getUploadedDocumentsByModule('Property_documents');
    getUploadedDocumentsByModule('Lease');
    getUploadedDocumentsByModule('Tenant');
  }, [isfocused]);
  const property_id = props.property_id;
  console.log('property_id..', property_id);
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadDocData, setUploadDocData] = useState([]);
  const [fileKey, setFileKey] = useState(0);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [propertyDocByproperty, setpropertyDocByproperty] = useState([]);
  const [propertyDocByLease, setpropertyDocByLease] = useState([]);
  const [propertyDocByTenant, setpropertyDocByTenant] = useState([]);
  const [propertyDocBypropertylength, setpropertyDocBypropertylength] =
    useState('');
  const [propertyDocByLeaselength, setpropertyDocByLeaselength] = useState('');
  const [propertyDocByTenantlength, setpropertyDocByTenantlength] =
    useState('');
  const [showAllDocuments, setShowAllDocuments] = useState(false);
  const toggleShowAllDocuments = () => {
    setShowAllDocuments(!showAllDocuments);
  };
  const folderData = [
    {
      id: '1',
      moduleName: 'Property_documents',
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
  const refRBSheet = useRef();

  const closeModal = () => {
    refRBSheet.current.close();
  };
  // share doc....
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
    const delete_url = 'deletedocument';
    console.log('url...', delete_url);
    setIsLoading(true);
    axiosInstance
      .delete(delete_url, {
        data: dataToSend,
      })
      .then(res => {
        console.log('res......', res?.data);
        if (res?.data?.success === true) {
          Alert.alert('Success', res?.data?.message);
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
  const checkPermission = async () => {
    setIsLoading(true);
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission required!',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };
  const downloadImage = () => {
    setIsLoading(true);
    let date = new Date();
    let image_URL = REMOTE_PATH;
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/pdf_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'pdf',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        // alert("Image Downloaded Successfully.");
        Alert.alert('Success', 'File downloaded successfully.');
        setIsLoading(false);
        closeModal();
      });
  };

  const getExtention = fileName => {
    return /[.]/.exec(fileName) ? /[^.]+$/.exec(fileName) : undefined;
  };
  const DocumentsData = ({item, index}) => {
    setFileName(item.PDUM_FILE_NAME);

    return (
      <>
        <View style={DocumentsStyle.container}>
          <View style={DocumentsStyle.pdfInfo}>
            <FontAwesome
              name="file-pdf-o"
              size={35}
              color={_COLORS.Kodie_BlackColor}
              resizeMode={'contain'}
            />
            <View style={DocumentsStyle.textContainer}>
              <Text style={DocumentsStyle.pdfName}>{item.PDUM_FILE_NAME}</Text>
              {/* <Text style={DocumentsStyle.pdfSize}>{item.pdfSize}</Text> */}
              {/* <Text style={DocumentsStyle.pdfSize}> {'4.5 MB'}</Text> */}
            </View>
          </View>
          <TouchableOpacity
            style={DocumentsStyle.crossIcon}
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

  const folderRenderData = ({item, index}) => {
    return (
      <TouchableOpacity
        style={DocumentsStyle.folderView}
        onPress={() => {
          console.log('item.id:', item.id);
          props?.documentDetail(item.id, item.moduleName, property_id);
        }}>
        <View style={DocumentsStyle.folder_icon}>
          <Ionicons
            name="folder-outline"
            size={30}
            color={_COLORS.Kodie_GrayColor}
          />
        </View>
        <View>
          <Text style={DocumentsStyle.propertyDocText}>
            {item?.folderHeading}
          </Text>
          <Text
            style={DocumentsStyle.files_text}>{`${item.totalFile} Files`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Api intrigation ......
  // const getAllDocuments = () => {
  //   const url = Config.BASE_URL;
  //   const getDocument_url = `get/document/${property_id}`;
  //   console.log('Request URL:', getDocument_url);
  //   setIsLoading(true);

  //   axiosInstance
  //     .get(getDocument_url)
  //     .then(response => {
  //       console.log('API Response getDocuments:', response?.data);
  //       if (response?.data?.success === true) {
  //         setUploadDocData(response?.data?.data);
  //         console.log('getAlluploadDocData..', response?.data?.data);
  //       } else {
  //         setUploadDocData([]); // Handle no data scenario
  //         console.log('No documents found.');
  //       }
  //     })
  //     .catch(error => {
  //       if (error.response?.status === 404) {
  //         // Handle the 404 specifically
  //         setUploadDocData([]); // Set to empty array when no documents exist
  //         console.log('No documents found (404).');
  //       } else {
  //         console.error('API failed AllDocuments', error);
  //       }
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  const getAllDocuments = () => {
    const url = Config.BASE_URL;
    const getDocument_url = 'get/documents';
    console.log('Request URL:', getDocument_url);
    setIsLoading(true);

    const getAllDocPayload = {
      Module_Name: 'Property',
      fileReferenceKey: property_id,
    };
    axiosInstance
      .post(getDocument_url, getAllDocPayload)
      .then(response => {
        console.log('API Response getDocuments:', response?.data);
        if (response?.data?.status === true) {
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
    // const getDocumentUrl = url + 'tanant_details/get/documents';
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
            case 'Property_documents':
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
            // Alert.alert('Success', 'File downloaded and viewed successfully');
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error opening file:', error);
            Alert.alert('Warning', 'Failed to view file');
          });
      } else {
        FileViewer.open(res.path(), {showOpenWithDialog: true})
          .then(() => {
            // Alert.alert('Success', 'File downloaded and viewed successfully');
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error opening file:', error);
            Alert.alert('Warning', 'Failed to view file');
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      Alert.alert('Warning', 'Failed to download file');
    }
  };

  return (
    <View style={DocumentsStyle.mainContainer}>
      <ScrollView>
        <View style={DocumentsStyle.recentDocView}>
          <Text style={DocumentsStyle.reacentDocText}>{'Folders'}</Text>
          <Text style={DocumentsStyle.seeAllText}>{'See all'}</Text>
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
        <View style={DocumentsStyle.recentDocView}>
          <Text style={DocumentsStyle.reacentDocText}>
            {'Recent documents'}
          </Text>
          <TouchableOpacity onPress={toggleShowAllDocuments}>
            <Text style={DocumentsStyle.seeAllText}>
              {showAllDocuments ? 'Hide all' : 'See all'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={DocumentsStyle.card}>
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
            container: DocumentsStyle.bottomModal_container,
          }}>
          <View style={DocumentsStyle.submodalContainer}>
            <Text style={DocumentsStyle.Invite_tenant}>{'Edit document'}</Text>
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
            // // downloadFile={downloadFile}
            downloadFile={downloadviewFile}
            fileKey={fileKey}
            filePath={filePath}
            shareDocFile={shareDocFile}
            onpress={() => {
              // navigation.navigate('ViewDocument', {
              //   filePath: filePath,
              // });
              downloadviewFile();
            }}
          />
        </RBSheet>
      </ScrollView>
      {/* {isLoading ? <CommonLoader /> : null} */}
    </View>
  );
};
