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
      rounded="lg"
      border="1px solid"
      borderColor="gray.200"
      p={5}
      cursor="pointer"
      _hover={{
        boxShadow: "lg",
      }}
      direction="column"
      h={360}
      w={320}
      justifyContent="space-between"
    >
      <Link href={`/product/${permalink}`}>
        <Box
          rounded="lg"
          overflow="hidden"
          position="relative"
          height={200}
          width={280}
        >
          <Image src={image} layout="fill" objectFit="cover" />
        </Box>
      </Link>
      <Flex
        mt={3}
        justifyContent="space-between"
        alignItems="flex-end"
        bg="gray.200"
        p={5}
        rounded="lg"
      >
        <Box py={2}>
          <Text fontWeight="bold" textTransform="uppercase" fontSize="lg">
            {name}
          </Text>
          {description ? (
            <Box textColor="gray.600" fontWeight="medium" textColor="gray.700">
              {parse(description)}
            </Box>
          ) : null}

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
