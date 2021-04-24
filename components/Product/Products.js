import { Box, Container, Flex, Grid, Heading } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import React from "react";
import Product from "./Product";
import { v4 as uuidv4 } from "uuid";

function Products({ merchant, categories, products }) {
 
  const easing = [0.6, -0.05, 0.01, 0.99];
  const container = {
    hidden: { y: -10 },
    show: {
      y: 0,
      transition: {
        staggerChildren: 0.2,
        ease: easing,
      },
    },
  };

  const listItem = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  };

  const MotionGrid = motion(Grid);
  return (
    <Box name="product" key={uuidv4()}>
      <Box maxW="80vw" mx="auto" my={20}>
        <Heading textAlign="center" borderBottom='1px solid' borderColor='teal.600'  borderBottomWidth={3} pb={2} w='xs' margin='auto'> Top Sellers</Heading>
        <MotionGrid
          gridGap={5}
          py={12}
          justifyContent="center"
          alignItems="center"
          initial="hidden"
          animate="show"
          gridTemplateColumns=" repeat(auto-fit, minmax(300px, 300px))"
          width="100%"
          variants={container}
        >
          {products.map((product) => {
            return (
              <motion.div variants={listItem} key={uuidv4()}>
                <Product
                  id={product.id}
                  key={uuidv4()}
                  name={product.name}
                  description={product.seo.description}
                  price={product.price.formatted_with_symbol}
                  image={product.assets[0].url}
                  permalink={product.permalink}
                />{" "}
              </motion.div>
            );
          })}
        </MotionGrid>
      </Box>
    </Box>
  );
}

export default Products;
