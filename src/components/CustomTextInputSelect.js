/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';

const CustomTextInputSelect = ({ options, selectedValue, onValueChange, search }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState(selectedValue || '');
  const [searchText, setSearchText] = useState('');

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setModalVisible(true)}>
        <TextInput
          style={styles.textInput}
          value={inputValue}
          placeholder="Select an option"
          editable={false}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            {search && (
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchText}
                onChangeText={text => setSearchText(text)}
              />
            )}
            <ScrollView>
              {filteredOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => {
                    onValueChange(option);
                    setInputValue(option);
                    setModalVisible(false);
                  }}>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  textInput: {
    fontSize: 12,
    color: '#133D52',
    fontWeight: '500',
    paddingBottom:8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // padding: 10,
    paddingTop:10,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:50,
    marginTop:15,
    color: '#133D52',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft:8,
    paddingRight:8,
    marginTop:10,
    color: '#133D52',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#133D52',
  },
  optionText: {
    fontSize: 16,
    color: '#133D52',
  },
});

export default CustomTextInputSelect;
