import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import Link from "next/link";

function Product({ name, description, price, image, permalink }) {
  return (
    <Link href={`/product/${permalink}`}>
      <Flex
        bg="white"
        rounded="lg"
        boxShadow="base"
        cursor="pointer"
        _hover={{
          boxShadow: "lg",
        }}
        direction="column"
        h={340}
        w={300}
        justifyContent="space-between"
      >
        <Box
          borderTopLeftRadius="lg"
          borderTopRightRadius="lg"
          overflow="hidden"
          position="relative"
          height={200}
          width={300}
        >
          <Image src={image} layout="fill" objectFit="cover" />
        </Box>
        <Box px={5} py={5}>
          <Box py={2}>
            <Text fontWeight="bold" textTransform="uppercase" fontSize="lg">
              {name}
            </Text>
            <Box textColor="gray.600" fontWeight="medium" textColor="teal.700">
              {parse(description)}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              {price}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Link>
  );
}

export default Product;
