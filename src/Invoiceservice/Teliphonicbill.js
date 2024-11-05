/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import moment from 'moment';
import CompanyDetail2 from './CompanyDetail2';

const TeliphonicBill = ({invoice_data}) => {
  const invoice = invoice_data?.invoice || {};
  const po = invoice_data?.po || {};

  const total = po.total - 200;
  const fee_per = 0;

  return (
    <ScrollView>
      {invoice && (
        <>
          <View style={styles.widthtell}>
            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.companyDetailContainer}>
                  <CompanyDetail2 company={invoice.company} />
                </View>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.row}>
                  <View>
                    <Text style={styles.label}>Bill Number:</Text>
                    <Text style={styles.label}>Bill Date:</Text>
                    <Text style={styles.label}>Bill Period:</Text>
                  </View>
                  <View>
                    <Text style={styles.value}>{invoice.invoice_no}</Text>
                    <Text style={styles.value}>{invoice.invoice_date}</Text>
                    <Text style={styles.value}>
                      {moment(invoice.invoice_date, 'DD-MM-YYYY')
                        .subtract(30, 'days')
                        .format('DD-MM-YYYY')}{' '}
                      To {invoice.invoice_date}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View>
                    <Text style={styles.label}>
                      {invoice.bill_to.companyname}
                    </Text>
                    <Text style={styles.label}>
                      {invoice.bill_to.address_1}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Your Account Summary</Text>
                <View style={styles.summaryRow}>
                  <View style={styles.summaryBox}>
                    <Text style={styles.summaryBoxTitle}>Previous Balance</Text>
                    <Text style={styles.summaryBoxValue}>0</Text>
                  </View>
                  <View style={styles.summaryBox}>
                    <Text style={styles.summaryBoxTitle}>Payments</Text>
                    <Text style={styles.summaryBoxValue}>Paid</Text>
                  </View>
                  <View style={styles.summaryBox}>
                    <Text style={styles.summaryBoxTitle}>Due date</Text>
                    <Text style={styles.summaryBoxValue}>
                      {moment(invoice.invoice_date, 'DD-MM-YYYY')
                        .add(10, 'days')
                        .format('DD-MM-YYYY')}
                    </Text>
                  </View>
                  <View style={styles.summaryBox}>
                    <Text style={styles.summaryBoxTitle}>This bill period</Text>
                    <Text style={styles.summaryBoxValue}>
                      {moment(invoice.invoice_date, 'DD-MM-YYYY')
                        .subtract(30, 'days')
                        .format('DD-MM-YYYY')}{' '}
                      To {invoice.invoice_date}
                    </Text>
                  </View>
                  <View style={styles.summaryBox}>
                    <Text style={styles.summaryBoxTitle}>Amount Payable</Text>
                    <Text style={styles.summaryBoxValue}>{invoice.total}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>This Month Charges</Text>
                <View>
                  <View style={styles.chargeRow}>
                    <Text style={styles.chargeLabel}>One time Charges</Text>
                    <Text style={styles.chargeValue}>{0}</Text>
                  </View>
                  <View style={styles.chargeRow}>
                    <Text style={styles.chargeLabel}>Bill period charges</Text>
                    <Text style={styles.chargeValue}>{0}</Text>
                  </View>
                  <View style={styles.chargeRow}>
                    <Text style={styles.chargeLabel}>Call charges</Text>
                    <Text style={styles.chargeValue}>
                      {new Intl.NumberFormat('en-IN').format(invoice.subtotal)}
                    </Text>
                  </View>
                  <View style={styles.chargeRow}>
                    <Text style={styles.chargeLabel}>
                      Last bill period late fee
                    </Text>
                    <Text style={styles.chargeValue}>
                      {new Intl.NumberFormat('en-IN').format(
                        ((fee_per / 100) * total).toFixed(0),
                      )}
                    </Text>
                  </View>
                  <View style={styles.chargeRow}>
                    <Text style={styles.chargeLabel}>Sub Total</Text>
                    <Text style={styles.chargeValue}>
                      {new Intl.NumberFormat('en-IN').format(invoice.subtotal)}
                    </Text>
                  </View>
                  <View style={styles.chargeRow}>
                    <Text style={styles.chargeLabel}>
                      CGST {invoice.cgst_percentage}%
                    </Text>
                    <Text style={styles.chargeValue}>
                      {new Intl.NumberFormat('en-IN').format(
                        invoice.cgst_total,
                      )}
                    </Text>
                  </View>
                  <View style={styles.chargeRow}>
                    <Text style={styles.chargeLabel}>
                      SGST {invoice.sgst_percentage}%
                    </Text>
                    <Text style={styles.chargeValue}>
                      {new Intl.NumberFormat('en-IN').format(
                        invoice.sgst_total,
                      )}
                    </Text>
                  </View>
                </View>
                <View style={styles.footer}>
                  <Text style={styles.footerTitle}>Total</Text>
                  <Text style={styles.footerValue}>
                    {new Intl.NumberFormat('en-IN').format(po.total)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  widthtell: {
    width: 600,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor:
      'radial-gradient(84% 84% at 0% 16%, rgb(137, 127, 255) 0%, rgb(82, 67, 255) 100%)',
    padding: '1%',
    position: 'sticky',
    top: 0,
  },
  headerText: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 12,
    color: '#024D65',
  },
  activeButton: {
    backgroundColor: 'warning',
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '15%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  companyDetailContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  detailsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    paddingVertical: 10,
    gap:20,
  },
  labelContainer: {
    flex: 1,
  },
  valueContainer: {
    flex: 2,
  },
  label: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 11,
    color: '#808080',
  },
  value: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 11,
    color: '#5A5A5A',
  },
  summaryContainer: {
    marginVertical: 10,
  },
  summaryTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 11,
    color: '#ED3035',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryBox: {
    flex: 1,
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
    padding: 10,
  },
  summaryBoxTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 11,
    color: '#77787B',
  },
  summaryBoxValue: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 11,
    color: '#77787B',
  },
  cardTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 11,
    color: '#ED3035',
  },
  chargeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  chargeLabel: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 11,
    color: '#000000',
  },
  chargeValue: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 11,
    color: '#000000',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    marginVertical: 10,
    paddingVertical: 5,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  footerTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 11,
    color: '#000000',
  },
  footerValue: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 11,
    color: '#000000',
  },
});

export default TeliphonicBill;
