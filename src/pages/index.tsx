import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { FooterBanner, HeroBanner, Product } from "@/components";
import { client } from "@/lib/client";

const inter = Inter({ subsets: ["latin"] });

const Page = ({ products, banners }: { products: any[]; banners: any[] }) => {
  return (
    <>
      <HeroBanner banner={banners.length && banners[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner banner={banners.length && banners[0]} />
    </>
  );
};

export default Page;

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';

  const products = await client.fetch(productQuery);
  const banners = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      banners,
    },
  };
};
