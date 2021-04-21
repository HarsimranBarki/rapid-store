import { useCartState } from "@/context/cart";
import { Box, Container, Flex, HStack } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import Link from "next/link";
import React from "react";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";

function NavBar() {
  const { line_items, subtotal, total_unique_items } = useCartState();
  return (
    <>
      <Box
        bg="gray.800"
        position="fixed"
        width="full"
        textColor="white"
        zIndex={10}
        boxShadow="base"
      >
        <Container maxW="container.xl">
          <Flex py="4" justifyContent="space-between" alignItems="center">
            <Box>
              <HStack spacing={5}>
                <Link href="/">
                  <a>Home</a>
                </Link>
                <Link href="/cart">
                  <a>Shop</a>
                </Link>
                <Link href="/">
                  <a>Contact</a>
                </Link>
                <Link href="/">
                  <a>About</a>
                </Link>
              </HStack>
            </Box>
            <Link href="/cart" passHref>
              <Box position="relative" cursor="pointer">
                <chakra.span
                  top={-1}
                  right={-1}
                  position="absolute"
                  bg="teal.500"
                  rounded="full"
                  padding={1}
                  fontSize="0.8rem"
                  lineHeight="0.5"
                  textColor="teal.100"
                >
                  {total_unique_items}
                </chakra.span>

                <FiShoppingBag fontSize="1.4rem" />
              </Box>
            </Link>
          </Flex>
        </Container>
      </Box>
      <Box height="3.5rem"></Box>
    </>
  );
}

export default NavBar;
