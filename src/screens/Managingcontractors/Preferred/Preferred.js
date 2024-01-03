import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";
import Contractors from "../../../components/Molecules/Contractors/Contractors";
import { Config } from "../../../Config";

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
  const [PreferredData, setPreferredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    handlePreferredData();
  }, []);
  const handlePreferredData = () => {
    const PreferredBody = {
      User_USP_KEY: 479,
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
  const renderItem = ({ item }) => (
    <>
      <Contractors
        userImage={{ uri: item.profile_path }}
        name={`${item.FIRST_NAME} ${item.LAST_NAME}`}
        filedname={"Plumber"}
        startRating={"3.6"}
        ratingnumber={"100"}
        address={item.address}
        notverified={"verified"}
        verified={item.verified}
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
      {isLoading ? <CommonLoader /> : null}
    </>
  );
};

export default Preferred;
