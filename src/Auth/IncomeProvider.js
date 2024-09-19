/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import IncomeContext from './IncomeContext';

const IncomeProvider = props => {
  const [texDatas, setTexDatas] = useState();
  const [nextBtn, setNextBtn] = useState('');
  const [errorGoogle, setErrorGoogle] = useState();
  const [isEditFlow, setIsEditFlow] = useState(false);
  const [newTexDatas, setNewTexDatas] = useState();
  const [stepperState, setStepperState] = useState([]);
  const [urlPage, setUrlPage] = useState('instruction');
  const [formData, setFormData] = useState();
  const [userId, setUserId] = useState();

  return (
    <IncomeContext.Provider
      value={{
        texDatas,
        setTexDatas,
        nextBtn,
        setNextBtn,
        errorGoogle,
        setErrorGoogle,
        isEditFlow,
        setIsEditFlow,
        newTexDatas,
        setNewTexDatas,
        stepperState,
        setStepperState,
        urlPage,
        setUrlPage,
        formData,
        setFormData,
        userId,
        setUserId,
      }}>
      {props.children}
    </IncomeContext.Provider>
  );
};

export default IncomeProvider;
