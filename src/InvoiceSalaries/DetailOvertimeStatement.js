/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import moment from 'moment';

const DetailOvertimeStatement = ({invoice_data}) => {
  // Ensure employee_salary and employee_salaries are arrays
  const employee_salary = invoice_data?.employee_salary || {};
  const employee_salaries = Array.isArray(invoice_data?.employee_salaries)
    ? invoice_data.employee_salaries
    : [];

  return (
    <ScrollView style={[styles.container, {padding: 10}]}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>
          Statement of Overtime Salary
        </Text>
      </View>

      <View style={styles.billGrid}>
        <View style={styles.row12}>
          <Text style={styles.text}>Overtime Hrs Calculation</Text>
          <Text style={styles.dateText}>
            Month:{' '}
            {moment(invoice_data?.ref_date, 'DD/MM/YYYY').format('MMMM, YYYY')}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.columnHeader}>Employee Name</Text>
          <Text style={styles.columnHeader}>Dep</Text>
          <Text style={styles.columnHeader}>Actual Hrs</Text>
          <Text style={[styles.columnHeader, {width: '20%'}]}>
            Overtime Hrs
          </Text>
        </View>

        {employee_salaries.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{item.employee_name || '-'}</Text>
            <Text style={styles.cell}>{item.department || '-'}</Text>
            <Text style={styles.cell}>
              {item.actual_hours ? item.actual_hours : '-'}
            </Text>
            {item.overtime_employee ? (
              <Text style={[styles.cell, {width: '20%'}]}>
                {item.hours_worked - item.actual_hours}
              </Text>
            ) : (
              <Text>{'-'}</Text>
            )}
          </View>
        ))}

        <View style={styles.row}>
          <Text style={styles.columnHeader12}>Employee Name</Text>
          <Text style={styles.columnHeader12}>Dep</Text>
          <Text style={styles.columnHeader}>Overtime Hrs (A)</Text>
          <Text style={styles.columnHeader}>Salary per Hour</Text>
          <Text style={styles.columnHeader}>Two Times Salary Per Hour (B)</Text>
          <Text style={[styles.columnHeader, {width: '20%'}]}>
            Overtime Salary (A * B)
          </Text>
        </View>

        {employee_salaries.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell12}>{item.employee_name || '-'}</Text>
            <Text style={styles.cell12}>{item.department || '-'}</Text>
            <Text style={styles.cell}>
              {item.hours_worked - item.actual_hours || '-'}
            </Text>
            <Text style={styles.cell}>
              {item.salary_per_hour ? item.salary_per_hour : '-'}
            </Text>
            <Text style={styles.cell}>
              {item.salary_per_hour ? item.salary_per_hour * 2 : '-'}
            </Text>
            {item.overtime_employee ? (
              <Text style={[styles.cell, {width: '20%'}]}>
                {item.gross_overtime_salary || '-'}
              </Text>
            ) : (
              <Text>{'-'}</Text>
            )}
          </View>
        ))}
      </View>
      <View style={[styles.row, {padding: 20}]}>
        <View style={[styles.col10, {textAlign: 'center', paddingTop: 1.5}]}>
          <Text style={styles.columnHeader}>Total Amount</Text>
        </View>
        <View style={[styles.col2, {textAlign: 'right', paddingRight: 10}]}>
          <View style={styles.borderLeft}>
            <Text style={styles.cell}>
              {new Intl.NumberFormat('en-IN').format(
                employee_salary?.gross_overtime_salary || 0,
              )}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  col10: {
    flex: 5,
  },
  col2: {
    flex: 1,
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    paddingLeft: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    width: 600,
  },
  header: {
    backgroundColor: 'rgb(137, 127, 255)',
    padding: 10,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  row12: {
    flex:1,
    justifyContent:'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  activeButton: {
    backgroundColor: '#ffc107',
    color: '#000',
  },
  inactiveButton: {
    backgroundColor: '#fff',
    color: '#000',
  },
  sectionHeader: {
    margin: 10,
    padding: 10,
    backgroundColor: 'hwb(164deg 10% 29%)',
    alignItems: 'center',
  },
  sectionHeaderText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  billGrid: {
    marginTop: -10,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  dateText: {
    color: 'black',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  columnHeader: {
    backgroundColor: 'hwb(164deg 10% 29%)',
    color: 'black',
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
    flex: 1,
  },
  columnHeader12: {
    backgroundColor: 'hwb(164deg 10% 29%)',
    color: 'black',
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
    flex: 2,
  },
  cell: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    padding: 10,
    flex: 1,
    color:'#808080',
  },
  cell12: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    padding: 10,
    flex: 2,
    color:'#808080',
  },
});

export default DetailOvertimeStatement;
