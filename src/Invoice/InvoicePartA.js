/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import InvoiceScreen from '../Mpdules/InvoiceScreen';
import PurchaseScreen from '../Mpdules/PurchaseScreen';
import Grn from '../Mpdules/Grn';
import CommunicationExpenses from './CommunicationExpenses';
import Insurance from '../Invoiceservice/Insurance';
import Receipt from '../Invoiceservice/Receipt';
import InternetBill from '../Invoiceservice/InternetBill';
import TravelConveyance from '../Invoiceservice/TravelConveyance';
import ElectricityBill from '../Invoiceservice/ElectricityBill';
import WaterBill from '../Invoiceservice/WaterBill';
import TeliphonicBill from '../Invoiceservice/Teliphonicbill';
import FixedAssetLand from '../InvoiceFixedAsset/FixedAssetLand';
import FixedAssetLanddeed from '../InvoiceFixedAsset/FixedAssetLanddeed';
import InstallationReport from '../InvoiceFixedAsset/InstallationReport';
import DetailSalaryStatement from '../InvoiceSalaries/DetailSalaryStatement';
import StatementofSalary from '../InvoiceSalaries/StatementofSalary';
import StatementofRemuneration from '../InvoiceSalaries/StatementofRemuneration';
import DetailRemunerationStatement from '../InvoiceSalaries/DetailRemunerationStatement';
import StatementofOvertimeSalary from '../InvoiceSalaries/StatementofOvertimeSalary';
import DetailOvertimeStatement from '../InvoiceSalaries/DetailOvertimeStatement';
import FullAndFinalSettlement from '../InvoiceSalaries/FullAndFinalSettlement';
import SalesInvoice from '../InvoiceSales/SalesInvoice';
import PackingList from '../InvoiceSales/PackingList';
import CustomerOrder from '../InvoiceSales/CustomerOrder';
import CreditNotes from '../InvoiceSales/CreditNotes';
import ScrapRegister from '../InvoiceSales/ScrapRegister';
import ShareCapital from '../InvoiceCapital/ShareCapital';
import DividendPayments from '../InvoiceCapital/DividendPayments';
import LoanStatement from '../InvoiceCapital/LoanStatement';
import ProvisionalEntries from '../InvoiceSpecial/ProvisionalEntries';
import ProvisionalEntriesD1 from '../InvoiceSpecial/ProvisionalEntriesD1';
import ClosingSummary from '../InvoiceSpecial/ClosingSummary';
import ClosingStatement from '../InvoiceSpecial/ClosingStatement';
import FDForms from '../InvoiceSpecial/FDForms';
import InterestIncomes from '../InvoiceSpecial/InterestIncomes';
import PurchaseOfInvestment from '../InvoiceSpecial/PurchaseOfInvestment';
import DividendReceived from '../InvoiceSalaries/DividendReceived';
import Receipts from '../InvoiceReceipts/Receipts';
import PaymentAdvice from '../InvoiceReceipts/PaymentAdvice';
import ExcahngeDiffReceipt from '../InvoiceReceipts/ExcahngeDiffReceipt';
import VendorPayments from '../InvoicePayments/VendorPayments';
import AdvancePayments from '../InvoicePayments/AdvancePayments';
import ExchangeDiffPayment from '../InvoicePayments/ExchangeDiffPayment';
import Cash_payments from '../InvoicePayments/Cash_payments';
import CustomsDuty from '../InvoiceStatutory/CustomsDuty';
import CustomComponent from '../Invoiceservice/CustomComponent';
import AdvanceTaxPayment from '../InvoiceStatutory/AdvanceTaxPayment';
import TDSSummary from '../InvoiceStatutory/TDSSummary';
import TDSStatement from '../InvoiceStatutory/TDSStatement';
import Challan from '../InvoiceStatutory/Challan';
import GSTPaymentStatement from '../InvoiceStatutory/GSTPaymentStatement';
import GSTPaymentChallan from '../InvoiceStatutory/GSTPaymentChallan';
import GstOrder from '../InvoiceStatutory/GstOrder';
import GstAcknoledgement from '../InvoiceStatutory/GstAcknoledgement';
import IncomeTaxRefund from '../InvoiceStatutory/IncomeTaxRefund';
import PfReturn from '../InvoiceStatutory/PfReturn';
import PaymentReceipt from '../InvoiceStatutory/PaymentReceipt';
import ProvidentFund from '../InvoiceStatutory/ProvidentFund';
import EsiPayment from '../InvoiceStatutory/Esipayment';
import EsiReturn from '../InvoiceStatutory/Esireturn';
import PtStatement from '../InvoiceStatutory/Ptstatement';
import PtChallan from '../InvoiceStatutory/PtChallan';
import PtReturn from '../InvoiceStatutory/Ptreturn';
import Icon from 'react-native-vector-icons/Ionicons';
const typesbutton = [
  {
    type: 'raw_materials',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'packing_materials',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'consumables',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'spares_and_stores',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'import_bills',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'sub_contract_bills',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'transportation',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'debit_note',
    buttons: ['Debit Note'],
  },
  {
    type: 'utility',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'rental',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'repairs',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'technical_services',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'hse_expenses',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'postage_and_courier_expenses',
    buttons: ['SPR'],
  },
  {
    type: 'printing_and_stationery',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'professional_charges',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'insurance',
    buttons: ['Receipt', 'insurance'],
  },
  {
    type: 'internet_bill',
    buttons: ['IB'],
  },
  {
    type: 'staff_welfare',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'travel_and_conveyance',
    buttons: ['EC'],
  },
  {
    type: 'electricity_bill',
    buttons: ['EBILL'],
  },
  {
    type: 'water_bill',
    buttons: ['WBILL'],
  },
  {
    type: 'telephone_bills',
    buttons: ['TBILL'],
  },
  {
    type: 'audit_fees',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'legal_fees',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'rental_factory',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'land',
    buttons: ['Asset Card', 'Sale Deed'],
  },
  {
    type: 'building',
    buttons: ['BILL', 'Asset Card', 'IR', 'PO'],
  },
  {
    type: 'electrical_works',
    buttons: ['BILL', 'Asset Card', 'IR', 'PO'],
  },
  {
    type: 'furniture',
    buttons: ['BILL', 'Asset Card', 'IR', 'PO'],
  },
  {
    type: 'office_equipment',
    buttons: ['BILL', 'Asset Card', 'IR', 'PO'],
  },
  {
    type: 'vehicles',
    buttons: ['BILL', 'Asset Card', 'IR', 'PO'],
  },
  {
    type: 'computers',
    buttons: ['BILL', 'Asset Card', 'IR', 'PO'],
  },
  {
    type: 'softwares',
    buttons: ['BILL', 'Asset Card', 'IR', 'PO'],
  },
  {
    type: 'plant_and_machineries',
    buttons: ['BILL', 'Asset Card', 'IR', 'PO'],
  },
  {
    type: 'air_conditioning',
    buttons: ['BILL', 'Asset Card', 'IR', 'PO'],
  },
  {
    type: 'salary',
    buttons: ['SOS', 'DSS'],
  },
  {
    type: 'remuneration',
    buttons: ['SOR', 'DRS'],
  },
  {
    type: 'overtime',
    buttons: ['SMOS', 'DOS'],
  },
  {
    type: 'full_final_settlement',
    buttons: ['F&FS'],
  },
  {
    type: 'contract_employee_bills',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'house_keeping_bills',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'security_bills',
    buttons: ['BILL', 'PO', 'GRN'],
  },
  {
    type: 'sales_invoices_export',
    buttons: ['SI', 'PL', 'CO'],
  },
  {
    type: 'domestic_sales',
    buttons: ['SI', 'PL', 'CO'],
  },
  {
    type: 'credit_notes',
    buttons: ['CN'],
  },
  {
    type: 'sales_of_scrap',
    buttons: ['Invoice', 'SQS'],
  },
  {
    type: 'rental_invoice',
    buttons: ['SI'],
  },
  {
    type: 'service_invoice',
    buttons: ['SI'],
  },
  {
    type: 'share_capital',
    buttons: ['SC'],
  },
  {
    type: 'dividend_payments',
    buttons: ['DP'],
  },
  {
    type: 'loan_borrowed',
    buttons: ['LS'],
  },
  {
    type: 'loan_interest_accrual',
    buttons: ['LS'],
  },
  {
    type: 'loan_interest_payment',
    buttons: ['LS'],
  },
  {
    type: 'loan_principal_repayment',
    buttons: ['LS'],
  },
  {
    type: 'provisional_entries',
    buttons: ['PES', 'PED'],
  },
  {
    type: 'closing_stock_entries',
    buttons: ['CSSummary', 'CSS'],
  },
  {
    type: 'fd_creation',
    buttons: ['FDC', 'FDCF'],
  },
  {
    type: 'fd_closure',
    buttons: ['FDC'],
  },
  {
    type: 'interest_income_accrual',
    buttons: ['IIA'],
  },
  {
    type: 'interest_income_received',
    buttons: ['IIR'],
  },
  {
    type: 'purchase_of_investments',
    buttons: ['PFI'],
  },
  {
    type: 'sales_of_investments',
    buttons: ['SFI'],
  },
  {
    type: 'dividend_received',
    buttons: ['DR'],
  },
  {
    type: 'receipts_export_sales',
    buttons: ['Receipts', 'PA'],
  },
  {
    type: 'rental_income',
    buttons: ['Receipts', 'PA'],
  },
  {
    type: 'scrap_income',
    buttons: ['Receipts', 'PA'],
  },
  {
    type: 'exchange_diff_receipts',
    buttons: ['EDR'],
  },
  {
    type: 'receipts_domestic_sales',
    buttons: ['Receipts', 'PA'],
  },
  {
    type: 'receipts_service_invoice',
    buttons: ['Receipts', 'PA'],
  },
  {
    type: 'vendor_payments_1',
    buttons: ['VP'],
  },
  {
    type: 'employee_payments',
    buttons: ['ECF'],
  },
  {
    type: 'advance_payments',
    buttons: ['PI', 'PO'],
  },
  {
    type: 'exchange_diff_payments',
    buttons: ['EDP'],
  },
  {
    type: 'cash_payments',
    buttons: ['CV'],
  },
  {
    type: 'customs_duty',
    buttons: ['CD', 'Approval'],
  },
  {
    type: 'advance_tax_payment',
    buttons: ['AT'],
  },
  {
    type: 'tds_payments',
    buttons: ['Summary', 'Statement', 'Challan'],
  },
  {
    type: 'tcs_payments',
    buttons: ['Summary', 'Statement', 'Challan'],
  },
  {
    type: 'gst_payments',
    buttons: ['Gstatement', 'Gchallan'],
  },
  {
    type: 'gst_refund',
    buttons: ['RA', 'RO'],
  },
  {
    type: 'tds_receivable',
    buttons: ['ITR'],
  },
  {
    type: 'income_tax_refund',
    buttons: ['ITR'],
  },
  {
    type: 'pf_payment',
    buttons: ['PFS', 'PR', 'PF'],
  },
  {
    type: 'esi_payment',
    buttons: ['ESIR', 'ESIP'],
  },
  {
    type: 'professional_tax',
    buttons: ['PTS', 'PTC', 'PTR'],
  },
];

