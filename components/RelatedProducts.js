import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import Product from "./Product/Product";

function RelatedProducts({ products }) {
  if (!products || products.length === 0) return null;
  console.log("as", products);
  return (
    <Box maxW="container.xl" margin="auto" py={10}>
      <Text fontSize="3xl">Some other things you might like</Text>
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
  );
}

export default RelatedProducts;
