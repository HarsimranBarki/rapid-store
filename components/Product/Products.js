import { Box, Container, Flex } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import React from "react";
import Product from "./Product";

function Products({ merchant, categories, products }) {
  const container = {
    hidden: { y: -10 },
    show: {
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const listItem = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  };

  const MotionFlex = motion(Flex);
  return (
    <Box>
      <Box maxW="container.xl" margin="auto">
        <MotionFlex
          gridGap={5}
          py={10}
          flexWrap="wrap"
          initial="hidden"
          animate="show"
          width="100%"
          variants={container}
        >
          {products.map((product) => {
            return (
              <motion.div variants={listItem}>
                <Product
                  id={product.id}
                  key={product.key}
                  name={product.name}
                  description={product.seo.description}
                  price={product.price.formatted_with_symbol}
                  image={product.assets[0].url}
                  permalink={product.permalink}
                />
              </motion.div>
            );
          })}
        </MotionFlex>
      </Box>
    </Box>
  );
}

export default Products;
