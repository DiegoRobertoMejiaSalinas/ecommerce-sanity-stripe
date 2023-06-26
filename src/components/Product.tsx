import { urlFor } from "@/lib/client";
import Link from "next/link";
import { FC } from "react";

interface Props {
  product: {
    _id: string;
    slug: any;
    name: string;
    image: any[];
    price: number;
    details: string;
  };
}

const Product: FC<Props> = ({ product }) => {
  const { name, _id, details, image, price, slug } = product;

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={image && urlFor(image[0])}
            alt={name}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
