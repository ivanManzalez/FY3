import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const errorNotification = (message) => {
  toast.error(message)
};

const warningNotification = (message) => {
  toast.warn(message)
};

const successNotification = (message) => {
  toast.success(message)
};

const infoNotification = (message) => {
  toast.info(message)
};

const Notification = () => {
  return(
    <>
      <ToastContainer
      // position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="dark" />
    </>
  );
}


export {errorNotification, warningNotification, successNotification, infoNotification};
export default Notification;