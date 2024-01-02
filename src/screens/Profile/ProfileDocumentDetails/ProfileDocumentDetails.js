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
  const [isLoading, setIsLoading] = useState(false);
  const [uploadDocData, setUploadDocData] = useState([]);
  const [uploadDocValue, setUploadDocValue] = useState("");
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
  return (
    <View style={ProfileDocumentDetailStyle.mainContainer}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => {}}>
          <Ionicons
            name="chevron-back-outline"
            color={_COLORS.Kodie_BlackColor}
            size={25}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
        <Text style={ProfileDocumentDetailStyle.documentheadingText}>
          {props.headingDocument || "Identity documents"}
        </Text>
      </View>
      <View style={ProfileDocumentDetailStyle.card}>
        <FlatList
          data={data}
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
          data={documentData}
          search
          maxHeight={300}
          labelField="lookup_description"
          valueField="lookup_key"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={uploadDocValue}
          onChange={(item) => {
            setUploadDocValue(item.lookup_key);
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
            // uploadDocument();
          }}
          disabled={isLoading ? true : false}
        />
      </View>
    </View>
  );
};

export default ProfileDocumentDetails;

const styles = StyleSheet.create({});