const InvoicePartA = ({closeModal, invoice_data, type}) => {
  const [activeScreen, setActiveScreen] = useState('');

  const getButtonsForType = type => {
    const config = typesbutton.find(item => item.type === type);
    return config ? config.buttons : [];
  };

  useEffect(() => {
    const buttons = getButtonsForType(type);
    if (buttons.length > 0) {
      setActiveScreen(buttons[0]);
    } else {
      setActiveScreen('');
    }
  }, [type]);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'BILL':
        return <InvoiceScreen invoice_data={invoice_data} />;
      case 'PO':
        return <PurchaseScreen invoice_data={invoice_data} />;
      case 'GRN':
        return <Grn invoice_data={invoice_data} />;
      case 'Debit Note':
        return <InvoiceScreen invoice_data={invoice_data} />;
      case 'SPR':
        return <CommunicationExpenses invoice_data={invoice_data} />;
      case 'Receipt':
        return <Receipt invoice_data={invoice_data} />;
      case 'insurance':
        return <Insurance invoice_data={invoice_data} />;
      case 'IB':
        return <InternetBill invoice_data={invoice_data} />;
      case 'EC':
        return <TravelConveyance invoice_data={invoice_data} />;
      case 'EBILL':
        return <ElectricityBill invoice_data={invoice_data} />;
      case 'WBILL':
        return <WaterBill invoice_data={invoice_data} />;
      case 'TBILL':
        return <TeliphonicBill invoice_data={invoice_data} />;
      case 'Asset Card':
        return <FixedAssetLand invoice_data={invoice_data} />;
      case 'Sale Deed':
        return <FixedAssetLanddeed invoice_data={invoice_data} />;
      case 'IR':
        return <InstallationReport invoice_data={invoice_data} />;
      case 'SOS':
        return <StatementofSalary invoice_data={invoice_data} />;
      case 'DSS':
        return <DetailSalaryStatement invoice_data={invoice_data} />;
      case 'SOR':
        return <StatementofRemuneration invoice_data={invoice_data} />;
      case 'DRS':
        return <DetailRemunerationStatement invoice_data={invoice_data} />;
      case 'SMOS':
        return <StatementofOvertimeSalary invoice_data={invoice_data} />;
      case 'DOS':
        return <DetailOvertimeStatement invoice_data={invoice_data} />;
      case 'F&FS':
        return <FullAndFinalSettlement invoice_data={invoice_data} />;
      case 'SI':
        return <SalesInvoice invoice_data={invoice_data} />;
      case 'PL':
        return <PackingList invoice_data={invoice_data} />;
      case 'CO':
        return <CustomerOrder invoice_data={invoice_data} />;
      case 'CN':
        return <CreditNotes invoice_data={invoice_data} />;
      case 'Invoice':
        return <SalesInvoice invoice_data={invoice_data} />;
      case 'SQS':
        return <ScrapRegister invoice_data={invoice_data} />;
      case 'SC':
        return <ShareCapital invoice_data={invoice_data} />;
      case 'DP':
        return <DividendPayments invoice_data={invoice_data} />;
      case 'LS':
        return <LoanStatement invoice_data={invoice_data} />;
      case 'PES':
        return <ProvisionalEntries invoice_data={invoice_data} />;
      case 'PED':
        return <ProvisionalEntriesD1 invoice_data={invoice_data} />;
      case 'CSSummary':
        return <ClosingSummary invoice_data={invoice_data} />;
      case 'CSS':
        return <ClosingStatement invoice_data={invoice_data} />;
      case 'FDC':
        return <FDForms invoice_data={invoice_data} />;
      case 'FDCF':
        return <FDForms invoice_data={invoice_data} />;
      case 'IIA':
        return <InterestIncomes invoice_data={invoice_data} />;
      case 'IIR':
        return <InterestIncomes invoice_data={invoice_data} />;
      case 'PFI':
        return <PurchaseOfInvestment invoice_data={invoice_data} />;
      case 'SFI':
        return <PurchaseOfInvestment invoice_data={invoice_data} />;
      case 'DR':
        return <DividendReceived invoice_data={invoice_data} />;
      case 'Receipts':
        return <Receipts invoice_data={invoice_data} />;
      case 'PA':
        return <PaymentAdvice invoice_data={invoice_data} />;
      case 'EDR':
        return <ExcahngeDiffReceipt invoice_data={invoice_data} />;
      case 'VP':
        return <VendorPayments invoice_data={invoice_data} />;
      case 'ECF':
        return <TravelConveyance invoice_data={invoice_data} />;
      case 'PI':
        return <AdvancePayments invoice_data={invoice_data} />;
      case 'EDP':
        return <ExchangeDiffPayment invoice_data={invoice_data} />;
      case 'CV':
        return <Cash_payments invoice_data={invoice_data} />;
      case 'CD':
        return <CustomsDuty invoice_data={invoice_data} />;
      case 'Approval':
        return <CustomComponent invoice_data={invoice_data} />;
      case 'AT':
        return <AdvanceTaxPayment invoice_data={invoice_data} />;
      case 'Summary':
        return <TDSSummary invoice_data={invoice_data} />;
      case 'Statement':
        return <TDSStatement invoice_data={invoice_data} />;
      case 'Challan':
        return <Challan invoice_data={invoice_data} />;
      case 'Gstatement':
        return <GSTPaymentStatement invoice_data={invoice_data} />;
      case 'Gchallan':
        return <GSTPaymentChallan invoice_data={invoice_data} />;
      case 'RA':
        return <GstAcknoledgement invoice_data={invoice_data} />;
      case 'RO':
        return <GstOrder invoice_data={invoice_data} />;
      case 'ITR':
        return <IncomeTaxRefund invoice_data={invoice_data} />;
      case 'PFS':
        return <PfReturn invoice_data={invoice_data} />;
      case 'PR':
        return <PaymentReceipt invoice_data={invoice_data} />;
      case 'PF':
        return <ProvidentFund invoice_data={invoice_data} />;
      case 'ESIR':
        return <EsiPayment invoice_data={invoice_data} />;
      case 'ESIP':
        return <EsiReturn invoice_data={invoice_data} />;
      case 'PTS':
        return <PtStatement invoice_data={invoice_data} />;
      case 'PTC':
        return <PtChallan invoice_data={invoice_data} />;
      case 'PTR':
        return <PtReturn invoice_data={invoice_data} />;
      default:
        return null;
    }
  };

  const renderButtons = () => {
    const buttonTypes = getButtonsForType(type);
    return buttonTypes.map(buttonType => (
      <TouchableOpacity
        key={buttonType}
        onPress={() => setActiveScreen(buttonType)}
        style={[
          styles.button12,
          activeScreen === buttonType
            ? styles.activeButton
            : styles.inactiveButton,
        ]}>
        <Text
          style={
            activeScreen === buttonType
              ? styles.buttonText12
              : styles.buttonTextbill
          }>
          {buttonType}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.container11222}>
        <View style={styles.buttonContainer}>{renderButtons()}</View>
      </View>
      <View style={styles.modalView}>
        <TouchableOpacity onPress={closeModal}>
          <Text style={styles.closeButton}>
            <Icon name="close" size={30} color="#8C8C8C" />
          </Text>
        </TouchableOpacity>
        {renderScreen()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 16,
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
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
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
    left: 220,
    // backgroundColor: '#3a76cf',
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
    width: 700,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  widthmodal: {
    width: 700,
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

export default InvoicePartA;
