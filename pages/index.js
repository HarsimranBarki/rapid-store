import Hero from "@/components/Hero";
import Products from "@/components/Product/Products";
import commerce from "@/lib/commerce";
import { motion } from "framer-motion";
import React from "react";


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
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Hero />
     
    
      <Products
        merchant={merchant}
        categories={categories}
        products={products}
      />
       
    </motion.div>
  );
};

export default Index;
