/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const PaymentReceipt = ({invoice_data}) => {
  const pf_payment = invoice_data?.pf_payment || {};
  const receipt = pf_payment?.receipt || {};
  return (
    <ScrollView>
      <View Style={styles.container}>
        <View style={styles.header}>
          {/* <Image source={{uri: 'path/to/emp.png'}} style={styles.logo} /> */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              Employee's Provident Fund Organization
            </Text>
            <Text style={styles.headerText}>
              {receipt.main_address.address}
            </Text>
          </View>
        </View>

        <View style={styles.receiptContainer}>
          <Text style={styles.title}>Payment Confirmation Receipt</Text>

          <View style={styles.table}>
            {Object.entries(receipt.payment_receipt).map(([key, value]) => (
              <View key={key} style={styles.row}>
                <Text style={styles.cell}>{key.replace(/_/g, ' ')}:</Text>
                <Text style={styles.cell}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    width: 700,
    color:'#808080',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    color:'#808080',
  },
  logo: {
    width: 80,
    height: 70,
    marginRight: 10,
    color:'#808080',
  },
  headerTextContainer: {
    justifyContent: 'center',
    color:'#808080',
  },
  headerText: {
    fontWeight: 'bold',
    color:'#808080',
  },
  receiptContainer: {
    paddingHorizontal: 16,
    color:'#808080',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    color:'#808080',
  },
  table: {
    borderWidth: 1,
    borderColor: '#9999ff',
    borderRadius: 4,
    overflow: 'hidden',
    color:'#808080',
  },
  row: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    color:'#808080',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color:'#808080',
  },
});

export default PaymentReceipt;
