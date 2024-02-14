import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {DocumentsStyle} from './DocumentsStyle';
import {FONTFAMILY, LABEL_STYLES} from '../../../../../Themes';
import {_COLORS, IMAGES} from '../../../../../Themes';
import {Dropdown} from 'react-native-element-dropdown';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import UploadImageData from '../../../../../components/Molecules/UploadImage/UploadImage';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomDropdown from '../../../../../components/Molecules/CustomDropdown/CustomDropdown';
import {colors} from '../../../../../Themes/CommonColors/CommonColor';
import {fontFamily} from '../../../../../Themes/FontStyle/FontStyle';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {Config} from '../../../../../Config';
import EditDocumentsModal from '../../../../../components/Molecules/EditDocumentsModal/EditDocumentsModal';
import RNFetchBlob from 'rn-fetch-blob';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useNavigation} from '@react-navigation/native';
const Property_documents = [
  'All',
  'Pre+post inspection reports',
  'Property images',
  'Property floor plan',
];

const Lease_documents = [
  'All',
  'Rental invoices',
  'Lease agreement',
  'Expense bills',
];

const Tenant_documents = [
  'All',
  'Tenant screening report',
  'Copy of ID without photo',
  'Copy of ID with photo',
];
const data = [
  {
    id: '1',
    pdfName: 'Pre+post inspection reports',
    pdfSize: '4.8MB',
  },
  {
    id: '2',
    pdfName: 'Pre-inspection-checklist.pdf',
    pdfSize: '1.3MB',
  },
  {
    id: '3',
    pdfName: 'Pre-inspection-checklist.pdf',
    pdfSize: '2.2MB',
  },
];
const folderData = [
  {
    id: '1',
    moduleName: 'Property',
    folderHeading: 'Property documents',
    totalFile: '12 Files',
  },
  {
    id: '2',
    moduleName: 'Lease',
    folderHeading: 'Lease documents',
    totalFile: '13 Files',
  },
  {
    id: '3',
    moduleName: 'Tenant',
    folderHeading: 'Tenant documents',
    totalFile: '15 Files',
  },
];

// ----data come from dropdown and define these condition
const handleApply = selectedOptions => {
  console.log('Clear Action');
};
const handleClear = () => {
  console.log('Clear Action');
};

export default Documents = props => {
  const navigation = useNavigation();
  useEffect(() => {
    getAllDocuments();
  }, []);
  const property_id = props.property_id;
  // alert(props.property_id);
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadDocData, setUploadDocData] = useState([]);
  const [fileKey, setFileKey] = useState(0);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const refRBSheet = useRef();

  const closeModal = () => {
    refRBSheet.current.close();
  };
  // delete Document...
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
          closeModal();
        }
        getAllDocuments();
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
  const DocumentsData = ({item, index}) => {
    setFileKey(item.PDUM_FILE_KEY);
    setFileName(item.PDUM_FILE_NAME);
    return (
      <>
        <View style={DocumentsStyle.container}>
          <View style={DocumentsStyle.pdfInfo}>
            {/* <Image source={IMAGES.document} style={DocumentsStyle.pdfIcon} /> */}
            <FontAwesome
              name="file-pdf-o"
              size={35}
              color={_COLORS.Kodie_BlackColor}
              resizeMode={'contain'}
            />
            <View style={DocumentsStyle.textContainer}>
              <Text style={DocumentsStyle.pdfName}>{item.PDUM_FILE_NAME}</Text>
              {/* <Text style={DocumentsStyle.pdfSize}>{item.pdfSize}</Text> */}
              <Text style={DocumentsStyle.pdfSize}> {'4.5 MB'}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={DocumentsStyle.crossIcon}
            onPress={() => {
              refRBSheet.current.open();
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

  const folderRenderData = ({item, index}) => {
    return (
      <TouchableOpacity
        style={DocumentsStyle.folderView}
        // onPress={() => {
        //   props.navigation.navigate("DocumentDetails");
        //   alert(item?.id)
        // }}
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
          <Entypo
            name="dots-three-vertical"
            size={25}
            color={_COLORS.Kodie_GrayColor}
          />
        </View>
        <View>
          <Text style={DocumentsStyle.propertyDocText}>
            {item?.folderHeading}
          </Text>
          <Text style={DocumentsStyle.files_text}>{'12 files'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Api intrigation ......
  const getAllDocuments = () => {
    const url = Config.BASE_URL;
    const getDocument_url = url + `tanant_details/get/document/${property_id}`;
    // const getDocument_url = url + `tanant_details/get/document/${15}`;
    console.log('Request URL:', getDocument_url);
    setIsLoading(true);
    axios
      .get(getDocument_url)
      .then(response => {
        console.log('API Response getDocuments:', response.data);
        if (response.data.success === true) {
          // alert(response.data.message);
          setUploadDocData(response.data.data);
          console.log('getAlluploadDocData..', response.data.data);
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <View style={DocumentsStyle.mainContainer}>
      <ScrollView>
        <View style={DocumentsStyle.recentDocView}>
          <Text style={DocumentsStyle.reacentDocText}>{'Folders'}</Text>
          <Text style={DocumentsStyle.seeAllText}>{'See all'}</Text>
        </View>
        <View style={{marginBottom: 50}}>
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
          <Text style={DocumentsStyle.seeAllText}>{'See all'}</Text>
        </View>
        <View style={DocumentsStyle.card}>
          <FlatList
            data={uploadDocData}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            keyExtractor={item => item?.id}
            renderItem={DocumentsData}
          />
        </View>
        <RBSheet
          ref={refRBSheet}
          height={215}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: DocumentsStyle.bottomModal_container,
          }}>
          <EditDocumentsModal
            closemodal={closeModal}
            deleteHandler={deleteHandler}
            // // downloadFile={downloadFile}
            downloadFile={checkPermission}
            fileKey={fileKey}
            onpress={() => {
              navigation.navigate('ViewDocument', {
                filePath: filePath,
              });
            }}
          />
        </RBSheet>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
