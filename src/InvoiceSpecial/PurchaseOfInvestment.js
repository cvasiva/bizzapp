/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

const PurchaseOfInvestment = ({invoice_data}) => {
  const sales_of_investments = invoice_data;

  return (
    <>
      {sales_of_investments && (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.companyDetails}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/en/5/58/State_Bank_of_India_logo.svg',
                }}
                style={styles.logo}
              />
              <View style={styles.companyInfo}>
                <Text style={styles.companyName}>
                  {sales_of_investments.company_details.name}
                </Text>
                <Text style={styles.cell1}>{sales_of_investments.company_details.address}</Text>
              </View>
            </View>

            <View style={styles.details}>
              <Text style={styles.centerText}>
                <Text style={styles.boldText}>DP ID: </Text>
                {sales_of_investments.shareholder_details.dp_id}
              </Text>
              <Text style={styles.centerText}>
                <Text style={styles.boldText}>
                  DP Transaction / Holding Statement
                </Text>
              </Text>
            </View>

            <View style={styles.tableContainer}>
              <View style={styles.row}>
                <Text style={styles.cell}>DP ID</Text>
                <Text style={styles.cell}>
                  {sales_of_investments.shareholder_details?.dp_id}
                </Text>
                <Text style={styles.cell}>PAN</Text>
                <Text style={styles.cell}>
                  {sales_of_investments.shareholder_details?.pan}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.cell}>Name</Text>
                <Text style={styles.cell}>
                  {sales_of_investments.usercompany.companyname}
                </Text>
                <Text style={styles.cell}>Contact Number</Text>
                <Text style={styles.cell}>
                  {sales_of_investments.shareholder_details?.contact_no}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.cell} rowSpan={2}>
                  Address
                </Text>
                <Text style={styles.cell} rowSpan={2}>
                  {sales_of_investments.usercompany.address1}
                </Text>
                <Text style={styles.cell}>Status</Text>
                <Text style={styles.cell}>
                  {sales_of_investments.shareholder_details?.status}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.cell}>Category</Text>
                <Text style={styles.cell}>
                  {sales_of_investments.shareholder_details?.category}
                </Text>
              </View>
            </View>

            <Text style={styles.centerText}>
              <Text style={styles.boldText}>Transaction Details</Text>
            </Text>

            <View style={styles.tableContainer}>
              <View style={styles.row}>
                <Text style={styles.cell}>Date</Text>
                <Text style={styles.cell}>Reference No</Text>
                <Text style={styles.cell}>Transaction Description</Text>
                <Text style={styles.cell}>Buy/Cr</Text>
                <Text style={styles.cell}>Sell/Dr</Text>
                <Text style={styles.cell}>Rate</Text>
                <Text style={styles.cell}>Amount</Text>
              </View>

              {sales_of_investments.transaction_details.transaction_data.map(
                (list, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.cell}>{list.date}</Text>
                    <Text style={styles.cell}>{list.refrence_no}</Text>
                    <Text style={styles.cell}>
                      {list.transaction_description}
                    </Text>
                    <Text style={styles.cell}>{list.buy}</Text>
                    <Text style={styles.cell}>{list.sell}</Text>
                    <Text style={styles.cell}>{list.rate}</Text>
                    <Text style={styles.cell}>
                      {new Intl.NumberFormat('en-IN').format(list.amount)}
                    </Text>
                  </View>
                ),
              )}

              <View style={styles.row}>
                <Text style={styles.totalCell} colSpan={6}>
                  Total
                </Text>
                <Text style={styles.totalCell}>
                  {new Intl.NumberFormat('en-IN').format(
                    sales_of_investments.amount,
                  )}
                </Text>
              </View>
            </View>

            <Text style={styles.centerText}>System Generated Report</Text>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cell1:{
    color:'#808080',
  },
  header: {
    flexDirection: 'row',
    backgroundColor:
      'radial-gradient(84% 84% at 0% 16%, #897FFF 0%, #5243FF 100%)',
    paddingVertical: 8,
  },
  headerButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 2,
    borderColor: 'black',
    borderWidth: 1,
    width:600,
  },
  companyDetails: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  companyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  companyName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#808080',
  },
  details: {
    paddingVertical: 8,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#808080',
  },
  centerText: {
    textAlign: 'center',
    marginVertical: 4,
    color: '#808080',
  },
  tableContainer: {
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    borderColor: 'black',
    borderBottomWidth: 1,
    padding: 4,
  },
  cell: {
    flex: 1,
    borderColor: 'black',
    borderRightWidth: 1,
    padding: 4,
    textAlign: 'center',
    color: '#808080',
  },
  totalCell: {
    flex: 1,
    padding: 4,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#808080',
  },
});

export default PurchaseOfInvestment;
