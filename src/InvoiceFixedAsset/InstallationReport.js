/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
// import moment from 'moment';
import AuthorisedSignature from '../Invoice/AuthorisedSignature';

const InstallationReport = ({invoice_data}) => {
  const invoice = invoice_data?.invoice || {};
  const po = invoice_data?.po || {};

  // const trimmedLogoUrl =
  //   invoice.company && invoice.company.logo ? invoice.company.logo.trim() : '';

  const companyName = po.company?.companyname || '';
  const companyAddress = invoice.company
    ? `${invoice.company.address1 || invoice.company.address_1} ${
        invoice.company.city
      } ${invoice.company.pin_code}, ${invoice.company.state}`
    : '';

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          {invoice.company && invoice.company.logo ? (
            <Image
              source={require('../Images/nisha_steel_n_alloys.png')}
              resizeMode="contain"
              style={styles.logo}
            />
          ) : null}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{companyName}</Text>
            {companyAddress ? (
              <Text style={styles.labelfont}>Address: {companyAddress}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.separator} />

        <Text style={styles.title}>INSTALLATION REPORT</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>GRN No.</Text>
              <Text style={styles.detailsValue}>
                {invoice_data.asset_no || '-'}
              </Text>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>GRN Date</Text>
              <Text style={styles.detailsValue}>
                {invoice_data.invoice
                  ? `${invoice_data.invoice.invoice_date}`
                  : null}
              </Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Supplier Name</Text>
              <Text style={styles.detailsValue}>
                {invoice.company?.companyname || ''}
              </Text>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Invoice No</Text>
              <Text style={styles.detailsValue}>
                {invoice.invoice_no ? `${invoice.invoice_no} ` : '-'}
              </Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Make</Text>
              <Text style={styles.detailsValue}>
                {invoice.fixed_asset_no || 'XXXXXXXXXLS'}
              </Text>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Invoice Date</Text>
              <Text style={styles.detailsValue}>
                {invoice.invoice_date ? `${invoice.invoice_date}` : '-'}
              </Text>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Product</Text>
              <Text style={styles.detailsValue}>
                {invoice.lineItems[0]?.description || ''}
              </Text>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailsLabel}>Qty</Text>
              <Text style={styles.detailsValue}>
                {invoice.lineItems.length > 0 && invoice.lineItems[0]?.qty}
              </Text>
            </View>
          </View>
          <View style={styles.remarksRow}>
            <Text style={styles.remarksLabel}>
              Installation Remarks if any:
            </Text>
          </View>
        </View>

        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxRow}>
            <Text style={styles.checkboxLabel}>Quality Assessment</Text>
            {/* <CheckBox value={true} /> */}
          </View>
          <View style={styles.checkboxRow}>
            <Text style={styles.checkboxLabel}>Product Assessment</Text>
            {/* <CheckBox value={true} /> */}
          </View>
          <Text style={styles.checkboxLabel}>Installation Date:</Text>
        </View>

        <View style={styles.signatureContainer}>
          <Text style={styles.signatureText}>For {companyName}</Text>
          <AuthorisedSignature companyNameSignature={companyName} />
          {/* <View style={styles.signaturePlaceholder} /> */}
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
  container: {
    backgroundColor: '#E8F1FE',
    width: 600,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  logo: {
    width: 50,
    height: 50,
    margin:10,
  },
  companyInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#808080',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
    color: '#808080',
  },
  detailsContainer: {
    marginHorizontal: 15,
  },
  detailsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingVertical: 5,
  },
  detailsColumn: {
    flex: 1,
    flexDirection: 'row',
    borderRightWidth: 1,
    borderRightColor: 'black',
    paddingVertical: 5,
  },
  detailsLabel: {
    fontWeight: 'bold',
    paddingHorizontal: 5,
    color: '#808080',
  },
  detailsValue: {
    paddingHorizontal: 5,
    color: '#808080',
  },
  remarksRow: {
    paddingVertical: 10,
  },
  remarksLabel: {
    fontWeight: 'bold',
    color: '#808080',
  },
  checkboxContainer: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxLabel: {
    flex: 1,
    color: '#808080',
    fontWeight: 'bold',
  },
  signatureContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signatureText: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 10,
    color: '#808080',
  },
  signaturePlaceholder: {
    width: 200,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  },
  signatureLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#808080',
  },
});

export default InstallationReport;
