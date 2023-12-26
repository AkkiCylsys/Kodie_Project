
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View,
  TouchableOpacity
} from 'react-native';


import Pdf from 'react-native-pdf'
import FeatherIcon from 'react-native-vector-icons/Feather';
const ViewDocument = props => {
alert(props.route.params.PDFfileFullPathView)
  const _PDF_URL = props.route.params.PDFfileFullPathView

  const [loading, setloading] = useState(false);


  useEffect(() => {
console.log('Akki77',_PDF_URL)
  }, []);

  return (
    <View style={styles.container}>

      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 8,
          backgroundColor:"white",
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            padding: 10,
            marginRight: 5,
            bottom: 1,
          }}
        >
          <FeatherIcon color={"red"} size={24} name="arrow-left" />
        </TouchableOpacity>
        <Text>PDF file</Text>
      </View>

      <Pdf
       // maxScale={3.0}
        trustAllCerts={false}
        source={{
          uri: _PDF_URL,
          cache: true,
        }}
        //onLoadProgress={(percent)=> alert(percent) }
        //source={{uri:'http://example.com/sample.pdf'}}
        // onLoadComplete={(numberOfPages, filePath) => {
        //   console.log(`Number of pages: ${numberOfPages}`);
        // }}
        // onPageChanged={(page, numberOfPages) => {
        //   console.log(`Current page: ${page}`);
        // }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};
export default ViewDocument;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },

});