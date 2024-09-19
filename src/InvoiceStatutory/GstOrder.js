/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

export default function GstOrder({invoice_data}) {
  const gst_refund = invoice_data?.gst_refund || {};
  const gst_order = gst_refund?.gst_order || {};
  const userCompany = invoice_data.usercompany || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Seal_of_Karnataka.svg',
        }}
        style={styles.seal}
      />
      <Text style={styles.header}>Government of Karnataka</Text>
      <Text style={styles.subHeader}>COMMERCIAL TAXES DEPARTMENT</Text>
      <Text style={styles.officeAddress}>
        Office of the Assistant Commissioner of Commercial Taxes, Local Goods
        and Service Tax Office
      </Text>
      <Text style={styles.formNumber}>FORM-GST-RFD-06</Text>
      <Text style={styles.rules}>
        [See rule 92(1), 92(3), 92(4), 92(5) & 96(7)]
      </Text>
      <View style={styles.orderDateContainer}>
        <Text>Order No.: LGST/GST/REFUND/-April-2021-22</Text>
        <Text style={styles.date}>
          Date: {gst_order.acknowledgement_date || 'N/A'}
        </Text>
      </View>

      <Text style={styles.toText}>To</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>GSTIN / TRADE NAME</Text>
          <Text style={styles.tableCell}>
            {userCompany.companyname || 'N/A'}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>ADDRESS</Text>
          <Text style={styles.tableCell}>{userCompany.address1 || 'N/A'}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>PERIOD / RFD ARN</Text>
          <Text style={styles.tableCell}>{userCompany.id || 'N/A'}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>ACKNOWLEDGMENT NO / DATE</Text>
          <Text style={styles.tableCell}>{userCompany.createdAt || 'N/A'}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>SANCTION ORDER NO / DATE</Text>
          <Text style={styles.tableCell}>{userCompany.updatedAt || 'N/A'}</Text>
        </View>
      </View>

      <Text style={styles.refundSection}>Refund Section</Text>
      <Text style={styles.greeting}>Sir/Madam,</Text>
      <Text style={styles.intro}>
        This has reference to your above mentioned application for refund filed
        under section 54 of the Act, 2017. Upon examination of your application,
        the amount of refund sanctioned to you, after adjustment of dues (where
        applicable) is as follows:
      </Text>

      <View style={styles.detailsTable}>
        <View style={styles.detailsTableRow}>
          <Text style={styles.detailsTableCell}>Sr No</Text>
          <Text style={styles.detailsTableCell}>Description</Text>
          <Text style={styles.detailsTableCell}>Center Tax</Text>
          <Text style={styles.detailsTableCell}>State Tax/UT</Text>
          <Text style={styles.detailsTableCell}>IGST</Text>
        </View>
        {gst_order.details?.map((val, index) => (
          <View key={index} style={styles.detailsTableRow}>
            <Text style={styles.detailsTableCell}>{val.si_no || 'N/A'}</Text>
            <Text style={styles.detailsTableCell}>
              {val.description || 'N/A'}
            </Text>
            <Text style={styles.detailsTableCell}>
              {new Intl.NumberFormat('en-IN').format(val.central_tax || 0)}
            </Text>
            <Text style={styles.detailsTableCell}>
              {new Intl.NumberFormat('en-IN').format(val.state_tax || 0)}
            </Text>
            <Text style={styles.detailsTableCell}>
              {new Intl.NumberFormat('en-IN').format(val.igst || 0)}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.order}>Order</Text>
      <Text style={styles.orderText}>
        1. I hereby sanction an amount of Rs.___________ to
        M/s__________________________________
      </Text>
      <Text style={styles.orderText}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;under sub-section (5) of
        section 54 of the Act 2017 {userCompany.companyname || 'N/A'}
      </Text>

      <View style={styles.signatureContainer}>
        <View style={styles.signatureLeft}>
          <Text style={styles.fontcolor}>Date:</Text>
          <Text style={styles.fontcolor}>Place:</Text>
        </View>
        <View style={styles.signatureRight}>
          <Text style={styles.fontcolor}>
            Signature:{' '}
            <Text style={styles.signatureName}>
              {userCompany.companyname || 'N/A'}
            </Text>
          </Text>
          <Text style={styles.fontcolor}>Designation: Asst Commissioner Commercial Taxes</Text>
          <Text style={styles.fontcolor}>Office Address:</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fontcolor:{
    color:'#808080',
  },
  container: {
    padding: 10,
    width: 600,
  },
  seal: {
    alignSelf: 'center',
    marginBottom: 10,
    color:'#808080',
  },
  header: {
    textAlign: 'center',
    fontSize: 16,
    color:'#808080',
  },
  subHeader: {
    textAlign: 'center',
    fontSize: 12,
    color:'#808080',
  },
  officeAddress: {
    textAlign: 'center',
    color:'#808080',
  },
  formNumber: {
    marginTop: 0,
    color:'#808080',
  },
  rules: {
    marginTop: 0,
    color:'#808080',
  },
  orderDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    color:'#808080',
  },
  date: {
    textAlign: 'center',
    color:'#808080',
  },
  toText: {
    marginTop: 0,
    color:'#808080',
  },
  table: {
    width: '100%',
    marginTop: 0,
    color:'#808080',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 4,
    color:'#808080',
  },
  tableCell: {
    flex: 1,
    padding: 4,
    color:'#808080',
  },
  refundSection: {
    marginTop: 8,
    fontWeight: 'bold',
    color:'#808080',
  },
  greeting: {
    marginTop: 0,
    color:'#808080',
  },
  intro: {
    marginTop: 0,
    color:'#808080',
  },
  detailsTable: {
    width: '100%',
    marginTop: 8,
    color:'#808080',
  },
  detailsTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 4,
  },
  detailsTableCell: {
    flex: 1,
    padding: 4,
    textAlign: 'center',
    color:'#808080',
  },
  order: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    color:'#808080',
  },
  orderText: {
    marginTop: 0,
    color:'#808080',
  },
  signatureContainer: {
    flexDirection: 'row',
    marginTop: 8,
    color:'#808080',
  },
  signatureLeft: {
    flex: 0.6,
    color:'#808080',
  },
  signatureRight: {
    flex: 0.4,
    alignItems: 'flex-end',
    color:'#808080',
  },
  signatureName: {
    fontSize: 14,
    fontFamily: 'signatura',
    color: 'darkblue',
    transform: [{rotate: '-10deg'}],
  },
});
