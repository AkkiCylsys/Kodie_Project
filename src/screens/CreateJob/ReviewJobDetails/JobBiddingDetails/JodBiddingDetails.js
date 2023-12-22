import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
import { JobBiddingDetailsStyle } from "./JobBiddingDetailsStyle";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import AddBiddingDetails from "../../../../components/Molecules/AddBiddingDetails/AddBiddingDetails";
import RBSheet from "react-native-raw-bottom-sheet";
export default JobBiddingDetails = (props) => {
  const [Biddatadetail, setBiddatadetail] = useState(null);

  const handleDataFromChild = (BidData) => {
    // Handle the data received from the child
    console.log("Data from child:", BidData);
    setBiddatadetail(BidData);
    handleClose();
  };
  const JOB_ID = props.JOB_ID;
  console.log("............JOB_ID", JOB_ID);
  const handleClose = () => {
    refRBSheet.current.close();
  };
  const refRBSheet = useRef();
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
