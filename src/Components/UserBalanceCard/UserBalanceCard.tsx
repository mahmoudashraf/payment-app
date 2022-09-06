import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {recharge, setBalance} from '../../app/userBalance';
import {CCard, CCardImage, CCardBody, CCardText, CButton} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import {RootState} from '../../app/store';
import ConfirmationModal from '../ConfirmationModal';

import {useFetchUserBalance,
  useRechargeBalance} from '../../api/actions';


const UserBalanceCard:React.FC = ()=> {
  const count = useSelector((state: RootState) => state.user.balance);
  const [visible, setVisible] = useState<boolean>(false);
  const [notificationVisible, setNotificationVisible] =useState(false);

  const dispatch = useDispatch();
  const {data, isFetching} =useFetchUserBalance();
  const rechargeBalanceMutation =useRechargeBalance();

  const toggleVisibility =() => {
    setVisible(!visible);
  };

  const confirmRechargeAction = () =>
    rechargeBalanceMutation().then((response) => {
      dispatch(recharge());
      setTimeout(() => {
        toggleVisibility();
        setNotificationVisible(false);
      }, 20000 );
      setNotificationVisible(true);
    });

  useEffect(() => {
    dispatch(setBalance(data?.data.balance));
  }, [isFetching]);

  return (
    <>
      <CCard style={{width: '18rem'}}>
        <CCardImage orientation="top"
          src='./cards.jpeg' />
        <CCardBody>
          <CCardText>
            {count}
          </CCardText>
          <CButton onClick={toggleVisibility}
            href="#">Recharge/Add Balance</CButton>
        </CCardBody>
      </CCard>
      {visible && <ConfirmationModal
        setNotificationvisible={setNotificationVisible}
        confirmationModalVisible={visible}
        toggleVisibility={toggleVisibility}
        notificationvisible={notificationVisible}
        confirmationAction={confirmRechargeAction} />}
    </>
  );
};

export default UserBalanceCard;
