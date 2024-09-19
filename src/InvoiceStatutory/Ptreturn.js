/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const PtReturn = ({invoice_data}) => {
  const professionalTax = invoice_data.professional_tax_return || {};

  // Define table headers and data
  const tableHeaders = ['Salary Range', 'Employees', 'Tax Rate', 'Tax Payable'];
  const salaryDetails = professionalTax.salary_details || [];

  const paymentHeaders = ['Pay Mode', 'Ref. No.', 'Date', 'Total Amount'];
  const amountPaidDetails = professionalTax.amount_paid_under_challan || [];

  return (
    <ScrollView>
      {professionalTax && (
        <View style={styles.innerContainer}>
          <View style={styles.header} />

          <View style={styles.content}>
            <Text style={styles.title}>FORM 5-A [See Rule 11-A]</Text>
            <Text style={styles.subtitle}>(PROFESSIONAL TAX RETURNS)</Text>
            <Text style={styles.description}>
              Statement of Tax Payable by Employer under Sub Section(1) of
              Section 6-A.
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>
                1) Amount of tax payable for the month [or quarter] ending on:
              </Text>
              <Text style={styles.value}>
                {
                  professionalTax.statement_of_payble
                    ?.amount_of_tax_payable_for_the_month_ending_on
                }
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>1a) Return type:</Text>
              <Text style={styles.value}>
                {professionalTax.statement_of_payble?.return_type}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>1b) Return Date:</Text>
              <Text style={styles.value}>
                {professionalTax.statement_of_payble?.return_date}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>2) Name of the employer:</Text>
              <Text style={styles.value}>
                {professionalTax.statement_of_payble?.name_of_the_employer}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>2a) Trade Name:</Text>
              <Text style={styles.value}>
                {professionalTax.statement_of_payble?.trade_name}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>3) Address:</Text>
              <Text style={styles.value}>
                {professionalTax.statement_of_payble?.address}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>
                4) Registration certificate number:
              </Text>
              <Text style={styles.value}>
                {
                  professionalTax.statement_of_payble
                    ?.registration_certificate_number
                }
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>4a) Office name:</Text>
              <Text style={styles.value}>
                {professionalTax.statement_of_payble?.Office_name}
              </Text>
            </View>

            <Text style={styles.subtitle}>
              Number of employees during the month or quarter in respect of whom
              the tax is payable is as under:
            </Text>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                {tableHeaders.map((header, index) => (
                  <View key={index} style={styles.tableHeaderCell}>
                    <Text style={styles.tableHeaderText}>{header}</Text>
                  </View>
                ))}
              </View>
              {salaryDetails.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.salary_range}</Text>
                  <Text style={styles.tableCell}>{item.employees}</Text>
                  <Text style={styles.tableCell}>{item.tax_rate}</Text>
                  <Text style={styles.tableCell}>
                    {new Intl.NumberFormat('en-IN').format(item.tax_payble)}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                {paymentHeaders.map((header, index) => (
                  <View key={index} style={styles.tableHeaderCell}>
                    <Text style={styles.tableHeaderText}>{header}</Text>
                  </View>
                ))}
              </View>
              {amountPaidDetails.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.pay_mode}</Text>
                  <Text style={styles.tableCell}>{item.ref_no}</Text>
                  <Text style={styles.tableCell}>{item.date}</Text>
                  <Text style={styles.tableCell}>
                    {new Intl.NumberFormat('en-IN').format(item.total_amount)}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.certification}>
              <Text style={styles.certificationText}>
                I certify that the employees who are liable to pay the tax in my
                employ during the period.
              </Text>
              <Text style={styles.certificationText}>
                I, Shri ...........................solemnly declare that above
                statements are true to the best of my knowledge and belief
              </Text>
              <Text style={styles.signature}>
                Signature: ....................................
              </Text>
            </View>
          </View>

          <View style={styles.footer} />
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
    color:'#808080',
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    width:600,
  },
  header: {
    marginBottom: 10,
    color:'#808080',
  },
  content: {
    flex: 1,
    color:'#808080',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color:'#808080',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color:'#808080',
  },
  description: {
    marginBottom: 15,
    color:'#808080',
  },
  infoRow: {
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
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    color:'#808080',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    color:'#808080',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    color:'#808080',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    color:'#808080',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color:'#808080',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    textAlign: 'center',
    color:'#808080',
  },
  certification: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    color:'#808080',
  },
  certificationText: {
    marginBottom: 10,
    color:'#808080',
  },
  signature: {
    marginTop: 20,
    textAlign: 'right',
    color:'#808080',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    color:'#808080',
  },
});

export default PtReturn;
