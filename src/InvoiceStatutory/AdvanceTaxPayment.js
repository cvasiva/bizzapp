/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';

const AdvanceTaxPayment = ({invoice_data}) => {
  const data = invoice_data;
  // if (!data) return null;

  const incomeTaxRefund = data.income_tax_refund || {};

  const renderItem = ({item}) => (
    <View style={item.highlight ? styles.highlightRow : styles.row}>
      <Text style={styles.cell}>{item.particulars}</Text>
      <Text style={styles.cell}>{item.rate}</Text>
      <Text style={styles.cell}>{item.due_date}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.billHeader}>
        <Text style={styles.headerText}>Bill Header Component</Text>
      </View>

      <View style={styles.billContainer}>
        <Text style={styles.billTitle}>A.Y.2022-2023</Text>
        <View style={styles.billInfo}>
          <View style={styles.companyInfo}>
            <Text style={styles.taxStatement1}>Name</Text>
            <Text style={styles.taxStatement1}>
              {data.usercompany?.companyname}
            </Text>
            <Text style={styles.taxStatement1}>Address</Text>
            <Text style={styles.taxStatement1}>
              {data.usercompany?.address1}
            </Text>
            <Text style={styles.taxStatement1}>
              {data.usercompany?.address2}
            </Text>
          </View>
          <View>
            <View style={styles.otherInfo}>
              <Text style={styles.taxStatement1}>Financial Year</Text>
              <Text style={styles.taxStatement1}>
                {incomeTaxRefund.financial_year}
              </Text>
            </View>
            <View style={styles.otherInfo}>
              <Text style={styles.taxStatement1}>PAN</Text>
              <Text style={styles.taxStatement1}>{incomeTaxRefund.pan}</Text>
            </View>
            <View style={styles.otherInfo}>
              <Text style={styles.taxStatement1}>Status</Text>
              <Text style={styles.taxStatement1}>{incomeTaxRefund.status}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.taxStatement}>
          Statement of Income for Advance Tax
        </Text>

        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.cell} />
            <Text style={[styles.cell, styles.val]}>Rs.</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.bold]}>Income from Business</Text>
            <Text style={styles.cell} />
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.cell}>
              <Text style={styles.italic}>
                Net Profit from Business-(Company Optd. for Section 115BAA)
              </Text>
            </Text>
            <Text style={styles.cell}>{incomeTaxRefund.net_profit}</Text>
          </View>
          <View style={[styles.tableRow, styles.tableBottom]}>
            <Text style={[styles.cell, styles.bold]}>Total Income</Text>
            <Text style={[styles.cell, styles.bold]}>
              {incomeTaxRefund.total_income}
            </Text>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.cell}>
              <Text style={styles.italic}>Tax on total income @ 22%</Text>
            </Text>
            <Text style={styles.cell}>{incomeTaxRefund.total_tax_income}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.cell}>
              <Text style={styles.italic}>Surcharge @ 10%</Text>
            </Text>
            <Text style={styles.cell}>{incomeTaxRefund.surcharge}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.cell}>
              Secondary and higher education cess @ 4%
            </Text>
            <Text style={styles.cell}>
              {incomeTaxRefund.higher_education_cess}
            </Text>
          </View>
          <View style={[styles.tableRow, styles.tableBottom]}>
            <Text style={styles.cell}>Total Tax Payable</Text>
            <Text style={[styles.cell, styles.bold]}>
              {incomeTaxRefund.total_tax_pay}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.cell}>TDS</Text>
            <Text style={styles.cell}>{incomeTaxRefund.tds}</Text>
          </View>
          <View style={[styles.tableRow, styles.tableBottom]}>
            <Text style={styles.cell}>Total Advance Tax Payable for F.Y.</Text>
            <Text style={[styles.cell, styles.bold]}>
              {incomeTaxRefund.total_advance_tax}
            </Text>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Particulars</Text>
            <Text style={styles.headerCell}>Rate</Text>
            <Text style={styles.headerCell}>Due Date</Text>
            <Text style={styles.headerCell}>Amount</Text>
          </View>
          <FlatList
            data={incomeTaxRefund.income_list}
            renderItem={renderItem}
            keyExtractor={item => item.particulars}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  taxStatement1: {
    color: '#808080',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    width: 600,
  },
  billHeader: {
    marginBottom: 10,
    color: '#808080',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#808080',
  },
  billContainer: {
    flex: 1,
  },
  billTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#808080',
  },
  billInfo: {
    flexDirection: 'row',
    display:'flex',
    justifyContent:'space-around',
    marginBottom: 10,
  },
  companyInfo: {
    flex: 1,
  },
  otherInfo: {
    flex: 1,
    justifyContent:'center',
    paddingLeft:-10,
  },
  taxStatement: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#808080',
  },
  tableContainer: {
    marginBottom: 10,
    color: '#808080',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    padding: 5,
    textAlign: 'left',
    color: '#808080',
  },
  val: {
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  italic: {
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: 'bold',
  },
  tableBottom: {
    borderTopWidth: 2,
    borderTopColor: '#000',
  },
});

export default AdvanceTaxPayment;
