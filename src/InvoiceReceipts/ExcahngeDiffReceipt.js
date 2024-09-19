/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const ExcahngeDiffReceipt = ({invoice_data}) => {
  const [templateData, setTemplateData] = useState(invoice_data);
  const exchangeList = invoice_data?.exchange_list || [];

  return (
    <ScrollView>
      <View style={styles.banner}>
        <View style={styles.bannerLeft} />
        <View style={styles.bannerMiddle} />
        <View style={styles.bannerRight} />
      </View>

      {templateData && (
        <>
          <Text style={styles.title}>
            Exchange Gain and Loss Statement on Export Sales
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Customer Name:</Text>
            <Text style={styles.value}>
              {/* {templateData.supplier && templateData.supplier.supplier_name ?? templateData.supplier.customer_name} */}
            </Text>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>SI no.</Text>
              <Text style={styles.tableHeaderCell}>Shipping Bill No.</Text>
              <Text style={styles.tableHeaderCell}>Sales Value in INR</Text>
              <Text style={styles.tableHeaderCell}>Receipt Value in INR</Text>
              <Text style={styles.tableHeaderCell}>Exchange Gain Amount</Text>
              <Text style={styles.tableHeaderCell}>Exchange Loss Amount</Text>
            </View>

            {exchangeList.length > 0 ? (
              exchangeList.map((data, i) => (
                <View key={i} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{i + 1}</Text>
                  <Text style={styles.tableCell}>{data.shipping_bill_no}</Text>
                  <Text style={styles.tableCell}>
                    {new Intl.NumberFormat('en-IN').format(
                      data.purchase_value_inr,
                    )}
                  </Text>
                  <Text style={styles.tableCell}>
                    {new Intl.NumberFormat('en-IN').format(
                      data.re_instatement_value_inr,
                    )}
                  </Text>
                  <Text style={styles.tableCell}>
                    {data.exchange_amount > 0
                      ? new Intl.NumberFormat('en-IN').format(
                          data.exchange_amount,
                        )
                      : 'NA'}
                  </Text>
                  <Text style={styles.tableCell}>
                    {data.exchange_amount < 0
                      ? new Intl.NumberFormat('en-IN').format(
                          -data.exchange_amount,
                        )
                      : 'NA'}
                  </Text>
                </View>
              ))
            ) : (
              <Text>No data available</Text>
            )}
            {exchangeList.length > 0 && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCellTotal} colSpan={4}>
                  Total
                </Text>
                <Text style={styles.tableCell}>
                  {exchangeList[0].exchange_amount > 0
                    ? new Intl.NumberFormat('en-IN').format(
                        exchangeList[0].exchange_amount,
                      )
                    : 'NA'}
                </Text>
                <Text style={styles.tableCell}>
                  {exchangeList[0].exchange_amount > 0
                    ? 'NA'
                    : new Intl.NumberFormat('en-IN').format(
                        -exchangeList[0].exchange_amount,
                      )}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.note}>
            <Text style={styles.noteText}>Note:</Text>
            <Text style={styles.noteText}>
              1. Sales Value in INR = Sales value in Foreign Currency X Exchange
              rate as per shipping bill
            </Text>
            <Text style={styles.noteText}>
              2. Receipt Value in INR = Receipt value in Foreign Currency X
              Exchange rate as on receipt date
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: 'rgba(137, 127, 255, 0.5)',
    padding: 10,
    justifyContent: 'space-between',
  },
  headerButton: {
    flex: 1,
    marginLeft: 10,
  },
  banner: {
    height: 40,
    flexDirection: 'row',
  },
  bannerLeft: {
    flex: 4,
    backgroundColor: 'white',
  },
  bannerMiddle: {
    flex: 1,
    backgroundColor: '#33d6ff',
  },
  bannerRight: {
    flex: 5,
    backgroundColor: '#33d6ff',
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color:'#808080',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#808080',
  },
  value: {
    fontSize: 16,
    marginLeft: 5,
  },
  table: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgb(0, 201, 255)',
    padding: 5,
  },
  tableHeaderCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#FFFFFF',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color:'#808080',
  },
  tableCellTotal: {
    flex: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#808080',
  },
  note: {
    paddingHorizontal: 10,
  },
  noteText: {
    fontSize: 14,
    marginTop: 5,
    color:'#808080',
  },
});

export default ExcahngeDiffReceipt;
