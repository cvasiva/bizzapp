/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import moment from 'moment';

const WaterBill = ({invoice_data}) => {
  const invoice = invoice_data?.invoice || {};
  const po = invoice_data?.po || {};
  const meter = 200;
  const water_charges = invoice.total - 50 - meter;
  // const consumption = parseInt(water_charges / 0.15);

  return (
    <ScrollView>
      <View style={styles.content}>
        <View style={styles.borderTop} />
        <View style={styles.companyHeader}>
          <Text style={styles.companyName}>{invoice.company.companyname}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <Text style={styles.infoHeader1}>Sub Division</Text>
              <Text style={styles.infoHeader1}>RR No</Text>
              <Text style={styles.infoHeader1}>Cons No</Text>
            </View>
            <View style={styles.detailsValue}>
              <Text style={styles.infoHeader1}>{po.po_no}</Text>
              <Text style={styles.infoHeader1}>{Number(po.po_no) + 55}</Text>
              <Text style={styles.infoHeader1}>{343343}</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.detailsRow}>
            <View style={styles.detailsColumn}>
              <Text style={styles.infoHeader1}>Bill No.</Text>
              <Text style={styles.infoHeader1}>Rdg. Date</Text>
              <Text style={styles.infoHeader1}>Due Date</Text>
            </View>
            <View style={styles.detailsValue}>
              <Text style={styles.infoHeader1}>{invoice.invoice_no}</Text>
              <Text style={styles.infoHeader1}>{invoice.invoice_date}</Text>
              <Text style={styles.infoHeader1}>
                {moment(invoice.invoice_date, 'DD-MM-YYYY')
                  .endOf('month')
                  .format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Consumer Details</Text>
          <View style={styles.cardContent}>
            <View style={styles.detailsRow}>
              <View style={styles.detailsColumn}>
                <Text style={styles.infoHeader1}>Name</Text>
                <Text style={styles.infoHeader1}>Address</Text>
              </View>
              <View style={styles.detailsValue}>
                <Text style={styles.infoHeader1}>{invoice.bill_to.companyname}</Text>
                <Text style={styles.infoHeader1}>{invoice.bill_to.address_1}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Consumption Details</Text>
            <View style={styles.cardContent}>
              <View style={styles.detailsRow}>
                <View style={styles.detailsColumn}>
                  <Text style={styles.infoHeader1}>Pres Rdg</Text>
                  <Text style={styles.infoHeader1}>Prev Rdg</Text>
                  <Text style={styles.infoHeader1}>Consumption-Lts</Text>
                </View>
                <View style={styles.detailsValue}>
                  <Text style={styles.infoHeader1}>{parseInt(water_charges * 0.15) * 200}</Text>
                  <Text style={styles.infoHeader1}>
                    {parseInt(water_charges * 0.15) * 200 -
                      parseInt(water_charges * 0.15)}
                  </Text>
                  <Text style={styles.infoHeader1}>{parseInt(water_charges * 0.15)}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Charges Details</Text>
            <View style={styles.cardContent}>
              <View style={styles.detailsRow}>
                <View style={styles.detailsColumn}>
                  <Text style={styles.infoHeader1}>Water Charges</Text>
                  <Text style={styles.infoHeader1}>Meter Charges</Text>
                  <Text style={styles.infoHeader1}>Sanitary Charges</Text>
                  <Text style={styles.infoHeader1}>S.C. for Borewell</Text>
                  <Text style={styles.infoHeader1}>Other Charges</Text>
                  <Text style={styles.infoHeader1}>Arrears</Text>
                </View>
                <View style={styles.detailsValue}>
                  <Text style={styles.infoHeader1}>
                    {new Intl.NumberFormat('en-IN').format(water_charges)}
                  </Text>
                  <Text>{new Intl.NumberFormat('en-IN').format(meter)}</Text>
                  <Text style={styles.infoHeader1}>{50}</Text>
                  <Text style={styles.infoHeader1}>{0}</Text>
                  <Text style={styles.infoHeader1}>{0}</Text>
                  <Text style={styles.infoHeader1}>{0}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerTop} />
          <View style={styles.footerBottom}>
            <Text style={styles.netAmountText}>Net Amount Due</Text>
            <Text style={styles.netAmountValue}>
              {new Intl.NumberFormat('en-IN').format(invoice.total)}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  infoHeader1: {
    color: '#808080',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    backgroundColor:
      'radial-gradient(84% 84% at 0% 16%, rgb(137, 127, 255) 0%, rgb(82, 67, 255) 100%)',
    padding: '1%',
    position: 'sticky',
    top: 0,
  },
  headerText: {
    width: '20%',
    textAlign: 'center',
    lineHeight: 40,
  },
  btnWarning: {
    backgroundColor: 'yellow',
    color: 'black',
  },
  btnWhite: {
    backgroundColor: 'white',
    color: 'black',
  },
  spacer: {
    width: '50%',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '30%',
  },
  button: {
    width: '50%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 5,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    padding: 10,
    width: 600,
  },
  borderTop: {
    height: 20,
    backgroundColor: '#8ED6FF',
  },
  companyHeader: {
    backgroundColor: '#8ED6FF',
    padding: 10,
    alignItems: 'center',
  },
  companyName: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 14,
    color: '#024D65',
    textTransform: 'uppercase',
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailsColumn: {
    flex: 1,
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 10,
    color: '#545454',
  },
  detailsValue: {
    flex: 1,
    textAlign: 'right',
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 10,
    color: '#545454',
  },
  separator: {
    height: 20,
    backgroundColor: '#8ED6FF',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#8ED6FF',
    margin: 5,
    borderRadius: 5,
    padding: 10,
  },
  cardTitle: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 12,
    color: '#024D65',
  },
  cardContent: {
    marginTop: 10,
  },
  footer: {
    marginTop: 10,
  },
  footerTop: {
    height: 20,
    backgroundColor: '#8ED6FF',
  },
  footerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#0CC5FF',
    borderBottomWidth: 1,
    borderBottomColor: '#0CC5FF',
  },
  netAmountText: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 12,
    color: '#024D65',
  },
  netAmountValue: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 12,
    color: '#024D65',
  },
});

export default WaterBill;
