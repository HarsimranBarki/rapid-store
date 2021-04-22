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
  VStack,
} from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { chakra } from "@chakra-ui/system";
import { useToast } from "@chakra-ui/toast";
import { motion } from "framer-motion";
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
      <Container maxW="80vw" py={10}>
        <Heading>Your Cart Is Empty</Heading>
        <Link href="/" passHref>
          <Button rounded="none" variant="solid" colorScheme="teal" mt={5}>
            GoHome
          </Button>
        </Link>
      </Container>
    );
  }

  const MotionFlex = motion(Flex);
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Box maxW="80vw" py={10} margin="auto">
        <Flex justifyContent="space-between" alignItems="start">
          <Box>
            <Heading>Your Cart</Heading>
            <Flex gridGap={5} py={10} justifyContent="flex-start">
              {" "}
              {line_items?.map((product) => {
                return (
                  <MotionFlex
                    key={product.id}
                    border="1px solid "
                    whileHover={{
                      scale: 1.02,
                    }}
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
                    <Link href={`/product/${product.permalink}`}>
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
                  </MotionFlex>
                );
              })}
            </Flex>
          </Box>
          <Box
            border="1px solid"
            borderColor="gray.200"
            padding={5}
            borderTop="5px solid "
            borderTopColor="teal.600"
          >
            <Heading fontWeight="bold">Order Summary</Heading>
            <Divider my={3} />

            <VStack spacing={3} justifyContent="space-between" width="100%">
              {line_items?.map((product) => {
                return (
                  <Flex
                    key={product.id}
                    width="100%"
                    fontWeight="normal"
                    fontSize="md"
                    justifyContent="space-between"
                  >
                    <chakra.span textColor="gray.600" fontWeight="normal">
                      {product.name}
                    </chakra.span>
                    <chakra.span>
                      {product.price.formatted} x {product.quantity}
                    </chakra.span>
                  </Flex>
                );
              })}

              <Flex
                fontWeight="normal"
                width="100%"
                fontSize="md"
                justifyContent="space-between"
              >
                <chakra.span textColor="gray.600" fontWeight="normal">
                  Total Items:
                </chakra.span>
                <chakra.span>{total_unique_items}</chakra.span>
              </Flex>
              <Flex
                fontWeight="normal"
                width="100%"
                fontSize="md"
                justifyContent="space-between"
              >
                <chakra.span textColor="gray.600" fontWeight="normal">
                  Total Amount:
                </chakra.span>
                <chakra.span>{subtotal.formatted_with_symbol}</chakra.span>
              </Flex>
            </VStack>
            <Link href="/checkout" passHref>
              <Button mt={5} colorScheme="teal" rounded="none" width="full">
                Checkout
              </Button>
            </Link>
          </Box>
        </Flex>
      </Box>
    </motion.div>
  );
}

export default cart;
