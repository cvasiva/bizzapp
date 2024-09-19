/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Picker,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import UserContext from '../../context_provider/UserContext';
import {VOCHER_COLOR, NARRATION_CLASS} from '../constants/vocher-types';

const Purchase = forwardRef((props, ref) => {
  const emptyRow = {
    particulars: '',
    debit: '',
    credit: '',
    detail: 'By',
    particulars_id: '',
  };

  const [rowData, setRowData] = useState([emptyRow]);
  const [cTotal, setCTotal] = useState(0);
  const [dTotal, setDTotal] = useState(0);
  const [supplierInvoiceNo, setSupplierInvoiceNo] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [narration, setNarration] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const context = useContext(UserContext);

  useImperativeHandle(ref, () => ({
    clearForm() {
      setRowData([emptyRow]);
      setSupplierInvoiceNo('');
      setInvoiceDate(new Date());
      setNarration('');
      setStartDate(new Date());
      setCTotal(0);
      setDTotal(0);
    },
    focusInput() {
      // Not directly applicable in React Native
    },
  }));

  useEffect(() => {
    if (props.data?.ledgers) {
      const rows = props.data.ledgers.map(p => ({
        particulars: p.name,
        debit: p.type === 'BY' ? p.amount : '',
        credit: p.type === 'TO' ? p.amount : '',
        detail: p.type === 'TO' ? 'To' : 'By',
        particulars_id: p.id,
      }));
      setRowData(rows);
      updateTotals(rows);
    }
  }, [props.data]);

  const onInputChange = (index, field, value) => {
    const newRowData = [...rowData];
    newRowData[index][field] = value;
    setRowData(newRowData);
    if (field === 'debit' || field === 'credit') {
      updateTotals(newRowData);
    }
  };

  const updateTotals = rows => {
    const dTotal = rows.reduce(
      (sum, row) => sum + (parseFloat(row.debit) || 0),
      0,
    );
    const cTotal = rows.reduce(
      (sum, row) => sum + (parseFloat(row.credit) || 0),
      0,
    );
    setCTotal(cTotal);
    setDTotal(dTotal);
  };

  const addNewRow = () => {
    setRowData([...rowData, emptyRow]);
  };

  const handleContinue = () => {
    if (cTotal === dTotal) {
      Alert.alert('Validation successful', 'Proceeding...');
    } else {
      Alert.alert('Validation Error', 'Total debit and credit must be equal.');
    }
  };

  const handleInvoiceNoChange = text => {
    setSupplierInvoiceNo(text);
    if (props.onSupplierNameChange) props.onSupplierNameChange(text);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setInvoiceDate(currentDate);
    if (props.onSupplierDateChange) props.onSupplierDateChange(currentDate);
  };

  const handleNarrationChange = text => {
    setNarration(text);
  };

  const voucherDate = moment(invoiceDate).format('DD-MMM-YYYY dddd');

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.row, {paddingTop: 10}]}>
        <View style={styles.voucherTypeContainer}>
          <Text
            style={[
              styles.voucherType,
              {backgroundColor: VOCHER_COLOR[context.gridType]},
            ]}>
            {context.gridType}
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <Text>Voucher Date: {voucherDate}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text>Invoice/Ref No:</Text>
          <TextInput
            value={supplierInvoiceNo}
            onChangeText={handleInvoiceNoChange}
            style={[
              styles.input,
              {backgroundColor: VOCHER_COLOR[context.gridType]},
            ]}
          />
          <Text>Date:</Text>
          <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
            <DatePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
      </View>
      <View style={[styles.row, {maxHeight: '60vh', overflow: 'auto'}]}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text>By/To</Text>
            <Text>Particulars</Text>
            <Text>Debit</Text>
            <Text>Credit</Text>
          </View>
          {rowData.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Picker
                selectedValue={row.detail}
                onValueChange={itemValue =>
                  onInputChange(index, 'detail', itemValue)
                }
                style={[
                  styles.picker,
                  {backgroundColor: VOCHER_COLOR[context.gridType]},
                ]}>
                <Picker.Item label="By" value="By" />
                <Picker.Item label="To" value="To" />
              </Picker>
              <TextInput
                value={row.particulars}
                onChangeText={text => onInputChange(index, 'particulars', text)}
                style={[
                  styles.input,
                  {backgroundColor: VOCHER_COLOR[context.gridType]},
                ]}
              />
              <TextInput
                keyboardType="numeric"
                value={row.debit}
                onChangeText={text => onInputChange(index, 'debit', text)}
                style={[
                  styles.input,
                  {backgroundColor: VOCHER_COLOR[context.gridType]},
                ]}
              />
              <TextInput
                keyboardType="numeric"
                value={row.credit}
                onChangeText={text => onInputChange(index, 'credit', text)}
                style={[
                  styles.input,
                  {backgroundColor: VOCHER_COLOR[context.gridType]},
                ]}
              />
            </View>
          ))}
          <Button title="Add Row" onPress={addNewRow} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.emptyCol} />
        <View style={styles.narrationContainer}>
          <Text>Narration:</Text>
          <TextInput
            multiline
            numberOfLines={2}
            value={narration}
            onChangeText={handleNarrationChange}
            style={[
              styles.input,
              {backgroundColor: NARRATION_CLASS[context.gridType]},
            ]}
          />
          <Button title="Continue" onPress={handleContinue} />
        </View>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  voucherTypeContainer: {
    flex: 1,
  },
  voucherType: {
    textAlign: 'center',
    width: 100,
    padding: 5,
    color: 'white',
  },
  dateContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  inputContainer: {
    flex: 1,
  },
  tableContainer: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    margin: 2,
    flex: 1,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: 2,
    flex: 1,
  },
  narrationContainer: {
    flex: 1,
  },
  emptyCol: {
    flex: 1,
  },
});

export default Purchase;
