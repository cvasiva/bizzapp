/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';

const PtStatement = ({invoice_data}) => {
  const ptStatement = invoice_data?.professional_Tax || {};
  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={styles.tableHeaderText}>SI. No.</Text>
      <Text style={styles.tableHeaderText}>Employee No.</Text>
      <Text style={styles.tableHeaderText}>Employee Name</Text>
      <Text style={styles.tableHeaderText}>Gross Salary</Text>
      <Text style={styles.tableHeaderText}>Professional Tax</Text>
    </View>
  );

  const renderTableRow = ({item}) => (
    <View style={[styles.tableRow, item.current && styles.currentRow]}>
      <Text style={styles.tableCell}>{item.si_no}</Text>
      <Text style={styles.tableCell}>{item.emp_number}</Text>
      <Text style={styles.tableCell}>{item.employee_name}</Text>
      <Text style={styles.tableCell}>
        {new Intl.NumberFormat('en-IN').format(item.gross_salary)}
      </Text>
      <Text style={[styles.tableCell, styles.rightAlign]}>
        {new Intl.NumberFormat('en-IN').format(item.professional_tax)}
      </Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer} />
        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Image
              source={require('../Images/nisha_steel_n_alloys.png')}
              resizeMode="contain"
              style={styles.logo}
            />
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>
                {ptStatement.company_details?.company}
              </Text>
              <Text style={styles.tableCell}>
                {ptStatement.company_details?.address}
              </Text>
            </View>
            <View style={styles.statementHeader}>
              <Text style={styles.statementTitle}>Monthly Statement</Text>
            </View>
          </View>

          <View style={styles.tableContainer}>
            <Text style={styles.statementTitle}>
              Professional Tax - April 2021
            </Text>
            {renderTableHeader()}
            <FlatList
              data={ptStatement.monthly_statement}
              renderItem={renderTableRow}
              keyExtractor={item => item.si_no.toString()}
              ListFooterComponent={() => (
                <View style={styles.totalRow}>
                  <Text style={styles.totalCell} />
                  <Text style={styles.totalCell}>Total</Text>
                  <Text style={styles.totalCell} />
                  <Text style={styles.totalCell} />
                  <Text style={[styles.totalCell, styles.rightAlign]}>
                    {new Intl.NumberFormat('en-IN').format(
                      ptStatement.total?.total,
                    )}
                  </Text>
                </View>
              )}
            />
          </View>

          <View style={styles.signatureRow}>
            <Text style={styles.signatureText}>Authorized Signatory</Text>
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
    width: 600,
  },
  headerContainer: {
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  companyInfo: {
    flex: 1,
    marginLeft: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#808080',
  },
  statementHeader: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    alignItems: 'center',
  },
  statementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#808080',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#9999ff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgb(190, 183, 244)',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#808080',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#808080',
  },
  rightAlign: {
    textAlign: 'right',
  },
  currentRow: {
    fontWeight: 'bold',
    color: '#808080',
  },
  totalRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  totalCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#808080',
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  signatureText: {
    fontWeight: 'bold',
    color: '#808080',
  },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default PtStatement;
