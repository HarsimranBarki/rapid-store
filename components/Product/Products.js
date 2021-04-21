import { Box, Container, Flex } from "@chakra-ui/layout";
import React from "react";
import Product from "./Product";

function Products({ merchant, categories, products }) {
  console.log(products);
  return (
    <Box>
      {" "}
      <Box maxW="container.xl" margin="auto">
        <Flex gridGap={5} py={10}>
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
      </Box>
    </Box>
  );
}

export default Products;
