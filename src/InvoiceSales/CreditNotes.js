/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import moment from 'moment';

const CreditNotes = ({invoice_data}) => {
  const sales_invoice = invoice_data?.sales_invoice || {};

  const date = moment(sales_invoice.invoice_date, 'DD-MM-YYYY')
    .subtract(2, 'months')
    .format('DD-MM-YYYY');
  const due_date = moment(date, 'DD-MM-YYYY')
    .add(7, 'days')
    .format('DD-MM-YYYY');

  const renderItem = ({item, index}) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.center]}>{index + 1}</Text>
      <Text style={styles.tableCell}>{item.description}</Text>
      <Text style={[styles.tableCell, styles.center]}>
        {item.rate.toLocaleString('en-IN')}
      </Text>
      <Text style={[styles.tableCell, styles.center]}>{item.qty}</Text>
      <Text style={[styles.tableCell, styles.end]}>
        {item.amount.toLocaleString('en-IN')}
      </Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {/* <Image source={creditnote_bg} style={styles.backgroundImage} /> */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>CREDIT NOTE</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Credit Note</Text>
              <Text style={styles.infoLabel}>Credit Note Date</Text>
              <Text style={styles.infoLabel}>Sales invoice no</Text>
              <Text style={styles.infoLabel}>Sales invoice Date</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoValue}>: {sales_invoice.ref_no}</Text>
              <Text style={styles.infoValue}>: {due_date}</Text>
              <Text style={styles.infoValue}>: {sales_invoice.invoice_no}</Text>
              <Text style={styles.infoValue}>: {date}</Text>
            </View>
          </View>
        </View>
        <View style={styles.addressContainer}>
          <View style={styles.addressColumn}>
            <Text style={styles.bold}>From:</Text>
            <Text style={styles.bold}>{sales_invoice.company.companyname}</Text>
            <Text
              style={
                styles.fontcolor
              }>{`${sales_invoice.company.address1} ${sales_invoice.company.address2} ${sales_invoice.company.city} ${sales_invoice.company.pin}, ${sales_invoice.company.state}`}</Text>
          </View>
          <View style={styles.addressColumn}>
            <Text style={styles.bold}>Bill To:</Text>
            <Text style={styles.bold}>
              {sales_invoice.bill_to.customer_name}
            </Text>
            <Text
              style={
                styles.fontcolor
              }>{`${sales_invoice.bill_to.address_1} ${sales_invoice.bill_to.address_2} ${sales_invoice.bill_to.city} ${sales_invoice.bill_to.pin}, ${sales_invoice.bill_to.state}`}</Text>
          </View>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>S.No</Text>
            <Text style={styles.headerCell}>Description</Text>
            <Text style={[styles.headerCell]}>Unit Price</Text>
            <Text style={[styles.headerCell]}>Qty</Text>
            <Text style={[styles.headerCell]}>Amt</Text>
          </View>
          <FlatList
            data={sales_invoice.lineItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.bold}>Sub Total</Text>
            <Text style={styles.fontcolor}>
              {sales_invoice.subtotal.toLocaleString('en-IN')}
            </Text>
          </View>
          {sales_invoice.igst_total > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.bold}>
                IGST {sales_invoice.igst_percentage}%
              </Text>
              <Text style={styles.fontcolor}>
                {sales_invoice.igst_total.toLocaleString('en-IN')}
              </Text>
            </View>
          )}
          {sales_invoice.sgst_total > 0 && (
            <>
              <View style={styles.summaryRow}>
                <Text style={styles.bold}>
                  CGST {sales_invoice.cgst_percentage}%
                </Text>
                <Text style={styles.fontcolor}>
                  {sales_invoice.cgst_total.toLocaleString('en-IN')}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.bold}>
                  SGST {sales_invoice.sgst_percentage}%
                </Text>
                <Text style={styles.fontcolor}>
                  {sales_invoice.sgst_total.toLocaleString('en-IN')}
                </Text>
              </View>
            </>
          )}
          <View style={styles.totalRow}>
            <Text style={styles.bold}>TOTAL</Text>
            <Text style={styles.fontcolor}>
              {sales_invoice.total.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>
        <View style={styles.wordsContainer}>
          <Text style={styles.bold}>Total Amount in words-</Text>
          <Text style={styles.fontcolor}>{sales_invoice.amount_words}</Text>
        </View>
        <View style={styles.signatureContainer}>
          <Text>{sales_invoice.company.companyname}</Text>
          <Text style={styles.center}>-SD-</Text>
          <Text style={styles.center}>Authorised Signature</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fontcolor: {
    color: '#808080',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    backgroundColor: '#2d7bff',
    padding: 10,
    borderRadius: 5,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  titleContainer: {
    marginVertical: 10,
    alignItems: 'center',
    color: '#808080',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 10,
    textAlign:'left',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  addressColumn: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
    color: '#808080',
  },
  tableContainer: {
    marginVertical: 10,
    color: '#808080',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2d7bff',
    padding: 5,
  },
  headerCell: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 11,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#a6a6a5',
    padding: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    paddingHorizontal: 5,
  },
  center: {
    textAlign: 'center',
    color: '#808080',
  },
  end: {
    textAlign: 'right',
    color: '#808080',
  },
  summaryContainer: {
    marginVertical: 10,
    color: '#808080',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    color: '#808080',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#808080',
  },
  wordsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#e6e6e6',
  },
  signatureContainer: {
    alignItems: 'center',
    marginVertical: 20,
    color: '#808080',
  },
});

export default CreditNotes;
