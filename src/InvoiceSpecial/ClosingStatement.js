/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable dot-notation */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const ClosingStocks = ({invoice_data}) => {
  const [tab, setTab] = useState('closing_stock_statement');
  const [templateData, setTemplateData] = useState(invoice_data);

  const renderDetails = () => {
    return (
      <ScrollView>
        <View>
          <Text style={[styles.sectionTitle,{textAlign:'center'}]}>Closing Stock Statement</Text>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Raw Material Stock Register</Text>
          {renderTable(invoice_data.statement['raw_materials'])}
        </View>
        <View style={styles.separator} />
        <View>
          <Text style={styles.sectionTitle}>WIP Stock Register</Text>
          {renderTable(invoice_data.statement['wip_materials'])}
        </View>
        <View style={styles.separator} />
        <View>
          <Text style={styles.sectionTitle}>Finished Goods Stock Register</Text>
          {renderTable(invoice_data.statement['finished_goods'])}
        </View>
      </ScrollView>
    );
  };

  const renderTable = tableData => {
    return (
      <ScrollView horizontal>
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Particulars</Text>
            <Text style={styles.headerText}>UOM</Text>
            <Text style={styles.headerText}>Opening Stock Qty</Text>
            <Text style={styles.headerText}>Receipt Qty</Text>
            <Text style={styles.headerText}>Issue Qty</Text>
            <Text style={styles.headerText}>Closing Stock Qty</Text>
            <Text style={styles.headerText}>Closing Stock Value</Text>
          </View>
          {tableData.map((item, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={styles.cellText}>{item.particulars}</Text>
              <Text style={styles.cellText}>{item.uom}</Text>
              <Text style={styles.cellText}>{item.opening_stock_qty}</Text>
              <Text style={styles.cellText}>{item.receipt_qty}</Text>
              <Text style={styles.cellText}>{item.issue_qty}</Text>
              <Text style={styles.cellText}>{item.closing_stock_qty}</Text>
              <Text style={styles.cellText}>
                {new Intl.NumberFormat('en-IN').format(
                  item.closing_stock_value,
                )}
              </Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>TOTAL</Text>
            <Text style={styles.totalText} />
            <Text style={styles.totalText}>
              {new Intl.NumberFormat('en-IN').format(
                tableData.reduce((a, v) => a + v.closing_stock_value, 0),
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    templateData && (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {tab === 'closing_stock_statement' && renderDetails()}
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  headerText:{
    color:'#808080',
    fontWeight: 'bold',
    flex:1,
    textAlign:'center',
    fontSize:12,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width:600,
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
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E8F7FE',
    padding: 5,
    width: 600,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF',
  },
  cellText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 12,
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
