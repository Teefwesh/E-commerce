import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { logoutUser } from "../features/authSlice";

import CartIcon from "../images/svg/handbag.svg";

const NavBar = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>OnlineShop</h2>
      </Link>

      <Link to="/cart">
        <div className="nav-bag">
          <img src={CartIcon} alt="cart-icon" />

          <span className="bag-quantity">
            <span>{cart.cartTotalQuantity}</span>
          </span>
        </div>
      </Link>

      {auth._id ? (
        <Links>
          {auth.isAdmin && (
            <div>
              <Link to="/admin/summary">Admin</Link>
            </div>
          )}

          <div
            onClick={() => {
              dispatch(logoutUser());
              toast.warning("Logged out!", { position: "bottom-left" });
              navigate("/");
            }}
          >
            Logout
          </div>
        </Links>
      ) : (
        <AuthLinks>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </AuthLinks>
      )}
    </nav>
  );
};

export default NavBar;

const AuthLinks = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;

const Links = styled.div`
  color: #333;
  display: flex;

  div {
    cursor: pointer;

    &:last-child {
      margin-left: 2rem;
    }
  }
`;
