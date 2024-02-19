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
import ContractorsComponent from "../../../../components/Molecules/ContractorsComponent/ContractorsComponent";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
export default JobBiddingDetails = (props) => {
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse jobbiding.....", loginData);
  const userAccountid = loginData?.Login_details.user_account_id;
  console.log("userAccountid..",userAccountid)
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
    const ContractorUrl = url + "job/getallBidRequestForJob";
    console.log("Request URL:", ContractorUrl);
    setIsLoading(true);
    const bidRequestData = {
      // job_id: JOB_ID,
      job_id: 1,
      uad_key: userAccountid,
    };
    axios
      .post(ContractorUrl, bidRequestData)
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
      {/* <Contractors
        userImage={{ uri: item.UAD_PROFILE_PHOTO_PATH }}
        name={`${item?.first_name} ${item?.last_name}`}
        filedname={"Plumber"}
        startRating={"3.6"}
        ratingnumber={"100"}
        address={item.address}
        notverified={"verified"}
        verified={item.verified}
      /> */}
      <ContractorsComponent
        userImage={{ uri: item.UAD_PROFILE_PHOTO_PATH }}
        name={`${item?.first_name} ${item?.last_name}`}
        filedname={"Plumber"}
        startRating={"3.6"}
        ratingnumber={"100"}
        address={item.address}
        notverified={"verified"}
        verified={item.verified}
        CoverText1={item.cover_later}
        bidDate={moment(item.job_bid_date).format("MMM DD, YYYY")}
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
