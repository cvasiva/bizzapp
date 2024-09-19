/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const Challan = ({invoice_data}) => {
  const challan = invoice_data?.challan || {};

//   const inWords = num => {
//     const a = [
//       '',
//       'one ',
//       'two ',
//       'three ',
//       'four ',
//       'five ',
//       'six ',
//       'seven ',
//       'eight ',
//       'nine ',
//       'ten ',
//       'eleven ',
//       'twelve ',
//       'thirteen ',
//       'fourteen ',
//       'fifteen ',
//       'sixteen ',
//       'seventeen ',
//       'eighteen ',
//       'nineteen ',
//     ];
//     const b = [
//       '',
//       '',
//       'twenty',
//       'thirty',
//       'forty',
//       'fifty',
//       'sixty',
//       'seventy',
//       'eighty',
//       'ninety',
//     ];
//     let n = ('000000000' + num)
//       .substr(-9)
//       .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
//     if (!n) return '';
//     let str = '';
//     str +=
//       n[1] != 0
//         ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore '
//         : '';
//     str +=
//       n[2] != 0
//         ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh '
//         : '';
//     str +=
//       n[3] != 0
//         ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand '
//         : '';
//     str +=
//       n[4] != 0
//         ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred '
//         : '';
//     str +=
//       n[5] != 0
//         ? (str != '' ? 'and ' : '') +
//           (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) +
//           'only '
//         : '';
//     return str;
//   };

  const thisYear = new Date().getFullYear();
  const currentYear = `${thisYear} - ${thisYear + 1}`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.challanNo}>
            <Text style={styles.boldText}>Challan No./ITNS</Text>
            <Text style={styles.tableCell}>{challan?.challan_no}</Text>
          </View>
          <View style={styles.taxApplicable}>
            <Text style={styles.boldText}>Tax Applicable</Text>
            <View style={styles.checkboxRow}>
              <Text style={styles.tableCell}>(0020) COMPANY DEDUCTEES</Text>
              <Text style={styles.tableCell}>✔</Text>
            </View>
            <View style={styles.checkboxRow}>
              <Text style={styles.tableCell}>(0021) NON-COMPANY DEDUCTEES</Text>
              <Text> </Text>
            </View>
          </View>
          <View style={styles.year}>
            <Text style={styles.boldText}>Assessment Year</Text>
            <Text style={styles.tableCell}>{currentYear}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.boldText}>TAN: {challan?.tan}</Text>
          <Text style={styles.boldText}>Full Name: {challan?.full_name}</Text>
          <Text style={styles.boldText}>
            Complete Address With city & State: {challan?.state}
          </Text>
        </View>
        <View style={styles.paymentDetails}>
          <Text style={styles.boldText}>
            Type of Payment: 94j-Fees for Professional or Technical Service
          </Text>
          <View style={styles.checkboxRow}>
            <Text style={styles.tableCell}>TDS/TCS Payable by TaxPayer (200)</Text>
            <Text style={styles.tableCell}>✔</Text>
          </View>
          <View style={styles.checkboxRow}>
            <Text style={styles.tableCell}>TDS/TCS Regular Assessment (400)</Text>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellBold}>Details of Payment</Text>
              <Text style={styles.tableCellBold}>Amount (in Rs.)</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Income Tax</Text>
              <Text style={styles.tableCell}>
                {new Intl.NumberFormat('en-IN').format(challan.income_tax)}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Surcharge</Text>
              <Text style={styles.tableCell}>{challan?.surcharge}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Cess</Text>
              <Text style={styles.tableCell}>{challan?.education}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Interest</Text>
              <Text style={styles.tableCell}>{challan?.interest}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Penalty Code</Text>
              <Text style={styles.tableCell}>{challan?.penalty_code}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Penalty</Text>
              <Text style={styles.tableCell}>{challan?.penalty}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Other</Text>
              <Text style={styles.tableCell}>{challan?.other}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Fee Under Sec.234E</Text>
              <Text style={styles.tableCell}>{challan?.fee}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellBold}>Total</Text>
              <Text style={styles.tableCellBold}>
                {new Intl.NumberFormat('en-IN').format(challan?.total)}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellBold}>Total (in words)</Text>
              <Text style={styles.tableCell}>{challan?.total_word}</Text>
            </View>
          </View>
          <View style={styles.bankInfo}>
            <Text style={styles.boldText}>FOR USE IN RECEIVING BANK</Text>
            <Text style={styles.tableCell}>Debit to A/c Cheque credited on</Text>
            <Text>{challan.date}</Text>
            <View style={styles.bankTable}>
              <View style={styles.bankTableRow}>
                <Text style={styles.tableCell}>Payment Status:</Text>
                <Text style={styles.tableCell}>{challan?.payment}</Text>
              </View>
              <View style={styles.bankTableRow}>
                <Text style={styles.tableCell}>Bank Reference No:</Text>
                <Text style={styles.tableCell}>{Math.floor(1000000 + Math.random() * 9000000)}</Text>
              </View>
            </View>
            <Text style={styles.bankSeal}>
              SPACE FOR BANK SEAL STATE Bank Uttam Nagar, New Delhi
            </Text>
            <View style={styles.bankDetails}>
              <View style={styles.bankDetailRow}>
                <Text style={styles.tableCell}>BSR Code</Text>
                <Text style={styles.tableCell}>{challan?.bsr}</Text>
              </View>
              <View style={styles.bankDetailRow}>
                <Text style={styles.tableCell}>Tender Date</Text>
                <Text style={styles.tableCell}>{challan?.tender}</Text>
              </View>
              <View style={styles.bankDetailRow}>
                <Text style={styles.tableCell}>Challan Serial NO.</Text>
                <Text style={styles.tableCell}>{Math.floor(100000000 + Math.random() * 900000000)}</Text>
              </View>
              <View style={styles.bankDetailRow}>
                <Text style={styles.tableCell}>Rs.</Text>
                <Text style={styles.tableCell}>
                  {new Intl.NumberFormat('en-IN').format(challan?.total)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    width:650,
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 1,
    padding:8,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
  challanNo: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
  taxApplicable: {
    flex: 2,
    paddingHorizontal: 10,
  },
  year: {
    flex: 1,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: 'black',
  },
  details: {
    marginVertical: 10,
  },
  paymentDetails: {
    marginVertical: 10,
  },
  tableContainer: {
    marginVertical: 10,
  },
  table: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    textAlign: 'left',
    color:'#808080',
  },
  tableCellBold: {
    flex: 1,
    fontWeight: 'bold',
    color:'#808080',
  },
  bankInfo: {
    marginVertical: 10,
  },
  bankTable: {
    marginVertical: 10,
    color:'#808080',
  },
  bankTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  bankSeal: {
    marginVertical: 10,
    color:'#808080',
  },
  bankDetails: {
    marginVertical: 10,
    color:'#808080',
  },
  bankDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color:'#808080',
  },
  boldText: {
    fontWeight: 'bold',
    color:'#808080',
  },
});

export default Challan;
