/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import moment from 'moment';

const InternetBill = ({invoice_data}) => {
  const {invoice, po} = invoice_data;

  const renderLineItem = ({item, index}) => (
    <View style={styles.tableRow} key={index}>
      <Text style={styles.tableCell}>{index + 1}</Text>
      <Text style={styles.tableCell}>{item.description}</Text>
      <Text style={styles.tableCell}>{item.qty}</Text>
      <Text style={styles.tableCell}>
        {new Intl.NumberFormat('en-IN').format(item.rate)}
      </Text>
      <Text style={styles.tableCell}>
        {new Intl.NumberFormat('en-IN').format(item.amount)}
      </Text>
      <Text style={styles.tableCell}>
        {new Intl.NumberFormat('en-IN').format(item.amount)}
      </Text>
    </View>
  );

  return (
    <ScrollView>
      {invoice && (
        <View style={styles.invoiceContainer}>
          <View style={styles.logoContainer}>
            {invoice.company.logo && (
              <Image
                source={{
                  uri: `https://skillcdn.storage.googleapis.com/${invoice.company.logo.trim()}`,
                }}
                style={styles.logo}
              />
            )}
          </View>
          <Text style={styles.title}>INTERNET BILL</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>{invoice.company.companyname}</Text>
              </Text>
              <Text style={styles.detailText}>{invoice.company.address_1}</Text>
              <Text style={styles.detailText}>
                Account No: {invoice.pin_code}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>Invoice No:</Text>{' '}
                {invoice.invoice_no}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>Invoice Date:</Text>{' '}
                {invoice.invoice_date}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>GSTIN:</Text> {invoice.company.gstin}
              </Text>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>{invoice.bill_to.companyname}</Text>
              </Text>
              <Text style={styles.detailText}>
                {invoice.bill_to.address_1} {invoice.bill_to.address_2}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>GSTIN:</Text> {po.company.gstin}
              </Text>
            </View>
          </View>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Billing Period</Text>
              <Text style={styles.summaryText}>{invoice.invoice_date}</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Invoice Date</Text>
              <Text style={styles.summaryText}>{invoice.invoice_date}</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Amount Payable</Text>
              <Text style={styles.summaryText}>
                {new Intl.NumberFormat('en-IN').format(invoice.total)}
              </Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Due Date</Text>
              <Text style={styles.summaryText}>
                {moment(invoice.invoice_date, 'DD-MM-YYYY')
                  .endOf('month')
                  .format('DD-MM-YYYY')}
              </Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Amount After Due</Text>
              <Text style={styles.summaryText}>
                {new Intl.NumberFormat('en-IN').format(invoice.total)}
              </Text>
            </View>
          </View>

          <Text style={styles.chargesTitle}>Invoice Charges:</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Plan Name</Text>
              <Text style={styles.tableHeaderCell}>From Date</Text>
              <Text style={styles.tableHeaderCell}>To Date</Text>
              <Text style={styles.tableHeaderCell}>Quantity</Text>
              <Text style={styles.tableHeaderCell}>Rental</Text>
              <Text style={styles.tableHeaderCell}>Net Amount</Text>
            </View>
            <FlatList
              data={invoice.lineItems}
              renderItem={renderLineItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.tableFooter}>
              <View style={styles.tableFooterRow}>
                <Text style={styles.tableFooterCell}>Sub Total</Text>
                <Text style={styles.tableFooterCell}>
                  {new Intl.NumberFormat('en-IN').format(invoice.subtotal)}
                </Text>
              </View>
              <View style={styles.tableFooterRow}>
                <Text style={styles.tableFooterCell}>
                  CGST: {invoice.cgst_percentage}%
                </Text>
                <Text style={styles.tableFooterCell}>
                  {new Intl.NumberFormat('en-IN').format(po.sgst_total)}
                </Text>
              </View>
              <View style={styles.tableFooterRow}>
                <Text style={styles.tableFooterCell}>
                  SGST: {invoice.sgst_percentage}%
                </Text>
                <Text style={styles.tableFooterCell}>
                  {new Intl.NumberFormat('en-IN').format(po.cgst_total)}
                </Text>
              </View>
              <View style={styles.tableFooterRow}>
                <Text style={styles.tableFooterCell}>TOTAL</Text>
                <Text style={styles.tableFooterCell}>
                  {new Intl.NumberFormat('en-IN').format(invoice.total)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor:
      'radial-gradient(84% 84% at 0% 16%, rgb(137, 127, 255) 0%, rgb(82, 67, 255) 100%)',
    paddingVertical: 10,
  },
  button: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  activeButton: {
    backgroundColor: '#FFC107',
  },
  inactiveButton: {
    backgroundColor: '#FFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacer: {
    width: '50%',
  },
  iconContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  invoiceContainer: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
    width: 600,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    // height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
    textAlign: 'center',
    color: '#808080',
  },
  detailsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  detailsColumn: {
    flex: 1,
    padding: 5,
  },
  detailText: {
    fontSize: 11,
    color: '#5A5A5A',
  },
  bold: {
    fontWeight: 'bold',
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  summaryBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    margin: 5,
    padding: 10,
  },
  summaryTitle: {
    fontWeight: 'bold',
    color:'#808080',
  },
  summaryText: {
    fontSize: 12,
    color:'#808080',
  },
  chargesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: 'red',
    marginVertical: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    padding: 5,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#808080',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 5,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color:'#808080',
  },
  tableFooter: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 5,
  },
  tableFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  tableFooterCell: {
    flex: 1,
    textAlign: 'right',
    color:'#808080',
  },
});

export default InternetBill;
