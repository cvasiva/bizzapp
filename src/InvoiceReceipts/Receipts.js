/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import ReceiverSignature from '../Invoice/ReceiverSignature';
// import AuthorisedSignature from '../Invoice/AuthorisedSignature';

const Receipts = ({invoice_data}) => {
  const templateData = invoice_data;

  const renderReceiptInfo = () => {
    return (
      <View style={styles.receiptContainer}>
        {templateData && (
          <View>
            <View style={styles.receiptHeader}>
              <Text style={styles.receiptTitle}>RECEIPT</Text>
            </View>

            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>
                {templateData.company?.companyname}
              </Text>
              <Text style={styles.companyAddress}>
                {templateData.supplier?.address_1}
              </Text>
            </View>

            <View style={styles.receiptDetails}>
              <View style={styles.receiptDetailLeft}>
                <Text style={styles.boldText}>
                  Received From:{' '}
                  <Text>{templateData.supplier?.customer_name}</Text>
                </Text>
                <Text>
                  <Text style={styles.boldText}>Address: </Text>
                  {templateData.supplier?.address_1}
                </Text>
              </View>
              <View style={styles.receiptDetailRight}>
                <Text style={styles.boldText}>
                  Receipt No: {templateData.reciept_no}
                </Text>
                <Text style={styles.boldText}>
                  Receipt Date: {templateData.reciept_date}
                </Text>
                {templateData.payment_details &&
                  templateData.payment_details.length > 0 &&
                  templateData.payment_details.map((templateDataVal, index) => (
                    <Text key={index} style={styles.boldText}>
                      Cash / Cheque / Online No:{' '}
                      {templateDataVal.mode_of_payment}
                    </Text>
                  ))}
                <Text style={styles.boldText}>
                  Bank: {templateData.supplier?.bank_name}
                </Text>
              </View>
            </View>

            <FlatList
              data={templateData.payment_details}
              renderItem={({item, index}) => (
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{index + 1}</Text>
                  <Text style={styles.tableCell}>{item.instrument_no}</Text>
                  <Text style={styles.tableCell}>{item.instrument_date}</Text>
                  <Text style={styles.tableCell}>
                    {new Intl.NumberFormat('en-IN').format(item.amount)}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => (
                <View style={styles.tableHeader}>
                  <Text style={styles.tableCell}>Sr No.</Text>
                  <Text style={styles.tableCell}>Invoice No.</Text>
                  <Text style={styles.tableCell}>Invoice Date</Text>
                  <Text style={styles.tableCell}>Invoice Amount</Text>
                </View>
              )}
            />

            <View style={styles.amountInWords}>
              <Text style={styles.boldText}>Amount In Words:</Text>
              {templateData.payment_details &&
                templateData.payment_details.map((item, index) => (
                  <Text key={index} style={styles.amountWords}>
                    {item.amount_words}
                  </Text>
                ))}
            </View>

            <View style={styles.signaturesContainer}>
              <View style={styles.signature}>
                {templateData.supplier &&
                  templateData.supplier.customer_name && (
                    <ReceiverSignature
                      companyNameSignature={
                        templateData.supplier?.customer_name
                      }
                    />
                  )}
                <Text style={styles.signatureText}>Receiver’s Signature</Text>
              </View>

              {/* <View style={styles.stamp}>
                <Stamp company={templateData.company?.companyname} />
              </View> */}

              <View style={styles.authorisedSignature}>
                <Text style={styles.authorisedText}>
                  For {templateData.company?.companyname}
                </Text>
                <ReceiverSignature
                  companyNameSignature={templateData.company?.companyname}
                />
                <Text style={styles.signatureText}>Authorised Signature</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {templateData && renderReceiptInfo()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 600,
  },
  receiptContainer: {
    marginBottom: -16,
  },
  receiptHeader: {
    backgroundColor: '#00ff00',
    alignItems: 'center',
    paddingVertical: 5,
  },
  receiptTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  companyInfo: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  companyName: {
    color: 'black',
    fontWeight: 'bold',
  },
  companyAddress: {
    color: 'black',
  },
  receiptDetails: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: 'black',
  },
  receiptDetailLeft: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: 'black',
    paddingLeft: 20,
  },
  receiptDetailRight: {
    flex: 1,
    paddingLeft: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#808080',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#15ed15',
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'space-around',
  },
  tableRow: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'space-around',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    paddingVertical: 8,
  },
  amountInWords: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  amountWords: {
    marginLeft: 10,
    color: '#808080',
  },
  signaturesContainer: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
  signature: {
    flex: 1,
    alignItems: 'center',
    color: '#808080',
  },
  stamp: {
    flex: 1,
    alignItems: 'center',
  },
  authorisedSignature: {
    flex: 2,
    alignItems: 'center',
    color: '#808080',
  },
  authorisedText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#808080',
  },
  signatureText: {
    marginTop: -10,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Receipts;
