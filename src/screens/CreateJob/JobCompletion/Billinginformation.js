import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import { BillinginformationStyle } from "./BillinginformationStyle";
import { _COLORS, IMAGES, BANNERS } from "../../../Themes";
import { Divider } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import Ionicons from "react-native-vector-icons/Ionicons";
const Billinginformation = (props) => {
  const [show, setShow] = useState(false);
  const toggleView = () => {
    setShow(!show);
  };
  return (
    <View>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Billing information"}
      />
      <ScrollView>
        <View style={BillinginformationStyle.maincontainer}>
          <ImageBackground style={BillinginformationStyle.topsectionview}>
            <View style={BillinginformationStyle.mainimgview}>
              <Image
                source={BANNERS.previewImage}
                style={BillinginformationStyle.mainimg}
              />
            </View>

            <View style={BillinginformationStyle.toptextmainview}>
              <View style={BillinginformationStyle.startextview}>
                <Image
                  source={IMAGES.star}
                  style={BillinginformationStyle.starimg}
                />
                <Text style={BillinginformationStyle.ratingtext}>4.6</Text>
              </View>

              <View style={BillinginformationStyle.fixingtextview}>
                <Text style={BillinginformationStyle.fixtext}>
                  Fixing & Maintenance
                </Text>
                <Text style={BillinginformationStyle.walltext}>
                  Plasterer to fix wall
                </Text>
                <Text style={BillinginformationStyle.dollertext}>$165</Text>
              </View>
            </View>
          </ImageBackground>

          <View style={BillinginformationStyle.jobdetailsview}>
            <View style={BillinginformationStyle.jobbindview}>
              <Text style={BillinginformationStyle.jobdetailstext}>
                Your job details
              </Text>
              <TouchableOpacity
                style={BillinginformationStyle.moreinfoview}
                onPress={toggleView}
              >
                <Text style={BillinginformationStyle.moreinfotext}>
                  More info
                </Text>
                <Image
                  source={IMAGES.downarrow}
                  style={BillinginformationStyle.downarrowimg}
                />
              </TouchableOpacity>
            </View>
            <Divider style={BillinginformationStyle.divider} />

            <View style={BillinginformationStyle.completedview}>
              <Text style={BillinginformationStyle.completedtext}>
                Completed date
              </Text>
              <Text style={BillinginformationStyle.completeddate}>
                Nov 11, 2022
              </Text>
            </View>

            <View style={BillinginformationStyle.completedview}>
              <Text style={BillinginformationStyle.completedtext}>
                Completed time
              </Text>
              <Text style={BillinginformationStyle.completeddate}>
                10:00 pm - 2:00 am (4 hours)
              </Text>
            </View>

            <View style={BillinginformationStyle.completedview}>
              <Text style={BillinginformationStyle.completedtext}>
                Budget range
              </Text>
              <Text style={BillinginformationStyle.completeddate}>
                $100 - $200
              </Text>
            </View>
          </View>
          {show && (
            <View style={BillinginformationStyle.moreinfo}>
              <View style={BillinginformationStyle.completedview}>
                <Text style={BillinginformationStyle.completedtext}>
                  Budget range
                </Text>
                <Text style={BillinginformationStyle.completeddate}>
                  $100 - $200
                </Text>
              </View>

              <View style={BillinginformationStyle.completedview}>
                <Text style={BillinginformationStyle.completedtext}>
                  Budget range
                </Text>
                <Text style={BillinginformationStyle.completeddate}>
                  $100 - $200
                </Text>
              </View>
            </View>
          )}
          {/* billing section start here */}
          <View style={BillinginformationStyle.totalcostview}>
            <Text style={BillinginformationStyle.totalcosttext}>
              Total cost breakdown
            </Text>
            <Divider style={BillinginformationStyle.dividersecond} />
            <View style={BillinginformationStyle.totaljobcostview}>
              <Text style={BillinginformationStyle.totaltext}>
                Total job cost:
              </Text>
              <Text style={BillinginformationStyle.totalmonytext}>$165.00</Text>
            </View>

            <View style={BillinginformationStyle.totaljobcostview}>
              <Text style={BillinginformationStyle.totaltext}>
                Service fee:
              </Text>
              <Text style={BillinginformationStyle.moneytext}>$8.25</Text>
            </View>
            <Divider style={BillinginformationStyle.dividersecond} />
            <View style={BillinginformationStyle.totaljobcostview}>
              <Text style={BillinginformationStyle.totaltext}>Total :</Text>
              <Text style={BillinginformationStyle.moneytext}>$173.25</Text>
            </View>
          </View>

          <View style={BillinginformationStyle.textContainer}>
            <View style={BillinginformationStyle.bindfile}>
              <Image source={IMAGES.document} />
              <View>
                <Text style={BillinginformationStyle.pdfName}>
                  {"Company document.pdf"}
                </Text>
                <Text style={BillinginformationStyle.pdfSize}>{"4.8 MB"}</Text>
              </View>
            </View>
            <Entypo
              name="cross"
              size={20}
              style={BillinginformationStyle.doticon}
            />
          </View>

          <View style={BillinginformationStyle.buttonview}>
            <CustomSingleButton
              leftImage={IMAGES.uploadIcon}
              isLeftImage={true}
              Text_Color={_COLORS.Kodie_WhiteColor}
              borderColor={_COLORS.Kodie_TransparentColor}
              _ButtonText={"Save"}
              backgroundColor={_COLORS.Kodie_BlackColor}
            />

            <View style={BillinginformationStyle.goBack_View}>
              <TouchableOpacity style={BillinginformationStyle.backIcon}>
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color={_COLORS.Kodie_MediumGrayColor}
                />
              </TouchableOpacity>
              <Text style={BillinginformationStyle.goBack_Text}>
                {"Go back"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Billinginformation;
