import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Button,
} from "react-native";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import { _COLORS, IMAGES, FONTFAMILY } from "../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import StarRating from "react-native-star-rating";
import AntDesign from "react-native-vector-icons/AntDesign";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import ReadMore from "@fawazahmed/react-native-read-more";
import { ViewApplicationCss } from "./ViewApplicationCss";
import RowTexts from "../../../../components/Molecules/RowTexts/RowTexts";
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default ViewApplication = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [rating, setRating] = useState(0);
  const refRBSheet = useRef();
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={ViewApplicationCss.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Submit application"}
      />
      <ScrollView>
        <View style={ViewApplicationCss.userDetailView}>
          <View style={ViewApplicationCss.userImageView}>
            <Image
              source={IMAGES.userImage}
              style={ViewApplicationCss.UserImages}
            />

            <Text style={ViewApplicationCss.userName}>Jack Black</Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              fullStarColor={_COLORS.Kodie_lightGreenColor}
              emptyStarColor={_COLORS.Kodie_GrayColor}
              starSize={18}
              selectedStar={(rating) => setRating(rating)}
            />
            <View style={ViewApplicationCss.StarView}>
              <AntDesign
                name={"checkcircle"}
                size={12}
                color={_COLORS.Kodie_lightGreenColor}
                style={ViewApplicationCss.iconStl}
              />
              <Text style={ViewApplicationCss.verifystl}>Verified</Text>
            </View>
          </View>
          <Entypo
            name={"dots-three-horizontal"}
            size={20}
            color={_COLORS.Kodie_GrayColor}
            style={ViewApplicationCss.iconStl}
          />
        </View>
        <DividerIcon />
        <View style={ViewApplicationCss.Container}>
          <Text style={ViewApplicationCss.apartment_text}>{"Apartment"}</Text>

          <Text style={ViewApplicationCss.melbourne_Text}>{"Melbourne"}</Text>
          <View style={ViewApplicationCss.locationView}>
            <Entypo
              name="location-pin"
              size={20}
              color={_COLORS.Kodie_GreenColor}
            />
            <Text style={ViewApplicationCss.LocationText}>
              {"8502 Preston Rd.Inglewood,Queensland,Australia,."}
            </Text>
          </View>
        </View>
        <DividerIcon />
        <View style={ViewApplicationCss.Container}>
          <Text style={ViewApplicationCss.inspections}>{"Offer summary"}</Text>
          <RowTexts
            leftText={"Lease start date"}
            rightText={"1 September 2023"}
          />
          <RowTexts leftText={"Length of lease"} rightText={"6 months"} />
          <RowTexts
            leftText={"Rental payment frequency"}
            rightText={"Weekly"}
          />
          <RowTexts leftText={"Rental amount"} rightText={"$870"} />
          <ReadMore
            seeMoreStyle={ViewApplicationCss.readMore}
            seeLessStyle={ViewApplicationCss.readMore}
            seeMoreText={"read more"}
            seeLessText={"read Less"}
            numberOfLines={3}
            style={ViewApplicationCss.textStyle}
          >
            {
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
          </ReadMore>
        </View>
        <DividerIcon />
        <View style={ViewApplicationCss.Container}>
          <Text style={ViewApplicationCss.inspections}>
            {"Pre-rental questionnaire"}
          </Text>
          <View style={ViewApplicationCss.propety_details_view}>
            <Text style={ViewApplicationCss.propery_det}>
              {"Property details"}
            </Text>

            <TouchableOpacity style={ViewApplicationCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={ViewApplicationCss.Container}>
          <View style={ViewApplicationCss.propety_details_view}>
            <Text style={ViewApplicationCss.propery_det}>{"Rooms"}</Text>

            <TouchableOpacity style={ViewApplicationCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={ViewApplicationCss.Container}>
          <View style={ViewApplicationCss.propety_details_view}>
            <Text style={ViewApplicationCss.propery_det}>
              {"External featuress"}
            </Text>

            <TouchableOpacity style={ViewApplicationCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={ViewApplicationCss.Container}>
          <View style={ViewApplicationCss.propety_details_view}>
            <Text style={ViewApplicationCss.propery_det}>
              {"Points of interest"}
            </Text>

            <TouchableOpacity style={ViewApplicationCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={ViewApplicationCss.Container}>
          <Text style={ViewApplicationCss.inspections}>
            {"ITenant  screening report (recommended)"}
          </Text>
          <View style={ViewApplicationCss.PdfContainer}>
            <View style={ViewApplicationCss.Pdfview}>
              <FontAwesome
                name={"file-pdf-o"}
                size={35}
                color={_COLORS.Kodie_BlackColor}
              />
              <View style={ViewApplicationCss.pdfTextView}>
                <Text style={ViewApplicationCss.PDF_Text}>
                  {"Tenant  screening report.pdf"}
                </Text>
                <Text style={[ViewApplicationCss.MBText]}>{"4,8 MB"}</Text>
              </View>
            </View>
            <TouchableOpacity style={ViewApplicationCss.closeIconView}>
              <AntDesign
                name="closecircle"
                size={15}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        <DividerIcon />
      </ScrollView>
      <View style={ViewApplicationCss.bottomButtonView}>
        <RowButtons
          LeftButtonText={"Reject"}
          LeftButtonTextColor={_COLORS.Kodie_BlackColor}
          leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
          LeftButtonborderColor={_COLORS.Kodie_BlackColor}
          RightButtonText={"Accept"}
          RightButtonborderColor={_COLORS.Kodie_BlackColor}
          RightButtonTextColor={_COLORS.Kodie_WhiteColor}
          RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
        />
      </View>
    </View>
  );
};
