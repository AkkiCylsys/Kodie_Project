import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";
import Contractors from "../../../components/Molecules/Contractors/Contractors";
import { Config } from "../../../Config";
import { useIsFocused } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import ContractorsImage from "../../../components/Molecules/Contractors/ContractorsImage/ContractorsImage";
import { _COLORS } from "../../../Themes";

const data = [
  {
    name: "Jason Stathom",
    filedname: "Handyman",
    startRating: "4.6",
    ratingnumber: "231",
    address: "1234, Contractor’s address. Australia",
    notverified: "Not verified",
  },
  {
    name: "Mesut Ozil",
    filedname: "Plumber",
    startRating: "4.0",
    ratingnumber: "100",
    address: "1234, Contractor’s address. Australia",
    verified: true,
  },
  {
    name: "Jack Black",
    filedname: "Handyman",
    startRating: "3.6",
    ratingnumber: "231",
    address: "1234, Contractor’s address. Australia",
    verified: true,
  },
];

const Preferred = () => {
  const isvisible = useIsFocused();
  const refRBSheet = useRef();
  const [PreferredData, setPreferredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginData.....", loginData);
  const [ContractorId, setContractorId] = useState();
  useEffect(() => {
    if (isvisible) {
      handlePreferredData();
    }
  }, [isvisible]);
  const handlePreferredData = () => {
    const PreferredBody = {
      User_USP_KEY: loginData.Login_details.user_account_id,
    };
    const url = Config.BASE_URL;
    const PreferredUrl = url + "invitecontractor_details_account_id";
    console.log("Request URL:", PreferredUrl);
    setIsLoading(true);
    axios
      .post(PreferredUrl, PreferredBody)
      .then((response) => {
        console.log("PreferredData", response.data);
        if (response.data.success === true) {
          setIsLoading(false);
          console.log("PreferredData....", response.data.data);
          setPreferredData(response.data.data);
        } else {
          console.error("PreferredData_error:", response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("PreferredData error:", error);
        setIsLoading(false);
      });
  };
  const handleDelete = () => {
    const DeleteContractor = {
      p_CONTRACTOR_ID: ContractorId,
    };
    const url = Config.BASE_URL;
    const DeleteUrl = url + "invitecontractor_details_delete";
    console.log("Request URL:", DeleteUrl);
    setIsLoading(true);
    axios
      .post(DeleteUrl, DeleteContractor)
      .then((response) => {
        console.log("DeleteData", response.data);
        if (response.data.success === true) {
          alert(response.data.message);
          handlePreferredData();
          refRBSheet.current.close();

          setIsLoading(false);
        } else {
          console.error("DeleteData_error:", response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("DeleteData error:", error);
        setIsLoading(false);
      });
  };
  const renderItem = ({ item }) => (
    <>
      <Contractors
        userImage={{ uri: item.profile_path }}
        name={
          item.IS_COMPANY == 0
            ? `${item.FIRST_NAME} ${item.LAST_NAME}`
            : item.ORGANISATION_NAME
        }
        filedname={"Plumber"}
        startRating={"3.6"}
        ratingnumber={"100"}
        address={item.address}
        notverified={"verified"}
        verified={item.verified}
        onPress={() => {
          refRBSheet.current.open();
          setContractorId(item.id);
        }}
      />
      <DividerIcon />
    </>
  );

  return (
    <>
      <FlatList
        data={PreferredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={300}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
        }}
      >
        <ContractorsImage onDelete={() => handleDelete()} />
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </>
  );
};

export default Preferred;
