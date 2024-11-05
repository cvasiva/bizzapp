/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView, Image} from 'react-native';

function GSTPaymentChallan({invoice_data}) {
  const a = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen ',
  ];
  const b = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    let str = '';
    str +=
      n[1] !== '00'
        ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore '
        : '';
    str +=
      n[2] !== '00'
        ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh '
        : '';
    str +=
      n[3] !== '00'
        ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand '
        : '';
    str +=
      n[4] !== '0'
        ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred '
        : '';
    str +=
      n[5] !== '00'
        ? (str !== '' ? 'and ' : '') +
          (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) +
          'only '
        : '';
    return str;
  }

  const challan = invoice_data.challan || {};
  const num = challan.details_of_deposits.reduce((a, b) => a + b.total, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.billHeader} />

      <View style={styles.allBillCompany}>
        <View style={styles.gstChallan}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../Images/chalanRN.png')}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          <Text style={styles.billTitle}>GOODS AND SERVICES TAX</Text>
          <Text style={styles.billTitle}>PAYMENT RECEIPT</Text>
          <View style={styles.billDetails}>
            <Text style={styles.fontcolor}>CPIN: {challan.cpin}</Text>
            <Text style={styles.depositDate}>
              Deposit Date: {challan.deposit_date}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.fontcolor}>Payment Particulars</Text>
            <View style={styles.separator} />
            <Text style={styles.fontcolor}>
              CIN: {challan.payment_particulars.cin}
            </Text>
            <Text style={styles.bankName}>
              Name of Bank: {challan.payment_particulars.name_of_bank}
            </Text>
            <Text style={styles.brn}>
              BRN: {challan.payment_particulars.BRN}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.fontcolor}>Details of Taxpayer</Text>
            <View style={styles.separator} />
            <Text style={styles.fontcolor}>
              GSTIN: {challan.details_of_taxpayer.gstin}
            </Text>
            <View style={styles.separator} />
            <Text style={styles.fontcolor}>
              Name: {challan.details_of_taxpayer.name}
            </Text>
            <View style={styles.address}>
              <Text style={styles.fontcolor}>Address:</Text>
              <Text style={styles.fontcolor}>
                {challan.details_of_taxpayer.address_one},{' '}
                {challan.details_of_taxpayer.address_two},{' '}
                {challan.details_of_taxpayer.city},{' '}
                {challan.details_of_taxpayer.pin_code},{' '}
                {challan.details_of_taxpayer.state}
              </Text>
            </View>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCell}>Government</Text>
                <Text style={styles.tableCell}>Major Head</Text>
                <Text style={styles.tableCell}>Minor Head</Text>
              </View>
              <View style={styles.tableHeaderRow}>
                <Text style={styles.tableCell}>Tax</Text>
                <Text style={styles.tableCell}>Interest</Text>
                <Text style={styles.tableCell}>Penalty</Text>
                <Text style={styles.tableCell}>Fee</Text>
                <Text style={styles.tableCell}>Other</Text>
                <Text style={styles.tableCell}>Total</Text>
              </View>
              <FlatList
                data={challan.details_of_deposits}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.name}</Text>
                    <Text style={styles.tableCell}>{item.tax}</Text>
                    <Text style={styles.tableCell}>{item.interest}</Text>
                    <Text style={styles.tableCell}>{item.penalty}</Text>
                    <Text style={styles.tableCell}>{item.fee}</Text>
                    <Text style={styles.tableCell}>{item.others}</Text>
                    <Text style={styles.tableCell}>
                      {new Intl.NumberFormat('en-IN').format(item.total)}
                    </Text>
                  </View>
                )}
              />
              <View style={styles.tableRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>
                  {new Intl.NumberFormat('en-IN').format(num)}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.totalLabel}>Total Amount (in words)</Text>
                <Text style={styles.totalValue}>{inWords(parseInt(num))}</Text>
              </View>
            </View>
            <Text style={styles.bankInfo}>
              Mode of Payment: Internet Banking: ICICI Bank
            </Text>
            <Text style={styles.notes}>
              Notes:
              {'\n'}1. Status of the transaction can be tracked under 'Track
              Payment Status' at GST website
              {'\n'}2. Payment status will be set as 'Paid' for this
              transaction.
              {'\n'}3. This is a system-generated receipt.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.billFooter} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fontcolor: {
    color: '#808080',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    width: 600,
  },
  billHeader: {
    marginBottom: 5,
  },
  allBillCompany: {
    flex: 1,
  },
  gstChallan: {
    marginBottom: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 0,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  billTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#808080',
    // marginVertical: 5,
  },
  billDetails: {
    marginVertical: 10,
  },
  depositDate: {
    textAlign: 'right',
    marginBottom: 5,
    color: '#808080',
  },
  bankName: {
    marginLeft: 20,
    color: '#808080',
  },
  brn: {
    textAlign: 'right',
    marginBottom: 5,
    color: '#808080',
  },
  address: {
    marginBottom: 10,
    color: '#808080',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 5,
    color: '#808080',
  },
  table: {
    marginVertical: 10,
    color: '#808080',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    color: '#808080',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    color: '#808080',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    color: '#808080',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#808080',
  },
  totalLabel: {
    flex: 1,
    fontWeight: 'bold',
    color: '#808080',
  },
  totalValue: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#808080',
  },
  bankInfo: {
    marginVertical: 10,
    color: '#808080',
  },
  notes: {
    marginVertical: 10,
    color: '#808080',
  },
  billFooter: {
    marginTop: 20,
    color: '#808080',
  },
});

export default GSTPaymentChallan;
