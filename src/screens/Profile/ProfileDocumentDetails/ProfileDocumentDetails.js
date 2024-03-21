import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState, useRef} from 'react';
import ProfileDocumentDetailStyle from './ProfileDocumentDetailStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {_COLORS, IMAGES} from '../../../Themes';
import {Dropdown} from 'react-native-element-dropdown';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import {Config} from '../../../Config';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import EditDocumentsModal from '../../../components/Molecules/EditDocumentsModal/EditDocumentsModal';
import RNFetchBlob from 'rn-fetch-blob';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    PDUM_FILE_KEY: 155,
    PDUM_Account_id: null,
    PDUM_FILE_NAME: 'teodor-drobota-uyyRJA2an4o-unsplash.jpg',
    PDUM_FILE_PATH:
      'https://kodieapis.cylsys.com/upload/documents/teodor-drobota-uyyRJA2an4o-unsplash.jpg',
    PDUM_FILE_REFERENCE_KEY: 1119,
    PDUM_MODULE_NAME: 'Property',
    PDUM_SUB_MODULE_NAME: null,
  },
  {
    PDUM_FILE_KEY: 156,
    PDUM_Account_id: null,
    PDUM_FILE_NAME: 'teodor-drobota-uyyRJA2an4o-unsplash.jpg',
    PDUM_FILE_PATH:
      'https://kodieapis.cylsys.com/upload/documents/teodor-drobota-uyyRJA2an4o-unsplash.jpg',
    PDUM_FILE_REFERENCE_KEY: 1119,
    PDUM_MODULE_NAME: 'Property',
    PDUM_SUB_MODULE_NAME: null,
  },
];

