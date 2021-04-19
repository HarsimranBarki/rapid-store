import Hero from "@/components/Hero";
import Products from "@/components/Product/Products";
import { Container, Heading } from "@chakra-ui/layout";
import Head from "next/head";
import commerce from "../lib/commerce";

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

const Index = ({ merchant, categories, products }) => (
  <>
    <Head>
      <title>Rapid Store</title>
    </Head>

    <Hero />
    <Products merchant={merchant} categories={categories} products={products} />
  </>
);

export default Index;
