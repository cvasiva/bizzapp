/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import ReceiverSignature from '../Invoice/ReceiverSignature';
import AuthorisedSignature from '../Invoice/AuthorisedSignature';

const Grn = ({invoice_data}) => {
  const po = invoice_data.po || {};
  const invoice = invoice_data.invoice || {};

  const color = '#01b99d';
  const backgcolor = '#000';

  const foreign_currency = false;
  const random = () => Math.floor(Math.random() * 1000).toString();
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.column}>
        <View style={styles.startSection}>
          <View style={styles.row}>
            <View style={[styles.colorBox, styles.greenColor2]}></View>
            <View style={[styles.colorBox, styles.greenColor3]}></View>
            <View style={styles.flex8}>
              <Text style={styles.bold}>{invoice?.company?.companyname}</Text>
              <Text style={styles.textcolore}>
                {invoice?.company?.address_1} {invoice?.company?.city},
              </Text>
              <Text style={styles.textcolore}>
                {invoice?.company?.state} - {invoice?.company?.pin_code}
              </Text>
            </View>
            <Image
              style={styles.logo}
              source={require('../Images/nisha_steel_n_alloys.png')}
              resizeMode="contain"
            />
            <View style={[styles.flex4, styles.greenColor1]}></View>
          </View>
        </View>

        <View style={styles.flex1}>
          <View style={[styles.row, styles.centerText]}>
            <Text style={styles.headerText}>GOODS RECEIPT NOTE</Text>
          </View>
          <View style={[styles.section, styles.margin]}>
            <View style={styles.sectionLeft}>
              <Text style={styles.boldText}>Bill To:</Text>
              <Text
                style={
                  styles.textcolore
                }>{`${invoice.company.companyname} ${invoice.company.address_1} ${invoice.company.city} ${invoice.company.pin_code}, ${invoice.company.state}`}</Text>
            </View>
            <View style={styles.sectionRight}>
              <View style={styles.detailRow}>
                <Text style={[styles.invoiceFont, styles.boldText]}>
                  GRN No.
                </Text>
                <Text style={[styles.invoiceFont, styles.detailText]}>
                  : {random()}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.invoiceFont, styles.boldText]}>
                  GRN Date
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
                  Invoice No.
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
            </View>
          </View>

          <View style={styles.emptyRow}></View>

          <View style={styles.row}>
            <View style={styles.flex1}>
              <Text style={styles.bold}>SL</Text>
            </View>
            <View style={styles.flex5}>
              <Text style={styles.bold}>Product Details</Text>
            </View>
            <View style={styles.flex1}>
              <Text style={[styles.bold, styles.centerText]}>Rec.Qty</Text>
            </View>
            <View style={styles.flex2}>
              <Text style={[styles.bold, styles.centerText]}>Acc.Qty</Text>
            </View>
            <View style={styles.flex1}>
              <Text style={[styles.bold, styles.centerText]}>Rate</Text>
            </View>
            <View style={styles.flex2}>
              <Text style={[styles.bold, styles.endText]}>
                Amt In {foreign_currency ? 'USD' : 'INR'}
              </Text>
            </View>
          </View>

          {invoice.lineItems.map((item, i) => (
            <View style={[styles.row, styles.borderBottom]} key={i}>
              <View style={styles.flex1}>
                <Text style={styles.textcolore}>{i + 1}</Text>
              </View>
              <View style={styles.flex5}>
                <Text style={styles.textcolore}>{item.description}</Text>
              </View>
              <View style={[styles.flex1, styles.centerText]}>
                <Text style={styles.textcolore}>{item.qty}</Text>
              </View>
              <View style={[styles.flex2, styles.centerText]}>
                <Text style={styles.textcolore}>{item.qty}</Text>
              </View>
              <View style={[styles.flex2, styles.centerText]}>
                <Text style={styles.textcolore}>
                  {new Intl.NumberFormat('en-IN').format(item.rate)}
                </Text>
              </View>
              <View style={[styles.flex1, styles.endText]}>
                <Text style={styles.textcolore}>
                  {foreign_currency ? '$' : ''}
                  {new Intl.NumberFormat('en-IN').format(item.amount)}
                </Text>
              </View>
            </View>
          ))}

          <View style={styles.row}>
            <View style={styles.flex8}></View>
            {invoice.sgst_total > 0 && invoice.cgst_total > 0 && (
              <>
                <View style={[styles.flex2, styles.bold, styles.centerText]}>
                  <Text style={styles.textcolore}>Sub Total</Text>
                  <Text style={styles.textcolore}>
                    CGST: {invoice.cgst_percentage}%
                  </Text>
                  <Text style={styles.textcolore}>
                    SGST: {invoice.sgst_percentage}%
                  </Text>
                </View>
                <View style={styles.flex1}></View>
                <View style={styles.flex2}>
                  <Text style={[styles.endText, styles.textcolore]}>
                    {new Intl.NumberFormat('en-IN').format(invoice.subtotal)}
                  </Text>
                  <Text style={[styles.endText, styles.textcolore]}>
                    {new Intl.NumberFormat('en-IN').format(invoice.cgst_total)}
                  </Text>
                  <Text style={[styles.endText, styles.textcolore]}>
                    {new Intl.NumberFormat('en-IN').format(invoice.sgst_total)}
                  </Text>
                </View>
                {/* <View style={styles.flex1}></View> */}
              </>
            )}
            {invoice.igst_total > 0 && (
              <>
                <View style={[styles.flex2, styles.bold, styles.centerText]}>
                  <Text>Sub Total</Text>
                  <Text>IGST: {invoice.igst_percentage}%</Text>
                </View>
                <View style={styles.flex1}></View>
                <View style={styles.flex2}>
                  <Text style={styles.endText}>
                    {new Intl.NumberFormat('en-IN').format(invoice.subtotal)}
                  </Text>
                  <Text style={styles.endText}>
                    {new Intl.NumberFormat('en-IN').format(invoice.igst_total)}
                  </Text>
                </View>
                <View style={styles.flex1}></View>
              </>
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.flex8}></View>
            <View style={[styles.flex2, styles.centerText, styles.bold]}>
              <Text style={styles.textcolore}>TOTAL</Text>
            </View>
            <View style={styles.flex1}></View>
            <View style={styles.flex2}>
              <Text style={[styles.endText, styles.bold]}>
                {foreign_currency
                  ? `$${new Intl.NumberFormat('en-IN').format(po.total)}`
                  : new Intl.NumberFormat('en-IN').format(po.total)}
              </Text>
            </View>
            {/* <View style={styles.flex1}></View> */}
          </View>

          <View style={styles.row}>
            <View style={styles.flex3}>
              <Text style={[styles.bold, styles.textNoWrap]}>
                Total Amount in words
              </Text>
            </View>
            <View style={styles.flex9}>
              <Text style={styles.textcolore}>{po.amount_words}</Text>
            </View>
          </View>

          <View style={[styles.row, styles.border, styles.borderDark]}>
            <View style={styles.flex4}>
              <View style={styles.receiverSignature}>
                <ReceiverSignature
                  companyNameSignature={po.supplier.companyname}
                />
                <Text style={[styles.bold, styles.marginTopNegative]}>
                  Receiver’s Signature
                </Text>
              </View>
            </View>
            <View style={styles.flex3}></View>
            <View style={styles.flex5}>
              <View style={styles.authorizedSignature}>
                <Text style={[styles.bold, styles.centerText]}>
                  For {po.company.companyname}
                </Text>
                <AuthorisedSignature
                  companyNameSignature={po.company.companyname}
                />
                <Text
                  style={[
                    styles.bold,
                    styles.centerText,
                    styles.marginTopNegative,
                  ]}>
                  Authorised Signature
                </Text>
              </View>
            </View>
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
  );
};

