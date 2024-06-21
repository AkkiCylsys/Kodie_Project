import {
  DocumentDetailStyleheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {DocumentDetailStyle} from './DocumentDetailStyle';
import TopHeader from '../../../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../../../services/CommonServices';
import CustomSingleButton from '../../../../../../components/Atoms/CustomButton/CustomSingleButton';
import {_COLORS, FONTFAMILY, IMAGES} from '../../../../../../Themes';
import Entypo from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker';
import {CommonLoader} from '../../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';
import EditDocumentsModal from '../../../../../../components/Molecules/EditDocumentsModal/EditDocumentsModal';
import RNFS from 'react-native-fs';
// import RNFetchBlob from 'rn-fetch-blob';
import {Config} from '../../../../../../Config';
import Share from 'react-native-share';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';

const DocumentDetails = props => {
  const navigation = useNavigation();

  const refRBSheet = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadDocData, setUploadDocData] = useState([]);
  const folderId = props.route.params?.folderId;
  const moduleName = props.route.params?.moduleName;
  const property_id = props.route.params?.property_id;
  const [selectFile, setSelectFile] = useState([]);
  const [fileKey, setFileKey] = useState(0);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [getuploadDocByModuleName, setGetuploadDocByModuleName] = useState([]);
  const file = selectFile[0];
  console.log('moduleName in Documents Details..', moduleName);
  //   alert(folderId);
  // alert(moduleName);
  // alert(property_id);
  console.log('property_id..', property_id);

  useEffect(() => {
    getUploadedDocumentsByModule();
  }, []);
  const closeModal = () => {
    refRBSheet.current.close();
  };
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          // DocumentPicker.types.doc,
          // DocumentPicker.types.docx,
          // DocumentPicker.types.images,
        ],
        allowMultiSelection: true,
      });
      //   const doc = await DocumentPicker.pickSingle({
      //     type: [
      //       DocumentPicker.types.pdf,
      //       DocumentPicker.types.doc,
      //       DocumentPicker.types.docx,
      //     ],
      //   });
      console.log('doc......', doc);
      setSelectFile(doc);
      await uploadDocument(doc);
      console.log('Documents.....', doc);
      console.log('selectFile.....', selectFile);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };
  const deleteHandler = fileKey => {
    console.log('filekeyIn_delete....', fileKey);
    const dataToSend = {
      fileId: fileKey,
    };
    const url = Config.BASE_URL;
    const delete_url = url + 'deletedocument';
    console.log('url...', delete_url);
    setIsLoading(true);
  
    axios
      .delete(delete_url, {
        data: dataToSend, // Send data as part of the config object
      })
      .then(res => {
        console.log('res......', res);
        if (res?.data?.success === true) {
          alert(res?.data?.message);
          closeModal();
        }
        getUploadedDocumentsByModule();
      })
      .catch(error => {
        console.error('Error deleting:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  const uploadDocument = async doc => {
    // alert("upload");
    console.log('uri....', doc[0].uri);
    console.log('name....', doc[0].name.replace(/\s/g, ''));
    console.log('type....', doc[0].type);
    console.log('p_referral_key....', property_id);
    console.log('p_module_name....', moduleName);
    const url = Config.BASE_URL;
    const uploadDoc_url = url + 'uploadDocument';
    console.log('Request URL:', uploadDoc_url);
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('documents', {
        uri: doc[0].uri,
        name: doc[0].name.replace(/\s/g, ''),
        type: doc[0].type,
      });
      formData.append('p_referral_key', property_id);
      formData.append('p_module_name', moduleName);
      // formData.append("p_sub_module_name", "Property documents");

      const response = await axios.post(uploadDoc_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('API Response uploadDocument:', response?.data);

      if (response?.data?.status === true) {
        alert(response?.data?.message);
        getUploadedDocumentsByModule();
      } else {
        alert(response?.data?.message);
      }
    } catch (error) {
      console.error('API failed uploadDocument', error);
      // alert(error);
    } finally {
      setIsLoading(false);
    }
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
  const getUploadedDocumentsByModule = () => {
    const url = Config.BASE_URL;
    const getDocumentUrl = url + 'get/documents';
    console.log('Request URL:', getDocumentUrl);
    setIsLoading(true);
    const documentModuleData = {
      Module_Name: moduleName,
      fileReferenceKey: property_id,
    };
    axios
      .post(getDocumentUrl, documentModuleData)
      .then(response => {
        console.log('API Response getDocumentsByModule:', response?.data);
        if (response?.data?.status == true) {
          setGetuploadDocByModuleName(response?.data?.data);
        }
      })
      .catch(error => {
        console.error('API failed_moduleName', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const DocumentsData = ({item, index}) => {
    return (
      <>
        <View style={DocumentDetailStyle.container}>
          <View style={DocumentDetailStyle.pdfInfo}>
            <Image
              source={IMAGES.document}
              style={DocumentDetailStyle.pdfIcon}
            />
            <View style={DocumentDetailStyle.textContainer}>
              <Text style={DocumentDetailStyle.pdfName}>{item.name}</Text>
              <Text style={DocumentDetailStyle.pdfSize}>
                {(item.size / (1024 * 1024)).toFixed(2)} MB
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={DocumentDetailStyle.crossIcon}
            onPress={() => {
              refRBSheet.current.open();
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
  const GetuploadedDocumentrender = ({item, index}) => {
    setFileName(item.PDUM_FILE_NAME);
    return (
      <>
        <View style={DocumentDetailStyle.container}>
          <View style={DocumentDetailStyle.pdfInfo}>
            <FontAwesome
              name="file-pdf-o"
              size={35}
              color={_COLORS.Kodie_BlackColor}
              resizeMode={'contain'}
            />
            <View style={DocumentDetailStyle.textContainer}>
              <Text style={DocumentDetailStyle.pdfName}>
                {item.PDUM_FILE_NAME}
              </Text>
              {/* <Text style={DocumentDetailStyle.pdfSize}>
                {'4.5 MB'}
              </Text> */}
            </View>
          </View>
          <TouchableOpacity
            style={DocumentDetailStyle.crossIcon}
            onPress={() => {
              refRBSheet.current.open();
              setFilePath(item.image_paths);
              setFileKey(item.PDUM_FILE_KEY);
              console.log('fileKey....', fileKey);
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

  // const REMOTE_PATH = `http://e3.cylsys.com/upload/documents/${fileName}`;
  const REMOTE_PATH = filePath;
  const checkPermission = async () => {
    setIsLoading(true);
    if (Platform.OS === 'ios') {
      downloadDocuments();
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
          downloadDocuments();
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
  const downloadDocuments = () => {
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
        console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
        setIsLoading(false);
        closeModal();
      });
  };

  const getExtention = fileName => {
    // To get the file extension
    return /[.]/.exec(fileName) ? /[^.]+$/.exec(fileName) : undefined;
  };

  return (
    <SafeAreaView style={DocumentDetailStyle.mainContainer}>
      <TopHeader
        MiddleText={
          folderId == 1
            ? 'Property documents'
            : folderId == 2
            ? 'Lease documents'
            : folderId == 3
            ? 'Tenant documents'
            : 'Property documents'
        }
        onPressLeftButton={() => _goBack(props)}
      />
      <ScrollView
        style={{
          marginHorizontal: 16,
        }}>
        <View style={{marginVertical: 18}}>
          <Text style={DocumentDetailStyle.upload_doc_text}>
            {'Upload documents'}
          </Text>
          <Text style={DocumentDetailStyle.upload_doc_sub}>
            {
              'Documents should be formatted .pdf or .jpg or .png Size per file should not exceed 5 MB'
            }
          </Text>
        </View>
        <View>
          <FlatList
            data={getuploadDocByModuleName}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            keyExtractor={(item, index) => index}
            renderItem={GetuploadedDocumentrender}
          />
        </View>
        <View style={{marginBottom: 30}}>
          <CustomSingleButton
            leftImage={IMAGES.uploadIcon}
            isLeftImage={true}
            borderColor={_COLORS.Kodie_TransparentColor}
            _ButtonText={'Upload'}
            backgroundColor={_COLORS.Kodie_lightGreenColor}
            onPress={() => {
              // uploadDocument();
              selectDoc();
            }}
            disabled={isLoading ? true : false}
          />
        </View>
        <RBSheet
          ref={refRBSheet}
          height={Platform.OS === 'ios' ? 260 : 260}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: DocumentDetailStyle.bottomModal_container,
          }}>
          <View style={DocumentDetailStyle.submodalContainer}>
            <Text style={DocumentDetailStyle.Invite_tenant}>
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
            // downloadFile={downloadFile}
            // downloadFile={checkPermission}
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
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default DocumentDetails;
