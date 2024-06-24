//ScreenNo:105
//ScreenNo:106
import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image, SafeAreaView} from 'react-native';
import {ReviewInspectionCss} from './ReviewInspectionCss';
import RBSheet from 'react-native-raw-bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IMAGES, LABEL_STYLES, _COLORS} from '../../../../Themes';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import RowTexts from '../../../../components/Molecules/RowTexts/RowTexts';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
const ReviewInspection = () => {
  const [contractor, setContractor] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet = useRef();

  return (
    <SafeAreaView style={ReviewInspectionCss.MainContainer}>
      <View style={ReviewInspectionCss.Container}>
        <Text style={ReviewInspectionCss.inspections}>{'Review results'}</Text>
        <View style={ReviewInspectionCss.PdfContainer}>
          <View style={ReviewInspectionCss.Pdfview}>
            <FontAwesome
              name={'file-pdf-o'}
              size={35}
              color={_COLORS.Kodie_BlackColor}
            />
            <View style={ReviewInspectionCss.pdfTextView}>
              <Text style={ReviewInspectionCss.PDF_Text}>
                {'Inspection report.pdf'}
              </Text>
              <Text style={[ReviewInspectionCss.MBText]}>{'4,8 MB'}</Text>
            </View>
          </View>
          <TouchableOpacity style={ReviewInspectionCss.closeIconView}>
            <AntDesign
              name="closecircle"
              size={15}
              color={_COLORS.Kodie_MediumGrayColor}
            />
          </TouchableOpacity>
        </View>
        <DividerIcon />
        <Text style={ReviewInspectionCss.inspections}>
          {'Items needing urgent repair'}
        </Text>
        <RowTexts leftText={'Bedroom'} rightText={'Light fitting'} />
        <RowTexts leftText={'Bathroom'} rightText={'Toilet seat'} />
        <RowTexts leftText={'Patio'} rightText={'Outdoor table'} />
        <RowTexts leftText={'Kitchen'} rightText={'Oven thermostat'} />
        <CustomSingleButton
          _ButtonText={'+ Create new job'}
          Text_Color={_COLORS.Kodie_WhiteColor}
          backgroundColor={_COLORS.Kodie_BlackColor}
          height={40}
          disabled={isLoading ? true : false}
        />
        <DividerIcon color={_COLORS.Kodie_WhiteColor} />
        <Text style={ReviewInspectionCss.inspections}>
          {'Invite preferred contractor'}
        </Text>
        <TouchableOpacity>
          <View style={ReviewInspectionCss.TextInputView}>
            <TextInput
              value={contractor}
              placeholder={'Add people attending the inspection'}
              style={ReviewInspectionCss.input}
              onChange={text => setContractor(text)}
              palceholderColor={_COLORS.Kodie_MediumGrayColor}
            />
            <Image
              source={IMAGES.userIcons}
              style={ReviewInspectionCss.userStyle}
              resizeMode={'center'}
            />
          </View>
        </TouchableOpacity>
        <Text style={ReviewInspectionCss.inspections}>
          {'Items needing urgent repair'}
        </Text>
        <RowTexts leftText={'Bedroom'} rightText={'Cracked wall'} />
        <RowTexts leftText={'Bathroom'} rightText={'Cracked tile'} />
        <RowTexts leftText={'Patio'} rightText={'Worn out ceiling'} />
        <RowTexts leftText={'Kitchen'} rightText={'Damaged countertop'} />
        <DividerIcon />
        <Text style={ReviewInspectionCss.inspections}>{'Notes'}</Text>
        <Text style={ReviewInspectionCss.MBText}>{'No notes'}</Text>
        <CustomSingleButton
          _ButtonText={'Share inspection report'}
          Text_Color={_COLORS.Kodie_WhiteColor}
          backgroundColor={_COLORS.Kodie_BlackColor}
          height={45}
          marginBottom={90}
          onPress={() => {
            refRBSheet.current.open();
          }}
          disabled={isLoading ? true : false}
        />
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={250}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: ReviewInspectionCss.bottomModal_container,
          }}>
          <View style={ReviewInspectionCss.Container}>
            <View style={ReviewInspectionCss.ModalContainer}>
              <Text style={ReviewInspectionCss.ShareText}>Share report</Text>
              <AntDesign
                name="close"
                size={20}
                color={_COLORS.Kodie_BlackColor}
              />
            </View>
            <View style={ReviewInspectionCss.inputContainer}>
              <Text
                style={[
                  LABEL_STYLES._texinputLabel,
                  ReviewInspectionCss.cardHeight,
                ]}>
                {'Email address*'}
              </Text>
              <TextInput
                style={ReviewInspectionCss.emailinput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
                keyboardType="email-address"
              />
            </View>
            <View style={ReviewInspectionCss.ButtonView}>
              <TouchableOpacity style={ReviewInspectionCss.cancelView}>
                <Text style={[ReviewInspectionCss.cancelText]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ReviewInspectionCss.SaveView}>
                <Text style={ReviewInspectionCss.DoneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};
export default ReviewInspection;
