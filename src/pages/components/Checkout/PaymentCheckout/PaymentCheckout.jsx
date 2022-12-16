import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";


const PaymentCheckout = ({ isPaid, setIsPaid, projectName }) => {
  const [ error, setError ] = useState(null);

  const handleApprove = (orderId) => {
    setIsPaid(true);
  }
    
  if (isPaid) {
    alert(`Thank you for donating to ${projectName}`);
    setIsPaid(false);
  }

  if (error) {
    alert(error);
    setError(null);
  }


  return (
    <div>
      <h4 className='payment-title'>Choose your payment method</h4>
      <div className="payment-section">
        <PayPalScriptProvider>
          <PayPalButtons
            createOrder = {(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: 'Donate to ' + projectName,
                    amount: {
                    value: 3,
                    currency: 'USD',
                    },
                  },
                ],
              });
            }}
            onApprove = { async (data, action) => {
              const order = await action.order.capture();
              console.log("order", order);
              handleApprove(data.orderID);
            }}
            onCancel={() => {}}
            onError={(err) => {
              setError(err);
              console.log("PayPal Checkout onError", err);
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}

export default PaymentCheckout;