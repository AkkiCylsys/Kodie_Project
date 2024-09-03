import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import Fontisto from 'react-native-vector-icons/Fontisto';
import { _COLORS } from "../../../Themes";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { DetailsStyle } from "../../Landlord/AddNewProperty/PropertyReview/Details/DetailsStyles";
import TopHeader from "../../../components/Molecules/Header/Header";
import { LabelStyles } from "../../../Themes/CommonStyles/CommonStyles";

const PropertyListingDetail = (props) => {
  const [propertyDetailsClp, setPropertyDetailsClp] = useState(false);

  const togglePropertyDetails = () => {
    setPropertyDetailsClp(prevState => !prevState);
  };

  return (
    <SafeAreaView style={DetailsStyle?.mainContainer}>
         <TopHeader
        onPressLeftButton={() => props.navigation.navigate('Properties')}
        MiddleText={'Property listing details'}
      />
        <View style={[DetailsStyle.headingView]}>
            <Text style={LabelStyles.largeTextBold}>
              {'Property listing details'}
            </Text>
          </View>
    <View style={DetailsStyle.subContainer}>
      <TouchableOpacity
        style={DetailsStyle.propety_details_view}
        onPress={togglePropertyDetails}
      >
        <Text style={DetailsStyle.propery_det}>
          {'Other property details'}
        </Text>
        <Fontisto
          name={propertyDetailsClp ? 'angle-up' : 'angle-down'}
          size={18}
          color={_COLORS.Kodie_DarkGrayColor}
          style={DetailsStyle.down_Arrow_icon}
        />
      </TouchableOpacity>
      <DividerIcon marginTop={8} />
      {/* Additional content for property details can be conditionally rendered here */}
      {propertyDetailsClp && (
        <View style={DetailsStyle.propertyDetailsContent}>
          {/* Render property details here */}
        </View>
      )}
    </View>
    </SafeAreaView>
  );
};

export default PropertyListingDetail;
