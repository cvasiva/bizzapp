/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';

const GSTPaymentStatement = ({invoice_data}) => {
  const statement = invoice_data?.statement || {};
  return (
    <ScrollView style={styles.container}>
      <View style={styles.billHeader}>
        <View style={styles.headerRow}>
          <View style={styles.headerColumnLeft} />
          <View style={styles.headerColumnMiddle} />
          <View style={styles.headerColumnRight} />
        </View>
      </View>

      <View style={styles.billContent}>
        {/* GST Liability Summary */}
        <Text style={styles.title}>
          {statement.gst_liability_summary_data?.title}
        </Text>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <View style={styles.cellHeader}>
              <Text>SI. No.</Text>
            </View>
            <View style={styles.cellHeader}>
              <Text>Particulars</Text>
            </View>
            <View style={styles.cellHeader}>
              <Text>SGST</Text>
            </View>
            <View style={styles.cellHeader}>
              <Text>CGST</Text>
            </View>
            <View style={styles.cellHeader}>
              <Text>IGST</Text>
            </View>
          </View>
          <FlatList
            data={statement.gst_liability_summary_data?.item_list}
            keyExtractor={item => item.si_no.toString()}
            renderItem={({item}) => (
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>{item.si_no}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>{item.particulars}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>{item.sgst}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>{item.cgst}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>{item.igst}</Text>
                </View>
              </View>
            )}
          />
          <View style={styles.row}>
            <View style={[styles.cell, styles.totalCell]}>
              <Text style={styles.fontcolor}>Total</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.fontcolor}>
                {new Intl.NumberFormat('en-IN').format(
                  statement.gst_liability_summary_data?.summary
                    .sgst_liability_amount,
                )}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.fontcolor}>
                {new Intl.NumberFormat('en-IN').format(
                  statement.gst_liability_summary_data?.summary
                    .cgst_liability_amount,
                )}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.fontcolor}>
                {new Intl.NumberFormat('en-IN').format(
                  statement.gst_liability_summary_data?.summary
                    .igst_liability_amount,
                )}
              </Text>
            </View>
          </View>
        </View>

        {/* GST Input Register Data */}
        <Text style={styles.title}>
          {statement.gst_input_register_data?.title}
        </Text>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <View style={styles.cellHeader}>
              <Text>SI. No.</Text>
            </View>
            <View style={styles.cellHeader}>
              <Text>Supplier Name</Text>
            </View>
            <View style={styles.cellHeader}>
              <Text>CSTIN</Text>
            </View>
            <View style={styles.cellHeader}>
              <Text>SGST Input</Text>
            </View>
            <View style={styles.cellHeader}>
              <Text>CGST Input</Text>
            </View>
            <View style={styles.cellHeader}>
              <Text>IGST Input</Text>
            </View>
          </View>
          <FlatList
            data={statement.gst_input_register_data?.items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>{index + 1}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>{item.supplier_name}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>{item.gstin}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>
                    {new Intl.NumberFormat('en-IN').format(item.sgst_input)}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>
                    {new Intl.NumberFormat('en-IN').format(item.cgst_input)}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>
                    {new Intl.NumberFormat('en-IN').format(item.igst_input)}
                  </Text>
                </View>
              </View>
            )}
          />
          <View style={styles.row}>
            <View style={[styles.cell, styles.totalCell]}>
              <Text style={styles.fontcolor}>Total</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.fontcolor}>
                {new Intl.NumberFormat('en-IN').format(
                  statement.gst_input_register_data?.summary
                    .sgst_input_amount_total,
                )}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.fontcolor}>
                {new Intl.NumberFormat('en-IN').format(
                  statement.gst_input_register_data?.summary
                    .cgst_input_amount_total,
                )}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.fontcolor}>
                {new Intl.NumberFormat('en-IN').format(
                  statement.gst_input_register_data?.summary
                    .igst_input_amount_total,
                )}
              </Text>
            </View>
          </View>
        </View>

        {/* GST Output Register Data */}
        <Text style={styles.title}>
          {statement.gst_output_register_data?.title}
        </Text>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <View style={styles.cellHeader}>
              <Text>SI. No.</Text>
            </View>
            <View style={styles.cellHeader}>
              <Text>Customer Name</Text>
            </View>
            <View style={styles.cellHeader}>
              <Text>GSTIN</Text>
            </View>
            <View style={styles.cellHeader}>
              <Text>SGST Liability</Text>
            </View>
            <View style={styles.cellHeader}>
              <Text>CGST Liability</Text>
            </View>
            <View style={styles.cellHeader}>
              <Text>IGST Liability</Text>
            </View>
          </View>
          <FlatList
            data={statement.gst_output_register_data?.items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>{index + 1}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>{item.customer_name}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>{item.gstin}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>
                    {new Intl.NumberFormat('en-IN').format(item.sgst_input)}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>
                    {new Intl.NumberFormat('en-IN').format(item.cgst_input)}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.fontcolor}>
                    {new Intl.NumberFormat('en-IN').format(item.igst_input)}
                  </Text>
                </View>
              </View>
            )}
          />
          <View style={styles.row}>
            <View style={[styles.cell, styles.totalCell]}>
              <Text style={styles.fontcolor}>Total</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.fontcolor}>
                {new Intl.NumberFormat('en-IN').format(
                  statement.gst_output_register_data?.summary
                    .sgst_liability_amount_total,
                )}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.fontcolor}>
                {new Intl.NumberFormat('en-IN').format(
                  statement.gst_output_register_data?.summary
                    .cgst_liability_amount_total,
                )}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.fontcolor}>
                {new Intl.NumberFormat('en-IN').format(
                  statement.gst_output_register_data?.summary
                    .igst_liability_amount_total,
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fontcolor:{
    color:'#808080',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    width:600,
  },
  billHeader: {
    marginBottom: 5,
  },
  //   headerRow: {
  //     flexDirection: 'row',
  //     height: '100%',
  //   },
  headerColumnLeft: {
    flex: 4,
    backgroundColor: 'white',
    marginRight: -12,
    height: '100%',
  },
  headerColumnMiddle: {
    flex: 1,
    backgroundColor: '#b3ffb3',
    marginRight: -60,
    clipPath: 'polygon(73% 0, 86% 0, 49% 100%, 38% 100%)',
  },
  headerColumnRight: {
    flex: 5,
    backgroundColor: '#b3ffb3',
    clipPath: 'polygon(11% 0, 100% 0%, 100% 100%, 25% 100%, 0 100%)',
  },
  billContent: {
    marginTop: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color:'#808080',
  },
  table: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#b3ffb3',
  },
  cellHeader: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalCell: {
    flex: 2,
    fontWeight: 'bold',
    color:'#808080',
  },
});

export default GSTPaymentStatement;
