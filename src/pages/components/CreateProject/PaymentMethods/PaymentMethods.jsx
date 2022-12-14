import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";


const PaymentMethods = ({ isPaid, setIsPaid }) => {
  const [ error, setError ] = useState(null);


  const handleApprove = (orderId) => {
    setIsPaid(true);
  }

  if (isPaid) {
    alert(`You have featured this project`);
    setIsPaid(false);
  }

  if (error) {
    alert(error);
    setError(null);
  }


  return (
    <div className="payment-section">
      <PayPalScriptProvider>
        <PayPalButtons
          createOrder = {(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: 'Featured Project Fee',
                  amount: {
                    value: 5,
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
  );
}

export default PaymentMethods;