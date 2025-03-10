import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import FileViewer from 'react-native-file-viewer';
const ViewDocument = props => {
  const filePath = props.route.params.filePath;
  console.log('filePath in view...', filePath);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const pdf_url =
    'https://basponccollege.org/LMS/EMaterial/Science/Comp/HVP/JS%20Notes.pdf';
  const onLoadComplete = (numberOfPages, filePath) => {
    console.log(`Number of pages: ${numberOfPages}`);
    setNumberOfPages(numberOfPages);
    console.log('numberOfPages...', numberOfPages);
  };

  const onPageChanged = (page, numberOfPages) => {
    console.log(`Current page: ${page}`);
    setCurrentPage(page);
    console.log('page.....', page);
  };

  const onError = error => {
    console.log(error);
    console.log('error.....', error);
    alert(error);
  };

  const onPressLink = uri => {
    console.log(`Link pressed: ${uri}`);
  };

  const viewPdf = async () => {
    try {
      await FileViewer.open('path/to/your/file.pdf');
    } catch (error) {
      console.error('Error viewing PDF:', error);
    }
  };

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default ViewDocument;
