/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

export default function GstAcknoledgement({invoice_data}) {
  const gst_refund = invoice_data?.gst_refund || {};
  const acknowledgement = gst_refund.gst_acknowledgement || {};
  const amountClaimed = acknowledgement.amount_claimed || {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header} />

      <View style={styles.content}>
        <Text style={styles.title}>Refund ARN Receipt</Text>
        <Text style={styles.subtitle}>
          This is an application receipt for Refund application GST RFD-01 filed
          by you at the common portal:
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>
              Application Reference Number (ARN):
            </Text>
            <Text style={styles.tableCell}>
              {acknowledgement.application_number || 'N/A'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Date of Application:</Text>
            <Text style={styles.tableCell}>
              {acknowledgement.application_date || 'N/A'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>
              Time of Filing of Application:
            </Text>
            <Text style={styles.tableCell}>
              {acknowledgement.time || 'N/A'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>GSTIN/ UIN/ Temporary ID:</Text>
            <Text style={styles.tableCell}>
              {acknowledgement.gstin_id || 'N/A'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Trade Name:</Text>
            <Text style={styles.tableCell}>
              {acknowledgement.trade_name || 'N/A'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Reason of Refund:</Text>
            <Text style={styles.tableCell}>
              {acknowledgement.reason_refund || 'N/A'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Center Jurisdiction:</Text>
            <Text style={styles.tableCell}>
              {acknowledgement.center_jurisdiction || 'N/A'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Financial Year:</Text>
            <Text style={styles.tableCell}>
              {acknowledgement.financial_year || 'N/A'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Month(s):</Text>
            <Text style={styles.tableCell}>
              {acknowledgement.month || 'N/A'}
            </Text>
          </View>
        </View>

        <Text style={styles.amountTitle}>
          Amount of Refund Claimed (In INR)
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, styles.tableHeaderFirst]}>
              Head
            </Text>
            <Text style={styles.tableHeader}>IGST Tax</Text>
            <Text style={styles.tableHeader}>Center Tax</Text>
            <Text style={styles.tableHeader}>State Tax</Text>
            <Text style={styles.tableHeader}>Total</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              {amountClaimed.head
                ? new Intl.NumberFormat('en-IN').format(amountClaimed.head)
                : 'N/A'}
            </Text>
            <Text style={styles.tableCell}>
              {amountClaimed.igst
                ? new Intl.NumberFormat('en-IN').format(amountClaimed.igst)
                : 'N/A'}
            </Text>
            <Text style={styles.tableCell}>
              {amountClaimed.cental_tax
                ? new Intl.NumberFormat('en-IN').format(
                    amountClaimed.cental_tax,
                  )
                : 'N/A'}
            </Text>
            <Text style={styles.tableCell}>
              {amountClaimed.state_tax
                ? new Intl.NumberFormat('en-IN').format(amountClaimed.state_tax)
                : 'N/A'}
            </Text>
            <Text style={styles.tableCell}>
              {amountClaimed.total
                ? new Intl.NumberFormat('en-IN').format(amountClaimed.total)
                : 'N/A'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#808080',
  },
  subtitle: {
    marginBottom: 10,
    color:'#808080',
  },
  amountTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#808080',
    marginVertical: 10,
  },
  table: {
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#808080',
  },
  tableHeaderFirst: {
    flex: 2,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color:'#808080',
  },
  footer: {
    marginTop: 20,
  },
});
