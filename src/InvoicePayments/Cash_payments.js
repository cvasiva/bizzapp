/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import moment from 'moment';
import ReceiverSignature from '../Invoice/ReceiverSignature';
import AuthorisedSignature from '../Invoice/AuthorisedSignature';

const Cash_payments = ({invoice_data}) => {
  const renderBill = templateData => {
    // const company = templateData.usercompany;
    const invoice = templateData.invoice.bill_to;
    const employee = templateData.employee;
    const invoiceList = [templateData.invoice];

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cash Voucher</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>
              {invoice_data.invoice.company.companyname}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>Material Purchase</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Text style={styles.label}>Voucher No:</Text>
              <Text style={styles.value}>{templateData.voucher_no}</Text>
            </View>
            <View style={styles.rowItem}>
              <Text style={styles.label}>Claim Date:</Text>
              <Text style={styles.value}>
                {moment(employee.claim_date).format('DD-MM-YYYY')}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Type of Expenses:</Text>
            <Text style={styles.value}>{employee.type_of_expenses}</Text>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Invoice date</Text>
              <Text style={styles.tableHeaderText}>Invoice NO</Text>
              <Text style={styles.tableHeaderText}>
                Description of the Expenditure
              </Text>
              <Text style={styles.tableHeaderText}>Amt in INR</Text>
            </View>
            <FlatList
              data={invoiceList}
              renderItem={({item}) => (
                <>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>
                      {moment(item.invoice_date, 'DD-MM-YYYY').format(
                        'DD-MM-YYYY',
                      )}
                    </Text>
                    <Text style={styles.tableCell}>{item.invoice_no}</Text>
                    <Text style={styles.tableCell}>
                      {item.lineItems[0].description}
                    </Text>
                    <Text style={styles.tableCell}>
                      {new Intl.NumberFormat('en-IN').format(item.total)}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell} />
                    <Text style={styles.tableCell} />
                    <Text style={styles.tableCell}>Total</Text>
                    <Text style={styles.tableCell}>
                      {new Intl.NumberFormat('en-IN').format(item.total)}
                    </Text>
                  </View>
                </>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.signaturesRow}>
              <View style={styles.signatureCell}>
                <ReceiverSignature companyNameSignature={invoice.companyname} />
                <Text style={styles.tableHeaderText}>Signature</Text>
              </View>
              {/* <View style={styles.signatureCell}>
                <Stamp company={invoice.companyname} />
              </View> */}
              <View style={styles.signatureCell}>
                <AuthorisedSignature
                  companyNameSignature={invoice.companyname}
                />
                <Text style={styles.tableHeaderText}>Authorized Signature</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {invoice_data && invoice_data.invoice && renderBill(invoice_data)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#5243FF',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
    color: '#000',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#009AD8',
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  rowItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2B2B2B',
    flex: 1,
  },
  value: {
    fontSize: 12,
    color: '#2B2B2B',
    flex: 2,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#CCC',
    paddingVertical: 10,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#808080',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color:'#808080',
  },
  signaturesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    color:'#808080',
  },
  signatureCell: {
    flex: 1,
    alignItems: 'center',
    color:'#808080',
  },
  scrollView: {
    flexGrow: 1,
    width:600,
    color:'#808080',
  },
});

export default Cash_payments;
