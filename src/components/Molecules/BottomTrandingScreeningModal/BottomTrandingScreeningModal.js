import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { IMAGES, LABEL_STYLES, _COLORS } from "../../../Themes";
import CustomSingleButton from "../../Atoms/CustomButton/CustomSingleButton";
import { BottomTrandingScreeningModalCss } from "./BottomTrandingScreeningModalCss";
const BottomTrandingScreeningModal = (props) => {
  return (
    <View style={BottomTrandingScreeningModalCss.MainContainer}>
      <View style={BottomTrandingScreeningModalCss.Container}>
        <Text style={BottomTrandingScreeningModalCss.MainText}>
          Tenant screening report
        </Text>
        <AntDesign
          name="close"
          size={20}
          color={_COLORS.Kodie_BlackColor}
          style={BottomTrandingScreeningModalCss.closeIcon}
        />
      </View>
      <View style={BottomTrandingScreeningModalCss.TopView}>
        <View style={BottomTrandingScreeningModalCss.RowView}>
          <AntDesign
            name="checkcircle"
            size={12}
            color={_COLORS.Kodie_GreenColor}
            style={BottomTrandingScreeningModalCss.closeIcon}
          />
          <Text style={BottomTrandingScreeningModalCss.restText}>
            Stand out from the rest.
          </Text>
        </View>
        <View style={BottomTrandingScreeningModalCss.RowView}>
          <AntDesign
            name="checkcircle"
            size={12}
            color={_COLORS.Kodie_GreenColor}
            style={BottomTrandingScreeningModalCss.closeIcon}
          />
          <Text style={BottomTrandingScreeningModalCss.restText}>
            Get verified faster.
          </Text>
        </View>
        <View style={BottomTrandingScreeningModalCss.RowView}>
          <AntDesign
            name="checkcircle"
            size={12}
            color={_COLORS.Kodie_GreenColor}
            style={BottomTrandingScreeningModalCss.closeIcon}
          />
          <Text style={BottomTrandingScreeningModalCss.reportText}>
            Screening report
          </Text>
          <Text style={BottomTrandingScreeningModalCss.restText}>
            in less than 3 minutes!
          </Text>
        </View>
      </View>
      <View style={BottomTrandingScreeningModalCss.TopView}>
        <Text style={BottomTrandingScreeningModalCss.managertext}>
          Run your own check through Equifax, Australia’s leading tenancy
          database, to verify your identity and uncover the records property
          managers and owners care about most:
        </Text>
        <View style={BottomTrandingScreeningModalCss.RowView}>
          <Entypo
            name="dot-single"
            size={20}
            color={_COLORS.Kodie_BlackColor}
            style={BottomTrandingScreeningModalCss.closeIcon}
          />
          <Text style={BottomTrandingScreeningModalCss.managertext}>
            Tenancy database
          </Text>
        </View>
        <View style={BottomTrandingScreeningModalCss.RowView}>
          <Entypo
            name="dot-single"
            size={20}
            color={_COLORS.Kodie_BlackColor}
            style={BottomTrandingScreeningModalCss.closeIcon}
          />
          <Text style={BottomTrandingScreeningModalCss.managertext}>
            Bankruptcy notices
          </Text>
        </View>
        <View style={BottomTrandingScreeningModalCss.RowView}>
          <Entypo
            name="dot-single"
            size={20}
            color={_COLORS.Kodie_BlackColor}
            style={BottomTrandingScreeningModalCss.closeIcon}
          />
          <Text style={BottomTrandingScreeningModalCss.managertext}>
            Court records
          </Text>
        </View>
        <View style={BottomTrandingScreeningModalCss.RowView}>
          <Entypo
            name="dot-single"
            size={20}
            color={_COLORS.Kodie_BlackColor}
            style={BottomTrandingScreeningModalCss.closeIcon}
          />
          <Text style={BottomTrandingScreeningModalCss.managertext}>
            Directorships
          </Text>
        </View>
      </View>
      <View style={BottomTrandingScreeningModalCss.TopView}>
        <View style={BottomTrandingScreeningModalCss.Container}>
          <View style={BottomTrandingScreeningModalCss.BoxView}>
            <Text style={BottomTrandingScreeningModalCss.managertext}>
              Average time
            </Text>
            <Text style={BottomTrandingScreeningModalCss.MainText}>
              3 minutes
            </Text>
          </View>
          <View style={BottomTrandingScreeningModalCss.BoxView}>
            <Text style={BottomTrandingScreeningModalCss.managertext}>
              Valid for
            </Text>
            <Text style={BottomTrandingScreeningModalCss.MainText}>
              6 months
            </Text>
          </View>
          <View style={BottomTrandingScreeningModalCss.BoxView}>
            <Text style={BottomTrandingScreeningModalCss.managertext}>
              Costs only
            </Text>
            <Text style={BottomTrandingScreeningModalCss.MainText}>$30</Text>
          </View>
        </View>
      </View>
      <CustomSingleButton
        _ButtonText={"Start check now"}
        Text_Color={_COLORS.Kodie_WhiteColor}
        backgroundColor={_COLORS.Kodie_BlackColor}
        height={40}
      />
      <Text style={BottomTrandingScreeningModalCss.alreadyText}>
        Already have a background report?
      </Text>
      <Text style={BottomTrandingScreeningModalCss.managertext}>
        If you already have a background report from another service provider,
        you can upload it here instead. Just make sure your report is still
        valid.
      </Text>
      <CustomSingleButton
        leftImage={IMAGES.uploadIcon}
        isLeftImage={true}
        borderColor={_COLORS.Kodie_TransparentColor}
        _ButtonText={"Upload"}
        backgroundColor={_COLORS.Kodie_lightGreenColor}
        height={40}
      />
      <View style={BottomTrandingScreeningModalCss.ButtonView}>
        <TouchableOpacity>
          <Text
            style={[
              LABEL_STYLES.commontext,
              BottomTrandingScreeningModalCss.closeIcon,
            ]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={BottomTrandingScreeningModalCss.saveView}>
          <Text style={BottomTrandingScreeningModalCss.SaveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default BottomTrandingScreeningModal;
