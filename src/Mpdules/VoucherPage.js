/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomTextInputSelect from '../components/CustomTextInputSelect';
import {getCurrentUser} from '../Auth/auth';
import axios from '../Auth/axiosInstance';
import InvoicePartA from '../Invoice/InvoicePartA';
import moment from 'moment';
const initialRow = {
  byTo: '',
  particulars: '',
  debit: '',
  credit: '',
};
const VoucherPage = ({
  navigation,
  setPage,
  page,
  setStep,
  step,
  setSubCategoryIndex,
  subCategoryIndex,
  progressData,
}) => {
  const [selectedValue, setSelectedValue] = useState('select');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const [rows, setRows] = useState([initialRow]);
  const [error1, setError1] = useState('');
  const [dTotal, setDTotal] = useState(0);
  const [cTotal, setCTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [invoice_data, setInvoice_data] = useState([]);
  const currentCategory = progressData.categories[step];
  const category = currentCategory?.category;
  const type =
    currentCategory?.sub_categories[subCategoryIndex - 1]?.sub_category;
  const subcategories = currentCategory?.sub_categories[subCategoryIndex - 1];
  console.log('progressData', currentCategory.status);
  useEffect(() => {
    populateRows();
  }, [modalVisible1]);
  const populateOptions = () => {
    if (invoice_data?.ledgers) {
      const newOptions = invoice_data.ledgers
        .filter(p => p.is_mandatory)
        .map(p => ({
          byTo: p.type === 'BY' ? 'By' : 'To',
          particulars: p.name,
          debit: p.type === 'BY' ? p.amount.toString() : '',
          credit: p.type === 'TO' ? p.amount.toString() : '',
          particulars_id: p.id,
        }));

      if (newOptions.length > 0) {
        const populatedRows = newOptions.map(option => ({
          ...initialRow,
          byTo: option.byTo,
          particulars: option.particulars,
          debit: option.debit,
          credit: option.credit,
          particulars_id: option.particulars_id,
        }));

        setRows(populatedRows);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `/${category}?type=${type}&isRefresh=true`;
        const currentUser = await getCurrentUser();
        const response = await axios.get(url, {
          headers: {
            Authorization: 'Bearer ' + currentUser.token,
          },
        });
        if (response.data) {
          setInvoice_data(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (category && type) {
      fetchData();
    }
  }, [category, type, step, subCategoryIndex]);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const options = invoice_data?.ledgers?.map(item => item.name) || [];
  const validateRow = row => {
    if (!row.byTo || !row.particulars || (!row.debit && !row.credit)) {
      // setError1('Missing essential information in the row.');
      return false;
    }
    const referenceRow = invoice_data?.ledgers.find(
      ref =>
        ref.name.trim().toLowerCase() ===
          row.particulars.trim().toLowerCase() &&
        ref.type.trim().toLowerCase() === row.byTo.trim().toLowerCase(),
    );
    if (!referenceRow) {
      console.warn(
        `No reference data found for ${row.particulars} with type ${row.byTo}.`,
      );
      setError1(
        `No matching reference data found for ${row.particulars} with type ${row.byTo}.`,
      );
      return false;
    }

    const expectedAmount = parseFloat(referenceRow.amount) || 0;
    const givenDebit = parseFloat(row.debit) || 0;
    const givenCredit = parseFloat(row.credit) || 0;

    if (
      row.byTo === 'BY' &&
      givenDebit !== expectedAmount &&
      givenCredit !== expectedAmount
    ) {
      setError1(
        `Debit amount ${row.debit} does not match the expected amount ${expectedAmount} for ${row.particulars}.`,
      );
      return false;
    }

    if (
      row.byTo === 'TO' &&
      givenCredit !== expectedAmount &&
      givenDebit !== expectedAmount
    ) {
      setError1(
        `Credit amount ${row.credit} does not match the expected amount ${expectedAmount} for ${row.particulars}.`,
      );
      return false;
    }

    return true;
  };

  const validate = () => {
    let totalDebit = 0;
    let totalCredit = 0;
    let hasErrors = false;

    setError1('');

    let foundMatch = false;

    for (const row of rows) {
      if (!validateRow(row)) {
        hasErrors = true;
        break;
      }

      totalDebit += parseFloat(row.debit || 0);
      totalCredit += parseFloat(row.credit || 0);

      if (totalDebit === totalCredit) {
        foundMatch = true;
        break;
      }
    }

    if (
      !foundMatch &&
      foundMatch === (invoice_data?.sub_category === 'gst_payments')
    ) {
      setError1('Total Debit and Credit amounts must match.');
      hasErrors = true;
    }

    // if (foundMatch === (invoice_data?.sub_category === 'gst_payments')) {
    //   setError1(
    //     'For GST Payments, the total Debit and Credit amounts should not match.',
    //   );
    //   hasErrors = true;
    // }

    if (hasErrors) {
      return false;
    }

    setError1('');
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    const subCategory = currentCategory.sub_categories[subCategoryIndex - 1];

    if (subCategory) {
      subCategory.isdisabled = true;

      if (subCategoryIndex < currentCategory.sub_categories.length) {
        setPage(2);
      } else {
        const nextCategoryIndex = step + 1;

        if (nextCategoryIndex < progressData.categories.length) {
          setStep(nextCategoryIndex);
          setSubCategoryIndex(0);
          setModalVisible2(true);
          // setPage(0);
        }
      }
    }
  };

  const handlePageNext = () => {
    setPage(0);
  };

  const handleCellChange = (rowIndex, field, value) => {
    const updatedRows = [...rows];
    const updatedRow = {...updatedRows[rowIndex], [field]: value};

    if (field === 'debit') {
      updatedRow.credit = '';
    } else if (field === 'credit') {
      updatedRow.debit = '';
    }

    updatedRows[rowIndex] = updatedRow;
    setRows(updatedRows);

    let totalDebit = 0;
    let totalCredit = 0;

    updatedRows.forEach(row => {
      totalDebit += parseFloat(row.debit || 0);
      totalCredit += parseFloat(row.credit || 0);
    });

    setDTotal(totalDebit);
    setCTotal(totalCredit);

    if (
      validateRow(updatedRow) &&
      rowIndex === updatedRows.length - 1 &&
      !updatedRows.some(
        (r, idx) =>
          idx !== rowIndex &&
          r.byTo === updatedRow.byTo &&
          r.particulars === updatedRow.particulars,
      )
    ) {
      setRows(prevRows => [...prevRows, initialRow]);
    }
  };

  const getOptions = () => {
    if (!invoice_data) return [];
    const subtotal = String(invoice_data?.invoice?.subtotal || '0');
    const sales_subtotal = String(invoice_data?.sales_invoice?.subtotal || '0');
    const sales_total = String(invoice_data?.sales_invoice?.total || '0');
    const cgstTotal = String(invoice_data?.invoice?.cgst_total || '0');
    const sgstTotal = String(invoice_data?.invoice?.sgst_total || '0');
    const igstTotal = String(invoice_data?.invoice?.igst_total || '0');
    const total_inr = String(invoice_data?.invoice?.total_inr || '0');
    const gross_monthly_total = String(
      invoice_data?.employee_salary?.gross_monthly_total || '0',
    );
    const total = String(invoice_data?.invoice?.total || '0');
    const balance_payable = String(
      invoice_data?.invoice?.balance_payable || '0',
    );
    const amount = String(invoice_data?.amount || '0');
    const provisional_entries = invoice_data?.provisional_entries || [];
    const Printing = String(provisional_entries[0]?.amount || '0');
    const Electricity_Charges = String(provisional_entries[1]?.amount || '0');
    const Water_Charges = String(provisional_entries[2]?.amount || '0');
    const Telephone_Charges = String(provisional_entries[3]?.amount || '0');
    const Audit_Fees = String(provisional_entries[4]?.amount || '0');
    const Professional_Charges = String(provisional_entries[5]?.amount || '0');
    const Leave_Provision = String(provisional_entries[6]?.amount || '0');
    const Gratuity_Provision = String(provisional_entries[7]?.amount || '0');
    const summary = invoice_data?.summary || [];
    const Raw_Material = String(summary?.[0]?.value || '0');
    const WIP_Material = String(summary?.[1]?.value || '0');
    const Finished_Goods = String(summary?.[2]?.value || '0');
    const other_ledgers = invoice_data?.other_ledgers || [];
    const Interest_Accrued = String(other_ledgers?.[0]?.amount || '0');
    const TDS_Received = String(other_ledgers?.[1]?.amount || '0');
    const IGST_Liability = String(other_ledgers?.[2]?.amount || '0');
    const CGST_Input = String(other_ledgers?.[3]?.amount || '0');
    const SGST_Input = String(other_ledgers?.[4]?.amount || '0');
    const IGST_Input = String(other_ledgers?.[5]?.amount || '0');
    const tds_consolidated_sheet =
      invoice_data?.summary?.tds_consolidated_sheet || [];
    const TDSonMachineryRent = String(
      tds_consolidated_sheet?.[2]?.amount || '0',
    );
    const TDSonBuildingrent = String(
      tds_consolidated_sheet?.[3]?.amount || '0',
    );
    const TDSon_Salary = String(tds_consolidated_sheet?.[4]?.amount || '0');
    const combinedOptions = [
      subtotal,
      cgstTotal,
      sgstTotal,
      igstTotal,
      total_inr,
      total,
      balance_payable,
      gross_monthly_total,
      sales_subtotal,
      sales_total,
      Gratuity_Provision,
      amount,
      Printing,
      Electricity_Charges,
      Water_Charges,
      Telephone_Charges,
      Audit_Fees,
      Professional_Charges,
      Leave_Provision,
      Raw_Material,
      WIP_Material,
      Finished_Goods,
      Interest_Accrued,
      TDS_Received,
      TDSon_Salary,
      TDSonMachineryRent,
      TDSonBuildingrent,
      IGST_Liability,
      CGST_Input,
      SGST_Input,
      IGST_Input,
    ];

    return [...new Set(combinedOptions)];
  };

  const getOptions1 = () => {
    if (!invoice_data) return [];
    const total = String(invoice_data?.invoice?.total || '0');
    const subtotal = String(invoice_data?.invoice?.subtotal || '0');
    const cgstTotal = String(invoice_data?.invoice?.cgst_total || '0');
    const sgstTotal = String(invoice_data?.invoice?.sgst_total || '0');
    const igstTotal = String(invoice_data?.invoice?.igst_total || '0');
    const sales_total = String(invoice_data?.sales_invoice?.total || '0');
    const sales_subtotal = String(invoice_data?.sales_invoice?.subtotal || '0');
    const sales_cgstTotal = String(
      invoice_data?.sales_invoice?.cgst_total || '0',
    );
    const sales_sgstTotal = String(
      invoice_data?.sales_invoice?.sgst_total || '0',
    );
    const sales_igstTotal = String(
      invoice_data?.sales_invoice?.igst_total || '0',
    );
    const total_inr = String(invoice_data?.invoice?.total_inr || '0');
    const tds_amount = String(invoice_data?.invoice?.tds_amount || '0');

    const balance_payable = String(
      invoice_data?.invoice?.balance_payable || '0',
    );
    const salestds_amount = String(
      invoice_data?.sales_invoice?.tds_amount || '0',
    );
    const employee_pf_contribution = String(
      invoice_data?.employee_salary?.employee_pf_contribution || '0',
    );
    const employer_pf_contribution = String(
      invoice_data?.employee_salary?.employer_pf_contribution || '0',
    );
    const employee_esi_contribution = String(
      invoice_data?.employee_salary?.employee_esi_contribution || '0',
    );
    const employer_asi_contribution = String(
      invoice_data?.employee_salary?.employer_asi_contribution || '0',
    );
    const professional_tax = String(
      invoice_data?.employee_salary?.professional_tax || '0',
    );
    const tds_salary = String(invoice_data?.employee_salary?.tds_salary || '0');
    const salary_payable_ac = String(
      invoice_data?.employee_salary?.salary_payable_ac || '0',
    );
    const amount = String(invoice_data?.amount || '0');
    const provisional_entries = invoice_data?.provisional_entries || [];
    const Printing = String(provisional_entries[0]?.amount || '0');
    const Electricity_Charges = String(provisional_entries[1]?.amount || '0');
    const Water_Charges = String(provisional_entries[2]?.amount || '0');
    const Telephone_Charges = String(provisional_entries[3]?.amount || '0');
    const Audit_Fees = String(provisional_entries[4]?.amount || '0');
    const Professional_Charges = String(provisional_entries[5]?.amount || '0');
    const Leave_Provision = String(provisional_entries[6]?.amount || '0');
    const Gratuity_Provision = String(provisional_entries[7]?.amount || '0');
    const summary = invoice_data?.summary || [];
    const Raw_Material = String(summary?.[0]?.value || '0');
    const WIP_Material = String(summary?.[1]?.value || '0');
    const Finished_Goods = String(summary?.[2]?.value || '0');
    const other_ledgers = invoice_data?.other_ledgers || [];
    const Interest_Accrued = String(other_ledgers?.[0]?.amount || '0');
    const TDS_Received = String(other_ledgers?.[1]?.amount || '0');
    const IGST_Liability = String(other_ledgers?.[2]?.amount || '0');
    const CGST_Input = String(other_ledgers?.[3]?.amount || '0');
    const SGST_Input = String(other_ledgers?.[4]?.amount || '0');
    const IGST_Input = String(other_ledgers?.[5]?.amount || '0');
    const tds_consolidated_sheet =
      invoice_data?.summary?.tds_consolidated_sheet || [];
    const TDSonMachineryRent = String(
      tds_consolidated_sheet?.[2]?.amount || '0',
    );
    const TDSonBuildingrent = String(
      tds_consolidated_sheet?.[3]?.amount || '0',
    );
    const TDSon_Salary = String(tds_consolidated_sheet?.[4]?.amount || '0');
    const combinedOptions = [
      total,
      subtotal,
      cgstTotal,
      sgstTotal,
      igstTotal,
      total_inr,
      tds_amount,
      balance_payable,
      employee_pf_contribution,
      employer_pf_contribution,
      employee_esi_contribution,
      employer_asi_contribution,
      professional_tax,
      tds_salary,
      salary_payable_ac,
      sales_total,
      sales_cgstTotal,
      sales_sgstTotal,
      sales_igstTotal,
      sales_subtotal,
      Gratuity_Provision,
      amount,
      salestds_amount,
      Printing,
      Electricity_Charges,
      Water_Charges,
      Telephone_Charges,
      Audit_Fees,
      Professional_Charges,
      Leave_Provision,
      Raw_Material,
      WIP_Material,
      Finished_Goods,
      Interest_Accrued,
      TDS_Received,
      TDSon_Salary,
      TDSonMachineryRent,
      TDSonBuildingrent,
      IGST_Liability,
      CGST_Input,
      SGST_Input,
      IGST_Input,
    ];
    return [...new Set(combinedOptions)];
  };
  const renderRows = () =>
    rows.map((row, index) => {
      const isPreviousRowValid = index === 0 || validateRow(rows[index - 1]);
      return (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.cell}>
            <View style={styles.vouinpu}>
              <CustomTextInputSelect
                key={`${index}-${row.byTo}`}
                style={styles.purchtext}
                options={['BY', 'TO']}
                selectedValue={row.byTo}
                onValueChange={value => handleCellChange(index, 'byTo', value)}
                disabled={!isPreviousRowValid}
              />
            </View>
          </Text>
          <Text style={styles.cell}>
            <View style={styles.vouinpu}>
              <CustomTextInputSelect
                key={`${index}-${row.particulars}`}
                style={styles.purchtext}
                options={options}
                selectedValue={row.particulars}
                onValueChange={value =>
                  handleCellChange(index, 'particulars', value)
                }
                search={true}
                disabled={!isPreviousRowValid}
              />
            </View>
          </Text>
          <Text style={styles.cell}>
            <View style={styles.vouinpu}>
              <CustomTextInputSelect
                key={`${index}-${row.debit}`}
                options={getOptions()}
                selectedValue={row.debit}
                onValueChange={value => handleCellChange(index, 'debit', value)}
                style={styles.purchtext}
                disabled={!isPreviousRowValid}
              />
            </View>
          </Text>
          <Text style={styles.cell}>
            <View style={styles.vouinpu}>
              <CustomTextInputSelect
                key={`${index}-${row.credit}`}
                options={getOptions1()}
                selectedValue={row.credit}
                onValueChange={value =>
                  handleCellChange(index, 'credit', value)
                }
                style={styles.purchtext}
                disabled={!isPreviousRowValid}
              />
            </View>
          </Text>
        </View>
      );
    });

  const populateRows = () => {
    if (!invoice_data?.ledgers) {
      // console.error('invoice_data.ledgers is not defined');
      return;
    }
    const rows1 = invoice_data?.ledgers
      .filter(p => p.is_mandatory)
      .map(p => ({
        particulars: p.name,
        debit: p.type === 'BY' ? p.amount.toString() : '',
        credit: p.type === 'TO' ? p.amount.toString() : '',
        byTo: p.type === 'BY' ? 'By' : 'To',
        particulars_id: p.id,
      }));

    setRowData(rows1);

    let dTotal1 = 0;
    let cTotal1 = 0;

    rows1.forEach(p => {
      if (p.debit) dTotal1 += Number(p.debit);
      if (p.credit) cTotal1 += Number(p.credit);
    });

    setDTotal(dTotal1);
    setCTotal(cTotal1);
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.tableRow}>
        <Text style={styles.cell1}>
          <View>
            <Text style={styles.itemText}>{item.byTo}</Text>
          </View>
        </Text>
        <Text style={styles.cell1}>
          <View>
            <Text style={styles.itemText}>{item.particulars}</Text>
          </View>
        </Text>
        <Text style={styles.cell1}>
          <View>
            <Text style={styles.itemText}>{item.debit}</Text>
          </View>
        </Text>
        <Text style={styles.cell1}>
          <View>
            <Text style={styles.itemText}>{item.credit}</Text>
          </View>
        </Text>
      </View>
    </View>
  );

  const resetForm = () => {
    // setLoading(true);
    setRows(prevRows => {
      const resetRows = prevRows.map(row => ({
        ...row,
        byTo: '',
        particulars: '',
        debit: '',
        credit: '',
      }));
      return resetRows;
    });
    setDTotal(0);
    setCTotal(0);
    setLoading(false);
  };

  const getOptions2 = () => {
    if (!invoice_data) return [];
    const invoice_no = String(invoice_data?.invoice?.invoice_no || '0');
    const cgstTotal = String(invoice_data?.invoice?.cgst_total || '0');
    const sgstTotal = String(invoice_data?.invoice?.sgst_total || '0');
    const combinedOptions = [invoice_no, cgstTotal, sgstTotal];
    return [...new Set(combinedOptions)];
  };
  const getOptions3 = () => {
    if (!invoice_data) return [];
    const invoice_date = String(invoice_data?.invoice?.invoice_date || '0');
    const po_date = String(invoice_data?.po?.po_date || '0');
    const combinedOptions = [invoice_date, po_date];
    return [...new Set(combinedOptions)];
  };
  return (
    <View style={styles.vouchbg}>
      <View style={styles.containertable}>
        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.headerCell]}>
            Accounting Voucher
          </Text>
          <Text style={[styles.cell, styles.headerCell, styles.purcard]}>
            {subcategories?.voucher?.description}
          </Text>
          <Text style={[styles.cell, styles.headerCell, {paddingTop: 5}]}>
            / {moment(invoice_data?.month, 'MM/YYYY').format('MMMM/YYYY')}
          </Text>
          <Text style={[styles.cell, styles.headerCell, {paddingTop: 5}]}>
            Invoice/Ref No :
          </Text>
          <Text style={[styles.cell, styles.headerCell]}>
            <View style={styles.vouinpu}>
              <CustomTextInputSelect
                options={getOptions2()}
                selectedValue={selectedValue}
                onValueChange={value => setSelectedValue(value)}
              />
            </View>
          </Text>
          <Text style={[styles.cell, styles.headerCell, {paddingTop: 5}]}>
            Invoice Date :
          </Text>
          <Text style={[styles.cell, styles.headerCell]}>
            <View style={styles.vouinpu}>
              <CustomTextInputSelect
                options={getOptions3()}
                selectedValue={selectedValue}
                onValueChange={value => setSelectedValue(value)}
              />
            </View>
          </Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.headerCell]}>By/To</Text>
          <Text style={[styles.cell, styles.headerCell]}>Particulars</Text>
          <Text style={[styles.cell, styles.headerCell]}>Debit</Text>
          <Text style={[styles.cell, styles.headerCell]}>Credit</Text>
        </View>
        <View style={styles.heightvouch}>
          <ScrollView>
            {renderRows()}
            {error1 ? <Text style={styles.errorText}>{error1}</Text> : null}
          </ScrollView>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.cell, styles.setflx]}>
            <View>
              <TouchableOpacity style={styles.button1} onPress={resetForm}>
                <Text style={styles.buttonText1}>Reset</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginRight: 20}}>
              <TouchableOpacity
                style={styles.button1}
                onPress={populateOptions}>
                <Text style={styles.buttonText1}>Fill</Text>
              </TouchableOpacity>
            </View>
          </Text>
          <Text style={styles.cell}>
            <View style={[styles.vouinpu, styles.reseflx]}>
              <View>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={e => setModalVisible1(true)}>
                  <Text style={styles.buttonText1}>Show Answer</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Text>
          <Text style={[styles.cell, styles.textnum]}>
            <View style={styles.vouinpu}>
              <Text style={styles.purchtext}>{dTotal}</Text>
            </View>
          </Text>
          <Text style={[styles.cell, styles.textnum]}>
            <View style={styles.vouinpu}>
              <Text style={styles.purchtext}>{cTotal}</Text>
            </View>
          </Text>
        </View>
        <View style={styles.acardtop}>
          <TouchableOpacity onPress={openModal}>
            <Image source={require('../Images/vouchtog.png')} />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <InvoicePartA
            invoice_data={invoice_data}
            closeModal={closeModal}
            currentCategory={currentCategory}
            type={type}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => setModalVisible1(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* <ScrollView> */}
              <View style={styles.widthmodal}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.cell, styles.headerCell]}>By/To</Text>
                  <Text style={[styles.cell, styles.headerCell]}>
                    Particulars
                  </Text>
                  <Text style={[styles.cell, styles.headerCell]}>Debit</Text>
                  <Text style={[styles.cell, styles.headerCell]}>Credit</Text>
                </View>
                <FlatList
                  data={rowData}
                  renderItem={renderItem}
                  keyExtractor={item => item.particulars_id}
                  style={styles.flatList}
                />
                <View style={styles.widthbtn}>
                  <Button
                    title="Hide"
                    onPress={() => setModalVisible1(false)}
                  />
                </View>
              </View>
              {/* </ScrollView> */}
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => setModalVisible2(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent12}>
              <View>
                <Text style={styles.category}>Category Completed</Text>
                <Button title="Continue" onPress={handlePageNext} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  category: {
    color: '#808080',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 30,
  },
  errorText: {
    color: '#e60023',
    textAlign: 'center',
  },
  itemText: {
    color: '#808080',
  },
  container11222: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'flex-start',
  },
  button12: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText12: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  buttonTextbill: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E3971',
    textAlign: 'center',
  },
  activeButton: {
    backgroundColor: '#01BAF2',
    borderRadius: 500,
    color: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
  },
  inactiveButton: {
    backgroundColor: '#fff',
    borderRadius: 500,
    color: '#000',
  },
  heightvouch: {
    height: 200,
    width: '100%',
  },
  acardtop: {
    backgroundColor: '#2E3971',
    width: 70,
    padding: 10,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    position: 'static',
    top: -200,
    left: -10,
    zIndex: 100,
  },
  vouchbg: {
    backgroundColor: '#FFF0BE',
    width: '100%',
    height: '100%',
    // padding: 10,
    paddingTop: 10,
  },
  purflx: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 100,
    position: 'relative',
  },
  purflxcard: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
  },
  containertable: {
    flex: 1,
    width: '100%',
    overflow: 'scroll',
    height: '50%',
  },
  cellwidth: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    paddingTop: 5,
    // marginBottom: 10,
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  textnum: {
    borderTopWidth: 2,
    borderTopColor: '#ccc',
    width: '50%',
    paddingTop: 10,
    flex: 1,
    alignItems: 'flex-end',
    marginLeft: 20,
    marginRight: 20,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#133D52',
  },
  cell1: {
    flex: 1,
    textAlign: 'center',
    color: '#133D52',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  headerCell: {
    fontWeight: 'bold',
    width: '10%',
    color: '#133D52',
  },
  vouinpu: {
    height: 35,
    width: '100%',
    color: '#133D52',
  },
  purchtext: {
    color: '#133D52',
  },
  purcard: {
    backgroundColor: '#2966B1',
    color: '#fff',
    paddingTop: 5,
    height: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    position: 'relative',
    button: 0,
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  button1: {
    backgroundColor: '#F5F6FA',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    position: 'relative',
    button: 0,
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonText1: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
  },
  reseflx: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  setflx: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: 15,
    paddingRight: 15,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    elevation: 5,
    width: 650,
    height: 320,
  },
  modalText: {
    borderBottomColor: '#2293F0',
    borderBottomWidth: 6,
    width: '100%',
    marginTop: -12,
  },
  closeButton: {
    fontSize: 16,
    color: '#fff',
    position: 'relative',
    left: 180,
    backgroundColor: '#3a76cf',
    fontWeight: '800',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    marginLeft: 150,
    // marginTop: 10,
  },
  vimy: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  Bill: {
    color: '#022E9F',
    fontWeight: '700',
  },
  processing: {
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 800,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContent12: {
    width: 500,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  widthmodal: {
    width: 800,
    overflow: 'scroll',
  },
  widthbtn: {
    width: 100,
  },
  itemName: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
export default VoucherPage;
