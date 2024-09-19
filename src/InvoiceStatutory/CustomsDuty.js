/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const CustomsDuty = ({invoice_data}) => {
  // Default values in case of undefined properties
  const invoice = invoice_data?.invoice || {};
  const po = invoice_data?.po || {};
  const customs = invoice_data?.customs || {};

  const BCD = customs.bcd || 'N/A'; // Use a default value if undefined
  const igst = invoice.igst_total || 0; // Use a default value if undefined
  const welfare_charges = customs.sws || 0; // Use a default value if undefined
  const total = invoice.total || 0; // Use a default value if undefined

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Orginal (Customs copy)</Text>
          <Text style={styles.headerText}>
            Indian Customs EDI System - Improve V1.5R001
          </Text>
          <Text style={styles.headerText}>
            ACC BANGALORE INTERNATIONAL AIRPORT
          </Text>
          <Text style={styles.title}>BILL OF ENTRY FOR HOME CONSUMPTION</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.section}>
            <View style={styles.leftColumn}>
              <Text style={styles.label}>BE No</Text>
              <Text style={styles.label}>IEC:</Text>
              <Text style={styles.label}>{invoice.invoice_no || 'N/A'}</Text>
              <Text style={styles.label}>xxx</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.label}>AD Code:</Text>
              <Text style={styles.label}>{invoice.invoice_date || 'N/A'}</Text>
              <Text style={styles.label}>xxxxxxxx</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.leftColumn}>
              <Text style={styles.label}>Port of loading:</Text>
              <Text style={styles.label}>Country of Origin:</Text>
              <Text style={styles.label}>HAWB No:</Text>
              <Text style={styles.label}>Gross Wt:</Text>
              <Text style={styles.label}>xxxxxxxx</Text>
              <Text style={styles.label}>{customs.customs_duty || 'N/A'}</Text>
              <Text style={styles.label}>{po.po_no || 'N/A'}</Text>
              <Text style={styles.label}>xxxxxxxx</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.label}>IGM No</Text>
              <Text style={styles.label}>Country of origin:</Text>
              <Text style={styles.label}>MAWB No:</Text>
              <Text style={styles.label}>No. of Pkgs:</Text>
              <Text style={styles.label}>Marks:</Text>
              <Text style={styles.label}>{customs.sl_no || 'N/A'}</Text>
              <Text style={styles.label}>{customs.be_no || 'N/A'}</Text>
              <Text style={styles.label}>xxxxxxxx</Text>
              <Text style={styles.label}>xxxxxxxx</Text>
              <Text style={styles.label}>{customs.sl_no || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>SL. No/ Qty unit</Text>
            <Text style={styles.tableHeaderText}>Description</Text>
            <Text style={styles.tableHeaderText}>CTH</Text>
            <Text style={styles.tableHeaderText}>BCD / CVD amt(Rs)</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.label}>1./2pcs</Text>
            <Text style={styles.label}>xxxxxxxx</Text>
            <Text style={styles.label}>xxxxxxxx</Text>
            <Text style={styles.textRight}>xxxxxxxx</Text>
          </View>

          <View style={styles.duties}>
            <View style={styles.dutyRow}>
              <Text style={styles.label}>BCD:</Text>
              <Text style={styles.label}>ANTLD</Text>
              <Text style={styles.label}>CVD</Text>
              <Text style={styles.label}>Edu. Cess CVD</Text>
              <Text style={styles.label}>SHE. Cess CVD</Text>
              <Text style={styles.label}>Social Welfare surcharge</Text>
              <Text style={styles.label}>IGST</Text>
            </View>
            <View style={styles.dutyRow}>
              <Text style={styles.label}>{BCD}</Text>
              <Text style={styles.label}>0</Text>
              <Text style={styles.label}>0</Text>
              <Text style={styles.label}>0</Text>
              <Text style={styles.label}>0</Text>
              <Text style={styles.label}>
                {new Intl.NumberFormat('en-IN').format(welfare_charges)}
              </Text>
              <Text style={styles.label}>{new Intl.NumberFormat('en-IN').format(igst)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.footerAmount}>Duty Payable:</Text>
              <Text style={styles.totalAmount}>
                {new Intl.NumberFormat('en-IN').format(total)}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerTitle}>GSTIN DETAILS</Text>
            <View style={styles.footerRow}>
              <Text style={styles.footerAmount}>Document No</Text>
              <Text style={styles.footerAmount}>xxxxxxxx</Text>
            </View>
            <View style={styles.footerRow}>
              <Text style={styles.footerAmount}>Type state cd/Name</Text>
              <Text style={styles.footerAmount}>xxxxxxxx</Text>
            </View>
            <View style={styles.footerRow}>
              <Text style={styles.footerAmount}>Customs Duty (Rs)</Text>
              <Text style={styles.footerAmount}>
                {new Intl.NumberFormat('en-IN').format(
                  customs.customs_duty || 0,
                )}
              </Text>
            </View>
            <View style={styles.footerRow}>
              <Text style={styles.footerAmount}>IGST Amt (Rs)</Text>
              <Text style={styles.footerAmount}>
                {new Intl.NumberFormat('en-IN').format(invoice.igst_total || 0)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '92%',
    padding: 10,
    width: 600,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontFamily: 'Roboto',
    fontSize: 10,
    lineHeight: 14,
    color: 'gray',
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 12,
    lineHeight: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftColumn: {
    flex: 1,
    paddingRight: 5,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 5,
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: 11,
    lineHeight: 14,
    color: 'gray',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
  },
  tableHeaderText: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 10,
    lineHeight: 14,
    color: '#575757',
    textAlign: 'center',
  },
  tableRow: {
    display:'flex',
    justifyContent:'space-around',
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#26303E',
  },
  textRight: {
    textAlign: 'right',
    color:'#808080',
  },
  duties: {
    marginTop: 10,
  },
  dutyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#26303E',
    paddingTop: 5,
  },
  totalAmount: {
    fontWeight: 'bold',
    color:'#808080',
  },
  footer: {
    marginTop: 10,
  },
  footerTitle: {
    fontFamily: 'Roboto',
    lineHeight: 14,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  footerAmount: {
    fontWeight: 'bold',
    color:'#808080',
  },
});

export default CustomsDuty;
