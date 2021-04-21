import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import Link from "next/link";
import { Button, IconButton } from "@chakra-ui/button";

import commerce from "@/lib/commerce";
import { useCartDispatch } from "@/context/cart";
import { useToast } from "@chakra-ui/toast";
import { AddIcon } from "@chakra-ui/icons";

function Product({ id, name, description, price, image, permalink }) {
  const { setCart } = useCartDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const addToCart = (name, productId, qty) => {
    setLoading(true);
    commerce.cart
      .add(productId, qty)
      .then(({ cart }) => {
        setCart(cart);
        return cart;
      })
      .then(() => {
        setLoading(false);
        toast({
          title: `"${name}" has been added to your cart`,
          description: `Your quantity ${qty}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: error.message,
          description: `Something happend try again`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
  return (
    <Link href={`/product/${permalink}`}>
      <Box
        key={id}
        border="1px solid "
        borderColor="gray.200"
        _hover={{
          boxShadow: "lg",
        }}
        cursor="pointer"
        h="full"
        w={300}
        justifyContent="space-between"
      >
        <Box overflow="hidden" position="relative" height={300} width="full">
          <Image src={image} layout="fill" objectFit="cover" />
        </Box>

        <Box bg="black" textColor="white" py={3} textAlign="center">
          <Text
            fontWeight="semibold"
            textColor="gray.400"
            textTransform="uppercase"
            fontSize="md"
          >
            {name}
          </Text>

          <Text fontWeight="bold" fontSize="md">
            {price}
          </Text>
        </Box>
      </Box>
    </Link>
  );
}

export default Product;
