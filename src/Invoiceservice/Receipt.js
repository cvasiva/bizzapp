/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import moment from 'moment';
import CompanyDetail2 from './CompanyDetail2';
const insurance_invoice = {
  company: {
    companyname: 'Morya Industry Pvt. Ltd.',
    address_1:
      'Plot No. 890, Rajajinagar Industrial Area Bangalore 566122, Karnataka',
    period_insurance: '14-4-2021',
    policy_number: '568956',
    payment_date: '13-4-2022',
  },
  premium_details: {
    gross_premium: '2575.27',
    cgst_total: '₹ 463.55',
    sgst_total: '₹ 463.55',
    total: '₹ 3038.82',
  },
  terms_conditions: {
    point_1:
      'Issuance of this receipt does not amount to acceptance of the risk by Acko General Insurance Limited. The insurance cover for the risk shall be as per the terms and conditions of the Insurance Policy if and when issued. * Cheque/DD/PO receipt is valid, subject to realization of the instrument.',
  },
};

const Receipt = props => {
  const {invoice_data} = props;
  const invoice = invoice_data?.invoice;
  //   const vehicle = parseInt(invoice.total * 30);
  //   const damage = parseInt((invoice.total * 25) / 100);
  //   const ad_cover = parseInt((invoice.total * 30) / 100);
  //   const depriciation = parseInt((invoice.total * 25) / 100);
  //   const damage_total = vehicle + damage + ad_cover + depriciation;
  //   const tp = invoice.total - 5607;
  //   const Pa = invoice.total - 6035;
  //   const passengers = invoice.total - 562;
  //   const liability = invoice.total - 3250;
  //   const kit = invoice.total - 2135;
  //   const liability_total = tp + Pa + passengers + liability + damage + kit;

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
        <View style={styles.invoiceContainer}>
          <Text style={styles.invoiceHeader}>INVOICE</Text>
          <Text style={styles.infoHeader1}>
            Receive with thanks from{' '}
            <Text style={styles.bold}>{invoice.bill_to.companyname}</Text> a sum
            of{' '}
            <Text style={styles.bold}>
              {new Intl.NumberFormat('en-IN').format(invoice.total)}
            </Text>{' '}
            to Words Premium on Car Insurance Policy
          </Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsLabel}>INSURED DETAILS</Text>
            <Text style={styles.infoHeader1}>
              Name of Insured:{' '}
              <Text style={styles.bold}>{invoice.bill_to.companyname}</Text>
            </Text>
            <Text style={styles.infoHeader1}>
              Address/Pincode:{' '}
              <Text style={styles.bold}>{invoice.bill_to.address_1}</Text>
            </Text>
            <Text style={styles.infoHeader1}>
              Period of Insurance:{' '}
              <Text style={styles.bold}>
                {payment_date} to {due_date}
              </Text>
            </Text>
            <Text style={styles.infoHeader1}>
              Payment Date: <Text style={styles.bold}>{payment_date}</Text>
            </Text>
            <Text style={styles.infoHeader1}>
              Invoice No: <Text style={styles.bold}>{invoice.invoice_no}</Text>
            </Text>
            <Text style={styles.infoHeader1}>
              Invoice Date:{' '}
              <Text style={styles.bold}>{invoice.invoice_date}</Text>
            </Text>
          </View>
          <View style={styles.premiumContainer}>
            <Text style={styles.detailsLabel}>PREMIUM DETAILS</Text>
            <Text style={styles.infoHeader1}>
              Gross Premium:{' '}
              <Text style={styles.bold}>
                {new Intl.NumberFormat('en-IN').format(invoice.subtotal)}
              </Text>
            </Text>
            <Text style={styles.infoHeader1}>
              CGST{invoice.cgst_percentage}%:{' '}
              <Text style={styles.bold}>{invoice.cgst_total}</Text>
            </Text>
            <Text style={styles.infoHeader1}>
              SGST{invoice.sgst_percentage}%:{' '}
              <Text style={styles.bold}>{invoice.sgst_total}</Text>
            </Text>
            <Text style={styles.infoHeader1}>
              Total:{' '}
              <Text style={styles.bold}>
                {new Intl.NumberFormat('en-IN').format(invoice.total)}
              </Text>
            </Text>
          </View>
          <Text style={styles.termsConditions}>
            TERM & CONDITIONS: {insurance_invoice.terms_conditions.point_1}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC8F0',
    color: '#808080',
  },
  buttonContainer: {
    flexDirection: 'row',
    // backgroundColor:
    //   'radial-gradient(84% 84% at 50% 50%, rgba(228, 9, 54, 0.72) 0%, rgba(229, 121, 236, 0.56) 100%)',
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
    borderBottomWidth: 1,
    borderColor: '#bbb',
  },
  premiumContainer: {
    marginVertical: 10,
  },
  termsConditions: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#808080',
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
  },
  infoHeader1: {
    color: '#808080',
  },
});

export default Receipt;
