import { Box, Container, Grid } from "@chakra-ui/layout";
import React from "react";
import Product from "./Product";
import adidas from "public/adidas.jpg";

function Products({ merchant, categories, products }) {
  console.log(products);
  return (
    <Container maxW="container.xl">
      {" "}
      <Grid gridTemplateColumns="repeat(4,1fr)" gridGap={5} py={10}>
        {products.map((data) => {
          return (
            <Product
              key={data.id}
              name={data.name}
              description={data.description}
              price={data.price.formatted}
              image={data.assets[0].url}
            />
          );
        })}
      </Grid>
    </Container>
  );
}

export default Products;
