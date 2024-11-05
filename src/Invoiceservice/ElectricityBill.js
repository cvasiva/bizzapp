/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import moment from 'moment';

const {width} = Dimensions.get('window');

const ElectricityBill = ({invoice_data}) => {
  // Destructure the invoice and po from invoice_data with default empty objects
  const invoice = invoice_data?.invoice || {};
  const po = invoice_data?.po || {};

  // Handle case where invoice.total might be undefined
  const total = invoice.total || 0;

  // Calculate charges with default values
  const pres_deg = parseInt((total * 22) / 100);
  const pres = parseInt((total * 18) / 100);
  const fixcharg = parseInt(pres + pres_deg);
  const charges = parseInt((total * 45) / 100);
  const consumption = parseInt(charges / 3);
  var present = parseInt((total * 15) / 100);
  const deg_1 = parseInt((consumption * 130) / 100);
  const deg_2 = parseInt((consumption * 30) / 100);
  const consum = parseInt(deg_1 - deg_2);
  const diffamount = total - (fixcharg + charges + present);
  present = present + diffamount;

  return (
    <ScrollView>
      {invoice && (
        <>
          <View style={styles.headerContainer}>
            {/* <Image source={{uri: border_img2}} style={styles.headerImage} /> */}
            <View style={styles.headerBackground}>
              <Text style={styles.headerText}>
                State Electricity Corporation
              </Text>
            </View>
          </View>

          <View style={styles.bodyContainer}>
            <View style={styles.accountDetailsContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Account Details</Text>
              </View>
              <View style={styles.accountDetailsRow}>
                <View style={styles.accountDetailsColumn}>
                  <Text style={styles.accountDetailsText}>RR No.</Text>
                  <Text style={styles.accountDetailsText}>A/C ID</Text>
                  <Text style={styles.accountDetailsText}>M.R. Code</Text>
                </View>
                <View style={[styles.accountDetailsColumn, styles.textRight]}>
                  <Text style={styles.accountDetailsText}>
                    {po.po_no || 'N/A'}
                  </Text>
                  <Text style={styles.accountDetailsText}>xxxxxx</Text>
                  <Text style={styles.accountDetailsText}>xxxxxx</Text>
                </View>
              </View>
            </View>

            <View style={styles.billingDetailsContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Account Details</Text>
              </View>
              <View style={styles.billingDetailsRow}>
                <View style={styles.billingDetailsColumn}>
                  <Text style={styles.accountDetailsText}>Name:</Text>
                </View>
                <View style={[styles.billingDetailsColumn, styles.textLeft]}>
                  <Text style={styles.accountDetailsText}>
                    {invoice.bill_to?.companyname || 'N/A'}
                  </Text>
                </View>
              </View>
              <View style={styles.billingDetailsRow}>
                <View style={styles.billingDetailsColumn}>
                  <Text style={styles.accountDetailsText}>Address:</Text>
                </View>
                <View style={[styles.billingDetailsColumn, styles.textLeft]}>
                  <Text style={styles.accountDetailsText}>
                    {invoice.bill_to?.address_1 || 'N/A'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.additionalDetailsContainer}>
              <View style={styles.additionalCard}>
                <View style={styles.additionalCardHeader}>
                  <Text style={styles.additionalCardHeaderText}>
                    Billing Details
                  </Text>
                </View>
                <View style={styles.additionalCardBody}>
                  <View style={styles.billingDetailsRow}>
                    <View style={styles.billingDetailsColumn}>
                      <Text style={styles.accountDetailsText}>
                        Bill Period:
                        <Text style={styles.accountDetailsText}>
                          {moment(invoice.invoice_date, 'DD-MM-YYYY')
                            .subtract(30, 'days')
                            .format('DD-MM-YYYY')}
                        </Text>
                        <Text style={styles.accountDetailsText}>to</Text>
                      </Text>
                      <Text style={styles.accountDetailsText}>Rdng Date</Text>
                      <Text style={styles.accountDetailsText}>Bill no.</Text>
                    </View>
                    <View
                      style={[styles.billingDetailsColumn, styles.textRight]}>
                      <Text style={styles.accountDetailsText}>
                        {invoice.invoice_date || 'N/A'}
                      </Text>
                      <Text style={styles.accountDetailsText}>
                        {invoice.invoice_date || 'N/A'}
                      </Text>
                      <Text style={styles.accountDetailsText}>
                        {invoice.invoice_no || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.additionalCard}>
                <View style={styles.additionalCardHeader}>
                  <Text style={styles.additionalCardHeaderText}>
                    Connection Details
                  </Text>
                </View>
                <View style={styles.additionalCardBody}>
                  <View style={styles.billingDetailsRow}>
                    <View style={styles.billingDetailsColumn}>
                      <Text style={styles.accountDetailsText}>Tariff</Text>
                      <Text style={styles.accountDetailsText}>Sanc Load</Text>
                    </View>
                    <View
                      style={[styles.billingDetailsColumn, styles.textRight]}>
                      <Text style={styles.accountDetailsText}>xxxxxx</Text>
                      <Text style={styles.accountDetailsText}>xxxxxx</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.additionalCard}>
                <View style={styles.additionalCardHeader}>
                  <Text style={styles.additionalCardHeaderText}>
                    Consumption Details
                  </Text>
                </View>
                <View style={styles.additionalCardBody}>
                  <View style={styles.billingDetailsRow}>
                    <View style={styles.billingDetailsColumn}>
                      <Text style={styles.accountDetailsText}>Pres. Rdg.</Text>
                      <Text style={styles.accountDetailsText}>Prev. Rdg.</Text>
                      <Text style={styles.accountDetailsText}>
                        Consumption (Units)
                      </Text>
                    </View>
                    <View
                      style={[styles.billingDetailsColumn, styles.textRight]}>
                      <Text style={styles.accountDetailsText}>
                        {deg_1 || 'N/A'}
                      </Text>
                      <Text style={styles.accountDetailsText}>
                        {deg_2 || 'N/A'}
                      </Text>
                      <Text style={styles.accountDetailsText}>
                        {consum || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.billingDetailsContainer}>
              <View style={styles.additionalCard}>
                <View style={styles.additionalCardHeader}>
                  <Text style={styles.additionalCardHeaderText}>
                    Billing Details
                  </Text>
                </View>
                <View style={styles.additionalCardBody}>
                  <View style={styles.billingDetailsRow}>
                    <Text style={styles.billingSectionText}>
                      Fixed Charges (Unit Rate Amount)
                    </Text>
                    <View style={styles.billingDetailsColumn}>
                      <Text style={styles.accountDetailsText}>1 KW</Text>
                      <Text style={styles.accountDetailsText}>2 KW</Text>
                    </View>
                    <View
                      style={[styles.billingDetailsColumn, styles.textRight]}>
                      <Text style={styles.accountDetailsText}>
                        {pres || 'N/A'}{','} {pres_deg || 'N/A'}
                      </Text>

                      <Text style={styles.accountDetailsText}>
                        {pres || 'N/A'} , {pres_deg || 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.billingDetailsRow}>
                    <Text style={styles.billingSectionText}>
                      FAC Charges (Unit Rate Amount)
                    </Text>
                    <View style={styles.billingDetailsColumn}>
                      <Text style={styles.accountDetailsText}>
                        Fix Charges (3 KW)
                      </Text>
                    </View>
                    <View
                      style={[styles.billingDetailsColumn, styles.textRight]}>
                      <Text style={styles.accountDetailsText}>
                        {fixcharg || 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.billingDetailsRow}>
                    <View style={styles.billingDetailsColumn}>
                      <Text style={styles.billingSectionText}>
                        TOTAL AMOUNT (Excl. TAX)
                      </Text>
                      <Text style={styles.billingSectionText}>
                        TOTAL AMOUNT (Incl. TAX)
                      </Text>
                      <Text style={styles.billingSectionText}>
                        TOTAL AMOUNT PAYABLE
                      </Text>
                    </View>
                    <View
                      style={[styles.billingDetailsColumn, styles.textRight]}>
                      <Text style={styles.accountDetailsText}>
                        {total || 'N/A'}
                      </Text>
                      <Text style={styles.accountDetailsText}>
                        {total || 'N/A'}
                      </Text>
                      <Text style={styles.accountDetailsText}>
                        {present || 'N/A'}
                      </Text>
                    </View>
                  </View>
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
  additionalCardHeaderText: {
    color: '#808080',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    justifyContent: 'flex-start',
    width: 600,
  },
  headerImage: {
    width: width - 40,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 20,
    marginTop: 20,
  },
  headerBackground: {
    backgroundColor: '#F7CCFF',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
    paddingVertical: 5,
    textAlign: 'center',
  },
  bodyContainer: {
    padding: 20,
  },
  accountDetailsContainer: {
    marginBottom: 10,
  },
  sectionHeader: {
    backgroundColor: '#FFEACB',
    borderWidth: 1,
    borderColor: '#000000',
  },
  sectionHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    padding: 8,
  },
  accountDetailsRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  accountDetailsColumn: {
    flex: 1,
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    textAlign: 'left',
  },
  accountDetailsText: {
    fontSize: 13,
    color: '#000000',
  },
  billingDetailsContainer: {
    marginBottom: 10,
  },
  billingDetailsRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  billingDetailsColumn: {
    flex: 1,
  },
  billingSectionText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  billingSummary: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#000000',
  },
});

export default ElectricityBill;
