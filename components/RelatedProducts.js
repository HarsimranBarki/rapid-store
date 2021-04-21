import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import Product from "./Product/Product";

function RelatedProducts({ products }) {
  if (!products || products.length === 0) return null;
  console.log("as", products);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.5,
        },
      }}
      exit={{ opacity: 0, y: -50 }}
    >
      <Box maxW="container.xl" margin="auto">
        <Text fontSize="3xl">Similar Products</Text>
        <Flex gridGap={5} py={10} justifyContent="flex-start">
          {products.map((product) => (
            <Product
              id={product.id}
              key={product.key}
              name={product.name}
              price={product.price.formatted_with_symbol}
              image={product.media.source}
              permalink={product.permalink}
            />
          ))}
        </Flex>
      </Box>
    </motion.div>
  );
}

export default RelatedProducts;
