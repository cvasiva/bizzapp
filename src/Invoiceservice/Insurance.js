/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import moment from 'moment';
import CompanyDetail2 from './CompanyDetail2';

const Insurance = props => {
  const {invoice_data} = props;
  const invoice = invoice_data?.invoice;
  const vehicle = parseInt(invoice.total * 30);
  const damage = parseInt((invoice.total * 25) / 100);
  const ad_cover = parseInt((invoice.total * 30) / 100);
  const depriciation = parseInt((invoice.total * 25) / 100);
  // eslint-disable-next-line no-unused-vars
  const damage_total = vehicle + damage + ad_cover + depriciation;
  const tp = invoice.total - 5607;
  const Pa = invoice.total - 6035;
  const passengers = invoice.total - 562;
  const liability = invoice.total - 3250;
  const kit = invoice.total - 2135;
  // eslint-disable-next-line no-unused-vars
  const liability_total = tp + Pa + passengers + liability + damage + kit;

  const payment_date = moment(invoice.invoice_date, 'DD-MM-YYYY').format(
    'DD-MM-YYYY',
  );
  const due_date = moment(invoice.invoice_date, 'DD-MM-YYYY')
    .add(1, 'year')
    .subtract(1, 'days')
    .format('DD-MM-YYYY');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <CompanyDetail2 company={invoice.company} />
        <View style={styles.insuranceContainer}>
          <View style={styles.flxpolicy}>
            <View style={styles.policyDetails}>
              <Text style={styles.bold}>
                Policy Holder: {invoice.bill_to.companyname}
              </Text>
              <Text style={styles.infoHeader1}>
                Address: {invoice.bill_to.address_1}
              </Text>
            </View>
            <View>
              <Text style={styles.infoHeader1}>
                Policy No: {invoice.invoice_no}
              </Text>
              <Text style={styles.infoHeader1}>Policy Type: Car Insurance</Text>
              <Text style={styles.infoHeader1}>
                Total Premium:{' '}
                {new Intl.NumberFormat('en-IN').format(invoice.total)}
              </Text>
              <Text style={styles.infoHeader1}>
                Policy Start Date: {payment_date}
              </Text>
              <Text style={styles.infoHeader1}>
                Policy End Date: {due_date}
              </Text>
            </View>
          </View>
          <View style={styles.vehicleDetails}>
            <Text style={styles.bold}>Your Vehicle Details</Text>
            <View style={styles.flxyorvehicle}>
              <Text style={styles.infoHeader1}>Car Reg.no: XXXXXX05</Text>
              <Text style={styles.infoHeader1}>Chassis/Engine: XXXXXXAF</Text>
              <Text style={styles.infoHeader1}>Make/ Model: XXXXXXSG</Text>
            </View>
          </View>
          <View style={styles.premiumBreakdown}>
            <Text style={styles.bold}>Own Damage Premium (A)</Text>
            <View style={styles.Vehicleflx}>
              <View>
                <Text style={styles.infoHeader1}>
                  Vehicle: {new Intl.NumberFormat('en-IN').format(vehicle)}
                </Text>
                <Text style={styles.infoHeader1}>Additional Cover: 0</Text>
                <Text style={styles.infoHeader1}>
                  Basic Own Damage Premium:{' '}
                  {new Intl.NumberFormat('en-IN').format(
                    parseInt((invoice.subtotal * 30) / 100),
                  )}
                </Text>
              </View>
              <View>
                <Text style={styles.infoHeader1}>Depreciation Cover: 0</Text>
                <Text style={styles.infoHeader1}>No Claim Bonus (0%): 0</Text>
                <Text style={styles.infoHeader1}>
                  Total Insured Declared Values:{' '}
                  {new Intl.NumberFormat('en-IN').format(
                    parseInt((invoice.subtotal * 30) / 100),
                  )}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.premiumBreakdown}>
            <Text style={styles.bold}>Liability Premium (B)</Text>
            <View style={styles.Premiumflx}>
              <Text style={styles.infoHeader1}>
                Basic TP Premium (including TPPD):{' '}
              </Text>
              <Text style={styles.infoHeader1}>
                {new Intl.NumberFormat('en-IN').format(
                  parseInt((invoice.subtotal * 20) / 100),
                )}
              </Text>
            </View>
            <View style={styles.Premiumflx}>
              <Text style={styles.infoHeader1}>PA to Owner Driver: </Text>
              <Text style={styles.infoHeader1}>
                {new Intl.NumberFormat('en-IN').format(
                  parseInt((invoice.subtotal * 25) / 100) + 1,
                )}
              </Text>
            </View>
            <View style={styles.Premiumflx}>
              <Text style={styles.infoHeader1}>
                Unnamed PA Cover to Passengers:{' '}
              </Text>
              <Text style={styles.infoHeader1}>
                {new Intl.NumberFormat('en-IN').format(
                  parseInt((invoice.subtotal * 15) / 100) + 1,
                )}
              </Text>
            </View>
            <View style={styles.Premiumflx}>
              <Text style={styles.infoHeader1}>Basic Own Damage Premium: </Text>
              <Text style={styles.infoHeader1}>
                {new Intl.NumberFormat('en-IN').format(
                  parseInt((invoice.subtotal * 7) / 100),
                )}
              </Text>
            </View>
            <View style={styles.Premiumflx}>
              <Text style={styles.infoHeader1}>
                Legal Liability to Paid Driver:{' '}
              </Text>
              <Text style={styles.infoHeader1}>
                {new Intl.NumberFormat('en-IN').format(
                  parseInt((invoice.subtotal * 3) / 100),
                )}
              </Text>
            </View>
            <View style={styles.Premiumflx}>
              <Text style={styles.bold}>Net Premium (A+B): </Text>
              <Text style={styles.bold}>
                {new Intl.NumberFormat('en-IN').format(invoice.subtotal)}
              </Text>
            </View>
            <View style={styles.Premiumflx}>
              <Text style={styles.infoHeader1}>
                CGST{invoice.cgst_percentage}%:{' '}
              </Text>
              <Text style={styles.infoHeader1}>
                {new Intl.NumberFormat('en-IN').format(invoice.cgst_total)}
              </Text>
            </View>
            <View style={styles.Premiumflx}>
              <Text style={styles.infoHeader1}>
                SGST{invoice.sgst_percentage}%:{' '}
              </Text>
              <Text style={styles.infoHeader1}>
                {new Intl.NumberFormat('en-IN').format(invoice.sgst_total)}
              </Text>
            </View>
            <View style={styles.Premiumflx}>
              <Text style={styles.bold}>Total Premium: </Text>
              <Text style={styles.bold}>
                {new Intl.NumberFormat('en-IN').format(invoice.total)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  infoHeader1: {
    color: '#808080',
  },
  Premiumflx: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  Vehicleflx: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#bbb',
    justifyContent: 'space-around',
  },
  flxyorvehicle: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#bbb',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flxpolicy: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFC8F0',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor:
      'radial-gradient(84% 84% at 50% 50%, rgba(228, 9, 54, 0.72) 0%, rgba(229, 121, 236, 0.56) 100%)',
    borderBottomWidth: 1,
    borderColor: '#bbb',
    paddingVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  spacer: {
    flex: 1,
  },
  section: {
    margin: 10,
    width: 600,
  },
  invoiceContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  invoiceHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#808080',
  },
  detailsContainer: {
    marginVertical: 10,
  },
  detailsLabel: {
    fontWeight: 'bold',
    color: '#808080',
  },
  premiumContainer: {
    marginVertical: 10,
  },
  termsConditions: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  insuranceContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  policyDetails: {
    marginBottom: 10,
  },
  vehicleDetails: {
    marginBottom: 10,
  },
  premiumBreakdown: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#808080',
  },
});

export default Insurance;
