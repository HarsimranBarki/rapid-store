import { Box, Container, Flex, Heading, HStack, Text } from "@chakra-ui/layout";
import React from "react";
import Link from "next/link";
import { Button, ButtonGroup } from "@chakra-ui/button";

function NavBar() {
  return (
    <Box bg="white" height="4rem">
      <Container maxW="container.xl">
        <Flex padding="4" justifyContent="space-between" alignItems="center">
          <Link passHref href="/">
            <Heading
              cursor="pointer"
              fontWeight="bold"
              fontSize="2xl"
              textColor="green.800"
            >
              Rapid
            </Heading>
          </Link>

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
          <ButtonGroup colorScheme="green" size="sm">
            <Button variant="ghost">Login</Button>
            <Button>Signup</Button>
          </ButtonGroup>
        </Flex>
      </Container>
    </Box>
  );
}

export default NavBar;
