/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import AccountingDash from './AccountingDash';
import {useRoute} from '@react-navigation/native';
import Accountingflow from './Accountingflow';

const AccountingMain = () => {
  const route = useRoute();
  const {afs_main} = route.params ?? {};
  return (
    <View>
      {afs_main === 'accountingdash' && <AccountingDash />}
      {afs_main !== 'accountingdash' && <Accountingflow />}
    </View>
  );
};

export default AccountingMain;
