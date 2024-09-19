/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ClosingStocks = ({invoice_data}) => {
  const [tab, setTab] = useState('closing_stock_summary');
  const [templateData, setTemplateData] = useState(invoice_data);

  const renderSummary = () => {
    return (
      <View style={[styles.tableContainer]}>
        <View>
          <Text style={[styles.sectionTitle,{textAlign:'center'}]}>Closing Stock Summary</Text>
        </View>
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Particulars</Text>
            <Text style={styles.headerText}>Closing Stock Qty</Text>
            <Text style={styles.headerText}>Closing Stock Value</Text>
          </View>
          {invoice_data?.summary?.map((item, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.cellText}>{item.particulars}</Text>
              <Text style={styles.cellText}>{item.quantity}</Text>
              <Text style={styles.cellText}>
                {new Intl.NumberFormat('en-IN').format(item.value)}
              </Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText} />
            <Text style={styles.totalText}>
              {new Intl.NumberFormat('en-IN').format(
                invoice_data.summary.reduce((a, v) => a + v.value, 0),
              )}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    templateData && (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {tab === 'closing_stock_summary' && renderSummary()}
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  headerText:{
    color:'#808080',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#5243FF',
  },
  activeTab: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFC107',
    alignItems: 'center',
    borderRadius: 5,
  },
  inactiveTab: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 5,
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  contentContainer: {
    padding: 10,
  },
  tableContainer: {
    marginVertical: 10,
    width: 600,
  },
  tableHeader: {
    flexDirection: 'row',
    display:'flex',
    justifyContent:'space-around',
    backgroundColor: '#E8F7FE',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF',
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color:'#808080',
  },
  totalRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#D3D3D3',
  },
  totalText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color:'#808080',
  },
  separator: {
    height: 1,
    backgroundColor: '#C0C0C0',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color:'#808080',
  },
});

export default ClosingStocks;