const documentData = [
  {lookup_description: 'Copy of ID (with photo)', lookup_key: 170},
  {lookup_description: 'Move-in/Move-out cleaning', lookup_key: 171},
  {lookup_description: 'Deep cleaning', lookup_key: 172},
];
const ProfileDocumentDetails = props => {
  const navigation = useNavigation();

  const refRBSheet = useRef();
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginResponse.....', loginData);
  // console.log("user_account_id..", loginData?.Login_details?.user_account_id);
  const user_account_id = loginData?.Login_details?.user_account_id;
  console.log('Documents lookupId ....', props.documentLookUpType);
  console.log('Documents moduleName ....', props.ModuleName);
  const moduleName = props.ModuleName;
  const D_file_name = props.headingDocument;
  const folderId = props.folderId;
  // console.log("folderId in personalDocDetails...", folderId);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadDocData, setUploadDocData] = useState([]);
  const [uploadDocValue, setUploadDocValue] = useState('');
  const [selectFile, setSelectFile] = useState([]);
  const [documentLookupData, setDocumentLookupData] = useState([]);
  const [documentLookupDataValue, setDocumentLookupDataValue] = useState([]);
  const [documentLookupDataValueError, setDocumentLookupDataValueError] =
    useState(false);
  const [documentdataByModulename, setDocumentdataByModulename] = useState([]);
  const [fileKey, setFileKey] = useState(0);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const closeModal = () => {
    refRBSheet.current.close();
  };
  useEffect(() => {
    handleDocumentsLookup();
    getUploadedDocumentsByModule();
    // fetchData()
  }, []);
  // upload Document...
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
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

  // validation .....

  const handleUploadDocument = () => {
    if (documentLookupDataValue == '') {
      setDocumentLookupDataValueError(true);
    } else {
      selectDoc();
    }
  };
  // renderItem....
  const DocumentsData = ({item, index}) => {
    // setFileKey(item.PDUM_FILE_KEY);
    setFileName(item.PDUM_FILE_NAME);
    // setFilePath(item.PDUM_FILE_PATH);
    return (
      <>
        <View style={ProfileDocumentDetailStyle.container}>
          <View style={ProfileDocumentDetailStyle.pdfInfo}>
            {/* <Image source={IMAGES.document} style={ProfileDocumentDetailStyle.pdfIcon} /> */}
            <FontAwesome
              name="file-pdf-o"
              size={35}
              color={_COLORS.Kodie_BlackColor}
              resizeMode={'contain'}
            />
            <View style={ProfileDocumentDetailStyle.textContainer}>
              <Text style={ProfileDocumentDetailStyle.pdfName}>
                {item.PDUM_FILE_NAME}
              </Text>
              {/* <Text style={ProfileDocumentDetailStyle.pdfSize}>{item.pdfSize}</Text> */}
              <Text style={ProfileDocumentDetailStyle.pdfSize}>
                {' '}
                {'4.5 MB'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={ProfileDocumentDetailStyle.crossIcon}
            onPress={() => {
              refRBSheet.current.open();
              setFileKey(item.PDUM_FILE_KEY);
              setFilePath(item.PDUM_FILE_PATH);
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
  const documentDataRender = item => {
    return (
      <View style={ProfileDocumentDetailStyle.itemView}>
        {item.lookup_key === documentLookupDataValue ? (
          <AntDesign
            color={_COLORS.Kodie_GreenColor}
            name={'checkcircle'}
            size={20}
          />
        ) : (
          <Fontisto
            color={_COLORS.Kodie_GrayColor}
            name={'radio-btn-passive'}
            size={20}
          />
        )}
        <Text style={ProfileDocumentDetailStyle.textItem}>
          {item.lookup_description}
        </Text>
      </View>
    );
  };
  // Api intrigation...
  const uploadDocument = async doc => {
    // alert("upload");
    console.log('uri....', doc[0].uri);
    console.log('name....', doc[0].name);
    console.log('type....', doc[0].type);
    // console.log("p_referral_key....");
    // console.log("p_module_name....",);
    if (doc[0].size === null) {
      alert(
        'The selected document size is null. Please select a valid document.',
      );
      return;
    }
    const url = Config.BASE_URL;
    const uploadDoc_url = url + 'uploadDocument';
    console.log('Request URL:', uploadDoc_url);
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('documents', {
        uri: doc[0].uri,
        name: doc[0].name,
        type: doc[0].type,
      });
      formData.append('p_referral_key', user_account_id);
      formData.append('p_module_name', moduleName);
      formData.append('p_file_Name', D_file_name);
      formData.append('p_document_type', folderId ? 0 : 1);
      formData.append('p_sub_module_name', documentLookupDataValue);
      const response = await axios.post(uploadDoc_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('API Response uploadDocument:', response.data);
      if (response?.data?.success === true) {
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

  const handleDocumentsLookup = selectJobType => {
    const propertyData = {
      P_PARENT_CODE: props.documentLookUpType,
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const propertyType = url + 'lookup_details';
    console.log('Request URL:', propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then(response => {
        console.log('Document dropDown Type...', response.data);
        if (response?.data?.status === true) {
          setIsLoading(false);
          console.log(
            'Document dropDown Data.......',
            response?.data?.lookup_details,
          );
          setDocumentLookupData(response?.data?.lookup_details);
        } else {
          console.error('Document dropDown..._error:', response?.data?.error);
          alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Document dropDown Type error:', error);
        // alert(error);
        setIsLoading(false);
      });
  };
  const getUploadedDocumentsByModule = () => {
    const url = Config.BASE_URL;
    const getDocumentUrl = `${url}tanant_details/get/documents`;
    console.log('Request url....', getDocumentUrl);
    setIsLoading(true);
    const documentModuleData = {
      Module_Name: moduleName,
      fileReferenceKey: user_account_id,
    };

    console.log('documentModuleData....', JSON.stringify(documentModuleData));
    axios
      .post(
        getDocumentUrl,
        // params: documentModuleData,
        documentModuleData,
      )
      .then(response => {
        console.log('API Response getDocumentsByModule:', response.data);
        if (response?.data?.success == true) {
          setDocumentdataByModulename(response?.data?.data);
        }
      })
      .catch(error => {
        console.error('API failed_moduleName', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const deleteHandler = fileKey => {
    console.log('filekeyIn_delete....', fileKey);
    const dataToSend = {
      fileId: fileKey,
    };
    // const url = "https://e3.cylsys.com/api/v1/deletedocument";
    const url = Config.BASE_URL;
    const delete_url = url + 'deletedocument';
    console.log('url...', delete_url);
    setIsLoading(true);
    axios
      .patch(delete_url, dataToSend)
      .then(res => {
        console.log('res......', res);
        if (res?.data?.success === true) {
          alert(res?.data?.message);
          getUploadedDocumentsByModule();
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
            title: 'Storage Permission Required',
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
    const {config, fs} = RNFetchBlob;
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
    <View style={ProfileDocumentDetailStyle.mainContainer}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{alignSelf: 'center'}} onPress={props.onPress}>
          <Ionicons
            name="chevron-back-outline"
            color={_COLORS.Kodie_BlackColor}
            size={25}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <Text style={ProfileDocumentDetailStyle.documentheadingText}>
          {props.headingDocument || 'Identity document'}
        </Text>
      </View>
      <View style={ProfileDocumentDetailStyle.card}>
        <FlatList
          data={documentdataByModulename}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          keyExtractor={item => item?.id}
          renderItem={DocumentsData}
        />
      </View>
      <View>
        <Text style={ProfileDocumentDetailStyle.upload_doc_text}>
          {'Upload documents'}
        </Text>
        <Text style={ProfileDocumentDetailStyle.upload_doc_sub}>
          {
            'Documents should be formatted .pdf or .jpg or .png Size per file should not exceed 5 MB'
          }
        </Text>
      </View>
      <View style={{marginTop: 10}}>
        <Dropdown
          style={ProfileDocumentDetailStyle.dropdown}
          placeholderStyle={ProfileDocumentDetailStyle.placeholderStyle}
          selectedTextStyle={ProfileDocumentDetailStyle.selectedTextStyle}
          inputSearchStyle={ProfileDocumentDetailStyle.inputSearchStyle}
          iconStyle={ProfileDocumentDetailStyle.iconStyle}
          data={documentLookupData}
          // search
          maxHeight={300}
          labelField="lookup_description"
          valueField="lookup_key"
          placeholder="Select document"
          // searchPlaceholder="Search..."
          value={documentLookupDataValue}
          onChange={item => {
            setDocumentLookupDataValue(item.lookup_key);
            // alert(item.lookup_key)
            setDocumentLookupDataValueError(false);
          }}
          renderItem={documentDataRender}
        />
      </View>
      {documentLookupDataValueError ? (
        <Text style={ProfileDocumentDetailStyle.error_text}>
          {'Please select document type.'}
        </Text>
      ) : null}
      <View style={{marginBottom: 30}}>
        <CustomSingleButton
          leftImage={IMAGES.uploadIcon}
          isLeftImage={true}
          borderColor={_COLORS.Kodie_TransparentColor}
          _ButtonText={'Upload document'}
          backgroundColor={_COLORS.Kodie_lightGreenColor}
          onPress={() => {
            handleUploadDocument();
          }}
          disabled={isLoading ? true : false}
        />
      </View>
      <RBSheet
        ref={refRBSheet}
        height={Platform.OS === 'ios' ? 230 : 210}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: ProfileDocumentDetailStyle.bottomModal_container,
        }}>
        <View style={ProfileDocumentDetailStyle.subContainer}>
          <Text style={ProfileDocumentDetailStyle.Invite_tenant}>
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
          downloadFile={checkPermission}
          fileKey={fileKey}
          onpress={() => {
            navigation.navigate('ViewDocument', {
              filePath: filePath,
            });
            // alert('hello profile');
          }}
        />
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default ProfileDocumentDetails;

const styles = StyleSheet.create({});
