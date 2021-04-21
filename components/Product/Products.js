import { Container, Flex } from "@chakra-ui/layout";
import React from "react";
import Product from "./Product";

function Products({ merchant, categories, products }) {
  console.log(products);
  return (
    <Container maxW="container.xl">
      <Flex gridGap={5} py={10} justifyContent="flex-start">
        {products.map((product) => {
          return (
            <React.Fragment key={product.id}>
              <Product
                id={product.id}
                key={product.key}
                name={product.name}
                description={product.seo.description}
                price={product.price.formatted_with_symbol}
                image={product.assets[0].url}
                permalink={product.permalink}
              />
            </React.Fragment>
          );
        })}
      </Flex>
    </Container>
  );
}

export default Products;
