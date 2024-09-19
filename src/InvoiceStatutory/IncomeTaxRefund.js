/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const IncomeTaxRefund = ({invoice_data}) => {
  // Use optional chaining to safely access nested properties
  const data = invoice_data || {};
  const refundData = data.income_tax_refund || {};
  const companyData = data.usercompany || {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.taxRefundContainer}>
        <View style={styles.billDetails}>
          <Text style={styles.title}>A.Y.2022-2023</Text>
          <View style={styles.infoSection}>
            <View style={styles.companyInfo}>
              <Text style={styles.fontcolor}>Name:</Text>
              <Text style={styles.fontcolor}>{companyData.companyname || 'N/A'}</Text>
              <Text style={styles.fontcolor}>Address:</Text>
              <Text style={styles.fontcolor}>{companyData.address1 || 'N/A'}</Text>
              <Text style={styles.fontcolor}>{companyData.address2 || 'N/A'}</Text>
            </View>
            <View style={styles.otherInfo}>
              <Text style={styles.fontcolor}>Financial Year:</Text>
              <Text>{refundData.financial_year || 'N/A'}</Text>
              <Text style={styles.fontcolor}>PAN:</Text>
              <Text>{refundData.pan || 'N/A'}</Text>
              <Text style={styles.fontcolor}>Status:</Text>
              <Text>{refundData.status || 'N/A'}</Text>
            </View>
          </View>

          <Text style={styles.statement}>
            Statement of Income for Advance Tax
          </Text>

          <View style={styles.detailsTable}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader} />
              <Text style={styles.tableHeader}>Rs.</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Income from Business</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>
                Net Profit from Business-(Company Optd. for Section 115BAA)
              </Text>
              <Text>
                {new Intl.NumberFormat('en-IN').format(
                  refundData.net_profit || 0,
                )}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Total Income</Text>
              <Text style={styles.bold}>
                {new Intl.NumberFormat('en-IN').format(
                  refundData.total_income || 0,
                )}
              </Text>
            </View>
          </View>

          <View style={styles.detailsTable}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Tax on total income @ 22%</Text>
              <Text style={styles.fontcolor}>
                {new Intl.NumberFormat('en-IN').format(
                  refundData.total_tax_income || 0,
                )}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Surcharge @ 10%</Text>
              <Text style={styles.fontcolor}>
                {new Intl.NumberFormat('en-IN').format(
                  refundData.surcharge || 0,
                )}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>
                Secondary and higher education cess @ 4%
              </Text>
              <Text style={styles.fontcolor}>
                {new Intl.NumberFormat('en-IN').format(
                  refundData.higher_education_cess || 0,
                )}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Total Tax Payable</Text>
              <Text style={styles.bold}>
                {new Intl.NumberFormat('en-IN').format(
                  refundData.total_tax_pay || 0,
                )}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Advance Tax Payment</Text>
              <Text style={styles.fontcolor}>
                {new Intl.NumberFormat('en-IN').format(
                  refundData.total_advance_tax || 0,
                )}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>TDS</Text>
              <Text style={styles.fontcolor}>
                {new Intl.NumberFormat('en-IN').format(refundData.tds || 0)}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Refund</Text>
              <Text style={styles.bold}>
                {new Intl.NumberFormat('en-IN').format(
                  refundData.total_refund || 0,
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fontcolor:{
    color:'#808080',
  },
  container: {
    flex: 1,
    padding: 16,
    color:'#808080',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor:
      'radial-gradient(84% 84% at 0% 16%, #897FFF 0%, #5243FF 100%)',
    padding: 10,
    marginBottom: 10,
    color:'#808080',
  },
  toolbarContainer: {
    width: '30%',
    color:'#808080',
  },
  buttonContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    color:'#808080',
  },
  taxRefundContainer: {
    flex: 1,
    color:'#808080',
  },
  billDetails: {
    marginTop: 20,
    color:'#808080',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#808080',
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    color:'#808080',
  },
  companyInfo: {
    width: '50%',
    color:'#808080',
  },
  otherInfo: {
    width: '50%',
    color:'#808080',
  },
  statement: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color:'#808080',
  },
  detailsTable: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    color:'#808080',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    color:'#808080',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'left',
    color:'#808080',
  },
  bold: {
    fontWeight: 'bold',
    color:'#808080',
  },
});

export default IncomeTaxRefund;
