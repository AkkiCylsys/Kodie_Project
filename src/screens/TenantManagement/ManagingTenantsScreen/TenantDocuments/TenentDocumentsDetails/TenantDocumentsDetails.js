import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import TopHeader from '../../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../../services/CommonServices';
import {TenantDocumentsDetailsStyle} from './TenantDocumentsDetailsStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {_COLORS, FONTFAMILY, IMAGES} from '../../../../../Themes';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import EditDocumentsModal from '../../../../../components/Molecules/EditDocumentsModal/EditDocumentsModal';
import RBSheet from 'react-native-raw-bottom-sheet';
import DocumentPicker from 'react-native-document-picker';
import {Config} from '../../../../../Config';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import Share from 'react-native-share';
import axiosInstance from '../../../../../services/axiosInstance';
const TenantDocumentsDetails = props => {
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet = useRef();
  //   const folderId = props.route.params?.folderId;
  const moduleName = props.route.params?.moduleName;
  const property_id = props.route.params?.property_id;
  const folderHeading = props.route.params?.folderHeading;
  console.log('modulname or propertyDI...', moduleName, property_id);
  const [selectFile, setSelectFile] = useState([]);
  const [fileKey, setFileKey] = useState(0);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [getuploadDocByModuleName, setGetuploadDocByModuleName] = useState([]);
  const file = selectFile[0];
  useEffect(() => {
    getUploadedDocumentsByModule();
  }, []);

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
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
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
  const uploadDocument = async doc => {
    // alert("upload");
    console.log('uri....', doc[0].uri);
    console.log('name....', doc[0].name.replace(/\s/g, ''));
    console.log('type....', doc[0].type);
    console.log('p_referral_key....', property_id);
    console.log('p_module_name....', moduleName);
    const url = Config.BASE_URL;
    const uploadDoc_url ='uploadDocument';
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

      const response = await axiosInstance.post(uploadDoc_url, formData, {
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
  const getUploadedDocumentsByModule = () => {
    const url = Config.BASE_URL;
    const getDocumentUrl ='get/documents';
    console.log('Request URL:', getDocumentUrl);
    setIsLoading(true);
    const documentModuleData = {
      Module_Name: moduleName,
      fileReferenceKey: property_id,
    };
    axiosInstance
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
        <View style={TenantDocumentsDetailsStyle.container}>
          <View style={TenantDocumentsDetailsStyle.pdfInfo}>
            <FontAwesome
              name="file-pdf-o"
              size={35}
              color={_COLORS.Kodie_BlackColor}
              resizeMode={'contain'}
            />
            <View style={TenantDocumentsDetailsStyle.textContainer}>
              <Text style={TenantDocumentsDetailsStyle.pdfName}>
                {item.PDUM_FILE_NAME}
              </Text>
              {/* <Text style={DocumentsStyle.pdfSize}>{item.pdfSize}</Text> */}
              {/* <Text style={DocumentsStyle.pdfSize}> {'4.5 MB'}</Text> */}
            </View>
          </View>
          <TouchableOpacity
            style={TenantDocumentsDetailsStyle.crossIcon}
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
    <SafeAreaView style={TenantDocumentsDetailsStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={folderHeading ? folderHeading : 'Tenant documents'}
      />
      <Text style={TenantDocumentsDetailsStyle.reacentDocText}>
        {folderHeading ? folderHeading : 'Recent documents'}
      </Text>
      <View style={TenantDocumentsDetailsStyle.card}>
        <FlatList
          data={getuploadDocByModuleName}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          keyExtractor={item => item?.id}
          renderItem={DocumentsData}
        />
      </View>
      <View style={{marginHorizontal: 16}}>
        <Text style={TenantDocumentsDetailsStyle.upload_doc_text}>
          {'Upload documents'}
        </Text>
        <Text style={TenantDocumentsDetailsStyle.upload_doc_sub}>
          {
            'Documents should be formatted .pdf or .jpg or .png. Size per file should not exceed 5 MB.'
          }
        </Text>
      </View>
      <View style={{marginHorizontal: 16}}>
        <CustomSingleButton
          leftImage={IMAGES.uploadIcon}
          isLeftImage={true}
          borderColor={_COLORS.Kodie_TransparentColor}
          _ButtonText={'Upload documents'}
          backgroundColor={_COLORS.Kodie_lightGreenColor}
          onPress={() => {
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
          container: TenantDocumentsDetailsStyle.bottomModal_container,
        }}>
        <View style={TenantDocumentsDetailsStyle.submodalContainer}>
          <Text style={TenantDocumentsDetailsStyle.Invite_tenant}>
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
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default TenantDocumentsDetails;
