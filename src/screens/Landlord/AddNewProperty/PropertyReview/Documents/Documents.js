import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { DocumentsStyle } from "./DocumentsStyle";
import { LABEL_STYLES } from "../../../../../Themes";
import { _COLORS, IMAGES } from "../../../../../Themes";
import { Dropdown } from "react-native-element-dropdown";
import CustomSingleButton from "../../../../../components/Atoms/CustomButton/CustomSingleButton";
import RBSheet from "react-native-raw-bottom-sheet";
import UploadImageData from "../../../../../components/Molecules/UploadImage/UploadImage";
import Entypo from "react-native-vector-icons/Entypo";

const Property_documents = [
  { label: "Pre + post inspection reports", value: "1" },
  { label: "Property images", value: "2" },
  { label: "Property floor plan", value: "3" },
];
const Lease_documents = [
  { label: "Rental invoices", value: "1" },
  { label: "Lease agreement", value: "2" },
  { label: "Expense bills", value: "3" },
];
const Tenant_documents = [
  { label: "Tenant screening report", value: "1" },
  { label: "Copy of ID without photo", value: "2" },
  { label: "Copy of ID with photo", value: "3" },
];
const data = [
  {
    id: "1",
    pdfName: "Pre+post inspection reports",
    pdfSize: "4.8MB",
  },
  {
    id: "2",
    pdfName: "Pre-inspection-checklist.pdf",
    pdfSize: "1.3MB",
  },
  {
    id: "3",
    pdfName: "Pre-inspection-checklist.pdf",
    pdfSize: "2.2MB",
  },
];
export default Documents = () => {
  const [value, setValue] = useState(null);
  const refRBSheet = useRef();

  const DocumentsData = ({ item, index }) => {
    return (
      <>
        <View style={DocumentsStyle.container}>
          <View style={DocumentsStyle.pdfInfo}>
            <Image source={IMAGES.document} style={DocumentsStyle.pdfIcon} />
            <View style={DocumentsStyle.textContainer}>
              <Text style={DocumentsStyle.pdfName}>{item.pdfName}</Text>
              <Text style={DocumentsStyle.pdfSize}>{item.pdfSize}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={DocumentsStyle.crossIcon}
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

  return (
    <View style={DocumentsStyle.mainContainer}>
      <ScrollView>
        <View style={DocumentsStyle.subContainer}>
          <Text style={LABEL_STYLES.commontext}>{"Upload documents"}</Text>
          <Text style={DocumentsStyle.doc_Head_text}>
            {
              "Documents should be formatted .pdf or .jpg or .png Size per file should not exceed 5 MB"
            }
          </Text>
        </View>
        <View style={DocumentsStyle.card}>
          <View style={DocumentsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Select type of document"}
            </Text>
            <Dropdown
              style={DocumentsStyle.dropdown}
              placeholderStyle={[
                DocumentsStyle.placeholderStyle,
                { color: _COLORS.Kodie_LightGrayColor },
              ]}
              selectedTextStyle={DocumentsStyle.selectedTextStyle}
              inputSearchStyle={DocumentsStyle.inputSearchStyle}
              iconStyle={DocumentsStyle.iconStyle}
              data={Property_documents}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Property documents"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </View>
          <FlatList
            data={data}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            keyExtractor={(item) => item?.id}
            renderItem={DocumentsData}
          />

          <View>
            <Dropdown
              style={DocumentsStyle.dropdown}
              placeholderStyle={[
                DocumentsStyle.placeholderStyle,
                { color: _COLORS.Kodie_LightGrayColor },
              ]}
              selectedTextStyle={DocumentsStyle.selectedTextStyle}
              inputSearchStyle={DocumentsStyle.inputSearchStyle}
              iconStyle={DocumentsStyle.iconStyle}
              data={Lease_documents}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Lease documents"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </View>
          <View>
            <Dropdown
              style={DocumentsStyle.dropdown}
              placeholderStyle={[
                DocumentsStyle.placeholderStyle,
                { color: _COLORS.Kodie_LightGrayColor },
              ]}
              selectedTextStyle={DocumentsStyle.selectedTextStyle}
              inputSearchStyle={DocumentsStyle.inputSearchStyle}
              iconStyle={DocumentsStyle.iconStyle}
              data={Tenant_documents}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Tenant documents"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </View>
          <View>
            <Dropdown
              style={DocumentsStyle.dropdown}
              placeholderStyle={[
                DocumentsStyle.placeholderStyle,
                { color: _COLORS.Kodie_LightGrayColor },
              ]}
              selectedTextStyle={DocumentsStyle.selectedTextStyle}
              inputSearchStyle={DocumentsStyle.inputSearchStyle}
              iconStyle={DocumentsStyle.iconStyle}
              data={Tenant_documents}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Other documents"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </View>
          <CustomSingleButton
            leftImage={IMAGES.uploadIcon}
            isLeftImage={true}
            borderColor={_COLORS.Kodie_TransparentColor}
            _ButtonText={"Upload"}
            backgroundColor={_COLORS.Kodie_lightGreenColor}
            onPress={() => {
              refRBSheet.current.open();
            }}
          />
        </View>
        <RBSheet
          ref={refRBSheet}
          height={200}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: DocumentsStyle.bottomModal_container,
          }}
        >
          <UploadImageData heading_Text={"Upload more documents"} />
        </RBSheet>
      </ScrollView>
    </View>
  );
};
