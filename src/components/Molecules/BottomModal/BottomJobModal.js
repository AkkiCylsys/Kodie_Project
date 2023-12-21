import React, { useRef } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { BottomModalDataStyle } from "./BottomModalDataStyle";
import { IMAGES, _COLORS } from "../../../Themes";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import { PropertyListCSS } from "../../../screens/Landlord/PropertyList/MyProperty/PropertyListCSS";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const data = [
  {
    id: "1",
    Data: "View /edit job details",
    Icon: (
      <MaterialIcons
        name="preview"
        size={25}
        color={_COLORS.Kodie_GreenColor}
        style={{ alignSelf: "center" }}
      />
    ),
  },
  {
    id: "2",
    Data: "Manage job documents",
    Icon: (
      <MaterialCommunityIcons
        name="file-download-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: "3",
    Data: "Create job notice / reminder",
    Icon: (
      <Ionicons
        name="mail-unread-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: "4",
    Data: "Delete job",
    Icon: (
      <MaterialIcons
        name="delete-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
];
const data1 = [
  {
    id: "1",
    Data: "Delete job",
    Icon: (
      <MaterialIcons
        name="delete-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: "2",
    Data: "Archive instead",
    Icon: (
      <Ionicons
        name="file-tray-full-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
];

const BottomJobModal = (props) => {
  const JobId = props.JobId;
  console.log("JobId...", JobId);
  // alert(JobId);
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const handleCloseModal = () => {
    props.onClose();
  };
  const handleDeleteProperty = (Job_id) => {
    console.log(Job_id, "catch data");
    props.onDelete(Job_id);
    console.log("Raul data cath........... ", props.onDelete(Job_id));
  };
  const FinalDeleteProperty = (Job_id, Address) => {
    console.log(Job_id, Address, "catch data");
    props.onDelete(Job_id, Address);
    console.log("come data...........", Job_id);
    console.log(
      "Raul data cath........... ",
      props.onDeleteData(Job_id, Address)
    );
  };
  const BottomData = ({ item, index }) => {
    return (
      <>
        {props?.isDeletePropertyClicked ? (
          <>
            <TouchableOpacity
              style={BottomModalDataStyle.container}
              onPress={() => {
                if (item.id === "1") {
                  FinalDeleteProperty();
                }
                if (item.id === "2") {
                }
              }}
            >
              <Text style={BottomModalDataStyle.IconView}>{item.Icon}</Text>
              <Text style={BottomModalDataStyle.text}>{item.Data}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={BottomModalDataStyle.container}
            onPress={() => {
              if (item.id === "1") {
                navigation.navigate("CreateJobFirstScreen", {
                  JobId: JobId,
                  editMode: "editMode",
                });
              }
              if (item.id === "4") {
                handleDeleteProperty();
              }
            }}
          >
            <Text style={BottomModalDataStyle.IconView}>{item.Icon}</Text>
            <Text style={BottomModalDataStyle.text}>{item.Data}</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };
  return (
    <View style={BottomModalDataStyle.mainContainer}>
      <TouchableOpacity
        style={{
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          paddingHorizontal: 20,
        }}
        onPress={handleCloseModal}
      >
        <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
      </TouchableOpacity>
      <FlatList
        data={props?.isDeletePropertyClicked ? data1 : data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={BottomData}
        ListHeaderComponent={() => {
          return (
            <>
              {props?.isDeletePropertyClicked ? (
                <Text
                  style={BottomModalDataStyle.text}
                >{`Delete property: ${props?.Address} ?`}</Text>
              ) : null}
            </>
          );
        }}
      />
    </View>
  );
};
export default BottomJobModal;
