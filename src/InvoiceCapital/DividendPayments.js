/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import moment from 'moment';

const DividendPayments = ({invoice_data}) => {
  const templateData = invoice_data;
  const company = templateData.usercompany;
  const folio_date = templateData.company_share.date;

  const renderCompany = templateData => {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.companyInfo}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../Images/nisha_steel_n_alloys.png')}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>
            <View style={styles.companyDetails}>
              <Text style={styles.companyName}>
                {company.companyname || ''}
              </Text>
              <Text style={styles.companyAddress}>
                {company.address1} {company.address2} {company.city}{' '}
                {company.pin}, {company.state}
              </Text>
            </View>
          </View>
          <View style={styles.dividendMemoHeader}>
            <Text style={styles.dividendMemoText}>DIVIDEND MEMO</Text>
          </View>
          <ScrollView style={styles.content}>
            <Text style={styles.declarationText}>
              The Board of Directors of company held meeting and declare interim
              dividend @ 20% to all share holders
            </Text>
            <View style={styles.detailsContainer}>
              <DetailRow
                label="Name of the Share Holder"
                value={templateData.employee.employee_name}
              />
              <DetailRow
                label="No. of Shares"
                value={templateData.company_share.no_of_shares}
              />
              <DetailRow
                label="Dividend Amount"
                value={new Intl.NumberFormat('en-IN').format(
                  templateData.company_share.dividend_amount,
                )}
              />
              <DetailRow
                label="The Dividend has paid on vide Cheque"
                value={new Intl.NumberFormat('en-IN').format(
                  templateData.company_share.cheque_no,
                )}
              />
              <DetailRow
                label="Folio Number"
                value={new Intl.NumberFormat('en-IN').format(
                  templateData.company_share.folio_nos,
                )}
              />
              <DetailRow
                label="Folio Date"
                value={moment(folio_date, 'DD-MM-YYYY').format('DD-MM-YYYY')}
              />
            </View>
          </ScrollView>
          <View style={styles.signature}>
            <Text style={styles.signatureText}>-SD-</Text>
            <Text style={styles.signaturePosition}>Managing Director</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.footerLine} />
          </View>
        </View>
      </ScrollView>
    );
  };

  const DetailRow = ({label, value}) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  return (
    <>{templateData && templateData.employee && renderCompany(templateData)}</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    backgroundColor:
      'radial-gradient(84% 84% at 0% 16%, rgb(137, 127, 255) 0%, rgb(82, 67, 255) 100%)',
    paddingVertical: '1%',
  },
  buttonContainer: {
    width: '20%',
  },
  spacer: {
    width: '50%',
  },
  iconContainer: {
    width: '11%',
  },
  companyInfo: {
    display:'flex',
    flexDirection: 'row',
    backgroundColor: 'rgb(76 169 242 / 46%)',
    borderColor: '#6c757d',
    justifyContent: 'center',
    alignItems:'center',
    textAlign:'center',
    borderWidth: 1,
    paddingLeft:30,
    paddingVertical: 8,
    marginTop: 8,
  },
  logoContainer: {
    width: 50,
    height: 50,
    marginLeft: -16,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  companyDetails: {
    flex: 1,
    marginLeft: 16,
  },
  companyName: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#808080',
  },
  companyAddress: {
    fontFamily: 'Roboto',
    color: '#808080',
  },
  dividendMemoHeader: {
    backgroundColor: '#383854',
    paddingVertical: 8,
    marginTop: 16,
  },
  dividendMemoText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: '#fff',
    borderColor: '#6c757d',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 16,
    padding: 16,
  },
  declarationText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    textAlign: 'left',
    color: '#808080',
  },
  detailsContainer: {
    marginVertical: 8,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  detailLabel: {
    flex: 0.8,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#808080',
  },
  detailValue: {
    flex: 0.2,
    fontFamily: 'Roboto',
    color: '#808080',
  },
  signature: {
    alignItems: 'center',
    marginVertical: 16,
    color: '#808080',
  },
  signatureText: {
    fontFamily: 'Roboto',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#808080',
  },
  signaturePosition: {
    fontFamily: 'Roboto',
    fontSize: 11,
    marginTop: -4,
    color: '#808080',
  },
  footer: {
    marginTop: 16,
  },
  footerLine: {
    backgroundColor: '#383854',
    height: 1,
    width: '100%',
  },
});

export default DividendPayments;
