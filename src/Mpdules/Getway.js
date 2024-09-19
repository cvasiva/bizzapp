/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Getway = ({
  navigation,
  setPage,
  progressData,
  setSubCategoryIndex,
  subCategoryIndex,
  setItems,
  items,
  setStep,
  step,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = () => {
    if (
      !progressData ||
      !progressData.categories ||
      !progressData.categories[step]
    ) {
      console.error('No data available for current step');
      setValidationError('No data available for the current step.');
      return;
    }

    const currentCategory = progressData.categories[step];

    if (
      subCategoryIndex < 0 ||
      subCategoryIndex >= currentCategory.sub_categories.length
    ) {
      console.error('Invalid subCategoryIndex');
      setValidationError('Invalid subcategory index.');
      return;
    }

    const subCategory = currentCategory.sub_categories[subCategoryIndex] || {};
    const expectedVoucherDescription = subCategory.voucher?.description || '';
    const selectedVoucherId = value;
    const selectedVoucher = items.find(
      item => item.value === selectedVoucherId,
    );
    const selectedVoucherDescription = selectedVoucher
      ? selectedVoucher.label
      : '';

    if (!selectedVoucherId) {
      setValidationError('Please select a voucher.');
      return;
    }

    const isValid = expectedVoucherDescription === selectedVoucherDescription;

    if (isValid) {
      subCategory.isdisabled = true;

      if (subCategoryIndex < currentCategory.sub_categories.length) {
        setSubCategoryIndex(prevIndex => prevIndex + 1);
        setValidationError('');
        setPage(3);
      } else {
        const nextCategoryIndex = step + 1;
        if (nextCategoryIndex < progressData.categories.length) {
          setStep(nextCategoryIndex);
          setSubCategoryIndex(0);
          setValidationError('');
        } else {
          console.log('All categories are completed.');
        }
      }
    } else {
      setValidationError(
        `Invalid. Please choose ${expectedVoucherDescription} to proceed.`,
      );
    }
  };

  const currentCategory = progressData?.categories[step] || {};

  return (
    <View style={styles.getbg}>
      <View style={styles.getflx}>
        <View style={styles.getcard}>
          {currentCategory && (
            <View style={styles.ofbizcard}>
              <View style={styles.waybg}>
                <Text style={styles.gettext}>Gateway of Bizzlab</Text>
              </View>
              <View style={styles.catflx}>
                <Text style={styles.gorytext}>Category:</Text>
                <Text style={styles.Directtext}>
                  {currentCategory.description}
                </Text>
              </View>
              <View style={styles.catflx}>
                <Text style={styles.gorytext}>Sub Category:</Text>
                <Text style={styles.Directtext}>
                  {currentCategory.sub_categories[subCategoryIndex]
                    ?.description || 'N/A'}
                </Text>
              </View>
              <View style={styles.catflx}>
                <Text style={styles.gorytext}>Voucher Type:</Text>
                <View style={styles.Directtexts}>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Select a voucher type"
                    style={styles.dropDownPicker}
                    dropDownContainerStyle={[
                      styles.dropDownContainer,
                      {width: '100%'},
                    ]}
                    textStyle={styles.text}
                    placeholderStyle={styles.placeholder}
                    containerStyle={styles.containerStyle}
                  />
                </View>
              </View>
              {validationError ? (
                <Text style={styles.validationError}>{validationError}</Text>
              ) : null}
              <View style={[styles.conflx, {paddingTop: 15}]}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  getbg: {
    backgroundColor: '#30BAF9',
    width: '100%',
    height: '100%',
  },
  getflx: {
    alignItems: 'center',
    padding: 20,
  },
  getcard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '90%',
    height: 310,
    padding: 20,
  },
  ofbizcard: {
    backgroundColor: '#E3EDF7',
    borderRadius: 20,
    width: '100%',
    height: '100%',
  },
  waybg: {
    backgroundColor: '#E3EDF7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  gettext: {
    color: '#133D52',
    fontSize: 24,
    fontWeight: '700',
    padding: 5,
  },
  catflx: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 10,
  },
  gorytext: {
    color: '#133D52',
    fontSize: 24,
    width: '30%',
    textAlign: 'right',
  },
  Directtext: {
    color: '#fff',
    backgroundColor: '#4C8BDB',
    fontSize: 24,
    paddingLeft: 10,
    borderRadius: 5,
    width: '50%',
  },
  Directtexts: {
    width: '50%',
    height: 38,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 4,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    padding: 1,
  },
  conflx: {
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  validationError: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  dropDownPicker: {
    backgroundColor: '#fafafa',
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropDownContainer: {
    backgroundColor: '#fafafa',
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    fontSize: 16,
    color: '#aaa',
  },
  containerStyle: {
    width: '100%',
  },
});

export default Getway;
