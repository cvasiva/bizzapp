/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import moment from 'moment';

const StatementofOvertimeSalary = ({invoice_data}) => {
  const employee_salary = invoice_data?.employee_salary || {};
  const company_data = invoice_data?.usercompany || {};
  const renderTableRow = ({item}) => (
    <View style={styles.tableRow}>
      <View style={styles.tableCell}>
        <Text style={styles.tableText}>{item.label}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.tableText}>
          {item.amount
            ? new Intl.NumberFormat('en-IN').format(item.amount)
            : '-'}
        </Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.tableText}>
          {item.total ? new Intl.NumberFormat('en-IN').format(item.total) : ''}
        </Text>
      </View>
    </View>
  );

  const tableData = [
    {label: 'Basic Salary', amount: employee_salary.basic},
    {label: 'HRA', amount: employee_salary.hra},
    {label: 'Medical Allowance', amount: employee_salary.medical_allowance},
    {label: 'Other Allowance', amount: employee_salary.other_allowance},
    {
      label: 'Gross Salary',
      amount: employee_salary.gross_overtime_salary,
      total: employee_salary.gross_overtime_salary,
    },
    {label: 'Net Salary', total: employee_salary.gross_overtime_salary},
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.companyInfo}>
        <Image
          source={require('../Images/nisha_steel_n_alloys.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <View style={styles.companyDetails}>
          <Text style={styles.companyName}>{company_data.companyname}</Text>
          <Text style={styles.labelfont}>
            {company_data.address1} {company_data.address2} {company_data.city}{' '}
            {company_data.pin}, {company_data.state}
          </Text>
        </View>
        <View>
          <View style={styles.referenceInfo}>
            <Text style={styles.bold}>Ref No:</Text>
            <Text style={styles.labelfont}>{invoice_data.ref_no}</Text>
          </View>
          <View style={styles.referenceInfo}>
            <Text style={styles.bold}>Ref Date:</Text>
            <Text style={styles.labelfont}>{invoice_data.ref_date}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statementContainer}>
        <Text style={styles.statementTitle}>Statement of Overtime Salary</Text>
        <View style={styles.statementInfo}>
          <View style={styles.referenceInfo}>
            <Text style={styles.bold}>Month: </Text>
            <Text style={styles.labelfont}>
              {moment(invoice_data.ref_date, 'DD/MM/YYYY').format('MMMM, YYYY')}
            </Text>
          </View>
          <View style={styles.referenceInfo}>
            <Text style={styles.bold}>Overtime Hrs:</Text>
            <Text style={styles.labelfont}>
              {employee_salary.hours_worked
                ? employee_salary.hours_worked
                : '-'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.tableText12}>Payout Cost </Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={styles.tableText12}>Amount</Text>
          </View>
          <View style={styles.tableCell}>
            <Text style={styles.tableText12}>Total</Text>
          </View>
        </View>
        <FlatList
          data={tableData}
          renderItem={renderTableRow}
          keyExtractor={item => item.label}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  labelfont: {
    color: '#808080',
  },
  container: {
    flex: 1,
    padding: 10,
    width: 600,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'hwb(164deg 10% 29%)',
    paddingVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  emptySpace: {
    flex: 1,
  },
  companyInfo: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  companyDetails: {
    flex: 1,
  },
  companyName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#808080',
  },
  referenceInfo: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  bold: {
    fontWeight: 'bold',
    color: '#808080',
  },
  statementContainer: {
    padding: 10,
    backgroundColor: '#FFFDD0',
    marginVertical: 10,
  },
  statementTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#808080',
  },
  statementInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  tableContainer: {
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    color: '#808080',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: 'lightgray',
    color: '#808080',
  },
  tableText: {
    textAlign: 'center',
    color: '#808080',
  },
  tableText12: {
    textAlign: 'center',
    color: '#808080',
    fontWeight: 'bold',
  },
});

export default StatementofOvertimeSalary;
