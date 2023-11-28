import React, { useRef } from "react";
import { View, Text, ScrollView } from "react-native";
import { LeasesStyle } from "./LeasesStyle";
import { _COLORS } from "../../../../../Themes";
import CustomSingleButton from "../../../../../components/Atoms/CustomButton/CustomSingleButton";
import RBSheet from "react-native-raw-bottom-sheet";
import AddLeaseDetails from "./AddLeaseDetails/AddLeaseDetails";
import LeaseSummary from "./LeaseSummary/LeaseSummary";
export default Leases = (props) => {
  const refRBSheet = useRef();
  const handleClose = () => {
    refRBSheet.current.close();
  };
  return (
    <View style={LeasesStyle.mainContainer}>
      <ScrollView>
        {/* {handleClose ? (
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
                }}
              />
            </View>
          </>
        ) : (
          <LeaseSummary />
        )} */}
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
            }}
          />
        </View>
        <LeaseSummary />

        <RBSheet
          ref={refRBSheet}
          height={510}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: LeasesStyle.bottomModal_container,
          }}
        >
          <AddLeaseDetails onClose={handleClose} />
        </RBSheet>
      </ScrollView>
    </View>
  );
};
