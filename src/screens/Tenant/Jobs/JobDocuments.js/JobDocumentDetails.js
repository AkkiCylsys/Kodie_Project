import {
  JobDocumentDetailStyleheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  PermissionsAndroid,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { JobDocumentDetailStyle } from "./JobDocumentDetailStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, IMAGES } from "../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import DocumentPicker from "react-native-document-picker";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";
import axios from "axios";
import RBSheet from "react-native-raw-bottom-sheet";
import EditDocumentsModal from "../../../../components/Molecules/EditDocumentsModal/EditDocumentsModal";
// import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
import { Config } from "../../../../Config";
const JobDocumentDetails = (props) => {
  const refRBSheet = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadDocData, setUploadDocData] = useState([]);
  const folderId = props.route.params?.folderId;
  const moduleName = props.route.params?.moduleName;
  const JOB_ID = props.route.params?.JOB_ID;
  const [selectFile, setSelectFile] = useState([]);
  const [fileKey, setFileKey] = useState(0);
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");
  const file = selectFile[0];
  //   alert(folderId);
  // alert(moduleName);
  // alert(JOB_ID);

  useEffect(() => {
    getuploadedDocuments();
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
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.images,
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
      console.log("doc......", doc);
      setSelectFile(doc);
      await uploadDocument(doc);
      console.log("Documents.....", doc);
      console.log("selectFile.....", selectFile);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log("User cancelled the upload", err);
      else console.log(err);
    }
  };
  const deleteHandler = (fileKey) => {
    console.log("filekeyIn_delete....", fileKey);
    const dataToSend = {
      fileId: fileKey,
    };
    // const url = "https://e3.cylsys.com/api/v1/deletedocument";
    const url = Config.BASE_URL;
    const delete_url = url + "deletedocument";
    console.log("url...", delete_url);
    setIsLoading(true);
    axios
      .patch(delete_url, dataToSend)
      .then((res) => {
        console.log("res......", res);
        if (res?.data?.success === true) {
          alert(res?.data?.message);
          closeModal();
        }
        getuploadedDocuments();
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const uploadDocument = async (doc) => {
    // alert("upload");
    console.log("uri....", doc[0].uri);
    console.log("name....", doc[0].name);
    console.log("type....", doc[0].type);
    console.log("p_referral_key....", JOB_ID);
    console.log("p_module_name....", moduleName);
    const url = Config.BASE_URL;
    const uploadDoc_url = url + "uploadDocument";
    console.log("Request URL:", uploadDoc_url);
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("documents", {
        uri: doc[0].uri,
        name: doc[0].name,
        type: doc[0].type,
      });
      formData.append("p_referral_key", JOB_ID);
      formData.append("p_module_name", moduleName);
      // formData.append("p_sub_module_name", "Property documents");

      const response = await axios.post(uploadDoc_url, formData);

      console.log("API Response uploadDocument:", response.data);

      if (response.data.success === true) {
        alert(response.data.message);
        // props.navigation.pop();
        getuploadedDocuments();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("API failed", error);
      alert(error);
      // Handle network errors more gracefully
      // if (!error.response) {
      //   alert("Network error. Please check your internet connection.");
      // } else {
      //   alert(error.response.data.message);
      // }
    } finally {
      setIsLoading(false);
    }
  };

  const getuploadedDocuments = () => {
    const url = Config.BASE_URL;
    const getDocument_url = url + `tanant_details/get/document/${JOB_ID}`;
    console.log("Request URL:", getDocument_url);
    setIsLoading(true);
    axios
      .get(getDocument_url)
      .then((response) => {
        console.log("API Response getDocuments:", response.data);
        if (response.data.success === true) {
          // alert(response.data.message);
          setUploadDocData(response.data.data);
          console.log("uploadDocData..", response.data.data);
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const getUploadedDocumentsByModule = () => {
    const url = Config.BASE_URL;
    const getDocumentUrl = url + "tanant_details/get/documents";
    console.log("Request URL:", getDocumentUrl);
    setIsLoading(true);
    const documentModuleData = {
      Module_Name: "Lease",
    };
    axios
      .get(getDocumentUrl, documentModuleData)
      .then((response) => {
        console.log("API Response getDocumentsByModule:", response.data);
      })
      .catch((error) => {
        console.error("API failed_moduleName", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const DocumentsData = ({ item, index }) => {
    return (
      <>
        <View style={JobDocumentDetailStyle.container}>
          <View style={JobDocumentDetailStyle.pdfInfo}>
            <Image
              source={IMAGES.document}
              style={JobDocumentDetailStyle.pdfIcon}
            />
            <View style={JobDocumentDetailStyle.textContainer}>
              <Text style={JobDocumentDetailStyle.pdfName}>{item.name}</Text>
              <Text style={JobDocumentDetailStyle.pdfSize}>
                {(item.size / (1024 * 1024)).toFixed(2)} MB
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={JobDocumentDetailStyle.crossIcon}
            onPress={() => {
              refRBSheet.current.open();
            }}
          >
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
  const GetuploadedDocumentrender = ({ item, index }) => {
    setFileKey(item.PDUM_FILE_KEY);
    setFileName(item.PDUM_FILE_NAME);
    setFilePath(item.PDUM_FILE_PATH);
    console.log("fileKey....", fileKey);
    return (
      <>
        <View style={JobDocumentDetailStyle.container}>
          <View style={JobDocumentDetailStyle.pdfInfo}>
            <Image
              source={IMAGES.document}
              style={JobDocumentDetailStyle.pdfIcon}
            />
            <View style={JobDocumentDetailStyle.textContainer}>
              <Text style={JobDocumentDetailStyle.pdfName}>
                {item.PDUM_FILE_NAME}
              </Text>
              <Text style={JobDocumentDetailStyle.pdfSize}>
                {/* {(item.size / (1024 * 1024)).toFixed(2)} MB */}
                {"4.5 MB"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={JobDocumentDetailStyle.crossIcon}
            onPress={() => {
              refRBSheet.current.open();
            }}
          >
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
    if (Platform.OS === "ios") {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message: "App needs access to your storage to download Photos",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log("Storage Permission Granted.");
          downloadImage();
        } else {
          // If permission denied then show alert
          alert("Storage Permission Not Granted");
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
    ext = "." + ext[0];
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          "/pdf_" +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: "pdf",
      },
    };
    config(options)
      .fetch("GET", image_URL)
      .then((res) => {
        // Showing alert after successful downloading
        console.log("res -> ", JSON.stringify(res));
        // alert("Image Downloaded Successfully.");
        alert("File Downloaded Successfully.");
        setIsLoading(false);
        closeModal();
      });
  };

  const getExtention = (fileName) => {
    // To get the file extension
    return /[.]/.exec(fileName) ? /[^.]+$/.exec(fileName) : undefined;
  };

  return (
    <View style={JobDocumentDetailStyle.mainContainer}>
      <TopHeader
        MiddleText={
          folderId == 1
            ? "Job proposal"
            : folderId == 2
            ? "Invoice & proof of payment"
            : folderId == 3
            ? "Proof of work completed"
            : "Job proposal"
        }
        onPressLeftButton={() => _goBack(props)}
      />
      <ScrollView
        style={{
          marginHorizontal: 16,
        }}
      >
        {/* <View style={{}}>
         <CustomSingleButton
           leftImage={IMAGES.uploadIcon}
           isLeftImage={true}
           borderColor={_COLORS.Kodie_TransparentColor}
           _ButtonText={"Select Documents"}
           backgroundColor={_COLORS.Kodie_lightGreenColor}
           onPress={() => {
             selectDoc();
           }}
           disabled={isLoading ? true : false}
         />
       </View> */}
        {/* <View>
         <Text style={JobDocumentDetailStyle.property_doc_text}>
           {folderId == 1
             ? "Property documents"
             : folderId == 2
             ? "Lease documents"
             : folderId == 3
             ? "Tenant documents"
             : "Property documents"}
         </Text>
       </View> */}

        {/* <FlatList
         data={selectFile}
         scrollEnabled
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={{}}
         keyExtractor={(item, index) => index}
         renderItem={DocumentsData}
       /> */}
        <View>
          <Text style={JobDocumentDetailStyle.upload_doc_text}>
            {"Upload documents"}
          </Text>
          <Text style={JobDocumentDetailStyle.upload_doc_sub}>
            {
              "Documents should be formatted .pdf or .jpg or .png Size per file should not exceed 5 MB"
            }
          </Text>
        </View>
        <View>
          <FlatList
            data={uploadDocData}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            keyExtractor={(item, index) => index}
            renderItem={GetuploadedDocumentrender}
          />
        </View>
        <View style={{ marginBottom: 30 }}>
          <CustomSingleButton
            leftImage={IMAGES.uploadIcon}
            isLeftImage={true}
            borderColor={_COLORS.Kodie_TransparentColor}
            _ButtonText={"Upload"}
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
          height={220}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: JobDocumentDetailStyle.bottomModal_container,
          }}
        >
          <EditDocumentsModal
            closemodal={closeModal}
            deleteHandler={deleteHandler}
            // downloadFile={downloadFile}
            downloadFile={checkPermission}
            fileKey={fileKey}
            onpress={() => {
              props.navigation.navigate("ViewDocument");
            }}
          />
        </RBSheet>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default JobDocumentDetails;