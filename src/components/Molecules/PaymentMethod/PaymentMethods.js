import { View, Text, Image, TouchableOpacity } from "react-native";
import React,{useState} from "react";
import { _COLORS, IMAGES } from "../../../Themes";
import { PaymentMethodStyle } from "./PaymentMethodStyle";
import Icon from "react-native-vector-icons/MaterialIcons"
const PaymentMethods = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <View>
      <View style={PaymentMethodStyle.mainview}>
            <View style={PaymentMethodStyle.textimgbindview}>
            <View   style={PaymentMethodStyle.profileimageview}>
                <Image
                source={props.imagesource}
                style={PaymentMethodStyle.profileimage}
                />
            </View>
            <View style={PaymentMethodStyle.bindtextview}>
                <Text style={PaymentMethodStyle.headingtext}>{props.heading}</Text>
                <Text style={PaymentMethodStyle.descriptiontext}>
                {props.description}
                </Text>
            </View>
            </View>

            <TouchableOpacity onPress={handleClick}> 
              <Icon name={isClicked? 'radio-button-checked': 'radio-button-unchecked'} size={25} color={_COLORS.Kodie_BlackColor}/>
            </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentMethods;
