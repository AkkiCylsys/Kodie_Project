
//ScreenNo:80
//ScreenNo:81
//ScreenNo:83
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
import { SubmitApplicationCss } from "./SubmitApplicationCss";
import DividerIcon from "../../../../components/Atoms/Devider/DividerIcon";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import RowButtons from "../../../../components/Molecules/RowButtons/RowButtons";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomTrandingScreeningModal from "../../../../components/Molecules/BottomTrandingScreeningModal/BottomTrandingScreeningModal";

export default SubmitApplication = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [rating, setRating] = useState(0);
  const refRBSheet = useRef();
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={SubmitApplicationCss.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Submit application"}
      />
      <ScrollView>
        <View style={SubmitApplicationCss.userDetailView}>
          <View style={SubmitApplicationCss.userImageView}>
            <Image
              source={IMAGES.userImage}
              style={SubmitApplicationCss.UserImages}
            />

            <Text style={SubmitApplicationCss.userName}>Jack Black</Text>
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
            <View style={SubmitApplicationCss.StarView}>
              <AntDesign
                name={"checkcircle"}
                size={12}
                color={_COLORS.Kodie_lightGreenColor}
                style={SubmitApplicationCss.iconStl}
              />
              <Text style={SubmitApplicationCss.verifystl}>Verified</Text>
            </View>
          </View>
          <Entypo
            name={"dots-three-horizontal"}
            size={20}
            color={_COLORS.Kodie_GrayColor}
            style={SubmitApplicationCss.iconStl}
          />
        </View>
        <DividerIcon />
        <View style={SubmitApplicationCss.Container}>
          <Text style={SubmitApplicationCss.apartment_text}>{"Apartment"}</Text>

          <Text style={SubmitApplicationCss.melbourne_Text}>{"Melbourne"}</Text>
          <View style={SubmitApplicationCss.locationView}>
            <Entypo
              name="location-pin"
              size={20}
              color={_COLORS.Kodie_GreenColor}
            />
            <Text style={SubmitApplicationCss.LocationText}>
              {"8502 Preston Rd.Inglewood,Queensland,Australia,."}
            </Text>
          </View>
        </View>
        <DividerIcon />

        <View style={SubmitApplicationCss.Container}>
          <View style={SubmitApplicationCss.propety_details_view}>
            <Text style={SubmitApplicationCss.propery_det}>
              {"Property details"}
            </Text>

            <TouchableOpacity style={SubmitApplicationCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={SubmitApplicationCss.Container}>
          <View style={SubmitApplicationCss.propety_details_view}>
            <Text style={SubmitApplicationCss.propery_det}>{"Rooms"}</Text>

            <TouchableOpacity style={SubmitApplicationCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={SubmitApplicationCss.Container}>
          <View style={SubmitApplicationCss.propety_details_view}>
            <Text style={SubmitApplicationCss.propery_det}>
              {"External featuress"}
            </Text>

            <TouchableOpacity style={SubmitApplicationCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={SubmitApplicationCss.Container}>
          <View style={SubmitApplicationCss.propety_details_view}>
            <Text style={SubmitApplicationCss.propery_det}>
              {"Points of interest"}
            </Text>

            <TouchableOpacity style={SubmitApplicationCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={SubmitApplicationCss.Container}>
          <Text style={SubmitApplicationCss.inspections}>
            {"ITenant  screening report (recommended)"}
          </Text>
          <CustomSingleButton
            _ButtonText={"Start Now"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={() => {
              refRBSheet.current.open();
            }}
          />
        </View>
        <DividerIcon />
      </ScrollView>
      <View style={SubmitApplicationCss.bottomButtonView}>
        <RowButtons
          LeftButtonText={"Cancel"}
          LeftButtonTextColor={_COLORS.Kodie_BlackColor}
          leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
          LeftButtonborderColor={_COLORS.Kodie_BlackColor}
          RightButtonText={"Submit"}
          RightButtonborderColor={_COLORS.Kodie_BlackColor}
          RightButtonTextColor={_COLORS.Kodie_WhiteColor}
          RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
          onPressRightButton={toggleModal}
        />
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={700}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: SubmitApplicationCss.bottomModal_container,
        }}
      >
        <BottomTrandingScreeningModal />
      </RBSheet>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={SubmitApplicationCss.ModalMainView}>
          <View style={SubmitApplicationCss.ModalView}>
            <View style={SubmitApplicationCss.modalContainer}>
              <TouchableOpacity onPress={toggleModal}>
                <AntDesign
                  name="close"
                  size={20}
                  color={_COLORS.Kodie_BlackColor}
                  style={SubmitApplicationCss.modalCloseIcon}
                />
              </TouchableOpacity>
              <Text style={SubmitApplicationCss.modalMainText}>
                Application submitted
              </Text>
              <Text style={SubmitApplicationCss.modalSubText}>
                Congratulations! You have successfully submitted your rental
                application. The property owner will contact you soon.
              </Text>
              <Image
                source={IMAGES.CheckIcon}
                resizeMode={"center"}
                style={SubmitApplicationCss.checkStl}
              />
              <CustomSingleButton
                _ButtonText={"Continue"}
                Text_Color={_COLORS.Kodie_WhiteColor}
                height={48}
              />
              <CustomSingleButton
                _ButtonText={"Return"}
                Text_Color={_COLORS.Kodie_BlackColor}
                height={48}
                borderColor={_COLORS.Kodie_WhiteColor}
                backgroundColor={_COLORS.Kodie_WhiteColor}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
