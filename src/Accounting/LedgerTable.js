/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';

const LedgerTable = ({
  data,
  onSupplierNameChange,
  onSupplierDateChange,
  onCellChange,
}) => {
  const [rowData, setRowData] = useState([]);
  const [cTotal, setCTotal] = useState(0);
  const [dTotal, setDTotal] = useState(0);
  const [supplierInvoiceNo, setSupplierInvoiceNo] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [narration, setNarration] = useState('');

  useEffect(() => {
    if (data && data.ledgers) {
      const rows = data.ledgers.map(p => ({
        particulars: p.name,
        debit: p.type === 'BY' ? p.amount : '',
        credit: p.type === 'TO' ? p.amount : '',
        detail: p.type === 'TO' ? 'To' : 'By',
        particulars_id: p.id,
      }));
      setRowData(rows);
      calculateTotals(rows);
    }
  }, [data]);

  const calculateTotals = rows => {
    let dTotal1 = 0;
    let cTotal1 = 0;
    rows.forEach(p => {
      if (p.debit !== '') dTotal1 += Number(p.debit);
      if (p.credit !== '') cTotal1 += Number(p.credit);
    });
    setCTotal(cTotal1);
    setDTotal(dTotal1);
  };

  const handleCellChange = (index, field, value) => {
    const updatedRowData = [...rowData];
    updatedRowData[index][field] = value;
    setRowData(updatedRowData);
    calculateTotals(updatedRowData);
    onCellChange(updatedRowData);
  };

  const handleSupplierInvoiceNoChange = text => {
    setSupplierInvoiceNo(text);
    onSupplierNameChange(text);
  };

  const handleInvoiceDateChange = text => {
    setInvoiceDate(text);
    onSupplierDateChange(text);
  };

  const handleNarrationChange = text => {
    setNarration(text);
  };

  const tableHead = ['Particulars', 'Debit', 'Credit', 'Detail'];
  const tableData = rowData.map(row => [
    row.particulars,
    row.debit,
    row.credit,
    row.detail,
  ]);

  return (
    <View style={styles.container}>
      <Table borderStyle={styles.tableBorder}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        <Rows data={tableData} textStyle={styles.text} />
      </Table>
      <TextInput
        style={styles.input}
        placeholder="Supplier Invoice No"
        value={supplierInvoiceNo}
        onChangeText={handleSupplierInvoiceNoChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Invoice Date"
        value={invoiceDate}
        onChangeText={handleInvoiceDateChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Narration"
        value={narration}
        onChangeText={handleNarrationChange}
      />
      <Text>Total Debit: {dTotal}</Text>
      <Text>Total Credit: {cTotal}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16},
  tableBorder: {borderColor: '#C1C0B9', borderWidth: 1},
  head: {height: 40, backgroundColor: '#F7F6E7'},
  text: {margin: 6},
  input: {borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8},
});

export default LedgerTable;
