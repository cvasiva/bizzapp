/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';

const PfReturn = ({invoice_data}) => {
  // Extract pf_returns with default empty object
  const pf_payment = invoice_data?.pf_payment || {};
  const pf_returns = pf_payment?.pf_returns || {};

  // Extract nested properties with default values
  const employerDetails = pf_returns.employee_details || {};
  const monthlyContributionDetails =
    pf_returns.monthly_contibution_details || [];
  const contributions = pf_returns.contributions || {};


  const renderTableRow = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.si_no || 'N/A'}</Text>
      <Text style={styles.cell}>{item.emp_number || 'N/A'}</Text>
      <Text style={styles.cell}>{item.employee_name || 'N/A'}</Text>
      <Text style={styles.cell}>{item.days_worked || 'N/A'}</Text>
      <Text style={styles.cell}>{item.mothly_wage || 'N/A'}</Text>
      <Text style={styles.cell}>{item.employee_contribution || 'N/A'}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft} />
        <View style={styles.headerMiddle} />
        <View style={styles.headerRight} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Employer Name:</Text>
          <Text style={styles.value}>
            {employerDetails.employer_name || 'N/A'}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Employer Code:</Text>
          <Text style={styles.value}>
            {employerDetails.employer_code || 'N/A'}
          </Text>
        </View>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>SI No.</Text>
          <Text style={styles.tableHeaderText}>Emp. Number</Text>
          <Text style={styles.tableHeaderText}>Employee Name</Text>
          <Text style={styles.tableHeaderText}>Days Worked</Text>
          <Text style={styles.tableHeaderText}>Monthly Wages</Text>
          <Text style={styles.tableHeaderText}>Employee Contribution</Text>
        </View>
        {monthlyContributionDetails.length > 0 ? (
          <FlatList
            data={monthlyContributionDetails}
            renderItem={renderTableRow}
            keyExtractor={item => item.si_no.toString()}
          />
        ) : (
          <Text style={styles.noDataText}>
            No contribution details available
          </Text>
        )}
        <View style={styles.tableFooter}>
          <View style={styles.tableFooterRow}>
            <Text style={styles.tableFooterText}>Total</Text>
            <Text style={styles.tableFooterValue}>
              {new Intl.NumberFormat('en-IN').format(
                contributions.employee_contribution || 0,
              )}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.contributionsContainer}>
        <View style={styles.contributionRow}>
          <Text style={styles.contributionLabel}>
            Total Employee Contribution
          </Text>
          <Text style={styles.contributionValue}>
            {contributions.employee_contribution || 'N/A'}
          </Text>
        </View>
        <View style={styles.contributionRow}>
          <Text style={styles.contributionLabel}>
            Total Employer Contribution
          </Text>
          <Text style={styles.contributionValue}>
            {contributions.employer_contribution || 'N/A'}
          </Text>
        </View>
        <View style={styles.contributionRow}>
          <Text style={styles.contributionLabel}>Total Contribution</Text>
          <Text style={styles.contributionValue}>
            {contributions.total_contribution || 'N/A'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    width:600,
    color:'#808080',
  },
  headerContainer: {
    flexDirection: 'row',
    height: 40,
    color:'#808080',
  },
  headerLeft: {
    flex: 3,
    backgroundColor: 'white',
    marginRight: -12,
    color:'#808080',
  },
  headerMiddle: {
    flex: 1,
    backgroundColor: '#9999ff',
    clipPath: 'polygon(73% 0, 86% 0, 49% 100%, 38% 100%)',
    marginRight: -60,
    color:'#808080',
  },
  headerRight: {
    flex: 1,
    backgroundColor: '#9999ff',
    clipPath: 'polygon(11% 0, 100% 0%, 100% 100%, 25% 100%, 0 100%)',
    color:'#808080',
  },
  detailsContainer: {
    marginTop: 30,
    marginBottom: 10,
    color:'#808080',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
    color:'#808080',
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    color:'#808080',
  },
  value: {
    flex: 2,
    color:'#808080',
  },
  tableContainer: {
    marginBottom: 20,
    color:'#808080',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#9999ff',
    paddingVertical: 10,
    color:'#808080',
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#808080',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    color:'#808080',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color:'#808080',
  },
  tableFooter: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    color:'#808080',
  },
  tableFooterRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    color:'#808080',
  },
  tableFooterText: {
    flex: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#808080',
  },
  tableFooterValue: {
    flex: 1,
    textAlign: 'center',
    color:'#808080',
  },
  contributionsContainer: {
    marginTop: 20,
    color:'#808080',
  },
  contributionRow: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#9999ff',
    padding: 10,
    borderRadius: 5,
    color:'#808080',
  },
  contributionLabel: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#808080',
  },
  contributionValue: {
    flex: 1,
    textAlign: 'center',
    color:'#808080',
  },
  noDataText: {
    textAlign: 'center',
    color: 'gray',
    marginVertical: 20,
  },
});

export default PfReturn;
