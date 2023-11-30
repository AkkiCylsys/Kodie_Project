import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { _COLORS, IMAGES } from "../../../../../../Themes";
import { LeaseSummaryStyle } from "./LeaseSummaryStyle";
import Entypo from "react-native-vector-icons/Entypo";
import CustomSingleButton from "../../../../../../components/Atoms/CustomButton/CustomSingleButton";
import DividerIcon from "../../../../../../components/Atoms/Devider/DividerIcon";
import RBSheet from "react-native-raw-bottom-sheet";
import InviteTenantModal from "../../../../../../components/Molecules/InviteTenantModal/InviteTenantModal";
import TenantDetails from "../TenantDetails/TenantDetails";

export default LeaseSummary = (props) => {
  const refRBSheet = useRef();

  return (
    <View style={LeaseSummaryStyle.mainContainer}>
      <View style={LeaseSummaryStyle.subContainer}>
        <Text style={LeaseSummaryStyle.heading_Text}>{"Lease summary"}</Text>
        <View style={LeaseSummaryStyle.Due_Summary_main_View}>
          <View style={LeaseSummaryStyle.summary_view}>
            <View>
              <View style={LeaseSummaryStyle.due_View}>
                <Text style={LeaseSummaryStyle.Due_Text}>{"Due in"}</Text>
                <Text style={LeaseSummaryStyle.Days_Text}>{"27 days"}</Text>
              </View>
              <Text style={LeaseSummaryStyle.date_cld_Text}>
                {"Sunday 1 October 2023"}
              </Text>
            </View>
            <View style={LeaseSummaryStyle.due_View}>
              <Image
                source={IMAGES.noteBook}
                style={LeaseSummaryStyle.note_b_img_sty}
              />
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={_COLORS.Kodie_GrayColor}
              />
            </View>
          </View>
        </View>
        <View style={LeaseSummaryStyle.Lease_Term_main_View}>
          <View style={LeaseSummaryStyle.lease_term_View}>
            <View>
              <Text style={LeaseSummaryStyle.lease_term_Text}>
                {"Lease term"}
              </Text>
              <View style={LeaseSummaryStyle.sub_View}>
                <Text style={LeaseSummaryStyle.date_Text}>{"1 Jan 2023"}</Text>
                <Text style={LeaseSummaryStyle.date_Text}>{"31 Dec 2023"}</Text>
              </View>
            </View>
            <View>
              <Text style={LeaseSummaryStyle.lease_term_Text}>
                {"Rent remaining due"}
              </Text>
              <Text style={LeaseSummaryStyle.date_Text}>{"$800"}</Text>
            </View>
          </View>
          <View style={LeaseSummaryStyle.summary_view}>
            <View style={LeaseSummaryStyle.freq_View}>
              <Text style={LeaseSummaryStyle.lease_term_Text}>
                {"Payment frequency"}
              </Text>
              <Text style={LeaseSummaryStyle.date_Text}>{"Weekly"}</Text>
            </View>
            <TouchableOpacity style={LeaseSummaryStyle.rent_received_view}>
              <View style={LeaseSummaryStyle.sub_View}>
                <Entypo
                  name="dot-single"
                  size={25}
                  color={_COLORS.Kodie_DarkGreenColor}
                />
                <Text style={LeaseSummaryStyle.rent_received_text}>
                  {"Rent received"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <CustomSingleButton
          _ButtonText={"Log a payment"}
          Text_Color={_COLORS.Kodie_BlackColor}
          backgroundColor={_COLORS.Kodie_lightGreenColor}
          height={45}
        />
      </View>
      <DividerIcon />
      <View style={LeaseSummaryStyle.subContainer}>
        <Text style={LeaseSummaryStyle.heading_Text}>{"Tenant details"}</Text>
        <Text style={LeaseSummaryStyle.invite_tenant_Text}>
          {"Invite tenant to connect to this property"}
        </Text>
        <TenantDetails />
        <View style={LeaseSummaryStyle.btn_View}>
          <CustomSingleButton
            _ButtonText={"+ Add tenant"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            height={45}
            onPress={() => {
              refRBSheet.current.open();
            }}
          />
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        height={250}
        closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: LeaseSummaryStyle.bottomModal_container,
        }}
      >
        <InviteTenantModal  closeRBSheet={() => refRBSheet.current.close()}/>
      </RBSheet>
    </View>
  );
};
