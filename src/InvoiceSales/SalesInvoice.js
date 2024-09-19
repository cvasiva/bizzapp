/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CompanyDetail2 from '../Invoiceservice/CompanyDetail2';
import ExportInvoice from './ExportInvoice';

const SalesInvoice = ({invoice_data}) => {
  const sales_invoice = invoice_data?.sales_invoice || {};
  const packing_list = invoice_data?.packing_list || {};
  const isExportInvoice =
    invoice_data?.sub_category === 'sales_invoices_export';
  const foreign_currency = isExportInvoice;
  const getTitle = () => {
    if (invoice_data?.sub_category === 'sales_invoices_export') {
      return 'Export Invoice';
    } else if (invoice_data?.sub_category === 'domestic_sales') {
      return 'Sales Invoice';
    } else if (invoice_data?.sub_category === 'sales_of_scrap') {
      return 'Scrap Invoice';
    } else if (invoice_data?.sub_category === 'rental_invoice') {
      return 'Rental Invoice';
    } else if (invoice_data?.sub_category === 'service_invoice') {
      return 'Service Invoice';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <View style={styles.col7}>
          <CompanyDetail2 company={sales_invoice.company} />
        </View>
        <View style={styles.col5}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>GSTIN</Text>
            <Text style={styles.value}>29AABCD9686R1ZC</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>PAN</Text>
            <Text style={styles.value}>AABCD9686R</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>IEC No</Text>
            <Text style={styles.value}> {sales_invoice?.bill_to?.account_no || 'N/A'}</Text>
          </View>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{getTitle()}</Text>
      </View>
      <ExportInvoice
        data={invoice_data}
        sales_invoice={sales_invoice}
        packing_list={packing_list}
        foreign_currency={foreign_currency}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 600,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  col7: {
    flex: 7,
  },
  col5: {
    flex: 5,
    paddingTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    flex: 4,
    color:'#808080',
  },
  value: {
    flex: 8,
    color:'#808080',
  },
  header: {
    backgroundColor: '#25B7D3',
    padding: 10,
    borderRadius: 4,
    marginVertical: 10,
  },
  headerText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SalesInvoice;
