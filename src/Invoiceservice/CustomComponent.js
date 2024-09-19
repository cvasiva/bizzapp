/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const CustomComponent = ({invoice_data}) => {
  const sub_category = invoice_data?.sub_category;
  const vendor_payments = invoice_data;
  const templateData = invoice_data;
  return (
    <ScrollView style={styles.container}>
      {sub_category && (
        <View style={styles.mainContainer}>
          <View style={styles.sidebar}>
            <View style={styles.sidebarSection}>
              <TouchableOpacity style={styles.sidebarItem}>
                {/* <Icon name="inbox" size={24} color="#fff" /> */}
                <Text style={styles.sidebarText}>Inbox</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarItem}>
                {/* <Icon name="star" size={24} color="#fff" /> */}
                <Text style={styles.sidebarText}>Starred</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarItem}>
                {/* <Icon name="access-time" size={24} color="#fff" /> */}
                <Text style={styles.sidebarText}>Snoozed</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarItem}>
                {/* <Icon name="label-important" size={24} color="#fff" /> */}
                <Text style={styles.sidebarText}>Important</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarItem}>
                {/* <Icon name="send" size={24} color="#fff" /> */}
                <Text style={styles.sidebarText}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarItem}>
                {/* <Icon name="drafts" size={24} color="#fff" /> */}
                <Text style={styles.sidebarText}>Draft</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarItem}>
                {/* <Icon name="label" size={24} color="#fff" /> */}
                <Text style={styles.sidebarText}>Category</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sidebarSection}>
              <Text style={styles.sectionTitle}>Meet</Text>
              <TouchableOpacity style={styles.sidebarItem}>
                {/* <Icon name="videocam" size={24} color="#fff" /> */}
                <Text style={styles.sidebarText}>New Meeting</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sidebarItem}>
                {/* <Icon name="keyboard" size={24} color="#fff" /> */}
                <Text style={styles.sidebarText}>Join Meeting</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.emailHeader}>
              <Text style={styles.emailSubject}>{vendor_payments.subject}</Text>
              <View style={styles.emailDetails}>
                <View style={styles.senderInfo}>
                  <View style={styles.senderInitials}>
                    <Text style={styles.initialsText}>D</Text>
                  </View>
                  <View style={styles.senderDetails}>
                    <Text style={styles.senderName}>
                      Morya Industry Pvt. Ltd
                    </Text>
                    <Text style={styles.emailSummary}>
                      to Ashish, finance at &lt;Logistic at
                      moryaindustry.com&gt;
                    </Text>
                    <Text style={styles.emailDate}>Jan 20, 2022, 08:35</Text>
                  </View>
                </View>
              </View>
            </View>

            {sub_category && templateData && templateData.supplier && (
              <View style={styles.emailBody}>
                <Text style={styles.paymentText}>Dear Finance Team,</Text>
                <Text style={styles.paymentText}>Please Process below vendor payment today.</Text>
                <View style={styles.paymentDetails}>
                  <Text style={styles.paymentText}>
                    Name of the supplier: {vendor_payments.supplier.companyname}
                  </Text>
                  <Text style={styles.paymentText}>
                    Amount: {vendor_payments.amount}
                  </Text>
                </View>
                <Text style={styles.regards}>Thanks and Regards,</Text>
                <Text style={styles.signature}>Sagar P</Text>
                <Text style={styles.signature}>CEO and Director.</Text>
              </View>
            )}

            <View style={styles.emailBody}>
              <Text style={styles.paymentText}>Dear Finance Team,</Text>
              <Text style={styles.paymentText}>Please Process below vendor payment today.</Text>
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentText}>
                  Name of the supplier: XXXXX
                </Text>
                <Text style={styles.paymentText}>Amount: XXXXX</Text>
              </View>
              <Text style={styles.regards}>Thanks and Regards,</Text>
              <Text style={styles.signature}>Sagar P</Text>
              <Text style={styles.signature}>CEO and Director.</Text>
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.paymentText}>Reply</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.paymentText}>Reply All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.paymentText}>Forward</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainContainer: {
    flexDirection: 'row',
    height: '100%',
    width:600,
  },
  sidebar: {
    backgroundColor: '#36268c',
    width: '30%',
    padding: 10,
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    color:'#808080',
  },
  sidebarText: {
    color: '#fff',
    marginLeft: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  emailHeader: {
    marginBottom: 10,
  },
  emailSubject: {
    fontSize: 13,
    fontWeight: 'bold',
    color:'#808080',
  },
  emailDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderInitials: {
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  initialsText: {
    color: '#fff',
  },
  senderDetails: {
    flex: 1,
  },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
    color:'#808080',
  },
  emailSummary: {
    color: 'gray',
    fontSize: 10,
  },
  emailDate: {
    color: 'gray',
    fontSize: 10,
    textAlign: 'right',
  },
  emailBody: {
    marginBottom: 20,
    color:'#808080',
  },
  paymentDetails: {
    marginBottom: 20,
  },
  paymentText: {
    color: 'gray',
    fontSize: 14,
  },
  regards: {
    marginTop: 20,
    fontSize: 14,
    color:'#808080',

  },
  signature: {
    fontSize: 14,
    color:'#808080',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color:'#808080',
  },
});

export default CustomComponent;
