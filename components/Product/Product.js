import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import Image from "next/image";
import parse from "html-react-parser";

function Product({ name, description, price, image }) {
  return (
    <Box bg="white" rounded="lg" boxShadow="base" padding={5}>
      <Box rounded="lg" overflow="hidden">
        {" "}
        <Image layout="responsive" src={image} height={300} width={300} />
      </Box>

      <Box py={2}>
        <Text fontWeight="bold" textTransform="uppercase" fontSize="xl">
          {name}
        </Text>
        <Box textColor="gray.600" fontWeight="medium">
          {parse(description)}
        </Box>
        <Text fontWeight="bold">Rs. {price}</Text>
      </Box>
    </Box>
  );
}

export default Product;
