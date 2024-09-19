/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import AuthorisedSignature from '../Invoice/AuthorisedSignature';

const InterestIncomes = ({invoice_data}) => {
  const [record, setRecord] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [subCategory, setSubCategory] = useState(invoice_data?.sub_category);

  useEffect(() => {
    setRecord(invoice_data);
  }, [invoice_data]);

  const getTitle = () => {
    if (subCategory === 'interest_income_accrual') {
      return 'Interest Income Accrual';
    } else if (subCategory === 'interest_income_received') {
      return 'Interest Income Received';
    }
  };

  const getTitle1 = () => {
    if (subCategory === 'interest_income_accrual') {
      return 'Interest Accrued';
    } else if (subCategory === 'interest_income_received') {
      return 'Interest Received';
    }
  };

  const getTitle2 = () => {
    if (subCategory === 'interest_income_accrual') {
      return 'Interest Accrued But Not Received';
    } else if (subCategory === 'interest_income_received') {
      return 'Interest Received In Bank Account';
    }
  };

  // Render the table rows
  const renderTableRow = ({item, index}) => (
    <View style={styles.tableRow} key={index}>
      <Text style={styles.tableCell}>{index + 1}</Text>
      <Text style={styles.tableCell}>{item?.fd_receipt_no || '-'}</Text>
      <Text style={styles.tableCell}>
        {item?.fd_deposit_amount?.toLocaleString('en-IN') || '0'}
      </Text>
      <Text style={styles.tableCell}>
        {item?.fd_maturity_amount?.toLocaleString('en-IN') || '0'}
      </Text>
      <Text style={styles.tableCell}>
        {subCategory === 'interest_income_accrual'
          ? item?.interest_accrued?.toLocaleString('en-IN') || '0'
          : item?.interest_received?.toLocaleString('en-IN') || '0'}
      </Text>
      <Text style={styles.tableCell}>
        {item?.tds_received?.toLocaleString('en-IN') || '0'}
      </Text>
      <Text style={styles.tableCell}>
        {item?.interest_received_in_bank_account?.toLocaleString('en-IN') ||
          '0'}
      </Text>
    </View>
  );

  return (
    <ScrollView>
      {record && (
        <View style={styles.innerContainer}>
          <View style={styles.bankName1}>
            <Text style={styles.bankName}>Axis Bank</Text>
          </View>
          <Text style={styles.certificateTitle}>{getTitle()}</Text>

          {record.account_details && (
            <View style={styles.accountDetails}>
              <View style={styles.accountDetailRow}>
                <Text style={styles.boldText}>Account Branch</Text>
                <Text style={styles.tableCell}>
                  {record.account_details?.account_branch || '-'}
                </Text>
              </View>
              <View style={styles.accountDetailRow}>
                <Text style={styles.boldText}>Account Number</Text>
                <Text style={styles.tableCell}>
                  {record.account_details?.account_no || '-'}
                </Text>
              </View>
              <View style={styles.accountDetailRow}>
                <Text style={styles.boldText}>Account Type</Text>
                <Text style={styles.tableCell}>
                  {record.account_details?.account_type || '-'}
                </Text>
              </View>
              <View style={styles.accountDetailRow}>
                <Text style={styles.boldText}>Statement Date</Text>
                <Text style={styles.tableCell}>
                  {record.account_details?.statement_date || '-'}
                </Text>
              </View>
            </View>
          )}

          <FlatList
            data={record?.interests_income || []}
            renderItem={renderTableRow}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>SI No.</Text>
                <Text style={styles.tableHeaderText}>FD Receipt No</Text>
                <Text style={styles.tableHeaderText}>FD Deposit Amount</Text>
                <Text style={styles.tableHeaderText}>FD Maturity Amount</Text>
                <Text style={styles.tableHeaderText}>{getTitle1()}</Text>
                <Text style={styles.tableHeaderText}>TDS Received</Text>
                <Text style={styles.tableHeaderText}>{getTitle2()}</Text>
              </View>
            }
            ListFooterComponent={
              <View style={styles.footer}>
                <Text style={styles.footerText}>Total</Text>
                {subCategory === 'interest_income_received' ? (
                  <Text style={styles.footerValue}>
                    {record?.total_interest_received_in_bank_account?.toLocaleString(
                      'en-IN',
                    ) || '0'}
                  </Text>
                ) : (
                  <>
                    <Text style={styles.footerValue}>
                      {record?.total_interest_received?.toLocaleString(
                        'en-IN',
                      ) || '0'}
                    </Text>
                    <Text style={styles.footerValue}>
                      {record?.total_tds_received?.toLocaleString('en-IN') ||
                        '0'}
                    </Text>
                    <Text style={styles.footerValue}>
                      {record?.total_interest_received_in_bank_account?.toLocaleString(
                        'en-IN',
                      ) || '0'}
                    </Text>
                  </>
                )}
              </View>
            }
          />

          <View style={styles.signatureSection}>
            <Text style={styles.signatureText}>For Axis Bank Ltd.</Text>
            <AuthorisedSignature companyNameSignature="Axis Bank" />
            <Text style={styles.signatureText}>Manager</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bankName1: {
    backgroundColor: '#AE275F',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    width: 600,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    width: 600,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerItem: {
    width: '30%',
  },
  bankName: {
    fontSize: 24,
    color: '#FFFFFF',
    padding: 8,
    textAlign: 'center',
    marginBottom: 8,
  },
  certificateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#808080',
  },
  accountDetails: {
    marginBottom: 16,
    color: '#808080',
  },
  accountDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#808080',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#AE275F',
    color: '#fff',
    padding: 8,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    padding: 8,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#808080',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  footerText: {
    color: '#808080',
    fontWeight: 'bold',
  },
  footerValue: {
    textAlign: 'right',
    color: '#808080',
  },
  signatureSection: {
    marginTop: 16,
    alignItems: 'center',
    color: '#808080',
  },
  signatureText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#808080',
  },
});

export default InterestIncomes;
