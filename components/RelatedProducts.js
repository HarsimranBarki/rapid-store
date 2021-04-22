import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import Product from "./Product/Product";
import { v4 as uuidv4 } from "uuid";

function RelatedProducts({ products }) {
  if (!products || products.length === 0) return null;

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
      <Box maxW="80vw" margin="auto">
        <Text fontSize="3xl">Similar Products</Text>
        <Flex gridGap={5} py={10} justifyContent="flex-start">
          {products.map((product) => (
            <Product
              id={product.id}
              key={uuidv4()}
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
