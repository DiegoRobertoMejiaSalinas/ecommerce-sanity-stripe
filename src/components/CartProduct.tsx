import { urlFor } from "@/lib/client";
import React, { FC } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

interface Props {
  item: {
    _id: string;
    name: string;
    image: any[];
    price: number;
    quantity: number;
  };
}

const CartProduct: FC<Props> = ({ item }) => {
  const { _id, image, name, price, quantity } = item;

  return (
    <div className="product">
      <img
        src={urlFor(item?.image[0])}
        alt={name}
        className="cart-product-image"
      />
      <div className="desc">
        <div className="flex top">
          <h5>{name}</h5>
          <h4>${price.toFixed(2)}</h4>
        </div>
        <div className="flex bottom">
          <div>
            <p className="quantity-desc">
              <span className="minus">
                <AiOutlineMinus />
              </span>
              <span className="num">{quantity}</span>
              <span className="plus">
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <button type="button" className="remove-item">
            <TiDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
