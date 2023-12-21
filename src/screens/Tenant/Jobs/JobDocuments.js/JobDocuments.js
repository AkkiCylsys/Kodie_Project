import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { Config } from "../../../../Config";
import { JobDocumentsStyle } from "./JobDocumentStyle";
import { _COLORS } from "../../../../Themes";
const folderData = [
  {
    id: "1",
    moduleName: "Job_proposal",
    folderHeading: "Job proposal",
    totalFile: "12 Files",
  },
  {
    id: "2",
    moduleName: "Job_Invoice",
    folderHeading: "Invoice & proof of payment",
    totalFile: "13 Files",
  },
  {
    id: "3",
    moduleName: "Job_Completed",
    folderHeading: "Proof of work completed",
    totalFile: "15 Files",
  },
];

export default JobDocuments = (props) => {
  useEffect(() => {
    getAllDocuments();
  }, []);
  const JOB_ID = props.JOB_ID;
  // alert(props.JOB_ID);
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadDocData, setUploadDocData] = useState([]);
  const refRBSheet = useRef();

  const DocumentsData = ({ item, index }) => {
    return (
      <>
        <View style={JobDocumentsStyle.container}>
          <View style={JobDocumentsStyle.pdfInfo}>
            {/* <Image source={IMAGES.document} style={JobDocumentsStyle.pdfIcon} /> */}
            <FontAwesome
              name="file-pdf-o"
              size={35}
              color={_COLORS.Kodie_BlackColor}
              resizeMode={"contain"}
            />
            <View style={JobDocumentsStyle.textContainer}>
              <Text style={JobDocumentsStyle.pdfName}>
                {item.PDUM_FILE_NAME}
              </Text>
              {/* <Text style={JobDocumentsStyle.pdfSize}>{item.pdfSize}</Text> */}
              <Text style={JobDocumentsStyle.pdfSize}> {"4.5 MB"}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={JobDocumentsStyle.crossIcon}
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
        style={JobDocumentsStyle.folderView}
        // onPress={() => {
        //   props.navigation.navigate("DocumentDetails");
        //   alert(item?.id)
        // }}
        onPress={() => {
          console.log("item.id:", item.id);
          props?.JobDocumentDetails(item.id, item.moduleName, JOB_ID);
        }}
      >
        <View style={JobDocumentsStyle.folder_icon}>
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
          <Text style={JobDocumentsStyle.propertyDocText}>
            {item?.folderHeading}
          </Text>
          <Text style={JobDocumentsStyle.files_text}>{"12 files"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Api intrigation ......
  const getAllDocuments = () => {
    const url = Config.BASE_URL;
    const getDocument_url = url + `tanant_details/get/document/${JOB_ID}`;
    // const getDocument_url = url + `tanant_details/get/document/${15}`;
    console.log("Request URL:", getDocument_url);
    setIsLoading(true);
    axios
      .get(getDocument_url)
      .then((response) => {
        console.log("API Response getDocuments:", response.data);
        if (response.data.success === true) {
          // alert(response.data.message);
          setUploadDocData(response.data.data);
          console.log("getAlluploadDocData..", response.data.data);
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
  return (
    <View style={JobDocumentsStyle.mainContainer}>
      <ScrollView>
        <View style={JobDocumentsStyle.recentDocView}>
          <Text style={JobDocumentsStyle.reacentDocText}>{"Folders"}</Text>
          <Text style={JobDocumentsStyle.seeAllText}>{"See all"}</Text>
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
        <View style={JobDocumentsStyle.recentDocView}>
          <Text style={JobDocumentsStyle.reacentDocText}>
            {"Recent documents"}
          </Text>
          <Text style={JobDocumentsStyle.seeAllText}>{"See all"}</Text>
        </View>
        <View style={JobDocumentsStyle.card}>
          <FlatList
            data={uploadDocData}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
            keyExtractor={(item) => item?.id}
            renderItem={DocumentsData}
          />
        </View>
      </ScrollView>
    </View>
  );
};
