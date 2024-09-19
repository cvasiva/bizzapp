/* eslint-disable prettier/prettier */
/* eslint-disable radix */
import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';

// import SalesInvoice from './SalesInvoice';
import ReceiverSignature from '../Invoice/ReceiverSignature';
import AuthorisedSignature from '../Invoice/AuthorisedSignature';

const ExportInvoice = props => {
  const {sales_invoice, foreign_currency, data} = props;
  let total_usd = 0;

  const renderItem = ({item, index}) => {
    const rate_usd = parseInt(item.rate / 77);
    const item_amount_usd = item.qty * rate_usd;
    total_usd += item_amount_usd;

    return (
      <View style={styles.tableRow} key={index}>
        <Text style={styles.tableCell}>{index + 1}</Text>
        <Text style={styles.tableCell}>{item.description}</Text>
        <Text style={styles.tableCell}>{item.qty}</Text>
        <Text style={styles.tableCell}>
          {foreign_currency
            ? `$ ${rate_usd.toLocaleString('en-US')}`
            : item.rate.toLocaleString('en-IN')}
        </Text>
        <Text style={styles.tableCell}>
          {foreign_currency
            ? `$ ${item_amount_usd.toLocaleString('en-US')}`
            : item.amount.toLocaleString('en-IN')}
        </Text>
      </View>
    );
  };

  if (!sales_invoice) {
    return (
      <View style={styles.container}>
        <Text style={styles.boldText}>No invoice data available</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.boldText}>Bill To:</Text>
          {sales_invoice.bill_to && (
            <View style={styles.billToDetails}>
              <Text>
                <Text style={styles.boldText}>
                  {sales_invoice.bill_to.customer_name || 'N/A'}
                </Text>
              </Text>
              <Text style={styles.tableCell}>
                {`${sales_invoice.bill_to.address_1 || ''} ${
                  sales_invoice.bill_to.address_2 || ''
                } ${sales_invoice.bill_to.city || ''} ${
                  sales_invoice.bill_to.pin || ''
                }, ${sales_invoice.bill_to.state || ''}`}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.col}>
          <View style={styles.infoRow}>
            <Text style={styles.boldText}>Invoice No</Text>
            <Text style={styles.tableCell}>
              {sales_invoice.invoice_no || 'N/A'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.boldText}>Invoice Date</Text>
            <Text style={styles.tableCell}>
              {sales_invoice.invoice_date || 'N/A'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.boldText}>PO No. & Date</Text>
            <Text style={styles.tableCell}>{sales_invoice.po_no || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.boldText}>Payment Terms</Text>
            <Text style={styles.tableCell}>{`${
              sales_invoice.payment_term || ''
            } 30 days`}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.boldText}>Transport</Text>
            <Text style={styles.tableCell}>{`${
              sales_invoice.port_of_landing || ''
            } By Road`}</Text>
          </View>
        </View>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>S.No</Text>
        <Text style={styles.tableHeaderText}>Description</Text>
        <Text style={styles.tableHeaderText}>
          Qty
          {sales_invoice.lineItems.length > 0
            ? ` (${sales_invoice.lineItems[0].uom})`
            : ''}
        </Text>
        <Text style={styles.tableHeaderText}>Rate</Text>
        <Text style={styles.tableHeaderText}>
          Amount {foreign_currency ? '(USD)' : ''}
        </Text>
      </View>

      <FlatList
        data={sales_invoice.lineItems || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.boldText}>
            {foreign_currency ? '' : 'Sub Total:'}
          </Text>
          <Text style={styles.tableCell12}>
            {foreign_currency
              ? ''
              : sales_invoice.subtotal
              ? sales_invoice.subtotal.toLocaleString('en-IN')
              : 'N/A'}
          </Text>
        </View>

        {sales_invoice.sgst_total && sales_invoice.cgst_total ? (
          <>
            <View style={styles.summaryRow}>
              <Text style={styles.boldText}>
                SGST {sales_invoice.sgst_percentage}%
              </Text>
              <Text style={styles.tableCell12}>
                {foreign_currency
                  ? `$ ${sales_invoice.sgst_total.toLocaleString('en-US')}`
                  : sales_invoice.sgst_total.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.boldText}>
                CGST {sales_invoice.cgst_percentage}%
              </Text>
              <Text style={styles.tableCell12}>
                {foreign_currency
                  ? `$ ${sales_invoice.cgst_total.toLocaleString('en-US')}`
                  : sales_invoice.cgst_total.toLocaleString('en-IN')}
              </Text>
            </View>
          </>
        ) : null}

        {sales_invoice.igst_total > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.boldText}>
              IGST {sales_invoice.igst_percentage}%
            </Text>
            <Text style={styles.tableCell}>
              {foreign_currency
                ? `$ ${sales_invoice.igst_total.toLocaleString('en-US')}`
                : sales_invoice.igst_total.toLocaleString('en-IN')}
            </Text>
          </View>
        )}

        {sales_invoice.tds_amount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.boldText}>TCS {sales_invoice.tds}%</Text>
            <Text style={styles.tableCell}>
              {foreign_currency
                ? `$ ${sales_invoice.tds_amount.toLocaleString('en-US')}`
                : sales_invoice.tds_amount.toLocaleString('en-IN')}
            </Text>
          </View>
        )}

        {foreign_currency && (
          <View style={styles.summaryRow}>
            <Text style={styles.boldText}>Amt in Foreign Currency</Text>
            <Text style={styles.tableCell12}>
              {foreign_currency
                ? `$ ${
                    sales_invoice.total_foreign_currency
                      ? sales_invoice.total_foreign_currency.toLocaleString(
                          'en-US',
                        )
                      : total_usd
                  }`
                : ''}
            </Text>
          </View>
        )}

        <View style={styles.summaryRow}>
          <Text style={styles.boldText}>Total Amount in INR</Text>
          <Text style={styles.tableCell12}>
            {sales_invoice.total
              ? sales_invoice.total.toLocaleString('en-IN')
              : 'N/A'}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.boldText}>Total Amount in words-</Text>
        <Text style={styles.tableCell}>
          {sales_invoice.amount_words || 'N/A'}
        </Text>
      </View>

      <View style={styles.signatures}>
        {data?.sub_category === 'rental_invoice' ? (
          <View style={styles.additionalInfo}>
            <View>
              <Text style={styles.boldText}>Grossweight:</Text>
              <Text style={styles.boldText}>Net weight:</Text>
              <Text style={styles.boldText}>HSN Code:</Text>
            </View>
            <View>
              <Text style={styles.companyName}>
                {sales_invoice.company?.companyname || 'N/A'}
              </Text>
              <Text style={styles.companyName}>{'-SD-'}</Text>
              <Text style={styles.companyName}>Authorised Signature</Text>
            </View>
          </View>
        ) : (
          <View style={styles.signaturesContainer}>
            <View style={styles.signatureColumn}>
              <ReceiverSignature
                companyNameSignature={
                  sales_invoice.ship_to?.customer_name || 'N/A'
                }
              />
              <Text style={styles.signatureLabel}>Receiver’s Signature</Text>
            </View>
            <View style={styles.signatureColumn}>
              <Text style={styles.companyName}>
                For {sales_invoice.company?.companyname || 'N/A'}
              </Text>
              <AuthorisedSignature
                companyNameSignature={
                  sales_invoice.company?.companyname || 'N/A'
                }
              />
              <Text style={styles.signatureLabel}>Authorised Signature</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  col: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#808080',
  },
  billToDetails: {
    marginLeft: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 5,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#808080',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    // textAlign: '',
    color: '#808080',
  },
  tableCell12: {
    flex: 1,
    textAlign: 'right',
    color: '#808080',
  },
  summary: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  signatures: {
    marginTop: 20,
  },
  signaturesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  signatureColumn: {
    flex: 1,
    alignItems: 'center',
    color: '#808080',
  },
  companyName: {
    textAlign: 'center',
    marginBottom: 5,
  },
  signatureLabel: {
    marginTop: 10,
    color: '#808080',
  },
  additionalInfo: {
    marginTop: 20,
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
  },
});

export default ExportInvoice;
