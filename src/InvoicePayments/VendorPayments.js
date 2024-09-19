/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const VendorPayments = ({invoice_data}) => {
  const sub_category = invoice_data?.sub_category;
  const [tab, setTab] = useState('payment_processed');
  const [totals, setTotals] = useState({
    payment: 0,
    lessThan30: 0,
    thirtyToSixty: 0,
    sixtyToNinty: 0,
  });

  // Calculate totals if sub_category is 'vendor_payments_3'
  if (
    sub_category === 'vendor_payments_3' &&
    invoice_data &&
    invoice_data.payments_list
  ) {
    let totals = {
      payment: 0,
      lessThan30: 0,
      thirtyToSixty: 0,
      sixtyToNinty: 0,
    };

    invoice_data.payments_list.forEach((payment, index) => {
      let date = new Date(payment.entry_date);
      let dateMDY = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      payment.entry_date = dateMDY;
      payment.index = index + 1;
      totals = {
        ...totals,
        payment: totals.payment + payment.payment_amount,
        lessThan30: totals.lessThan30 + payment.less_than_30_days,
        thirtyToSixty: totals.thirtyToSixty + payment.from_thirty_to_sixty_days,
        sixtyToNinty: totals.sixtyToNinty + payment.from_sixty_to_ninty_days,
      };
    });
    setTotals(totals);
  }

  const paymentColumns = [
    {Header: 'Serial No', accessor: 'index'},
    {Header: `Party's Name`, accessor: 'partys_name'},
    {Header: 'Payment Amount', accessor: 'payment_amount'},
  ];

  const renderItem = ({item}) => (
    <View style={styles.row}>
      {paymentColumns.map(column => (
        <View key={column.accessor} style={styles.cell}>
          <Text>{item[column.accessor]}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {(sub_category === 'vendor_payments_1' ||
        sub_category === 'vendor_payments_2') && (
        <View style={styles.headerContainer}>
          {/* <Image source={GmailHeader} style={styles.headerImage} /> */}
        </View>
      )}
      <View style={styles.contentContainer}>
        {sub_category === 'vendor_payments_1' &&
          invoice_data &&
          invoice_data.supplier && (
            <View style={styles.emailContent}>
              <Text>Dear Finance Team,</Text>
              <Text>Please process the below vendor payment today.</Text>
              <Text style={styles.detailText}>
                Name of the supplier: {invoice_data.supplier.companyname}
              </Text>
              <Text style={styles.detailText}>
                Amount: {invoice_data.amount}
              </Text>
              <Text>Thanks and Regards</Text>
            </View>
          )}
        {sub_category === 'vendor_payments_2' && (
          <View style={styles.emailContent}>
            <Text>Dear Finance Team,</Text>
            <Text>Please process the below vendor payment today.</Text>
            <Text style={styles.detailText}>
              Name of the supplier: {invoice_data.supplier.companyname}
            </Text>
            <Text style={styles.detailText}>Amount: {invoice_data.amount}</Text>
            <Text>Thanks and Regards</Text>
          </View>
        )}
        {sub_category === 'vendor_payments_3' &&
          invoice_data &&
          invoice_data.payments_list &&
          invoice_data.payments_list.length > 0 && (
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  tab === 'payment_processed' && styles.activeTab,
                ]}
                onPress={() => setTab('payment_processed')}>
                <Text style={styles.tabText}>Payment Processed</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  tab === 'payable_report' && styles.activeTab,
                ]}
                onPress={() => setTab('payable_report')}>
                <Text style={styles.tabText}>Payable Ageing Report</Text>
              </TouchableOpacity>
            </View>
          )}
        {tab === 'payment_processed' &&
          invoice_data &&
          invoice_data.payments_list && (
            <FlatList
              data={invoice_data.payments_list}
              renderItem={renderItem}
              keyExtractor={item => item.index.toString()}
            />
          )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EFEFEF',
  },
  headerContainer: {
    width: '100%',
    marginBottom: 10,
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    flex: 1,
  },
  emailContent: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 5,
  },
  detailText: {
    color: 'gray',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    padding: 10,
    backgroundColor: 'lightgray',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: 'orange',
  },
  tabText: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
});

export default VendorPayments;
