/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TextInput, StyleSheet, ScrollView} from 'react-native';

const Table = ({data, onChange}) => {
  const handleChange = (text, field, index) => {
    const updatedData = [...data];
    updatedData[index][field] = text;
    onChange(updatedData);
  };

  return (
    <ScrollView horizontal>
      <View style={styles.table}>
        {data.map((row, index) => (
          <View key={index} style={styles.row}>
            <TextInput
              style={styles.cell}
              value={row.particulars}
              onChangeText={text => handleChange(text, 'particulars', index)}
              placeholder="Particulars"
            />
            <TextInput
              style={styles.cell}
              value={row.debit}
              onChangeText={text => handleChange(text, 'debit', index)}
              placeholder="Debit"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.cell}
              value={row.credit}
              onChangeText={text => handleChange(text, 'credit', index)}
              placeholder="Credit"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.cell}
              value={row.detail}
              onChangeText={text => handleChange(text, 'detail', index)}
              placeholder="Detail"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
    borderRightWidth: 1,
    padding: 8,
  },
});

export default Table;
