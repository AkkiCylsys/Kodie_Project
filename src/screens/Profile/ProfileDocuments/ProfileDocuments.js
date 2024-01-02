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
    moduleName: "Property",
    folderHeading: "Identity documents",
    totalFile: "12 Files",
  },
  {
    id: "2",
    moduleName: "Lease",
    folderHeading: "Proof of address",
    totalFile: "13 Files",
  },
  {
    id: "3",
    moduleName: "Tenant",
    folderHeading: "Banking documents",
    totalFile: "15 Files",
  },
  {
    id: "4",
    moduleName: "Tenant",
    folderHeading: "Employment documents",
    totalFile: "15 Files",
  },
  {
    id: "5",
    moduleName: "Tenant",
    folderHeading: "Screening documents",
    totalFile: "15 Files",
  },
  {
    id: "6",
    moduleName: "Tenant",
    folderHeading: "Other documents",
    totalFile: "15 Files",
  },
];
const ProfileDocuments = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(false);
  const [selectedTabId, setSelectedTabId] = useState(0);
  const [folderId, setFolderId] = useState(null);

  const folderRenderData = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={ProfileDocumentStyle.folderView}
        onPress={() => {
          setFolderId(item.id);
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
            // alert(selectedButtonId)
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
          }}
        />
      </View>
      <DividerIcon borderBottomWidth={6} />
      <Text style={ProfileDocumentStyle.reacentDocText}>{"All folders"}</Text>

      {!selectedTab ? (
        <View>
          {folderId ? (
            <ProfileDocumentDetails headingDocument={"Identity documents"} />
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
                renderItem={folderRenderData}
              />
            </View>
          )}
        </View>
      ) : (
        <View>
          {folderId ? (
            <ProfileDocumentDetails headingDocument={"Company documents"} />
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
                renderItem={folderRenderData}
              />
            </View>
          )}
        </View>
      )}

      {/* {folderId ? (
        <ProfileDocumentDetails />
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
            renderItem={folderRenderData}
          />
        </View>
      )} */}

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
