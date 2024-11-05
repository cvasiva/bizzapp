/* eslint-disable prettier/prettier */
/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import Getway from '../Mpdules/Getway';
import VoucherPage from '../Mpdules/VoucherPage';
import {getCurrentUser} from '../Auth/auth';
import axios from '../Auth/axiosInstance';
import AccountingDash from './AccountingDash';
import Processing from '../Mpdules/Processing';

const Accountingflow = ({navigation}) => {
  const [page, setPage] = useState(0);
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [step, setStep] = useState(0);
  const [subCategoryIndex, setSubCategoryIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await getCurrentUser();
        const response = await axios.get('/users/progress', {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });

        if (response.data) {
          setProgressData(response.data);
        } else {
          setError('Invalid response data');
        }
        if (Array.isArray(response.data.vouchers)) {
          const mappedItems = response.data.vouchers.map(voucher => ({
            label: voucher.voucher_description,
            value: voucher.id,
          }));
          setItems(mappedItems);
        } else {
          setItems([]);
        }
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  // console.log('progressData', progressData);

  return (
    <View>
      {page === 0 && (
        <>
          <AccountingDash
            setPage={setPage}
            progressData={progressData}
            setSubCategoryIndex={setSubCategoryIndex}
            subCategoryIndex={subCategoryIndex}
            step={step}
          />
        </>
      )}
      {page === 1 && (
        <>
          <Processing setPage={setPage} />
        </>
      )}
      {page === 2 && (
        <Getway
          setPage={setPage}
          page={page}
          progressData={progressData}
          items={items}
          setItems={setItems}
          setStep={setStep}
          step={step}
          setSubCategoryIndex={setSubCategoryIndex}
          subCategoryIndex={subCategoryIndex}
          Navigation={navigation}
        />
      )}
      {page === 3 && (
        <VoucherPage
          setPage={setPage}
          page={page}
          progressData={progressData}
          setStep={setStep}
          step={step}
          setSubCategoryIndex={setSubCategoryIndex}
          subCategoryIndex={subCategoryIndex}
        />
      )}
    </View>
  );
};

export default Accountingflow;
