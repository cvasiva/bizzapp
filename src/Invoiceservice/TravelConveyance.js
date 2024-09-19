/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import moment from 'moment';
import ReceiverSignature from '../Invoice/ReceiverSignature';
import AuthorisedSignature from '../Invoice/AuthorisedSignature';

const TravelConveyance = props => {
  const {invoice_data} = props;
  const renderBill = templateData => {
    const company = templateData.usercompany;
    const employee = templateData.employee;
    const invoiceList = [templateData.invoice];
    const invoice = invoiceList[0];

    return (
      <ScrollView>
        {company && employee && (
          <View style={styles.billContainer}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Employee Claim Form</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Employee Name:</Text>
                <Text style={styles.value}>{employee.emp_name}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Employee Id:</Text>
                <Text style={styles.value}>{employee.emp_id}</Text>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.infoContainer}>
                  <Text style={styles.label}>Voucher No:</Text>
                  <Text style={styles.value}>{employee.voucher_no}</Text>
                </View>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Claim Date:</Text>
                <Text style={styles.value}>
                  {moment(invoice.invoice_date, 'DD-MM-YYYY').format(
                    'DD-MM-YYYY',
                  )}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Type of Expenses:</Text>
                <Text style={styles.value}>{employee.type_of_expenses}</Text>
              </View>
              <View style={styles.tableContainer}>
                <View style={styles.headerRow}>
                  <Text style={styles.headerCell}>Invoice Date</Text>
                  <Text style={styles.headerCell}>Invoice No</Text>
                  <Text style={styles.headerCell}>
                    Description of the Expenditure
                  </Text>
                  <Text style={styles.headerCell}>Amt in INR</Text>
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
                <View style={styles.signatureContainer}>
                  <View style={styles.signature}>
                    <ReceiverSignature
                      companyNameSignature={employee.emp_name}
                    />
                    <Text style={styles.headerCell}>Employee Signature</Text>
                  </View>
                  {/* <View style={styles.signature}>
                    <Stamp company={invoice.bill_to.companyname} />
                  </View> */}
                  <View style={styles.signature}>
                    <AuthorisedSignature
                      companyNameSignature={invoice.bill_to.companyname}
                    />
                    <Text style={styles.headerCell}>Authorized Signature</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        <View style={styles.footer} />
      </ScrollView>
    );
  };

  return (
    <>{invoice_data && invoice_data.invoice && renderBill(invoice_data)}</>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#808080',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor:
      'radial-gradient(84% 84% at 0% 16%, rgb(137, 127, 255) 0%, rgb(82, 67, 255) 100%)',
    padding: 10,
  },
  headerItem: {
    width: '25%',
  },
  button: {
    padding: 10,
    textAlign: 'center',
  },
  btnWarning: {
    backgroundColor: 'yellow',
  },
  btnWhite: {
    backgroundColor: 'white',
  },
  billContainer: {
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
    padding: 10,
    width: 600,
  },
  card: {
    borderColor: '#009AD8',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
  cardHeader: {
    backgroundColor: '#009AD8',
    padding: 10,
    borderRadius: 5,
  },
  cardTitle: {
    color: 'white',
    fontSize: 19,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 11,
    color:'#808080',
  },
  value: {
    fontSize: 10,
    paddingLeft:10,
    color:'#000',
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  tableContainer: {
    borderColor: 'lightgray',
    borderWidth: 2,
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    padding: 5,
    color:'#808080',
  },
  signatureContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  signature: {
    flex: 1,
    alignItems: 'center',
  },
  footer: {
    height: 50,
  },
});

export default TravelConveyance;
