import {
  DocumentDetailStyleheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { DocumentDetailStyle } from "./DocumentDetailStyle";
import TopHeader from "../../../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../../../services/CommonServices";
import CustomSingleButton from "../../../../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, FONTFAMILY, IMAGES } from "../../../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import DocumentPicker from "react-native-document-picker";
import { CommonLoader } from "../../../../../../components/Molecules/ActiveLoader/ActiveLoader";
import axios from "axios";
const DocumentDetails = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const folderId = props.route.params?.folderId;
  //   alert(folderId);
  const [selectFile, setSelectFile] = useState([]);
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
      setSelectFile(doc);
      console.log("Documents.....", doc);
      console.log("selectFile.....", selectFile);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log("User cancelled the upload", err);
      else console.log(err);
    }
  };

  const handleDelete = (index) => {
    const updatedFiles = [...selectFile];
    updatedFiles.splice(index, 1);
    setSelectFile(updatedFiles);
  };
  useEffect(() => {
    console.log(selectFile);
  }, [selectFile]);

  const file = selectFile[0];

  const uploadDocument = () => {
    const url = "https://e3.cylsys.com/api/v1/uploadDocument";
    const uploadDoc_url = url;
    console.log("Request URL:", uploadDoc_url);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("p_file_Name", "abc.pdf");
    formData.append("documents", {
      uri: file.uri,
      name: file.name,
      type: file.type,
    });
    formData.append("p_referral_key", 1);
    formData.append("p_module_name", " abc.pdf");
    formData.append("p_account_id", 1);
    axios
      .post(uploadDoc_url, uploadDoc_url)
      .then((response) => {
        console.log("API Response uploadDocument:", response.data);
        if (response.data.success === true) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsLoading(false);
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const DocumentsData = ({ item, index }) => {
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
            onPress={() => {}}
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
  return (
    <View style={DocumentDetailStyle.mainContainer}>
      <TopHeader
        MiddleText={
          folderId == 1
            ? "Property documents"
            : folderId == 2
            ? "Lease documents"
            : folderId == 3
            ? "Tenant documents"
            : "Property documents"
        }
        onPressLeftButton={() => _goBack(props)}
      />
      <View
        style={{
          marginHorizontal: 16,
        }}
      >
        <View style={{}}>
          <CustomSingleButton
            leftImage={IMAGES.uploadIcon}
            isLeftImage={true}
            borderColor={_COLORS.Kodie_TransparentColor}
            _ButtonText={"Select Documents"}
            backgroundColor={_COLORS.Kodie_lightGreenColor}
            onPress={() => {
              selectDoc();
            }}
          />
        </View>
        <FlatList
          data={selectFile}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          keyExtractor={(item, index) => index}
          renderItem={DocumentsData}
        />
        <View>
          <Text
            style={{
              fontSize: 18,
              color: _COLORS.Kodie_BlackColor,
              fontFamily: FONTFAMILY.K_Bold,
              marginTop: 10,
            }}
          >
            {"Property documents"}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontFamily: FONTFAMILY.K_SemiBold,
              color: _COLORS.Kodie_BlackColor,
            }}
          >
            {"Upload documents"}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: FONTFAMILY.K_SemiBold,
              color: _COLORS.Kodie_GrayColor,
            }}
          >
            {
              "Documents should be formatted .pdf or .jpg or .png Size per file should not exceed 5 MB"
            }
          </Text>
        </View>
        <View style={{}}>
          <CustomSingleButton
            leftImage={IMAGES.uploadIcon}
            isLeftImage={true}
            borderColor={_COLORS.Kodie_TransparentColor}
            _ButtonText={"Upload"}
            backgroundColor={_COLORS.Kodie_lightGreenColor}
            onPress={() => {
              uploadDocument();
            }}
          />
        </View>
      </View>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default DocumentDetails;
