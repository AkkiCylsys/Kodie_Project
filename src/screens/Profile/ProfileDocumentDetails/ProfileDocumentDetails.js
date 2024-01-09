import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import ProfileDocumentDetailStyle from "./ProfileDocumentDetailStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import { _COLORS, IMAGES } from "../../../Themes";
import { Dropdown } from "react-native-element-dropdown";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import DocumentPicker from "react-native-document-picker";
import axios from "axios";
import { Config } from "../../../Config";
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const data = [
  {
    PDUM_FILE_KEY: 155,
    PDUM_Account_id: null,
    PDUM_FILE_NAME: "teodor-drobota-uyyRJA2an4o-unsplash.jpg",
    PDUM_FILE_PATH:
      "https://e3.cylsys.com/upload/documents/teodor-drobota-uyyRJA2an4o-unsplash.jpg",
    PDUM_FILE_REFERENCE_KEY: 1119,
    PDUM_MODULE_NAME: "Property",
    PDUM_SUB_MODULE_NAME: null,
  },
  {
    PDUM_FILE_KEY: 156,
    PDUM_Account_id: null,
    PDUM_FILE_NAME: "teodor-drobota-uyyRJA2an4o-unsplash.jpg",
    PDUM_FILE_PATH:
      "https://e3.cylsys.com/upload/documents/teodor-drobota-uyyRJA2an4o-unsplash.jpg",
    PDUM_FILE_REFERENCE_KEY: 1119,
    PDUM_MODULE_NAME: "Property",
    PDUM_SUB_MODULE_NAME: null,
  },
];

