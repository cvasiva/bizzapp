/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

const FixedAssetLanddeed = ({invoice_data}) => {
  const invoice = invoice_data?.invoice || {};
  const po = invoice_data?.po || {};

  const renderCompany = () => {
    if (po?.company) {
      return (
        <View style={styles.companyDetail}>
          <Text style={styles.companyName}>{po.company.companyname}</Text>
          <Text style={styles.companyAddress}>
            {po.company.address_1} {po.company.address_2} {po.company.city}{' '}
            {po.company.pin}, {po.company.state}
          </Text>
          {po.company.logo && (
            <Image
              source={{
                uri: `https://skillcdn.storage.googleapis.com/${po.company.logo}`,
              }}
              style={styles.logo}
            />
          )}
        </View>
      );
    }
    return null;
  };

  if (invoice_data && invoice && po) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          {po && renderCompany()}
          <View style={styles.pdfContainer}>
            <Text>
              PDF Viewer is not directly supported in React Native, consider
              using a WebView or another method.
            </Text>
          </View>
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

export default FixedAssetLanddeed;
