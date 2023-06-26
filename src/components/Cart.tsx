import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";

import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useRef } from "react";
import { useStateContext } from "@/context/StateContext";
import Link from "next/link";
import { urlFor } from "@/lib/client";
import CartProduct from "./CartProduct";
import getStripe from "@/lib/getStripe";

const Cart = () => {
  const cartRef = useRef<any>();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const onHandleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      body: JSON.stringify(cartItems),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 400) return;

    const data = await response.json();

    console.log({data});

    toast.loading("Redirecting");

    stripe.redirectToCheckout({
      sessionId: data.id
    })
  };

  const EmptyCart = () => (
    <div className="empty-cart">
      <AiOutlineShopping size={150} />
      <h3>Your shopping bag is empty</h3>
      <Link href={"/"}>
        <button
          type="button"
          onClick={() => setShowCart(false)}
          className="btn"
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  );

  const NonEmptyCart = () => (
    <div className="product-container">
      {cartItems.map((item) => (
        <div className="product" key={item._id}>
          <img
            src={urlFor(item?.image[0])}
            alt={item.name}
            className="cart-product-image"
          />
          <div className="item-desc">
            <div className="flex top">
              <h5>{item.name}</h5>
              <h4>${item.price.toFixed(2)}</h4>
            </div>
            <div className="flex bottom">
              <div>
                <p className="quantity-desc">
                  <span
                    className="minus"
                    onClick={() => toggleCartItemQuantity(item._id, "dec")}
                  >
                    <AiOutlineMinus />
                  </span>
                  <span className="num">{item.quantity}</span>
                  <span
                    className="plus"
                    onClick={() => toggleCartItemQuantity(item._id, "inc")}
                  >
                    <AiOutlinePlus />
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => onRemove(item._id)}
                className="remove-item"
              >
                <TiDeleteOutline />
              </button>
            </div>
          </div>
        </div>

        // <CartProduct key={item._id} item={item} />
      ))}

      <div className="cart-bottom">
        <div className="total">
          <h3>Subtotal:</h3>
          <h3>${totalPrice.toFixed(2)}</h3>
        </div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={onHandleCheckout}>
            Pay with Stripe
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 ? <EmptyCart /> : <NonEmptyCart />}
      </div>
    </div>
  );
};

export default Cart;
