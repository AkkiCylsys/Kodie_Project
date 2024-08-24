import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import { _COLORS } from '../../../Themes';
const CommonLoader = props => {
  return (
    <View style={[styles.loaderFrameStyle]}>
      <ActivityIndicator
        animating={true}
        color={_COLORS?.Kodie_BlackColor}
        size={'large'}
        style={{alignSelf: 'center'}}
      />
    </View>
  );
};

const SmallLoader = props => {
  return (
    <View style={[styles.loaderFrameStyle]}>
      <ActivityIndicator
        animating={true}
        color={_COLORS?.Kodie_BlackColor}
        size={'small'}
        style={{alignSelf: 'center'}}
      />
    </View>
  );
};

const CustomizeLoader = props => {
  return (
    <View style={[styles.loaderFrameStyle || {}]}>
      <ActivityIndicator
        animating={true}
        color={props?.color || '#FF7B00'}
        size={props?.size || 'small'}
        style={props?.loagerStyle || {alignSelf: 'center'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderFrameStyle: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
export {CommonLoader, SmallLoader, CustomizeLoader};
