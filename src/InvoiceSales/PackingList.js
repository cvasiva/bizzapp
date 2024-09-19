/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import CompanyDetail2 from '../Invoiceservice/CompanyDetail2';
import AuthorisedSignature from '../Invoice/AuthorisedSignature';

const PackingList = ({invoice_data}) => {
  const sales_invoice = invoice_data?.sales_invoice || {};
  const totalGrossWeight = sales_invoice.lineItems.reduce(
    (a, v) => a + v.gross_weight,
    0,
  );
  const netWeight = totalGrossWeight - 20;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.companyDetail}>
          <CompanyDetail2 company={sales_invoice.company} />
        </View>
        <View style={styles.gstDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>GSTIN:</Text>
            <Text style={styles.value}>29AABCD9686R1ZC</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>PAN:</Text>
            <Text style={styles.value}>AABCD9686R</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>IEC No:</Text>
            <Text style={styles.value}>{sales_invoice.bill_to.account_no}</Text>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
      <Text style={styles.title}>Packing List</Text>
      <View style={styles.packingList}>
        <View style={styles.billTo}>
          <Text style={styles.bold}>Bill To:</Text>
          <Text style={styles.customerName}>
            {sales_invoice.bill_to.customer_name}
          </Text>
          <Text style={styles.address}>
            {sales_invoice.bill_to.address_1} {sales_invoice.bill_to.address_2}
            {sales_invoice.bill_to.city} {sales_invoice.bill_to.pin},{' '}
            {sales_invoice.bill_to.state}
          </Text>
        </View>
        <View style={styles.packingInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.bold}>Packing List No.:</Text>
            <Text style={styles.value}>{sales_invoice.invoice_no}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.bold}>Packing List Date:</Text>
            <Text style={styles.value}>{sales_invoice.invoice_date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.bold}>No. of Boxes:</Text>
            <Text style={styles.value}>{sales_invoice.po_no}</Text>
          </View>
        </View>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>S.No</Text>
          <Text style={styles.tableHeaderText}>Description</Text>
          <Text style={styles.tableHeaderText}>Qty</Text>
          <Text style={styles.tableHeaderText}>Weight</Text>
          <Text style={styles.tableHeaderText}>Box Size</Text>
        </View>
        {sales_invoice.lineItems.map((item, i) => (
          <View style={styles.tableRow} key={i}>
            <Text style={styles.tableCell}>{i + 1}</Text>
            <Text style={styles.tableCell}>{item.description}</Text>
            <Text style={styles.tableCell}>{item.qty}</Text>
            <Text style={styles.tableCell}>{item.gross_weight}</Text>
            <Text style={styles.tableCell}>
              {item.dimension_height} X {item.dimension_length} X{' '}
              {item.dimension_width}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.bold}>Grossweight:</Text>
          <Text style={styles.value}>{totalGrossWeight}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.bold}>Net weight:</Text>
          <Text style={styles.value}>{netWeight}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.bold}>HSN Code:</Text>
          <Text style={styles.value}>{sales_invoice.lineItems[0].hsn_code}</Text>
        </View>
        {/* <View style={styles.stampContainer}>
          <Stamp company={sales_invoice.company.companyname} />
        </View> */}
        <View style={styles.signatureContainer}>
          <Text style={styles.bold}>
            For {sales_invoice.company.companyname}
          </Text>
          <AuthorisedSignature
            companyNameSignature={sales_invoice.company.companyname}
          />
          <Text style={[styles.bold ,{paddingBottom:20}]}>Authorised Signature</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width:600,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  companyDetail: {
    flex: 7,
  },
  gstDetails: {
    flex: 5,
    paddingTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#808080',
    width: 100,
  },
  value: {
    flex: 1,
    color: '#808080',
  },
  separator: {
    borderBottomColor: '#007bff',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#808080',
    fontSize: 18,
  },
  packingList: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  billTo: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6c757d',
    padding: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#808080',
  },
  customerName: {
    fontWeight: 'bold',
    color: '#808080',
    marginTop: 5,
  },
  address: {
    marginTop: 5,
    color: '#808080',
  },
  packingInfo: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6c757d',
    padding: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#007bff',
    marginVertical: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    padding: 10,
  },
  tableHeaderText: {
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#007bff',
    padding: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#808080',
  },
  footer: {
    marginTop: 10,
  },
  footerItem: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  stampContainer: {
    marginVertical: 10,
  },
  signatureContainer: {
    marginTop: 10,
    alignItems: 'center',
    color: '#808080',
  },
});

export default PackingList;
