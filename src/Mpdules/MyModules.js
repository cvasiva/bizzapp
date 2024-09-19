/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const MyModules = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.modulebg}>
      <View style={styles.cardbg}>
        <View style={styles.flxmy}>
          <Text style={styles.mycrad}>My Modules</Text>
          <View style={styles.startmodule}>
            <View style={styles.roundmodule}>
              <View style={styles.muduimg}>
                <TouchableOpacity onPress={openModal}>
                  <View style={styles.iconwidthactive}>
                    <Image
                      source={require('../Images/mudoleactive.png')}
                      style={styles.imgbground}
                    />
                    <Text style={styles.billtextactive}>Bill Processing</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.roundmodule}>
              <View style={styles.muduimg}>
                <TouchableOpacity onPress={openModal}>
                  <View style={styles.iconwidth}>
                    <Image
                      source={require('../Images/muduleicon1.png')}
                      style={styles.imgbground}
                    />
                    <Text style={styles.billtext}>Pay Process.</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.roundmodule}>
              <View style={styles.muduimg}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('NewappPage')}>
                  <View style={styles.iconwidth}>
                    <Image
                      source={require('../Images/muduleicon2.png')}
                      style={styles.imgbground}
                    />
                    <Text style={styles.billtext}>Sales Process.</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.roundmodule}>
              <View style={styles.muduimg}>
                <View style={styles.iconwidth}>
                  <Image
                    source={require('../Images/muduleicon.png')}
                    style={styles.imgbground}
                  />
                  <Text style={styles.billtext}>Receipt</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.startmoduler1}>
            <View style={styles.roundmodule}>
              <View style={styles.muduimg}>
                <View style={styles.iconwidth}>
                  <Image
                    source={require('../Images/muduleicon.png')}
                    style={styles.imgbground}
                  />
                  <Text style={styles.billtext}>Salary & Exp.</Text>
                </View>
              </View>
            </View>
            <View style={styles.roundmodule}>
              <View style={styles.muduimg}>
                <View style={styles.iconwidth}>
                  <Image
                    source={require('../Images/muduleicon1.png')}
                    style={styles.imgbground}
                  />
                  <Text style={styles.billtext}>Statutory.</Text>
                </View>
              </View>
            </View>
            <View style={styles.roundmodule}>
              <View style={styles.muduimg}>
                <View style={styles.iconwidth}>
                  <Image
                    source={require('../Images/muduleicon2.png')}
                    style={styles.imgbground}
                  />
                  <Text style={styles.billtext}>Other receipts</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>
                <Icon name="close" size={30} color="#8C8C8C" />
              </Text>
            </TouchableOpacity>
            <Text style={styles.Bill}>Bill Processing</Text>
            <Text style={styles.processing}>
              Bill processing is a business function that involves managing and
              paying supplier invoices
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text
                style={styles.buttonText}
                onPress={() => navigation.navigate('Accountingflow')}>
                Start Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modulebg: {
    backgroundColor: '#F4F7FC',
    width: '100%',
    height: '100%',
  },
  cardbg: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    height: '90%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  flxmy: {
    flex: 1,
    alignItems: 'center',
  },
  mycrad: {
    backgroundColor: '#0ACFFE',
    borderRadius: 5,
    color: '#fff',
    marginTop: -10,
    width: 120,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  roundmodule: {
    backgroundColor: '#fff',
    // height: 40,
    // width: 40,
  },
  startmodule: {
    flex: 1,
    flexDirection: 'row',
    gap: 40,
    paddingTop: 30,
    height: 100,
  },
  startmoduler1: {
    flex: 1,
    flexDirection: 'row',
    gap: 50,
    height: 100,
  },
  muduimg: {
    flex: 1,
    alignItems: 'center',
  },
  // imgbground: {
  //   backgroundColor: '#F4F7FC',
  // },
  iconwidthactive: {
    backgroundColor: '#495AFF',
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    width: 140,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#0ACFFE',
    borderWidth: 5,
    gap: 5,
  },
  iconwidth: {
    backgroundColor: '#C6E1FF',
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    width: 140,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 5,
    gap: 5,
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
    width: 450,
    borderColor: '#BBECFF',
    borderWidth: 5,
  },
  modalText: {
    borderBottomColor: '#2293F0',
    borderBottomWidth: 6,
    width: '80%',
    marginTop: -12,
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
    position: 'relative',
    left: 180,
    // marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  vimy: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  Bill: {
    color: '#022E9F',
    fontWeight: '700',
    fontSize: 18,
  },
  processing: {
    textAlign: 'center',
    color: '#10284B',
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
  },
  billtext: {
    color: '#10284B',
    fontWeight: '800',
  },
  billtextactive: {
    color: '#fff',
    fontWeight: '800',
  },
});
export default MyModules;
