/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import AssetCard from './AssetCard';

const FixedAssetLand = ({invoice_data}) => {
  const invoice = invoice_data?.invoice || {};
  const po = invoice_data?.po || {};

  if (invoice_data && invoice && po) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <AssetCard invoice={invoice} po={po} data={invoice_data} />
        </View>
      </ScrollView>
    );
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor:
      'radial-gradient(84% 84% at 0% 16%, rgb(137, 127, 255) 0%, rgb(82, 67, 255) 100%)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeButton: {
    backgroundColor: 'warning',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  inactiveButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  spacer: {
    flex: 1,
  },
  iconButton: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  companyDetail: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  companyAddress: {
    fontSize: 14,
    color: 'gray',
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: -30,
    alignSelf: 'flex-end',
  },
  contentContainer: {
    padding: 10,
  },
  pdfContainer: {
    marginTop: 20,
  },
});

export default FixedAssetLand;
