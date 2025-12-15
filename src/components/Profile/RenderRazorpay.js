import PropTypes from 'prop-types';
import Axios from 'axios';
import { useEffect, useMemo, useRef } from 'react';
import BaseUrl from '../service/Baseurl';

// Load Razorpay script dynamically
const loadScript = (src) => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => {
    console.log('Razorpay loaded successfully');
    resolve(true);
  };
  script.onerror = () => {
    console.error('Error in loading Razorpay');
    resolve(false);
  };
  document.body.appendChild(script);
});

const RenderRazorpay = ({ orderId, keyId, currency, amount, transactionID }) => {
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);

  const handlePayment = async (orderDetails = {}) => {
    try {
      const result = await Axios.post(`${BaseUrl}/user/verify/payment`, {
        orderId: orderDetails.razorpay_order_id,
        paymentId: orderDetails.razorpay_payment_id
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("patientToken")}`
          }
        }
      );

    } catch (err) {
      console.error('Error while verifying payment:', err);
    }
  };

  const options = useMemo(() => ({
    key: keyId,
    amount,
    currency,
    name: localStorage.getItem('patientName') || 'Patient',
    order_id: orderId,
    handler: async (response) => {
      console.log('Payment Success:', response);

      // Verify payment with backend
      await handlePayment(response);

      // OPTIONAL: Redirect or close modal manually if needed
      if (window.Razorpay && window.Razorpay.close) {
        window.Razorpay.close();
      }

      // Redirect to success page or show success modal
      window.location.href = '/profile';
    },
    modal: {
      confirm_close: true,
      ondismiss: async (reason) => {
        const { reason: paymentReason, field, step, code } =
          reason && reason.error ? reason.error : {};
        if (reason === undefined) {
          console.log('Payment cancelled');
            handlePayment('Cancelled');
        } else if (reason === 'timeout') {
          console.log('Payment timed out');
            handlePayment('TimedOut');
        } else {
          console.log('Payment failed');
            handlePayment('Failed', { paymentReason, field, step, code });
        }
      },
    },  
    retry: { enabled: false },
    timeout: 900,
    theme: { color: '#3399cc' },
  }), [keyId, amount, currency, orderId]);

  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      console.error('Razorpay SDK failed to load. Are you online?');
      return;
    }
    const rzp1 = new window.Razorpay(options);

    rzp1.on('payment.submit', (response) => {
      paymentMethod.current = response.method;
    });

    rzp1.on('payment.failed', (response) => {
      paymentId.current = response.error.metadata.payment_id;
    });

    rzp1.open();
  };

  useEffect(() => {
    displayRazorpay();
  }, [options]);

  return null;
};

RenderRazorpay.propTypes = {
  orderId: PropTypes.string.isRequired,
  keyId: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  transactionID: PropTypes.number.isRequired,
  patientID: PropTypes.number.isRequired

};

export default RenderRazorpay;