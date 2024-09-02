import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import {ReviewInspectionCss} from './ReviewInspectionCss';
import RBSheet from 'react-native-raw-bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {IMAGES, LABEL_STYLES, _COLORS} from '../../../../Themes';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import RowTexts from '../../../../components/Molecules/RowTexts/RowTexts';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import { GetInspectioncabinateDetail } from '../../../../services/InspectionModuleServices.js/InspectionServices';
import { useNavigation } from '@react-navigation/native';
import { CommonLoader } from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import { Config } from '../../../../Config';
import axios from 'axios';

const ReviewInspection = (props) => {
  const navigation = useNavigation();
  const [contractor, setContractor] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet = useRef();
  const [isFileVisible, setIsFileVisible] = useState(true);
  const [Damaged_ItemStatus, setDamaged_ItemStatus] = useState([]);
  const [Urgent_ItemStatus, setUrgent_ItemStatus] = useState([]);
  const [Inspection_Details, setInspection_Details] = useState([]);
  const TIM_KEY = props?.TIM_KEY;
  const handleCloseModal = () => {
    refRBSheet.current.close();
  };
  useEffect(()=>{
    handlePostRequest();
    getInspectionDetails();
  },[])
  const getInspectionDetails = () => {
    setIsLoading(true);
    const url = Config.BASE_URL;

    const apiUrl =
      url + `get_inspection_details/${TIM_KEY}`;

    axios
      .get(apiUrl)
      .then(response => {
        setInspection_Details(response?.data?.data[0]);
        setIsLoading(false);
      })
      .catch(error => {
        // Handle error
        console.error('API Error PersonalDetails CIP:', error);
      });
  };
  const handlePostRequest = async () => {
    setIsLoading(true);

    try {
      const payload = { P_TIM_KEY: TIM_KEY };
      const data = await GetInspectioncabinateDetail(payload);
      console.log(data[0]?.DAMAGED_ITEMS);
      setDamaged_ItemStatus(data[0]?.DAMAGED_ITEMS);
      setUrgent_ItemStatus(data[0]?.URGENT_ITEMS);
      setIsLoading(false)
    } catch (err) {
     console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRemoveFile = () => {
    setIsFileVisible(false);
  };
  const renderItem = ({ item }) => (
    <RowTexts leftText={item?.TAM_AREA_NAME} rightText={item?.TAIM_ITEM_NAME} />
  );
  return (
    <SafeAreaView style={ReviewInspectionCss.MainContainer}>
      <View style={ReviewInspectionCss.Container}>
        <Text style={ReviewInspectionCss.inspections}>{'Review results'}</Text>
        {isFileVisible && (
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
            <TouchableOpacity
              style={ReviewInspectionCss.closeIconView}
              onPress={handleRemoveFile} // Add onPress to handle file removal
            >
              <AntDesign
                name="closecircle"
                size={15}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </TouchableOpacity>
          </View>
        )}
        <DividerIcon />
        <Text style={ReviewInspectionCss.inspections}>
          {'Items needing urgent repair'}
        </Text>
        <FlatList
          data={Urgent_ItemStatus}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} // Adjust the keyExtractor if necessary
        />
        <CustomSingleButton
          _ButtonText={'+ Create new job'}
          Text_Color={_COLORS.Kodie_WhiteColor}
          backgroundColor={_COLORS.Kodie_BlackColor}
          height={40}
          onPress ={()=> navigation.navigate('CreateJobFirstScreen',{
            ReviewInspection:'ReviewInspection'
          })}

        />
        <DividerIcon color={_COLORS.Kodie_WhiteColor} />
        <Text style={ReviewInspectionCss.inspections}>
          {'Invite preferred contractor'}
        </Text>
        <TouchableOpacity>
          <View style={ReviewInspectionCss.TextInputView}>
            <TextInput
              value={Inspection_Details.v_TIM_ADD_ATTENDENCE}
              placeholder={'Add people attending the inspection'}
              style={ReviewInspectionCss.input}
              onChange={text => setContractor(text)}
              placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
            />
            <Image
              source={IMAGES.userIcons}
              style={ReviewInspectionCss.userStyle}
              resizeMode={'center'}
            />
          </View>
        </TouchableOpacity>
        <Text style={ReviewInspectionCss.inspections}>
          {'Damaged items to be noted'}
        </Text>
        <FlatList
          data={Damaged_ItemStatus}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} // Adjust the keyExtractor if necessary
        />
       
        <DividerIcon />
        <Text style={ReviewInspectionCss.inspections}>{'Notes'}</Text>
        <Text style={ReviewInspectionCss.MBText}>{Inspection_Details.v_TIM_DESCRIPTION ? Inspection_Details.v_TIM_DESCRIPTION: 'No notes'}</Text>
        <CustomSingleButton
          _ButtonText={'Share inspection report'}
          Text_Color={_COLORS.Kodie_WhiteColor}
          backgroundColor={_COLORS.Kodie_BlackColor}
          height={45}
          marginBottom={90}
          onPress={() => {
            // refRBSheet.current.open();
            Alert.alert('Coming soon')
          }}
          disabled={isLoading ? true : false}
        />
        {isLoading? <CommonLoader/>:null}
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
              <TouchableOpacity onPress={handleCloseModal}>
                <Entypo
                  name="cross"
                  size={24}
                  color={_COLORS.Kodie_BlackColor}
                />
              </TouchableOpacity>
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
              <TouchableOpacity
                style={ReviewInspectionCss.cancelView}
                onPress={handleCloseModal}>
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
