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

const FooterBanner: FC<Props> = ({ banner }) => {
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
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>

        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <img src={urlFor(image)} alt={product} className="footer-banner-image" />
      </div>
    </div>
  );
};

export default FooterBanner;
