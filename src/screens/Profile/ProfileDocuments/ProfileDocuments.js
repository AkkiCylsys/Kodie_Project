import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import ProfileDocumentStyle from "./ProfileDocumentStyle";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import { _COLORS, FONTFAMILY } from "../../../Themes";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import ProfileDocumentDetails from "../ProfileDocumentDetails/ProfileDocumentDetails";
const folderData = [
  {
    id: "1",
    folderHeading: "Identity documents",
    totalFile: "12 Files",
    moduleName: "Identity_documents",
  },
  {
    id: "2",
    folderHeading: "Proof of address",
    totalFile: "13 Files",
    moduleName: "Proof_of_address",
  },
  {
    id: "3",
    folderHeading: "Banking documents",
    totalFile: "15 Files",
    moduleName: "Banking_documents",
  },
  {
    id: "4",
    folderHeading: "Employment documents",
    totalFile: "15 Files",
    moduleName: "Employment_documents",
  },
  {
    id: "5",
    folderHeading: "Screening documents",
    totalFile: "15 Files",
    moduleName: "Screening_documents",
  },
  {
    id: "6",
    folderHeading: "Other documents",
    totalFile: "15 Files",
    moduleName: "Other_documents",
  },
];
const CompanyfolderData = [
  {
    id: "1",
    folderHeading: "Company documents",
    totalFile: "12 Files",
    moduleName: "Company_documents",
  },
  {
    id: "2",
    folderHeading: "License documents",
    totalFile: "13 Files",
    moduleName: "License_documents",
  },
  {
    id: "3",
    folderHeading: "Certification documents",
    totalFile: "15 Files",
    moduleName: "Certification_documents",
  },
  {
    id: "4",
    folderHeading: "Insurance and indemnity",
    totalFile: "15 Files",
    moduleName: "Insurance_and_indemnity",
  },
  {
    id: "5",
    folderHeading: "Company references",
    totalFile: "15 Files",
    moduleName: "Company_reference",
  },
  {
    id: "6",
    folderHeading: "Other documents",
    totalFile: "15 Files",
    moduleName: "Other_documents",
  },
];
const ProfileDocuments = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(false);
  const [selectedTabId, setSelectedTabId] = useState(0);
  const [folderId, setFolderId] = useState(null);
  const [companyDocumentId, setCompanyDocumentId] = useState(null);

  const personalDocumentRenderData = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={ProfileDocumentStyle.folderView}
        onPress={() => {
          setFolderId(item.id);
          // alert(item.id);
        }}
      >
        <View style={ProfileDocumentStyle.folder_icon}>
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
          <Text style={ProfileDocumentStyle.propertyDocText}>
            {item?.folderHeading}
          </Text>
          <Text style={ProfileDocumentStyle.files_text}>{"12 files"}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const CompanyDocumentRenderData = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={ProfileDocumentStyle.folderView}
        onPress={() => {
          setCompanyDocumentId(item.id);
        }}
      >
        <View style={ProfileDocumentStyle.folder_icon}>
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
          <Text style={ProfileDocumentStyle.propertyDocText}>
            {item?.folderHeading}
          </Text>
          <Text style={ProfileDocumentStyle.files_text}>{"12 files"}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={ProfileDocumentStyle.mainContainer}>
      <View style={ProfileDocumentStyle.btnContainer}>
        <RowButtons
          LeftButtonText={"Personal documents"}
          leftButtonbackgroundColor={
            !selectedTab
              ? _COLORS.Kodie_lightGreenColor
              : _COLORS.Kodie_WhiteColor
          }
          LeftButtonTextColor={
            !selectedTab
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_MediumGrayColor
          }
          LeftButtonborderColor={
            !selectedTab
              ? _COLORS.Kodie_GrayColor
              : _COLORS.Kodie_LightWhiteColor
          }
          onPressLeftButton={() => {
            setSelectedTab(false);
            setSelectedTabId(0);
            // alert(selectedTabId);
          }}
          RightButtonText={"Company documents"}
          RightButtonbackgroundColor={
            selectedTab
              ? _COLORS.Kodie_lightGreenColor
              : _COLORS.Kodie_WhiteColor
          }
          RightButtonTextColor={
            selectedTab
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_MediumGrayColor
          }
          RightButtonborderColor={
            selectedTab
              ? _COLORS.Kodie_GrayColor
              : _COLORS.Kodie_LightWhiteColor
          }
          onPressRightButton={() => {
            setSelectedTab(true);
            setSelectedTabId(1);
            // alert(selectedTabId);
          }}
        />
      </View>
      <DividerIcon borderBottomWidth={6} />
      {folderId && companyDocumentId ? null : (
        <Text style={ProfileDocumentStyle.reacentDocText}>{"All folders"}</Text>
      )}
      {selectedTabId === 0 ? (
        <View>
          {folderId ? (
            <ProfileDocumentDetails
              onPress={() => {
                setFolderId(null);
              }}
              headingDocument={
                folderId == 1
                  ? "Identity documents"
                  : folderId == 2
                  ? "Proof of address"
                  : folderId == 3
                  ? "Banking documents"
                  : folderId == 4
                  ? "Banking documents"
                  : folderId == 5
                  ? "Screening documents"
                  : folderId == 6
                  ? "Other documents"
                  : null
              }
              documentLookUpType={
                folderId == 1
                  ? "IDENTITY_DOCUMENTS"
                  : folderId == 2
                  ? "PROOF_DOCUMENTS"
                  : folderId == 3
                  ? "BANKING_DOCUMENTS"
                  : folderId == 4
                  ? "EMPLOYMENT_DOCUMENTS"
                  : folderId == 5
                  ? "SCREENING_DOCUMENTS"
                  : folderId == 6
                  ? "OTHER_DOCUMENTS"
                  : null
              }
              ModuleName={
                folderId == 1
                  ? "Identity_documents"
                  : folderId == 2
                  ? "Proof_of_address"
                  : folderId == 3
                  ? "Banking_documents"
                  : folderId == 4
                  ? "Employment_documents"
                  : folderId == 5
                  ? "Screening_documents"
                  : folderId == 6
                  ? "Other_documents"
                  : null
              }
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignSelf: "center",
              }}
            >
              <FlatList
                data={folderData}
                scrollEnabled
                // horizontal={true}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{}}
                keyExtractor={(item) => item?.id}
                renderItem={personalDocumentRenderData}
              />
            </View>
          )}
        </View>
      ) : (
        <View>
          {companyDocumentId ? (
            <ProfileDocumentDetails
              onPress={() => {
                setCompanyDocumentId(null);
              }}
              headingDocument={
                companyDocumentId == 1
                  ? "Company documents"
                  : companyDocumentId == 2
                  ? "License documents"
                  : companyDocumentId == 3
                  ? "Certification documents"
                  : companyDocumentId == 4
                  ? "Insurance and indemnity"
                  : companyDocumentId == 5
                  ? "Company references"
                  : companyDocumentId == 6
                  ? "Other documents"
                  : null
              }
              documentLookUpType={
                companyDocumentId == 1
                  ? "COMPANY_DOCUMENTS"
                  : companyDocumentId == 2
                  ? "LICENSES"
                  : companyDocumentId == 3
                  ? "CERTIFICATIONS"
                  : companyDocumentId == 4
                  ? "INSURANCE_INDEMNITY"
                  : companyDocumentId == 5
                  ? "" // manish ne bola hai chhodne ko ..... from banked side
                  : companyDocumentId == 6
                  ? "OTHER_DOCUMENTS"
                  : null
              }
              ModuleName={
                companyDocumentId == 1
                  ? "Company_documents"
                  : companyDocumentId == 2
                  ? "License_documents"
                  : companyDocumentId == 3
                  ? "Certification_documents"
                  : companyDocumentId == 4
                  ? "Insurance_and_indemnity"
                  : companyDocumentId == 5
                  ? "Company_reference"
                  : companyDocumentId == 6
                  ? "Other_documents"
                  : null
              }
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignSelf: "center",
              }}
            >
              <FlatList
                data={CompanyfolderData}
                scrollEnabled
                // horizontal={true}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{}}
                keyExtractor={(item) => item?.id}
                renderItem={CompanyDocumentRenderData}
              />
            </View>
          )}
        </View>
      )}
      <View style={ProfileDocumentStyle.saveBackButton}>
        <View style={ProfileDocumentStyle.secondview}>
          <CustomSingleButton
            Text_Color={_COLORS.Kodie_WhiteColor}
            borderColor={_COLORS.Kodie_TransparentColor}
            _ButtonText={"Save and back"}
            backgroundColor={_COLORS.Kodie_BlackColor}
            disabled={isLoading ? true : false}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileDocuments;

const styles = StyleSheet.create({});
