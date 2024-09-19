/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';

const AdvancePayments = ({invoice_data}) => {
  const invoice = invoice_data.invoice;

  if (!invoice || !invoice.company) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: `https://skillcdn.storage.googleapis.com/${invoice.company.logo}`,
            }}
            style={styles.logo}
          />
        </View>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{invoice.company.companyname}</Text>
          <Text style={styles.companyAddress}>{invoice.company.address_1}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>GSTIN</Text>
          <Text style={styles.infoValue}>{invoice.gstin}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>PAN</Text>
          <Text style={styles.infoValue}>{invoice.pan}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>IEC No</Text>
          <Text style={styles.infoValue}>{invoice.invoice_no}</Text>
        </View>
      </View>

      <View style={styles.proformaContainer}>
        <Text style={styles.proformaText}>Proforma Invoice</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.billToContainer}>
          <Text style={styles.label}>Bill to:</Text>
          <Text style={styles.infoValue}>{invoice.bill_to.companyname}</Text>
        </View>
        <View style={styles.invoiceDetailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Proforma No</Text>
            <Text style={styles.infoValue}>{invoice.invoice_no}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Proforma Date</Text>
            <Text style={styles.infoValue}>{invoice.invoice_date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>PO No. & Date</Text>
            <Text style={styles.infoValue}>{invoice.invoice_no}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Terms</Text>
            <Text style={styles.infoValue}>:</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Port of Landing</Text>
            <Text style={styles.infoValue}>:</Text>
          </View>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <FlatList
          data={invoice.lineItems}
          renderItem={({item, index}) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{item.description}</Text>
              <Text style={styles.tableCell}>{item.qty}</Text>
              <Text style={styles.tableCell}>{item.rate}</Text>
              <Text style={styles.tableCell}>
                {new Intl.NumberFormat('en-IN').format(item.amount)}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>S.No</Text>
              <Text style={styles.headerCell}>Description</Text>
              <Text style={styles.headerCell}>Qty</Text>
              <Text style={styles.headerCell}>Rate</Text>
              <Text style={styles.headerCell}>Amt</Text>
            </View>
          }
        />
        <View style={styles.summaryRow}>
          <View style={styles.emptyCell} />
          <Text style={styles.totalLabel}>Total Amount :</Text>
          <Text style={styles.totalValue}>
            {new Intl.NumberFormat('en-IN').format(invoice.subtotal)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>CGST</Text>
          <Text style={styles.totalValue}>
            {new Intl.NumberFormat('en-IN').format(invoice.cgst_total)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>SGST</Text>
          <Text style={styles.totalValue}>
            {new Intl.NumberFormat('en-IN').format(invoice.sgst_total)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>
            {new Intl.NumberFormat('en-IN').format(invoice.total)}
          </Text>
        </View>
      </View>

      <View style={styles.amountWordsContainer}>
        <Text style={styles.label}>Total Amount in words-</Text>
        <Text style={styles.infoValue}>{invoice.amount_words}</Text>
      </View>

      <View style={styles.bankDetailsContainer}>
        <View style={styles.bankDetailRow}>
          <Text style={styles.bankLabel}>Name of the Bank:</Text>
          <Text style={styles.infoValue}>{invoice.company.bank_name}</Text>
        </View>
        <View style={styles.bankDetailRow}>
          <Text style={styles.bankLabel}>Account No:</Text>
          <Text style={styles.infoValue}>{invoice.company.account_no}</Text>
        </View>
        <View style={styles.bankDetailRow}>
          <Text style={styles.bankLabel}>IFSC Code:</Text>
          <Text style={styles.infoValue}>{invoice.company.ifsc_code}</Text>
        </View>
      </View>

      <View style={styles.signatureContainer}>
        <Text style={styles.signatureText}>METRO STEEL & METALLOYS</Text>
        <Text style={styles.signatureSubText}>-SD-</Text>
        <Text style={styles.signatureText}>Authorised Signature</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EFEFEF',
    width: 600,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  logoContainer: {
    width: '30%',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  companyInfo: {
    width: '70%',
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#808080',
  },
  companyAddress: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#808080',
  },
  infoContainer: {
    marginBottom: 16,
    color: '#808080',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: '40%',
    fontWeight: 'bold',
    color: '#808080',
  },
  infoValue: {
    width: '60%',
    color: '#808080',
  },
  proformaContainer: {
    backgroundColor: '#25B7D3',
    padding: 10,
    marginBottom: 16,
  },
  proformaText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  billToContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 8,
  },
  invoiceDetailsContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: '60%',
    fontWeight: 'bold',
    color: '#808080',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#808080',
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    color: '#808080',
  },
  summaryRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'grey',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  emptyCell: {
    flex: 1,
  },
  totalLabel: {
    flex: 2,
    fontWeight: 'bold',
    color: '#808080',
  },
  totalValue: {
    flex: 1,
    textAlign: 'right',
    color: '#808080',
  },
  amountWordsContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    color: '#808080',
  },
  bankDetailsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
  },
  bankDetailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bankLabel: {
    width: '50%',
    fontWeight: 'bold',
    color: '#808080',
  },
  signatureContainer: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 22,
  },
  signatureText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#808080',
  },
  signatureSubText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#808080',
  },
});

export default AdvancePayments;
