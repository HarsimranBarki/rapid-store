import { Box, Container, Flex, Heading, HStack, Text } from "@chakra-ui/layout";
import React from "react";
import Link from "next/link";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { FiShoppingCart } from "react-icons/fi";

function NavBar() {
  return (
    <>
      <Box
        bg="white"
        position="fixed"
        width="full"
        zIndex={10}
        boxShadow="base"
      >
        <Container maxW="container.xl">
          <Flex py="4" justifyContent="space-between" alignItems="center">
            <Box>
              <HStack spacing={5} cursor="pointer">
                <Link href="/" passHref>
                  <Text>Home</Text>
                </Link>
                <Link href="/" passHref>
                  <Text>Shop</Text>
                </Link>
                <Link href="/" passHref>
                  <Text>Contact</Text>
                </Link>
                <Link href="/" passHref>
                  <Text>About</Text>
                </Link>
              </HStack>
            </Box>

            <FiShoppingCart />
          </Flex>
        </Container>
      </Box>
      <Box height="3.5rem"></Box>
    </>
  );
}

export default NavBar;
