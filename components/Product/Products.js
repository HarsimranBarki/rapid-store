import { Box, Container, Flex, Grid } from "@chakra-ui/layout";
import React from "react";
import Product from "./Product";
import adidas from "public/adidas.jpg";
import Link from "next/link";

function Products({ merchant, categories, products }) {
  console.log(products);
  return (
    <Container maxW="container.xl">
      <Flex gridGap={5} py={10} justifyContent="flex-start">
        {products.map((product) => {
          return (
            <Product
              name={product.name}
              description={product.description}
              price={product.price.formatted_with_symbol}
              image={product.assets[0].url}
              permalink={product.permalink}
            />
          );
        })}
      </Flex>
    </Container>
  );
}

export default Products;
