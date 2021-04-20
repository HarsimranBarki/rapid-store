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
    <Flex
      key={id}
      bg="white"
      rounded="lg"
      boxShadow="base"
      cursor="pointer"
      _hover={{
        boxShadow: "lg",
      }}
      direction="column"
      h={360}
      w={300}
      justifyContent="space-between"
    >
      <Link href={`/product/${permalink}`}>
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
      </Link>
      <Flex
        m={3}
        p={5}
        justifyContent="space-between"
        alignItems="flex-end"
        bg="teal.100"
        rounded="lg"
      >
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
        <IconButton
          icon={<AddIcon />}
          onClick={() => addToCart(name, id, 1)}
          isLoading={loading}
          rounded="full"
          colorScheme="teal"
        >
          Add
        </IconButton>
      </Flex>
    </Flex>
  );
}

export default Product;
