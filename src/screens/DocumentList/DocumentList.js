import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { DocumentListStyle } from "./DocumentListStyle";
import { IMAGES, _COLORS } from "../../Themes/index";
import Entypo from "react-native-vector-icons/Entypo";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
const data = [
  {
    id: "1",
    pdfName: "Rental_Agreement.pdf",
    pdfSize: "4.8MB",
  },
  {
    id: "2",
    pdfName: "Pre-inspection-checklist.pdf",
    pdfSize: "1.3MB",
  },
  {
    id: "3",
    pdfName: "Tenant_ID.jpg",
    pdfSize: "2.2MB",
  },
  {
    id: "4",
    pdfName: "Tenant_Bank_Statement.pdf",
    pdfSize: "3.2MB",
  },
  {
    id: "5",
    pdfName: "Certification_documents.pdf",
    pdfSize: "1.3MB",
  },
];
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
export default DocumentList = (props) => {
  const DocumentsData = ({ item, index }) => {
    return (
      <>
        <View style={DocumentListStyle.container}>
          <View style={DocumentListStyle.pdfInfo}>
            <Image source={IMAGES.document} style={DocumentListStyle.pdfIcon} />
            <View style={DocumentListStyle.textContainer}>
              <Text style={DocumentListStyle.pdfName}>{item.pdfName}</Text>
              <Text style={DocumentListStyle.pdfSize}>{item.pdfSize}</Text>
            </View>
          </View>
          <TouchableOpacity style={DocumentListStyle.crossIcon}>
            <Entypo
              name="cross"
              size={20}
              color={_COLORS.Kodie_WhiteColor}
              style={DocumentListStyle.crossIconStyle}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <View style={DocumentListStyle.maincontainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Documents"}
      />
      <View style={DocumentListStyle.propertyView}>
        <Text style={DocumentListStyle.propertyTittle}>
          {"Property Documents"}
        </Text>
      </View>
      <FlatList
        data={data}
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={DocumentsData}
      />
      <View style={DocumentListStyle.btnView}>
        <CustomSingleButton
          height={45}
          _ButtonText={"Upload Document"}
          backgroundColor={_COLORS.Kodie_lightGreenColor}
          Text_Color={_COLORS.Kodie_BlackColor}
          borderColor={_COLORS.Kodie_GreenColor}
        />
      </View>
    </View>
  );
};
