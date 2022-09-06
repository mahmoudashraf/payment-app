/* eslint-disable require-jsdoc */
import React, {useEffect, useState} from 'react';
import {CModal, CModalBody, CModalHeader, CButton,
  CModalTitle, CModalFooter, CContainer, CRow, CCol, CToast, CToastHeader
  , CToastBody,
} from '@coreui/react';
import {useCreditCardValidator, images} from 'react-creditcard-validator';

import '@coreui/coreui/dist/css/coreui.min.css';


interface IConfirmationModalProps {
    confirmationModalVisible:boolean;
    toggleVisibility:() => void;
    confirmationAction:() => void;
    notificationvisible:boolean;
    setNotificationvisible:(val:boolean) => void;
}

const ConfirmationModal:React.FC<IConfirmationModalProps> =
 ({confirmationModalVisible, toggleVisibility, confirmationAction,
   notificationvisible, setNotificationvisible})=> {
   const {
     getCardNumberProps,
     getExpiryDateProps,
     getCVCProps,
     getCardImageProps,
     meta: {erroredInputs},
   } = useCreditCardValidator();

   const [disableConfirmbutton, setDisableConfirmButton] = useState(true);


   useEffect(() => {
     setDisableConfirmButton(
       Boolean(erroredInputs.cvc ||
            erroredInputs.cardNumber||
            disableConfirmbutton||
            erroredInputs.expiryDate));
   }, [erroredInputs.cvc,
     erroredInputs.cardNumber,
     erroredInputs.expiryDate, disableConfirmbutton]);


   return (
     <>
       <CModal alignment="center" visible={confirmationModalVisible}
         onClose={() => {
           toggleVisibility();
           setNotificationvisible(false);
         }}>
         <CModalHeader closeButton={false}>
           <CModalTitle>Recharge Your Account</CModalTitle>
         </CModalHeader>
         <CModalBody>
           <CContainer fluid>
             <CRow>
               <CCol sm="12" style={{marginBottom: '15px'}}>
                 <input defaultValue="4111111111111111"
                   {...getCardNumberProps({onChange:
                  (e) => {
                    disableConfirmbutton&& setDisableConfirmButton(false);
                  }})}
                 />
                 <small>{erroredInputs.cardNumber &&
                    erroredInputs.cardNumber}</small>
               </CCol>
             </CRow>
             <CRow>
               <CCol sm="12" style={{marginBottom: '15px'}}>
                 <input {...getExpiryDateProps({onChange:
                  (e) => {
                    disableConfirmbutton&& setDisableConfirmButton(false);
                  }})} />
                 <small>{erroredInputs.expiryDate &&
                    erroredInputs.expiryDate}</small>
               </CCol>
             </CRow>
             <CRow>
               <CCol sm="12" style={{marginBottom: '15px'}}>
                 <input {...getCVCProps({onChange:
                  (e) => {
                    disableConfirmbutton&& setDisableConfirmButton(false);
                  }})} />
                 <small>{erroredInputs.cvc && erroredInputs.cvc}</small>

                 <svg {...getCardImageProps({images})} />
               </CCol>

             </CRow>
           </CContainer>

           { notificationvisible && confirmationModalVisible&&
            <CToast autohide={false} visible={true}>
              <CToastHeader>
                <svg
                  className="rounded me-2"
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                  role="img"
                >
                  <rect width="100%" height="100%" fill="green"></rect>
                </svg>
                <strong className="me-auto">Charge Confirmation</strong>
                <small>1 min ago</small>
              </CToastHeader>
              <CToastBody>Your Card was
                charged successfully</CToastBody>
            </CToast>}

         </CModalBody>
         <CModalFooter>
           <CButton color="primary" onClick={() => {
             confirmationAction();
             setDisableConfirmButton(true);
           }}
           disabled={notificationvisible || disableConfirmbutton}>
            Recharge 10$</CButton>
         </CModalFooter>
       </CModal>


     </>
   );
 };

export default ConfirmationModal;


