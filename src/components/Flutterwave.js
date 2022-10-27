import React from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cartSlice";

const Flutterwave = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const config = {
    public_key: "FLWPUBK_TEST-789e5b1c41c86c6b82f605dbbf9a754a-X",
    tx_ref: Date.now(),
    amount: cart.cartTotalAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: auth.email,
      phone_number: "08168594341",
      name: auth.name,
    },
    customizations: {
      title: "E-commerce",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Check out",
    callback: (response) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
      dispatch(clearCart());
    },
    onClose: () => {},
  };

  return (
    <div className="App">
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
};

export default Flutterwave;
