/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';

const ScrapRegister = ({invoice_data}) => {
  const sales_invoice = invoice_data?.sales_invoice || {};
  // Example data, replace with actual data

  const renderItem = ({item, index}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.description}</Text>
      <Text style={styles.cell}>{item.vehicle_no}</Text>
      <Text style={styles.cell}>{item.empty_vehicle_weight}</Text>
      <Text style={styles.cell}>{item.load_vehicle_weight}</Text>
      <Text style={styles.cell}>{item.scrap_qty}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scrap Qty Sheet</Text>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.rowHeader}>
          <Text style={styles.headerText}>SI. No.</Text>
          <Text style={styles.headerText}>Description of Material</Text>
          <Text style={styles.headerText}>Vehicle No.</Text>
          <Text style={styles.headerText}>Empty Vehicle Weight</Text>
          <Text style={styles.headerText}>Load Vehicle Weight</Text>
          <Text style={styles.headerText}>Scrap Qty</Text>
        </View>
        <FlatList
          data={sales_invoice?.lineItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    marginTop: 30,
    width:600,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#808080',
  },
  tableContainer: {
    width: '100%',
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    color:'#808080',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color:'#808080',
  },
});

export default ScrapRegister;
