/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

const DividendReceived = ({invoice_data}) => {
  const divident_received = invoice_data;

  return (
    divident_received && (
      <ScrollView>
        <View style={{marginBottom: -8}}>
          <View style={styles.companyContainer}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/en/5/58/State_Bank_of_India_logo.svg',
              }}
              style={styles.logo}
            />
            <View style={styles.companyDetails}>
              <Text style={styles.companyName}>
                {divident_received.company_details.name}
              </Text>
              <Text style={styles.tableCell}>{divident_received.company_details.address}</Text>
            </View>
          </View>

          <View style={styles.dividendDetails}>
            <Text style={styles.detailText}>
              Date: {divident_received?.shareholder_details?.date}
            </Text>
            <Text style={styles.detailText}>
              {divident_received?.dividend_received?.shareholder_details?.sub}
            </Text>
            <Text style={styles.dearShareholder}>Dear Shareholder,</Text>
            <Text style={styles.paragraph}>
              1. With great pleasure we inform you that the Bank has declared
              Dividend 2020-21 @ Rs.10 per equity share.
            </Text>
            <Text style={styles.paragraph}>
              2. As per your mandate registered with your Depository Participant
              (in case shares are held in demat form) or Share Transfer of the
              Bank.
            </Text>

            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellHeader}>Name</Text>
                <Text style={styles.tableCell}>
                  {divident_received.usercompany.companyname}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellHeader}>
                  Folio Number/ DP ID/ Client ID
                </Text>
                <Text style={styles.tableCell}>
                  {divident_received.shareholder_details.folio_number}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellHeader}>
                  Number of Equity shares
                </Text>
                <Text style={styles.tableCell}>
                  {
                    divident_received.shareholder_details
                      .number_of_equity_shares
                  }
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellHeader}>Dividend Per Share</Text>
                <Text style={styles.tableCell}>
                  {divident_received.shareholder_details.divident_per_share}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellHeader}>
                  Gross Amount of Dividend
                </Text>
                <Text style={styles.tableCell}>
                  {new Intl.NumberFormat('en-IN').format(
                    divident_received.shareholder_details
                      .gross_amount_per_divident,
                  )}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellHeader}>
                  Tax Deducted at Source (TDS)
                </Text>
                <Text style={styles.tableCell}>
                  {new Intl.NumberFormat('en-IN').format(
                    divident_received.shareholder_details
                      .tax_deducted_at_source,
                  )}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellHeader}>
                  Net Amount of Dividend credited
                </Text>
                <Text style={styles.tableCell}>
                  {divident_received?.shareholder_details
                    ?.net_amount_of_divident_credited !== undefined
                    ? new Intl.NumberFormat('en-IN').format(
                        Number(
                          divident_received.shareholder_details
                            .net_amount_of_divident_credited,
                        ).toFixed(0),
                      )
                    : 'N/A'}
                </Text>
              </View>
            </View>

            <View style={styles.signatureContainer}>
              <Text style={styles.signatureText}>For State Bank of India</Text>
              <Text style={styles.signatureText}>
                Assistant General Manager
              </Text>
              <Text style={styles.signatureText}>
                (Compliance and Company Secretary)
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:
      'radial-gradient(84% 84% at 0% 16%, #897FFF 0%, #5243FF 100%)',
    paddingVertical: 5,
  },
  button: {
    backgroundColor: '#FFC107',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: '#000',
  },
  companyContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: -10,
    marginRight: 20,
  },
  companyDetails: {
    flex: 1,
    alignItems: 'center',
    color: '#808080',
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#808080',
  },
  dividendDetails: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  detailText: {
    fontSize: 11,
    color: '#808080',
  },
  dearShareholder: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#808080',
  },
  paragraph: {
    fontSize: 11,
    marginTop: 5,
    color: '#808080',
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableCellHeader: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    backgroundColor: '#F0F0F0',
    fontWeight: 'bold',
    color: '#808080',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    color: '#808080',
  },
  signatureContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  signatureText: {
    fontSize: 11,
    textAlign: 'center',
    color: '#808080',
  },
});

export default DividendReceived;
