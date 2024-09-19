/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import ReceiverSignature from '../Invoice/ReceiverSignature';
import AuthorisedSignature from '../Invoice/AuthorisedSignature';

const PaymentAdvice = ({invoice_data}) => {
  //   const convertDate = paymentDate => {
  //     if (paymentDate && paymentDate !== '') {
  //       return moment(paymentDate).format('DD-MM-YYYY');
  //     }
  //     return '';
  //   };

  // const getTotal = () => {
  //   let total = 0;
  //   invoice_data.payment_details.map(payment => {
  //     total += payment.amount;
  //   });
  //   return total;
  // };

  const paymentAdvice = {
    payment_advice_heading: 'D.M Aerospace Tooling Pvt. Ltd',
    bill: {
      bill_ref: '567424',
      bill_date: '20/01/2022',
      amount: '5126295',
    },
    payment_details: {
      payment_from: 'Rtgs',
    },
  };

  const getNetAmount = () => {
    let total = 0;
    invoice_data.invoice_list.map(invoice => {
      total += invoice.amount;
    });
    return total;
  };

  const renderReceiptInfo = () => {
    const {company} = invoice_data;
    const trimmedLogoUrl = company?.logo?.trim() || '';

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Image
              source={{
                uri: `https://skillcdn.storage.googleapis.com/${trimmedLogoUrl}`,
              }}
              style={styles.logo}
            />
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>
                {invoice_data.supplier.companyname}
              </Text>
              {company && (
                <Text style={styles.companyAddress}>
                  Address: {invoice_data.supplier.address_1}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.paymentAdviceSection}>
            <Text style={styles.paymentAdviceText}>PAYMENT ADVICE</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.addressSection}>
          <Text style={styles.paymentAdviceHeading}>
            {paymentAdvice.payment_advice_heading}
          </Text>
          <Text style={styles.address}>{invoice_data.supplier.address_2}</Text>
          <Text style={styles.fontcolor}>Date: {invoice_data.reciept_date}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.fontcolor}>Dear Sir/Madam,</Text>
          <Text style={styles.fontcolor}>Please find below the payment details.</Text>
        </View>

        <ScrollView horizontal={true}>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Bill Ref.</Text>
              <Text style={styles.tableHeaderText}>Bill Date</Text>
              <Text style={styles.tableHeaderText}>Amount</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableData}>
                {paymentAdvice.bill.bill_ref}
              </Text>
              <Text style={styles.tableData}>
                {paymentAdvice.bill.bill_date}
              </Text>
              <Text style={styles.tableData}>
                {new Intl.NumberFormat('en-IN').format(getNetAmount())}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableData} colSpan={2}>
                NetAmount
              </Text>
              <Text style={styles.tableData}>
                {new Intl.NumberFormat('en-IN').format(getNetAmount())}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={{marginTop: -5}}>
          <ScrollView horizontal>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text
                  style={[styles.tableHeaderText, {textAlign: 'center'}]}
                  colSpan={5}>
                  Payment Details
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeaderText}>Payment</Text>
                <Text style={styles.tableHeaderText}>Transferred Date</Text>
                <Text style={styles.tableHeaderText}>Instrument Details</Text>
                <Text style={styles.tableHeaderText}>Issued From</Text>
                <Text style={styles.tableHeaderText}>Amount</Text>
              </View>
              {invoice_data.supplier &&
                invoice_data.payment_details.map((payment, index) => (
                  <View style={styles.tableRow} key={index}>
                    <Text style={styles.tableData}>
                      {payment.mode_of_payment}
                    </Text>
                    <Text style={styles.tableData} >{'-'}</Text>
                    <Text style={styles.tableData}>
                      {payment.instrument_date}
                    </Text>
                    <Text style={styles.tableData}>{payment.payment_from}</Text>
                    <Text style={[styles.tableData, styles.textEnd]}>
                      {new Intl.NumberFormat('en-IN').format(payment.amount)}
                    </Text>
                  </View>
                ))}
              <View style={styles.tableRow}>
                <Text
                  style={[styles.tableData, {textAlign: 'center'}]}
                  colSpan={4}>
                  TOTAL
                </Text>
                <Text style={[styles.tableData, styles.textEnd]}>
                  {new Intl.NumberFormat('en-IN').format(getNetAmount())}
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={{marginTop: 10}}>
            <Text style={styles.textDark}>Kindly acknowledge the receipt.</Text>
            <Text style={styles.textDark}>Thank You</Text>
          </View>
        </View>
        <View style={styles.signatureSection}>
          <View style={styles.receiverSignature}>
            <ReceiverSignature
              companyNameSignature={invoice_data.supplier?.customer_name}
            />
            <Text style={styles.signatureText}>Receiver’s Signature</Text>
          </View>
          {/* <View style={styles.stampSection}>
            <Stamp company={invoice_data.company?.companyname} />
          </View> */}
          <View style={styles.authorisedSignatureSection}>
            <Text style={styles.authorisedSignatureText}>
              For {invoice_data.company?.companyname}
            </Text>
            <AuthorisedSignature
              companyNameSignature={invoice_data.company?.companyname}
            />
            <Text style={styles.signatureText}>Authorised Signature</Text>
          </View>
        </View>
      </View>
    );
  };

  if (invoice_data !== null) {
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        {renderReceiptInfo()}
      </ScrollView>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  fontcolor:{
    color:'#808080',
  },
  textEnd: {
    textAlign: 'right',
    color: '#808080',
  },
  textDark: {
    color: 'black',
    fontSize: 14,
  },
  container: {
    margin: 15,
    width: 600,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  logoSection: {
    flexDirection: 'row',
    flex: 2,
  },
  logo: {
    width: 50,
    height: 50,
  },
  companyInfo: {
    marginLeft: 10,
  },
  companyName: {
    fontWeight: 'bold',
    color: '#808080',
    fontSize: 16,
  },
  companyAddress: {
    fontSize: 12,
    color: '#808080',
  },
  paymentAdviceSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  paymentAdviceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#808080',
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 5,
  },
  addressSection: {
    marginBottom: 10,
    color: '#808080',
  },
  paymentAdviceHeading: {
    color: 'blue',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 12,
    color: '#808080',
  },
  content: {
    marginBottom: 10,
    color: '#808080',
  },
  tableContainer: {
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'darkblue',
    width:600,
  },
  tableHeaderText: {
    flex: 1,
    padding: 5,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
  },
  tableData: {
    flex: 1,
    color:'#808080',
    textAlign:'center',
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: 'black',
    paddingTop: 10,
  },
  receiverSignature: {
    flex: 2,
  },
  stampSection: {
    flex: 1,
  },
  authorisedSignatureSection: {
    flex: 2,
    alignItems: 'center',
  },
  authorisedSignatureText: {
    fontWeight: 'bold',
    color: '#808080',
    fontSize: 12,
    textAlign: 'center',
  },
  signatureText: {
    fontSize: 10,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -5,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

export default PaymentAdvice;
