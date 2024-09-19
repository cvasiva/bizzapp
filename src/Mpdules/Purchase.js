/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import UserContext from '../../context_provider/UserContext';
import Table from './Table'; // Adjust the import path as necessary

const Purchase = props => {
  const context = useContext(UserContext);
  const [rowData, setRowData] = useState(InitialRow());
  const [supplierInvoiceNo, setSupplierInvoiceNo] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [narration, setNarration] = useState('');

  useEffect(() => {
    setRowData(InitialRow());
  }, [context.billData]);

  const InitialRow = () => {
    return [
      {particulars: '', debit: '', credit: '', detail: '', particulars_id: ''},
    ];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{context.gridType}</Text>
        <Text style={styles.headerText}>Voucher Date: {invoiceDate}</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={supplierInvoiceNo}
          onChangeText={setSupplierInvoiceNo}
          placeholder="Invoice No"
        />
        <TextInput
          style={styles.input}
          value={invoiceDate}
          onChangeText={setInvoiceDate}
          placeholder="Invoice Date"
        />
        <TextInput
          style={styles.textarea}
          value={narration}
          onChangeText={setNarration}
          placeholder="Narration"
          multiline
        />
      </View>
      <Table data={rowData} onChange={setRowData} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.handleSave(false)}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 8,
    padding: 8,
  },
  textarea: {
    borderBottomWidth: 1,
    padding: 8,
    height: 80,
  },
  button: {
    backgroundColor: '#2A66B1',
    padding: 16,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Purchase;
