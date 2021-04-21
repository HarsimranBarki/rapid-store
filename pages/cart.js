import React, { useState } from "react";

import {
  Box,
  toast,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  Grid,
  Divider,
} from "@chakra-ui/layout";

import Image from "next/image";
import { Button, IconButton } from "@chakra-ui/button";
import commerce from "@/lib/commerce";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Skeleton } from "@chakra-ui/skeleton";
import { useCartDispatch, useCartState } from "@/context/cart";
import { useToast } from "@chakra-ui/toast";
import Link from "next/link";
import ProductButton from "@/components/Product/ProductButton";
import { Spinner } from "@chakra-ui/spinner";

function cart() {
  const { line_items, subtotal, total_unique_items } = useCartState();
  const { setCart } = useCartDispatch();
  const toast = useToast();
  const isEmpty = line_items.length === 0;

  if (isEmpty) {
    return (
      <Container maxW="container.xl" py={10}>
        <Heading>Your Cart Is Empty</Heading>
        <Link href="/" passHref>
          <Button rounded="none" variant="solid" colorScheme="teal" mt={5}>
            GoHome
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Heading>Your Cart</Heading>
      <Flex gridGap={5} py={10} justifyContent="flex-start">
        {" "}
        {line_items?.map((product) => {
          return (
            <Flex
              key={product.id}
              border="1px solid "
              borderColor="gray.200"
              _hover={{
                boxShadow: "lg",
              }}
              cursor="pointer"
              direction="column"
              h={300}
              w={300}
              justifyContent="space-between"
            >
              <Link href={`/product/`}>
                <Box
                  overflow="hidden"
                  position="relative"
                  height={200}
                  width={300}
                >
                  <Image
                    src={product.media.source}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
              </Link>
              <Box px={5} py={5}>
                <Box py={2}>
                  <Text
                    fontWeight="bold"
                    textTransform="uppercase"
                    fontSize="lg"
                  >
                    {product.name}
                  </Text>

                  <Text fontWeight="bold" fontSize="lg">
                    {product.price.formatted_with_symbol}
                  </Text>
                </Box>
                <ProductButton
                  name={product.name}
                  id={product.id}
                  quantity={product.quantity}
                />
              </Box>
            </Flex>
          );
        })}
      </Flex>
      <Box
        bg="white"
        border="1px solid "
        borderColor="gray.200"
        padding={5}
        w="sm"
      >
        <Text fontWeight="bold" fontSize="xl">
          Order Summary
        </Text>
        <Divider />
        <Text fontWeight="semibold">
          Total Amount: {subtotal?.formatted_with_symbol}
        </Text>
        <Text fontWeight="semibold">Total Items: {total_unique_items} </Text>
      </Box>
    </Container>
  );
}

export default cart;
