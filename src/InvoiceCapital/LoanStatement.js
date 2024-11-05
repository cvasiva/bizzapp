/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
const Loan_statement = {
  bank_details: {
    name: 'Umpqua Bank',
    branch: 'Bangalore, India',
  },
  transaction_detail: [
    {
      date: '2/2/2022',
      discription: ' Balance B/F',
      debit: '1530.25',
      credit: '',
      total: '12800.25Cr',
    },
    {
      date: '2/2/2022',
      discription: 'Loan Disbursement',
      debit: '1530.25',
      credit: '',
      total: '12800.25Cr',
      current: true,
    },
    {
      date: '2/2/2022',
      discription: 'Prin-Auto Split',
      debit: '',
      credit: '',
      total: '12800.25Cr',
    },
    {
      date: '2/2/2022',
      discription: 'Cr Advance payment',
      debit: '1530.25',
      credit: '2000',
      total: '12800.25Cr',
    },
    {
      date: '2/2/2022',
      discription: 'Balance B/F',
      debit: '',
      credit: '2000',
      total: '12800.25Cr',
    },
    {
      date: '2/2/2022',
      discription: 'Int-Auto Split',
      debit: '1530.25',
      credit: '',
      total: '12800.25Cr',
    },
    {
      date: '2/2/2022',
      discription: 'Cr Advance payment',
      debit: '1530.25',
      credit: '',
      total: '12800.25Cr',
    },
    {
      date: '2/2/2022',
      discription: 'Prin-Auto Split',
      debit: '',
      credit: '',
      total: '12800.25Cr',
    },
    {
      date: '2/2/2022',
      discription: 'Balance B/F',
      debit: '1530.25',
      credit: '2000',
      total: '5000',
    },

    {
      date: '2/2/2022',
      discription: 'Prin-Auto Split',
      debit: '1530.25',
      credit: '2000',
      total: '5000',
    },
  ],
  account_details: {
    account_branch: 'Banguluru',
    account_no: 1234566588989,
    statement_date: '2/3/2021',
    account_type: 'savings',
  },
  transaction_summary: {
    total_debit: '3000',
    total_crebit: '4000',
    total_finance: '5000',
    total_balance: '12000',
    interest_carged: '5698',
    advance_payment: '3569',
    redraw_available: '456987',
    amount_in_arrears: '25689',
    charges_in_arrears: '15689',
    accrued_interest: '256985',
  },
};
const LoanStatement = ({invoice_data}) => {
  let loan_statement = Loan_statement;
  const account_details = invoice_data.loan_details || {};

  switch (invoice_data.sub_category.sub_category) {
    case 'loan_borrowed':
      loan_statement = invoice_data.loan_borrowed;
      break;
    case 'loan_interest_accrual':
      loan_statement = invoice_data.loan_intrest_accrual;
      break;
    case 'loan_interest_payment':
      loan_statement = invoice_data.loan_intrest_payment;
      break;
    case 'loan_principal_repayment':
      loan_statement = invoice_data.loan_principal_repayment;
      break;
    default:
      loan_statement = Loan_statement;
      break;
  }

  // Access the transaction details array
  const transactions = loan_statement.transaction_detail || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bankName}>Axis Bank</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.boldText}>Account Branch</Text>
            <Text style={styles.boldText}>Account Number</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.tableCell}>
              {account_details.account_branch}
            </Text>
            <Text style={styles.tableCell}>
              {account_details.loan_account_no}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.boldText}>Account Type</Text>
            <Text style={styles.boldText}>Statement Date</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.tableCell}>{account_details.account_type}</Text>
            <Text style={styles.tableCell}>
              {account_details.statement_date}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.tableContainer}>
        <Text style={styles.tableHeader}>Loan Statement</Text>
        <View style={[styles.tableRow]}>
          <Text style={styles.tableCell}>Date</Text>
          <Text style={styles.tableCell}>Transaction Description</Text>
          <Text style={styles.tableCell}>Debit</Text>
          <Text style={styles.tableCell}>Credit</Text>
          <Text style={styles.tableCell}>Balance</Text>
        </View>
        <FlatList
          data={transactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              style={[
                styles.tableRow,
                item.current ? styles.highlightRow : null,
              ]}>
              <Text style={styles.tableCell}>{item.date}</Text>
              <Text style={styles.tableCell}>{item.description}</Text>
              <Text style={styles.tableCell}>
                {item.debit ? item.debit.toLocaleString('en-IN') : '-'}
              </Text>
              <Text style={styles.tableCell}>
                {item.credit ? item.credit.toLocaleString('en-IN') : '-'}
              </Text>
              <Text style={styles.tableCell}>{item.total}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.boldText}>Transaction Summary</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.boldText}>Total Debit</Text>
            <Text style={styles.boldText}>Total Credit</Text>
            <Text style={styles.boldText}>Total Finance</Text>
            <Text style={styles.boldText}>Total Balance</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.tableCell}>
              {transactions
                .reduce((acc, v) => acc + parseFloat(v.debit || 0), 0)
                .toLocaleString('en-IN')}
            </Text>
            <Text style={styles.tableCell}>
              {transactions
                .reduce((acc, v) => acc + parseFloat(v.credit || 0), 0)
                .toLocaleString('en-IN')}
            </Text>
            <Text style={styles.tableCell}>
              {account_details.total_finance || '0'}
            </Text>
            <Text style={styles.tableCell}>
              {account_details.loan_amount || '0'}
            </Text>
            {/* <Text>{closing_balance.toLocaleString('en-IN')}</Text> */}
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.boldText}>Interest Charged</Text>
            <Text style={styles.boldText}>Advance Payment</Text>
            <Text style={styles.boldText}>Redraw Available</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.tableCell}>
              {account_details.loan_interest_rate}%
            </Text>
            <Text style={styles.tableCell}>
              {account_details.advance_payment || 'NA'}
            </Text>
            <Text style={styles.tableCell}>
              {account_details.redraw_available || 'NA'}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.boldText}>Amount in Arrears</Text>
            <Text style={styles.boldText}>Charges in Arrears</Text>
            <Text style={styles.boldText}>Accrued Interest</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.tableCell}>
              {account_details.amount_in_arrears || 'NA'}
            </Text>
            <Text style={styles.tableCell}>
              {account_details.charges_in_arrears || 'NA'}
            </Text>
            <Text style={styles.tableCell}>
              {account_details.accrued_interest || 'NA'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.additionalInfo}>
        <Text style={styles.boldText}>Additional Information</Text>
        <Text style={styles.tableCell}>
          Notice for payments by mail: If you’re mailing a payment, please print
          the form below and include it in the envelope. Be sure to write your
          loan number in the memo of the check and make your check out to
          scratch service, LLC.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    backgroundColor: '#97144d',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#808080',
  },
  button: {
    width: '20%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '50%',
  },
  bankName: {
    fontSize: 24,
    color: 'white',
    marginTop: 16,
    marginLeft: 16,
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  col: {
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#808080',
  },
  tableContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#808080',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  highlightRow: {
    backgroundColor: '#f0f0f0',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#808080',
  },
  summaryContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    color: '#808080',
  },
  additionalInfo: {
    marginTop: 16,
    paddingHorizontal: 16,
    color: '#808080',
  },
});

export default LoanStatement;
