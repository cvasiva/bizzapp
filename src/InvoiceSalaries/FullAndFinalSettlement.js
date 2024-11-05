/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import moment from 'moment';

const FullAndFinalSettlement = ({invoice_data}) => {
  const employee_salary = invoice_data?.employee_salary || {};
  const usercompany = invoice_data?.usercompany || {};

  let employeeSalaryTotal = 0;
  if (employee_salary) {
    employeeSalaryTotal =
      employee_salary.employee_pf_contribution +
      employee_salary.employer_pf_contribution +
      employee_salary.employee_esi_contribution +
      employee_salary.employer_esi_contribution +
      employee_salary.professional_tax +
      employee_salary.tds_salary;
  }

  const formatNumber = value =>
    value ? new Intl.NumberFormat('en-IN').format(value) : '-';

  return (
    <ScrollView style={styles.container}>
      {employee_salary && (
        <View>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../Images/nisha_steel_n_alloys.png')}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>
            <View style={styles.companyDetails}>
              <Text style={styles.companyName}>
                {usercompany.companyname || ''}
              </Text>
              <Text style={styles.companyAddress}>
                {usercompany.address1} {usercompany.address2} {usercompany.city}{' '}
                {usercompany.pin}, {usercompany.state}
              </Text>
            </View>
            <View style={styles.refDetails}>
              <Text style={styles.refText}>Ref No: {invoice_data.ref_no}</Text>
              <Text style={styles.refText}>
                Ref Date: {invoice_data.ref_date}
              </Text>
            </View>
          </View>

          <View style={styles.statementHeader}>
            <Text style={styles.statementTitle}>
              Full & Final Settlement Statement
            </Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailsSection}>
              <View style={styles.detailsRow}>
                <View style={styles.flxepm}>
                  <Text style={styles.detailsLabel}>Emp Name:</Text>
                  <Text style={styles.detailsValue}>
                    {employee_salary.employee_name}
                  </Text>
                </View>
                <View style={styles.flxepm}>
                  <Text style={styles.detailsLabel}>Date of Joining:</Text>
                  <Text style={styles.detailsValue}>
                    {employee_salary.date_of_joining}
                  </Text>
                </View>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.flxepm}>
                  <Text style={styles.detailsLabel}>Department:</Text>
                  <Text style={styles.detailsValue}>
                    {employee_salary.department}
                  </Text>
                </View>
                <View style={styles.flxepm}>
                  <Text style={styles.detailsLabel}>Resignation Date:</Text>
                  <Text style={styles.detailsValue}>
                    {moment(
                      employee_salary.resignation_date,
                      'DD-MM-YYYY',
                    ).format('DD/MM/YYYY')}
                  </Text>
                </View>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.flxepm}>
                  <Text style={styles.detailsLabel}>PAN No:</Text>
                  <Text style={styles.detailsValue}>
                    {employee_salary.pan || '-'}
                  </Text>
                </View>
                <View style={styles.flxepm}>
                  <Text style={styles.detailsLabel}>Relieving Date:</Text>
                  <Text style={styles.detailsValue}>
                    {employee_salary.resignation_date}
                  </Text>
                </View>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.flxepm}>
                  <Text style={styles.detailsLabel}>UAN NO:</Text>
                  <Text style={styles.detailsValue}>
                    {employee_salary.uan || '-'}
                  </Text>
                </View>
                <View style={styles.flxepm}>
                  <Text style={styles.detailsLabel}>Notice Pay Days:</Text>
                  <Text style={styles.detailsValue}>
                    {employee_salary.notice_pay_days || '-'}
                  </Text>
                </View>
              </View>
              <View style={styles.detailsRow}>
                <View style={styles.flxepm}>
                  <Text style={styles.detailsLabel}>Designation:</Text>
                  <Text style={styles.detailsValue}>
                    {employee_salary.designation || '-'}
                  </Text>
                </View>
                <View style={styles.flxepm}>
                  <Text style={styles.detailsLabel}>Settlement Date:</Text>
                  <Text style={styles.detailsValue}>
                    {moment(
                      employee_salary.resignation_date,
                      'DD-MM-YYYY',
                    ).format('DD/MM/YYYY')}
                  </Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                <View style={styles.flxepm}>
                  <Text style={styles.detailsLabel}>Years of Service:</Text>
                  <Text style={styles.detailsValue}>
                    {employee_salary.years_service || '-'}
                  </Text>
                </View>
                <View style={styles.flxepm}>
                  <Text style={styles.detailsLabel}>EL Balance *:</Text>
                  <Text style={styles.detailsValue}>
                    {employee_salary.el_balance || '-'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <View style={[styles.tableCell, styles.headerCell]}>
                  <Text style={styles.headerText}>Salary Structure</Text>
                </View>
                <View style={[styles.tableCell, styles.headerCell]}>
                  <Text style={styles.headerText}>Amount</Text>
                </View>
                <View style={[styles.tableCell, styles.headerCell]}>
                  <Text style={styles.headerText}>Deductions</Text>
                </View>
                <View style={[styles.tableCell, styles.headerCell]}>
                  <Text style={styles.headerText}>Amount</Text>
                </View>
              </View>

              {/* Table Rows */}
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Basic</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.basic)}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Employee PF</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.employee_pf_contribution)}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText} />
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText} />
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Employer PF</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.employer_pf_contribution)}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>HRA</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.hra)}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Employee ESI</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.employee_esi_contribution)}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText} />
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText} />
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Employer ESI</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.employer_esi_contribution)}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>TPT Allow.</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.tpt_allowance)}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Professional Tax</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.professional_tax)}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Medical Allow.</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.medical_allowance)}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>TDS on Salary</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.tds_salary)}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Spl. Allow</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.other_allowance)}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Total (A)</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employeeSalaryTotal)}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Total</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.gross_monthly)}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Other Deductions</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.other_deduction)}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Employee PF</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.employee_pf_contribution)}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Salary Advance</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.salary_advance)}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Employer ESI</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.employer_esi_contribution)}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>LTA</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.lta)}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Gratuity</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.gratuity)}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>N. Pay Recovery</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.notice_pay_recovery)}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Gross Salary</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.gross_monthly_total)}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Total (B)</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.total)}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Transport Allow.</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.transport_allowance)}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>Net Payable</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.cellText}>
                    {formatNumber(employee_salary.net_salary)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flxepm: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#000',
    justifyContent: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#808080',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#808080',
  },
  cellText: {
    textAlign: 'center',
    color: '#808080',
  },
  //   tableRow: {
  //     flexDirection: 'row',
  //     borderBottomWidth: 1,
  //     borderBottomColor: '#ddd',
  //   },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    width: 600,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#25866c',
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: 10,
  },
  logo: {
    width: 48,
    height: 48,
  },
  companyDetails: {
    flex: 1,
  },
  companyName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  companyAddress: {
    color: '#fff',
    fontSize: 12,
  },
  refDetails: {
    marginLeft: 10,
  },
  refText: {
    color: '#fff',
    fontSize: 12,
  },
  statementHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  statementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#808080',
    textAlign: 'center',
  },
  detailsContainer: {
    padding: 10,
  },
  detailsSection: {
    marginBottom: 10,
  },
  detailsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  detailsLabel: {
    fontWeight: 'bold',
    color: '#808080',
    paddingRight: 20,
  },
  detailsValue: {
    flex: 1,
    textAlign: 'start',
    color: '#808080',
  },
  tableContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 10,
  },
  //   tableHeader: {
  //     flexDirection: 'row',
  //     backgroundColor: '#eaeaea',
  //     paddingVertical: 5,
  //     paddingHorizontal: 10,
  //   },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableText: {
    flex: 1,
  },
});

export default FullAndFinalSettlement;
