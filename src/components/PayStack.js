import React from "react";

import { usePaystackPayment } from "react-paystack";
import { useSelector } from "react-redux";

const PaystackHookExample = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const config = {
    reference: new Date().getTime().toString(),
    email: auth.email,
    amount: cart.cartTotalAmount * 100,
    publicKey: "pk_test_61c1d7f8be5268ea4b6b5dfe188b97975ff7241d",
  };

  const initializePayment = usePaystackPayment(config);
  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Pay with Paystack
      </button>
    </div>
  );
};

export default PaystackHookExample;
