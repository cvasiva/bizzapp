/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CompanyDetail2 from '../Invoiceservice/CompanyDetail2';

const ShareCapital = ({invoice_data}) => {
  const [templateData, setTemplateData] = useState(invoice_data);

  const renderCompany = templateData => {
    const uan = templateData.employee;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.certContainer}>
          <View style={styles.certContent}>
            <Text style={styles.certTitle}>SHARE CERTIFICATE</Text>
            <View style={styles.divider} />
            <CompanyDetail2 company={templateData.usercompany} />
            <View>
              <Text style={styles.text}>
                THIS IS TO CERTIFY that the person(s) named in this Certificate
                is/are the Registered Holder(s) of the within-mentioned share(s)
                bearing the distinctive number(s) here in specified in the above
                Company subject to the Memorandum and Articles of Association of
                the Company and that the amount endorsed here on has been paid
                up on each such share.
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>CIN NO: </Text>
              <Text style={styles.infoValue}>{uan && uan.uan}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>EQUITY SHARES EACH OF RUPEES</Text>
              <Text style={styles.infoValue}>
                -/
                {new Intl.NumberFormat('en-IN').format(
                  templateData?.company_share?.share_value || 0,
                )}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Total Amount Paid for the Shares
              </Text>
              <Text style={styles.infoValue}>
                -/{new Intl.NumberFormat('en-IN').format(templateData.amount)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Reg. Folio No</Text>
              <Text style={styles.infoValue}>
                {templateData.company_share.folio_nos}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Certificate No</Text>
              <Text style={styles.infoValue}>
                {templateData.company_share.certificate_no}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name(s) of Holder(s)</Text>
              <Text style={styles.infoValue}>
                {templateData.employee.employee_name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>No. of Share(s) held</Text>
              <Text style={styles.infoValue}>
                {templateData.company_share.no_of_shares}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Distinctive No.</Text>
              <Text style={styles.infoValue}>
                From:{' '}
                {new Intl.NumberFormat('en-IN').format(
                  templateData.company_share.distintive_nos[0],
                )}
              </Text>
              <Text style={styles.infoValue}>
                To:{' '}
                {new Intl.NumberFormat('en-IN').format(
                  templateData.company_share.distintive_nos[1],
                )}
              </Text>
            </View>
            <Text style={styles.footerText}>
              Given under the Common Seal of the Company this{' '}
              {templateData.voucher_date}
            </Text>
            <View style={styles.signature}>
              <Text style={styles.signatureText}>-SD-</Text>
              <Text style={styles.signatureText}>Director</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <>
      {templateData && templateData.usercompany && renderCompany(templateData)}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 11,
    textAlign: 'center',
    color: '#808080',
  },
  container: {
    flexGrow: 1,
    padding: 10,
    width: 600,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#8b2bf9', // Radial gradient equivalent
    paddingVertical: 10,
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    color: '#808080',
  },
  buttonActive: {
    backgroundColor: '#f8c300',
  },
  buttonInactive: {
    backgroundColor: '#ffffff',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  emptySpace: {
    flex: 2,
  },
  video: {
    width: 100,
    height: 60,
  },
  theory: {
    fontSize: 12,
    color: '#000',
  },
  certContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
  },
  certContent: {
    width: '100%',
    backgroundColor: '#DFF4FF',
    borderWidth: 4,
    borderColor: '#0076BD',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  certTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0076BD',
    marginBottom: 5,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#0076BD',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 5,
  },
  infoLabel: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
  },
  infoValue: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'normal',
    color: '#000',
  },
  footerText: {
    fontSize: 11,
    textAlign: 'center',
    color: '#3E3E3E',
    marginVertical: 10,
  },
  signature: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  signatureText: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginHorizontal: 10,
  },
});

export default ShareCapital;
