/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Processing = ({navigation, setPage}) => {
  const handleNext = () => {
    setPage(2);
  };
  return (
    <View style={styles.modulebg}>
      <View style={styles.cardbg}>
        <Text>How Does</Text>
        <Text style={styles.Invoice}>Invoice Processing Work?</Text>
        <View style={styles.stepswidth}>
          {/* <Image source={require('../Images/steps.png')} style={styles.steps} /> */}
          <View style={styles.borderline} />
          <View style={styles.cardinvoice}>
            <View style={styles.recogcard}>
              <Image
                source={require('../Images/invoice.png')}
                style={styles.imgicon}
              />
            </View>
            <Text style={styles.vochtext}>Recognition of voucher</Text>
          </View>
          <View style={styles.cardinvoice}>
            <View style={styles.recogcard}>
              <Image source={require('../Images/invoice1.png')} />
            </View>
            <Text style={styles.vochtext}>Checking of Invoice</Text>
          </View>
          <View style={styles.cardinvoice}>
            <View style={styles.recogcard}>
              <Image source={require('../Images/invoice2.png')} />
            </View>
            <Text style={styles.vochtext}>Recording of Transactions</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttonText}
              // onPress={() => navigation.navigate('Accountingflow')}
              onPress={handleNext}>
              Continue
            </Text>
            <Icon
              name="chevron-forward"
              size={20}
              color="#fff"
              style={styles.chepd}
            />
            <Icon
              name="chevron-forward"
              size={20}
              color="#fff"
              style={styles.chepd1}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  chepd: {
    paddingTop: 5,
  },
  chepd1: {
    paddingTop: 5,
    marginLeft: -12,
  },
  vochtext: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  recogcard: {
    backgroundColor: '#2491F0',
    borderRadius: 50,
    padding: 15,
    height: 70,
    width: 70,
  },
  modulebg: {
    backgroundColor: '#F4F7FC',
    width: '100%',
    height: '100%',
  },
  cardbg: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    height: '88%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardinvoice: {
    // backgroundColor:'#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#ECECEC',
    marginTop: 10,
    borderRadius: 10,
    width: 150,
    height: 170,
    borderWidth: 5,
    borderColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  borderline: {
    borderBottomColor: 'black',
    borderBottomWidth: 4,
    marginVertical: 5,
    borderStyle: 'dashed',
    width: 600,
    marginLeft: 10,
    position: 'absolute',
    top: 70,
  },
  stepswidth: {
    width: 700,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
  },
  steps: {
    width: 650,
    height: 200,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 20,
    position: 'relative',
    button: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  Invoice: {
    color: '#133D52',
    fontSize: 20,
    fontWeight: '800',
  },
});
export default Processing;
