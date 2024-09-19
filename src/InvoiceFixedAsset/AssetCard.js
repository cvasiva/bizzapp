/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import moment from 'moment';
import AuthorisedSignature from '../Invoice/AuthorisedSignature';

const AssetCard = ({invoice = {}, po = {}, data = {}}) => {
  const locationPath = 'example-path'; // Adjust based on your logic or navigation

  // Safeguard against undefined values
  const invoiceDate = invoice.invoice_date
    ? moment(invoice.invoice_date, 'DD-MM-YYYY').format('DD-MM-YYYY')
    : '';
  const poNo = po.po_no || '-';
  const poDate = po.po_date || '-';
  const voucherNo = data.voucher_no || '-';
  const invoiceNo = invoice.invoice_no || '-';
  const companyName = invoice.company?.companyname || 'Unknown Company';
  const billToCompanyName = invoice.bill_to?.companyname || 'Unknown Company';

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerText}>ASSET CARD</Text>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Fixed Asset No</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.labelfont}>{data.asset_no || '-'}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Date of Capitalization</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.labelfont}>{invoiceDate}</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoLabel}>
          <Text style={styles.label}>Purchase Order No. & Date</Text>
          <Text style={styles.label}>GRN No. & Date</Text>
          <Text style={styles.label}>Voucher NO. & Date</Text>
          <Text style={styles.label}>Invoice NO. & Date</Text>
          <Text style={styles.label}>Supplier Name</Text>
        </View>
        <View style={styles.infoValue}>
          <Text style={styles.labelfont}>
            {poNo} & {poDate}
          </Text>
          <Text style={styles.labelfont}>{invoiceDate}</Text>
          <Text style={styles.labelfont}>
            {voucherNo} & {invoiceDate}
          </Text>
          <Text style={styles.labelfont}>
            {invoiceNo} & {invoiceDate}
          </Text>
          <Text style={styles.labelfont}>{companyName}</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.label}>Description of Material</Text>
          <Text style={styles.label}>Qty/KG/Sq.ft</Text>
          <Text style={styles.label}>Cost</Text>
        </View>
        {invoice.lineItems &&
          invoice.lineItems.length > 0 &&
          invoice.lineItems.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCell}>{invoiceDate}</Text>
              <Text style={styles.tableCell}>{item.description}</Text>
              <Text style={styles.tableCell}>{item.qty}</Text>
              <Text style={styles.tableCell}>
                {new Intl.NumberFormat('en-IN').format(invoice.subtotal)}
              </Text>
            </View>
          ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.serialNo}>Serial No: {data.asset_no || '-'}</Text>
          <Text style={styles.info}>
            <Text style={styles.bold}>Asset Type: </Text>
            {locationPath || '-'}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.bold}>Location of Asset: </Text>As per factory
            layout
          </Text>
        </View>
        <View style={styles.signatureContainer}>
          <Text style={styles.companyName}>{billToCompanyName}</Text>
          <AuthorisedSignature companyNameSignature={companyName} />
          <Text style={styles.signatureLabel}>Authorised Signature</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#808080',
    fontWeight: 'bold',
  },
  labelfont: {
    color: '#808080',
  },
  header: {
    backgroundColor: '#66BF34',
    paddingVertical: 10,
    alignItems: 'center',
    width: 600,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableContainer: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#A57DB1',
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    padding: 15,
    borderRightWidth: 1,
    borderRightColor: '#A57DB1',
  },
  cellText: {
    fontWeight: 'bold',
    color: '#808080',
  },
  infoContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  infoLabel: {
    flex: 1,
    paddingRight: 10,
  },
  infoValue: {
    flex: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#66BF34',
    color: '#fff',
    paddingVertical: 5,
    borderBottomWidth: 3,
    borderBottomColor: '#1F4037',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#A57DB1',
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
    color: '#808080',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  footerLeft: {
    flex: 1,
  },
  stampContainer: {
    flex: 2,
    alignItems: 'center',
  },
  signatureContainer: {
    flex: 3,
    alignItems: 'flex-end',
  },
  serialNo: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#808080',
  },
  info: {
    marginBottom: 5,
    color: '#808080',
  },
  bold: {
    fontWeight: 'bold',
  },
  companyName: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#808080',
    fontWeight: 'bold',
  },
  signatureLabel: {
    textAlign: 'center',
    color: '#808080',
    fontWeight: 'bold',
  },
});

export default AssetCard;
