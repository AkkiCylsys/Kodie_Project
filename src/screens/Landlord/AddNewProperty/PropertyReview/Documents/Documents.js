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
import { FONTFAMILY, LABEL_STYLES } from "../../../../../Themes";
import { _COLORS, IMAGES } from "../../../../../Themes";
import { Dropdown } from "react-native-element-dropdown";
import CustomSingleButton from "../../../../../components/Atoms/CustomButton/CustomSingleButton";
import RBSheet from "react-native-raw-bottom-sheet";
import UploadImageData from "../../../../../components/Molecules/UploadImage/UploadImage";
import Entypo from "react-native-vector-icons/Entypo";
import CustomDropdown from "../../../../../components/Molecules/CustomDropdown/CustomDropdown";
import { colors } from "../../../../../Themes/CommonColors/CommonColor";
import { fontFamily } from "../../../../../Themes/FontStyle/FontStyle";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Property_documents = [
  "All",
  "Pre+post inspection reports",
  "Property images",
  "Property floor plan",
];

const Lease_documents = [
  "All",
  "Rental invoices",
  "Lease agreement",
  "Expense bills",
];

const Tenant_documents = [
  "All",
  "Tenant screening report",
  "Copy of ID without photo",
  "Copy of ID with photo",
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
const folderData = [
  {
    id: "1",
    moduleName: "Property",
    folderHeading: "Property documents",
    totalFile: "12 Files",
  },
  {
    id: "2",
    moduleName: "Lease",
    folderHeading: "Lease documents",
    totalFile: "13 Files",
  },
  {
    id: "3",
    moduleName: "Tenant",
    folderHeading: "Tenant documents",
    totalFile: "15 Files",
  },
];

// ----data come from dropdown and define these condition
const handleApply = (selectedOptions) => {
  console.log("Clear Action");
};
const handleClear = () => {
  console.log("Clear Action");
};
export default Documents = (props) => {
  const property_id = props.property_id;
  // alert(props.property_id);
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet = useRef();

  const DocumentsData = ({ item, index }) => {
    return (
      <>
        <View style={DocumentsStyle.container}>
          <View style={DocumentsStyle.pdfInfo}>
            {/* <Image source={IMAGES.document} style={DocumentsStyle.pdfIcon} /> */}
            <FontAwesome
              name="file-pdf-o"
              size={35}
              color={_COLORS.Kodie_BlackColor}
              resizeMode={"contain"}
            />
            <View style={DocumentsStyle.textContainer}>
              <Text style={DocumentsStyle.pdfName}>{item.pdfName}</Text>
              <Text style={DocumentsStyle.pdfSize}>{item.pdfSize}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={DocumentsStyle.crossIcon}
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

  const folderRenderData = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={DocumentsStyle.folderView}
        // onPress={() => {
        //   props.navigation.navigate("DocumentDetails");
        //   alert(item?.id)
        // }}
        onPress={() => {
          console.log("item.id:", item.id);
          props?.documentDetail(item.id, item.moduleName, property_id);
        }}
      >
        <View style={DocumentsStyle.folder_icon}>
          <Feather name="folder" size={30} color={_COLORS.Kodie_GrayColor} />
          <Entypo
            name="dots-three-vertical"
            size={30}
            color={_COLORS.Kodie_GrayColor}
          />
        </View>
        <View>
          <Text style={DocumentsStyle.propertyDocText}>
            {item?.folderHeading}
          </Text>
          <Text style={DocumentsStyle.files_text}>{"12 files"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={DocumentsStyle.mainContainer}>
      <ScrollView>
        <View style={DocumentsStyle.recentDocView}>
          <Text style={DocumentsStyle.reacentDocText}>{"Folders"}</Text>
          <Text style={DocumentsStyle.seeAllText}>{"See all"}</Text>
        </View>
        <View style={{ marginBottom: 50 }}>
          <FlatList
            data={folderData}
            scrollEnabled
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            keyExtractor={(item) => item?.id}
            renderItem={folderRenderData}
          />
        </View>
        {/* <View style={DocumentsStyle.recentDocView}>
          <Text style={DocumentsStyle.reacentDocText}>
            {"Recent documents"}
          </Text>
          <Text style={DocumentsStyle.seeAllText}>{"See all"}</Text>
        </View>
        <View style={DocumentsStyle.card}>
          <FlatList
            data={data}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            keyExtractor={(item) => item?.id}
            renderItem={DocumentsData}
          />
        </View> */}
        {/* <RBSheet
          ref={refRBSheet}
          height={200}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: DocumentsStyle.bottomModal_container,
          }}
        >
          <UploadImageData heading_Text={"Upload more documents"} />
        </RBSheet> */}
      </ScrollView>
    </View>
  );
};
