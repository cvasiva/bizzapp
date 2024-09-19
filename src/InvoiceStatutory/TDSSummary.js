/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';

const TDSSummary = ({invoice_data}) => {
  const summary = invoice_data?.summary || {
    tds_consolidated_sheet: [],
    title: '',
  };

  // Calculate the total amount
  const totalAmount = summary.tds_consolidated_sheet.reduce(
    (a, b) => a + b.amount,
    0,
  );

  // Ensure newfun is a function before calling it
  if (typeof invoice_data?.newfun === 'function') {
    invoice_data.newfun(totalAmount);
  }

  // Render each row of the table
  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.particulars]}>{item.particulars}</Text>
      <Text style={[styles.cell, styles.section, styles.textCenter]}>
        {item.section}
      </Text>
      <Text style={[styles.cell, styles.amount, styles.textRight]}>
        {new Intl.NumberFormat('en-IN').format(item.amount)}
      </Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.billHeader}>
          <View style={styles.headerRow}>
            <View style={styles.headerColumnLeft} />
            <View style={styles.headerColumnMiddle} />
            <View style={styles.headerColumnRight} />
          </View>
        </View>

        <View style={styles.billContent}>
          <View style={styles.tableHeader}>
            <Text style={styles.title}>{summary.title}</Text>
          </View>
          <View style={styles.headerBg}>
            <Text style={[styles.headerCell, styles.textCenter]}>
              Particulars
            </Text>
            <Text style={[styles.headerCell, styles.textCenter]}>Section</Text>
            <Text style={[styles.headerCell, styles.textCenter]}>Amount</Text>
          </View>
          <FlatList
            data={summary.tds_consolidated_sheet}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.totalRow}>
            <Text style={[styles.totalCell, styles.textCenter]}>Total</Text>
            <Text style={[styles.totalAmount, styles.textRight]}>
              {new Intl.NumberFormat('en-IN').format(totalAmount)}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    width: 600,
  },
  billHeader: {
    height: 40,
  },
  headerRow: {
    flexDirection: 'row',
    height: '100%',
  },
  headerColumnLeft: {
    flex: 4,
    backgroundColor: 'white',
    marginRight: '-12%',
  },
  headerColumnMiddle: {
    flex: 1,
    backgroundColor: '#33d6ff',
    marginRight: '-60%',
    clipPath: 'polygon(73% 0, 86% 0, 49% 100%, 38% 100%)',
  },
  headerColumnRight: {
    flex: 5,
    backgroundColor: '#33d6ff',
    clipPath: 'polygon(11% 0, 100% 0%, 100% 100%, 25% 100%, 0 100%)',
  },
  billContent: {
    marginTop: 5,
  },
  tableHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color:'#808080',
  },
  headerBg: {
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
    color:'#808080',
  },
  particulars: {
    paddingLeft: 10,
    color:'#808080',
  },
  section: {
    textAlign: 'center',
    color:'#808080',
  },
  amount: {
    paddingRight: 10,
    color:'#808080',
  },
  textCenter: {
    textAlign: 'center',
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
    flex: 2,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#808080',
  },
  totalAmount: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 10,
    color:'#808080',
  },
});

export default TDSSummary;
