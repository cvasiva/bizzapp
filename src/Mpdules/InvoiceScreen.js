/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import ReceiverSignature from '../Invoice/ReceiverSignature';
import AuthorisedSignature from '../Invoice/AuthorisedSignature';

const InvoiceScreen = ({invoice_data}) => {
  const color = '#01b99d';
  const backgcolor = '#000';
  const invoice = invoice_data.invoice || {};
  const po = invoice_data.po || {};
  const bank_details = invoice_data.bank_details || {};
  const foreignCurrency = true;
  const formatted_amount = amount => {
    return `₹${new Intl.NumberFormat('en-IN').format(amount)}`;
  };
  const getTitle = () => {
    if (invoice_data?.sub_category === 'debit_note') {
      return 'DEBIT NOTE';
    } else {
      return 'TAX INVOICE';
    }
  };
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={[
              styles.header,
              {backgroundColor: color, color: backgcolor},
            ]}>
            <View style={styles.headerLeft}>
              <Text style={styles.greenText}>{getTitle()}</Text>
            </View>
            <View style={styles.headerRight}>
              <View style={styles.flexContainer}>
                <Image
                  style={styles.logo}
                  source={require('../Images/nisha_steel_n_alloys.png')}
                  resizeMode="contain"
                />
                <View style={styles.infoContainer}>
                  <Text style={[styles.boldText, {fontSize: 14}]}>
                    {(invoice.company && invoice.company?.companyname) || ''}
                  </Text>
                  <Text style={styles.boldText}>
                    {invoice.company?.address_1 || ''}
                  </Text>
                  <Text style={styles.boldText}>
                    PAN: {invoice.company?.pan || ''}
                  </Text>
                  <Text style={styles.boldText}>
                    {invoice.company?.city || ''},{' '}
                    {invoice.company?.state || ''} -{' '}
                    {invoice.company?.pin_code || ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.section, styles.margin]}>
            <View style={styles.sectionLeft}>
              <Text style={styles.boldText}>Bill To:</Text>
              <Text style={styles.invoiceFont}>
                <Text style={styles.boldText}>
                  {invoice.bill_to?.companyname || ''}
                </Text>{' '}
                {'\n'}# {invoice.bill_to?.address1 || ''}
                {invoice.bill_to?.address2 || ''}
                {invoice.bill_to?.city || ''} {invoice.bill_to?.pin || ''},{' '}
                {invoice.bill_to?.state || ''}
              </Text>
            </View>
            <View style={styles.sectionRight}>
              <View style={styles.detailRow}>
                <Text style={[styles.invoiceFont, styles.boldText]}>
                  Invoice No
                </Text>
                <Text style={[styles.invoiceFont, styles.detailText]}>
                  : {invoice.invoice_no || ''}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.invoiceFont, styles.boldText]}>
                  Invoice Date
                </Text>
                <Text style={[styles.invoiceFont, styles.detailText]}>
                  : {invoice.invoice_date || ''}
                </Text>
              </View>
              {/* <View style={styles.detailRow}>
                <Text style={[styles.invoiceFont, styles.boldText]}>PAN</Text>
                <Text style={[styles.invoiceFont, styles.detailText]}>
                  : {invoice.bill_to?.pan || ''}
                </Text>
              </View> */}
              <View style={styles.detailRow}>
                <Text style={[styles.invoiceFont, styles.boldText]}>
                  PO No.
                </Text>
                <Text style={[styles.invoiceFont, styles.detailText]}>
                  : {po.po_no || ''}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.invoiceFont, styles.boldText]}>
                  PO. Date
                </Text>
                <Text style={[styles.invoiceFont, styles.detailText]}>
                  : {po.po_date || ''}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.section, styles.margin]}>
            <View style={styles.tableContainer}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, styles.borderRight]}>
                  S.No
                </Text>
                <Text style={[styles.tableHeader, styles.borderRight]}>
                  Description
                </Text>
                <Text style={[styles.tableHeader, styles.borderRight]}>
                  Qty
                </Text>
                <Text style={[styles.tableHeader, styles.borderRight]}>
                  Rate
                </Text>
                <Text style={styles.tableHeader}>Amount</Text>
              </View>
              {invoice.lineItems?.map((item, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={[styles.tableCell, styles.borderRight]}>
                    {index + 1}
                  </Text>
                  <Text style={[styles.tableCell, styles.borderRight]}>
                    {item.description || ''}
                  </Text>
                  <Text style={[styles.tableCell, styles.borderRight]}>
                    {formatted_amount(item.qty || '')}
                  </Text>
                  <Text style={[styles.tableCell, styles.borderRight]}>
                    {formatted_amount(item.rate || '')}
                  </Text>
                  <Text style={styles.tableCell}>
                    {formatted_amount(item.amount || '')}
                  </Text>
                </View>
              )) || null}
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col7}>
              <Text>
                <Text style={styles.boldText}>Name of the Bank: </Text>
                {bank_details?.bank || 'N/A'}
              </Text>
            </View>
            <Text style={[styles.col3, styles.textcolore]}>Sub Total</Text>
            <Text style={[styles.col2, styles.textcolore]}>
              {invoice?.subtotal}
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.col7}>
              <Text>
                <Text style={styles.boldText}>Account No:</Text>{' '}
                {bank_details?.acc_no || 'N/A'}
              </Text>
            </View>
            {invoice.sgst_total > 0 && (
              <>
                <Text style={[styles.col3, styles.textcolore]}>
                  CGST {invoice?.cgst_percentage}%
                </Text>
                <Text style={[styles.col2, styles.textcolore]}>
                  {formatted_amount(invoice?.cgst_total)}
                </Text>
              </>
            )}
            {invoice.igst_total > 0 && (
              <>
                <Text style={[styles.col3, styles.textcolore]}>
                  IGST: {invoice?.igst_percentage}%
                </Text>
                <Text style={[styles.col2, styles.textcolore]}>
                  {formatted_amount(invoice?.igst_total)}
                </Text>
              </>
            )}
            {(invoice.igst_total > 0 ||
              invoice.sgst_total > 0 ||
              invoice.cgst_total > 0) && (
              <>
                {(invoice.freight || invoice.packing) && (
                  <>
                    {invoice.freight && (
                      <>
                        <Text style={[styles.col3, styles.textcolore]}>
                          Freight
                        </Text>
                        <Text style={[styles.col2, styles.textcolore]}>
                          {invoice.freight}
                        </Text>
                      </>
                    )}
                    {invoice.packing && (
                      <>
                        <Text style={[styles.col3, styles.textcolore]}>
                          Packing
                        </Text>
                        <Text style={[styles.col2, styles.textcolore]}>
                          {invoice.packing}
                        </Text>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </View>
          <View style={styles.row}>
            <View style={styles.col7}>
              <Text>
                <Text style={styles.boldText}>IFSC Code:</Text>{' '}
                {bank_details?.ifsc || 'N/A'}
              </Text>
            </View>
            {invoice.sgst_total > 0 && (
              <>
                <Text style={[styles.col3, styles.textcolore]}>
                  SGST {invoice?.sgst_percentage}%
                </Text>
                <Text style={[styles.col2, styles.textcolore]}>
                  {formatted_amount(invoice?.sgst_total)}
                </Text>
              </>
            )}
          </View>
          <View style={styles.row}>
            <View style={styles.col7}>
              <Text>
                <Text style={styles.boldText}>GSTIN:</Text>{' '}
                {invoice?.gstin || po?.company?.gst || 'N/A'}
              </Text>
            </View>
            <Text style={[styles.col3, styles.textcolore]} />
            <Text style={[styles.col2, styles.textcolore]} />
          </View>
          <View style={[styles.row, {backgroundColor: color}]}>
            <View style={styles.col7} />
            <Text style={[styles.col3, styles.textcolore]}>Total</Text>
            <Text style={[styles.col2, styles.textcolore]}>
              {formatted_amount(invoice?.total)}
            </Text>
          </View>
          <View>
            {invoice && invoice.company && (
              <ScrollView style={styles.container}>
                <View style={styles.tableContainer}>
                  {invoice.tds_amount != null && invoice.tds_amount > 0 && (
                    <>
                      <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, styles.boldText]}>
                          TDS
                        </Text>
                        <Text style={styles.tableCell}>
                          {new Intl.NumberFormat('en-IN').format(
                            invoice.tds_amount,
                          )}
                        </Text>
                      </View>
                      <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, styles.boldText]}>
                          Balance Payable
                        </Text>
                        <Text style={styles.tableCell}>
                          {new Intl.NumberFormat('en-IN').format(
                            invoice.total - invoice.tds_amount,
                          )}
                        </Text>
                      </View>
                    </>
                  )}
                  {invoice.total_inr != null && (
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableCell, styles.boldText]}>
                        TOTAL (INR)
                      </Text>
                      <Text style={styles.tableCell}>
                        {new Intl.NumberFormat('en-IN').format(
                          invoice.total_inr,
                        )}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Render conversion rate if foreignCurrency is present */}
                {foreignCurrency && (
                  <View style={styles.container12}>
                    <Text style={styles.boldText}>
                      Conversion Rate: (1 USD = {invoice.conversion_rate})
                    </Text>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
          <View style={[styles.section, styles.margin]}>
            <View style={styles.amountInWords}>
              <Text style={[styles.boldText, {fontSize: 16}]}>
                Total Amount in words-
              </Text>
              <Text>{invoice.amount_words || ''}</Text>
            </View>
          </View>

          <View style={[styles.section, styles.margin, styles.signatures]}>
            <View style={styles.signatureLeft}>
              <ReceiverSignature
                companyNameSignature={invoice.ship_to.companyname}
              />
              <Text style={[styles.boldText, {marginBottom: 10}]}>
                Receiver Signature
              </Text>
            </View>
            <View style={styles.signatureRight}>
              <AuthorisedSignature
                companyNameSignature={invoice.company.companyname}
              />
              <Text style={[styles.boldText, {marginBottom: 10}]}>
                Authorised Signature
              </Text>
            </View>
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
    </>
  );
};

const styles = StyleSheet.create({
  container12: {
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  box: {
    marginBottom: 5,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#808080',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 650,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingVertical: 10,
  },
  headerLeft: {
    flex: 5,
  },
  textcolore: {
    color: '#000',
  },
  headerRight: {
    flex: 7,
    flexDirection: 'column',
    alignItems: 'center',
  },
  greenText: {
    backgroundColor: '#063751',
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
    paddingHorizontal: 8,
    height: 80,
    marginTop: -10,
    borderBottomRightRadius: 80,
    paddingTop: 30,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 45,
    height: 45,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 8,
    color: '#fff',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  invoiceFont: {
    fontSize: 14,
    color: '#000',
  },
  section: {
    flexDirection: 'row',
    marginBottom: 10,
    color: '#000',
  },
  sectionLeft: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  sectionRight: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginLeft: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 10,
    color: '#000',
  },
  tableContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 8,
  },
  tableHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: 'gray',
  },
  margin: {
    marginHorizontal: 2,
    marginVertical: 2,
  },
  subtotal: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  taxes: {
    flex: 2,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
  },
  taxItem: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRightWidth: 1,
    borderRightColor: 'gray',
  },
  total: {
    flex: 2,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  amountInWords: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    flex: 1,
    flexDirection: 'row',
    gap: 20,
  },
  signatures: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signatureLeft: {
    flex: 1,
    alignItems: 'center',
  },
  signatureRight: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 650,
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
});

export default InvoiceScreen;
