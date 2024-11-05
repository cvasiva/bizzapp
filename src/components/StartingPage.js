/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
const StartingPage = ({navigation}) => {
  const image = require('../Images/maxresdefault.png');

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.overlayContainer}>
        <View style={styles.bgCard}>
          <View style={styles.bgBizz}>
            <Text style={styles.whiteText}>Welcome to</Text>
            <View style={styles.iconContainer}>
              <Image
                source={require('../Images/bizzicon.png')}
                style={styles.icon}
              />
            </View>
            <Text style={styles.enterText}>
              Enter into Virtual Reality of Accounting..
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text
                style={styles.buttonText}
                onPress={() => navigation.navigate('loginpage')}>
                Start Now{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'relative',
    left: 150,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: -350,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  bgCard: {
    backgroundColor: '#01BAF2',
    width: 500,
    height: '100%',
    borderBottomRightRadius: 180,
    borderTopRightRadius: 180,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 25,
  },
  bgBizz: {
    backgroundColor: '#11294D',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 250,
    borderTopRightRadius: 250,
  },
  whiteText: {
    color: '#fff',
    fontSize: 20,
  },
  iconContainer: {
    width: '65%',
    height: 100,
    marginTop: 10,
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  enterText: {
    color: '#fff',
    paddingTop: 20,
  },
});

export default StartingPage;
