/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import moment from 'moment';

const DetailRemunerationStatement = ({invoice_data}) => {
  const employee_salary = invoice_data?.employee_salary || {};
  const employee_salaries = invoice_data?.employee_salaries || {};
  const company_data = invoice_data?.usercompany || {};
  const renderSalaryItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>
        {item.employee_name ? item.employee_name : '-'}
      </Text>
      <Text style={[styles.cell, styles.centered]}>
        {item.department ? item.department : '-'}
      </Text>
      <Text style={[styles.cell, styles.rightAligned]}>
        {item.basic ? new Intl.NumberFormat('en-IN').format(item.basic) : '-'}
      </Text>
      <Text style={[styles.cell, styles.rightAligned]}>
        {item.hra ? new Intl.NumberFormat('en-IN').format(item.hra) : '-'}
      </Text>
      <Text style={[styles.cell, styles.rightAligned]}>
        {item.medical_allowance
          ? new Intl.NumberFormat('en-IN').format(item.medical_allowance)
          : '-'}
      </Text>
      <Text style={[styles.cell, styles.rightAligned]}>
        {item.other_allowance
          ? new Intl.NumberFormat('en-IN').format(item.other_allowance)
          : '-'}
      </Text>
      <Text style={[styles.cell, styles.rightAligned]}>
        {item.gross_monthly
          ? new Intl.NumberFormat('en-IN').format(item.gross_monthly)
          : '-'}
      </Text>
    </View>
  );

  const renderDeductionItem = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>
        {item.employee_name ? item.employee_name : '-'}
      </Text>
      <Text style={[styles.cell, styles.rightAligned]}>
        {item.employer_pf_contribution
          ? new Intl.NumberFormat('en-IN').format(item.employer_pf_contribution)
          : '-'}
      </Text>
      <Text style={[styles.cell, styles.rightAligned]}>
        {item.employer_asi_contribution
          ? new Intl.NumberFormat('en-IN').format(
              item.employer_asi_contribution,
            )
          : '-'}
      </Text>
      <Text style={[styles.cell, styles.rightAligned]}>
        {item.employee_pf_contribution
          ? new Intl.NumberFormat('en-IN').format(item.employee_pf_contribution)
          : '-'}
      </Text>
      <Text style={[styles.cell, styles.rightAligned]}>
        {item.employee_esi_contribution
          ? new Intl.NumberFormat('en-IN').format(
              item.employee_esi_contribution,
            )
          : '-'}
      </Text>
      <Text style={[styles.cell, styles.rightAligned]}>
        {item.professional_tax
          ? new Intl.NumberFormat('en-IN').format(item.professional_tax)
          : '-'}
      </Text>
      <Text style={[styles.cell, styles.rightAligned]}>
        {item.tds_salary
          ? new Intl.NumberFormat('en-IN').format(item.tds_salary)
          : '-'}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.companyInfo}>
          <Text style={styles.bold}>
            {company_data.companyname ? company_data.companyname : ''}
          </Text>
          {company_data && (
            <Text style={styles.labelfont}>
              {company_data.address1} {company_data.address2}{' '}
              {company_data.city} {company_data.pin}, {company_data.state}
            </Text>
          )}
        </View>
        <View style={styles.details}>
          <Text style={styles.bold}>
            Salary Month:{' '}
            {moment(invoice_data.ref_date, 'DD/MM/YYYY').format('MMMM, YYYY')}
          </Text>
          <View style={styles.detailRow}>
            <Text style={styles.bold}>Ref No:</Text>
            <Text style={styles.labelfont}>{invoice_data.ref_no}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.bold}>Ref Date:</Text>
            <Text style={styles.labelfont}>{invoice_data.ref_date}</Text>
          </View>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Detail Remuneration Statement</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Salary Details</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.cellHeader}>Employee Name</Text>
          <Text style={styles.cellHeader}>Dep</Text>
          <Text style={styles.cellHeader}>Basic Salary</Text>
          <Text style={styles.cellHeader}>HRA</Text>
          <Text style={styles.cellHeader}>Med. Allow</Text>
          <Text style={styles.cellHeader}>Oth. Allow</Text>
          <Text style={styles.cellHeader}>Gross Salary</Text>
        </View>
        <FlatList
          data={employee_salaries}
          renderItem={renderSalaryItem}
          keyExtractor={item => item.id.toString()} // Adjust keyExtractor as needed
          ListFooterComponent={() => (
            <View style={styles.row}>
              <Text style={styles.cell}>Total</Text>
              <Text style={styles.cell}>------</Text>
              <Text style={[styles.cell, styles.rightAligned]}>
                {employee_salary.basic
                  ? new Intl.NumberFormat('en-IN').format(employee_salary.basic)
                  : '-'}
              </Text>
              <Text style={[styles.cell, styles.rightAligned]}>
                {employee_salary.hra
                  ? new Intl.NumberFormat('en-IN').format(employee_salary.hra)
                  : '-'}
              </Text>
              <Text style={[styles.cell, styles.rightAligned]}>
                {employee_salary.medical_allowance
                  ? new Intl.NumberFormat('en-IN').format(
                      employee_salary.medical_allowance,
                    )
                  : '-'}
              </Text>
              <Text style={[styles.cell, styles.rightAligned]}>
                {employee_salary.other_allowance
                  ? new Intl.NumberFormat('en-IN').format(
                      employee_salary.other_allowance,
                    )
                  : '-'}
              </Text>
              <Text style={[styles.cell, styles.rightAligned]}>
                {employee_salary.gross_monthly
                  ? new Intl.NumberFormat('en-IN').format(
                      employee_salary.gross_monthly,
                    )
                  : '0'}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Deduction Details</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.cellHeader}>Employee Name</Text>
          <Text style={styles.cellHeader}>Employer - PF</Text>
          <Text style={styles.cellHeader}>Employer - ESI</Text>
          <Text style={styles.cellHeader}>Employee - PF</Text>
          <Text style={styles.cellHeader}>Employee ESI</Text>
          <Text style={styles.cellHeader}>Professional Tax</Text>
          <Text style={styles.cellHeader}>TDS</Text>
        </View>
        <FlatList
          data={employee_salaries}
          renderItem={renderDeductionItem}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={() => (
            <View style={styles.row}>
              <Text style={styles.cell}>TOTAL</Text>
              <Text style={[styles.cell, styles.rightAligned]}>
                {employee_salary.employer_pf_contribution
                  ? new Intl.NumberFormat('en-IN').format(
                      employee_salary.employer_pf_contribution,
                    )
                  : '0'}
              </Text>
              <Text style={[styles.cell, styles.rightAligned]}>
                {employee_salary.employer_asi_contribution
                  ? new Intl.NumberFormat('en-IN').format(
                      employee_salary.employer_asi_contribution,
                    )
                  : '0'}
              </Text>
              <Text style={[styles.cell, styles.rightAligned]}>
                {employee_salary.employee_pf_contribution
                  ? new Intl.NumberFormat('en-IN').format(
                      employee_salary.employee_pf_contribution,
                    )
                  : '0'}
              </Text>
              <Text style={[styles.cell, styles.rightAligned]}>
                {employee_salary.employee_esi_contribution
                  ? new Intl.NumberFormat('en-IN').format(
                      employee_salary.employee_esi_contribution,
                    )
                  : '0'}
              </Text>
              <Text style={[styles.cell, styles.rightAligned]}>
                {employee_salary.professional_tax
                  ? new Intl.NumberFormat('en-IN').format(
                      employee_salary.professional_tax,
                    )
                  : '0'}
              </Text>
              <Text style={[styles.cell, styles.rightAligned]}>
                {employee_salary.tds_salary
                  ? new Intl.NumberFormat('en-IN').format(
                      employee_salary.tds_salary,
                    )
                  : '0'}
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailRow:{
    display:'flex',
    flexDirection:'row',
  },
  labelfont: {
    color: '#808080',
  },
  container: {
    flex: 1,
    padding: 10,
    width: 600,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  companyInfo: {
    flex: 7,
    justifyContent: 'center',
  },
  details: {
    flex: 5,
    justifyContent: 'center',
  },
  bold: {
    fontWeight: 'bold',
    color:'#808080',
  },
  centered: {
    textAlign: 'center',
  },
  rightAligned: {
    textAlign: 'right',
  },
  titleContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#808080',
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color:'#808080',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#BEB7F4',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cellHeader: {
    flex: 1,
    fontWeight: 'bold',
    color:'#808080',
    textAlign:'center',
    fontSize:14,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cell: {
    flex: 1,
    color:'#808080',
  },
});

export default DetailRemunerationStatement;
