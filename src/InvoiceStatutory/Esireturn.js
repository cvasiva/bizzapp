/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';

const EsiReturn = ({invoice_data}) => {
  const esiReturnDetails = invoice_data?.esi_returns || {};

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={styles.tableHeaderText}>SI No.</Text>
      <Text style={styles.tableHeaderText}>Emp. Number</Text>
      <Text style={styles.tableHeaderText}>Employee Name</Text>
      <Text style={styles.tableHeaderText}>Days Worked</Text>
      <Text style={styles.tableHeaderText}>Monthly Wages</Text>
      <Text style={styles.tableHeaderText}>Employee Contribution</Text>
    </View>
  );

  const renderTableRow = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.si_no}</Text>
      <Text style={styles.tableCell}>{item.emp_number}</Text>
      <Text style={styles.tableCell}>{item.employee_name}</Text>
      <Text style={styles.tableCell}>{item.days_worked}</Text>
      <Text style={styles.tableCell}>
        {new Intl.NumberFormat('en-IN').format(item.monthly_wages)}
      </Text>
      <Text style={styles.tableCell}>
        {new Intl.NumberFormat('en-IN').format(item.employee_contribution)}
      </Text>
    </View>
  );

  return (
    <ScrollView>
      {esiReturnDetails && (
        <View style={styles.innerContainer}>
          <View style={styles.headerRow}>
            <View style={styles.colorBlock1} />
            <View style={styles.colorBlock2} />
            <View style={styles.colorBlock3} />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>ESI Return - Apr 2021</Text>
            <Text style={styles.subtitle}>Monthly Contribution Details</Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Employer Name:</Text>
              <Text style={styles.value}>
                {esiReturnDetails.employee_details?.employers_name}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Employer Code:</Text>
              <Text style={styles.value}>
                {esiReturnDetails.employee_details?.employer_code}
              </Text>
            </View>

            <View style={styles.tableContainer}>
              {renderTableHeader()}
              <FlatList
                data={esiReturnDetails.monthly_contibution_details}
                renderItem={renderTableRow}
                keyExtractor={item => item.si_no.toString()}
              />
              <View style={styles.totalRow}>
                <Text style={styles.totalCell}>Total</Text>
                <Text style={styles.totalCell} />
                <Text style={styles.totalCell} />
                <Text style={styles.totalCell} />
                <Text style={styles.totalCell} />
                <Text style={styles.totalCell}>
                  {new Intl.NumberFormat('en-IN').format(
                    esiReturnDetails.contributions?.employee_contribution,
                  )}
                </Text>
              </View>
            </View>

            <View style={styles.contributionRow}>
              <View style={styles.contributionCell}>
                <Text style={styles.contributionValue}>Total Employee Contribution</Text>
                <Text style={styles.contributionValue}>
                  {new Intl.NumberFormat('en-IN').format(
                    esiReturnDetails.contributions?.employee_contribution,
                  )}
                </Text>
              </View>
              <View style={styles.contributionCell}>
                <Text style={styles.contributionValue}>Total Employer Contribution</Text>
                <Text style={styles.contributionValue}>
                  {new Intl.NumberFormat('en-IN').format(
                    esiReturnDetails.contributions?.employer_contribution,
                  )}
                </Text>
              </View>
              <View style={styles.contributionCell}>
                <Text style={styles.contributionValue}>Total Contribution</Text>
                <Text style={styles.contributionValue}>
                  {new Intl.NumberFormat('en-IN').format(
                    esiReturnDetails.contributions?.total_contribution,
                  )}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <View style={styles.footerBlock1} />
              <View style={styles.footerBlock2} />
              <View style={styles.footerBlock3} />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    width:600,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  colorBlock1: {
    flex: 1,
    backgroundColor: 'red', // Replace with your color
    height: 50,
    marginRight: 5,
  },
  colorBlock2: {
    flex: 1,
    backgroundColor: 'green', // Replace with your color
    height: 50,
    marginRight: 5,
  },
  colorBlock3: {
    flex: 1,
    backgroundColor: 'blue', // Replace with your color
    height: 50,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color:'#808080',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color:'#808080',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
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
    borderWidth: 1,
    borderColor: '#9999ff',
    borderRadius: 4,
    overflow: 'hidden',
    color:'#808080',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#808080',
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
    color:'#808080',
  },
  totalRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f5f5f5',
    color:'#808080',
  },
  totalCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#808080',
  },
  contributionRow: {
    flexDirection: 'row',
    marginTop: 20,
    color:'#808080',
  },
  contributionCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    alignItems: 'center',
  },
  contributionValue: {
    marginTop: 5,
    fontWeight: 'bold',
    color:'#808080',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  footerBlock1: {
    flex: 1,
    backgroundColor: 'black', // Replace with your color
    height: 50,
    marginRight: 5,
  },
  footerBlock2: {
    flex: 1,
    backgroundColor: 'yellow', // Replace with your color
    height: 50,
    marginRight: 5,
  },
  footerBlock3: {
    flex: 1,
    backgroundColor: 'black', // Replace with your color
    height: 50,
  },
});

export default EsiReturn;
