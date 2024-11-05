/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const CompanyDetail2 = ({company}) => {
  // const trimmedLogoUrl = company?.logo;

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../Images/nisha_steel_n_alloys.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={[styles.companyName]}>
          {company?.companyname || 'Company Name Unavailable'}
        </Text>
        {company ? (
          <Text style={styles.address}>
            Address: {company.address1 || company.address_1} {company.city}{' '}
            {company.pin_code}, {company.state}
          </Text>
        ) : (
          <Text style={styles.address}>Address Unavailable</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height:50,
    width:50,
    margin:10,
  },
  detailsContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#808080',
  },
  address: {
    fontSize: 14,
    color: '#808080',
  },
});

export default CompanyDetail2;
