/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const EsiPayment = ({invoice_data}) => {
  const esiPayment = invoice_data?.esi_payments || {};
  const transactionDetails = esiPayment.transaction_details || {};
  const userDetails = esiPayment.user_details || {};

  return (
    <ScrollView>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.colorBlock1} />
          <View style={styles.colorBlock2} />
          <View style={styles.colorBlock3} />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>ESIC</Text>
          <Text style={styles.subTitle}>
            Employees State Insurance Corporation
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>User Login:</Text>
            <Text style={styles.value}>{userDetails.user_login}</Text>
          </View>

          <Text style={styles.sectionTitle}>
            Monthly Contribution Online Challan Status
          </Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Transaction Details</Text>
              <Text style={styles.tableCell} />
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Transaction Status:</Text>
              <Text style={styles.tableCell}>
                {transactionDetails.transaction_status}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Employer's Code No:</Text>
              <Text style={styles.tableCell}>
                {transactionDetails.employer_code}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Employer's Name:</Text>
              <Text style={styles.tableCell}>
                {transactionDetails.employers_name}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Challan Period:</Text>
              <Text style={styles.tableCell}>
                {transactionDetails.challan_period}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Challan Number:</Text>
              <Text style={styles.tableCell}>
                {transactionDetails.challan_no}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Challan Created Date:</Text>
              <Text style={styles.tableCell}>
                {transactionDetails.challan_created_date}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Challan Submitted Date:</Text>
              <Text style={styles.tableCell}>
                {transactionDetails.challan_submit_date}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Amount Paid:</Text>
              <Text style={styles.tableCell}>
                {new Intl.NumberFormat('en-IN').format(
                  transactionDetails.amount_paid,
                )}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Transaction Number:</Text>
              <Text style={styles.tableCell}>
                {transactionDetails.transaction_no}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <View style={styles.footerBlock1} />
            <View style={styles.footerBlock2} />
            <View style={styles.footerBlock3} />
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
    backgroundColor: '#fff',
    width:600,
    color:'#808080',
  },
  header: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    width:600,
    color:'#808080',
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 10,
    color:'#808080',
  },
  colorBlock1: {
    flex: 1,
    backgroundColor: 'red', // Replace with your color
    height: 50,
    marginRight: 5,
  },
  colorBlock2: {
    flex: 1,
    backgroundColor: 'green', // Replace with your color
    height: 50,
    marginRight: 5,
  },
  colorBlock3: {
    flex: 1,
    backgroundColor: 'blue', // Replace with your color
    height: 50,
  },
  detailsContainer: {
    marginBottom: 20,
    color:'#808080',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color:'#808080',
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    backgroundColor: '#7A67B6',
    padding: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    color:'#808080',
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    color:'#808080',
  },
  value: {
    flex: 2,
    color:'#808080',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  table: {
    borderWidth: 1,
    borderColor: '#9999ff',
    borderRadius: 4,
    overflow: 'hidden',
    color:'#808080',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    color:'#808080',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color:'#808080',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    color:'#808080',
  },
  footerRow: {
    flexDirection: 'row',
    marginBottom: 10,
    color:'#808080',
  },
  footerBlock1: {
    flex: 1,
    backgroundColor: 'black', // Replace with your color
    height: 50,
    marginRight: 5,
    color:'#808080',
  },
  footerBlock2: {
    flex: 1,
    backgroundColor: 'yellow', // Replace with your color
    height: 50,
    marginRight: 5,
    color:'#808080',
  },
  footerBlock3: {
    flex: 1,
    backgroundColor: 'black', // Replace with your color
    height: 50,
    color:'#808080',
  },
});

export default EsiPayment;
