/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';

const ProvidentFund = ({invoice_data}) => {
  const pf_payment = invoice_data?.pf_payment || {};
  const fund = pf_payment?.fund || {};

  const renderTableRow = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.particulars}</Text>
      <Text style={styles.cell}>{item.first}</Text>
      <Text style={styles.cell}>{item.second}</Text>
      <Text style={styles.cell}>{item.third}</Text>
      <Text style={styles.cell}>{item.fourth}</Text>
      <Text style={styles.cell}>{item.fifth}</Text>
      <Text style={styles.cell}>{item.total}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {/* <Image source={emp} style={styles.logo} /> */}
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>
            COMBINED CHALLAN OF A/C NO. 01, 02, 10, 21 & 22
          </Text>
          <Text style={styles.headerText}>
            EMPLOYEES PROVIDENT FUND ORGANISATION
          </Text>
        </View>
        <Text style={styles.trrn}>TRRN: 53346546 16:30</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.rightAligned}>Establishment Code & Name :</Text>
          <Text style={styles.rightAligned}>{fund.establishment_code}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.rightAligned}>Dues for the wage month of :</Text>
          <Text style={styles.rightAligned}>{fund.wage_month}</Text>
        </View>
        <Text style={styles.address}>Address: {fund.address}</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.headerCell} />
            <Text style={styles.headerCell}>EPF</Text>
            <Text style={styles.headerCell}>EPS</Text>
            <Text style={styles.headerCell}>EDLI</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.rightAligned}>Total Subscribers:</Text>
            <Text style={styles.rightAligned}>{fund.total_subscribers}</Text>
            <Text style={styles.rightAligned}>{fund.total_subscribers}</Text>
            <Text style={styles.rightAligned}>{fund.total_subscribers}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.rightAligned}>Total Wages:</Text>
            <Text style={styles.rightAligned}>{fund.total_wages}</Text>
            <Text style={styles.rightAligned}>{fund.total_wages}</Text>
            <Text style={styles.rightAligned}>{fund.total_wages}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableHeaderCell}>SL</Text>
            <Text style={styles.tableHeaderCell}>PARTICULARS</Text>
            <Text style={styles.tableHeaderCell}>A/C.01</Text>
            <Text style={styles.tableHeaderCell}>A/C.02</Text>
            <Text style={styles.tableHeaderCell}>A/C.10</Text>
            <Text style={styles.tableHeaderCell}>A/C.21</Text>
            <Text style={styles.tableHeaderCell}>A/C.22</Text>
            <Text style={styles.tableHeaderCell}>TOTAL</Text>
          </View>
          <FlatList
            data={fund.provident}
            renderItem={renderTableRow}
            keyExtractor={item => item.id.toString()}
          />
          <View style={[styles.tableRow, styles.tableFooter]}>
            <Text style={styles.footerText}>
              Grand Total : {fund.total_word}
            </Text>
            <Text style={styles.rightAligned}>{fund.total_no}</Text>
          </View>
        </View>

        <Text style={styles.note}>
          (This is a system generated challan on 12-may-2021 11:24, the
          particulars shown in this challan are populated from the Electronic
          Challan Cum Return (ECR) uploaded by the establishment for the
          specified month and year.)
        </Text>

        <Text style={styles.note}>
          Note:- The following amounts are being remitted directly by Government
          of India on account of PMRPY / ABRY
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.headerCell}>PMPRY</Text>
            <Text style={styles.headerCell}>ABRY</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.rightAligned}>A) A/C no 1 (Employee share) (Rs.)-</Text>
            <Text style={styles.rightAligned}>{fund.pmrpy.pmrpy_acc1}</Text>
            <Text style={styles.rightAligned}>{fund.abry.abry_acc1}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.rightAligned}>B) A/C no 10 (Pension fund) (Rs.)-</Text>
            <Text style={styles.rightAligned}>{fund.pmrpy.pmrpy_acc2}</Text>
            <Text style={styles.rightAligned}>{fund.abry.abry_acc2}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.rightAligned}>C) A/C no 1 (Employee share) (Rs.)-</Text>
            <Text style={styles.rightAligned}>{fund.pmrpy.pmrpy_acc3}</Text>
            <Text style={styles.rightAligned}>{fund.abry.abry_acc3}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.rightAligned}>D) Total (A + B + C) (Rs.)-</Text>
            <Text style={styles.rightAligned}>{fund.pmrpy.pmrpy_acc4}</Text>
            <Text style={styles.rightAligned}>{fund.abry.abry_acc4}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.rightAligned}>E) Total remittance by Employee (Rs.)-</Text>
            <Text style={styles.rightAligned}>{fund.pmrpy.pmrpy_acc5}</Text>
            <Text style={styles.rightAligned}>0</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.rightAligned}>F) Total amount of uploaded ECR (D + E)</Text>
            <Text style={styles.rightAligned}>{fund.pmrpy.pmrpy_acc6}</Text>
            <Text style={styles.rightAligned}>0</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rightAligned:{
    color:'#808080',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
    width:600,
    color:'#808080',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    color:'#808080',
  },
  logo: {
    width: 80,
    height: 70,
    color:'#808080',
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: -32,
    color:'#808080',
  },
  headerText: {
    fontWeight: 'bold',
    color:'#808080',
  },
  trrn: {
    textAlign: 'right',
    color:'#808080',
  },
  infoContainer: {
    marginBottom: 20,
    color:'#808080',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    color:'#808080',
  },
  address: {
    marginVertical: 8,
    color:'#808080',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
    color:'#808080',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 4,
    color:'#808080',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color:'#808080',
  },
  headerCell: {
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#808080',
  },
  cell: {
    flex: 1,
    textAlign: 'right',
    color:'#808080',
  },
  tableHeader: {
    borderTopWidth: 1,
    borderTopColor: '#000',
    color:'#808080',
  },
  tableFooter: {
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    color:'#808080',
  },
  footerText: {
    flex: 1,
    color:'#808080',
  },
  note: {
    marginBottom: 10,
    color:'#808080',
  },
});

export default ProvidentFund;
