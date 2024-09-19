/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';

const PtChallan = ({invoice_data}) => {
  const ptChallan = invoice_data?.professional_tax_challan || {};

  const renderAccountDetail = ({item}) => (
    <View style={styles.accountDetailRow}>
      <Text style={styles.accountDetailCell}>{item.head_of_account}</Text>
      <Text style={styles.accountDetailCell}>{item.collectons}</Text>
      <Text style={[styles.accountDetailCell, styles.rightAlign]}>
        {new Intl.NumberFormat('en-IN').format(item.amount)}
      </Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer} />
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.emptySpace} />
            {/* <Image
            source={require('../../../../assets/images/karnataka_logo.png')}
            style={styles.logo}
          /> */}
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Form 152</Text>
            <Text style={styles.titleText}>See Rule 50(a)(1)</Text>
            <Text style={styles.titleText}>CHALLAN</Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.titleText}>Original</Text>
            <Text style={styles.titleText}>Taxs on Sales Trade etc</Text>
            <View style={styles.row}>
              <View style={styles.leftColumn}>
                <Text style={styles.titleText}>Major Head of Account</Text>
                <Text style={styles.titleText}>Date</Text>
                <Text style={styles.titleText}>Payment GateWay</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.bold}>
                  {ptChallan.sales_trade?.major_head}
                </Text>
                <Text style={styles.bold}>{ptChallan.sales_trade?.Date}</Text>
                <Text style={styles.bold}>
                  {ptChallan.sales_trade?.payment_gate_way}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Text style={styles.titleText}>Remitter's</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.bold}>{ptChallan.company?.remitters}</Text>
            </View>
            <View style={styles.leftColumn}>
              <Text style={styles.titleText}>PTO</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.bold}>{ptChallan.company?.pto}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Text style={styles.titleText}>Name</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.bold}>{ptChallan.company?.company_name}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Text style={styles.titleText}>CTD Ref No.</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.bold}>{ptChallan.company?.ctd_ref_no}</Text>
            </View>
            <View style={styles.leftColumn}>
              <Text style={styles.titleText}>KII Ref No</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.bold}>{ptChallan.company?.kill_ref_no}</Text>
            </View>
            <View style={styles.leftColumn}>
              <Text style={styles.titleText}>Period</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.bold}>{ptChallan.company?.period}</Text>
            </View>
          </View>

          <View style={styles.tableContainer}>
            <View style={styles.tableHeaderRow}>
              <Text style={styles.tableHeaderCell}>Head of Account</Text>
              <Text style={styles.tableHeaderCell}>Collections</Text>
              <Text style={styles.tableHeaderCell}>Amount</Text>
            </View>
            <FlatList
              data={ptChallan.challan_account_detalis}
              renderItem={renderAccountDetail}
              keyExtractor={item => item.head_of_account}
            />
          </View>

          <View style={styles.totalRow}>
            <View style={styles.leftColumn}>
              <Text style={styles.bold}>Total:</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.bold}>
                {new Intl.NumberFormat('en-IN').format(
                  ptChallan.total?.total_amt,
                )}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Text style={styles.titleText}>Total Amount in Words:</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.bold}>{ptChallan.total?.amt_words}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.titleText}>Signature of remitter/depositor</Text>
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Department of Commercial Tax, Govt. of Karnataka.
            </Text>
          </View>
        </View>
        <View style={styles.footerContainer} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    width:600,
  },
  headerContainer: {
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  emptySpace: {
    flex: 1,
  },
  logo: {
    resizeMode: 'contain',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#808080',
  },
  sectionContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftColumn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
  },
  rightColumn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
  },
  bold: {
    fontWeight: 'bold',
    color:'#808080',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    padding: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#808080',
  },
  accountDetailRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  accountDetailCell: {
    flex: 1,
    textAlign: 'center',
    color:'#808080',
  },
  rightAlign: {
    textAlign: 'right',
    color:'#808080',
  },
  totalRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'right',
    fontWeight: 'bold',
    color:'#808080',
  },
});

export default PtChallan;
