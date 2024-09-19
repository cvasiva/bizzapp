/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import moment from 'moment';

const StatementofSalary = ({invoice_data}) => {
  const employee_salary = invoice_data?.employee_salary || {};
  const employee_salaries = invoice_data?.employee_salaries || {};
  var total_salary = employee_salary.gross_monthly_total;
  const company_data = invoice_data?.usercompany || {};
  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <View style={styles.logoContainer}>
          {invoice_data.logo && (
            <Image
              source={{
                uri: `https://skillcdn.storage.googleapis.com/${invoice_data.logo}`,
              }}
              style={styles.logo}
            />
          )}
        </View>
        <View style={styles.companyInfo}>
          <Text style={styles.cell}>{company_data.companyname || ''}</Text>
          <Text style={styles.labelfont}>{`${company_data.address1 || ''} ${
            company_data.address2 || ''
          } ${company_data.city || ''} ${company_data.pin || ''}, ${
            company_data.state || ''
          }`}</Text>
        </View>
        <View style={styles.refInfo}>
          <View style={styles.refRow}>
            <Text style={styles.label}>Ref No :</Text>
            <Text style={styles.labelfont}>{invoice_data.ref_no}</Text>
          </View>
          <View style={styles.refRow}>
            <Text style={styles.label}>Ref Date:</Text>
            <Text style={styles.labelfont}>{invoice_data.ref_date}</Text>
          </View>
        </View>
      </View>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Statement of Salary</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.labelfont}>
          Month :{' '}
          {moment(invoice_data.ref_date, 'DD/MM/YYYY').format('MMMM, YYYY')}
        </Text>
        <Text style={styles.labelfont}>
          Total Employees : {employee_salaries && employee_salaries.length}
        </Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.cell}>Payout Cost</Text>
          <Text style={styles.cell}>Amount</Text>
          <Text style={styles.cell}>Total Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.cellContainer}>
            <Text style={styles.text}>Basic Salary</Text>
            <Text style={styles.text}>HRA</Text>
            <Text style={styles.text}>Medical Allowance</Text>
            <Text style={styles.text}>Other Allowance</Text>
            <Text style={styles.text}>Gross Salary</Text>
            <Text style={styles.text}>Employer PF Contribution</Text>
            <Text style={styles.text}>Employer ESI Contribution</Text>
            <Text style={styles.text}>Total Salary Cost</Text>
            <Text style={styles.text}>Less:</Text>
            <View style={styles.deductions}>
              <Text style={styles.text}>Employer PF Contribution</Text>
              <Text style={styles.text}>Employer ESI Contribution</Text>
              <Text style={styles.text}>Employee PF Contribution</Text>
              <Text style={styles.text}>Employee ESI Contribution</Text>
              <Text style={styles.text}>Professional Tax</Text>
              <Text style={styles.text}>TDS on Salary</Text>
            </View>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.amount}>
              {employee_salary.basic
                ? new Intl.NumberFormat('en-IN').format(employee_salary.basic)
                : '-'}
            </Text>
            <Text style={styles.amount}>
              {employee_salary.hra
                ? new Intl.NumberFormat('en-IN').format(employee_salary.hra)
                : '-'}
            </Text>
            <Text style={styles.amount}>
              {employee_salary.medical_allowance
                ? new Intl.NumberFormat('en-IN').format(
                    employee_salary.medical_allowance,
                  )
                : '-'}
            </Text>
            <Text style={styles.amount}>
              {employee_salary.other_allowance
                ? new Intl.NumberFormat('en-IN').format(
                    employee_salary.other_allowance,
                  )
                : '-'}
            </Text>
            <Text style={styles.total}>
              {employee_salary.gross_monthly
                ? new Intl.NumberFormat('en-IN').format(
                    employee_salary.gross_monthly,
                  )
                : '0'}
            </Text>
            <Text style={styles.amount}>&nbsp;</Text>
            <Text style={styles.amount}>&nbsp;</Text>
            <Text style={styles.amount}>&nbsp;</Text>
            <Text style={styles.amount}>&nbsp;</Text>
            <Text style={styles.amount}>&nbsp;</Text>
            <Text style={styles.amount}>&nbsp;</Text>
            <Text style={styles.amount}>&nbsp;</Text>
          </View>
          <View style={styles.cellContainer}>
            <Text style={styles.amount}>&nbsp;</Text>
            <Text style={styles.amount}>&nbsp;</Text>
            <Text style={styles.amount}>&nbsp;</Text>
            <Text style={styles.amount}>&nbsp;</Text>
            <Text style={styles.amount}>
              {employee_salary.gross_monthly
                ? new Intl.NumberFormat('en-IN').format(
                    employee_salary.gross_monthly,
                  )
                : '0'}
            </Text>
            <Text style={styles.amount}>
              {employee_salary.employer_pf_contribution
                ? new Intl.NumberFormat('en-IN').format(
                    employee_salary.employer_pf_contribution,
                  )
                : '0'}
            </Text>
            <Text style={styles.amount}>
              {employee_salary.employer_esi_contribution
                ? new Intl.NumberFormat('en-IN').format(
                    employee_salary.employer_esi_contribution,
                  )
                : '0'}
            </Text>
            <Text style={styles.total}>
              {total_salary
                ? new Intl.NumberFormat('en-IN').format(total_salary)
                : '0'}
            </Text>
            <Text style={styles.amount}>&nbsp;</Text>
            <Text style={styles.deductionsText}>
              {employee_salary.employer_pf_contribution
                ? new Intl.NumberFormat('en-IN').format(
                    employee_salary.employer_pf_contribution,
                  )
                : '0'}
            </Text>
            <Text style={styles.deductionsText}>
              {employee_salary.employer_esi_contribution
                ? new Intl.NumberFormat('en-IN').format(
                    employee_salary.employer_esi_contribution,
                  )
                : '0'}
            </Text>
            <Text style={styles.deductionsText}>
              {employee_salary.employee_pf_contribution
                ? new Intl.NumberFormat('en-IN').format(
                    employee_salary.employee_pf_contribution,
                  )
                : '0'}
            </Text>
            <Text style={styles.deductionsText}>
              {employee_salary.employee_esi_contribution
                ? new Intl.NumberFormat('en-IN').format(
                    employee_salary.employee_esi_contribution,
                  )
                : '0'}
            </Text>
            <Text style={styles.deductionsText}>
              {employee_salary.professional_tax
                ? new Intl.NumberFormat('en-IN').format(
                    employee_salary.professional_tax,
                  )
                : '0'}
            </Text>
            <Text style={styles.deductionsText}>
              {employee_salary.tds_salary
                ? new Intl.NumberFormat('en-IN').format(
                    employee_salary.tds_salary,
                  )
                : '0'}
            </Text>
          </View>
        </View>
        <View style={styles.netSalaryRow}>
          <Text style={styles.netSalaryLabel}>Net Salary</Text>
          <Text style={styles.netSalaryAmount}>
            {new Intl.NumberFormat('en-IN').format(employee_salary.net_salary)}
            &nbsp;&nbsp;&nbsp;
          </Text>
        </View>
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
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  logoContainer: {
    flex: 2,
  },
  logo: {
    width: 60,
    height: 60,
  },
  companyInfo: {
    flex: 6,
    justifyContent: 'center',
  },
  refInfo: {
    flex: 4,
  },
  refRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
    color: '#808080',
  },
  titleRow: {
    alignItems: 'center',
    marginVertical: 10,
    color: '#808080',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#808080',
  },
  infoRow: {
    alignItems: 'center',
    marginVertical: 10,
  },
  table: {
    marginVertical: 10,
    color: '#808080',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E0',
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E0',
    color: '#808080',
  },
  cellContainer: {
    flex: 1,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#808080',
  },
  text: {
    marginBottom: 5,
    color: '#808080',
  },
  textRes11: {
    marginBottom: 5,
    color: '#808080',
  },
  amount: {
    textAlign: 'right',
    marginBottom: 5,
    color: '#808080',
  },
  total: {
    textAlign: 'right',
    fontWeight: 'bold',
    borderTopWidth: 1,
    borderTopColor: 'black',
    paddingRight: 10,
    color: '#808080',
  },
  deductions: {
    paddingLeft: 10,
    color: '#808080',
  },
  deductionsText: {
    textAlign: 'right',
    marginBottom: 5,
    color: '#808080',
  },
  netSalaryRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#CBD5E0',
    paddingVertical: 5,
  },
  netSalaryLabel: {
    flex: 9,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#808080',
  },
  netSalaryAmount: {
    flex: 3,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#808080',
  },
});

export default StatementofSalary;
