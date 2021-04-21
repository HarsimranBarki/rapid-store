import ProductButton from "@/components/Product/ProductButton";
import { useCartDispatch, useCartState } from "@/context/cart";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { chakra } from "@chakra-ui/system";
import { useToast } from "@chakra-ui/toast";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function cart() {
  const { line_items, subtotal, total_unique_items } = useCartState();
  const { setCart } = useCartDispatch();
  const toast = useToast();
  const isEmpty = line_items.length === 0;

  if (isEmpty == undefined) {
    return <Spinner />;
  }
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
      <Flex justifyContent="space-between" alignItems="start">
        <Box>
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
        </Box>
        <Box w="sm" border="1px solid" borderColor="gray.200" padding={5}>
          <Heading fontWeight="bold">Order Summary</Heading>
          <Divider my={3} />
          <Flex
            fontWeight="normal"
            fontSize="md"
            justifyContent="space-between"
          >
            <chakra.span textColor="gray.600" fontWeight="normal">
              Total Amount:
            </chakra.span>
            <chakra.span>{subtotal.formatted_with_symbol}</chakra.span>
          </Flex>
          <Flex
            fontWeight="normal"
            fontSize="md"
            justifyContent="space-between"
          >
            <chakra.span textColor="gray.600" fontWeight="normal">
              Total Items:
            </chakra.span>
            <chakra.span>{total_unique_items}</chakra.span>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
}

export default cart;
