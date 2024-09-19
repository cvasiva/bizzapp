/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const ProvisionalEntries = ({invoice_data}) => {
  const [tab, setTab] = useState('provision_entry_summary');
  const [templateData, setTemplateData] = useState(invoice_data);

  const renderSummary = () => {
    return (
      <View style={styles.tableContainer}>
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Accounting Head</Text>
            <Text style={styles.headerText}>Amount</Text>
          </View>
          {templateData &&
            templateData.provisional_entries &&
            templateData.provisional_entries.map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.rowText}>{item.accounting_head}</Text>
                <Text style={styles.rowText}>
                  {new Intl.NumberFormat('en-IN').format(item.amount)}
                </Text>
              </View>
            ))}
          <View style={styles.tableRowTotal}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>
              {new Intl.NumberFormat('en-IN', {currency: 'INR'}).format(
                templateData.amount,
              )}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {tab === 'provision_entry_summary' && renderSummary()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: 600,
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
    width: 600,
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
    marginTop: 16,
  },
});

export default ProvisionalEntries;
