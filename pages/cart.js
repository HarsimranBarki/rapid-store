import React from "react";

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

function cart() {
  const { line_items, subtotal, total_unique_items } = useCartState();
  const { setCart } = useCartDispatch();
  const toast = useToast();
  if (!line_items) {
    return <Skeleton height="4rem"></Skeleton>;
  }

  const isEmpty = line_items.length === 0;

  if (isEmpty) {
    return (
      <Grid height="sm" placeContent="center">
        <Heading>Your Cart Is Empty</Heading>
        <Link href="/" passHref>
          <Button variant="solid" colorScheme="teal" mt={5}>
            GoHome
          </Button>
        </Link>
      </Grid>
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
              bg="white"
              rounded="lg"
              boxShadow="base"
              cursor="pointer"
              _hover={{
                boxShadow: "lg",
              }}
              direction="column"
              h={300}
              w={300}
              justifyContent="space-between"
            >
              <Link href={`/product/`}>
                <Box
                  borderTopLeftRadius="lg"
                  borderTopRightRadius="lg"
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
      <Box bg="white" boxShadow="base" padding={5} rounded="lg" w="sm">
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
