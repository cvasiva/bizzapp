/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import moment from 'moment';

const CommunicationExpenses = props => {
  const {invoice_data} = props;
  const renderCompany = invoiceData => {
    const billTo = invoiceData.invoice.bill_to;
    const supplier = invoiceData.po.supplier;
    const invoice = invoiceData.invoice;
    const dateFormat = 'YYYY-MM-DD';
    const date = moment(invoice.invoice_date, dateFormat);
    const randomWeight = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

    return (
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Speed Post Receipt</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsRow}>
                <Text style={styles.label}>Invoice No</Text>
                <Text style={styles.value}>{invoice.invoice_no}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.label}>Invoice Date</Text>
                <Text style={styles.value}>
                  {date.format('YYYY-MM-DD')}
                </Text>
              </View>
            </View>
            <Text style={styles.deliveryText}>Delivery</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoHeader}>From:</Text>
              <Text style={styles.infoHeader1}>{supplier.companyname}</Text>
              <Text style={styles.infoHeader1}>{supplier.address_1}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoHeader}>To:</Text>
              <Text style={styles.infoHeader1}>{billTo.companyname}</Text>
              <Text style={styles.infoHeader1}>{billTo.address_1}</Text>
            </View>
            <View style={styles.infoDetails}>
              <Text style={styles.infoHeader1}>Weight: {randomWeight} grms</Text>
              <Text style={styles.infoHeader1}>Amt: {invoice.subtotal}</Text>
              <Text style={styles.infoHeader1}>CGST: {invoice.cgst_total}</Text>
              <Text style={styles.infoHeader1}>SGST: {invoice.sgst_total}</Text>
              <Text style={styles.infoHeader1}>Sub Total: {invoice.total}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  if (invoice_data) {
    return renderCompany(invoice_data);
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor:
      'radial-gradient(84% 84% at 0% 16%, rgb(137, 127, 255) 0%, rgb(82, 67, 255) 100%)',
    padding: 16,
  },
  button: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  buttonWarning: {
    backgroundColor: '#FDD7A8',
  },
  buttonWhite: {
    backgroundColor: 'white',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  spacer: {
    width: '50%',
  },
  iconContainer: {
    width: '15%',
  },
  card: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDD7A8',
    backgroundColor: 'white',
    width: 600,
    color: '#808080',
  },
  cardHeader: {
    backgroundColor: '#D1213B',
    padding: 8,
    borderRadius: 4,
  },
  cardHeaderText: {
    color: 'white',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  cardBody: {
    backgroundColor: '#FDD7A8',
    padding: 8,
    borderRadius: 4,
  },
  detailsContainer: {
    flexDirection: 'column',
  },
  detailsRow: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    textAlign: 'right',
  },
  deliveryText: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: -20,
  },
  infoContainer: {
    marginTop: 16,
  },
  infoBox: {
    borderWidth: 1,
    borderColor: '#FDD7A8',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  infoHeader: {
    fontWeight: 'bold',
    color: '#808080',
  },
  infoHeader1: {
    color: '#808080',
  },
  infoDetails: {
    marginTop: 16,
  },
});

export default CommunicationExpenses;
