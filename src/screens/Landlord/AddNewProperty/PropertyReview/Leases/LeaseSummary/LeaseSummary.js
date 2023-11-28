import React, { useRef, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { _COLORS, IMAGES } from "../../../../../../Themes";
import { LeaseSummaryStyle } from "./LeaseSummaryStyle";
import Entypo from "react-native-vector-icons/Entypo";
import CustomSingleButton from "../../../../../../components/Atoms/CustomButton/CustomSingleButton";
import DividerIcon from "../../../../../../components/Atoms/Devider/DividerIcon";
import RBSheet from "react-native-raw-bottom-sheet";
import InviteTenantModal from "../../../../../../components/Molecules/InviteTenantModal/InviteTenantModal";
import TenantDetails from "../TenantDetails/TenantDetails";
import axios from "axios";
import { CommonLoader } from "../../../../../../components/Molecules/ActiveLoader/ActiveLoader";
import moment from "moment/moment";
export default LeaseSummary = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lease_summary_data, setLease_summary_data] = useState([]);
  const refRBSheet = useRef();

  useEffect(() => {
    lease_summary();
  }, []);

  const lease_summary = () => {
    const url = "https://e3.cylsys.com/api/v1/property_lease_details/getAll/4";
    const lease_summary_url = url;
    console.log("Request URL:", lease_summary_url);
    setIsLoading(true);
    axios
      .get(lease_summary_url)
      .then((response) => {
        console.log("API Response lease_summary:", response.data);
        if (response.data.success === true) {
          setLease_summary_data(response.data.data);
          console.log("lease_summaryData..", response.data.data);
          // alert(JSON.stringify(response.data.data));
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

  const LeaseSummary_render = ({ item }) => {
    return (
      <View style={LeaseSummaryStyle.subContainer}>
        <View style={LeaseSummaryStyle.Due_Summary_main_View}>
          <View style={LeaseSummaryStyle.summary_view}>
            <View>
              <View style={LeaseSummaryStyle.due_View}>
                <Text style={LeaseSummaryStyle.Due_Text}>{"Due in"}</Text>
                <Text
                  style={LeaseSummaryStyle.Days_Text}
                >{`${item.due_day} days`}</Text>
              </View>
              <Text style={LeaseSummaryStyle.date_cld_Text}>
                {moment(item?.UPLD_PAYMENT_DUE_DAY).format("dddd")}
                {moment(item?.UPLD_PAYMENT_DUE_DAY).format("LL")}
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
                <Text style={LeaseSummaryStyle.date_Text}>
                  {item?.UPLD_COMMENCEMENT_DATE === null
                    ? "1 Jan 2023"
                    : item?.UPLD_COMMENCEMENT_DATE.substring(0, 10)}
                </Text>
                <Text style={LeaseSummaryStyle.date_Text}>
                  {item?.lease_term === null
                    ? "1 Jan 2023"
                    : item?.lease_term.substring(0, 10)}
                </Text>
              </View>
            </View>
            <View>
              <Text style={LeaseSummaryStyle.lease_term_Text}>
                {"Rent remaining due"}
              </Text>
              <Text
                style={LeaseSummaryStyle.date_Text}
              >{`$ ${item.UPLD_RENTAL_AMMOUNT}`}</Text>
            </View>
          </View>
          <View style={LeaseSummaryStyle.summary_view}>
            <View style={LeaseSummaryStyle.freq_View}>
              <Text style={LeaseSummaryStyle.lease_term_Text}>
                {"Payment frequency"}
              </Text>
              <Text style={LeaseSummaryStyle.date_Text}>
                {item.UPLD_RENTAL_PAYMENT_FREQUENCY == 1 ? "Weekly" : "Monthly"}
              </Text>
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
    );
  };

  return (
    <View style={LeaseSummaryStyle.mainContainer}>
      <Text style={[LeaseSummaryStyle.heading_Text, { marginLeft: 16 }]}>
        {"Lease summary"}
      </Text>
      <View style={{ flex: 1 }}>
        <FlatList
          data={lease_summary_data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item?.UPLD_USER_KEY.toString()}
          renderItem={LeaseSummary_render}
        />
      </View>
      {/* <View style={LeaseSummaryStyle.subContainer}>
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
      </View> */}

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
        <InviteTenantModal />
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