const documentData = [
  { lookup_description: "Copy of ID (with photo)", lookup_key: 170 },
  { lookup_description: "Move-in/Move-out cleaning", lookup_key: 171 },
  { lookup_description: "Deep cleaning", lookup_key: 172 },
];
const ProfileDocumentDetails = (props) => {
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse.....", loginData);
  // console.log("user_account_id..", loginData?.Login_details?.user_account_id);
  const user_account_id = loginData?.Login_details?.user_account_id;
  console.log("Documents lookupId ....", props.documentLookUpType);
  console.log("Documents moduleName ....", props.ModuleName);
  const moduleName = props.ModuleName;
  const D_file_name = props.headingDocument;
  const [isLoading, setIsLoading] = useState(false);
  const [uploadDocData, setUploadDocData] = useState([]);
  const [uploadDocValue, setUploadDocValue] = useState("");
  const [selectFile, setSelectFile] = useState([]);
  const [documentLookupData, setDocumentLookupData] = useState([]);
  const [documentLookupDataValue, setDocumentLookupDataValue] = useState([]);
  const [documentdataByModulename, setDocumentdataByModulename] = useState([]);

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

  // renderItem....
  const DocumentsData = ({ item, index }) => {
    return (
      <>
        <View style={ProfileDocumentDetailStyle.container}>
          <View style={ProfileDocumentDetailStyle.pdfInfo}>
            {/* <Image source={IMAGES.document} style={ProfileDocumentDetailStyle.pdfIcon} /> */}
            <FontAwesome
              name="file-pdf-o"
              size={35}
              color={_COLORS.Kodie_BlackColor}
              resizeMode={"contain"}
            />
            <View style={ProfileDocumentDetailStyle.textContainer}>
              <Text style={ProfileDocumentDetailStyle.pdfName}>
                {item.PDUM_FILE_NAME}
              </Text>
              {/* <Text style={ProfileDocumentDetailStyle.pdfSize}>{item.pdfSize}</Text> */}
              <Text style={ProfileDocumentDetailStyle.pdfSize}>
                {" "}
                {"4.5 MB"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={ProfileDocumentDetailStyle.crossIcon}
            onPress={() => {
              // refRBSheet.current.open();
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
  const documentDataRender = (item) => {
    return (
      <View style={ProfileDocumentDetailStyle.itemView}>
        {item.lookup_key === uploadDocValue ? (
          <Fontisto
            color={_COLORS.Kodie_GreenColor}
            name={"radio-btn-active"}
            size={20}
          />
        ) : (
          <Fontisto
            color={_COLORS.Kodie_GreenColor}
            name={"radio-btn-passive"}
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
  const uploadDocument = async (doc) => {
    // alert("upload");
    console.log("uri....", doc[0].uri);
    console.log("name....", doc[0].name);
    console.log("type....", doc[0].type);
    // console.log("p_referral_key....");
    // console.log("p_module_name....",);
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
      formData.append("p_referral_key", user_account_id);
      formData.append("p_module_name", moduleName);
      formData.append("p_file_Name", D_file_name);
      formData.append("p_document_type", 1);

      const response = await axios.post(uploadDoc_url, formData);

      console.log("API Response uploadDocument:", response.data);

      if (response.data.success === true) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("API failed", error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentsLookup = (selectJobType) => {
    const propertyData = {
      P_PARENT_CODE: props.documentLookUpType,
      P_TYPE: "OPTION",
    };
    const url = Config.BASE_URL;
    const propertyType = url + "lookup_details";
    console.log("Request URL:", propertyType);
    setIsLoading(true);
    axios
      .post(propertyType, propertyData)
      .then((response) => {
        console.log("Document dropDown Type...", response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log(
            "Document dropDown Data.......",
            response.data.lookup_details
          );
          setDocumentLookupData(response.data.lookup_details);
        } else {
          console.error("Document dropDown..._error:", response.data.error);
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Document dropDown Type error:", error);
        // alert(error);
        setIsLoading(false);
      });
  };
  const getUploadedDocumentsByModule = () => {
    const url = Config.BASE_URL;
    const getDocumentUrl = `${url}tanant_details/get/documents`;
    console.log("Request url....", getDocumentUrl);
    setIsLoading(true);
    const documentModuleData = {
      Module_Name:moduleName,
      fileReferenceKey: user_account_id,
    };

    console.log("documentModuleData....", JSON.stringify(documentModuleData));
    axios
      .post(
        getDocumentUrl,
        // params: documentModuleData,
        documentModuleData
      )
      .then((response) => {
        console.log("API Response getDocumentsByModule:", response.data);
        if(response.data.success == true){
          setDocumentdataByModulename(response.data.data)
        }
      })
      .catch((error) => {
        console.error("API failed_moduleName", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={ProfileDocumentDetailStyle.mainContainer}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => {
            alert("back");
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            color={_COLORS.Kodie_BlackColor}
            size={25}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
        <Text style={ProfileDocumentDetailStyle.documentheadingText}>
          {props.headingDocument || "Identity document"}
        </Text>
      </View>
      <View style={ProfileDocumentDetailStyle.card}>
        <FlatList
          data={documentdataByModulename}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          keyExtractor={(item) => item?.id}
          renderItem={DocumentsData}
        />
      </View>
      <View>
        <Text style={ProfileDocumentDetailStyle.upload_doc_text}>
          {"Upload documents"}
        </Text>
        <Text style={ProfileDocumentDetailStyle.upload_doc_sub}>
          {
            "Documents should be formatted .pdf or .jpg or .png Size per file should not exceed 5 MB"
          }
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Dropdown
          style={ProfileDocumentDetailStyle.dropdown}
          placeholderStyle={ProfileDocumentDetailStyle.placeholderStyle}
          selectedTextStyle={ProfileDocumentDetailStyle.selectedTextStyle}
          inputSearchStyle={ProfileDocumentDetailStyle.inputSearchStyle}
          iconStyle={ProfileDocumentDetailStyle.iconStyle}
          data={documentLookupData}
          search
          maxHeight={300}
          labelField="lookup_description"
          valueField="lookup_key"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={documentLookupDataValue}
          onChange={(item) => {
            setDocumentLookupDataValue(item.lookup_key);
            // alert(item.lookup_key)
          }}
          renderItem={documentDataRender}
        />
      </View>
      <View style={{ marginBottom: 30 }}>
        <CustomSingleButton
          leftImage={IMAGES.uploadIcon}
          isLeftImage={true}
          borderColor={_COLORS.Kodie_TransparentColor}
          _ButtonText={"Upload document"}
          backgroundColor={_COLORS.Kodie_lightGreenColor}
          onPress={() => {
            selectDoc();
          }}
          disabled={isLoading ? true : false}
        />
      </View>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default ProfileDocumentDetails;

const styles = StyleSheet.create({});
