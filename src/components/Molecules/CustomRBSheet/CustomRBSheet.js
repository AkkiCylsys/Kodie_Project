import React, {forwardRef} from 'react';
import {TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import {_COLORS} from '../../../Themes';

const CustomRBSheet = forwardRef(({height, children, onClose}, ref) => {
  return (
    <RBSheet
      ref={ref}
      height={height ? height :250}
      closeOnDragDown={true}
      closeOnPressMask={false}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        draggableIcon: {
          backgroundColor: _COLORS.Kodie_LightGrayColor,
        },
        container: {
          borderWidth: 0.5,
          borderColor: _COLORS.Kodie_LightGrayColor,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          elevation: 10,
        },
      }}>
      <TouchableOpacity
        style={{
          justifyContent: 'flex-end',
          alignSelf: 'flex-end',
          marginHorizontal: 5,
        }}
        onPress={() => {
          if (onClose) onClose();
          ref.current.close();
        }}>
        <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
      </TouchableOpacity>
      {children}
    </RBSheet>
  );
});

export default CustomRBSheet;
