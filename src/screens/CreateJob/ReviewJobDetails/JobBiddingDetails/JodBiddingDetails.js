import React, { useState, useRef, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
import { JobBiddingDetailsStyle } from "./JobBiddingDetailsStyle";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import AddBiddingDetails from "../../../../components/Molecules/AddBiddingDetails/AddBiddingDetails";
import RBSheet from "react-native-raw-bottom-sheet";
import { Config } from "../../../../Config";
import axios from "axios";
import Contractors from "../../../../components/Molecules/Contractors/Contractors";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
export default JobBiddingDetails = (props) => {
  const [Biddatadetail, setBiddatadetail] = useState(null);
  const [getContractorData, setgetContractorData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleDataFromChild = (BidData) => {
    // Handle the data received from the child
    console.log("Data from child:", BidData);
    setBiddatadetail(BidData);
    handleClose();
  };
  const JOB_ID = props.JOB_ID;
  console.log("............JOB_ID", JOB_ID);

  useEffect(() => {
    handleGetContractor();
  }, []);
  const handleGetContractor = () => {
    const url = Config.BASE_URL;
    const ContractorUrl = url + "job/getContractors";
    console.log("Request URL:", ContractorUrl);
    setIsLoading(true);
    axios
      .get(ContractorUrl)
      .then((response) => {
        console.log("getContractor", response.data);
        if (response.data.success === true) {
          setIsLoading(false);
          console.log("getContractor....", response.data.data);
          setgetContractorData(response.data.data);
        } else {
          console.error("getContractor_error:", response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("getContractor error:", error);
        setIsLoading(false);
      });
  };
  const handleClose = () => {
    refRBSheet.current.close();
  };
  const refRBSheet = useRef();
  const renderItem = ({ item }) => (
    <>
      <Contractors
        userImage={{ uri: item.UAD_PROFILE_PHOTO_PATH }}
        name={`${item.UAD_FIRST_NAME} ${item.UAD_LAST_NAME}`}
        filedname={"Plumber"}
        startRating={"3.6"}
        ratingnumber={"100"}
        address={item.UAD_CURR_PHYSICAL_ADD}
        notverified={"verified"}
        verified={item.verified}
      />
      <DividerIcon />
    </>
  );
  return (
    <View>
      <View style={JobBiddingDetailsStyle.add_Lease_view}>
        <Text style={JobBiddingDetailsStyle.add_Lease_Text}>
          {
            "Would you like to enable the job bidding feature and have contractors bid against one another to perform the job? You may get a better rate! "
          }
        </Text>
      </View>
      <View style={JobBiddingDetailsStyle.btn_View}>
        <CustomSingleButton
          _ButtonText={"Enable bidding"}
          Text_Color={_COLORS.Kodie_WhiteColor}
          onPress={() => {
            refRBSheet.current.open();
          }}
        />
      </View>
      <FlatList
        data={getContractorData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <RBSheet
        ref={refRBSheet}
        height={760}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: JobBiddingDetailsStyle.bottomModal_container,
        }}
      >
        <AddBiddingDetails
          JOB_ID={JOB_ID}
          onclose={handleClose}
          continueOnPress={handleDataFromChild}
        />
      </RBSheet>
    </View>
  );
};
