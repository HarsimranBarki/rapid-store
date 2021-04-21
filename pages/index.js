import Hero from "@/components/Hero";
import Products from "@/components/Product/Products";
import React from "react";
import commerce from "@/lib/commerce";
import { SearchBar } from "@/components/SearchBar";

export async function getStaticProps() {
  const merchant = await commerce.merchants.about();
  const { data: categories } = await commerce.categories.list();
  const { data: products } = await commerce.products.list();

  return {
    props: {
      merchant,
      categories,
      products,
    },
  };
}

const Index = ({ merchant, categories, products }) => {
  return (
    <>
      <Hero />
      <SearchBar />
      <Products
        merchant={merchant}
        categories={categories}
        products={products}
      />
    </>
  );
};

export default Index;
