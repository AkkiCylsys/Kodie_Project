import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { LeasesStyle } from "./LeasesStyle";
import { _COLORS } from "../../../../../Themes";
import CustomSingleButton from "../../../../../components/Atoms/CustomButton/CustomSingleButton";
import RBSheet from "react-native-raw-bottom-sheet";
import AddLeaseDetails from "./AddLeaseDetails/AddLeaseDetails";
import LeaseSummary from "./LeaseSummary/LeaseSummary";
export default Leases = (props) => {
  // alert(JSON.stringify(props.property_id));
  const [isLoading, setIsLoading] = useState(false);
  const property_id = props.property_id;
  const refRBSheet = useRef();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (!isSheetOpen) {
      console.log("RBSheet closed, rendering LeaseSummary");
      <LeaseSummary property_id={property_id} />;
    }
  }, [isSheetOpen]);
  const handleClose = () => {
    refRBSheet.current.close();
    setIsSheetOpen(false);
  };
  return (
    <View style={LeasesStyle.mainContainer}>
      <ScrollView>
        <>
          <View style={LeasesStyle.add_Lease_view}>
            <Text style={LeasesStyle.add_Lease_Text}>
              {"Start by adding your lease "}
            </Text>
          </View>
          <View style={LeasesStyle.btn_View}>
            <CustomSingleButton
              _ButtonText={"+ Add lease"}
              Text_Color={_COLORS.Kodie_WhiteColor}
              onPress={() => {
                refRBSheet.current.open();
                setIsSheetOpen(true);
              }}
              disabled={isLoading ? true : false}
            />
          </View>
        </>

        {/* <LeaseSummary property_id={property_id} /> */}
        {isSheetOpen ? null : <LeaseSummary property_id={property_id} />}
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
            container: LeasesStyle.bottomModal_container,
          }}
        >
          <AddLeaseDetails onClose={handleClose} property_id={property_id} />
        </RBSheet>
      </ScrollView>
    </View>
  );
};
