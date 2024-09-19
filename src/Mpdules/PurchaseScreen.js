/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import ReceiverSignature from '../Invoice/ReceiverSignature';
import AuthorisedSignature from '../Invoice/AuthorisedSignature';
// import moment from 'moment';

const PurchaseScreen = ({invoice_data}) => {
  const Purchase_order = invoice_data.po || {};

  //   const color = '#F0F0F0';

  const formatted_amount = amount => {
    return `₹${new Intl.NumberFormat('en-IN').format(amount)}`;
  };

  const subtotal = Purchase_order?.lineItems.reduce(
    (acc, item) => acc + item.amount,
    0,
  );

  const color = '#01b99d';
  const backgcolor = '#000';
  return (
    <ScrollView>
      <View>
        <View
          style={[
            styles.header12,
            {backgroundColor: color, color: backgcolor},
          ]}>
          <View style={styles.headerLeft}>
            <Text style={styles.greenTextorder}>Purchase Order</Text>
          </View>
          <View>
            <Image
              style={styles.logo}
              source={require('../Images/nisha_steel_n_alloys.png')}
              resizeMode="contain"
            />
          </View>
          <View style={styles.headerRight}>
            <View>
              <Text style={styles.textcolorewhit}>
                {Purchase_order?.company?.companyname}
              </Text>
              <Text style={styles.textcolorewhit}>
                {Purchase_order?.company?.address1}{' '}
                {Purchase_order?.company?.city},
              </Text>
              <Text style={styles.textcolorewhit}>
                {Purchase_order?.company?.state} -{' '}
                {Purchase_order?.company?.pin}
              </Text>
              <View style={styles.row}>
                <Text style={styles.textcolorewhit}>GST No. : </Text>
                <Text style={styles.textcolorewhit}>
                  {Purchase_order?.company?.gstin}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.fullWidth}>
          <Text style={[styles.bold, styles.greenText]}>To:</Text>
          <View style={styles.marginLeft}>
            <Text style={styles.textcolore}>
              {Purchase_order?.supplier.companyname}
            </Text>
            <Text
              style={
                styles.textcolore
              }>{`${Purchase_order?.supplier.address_1} ${Purchase_order?.supplier.city}, ${Purchase_order?.supplier.state} - ${Purchase_order?.supplier.pin_code}`}</Text>
          </View>
          <View style={[styles.row, styles.marginLeft]}>
            <Text style={styles.textcolore}>GST No. </Text>
            <Text>
              :{' '}
              <Text style={styles.textcolore}>
                {Purchase_order?.supplier.gstin}
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.fullWidth}>
          <View style={styles.row}>
            <View style={styles.col6}>
              <Text style={styles.textcolore}>Order to</Text>
              <View style={styles.row}>
                <Text style={styles.textcolore}>PO No.</Text>
                <Text style={styles.textcolore}>: {Purchase_order?.po_no}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textcolore}>PO Date</Text>
                <Text style={styles.textcolore}>: 02/07/20224</Text>
              </View>
            </View>
            <View style={styles.col6}>
              <Text style={styles.textcolore}>Payment</Text>
              <View style={styles.row}>
                <Text style={styles.textcolore}>Amount Paid</Text>
                <Text style={styles.textcolore}>: Rs 0</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textcolore}>Due Amount</Text>
                <Text style={styles.textcolore}>
                  : {formatted_amount(Purchase_order?.total)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.fullWidth}>
          <View style={[styles.row, styles.headerBackground]}>
            <Text style={[styles.col1, styles.textcolore]}>S.No</Text>
            <Text style={[styles.col3, styles.textcolore]}>Description</Text>
            <Text style={[styles.col2, styles.textcolore]}></Text>
            <Text style={[styles.col2, styles.textcolore]}>Qty/Kg</Text>
            <Text style={[styles.col2, styles.textcolore]}>Rate</Text>
            <Text style={[styles.col2, styles.textcolore]}>Amount</Text>
          </View>
          {Purchase_order?.lineItems.map((item, i) => (
            <View style={styles.row} key={i}>
              <Text style={[styles.col1, styles.textcolore]}>{i + 1}</Text>
              <Text style={[styles.col3, styles.textcolore]}>
                {item.description}
              </Text>
              <Text style={[styles.col2, styles.textcolore]}></Text>
              <Text style={[styles.col2, styles.textcolore]}>{item.qty}</Text>
              <Text style={[styles.col2, styles.textcolore]}>
                {new Intl.NumberFormat('en-IN').format(item.rate)}
              </Text>
              <Text style={[styles.col2, styles.textcolore]}>
                {new Intl.NumberFormat('en-IN').format(item.amount)}
              </Text>
            </View>
          ))}

          <View style={styles.row}>
            <View style={styles.col7} />
            <Text style={[styles.col3, styles.textcolore]}>Sub Total</Text>
            <Text style={[styles.col2, styles.textcolore]}>
              {new Intl.NumberFormat('en-IN').format(subtotal)}
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.col7} />
            <Text style={[styles.col3, styles.textcolore]}>
              CGST {Purchase_order?.cgst_percentage}%
            </Text>
            <Text style={[styles.col2, styles.textcolore]}>
              {formatted_amount(Purchase_order?.cgst_total)}
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.col7} />
            <Text style={[styles.col3, styles.textcolore]}>
              SGST {Purchase_order?.sgst_percentage}%
            </Text>
            <Text style={[styles.col2, styles.textcolore]}>
              {formatted_amount(Purchase_order?.sgst_total)}
            </Text>
          </View>
          <View style={[styles.row, {backgroundColor: color}]}>
            <View style={styles.col7} />
            <Text style={[styles.col3, styles.textcolore]}>Total</Text>
            <Text style={[styles.col2, styles.textcolore]}>
              {formatted_amount(Purchase_order?.total)}
            </Text>
          </View>
        </View>

        <View style={[styles.row, {padding: 10}]}>
          <Text style={[styles.col4, styles.textcolore, {fontWeight: '700'}]}>
            Total Amount in words
          </Text>
          <Text style={[styles.col8, styles.textcolore]}>
            {Purchase_order?.amount_words}
          </Text>
        </View>

        <View style={[styles.row, styles.border]}>
          <View style={[styles.row, styles.spaceBetween]}>
            <ReceiverSignature
              companyNameSignature={Purchase_order.supplier.companyname}
            />
            <AuthorisedSignature
              companyNameSignature={Purchase_order.company.companyname}
            />
          </View>
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.textcolore}>Receiver Signature</Text>
            <Text style={styles.textcolore}>Authorised Signature</Text>
          </View>
        </View>

        <View style={[styles.row, {justifyContent: 'flex-end'}]}>
          <View
            style={[styles.paddingVertical, {backgroundColor: color}]}></View>
        </View>
        <View style={styles.container12}>
          <View
            style={[
              styles.box,
              {
                backgroundColor: color,
                color: backgcolor,
                paddingTop: 3,
                paddingBottom: 3,
                marginBottom: 5,
              },
            ]}></View>
          <View
            style={[
              styles.box,
              {
                backgroundColor: color,
                color: backgcolor,
                marginBottom: 5,
                paddingTop: 8,
                paddingBottom: 8,
              },
            ]}></View>
          <View
            style={[
              styles.box,
              {
                backgroundColor: color,
                color: backgcolor,
                paddingTop: 3,
                paddingBottom: 3,
              },
            ]}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  greenTextorder: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 20,
    paddingLeft: 15,
    paddingTop: 20,
  },
  container12: {
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  box: {
    marginBottom: 5,
  },
  container: {
    flex: 1,
    width: 600,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 600,
  },
  header12: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingVertical: 10,
    width: 600,
  },
  headerLeft: {
    flex: 5,
  },
  headerRight: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  col1: {
    flex: 1,
  },
  col2: {
    flex: 2,
  },
  col3: {
    flex: 3,
  },
  col4: {
    flex: 4,
  },
  col5: {
    flex: 5,
  },
  col6: {
    flex: 6,
  },
  col7: {
    flex: 7,
  },
  col8: {
    flex: 8,
  },
  col9: {
    flex: 9,
  },
  fullWidth: {
    width: '100%',
    paddingTop: 15,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginVertical: {
    marginVertical: 5,
  },
  //   marginHorizontal: {
  //     marginHorizontal: 10,
  //   },
  marginLeft: {
    marginLeft: 10,
  },
  paddingTop: {
    paddingTop: 10,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  spaceBetween: {
    justifyContent: 'space-around',
  },
  bold: {
    fontWeight: '600',
    // color: '#000',
  },
  textcolore: {
    color: '#000',
  },
  textcolorewhit: {
    color: '#fff',
    fontWeight: '600',
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    paddingTop: 20,
  },
  headerBackground: {
    backgroundColor: '#00B257',
    color: '#FFFFFF',
    padding: 5,
  },
  greenText: {
    color: '#00B257',
  },
  greenText12: {
    backgroundColor: '#E3EDF7',
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
    paddingHorizontal: 8,
    height: 80,
    marginTop: -10,
    borderBottomRightRadius: 80,
    paddingTop: 30,
  },
  logo: {
    width: 50,
    height: 50,
  },
  border: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
});

export default PurchaseScreen;
