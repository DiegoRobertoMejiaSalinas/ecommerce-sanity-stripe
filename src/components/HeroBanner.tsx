import { urlFor } from "@/lib/client";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  banner: {
    image: any;
    product: string;
    buttonText: string;
    desc: string;
    smallText: string;
    midText: string;
    largeText1: string;
    largeText2: string;
    discount: string;
    saleTime: string;
  };
}

const HeroBanner: FC<Props> = ({ banner }) => {
  const {
    buttonText,
    desc,
    discount,
    image,
    largeText1,
    largeText2,
    midText,
    product,
    saleTime,
    smallText,
  } = banner;
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <img src={urlFor(image)} alt={product} className="hero-banner-image" />

        <div>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
        <div className="desc">
          <h5>Description</h5>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
