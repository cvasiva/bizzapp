/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import AuthorisedSignature from '../Invoice/AuthorisedSignature';

const FDForms = ({invoice_data}) => {
  const [templateData, setTemplateData] = useState(invoice_data);
  const getTitle = () => {
    if (invoice_data?.sub_category === 'fd_creation') {
      return 'Fixed Deposit Certificate';
    } else if (invoice_data?.sub_category === 'fd_closure') {
      return 'Fixed Closure Certificate';
    }
  };
  return (
    <View style={styles.container}>
      {templateData && (
        <>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View>
              <View style={styles.bankName1}>
                <Text style={styles.bankName}>Axis Bank</Text>
              </View>
              <Text style={styles.certificateTitle}>{getTitle()}</Text>
              <Text style={styles.paragraph}>
                Dear Sir/Madam,
                {'\n'}We have pleasure in confirming details of the following
                amount held in deposit with us. Please quote the Account Number
                in all correspondence.
              </Text>
              <View style={styles.row}>
                <Text style={styles.rowText}>Value Date:</Text>
                <Text style={styles.rowText}>Maturity Date:</Text>
              </View>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>ACCOUNT NUMBER</Text>
                  <Text style={styles.tableHeaderText}>DEPOSIT AMOUNT</Text>
                  <Text style={styles.tableHeaderText}>
                    INTEREST RATE(%P.A.)
                  </Text>
                  <Text style={styles.tableHeaderText}>MATURITY AMOUNT</Text>
                </View>
                {(invoice_data?.interests_income || []).map((data, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>
                      {data.interest_received_in_bank_account}
                    </Text>
                    <Text style={styles.tableCell}>
                      {new Intl.NumberFormat('en-IN').format(
                        data.fd_deposit_amount,
                      )}
                    </Text>
                    <Text style={styles.tableCell}>
                      {data.fd_interest_rate}
                    </Text>
                    <Text style={styles.tableCell}>
                      {new Intl.NumberFormat('en-IN').format(
                        data.fd_maturity_amount,
                      )}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.signatureSection}>
                <View style={styles.addressSection}>
                  <Text style={styles.boldText}>Address:</Text>
                  <Text style={styles.tableCell}>{`${invoice_data.usercompany?.companyname}, ${invoice_data.usercompany?.address1}`}</Text>
                </View>
                <View style={styles.signature}>
                  <Text style={styles.signatureText}>For Axis Bank Ltd.</Text>
                  <AuthorisedSignature companyNameSignature="Axis Bank" />
                  <Text style={styles.signatureText}>Manager</Text>
                </View>
              </View>
              <View style={styles.separator} />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor:
      'radial-gradient(84% 84% at 0% 16%, #897FFF 0%, #5243FF 100%)',
  },
  activeButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 4,
  },
  inactiveButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
    borderRadius: 4,
  },
  contentContainer: {
    padding: 16,
  },
  bankName1: {
    backgroundColor: '#AE275F',
  },
  bankName: {
    fontSize: 24,
    color: '#FFFFFF',
    paddingLeft: 10,
    backgroundColor: 'AE275F',
  },
  certificateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'#808080',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 16,
    color:'#808080',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rowText: {
    fontSize: 16,
    color:'#808080',
  },
  table: {
    marginBottom: 16,
    color:'#808080',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#AE275F',
    padding: 8,
  },
  tableHeaderText: {
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color:'#808080',
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  addressSection: {
    flex: 1,
  },
  signature: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signatureText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#808080',
  },
  boldText: {
    fontWeight: 'bold',
    color:'#808080',
  },
  separator: {
    height: 1,
    backgroundColor: '#AE275F',
    marginVertical: 16,
  },
});

export default FDForms;
