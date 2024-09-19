/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';

const TDSStatement = ({invoice_data}) => {
  const statement = invoice_data?.statement || {};

  // Render each item in the TDS list
  const renderItem = ({item, index}) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.textCenter]}>{index + 1}</Text>
      <Text style={[styles.cell, styles.textLeft]}>{item.supplier_Name}</Text>
      <Text style={[styles.cell, styles.textCenter]}>
        {item.invoice_Number}
      </Text>
      <Text style={[styles.cell, styles.textCenter]}>{item.subcategory}</Text>
      <Text style={[styles.cell, styles.textCenter]}>{item.tds_rate}</Text>
      <Text style={[styles.cell, styles.textRight]}>
        {new Intl.NumberFormat('en-IN').format(item.tds_amount)}
      </Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.billHeader} />

        <View style={styles.billContent}>
          <Text style={styles.title}>Detail Statement</Text>
          {statement.map((val, idx) => (
            <View key={idx} style={styles.section}>
              <Text style={styles.sectionTitle}>{val.tds_title}</Text>
              <View style={styles.headerRow}>
                <Text style={[styles.headerCell, styles.textCenter]}>
                  SI. No.
                </Text>
                <Text style={[styles.headerCell, styles.textLeft]}>
                  Supplier Name
                </Text>
                <Text style={[styles.headerCell, styles.textCenter]}>
                  {val.tds_title === 'TDS on Salary'
                    ? 'Employee ID'
                    : 'Invoice No'}
                </Text>
                <Text style={[styles.headerCell, styles.textCenter]}>
                  Sub-Category
                </Text>
                <Text style={[styles.headerCell, styles.textCenter]}>
                  TDS Rate
                </Text>
                <Text style={[styles.headerCell, styles.textRight]}>
                  TDS Amount
                </Text>
              </View>
              <FlatList
                data={val.tds_list}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
              <View style={styles.totalRow}>
                <Text style={[styles.totalCell, styles.textCenter]}>Total</Text>
                <Text style={[styles.totalAmount, styles.textRight]}>
                  {new Intl.NumberFormat('en-IN').format(
                    val.tds_list.reduce((a, b) => a + b.tds_amount, 0),
                  )}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.billFooter} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    width:600,
  },
  billHeader: {
    marginBottom: 20,
  },
  billContent: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color:'#808080',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#808080',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#33d6ff',
    paddingVertical: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    paddingVertical: 5,
    color:'#808080',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    paddingVertical: 5,
  },
  textCenter: {
    textAlign: 'center',
    color:'#808080',
  },
  textLeft: {
    textAlign: 'left',
    color:'#808080',
  },
  textRight: {
    textAlign: 'right',
    color:'#808080',
  },
  totalRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: '#000',
  },
  totalCell: {
    flex: 4,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#808080',
  },
  totalAmount: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 10,
  },
  billFooter: {
    marginTop: 20,
  },
});

export default TDSStatement;
