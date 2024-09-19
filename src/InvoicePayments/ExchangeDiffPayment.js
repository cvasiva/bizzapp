/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';

const ExchangeDiffPayment = ({invoice_data = {}}) => {
  const [templateData, setTemplateData] = useState(invoice_data);

  const renderInvoice = ({item, index}) => (
    <View style={styles.row} key={index}>
      <View style={[styles.cell, {width: '10%'}]}>
        <Text style={styles.text}>{index + 1}</Text>
      </View>
      <View style={[styles.cell, {width: '18%'}]}>
        <Text style={styles.text}>{item.shipping_bill_no}</Text>
      </View>
      <View style={[styles.cell, {width: '18%'}]}>
        <Text style={styles.text}>
          {new Intl.NumberFormat('en-IN').format(item.sales_value_inr)}
        </Text>
      </View>
      <View style={[styles.cell, {width: '18%'}]}>
        <Text style={styles.text}>
          {new Intl.NumberFormat('en-IN').format(item.receipt_value_inr)}
        </Text>
      </View>
      <View style={[styles.cell, {width: '18%'}]}>
        <Text style={styles.text}>
          {new Intl.NumberFormat('en-IN').format(item.exchange_amount)}
        </Text>
      </View>
      <View style={[styles.cell, {width: '18%'}]}>
        <Text style={styles.text} />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {templateData && templateData.supplier ? (
        <View style={styles.content}>
          <Text style={styles.title}>
            Exchange Gain and Loss Statement on Import Purchase
          </Text>
          <View style={styles.row}>
            <Text style={styles.label12}>
              Company Name:{' '}
              <Text style={styles.value}>
                {templateData.supplier.companyname || 'N/A'}
              </Text>
            </Text>
          </View>

          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>SI no.</Text>
              <Text style={styles.tableHeaderText}>Bill of Entry No.</Text>
              <Text style={styles.tableHeaderText}>Purchase Value in INR</Text>
              <Text style={styles.tableHeaderText}>
                Re-Instatement Value in INR
              </Text>
              <Text style={styles.tableHeaderText}>Exchange Gain Amount</Text>
              <Text style={styles.tableHeaderText}>Exchange Loss Amount</Text>
            </View>
            <FlatList
              data={templateData.exchange_list || []}
              renderItem={renderInvoice}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                {templateData.exchange_list &&
                templateData.exchange_list[0].exchange_amount > 0
                  ? new Intl.NumberFormat('en-IN').format(
                      templateData.exchange_list[0].exchange_amount,
                    )
                  : 'NA'}
              </Text>
              <Text style={styles.totalValue}>
                {templateData.exchange_list &&
                templateData.exchange_list[0].exchange_amount > 0
                  ? 'NA'
                  : new Intl.NumberFormat('en-IN').format(
                      -templateData.exchange_list[0].exchange_amount,
                    )}
              </Text>
            </View>
          </View>

          <View style={styles.noteContainer}>
            <Text style={styles.noteLabel}>Note:</Text>
            <Text style={styles.noteItem}>
              1. Purchase Value in INR = Purchase value in Foreign Currency X
              Exchange rate as per BOE
            </Text>
            <Text style={styles.noteItem}>
              2. Re-Instatement Value in INR = Re-Instatement value in Foreign
              Currency X Exchange rate as per bank
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.title}>No supplier data available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label:{
    color:'#808080',
  },
  label12:{
    color:'#808080',
    fontWeight:'bold',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#EFEFEF',
    width: 600,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
    color:'#808080',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color:'#808080',
  },
  text: {
    textAlign: 'center',
    color:'#808080',
  },
  tableContainer: {
    marginVertical: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#CCC',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#808080',
  },
  summaryRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#EEE',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  totalLabel: {
    flex: 1,
    fontWeight: 'bold',
    color:'#808080',
  },
  totalValue: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
    color:'#808080',
  },
  noteContainer: {
    marginVertical: 10,
    color:'#808080',
  },
  noteLabel: {
    fontWeight: 'bold',
    color:'#808080',
  },
  noteItem: {
    marginVertical: 5,
    color:'#808080',
  },
});

export default ExchangeDiffPayment;
