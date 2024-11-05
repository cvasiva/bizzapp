/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable radix */
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
import AuthorisedSignature from '../Invoice/AuthorisedSignature';
import ReceiverSignature from '../Invoice/ReceiverSignature';

const CustomerOrder = ({invoice_data}) => {
  const sales_invoice = invoice_data?.sales_invoice || {};
  const foreign_currency = invoice_data?.sub_category;

  const renderItem = ({item, index}) => {
    const rate_usd = parseInt(item.rate / 77);
    const item_amount_usd = item.qty * rate_usd;

    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{index + 1}</Text>
        <Text style={styles.cell}>{item.description}</Text>
        <Text style={styles.cell}>{item.qty}</Text>
        <Text style={styles.cell}>
          {foreign_currency ? '$' : ''}
          {new Intl.NumberFormat('en-IN').format(rate_usd)}
        </Text>
        <Text style={styles.cell}>
          {foreign_currency ? '$' : ''}
          {new Intl.NumberFormat('en-IN').format(item_amount_usd)}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../Images/nisha_steel_n_alloys.png')}
            resizeMode="contain"
            style={styles.logo}
          />
          <View style={styles.address}>
            <Text style={styles.companyName}>
              {sales_invoice.bill_to.customer_name}
            </Text>
            <Text style={styles.addressText}>
              {`${sales_invoice.bill_to.address_1} ${sales_invoice.bill_to.address_2} ${sales_invoice.bill_to.city} ${sales_invoice.bill_to.pin}, ${sales_invoice.bill_to.state}`}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detail}>PO No: {sales_invoice.po_no}</Text>
            <Text style={styles.detail}>
              Date of Order: {sales_invoice.invoice_date}
            </Text>
            <Text style={styles.detail}>Shipped Via: By Air</Text>
            <Text style={styles.detail}>Payment Terms: 30 days</Text>
          </View>
        </View>

        <View style={styles.addressContainer}>
          <View style={styles.addressBox}>
            <Text style={styles.bold}>To:</Text>
            <Text style={styles.companyName}>
              {sales_invoice.company.companyname}
            </Text>
            <Text style={styles.addressText}>
              {`${sales_invoice.company.address1} ${sales_invoice.company.address_2} ${sales_invoice.company.city} ${sales_invoice.company.pin}, ${sales_invoice.company.state}`}
            </Text>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>S.No</Text>
            <Text style={styles.tableHeaderText}>Description</Text>
            <Text style={styles.tableHeaderText}>
              Qty ({sales_invoice.lineItems[0].uom})
            </Text>
            <Text style={styles.tableHeaderText}>Rate</Text>
            <Text style={styles.tableHeaderText}>Amt</Text>
          </View>
          <FlatList
            data={sales_invoice.lineItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalAmount}>
            {foreign_currency ? '$' : ''}
            {new Intl.NumberFormat('en-IN').format(sales_invoice.total)}
          </Text>
        </View>

        <View style={styles.amountWords}>
          <Text style={styles.bold}>Total Amount in words: </Text>
          <Text style={{textAlign: 'right'}}>
            {sales_invoice.amount_words}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.signatureSection}>
            <Text style={styles.signatureLabel}>
              For {sales_invoice.company.companyname}
            </Text>
            <ReceiverSignature
              companyNameSignature={sales_invoice.ship_to.customer_name}
            />
          </View>
          <View style={styles.stampSection}>
            {/* Include Stamp Component here */}
          </View>
          <View style={styles.authorisedSignatureSection}>
            <Text style={styles.signatureLabel}>
              For {sales_invoice.bill_to.customer_name}
            </Text>
            <AuthorisedSignature
              companyNameSignature={sales_invoice.company.companyname}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: 600,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#808080',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
    margin: 10,
  },
  address: {
    flex: 1,
  },
  companyName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#808080',
  },
  addressText: {
    fontSize: 14,
    color: '#808080',
  },
  details: {
    flex: 1,
  },
  detail: {
    fontSize: 14,
    color: '#808080',
  },
  addressContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  addressBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E8E0FE',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#808080',
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#808080',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 5,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#808080',
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#808080',
  },
  amountWords: {
    marginTop: 10,
    color: '#808080',
    flex: 1,
    flexDirection: 'column',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  signatureSection: {
    flex: 1,
    alignItems: 'center',
  },
  stampSection: {
    flex: 1,
    alignItems: 'center',
  },
  authorisedSignatureSection: {
    flex: 1,
    alignItems: 'center',
  },
  signatureLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#808080',
  },
});

export default CustomerOrder;
