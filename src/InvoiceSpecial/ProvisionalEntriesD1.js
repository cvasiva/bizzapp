/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const ProvisionalEntriesD1 = ({invoice_data}) => {
  const [tab, setTab] = useState('provision_entry_details');
  const [templateData, setTemplateData] = useState({
    provisional_entries: [],
    ...invoice_data,
  });

  const renderDetails = () => {
    const provisionalEntries = templateData?.provisional_entries || [];

    return (
      <ScrollView style={styles.detailsContainer}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Sl No</Text>
            <Text style={styles.headerText}>Vendor</Text>
            <Text style={styles.headerText}>Remarks</Text>
            <Text style={styles.headerText}>Accounting Head</Text>
            <Text style={styles.headerText}>Amount</Text>
          </View>
          {provisionalEntries.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.rowText}>{i + 1}</Text>
              <Text style={styles.rowText}>{item.vendor_name}</Text>
              <Text style={styles.rowText}>{item.remarks}</Text>
              <Text style={styles.rowText}>{item.accounting_head}</Text>
              <Text style={styles.rowText}>
                {new Intl.NumberFormat('en-IN').format(item.amount)}
              </Text>
            </View>
          ))}
          <View style={styles.tableRowTotal}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>
              {new Intl.NumberFormat('en-IN').format(
                provisionalEntries.reduce((a, v) => a + v.amount, 0),
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {tab === 'provision_entry_details' && renderDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FFA500',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3A4166',
    padding: 8,
  },
  headerText: {
    flex: 1,
    color: '#FFF',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
    color: '#808080',
  },
  tableRowTotal: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#EBF2E7',
  },
  totalText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#808080',
  },
  detailsContainer: {
    // Consider making this responsive instead of fixed width
    width: 600,
  },
});

export default ProvisionalEntriesD1;
