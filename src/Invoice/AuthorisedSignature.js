/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const AuthorisedSignature = props => {
  const companyNameSignature = props.companyNameSignature;
  const signatureTwoWords = companyNameSignature
    .split(' ')
    .slice(0, 2)
    .join(' ');

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.signatureText}>
          <Text style={styles.signature}>{signatureTwoWords}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  textContainer: {
    backgroundColor: 'transparent',
    marginTop: -3,
    marginRight: 20,
    marginLeft: 0,
  },
  signatureText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'signatura',
    transform: [{rotate: '-5deg'}],
    color: 'darkblue',
  },
});

export default AuthorisedSignature;