const styles = StyleSheet.create({
  textcolore: {
    color: '#000',
  },
  invoiceFont: {
    fontSize: 14,
    color: '#000',
  },
  textcolorewhit: {
    color: '#fff',
    fontWeight: '600',
  },
  column: {
    flexDirection: 'column',
    height: '100%',
    width: 600,
  },
  boldText: {
    fontWeight: 'bold',
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
  startSection: {
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  flex6: {
    flex: 6,
  },
  flex7: {
    flex: 7,
  },
  flex8: {
    flex: 8,
  },
  flex9: {
    flex: 9,
  },
  flex12: {
    flex: 12,
  },
  centerText: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  endText: {
    textAlign: 'right',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  border: {
    borderWidth: 1,
  },
  borderDark: {
    borderColor: '#000',
  },
  bgDark: {
    backgroundColor: '#000',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  textNoWrap: {
    whiteSpace: 'nowrap',
  },
  receiverSignature: {
    position: 'absolute',
    bottom: 0,
  },
  authorizedSignature: {
    marginLeft: '-0.6rem',
    marginRight: '0px',
    marginTop: '-0.8rem',
  },
  marginTopNegative: {
    marginTop: '-0.8rem',
  },
  footer: {
    height: 40,
    backgroundColor: '#000',
  },
  footerBg: {
    backgroundColor: '#000',
  },
  emptyRow: {
    height: 10,
  },
  greenColor1: {
    backgroundColor: '#01a19b',
  },
  greenColor2: {
    backgroundColor: '#01a19b',
  },
  greenColor3: {
    backgroundColor: '#01a19b',
  },
});

export default Grn;
